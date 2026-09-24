import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONTS } from "../design";

interface Props {
  text: string;
  accent: string;
  /** Vertical center of the box, default 800 (mid-screen above subtitle) */
  centerY?: number;
  fontSize?: number;
}

export const MainIdea: React.FC<Props> = ({ text, accent, centerY = 800, fontSize }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const inSpring = spring({ frame, fps, config: { damping: 14, stiffness: 220 } });
  const scale = interpolate(inSpring, [0, 1], [0.85, 1]);
  const opacity = interpolate(inSpring, [0, 1], [0, 1]);
  // Removed tail fade — Sequence boundary handles transition; let visual stay
  // full opacity so Freeze in FullPreview captures it cleanly.
  const tailFade = 1;
  // Reference durationInFrames so it stays imported (lint).
  void durationInFrames;

  // Auto-fit font size
  const len = text.length;
  const computedFontSize = fontSize ?? (len > 30 ? 84 : len > 18 ? 108 : 132);

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: centerY - 100,
        height: 220,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        opacity: opacity * tailFade,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.family,
          fontSize: computedFontSize,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: COLORS.textPrimary,
          textShadow: `0 0 60px ${accent}33`,
        }}
      >
        <span style={{ color: accent }}>{text}</span>
      </div>
    </div>
  );
};
