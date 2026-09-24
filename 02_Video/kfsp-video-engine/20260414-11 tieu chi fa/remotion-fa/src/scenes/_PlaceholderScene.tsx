import { AbsoluteFill, useCurrentFrame } from "remotion";
import React from "react";
import { COLORS, FONTS, LAYOUT } from "../design";

interface Props {
  label: string;
  description: string;
  bgColor?: string;
  emoji?: string;
}

// Generic placeholder for scene preview before full storyboard execution
export const PlaceholderScene: React.FC<Props> = ({ label, description, bgColor, emoji }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: bgColor || COLORS.bgSecondary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        padding: 80,
      }}
    >
      {emoji && <div style={{ fontSize: 180 }}>{emoji}</div>}

      <div
        style={{
          ...FONTS.label,
          fontSize: 36,
          color: COLORS.purple,
          letterSpacing: 8,
        }}
      >
        {label}
      </div>

      <div
        style={{
          ...FONTS.heading,
          fontSize: 64,
          textAlign: "center",
          maxWidth: 900,
          color: COLORS.textPrimary,
        }}
      >
        {description}
      </div>

      <div
        style={{
          marginTop: 40,
          fontSize: 24,
          color: COLORS.textMuted,
          fontFamily: "monospace",
        }}
      >
        Frame {frame} (placeholder)
      </div>
    </AbsoluteFill>
  );
};
