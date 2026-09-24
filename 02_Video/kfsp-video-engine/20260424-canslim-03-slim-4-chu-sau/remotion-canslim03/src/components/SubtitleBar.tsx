import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { LAYOUT, FONTS, COLORS } from "../design";
import type { WordTimestamp } from "../types";

interface Props {
  words: WordTimestamp[] | null;
  displayText: string;
  accent?: string;
}

const CHUNK_SIZE = 6;

function chunkWords(words: WordTimestamp[]): WordTimestamp[][] {
  const out: WordTimestamp[][] = [];
  for (let i = 0; i < words.length; i += CHUNK_SIZE) {
    out.push(words.slice(i, i + CHUNK_SIZE));
  }
  return out;
}

/**
 * Whisper transcribes the TTS-tricked text ("Sờ Lim", "KFS B", "Yết-tơ-đây"...)
 * but the on-screen subtitle should show proper Vietnamese spelling from the
 * `display` field. Map display tokens 1:1 to whisper word slots proportionally
 * so timing stays audio-aligned while text reads correctly.
 */
function alignDisplayToWhisper(
  displayText: string,
  whisperWords: WordTimestamp[]
): WordTimestamp[] {
  // Strip standalone punctuation runs ("—", "…") so they don't eat a token slot,
  // but keep punctuation attached to words ("phá," "cầu.").
  const tokens = displayText
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0 && !/^[—\-–…:;()"'`]+$/.test(t));
  if (tokens.length === 0 || whisperWords.length === 0) return whisperWords;

  return tokens.map((tok, i) => {
    const wIdx = Math.min(
      whisperWords.length - 1,
      Math.floor((i * whisperWords.length) / tokens.length)
    );
    const wIdxEnd = Math.min(
      whisperWords.length - 1,
      Math.max(wIdx, Math.floor(((i + 1) * whisperWords.length) / tokens.length) - 1)
    );
    return {
      word: tok,
      start: whisperWords[wIdx].start,
      end: whisperWords[wIdxEnd].end,
    };
  });
}

export const SubtitleBar: React.FC<Props> = ({ words, displayText, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fallback: if no word timestamps, display full sentence (centered, faded by progress)
  if (!words || words.length === 0) {
    return (
      <div
        style={{
          position: "absolute",
          left: LAYOUT.safeLeft,
          right: 1080 - LAYOUT.safeRight,
          top: LAYOUT.subtitleY,
          height: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            ...FONTS.karaoke,
            color: COLORS.textPrimary,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {displayText}
        </div>
      </div>
    );
  }

  const t = frame / fps;
  // Use display text aligned to whisper timing (whisper transcribes the
  // TTS-tricked text — display has the proper VN spelling viewer should read).
  const alignedWords = alignDisplayToWhisper(displayText, words);
  const chunks = chunkWords(alignedWords);
  const activeChunk = chunks.find(
    (c) => t >= c[0].start && t <= c[c.length - 1].end + 0.15
  ) ?? chunks[0];

  // Auto-fit font size if chunk has many words
  const fitFontSize = Math.min(42, 960 / Math.max(activeChunk.length, 4) * 0.9);

  // Fade in 4 frames at chunk start, fade out 4 frames at chunk end
  const chunkStartF = activeChunk[0].start * fps;
  const chunkEndF = (activeChunk[activeChunk.length - 1].end + 0.15) * fps;
  const opacity = interpolate(
    frame,
    [chunkStartF, chunkStartF + 4, chunkEndF - 4, chunkEndF],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: LAYOUT.safeLeft,
        right: 1080 - LAYOUT.safeRight,
        top: LAYOUT.subtitleY,
        height: 110,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.family,
          fontSize: fitFontSize,
          fontWeight: 700,
          lineHeight: 1.35,
          textAlign: "center",
          whiteSpace: "nowrap",
          letterSpacing: "-0.01em",
        }}
      >
        {activeChunk.map((w, i) => {
          const isRead = t >= w.end;
          const isActive = t >= w.start && t < w.end;
          const color = isActive
            ? accent ?? COLORS.presentGold
            : isRead
            ? COLORS.textPrimary
            : COLORS.textMuted;
          return (
            <span key={i} style={{ color, transition: "color 60ms" }}>
              {w.word}
              {i < activeChunk.length - 1 ? " " : ""}
            </span>
          );
        })}
      </div>
    </div>
  );
};
