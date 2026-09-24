import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Sentence } from "../types";
import { Center, FadeUp, Headline, EnumStack, PopChip, beatFrames, sp, COLORS, SPRINGS, FONT_STACK } from "./_shared";

// ===== Reusable 4-element CONVERGE (s13 criteria ↔ s25 features rhyme) =====
type ConvNode = { label: string; color: string; frame: number; pivot?: boolean };
export const ConvergeFour: React.FC<{
  nodes: ConvNode[];
  centerLabel: string;
  centerColor: string;
}> = ({ nodes, centerLabel, centerColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const W = 900, H = 540, cx = W / 2, cy = H / 2;
  const pos = [
    { x: cx, y: 56 }, // top
    { x: W - 130, y: cy }, // right
    { x: cx, y: H - 56 }, // bottom
    { x: 130, y: cy }, // left
  ];
  const arrived = nodes.filter((n) => frame >= n.frame).length;
  const centerGlow = arrived / nodes.length;
  return (
    <div style={{ position: "relative", width: W, height: H, fontFamily: FONT_STACK }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {nodes.map((n, i) => {
          const p = pos[i];
          const on = frame >= n.frame ? 1 : 0;
          const prog = interpolate(frame, [n.frame, n.frame + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <line
              key={i}
              x1={p.x}
              y1={p.y}
              x2={cx}
              y2={cy}
              stroke={n.color}
              strokeWidth={2}
              opacity={on * 0.5 * prog}
            />
          );
        })}
      </svg>
      {/* center pivot */}
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: `translate(-50%,-50%) rotate(45deg) scale(${0.6 + 0.5 * centerGlow})`,
          width: 150,
          height: 150,
          borderRadius: 24,
          background: `${centerColor}22`,
          border: `3px solid ${centerColor}`,
          boxShadow: `0 0 ${20 + centerGlow * 60}px ${centerColor}${centerGlow > 0.9 ? "aa" : "44"}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: "translate(-50%,-50%)",
          color: centerColor,
          fontWeight: 800,
          fontSize: 17,
          lineHeight: 1.08,
          letterSpacing: 0.2,
          textAlign: "center",
          width: 104,
          opacity: centerGlow > 0.9 ? 1 : 0.5,
        }}
      >
        {centerLabel}
      </div>
      {/* nodes */}
      {nodes.map((n, i) => {
        const p = pos[i];
        if (frame < n.frame) return null;
        const s = sp(frame, fps, SPRINGS.decisive, n.frame);
        const fromOut = 1 - s;
        const dx = (p.x - cx) * 0.25 * fromOut;
        const dy = (p.y - cy) * 0.25 * fromOut;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${0.7 + 0.3 * s})`,
              opacity: Math.min(1, s),
              width: 230,
            }}
          >
            <div
              style={{
                background: COLORS.bgPanel,
                border: `1.8px solid ${n.color}`,
                borderRadius: 16,
                padding: "16px 14px",
                textAlign: "center",
                color: COLORS.textPrimary,
                fontSize: 27,
                fontWeight: 700,
                boxShadow: `0 0 26px ${n.color}${n.pivot ? "66" : "33"}`,
              }}
            >
              {n.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// s12 — cơ hội không tùy tiện: 3 false signals struck out
export const SentenceS12: React.FC<{ sentence: Sentence }> = ({ sentence }) => (
  <Center gap={26}>
    <Headline size={48} cfg={SPRINGS.soft} parts={[{ t: "Cơ hội " }, { t: "KHÔNG", c: COLORS.red }, { t: " xuất hiện chỉ vì:" }]} />
    <EnumStack sentence={sentence} color={COLORS.red} numbered={false} strike fontSize={34} />
  </Center>
);

// s13 — KEY: 4 yếu tố hội tụ thành điểm Pivot
export const SentenceS13: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const beats = beatFrames(sentence);
  const labels = ["Thị trường chung", "Nhóm ngành dẫn dắt", "Cổ phiếu mạnh", "Điểm Pivotal"];
  const nodes: ConvNode[] = labels.map((label, i) => ({
    label,
    color: i === 3 ? COLORS.gold : COLORS.gold,
    frame: beats[i]?.frame ?? i * 50,
    pivot: i === 3,
  }));
  return (
    <Center gap={20}>
      <Headline size={44} cfg={SPRINGS.calm} parts={[{ t: "Khi " }, { t: "nhiều yếu tố cùng hội tụ:", c: COLORS.gold }]} />
      <ConvergeFour nodes={nodes} centerLabel="ĐIỂM XUỐNG TIỀN" centerColor={COLORS.gold} />
    </Center>
  );
};

// s14 — hành động bằng kế hoạch: checklist unfurl
export const SentenceS14: React.FC<{ sentence: Sentence }> = () => {
  const items = ["Điểm vào đã định", "Điểm dừng lỗ", "Kích thước lệnh"];
  return (
    <Center gap={26}>
      <Headline size={50} cfg={SPRINGS.resolve} parts={[{ t: "Hành động bằng " }, { t: "kế hoạch", c: COLORS.green }, { t: " — không phải cảm xúc." }]} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "82%" }}>
        {items.map((it, i) => (
          <FadeUp key={i} delay={14 + i * 9} cfg={SPRINGS.calm}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: COLORS.bgPanel,
                border: `1.4px solid ${COLORS.green}`,
                borderRadius: 14,
                padding: "16px 22px",
                fontFamily: FONT_STACK,
              }}
            >
              <span style={{ color: COLORS.green, fontSize: 30, fontWeight: 900 }}>✓</span>
              <span style={{ color: COLORS.textPrimary, fontSize: 30, fontWeight: 600 }}>{it}</span>
            </div>
          </FadeUp>
        ))}
      </div>
    </Center>
  );
};

// s15 — THESIS: kiên nhẫn có chuẩn bị (purple)
export const SentenceS15: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = sp(frame, fps, SPRINGS.resolve, 8);
  return (
    <Center gap={24}>
      <FadeUp cfg={SPRINGS.soft}>
        <div style={{ fontSize: 36, color: COLORS.textMuted, fontFamily: FONT_STACK }}>Không phải thụ động —</div>
      </FadeUp>
      <div
        style={{
          fontSize: 86,
          fontWeight: 900,
          color: COLORS.purple,
          fontFamily: FONT_STACK,
          transform: `scale(${0.85 + 0.15 * Math.min(1, glow)})`,
          textShadow: `0 0 ${30 + glow * 50}px ${COLORS.purple}66`,
          lineHeight: 1.1,
        }}
      >
        KIÊN NHẪN<br />CÓ CHUẨN BỊ
      </div>
    </Center>
  );
};

// s16 — việc làm mỗi ngày: 5 routine checks
export const SentenceS16: React.FC<{ sentence: Sentence }> = ({ sentence }) => (
  <Center gap={18}>
    <Headline size={44} cfg={SPRINGS.soft} parts={[{ t: "Mỗi ngày, bạn:" }]} />
    <EnumStack sentence={sentence} color={COLORS.green} numbered fontSize={30} gap={14} />
  </Center>
);

// s17 — đòi cơ hội mỗi ngày: calendar impatience
export const SentenceS17: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const shake = Math.sin(frame / 3) * interpolate(frame, [10, 30], [0, 4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Center gap={34}>
      <Headline size={48} cfg={SPRINGS.soft} parts={[{ t: "Sai lầm: đòi thị trường " }, { t: "trao cơ hội mỗi ngày.", c: COLORS.red }]} />
      <div style={{ display: "flex", gap: 12, transform: `translateX(${shake}px)`, fontFamily: FONT_STACK }}>
        {["T2", "T3", "T4", "T5", "T6"].map((d, i) => (
          <div key={i} style={{ width: 96, height: 110, background: COLORS.bgPanel, border: `1.4px solid ${COLORS.red}55`, borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 24, color: COLORS.textMuted }}>{d}</div>
            <div style={{ fontSize: 40, color: COLORS.red, fontWeight: 900 }}>?</div>
          </div>
        ))}
      </div>
    </Center>
  );
};

// s18 — thương vụ lớn hiếm: sparse stars
export const SentenceS18: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  return (
    <Center gap={40}>
      <Headline size={56} cfg={SPRINGS.calm} parts={[{ t: "Thương vụ lớn " }, { t: "không đến thường xuyên.", c: COLORS.gold }]} />
      <div style={{ width: 760, height: 80, position: "relative", borderTop: `2px solid ${COLORS.border}` }}>
        {[120, 420, 660].map((x, i) => {
          const on = interpolate(frame, [10 + i * 6, 20 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ position: "absolute", left: x, top: 10, fontSize: 44, color: COLORS.gold, opacity: on, transform: `scale(${on})` }}>★</div>
          );
        })}
      </div>
    </Center>
  );
};

// s19 — cần thời gian: hình thành → phát triển → xác nhận
export const SentenceS19: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const beats = beatFrames(sentence);
  const heights = [60, 110, 170];
  return (
    <Center gap={36}>
      <Headline size={46} cfg={SPRINGS.soft} parts={[{ t: "Cần thời gian để hình thành." }]} />
      <div style={{ display: "flex", alignItems: "flex-end", gap: 40, height: 220, fontFamily: FONT_STACK }}>
        {beats.map((b, i) => {
          if (frame < b.frame) return <div key={i} style={{ width: 150 }} />;
          const s = sp(frame, fps, SPRINGS.soft, b.frame);
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 70, height: heights[i] * Math.min(1, s), background: `linear-gradient(180deg, ${COLORS.green}, ${COLORS.green}55)`, borderRadius: 10, opacity: Math.min(1, s) }} />
              <div style={{ fontSize: 26, color: COLORS.green, fontWeight: 700, opacity: Math.min(1, s) }}>{b.item}</div>
            </div>
          );
        })}
      </div>
    </Center>
  );
};
