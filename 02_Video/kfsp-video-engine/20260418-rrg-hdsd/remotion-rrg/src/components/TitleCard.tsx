import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../design";

export const TitleCard: React.FC<{
  title: string;
  subtitle?: string;
  kicker?: string;
  align?: "center" | "left";
  delay?: number;
  color?: string;
}> = ({ title, subtitle, kicker, align = "center", delay = 0, color = COLORS.gold }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kickerIn = spring({ frame: frame - delay, fps, config: SPRINGS.decisive });
  const titleIn = spring({ frame: frame - delay - 8, fps, config: SPRINGS.heavy });
  const subIn = spring({ frame: frame - delay - 16, fps, config: SPRINGS.calm });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          maxWidth: 1500,
          textAlign: align,
          display: "flex",
          flexDirection: "column",
          gap: 22,
          alignItems: align === "center" ? "center" : "flex-start",
        }}
      >
        {kicker && (
          <div
            style={{
              color,
              ...FONTS.chapterBadge,
              fontSize: 28,
              opacity: kickerIn,
              transform: `translateY(${(1 - kickerIn) * 14}px)`,
              padding: "8px 18px",
              border: `2px solid ${color}`,
              borderRadius: 999,
              background: `${color}18`,
            }}
          >
            {kicker}
          </div>
        )}
        <h1
          style={{
            ...FONTS.title,
            color: COLORS.white,
            margin: 0,
            opacity: titleIn,
            transform: `translateY(${(1 - titleIn) * 28}px) scale(${0.95 + 0.05 * titleIn})`,
            textShadow: `0 4px 32px rgba(0,0,0,0.55)`,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              ...FONTS.subtitle,
              color: COLORS.offWhite,
              margin: 0,
              opacity: subIn * 0.92,
              transform: `translateY(${(1 - subIn) * 12}px)`,
              maxWidth: 1100,
              textShadow: `0 2px 12px rgba(0,0,0,0.5)`,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </AbsoluteFill>
  );
};
