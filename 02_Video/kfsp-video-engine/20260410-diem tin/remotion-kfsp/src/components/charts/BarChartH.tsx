import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { SectorData, COLORS } from "../../types";

interface BarChartHProps {
  data: SectorData[];
  delay?: number;
}

export const BarChartH: React.FC<BarChartHProps> = ({ data, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const maxAbs = Math.max(...data.map((d) => Math.abs(d.change_pct)), 1);
  const sorted = [...data].sort((a, b) => b.change_pct - a.change_pct);

  return (
    <div style={{ padding: "20px 40px" }}>
      {sorted.map((sector, i) => {
        const barDelay = delay + i * 3;
        const progress = spring({
          frame: frame - barDelay,
          fps,
          config: { damping: 15, stiffness: 80 },
        });

        const isPositive = sector.change_pct >= 0;
        const barWidth = (Math.abs(sector.change_pct) / maxAbs) * 100;
        const color = isPositive ? COLORS.green : COLORS.red;

        return (
          <div
            key={sector.name}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
              opacity: interpolate(
                frame,
                [barDelay, barDelay + 8],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div
              style={{
                width: 180,
                fontSize: 22,
                fontWeight: 600,
                color: "#fff",
                textAlign: "right",
                paddingRight: 16,
                flexShrink: 0,
              }}
            >
              {sector.name}
            </div>

            <div style={{ flex: 1, position: "relative", height: 32 }}>
              <div
                style={{
                  position: "absolute",
                  left: isPositive ? "50%" : undefined,
                  right: isPositive ? undefined : "50%",
                  height: "100%",
                  width: `${barWidth * progress * 0.5}%`,
                  background: color,
                  borderRadius: isPositive
                    ? "0 8px 8px 0"
                    : "8px 0 0 8px",
                  boxShadow: sector.highlight
                    ? `0 0 12px ${color}80`
                    : undefined,
                  border: sector.highlight
                    ? `2px solid ${COLORS.yellow}`
                    : undefined,
                }}
              />
              {/* Center line */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: "rgba(255,255,255,0.3)",
                }}
              />
            </div>

            <div
              style={{
                width: 100,
                fontSize: 22,
                fontWeight: 700,
                color,
                textAlign: "left",
                paddingLeft: 12,
                flexShrink: 0,
              }}
            >
              {isPositive ? "+" : ""}
              {(sector.change_pct * progress).toFixed(2)}%
            </div>
          </div>
        );
      })}
    </div>
  );
};
