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
        bottom: LAYOUT.height - LAYOUT.progressBarY,
        left: LAYOUT.contentPadding,
        right: LAYOUT.contentPadding,
        height: 3,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 2,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
          borderRadius: 2,
        }}
      />
    </div>
  );
};
