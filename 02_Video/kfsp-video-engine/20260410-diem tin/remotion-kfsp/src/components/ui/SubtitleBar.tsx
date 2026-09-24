import { useCurrentFrame, interpolate } from "remotion";
import React from "react";
import { SubtitleEntry } from "../../types";
import { COLORS, FONTS, LAYOUT } from "../../design";

interface SubtitleBarProps {
  subtitles: SubtitleEntry[];
}

export const SubtitleBar: React.FC<SubtitleBarProps> = ({ subtitles }) => {
  const frame = useCurrentFrame();
  const current = subtitles.find((s) => frame >= s.start && frame <= s.end);

  if (!current) return null;

  // Fade in/out
  const fadeIn = interpolate(frame, [current.start, current.start + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [current.end - 6, current.end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  const renderText = () => {
    if (!current.keywords?.length) {
      return <span>{current.text}</span>;
    }

    let remaining = current.text;
    const parts: React.ReactNode[] = [];
    let keyIndex = 0;

    for (const kw of current.keywords) {
      const idx = remaining.indexOf(kw.word);
      if (idx === -1) continue;

      if (idx > 0) {
        parts.push(<span key={`t-${keyIndex}`}>{remaining.slice(0, idx)}</span>);
      }

      // All keywords use accent blue (like MAU 1 style)
      const kwColor =
        kw.color === "green" ? COLORS.accentGreen :
        kw.color === "red" ? COLORS.accentRed :
        kw.color === "yellow" ? COLORS.accentGold :
        COLORS.accentBlue;

      parts.push(
        <span key={`k-${keyIndex}`} style={{ color: kwColor }}>
          {kw.word}
        </span>
      );

      remaining = remaining.slice(idx + kw.word.length);
      keyIndex++;
    }

    if (remaining) parts.push(<span key="rest">{remaining}</span>);
    return <>{parts}</>;
  };

  return (
    <div
      style={{
        position: "absolute",
        left: LAYOUT.contentPadding,
        right: LAYOUT.contentPadding,
        top: LAYOUT.subtitleY,
        textAlign: "center",
        opacity,
      }}
    >
      <p style={{ ...FONTS.subtitle, margin: 0 }}>
        {renderText()}
      </p>
    </div>
  );
};
