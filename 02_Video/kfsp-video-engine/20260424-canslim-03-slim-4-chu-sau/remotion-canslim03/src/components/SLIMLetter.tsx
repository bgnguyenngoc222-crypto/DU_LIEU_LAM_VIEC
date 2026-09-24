import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS } from "../design";

interface Props {
  letter: "S" | "L" | "I" | "M";
  accent: string;
  englishName: string;
  vietnameseName: string;
  /** 1-3 short bullet criteria from Happy Live canonical content. */
  criteria: string[];
  topY?: number;
}

/**
 * Rich letter card: big glass card with single letter + English name +
 * Vietnamese translation + key criteria from Happy Live (William O'Neil source).
 *
 * Used for SLIM letter intro sentences (s09 S, s12 L, s15 I, s18 M).
 * Animation staggers: card → english → vietnamese → criteria.
 */
export const SLIMLetter: React.FC<Props> = ({
  letter,
  accent,
  englishName,
  vietnameseName,
  criteria,
  topY = 380,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered springs per element
  const cardSp = spring({ frame, fps, config: { damping: 10, stiffness: 280 } });
  const enSp = spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 200 } });
  const viSp = spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 200 } });
  const critSp = spring({ frame: frame - 18, fps, config: { damping: 18, stiffness: 160 } });

  const cardScale = interpolate(cardSp, [0, 1], [0.5, 1]);
  const cardOpacity = interpolate(cardSp, [0, 1], [0, 1]);

  const enOpacity = interpolate(enSp, [0, 1], [0, 1]);
  const enDy = interpolate(enSp, [0, 1], [10, 0]);

  const viOpacity = interpolate(viSp, [0, 1], [0, 1]);
  const viDy = interpolate(viSp, [0, 1], [10, 0]);

  const critOpacity = interpolate(critSp, [0, 1], [0, 1]);
  const critDy = interpolate(critSp, [0, 1], [16, 0]);

  const cardSize = 240;

  return (
    <>
      {/* Big letter card */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: topY,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: cardSize,
            height: cardSize,
            borderRadius: 32,
            background: COLORS.bgGlass,
            border: `3px solid ${accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: cardOpacity,
            transform: `scale(${cardScale})`,
            boxShadow: `0 0 80px ${accent}55, inset 0 0 36px ${accent}22`,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.family,
              fontSize: cardSize * 0.62,
              fontWeight: 800,
              color: accent,
              lineHeight: 1,
              textShadow: `0 0 24px ${accent}80`,
            }}
          >
            {letter}
          </div>
        </div>
      </div>

      {/* English name */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: topY + cardSize + 28,
          textAlign: "center",
          opacity: enOpacity,
          transform: `translateY(${enDy}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.family,
            fontSize: 40,
            fontWeight: 600,
            color: COLORS.textSecondary,
            letterSpacing: "0.01em",
            fontStyle: "italic",
          }}
        >
          {englishName}
        </div>
      </div>

      {/* Vietnamese name (accent color, large) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: topY + cardSize + 78,
          textAlign: "center",
          opacity: viOpacity,
          transform: `translateY(${viDy}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.family,
            fontSize: 64,
            fontWeight: 800,
            color: accent,
            letterSpacing: "-0.01em",
            textShadow: `0 0 24px ${accent}40`,
          }}
        >
          {vietnameseName}
        </div>
      </div>

      {/* Criteria bullet list */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: topY + cardSize + 178,
          opacity: critOpacity,
          transform: `translateY(${critDy}px)`,
        }}
      >
        <div
          style={{
            padding: "20px 28px",
            background: COLORS.bgGlass,
            border: `1px solid ${accent}30`,
            borderRadius: 18,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {criteria.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                fontFamily: FONTS.family,
                fontSize: 26,
                fontWeight: 500,
                color: COLORS.textPrimary,
                lineHeight: 1.35,
                letterSpacing: "-0.005em",
              }}
            >
              <span style={{ color: accent, fontWeight: 800 }}>•</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
