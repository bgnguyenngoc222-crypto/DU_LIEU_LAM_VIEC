import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Sentence } from "../types";
import { COLORS, FONT_STACK, SPRINGS, SAFE_ZONE } from "../design";
import { Background } from "../components/Background";

// =====================================================================
// s23 (7.06s ≈ 212f) — Phòng thủ shield + cảnh báo
// =====================================================================
export const SentenceS23: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header in 0-30
  const hdrSp = spring({ frame, fps, config: SPRINGS.calm });
  const hdrOp = interpolate(hdrSp, [0, 1], [0, 1]);

  // Shield slam @ f80 (heavy)
  const shieldSp = spring({ frame: frame - 80, fps, config: SPRINGS.heavy });
  const shieldOp = interpolate(shieldSp, [0, 1], [0, 1]);
  const shieldSc = interpolate(shieldSp, [0, 1], [0.4, 1]);
  const shieldRot = interpolate(shieldSp, [0, 1], [-20, 0]);

  return (
    <AbsoluteFill>
      <Background />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 60,
          textAlign: "center",
          fontFamily: FONT_STACK,
          opacity: hdrOp,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: COLORS.textSecondary,
            fontWeight: 600,
            lineHeight: 1.45,
          }}
        >
          Sau 3 câu hỏi, nếu mình{" "}
          <span style={{ color: COLORS.red, fontWeight: 800 }}>
            không đi cùng hướng Index
          </span>
          {" "}và cũng{" "}
          <span style={{ color: COLORS.red, fontWeight: 800 }}>
            không phải nơi dòng tiền tới
          </span>
          ...
        </div>
      </div>

      {/* Shield SVG slam */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentCenterY - 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          opacity: shieldOp,
          transform: `scale(${shieldSc}) rotate(${shieldRot}deg)`,
          transformOrigin: "center center",
        }}
      >
        <svg width={280} height={320} viewBox="0 0 280 320">
          <defs>
            <linearGradient id="shldG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={COLORS.gold} />
              <stop offset="1" stopColor={COLORS.pink} />
            </linearGradient>
          </defs>
          <path
            d="M140,20 L260,60 L260,180 Q260,260 140,300 Q20,260 20,180 L20,60 Z"
            fill="url(#shldG)"
            stroke={COLORS.gold}
            strokeWidth={5}
            filter="drop-shadow(0 0 30px rgba(245,197,66,0.55))"
          />
          <text
            x="140"
            y="190"
            textAnchor="middle"
            fontSize="64"
            fontWeight="900"
            fill="#fff"
            fontFamily={FONT_STACK}
          >
            ✓
          </text>
        </svg>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: COLORS.gold,
            letterSpacing: 4,
            textShadow: `0 0 32px rgba(245,197,66,0.5)`,
            fontFamily: FONT_STACK,
          }}
        >
          PHÒNG THỦ
        </div>
        <div
          style={{
            fontSize: 24,
            letterSpacing: 5,
            color: COLORS.textSecondary,
            fontWeight: 700,
            textTransform: "uppercase",
            fontFamily: FONT_STACK,
          }}
        >
          chủ động
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s24 (5.72s ≈ 172f) — Nâng tiền mặt + sẵn sàng
// =====================================================================
export const SentenceS24: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cash percentage grows 0 → 50% over 0-100f
  const cashPct = interpolate(frame, [10, 100], [10, 50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bar fill grows
  const barProg = cashPct / 100;

  // SẴN SÀNG pop @ f130
  const ssSp = spring({ frame: frame - 130, fps, config: SPRINGS.decisive });
  const ssOp = interpolate(ssSp, [0, 1], [0, 1]);
  const ssSc = interpolate(ssSp, [0, 1], [0.6, 1]);

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
          letterSpacing: 5,
          color: COLORS.purple,
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        Tỷ lệ tiền mặt
      </div>

      {/* Big % display */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 100,
          textAlign: "center",
          fontFamily: FONT_STACK,
        }}
      >
        <div
          style={{
            fontSize: 280,
            fontWeight: 900,
            color: COLORS.gold,
            lineHeight: 1,
            textShadow: `0 0 60px rgba(245,197,66,0.5)`,
          }}
        >
          {Math.round(cashPct)}%
        </div>
      </div>

      {/* Horizontal bar growing */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: SAFE_ZONE.contentTop + 480,
          height: 40,
          background: COLORS.bgPanel,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${barProg * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${COLORS.gold} 0%, ${COLORS.green} 100%)`,
            boxShadow: `0 0 24px rgba(245,197,66,0.5)`,
          }}
        />
      </div>

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: SAFE_ZONE.contentTop + 580,
          textAlign: "center",
          fontFamily: FONT_STACK,
          fontSize: 26,
          color: COLORS.textSecondary,
          lineHeight: 1.45,
        }}
      >
        Đây không phải là <span style={{ color: COLORS.red }}>rút khỏi thị trường</span>
        <br />
        mà là...
      </div>

      {/* SẴN SÀNG pop */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1180,
          textAlign: "center",
          fontFamily: FONT_STACK,
          opacity: ssOp,
          transform: `scale(${ssSc})`,
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            color: COLORS.green,
            letterSpacing: 2,
            textShadow: `0 0 36px rgba(52,211,153,0.5)`,
          }}
        >
          SẴN SÀNG.
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 22,
            color: COLORS.textMuted,
            letterSpacing: 4,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          cho cơ hội tiếp theo
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s25 (4.06s ≈ 122f) — Tải KFSP — logo + badges
// =====================================================================
export const SentenceS25: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo pulse @ f30
  const logoSp = spring({ frame: frame - 5, fps, config: SPRINGS.decisive });
  const logoOp = interpolate(logoSp, [0, 1], [0, 1]);
  const logoSc = interpolate(logoSp, [0, 1], [0.5, 1]);

  // CTA text in @ f50
  const ctaSp = spring({ frame: frame - 40, fps, config: SPRINGS.calm });
  const ctaOp = interpolate(ctaSp, [0, 1], [0, 1]);
  const ctaTy = interpolate(ctaSp, [0, 1], [20, 0]);

  return (
    <AbsoluteFill>
      <Background />

      {/* Logo big center */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          opacity: logoOp,
          transform: `scale(${logoSc})`,
        }}
      >
        <Img
          src={staticFile("logo-kfsp.png")}
          style={{
            width: 280,
            height: 280,
            filter: `brightness(0) invert(1) drop-shadow(0 0 40px rgba(167,139,250,0.6))`,
          }}
        />
        <div
          style={{
            fontFamily: FONT_STACK,
            fontSize: 96,
            fontWeight: 900,
            color: COLORS.textPrimary,
            letterSpacing: 12,
            textShadow: `0 0 32px rgba(167,139,250,0.4)`,
          }}
        >
          KFSP
        </div>
        <div
          style={{
            fontFamily: FONT_STACK,
            fontSize: 22,
            color: COLORS.purple,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Phân tích thị trường thật
        </div>
      </div>

      {/* CTA bottom */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 1220,
          textAlign: "center",
          fontFamily: FONT_STACK,
          opacity: ctaOp,
          transform: `translateY(${ctaTy}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 48px",
            background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.pink} 100%)`,
            color: "#fff",
            borderRadius: 999,
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: 1,
            boxShadow: `0 12px 40px rgba(167,139,250,0.5)`,
          }}
        >
          Tải KFSP ngay →
        </div>
      </div>
    </AbsoluteFill>
  );
};
