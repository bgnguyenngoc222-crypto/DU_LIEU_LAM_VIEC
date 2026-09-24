import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS } from "../design";

interface Props {
  letter: string;
  accent: string;
  topY?: number;
  size?: number;
}

/**
 * Big glass card with a single letter — used for VALUE_S/L/I/M intro.
 */
export const LetterCard: React.FC<Props> = ({ letter, accent, topY = 480, size = 320 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: { damping: 10, stiffness: 280 } });
  const scale = interpolate(sp, [0, 1], [0.5, 1]);
  const opacity = interpolate(sp, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: topY,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 36,
          background: COLORS.bgGlass,
          border: `3px solid ${accent}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity,
          transform: `scale(${scale})`,
          boxShadow: `0 0 80px ${accent}50, inset 0 0 40px ${accent}20`,
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.family,
            fontSize: size * 0.62,
            fontWeight: 800,
            color: accent,
            lineHeight: 1,
            textShadow: `0 0 30px ${accent}80`,
          }}
        >
          {letter}
        </div>
      </div>
    </div>
  );
};
