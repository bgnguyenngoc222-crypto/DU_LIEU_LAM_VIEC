import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Sentence } from "../types";
import { COLORS, FONT_STACK, SPRINGS } from "../design";
import { Background } from "../components/Background";

// =====================================================================
// s03 — "Vì khi chỉ dựa vào VN-Index, bạn dễ rơi vào cái bẫy mang tên
//        Xanh vỏ Đỏ lòng — Index xanh, nhưng tài khoản vẫn giảm dần
//        mà mình không hay."
// 9.38s ≈ 281 frames
// =====================================================================

export const SentenceS03: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background dim slow last 2s (heavy ám)
  const bgDim = interpolate(frame, [221, 281], [0, 0.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Index line draws 10-90f
  const indexProg = interpolate(frame, [10, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Account bars drop 30-110f
  const accProg = interpolate(frame, [30, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Xanh vỏ Đỏ lòng" pop @ f120 (heavy)
  const popSp = spring({ frame: frame - 120, fps, config: SPRINGS.heavy });
  const popScale = interpolate(popSp, [0, 1], [0.5, 1]);
  const popOp = interpolate(popSp, [0, 1], [0, 1]);

  return (
    <AbsoluteFill>
      <Background tint={bgDim} />

      {/* Split top — Index xanh vs Account đỏ */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 320,
          height: 600,
          display: "flex",
          gap: 24,
        }}
      >
        {/* LEFT card — Index */}
        <div
          style={{
            flex: 1,
            background: COLORS.bgPanel,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 24,
            padding: "32px 24px",
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            fontFamily: FONT_STACK,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: COLORS.textMuted,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            VN-Index
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.green,
              lineHeight: 1,
              textShadow: `0 0 24px rgba(52,211,153,0.4)`,
            }}
          >
            +1,3%
          </div>
          <svg width={400} height={320} viewBox="0 0 420 320" style={{ marginTop: 12 }}>
            <defs>
              <linearGradient id="gGreen" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor={COLORS.green} stopOpacity="0.4" />
                <stop offset="1" stopColor={COLORS.green} stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* baseline grid */}
            {[80, 160, 240].map((y) => (
              <line key={y} x1="0" x2="420" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
            ))}
            {(() => {
              const path = `M10,280 L70,260 L130,225 L190,195 L250,160 L310,115 L370,75 L410,45`;
              return (
                <>
                  <path
                    d={`${path} L410,300 L10,300 Z`}
                    fill="url(#gGreen)"
                    opacity={indexProg}
                  />
                  <path
                    d={path}
                    fill="none"
                    stroke={COLORS.green}
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeDasharray="600"
                    strokeDashoffset={600 - 600 * indexProg}
                  />
                </>
              );
            })()}
          </svg>
        </div>

        {/* RIGHT card — Account đỏ */}
        <div
          style={{
            flex: 1,
            background: COLORS.bgPanel,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 24,
            padding: "32px 24px",
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            fontFamily: FONT_STACK,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: COLORS.textMuted,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Tài khoản bạn
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.red,
              lineHeight: 1,
              textShadow: `0 0 24px rgba(248,113,113,0.4)`,
            }}
          >
            −2,5%
          </div>
          <svg width={400} height={320} viewBox="0 0 420 320" style={{ marginTop: 12 }}>
            {[80, 160, 240].map((y) => (
              <line key={y} x1="0" x2="420" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
            ))}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const baseH = 30 + i * 25;
              const h = baseH * accProg;
              const x = 20 + i * 56;
              return (
                <rect
                  key={i}
                  x={x}
                  y={300 - h}
                  width={40}
                  height={h}
                  fill={COLORS.red}
                  opacity={0.88}
                  rx={4}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* "XANH VỎ — ĐỎ LÒNG" gradient text pop @ f120 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1000,
          textAlign: "center",
          fontFamily: FONT_STACK,
          opacity: popOp,
          transform: `scale(${popScale})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: -2,
            background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.pink} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            textShadow: `0 0 40px rgba(245,197,66,0.3)`,
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
          }}
        >
          XANH VỎ
          <br />
          ĐỎ LÒNG
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 22,
            letterSpacing: 5,
            color: COLORS.textMuted,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          âm thầm bào mòn vốn
        </div>
      </div>
    </AbsoluteFill>
  );
};
