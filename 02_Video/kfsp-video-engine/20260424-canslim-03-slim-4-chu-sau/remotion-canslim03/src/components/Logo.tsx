import React from "react";
import { Img, staticFile } from "remotion";
import { LAYOUT, COLORS, FONTS } from "../design";

/**
 * KFSP brand logo — circle icon stacked above "KFSP" wordmark in white.
 * Layout matches the reference design from KFSP TikTok feed:
 * small circular logo centered top, then "KFSP" text below in white.
 */
export const Logo: React.FC = () => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: LAYOUT.logoY,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
    }}
  >
    <Img
      src={staticFile("img/logo.png")}
      style={{
        width: 64,
        height: 64,
        objectFit: "contain",
        // Convert purple original → pure white silhouette
        filter: "brightness(0) invert(1)",
      }}
    />
    <div
      style={{
        fontFamily: FONTS.family,
        fontSize: 22,
        fontWeight: 800,
        color: COLORS.textPrimary,
        letterSpacing: "0.18em",
      }}
    >
      KFSP
    </div>
  </div>
);
