// ============================================
// KFSP RRG Tutorial Design System
// Landscape 1920×920, 30fps, silent
// ============================================

export const VIDEO = {
  width: 1920,
  height: 920,
  fps: 30,
} as const;

// Source video is 3322×1594 → we display it scaled to fit 1920×920
// aspect source = 2.0841, aspect output = 2.0869 (near-identical, no letterbox)
export const SOURCE = {
  width: 3322,
  height: 1594,
  fps: 30,
  durationSec: 78.87,
} as const;

// Scene timings (frames at 30fps)
// Total = 3750f = 125s
export const SCENES = {
  scene0: { start: 0, duration: 240 }, // 0-8s INTRO
  scene1: { start: 240, duration: 300 }, // 8-18s RRG Zones
  scene2: { start: 540, duration: 420 }, // 18-32s Cách 1 Ngành
  scene3: { start: 960, duration: 1440 }, // 32-80s Cách 2 Bảng DL
  scene4: { start: 2400, duration: 1050 }, // 80-115s Cách 3 Watchlist
  scene5: { start: 3450, duration: 300 }, // 115-125s CTA
} as const;

export const TOTAL_FRAMES = 3750;

// ═══ Colors (match RRG zones) ═══
export const COLORS = {
  // 4 RRG zones
  zoneLeadGreen: "#34d399",
  zoneRecoverPurple: "#a78bfa",
  zoneLaggardRed: "#f87171",
  zoneWeakenOrange: "#f5a142",

  // UI
  gold: "#f5c542",
  goldGlow: "rgba(245, 197, 66, 0.45)",
  white: "#ffffff",
  offWhite: "rgba(255, 255, 255, 0.92)",

  // Navy glass (callout bg)
  navyGlass: "rgba(10, 22, 40, 0.88)",
  navyGlassLight: "rgba(10, 22, 40, 0.72)",
  navyBorder: "rgba(255, 255, 255, 0.18)",

  // Dim mask
  dim: "rgba(6, 10, 20, 0.62)",

  // Brand
  brandPurple: "#7C3AED",
  brandPurpleLight: "#A78BFA",
} as const;

// ═══ Typography ═══
export const FONTS = {
  family: "'Be Vietnam Pro', 'Inter', system-ui, sans-serif",

  chapterBadge: {
    fontSize: 32,
    fontWeight: 800 as const,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
  },

  title: {
    fontSize: 88,
    fontWeight: 800 as const,
    lineHeight: 1.1,
    letterSpacing: -1,
  },

  subtitle: {
    fontSize: 40,
    fontWeight: 500 as const,
    lineHeight: 1.3,
  },

  callout: {
    fontSize: 30,
    fontWeight: 600 as const,
    lineHeight: 1.35,
  },

  calloutLarge: {
    fontSize: 38,
    fontWeight: 700 as const,
    lineHeight: 1.3,
  },

  zoneLabel: {
    fontSize: 44,
    fontWeight: 800 as const,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
  },

  zoneDesc: {
    fontSize: 22,
    fontWeight: 500 as const,
    lineHeight: 1.3,
  },
} as const;

// ═══ Spring presets (CLAUDE.md mục 5 — CẤM linear) ═══
export const SPRINGS = {
  heavy: { damping: 20, stiffness: 80, mass: 1.2 },
  resolve: { damping: 12, stiffness: 250 },
  calm: { damping: 18, stiffness: 180 },
  soft: { damping: 22, stiffness: 120 },
  decisive: { damping: 14, stiffness: 300 },
  zoom: { damping: 25, stiffness: 60 },
} as const;

// ═══ Geometry mapping source (3322×1594) → output (1920×920) ═══
// Scale factor
export const SCALE_X = VIDEO.width / SOURCE.width; // 0.5778
export const SCALE_Y = VIDEO.height / SOURCE.height; // 0.5770

// Key UI anchor points measured on source 3322×1594 (then scaled to 1920×920 in components)
// Format: [x, y, w, h] on source coords
export const ANCHORS = {
  // Top tabs (3 tabs: Bảng dữ liệu / Watchlist / Ngành)
  tabBangDuLieu: [50, 30, 320, 60],
  tabWatchlist: [370, 30, 320, 60],
  tabNganh: [690, 30, 220, 60],

  // Stock/Industry table (left half)
  tableArea: [20, 100, 1290, 1440],
  searchBox: [30, 130, 1200, 80],
  firstRowCheckbox: [40, 250, 50, 50],

  // RRG chart area (right half)
  rrgArea: [1370, 20, 1920, 1500],
  rrgPlotArea: [1520, 250, 1750, 1200], // inside plot (excluding axes/labels)

  // 4 RRG zone label positions (inside chart)
  zoneRecoverLabel: [1580, 300, 200, 60],
  zoneLeadLabel: [3080, 300, 200, 60],
  zoneLaggardLabel: [1580, 1400, 200, 60],
  zoneWeakenLabel: [3080, 1400, 200, 60],

  // RRG center (crossing of dashed lines)
  rrgCenter: [2580, 900],
} as const;

export const toOutput = (src: readonly [number, number]): [number, number] => [
  src[0] * SCALE_X,
  src[1] * SCALE_Y,
];

export const toOutputRect = (
  rect: readonly [number, number, number, number],
): { x: number; y: number; w: number; h: number } => ({
  x: rect[0] * SCALE_X,
  y: rect[1] * SCALE_Y,
  w: rect[2] * SCALE_X,
  h: rect[3] * SCALE_Y,
});
