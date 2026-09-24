import { AbsoluteFill } from "remotion";
import { Sentence } from "../types";
import { COLORS, FONT_STACK, SAFE_ZONE } from "../design";
import { Background } from "../components/Background";

// Generic placeholder for sentences chưa implement.
// Hiển thị id + phase + main_idea + display text.
export const PlaceholderSentence: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  return (
    <AbsoluteFill>
      <Background />
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: `${SAFE_ZONE.contentTop}px 80px ${1920 - SAFE_ZONE.contentBottom}px 80px`,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_STACK,
          color: COLORS.textPrimary,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 20px",
            background: COLORS.bgPanel,
            border: `1px solid ${COLORS.borderStrong}`,
            borderRadius: 999,
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: COLORS.purple,
            fontWeight: 700,
          }}
        >
          {sentence.phase} · {sentence.id}
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: COLORS.gold,
            lineHeight: 1.2,
            maxWidth: 800,
          }}
        >
          {sentence.main_idea}
        </div>
        <div
          style={{
            fontSize: 22,
            lineHeight: 1.5,
            color: COLORS.textSecondary,
            maxWidth: 880,
          }}
        >
          {sentence.display}
        </div>
        <div
          style={{
            fontSize: 14,
            color: COLORS.textMuted,
            letterSpacing: 2,
          }}
        >
          (placeholder — TBD storyboard)
        </div>
      </div>
    </AbsoluteFill>
  );
};
