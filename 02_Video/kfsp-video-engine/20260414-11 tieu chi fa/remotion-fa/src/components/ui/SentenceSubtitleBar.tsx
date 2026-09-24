import { useCurrentFrame, interpolate } from "remotion";
import React, { useMemo } from "react";
import { LAYOUT, COLORS, FONTS } from "../../design";
import type { WordTimestamp } from "../../data/sentencesData";

// Per-sentence SubtitleBar — chunks 5-6 words from whisper word_timestamps.
// Timings are relative to the sentence composition (frame 0 = sentence start).

interface Props {
  words: WordTimestamp[];
  displayText?: string; // optional override to use clean display (not whisper text)
}

interface Chunk {
  startFrame: number;
  endFrame: number;
  words: string[];
}

const FPS = 30;
const MAX_WORDS_PER_CHUNK = 6;

function buildChunks(words: WordTimestamp[], displayText?: string): Chunk[] {
  // Use display text words if provided (chuẩn chính tả), else whisper word text.
  const sourceWords = displayText
    ? displayText
        .replace(/[.,!?;:…"'—-]/g, " ")
        .split(/\s+/)
        .filter(Boolean)
    : words.map((w) => w.word);

  const n = Math.min(sourceWords.length, words.length);
  if (n === 0) return [];

  const chunks: Chunk[] = [];
  let cursor = 0;
  while (cursor < n) {
    let end = Math.min(cursor + MAX_WORDS_PER_CHUNK, n);
    // If there's a pause > 0.35s inside the chunk, split there
    for (let i = cursor + 1; i < end; i++) {
      const gap = words[i].start - words[i - 1].end;
      if (gap > 0.35) {
        end = i;
        break;
      }
    }
    const startFrame = Math.round(words[cursor].start * FPS);
    const endFrame = Math.round(words[end - 1].end * FPS);
    chunks.push({
      startFrame,
      endFrame,
      words: sourceWords.slice(cursor, end),
    });
    cursor = end;
  }
  return chunks;
}

export const SentenceSubtitleBar: React.FC<Props> = ({ words, displayText }) => {
  const frame = useCurrentFrame();
  const chunks = useMemo(() => buildChunks(words, displayText), [words, displayText]);
  const current = chunks.find((c) => frame >= c.startFrame && frame <= c.endFrame + 3);
  if (!current) return null;

  const fadeIn = interpolate(frame, [current.startFrame, current.startFrame + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [current.endFrame - 3, current.endFrame + 3], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  const progress = interpolate(
    frame,
    [current.startFrame, current.endFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const totalWords = current.words.length;

  const fontSize = Math.min(FONTS.karaoke.fontSize, 960 / (totalWords * 0.85));

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
          fontSize,
          background: "rgba(255, 255, 255, 0.92)",
          padding: "10px 22px",
          borderRadius: 18,
          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          backdropFilter: "blur(8px)",
        }}
      >
        {current.words.map((w, i) => {
          const wordProgress = (i + 0.5) / totalWords;
          const isSpoken = progress >= wordProgress;
          const isCurrent = Math.abs(progress - wordProgress) < 0.5 / totalWords;
          const color = isSpoken ? COLORS.textPrimary : COLORS.textMuted;
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
                textShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              {w}
            </span>
          );
        })}
      </p>
    </div>
  );
};
