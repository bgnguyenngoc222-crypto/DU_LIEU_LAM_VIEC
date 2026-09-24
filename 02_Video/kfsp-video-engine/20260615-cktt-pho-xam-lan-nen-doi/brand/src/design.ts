// CANSLIM #01 — DARK navy theme (Mẫu 1)
// 1080x1920 portrait, TikTok safe zone
// Motion psychology spring presets per CLAUDE.md

export const VIDEO_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;

export const COLORS = {
  bgPrimary: "#03100a",     // very dark — gần đen ám xanh lá
  bgGradient: "#0a2418",    // gradient highlight nhẹ (forest tint)
  bgPanel: "rgba(255,255,255,0.04)",
  bgPanelHover: "rgba(255,255,255,0.08)",
  border: "rgba(255,255,255,0.10)",

  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.70)",
  textMuted: "rgba(255,255,255,0.45)",

  // Highlight palette per CLAUDE.md
  gold: "#f5c542",          // nhấn mạnh
  green: "#34d399",         // positive
  red: "#f87171",           // pain
  purple: "#a78bfa",        // brand / CANSLIM
  blue: "#60a5fa",
} as const;

export const SAFE_ZONE = {
  top: 150,
  bottom: 1500,
  left: 60,
  right: 1020,
  contentTop: 280,
  contentBottom: 1340,
  contentCenterY: 800,
  subtitleTop: 1380,
  subtitleBottom: 1470,
  progressBarY: 1490,
} as const;

export const SPRINGS = {
  heavy:    { damping: 20, stiffness: 80,  mass: 1.2 },  // pressure
  resolve:  { damping: 12, stiffness: 250 },             // snap
  calm:     { damping: 18, stiffness: 180 },             // smooth pro
  soft:     { damping: 22, stiffness: 120 },             // soft landing
  decisive: { damping: 14, stiffness: 300 },             // CTA snap
  zoom:     { damping: 25, stiffness: 60 },              // dolly
} as const;

export const FONT_STACK =
  '"Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
