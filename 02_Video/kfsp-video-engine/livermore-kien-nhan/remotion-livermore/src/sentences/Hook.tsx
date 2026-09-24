import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Sentence } from "../types";
import { Center, FadeUp, Headline, Kicker, sp, COLORS, SPRINGS, FONT_STACK } from "./_shared";

// Faint candlestick field background motif (static, low opacity)
const CandleField: React.FC<{ opacity?: number }> = ({ opacity = 0.1 }) => {
  const bars = Array.from({ length: 14 });
  return (
    <div style={{ position: "absolute", inset: 0, opacity, display: "flex", alignItems: "flex-end", gap: 22, padding: "0 80px 520px", justifyContent: "center" }}>
      {bars.map((_, i) => {
        const h = 60 + ((i * 53) % 220);
        const up = (i * 7) % 2 === 0;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 2, height: 30, background: up ? COLORS.green : COLORS.red }} />
            <div style={{ width: 16, height: h, background: up ? COLORS.green : COLORS.red, borderRadius: 3 }} />
            <div style={{ width: 2, height: 24, background: up ? COLORS.green : COLORS.red }} />
          </div>
        );
      })}
    </div>
  );
};

// s01 — Title: Kiên nhẫn là tiền
export const SentenceS01: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const z = sp(frame, fps, SPRINGS.zoom);
  const scale = 1.06 - 0.06 * z; // slow dolly-in
  return (
    <>
      <CandleField opacity={0.12} />
      <div style={{ position: "absolute", inset: 0, transform: `scale(${scale})` }}>
        <Center gap={26}>
          <Kicker text="Bài học đắt giá" color={COLORS.textMuted} delay={4} />
          <Headline
            size={108}
            cfg={SPRINGS.resolve}
            parts={[
              { t: "KIÊN NHẪN ", c: COLORS.textPrimary },
              { t: "LÀ TIỀN", c: COLORS.gold },
            ]}
          />
          <FadeUp delay={16} cfg={SPRINGS.soft}>
            <div style={{ fontSize: 40, fontWeight: 600, color: COLORS.textSecondary, fontFamily: FONT_STACK }}>
              từ <span style={{ color: COLORS.purple, fontWeight: 800 }}>Jesse Livermore</span>
            </div>
          </FadeUp>
        </Center>
      </div>
    </>
  );
};

// s02 — Livermore từng nói
export const SentenceS02: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = sp(frame, fps, SPRINGS.calm);
  return (
    <Center gap={34}>
      <FadeUp cfg={SPRINGS.resolve}>
        <div
          style={{
            transform: `translateX(${(1 - s) * -60}px)`,
            display: "flex",
            alignItems: "center",
            gap: 26,
            padding: "22px 40px",
            background: COLORS.bgPanel,
            border: `1.5px solid ${COLORS.purple}`,
            borderRadius: 20,
            boxShadow: `0 0 32px ${COLORS.purple}33`,
          }}
        >
          <div style={{ fontSize: 92, color: COLORS.purple, fontWeight: 900, lineHeight: 0.6 }}>“</div>
          <div style={{ textAlign: "left", fontFamily: FONT_STACK }}>
            <div style={{ fontSize: 46, fontWeight: 800, color: COLORS.textPrimary }}>Jesse Livermore</div>
            <div style={{ fontSize: 26, color: COLORS.textMuted, letterSpacing: 2 }}>Huyền thoại đầu cơ</div>
          </div>
        </div>
      </FadeUp>
      <Headline size={48} cfg={SPRINGS.soft} delay={10} parts={[{ t: "Một câu mọi nhà đầu tư nên ghi nhớ:", c: COLORS.textSecondary, b: false }]} />
    </Center>
  );
};

// s03 — Quote: ngồi xuống và chờ đợi
export const SentenceS03: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // reveal second clause later (pause-before-key feel)
  const keyP = sp(frame, fps, SPRINGS.resolve, 46);
  return (
    <Center gap={30}>
      <div style={{ fontSize: 130, color: COLORS.gold, fontWeight: 900, lineHeight: 0.4, opacity: 0.5 }}>“</div>
      <Headline
        size={58}
        cfg={SPRINGS.calm}
        parts={[{ t: "Tiền không được tạo ra bằng việc suy nghĩ.", c: COLORS.textPrimary }]}
      />
      <div
        style={{
          fontSize: 58,
          fontWeight: 800,
          lineHeight: 1.2,
          maxWidth: 940,
          color: COLORS.textPrimary,
          opacity: interpolate(keyP, [0, 1], [0.25, 1]),
          transform: `scale(${0.96 + 0.04 * Math.min(1, keyP)})`,
          fontFamily: FONT_STACK,
          textShadow: `0 0 30px ${COLORS.gold}44`,
        }}
      >
        Tiền được tạo ra bằng việc{" "}
        <span style={{ color: COLORS.gold }}>ngồi xuống và chờ đợi.</span>
      </div>
    </Center>
  );
};
