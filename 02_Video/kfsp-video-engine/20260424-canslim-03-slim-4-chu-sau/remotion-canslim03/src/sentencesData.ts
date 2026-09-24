// Loaded from ../public/sentences.json (copy/symlink) at bundle time.
// Remotion reads from public/ via staticFile, but for module-level data we
// import the JSON at compile time.

import sentencesJson from "./sentences.json";
import type { Sentence, SentencesDoc } from "./types";

export const DOC = sentencesJson as SentencesDoc;
export const SENTENCES: Sentence[] = DOC.sentences;

export function getSentence(id: string): Sentence {
  const s = SENTENCES.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown sentence id: ${id}`);
  return s;
}

export function durationFrames(s: Sentence, fps = 30): number {
  // Add small visual tail (8 frames) so element exit animations don't get cut.
  const dur = s.duration_s ?? 2;
  return Math.max(15, Math.ceil(dur * fps) + 8);
}
