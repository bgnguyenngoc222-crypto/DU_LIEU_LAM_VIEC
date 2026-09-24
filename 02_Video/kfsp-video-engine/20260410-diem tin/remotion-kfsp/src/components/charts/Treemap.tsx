import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";
import { HeatmapSector, COLORS } from "../../types";

interface TreemapProps {
  data: HeatmapSector[];
  delay?: number;
  width?: number;
  height?: number;
}

// Simple treemap layout algorithm
function layoutTreemap(
  stocks: { ticker: string; change_pct: number; weight: number }[],
  width: number,
  height: number
) {
  const total = stocks.reduce((s, st) => s + st.weight, 0);
  const rects: Array<{
    ticker: string;
    change_pct: number;
    x: number;
    y: number;
    w: number;
    h: number;
  }> = [];

  let x = 0;
  let y = 0;
  let remainingW = width;
  let remainingH = height;
  let isHorizontal = true;

  for (const stock of stocks) {
    const ratio = stock.weight / total;

    if (isHorizontal) {
      const w = remainingW * ratio * (stocks.length > 3 ? 2 : 1);
      rects.push({
        ticker: stock.ticker,
        change_pct: stock.change_pct,
        x,
        y,
        w: Math.min(w, remainingW),
        h: remainingH * 0.5,
      });
      x += w;
      if (x >= width * 0.9) {
        x = 0;
        y += remainingH * 0.5;
        remainingH *= 0.5;
        isHorizontal = false;
      }
    } else {
      const h = remainingH;
      const w = remainingW / (stocks.length - rects.length + 1);
      rects.push({
        ticker: stock.ticker,
        change_pct: stock.change_pct,
        x,
        y,
        w,
        h,
      });
      x += w;
    }
  }

  return rects;
}

export const Treemap: React.FC<TreemapProps> = ({
  data,
  delay = 0,
  width = 1000,
  height = 700,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flatten all stocks
  const allStocks = data.flatMap((s) =>
    s.stocks.map((st) => ({ ...st, sector: s.sector }))
  );

  const sorted = [...allStocks].sort((a, b) => b.weight - a.weight);
  const rects = layoutTreemap(sorted, width, height);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        margin: "0 auto",
      }}
    >
      {rects.map((rect, i) => {
        const blockDelay = delay + i * 2;
        const enter = spring({
          frame: frame - blockDelay,
          fps,
          config: { damping: 12, stiffness: 100 },
        });

        const isPositive = rect.change_pct >= 0;
        const color = isPositive ? COLORS.green : COLORS.red;
        const bgOpacity = Math.min(Math.abs(rect.change_pct) / 10, 1);

        return (
          <div
            key={rect.ticker}
            style={{
              position: "absolute",
              left: rect.x,
              top: rect.y,
              width: rect.w - 3,
              height: rect.h - 3,
              background: `${color}${Math.round(bgOpacity * 200 + 55).toString(16)}`,
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${enter})`,
              opacity: enter,
              border: `1px solid ${color}40`,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: Math.max(rect.w / 6, 18),
                fontWeight: 800,
              }}
            >
              {rect.ticker}
            </span>
            <span
              style={{
                color: "#fff",
                fontSize: Math.max(rect.w / 8, 14),
                fontWeight: 600,
                opacity: 0.9,
              }}
            >
              {isPositive ? "+" : ""}
              {rect.change_pct.toFixed(1)}%
            </span>
          </div>
        );
      })}
    </div>
  );
};
