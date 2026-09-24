import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  from?: number;
  stiffness?: number;
  style?: React.CSSProperties;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  from = 0,
  stiffness = 200,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness },
    from,
    to: 1,
  });

  const opacity = interpolate(frame, [delay, delay + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ transform: `scale(${scale})`, opacity, ...style }}>
      {children}
    </div>
  );
};
