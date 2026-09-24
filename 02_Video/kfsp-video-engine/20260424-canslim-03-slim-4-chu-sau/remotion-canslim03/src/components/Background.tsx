import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../design";

interface Props {
  /** Phase prop kept for API compatibility — design system spec uses a single
   * canonical green-tinted dark vignette regardless of phase. Phase-specific
   * accent comes through foreground elements (PhaseHeader, MainIdea, cards). */
  phase?: string;
}

/**
 * KFSP CANSLIM series canonical background:
 *   radial-gradient(circle at 50% 40%, #0a2418 0%, #03100a 70%)
 *
 * Tone: dark mode, gần đen, ám xanh lá đậm (forest green tint).
 * Center vignette ở 50% horizontal, 40% vertical — focal point cho nội dung.
 */
export const Background: React.FC<Props> = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 40%, ${COLORS.bgGradient} 0%, ${COLORS.bgPrimary} 70%)`,
        }}
      />
    </AbsoluteFill>
  );
};
