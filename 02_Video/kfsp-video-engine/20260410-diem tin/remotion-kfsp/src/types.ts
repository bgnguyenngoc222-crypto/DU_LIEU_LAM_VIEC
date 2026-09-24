// ============================================
// Data Schema — Video Điểm Tin KFSP (MAU 1 Style)
// Text-first, card-based, no phone mockups
// ============================================

export interface DiemTinData {
  meta: {
    date: string;       // "10/04/2026"
    title: string;      // "ĐIỂM TIN THỊ TRƯỜNG"
    headline: string;   // Subtitle dưới title
  };

  voiceover: string;
  bgm: string;

  // Scene configs — mỗi scene có content riêng
  scenes: SceneConfig[];

  // Subtitles synced with audio
  subtitles: SubtitleEntry[];
}

export interface SceneConfig {
  id: string;
  durationInSeconds: number;
  label: string;           // uppercase label (blue)
  heading?: string;        // main heading (white, bold)
  headingColor?: string;   // optional heading color highlight
  body?: string;           // body text (muted)
  screenshot?: string;     // optional background screenshot path
  // Content type
  content?:
    | { type: "title"; date: string }
    | { type: "cards"; items: CardItem[] }
    | { type: "list"; items: ListItem[] }
    | { type: "grid"; items: GridItem[] }
    | { type: "quote"; text: string; author?: string }
    | { type: "cta"; buttonText: string; features?: string[] };
}

export interface CardItem {
  icon?: string;
  label: string;
  value: string;
  color?: string;    // value color
  sublabel?: string;
}

export interface ListItem {
  rank?: number;
  name: string;
  value?: string;
  color?: string;
  tag?: string;     // badge text (e.g. "Leading", "Trần")
  tagColor?: string;
}

export interface GridItem {
  icon?: string;
  title: string;
  subtitle?: string;
}

export interface SubtitleEntry {
  start: number;    // frame
  end: number;
  text: string;
  keywords?: SubtitleKeyword[];
}

export interface SubtitleKeyword {
  word: string;
  color: "green" | "red" | "yellow" | "white" | "blue";
}

export const VIDEO_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;
