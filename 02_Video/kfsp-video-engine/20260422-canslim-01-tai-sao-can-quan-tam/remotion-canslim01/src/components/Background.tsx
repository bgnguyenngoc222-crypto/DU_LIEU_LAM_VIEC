import { COLORS } from "../design";

export const Background: React.FC<{ tint?: number }> = ({ tint = 0 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `radial-gradient(circle at 50% 40%, ${COLORS.bgGradient} 0%, ${COLORS.bgPrimary} 70%)`,
      filter: tint ? `brightness(${1 - tint * 0.35})` : undefined,
    }}
  />
);
