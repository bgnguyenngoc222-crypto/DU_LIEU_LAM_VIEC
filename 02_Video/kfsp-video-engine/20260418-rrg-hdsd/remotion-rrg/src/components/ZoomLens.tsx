import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS, VIDEO } from "../design";

/**
 * Magnifies a region of the frame beneath it (display-only — does NOT duplicate source).
 * Implemented as CSS transform scale applied to children via origin offset.
 *
 * Wrap the video in this and provide the zoom center (in output coords).
 */
export const ZoomLens: React.FC<{
  centerX: number;
  centerY: number;
  zoom: number;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}> = ({ centerX, centerY, zoom, delay = 0, duration, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progressIn = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.zoom,
  });

  const progressOut = duration
    ? spring({
        frame: frame - delay - duration,
        fps,
        config: SPRINGS.calm,
      })
    : 0;

  const scale = 1 + (zoom - 1) * (progressIn - progressOut);

  // transform-origin at center point as % of output dimensions
  const originX = (centerX / VIDEO.width) * 100;
  const originY = (centerY / VIDEO.height) * 100;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
        transformOrigin: `${originX}% ${originY}%`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
