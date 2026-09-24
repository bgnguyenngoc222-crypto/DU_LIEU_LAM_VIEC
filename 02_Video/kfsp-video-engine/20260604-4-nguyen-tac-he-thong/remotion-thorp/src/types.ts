export type Phase = "HOOK" | "VALUE" | "CTA";

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
  duration_s_est: number;
  duration_s: number | null;
  abs_start_s: number;
  abs_end_s: number;
  word_timestamps: WordTS[] | null;
  enum_beats?: EnumBeat[];
}

export interface SentencesData {
  videoId: string;
  framework: string;
  voiceMode: string;
  note: string;
  sentences: Sentence[];
  totals: {
    sentences_count: number;
    duration_s_est_sum: number;
    pause_after_ms_sum: number;
    duration_with_pauses_est_s: number;
    duration_s_actual_sum?: number;
    duration_with_pauses_actual_s?: number;
  };
}
