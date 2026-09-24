// CANSLIM #03 — SLIM = HIỆN TẠI design tokens
// Frame: 3 thì (quá khứ gray / hiện tại gold / tương lai light)

export const LAYOUT = {
  width: 1080,
  height: 1920,
  fps: 30,
  safeTop: 150,
  safeBottom: 1500,
  safeLeft: 60,
  safeRight: 1020,
  logoY: 200,
  subtitleY: 1380,
  progressY: 1490,
} as const;

export const COLORS = {
  // Background — KFSP CANSLIM series spec: dark mode, near-black with forest
  // green tint. Radial vignette at center 50%/40% from bgGradient → bgPrimary.
  bgPrimary: "#03100a",     // gần đen + green tint
  bgGradient: "#0a2418",    // forest dim, vignette tâm
  bgGlass: "rgba(255,255,255,0.04)",
  bgGlassBorder: "rgba(255,255,255,0.10)",

  // Text
  textPrimary: "#ffffff",
  textSecondary: "rgba(255,255,255,0.70)",
  textMuted: "rgba(255,255,255,0.45)",

  // 3 thì frame
  pastGray: "#94a3b8",      // quá khứ — kính chiếu hậu (neutral gray)
  futureLight: "#7dd3fc",   // tương lai — kính chắn gió (sky blue, forward-feeling)
  presentGold: "#f5c542",   // hiện tại — kính bên (gold highlight)
  presentRed: "#f87171",    // accent pain

  // Standard accents (per design system spec)
  gold: "#f5c542",          // brand SLIM / nhấn
  purple: "#a78bfa",        // brand CAN / KFSP
  green: "#34d399",         // positive / growth
  red: "#f87171",           // pain / negative
  blue: "#60a5fa",          // market direction (legacy, retained for M)
} as const;

export const FONTS = {
  family: "'Be Vietnam Pro', system-ui, -apple-system, sans-serif",

  hero: {
    fontSize: 96,
    fontWeight: 800 as const,
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
  },

  heading: {
    fontSize: 72,
    fontWeight: 700 as const,
    lineHeight: 1.1,
  },

  body: {
    fontSize: 44,
    fontWeight: 500 as const,
    lineHeight: 1.35,
  },

  karaoke: {
    fontSize: 42,
    fontWeight: 700 as const,
    lineHeight: 1.35,
  },

  label: {
    fontSize: 26,
    fontWeight: 700 as const,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
  },

  bigNumber: {
    fontSize: 240,
    fontWeight: 800 as const,
    lineHeight: 0.9,
  },
} as const;

export const PHASE_LABEL: Record<string, string> = {
  HOOK: "HOOK",
  VALUE_INTRO: "SLIM",
  VALUE_S: "S — SUPPLY",
  VALUE_L: "L — LEADER",
  VALUE_I: "I — INSTITUTION",
  VALUE_M: "M — MARKET",
  VALUE_WRAP: "TỔNG KẾT",
  CTA: "CTA",
};

export const PHASE_ACCENT: Record<string, string> = {
  HOOK: COLORS.presentGold,
  VALUE_INTRO: COLORS.presentGold,
  VALUE_S: COLORS.green,
  VALUE_L: COLORS.presentGold,
  VALUE_I: COLORS.purple,
  VALUE_M: COLORS.blue,
  VALUE_WRAP: COLORS.presentRed,
  CTA: COLORS.green,
};
