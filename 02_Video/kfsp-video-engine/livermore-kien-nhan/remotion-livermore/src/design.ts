// Livermore — "Kiên nhẫn là tiền" — DARK FOREST GREEN theme (Mẫu 2)
// 1080x1920 portrait, TikTok safe zone. Spring presets per CLAUDE.md.

export const VIDEO_CONFIG = { width: 1080, height: 1920, fps: 30 } as const;

export const COLORS = {
  bgPrimary: "#03100a",
  bgGradient: "#0a2418",
  bgPanel: "rgba(255,255,255,0.04)",
  bgPanelHover: "rgba(255,255,255,0.08)",
  border: "rgba(255,255,255,0.10)",

  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.70)",
  textMuted: "rgba(255,255,255,0.40)",

  // Convention video này
  gold: "#f5c542", // thị trường / cơ hội / đúng thời điểm / "tiền"
  purple: "#a78bfa", // KFSP brand / kỷ luật / "kiên nhẫn có chuẩn bị"
  green: "#34d399", // positive: quyết định đúng, kế hoạch
  red: "#f87171", // pain: bận rộn vô ích, FOMO, cảm xúc
  blue: "#60a5fa",
} as const;

export const SAFE_ZONE = {
  top: 150,
  bottom: 1500,
  left: 60,
  right: 1020,
  contentTop: 300,
  contentBottom: 1340,
  contentCenterY: 800,
  subtitleTop: 1380,
  subtitleBottom: 1470,
  progressBarY: 1490,
} as const;

export const SPRINGS = {
  heavy: { damping: 20, stiffness: 80, mass: 1.2 },
  resolve: { damping: 12, stiffness: 250 },
  calm: { damping: 18, stiffness: 180 },
  soft: { damping: 22, stiffness: 120 },
  decisive: { damping: 14, stiffness: 300 },
  zoom: { damping: 25, stiffness: 60 },
} as const;

export const FONT_STACK =
  '"Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
