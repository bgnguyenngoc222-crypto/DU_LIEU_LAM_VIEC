import { interpolate, spring } from "remotion";
import React from "react";

const fps = 30;
export const GREEN = "#34d399";
export const RED = "#f87171";
export const GOLD = "#f5c542";
export const DIM = "#9fb0cc";
const FF = "Be Vietnam Pro";

const clampSpring = (frame: number, delay: number, cfg: any = { damping: 16, stiffness: 170 }) =>
  spring({ frame: frame - delay, fps, config: cfg });
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

type Candle = { o: number; c: number; hi: number; lo: number };
export function makeCandles(prices: number[]): Candle[] {
  return prices.map((c, i) => {
    const o = i ? prices[i - 1] : prices[0] - 1;
    const r = 1.4 + ((i * 37) % 13) / 10;
    return { o, c, hi: Math.max(o, c) + r, lo: Math.min(o, c) - r };
  });
}

export const CH = { x0: 60, x1: 940, y0: 60, y1: 840 };
export function mapX(i: number, n: number) { return lerp(CH.x0, CH.x1, n <= 1 ? 0.5 : i / (n - 1)); }
export function makeMapY(min: number, max: number) {
  const pad = (max - min) * 0.12 || 1;
  return (p: number) => lerp(CH.y1, CH.y0, (p - (min - pad)) / ((max + pad) - (min - pad)));
}

export const Chart: React.FC<{
  prices: number[]; f: number; startF: number; stepF?: number;
  width?: number; lastColor?: string; highlightFrom?: number;
}> = ({ prices, f, startF, stepF = 2.2, width = 1000, lastColor, highlightFrom }) => {
  const candles = makeCandles(prices);
  const n = candles.length;
  const min = Math.min(...prices), max = Math.max(...prices);
  const mapY = makeMapY(min, max);
  const bw = ((CH.x1 - CH.x0) / n) * 0.62;
  return (
    <svg width={width} viewBox="0 0 1000 900" style={{ overflow: "visible" }}>
      {candles.map((cd, i) => {
        const local = f - startF - i * stepF;
        const g = Math.max(0, Math.min(1, spring({ frame: local, fps, config: { damping: 14, stiffness: 220 } })));
        if (g <= 0.001) return null;
        const x = mapX(i, n);
        const isUp = cd.c >= cd.o;
        let col = isUp ? GREEN : RED;
        if (lastColor && i === n - 1) col = lastColor;
        if (highlightFrom != null && i >= highlightFrom) col = isUp ? GREEN : col;
        const yO = mapY(cd.o), yC = mapY(cd.c), yHi = mapY(cd.hi), yLo = mapY(cd.lo);
        const top = Math.min(yO, yC), bot = Math.max(yO, yC);
        const fullH = Math.max(4, bot - top);
        const h = fullH * g, cy = (top + bot) / 2;
        const wickMidTop = lerp(cy, yHi, g), wickMidBot = lerp(cy, yLo, g);
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={wickMidTop} y2={wickMidBot} stroke={col} strokeWidth={3} />
            <rect x={x - bw / 2} y={cy - h / 2} width={bw} height={h} rx={3} fill={col} />
          </g>
        );
      })}
    </svg>
  );
};

export const Level: React.FC<{ y: number; color: string; f: number; delay: number; dash?: boolean; label?: string; labelColor?: string }> =
  ({ y, color, f, delay, dash, label, labelColor }) => {
    const p = interpolate(f, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    if (p <= 0) return null;
    return (
      <g>
        <line x1={CH.x0} x2={lerp(CH.x0, CH.x1, p)} y1={y} y2={y} stroke={color} strokeWidth={4}
          strokeDasharray={dash ? "12 10" : undefined} />
        {label && p > 0.5 && (
          <text x={CH.x0 + 8} y={y - 14} fontFamily={FF} fontWeight={700} fontSize={44}
            fill={labelColor || color} opacity={(p - 0.5) * 2}>{label}</text>
        )}
      </g>
    );
  };

export const Marker: React.FC<{ cx: number; cy: number; f: number; delay: number; color?: string }> = ({ cx, cy, f, delay, color = GOLD }) => {
  const s = clampSpring(f, delay, { damping: 12, stiffness: 200 });
  if (s <= 0.01) return null;
  const pulse = 1 + 0.18 * Math.sin((f - delay) / 4);
  return <circle cx={cx} cy={cy} r={26 * s * pulse} fill="none" stroke={color} strokeWidth={5} />;
};

export const Tag: React.FC<{ x: number; y: number; f: number; delay: number; text: string; bg: string; fg?: string }> =
  ({ x, y, f, delay, text, bg, fg = "#0a1628" }) => {
    const s = clampSpring(f, delay, { damping: 13, stiffness: 200 });
    if (s <= 0.01) return null;
    return (
      <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${0.7 + s * 0.3})`,
        opacity: s, background: bg, color: fg, fontFamily: FF, fontWeight: 900, fontSize: 46,
        padding: "18px 30px", borderRadius: 16, whiteSpace: "nowrap",
        boxShadow: "0 6px 20px rgba(0,0,0,.35)", letterSpacing: 1 }}>{text}</div>
    );
  };
