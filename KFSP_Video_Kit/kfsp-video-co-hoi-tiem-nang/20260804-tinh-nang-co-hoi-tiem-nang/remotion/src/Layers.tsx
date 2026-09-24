import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { T } from "./theme";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

/** Vào mượt rồi ra mượt, dùng chung cho mọi lớp trên. */
export const useLife = (from: number, to: number) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [from, from + 14, to - 12, to], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  return { f, p, local: f - from };
};

/** Thẻ kính mờ — liquid glass. */
export const Glass: React.FC<{
  tone: "light" | "dark";
  children: React.ReactNode;
  style?: React.CSSProperties;
  k: number;
}> = ({ tone, children, style, k }) => (
  <div
    style={{
      backdropFilter: `blur(${22 * k}px) saturate(160%)`,
      WebkitBackdropFilter: `blur(${22 * k}px) saturate(160%)`,
      background:
        tone === "dark"
          ? "linear-gradient(150deg, rgba(255,255,255,.19) 0%, rgba(255,255,255,.09) 100%)"
          : "linear-gradient(150deg, rgba(255,255,255,.93) 0%, rgba(246,243,255,.86) 100%)",
      border: `${1.5 * k}px solid ${
        tone === "dark" ? "rgba(255,255,255,.42)" : "rgba(123,58,236,.34)"
      }`,
      borderRadius: 26 * k,
      boxShadow:
        tone === "dark"
          ? `0 ${18 * k}px ${44 * k}px rgba(0,0,0,.45)`
          : `0 ${18 * k}px ${44 * k}px rgba(20,24,48,.32)`,
      padding: `${22 * k}px ${28 * k}px`,
      position: "relative",
      overflow: "hidden",
      ...style,
    }}
  >
    {/* vệt sáng chéo phía trên của mặt kính */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(160deg, rgba(255,255,255,.42) 0%, rgba(255,255,255,0) 42%)",
        pointerEvents: "none",
      }}
    />
    <div style={{ position: "relative" }}>{children}</div>
  </div>
);

/** Chữ hiện theo từng từ. */
export const WordReveal: React.FC<{
  text: string;
  local: number;
  size: number;
  weight?: number;
  color: string;
  lineHeight?: number;
  step?: number;
  align?: "left" | "center";
}> = ({ text, local, size, weight = 800, color, lineHeight = 1.24, step = 1, align = "center" }) => (
  <div
    style={{
      fontFamily: T.font,
      fontSize: size,
      fontWeight: weight,
      color,
      lineHeight,
      textAlign: align,
      display: "flex",
      flexWrap: "wrap",
      gap: `0 ${size * 0.26}px`,
      justifyContent: align === "center" ? "center" : "flex-start",
    }}
  >
    {text.split(" ").map((w, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          opacity: interpolate(local, [8 + i * step, 8 + i * step + 9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          }),
          translate: `0px ${interpolate(
            local,
            [8 + i * step, 8 + i * step + 11],
            [size * 0.34, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
          )}px`,
        }}
      >
        {w}
      </span>
    ))}
  </div>
);

/**
 * Thẻ chú giải: kính mờ + đường nối vẽ dần tới một điểm trên màn.
 * Toạ độ tính theo phần trăm khung hình để dùng chung cho cả ba khổ.
 */
export const Callout: React.FC<{
  from: number;
  to: number;
  x: number; // 0..1 tâm thẻ
  y: number;
  toX?: number; // điểm đường nối trỏ tới
  toY?: number;
  text: string;
  sub?: string;
  tone: "light" | "dark";
  maxW?: number; // phần trăm bề ngang khung
}> = ({ from, to, x, y, toX, toY, text, sub, tone, maxW = 0.46 }) => {
  const { width, height } = useVideoConfig();
  const { p, local } = useLife(from, to);
  const k = Math.min(width, height) / 1080; // theo cạnh ngắn, để ba khổ cùng cỡ chữ
  if (p <= 0.001) return null;

  const ink = tone === "dark" ? "#ffffff" : T.ink;
  const cx = x * width;
  const cy = y * height;

  return (
    <>
      {toX !== undefined && toY !== undefined ? (
        <svg
          width={width}
          height={height}
          style={{ position: "absolute", inset: 0, opacity: p }}
        >
          <line
            x1={cx}
            y1={cy}
            x2={interpolate(local, [10, 30], [cx, toX * width], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
            })}
            y2={interpolate(local, [10, 30], [cy, toY * height], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
            })}
            stroke={T.purpleLight}
            strokeWidth={2.5 * k}
            strokeLinecap="round"
          />
          <circle
            cx={toX * width}
            cy={toY * height}
            r={7 * k}
            fill={T.purpleLight}
            opacity={interpolate(local, [26, 36], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        </svg>
      ) : null}

      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          translate: "-50% -50%",
          maxWidth: maxW * width,
          opacity: p,
          scale: interpolate(p, [0, 1], [0.94, 1]),
        }}
      >
        <Glass tone={tone} k={k}>
          <WordReveal
            text={text}
            local={local}
            size={40 * k}
            weight={750}
            color={ink}
            align="left"
          />
          {sub ? (
            <div
              style={{
                fontFamily: T.font,
                fontSize: 27 * k,
                fontWeight: 600,
                color: ink,
                opacity: interpolate(local, [18, 32], [0, 0.82], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                marginTop: 9 * k,
                lineHeight: 1.35,
              }}
            >
              {sub}
            </div>
          ) : null}
        </Glass>
      </div>
    </>
  );
};

/** Vòng sáng khoanh một thẻ cơ hội trên màn. */
export const Spotlight: React.FC<{
  from: number;
  to: number;
  x: number;
  y: number;
  w: number;
  h: number;
}> = ({ from, to, x, y, w, h }) => {
  const { width, height, fps } = useVideoConfig();
  const { p, local } = useLife(from, to);
  const k = Math.min(width, height) / 1080; // theo cạnh ngắn, để ba khổ cùng cỡ chữ
  if (p <= 0.001) return null;
  const pulse = 0.5 + 0.5 * Math.sin((local / fps) * 3.2);
  return (
    <div
      style={{
        position: "absolute",
        left: x * width,
        top: y * height,
        width: w * width,
        height: h * height,
        borderRadius: 20 * k,
        border: `${3 * k}px solid rgba(170,117,255,${0.9 * p})`,
        boxShadow: `0 0 ${(20 + 22 * pulse) * k}px rgba(123,58,236,${0.6 * p})`,
        opacity: p,
        scale: interpolate(p, [0, 1], [1.07, 1]),
        pointerEvents: "none",
      }}
    />
  );
};
