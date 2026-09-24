import { BG_GRADIENT, COLORS } from "../design";

export const Background: React.FC<{ tint?: number }> = ({ tint = 0 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: BG_GRADIENT,
      filter: tint ? `brightness(${1 - tint * 0.35})` : undefined,
    }}
  />
);

// Solid base behind gradient (in case gradient transparent edges)
export const BackgroundSolid: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: COLORS.bgPrimary }} />
);
