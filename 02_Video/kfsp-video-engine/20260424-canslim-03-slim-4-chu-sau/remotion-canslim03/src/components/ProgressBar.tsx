import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { LAYOUT, COLORS } from "../design";

interface Props {
  accent?: string;
  /** Override total frames (default: useVideoConfig.durationInFrames). Use when
   * SentenceShell is embedded in FullPreview to scope progress to the sentence. */
  totalFrames?: number;
}

export const ProgressBar: React.FC<Props> = ({ accent, totalFrames }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const total = totalFrames ?? durationInFrames;
  const pct = Math.min(1, frame / Math.max(1, total - 1));
  return (
    <div
      style={{
        position: "absolute",
        left: LAYOUT.safeLeft,
        right: 1080 - LAYOUT.safeRight,
        top: LAYOUT.progressY,
        height: 4,
        borderRadius: 2,
        background: "rgba(255,255,255,0.10)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${pct * 100}%`,
          height: "100%",
          background: accent ?? COLORS.presentGold,
          transition: "width 60ms",
        }}
      />
    </div>
  );
};
