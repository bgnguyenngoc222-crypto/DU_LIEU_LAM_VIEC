import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Sentence } from "../types";
import { Center, FadeUp, Headline, beatFrames, sp, COLORS, SPRINGS, FONT_STACK } from "./_shared";

// s20 — cá nhân khó theo dõi: nhiều panel ngộp, bg tối dần
export const SentenceS20: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const dark = interpolate(frame, [0, 90], [0, 0.55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panels = Array.from({ length: 6 });
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${dark})` }} />
      <Center gap={34}>
        <Headline size={48} cfg={SPRINGS.heavy} parts={[{ t: "Một mình bạn — " }, { t: "rất khó theo dõi tất cả.", c: COLORS.red }]} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, width: "92%" }}>
          {panels.map((_, i) => {
            const on = sp(frame, fps0, SPRINGS.heavy, 6 + i * 4);
            return (
              <div
                key={i}
                style={{
                  height: 120,
                  background: COLORS.bgPanel,
                  border: `1.3px solid ${COLORS.red}44`,
                  borderRadius: 12,
                  opacity: Math.min(1, on),
                  transform: `translateY(${(1 - Math.min(1, on)) * 30}px)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.textMuted,
                  fontFamily: FONT_STACK,
                  fontSize: 22,
                }}
              >
                {["Bảng giá", "Tin tức", "Đồ thị", "Nhóm ngành", "Dòng tiền", "Tín hiệu"][i]}
              </div>
            );
          })}
        </div>
      </Center>
    </>
  );
};
const fps0 = 30;

// s21 — thiếu 3 thứ: 3 ô khoá/xám
export const SentenceS21: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const beats = beatFrames(sentence);
  const labels = ["Thời gian", "Công cụ", "Kinh nghiệm"];
  return (
    <Center gap={30}>
      <Headline size={50} cfg={SPRINGS.soft} parts={[{ t: "Bạn " }, { t: "không có:", c: COLORS.red }]} />
      <div style={{ display: "flex", gap: 18, width: "100%", fontFamily: FONT_STACK }}>
        {labels.map((label, i) => {
          const f = beats[i]?.frame ?? i * 50;
          if (frame < f) return <div key={i} style={{ flex: 1 }} />;
          const s = sp(frame, fps, SPRINGS.heavy, f);
          return (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: Math.min(1, s),
                transform: `scale(${0.8 + 0.2 * Math.min(1, s)})`,
                background: "rgba(255,255,255,0.02)",
                border: `1.5px dashed ${COLORS.red}66`,
                borderRadius: 16,
                padding: "30px 10px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 44, opacity: 0.7 }}>🔒</div>
              <div style={{ fontSize: 28, color: COLORS.textSecondary, fontWeight: 700, marginTop: 10 }}>{label}</div>
            </div>
          );
        })}
      </div>
    </Center>
  );
};

// s22 — cảm xúc len vào
export const SentenceS22: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const seep = interpolate(frame, [0, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 60%, ${COLORS.red}${Math.round(seep * 40).toString(16).padStart(2, "0")} 0%, transparent 60%)` }} />
      <Center gap={30}>
        <Headline size={50} cfg={SPRINGS.heavy} parts={[{ t: "Khoảng trống đó — nơi " }, { t: "cảm xúc len vào.", c: COLORS.red }]} />
        <FadeUp delay={20} cfg={SPRINGS.soft}>
          <div style={{ fontSize: 32, color: COLORS.textMuted, fontFamily: FONT_STACK }}>
            Quyết định lý trí → <span style={{ color: COLORS.red, fontWeight: 800 }}>cú click theo trào lưu</span>
          </div>
        </FadeUp>
      </Center>
    </>
  );
};
