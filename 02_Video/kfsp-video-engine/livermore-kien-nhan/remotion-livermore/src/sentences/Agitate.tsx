import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Sentence } from "../types";
import { Center, FadeUp, Headline, sp, COLORS, SPRINGS, FONT_STACK } from "./_shared";

// s07 — thị trường không trả cho bận rộn: flatline
export const SentenceS07: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = interpolate(frame, [6, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cross = sp(frame, fps, SPRINGS.resolve, 28);
  return (
    <Center gap={40}>
      <Headline size={56} parts={[{ t: "Thị trường " }, { t: "không trả tiền", c: COLORS.red }, { t: " cho sự bận rộn." }]} cfg={SPRINGS.calm} />
      <div style={{ width: 760, height: 160, position: "relative" }}>
        <svg width="760" height="160" viewBox="0 0 760 160">
          {/* frantic activity that flattens */}
          <path
            d="M0,80 L60,30 L100,120 L140,40 L180,110 L220,55 L260,95 L300,80 L760,80"
            fill="none"
            stroke={COLORS.red}
            strokeWidth="4"
            strokeDasharray={1200}
            strokeDashoffset={(1 - draw) * 1200}
            opacity={0.9}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 44,
            fontSize: 64,
            color: COLORS.red,
            fontWeight: 900,
            opacity: cross,
            transform: `scale(${0.6 + 0.4 * cross})`,
            fontFamily: FONT_STACK,
          }}
        >
          ✕
        </div>
      </div>
    </Center>
  );
};

// s08 — trả cho đúng thời điểm: clock lights up at the right moment
export const SentenceS08: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hit = sp(frame, fps, SPRINGS.decisive, 16);
  return (
    <Center gap={40}>
      <Headline size={56} parts={[{ t: "Chỉ trả cho " }, { t: "quyết định đúng thời điểm.", c: COLORS.gold }]} cfg={SPRINGS.resolve} />
      <div style={{ position: "relative", width: 200, height: 200 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `5px solid ${COLORS.gold}`,
            boxShadow: `0 0 ${20 + hit * 50}px ${COLORS.gold}${hit > 0.4 ? "88" : "33"}`,
          }}
        />
        {/* hand snaps to 12 */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "50%",
            width: 5,
            height: 78,
            background: COLORS.gold,
            transformOrigin: "bottom",
            transform: `translateX(-50%) rotate(${interpolate(hit, [0, 1], [220, 360])}deg)`,
            borderRadius: 3,
          }}
        />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 16, height: 16, background: COLORS.gold, borderRadius: "50%", transform: "translate(-50%,-50%)" }} />
      </div>
    </Center>
  );
};

// s09 — tiền mặt là vị thế: cash card glows alongside stock cards
export const SentenceS09: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lift = sp(frame, fps, SPRINGS.calm, 12);
  const card = (label: string, active: boolean, delay: number) => (
    <FadeUp delay={delay} cfg={SPRINGS.soft} style={{ flex: 1 }}>
      <div
        style={{
          background: COLORS.bgPanel,
          border: `1.6px solid ${active ? COLORS.gold : COLORS.border}`,
          borderRadius: 18,
          padding: "34px 14px",
          textAlign: "center",
          boxShadow: active ? `0 0 34px ${COLORS.gold}44` : "none",
          transform: active ? `translateY(${(1 - lift) * 30}px) scale(${0.96 + 0.04 * lift})` : "none",
        }}
      >
        <div style={{ fontSize: 38, fontWeight: 800, color: active ? COLORS.gold : COLORS.textSecondary }}>{label}</div>
      </div>
    </FadeUp>
  );
  return (
    <Center gap={34}>
      <Headline size={52} parts={[{ t: "Tiền mặt cũng là " }, { t: "một vị thế.", c: COLORS.gold }]} cfg={SPRINGS.calm} />
      <div style={{ display: "flex", gap: 18, width: "100%", fontFamily: FONT_STACK }}>
        {card("Cổ phiếu", false, 2)}
        {card("Tiền mặt", true, 8)}
        {card("Chờ", false, 5)}
      </div>
    </Center>
  );
};

// s10 — đứng ngoài ≠ bỏ lỡ
export const SentenceS10: React.FC<{ sentence: Sentence }> = () => {
  return (
    <Center gap={30}>
      <Headline
        size={60}
        cfg={SPRINGS.calm}
        parts={[{ t: "Đứng ngoài " }, { t: "không phải", c: COLORS.green }, { t: " là bỏ lỡ cơ hội." }]}
      />
      <FadeUp delay={12} cfg={SPRINGS.soft}>
        <div style={{ fontSize: 30, color: COLORS.textMuted, fontFamily: FONT_STACK }}>
          Bình tĩnh quan sát — không FOMO
        </div>
      </FadeUp>
    </Center>
  );
};

// s11 — chờ lợi thế nghiêng về mình: balance scale tilts
export const SentenceS11: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tilt = sp(frame, fps, SPRINGS.soft, 24);
  const deg = interpolate(tilt, [0, 1], [0, -12]);
  return (
    <Center gap={44}>
      <Headline
        size={50}
        cfg={SPRINGS.calm}
        parts={[{ t: "Chờ đến lúc " }, { t: "lợi thế nghiêng về phía mình.", c: COLORS.gold }]}
      />
      <div style={{ width: 420, height: 200, position: "relative" }}>
        {/* fulcrum */}
        <div style={{ position: "absolute", left: "50%", bottom: 0, width: 12, height: 120, background: COLORS.textMuted, transform: "translateX(-50%)" }} />
        {/* beam */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 64,
            width: 360,
            height: 8,
            background: COLORS.gold,
            borderRadius: 4,
            transform: `translateX(-50%) rotate(${deg}deg)`,
            transformOrigin: "center",
            boxShadow: `0 0 24px ${COLORS.gold}55`,
          }}
        />
        <div style={{ position: "absolute", left: 40, top: 90 + deg * 4, fontSize: 28, color: COLORS.gold, fontWeight: 800, fontFamily: FONT_STACK }}>Bạn</div>
        <div style={{ position: "absolute", right: 30, top: 50 - deg * 4, fontSize: 26, color: COLORS.textMuted, fontFamily: FONT_STACK }}>Rủi ro</div>
      </div>
    </Center>
  );
};
