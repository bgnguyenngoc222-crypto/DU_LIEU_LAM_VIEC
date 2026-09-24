import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Sentence, WordTS } from "./types";
import { COLORS, SAFE_ZONE, FONT_STACK } from "./design";

interface Props {
  sentence: Sentence;
  // optional override: highlight specific words a different color
  keywordColors?: Record<string, string>;
}

// Tokenize sentence.display vào words "đẹp" (đúng chính tả) — bỏ token chỉ chứa
// punctuation/dấu nối ("—", "–"). Sau đó map sang word_timestamps (từ Whisper)
// để giữ timing chuẩn. Nếu count khớp → 1-1. Nếu lệch → distribute đều theo span.
function buildDisplayWords(sentence: Sentence): WordTS[] {
  const wts = sentence.word_timestamps ?? [];
  if (wts.length === 0) return [];

  const tokens = sentence.display
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
    .filter((t) => !/^["'“”‘’—–\-]+$/.test(t)); // skip dash/quote-only

  const N = tokens.length;
  const M = wts.length;
  if (N === 0) return [];

  if (N === M) {
    return tokens.map((w, i) => ({ word: w, start: wts[i].start, end: wts[i].end }));
  }

  // Mismatch (e.g. display "CANSLIM"=1 vs tts "Can Slim"=2): distribute đều
  const startT = wts[0].start;
  const endT = wts[M - 1].end;
  const span = Math.max(0.001, endT - startT);
  return tokens.map((w, i) => ({
    word: w,
    start: startT + (i / N) * span,
    end: startT + ((i + 1) / N) * span,
  }));
}

// Chunks: split words into groups of ~6 for nowrap display.
function chunkWords(words: WordTS[], size = 6): WordTS[][] {
  const out: WordTS[][] = [];
  for (let i = 0; i < words.length; i += size) {
    out.push(words.slice(i, i + size));
  }
  return out;
}

export const SubtitleBar: React.FC<Props> = ({ sentence, keywordColors = {} }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const wts = buildDisplayWords(sentence);
  if (wts.length === 0) return null;

  const chunks = chunkWords(wts, 6);

  // Find which chunk is active based on time
  let activeChunkIdx = 0;
  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    if (t >= c[0].start && t < c[c.length - 1].end + 0.15) {
      activeChunkIdx = i;
    } else if (t >= c[c.length - 1].end) {
      activeChunkIdx = i;
    }
  }
  const activeChunk = chunks[activeChunkIdx];

  // fade in/out 4 frames per chunk
  const chunkStart = activeChunk[0].start;
  const chunkEnd = activeChunk[activeChunk.length - 1].end;
  const fadeIn = interpolate(
    t,
    [chunkStart, chunkStart + 4 / fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const fadeOut =
    activeChunkIdx < chunks.length - 1
      ? interpolate(
          t,
          [chunkEnd, chunkEnd + 4 / fps],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      : 1;
  const opacity = fadeIn * fadeOut;

  // font auto-scale: min(42, 960 / words × 0.85)
  const fontSize = Math.min(42, (960 / activeChunk.length) * 0.85);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: SAFE_ZONE.subtitleTop,
        height: SAFE_ZONE.subtitleBottom - SAFE_ZONE.subtitleTop,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_STACK,
        opacity,
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          fontSize,
          fontWeight: 700,
          letterSpacing: 0.3,
          textShadow: "0 2px 12px rgba(0,0,0,0.8)",
        }}
      >
        {activeChunk.map((w, i) => {
          const isPast = t >= w.end;
          const isCurrent = t >= w.start && t < w.end;
          const cleaned = w.word.replace(/[.,!?]+$/, "");
          const punct = w.word.match(/[.,!?]+$/)?.[0] ?? "";

          let color: string = COLORS.textMuted;
          if (isCurrent) color = COLORS.gold;
          else if (isPast) color = COLORS.textPrimary;

          // keyword override
          const kc = keywordColors[cleaned.toLowerCase()];
          if (kc && (isCurrent || isPast)) color = kc;

          return (
            <span
              key={i}
              style={{
                color,
                transition: "color 80ms",
              }}
            >
              {cleaned}
              {punct}
            </span>
          );
        })}
      </div>
    </div>
  );
};
