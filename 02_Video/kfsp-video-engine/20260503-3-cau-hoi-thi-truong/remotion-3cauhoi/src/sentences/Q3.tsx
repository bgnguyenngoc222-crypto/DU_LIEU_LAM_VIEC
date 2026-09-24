import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Sentence } from "../types";
import { COLORS, FONT_STACK, SPRINGS, SAFE_ZONE } from "../design";
import { Background } from "../components/Background";
import { PhoneMockup } from "../components/PhoneMockup";

function rng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// =====================================================================
// s17 (2.82s ≈ 85f) — Header "BA: Dòng tiền ở đâu?"
// =====================================================================
export const SentenceS17: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: SPRINGS.resolve });
  const op = interpolate(sp, [0, 1], [0, 1]);
  const sc = interpolate(sp, [0, 1], [0.7, 1]);
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
          Câu hỏi Ba
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
          3
        </div>
        <div
          style={{
            fontSize: 38,
            color: COLORS.textPrimary,
            fontWeight: 700,
            textAlign: "center",
            maxWidth: 940,
            lineHeight: 1.25,
            padding: "0 60px",
          }}
        >
          Dòng tiền đang tập trung ở đâu trên thị trường?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s18 (6.88s ≈ 207f) — Map metaphor: glowing zones (ngành hoạt động tích cực)
// =====================================================================
export const SentenceS18: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();

  // 8 zones with random positions, glow stagger
  const r = rng(33);
  const zones = Array.from({ length: 12 }, (_, i) => {
    const cx = 120 + r() * 840;
    const cy = SAFE_ZONE.contentTop + 60 + r() * 900;
    const radius = 50 + r() * 90;
    const delay = Math.floor(r() * 80);
    const isActive = r() > 0.55;
    return { cx, cy, radius, delay, isActive, idx: i };
  });

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
        Bản đồ ngành thị trường
      </div>

      {/* Zones */}
      {zones.map((z) => {
        const op = interpolate(
          frame,
          [z.delay, z.delay + 30],
          [0, z.isActive ? 0.85 : 0.25],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const pulse = z.isActive
          ? 1 + 0.05 * Math.sin((frame - z.delay) * 0.15)
          : 1;
        const color = z.isActive ? COLORS.green : COLORS.textMuted;
        return (
          <div
            key={z.idx}
            style={{
              position: "absolute",
              left: z.cx - z.radius,
              top: z.cy - z.radius,
              width: z.radius * 2,
              height: z.radius * 2,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              opacity: op,
              transform: `scale(${pulse})`,
              filter: z.isActive ? "blur(2px)" : "blur(4px)",
            }}
          />
        );
      })}

      {/* Caption */}
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
        }}
      >
        Đâu là nơi thị trường đang{" "}
        <span style={{ color: COLORS.green, fontWeight: 800 }}>hoạt động tích cực</span>?
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s19 (3.42s ≈ 103f) — "Dòng tiền đi đâu, thịnh vượng đến đó"
// Visual: animated flow line + "thịnh vượng" pop @ f80
// =====================================================================
export const SentenceS19: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flowProg = interpolate(frame, [0, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "thịnh vượng" pop @ f80
  const tvSp = spring({ frame: frame - 80, fps, config: SPRINGS.decisive });
  const tvOp = interpolate(tvSp, [0, 1], [0, 1]);
  const tvSc = interpolate(tvSp, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill>
      <Background />

      {/* Flow path */}
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
        viewBox="0 0 1080 1920"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flowG" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={COLORS.gold} />
            <stop offset="1" stopColor={COLORS.green} />
          </linearGradient>
        </defs>
        <path
          d="M120,500 Q 380,720 540,640 T 960,800"
          fill="none"
          stroke="url(#flowG)"
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray="1500"
          strokeDashoffset={1500 - 1500 * flowProg}
          filter="drop-shadow(0 0 16px rgba(245,197,66,0.6))"
        />
        {/* Coin dots along path */}
        {[0.2, 0.4, 0.6, 0.8].map((t) => {
          const op = interpolate(flowProg, [t, t + 0.15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          // approx position along curve
          const x = 120 + (960 - 120) * t;
          const y = 500 + Math.sin(t * Math.PI) * 200 + 100;
          return (
            <circle
              key={t}
              cx={x}
              cy={y}
              r={18}
              fill={COLORS.gold}
              opacity={op}
              filter="drop-shadow(0 0 12px rgba(245,197,66,0.8))"
            />
          );
        })}
      </svg>

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 60,
          textAlign: "center",
          fontFamily: FONT_STACK,
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.textPrimary,
          padding: "0 80px",
          lineHeight: 1.3,
        }}
      >
        <span style={{ color: COLORS.gold }}>Dòng tiền</span> đi đâu —
        <br />
        nơi đó trở nên...
      </div>

      {/* THỊNH VƯỢNG pop */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1180,
          textAlign: "center",
          fontFamily: FONT_STACK,
          opacity: tvOp,
          transform: `scale(${tvSc})`,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: COLORS.green,
            letterSpacing: -1,
            textShadow: `0 0 40px rgba(52,211,153,0.5)`,
          }}
        >
          THỊNH VƯỢNG.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s20 (4.26s ≈ 128f) — Split RRG + NLKQ. Beat 1 RRG @ f32, Beat 2 NLKQ @ f70
// =====================================================================
export const SentenceS20: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();

  // Beats (self-recorded): RRG @ f26, NLKQ @ f52
  const spotRRG = (() => {
    if (frame < 26) return interpolate(frame, [0, 26], [0.55, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    if (frame < 52) return 1;
    return interpolate(frame, [52, 90], [1, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  })();
  const spotNLKQ = (() => {
    if (frame < 52) return interpolate(frame, [26, 52], [0.55, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return interpolate(frame, [52, 90], [0.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
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
          fontSize: 24,
          letterSpacing: 4,
          color: COLORS.purple,
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        2 công cụ trên KFSP
      </div>

      {/* LEFT — RRG */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: SAFE_ZONE.contentTop + 110,
          opacity: spotRRG,
          transform: spotRRG > 0.85 ? `scale(1.05)` : `scale(0.92)`,
          transition: "all 0.3s",
        }}
      >
        <PhoneMockup
          src="screenshots/rrg_sector.PNG"
          width={380}
          tilt={{ rotateY: -8, rotateX: 3, rotate: -2 }}
          glow="rgba(167,139,250,0.45)"
          maskFadeBottom
        />
        <div
          style={{
            marginTop: 16,
            fontFamily: FONT_STACK,
            fontSize: 26,
            fontWeight: 800,
            color: COLORS.purple,
            textAlign: "center",
            letterSpacing: 3,
          }}
        >
          RRG
        </div>
      </div>

      {/* RIGHT — NLKQ */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: SAFE_ZONE.contentTop + 110,
          opacity: spotNLKQ,
          transform: spotNLKQ > 0.85 ? `scale(1.05)` : `scale(0.92)`,
          transition: "all 0.3s",
        }}
      >
        <PhoneMockup
          src="screenshots/noluc_ketqua_5d.PNG"
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
            fontWeight: 800,
            color: COLORS.purple,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          Nỗ lực Kết quả
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s21 (4.50s ≈ 135f) — RRG zoom, highlight upper-right quadrant + arrow ↗
// =====================================================================
export const SentenceS21: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: SPRINGS.calm });
  const op = interpolate(sp, [0, 1], [0, 1]);
  const sc = interpolate(sp, [0, 1], [0.85, 1]);

  // Arrow draws 40-100
  const arrProg = interpolate(frame, [40, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
        Trên RRG
      </div>

      {/* Phone mockup centered */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 100,
          display: "flex",
          justifyContent: "center",
          opacity: op,
          transform: `scale(${sc})`,
          transformOrigin: "center top",
        }}
      >
        <PhoneMockup
          src="screenshots/rrg_stock_in_sector.PNG"
          width={500}
          tilt={{ rotateY: -6, rotateX: 2, rotate: -1 }}
          glow="rgba(52,211,153,0.4)"
          maskFadeBottom
        />
      </div>

      {/* Arrow ↗ overlay */}
      <svg
        style={{
          position: "absolute",
          left: 580,
          top: SAFE_ZONE.contentTop + 250,
          pointerEvents: "none",
        }}
        width="280"
        height="280"
        viewBox="0 0 280 280"
      >
        <defs>
          <marker id="arrUR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill={COLORS.green} />
          </marker>
        </defs>
        <line
          x1="40"
          y1="240"
          x2="240"
          y2="40"
          stroke={COLORS.green}
          strokeWidth={9}
          strokeLinecap="round"
          markerEnd="url(#arrUR)"
          strokeDasharray="400"
          strokeDashoffset={400 - 400 * arrProg}
          filter="drop-shadow(0 0 12px rgba(52,211,153,0.7))"
        />
      </svg>

      {/* Caption bottom */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1200,
          textAlign: "center",
          fontFamily: FONT_STACK,
          fontSize: 26,
          color: COLORS.textPrimary,
          fontWeight: 700,
        }}
      >
        Ngành đi nhanh{" "}
        <span style={{ color: COLORS.green }}>↗ lên + sang phải</span>
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s22 (4.84s ≈ 146f) — NLKQ zoom rows, highlight Nỗ Lực + Kết Quả cùng tăng
// =====================================================================
export const SentenceS22: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: SPRINGS.calm });
  const op = interpolate(sp, [0, 1], [0, 1]);
  const sc = interpolate(sp, [0, 1], [0.85, 1]);

  // Outline pulse — 3 rows highlight stagger
  const rowProg = (i: number) =>
    interpolate(frame, [40 + i * 20, 60 + i * 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

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
        Trên Bảng Nỗ lực Kết quả
      </div>

      {/* Phone mockup */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 100,
          display: "flex",
          justifyContent: "center",
          opacity: op,
          transform: `scale(${sc})`,
          transformOrigin: "center top",
        }}
      >
        <PhoneMockup
          src="screenshots/noluc_ketqua_20d.PNG"
          width={500}
          tilt={{ rotateY: -6, rotateX: 2, rotate: -1 }}
          glow="rgba(52,211,153,0.4)"
          maskFadeBottom
        />
      </div>

      {/* Highlight rows overlay (3 rectangles) */}
      {[0, 1, 2].map((i) => {
        const p = rowProg(i);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 320,
              top: SAFE_ZONE.contentTop + 280 + i * 95,
              width: 440,
              height: 70,
              border: `3px solid ${COLORS.green}`,
              borderRadius: 12,
              boxShadow: `0 0 24px rgba(52,211,153,0.6)`,
              opacity: p * 0.85,
            }}
          />
        );
      })}

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1200,
          textAlign: "center",
          fontFamily: FONT_STACK,
          fontSize: 26,
          color: COLORS.textPrimary,
          fontWeight: 700,
        }}
      >
        <span style={{ color: COLORS.gold }}>Nỗ Lực</span> +{" "}
        <span style={{ color: COLORS.gold }}>Kết Quả</span>{" "}
        <span style={{ color: COLORS.green }}>cùng tăng ↑</span>
      </div>
    </AbsoluteFill>
  );
};
