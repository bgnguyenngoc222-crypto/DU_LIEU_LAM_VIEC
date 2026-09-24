import React from "react";
import { COLORS, LAYOUT } from "../../design";

// Clean solid dark background — NO blur screenshots
export const Background: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: LAYOUT.width,
        height: LAYOUT.height,
        background: `radial-gradient(ellipse at 50% 30%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    />
  );
};
