import {
  Img,
  staticFile,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import React from "react";
import { LAYOUT } from "../../types";

interface ScreenshotFrameProps {
  src: string;
  delay?: number;
  zoom?: { from: number; to: number };
  panY?: number; // vertical pan in pixels
}

export const ScreenshotFrame: React.FC<ScreenshotFrameProps> = ({
  src,
  delay = 0,
  zoom = { from: 1, to: 1.05 },
  panY = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const scale = interpolate(
    frame,
    [delay, durationInFrames],
    [zoom.from, zoom.to],
    { extrapolateRight: "clamp" }
  );

  const translateY = interpolate(
    frame,
    [delay, durationInFrames],
    [0, panY],
    { extrapolateRight: "clamp" }
  );

  const height = LAYOUT.screenshotBottom - LAYOUT.screenshotTop;

  return (
    <div
      style={{
        position: "absolute",
        top: LAYOUT.screenshotTop,
        left: LAYOUT.padding,
        right: LAYOUT.padding,
        height,
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        opacity: enter,
        transform: `scale(${enter * 0.1 + 0.9})`,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateY(${translateY}px)`,
        }}
      />
    </div>
  );
};
