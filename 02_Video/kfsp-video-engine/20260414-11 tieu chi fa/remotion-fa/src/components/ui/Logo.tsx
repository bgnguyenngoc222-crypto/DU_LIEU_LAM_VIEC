import { Img, staticFile, interpolate, useCurrentFrame } from "remotion";
import React from "react";
import { LAYOUT, COLORS, FONTS } from "../../design";

export const Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: LAYOUT.logoY,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity,
        zIndex: 100,
      }}
    >
      <Img
        src={staticFile("images/logo.jpg")}
        style={{
          width: LAYOUT.logoSize,
          height: LAYOUT.logoSize,
          borderRadius: LAYOUT.logoSize / 2,
          objectFit: "cover",
          boxShadow: `0 4px 20px ${COLORS.shadow}`,
        }}
      />
      <span
        style={{
          fontSize: LAYOUT.logoTextSize,
          fontWeight: 700,
          color: COLORS.purple,
          letterSpacing: 4,
          fontFamily: FONTS.family,
        }}
      >
        KFSP
      </span>
    </div>
  );
};
