import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SAFE, VIDEO } from "../design";

export type WordTS = { word: string; start: number; end: number };

type Props = {
  words: WordTS[];
  displayText?: string; // if provided, use display text (proper spelling) instead of TTS transcript
  highlightWords?: string[]; // exact match for highlight
  highlightColor?: string;
  durationSec: number;
};

const FPS = 30;

// Strip leading/trailing punctuation; keep middle
const cleanWord = (w: string) => w.trim();

// Build word_timestamps from displayText by re-distributing across the timing range of real (TTS) words.
// Preserves overall pacing while showing proper Vietnamese spelling.
const buildDisplayWords = (displayText: string, ttsWords: WordTS[]): WordTS[] => {
  const tokens = displayText.split(/\s+/).map(cleanWord).filter(Boolean);
  if (tokens.length === 0) return [];
  // Time window from TTS first→last word
  const t0 = ttsWords[0]?.start ?? 0;
  const t1 = ttsWords[ttsWords.length - 1]?.end ?? Math.max(t0 + 1, 1);
  const span = Math.max(0.001, t1 - t0);
  // Weight each token by its character length (longer words read longer)
  const weights = tokens.map((t) => Math.max(1, t.replace(/[—–\-.,!?…"():;]/g, "").length));
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let cursor = t0;
  const out: WordTS[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const dur = (weights[i] / totalWeight) * span;
    const start = cursor;
    const end = i === tokens.length - 1 ? t1 : cursor + dur;
    out.push({ word: tokens[i], start: round3(start), end: round3(end) });
    cursor = end;
  }
  return out;
};
const round3 = (n: number) => Math.round(n * 1000) / 1000;

// Group words into chunks of ~5-6 words for 1-line karaoke
const groupChunks = (words: WordTS[], maxPerChunk = 6): WordTS[][] => {
  const chunks: WordTS[][] = [];
  let cur: WordTS[] = [];
  for (const w of words) {
    cur.push(w);
    const text = cur.map((x) => x.word).join(" ");
    // Cap by char (TikTok 1-line ~28 chars) or word count
    if (cur.length >= maxPerChunk || text.length >= 30) {
      chunks.push(cur);
      cur = [];
    }
  }
  if (cur.length) chunks.push(cur);
  return chunks;
};

export const Subtitle: React.FC<Props> = ({
  words: ttsWords,
  displayText,
  highlightWords = [],
  highlightColor = COLORS.gold,
  durationSec,
}) => {
  const frame = useCurrentFrame();
  if (!ttsWords || ttsWords.length === 0) return null;

  const words = displayText ? buildDisplayWords(displayText, ttsWords) : ttsWords;
  if (words.length === 0) return null;

  const chunks = groupChunks(words);
  const tNow = frame / FPS;

  // Find current chunk index
  let activeIdx = 0;
  for (let i = 0; i < chunks.length; i++) {
    const start = chunks[i][0].start;
    if (tNow >= start) activeIdx = i;
  }
  const chunk = chunks[activeIdx];
  if (!chunk) return null;

  const chunkStart = chunk[0].start;
  const chunkEnd = chunk[chunk.length - 1].end;
  const fadeIn = interpolate(tNow, [chunkStart - 0.1, chunkStart], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  // Fade out only at very end of last chunk
  const isLast = activeIdx === chunks.length - 1;
  const fadeOut = isLast
    ? interpolate(tNow, [Math.max(chunkEnd, durationSec - 0.15), durationSec], [1, 0.3], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })
    : 1;
  const opacity = fadeIn * fadeOut;

  // Auto font scale
  const totalChars = chunk.map((w) => w.word).join(" ").length;
  const fontSize = Math.min(58, Math.max(38, 1000 / Math.max(totalChars, 8)));

  const isHL = (w: string) => {
    const norm = w.toLowerCase().replace(/[.,!?…"]/g, "").trim();
    return highlightWords.some((h) => h.toLowerCase().split(" ").includes(norm));
  };

  const subY = SAFE.subtitleY[0];
  const subH = SAFE.subtitleY[1] - SAFE.subtitleY[0];

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: subY,
        width: VIDEO.width,
        height: subH,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          padding: "8px 28px",
          background: "rgba(0,0,0,0.55)",
          borderRadius: 14,
          maxWidth: VIDEO.width - 80,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {chunk.map((w, i) => {
          const isReadingNow = tNow >= w.start && tNow <= w.end + 0.05;
          const hasRead = tNow > w.end;
          const hl = isHL(w.word);
          const color = hl ? highlightColor : (isReadingNow ? COLORS.textPrimary : (hasRead ? COLORS.textPrimary : COLORS.textSecondary));
          const weight = hl ? 800 : (isReadingNow || hasRead ? 700 : 600);
          return (
            <span
              key={i}
              style={{
                color,
                fontWeight: weight,
                fontSize,
                fontFamily: FONTS.family,
                textShadow: hl ? `0 0 18px ${highlightColor}66` : "0 2px 6px rgba(0,0,0,0.85)",
                marginRight: 10,
                transition: "color 0.06s linear",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
