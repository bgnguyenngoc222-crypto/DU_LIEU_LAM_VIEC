export type Phase =
  | "HOOK"
  | "PROBLEM"
  | "AGITATE"
  | "LESSON"
  | "GAP"
  | "SOLVE"
  | "CTA";

export interface WordTS {
  word: string;
  start: number; // sec, relative to sentence start
  end: number;
}

export interface EnumBeat {
  item: string;
  anchor_word: string | null;
  rel_start_s: number | null;
  frame_30fps: number | null;
  patched?: boolean;
}

export interface Sentence {
  id: string;
  phase: Phase;
  display: string;
  tts: string;
  main_idea: string;
  enum_items: string[] | null;
  pause_after_ms: number;
  abs_start_s: number;
  abs_end_s: number;
  duration_s: number;
  word_timestamps: WordTS[] | null;
  enum_beats?: EnumBeat[];
}

export interface SentencesData {
  videoId: string;
  framework: string;
  audioMode: string;
  sentences: Sentence[];
}
