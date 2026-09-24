import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Sentence } from "../types";
import { COLORS, FONT_STACK, SPRINGS, SAFE_ZONE } from "../design";
import { Background } from "../components/Background";
import { PhoneMockup } from "../components/PhoneMockup";

// =====================================================================
// s12 (3.08s ≈ 93f) — Header "HAI: Đồng thuận giữa cổ phiếu và Index"
// =====================================================================
export const SentenceS12: React.FC<{ sentence: Sentence }> = () => {
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
          Câu hỏi Hai
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
          2
        </div>
        <div
          style={{
            fontSize: 38,
            color: COLORS.textPrimary,
            fontWeight: 700,
            textAlign: "center",
            maxWidth: 920,
            lineHeight: 1.25,
            padding: "0 60px",
          }}
        >
          Xu hướng có đồng thuận giữa cổ phiếu và Index không?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s13 (5.18s ≈ 156f) — William O'Neil + 75% pop
// "Trong một xu hướng rõ rệt, 75% cổ phiếu sẽ đi theo"
// =====================================================================
export const SentenceS13: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header in 0-30
  const hdrSp = spring({ frame, fps, config: SPRINGS.calm });
  const hdrOp = interpolate(hdrSp, [0, 1], [0, 1]);
  const hdrTy = interpolate(hdrSp, [0, 1], [-20, 0]);

  // 75% pop @ f60 heavy
  const popSp = spring({ frame: frame - 60, fps, config: SPRINGS.heavy });
  const popOp = interpolate(popSp, [0, 1], [0, 1]);
  const popSc = interpolate(popSp, [0, 1], [0.5, 1]);

  return (
    <AbsoluteFill>
      <Background />

      {/* Top: William O'Neil attribution */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 60,
          textAlign: "center",
          fontFamily: FONT_STACK,
          opacity: hdrOp,
          transform: `translateY(${hdrTy}px)`,
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 4,
            color: COLORS.textMuted,
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Nguyên lý của
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: COLORS.purple,
            letterSpacing: -1,
            textShadow: `0 0 28px rgba(167,139,250,0.45)`,
          }}
        >
          William O'Neil
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 24,
            color: COLORS.textSecondary,
            fontStyle: "italic",
          }}
        >
          "Trong một xu hướng rõ rệt..."
        </div>
      </div>

      {/* Big 75% center */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 880,
          textAlign: "center",
          fontFamily: FONT_STACK,
          opacity: popOp,
          transform: `scale(${popSc})`,
        }}
      >
        <div
          style={{
            fontSize: 360,
            fontWeight: 900,
            color: COLORS.gold,
            lineHeight: 0.9,
            textShadow: `0 0 80px rgba(245,197,66,0.55), 0 12px 40px rgba(0,0,0,0.5)`,
          }}
        >
          75
          <span style={{ fontSize: 180, fontWeight: 800, color: COLORS.gold }}>%</span>
        </div>
        <div
          style={{
            marginTop: -20,
            fontSize: 30,
            fontWeight: 700,
            color: COLORS.green,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          cổ phiếu sẽ đi theo
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s14 (9.32s ≈ 280f) — "Số đông vs đơn lẻ"
// Visual: 1 fat green line (Index) ↑, 8 thin red lines (cổ phiếu) drift xuống
// =====================================================================
export const SentenceS14: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();

  // Index (fat) draws 0-90
  const idxProg = interpolate(frame, [0, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 8 stocks (thin) reveal stagger 60-220
  const stockProg = interpolate(frame, [60, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Caption
  const capOp = interpolate(frame, [180, 230], [0, 1], {
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
          fontSize: 24,
          letterSpacing: 4,
          color: COLORS.purple,
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        Số đông vs đơn lẻ
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
        <svg width="100%" height={560} viewBox="0 0 800 480">
          <defs>
            <linearGradient id="gIdxFat" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={COLORS.green} stopOpacity="0.45" />
              <stop offset="1" stopColor={COLORS.green} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[80, 200, 320, 440].map((y) => (
            <line key={y} x1="0" x2="800" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
          ))}
          {/* Fat green Index ascending */}
          {(() => {
            const path = "M40,400 L120,360 L200,310 L280,260 L360,210 L440,170 L520,130 L600,100 L680,70 L760,40";
            return (
              <>
                <path d={`${path} L760,480 L40,480 Z`} fill="url(#gIdxFat)" opacity={idxProg} />
                <path
                  d={path}
                  fill="none"
                  stroke={COLORS.green}
                  strokeWidth={10}
                  strokeLinecap="round"
                  strokeDasharray="900"
                  strokeDashoffset={900 - 900 * idxProg}
                  filter="drop-shadow(0 0 12px rgba(52,211,153,0.6))"
                />
              </>
            );
          })()}
          {/* 8 thin red stock lines drifting down */}
          {Array.from({ length: 8 }, (_, i) => {
            const startY = 200 + i * 25;
            const endY = startY + 100 + i * 15;
            const path = `M40,${startY} L760,${endY}`;
            const segDelay = i * 0.05;
            const segProg = Math.max(0, Math.min(1, (stockProg - segDelay) / (1 - segDelay)));
            return (
              <path
                key={i}
                d={path}
                fill="none"
                stroke={COLORS.red}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="900"
                strokeDashoffset={900 - 900 * segProg}
                opacity={0.65}
              />
            );
          })}
        </svg>
      </div>

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
          opacity: capOp,
        }}
      >
        Index <span style={{ color: COLORS.green, fontWeight: 800 }}>tăng</span>, nhưng phần lớn cổ phiếu đang{" "}
        <span style={{ color: COLORS.red, fontWeight: 800 }}>suy yếu</span>
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s15 (9.26s ≈ 278f) — % cổ phiếu trên MA — biểu đồ giảm dần + cảnh báo
// =====================================================================
export const SentenceS15: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone mockup centered, scale in 0-30
  const phSp = spring({ frame, fps, config: SPRINGS.calm });
  const phOp = interpolate(phSp, [0, 1], [0, 1]);
  const phSc = interpolate(phSp, [0, 1], [0.85, 1]);

  // Arrow draws 60-150
  const arrProg = interpolate(frame, [60, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // BẤT THƯỜNG pop @ f200
  const warnSp = spring({ frame: frame - 200, fps, config: SPRINGS.heavy });
  const warnOp = interpolate(warnSp, [0, 1], [0, 1]);
  const warnSc = interpolate(warnSp, [0, 1], [0.6, 1]);

  // CẨN THẬN pop @ f240
  const cautSp = spring({ frame: frame - 240, fps, config: SPRINGS.decisive });
  const cautOp = interpolate(cautSp, [0, 1], [0, 1]);

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
        Biểu đồ % cổ phiếu trên MA
      </div>

      {/* Phone with screenshot */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 100,
          display: "flex",
          justifyContent: "center",
          opacity: phOp,
          transform: `scale(${phSc})`,
          transformOrigin: "center top",
        }}
      >
        <PhoneMockup
          src="screenshots/percent_above_ma.PNG"
          width={460}
          tilt={{ rotateY: -8, rotateX: 3, rotate: -1.5 }}
          glow="rgba(248,113,113,0.35)"
          maskFadeBottom
        />
      </div>

      {/* Diagonal red arrow ↓ overlay (on top of phone) */}
      <svg
        style={{
          position: "absolute",
          left: 380,
          top: SAFE_ZONE.contentTop + 220,
          pointerEvents: "none",
        }}
        width="320"
        height="380"
        viewBox="0 0 320 380"
      >
        <defs>
          <marker id="arrHead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill={COLORS.red} />
          </marker>
        </defs>
        <line
          x1="40"
          y1="20"
          x2="280"
          y2="320"
          stroke={COLORS.red}
          strokeWidth={8}
          strokeLinecap="round"
          markerEnd="url(#arrHead)"
          strokeDasharray="500"
          strokeDashoffset={500 - 500 * arrProg}
          filter="drop-shadow(0 0 12px rgba(248,113,113,0.8))"
        />
      </svg>

      {/* "BẤT THƯỜNG" warning */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1090,
          textAlign: "center",
          fontFamily: FONT_STACK,
          opacity: warnOp,
          transform: `scale(${warnSc})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "14px 36px",
            background: COLORS.red,
            color: "#fff",
            borderRadius: 16,
            fontSize: 38,
            fontWeight: 900,
            letterSpacing: 4,
            boxShadow: `0 0 40px rgba(248,113,113,0.6)`,
          }}
        >
          ⚠ BẤT THƯỜNG
        </div>
      </div>

      {/* "Hãy cẩn thận" */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1200,
          textAlign: "center",
          fontFamily: FONT_STACK,
          fontSize: 28,
          fontWeight: 800,
          color: COLORS.red,
          letterSpacing: 3,
          opacity: cautOp,
        }}
      >
        Hãy cẩn thận.
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s16 (5.54s ≈ 167f) — Takeaway "Xu hướng cần số đông cổ phiếu mới bền vững"
// =====================================================================
export const SentenceS16: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: SPRINGS.resolve });
  const op = interpolate(sp, [0, 1], [0, 1]);
  const ty = interpolate(sp, [0, 1], [40, 0]);

  // "BỀN VỮNG" green bold pop @ f130
  const bvSp = spring({ frame: frame - 130, fps, config: SPRINGS.decisive });
  const bvOp = interpolate(bvSp, [0, 1], [0, 1]);
  const bvSc = interpolate(bvSp, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill>
      <Background />
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: SAFE_ZONE.contentCenterY - 200,
          fontFamily: FONT_STACK,
          opacity: op,
          transform: `translateY(${ty}px)`,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            textAlign: "center",
            fontSize: 22,
            letterSpacing: 6,
            color: COLORS.purple,
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 30,
          }}
        >
          ★ Nhớ nha ★
        </div>
        {/* Glass card */}
        <div
          style={{
            background: COLORS.bgPanel,
            border: `1px solid ${COLORS.borderStrong}`,
            borderRadius: 28,
            padding: "44px 48px",
            textAlign: "center",
            boxShadow: `0 18px 48px rgba(0,0,0,0.4), inset 0 0 60px rgba(167,139,250,0.06)`,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.textPrimary,
              lineHeight: 1.4,
            }}
          >
            Xu hướng của Index cần có sự ủng hộ của{" "}
            <span style={{ color: COLORS.green }}>số đông cổ phiếu</span>{" "}
            mới có thể hi vọng
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 90,
              fontWeight: 900,
              color: COLORS.green,
              letterSpacing: 2,
              textShadow: `0 0 32px rgba(52,211,153,0.45)`,
              opacity: bvOp,
              transform: `scale(${bvSc})`,
            }}
          >
            BỀN VỮNG.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
