// ============================================
// Data Schema — Video Tầm Soát Tăng Trưởng KFSP
// Light theme, 4 sections: Hook / Setup / Bonus / Conclusion
// Audio: v4_kfspthanh.mp3 (109.3s, speed 1.0x)
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
  durationInSeconds: 110,
  durationInFrames: 3300,
} as const;

// Section timing (in frames at 30fps)
export const SECTIONS = {
  hook:        { start: 0,    end: 428,  duration: 428 },   // 0:00 - 0:14  Hook
  filterSetup: { start: 460,  end: 1649, duration: 1189 },  // 0:15 - 0:55  Bước 1-3 + chuyển ý
  bonus:       { start: 1682, end: 2234, duration: 552 },   // 0:56 - 1:14  Bước 4-5 cảnh báo
  conclusion:  { start: 2267, end: 3300, duration: 1033 },  // 1:15 - 1:50  Kết + nam châm + CTA
} as const;
