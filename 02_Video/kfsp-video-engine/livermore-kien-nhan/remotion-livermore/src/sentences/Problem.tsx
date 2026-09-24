import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Sentence } from "../types";
import { Center, FadeUp, Headline, EnumStack, sp, COLORS, SPRINGS, FONT_STACK } from "./_shared";

// s04 — dễ bị hiểu nhầm: quote cracks
export const SentenceS04: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const crack = sp(frame, fps, SPRINGS.heavy, 6);
  return (
    <Center gap={36}>
      <Headline size={62} parts={[{ t: "Một câu nói sâu sắc…" }]} cfg={SPRINGS.calm} />
      <div style={{ position: "relative", fontFamily: FONT_STACK }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: COLORS.red,
            opacity: interpolate(crack, [0, 1], [0, 1]),
            transform: `translateY(${(1 - crack) * 30}px)`,
            textShadow: `0 0 28px ${COLORS.red}55`,
          }}
        >
          nhưng dễ bị hiểu nhầm
        </div>
      </div>
    </Center>
  );
};

// s05 — càng nhiều càng lời? — 3 hoạt động dồn dập (red), rơi xuống
export const SentenceS05: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  return (
    <Center gap={26} justify="center">
      <Headline size={50} parts={[{ t: "Càng nhiều — càng gần lợi nhuận?", c: COLORS.textSecondary, b: false }]} cfg={SPRINGS.soft} />
      <EnumStack sentence={sentence} color={COLORS.red} numbered fontSize={36} />
    </Center>
  );
};

// s06 — nhầm bận rộn = hiệu quả: 2 cột ≠
export const SentenceS06: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const neq = sp(frame, fps, SPRINGS.resolve, 14);
  const col = (label: string, sub: string, color: string, delay: number) => (
    <FadeUp delay={delay} cfg={SPRINGS.calm} style={{ flex: 1 }}>
      <div
        style={{
          background: COLORS.bgPanel,
          border: `1.5px solid ${color}`,
          borderRadius: 20,
          padding: "40px 20px",
          textAlign: "center",
          boxShadow: `0 0 26px ${color}22`,
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 800, color }}>{label}</div>
        <div style={{ fontSize: 26, color: COLORS.textMuted, marginTop: 8 }}>{sub}</div>
      </div>
    </FadeUp>
  );
  return (
    <Center gap={30}>
      <Headline size={46} parts={[{ t: "Họ nhầm lẫn:", c: COLORS.textSecondary, b: false }]} cfg={SPRINGS.soft} />
      <div style={{ display: "flex", alignItems: "center", gap: 24, width: "100%", fontFamily: FONT_STACK }}>
        {col("Bận rộn", "giao dịch liên tục", COLORS.red, 4)}
        <div
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: COLORS.gold,
            transform: `scale(${0.5 + 0.5 * neq})`,
            opacity: neq,
          }}
        >
          ≠
        </div>
        {col("Hiệu quả", "quyết định đúng", COLORS.green, 8)}
      </div>
    </Center>
  );
};
