// CANSLIM #02 — design tokens
// Portrait 1080x1920 30fps — TikTok safe

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;

// Safe zone TikTok
export const SAFE = {
  topUnsafe: 150,
  bottomUnsafe: 1500,
  leftSafe: 60,
  rightSafe: 1020,
  subtitleY: [1380, 1470] as [number, number],
  progressBarY: 1490,
  logoTopY: [160, 290] as [number, number],
} as const;

export const COLORS = {
  // Forest green dark — KFSP CANSLIM series
  bgNavy: "#0a2418",       // forest dim — vignette mid-stop
  bgNavyDeep: "#03100a",   // gần đen + green tint — primary base
  glass: "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.10)",
  glassStrong: "rgba(255,255,255,0.06)",

  // Highlight palette
  gold: "#f5c542",
  green: "#34d399",
  red: "#f87171",
  purple: "#a78bfa",
  amber: "#f5a142",

  textPrimary: "#ffffff",
  textSecondary: "rgba(255,255,255,0.70)",
  textMute: "rgba(255,255,255,0.45)",

  // Phase tints
  hookTint: "#f5c542",
  valueCATint: "#a78bfa",
  valueNTint: "#34d399",
  callbackTint: "#f87171",
  empathyTint: "#f5a142",
  ctaTint: "#34d399",
} as const;

export const FONTS = {
  family: "'Be Vietnam Pro', system-ui, sans-serif",
} as const;

// Spring presets — CẤM linear
export const SPRINGS = {
  heavy: { damping: 20, stiffness: 80, mass: 1.2 },
  resolve: { damping: 12, stiffness: 250 },
  calm: { damping: 18, stiffness: 180 },
  soft: { damping: 22, stiffness: 120 },
  decisive: { damping: 14, stiffness: 300 },
  zoom: { damping: 25, stiffness: 60 },
} as const;

// Phase color helper
export type Phase = "HOOK" | "VALUE" | "CTA";
export const phaseColor = (phase: string, mainIdea?: string): string => {
  if (phase === "HOOK") return COLORS.gold;
  if (phase === "CTA") return COLORS.green;
  // VALUE: split by main_idea keyword
  if (!mainIdea) return COLORS.purple;
  const m = mainIdea.toLowerCase();
  if (m.includes("đứng im") || m.includes("callback")) return COLORS.red;
  if (m.includes("kfsp") || m.includes("ca ") || m.includes("chỉ tiêu") || m.includes("recap") ||
      m.includes("c:") || m.includes("a:") || m.includes("c và a")) return COLORS.purple;
  if (m.includes("bình thường") || m.includes("không phải lỗi") || m.includes("hành trình") ||
      m.includes("sắc dần") || m.includes("tham khảo") || m.includes("pro liền") ||
      m.includes("chưa") || m.includes("ngắn hạn") || m.includes("vấn đề")) return COLORS.amber;
  return COLORS.green; // N keywords default
};
