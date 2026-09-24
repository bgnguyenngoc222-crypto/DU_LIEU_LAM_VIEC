import { interpolate, useCurrentFrame } from "remotion";
import React from "react";
import { GRADIENT_LINE } from "../../design";

interface GradientLineProps {
  delay?: number;
  width?: number;
}

export const GradientLine: React.FC<GradientLineProps> = ({
  delay = 0,
  width,
}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [delay, delay + 20], [0, width || 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        ...GRADIENT_LINE,
        width: w,
      }}
    />
  );
};
