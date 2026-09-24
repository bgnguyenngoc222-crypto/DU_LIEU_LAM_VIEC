import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, SPRINGS, SAFE_ZONE, FONT_STACK } from "../design";
import { Sentence } from "../types";

type SpringCfg = { damping: number; stiffness: number; mass?: number };

// spring progress 0..1, starting at `delay` frames
export function sp(frame: number, fps: number, cfg: SpringCfg, delay = 0): number {
  return spring({ frame: frame - delay, fps, config: cfg });
}

// Centered content stage inside safe zone
export const Center: React.FC<{
  children: React.ReactNode;
  gap?: number;
  justify?: React.CSSProperties["justifyContent"];
}> = ({ children, gap = 28, justify = "center" }) => (
  <div
    style={{
      position: "absolute",
      left: SAFE_ZONE.left,
      right: 1080 - SAFE_ZONE.right,
      top: SAFE_ZONE.contentTop,
      height: SAFE_ZONE.contentBottom - SAFE_ZONE.contentTop,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: justify,
      gap,
      fontFamily: FONT_STACK,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

// Fade + rise wrapper that animates in on mount
export const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  cfg?: SpringCfg;
  rise?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, cfg = SPRINGS.calm, rise = 40, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = sp(frame, fps, cfg, delay);
  const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ opacity, transform: `translateY(${(1 - s) * rise}px)`, ...style }}>
      {children}
    </div>
  );
};

export type Part = { t: string; c?: string; b?: boolean };

// Big headline supporting colored parts
export const Headline: React.FC<{
  parts: Part[];
  size?: number;
  weight?: number;
  lineHeight?: number;
  delay?: number;
  cfg?: SpringCfg;
}> = ({ parts, size = 64, weight = 800, lineHeight = 1.18, delay = 0, cfg = SPRINGS.resolve }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = sp(frame, fps, cfg, delay);
  const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = 0.9 + 0.1 * Math.min(1, s);
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: weight,
        lineHeight,
        color: COLORS.textPrimary,
        opacity,
        transform: `scale(${scale})`,
        textShadow: "0 4px 24px rgba(0,0,0,0.6)",
        maxWidth: 940,
      }}
    >
      {parts.map((p, i) => (
        <span key={i} style={{ color: p.c ?? COLORS.textPrimary, fontWeight: p.b === false ? 600 : weight }}>
          {p.t}
        </span>
      ))}
    </div>
  );
};

export const Kicker: React.FC<{ text: string; color?: string; delay?: number }> = ({
  text,
  color = COLORS.textMuted,
  delay = 0,
}) => (
  <FadeUp delay={delay} cfg={SPRINGS.soft} rise={20}>
    <div
      style={{
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: 4,
        textTransform: "uppercase",
        color,
        fontFamily: FONT_STACK,
      }}
    >
      {text}
    </div>
  </FadeUp>
);

// Get enum beat frames from sentence (relative to sentence start)
export function beatFrames(sentence: Sentence): { item: string; frame: number }[] {
  return (sentence.enum_beats ?? []).map((b) => ({
    item: b.item,
    frame: b.frame_30fps ?? 0,
  }));
}

// A chip that pops at a given frame (decisive spring), optional accent + index dot
export const PopChip: React.FC<{
  popAt: number;
  label: string;
  color?: string;
  idx?: number;
  icon?: React.ReactNode;
  fontSize?: number;
  strike?: boolean; // cross-out after pop (for false-signals)
  strikeDelay?: number;
}> = ({ popAt, label, color = COLORS.green, idx, icon, fontSize = 34, strike = false, strikeDelay = 10 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < popAt) return null;
  const s = sp(frame, fps, SPRINGS.decisive, popAt);
  const opacity = Math.max(0, Math.min(1, s));
  const scale = 0.72 + 0.28 * Math.min(1, s);
  const strikeP = strike
    ? interpolate(frame, [popAt + strikeDelay, popAt + strikeDelay + 8], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  return (
    <div
      style={{
        width: "100%",
        minHeight: 92,
        background: COLORS.bgPanel,
        border: `1.6px solid ${color}`,
        borderRadius: 18,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "0 28px",
        opacity,
        transform: `scale(${scale})`,
        boxShadow: `0 0 28px ${color}33`,
        fontFamily: FONT_STACK,
        position: "relative",
      }}
    >
      {idx != null && (
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: `${color}22`,
            border: `1.5px solid ${color}`,
            color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 26,
            flexShrink: 0,
          }}
        >
          {idx}
        </div>
      )}
      {icon}
      <span style={{ color: COLORS.textPrimary, fontSize, fontWeight: 700, textAlign: "left" }}>
        {label}
      </span>
      {strike && (
        <div
          style={{
            position: "absolute",
            left: 24,
            right: 24,
            top: "50%",
            height: 3,
            background: COLORS.red,
            transform: `scaleX(${strikeP})`,
            transformOrigin: "left",
            borderRadius: 2,
          }}
        />
      )}
    </div>
  );
};

// Vertical stack of enum chips driven by beat frames
export const EnumStack: React.FC<{
  sentence: Sentence;
  color?: string;
  numbered?: boolean;
  strike?: boolean;
  gap?: number;
  fontSize?: number;
}> = ({ sentence, color = COLORS.green, numbered = true, strike = false, gap = 18, fontSize = 34 }) => {
  const beats = beatFrames(sentence);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, width: "100%" }}>
      {beats.map((b, i) => (
        <PopChip
          key={i}
          popAt={b.frame}
          label={b.item}
          color={color}
          idx={numbered ? i + 1 : undefined}
          fontSize={fontSize}
          strike={strike}
        />
      ))}
    </div>
  );
};

export { COLORS, SPRINGS, SAFE_ZONE, FONT_STACK };
