// ============================================
// KFSP Design System — LIGHT THEME
// TikTok/Reels safe zone layout
// Motion psychology spring presets
// ============================================

export const COLORS = {
  // Backgrounds
  bgPrimary: "#FFFFFF",
  bgSecondary: "#F8F6FC",
  bgTertiary: "#F0EBFA",
  bgDark: "#F3F0F8", // hook scene dimming target

  // Text
  textPrimary: "#1A1A2E",
  textSecondary: "rgba(26, 26, 46, 0.65)",
  textMuted: "rgba(26, 26, 46, 0.40)",
  textWhite: "#FFFFFF",

  // KFSP Brand Purple
  purple: "#7C3AED",
  purpleLight: "#A78BFA",
  purpleDark: "#5B21B6",
  purpleBg: "#EDE9FE",

  // Accent
  accentGreen: "#10B981",
  accentRed: "#EF4444",
  accentGold: "#F59E0B",
  accentBlue: "#3B82F6",

  // Annotation
  annotationRed: "#EF4444",
  annotationGlow: "rgba(239, 68, 68, 0.3)",

  // Gradient
  gradientLight: "linear-gradient(135deg, #7C3AED, #A78BFA)",

  // Shadows
  shadow: "rgba(124, 58, 237, 0.08)",
  shadowStrong: "rgba(124, 58, 237, 0.15)",
  shadowScreenshot: "rgba(0, 0, 0, 0.12)",
} as const;

export const FONTS = {
  family: "'Be Vietnam Pro', sans-serif",

  heading: {
    fontSize: 56,
    fontWeight: 700 as const,
    color: COLORS.textPrimary,
    lineHeight: 1.15,
  },

  body: {
    fontSize: 40,
    fontWeight: 400 as const,
    color: COLORS.textSecondary,
    lineHeight: 1.4,
  },

  // Karaoke subtitle
  karaoke: {
    fontSize: 42,
    fontWeight: 700 as const,
    lineHeight: 1.35,
  },

  label: {
    fontSize: 28,
    fontWeight: 700 as const,
    color: COLORS.purple,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
  },

  bigNumber: {
    fontSize: 120,
    fontWeight: 700 as const,
    color: COLORS.purple,
    lineHeight: 1,
  },
} as const;

// ═══ TikTok/Reels Safe Zone Layout ═══
export const LAYOUT = {
  width: 1080,
  height: 1920,
  fps: 30,

  // Safe zone boundaries (from TikTok reference image)
  safeTop: 150,
  safeBottom: 1500,
  safeLeft: 60,
  safeRight: 1020,

  contentPadding: 60,

  // Logo — centered top, smaller to give more room for phone
  logoY: 155,
  logoSize: 80,
  logoTextSize: 24,
  logoAreaBottom: 255,

  // Main content area — larger phone mockup
  contentTop: 255,
  contentBottom: 1340,
  contentCenterY: 800,

  // Subtitle karaoke — pushed down, single line
  subtitleTop: 1380,
  subtitleBottom: 1470,

  // Progress bar — below subtitle
  progressBarY: 1490,

  // Screenshot display
  screenshotWidth: 900,
  screenshotMaxHeight: 880,
  screenshotBorderRadius: 20,
} as const;

// ═══ Motion Psychology Spring Presets ═══
export const SPRINGS = {
  // Hook: heavy, gravity-like (things falling, pressure)
  heavy: { damping: 20, stiffness: 80, mass: 1.2 },

  // Hook resolve: decisive snap (solution appears)
  resolve: { damping: 12, stiffness: 250 },

  // Tutorial: calm, professional, confident
  calm: { damping: 18, stiffness: 180 },

  // Bonus: soft landing (system takes over, relax)
  soft: { damping: 22, stiffness: 120 },

  // CTA: decisive, precise snap
  decisive: { damping: 14, stiffness: 300 },

  // Zoom: slow intimate zoom-in
  zoom: { damping: 25, stiffness: 60 },
} as const;
