import React from "react";
import { COLORS } from "../../design";

// Small KFSP logo — top-left, always visible, non-intrusive
export const Watermark: React.FC = () => {
  return (
    <div style={{
      position: "absolute",
      top: 30,
      left: 30,
      display: "flex",
      alignItems: "center",
      gap: 10,
      opacity: 0.5,
    }}>
      {/* Logo circle */}
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        background: `linear-gradient(135deg, ${COLORS.gradientStart}80, ${COLORS.gradientEnd}80)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <span style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>K</span>
      </div>

      <span style={{
        fontSize: 20,
        fontWeight: 700,
        color: "rgba(255,255,255,0.5)",
        letterSpacing: 2,
      }}>
        KFSP
      </span>
    </div>
  );
};
