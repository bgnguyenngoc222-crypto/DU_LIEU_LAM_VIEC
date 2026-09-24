import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { COLORS } from "../../types";
import { CountUp } from "../animation/CountUp";

interface StackedBarProps {
  advance: number;
  decline: number;
  unchanged: number;
  delay?: number;
}

export const StackedBar: React.FC<StackedBarProps> = ({
  advance,
  decline,
  unchanged,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = advance + decline + unchanged;

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  const items = [
    { label: "Tăng", value: advance, color: COLORS.green, icon: "▲" },
    { label: "Đứng giá", value: unchanged, color: COLORS.yellow, icon: "●" },
    { label: "Giảm", value: decline, color: COLORS.red, icon: "▼" },
  ];

  return (
    <div style={{ padding: "20px 50px" }}>
      {/* Stacked bar */}
      <div
        style={{
          display: "flex",
          height: 56,
          borderRadius: 28,
          overflow: "hidden",
          marginBottom: 32,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              width: `${(item.value / total) * 100 * progress}%`,
              background: item.color,
              transition: "width 0.3s",
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {items.map((item, i) => (
          <div key={item.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 56, fontWeight: 900, color: item.color }}>
              <CountUp
                value={item.value}
                delay={delay + 10 + i * 5}
                duration={20}
                decimals={0}
              />
            </div>
            <div
              style={{
                fontSize: 24,
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                marginTop: 4,
              }}
            >
              {item.icon} {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
