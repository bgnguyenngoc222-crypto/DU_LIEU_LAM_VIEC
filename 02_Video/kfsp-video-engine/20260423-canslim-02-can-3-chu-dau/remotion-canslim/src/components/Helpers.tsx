import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { COLORS, FONTS, SAFE, SPRINGS, VIDEO } from "../design";

export const useSpring = (preset: keyof typeof SPRINGS, delayFrames = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delayFrames,
    fps,
    config: SPRINGS[preset],
  });
};

export const fadeIn = (frame: number, fromFrame: number, durFrames = 12) =>
  interpolate(frame, [fromFrame, fromFrame + durFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

export const fadeOut = (frame: number, atFrame: number, durFrames = 8) =>
  interpolate(frame, [atFrame, atFrame + durFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

export const easeOut = (t: number) => Easing.bezier(0.22, 1, 0.36, 1)(t);

// Convert seconds → frames
export const sToF = (sec: number, fps = 30) => Math.round(sec * fps);

// Centered glass card
export const GlassCard: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ x, y, w, h, children, style }) => (
  <div
    style={{
      position: "absolute",
      left: x ?? 0,
      top: y ?? 0,
      width: w,
      height: h,
      background: COLORS.glass,
      border: `1px solid ${COLORS.glassBorder}`,
      borderRadius: 22,
      backdropFilter: "blur(12px)",
      padding: 24,
      color: "white",
      fontFamily: FONTS.family,
      ...style,
    }}
  >
    {children}
  </div>
);

// Big text reveal centered
export const BigText: React.FC<{
  text: string;
  size?: number;
  color?: string;
  weight?: number;
  y?: number;
  delay?: number;
  letterSpacing?: number;
  glow?: boolean;
}> = ({ text, size = 80, color = "white", weight = 800, y, delay = 0, letterSpacing = -1, glow = false }) => {
  const s = useSpring("resolve", delay);
  const opacity = fadeIn(useCurrentFrame(), delay, 8);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: y ?? VIDEO.height / 2 - size,
        width: VIDEO.width,
        textAlign: "center",
        fontFamily: FONTS.family,
        fontSize: size,
        fontWeight: weight,
        color,
        letterSpacing,
        lineHeight: 1.1,
        transform: `scale(${0.85 + s * 0.15})`,
        opacity,
        textShadow: glow ? `0 0 40px ${color}99` : "0 6px 18px rgba(0,0,0,0.5)",
        padding: `0 ${SAFE.leftSafe}px`,
      }}
    >
      {text}
    </div>
  );
};

// Pop-in pill chip
export const PillChip: React.FC<{
  label: string;
  delay: number;
  x: number;
  y: number;
  color?: string;
  bgColor?: string;
  fontSize?: number;
  icon?: string;
}> = ({ label, delay, x, y, color = "white", bgColor = "rgba(255,255,255,0.10)", fontSize = 36, icon }) => {
  const s = useSpring("resolve", delay);
  const opacity = fadeIn(useCurrentFrame(), delay, 6);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        padding: "16px 28px",
        background: bgColor,
        border: `2px solid ${color}66`,
        color,
        fontFamily: FONTS.family,
        fontSize,
        fontWeight: 700,
        borderRadius: 999,
        transform: `translateY(${(1 - s) * 30}px) scale(${0.7 + s * 0.3})`,
        opacity,
        boxShadow: `0 8px 28px ${color}33`,
        whiteSpace: "nowrap",
      }}
    >
      {icon && <span style={{ marginRight: 10 }}>{icon}</span>}
      {label}
    </div>
  );
};

// Spotlight focus on element
export const Spotlight: React.FC<{ x: number; y: number; r: number; delay?: number }> = ({ x, y, r, delay = 0 }) => {
  const s = useSpring("calm", delay);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle at ${x}px ${y}px, transparent ${r * s}px, rgba(0,0,0,0.6) ${r * s + 80}px)`,
        opacity: s,
      }}
    />
  );
};

export const useEnumPop = (timestamps: number[], offset = 0) => {
  // Returns array of progress (0..1) for each enum item based on its start timestamp
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tNow = (frame + offset) / fps;
  return timestamps.map((t) =>
    spring({
      frame: Math.max(0, frame - Math.round((t - offset) * fps)),
      fps,
      config: SPRINGS.resolve,
    }),
  );
};
