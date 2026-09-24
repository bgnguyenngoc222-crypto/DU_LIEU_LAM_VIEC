import { interpolate, useCurrentFrame } from "remotion";
import React from "react";
import { COLORS } from "../../design";

interface SourceBadgeProps {
  delay?: number;
}

// "Nguồn: KFSP" badge — shows on data-heavy scenes
export const SourceBadge: React.FC<SourceBadgeProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 15], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      position: "absolute",
      top: 80,
      right: 60,
      opacity,
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20,
      padding: "8px 20px",
    }}>
      {/* KFSP dot */}
      <div style={{
        width: 10, height: 10, borderRadius: 5,
        background: `linear-gradient(135deg, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
      }} />
      <span style={{
        fontSize: 18,
        fontWeight: 600,
        color: COLORS.textMuted,
        letterSpacing: 1,
      }}>
        Nguồn: KFSP
      </span>
    </div>
  );
};
