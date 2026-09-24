import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing, staticFile, Img } from "remotion";
import { COLORS, FONTS, SAFE, SPRINGS, VIDEO } from "./design";
import { BigText, GlassCard, PillChip, Spotlight, fadeIn, useSpring } from "./components/Helpers";

// Helper: get word start time (sec) for a given word substring (case-insensitive contains).
// Falls back to evenly-distributed fallback if not found.
type WT = { word: string; start: number; end: number };
const findWordTime = (words: WT[], match: string): number | null => {
  const m = match.toLowerCase();
  for (const w of words) {
    if (w.word.toLowerCase().replace(/[.,!?…"]/g, "").trim().includes(m)) return w.start;
  }
  return null;
};

const enumStarts = (words: WT[], items: string[]): number[] => {
  const cursor: { idx: number } = { idx: 0 };
  const out: number[] = [];
  for (const item of items) {
    const m = item.toLowerCase().split(" ")[0];
    let found: number | null = null;
    for (let i = cursor.idx; i < words.length; i++) {
      const wnorm = words[i].word.toLowerCase().replace(/[.,!?…"]/g, "").trim();
      if (wnorm.includes(m) || m.includes(wnorm)) {
        found = words[i].start;
        cursor.idx = i + 1;
        break;
      }
    }
    if (found === null) {
      // fallback: evenly distribute
      const lastT = words[words.length - 1]?.end ?? 1;
      found = (lastT * (out.length + 1)) / (items.length + 1);
    }
    out.push(found);
  }
  return out;
};

// ─────────────────────────────────────────────────────────────────
// HOOK: s01 — Buffett quote thủ thư thư viện
// ─────────────────────────────────────────────────────────────────
export const V_s01: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dolly = spring({ frame, fps, config: SPRINGS.zoom });
  const opacity = fadeIn(frame, 4, 16);

  return (
    <>
      {/* Bookshelf bg illustration (text-based) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.10,
          fontSize: 36,
          color: "white",
          fontFamily: "monospace",
          letterSpacing: 4,
          padding: "300px 60px",
          lineHeight: 1.5,
          userSelect: "none",
        }}
      >
        {Array.from({ length: 12 })
          .map(() => "█▌▎ ▎▌█ ▎█▌ ▎ ▌▎█ ▎ ▌█▎ ▌▎ █ ▎▌█ ▎▌ █ ▎█▌▎")
          .join("\n")}
      </div>

      {/* Buffett portrait — circular frame with black bg to mask bg-removal artifacts */}
      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 200,
          top: 320,
          width: 400,
          height: 400,
          transform: `scale(${0.85 + dolly * 0.15})`,
          opacity,
        }}
      >
        {/* Soft gold glow halo behind */}
        <div
          style={{
            position: "absolute",
            inset: -30,
            borderRadius: "50%",
            background: `radial-gradient(circle at center, ${COLORS.gold}44 0%, ${COLORS.gold}00 70%)`,
            filter: "blur(28px)",
          }}
        />
        {/* Circular frame */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            background: "#000000",
            border: `4px solid ${COLORS.gold}`,
            boxShadow: `0 0 40px ${COLORS.gold}66, inset 0 0 30px rgba(0,0,0,0.6)`,
          }}
        >
          <Img
            src={staticFile("images/buffett.png")}
            style={{
              position: "absolute",
              width: "150%",
              height: "150%",
              left: "-22%",
              top: "-8%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 700,
          width: VIDEO.width,
          textAlign: "center",
          color: COLORS.gold,
          fontFamily: FONTS.family,
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 3,
          opacity,
        }}
      >
        WARREN BUFFETT
      </div>

      {/* Quote box */}
      <GlassCard
        x={SAFE.leftSafe}
        y={780}
        w={VIDEO.width - SAFE.leftSafe * 2}
        style={{
          borderColor: `${COLORS.gold}66`,
          background: "rgba(20,15,8,0.55)",
          opacity,
        }}
      >
        <div style={{ fontSize: 38, fontWeight: 600, lineHeight: 1.4, color: "white" }}>
          <span style={{ color: COLORS.gold, fontSize: 64, fontWeight: 800, lineHeight: 0.5 }}>"</span>
          {" "}Nếu đầu tư chỉ là nhìn vào{" "}
          <span style={{ color: COLORS.gold, fontWeight: 800 }}>quá khứ</span>, thì các{" "}
          <span style={{ color: COLORS.gold, fontWeight: 800 }}>thủ thư ở thư viện</span>{" "}
          đã là những nhà đầu tư thành công nhất rồi.
          <span style={{ color: COLORS.gold, fontSize: 64, fontWeight: 800, lineHeight: 0.5 }}>"</span>
        </div>
      </GlassCard>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s02 — "Quá khứ tốt — chưa đủ." Pattern interrupt
// ─────────────────────────────────────────────────────────────────
export const V_s02: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // "QUÁ KHỨ TỐT" snap in first half, strikethrough then "CHƯA ĐỦ" snap second half
  const halfFrame = Math.round(words[words.length - 1]?.end * fps * 0.5);
  const s1 = spring({ frame, fps, config: SPRINGS.resolve });
  const s2 = spring({ frame: frame - halfFrame, fps, config: SPRINGS.resolve });
  const strikeProgress = interpolate(frame, [halfFrame - 4, halfFrame + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 720,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 130,
          fontWeight: 900,
          color: "white",
          letterSpacing: -2,
          transform: `scale(${0.8 + s1 * 0.2})`,
          opacity: s1,
        }}
      >
        QUÁ KHỨ TỐT
        {/* Strikethrough */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: VIDEO.width / 2 - 350,
            width: 700 * strikeProgress,
            height: 8,
            background: COLORS.red,
            borderRadius: 4,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 920,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 150,
          fontWeight: 900,
          color: COLORS.red,
          letterSpacing: -2,
          transform: `scale(${0.7 + s2 * 0.3}) translateY(${(1 - s2) * 40}px)`,
          opacity: s2,
          textShadow: `0 0 50px ${COLORS.red}88`,
        }}
      >
        CHƯA ĐỦ
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s03 — Cần kỳ vọng tương lai
// ─────────────────────────────────────────────────────────────────
export const V_s03: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sLeft = spring({ frame, fps, config: SPRINGS.calm });
  const sRight = spring({ frame: frame - 18, fps, config: SPRINGS.resolve });
  const sPlus = spring({ frame: frame - 12, fps, config: SPRINGS.calm });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: -100 }}>
        <div
          style={{
            padding: "48px 56px",
            background: "rgba(120,120,140,0.10)",
            border: `2px solid ${COLORS.textSecondary}`,
            borderRadius: 22,
            color: COLORS.textSecondary,
            fontFamily: FONTS.family,
            fontWeight: 700,
            fontSize: 54,
            letterSpacing: 1,
            opacity: 0.4 + sLeft * 0.2,
            transform: `scale(${0.9 + sLeft * 0.1})`,
          }}
        >
          QUÁ KHỨ
          <div style={{ fontSize: 28, fontWeight: 500, marginTop: 8, opacity: 0.7 }}>tốt ✓</div>
        </div>
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: COLORS.gold,
            transform: `scale(${0.5 + sPlus * 0.5})`,
            opacity: sPlus,
          }}
        >
          +
        </div>
        <div
          style={{
            padding: "48px 56px",
            background: `${COLORS.green}1a`,
            border: `3px solid ${COLORS.green}`,
            borderRadius: 22,
            color: COLORS.green,
            fontFamily: FONTS.family,
            fontWeight: 800,
            fontSize: 60,
            letterSpacing: 1,
            transform: `scale(${0.7 + sRight * 0.3}) translateY(${(1 - sRight) * 30}px)`,
            opacity: sRight,
            boxShadow: `0 0 50px ${COLORS.green}55`,
          }}
        >
          KỲ VỌNG
          <div style={{ fontSize: 32, fontWeight: 600, marginTop: 8 }}>tương lai ✨</div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// s04 — CAN = quá khứ + tương lai (merge animation)
// ─────────────────────────────────────────────────────────────────
export const V_s04: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Merge cards then CAN pop
  const sMerge = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const canStart = Math.round((findWordTime(words, "can") ?? 1.2) * fps);
  const sCAN = spring({ frame: frame - canStart, fps, config: SPRINGS.resolve });
  const slimStart = canStart + 25;
  const sSLIM = spring({ frame: frame - slimStart, fps, config: SPRINGS.calm });

  const leftX = interpolate(sMerge, [0, 1], [120, VIDEO.width / 2 - 240]);
  const rightX = interpolate(sMerge, [0, 1], [VIDEO.width - 120 - 200, VIDEO.width / 2 + 40]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: leftX,
          top: 700,
          width: 200,
          padding: "20px",
          background: "rgba(120,120,140,0.10)",
          border: `2px solid ${COLORS.textSecondary}`,
          borderRadius: 16,
          color: COLORS.textSecondary,
          fontFamily: FONTS.family,
          fontWeight: 700,
          fontSize: 28,
          textAlign: "center",
          opacity: 1 - sCAN * 0.7,
        }}
      >
        QUÁ KHỨ
      </div>
      <div
        style={{
          position: "absolute",
          left: rightX,
          top: 700,
          width: 200,
          padding: "20px",
          background: `${COLORS.green}1a`,
          border: `2px solid ${COLORS.green}`,
          borderRadius: 16,
          color: COLORS.green,
          fontFamily: FONTS.family,
          fontWeight: 700,
          fontSize: 28,
          textAlign: "center",
          opacity: 1 - sCAN * 0.7,
        }}
      >
        TƯƠNG LAI
      </div>

      {/* CAN big chip */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 850,
          width: VIDEO.width,
          textAlign: "center",
          transform: `scale(${0.5 + sCAN * 0.5})`,
          opacity: sCAN,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 80px",
            background: `linear-gradient(135deg, ${COLORS.gold} 0%, #d4a02a 100%)`,
            color: "#1a1410",
            fontFamily: FONTS.family,
            fontWeight: 900,
            fontSize: 200,
            letterSpacing: 8,
            borderRadius: 28,
            boxShadow: `0 12px 60px ${COLORS.gold}88`,
          }}
        >
          CAN
        </div>
      </div>

      {/* CANSLIM full */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1180,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontWeight: 900,
          fontSize: 90,
          opacity: sSLIM,
          letterSpacing: 6,
          transform: `translateY(${(1 - sSLIM) * 20}px)`,
        }}
      >
        <span style={{ color: COLORS.gold }}>CAN</span>
        <span style={{ color: COLORS.textMute, opacity: 0.5 }}>SLIM</span>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s05 — C, A trượt trái / N trượt phải (icon gương + kính chắn gió)
// ─────────────────────────────────────────────────────────────────
export const V_s05: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 2 split: C and A on the left (past), N on the right (future)
  const tC = (findWordTime(words, "c") ?? 0.2) * fps;
  const tN = (findWordTime(words, "n") ?? 2.0) * fps;
  const sLeft = spring({ frame: frame - tC, fps, config: SPRINGS.calm });
  const sRight = spring({ frame: frame - tN, fps, config: SPRINGS.resolve });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 60 - (1 - sLeft) * 200,
          top: 620,
          width: VIDEO.width / 2 - 80,
          padding: "26px 18px",
          background: "rgba(120,120,140,0.10)",
          border: `2px solid ${COLORS.textSecondary}`,
          borderRadius: 22,
          textAlign: "center",
          opacity: sLeft,
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 6 }}>🪞</div>
        <div style={{ fontFamily: FONTS.family, fontSize: 72, fontWeight: 900, color: COLORS.textSecondary, letterSpacing: 4 }}>
          C · A
        </div>
        <div style={{ fontFamily: FONTS.family, fontSize: 18, fontWeight: 700, color: COLORS.textMute, marginTop: 14, letterSpacing: 1, lineHeight: 1.35 }}>
          Current Quarterly Earnings<br />Annual Earnings Growth
        </div>
        <div style={{ fontFamily: FONTS.family, fontSize: 19, fontWeight: 700, color: COLORS.textSecondary, marginTop: 10, lineHeight: 1.35 }}>
          Lợi nhuận Quý<br />+ Lợi nhuận Năm
        </div>
        <div style={{ fontFamily: FONTS.family, fontSize: 26, fontWeight: 800, color: COLORS.textMute, marginTop: 14, letterSpacing: 3 }}>
          QUÁ KHỨ
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 + 20 + (1 - sRight) * 200,
          top: 620,
          width: VIDEO.width / 2 - 80,
          padding: "26px 18px",
          background: `${COLORS.green}1a`,
          border: `3px solid ${COLORS.green}`,
          borderRadius: 22,
          textAlign: "center",
          opacity: sRight,
          boxShadow: `0 0 50px ${COLORS.green}55`,
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 6 }}>🚗</div>
        <div style={{ fontFamily: FONTS.family, fontSize: 50, fontWeight: 900, color: COLORS.green, letterSpacing: 1, lineHeight: 1.05 }}>
          YẾU TỐ<br />MỚI
        </div>
        <div style={{ fontFamily: FONTS.family, fontSize: 18, fontWeight: 700, color: `${COLORS.green}cc`, marginTop: 14, letterSpacing: 1, lineHeight: 1.35 }}>
          New Products<br />New Management<br />New Highs
        </div>
        <div style={{ fontFamily: FONTS.family, fontSize: 19, fontWeight: 700, color: COLORS.green, marginTop: 10, lineHeight: 1.35 }}>
          Sản phẩm · Lãnh đạo<br />· Đỉnh giá MỚI
        </div>
        <div style={{ fontFamily: FONTS.family, fontSize: 26, fontWeight: 800, color: COLORS.green, marginTop: 14, letterSpacing: 3 }}>
          TƯƠNG LAI
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s06 — Recap thumbnail FA #11
// ─────────────────────────────────────────────────────────────────
export const V_s06: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const sCard = spring({ frame, fps: 30, config: SPRINGS.calm });
  const sBadge = spring({ frame: frame - 14, fps: 30, config: SPRINGS.resolve });

  return (
    <>
      {/* Thumbnail mock card */}
      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 360,
          top: 600,
          width: 720,
          height: 480,
          background: "linear-gradient(135deg, #1a2a4a 0%, #0f1a30 100%)",
          border: `2px solid ${COLORS.purple}`,
          borderRadius: 24,
          padding: 30,
          color: "white",
          fontFamily: FONTS.family,
          opacity: sCard,
          transform: `translateX(${(1 - sCard) * -80}px) scale(${0.92 + sCard * 0.08})`,
          boxShadow: `0 16px 60px ${COLORS.purple}33`,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.purple, letterSpacing: 2 }}>
          📺 VIDEO TRƯỚC ĐÓ
        </div>
        <div style={{ fontSize: 64, fontWeight: 900, marginTop: 30, lineHeight: 1.05 }}>
          11 TIÊU CHÍ<br />PHÂN TÍCH<br />CƠ BẢN
        </div>
        <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["Doanh thu", "EPS", "ROE", "PE", "+7…"].map((t, i) => (
            <span
              key={i}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Badge "ĐÃ XEM" */}
      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 + 200,
          top: 580,
          padding: "10px 18px",
          background: COLORS.green,
          color: "#0a1628",
          fontFamily: FONTS.family,
          fontWeight: 800,
          fontSize: 24,
          borderRadius: 8,
          transform: `rotate(-8deg) scale(${sBadge})`,
          opacity: sBadge,
          boxShadow: `0 8px 20px ${COLORS.green}66`,
        }}
      >
        ✓ ĐÃ XEM
      </div>

      {/* C + A circle highlight */}
      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 + 280,
          top: 1100,
          fontSize: 90,
          fontWeight: 900,
          color: COLORS.gold,
          textShadow: `0 0 40px ${COLORS.gold}88`,
          opacity: spring({ frame: frame - 30, fps: 30, config: SPRINGS.resolve }),
          fontFamily: FONTS.family,
        }}
      >
        C · A
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s07 — 3 chỉ tiêu CANSLIM (Doanh thu / EPS / ROE) enum stagger
// ─────────────────────────────────────────────────────────────────
export const V_s07: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = [
    { label: "Doanh thu", icon: "📈", color: COLORS.green },
    { label: "EPS", icon: "💰", color: COLORS.gold },
    { label: "ROE", icon: "🎯", color: COLORS.purple },
  ];
  // All 3 chips appear at once (no per-word stagger)
  const sPop = spring({ frame, fps, config: SPRINGS.resolve });

  return (
    <div style={{ position: "absolute", left: 0, top: 700, width: VIDEO.width, display: "flex", flexDirection: "column", gap: 30, alignItems: "center" }}>
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            padding: "26px 50px",
            minWidth: 600,
            background: `${it.color}15`,
            border: `2.5px solid ${it.color}`,
            borderRadius: 22,
            fontFamily: FONTS.family,
            color: it.color,
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: 1,
            transform: `translateY(${(1 - sPop) * 30}px) scale(${0.85 + sPop * 0.15})`,
            opacity: sPop,
            boxShadow: `0 8px 30px ${it.color}33`,
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span style={{ fontSize: 64 }}>{it.icon}</span>
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// s08 — C: Quý ≥ 25%
// ─────────────────────────────────────────────────────────────────
export const V_s08: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sBig = spring({ frame, fps, config: SPRINGS.resolve });
  const t25 = findWordTime(words, "hai") ?? findWordTime(words, "25") ?? 3;
  const s25 = spring({ frame: frame - Math.round(t25 * fps), fps, config: SPRINGS.decisive });

  return (
    <>
      {/* Big C + full name */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 540,
          width: 280,
          height: 280,
          background: `${COLORS.purple}22`,
          border: `4px solid ${COLORS.purple}`,
          borderRadius: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONTS.family,
          fontSize: 200,
          fontWeight: 900,
          color: COLORS.purple,
          opacity: sBig,
          transform: `scale(${0.7 + sBig * 0.3})`,
          boxShadow: `0 0 60px ${COLORS.purple}55`,
        }}
      >
        C
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 840,
          width: 280,
          textAlign: "center",
          fontFamily: FONTS.family,
          opacity: sBig,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.purple, letterSpacing: 1, lineHeight: 1.3 }}>
          Current Quarterly<br />Earnings
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.textPrimary, marginTop: 8, lineHeight: 1.3 }}>
          Lợi Nhuận<br />Quý Hiện Tại
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.textSecondary, marginTop: 10, letterSpacing: 3 }}>
          QUÝ
        </div>
      </div>

      {/* Right: 2 rows × 4 quarters — 2024 (top, muted) vs 2025 (bottom, highlighted) */}
      <div style={{ position: "absolute", left: 380, top: 530, width: 620, fontFamily: FONTS.family }}>
        {/* Row 2024 */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 60, fontSize: 22, fontWeight: 800, color: COLORS.textMute, letterSpacing: 1 }}>2024</div>
          {["Q1", "Q2", "Q3", "Q4"].map((q, i) => {
            const isCompareQ = i === 3;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 110,
                  borderRadius: 12,
                  background: isCompareQ ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                  border: isCompareQ ? `2px dashed ${COLORS.gold}aa` : "1px solid rgba(255,255,255,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isCompareQ ? COLORS.gold : COLORS.textMute,
                  position: "relative",
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 900 }}>{q}</div>
                {isCompareQ && (
                  <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4, letterSpacing: 1 }}>CÙNG KỲ</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vertical "cùng kỳ" connector under Q4-2024 → Q4-2025 (right edge) */}
        <div style={{ position: "relative", height: 0 }}>
          <div
            style={{
              position: "absolute",
              right: 60,
              top: -8,
              width: 2,
              height: 20,
              background: `linear-gradient(180deg, ${COLORS.gold}aa, ${COLORS.green})`,
            }}
          />
        </div>

        {/* Row 2025 */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
          <div style={{ width: 60, fontSize: 22, fontWeight: 800, color: COLORS.green, letterSpacing: 1 }}>2025</div>
          {["Q1", "Q2", "Q3", "Q4"].map((q, i) => {
            const isLast = i === 3;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 130,
                  borderRadius: 12,
                  background: isLast ? `${COLORS.green}26` : "rgba(255,255,255,0.04)",
                  border: isLast ? `3px solid ${COLORS.green}` : "1px solid rgba(255,255,255,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isLast ? COLORS.green : COLORS.textSecondary,
                  boxShadow: isLast ? `0 0 30px ${COLORS.green}55` : "none",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: isLast ? 38 : 32, fontWeight: 900 }}>{q}</div>
                {isLast && (
                  <>
                    <div style={{ fontSize: 32, marginTop: 2 }}>↑</div>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>GẦN NHẤT</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Big +25% */}
      <div
        style={{
          position: "absolute",
          left: 380,
          top: 820,
          width: 620,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 160,
          fontWeight: 900,
          color: COLORS.gold,
          letterSpacing: -2,
          textShadow: `0 0 60px ${COLORS.gold}99`,
          opacity: s25,
          transform: `scale(${0.6 + s25 * 0.4})`,
        }}
      >
        +25%
      </div>
      <div
        style={{
          position: "absolute",
          left: 380,
          top: 1030,
          width: 620,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 26,
          fontWeight: 700,
          color: COLORS.textSecondary,
          letterSpacing: 2,
          opacity: s25,
        }}
      >
        TỐI THIỂU SO CÙNG KỲ
      </div>
      <div
        style={{
          position: "absolute",
          left: 380,
          top: 1090,
          width: 620,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 22,
          fontWeight: 600,
          color: COLORS.textMute,
          letterSpacing: 1,
          opacity: s25,
          fontStyle: "italic",
        }}
      >
        Acceleration: +15% → +25% → +50%…
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s09 — A: Năm ≥ 3 năm liên tiếp (3 bars stagger grow)
// ─────────────────────────────────────────────────────────────────
export const V_s09: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const heights = [180, 280, 380];
  const labels = ["Y1", "Y2", "Y3"];

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 540,
          width: 280,
          height: 280,
          background: `${COLORS.purple}22`,
          border: `4px solid ${COLORS.purple}`,
          borderRadius: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONTS.family,
          fontSize: 200,
          fontWeight: 900,
          color: COLORS.purple,
          boxShadow: `0 0 60px ${COLORS.purple}55`,
        }}
      >
        A
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 840,
          width: 280,
          textAlign: "center",
          fontFamily: FONTS.family,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.purple, letterSpacing: 1, lineHeight: 1.3 }}>
          Annual Earnings<br />Growth
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.textPrimary, marginTop: 8, lineHeight: 1.3 }}>
          Tăng Trưởng<br />Lợi Nhuận Hằng Năm
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.textSecondary, marginTop: 10, letterSpacing: 3 }}>
          NĂM
        </div>
      </div>

      {/* 3 bars */}
      <div style={{ position: "absolute", left: 400, top: 560, display: "flex", alignItems: "flex-end", gap: 30, height: 460 }}>
        {heights.map((h, i) => {
          const grow = spring({ frame: frame - i * 14, fps, config: SPRINGS.calm });
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 50, color: COLORS.green, marginBottom: 8, opacity: grow }}>✓</div>
              <div
                style={{
                  width: 130,
                  height: h * grow,
                  background: `linear-gradient(180deg, ${COLORS.green}, ${COLORS.green}77)`,
                  borderRadius: "10px 10px 0 0",
                  border: `2px solid ${COLORS.green}`,
                  boxShadow: `0 -4px 20px ${COLORS.green}55`,
                }}
              />
              <div style={{ marginTop: 12, fontSize: 36, fontWeight: 800, color: COLORS.textPrimary, fontFamily: FONTS.family }}>{labels[i]}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: 400,
          top: 1075,
          width: 600,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 38,
          fontWeight: 900,
          color: COLORS.green,
          letterSpacing: 1,
        }}
      >
        ≥ 3 NĂM · ≥ 25%/năm
      </div>
      {/* ROE badge */}
      <div
        style={{
          position: "absolute",
          left: 400,
          top: 1150,
          width: 600,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "10px 24px",
            background: `${COLORS.gold}22`,
            border: `2px solid ${COLORS.gold}`,
            borderRadius: 999,
            color: COLORS.gold,
            fontFamily: FONTS.family,
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: 2,
            boxShadow: `0 0 20px ${COLORS.gold}55`,
          }}
        >
          🎯 ROE ≥ 17%
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s10 — KFSP screener placeholder phone mockup
// ─────────────────────────────────────────────────────────────────
export const V_s10: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tKFSP = findWordTime(words, "kfs") ?? 0.3;
  const sPhone = spring({ frame: frame - Math.round(tKFSP * fps), fps, config: SPRINGS.decisive });
  const tFilter = (findWordTime(words, "bộ") ?? 1.5) * fps;
  const sCheckC = spring({ frame: frame - tFilter, fps, config: SPRINGS.resolve });
  const sCheckA = spring({ frame: frame - tFilter - 18, fps, config: SPRINGS.resolve });
  const tList = (findWordTime(words, "danh") ?? 4) * fps;
  const sList = spring({ frame: frame - tList, fps, config: SPRINGS.calm });

  return (
    <>
      {/* Phone mockup */}
      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 220,
          top: 580,
          width: 440,
          height: 760,
          background: "#0a0e16",
          border: "8px solid #2a3142",
          borderRadius: 36,
          padding: 16,
          opacity: sPhone,
          transform: `translateX(${(1 - sPhone) * 250}px) scale(${0.85 + sPhone * 0.15})`,
          boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(180deg, #14223d, #0a1628)",
            color: "white",
            fontFamily: FONTS.family,
            fontWeight: 800,
            fontSize: 22,
            padding: "14px 16px",
            borderRadius: "20px 20px 0 0",
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          KFSP — Bộ lọc CANSLIM
        </div>
        {/* Filter checkboxes */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 8,
              background: sCheckC > 0.2 ? `${COLORS.green}22` : "transparent",
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: `2px solid ${sCheckC > 0.2 ? COLORS.green : COLORS.textMute}`,
                background: sCheckC > 0.2 ? COLORS.green : "transparent",
                color: "white",
                fontSize: 22,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sCheckC > 0.2 ? "✓" : ""}
            </div>
            <div style={{ color: "white", fontFamily: FONTS.family, fontSize: 20, fontWeight: 700 }}>
              C — Quý gần nhất ≥ 25%
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 8,
              background: sCheckA > 0.2 ? `${COLORS.green}22` : "transparent",
              marginTop: 8,
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: `2px solid ${sCheckA > 0.2 ? COLORS.green : COLORS.textMute}`,
                background: sCheckA > 0.2 ? COLORS.green : "transparent",
                color: "white",
                fontSize: 22,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sCheckA > 0.2 ? "✓" : ""}
            </div>
            <div style={{ color: "white", fontFamily: FONTS.family, fontSize: 20, fontWeight: 700 }}>
              A — Lãi tăng ≥ 3 năm
            </div>
          </div>
        </div>
        {/* List rows */}
        <div style={{ padding: 16, opacity: sList }}>
          {["FPT", "MWG", "HPG", "PNJ", "VHM"].map((sym, i) => {
            const rowSpring = spring({ frame: frame - tList - i * 5, fps, config: SPRINGS.calm });
            return (
              <div
                key={sym}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  opacity: rowSpring,
                  transform: `translateY(${(1 - rowSpring) * 12}px)`,
                }}
              >
                <div style={{ color: "white", fontFamily: FONTS.family, fontWeight: 800, fontSize: 22 }}>{sym}</div>
                <div style={{ color: COLORS.green, fontFamily: FONTS.family, fontWeight: 700, fontSize: 18 }}>
                  +{(28 + i * 4).toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* "VÀI CÚ BẤM" overlay */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1380 - 80,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 38,
          fontWeight: 800,
          color: COLORS.gold,
          letterSpacing: 3,
          opacity: sList,
          textShadow: `0 0 30px ${COLORS.gold}66`,
        }}
      >
        ⚡ VÀI CÚ BẤM
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s11 — N spotlight pop (purple glow)
// ─────────────────────────────────────────────────────────────────
export const V_s11: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sN = spring({ frame, fps, config: SPRINGS.resolve });
  const glowPulse = (Math.sin(frame * 0.18) + 1) / 2;

  return (
    <>
      {/* Big iconic "N" — keep as visual focal */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 540,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 320,
          fontWeight: 900,
          color: COLORS.purple,
          letterSpacing: -8,
          lineHeight: 1,
          textShadow: `0 0 ${60 + glowPulse * 60}px ${COLORS.purple}, 0 0 ${100 + glowPulse * 80}px ${COLORS.purple}99`,
          opacity: sN,
          transform: `scale(${0.5 + sN * 0.5})`,
        }}
      >
        N
      </div>
      {/* Full name "Yếu tố mới" + Happy Live names */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 920,
          width: VIDEO.width - 120,
          textAlign: "center",
          fontFamily: FONTS.family,
          opacity: sN,
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 900, color: COLORS.purple, letterSpacing: 2, lineHeight: 1.05, textShadow: `0 0 30px ${COLORS.purple}88` }}>
          YẾU TỐ MỚI
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.purple, letterSpacing: 1, lineHeight: 1.3, marginTop: 14, opacity: 0.85 }}>
          New Products · New Management · New Highs
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "white", marginTop: 8, lineHeight: 1.25 }}>
          Sản phẩm <span style={{ color: COLORS.gold }}>MỚI</span>
          {" · "}Lãnh đạo <span style={{ color: COLORS.gold }}>MỚI</span>
          {" · "}Đỉnh giá <span style={{ color: COLORS.gold }}>MỚI</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1230,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 32,
          fontWeight: 700,
          color: COLORS.textSecondary,
          letterSpacing: 4,
          opacity: sN,
        }}
      >
        ← TẬP TRUNG SỨC LỰC →
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s12 — N = kỳ vọng + niềm tin (2 chips)
// ─────────────────────────────────────────────────────────────────
export const V_s12: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tKV = findWordTime(words, "kỳ") ?? 1;
  const tNT = findWordTime(words, "niềm") ?? 2.5;
  const sKV = spring({ frame: frame - Math.round(tKV * fps), fps, config: SPRINGS.resolve });
  const sNT = spring({ frame: frame - Math.round(tNT * fps), fps, config: SPRINGS.resolve });

  return (
    <>
      {/* "Yếu tố mới" center */}
      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 130,
          top: 760,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: `${COLORS.purple}22`,
          border: `4px solid ${COLORS.purple}`,
          color: COLORS.purple,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONTS.family,
          fontWeight: 900,
          fontSize: 50,
          textAlign: "center",
          lineHeight: 1.05,
          letterSpacing: 1,
          boxShadow: `0 0 50px ${COLORS.purple}88`,
        }}
      >
        YẾU TỐ<br />MỚI
      </div>

      <div
        style={{
          position: "absolute",
          left: 60,
          top: 850,
          padding: "24px 36px",
          background: `${COLORS.gold}1a`,
          border: `2.5px solid ${COLORS.gold}`,
          borderRadius: 22,
          color: COLORS.gold,
          fontFamily: FONTS.family,
          fontWeight: 800,
          fontSize: 48,
          opacity: sKV,
          transform: `translateX(${(1 - sKV) * -80}px) scale(${0.85 + sKV * 0.15})`,
          boxShadow: `0 8px 30px ${COLORS.gold}55`,
        }}
      >
        ✨ KỲ VỌNG
      </div>

      <div
        style={{
          position: "absolute",
          right: 60,
          top: 850,
          padding: "24px 36px",
          background: `${COLORS.green}1a`,
          border: `2.5px solid ${COLORS.green}`,
          borderRadius: 22,
          color: COLORS.green,
          fontFamily: FONTS.family,
          fontWeight: 800,
          fontSize: 48,
          opacity: sNT,
          transform: `translateX(${(1 - sNT) * 80}px) scale(${0.85 + sNT * 0.15})`,
          boxShadow: `0 8px 30px ${COLORS.green}55`,
        }}
      >
        💚 NIỀM TIN
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s13 — N kích thích kỳ vọng tăng trưởng
// ─────────────────────────────────────────────────────────────────
export const V_s13: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tArrow = (findWordTime(words, "kỳ") ?? 3) * fps;
  const sArrow = spring({ frame: frame - tArrow, fps, config: SPRINGS.calm });

  return (
    <>
      {/* "Thị trường" cluster (silhouettes) */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 700,
          width: VIDEO.width - 120,
          textAlign: "center",
          fontSize: 100,
          letterSpacing: 30,
          opacity: 0.6,
        }}
      >
        👥👥👥
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 850,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 28,
          fontWeight: 700,
          color: COLORS.textSecondary,
          letterSpacing: 3,
        }}
      >
        ← THỊ TRƯỜNG NHÌN LẠI →
      </div>

      {/* Arrow up KỲ VỌNG */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 970,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontWeight: 900,
          fontSize: 80,
          color: COLORS.green,
          letterSpacing: 2,
          opacity: sArrow,
          transform: `translateY(${(1 - sArrow) * 60}px) scale(${0.85 + sArrow * 0.15})`,
          textShadow: `0 0 40px ${COLORS.green}66`,
        }}
      >
        📈 KỲ VỌNG TĂNG TRƯỞNG
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s14 — N kích thích HAM MUỐN
// ─────────────────────────────────────────────────────────────────
export const V_s14: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tHM = findWordTime(words, "ham") ?? 2;
  const sHM = spring({ frame: frame - Math.round(tHM * fps), fps, config: SPRINGS.decisive });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 650,
          width: VIDEO.width - 120,
          textAlign: "center",
          fontSize: 110,
          letterSpacing: 30,
          opacity: 0.7,
        }}
      >
        👥👥👥👥👥
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 820,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 28,
          fontWeight: 700,
          color: COLORS.textSecondary,
          letterSpacing: 3,
        }}
      >
        QUAN TRỌNG HƠN…
      </div>

      {/* HAM MUỐN big red */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 920,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontWeight: 900,
          fontSize: 160,
          color: COLORS.red,
          letterSpacing: -2,
          opacity: sHM,
          transform: `scale(${0.5 + sHM * 0.5})`,
          textShadow: `0 0 80px ${COLORS.red}aa, 0 0 30px ${COLORS.red}`,
        }}
      >
        💢 HAM MUỐN
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s15 — 4 headline cards stagger theo enum_beats
// ─────────────────────────────────────────────────────────────────
export const V_s15: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = [
    { match: "bán", icon: "🔧", title: "Doanh nghiệp X ra mắt chip 7nm", color: COLORS.purple },
    { match: "ai", icon: "🤖", title: "Doanh nghiệp Y công bố sản phẩm AI mới", color: COLORS.green },
    { match: "đạo", icon: "👔", title: "Doanh nghiệp Z thay máu ban lãnh đạo", color: COLORS.amber },
    { match: "rộng", icon: "🌏", title: "Doanh nghiệp T khai trương thị trường mới", color: COLORS.gold },
  ];
  const starts = items.map((it) => findWordTime(words, it.match) ?? 0);

  return (
    <div style={{ position: "absolute", left: 60, top: 580, width: VIDEO.width - 120, display: "flex", flexDirection: "column", gap: 16 }}>
      {items.map((it, i) => {
        const sCard = spring({ frame: frame - Math.round(starts[i] * fps), fps, config: SPRINGS.resolve });
        return (
          <div
            key={i}
            style={{
              padding: "22px 28px",
              background: `${it.color}15`,
              border: `2px solid ${it.color}88`,
              borderRadius: 18,
              color: "white",
              fontFamily: FONTS.family,
              display: "flex",
              alignItems: "center",
              gap: 18,
              transform: `translateX(${(1 - sCard) * (i % 2 === 0 ? -120 : 120)}px) scale(${0.85 + sCard * 0.15})`,
              opacity: sCard,
              boxShadow: `0 6px 24px ${it.color}33`,
            }}
          >
            <div style={{ fontSize: 56 }}>{it.icon}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: it.color, letterSpacing: 2 }}>📰 HEADLINE</div>
              <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>{it.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// s16 — Đỉnh giá mới (chart breakout)
// ─────────────────────────────────────────────────────────────────
export const V_s16: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tBreak = findWordTime(words, "đỉnh") ?? 3;
  const sBreak = spring({ frame: frame - Math.round(tBreak * fps), fps, config: SPRINGS.decisive });
  const sChart = spring({ frame, fps, config: SPRINGS.calm });

  // Build chart path: flat then breakout
  const flat = "60,400 200,395 340,408 480,398 620,402 760,396 900,400";
  const breakUp = ` 980,${400 - sBreak * 280} 1020,${400 - sBreak * 320}`;

  return (
    <>
      {/* Chart svg */}
      <svg
        viewBox="0 0 1080 540"
        style={{
          position: "absolute",
          left: 0,
          top: 600,
          width: VIDEO.width,
          height: 540,
          opacity: sChart,
        }}
      >
        <defs>
          <linearGradient id="g16" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={COLORS.gold} stopOpacity="0.6" />
            <stop offset="100%" stopColor={COLORS.gold} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={flat + breakUp} fill="none" stroke={COLORS.gold} strokeWidth="6" />
        <polygon points={`60,540 ${flat + breakUp} 1020,540`} fill="url(#g16)" />
        {/* breakout particles */}
        {sBreak > 0.3 && (
          <>
            <circle cx="1020" cy={400 - sBreak * 320} r="14" fill={COLORS.gold} />
            <circle cx="1020" cy={400 - sBreak * 320} r="28" fill={COLORS.gold} opacity={0.3} />
          </>
        )}
      </svg>

      {/* "ĐỈNH GIÁ MỚI" overlay */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1180,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontWeight: 900,
          fontSize: 80,
          color: COLORS.gold,
          letterSpacing: 2,
          opacity: sBreak,
          transform: `scale(${0.85 + sBreak * 0.15})`,
          textShadow: `0 0 50px ${COLORS.gold}aa`,
        }}
      >
        🔥 ĐỈNH GIÁ MỚI
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s17 — Callback CA đẹp giá đứng im
// ─────────────────────────────────────────────────────────────────
export const V_s17: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tNoN = findWordTime(words, "n") ?? 5;
  // Find LAST occurrence of "n" (the final word)
  let lastN = 0;
  for (const w of words) {
    if (w.word.toLowerCase().replace(/[.,!?…"]/g, "").trim() === "n") lastN = w.start;
  }
  const sNoN = spring({ frame: frame - Math.round((lastN || tNoN) * fps), fps, config: SPRINGS.decisive });

  return (
    <>
      {/* Left: C ✓ + A ✓ */}
      <div style={{ position: "absolute", left: 60, top: 660, width: 460 }}>
        <div
          style={{
            padding: "26px 36px",
            background: `${COLORS.green}1a`,
            border: `2px solid ${COLORS.green}`,
            borderRadius: 16,
            color: COLORS.green,
            fontFamily: FONTS.family,
            fontWeight: 800,
            fontSize: 60,
            marginBottom: 18,
          }}
        >
          C ✓
        </div>
        <div
          style={{
            padding: "26px 36px",
            background: `${COLORS.green}1a`,
            border: `2px solid ${COLORS.green}`,
            borderRadius: 16,
            color: COLORS.green,
            fontFamily: FONTS.family,
            fontWeight: 800,
            fontSize: 60,
          }}
        >
          A ✓
        </div>
        <div
          style={{
            marginTop: 20,
            color: COLORS.textSecondary,
            fontFamily: FONTS.family,
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          Quá khứ ĐẸP
        </div>
      </div>

      {/* Right: flat chart greyed */}
      <svg
        viewBox="0 0 480 280"
        style={{ position: "absolute", left: 560, top: 700, width: 460, height: 260 }}
      >
        <polyline
          points="20,140 80,142 140,138 200,143 260,139 320,141 380,140 440,142"
          fill="none"
          stroke={COLORS.textMute}
          strokeWidth="5"
        />
        <text x="240" y="240" fill={COLORS.textMute} fontSize="32" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
          ⏸ giá đứng im
        </text>
      </svg>

      {/* CHƯA CÓ YẾU TỐ MỚI snap red */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1080,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontWeight: 900,
          fontSize: 88,
          color: COLORS.red,
          letterSpacing: 1,
          lineHeight: 1.1,
          opacity: sNoN,
          transform: `scale(${0.6 + sNoN * 0.4})`,
          textShadow: `0 0 80px ${COLORS.red}cc`,
        }}
      >
        ❌ CHƯA CÓ<br />YẾU TỐ MỚI
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s18 — Buffett quote 2 — Side-view car SVG (windshield + side mirror labeled)
// ─────────────────────────────────────────────────────────────────
export const V_s18: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const dolly = spring({ frame, fps: 30, config: SPRINGS.zoom });
  const sLabels = spring({ frame: frame - 20, fps: 30, config: SPRINGS.calm });

  return (
    <>
      {/* Side-view car SVG — sedan profile */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 560,
          width: VIDEO.width - 120,
          height: 320,
          opacity: 1,
          transform: `scale(${0.92 + dolly * 0.08})`,
          transformOrigin: "center center",
        }}
      >
        <svg viewBox="0 0 960 360" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="carBody" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3a4a40" />
              <stop offset="100%" stopColor="#1a2a20" />
            </linearGradient>
            <linearGradient id="windshieldG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="rearGlassG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5a6a60" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3a4a40" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Body main */}
          <path
            d="M 100 245
               L 165 245
               Q 175 245 185 232
               L 250 142
               Q 268 122 298 122
               L 600 122
               Q 632 122 650 142
               L 720 232
               Q 730 245 740 245
               L 840 245
               Q 880 245 880 280
               L 880 305
               L 100 305
               Q 80 305 80 285
               Z"
            fill="url(#carBody)"
            stroke="#0a1410"
            strokeWidth="3"
          />

          {/* Windshield (front-left, larger angled glass) */}
          <path
            d="M 250 142 L 470 142 L 510 232 L 220 232 Z"
            fill="url(#windshieldG)"
            stroke="#a78bfa"
            strokeWidth="2.5"
          />

          {/* Rear window (back side, neutral — not the rearview mirror) */}
          <path
            d="M 480 142 L 600 142 L 690 232 L 520 232 Z"
            fill="url(#rearGlassG)"
            stroke="#5a6a60"
            strokeWidth="2"
            opacity="0.85"
          />

          {/* Roof divider (B-pillar) */}
          <line x1="478" y1="142" x2="515" y2="232" stroke="#0a1410" strokeWidth="3" />

          {/* Side mirror (rearview) — protruding from front pillar */}
          <g>
            <path d="M 218 188 L 198 196 L 198 218 L 218 222 Z" fill="#1a2a20" stroke="#f5c542" strokeWidth="2.5" />
            <rect x="200" y="200" width="14" height="14" fill="#f5c542" opacity="0.9" />
          </g>

          {/* Wheels */}
          <circle cx="225" cy="305" r="48" fill="#0a1410" stroke="#3a4a40" strokeWidth="6" />
          <circle cx="225" cy="305" r="22" fill="#34d399" opacity="0.6" />
          <circle cx="755" cy="305" r="48" fill="#0a1410" stroke="#3a4a40" strokeWidth="6" />
          <circle cx="755" cy="305" r="22" fill="#34d399" opacity="0.6" />

          {/* Headlight */}
          <ellipse cx="105" cy="265" rx="18" ry="10" fill="#f5c542" opacity="0.9" />

          {/* Taillight */}
          <ellipse cx="855" cy="265" rx="14" ry="8" fill="#f87171" opacity="0.9" />
        </svg>
      </div>

      {/* Callout: GƯƠNG CHIẾU HẬU (left, points to side mirror) */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 880,
          opacity: sLabels,
          transform: `translateY(${(1 - sLabels) * 12}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            background: `${COLORS.gold}22`,
            border: `2px solid ${COLORS.gold}`,
            borderRadius: 999,
            color: COLORS.gold,
            fontFamily: FONTS.family,
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: 1,
            boxShadow: `0 0 20px ${COLORS.gold}55`,
          }}
        >
          🪞 GƯƠNG CHIẾU HẬU
        </div>
      </div>

      {/* Callout: KÍNH CHẮN GIÓ (right, points to windshield) */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 880,
          textAlign: "right",
          opacity: sLabels,
          transform: `translateY(${(1 - sLabels) * 12}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            background: `${COLORS.purple}22`,
            border: `2px solid ${COLORS.purple}`,
            borderRadius: 999,
            color: COLORS.purple,
            fontFamily: FONTS.family,
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: 1,
            boxShadow: `0 0 20px ${COLORS.purple}55`,
          }}
        >
          🪟 KÍNH CHẮN GIÓ
        </div>
      </div>

      {/* Quote box */}
      <GlassCard
        x={SAFE.leftSafe}
        y={920}
        w={VIDEO.width - SAFE.leftSafe * 2}
        style={{
          borderColor: `${COLORS.gold}66`,
          background: "rgba(20,15,8,0.55)",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600, lineHeight: 1.35, color: "white", textAlign: "center" }}>
          <span style={{ color: COLORS.gold, fontSize: 56, fontWeight: 800, lineHeight: 0.5 }}>"</span>
          {" "}Trong kinh doanh,{" "}
          <span style={{ color: COLORS.gold, fontWeight: 800 }}>gương chiếu hậu</span>{" "}
          luôn rõ hơn{" "}
          <span style={{ color: COLORS.gold, fontWeight: 800 }}>kính chắn gió</span>.
          <span style={{ color: COLORS.gold, fontSize: 56, fontWeight: 800, lineHeight: 0.5 }}>"</span>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 14,
            color: `${COLORS.gold}aa`,
            fontSize: 19,
            fontStyle: "italic",
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: 0.5,
          }}
        >
          "In the business world, the rearview mirror<br />is always clearer than the windshield."
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            marginTop: 14,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              overflow: "hidden",
              border: `2px solid ${COLORS.gold}`,
              boxShadow: `0 0 16px ${COLORS.gold}66`,
              background: "#1a1410",
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile("images/buffett.png")}
              style={{
                width: "180%",
                height: "180%",
                objectFit: "cover",
                objectPosition: "20% 8%",
                marginLeft: "-40%",
                marginTop: "-12%",
              }}
            />
          </div>
          <div style={{ color: COLORS.gold, fontSize: 22, letterSpacing: 2, fontWeight: 700 }}>
            WARREN BUFFETT
          </div>
        </div>
      </GlassCard>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s19 — Quá khứ dễ nhìn (rearview mirror reflection: rear of car + road behind)
// ─────────────────────────────────────────────────────────────────
export const V_s19: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const sZoom = spring({ frame, fps: 30, config: SPRINGS.calm });
  // Animate road dashes appearing to recede UP toward horizon (xe đi tới, đường đã qua lùi xa)
  // SVG line drawn bottom→top; negative offset makes dashes flow upward visually.
  const dashOffset = -((frame * 6) % 36);
  // Subtle "cảnh nhỏ dần" — gentle pull-back zoom of reflection content
  const reflZoom = 1 - Math.min(0.06, frame * 0.0006);

  return (
    <>
      {/* SIDE MIRROR (gương chiếu hậu cạnh xe — wing mirror style) */}
      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 420,
          top: 540,
          width: 840,
          height: 480,
          opacity: sZoom,
          transform: `scale(${0.85 + sZoom * 0.15})`,
        }}
      >
        <svg viewBox="0 0 840 480" style={{ width: "100%", height: "100%" }}>
          <defs>
            {/* Sky in reflection — gold sunset (past) */}
            <linearGradient id="reflSkyG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f5c542" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#3a2a18" stopOpacity="0.85" />
            </linearGradient>
            {/* Road in reflection — receding into the past */}
            <linearGradient id="reflRoadG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1a2a20" />
              <stop offset="100%" stopColor="#0a1410" />
            </linearGradient>
            {/* Side mirror housing — dark plastic with subtle gradient */}
            <linearGradient id="housingG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3a4a40" />
              <stop offset="100%" stopColor="#0a1410" />
            </linearGradient>
            {/* Glass shine */}
            <linearGradient id="glassShine" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
            {/* Clip path matching the inner glass shape */}
            <clipPath id="sideGlassClip">
              <path d="M 70 110
                       Q 70 70 140 70
                       L 660 70
                       Q 720 70 720 130
                       L 720 350
                       Q 720 410 660 410
                       L 140 410
                       Q 70 410 70 360 Z" />
            </clipPath>
          </defs>

          {/* Hint of own car body on RIGHT edge (mirror is attached to driver door) */}
          <g opacity="0.9">
            {/* Door panel slice */}
            <path
              d="M 760 200 L 840 220 L 840 470 L 760 470 Z"
              fill="#1a2a20"
              stroke="#0a1410"
              strokeWidth="2"
            />
            {/* Window frame top */}
            <path
              d="M 760 100 L 840 120 L 840 220 L 760 200 Z"
              fill="#0a1410"
              stroke="#3a4a40"
              strokeWidth="1.5"
            />
            {/* Mounting arm (connects mirror to door) */}
            <path
              d="M 720 230 Q 750 230 760 250 L 760 290 Q 745 280 720 280 Z"
              fill="url(#housingG)"
              stroke="#0a1410"
              strokeWidth="2"
            />
          </g>

          {/* Side mirror housing — rounded organic shape */}
          <path
            d="M 50 100
               Q 50 50 130 50
               L 670 50
               Q 740 50 740 130
               L 740 350
               Q 740 430 670 430
               L 130 430
               Q 50 430 50 360 Z"
            fill="url(#housingG)"
            stroke="#0a1410"
            strokeWidth="4"
          />

          {/* Indicator strip (turn signal — yellow strip on bottom edge of housing) */}
          <path
            d="M 90 425 Q 80 425 80 415 L 80 405 Q 80 415 90 415 L 220 415 Q 230 410 230 425 Z"
            fill="#f5c542"
            opacity="0.85"
          />

          {/* Glass area (slightly inset, rounded organic) */}
          <path
            d="M 70 110
               Q 70 70 140 70
               L 660 70
               Q 720 70 720 130
               L 720 350
               Q 720 410 660 410
               L 140 410
               Q 70 410 70 360 Z"
            fill="#0a1812"
          />

          {/* REFLECTION CONTENT inside glass — subtle zoom-out simulating "scene receding" */}
          <g clipPath="url(#sideGlassClip)" transform={`translate(395 240) scale(${reflZoom}) translate(-395 -240)`}>
            {/* Sky */}
            <rect x="0" y="0" width="840" height="240" fill="url(#reflSkyG)" />
            {/* Sun glow */}
            <ellipse cx="380" cy="180" rx="100" ry="32" fill="#f5c542" opacity="0.55" />
            {/* Distant mountains */}
            <polygon points="40,250 180,150 280,200 420,130 540,190 660,140 760,250 760,260 40,260" fill="#0a1812" opacity="0.9" />

            {/* Road */}
            <rect x="0" y="260" width="840" height="180" fill="url(#reflRoadG)" />
            {/* Road perspective converging UP toward horizon (looking backward) */}
            <polygon points="40,420 760,420 540,260 260,260" fill="#1a2a20" opacity="0.85" />
            {/* Yellow center dashed line, animated */}
            <line
              x1="400"
              y1="420"
              x2="400"
              y2="260"
              stroke="#f5c542"
              strokeWidth="4"
              strokeDasharray="22 14"
              strokeDashoffset={dashOffset}
              opacity="0.95"
            />

            {/* Rear-side view of OWN car (only seen partially in side mirror — receding to mid-ground left) */}
            <g>
              {/* Car body sliver from side angle */}
              <path
                d="M 460 415
                   L 460 360
                   Q 460 340 480 340
                   L 620 340
                   Q 660 340 680 360
                   L 700 415 Z"
                fill="#2a3a30"
                stroke="#0a1410"
                strokeWidth="2.5"
              />
              {/* Window */}
              <path
                d="M 490 340 L 620 340 L 660 365 L 510 365 Z"
                fill="#5a6a60"
                opacity="0.7"
              />
              {/* Tail light (red) */}
              <ellipse cx="475" cy="385" rx="10" ry="6" fill="#f87171" opacity="0.95" />
              {/* Rear wheel (only top visible) */}
              <ellipse cx="510" cy="415" rx="22" ry="8" fill="#0a1410" />
              <ellipse cx="650" cy="415" rx="22" ry="8" fill="#0a1410" />
            </g>

            {/* "QUÁ KHỨ" label */}
            <text
              x="395"
              y="108"
              fill="#f5c542"
              fontSize="38"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="Be Vietnam Pro, sans-serif"
              letterSpacing="6"
              style={{ filter: "drop-shadow(0 0 12px #f5c54299)" }}
            >
              QUÁ KHỨ
            </text>
            <text
              x="395"
              y="148"
              fill="#ffffff"
              fontSize="18"
              fontWeight="600"
              textAnchor="middle"
              fontFamily="Be Vietnam Pro, sans-serif"
              opacity="0.8"
              letterSpacing="2"
            >
              đường đã đi qua
            </text>

            {/* Subtle glass shine top-left */}
            <path d="M 80 100 L 250 90 L 280 130 L 100 145 Z" fill="url(#glassShine)" />
          </g>
        </svg>
      </div>
      {/* Label below mirror */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1010,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontWeight: 800,
          fontSize: 36,
          color: COLORS.gold,
          letterSpacing: 3,
          opacity: sZoom,
        }}
      >
        🪞 GƯƠNG CHIẾU HẬU — dễ nhìn
      </div>

      {/* Diễn giải hindsight */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 1100,
          width: VIDEO.width - 160,
          padding: "20px 22px",
          background: `${COLORS.gold}12`,
          border: `1.5px solid ${COLORS.gold}55`,
          borderRadius: 14,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 28,
          fontWeight: 700,
          color: COLORS.gold,
          opacity: sZoom,
          lineHeight: 1.35,
        }}
      >
        ✨ Hindsight luôn sắc bén<br />— đúng/sai đã rõ
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s20 — N = kính chắn gió (POV from driver seat through windshield)
// ─────────────────────────────────────────────────────────────────
export const V_s20: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const sPan = spring({ frame, fps: 30, config: SPRINGS.decisive });
  const sN = spring({ frame: frame - 18, fps: 30, config: SPRINGS.resolve });

  // Wiper sweeping animation — sin oscillation, 2.4s per full cycle
  // Returns -1..1 representing sweep position (-1 = parked left, 1 = full right)
  const wiperT = Math.sin((frame / 30) * Math.PI / 1.2);
  // Left wiper: pivot at (200, 445), idle angle -78°, sweeps to -28°
  const leftAngle = -78 + (wiperT + 1) * 25; // -78° to -28°
  // Right wiper: pivot at (720, 445), idle angle +78°, sweeps to +28° (mirror)
  const rightAngle = 78 - (wiperT + 1) * 25; // 78° to 28°

  // Dust/rain spots — 18 deterministic positions for stable look
  const spots = [
    { cx: 140, cy: 90, r: 4, op: 0.45 },
    { cx: 200, cy: 60, r: 3, op: 0.35 },
    { cx: 280, cy: 110, r: 5, op: 0.5 },
    { cx: 350, cy: 70, r: 3, op: 0.4 },
    { cx: 430, cy: 130, r: 4, op: 0.45 },
    { cx: 510, cy: 90, r: 6, op: 0.55 },
    { cx: 580, cy: 160, r: 3, op: 0.4 },
    { cx: 650, cy: 100, r: 4, op: 0.5 },
    { cx: 730, cy: 140, r: 5, op: 0.45 },
    { cx: 800, cy: 80, r: 3, op: 0.4 },
    { cx: 170, cy: 200, r: 4, op: 0.5 },
    { cx: 320, cy: 230, r: 5, op: 0.55 },
    { cx: 480, cy: 200, r: 3, op: 0.4 },
    { cx: 620, cy: 240, r: 4, op: 0.45 },
    { cx: 760, cy: 210, r: 6, op: 0.5 },
    { cx: 250, cy: 380, r: 5, op: 0.45 },
    { cx: 590, cy: 360, r: 4, op: 0.5 },
    { cx: 700, cy: 400, r: 3, op: 0.4 },
  ];

  return (
    <>
      {/* Windshield POV — driver's view through the front glass */}
      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 460,
          top: 540,
          width: 920,
          height: 480,
          opacity: sPan,
          transform: `scale(${0.88 + sPan * 0.12})`,
        }}
      >
        <svg viewBox="0 0 920 480" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="skyG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0a2418" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="roadG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1a2a20" />
              <stop offset="100%" stopColor="#0a1410" />
            </linearGradient>
            <clipPath id="windshieldClip">
              {/* Trapezoidal windshield shape */}
              <path d="M 90 50 Q 460 10 830 50 L 830 430 Q 460 460 90 430 Z" />
            </clipPath>
          </defs>

          {/* Windshield frame (outer) */}
          <path
            d="M 60 30 Q 460 -10 860 30 L 860 450 Q 460 480 60 450 Z"
            fill="#0a0e0c"
            stroke="#a78bfa"
            strokeWidth="6"
          />
          {/* Inner glass area with sky gradient */}
          <g clipPath="url(#windshieldClip)">
            <rect x="60" y="30" width="800" height="430" fill="url(#skyG)" />

            {/* Distant horizon mountains (faint, blurred future) */}
            <polygon points="90,280 200,200 320,250 460,180 600,240 740,210 830,290 830,330 90,330" fill="#1a2a20" opacity="0.7" />

            {/* Road perspective — converging lines */}
            <polygon points="90,460 460,260 830,460" fill="url(#roadG)" />
            {/* Road center dashed lines — animate APPROACHING viewer (top→bottom = future coming at us) */}
            <line
              x1="460"
              y1="270"
              x2="460"
              y2="460"
              stroke="#f5c542"
              strokeWidth="3"
              strokeDasharray="14 14"
              strokeDashoffset={(frame * 6) % 28}
            />
            {/* Road edges */}
            <line x1="200" y1="460" x2="430" y2="280" stroke="#3a4a40" strokeWidth="3" />
            <line x1="720" y1="460" x2="490" y2="280" stroke="#3a4a40" strokeWidth="3" />

            {/* Stars/clouds in the future sky (mystery) */}
            <circle cx="200" cy="100" r="3" fill="#a78bfa" opacity="0.7" />
            <circle cx="320" cy="80" r="2" fill="#a78bfa" opacity="0.6" />
            <circle cx="600" cy="90" r="3" fill="#a78bfa" opacity="0.7" />
            <circle cx="720" cy="120" r="2" fill="#a78bfa" opacity="0.5" />

            {/* Dust/rain spots on glass — obscure visibility (future is unclear) */}
            <g>
              {spots.map((s, i) => {
                // Opacity reduced if wiper has just swept past this spot
                // Compute approximate sweep position covering each spot
                const sweepX = 460 + wiperT * 260; // approximate center sweep
                const cleared = Math.abs(s.cx - sweepX) < 60 ? 0.15 : 1;
                return (
                  <g key={i}>
                    <circle cx={s.cx} cy={s.cy} r={s.r} fill="#ffffff" opacity={s.op * cleared * 0.6} />
                    <circle cx={s.cx} cy={s.cy} r={s.r * 1.6} fill="#ffffff" opacity={s.op * cleared * 0.18} />
                  </g>
                );
              })}
            </g>

            {/* Smudge streaks (faint diagonal smears for "dirty windshield" feel) */}
            <path d="M 180 220 Q 280 180 380 230" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.08" />
            <path d="M 540 200 Q 640 240 740 210" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.08" />
          </g>

          {/* Wiper blades — pivots at bottom, sweep arc */}
          {/* Left wiper */}
          <g transform={`translate(200 445) rotate(${leftAngle})`}>
            {/* Wiper arm */}
            <rect x="-3" y="-340" width="6" height="340" fill="#1a2a20" stroke="#0a1410" strokeWidth="1" />
            {/* Wiper blade (rubber strip) */}
            <rect x="-22" y="-345" width="44" height="8" rx="2" fill="#0a1410" stroke="#3a4a40" strokeWidth="1" />
            {/* Pivot cap */}
            <circle cx="0" cy="0" r="8" fill="#3a4a40" stroke="#0a1410" strokeWidth="1.5" />
          </g>
          {/* Right wiper */}
          <g transform={`translate(720 445) rotate(${rightAngle})`}>
            <rect x="-3" y="-340" width="6" height="340" fill="#1a2a20" stroke="#0a1410" strokeWidth="1" />
            <rect x="-22" y="-345" width="44" height="8" rx="2" fill="#0a1410" stroke="#3a4a40" strokeWidth="1" />
            <circle cx="0" cy="0" r="8" fill="#3a4a40" stroke="#0a1410" strokeWidth="1.5" />
          </g>

          {/* "YẾU TỐ MỚI" floating on the road horizon (the future) */}
          <text
            x="460"
            y="220"
            fill="#a78bfa"
            fontSize={56 + sN * 18}
            fontWeight="900"
            textAnchor="middle"
            fontFamily="Be Vietnam Pro, sans-serif"
            opacity={sN}
            letterSpacing="2"
            style={{ filter: `drop-shadow(0 0 ${24 + sN * 24}px #a78bfa)` }}
          >
            YẾU TỐ
          </text>
          <text
            x="460"
            y="278"
            fill="#a78bfa"
            fontSize={56 + sN * 18}
            fontWeight="900"
            textAnchor="middle"
            fontFamily="Be Vietnam Pro, sans-serif"
            opacity={sN}
            letterSpacing="2"
            style={{ filter: `drop-shadow(0 0 ${24 + sN * 24}px #a78bfa)` }}
          >
            MỚI
          </text>
        </svg>
      </div>
      {/* Label below windshield */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1060,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontWeight: 800,
          fontSize: 36,
          color: COLORS.purple,
          letterSpacing: 3,
          opacity: sN,
        }}
      >
        🪟 YẾU TỐ MỚI = KÍNH CHẮN GIÓ
      </div>
      {/* Diễn giải tương lai */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 1150,
          width: VIDEO.width - 160,
          padding: "20px 22px",
          background: `${COLORS.purple}12`,
          border: `1.5px solid ${COLORS.purple}66`,
          borderRadius: 14,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 28,
          fontWeight: 700,
          color: COLORS.purple,
          opacity: sN,
          lineHeight: 1.35,
        }}
      >
        🌫️ Lộn xộn · Không chắc chắn<br />· Đầy điểm mù
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s21 — N không có công thức cố định (formula crossed out)
// ─────────────────────────────────────────────────────────────────
export const V_s21: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const sX = spring({ frame: frame - 12, fps: 30, config: SPRINGS.decisive });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 760,
          width: VIDEO.width - 120,
          padding: 60,
          background: "rgba(255,255,255,0.04)",
          border: "2px solid rgba(255,255,255,0.14)",
          borderRadius: 22,
          color: COLORS.textSecondary,
          fontFamily: "monospace",
          fontSize: 80,
          fontWeight: 700,
          textAlign: "center",
          letterSpacing: 2,
          position: "relative",
        }}
      >
        N = f(?, ?, ?)
      </div>
      {/* X cross overlay */}
      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 200,
          top: 720,
          width: 400,
          height: 400,
          fontSize: 380,
          color: COLORS.red,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1,
          opacity: sX,
          transform: `scale(${0.5 + sX * 0.5}) rotate(${(1 - sX) * 30}deg)`,
          textShadow: `0 0 60px ${COLORS.red}aa`,
        }}
      >
        ✕
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s22 — cần thời gian, theo dõi → bubble "À, xúc tác thật"
// ─────────────────────────────────────────────────────────────────
export const V_s22: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tBubble = findWordTime(words, "à") ?? findWordTime(words, "xúc") ?? 6;
  const sBubble = spring({ frame: frame - Math.round(tBubble * fps), fps, config: SPRINGS.resolve });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 600,
          width: VIDEO.width,
          textAlign: "center",
          fontSize: 240,
          opacity: 0.95,
        }}
      >
        ☕📰
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 920,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 32,
          fontWeight: 700,
          color: COLORS.textSecondary,
          letterSpacing: 2,
        }}
      >
        ⏳ THỜI GIAN · 📰 TIN TỨC · 🧠 HIỂU NGÀNH
      </div>

      {/* Thought bubble */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 1080,
          width: VIDEO.width - 160,
          padding: "24px 36px",
          background: `${COLORS.green}15`,
          border: `2.5px solid ${COLORS.green}`,
          borderRadius: 28,
          color: COLORS.green,
          fontFamily: FONTS.family,
          fontWeight: 800,
          fontSize: 42,
          textAlign: "center",
          opacity: sBubble,
          transform: `scale(${0.8 + sBubble * 0.2})`,
          boxShadow: `0 8px 30px ${COLORS.green}44`,
        }}
      >
        💡 "À, cái này có thể là <span style={{ textDecoration: "underline" }}>xúc tác thật</span>!"
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s23 — Bình thường thôi, ai cũng vậy
// ─────────────────────────────────────────────────────────────────
export const V_s23: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const sText = spring({ frame: frame - 18, fps: 30, config: SPRINGS.soft });
  const sUnder = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 700,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 36,
          fontWeight: 600,
          color: COLORS.textSecondary,
          letterSpacing: 1,
        }}
      >
        Mà này…
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 850,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 110,
          fontWeight: 900,
          color: COLORS.green,
          letterSpacing: -1,
          lineHeight: 1.1,
          opacity: sText,
          transform: `translateY(${(1 - sText) * 18}px)`,
          textShadow: `0 0 40px ${COLORS.green}55`,
        }}
      >
        BÌNH THƯỜNG<br />THÔI
      </div>

      {/* Hand-drawn underline */}
      <svg
        style={{ position: "absolute", left: VIDEO.width / 2 - 320, top: 1130, width: 640, height: 30 }}
        viewBox="0 0 640 30"
      >
        <path
          d="M10 20 Q200 5, 320 18 T630 16"
          fill="none"
          stroke={COLORS.green}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="640"
          strokeDashoffset={640 * (1 - sUnder)}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1190,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 36,
          fontWeight: 600,
          color: COLORS.textSecondary,
          letterSpacing: 1,
        }}
      >
        ai cũng vậy.
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s24 — Không phải lỗi của bạn
// ─────────────────────────────────────────────────────────────────
export const V_s24: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const sText = spring({ frame, fps: 30, config: SPRINGS.soft });
  const sCheck = spring({ frame: frame - 22, fps: 30, config: SPRINGS.resolve });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 880,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 80,
          fontWeight: 900,
          color: COLORS.green,
          letterSpacing: -1,
          lineHeight: 1.15,
          opacity: sText,
          transform: `translateY(${(1 - sText) * 14}px)`,
          textShadow: `0 0 40px ${COLORS.green}55`,
        }}
      >
        KHÔNG PHẢI<br />LỖI CỦA BẠN
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1180,
          width: VIDEO.width,
          textAlign: "center",
          fontSize: 120,
          opacity: sCheck,
          transform: `scale(${0.5 + sCheck * 0.5})`,
        }}
      >
        ✅
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s25 — Vấn đề: không tìm hiểu (warning amber)
// ─────────────────────────────────────────────────────────────────
export const V_s25: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const sLabel = spring({ frame, fps: 30, config: SPRINGS.calm });
  const sLine = spring({ frame: frame - 14, fps: 30, config: SPRINGS.calm });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 700,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 50,
          fontWeight: 800,
          color: COLORS.amber,
          letterSpacing: 4,
          opacity: sLabel,
          transform: `translateY(${(1 - sLabel) * -16}px)`,
        }}
      >
        ⚠️ VẤN ĐỀ NẾU…
      </div>

      <div
        style={{
          position: "absolute",
          left: 80,
          top: 880,
          width: VIDEO.width - 160,
          padding: 30,
          background: `${COLORS.amber}12`,
          border: `2px solid ${COLORS.amber}66`,
          borderRadius: 18,
          color: "white",
          fontFamily: FONTS.family,
          fontSize: 44,
          fontWeight: 700,
          lineHeight: 1.3,
          opacity: sLine,
          transform: `translateY(${(1 - sLine) * 20}px)`,
        }}
      >
        ❌ Không chịu bắt đầu tìm hiểu…
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s26 — Vấn đề: chơi ngắn hạn
// ─────────────────────────────────────────────────────────────────
export const V_s26: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const sLine = spring({ frame, fps: 30, config: SPRINGS.calm });
  const sIcon = spring({ frame: frame - 18, fps: 30, config: SPRINGS.decisive });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 700,
          width: VIDEO.width - 160,
          padding: 30,
          background: `${COLORS.amber}12`,
          border: `2px solid ${COLORS.amber}66`,
          borderRadius: 18,
          color: "white",
          fontFamily: FONTS.family,
          fontSize: 44,
          fontWeight: 700,
          lineHeight: 1.3,
          opacity: sLine,
        }}
      >
        ❌ Coi đầu tư là cuộc chơi <span style={{ color: COLORS.amber, fontWeight: 900 }}>NGẮN HẠN</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 980,
          width: VIDEO.width,
          textAlign: "center",
          fontSize: 200,
          opacity: sIcon,
        }}
      >
        ⏱️💸
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1230,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 38,
          fontWeight: 700,
          color: COLORS.amber,
          letterSpacing: 1,
          opacity: sIcon,
        }}
      >
        kiếm lời nhanh → rút
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s27 — Hành trình lâu dài: con đường uốn lượn về chân trời + cột mốc
// ─────────────────────────────────────────────────────────────────
export const V_s27: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sText = spring({ frame, fps, config: SPRINGS.soft });
  const sScene = spring({ frame, fps, config: SPRINGS.calm });

  // Sun rising — slowly moves up
  const sunY = 280 - Math.min(40, frame * 0.15);
  // Walking figure step bob
  const stepBob = Math.sin(frame * 0.4) * 3;
  // Milestone reveal stagger
  const milestoneSpring = (i: number) =>
    spring({ frame: frame - 18 - i * 12, fps, config: SPRINGS.resolve });

  return (
    <>
      {/* Scene SVG — winding path into sunrise horizon */}
      <div
        style={{
          position: "absolute",
          left: 30,
          top: 540,
          width: VIDEO.width - 60,
          height: 620,
          opacity: sScene,
        }}
      >
        <svg viewBox="0 0 1020 620" style={{ width: "100%", height: "100%" }}>
          <defs>
            {/* Warm dawn sky */}
            <linearGradient id="dawnSky" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1a3a30" />
              <stop offset="50%" stopColor="#3a3a28" />
              <stop offset="100%" stopColor="#5a3a18" />
            </linearGradient>
            {/* Sun glow */}
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f5c542" stopOpacity="1" />
              <stop offset="40%" stopColor="#f5a142" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f5a142" stopOpacity="0" />
            </radialGradient>
            {/* Path gradient — warm front to horizon */}
            <linearGradient id="pathG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5a3a18" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a78060" stopOpacity="0.95" />
            </linearGradient>
            {/* Mountain silhouette gradient */}
            <linearGradient id="mtnG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0a2418" />
              <stop offset="100%" stopColor="#1a3a28" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect x="0" y="0" width="1020" height="360" fill="url(#dawnSky)" />

          {/* Sun glow halo (large) */}
          <circle cx="510" cy={sunY + 10} r="180" fill="url(#sunGlow)" />
          {/* Sun disc */}
          <circle cx="510" cy={sunY} r="62" fill="#f5c542" opacity="0.95" />
          <circle cx="510" cy={sunY} r="68" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4" />

          {/* Distant mountain ranges (3 layers, parallax) */}
          <polygon
            points="0,360 100,290 240,320 360,260 480,310 620,250 760,310 900,260 1020,320 1020,360"
            fill="url(#mtnG)"
            opacity="0.55"
          />
          <polygon
            points="0,360 80,300 200,340 340,290 480,330 620,280 780,330 920,290 1020,340 1020,360"
            fill="#0a2418"
            opacity="0.85"
          />

          {/* Ground (foreground hill) */}
          <path
            d="M 0 360 Q 510 350 1020 360 L 1020 620 L 0 620 Z"
            fill="#03100a"
          />

          {/* Winding path — perspective curve from foreground (wide bottom) to horizon (narrow at sun) */}
          <path
            d="M 380 620
               L 640 620
               Q 590 540 550 470
               Q 520 410 510 360
               Q 510 360 510 360"
            fill="url(#pathG)"
            stroke="#a78060"
            strokeWidth="2"
            opacity="0.85"
          />
          {/* Path edge highlights (left + right) */}
          <path
            d="M 380 620 Q 470 530 510 360"
            fill="none"
            stroke="#f5c542"
            strokeWidth="2.5"
            opacity="0.7"
          />
          <path
            d="M 640 620 Q 555 540 510 360"
            fill="none"
            stroke="#f5c542"
            strokeWidth="2.5"
            opacity="0.7"
          />

          {/* Milestone markers along the path — 4 cột mốc tăng trưởng */}
          {[
            { t: 0.2, label: "1m", scale: 1.0 },
            { t: 0.45, label: "vài m", scale: 0.78 },
            { t: 0.7, label: "1 năm", scale: 0.55 },
            { t: 0.9, label: "vài năm", scale: 0.38 },
          ].map((m, i) => {
            // Position along the curve (approximate Bezier interpolation)
            const t = m.t;
            // Curve from (510,620) interpolating up: cx ≈ 510 - some offset reduced by t
            // Approximate using simplified linear interpolation between foreground center and horizon
            const cx = 510;
            const cy = 620 - t * 260;
            const sp = milestoneSpring(i);
            return (
              <g key={i} opacity={sp}>
                {/* Flag pole */}
                <line
                  x1={cx + 30 * m.scale}
                  y1={cy}
                  x2={cx + 30 * m.scale}
                  y2={cy - 50 * m.scale}
                  stroke="#a78060"
                  strokeWidth={2 * m.scale}
                />
                {/* Flag pennant */}
                <polygon
                  points={`${cx + 30 * m.scale},${cy - 50 * m.scale} ${cx + 30 * m.scale + 36 * m.scale},${cy - 42 * m.scale} ${cx + 30 * m.scale},${cy - 32 * m.scale}`}
                  fill="#34d399"
                  stroke="#0a2418"
                  strokeWidth={1 * m.scale}
                />
                {/* Time label */}
                <text
                  x={cx + 30 * m.scale + 14 * m.scale}
                  y={cy - 38 * m.scale}
                  fill="#0a2418"
                  fontSize={14 * m.scale}
                  fontWeight="900"
                  textAnchor="middle"
                  fontFamily="Be Vietnam Pro, sans-serif"
                >
                  {m.label}
                </text>
              </g>
            );
          })}

          {/* Walking figure silhouette — at foreground of path */}
          <g transform={`translate(490 ${555 + stepBob})`}>
            {/* Head */}
            <circle cx="0" cy="-44" r="9" fill="#1a2a20" stroke="#34d399" strokeWidth="1.5" />
            {/* Body */}
            <path
              d="M -8 -32 L 8 -32 L 6 0 L -6 0 Z"
              fill="#1a2a20"
              stroke="#34d399"
              strokeWidth="1.5"
            />
            {/* Backpack */}
            <rect x="-12" y="-30" width="6" height="20" rx="2" fill="#34d399" opacity="0.9" />
            {/* Walking stick */}
            <line x1="14" y1="-20" x2="20" y2="14" stroke="#a78060" strokeWidth="2" />
            {/* Legs (mid-stride) */}
            <line x1="-3" y1="0" x2={-6 + stepBob * 0.4} y2="20" stroke="#1a2a20" strokeWidth="3.5" />
            <line x1="3" y1="0" x2={6 - stepBob * 0.4} y2="20" stroke="#1a2a20" strokeWidth="3.5" />
          </g>

          {/* Subtle birds in distance */}
          <text x="700" y="180" fill="#ffffff" fontSize="14" opacity="0.55">~ ~</text>
          <text x="780" y="200" fill="#ffffff" fontSize="12" opacity="0.45">~</text>
          <text x="280" y="170" fill="#ffffff" fontSize="14" opacity="0.55">~ ~</text>
        </svg>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1190,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 60,
          fontWeight: 900,
          color: COLORS.green,
          letterSpacing: 1,
          opacity: sText,
          textShadow: `0 0 30px ${COLORS.green}66`,
        }}
      >
        HÀNH TRÌNH LÂU DÀI
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1280,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 26,
          fontWeight: 700,
          color: COLORS.amber,
          letterSpacing: 2,
          opacity: sText,
        }}
      >
        chủ động · vững vàng · bền bỉ
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s28 — 4 mốc đọc cùng 1 headline ngày càng sâu vào bản chất
// ─────────────────────────────────────────────────────────────────
export const V_s28: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  type Stage = {
    label: string;
    thought: string;
    blur: number;
    rowOpacity: number;
    color: string;
    isLast?: boolean;
  };
  const stages: Stage[] = [
    { label: "1 tháng",   thought: "🤔 Hay vậy ta?",                                blur: 4,   rowOpacity: 0.55, color: COLORS.textMute },
    { label: "vài tháng", thought: "📈 Sản phẩm mới ư?",                            blur: 2,   rowOpacity: 0.75, color: COLORS.textSecondary },
    { label: "1 năm",     thought: "🌐 Ngành bán dẫn đang nóng…",                  blur: 0.5, rowOpacity: 0.9,  color: COLORS.green },
    { label: "vài năm",   thought: "💡 Chất XÚC TÁC THẬT — kích thích kỳ vọng",   blur: 0,   rowOpacity: 1.0,  color: COLORS.gold, isLast: true },
  ];

  const lastT = words[words.length - 1]?.end ?? 6;
  const starts = stages.map((_, i) => (lastT * (i + 1)) / (stages.length + 1));

  const HEADLINE = "Doanh nghiệp X ra mắt chip 7nm";

  return (
    <div style={{ position: "absolute", left: 50, top: 540, width: VIDEO.width - 100, fontFamily: FONTS.family }}>
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.textMute,
          letterSpacing: 2,
          marginBottom: 14,
        }}
      >
        CÙNG 1 HEADLINE — ĐỌC NGÀY CÀNG SÂU
      </div>

      {/* 4 rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {stages.map((st, i) => {
          const sRow = spring({ frame: frame - Math.round(starts[i] * fps), fps, config: SPRINGS.resolve });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 14px",
                background: st.isLast ? `${COLORS.gold}18` : "rgba(255,255,255,0.04)",
                border: st.isLast ? `2px solid ${COLORS.gold}` : "1px solid rgba(255,255,255,0.10)",
                borderRadius: 14,
                opacity: sRow * st.rowOpacity,
                transform: `translateX(${(1 - sRow) * -40}px)`,
                boxShadow: st.isLast ? `0 0 36px ${COLORS.gold}55` : "none",
              }}
            >
              {/* Time label */}
              <div
                style={{
                  minWidth: 130,
                  textAlign: "center",
                  padding: "8px 6px",
                  background: st.isLast ? `${COLORS.gold}33` : "rgba(255,255,255,0.06)",
                  border: `1.5px solid ${st.color}88`,
                  borderRadius: 10,
                  color: st.color,
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: 1,
                }}
              >
                {st.label}
              </div>

              {/* Headline + thought */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Headline (blurred for early stages) */}
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: COLORS.textSecondary,
                    letterSpacing: 1.5,
                    marginBottom: 4,
                  }}
                >
                  📰 HEADLINE
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "white",
                    filter: `blur(${st.blur}px)`,
                    marginBottom: 8,
                    opacity: 1 - st.blur * 0.05,
                  }}
                >
                  {HEADLINE}
                </div>
                {/* Thought bubble */}
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: st.color,
                    lineHeight: 1.25,
                  }}
                >
                  {st.thought}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// s29 — 3 source cards: Tin tức / BCPT / Cộng đồng
// ─────────────────────────────────────────────────────────────────
export const V_s29: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = [
    { match: "tin", icon: "📰", label: "TIN TỨC", color: COLORS.purple },
    { match: "báo", icon: "📊", label: "BÁO CÁO PHÂN TÍCH", color: COLORS.green },
    { match: "cộng", icon: "👥", label: "CỘNG ĐỒNG", color: COLORS.gold },
  ];
  const starts = items.map((it) => findWordTime(words, it.match) ?? 0);

  return (
    <div style={{ position: "absolute", left: 0, top: 720, width: VIDEO.width, display: "flex", flexDirection: "column", gap: 22, alignItems: "center" }}>
      {items.map((it, i) => {
        const sCard = spring({ frame: frame - Math.round(starts[i] * fps), fps, config: SPRINGS.calm });
        return (
          <div
            key={i}
            style={{
              padding: "22px 36px",
              minWidth: 700,
              background: `${it.color}15`,
              border: `2px solid ${it.color}`,
              borderRadius: 18,
              fontFamily: FONTS.family,
              color: it.color,
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: 1,
              opacity: sCard,
              transform: `translateX(${(1 - sCard) * (i % 2 === 0 ? -100 : 100)}px) scale(${0.88 + sCard * 0.12})`,
              boxShadow: `0 6px 24px ${it.color}33`,
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <span style={{ fontSize: 56 }}>{it.icon}</span>
            <span>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// s30 — Không ai bắt đầu là pro liền
// ─────────────────────────────────────────────────────────────────
export const V_s30: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const sText = spring({ frame, fps: 30, config: SPRINGS.soft });
  const sSeed = spring({ frame: frame - 18, fps: 30, config: SPRINGS.soft });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 800,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 70,
          fontWeight: 900,
          color: COLORS.green,
          letterSpacing: -1,
          lineHeight: 1.2,
          opacity: sText,
          textShadow: `0 0 40px ${COLORS.green}55`,
        }}
      >
        Không ai bắt đầu<br />là <span style={{ color: COLORS.gold }}>PRO</span> liền.
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1180,
          width: VIDEO.width,
          textAlign: "center",
          fontSize: 160,
          opacity: sSeed,
          transform: `scale(${0.6 + sSeed * 0.4})`,
        }}
      >
        🌱
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s31 — Tease #03: SLIM
// ─────────────────────────────────────────────────────────────────
export const V_s31: React.FC<{ words: WT[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tSLIM = findWordTime(words, "slim") ?? findWordTime(words, "ét") ?? 1;
  const sSLIM = spring({ frame: frame - Math.round(tSLIM * fps), fps, config: SPRINGS.decisive });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 800,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 200,
          fontWeight: 900,
          letterSpacing: 8,
        }}
      >
        <span style={{ color: COLORS.textMute, opacity: 0.4 }}>CAN</span>
        <span
          style={{
            color: COLORS.purple,
            opacity: sSLIM,
            transform: `scale(${0.8 + sSLIM * 0.2})`,
            display: "inline-block",
            textShadow: `0 0 60px ${COLORS.purple}cc`,
          }}
        >
          SLIM
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1100,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.purple,
          letterSpacing: 3,
          opacity: sSLIM,
        }}
      >
        🎬 TẬP 03 — Phần "thị trường"
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// s32 — FOLLOW button
// ─────────────────────────────────────────────────────────────────
export const V_s32: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const sBtn = spring({ frame, fps: 30, config: SPRINGS.decisive });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 850,
        width: VIDEO.width,
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "32px 80px",
          background: COLORS.red,
          color: "white",
          fontFamily: FONTS.family,
          fontWeight: 900,
          fontSize: 76,
          letterSpacing: 2,
          borderRadius: 22,
          opacity: sBtn,
          transform: `scale(${0.7 + sBtn * 0.3})`,
          boxShadow: `0 16px 50px ${COLORS.red}66`,
        }}
      >
        ➕ FOLLOW
      </div>
      <div
        style={{
          marginTop: 30,
          fontFamily: FONTS.family,
          fontSize: 32,
          fontWeight: 600,
          color: COLORS.textSecondary,
          letterSpacing: 1,
          opacity: sBtn,
        }}
      >
        đừng bỏ lỡ tập SLIM
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// s33 — Tải KFSP bio
// ─────────────────────────────────────────────────────────────────
export const V_s33: React.FC<{ words: WT[] }> = () => {
  const frame = useCurrentFrame();
  const sPhone = spring({ frame, fps: 30, config: SPRINGS.decisive });
  const sArrow = (Math.sin(frame * 0.18) * 14);

  return (
    <>
      {/* Mini phone */}
      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 130,
          top: 720,
          width: 260,
          height: 460,
          background: "#0a0e16",
          border: "8px solid #2a3142",
          borderRadius: 28,
          padding: 14,
          opacity: sPhone,
          transform: `translateY(${(1 - sPhone) * 80}px) scale(${0.85 + sPhone * 0.15})`,
          boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(180deg, #14223d, #0a1628)",
            color: "white",
            fontFamily: FONTS.family,
            fontWeight: 800,
            fontSize: 18,
            padding: "12px",
            borderRadius: "16px 16px 0 0",
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          KFSP
        </div>
        <div style={{ padding: 10, color: "white", fontFamily: FONTS.family }}>
          <div style={{ fontSize: 14, color: COLORS.green, fontWeight: 700, marginBottom: 6 }}>✓ C — Quý ≥ 25%</div>
          <div style={{ fontSize: 14, color: COLORS.green, fontWeight: 700, marginBottom: 12 }}>✓ A — 3 năm liên tiếp</div>
          {["FPT +28%", "MWG +32%", "HPG +36%", "PNJ +40%"].map((t, i) => (
            <div key={i} style={{ fontSize: 16, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", color: "white", fontWeight: 700 }}>
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow + label */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1230,
          width: VIDEO.width,
          textAlign: "center",
          fontFamily: FONTS.family,
          fontSize: 60,
          fontWeight: 900,
          color: COLORS.gold,
          letterSpacing: 4,
          opacity: sPhone,
          transform: `translateY(${sArrow}px)`,
          textShadow: `0 0 40px ${COLORS.gold}88`,
        }}
      >
        ↓ TẢI KFSP Ở BIO ↓
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// Visual registry
// ─────────────────────────────────────────────────────────────────
export const VISUALS: Record<string, React.FC<{ words: WT[] }>> = {
  s01: V_s01, s02: V_s02, s03: V_s03, s04: V_s04, s05: V_s05,
  s06: V_s06, s07: V_s07, s08: V_s08, s09: V_s09, s10: V_s10,
  s11: V_s11, s12: V_s12, s13: V_s13, s14: V_s14, s15: V_s15,
  s16: V_s16, s17: V_s17, s18: V_s18, s19: V_s19, s20: V_s20,
  s21: V_s21, s22: V_s22, s23: V_s23, s24: V_s24, s25: V_s25,
  s26: V_s26, s27: V_s27, s28: V_s28, s29: V_s29, s30: V_s30,
  s31: V_s31, s32: V_s32, s33: V_s33,
};
