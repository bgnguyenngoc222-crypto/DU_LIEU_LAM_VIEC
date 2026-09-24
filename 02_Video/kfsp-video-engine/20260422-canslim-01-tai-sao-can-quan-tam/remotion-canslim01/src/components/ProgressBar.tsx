import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SAFE_ZONE } from "../design";

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pct = Math.min(100, (frame / Math.max(1, durationInFrames - 1)) * 100);

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: SAFE_ZONE.progressBarY,
        height: 4,
        background: "rgba(255,255,255,0.10)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.gold})`,
        }}
      />
    </div>
  );
};
