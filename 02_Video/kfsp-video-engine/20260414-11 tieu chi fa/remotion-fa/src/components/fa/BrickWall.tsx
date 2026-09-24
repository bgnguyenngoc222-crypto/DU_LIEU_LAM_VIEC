import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";
import { SPRINGS, FONTS } from "../../design";

// Bức tường gạch TO, transparent, chữ FA nổi bật trên mỗi gạch — Scene 3 Agitate.
// Thanh yêu cầu: cho bức tường to lên, để transparent một chút, nổi bật chữ trong các ô gạch.

// 20 thuật ngữ FA ngắn gọn — tất cả ≤6 chars để fit gọn trong gạch 240px ở cùng 1 font size
const TERMS_ON_BRICKS = [
  "P/E",   "ROE",   "EBITDA", "OCF",
  "TTM",   "EPS",   "BVPS",   "WACC",
  "DCF",   "P/B",   "YoY",    "ROIC",
  "FCFF",  "ROCE",  "PEG",    "ROA",
  "FCF",   "D/E",   "CAPEX",  "CAGR",
];

interface Props {
  startFrame?: number;        // when bricks start appearing
}

export const BrickWall: React.FC<Props> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // GIẢM số lượng, TĂNG kích thước ô gạch
  const BRICK_W = 240;
  const BRICK_H = 150;
  const COLS = 4;
  const ROWS = 5;

  const wallW = COLS * BRICK_W;
  const wallH = ROWS * BRICK_H;
  // Alternate rows offset by BRICK_W/2, so actual width = wallW + BRICK_W/2 = cols*BRICK_W + 120
  const startX = (1080 - wallW - BRICK_W / 2) / 2;
  const startY = Math.round((1920 - wallH) / 2) - 40; // center vertically, slight up

  const bricks = [];
  let termIdx = 0;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Stagger appearance from BOTTOM up
      const brickIdx = (ROWS - 1 - r) * COLS + c;
      const brickDelay = startFrame + brickIdx * 2;
      // Offset alternate rows for brick pattern
      const offsetX = r % 2 === 0 ? 0 : BRICK_W / 2;
      const x = startX + c * BRICK_W + offsetX;
      const y = startY + r * BRICK_H;

      const prog = spring({
        frame: frame - brickDelay,
        fps,
        config: SPRINGS.heavy,
      });

      // Term on EVERY brick (no gaps) — loop through list
      const term = TERMS_ON_BRICKS[termIdx % TERMS_ON_BRICKS.length];
      termIdx++;

      bricks.push(
        <div
          key={`${r}-${c}`}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: BRICK_W - 6,
            height: BRICK_H - 6,
            // Transparent brown gradient — thấy bg behind (bức tường hơi trong)
            background: "linear-gradient(135deg, rgba(139, 90, 60, 0.62), rgba(107, 68, 35, 0.58))",
            border: "1.5px solid rgba(58, 37, 16, 0.7)",
            boxShadow: "inset 0 -3px 6px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.08)",
            borderRadius: 4,
            opacity: prog,
            transform: `translateY(${(1 - prog) * 30}px) scale(${0.85 + prog * 0.15})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(1px)",
          }}
        >
          <span
            style={{
              fontFamily: FONTS.family,
              fontSize: 44,
              fontWeight: 900,
              color: "#FFF6E8",
              letterSpacing: 0.2,
              textShadow:
                "0 3px 6px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 0, 0, 0.6), 0 1px 0 rgba(255, 255, 255, 0.2)",
              lineHeight: 1,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {term}
          </span>
        </div>,
      );
    }
  }

  return <>{bricks}</>;
};
