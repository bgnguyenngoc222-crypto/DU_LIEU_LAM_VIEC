import { useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { COLORS, LAYOUT } from "../../design";

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = (frame / durationInFrames) * 100;

  return (
    <div
      style={{
        position: "absolute",
        top: LAYOUT.progressBarY,
        left: LAYOUT.contentPadding,
        right: LAYOUT.contentPadding,
        height: 4,
        background: "rgba(124, 58, 237, 0.1)",
        borderRadius: 2,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: COLORS.gradientLight,
          borderRadius: 2,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
};
