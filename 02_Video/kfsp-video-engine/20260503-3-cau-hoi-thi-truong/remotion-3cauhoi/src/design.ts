// 3 câu hỏi — DARK NAVY (Style Mẫu 1)
// 1080x1920 portrait, TikTok safe zone, motion psychology springs

export const VIDEO_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;

export const COLORS = {
  bgPrimary: "#0a1628",        // dark navy base
  bgGradientCenter: "#142847", // radial center, slightly lighter navy
  bgPanel: "rgba(255,255,255,0.04)",
  bgPanelHover: "rgba(255,255,255,0.08)",
  border: "rgba(255,255,255,0.10)",
  borderStrong: "rgba(255,255,255,0.18)",

  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.72)",
  textMuted: "rgba(255,255,255,0.45)",

  // Highlight palette per CLAUDE.md
  gold: "#f5c542",             // nhấn mạnh / gọi tên
  green: "#34d399",            // tăng / positive
  red: "#f87171",              // giảm / pain / cảnh báo
  purple: "#a78bfa",           // KFSP brand / công cụ / NĐT lâu năm
  blue: "#60a5fa",
  pink: "#f0758a",             // gradient pair với purple

  // Phone mockup frame
  mockupFrame: "#0c0c0e",
} as const;

export const BG_GRADIENT = `radial-gradient(circle at 50% 38%, ${COLORS.bgGradientCenter} 0%, ${COLORS.bgPrimary} 70%)`;

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
  heavy:    { damping: 20, stiffness: 80,  mass: 1.2 },
  resolve:  { damping: 12, stiffness: 250 },
  calm:     { damping: 18, stiffness: 180 },
  soft:     { damping: 22, stiffness: 120 },
  decisive: { damping: 14, stiffness: 300 },
  zoom:     { damping: 25, stiffness: 60 },
} as const;

export const FONT_STACK =
  '"Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
