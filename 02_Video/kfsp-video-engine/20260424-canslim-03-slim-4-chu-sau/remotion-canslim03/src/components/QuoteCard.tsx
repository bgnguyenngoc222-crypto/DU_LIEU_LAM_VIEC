import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONTS } from "../design";

interface Props {
  english: string;
  vietnamese?: string;
  highlightWord?: string;
  topY?: number;
}

export const QuoteCard: React.FC<Props> = ({
  english,
  vietnamese,
  highlightWord = "present",
  topY = 540,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const sp = spring({ frame, fps, config: { damping: 18, stiffness: 100 } });
  const opacity = interpolate(sp, [0, 1], [0, 1]);
  const blur = interpolate(sp, [0, 1], [12, 0]);

  // Highlight progresses near end of duration
  const highlightOpacity = interpolate(
    frame,
    [durationInFrames * 0.55, durationInFrames * 0.7],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const englishWithHighlight = english.split(new RegExp(`(${highlightWord})`, "i"));

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: topY,
        textAlign: "center",
        opacity,
        filter: `blur(${blur}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.family,
          fontSize: 52,
          fontWeight: 600,
          lineHeight: 1.3,
          color: COLORS.textPrimary,
          fontStyle: "italic",
          letterSpacing: "-0.01em",
        }}
      >
        “
        {englishWithHighlight.map((piece, i) => {
          const isHL = piece.toLowerCase() === highlightWord.toLowerCase();
          return (
            <span
              key={i}
              style={
                isHL
                  ? {
                      color: COLORS.presentGold,
                      textShadow: `0 0 24px ${COLORS.presentGold}80`,
                      opacity: 0.4 + 0.6 * highlightOpacity,
                      fontWeight: 800,
                      fontStyle: "normal",
                    }
                  : {}
              }
            >
              {piece}
            </span>
          );
        })}
        ”
      </div>
      {vietnamese ? (
        <div
          style={{
            marginTop: 32,
            fontFamily: FONTS.family,
            fontSize: 36,
            color: COLORS.textSecondary,
            fontWeight: 500,
            lineHeight: 1.35,
          }}
        >
          {vietnamese}
        </div>
      ) : null}
    </div>
  );
};
