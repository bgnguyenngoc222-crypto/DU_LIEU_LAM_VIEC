import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Sentence } from "../types";
import { COLORS, FONT_STACK, SPRINGS, SAFE_ZONE } from "../design";
import { Background } from "../components/Background";
import { PhoneMockup } from "../components/PhoneMockup";

// =====================================================================
// s01 — "Nếu bạn vẫn đang phân tích thị trường bằng cách mở chart VN-Index — hãy dừng ngay."
// 4.44s ≈ 134 frames
// Beat: vnindex_chart zoom-in 0-30f → STOP icon snap @ f60 + slash diagonal
// =====================================================================

export const SentenceS01: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone zoom-in 0-30f (calm zoom into chart, then slow continue)
  const zoomScale = interpolate(frame, [0, 30, 130], [0.85, 1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // STOP icon snap in @ f60 (heavy spring)
  const stopIn = spring({ frame: frame - 60, fps, config: SPRINGS.heavy });
  const stopScale = interpolate(stopIn, [0, 1], [0, 1]);
  const stopRotate = interpolate(stopIn, [0, 1], [-15, 0]);

  // Slash diagonal red — draws from f70 to f90
  const slashProgress = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background dim slightly when STOP appears
  const bgDim = interpolate(frame, [55, 65], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background tint={bgDim} />

      {/* Phone with VN-Index chart */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${zoomScale})`,
          transformOrigin: "center 55%",
        }}
      >
        <PhoneMockup
          src="screenshots/vnindex_chart.PNG"
          width={780}
          tilt={{ rotateY: -8, rotateX: 4, rotate: -2 }}
          glow="rgba(248,113,113,0.25)"
          maskFadeBottom
        />
      </div>

      {/* STOP icon — circle red with line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${stopScale}) rotate(${stopRotate}deg)`,
          opacity: stopScale,
        }}
      >
        <div
          style={{
            width: 360,
            height: 360,
            borderRadius: "50%",
            border: `18px solid ${COLORS.red}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10,22,40,0.55)",
            backdropFilter: "blur(8px)",
            boxShadow: `0 0 80px rgba(248,113,113,0.55), inset 0 0 60px rgba(248,113,113,0.20)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_STACK,
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: 6,
              color: COLORS.red,
              textShadow: `0 0 24px rgba(248,113,113,0.7)`,
            }}
          >
            STOP
          </div>
        </div>

        {/* Diagonal slash overlay drawn 70-90f */}
        <div
          style={{
            position: "absolute",
            left: 25,
            top: "50%",
            width: 310,
            height: 14,
            background: COLORS.red,
            transformOrigin: "left center",
            transform: `translateY(-50%) rotate(-45deg) scaleX(${slashProgress})`,
            boxShadow: `0 0 12px rgba(248,113,113,0.7)`,
            borderRadius: 4,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s02 — "Đây là cách những NĐT lâu năm làm. Đơn giản hơn bạn nghĩ — chỉ 3 câu hỏi mỗi ngày."
// 5.44s ≈ 164 frames
// Beat: bg fade dark navy clean → 3 question cards pulse in (stagger 6f)
// =====================================================================

export const SentenceS02: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline "NĐT LÂU NĂM" appears 0-30f
  const headlineIn = spring({ frame: frame - 0, fps, config: SPRINGS.calm });
  const headlineY = interpolate(headlineIn, [0, 1], [-30, 0]);
  const headlineOp = interpolate(headlineIn, [0, 1], [0, 1]);

  // 3 question cards stagger from f50, gap 12f
  const cardSprings = [0, 1, 2].map((i) =>
    spring({ frame: frame - (50 + i * 12), fps, config: SPRINGS.calm })
  );

  return (
    <AbsoluteFill>
      <Background />

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: SAFE_ZONE.contentTop + 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT_STACK,
          opacity: headlineOp,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 8,
            color: COLORS.purple,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          NĐT lâu năm làm gì?
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: -1,
            color: COLORS.textPrimary,
            lineHeight: 1.05,
          }}
        >
          Chỉ&nbsp;
          <span style={{ color: COLORS.gold }}>3 câu hỏi</span>
          <br />mỗi&nbsp;ngày.
        </div>
      </div>

      {/* 3 placeholder question cards */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 540,
          display: "flex",
          justifyContent: "center",
          gap: 28,
          padding: "0 80px",
        }}
      >
        {[1, 2, 3].map((n, i) => {
          const sp = cardSprings[i];
          const op = interpolate(sp, [0, 1], [0, 1]);
          const ty = interpolate(sp, [0, 1], [40, 0]);
          const sc = interpolate(sp, [0, 1], [0.85, 1]);
          return (
            <div
              key={n}
              style={{
                width: 240,
                height: 320,
                borderRadius: 24,
                background: COLORS.bgPanel,
                border: `1px solid ${COLORS.borderStrong}`,
                backdropFilter: "blur(10px)",
                boxShadow: `0 12px 40px rgba(0,0,0,0.45), inset 0 0 40px rgba(167,139,250,0.08)`,
                opacity: op,
                transform: `translateY(${ty}px) scale(${sc})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 18,
                fontFamily: FONT_STACK,
              }}
            >
              <div
                style={{
                  fontSize: 130,
                  fontWeight: 800,
                  lineHeight: 1,
                  color: COLORS.gold,
                  textShadow: `0 0 28px rgba(245,197,66,0.45)`,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontSize: 18,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: COLORS.textSecondary,
                  fontWeight: 700,
                }}
              >
                Câu hỏi
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
