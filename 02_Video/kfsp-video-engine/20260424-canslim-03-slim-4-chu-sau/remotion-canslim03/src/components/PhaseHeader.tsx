import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONTS, PHASE_LABEL, PHASE_ACCENT, LAYOUT } from "../design";

interface Props {
  phase: string;
}

export const PhaseHeader: React.FC<Props> = ({ phase }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = PHASE_ACCENT[phase] ?? COLORS.presentGold;
  const label = PHASE_LABEL[phase] ?? phase;

  // Spring fade-in
  const enter = spring({ frame, fps, config: { damping: 18, stiffness: 180 } });
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const dy = interpolate(enter, [0, 1], [-12, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: LAYOUT.logoY + 110,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `translateY(${dy}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.family,
          ...FONTS.label,
          color: accent,
          padding: "8px 18px",
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${accent}40`,
          borderRadius: 999,
        }}
      >
        {label}
      </div>
    </div>
  );
};
