import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SPRINGS, VIDEO } from "../design";

/**
 * Dims everything except a rect window on the frame.
 * Coordinates are in output space (1920×920).
 * `delay` controls when the spotlight starts animating in.
 */
export const Spotlight: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  delay?: number;
  radius?: number;
  dimOpacity?: number;
  ringColor?: string;
}> = ({ x, y, w, h, delay = 0, radius = 12, dimOpacity = 0.68, ringColor = COLORS.gold }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.calm,
  });

  const alpha = dimOpacity * progress;
  const ringOpacity = progress;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        viewBox={`0 0 ${VIDEO.width} ${VIDEO.height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <mask id={`mask-${x}-${y}`}>
            <rect width={VIDEO.width} height={VIDEO.height} fill="white" />
            <rect x={x} y={y} width={w} height={h} rx={radius} ry={radius} fill="black" />
          </mask>
        </defs>
        <rect
          width={VIDEO.width}
          height={VIDEO.height}
          fill={`rgba(6, 10, 20, ${alpha})`}
          mask={`url(#mask-${x}-${y})`}
        />
        {/* Ring */}
        <rect
          x={x - 3}
          y={y - 3}
          width={w + 6}
          height={h + 6}
          rx={radius + 3}
          ry={radius + 3}
          fill="none"
          stroke={ringColor}
          strokeWidth={4}
          opacity={ringOpacity}
          style={{
            filter: `drop-shadow(0 0 12px ${COLORS.goldGlow})`,
          }}
        />
      </svg>
    </AbsoluteFill>
  );
};
