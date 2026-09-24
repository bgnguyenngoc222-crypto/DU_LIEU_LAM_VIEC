// ============================================
// KFSP Design System — Inspired by MAU 1
// Clean, minimal, dark, professional
// ============================================

export const COLORS = {
  // Backgrounds
  bgPrimary: "#0a1628",
  bgSecondary: "#0d1b2a",
  bgCard: "rgba(255, 255, 255, 0.04)",
  bgCardHover: "rgba(255, 255, 255, 0.08)",
  bgCardBorder: "rgba(255, 255, 255, 0.08)",

  // Text
  textPrimary: "#ffffff",
  textSecondary: "rgba(255, 255, 255, 0.55)",
  textMuted: "rgba(255, 255, 255, 0.35)",

  // Accent
  accentBlue: "#6cb4ee",
  accentGold: "#f5c542",
  accentGreen: "#34d399",
  accentRed: "#f87171",
  accentPink: "#ec4899",

  // Gradient
  gradientStart: "#6cb4ee",
  gradientEnd: "#ec4899",

  // KFSP brand
  kfspPurple: "#7c3aed",
} as const;

export const FONTS = {
  // Label: small, uppercase, tracking wide, accent blue
  label: {
    fontSize: 24,
    fontWeight: 600 as const,
    color: COLORS.accentBlue,
    letterSpacing: 4,
    textTransform: "uppercase" as const,
  },

  // Heading: large, bold, white
  heading: {
    fontSize: 64,
    fontWeight: 800 as const,
    color: COLORS.textPrimary,
    lineHeight: 1.15,
  },

  // Subheading
  subheading: {
    fontSize: 42,
    fontWeight: 700 as const,
    color: COLORS.textPrimary,
    lineHeight: 1.2,
  },

  // Body text
  body: {
    fontSize: 30,
    fontWeight: 400 as const,
    color: COLORS.textSecondary,
    lineHeight: 1.5,
  },

  // Big number (for stats, scores)
  bigNumber: {
    fontSize: 72,
    fontWeight: 900 as const,
    lineHeight: 1,
  },

  // Subtitle at bottom
  subtitle: {
    fontSize: 44,
    fontWeight: 800 as const,
    color: COLORS.textPrimary,
    lineHeight: 1.3,
  },
} as const;

export const LAYOUT = {
  width: 1080,
  height: 1920,
  fps: 30,

  contentPadding: 60,

  // ═══ 4 ZONES KHÔNG CHỒNG CHÉO ═══
  // Zone A: Header (label + gradient line)
  zoneA_top: 80,
  zoneA_bottom: 180,

  // Zone B: Main content (phone mockup / charts / cards)
  zoneB_top: 200,
  zoneB_bottom: 1100,

  // Zone C: Data cards / stats
  zoneC_top: 1120,
  zoneC_bottom: 1350,

  // Zone D: Subtitle text
  zoneD_top: 1400,
  zoneD_bottom: 1620,

  // Progress bar
  progressBarY: 1840,

  // Shortcuts
  subtitleY: 1420,
  gradientLineWidth: 400,
  gradientLineHeight: 3,
} as const;

// Glass card style
export const GLASS_CARD = {
  background: COLORS.bgCard,
  border: `1px solid ${COLORS.bgCardBorder}`,
  borderRadius: 16,
  padding: "24px 32px",
  backdropFilter: "blur(10px)",
} as const;

// Gradient line style (thin accent separator)
export const GRADIENT_LINE = {
  height: LAYOUT.gradientLineHeight,
  background: `linear-gradient(90deg, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
  borderRadius: 2,
  width: LAYOUT.gradientLineWidth,
  margin: "24px auto",
} as const;
