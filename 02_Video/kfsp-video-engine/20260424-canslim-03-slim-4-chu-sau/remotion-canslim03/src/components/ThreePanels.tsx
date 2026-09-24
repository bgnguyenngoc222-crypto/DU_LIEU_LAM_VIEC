import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS } from "../design";

type PanelKey = "past" | "present" | "future";

interface Props {
  /** Which panel(s) are "active" — past / present / future. Single key or array. */
  active?: PanelKey | PanelKey[];
  topY?: number;
}

const PANELS = [
  { key: "past", label: "QUÁ KHỨ", subtitle: "kính chiếu hậu", color: COLORS.pastGray },
  { key: "present", label: "HIỆN TẠI", subtitle: "kính bên (bạn đang lái)", color: COLORS.presentGold },
  { key: "future", label: "TƯƠNG LAI", subtitle: "kính chắn gió", color: COLORS.futureLight },
];

export const ThreePanels: React.FC<Props> = ({ active, topY = 1100 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const activeSet = new Set<PanelKey>(
    Array.isArray(active) ? active : active ? [active] : []
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: topY,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 18,
      }}
    >
      {PANELS.map((p, i) => {
        const sp = spring({
          frame: frame - i * 4,
          fps,
          config: { damping: 16, stiffness: 160 },
        });
        const scale = interpolate(sp, [0, 1], [0.8, 1]);
        const opacity = interpolate(sp, [0, 1], [0, 1]);
        const isActive = activeSet.has(p.key as PanelKey);

        return (
          <div
            key={p.key}
            style={{
              padding: "26px 16px",
              background: isActive ? `${p.color}1F` : COLORS.bgGlass,
              border: `2px solid ${isActive ? p.color : "rgba(255,255,255,0.08)"}`,
              borderRadius: 22,
              textAlign: "center",
              opacity: isActive ? opacity : opacity * 0.6,
              transform: `scale(${scale})`,
              boxShadow: isActive ? `0 0 32px ${p.color}55` : "none",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.family,
                fontSize: 34,
                fontWeight: 800,
                color: isActive ? p.color : COLORS.textSecondary,
                letterSpacing: "0.04em",
              }}
            >
              {p.label}
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: FONTS.family,
                fontSize: 22,
                fontWeight: 500,
                color: COLORS.textMuted,
              }}
            >
              {p.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
};
