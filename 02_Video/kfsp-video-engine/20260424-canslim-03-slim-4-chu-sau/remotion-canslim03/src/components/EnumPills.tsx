import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS } from "../design";
import type { WordTimestamp } from "../types";

interface Props {
  items: string[];
  words: WordTimestamp[] | null;
  accent: string;
  /** y center of the row (default below MainIdea) */
  topY?: number;
}

/**
 * Pop pills timed to enum_items: each pill appears at the word_timestamp
 * matching the first significant word of the item label. If word_timestamps
 * are unavailable, fall back to uniform stagger across the duration.
 */
export const EnumPills: React.FC<Props> = ({ items, words, accent, topY = 1080 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Compute per-item start frame
  const itemFrames: number[] = items.map((label, i) => {
    if (words && words.length > 0) {
      // Find word matching first non-trivial token of label
      const tokens = label.toLowerCase().split(/\s+/).filter(Boolean);
      for (const tok of tokens) {
        const w = words.find((x) => x.word.toLowerCase().includes(tok));
        if (w) return Math.round(w.start * fps);
      }
    }
    // Fallback uniform stagger across 30%-90% of duration
    const span = durationInFrames * 0.6;
    const start = durationInFrames * 0.3;
    return Math.round(start + (span * i) / Math.max(items.length, 1));
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: topY,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 14,
        padding: "0 60px",
      }}
    >
      {items.map((label, i) => {
        const startF = itemFrames[i];
        const sp = spring({
          frame: frame - startF,
          fps,
          config: { damping: 12, stiffness: 260 },
        });
        const scale = interpolate(sp, [0, 1], [0.6, 1]);
        const opacity = frame < startF ? 0 : interpolate(sp, [0, 1], [0, 1]);

        return (
          <div
            key={i}
            style={{
              padding: "14px 26px",
              background: COLORS.bgGlass,
              border: `2px solid ${accent}`,
              borderRadius: 999,
              fontFamily: FONTS.family,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.textPrimary,
              opacity,
              transform: `scale(${scale})`,
              boxShadow: `0 0 24px ${accent}33`,
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};
