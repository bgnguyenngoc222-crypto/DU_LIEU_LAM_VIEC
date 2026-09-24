import { useCurrentFrame, interpolate } from "remotion";
import React from "react";
import { SubtitleEntry } from "../../types";
import { LAYOUT, COLORS, FONTS } from "../../design";

interface SubtitleBarProps {
  subtitles: SubtitleEntry[];
}

// ═══════════════════════════════════════════
// TikTok-style Karaoke Subtitle
// Word-by-word highlight, bold text with stroke
// Positioned in safe zone (y: 1240-1420)
// ═══════════════════════════════════════════

export const SubtitleBar: React.FC<SubtitleBarProps> = ({ subtitles }) => {
  const frame = useCurrentFrame();
  const current = subtitles.find((s) => frame >= s.start && frame <= s.end);

  if (!current) return null;

  // Fade in/out
  const fadeIn = interpolate(frame, [current.start, current.start + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [current.end - 4, current.end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  // Word-by-word karaoke progress
  const progress = interpolate(
    frame,
    [current.start, current.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Split text into words
  const words = current.text.split(" ");
  const totalWords = words.length;

  // Build keyword map for coloring
  const keywordMap = new Map<string, string>();
  if (current.keywords) {
    for (const kw of current.keywords) {
      const kwColor =
        kw.color === "purple" ? COLORS.purple :
        kw.color === "green" ? COLORS.accentGreen :
        kw.color === "red" ? COLORS.accentRed :
        kw.color === "gold" ? COLORS.accentGold :
        COLORS.accentBlue;
      // Map each word in the keyword phrase
      for (const w of kw.word.split(" ")) {
        keywordMap.set(w, kwColor);
      }
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        top: LAYOUT.subtitleTop,
        left: LAYOUT.contentPadding,
        right: LAYOUT.contentPadding,
        textAlign: "center",
        opacity,
        zIndex: 90,
      }}
    >
      <p
        style={{
          ...FONTS.karaoke,
          fontFamily: FONTS.family,
          margin: 0,
          display: "inline-flex",
          flexWrap: "nowrap",
          justifyContent: "center",
          gap: "0 8px",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          fontSize: Math.min(FONTS.karaoke.fontSize, 960 / (words.length * 0.85)),
          // Pill backdrop — đảm bảo legibility trên BG sáng/tối
          background: "rgba(255, 255, 255, 0.92)",
          padding: "10px 22px",
          borderRadius: 18,
          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          backdropFilter: "blur(8px)",
        }}
      >
        {words.map((word, i) => {
          // Is this word "spoken" yet?
          const wordProgress = (i + 0.5) / totalWords;
          const isSpoken = progress >= wordProgress;
          const isCurrent = Math.abs(progress - wordProgress) < 0.5 / totalWords;

          // Check if this word is part of a keyword
          const kwColor = keywordMap.get(word);

          // Determine color
          let color: string;
          if (kwColor && isSpoken) {
            color = kwColor; // keyword color when spoken
          } else if (isSpoken) {
            color = COLORS.textPrimary; // normal spoken
          } else {
            color = COLORS.textMuted; // not yet spoken
          }

          // Scale effect for current word
          const scale = isCurrent ? 1.05 : 1;

          return (
            <span
              key={i}
              style={{
                color,
                fontWeight: 700,
                transform: `scale(${scale})`,
                transition: "color 0.1s, transform 0.1s",
                display: "inline-block",
                textShadow: `0 1px 3px rgba(0,0,0,0.06)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </p>
    </div>
  );
};
