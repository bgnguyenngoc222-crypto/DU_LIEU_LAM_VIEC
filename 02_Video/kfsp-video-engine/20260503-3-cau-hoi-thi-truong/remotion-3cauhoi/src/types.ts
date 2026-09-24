export type Phase = "HOOK" | "PAINPOINT" | "BRIDGE" | "Q1" | "Q2" | "Q3" | "CTA";

export interface WordTS {
  word: string;
  start: number;
  end: number;
}

export interface EnumBeat {
  item: string;
  anchor_word: string | null;
  rel_start_s: number | null;
  frame_30fps: number | null;
  warn?: string;
}

export interface Sentence {
  id: string;
  phase: Phase;
  display: string;
  tts: string;
  main_idea: string;
  enum_items: string[] | null;
  pause_before_ms: number;
  pause_after_ms: number;
  speed: number | null;
  duration_s: number | null;
  abs_start_s?: number;
  abs_end_s?: number;
  word_timestamps: WordTS[] | null;
  enum_beats?: EnumBeat[];
}

export interface SentencesData {
  videoId: string;
  title?: string;
  framework: string;
  format?: string;
  targetDurationSec?: number;
  tone?: string;
  sentences: Sentence[];
  totals?: {
    duration_s_actual_sum?: number;
    duration_with_pauses_actual_s?: number;
    vbee_full_audio_s?: number;
  };
}
