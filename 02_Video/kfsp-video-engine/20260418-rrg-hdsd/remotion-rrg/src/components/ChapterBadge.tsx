import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS, VIDEO } from "../design";

/**
 * Bottom-left chapter badge shown throughout scene 2/3/4.
 * e.g. "CÁCH 1 / 3 — THEO NGÀNH"
 */
export const ChapterBadge: React.FC<{
  index: number;
  total: number;
  title: string;
  delay?: number;
  color?: string;
}> = ({ index, total, title, delay = 0, color = COLORS.gold }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.decisive,
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 40,
          top: VIDEO.height - 90,
          padding: "14px 26px",
          background: COLORS.navyGlass,
          border: `1.5px solid ${color}80`,
          borderRadius: 10,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          gap: 14,
          transform: `translateX(${(1 - appear) * -30}px)`,
          opacity: appear,
          boxShadow: `0 8px 24px rgba(0,0,0,0.4)`,
        }}
      >
        <span
          style={{
            color,
            ...FONTS.chapterBadge,
            fontSize: 22,
          }}
        >
          Cách {index} / {total}
        </span>
        <span style={{ color: COLORS.offWhite, opacity: 0.5, fontSize: 24 }}>•</span>
        <span
          style={{
            color: COLORS.white,
            ...FONTS.chapterBadge,
            fontSize: 26,
            letterSpacing: 2,
          }}
        >
          {title}
        </span>
      </div>
    </AbsoluteFill>
  );
};
