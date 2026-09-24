import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../../design";

// Tam suất analogy — Scene 3 ending
// Phân số dạng trên/dưới: 3/4 = x/12. Tam suất = nhân chéo chia ngang.
// Computation: 12 × 3 / 4 = 36 / 4 = 9

interface Props {
  startFrame?: number;
}

// Vertical fraction numerator/denominator
const Fraction: React.FC<{
  num: React.ReactNode;
  den: React.ReactNode;
  numColor?: string;
  denColor?: string;
  size?: number;
  opacity?: number;
}> = ({ num, den, numColor = "#FFFFFF", denColor = "#FFFFFF", size = 120, opacity = 1 }) => (
  <div
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      lineHeight: 1,
      opacity,
    }}
  >
    <div
      style={{
        fontFamily: FONTS.family,
        fontSize: size,
        fontWeight: 700,
        color: numColor,
        minWidth: size * 0.9,
        textAlign: "center",
        textShadow: "0 0 4px rgba(255,255,255,0.2)",
      }}
    >
      {num}
    </div>
    <div
      style={{
        width: "85%",
        height: 5,
        background: "#FFFFFF",
        borderRadius: 2,
        marginTop: 6,
        marginBottom: 6,
      }}
    />
    <div
      style={{
        fontFamily: FONTS.family,
        fontSize: size,
        fontWeight: 700,
        color: denColor,
        minWidth: size * 0.9,
        textAlign: "center",
        textShadow: "0 0 4px rgba(255,255,255,0.2)",
      }}
    >
      {den}
    </div>
  </div>
);

export const TamSuatScene: React.FC<Props> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - startFrame;

  // Phase timeline (scene relative to startFrame, fps 30)
  // Scene ~150 frames total (5s)
  //   0-12    Blackboard + title slide in
  //   12-35   Fraction 3/4 xuất hiện
  //   35-55   "=" + Fraction x/12 xuất hiện
  //   55-85   Nhân chéo (2 mũi tên diagonal xuất hiện, chữ "nhân chéo chia ngang" hiện)
  //   85-110  Viết "12 × 3 = 36" rồi "36 / 4 = 9" dưới bảng
  //   110-150 x = 9 highlight + 3 dòng quy tắc

  const boardProg = spring({ frame: local, fps, config: SPRINGS.calm });
  const titleProg = spring({ frame: local - 4, fps, config: SPRINGS.resolve });

  const frac1Prog = spring({ frame: local - 12, fps, config: SPRINGS.resolve });
  const equalsProg = spring({ frame: local - 28, fps, config: SPRINGS.resolve });
  const frac2Prog = spring({ frame: local - 35, fps, config: SPRINGS.resolve });

  const crossProg = interpolate(local, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hintProg = spring({ frame: local - 62, fps, config: SPRINGS.soft });

  const calc1Prog = spring({ frame: local - 85, fps, config: SPRINGS.resolve });
  const calc2Prog = spring({ frame: local - 98, fps, config: SPRINGS.resolve });
  const answerProg = spring({ frame: local - 110, fps, config: SPRINGS.decisive });

  // Blackboard geometry — fit giữa logo (top=290) và subtitle (top=1380)
  // Usable y: 290-1370 (1080px). Leave 20px margin top/bottom inside safe zone.
  const BOARD_LEFT = 80;
  const BOARD_TOP = 320;
  const BOARD_W = 920;
  const BOARD_H = 1020;

  // Fraction positions (relative to board center)
  const BOARD_CX = BOARD_LEFT + BOARD_W / 2; // 540
  const FRAC_Y = BOARD_TOP + 90; // top of fraction pair area
  const FRAC_GAP = 115;
  const LEFT_FRAC_X = BOARD_CX - 180;
  const RIGHT_FRAC_X = BOARD_CX + 180;

  return (
    <>
      {/* Title chip — ngay dưới logo, trên blackboard */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleProg,
          transform: `translateY(${(1 - titleProg) * -10}px)`,
          zIndex: 30,
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: COLORS.accentGold,
            color: "#FFFFFF",
            padding: "8px 24px",
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: 3,
            borderRadius: 24,
            boxShadow: "0 4px 20px rgba(245, 197, 66, 0.4)",
          }}
        >
          QUY TẮC TAM SUẤT
        </span>
      </div>

      {/* Blackboard */}
      <div
        style={{
          position: "absolute",
          left: BOARD_LEFT,
          top: BOARD_TOP,
          width: BOARD_W,
          height: BOARD_H,
          background: "linear-gradient(180deg, #1F4129, #142F1E)",
          border: "16px solid #6B4423",
          borderRadius: 10,
          boxShadow: "0 12px 40px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.35)",
          opacity: boardProg,
          transform: `scale(${0.92 + boardProg * 0.08}) translateY(${(1 - boardProg) * 30}px)`,
        }}
      />

      {/* Left fraction 3/4 */}
      <div
        style={{
          position: "absolute",
          left: LEFT_FRAC_X,
          top: FRAC_Y,
          transform: `translate(-50%, 0) scale(${frac1Prog})`,
          transformOrigin: "center top",
          opacity: frac1Prog,
        }}
      >
        <Fraction num="3" den="4" size={110} />
      </div>

      {/* Equals sign */}
      <div
        style={{
          position: "absolute",
          left: BOARD_CX,
          top: FRAC_Y + FRAC_GAP,
          transform: `translate(-50%, -50%) scale(${equalsProg})`,
          opacity: equalsProg,
          fontFamily: FONTS.family,
          fontSize: 120,
          fontWeight: 700,
          color: COLORS.accentGold,
          lineHeight: 1,
          textShadow: "0 0 8px rgba(245,197,66,0.4)",
        }}
      >
        =
      </div>

      {/* Right fraction x/12 */}
      <div
        style={{
          position: "absolute",
          left: RIGHT_FRAC_X,
          top: FRAC_Y,
          transform: `translate(-50%, 0) scale(${frac2Prog})`,
          transformOrigin: "center top",
          opacity: frac2Prog,
        }}
      >
        <Fraction num="x" den="12" size={110} numColor={COLORS.accentGold} />
      </div>

      {/* Tam suất arrows:
          1) Diagonal (nhân chéo): 3 (num-left) → 12 (den-right) — color gold (×)
          2) Horizontal (chia ngang): 12 (den-right) → 4 (den-left) — color green (÷) */}
      {crossProg > 0 && (
        <svg
          style={{
            position: "absolute",
            left: BOARD_LEFT,
            top: FRAC_Y - 10,
            width: BOARD_W,
            height: 280,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <defs>
            <marker
              id="arrowGold"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B" />
            </marker>
            <marker
              id="arrowGreen"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#34D399" />
            </marker>
          </defs>

          {/* 1. Diagonal: 3 (top-left num) → 12 (bottom-right den) — NHÂN × */}
          <line
            x1={LEFT_FRAC_X - BOARD_LEFT}
            y1={40}
            x2={(LEFT_FRAC_X - BOARD_LEFT) + (RIGHT_FRAC_X - LEFT_FRAC_X) * crossProg}
            y2={40 + 180 * crossProg}
            stroke="#F59E0B"
            strokeWidth={5}
            strokeDasharray="12 8"
            markerEnd="url(#arrowGold)"
            opacity={0.9}
          />
          {/* "×" label giữa mũi tên diagonal khi đã vẽ xong */}
          {crossProg > 0.6 && (
            <text
              x={(LEFT_FRAC_X - BOARD_LEFT) + (RIGHT_FRAC_X - LEFT_FRAC_X) * 0.5}
              y={135}
              fontSize={54}
              fontWeight={900}
              fill="#F59E0B"
              textAnchor="middle"
              style={{ fontFamily: "serif" }}
              opacity={(crossProg - 0.6) / 0.4}
            >
              ×
            </text>
          )}

          {/* 2. Horizontal: 12 (right den) → 4 (left den) — CHIA NGANG ÷ */}
          {crossProg > 0.5 && (
            <>
              <line
                x1={RIGHT_FRAC_X - BOARD_LEFT}
                y1={220}
                x2={
                  (RIGHT_FRAC_X - BOARD_LEFT) -
                  (RIGHT_FRAC_X - LEFT_FRAC_X) * Math.min(1, (crossProg - 0.5) / 0.5)
                }
                y2={220}
                stroke="#34D399"
                strokeWidth={5}
                strokeDasharray="12 8"
                markerEnd="url(#arrowGreen)"
                opacity={0.95}
              />
              {/* "÷" label dưới mũi tên horizontal */}
              {crossProg > 0.85 && (
                <text
                  x={(LEFT_FRAC_X - BOARD_LEFT) + (RIGHT_FRAC_X - LEFT_FRAC_X) * 0.5}
                  y={260}
                  fontSize={46}
                  fontWeight={900}
                  fill="#34D399"
                  textAnchor="middle"
                  style={{ fontFamily: "serif" }}
                  opacity={(crossProg - 0.85) / 0.15}
                >
                  ÷
                </text>
              )}
            </>
          )}
        </svg>
      )}

      {/* Hint text "Nhân chéo → chia ngang" */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: BOARD_TOP + 400,
          textAlign: "center",
          opacity: hintProg,
          transform: `translateY(${(1 - hintProg) * 10}px)`,
          fontFamily: FONTS.family,
          fontSize: 32,
          fontWeight: 700,
          color: "#FFE9A6",
          letterSpacing: 1,
        }}
      >
        Nhân chéo → chia ngang
      </div>

      {/* Computation: 12 × 3 = 36 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: BOARD_TOP + 480,
          textAlign: "center",
          opacity: calc1Prog,
          transform: `scale(${calc1Prog})`,
          fontFamily: FONTS.family,
          fontSize: 60,
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: 1,
        }}
      >
        12 × 3 = 36
      </div>

      {/* Computation: 36 ÷ 4 = 9 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: BOARD_TOP + 570,
          textAlign: "center",
          opacity: calc2Prog,
          transform: `scale(${calc2Prog})`,
          fontFamily: FONTS.family,
          fontSize: 60,
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: 1,
        }}
      >
        36 ÷ 4 ={" "}
        <span style={{ color: COLORS.accentGold, fontWeight: 900 }}>9</span>
      </div>

      {/* Final answer highlight: x = 9 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: BOARD_TOP + 700,
          textAlign: "center",
          opacity: answerProg,
          transform: `scale(${answerProg})`,
          fontFamily: FONTS.family,
          fontSize: 104,
          fontWeight: 900,
          color: COLORS.accentGold,
          textShadow: "0 0 20px rgba(245, 197, 66, 0.85), 0 0 50px rgba(245, 197, 66, 0.5)",
          letterSpacing: 2,
        }}
      >
        x = 9
      </div>
    </>
  );
};
