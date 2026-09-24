import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Sentence } from "../types";
import { Center, FadeUp, Headline, beatFrames, sp, COLORS, SPRINGS, FONT_STACK } from "./_shared";

// s23 — TURN: vì sao có KFSP (logo reveal, bg sáng/thoáng)
export const SentenceS23: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = sp(frame, fps, SPRINGS.resolve, 4);
  const bright = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 45%, ${COLORS.purple}22 0%, transparent 55%)`, opacity: bright }} />
      <Center gap={28}>
        <div style={{ transform: `scale(${0.7 + 0.3 * Math.min(1, s)})`, opacity: Math.min(1, s) }}>
          <Img src={staticFile("logo-kfsp.png")} style={{ width: 200, height: 200, filter: `drop-shadow(0 0 ${20 + bright * 40}px ${COLORS.purple}aa)` }} />
        </div>
        <Headline size={64} delay={10} cfg={SPRINGS.resolve} parts={[{ t: "Đó là lý do có ", c: COLORS.textPrimary }, { t: "KFSP", c: COLORS.purple }]} />
      </Center>
    </>
  );
};

// s24 — con đường vững vàng vs hỗn loạn
export const SentenceS24: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [10, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Center gap={40}>
      <Headline size={48} cfg={SPRINGS.calm} parts={[{ t: "Con đường " }, { t: "đơn giản, vững vàng, lâu dài.", c: COLORS.green }]} />
      <svg width="800" height="240" viewBox="0 0 800 240">
        {/* chaotic crowd path */}
        <path d="M40,40 C160,160 240,-20 360,120 C480,260 560,0 760,80" fill="none" stroke={COLORS.red} strokeWidth="3" opacity="0.35" strokeDasharray="6 8" />
        {/* steady straight path */}
        <line x1="40" y1="190" x2="760" y2="190" stroke={COLORS.green} strokeWidth="6" strokeDasharray={760} strokeDashoffset={(1 - draw) * 760} />
        <circle cx={40 + draw * 720} cy="190" r="12" fill={COLORS.green} opacity={draw} />
      </svg>
    </Center>
  );
};

// s25 — PAYOFF: 4 tính năng KFSP với screenshot app thật (rhyme s13).
// Mỗi screenshot pop đúng enum beat khi giọng đọc tên tính năng. Nhãn dưới ảnh — không đè chữ lên app.
const FEATURES_S25 = [
  { img: "screens/s1.png", label: "Bản đồ nhiệt", color: COLORS.gold },
  { img: "screens/s2.png", label: "Bộ lọc nhóm ngành", color: COLORS.purple },
  { img: "screens/s3.png", label: "Bảng giá & kỹ thuật", color: COLORS.green },
  { img: "screens/s4.png", label: "Cảnh báo Pivotal", color: COLORS.gold },
];
export const SentenceS25: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const beats = beatFrames(sentence);
  return (
    <Center gap={30}>
      <Headline size={38} cfg={SPRINGS.calm} parts={[{ t: "Trong " }, { t: "KFSP", c: COLORS.purple }, { t: ", đủ 4 yếu tố đúng thời điểm:" }]} />
      <div style={{ display: "grid", gridTemplateColumns: "300px 300px", gap: "24px 40px", fontFamily: FONT_STACK }}>
        {FEATURES_S25.map((f, i) => {
          const bf = beats[i]?.frame ?? i * 90;
          const s = frame >= bf ? Math.min(1, sp(frame, fps, SPRINGS.decisive, bf)) : 0;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                opacity: s,
                transform: `scale(${0.78 + 0.22 * s}) translateY(${(1 - s) * 18}px)`,
              }}
            >
              <div
                style={{
                  width: 300,
                  height: 372,
                  borderRadius: 18,
                  overflow: "hidden",
                  border: `2.5px solid ${f.color}`,
                  boxShadow: `0 0 30px ${f.color}55`,
                }}
              >
                <Img src={staticFile(f.img)} style={{ width: 300, height: 372, objectFit: "cover", objectPosition: "50% 6%" }} />
              </div>
              <div style={{ fontSize: 25, fontWeight: 800, color: f.color }}>{f.label}</div>
            </div>
          );
        })}
      </div>
    </Center>
  );
};

// s26 — callback: rèn kiên nhẫn có chuẩn bị
export const SentenceS26: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = sp(frame, fps, SPRINGS.resolve, 10);
  return (
    <Center gap={26}>
      <Headline size={44} cfg={SPRINGS.soft} parts={[{ t: "Rèn đúng thứ Livermore dạy hơn một thế kỷ trước:", c: COLORS.textSecondary, b: false }]} />
      <div
        style={{
          fontSize: 78,
          fontWeight: 900,
          color: COLORS.purple,
          fontFamily: FONT_STACK,
          opacity: Math.min(1, s),
          transform: `scale(${0.9 + 0.1 * Math.min(1, s)})`,
          textShadow: `0 0 40px ${COLORS.purple}66`,
        }}
      >
        Kiên nhẫn có chuẩn bị.
      </div>
    </Center>
  );
};
