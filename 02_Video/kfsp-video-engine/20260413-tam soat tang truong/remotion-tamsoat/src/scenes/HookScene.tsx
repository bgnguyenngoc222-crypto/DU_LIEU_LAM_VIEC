import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from "remotion";
import React from "react";
import { COLORS, FONTS, LAYOUT, SPRINGS } from "../design";

// ═══════════════════════════════════════════
// Hook Scene — f0 to f428 (14.3s)
// Emotional arc: overwhelm (ease-in) → pause → relief (ease-out resolve)
//
// f0-f90:    Data rơi + "30 GIÂY" counter — ease-in (áp lực)
// f90-f184:  "30s vs Hàng giờ" — spring heavy (nặng nề)
// f184-f213: SILENCE — đứng yên (tension)
// f213-f255: Wipe sáng — ease-out (relief)
// f271-f428: "3 thao tác" + dots — spring resolve (tự tin)
// ═══════════════════════════════════════════

// ─── Falling data fragments (ease-in = accelerating = losing control) ───
const FallingData: React.FC = () => {
  const frame = useCurrentFrame();

  const items = [
    { text: "BCTC Q4/2025", x: 80, delay: 2, speed: 2.5 },
    { text: "Doanh thu thuần", x: 350, delay: 0, speed: 3.0 },
    { text: "EPS", x: 620, delay: 6, speed: 2.2 },
    { text: "ROE 18.5%", x: 830, delay: 4, speed: 2.8 },
    { text: "P/E 12.3x", x: 200, delay: 10, speed: 2.0 },
    { text: "Nợ/VCSH", x: 700, delay: 8, speed: 2.6 },
    { text: "LNST Q3", x: 450, delay: 14, speed: 3.2 },
    { text: "Biên LN gộp", x: 120, delay: 12, speed: 2.3 },
    { text: "Vốn hóa 2.4T", x: 900, delay: 16, speed: 2.7 },
    { text: "OCF âm", x: 550, delay: 18, speed: 2.1 },
  ];

  // Background dims subtly as data accumulates (claustrophobia)
  const bgDim = interpolate(frame, [0, 150], [0, 0.05], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 1, 1), // ease-in
  });

  return (
    <AbsoluteFill style={{ background: `rgba(0,0,0,${bgDim})`, pointerEvents: "none" }}>
      {items.map((item, i) => {
        const f = Math.max(0, frame - item.delay);
        // ease-in: y = t² (accelerating fall = losing control)
        const y = f * f * item.speed * 0.012 - 200;
        const opacity = interpolate(f, [0, 10], [0, 0.45], { extrapolateRight: "clamp" });
        const fadeOut = interpolate(y, [600, 1000], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const rotation = (i % 2 === 0 ? 1 : -1) * interpolate(f, [0, 60], [0, 5], { extrapolateRight: "clamp" });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: item.x,
              top: y,
              opacity: opacity * fadeOut,
              fontSize: 22,
              fontWeight: 600,
              color: COLORS.textMuted,
              fontFamily: FONTS.family,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {item.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ─── "30 GIÂY" counter — spring resolve (decisive snap) ───
const BigCounter: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.resolve,
  });

  const count = Math.min(30, Math.round(
    interpolate(frame, [delay + 5, delay + 22], [0, 30], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  ));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        opacity: enter,
        transform: `scale(${0.85 + enter * 0.15})`,
      }}
    >
      <div style={{ fontSize: 140, fontWeight: 700, color: COLORS.purple, fontFamily: FONTS.family, lineHeight: 1 }}>
        {count}
      </div>
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.purple, fontFamily: FONTS.family, letterSpacing: 6 }}>
        GIÂY
      </div>
    </div>
  );
};

// ─── Comparison: 30s floats UP (light) vs Hàng giờ falls DOWN (heavy) ───
const Comparison: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Left: floats up = lightness (ease-out)
  const leftEnter = spring({ frame: frame - delay, fps, config: SPRINGS.resolve });
  // Right: falls down = heaviness (spring heavy)
  const rightEnter = spring({ frame: frame - delay - 10, fps, config: SPRINGS.heavy });

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40, width: "100%", padding: `0 ${LAYOUT.contentPadding}px` }}>
      <div style={{
        opacity: leftEnter,
        transform: `translateY(${(1 - leftEnter) * -25}px)`, // float UP
        textAlign: "center", flex: 1,
      }}>
        <div style={{ fontSize: 56, fontWeight: 700, color: COLORS.purple, fontFamily: FONTS.family }}>30s</div>
        <div style={{ fontSize: 24, color: COLORS.textSecondary, fontFamily: FONTS.family, marginTop: 6 }}>tầm soát xong</div>
      </div>

      <div style={{
        fontSize: 26, fontWeight: 700, color: COLORS.textMuted, fontFamily: FONTS.family,
        opacity: Math.min(leftEnter, rightEnter),
      }}>vs</div>

      <div style={{
        opacity: rightEnter,
        transform: `translateY(${(1 - rightEnter) * 35}px)`, // fall DOWN = heavy
        textAlign: "center", flex: 1,
      }}>
        <div style={{ fontSize: 56, fontWeight: 700, color: COLORS.accentRed, fontFamily: FONTS.family }}>Hàng giờ</div>
        <div style={{ fontSize: 24, color: COLORS.textSecondary, fontFamily: FONTS.family, marginTop: 6 }}>đọc BCTC thủ công</div>
      </div>
    </div>
  );
};

// ═══ MAIN HOOK SCENE ═══
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background: dims during overwhelm, brightens at relief
  const brightness = interpolate(frame, [0, 150, 213, 260], [1, 0.95, 0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: `rgb(${Math.round(255 * brightness)},${Math.round(248 * brightness)},${Math.round(252 * brightness)})` }}>

      {/* Phase 1 (f0-f200): Overwhelm — data falling + counter + comparison */}
      <Sequence from={0} durationInFrames={210}>
        <FallingData />
        <AbsoluteFill style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 35,
        }}>
          <BigCounter delay={10} />
          <Comparison delay={45} />
        </AbsoluteFill>
      </Sequence>

      {/* Phase 2 (f213-f428): Relief — clean, decisive */}
      <Sequence from={210} durationInFrames={218}>
        <AbsoluteFill style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 25, padding: `0 ${LAYOUT.contentPadding}px`,
        }}>
          {/* "Chỉ với" — ease-out float up (relief, lightness) */}
          {(() => {
            const e = spring({ frame: frame - 218, fps, config: SPRINGS.resolve });
            return (
              <div style={{
                fontSize: 34, color: COLORS.textSecondary, fontFamily: FONTS.family,
                textAlign: "center", opacity: e, transform: `translateY(${(1 - e) * -12}px)`,
              }}>
                Chỉ với
              </div>
            );
          })()}

          {/* "3 thao tác" — decisive snap */}
          {(() => {
            const e = spring({ frame: frame - 226, fps, config: SPRINGS.resolve });
            return (
              <div style={{
                fontSize: 76, fontWeight: 700, color: COLORS.purple, fontFamily: FONTS.family,
                textAlign: "center", opacity: e, transform: `scale(${e})`,
              }}>
                3 thao tác
              </div>
            );
          })()}

          {/* Subtitle text */}
          {(() => {
            const e = spring({ frame: frame - 240, fps, config: SPRINGS.calm });
            return (
              <div style={{
                fontSize: 30, color: COLORS.textSecondary, fontFamily: FONTS.family,
                textAlign: "center", lineHeight: 1.4, maxWidth: 800,
                opacity: e, transform: `translateY(${(1 - e) * 12}px)`,
              }}>
                Tiết kiệm hàng giờ đồng hồ{"\n"}đọc số liệu mệt mỏi
              </div>
            );
          })()}

          {/* Dots ①②③ — stagger L→R (progression) with spring resolve */}
          <div style={{ display: "flex", gap: 24, marginTop: 15 }}>
            {[1, 2, 3].map((n) => {
              const dotEnter = spring({
                frame: frame - 255 - n * 8, // stagger 8f
                fps,
                config: SPRINGS.resolve,
              });
              return (
                <div key={n} style={{
                  width: 52, height: 52, borderRadius: 26, background: COLORS.purple,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: dotEnter,
                  transform: `scale(${dotEnter}) translateX(${(1 - dotEnter) * -15}px)`, // L→R
                  boxShadow: `0 4px 16px ${COLORS.purple}30`,
                }}>
                  <span style={{ fontSize: 26, fontWeight: 700, color: "#fff", fontFamily: FONTS.family }}>{n}</span>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
