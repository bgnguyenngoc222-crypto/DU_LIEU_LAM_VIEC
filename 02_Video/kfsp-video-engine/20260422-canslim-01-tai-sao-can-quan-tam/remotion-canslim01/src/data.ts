import sentencesJson from "./sentences-data.json";
import { Sentence, SentencesData, Phase } from "./types";
import { VIDEO_CONFIG } from "./design";

export const DATA = sentencesJson as unknown as SentencesData;

export const SENTENCES: Sentence[] = DATA.sentences as Sentence[];

export const SENTENCE_BY_ID: Record<string, Sentence> = Object.fromEntries(
  SENTENCES.map((s) => [s.id, s]),
);

export function durationFrames(s: Sentence): number {
  const dur = s.duration_s ?? s.duration_s_est;
  return Math.max(1, Math.ceil(dur * VIDEO_CONFIG.fps));
}

export function audioPath(s: Sentence): string {
  return `audio/${s.id}.mp3`;
}

export function getPhaseColor(phase: Phase): string {
  if (phase === "HOOK") return "#f87171";
  if (phase === "CTA") return "#34d399";
  return "#a78bfa";
}
