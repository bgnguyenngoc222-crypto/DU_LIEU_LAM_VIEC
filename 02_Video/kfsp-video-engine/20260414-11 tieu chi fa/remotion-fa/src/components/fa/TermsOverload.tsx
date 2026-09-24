import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS, SPRINGS, FONTS } from "../../design";

// 18 từ khoá tài chính chứng khoán nguy hiểm sắp xếp 2 VÒNG TRÒN
// Vòng INNER: 8 abbreviation ngắn ở radius 240
// Vòng OUTER: 10 thuật ngữ dài + scary ở radius 460
// Hai vòng quay ngược chiều nhau → confuse/dizzy MẠNH

const INNER_TERMS = [
  { text: "P/E",   color: COLORS.accentRed },
  { text: "ROE",   color: COLORS.purple },
  { text: "EBIT",  color: COLORS.accentBlue },
  { text: "OCF",   color: COLORS.accentGold },
  { text: "TTM",   color: COLORS.accentGreen },
  { text: "YoY",   color: COLORS.purpleLight },
  { text: "BVPS",  color: COLORS.accentRed },
  { text: "FCF",   color: COLORS.purple },
];

const OUTER_TERMS = [
  { text: "EBITDA",       color: COLORS.accentBlue },
  { text: "ROIC",         color: COLORS.accentGold },
  { text: "WACC",         color: COLORS.accentRed },
  { text: "NOPAT",        color: COLORS.purple },
  { text: "Altman Z",     color: COLORS.accentRed },
  { text: "Piotroski F",  color: COLORS.purpleLight },
  { text: "EV/EBITDA",    color: COLORS.accentGold },
  { text: "Sharpe Ratio", color: COLORS.accentGreen },
  { text: "D/E Ratio",    color: COLORS.accentRed },
  { text: "DCF",          color: COLORS.purple },
];

const CENTER_X = 540;
const CENTER_Y = 880;
const RADIUS_INNER = 240;
const RADIUS_OUTER = 470;

interface Props {
  freezeFrame?: number;
}

export const TermsOverload: React.FC<Props> = ({ freezeFrame = 180 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Inner ring xoay theo chiều kim đồng hồ, outer ngược chiều — confuse mạnh
  const spinInner = frame < freezeFrame
    ? frame * 0.7
    : freezeFrame * 0.7 + (frame - freezeFrame) * 0.2;
  const spinOuter = frame < freezeFrame
    ? frame * -0.5
    : freezeFrame * -0.5 + (frame - freezeFrame) * -0.15;

  return (
    <>
      {INNER_TERMS.map((t, i) =>
        renderTerm({
          ...t,
          index: i,
          total: INNER_TERMS.length,
          radius: RADIUS_INNER,
          spinDeg: spinInner,
          fontSize: 56,
          delayPerTerm: 7,
          frame, fps,
          ringOffset: 0,
        })
      )}
      {OUTER_TERMS.map((t, i) =>
        renderTerm({
          ...t,
          index: i,
          total: OUTER_TERMS.length,
          radius: RADIUS_OUTER,
          spinDeg: spinOuter,
          fontSize: 48,
          delayPerTerm: 5,
          frame, fps,
          ringOffset: 18, // lệch pha so với inner
        })
      )}
    </>
  );
};

interface TermArgs {
  text: string;
  color: string;
  index: number;
  total: number;
  radius: number;
  spinDeg: number;
  fontSize: number;
  delayPerTerm: number;
  frame: number;
  fps: number;
  ringOffset: number;
}

function renderTerm(args: TermArgs) {
  const { text, color, index, total, radius, spinDeg, fontSize, delayPerTerm, frame, fps, ringOffset } = args;

  const baseAngle = (index * 360) / total + ringOffset;
  const angle = baseAngle + spinDeg;
  const rad = (angle * Math.PI) / 180;

  const delay = index * delayPerTerm;
  const f = Math.max(0, frame - delay);
  const enterProg = spring({ frame: f, fps, config: SPRINGS.heavy });

  const finalX = CENTER_X + Math.cos(rad) * radius;
  const finalY = CENTER_Y + Math.sin(rad) * radius;

  const startX = CENTER_X + Math.cos(rad) * (radius + 700);
  const startY = CENTER_Y + Math.sin(rad) * (radius + 700);

  const x = startX + (finalX - startX) * enterProg;
  const y = startY + (finalY - startY) * enterProg;

  const wobbleX = Math.sin(frame * 0.13 + index) * 12;
  const wobbleY = Math.cos(frame * 0.10 + index * 1.4) * 10;

  const scale = interpolate(enterProg, [0, 0.7, 1], [0.4, 1.4, 1.0]);
  const opacity = interpolate(enterProg, [0, 0.3, 1], [0, 1, 0.85]);
  const tilt = Math.sin(frame * 0.07 + index) * 5;

  return (
    <div
      key={`${args.radius}-${index}`}
      style={{
        position: "absolute",
        left: x + wobbleX,
        top: y + wobbleY,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${tilt}deg)`,
        fontFamily: FONTS.family,
        fontSize,
        fontWeight: 900,
        color,
        opacity,
        textShadow: `0 4px 20px ${color}40`,
        whiteSpace: "nowrap",
        letterSpacing: -0.5,
        pointerEvents: "none",
      }}
    >
      {text}
    </div>
  );
}
