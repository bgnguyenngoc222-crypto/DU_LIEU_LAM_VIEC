import { interpolate, useCurrentFrame } from "remotion";
import React from "react";

interface HighlightBoxProps {
  children: React.ReactNode;
  color?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export const HighlightBox: React.FC<HighlightBoxProps> = ({
  children,
  color = "#ef4444",
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();

  // Pulsing border
  const pulse = interpolate(
    (frame - delay) % 30,
    [0, 15, 30],
    [2, 4, 2],
    { extrapolateRight: "clamp" }
  );

  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        border: `${pulse}px solid ${color}`,
        borderRadius: 12,
        padding: 8,
        opacity,
        boxShadow: `0 0 ${pulse * 4}px ${color}40`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
