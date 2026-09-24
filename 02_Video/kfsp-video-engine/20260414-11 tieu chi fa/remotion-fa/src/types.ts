// ============================================
// Data Schema — Video 11 tiêu chí FA KFSP
// Framework: PASA | Voice: Thanh Long 88.1s
// ============================================

export interface SubtitleEntry {
  start: number;    // frame
  end: number;
  text: string;
  keywords?: SubtitleKeyword[];
}

export interface SubtitleKeyword {
  word: string;
  color: "purple" | "green" | "red" | "gold" | "blue";
}

export const VIDEO_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInSeconds: 88.1,
  durationInFrames: 2643,
} as const;

// Scene timing (in frames at 30fps) — refined per Whisper Thanh Long v3.10
export const SECTIONS = {
  hook:    { start: 0,    end: 486,  duration: 486 },   // 0:00 - 0:16.2  HOOK terms overload + promise
  problem: { start: 500,  end: 1050, duration: 550 },   // 0:16.6 - 0:35  P (news feed + BCTC)
  agitate: { start: 1050, end: 1770, duration: 720 },   // 0:35 - 0:59    A (bức tường + tam suất + cửa)
  solve:   { start: 1770, end: 2275, duration: 505 },   // 0:59 - 1:15.8  S (radar + bóng đá + drill-down)
  action:  { start: 2295, end: 2625, duration: 330 },   // 1:16.4 - 1:27.4 CTA
} as const;
