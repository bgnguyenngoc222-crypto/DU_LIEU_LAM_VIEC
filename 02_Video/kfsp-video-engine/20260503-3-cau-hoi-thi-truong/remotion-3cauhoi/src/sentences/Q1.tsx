import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Sentence } from "../types";
import { COLORS, FONT_STACK, SPRINGS, SAFE_ZONE } from "../design";
import { Background } from "../components/Background";
import { PhoneMockup } from "../components/PhoneMockup";

// Big number header card — used by Q1, Q2, Q3 openings (s07, s12, s17)
function BigNumberHeader({
  number,
  label,
  question,
}: {
  number: string;
  label: string;
  question: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: SPRINGS.resolve });
  const op = interpolate(sp, [0, 1], [0, 1]);
  const sc = interpolate(sp, [0, 1], [0.7, 1]);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        fontFamily: FONT_STACK,
        opacity: op,
        transform: `scale(${sc})`,
      }}
    >
      <div
        style={{
          fontSize: 28,
          letterSpacing: 8,
          textTransform: "uppercase",
          color: COLORS.purple,
          fontWeight: 700,
        }}
      >
        Câu hỏi {label}
      </div>
      <div
        style={{
          fontSize: 280,
          fontWeight: 900,
          color: COLORS.gold,
          lineHeight: 1,
          textShadow: `0 0 60px rgba(245,197,66,0.45)`,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontSize: 38,
          color: COLORS.textPrimary,
          fontWeight: 700,
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.25,
          padding: "0 60px",
        }}
      >
        {question}
      </div>
    </div>
  );
}

// =====================================================================
// s07 (2.38s ≈ 72f) — header "MỘT: Tương quan tăng giảm"
// =====================================================================
export const SentenceS07: React.FC<{ sentence: Sentence }> = () => (
  <AbsoluteFill>
    <Background />
    <BigNumberHeader
      number="1"
      label="Một"
      question="Tương quan số mã tăng giảm đang thế nào?"
    />
  </AbsoluteFill>
);

// =====================================================================
// s08 (8.38s ≈ 252f) — "đồng pha → phát hiện sớm Xanh vỏ Đỏ lòng"
// Visual: 2 lines side by side. f0-120: đồng pha. f120+: B drift xuống.
//        "Xanh vỏ Đỏ lòng" gold pop @ f180.
// =====================================================================
export const SentenceS08: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 draw 0-120 (both ascending together)
  const drawProg = interpolate(frame, [10, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2 — line B (cổ phiếu) drift down from f120
  const driftProg = interpolate(frame, [120, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Xanh vỏ Đỏ lòng" pop @ f180
  const popSp = spring({ frame: frame - 180, fps, config: SPRINGS.heavy });
  const popOp = interpolate(popSp, [0, 1], [0, 1]);
  const popSc = interpolate(popSp, [0, 1], [0.7, 1]);

  // Path computations
  const linAscend = "M40,300 L120,260 L200,220 L280,180 L360,150 L440,120 L520,90 L600,70 L680,55 L760,40";
  // Line B with drift: end Y rises (going down on screen) when driftProg
  const yEnd = 40 + driftProg * 220;
  const linDrift = `M40,300 L120,260 L200,220 L280,180 L360,150 L440,${150 + driftProg * 50} L520,${130 + driftProg * 90} L600,${110 + driftProg * 140} L680,${80 + driftProg * 200} L760,${yEnd}`;

  return (
    <AbsoluteFill>
      <Background />

      {/* Eyebrow */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 40,
          textAlign: "center",
          fontFamily: FONT_STACK,
          fontSize: 22,
          letterSpacing: 5,
          color: COLORS.purple,
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        Đồng pha hay không?
      </div>

      {/* Chart */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: SAFE_ZONE.contentTop + 130,
        }}
      >
        <svg width="100%" height={420} viewBox="0 0 800 360">
          <defs>
            <linearGradient id="g_idx" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={COLORS.purple} stopOpacity="0.35" />
              <stop offset="1" stopColor={COLORS.purple} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[60, 150, 240].map((y) => (
            <line key={y} x1="0" x2="800" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
          ))}
          {/* Line A — Index (purple, always up) */}
          <path
            d={linAscend}
            fill="none"
            stroke={COLORS.purple}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray="900"
            strokeDashoffset={900 - 900 * drawProg}
            filter="drop-shadow(0 0 8px rgba(167,139,250,0.5))"
          />
          {/* Line B — cổ phiếu (green→red drift) */}
          <path
            d={linDrift}
            fill="none"
            stroke={driftProg > 0.4 ? COLORS.red : COLORS.green}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray="900"
            strokeDashoffset={900 - 900 * drawProg}
            opacity={drawProg}
            filter={`drop-shadow(0 0 8px ${driftProg > 0.4 ? "rgba(248,113,113,0.6)" : "rgba(52,211,153,0.5)"})`}
          />
        </svg>
        {/* Legend */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            marginTop: 16,
            fontFamily: FONT_STACK,
            fontSize: 22,
            color: COLORS.textSecondary,
          }}
        >
          <div>
            <span style={{ color: COLORS.purple, fontWeight: 800 }}>━━</span> VN-Index
          </div>
          <div>
            <span style={{ color: driftProg > 0.4 ? COLORS.red : COLORS.green, fontWeight: 800 }}>━━</span> Phần lớn cổ phiếu
          </div>
        </div>
      </div>

      {/* "Xanh vỏ Đỏ lòng" pop overlay */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1100,
          textAlign: "center",
          fontFamily: FONT_STACK,
          opacity: popOp,
          transform: `scale(${popSc})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 40px",
            background: COLORS.bgPanel,
            border: `2px solid ${COLORS.gold}`,
            borderRadius: 20,
            fontSize: 44,
            fontWeight: 800,
            background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.pink} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          ⚠ Xanh vỏ — Đỏ lòng
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s09 (9.12s ≈ 274f) — Beat 1 spotlight bản đồ nhiệt @ f25
//                       Beat 2 spotlight bảng thống kê @ f58
// Split: heatmap_5d.PNG + ad_counting.PNG side by side
// =====================================================================
export const SentenceS09: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beats (self-recorded): heatmap @ f38, statistics @ f71
  const spotHeatmap = (() => {
    if (frame < 38) return interpolate(frame, [0, 38], [0.55, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    if (frame < 71) return 1;
    if (frame < 100) return interpolate(frame, [71, 100], [1, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return 0.85;
  })();
  const spotCounting = (() => {
    if (frame < 71) return interpolate(frame, [38, 71], [0.55, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    if (frame < 100) return interpolate(frame, [71, 100], [0.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return 0.95;
  })();

  // Eyebrow text
  const ebOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Background />

      {/* Eyebrow */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 30,
          textAlign: "center",
          fontFamily: FONT_STACK,
          fontSize: 24,
          letterSpacing: 4,
          color: COLORS.purple,
          textTransform: "uppercase",
          fontWeight: 700,
          opacity: ebOp,
        }}
      >
        2 cách trên KFSP
      </div>

      {/* LEFT — heatmap_5d */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: SAFE_ZONE.contentTop + 110,
          opacity: spotHeatmap,
          transform: spotHeatmap > 0.85 ? `scale(1.05)` : `scale(0.92)`,
          transition: "all 0.3s",
        }}
      >
        <PhoneMockup
          src="screenshots/heatmap_5d.PNG"
          width={380}
          tilt={{ rotateY: -8, rotateX: 3, rotate: -2 }}
          glow="rgba(167,139,250,0.45)"
          maskFadeBottom
        />
        <div
          style={{
            marginTop: 16,
            fontFamily: FONT_STACK,
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.purple,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          Bản đồ nhiệt
        </div>
      </div>

      {/* RIGHT — ad_counting */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: SAFE_ZONE.contentTop + 110,
          opacity: spotCounting,
          transform: spotCounting > 0.85 ? `scale(1.05)` : `scale(0.92)`,
          transition: "all 0.3s",
        }}
      >
        <PhoneMockup
          src="screenshots/ad_counting.PNG"
          width={380}
          tilt={{ rotateY: 8, rotateX: 3, rotate: 2 }}
          glow="rgba(167,139,250,0.45)"
          maskFadeBottom
        />
        <div
          style={{
            marginTop: 16,
            fontFamily: FONT_STACK,
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.purple,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          Bảng thống kê
        </div>
      </div>

      {/* Bottom: 2 chip summary */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1180,
          textAlign: "center",
          fontFamily: FONT_STACK,
          fontSize: 26,
          color: COLORS.textPrimary,
          fontWeight: 600,
        }}
      >
        <span style={{ color: COLORS.red, fontWeight: 800 }}>Đỏ</span>{" "}
        nhiều hơn — hay{" "}
        <span style={{ color: COLORS.green, fontWeight: 800 }}>Xanh</span>{" "}
        nhiều hơn?
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s10 (3.22s ≈ 97f) — "Đơn giản như đứa trẻ nhìn. Đừng áp đặt suy nghĩ cá nhân."
// Visual: child eye icon + text card
// =====================================================================
export const SentenceS10: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: SPRINGS.soft });
  const op = interpolate(sp, [0, 1], [0, 1]);
  const sc = interpolate(sp, [0, 1], [0.85, 1]);
  return (
    <AbsoluteFill>
      <Background />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          fontFamily: FONT_STACK,
          opacity: op,
          transform: `scale(${sc})`,
        }}
      >
        {/* Stylized child eye */}
        <svg width={280} height={280} viewBox="0 0 280 280">
          <defs>
            <radialGradient id="eyeG" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor={COLORS.gold} stopOpacity="0.9" />
              <stop offset="0.6" stopColor={COLORS.gold} stopOpacity="0.4" />
              <stop offset="1" stopColor={COLORS.gold} stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Outer glow */}
          <circle cx="140" cy="140" r="135" fill="url(#eyeG)" opacity="0.3" />
          {/* Eye outline */}
          <ellipse cx="140" cy="140" rx="120" ry="70" fill="none" stroke={COLORS.gold} strokeWidth={5} />
          {/* Iris */}
          <circle cx="140" cy="140" r="48" fill={COLORS.gold} opacity="0.85" />
          {/* Pupil */}
          <circle cx="140" cy="140" r="22" fill={COLORS.bgPrimary} />
          {/* Highlight */}
          <circle cx="125" cy="125" r="8" fill="#fff" />
        </svg>

        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: COLORS.textPrimary,
            textAlign: "center",
            letterSpacing: -1,
            lineHeight: 1.1,
          }}
        >
          Đơn giản như{" "}
          <span style={{ color: COLORS.gold }}>đứa trẻ nhìn</span>.
        </div>
        <div
          style={{
            fontSize: 26,
            color: COLORS.red,
            fontWeight: 700,
            textAlign: "center",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Đừng áp đặt suy nghĩ cá nhân
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s11 (6.96s ≈ 209f) — Bản đồ nhiệt 1, 5, 20 phiên crossfade
// Beats: 1 phiên @ f52, 5 phiên @ f72, 20 phiên @ f89
// =====================================================================
export const SentenceS11: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();

  // Beats (self-recorded): 1 phiên @ f62, 5 phiên @ f80, 20 phiên @ f96
  const op1d = (() => {
    if (frame < 62) return interpolate(frame, [0, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    if (frame < 80) return interpolate(frame, [62, 80], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return 0;
  })();
  const op5d = (() => {
    if (frame < 62) return 0;
    if (frame < 80) return interpolate(frame, [62, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    if (frame < 96) return interpolate(frame, [80, 96], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return 0;
  })();
  const op20d = (() => {
    if (frame < 80) return 0;
    if (frame < 96) return interpolate(frame, [80, 96], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return 1;
  })();

  const labels = [
    { text: "1 PHIÊN", at: 62 },
    { text: "5 PHIÊN", at: 80 },
    { text: "20 PHIÊN", at: 96 },
  ];
  const activeLabel = (() => {
    if (frame >= 96) return labels[2];
    if (frame >= 80) return labels[1];
    if (frame >= 62) return labels[0];
    return labels[0];
  })();

  return (
    <AbsoluteFill>
      <Background />

      {/* Eyebrow */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 30,
          textAlign: "center",
          fontFamily: FONT_STACK,
          fontSize: 22,
          letterSpacing: 4,
          color: COLORS.purple,
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        Bản đồ nhiệt KFSP
      </div>

      {/* Stacked phone mockups crossfade */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 100,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", width: 460, height: 920 }}>
          <div style={{ position: "absolute", inset: 0, opacity: op1d }}>
            <PhoneMockup
              src="screenshots/heatmap_1d.PNG"
              width={460}
              tilt={{ rotateY: -6, rotateX: 2, rotate: -1 }}
              glow="rgba(167,139,250,0.4)"
              maskFadeBottom
            />
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: op5d }}>
            <PhoneMockup
              src="screenshots/heatmap_5d.PNG"
              width={460}
              tilt={{ rotateY: -6, rotateX: 2, rotate: -1 }}
              glow="rgba(167,139,250,0.4)"
              maskFadeBottom
            />
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: op20d }}>
            <PhoneMockup
              src="screenshots/heatmap_20d.PNG"
              width={460}
              tilt={{ rotateY: -6, rotateX: 2, rotate: -1 }}
              glow="rgba(167,139,250,0.4)"
              maskFadeBottom
            />
          </div>
        </div>
      </div>

      {/* Active label chip pop bottom */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1180,
          textAlign: "center",
          fontFamily: FONT_STACK,
        }}
      >
        <span
          key={activeLabel.text}
          style={{
            display: "inline-block",
            padding: "14px 32px",
            borderRadius: 999,
            background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.pink} 100%)`,
            color: "#fff",
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: 4,
            boxShadow: `0 0 30px rgba(167,139,250,0.5)`,
          }}
        >
          {activeLabel.text}
        </span>
      </div>
    </AbsoluteFill>
  );
};
