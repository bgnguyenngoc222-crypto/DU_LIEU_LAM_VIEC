export interface WordTimestamp {
  word: string;
  start: number;
  end: number;
}

export interface EnumBeat {
  item: string;
  frame: number;
  time: number;
}

export interface Sentence {
  id: string;
  phase: string;
  display: string;
  tts: string;
  main_idea: string;
  enum_items: string[] | null;
  enum_beats?: EnumBeat[] | null;
  pause_before_ms: number;
  pause_after_ms: number;
  speed: number;
  duration_s: number | null;
  word_timestamps: WordTimestamp[] | null;
}

export interface SentencesDoc {
  videoId: string;
  framework: string;
  sentences: Sentence[];
}
