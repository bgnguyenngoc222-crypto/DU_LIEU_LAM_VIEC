import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS } from "../design";

interface Props {
  /** Which letters to highlight: "CAN" | "SLIM" | "ALL" | array of letters */
  highlight: "CAN" | "SLIM" | "ALL" | string[];
  accent?: string;
  /** Optional per-letter color override. If a letter has an entry here, it
   * uses that color regardless of `accent`/`highlight`. Used when CAN needs
   * 2 sub-colors (C/A = past, N = future). */
  letterColors?: Partial<Record<string, string>>;
  topY?: number;
}

const LETTERS = ["C", "A", "N", "S", "L", "I", "M"];

export const CanslimLetters: React.FC<Props> = ({ highlight, accent, letterColors, topY = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const highlightSet = new Set<string>(
    highlight === "CAN" ? ["C", "A", "N"]
    : highlight === "SLIM" ? ["S", "L", "I", "M"]
    : highlight === "ALL" ? LETTERS
    : highlight
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: topY,
        display: "flex",
        justifyContent: "center",
        gap: 16,
      }}
    >
      {LETTERS.map((L, i) => {
        const sp = spring({
          frame: frame - i * 2,
          fps,
          config: { damping: 12, stiffness: 220 },
        });
        const scale = interpolate(sp, [0, 1], [0.5, 1]);
        const opacity = interpolate(sp, [0, 1], [0, 1]);
        const overrideColor = letterColors?.[L];
        const isHL = overrideColor != null || highlightSet.has(L);
        const color = overrideColor ?? (isHL ? (accent ?? COLORS.presentGold) : COLORS.textMuted);
        const bg = isHL ? `${color}1A` : COLORS.bgGlass;

        return (
          <div
            key={L}
            style={{
              width: 110,
              height: 130,
              borderRadius: 22,
              background: bg,
              border: `2px solid ${isHL ? color : "rgba(255,255,255,0.06)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONTS.family,
              fontSize: 78,
              fontWeight: 800,
              color,
              opacity,
              transform: `scale(${scale})`,
              boxShadow: isHL ? `0 0 28px ${color}55` : "none",
            }}
          >
            {L}
          </div>
        );
      })}
    </div>
  );
};
