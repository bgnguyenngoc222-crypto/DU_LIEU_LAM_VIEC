import React from "react";
import { Img, staticFile } from "remotion";
import { COLORS, FONT_STACK } from "../design";
import { HideBrand } from "../brand";

// KFSP logo top, canh giữa — cố định trong y=155-275 (safe zone top: 150-280)
export const Logo: React.FC = () => {
  const hide = React.useContext(HideBrand);
  if (hide) return null;
  return (
  <div
    style={{
      position: "absolute",
      top: 158,
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      pointerEvents: "none",
      fontFamily: FONT_STACK,
    }}
  >
    <Img
      src={staticFile("logo-kfsp.png")}
      style={{
        width: 78,
        height: 78,
        // Convert ảnh sang silhouette trắng + drop-shadow trắng nhẹ
        filter: `brightness(0) invert(1) drop-shadow(0 0 12px rgba(255,255,255,0.4))`,
      }}
    />
    <div
      style={{
        fontSize: 24,
        fontWeight: 800,
        letterSpacing: 5,
        color: "#ffffff",
        textShadow: "0 0 12px rgba(255,255,255,0.4)",
      }}
    >
      KFSP
    </div>
  </div>
  );
};
