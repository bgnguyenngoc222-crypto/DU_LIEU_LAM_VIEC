import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { Sentence, EnumBeat } from "../types";
import { COLORS, SPRINGS, FONT_STACK } from "../design";
import { Background } from "../components/Background";
import { Stage } from "../components/Stage";

function findEnumFrame(beats: EnumBeat[] | undefined, item: string): number | null {
  return beats?.find((b) => b.item === item)?.frame_30fps ?? null;
}

// =============================================================
// s16 — 3 video cards: CAN, SLIM, Lộ trình
// =============================================================
export const SentenceS16: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f1 = findEnumFrame(sentence.enum_beats, "CAN") ?? 48;
  const f2 = findEnumFrame(sentence.enum_beats, "SLIM") ?? 78;
  const f3 = findEnumFrame(sentence.enum_beats, "thực hành") ?? 122;

  const Card: React.FC<{
    num: string;
    title: string;
    accent: string;
    popAt: number;
  }> = ({ num, title, accent, popAt }) => {
    const s = spring({ frame: frame - popAt, fps, config: SPRINGS.decisive });
    if (frame < popAt) return <div style={{ width: 240 }} />;
    return (
      <div
        style={{
          width: 240,
          height: 380,
          borderRadius: 20,
          background: COLORS.bgPanel,
          border: `2px solid ${accent}`,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          opacity: Math.max(0, Math.min(1, s)),
          transform: `scale(${0.7 + 0.3 * s})`,
          boxShadow: `0 0 30px ${accent}55`,
        }}
      >
        <div
          style={{
            color: accent,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
          }}
        >
          {num}
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            color: accent,
            letterSpacing: 4,
            textShadow: `0 0 20px ${accent}66`,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: 20,
            color: COLORS.textMuted,
          }}
        >
          ▶
        </div>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
      <Background />
      <Stage>
        <div style={{ fontSize: 38, color: COLORS.textSecondary, marginBottom: 30, letterSpacing: 2 }}>
          MẤY VIDEO TỚI
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <Card num="VIDEO #02" title="CAN" accent={COLORS.purple} popAt={f1} />
          <Card num="VIDEO #03" title="SLIM" accent={COLORS.gold} popAt={f2} />
          <Card num="VIDEO #04" title="LỘ TRÌNH" accent={COLORS.green} popAt={f3} />
        </div>
      </Stage>
    </AbsoluteFill>
  );
};

// =============================================================
// s17 — Subscribe button
// =============================================================
export const SentenceS17: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sub = spring({ frame, fps, config: SPRINGS.decisive });
  const pulse = 1 + 0.04 * Math.sin((frame / fps) * Math.PI * 4);

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
      <Background />
      <Stage>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
            opacity: Math.max(0, Math.min(1, sub)),
            transform: `scale(${0.7 + 0.3 * sub})`,
          }}
        >
          <div
            style={{
              padding: "30px 60px",
              borderRadius: 60,
              background: `linear-gradient(135deg, ${COLORS.gold}, #f59e0b)`,
              color: "#0a1628",
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: 3,
              transform: `scale(${pulse})`,
              boxShadow: `0 0 50px ${COLORS.gold}88`,
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            🔔 THEO DÕI
          </div>
          <div style={{ fontSize: 30, color: COLORS.textSecondary }}>
            đừng bỏ lỡ nha
          </div>
          {/* Cursor */}
          <div
            style={{
              fontSize: 60,
              transform: `translate(60px, -120px) scale(${1 + 0.08 * Math.sin((frame / fps) * Math.PI * 6)})`,
            }}
          >
            👆
          </div>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
