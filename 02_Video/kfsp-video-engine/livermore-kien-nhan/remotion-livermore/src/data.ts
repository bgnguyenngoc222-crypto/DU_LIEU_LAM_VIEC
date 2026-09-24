import sentencesJson from "./sentences-data.json";
import { Sentence, SentencesData, Phase } from "./types";
import { VIDEO_CONFIG } from "./design";

export const DATA = sentencesJson as unknown as SentencesData;
export const SENTENCES: Sentence[] = DATA.sentences as Sentence[];

export const SENTENCE_BY_ID: Record<string, Sentence> = Object.fromEntries(
  SENTENCES.map((s) => [s.id, s]),
);

// Monolithic-aligned: 1 audio file, sliced per sentence by abs_start/abs_end.
export const AUDIO_FILE = "audio/livermore.mp3";

const fps = VIDEO_CONFIG.fps;

export function durationFrames(s: Sentence): number {
  return Math.max(1, Math.ceil(s.duration_s * fps));
}

export function absStartFrame(s: Sentence): number {
  return Math.round(s.abs_start_s * fps);
}

export function absEndFrame(s: Sentence): number {
  return Math.round(s.abs_end_s * fps);
}

// In FullPreview each sentence visual holds from its abs_start until the NEXT
// sentence's abs_start (covers natural silence gaps so nothing goes blank).
export function fullSpanFrames(index: number): { from: number; durationInFrames: number } {
  const s = SENTENCES[index];
  const from = absStartFrame(s);
  const next = SENTENCES[index + 1];
  const end = next ? absStartFrame(next) : Math.round(s.abs_end_s * fps);
  return { from, durationInFrames: Math.max(1, end - from) };
}

export function audioTotalFrames(): number {
  const last = SENTENCES[SENTENCES.length - 1];
  return Math.round(last.abs_end_s * fps);
}

export function getPhaseColor(phase: Phase): string {
  switch (phase) {
    case "HOOK":
      return "#f5c542";
    case "PROBLEM":
    case "AGITATE":
    case "GAP":
      return "#f87171";
    case "LESSON":
      return "#f5c542";
    case "SOLVE":
      return "#a78bfa";
    case "CTA":
      return "#34d399";
    default:
      return "#a78bfa";
  }
}
