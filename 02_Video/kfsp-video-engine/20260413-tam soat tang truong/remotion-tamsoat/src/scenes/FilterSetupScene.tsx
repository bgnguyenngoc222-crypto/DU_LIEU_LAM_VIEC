import {
  AbsoluteFill,
  Sequence,
  Img,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import React from "react";
import { COLORS, FONTS, LAYOUT, SPRINGS } from "../design";

// ═══════════════════════════════════════════
// Filter Setup Scene — Tutorial style
//
// APPROACH (đúng):
// - Phone frame: CỐ ĐỊNH kích thước
// - Screen (clip area): CỐ ĐỊNH 536x1076
// - Image INSIDE screen: scale + translate để focus vùng cần
// - Annotation: transform theo image (cùng scale + translate)
// ═══════════════════════════════════════════

// Screenshots ĐÃ CÓ phone frame sẵn → hiển thị trực tiếp
const DISPLAY_W = 560;
const DISPLAY_H = 1132; // 560 × (3709/1834)
const DISPLAY_X = (LAYOUT.width - DISPLAY_W) / 2;
const DISPLAY_Y = 295;

// Screenshot natural dimensions
const SS_W = 1834;
const SS_H = 3709;

const SS_SCALE_BASE = DISPLAY_W / SS_W;

// ─── Animated zoom: calculate image transform ───
// Input: focusX, focusY in screenshot pixel coords + zoom scale
// Output: {translateX, translateY, scale} for the image
const useFocusTransform = (props: {
  delay: number;
  from: { focusX: number; focusY: number; scale: number };
  to?: { focusX: number; focusY: number; scale: number };
  zoomStart: number;
  zoomDuration: number;
}) => {
  const frame = useCurrentFrame();
  const f = frame - props.delay;

  let fx = props.from.focusX;
  let fy = props.from.focusY;
  let sc = props.from.scale;

  if (props.to) {
    const zp = interpolate(
      f, [props.zoomStart, props.zoomStart + props.zoomDuration], [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.22, 1, 0.36, 1) }
    );
    fx = interpolate(zp, [0, 1], [props.from.focusX, props.to.focusX]);
    fy = interpolate(zp, [0, 1], [props.from.focusY, props.to.focusY]);
    sc = interpolate(zp, [0, 1], [props.from.scale, props.to.scale]);
  }

  // Translate so focus point is at center of display area
  const translateX = DISPLAY_W / 2 - fx * SS_SCALE_BASE * sc;
  const translateY = DISPLAY_H / 2 - fy * SS_SCALE_BASE * sc;

  return { translateX, translateY, scale: sc };
};

interface AnnCfg {
  x: number; y: number; // screenshot px
  delay: number;
  color?: string;
  size?: number;
}

// ─── Phone with image transform ───
const Phone: React.FC<{
  src: string;
  delay?: number;
  transform: { translateX: number; translateY: number; scale: number };
  annotations?: AnnCfg[];
}> = ({ src, delay = 0, transform, annotations = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: SPRINGS.calm });

  const { translateX, translateY, scale } = transform;

  return (
    <div style={{
      position: "absolute",
      left: DISPLAY_X, top: DISPLAY_Y,
      width: DISPLAY_W, height: DISPLAY_H,
      opacity: enter,
      transform: `translateY(${(1 - enter) * 30}px)`,
      // Clip overflow — zoom doesn't go outside display area
      overflow: "hidden",
      borderRadius: 20,
    }}>
      {/* Image container with zoom transform */}
      <div style={{
        position: "absolute",
        left: 0, top: 0,
        width: DISPLAY_W,
        height: DISPLAY_H,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        transformOrigin: "0 0",
      }}>
        <Img src={staticFile(src)} style={{
          width: DISPLAY_W,
          height: DISPLAY_H,
          display: "block",
        }} />
        {/* Annotations in screenshot coord space */}
        {annotations.map((ann, i) => {
          const ax = ann.x * SS_SCALE_BASE;
          const ay = ann.y * SS_SCALE_BASE;
          return (
            <AnnDot key={i}
              x={ax} y={ay}
              delay={delay + ann.delay}
              color={ann.color}
              size={(ann.size ?? 22) / scale}
            />
          );
        })}
      </div>
    </div>
  );
};

// Pulsing dot — rendered inside image transform container
const AnnDot: React.FC<{ x: number; y: number; delay: number; color?: string; size?: number }> = ({
  x, y, delay, color = COLORS.accentRed, size = 22,
}) => {
  const frame = useCurrentFrame();
  if (frame < delay) return null;
  const f = frame - delay;
  const appear = interpolate(f, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  const pulse = Math.sin(f * 0.14) * 0.5 + 0.5;
  const ring = size * 2.2;
  return (
    <>
      <div style={{
        position: "absolute", left: x - ring / 2, top: y - ring / 2,
        width: ring, height: ring, borderRadius: "50%",
        border: `${Math.max(2, size * 0.15)}px solid ${color}`,
        opacity: appear * (0.3 + pulse * 0.5),
        transform: `scale(${0.7 + pulse * 0.5})`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", left: x - size / 2, top: y - size / 2,
        width: size, height: size, borderRadius: "50%",
        background: color,
        opacity: appear * 0.95,
        boxShadow: `0 0 ${size}px ${color}`,
        pointerEvents: "none",
      }} />
    </>
  );
};

// ─── Step Badge ───
const StepBadge: React.FC<{ text: string; delay: number; color?: string }> = ({
  text, delay, color = COLORS.purple,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - delay, fps, config: SPRINGS.calm });
  return (
    <div style={{
      position: "absolute", top: 235, left: 0, right: 0,
      textAlign: "center",
      opacity: e, transform: `translateY(${(1 - e) * 8}px)`, zIndex: 30,
    }}>
      <span style={{
        background: color, color: "#fff",
        fontSize: 26, fontWeight: 700, fontFamily: FONTS.family,
        padding: "10px 28px", borderRadius: 14,
        boxShadow: `0 4px 14px ${color}40`,
      }}>{text}</span>
    </div>
  );
};

const TransitionOverlay: React.FC<{
  title: string; subtitle?: string; delay: number;
  badge?: { text: string; color: string };
}> = ({ title, subtitle, delay, badge }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - delay, fps, config: SPRINGS.resolve });
  return (
    <AbsoluteFill style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 24,
      background: `rgba(255,255,255,${0.97 * e})`,
      padding: `0 ${LAYOUT.contentPadding}px`,
    }}>
      {badge && (
        <div style={{
          background: badge.color, borderRadius: 16, padding: "12px 32px",
          opacity: e, transform: `scale(${e})`,
        }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#fff", fontFamily: FONTS.family }}>
            {badge.text}
          </span>
        </div>
      )}
      <div style={{
        fontSize: 64, fontWeight: 700, color: COLORS.textPrimary,
        fontFamily: FONTS.family, textAlign: "center",
        opacity: e, transform: `translateY(${(1 - e) * 14}px)`,
      }}>{title}</div>
      {subtitle && (
        <div style={{
          fontSize: 32, color: COLORS.textSecondary, fontFamily: FONTS.family,
          textAlign: "center", lineHeight: 1.4, maxWidth: 900,
          opacity: spring({ frame: frame - delay - 10, fps, config: SPRINGS.calm }),
        }}>{subtitle}</div>
      )}
    </AbsoluteFill>
  );
};

// ═══ Scene Phases ═══

// BƯỚC 1: "Bộ lọc" icon (400, 610)
const Step1: React.FC = () => {
  const t = useFocusTransform({
    delay: 0,
    from: { focusX: SS_W / 2, focusY: 900, scale: 1 },
    to: { focusX: 400, focusY: 610, scale: 2.2 },
    zoomStart: 25, zoomDuration: 30,
  });
  return (
    <Phone src="images/step1.png" delay={0} transform={t}
      annotations={[{ x: 400, y: 610, delay: 42, size: 30 }]}
    />
  );
};

// BƯỚC 2a: 3 checkboxes (1200, 760/1450/1660)
const Step2a: React.FC = () => {
  const t = useFocusTransform({
    delay: 0,
    from: { focusX: SS_W / 2, focusY: 1200, scale: 1 },
    to: { focusX: 1200, focusY: 1200, scale: 1.6 },
    zoomStart: 20, zoomDuration: 30,
  });
  return (
    <Phone src="images/step2-1.png" delay={0} transform={t}
      annotations={[
        { x: 1200, y: 760, delay: 55, color: COLORS.accentGreen, size: 28 },
        { x: 1200, y: 1450, delay: 100, color: COLORS.accentGreen, size: 28 },
        { x: 1200, y: 1660, delay: 145, color: COLORS.accentGreen, size: 28 },
      ]}
    />
  );
};

// BƯỚC 2b: 3 inputs "15" at (1400, 580/760/940)
const Step2b: React.FC = () => {
  const t = useFocusTransform({
    delay: 0,
    from: { focusX: SS_W / 2, focusY: 800, scale: 1 },
    to: { focusX: 1400, focusY: 760, scale: 1.8 },
    zoomStart: 20, zoomDuration: 30,
  });
  return (
    <Phone src="images/step2-2.png" delay={0} transform={t}
      annotations={[
        { x: 1400, y: 580, delay: 55, color: COLORS.purple, size: 26 },
        { x: 1400, y: 760, delay: 90, color: COLORS.purple, size: 26 },
        { x: 1400, y: 940, delay: 125, color: COLORS.purple, size: 26 },
      ]}
    />
  );
};

// BƯỚC 3: "+" button at (1700, 220)
const Step3: React.FC = () => {
  const t = useFocusTransform({
    delay: 0,
    from: { focusX: SS_W / 2, focusY: 900, scale: 1 },
    to: { focusX: 1700, focusY: 220, scale: 1.8 },
    zoomStart: 25, zoomDuration: 30,
  });
  return (
    <Phone src="images/step3-4.png" delay={0} transform={t}
      annotations={[{ x: 1700, y: 220, delay: 50, size: 30 }]}
    />
  );
};

// ═══ MAIN ═══
export const FilterSetupScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary }}>

      <Sequence from={0} durationInFrames={131}>
        <StepBadge text="BƯỚC 1 — Truy cập Bộ lọc" delay={3} />
        <Step1 />
      </Sequence>

      <Sequence from={131} durationInFrames={200}>
        <StepBadge text="BƯỚC 2 — Chọn tiêu chí" delay={3} />
        <Step2a />
      </Sequence>

      <Sequence from={331} durationInFrames={266}>
        <Step2b />
      </Sequence>

      <Sequence from={597} durationInFrames={361}>
        <StepBadge text="BƯỚC 3 — Lưu kết quả" delay={3} />
        <Step3 />
      </Sequence>

      <Sequence from={992} durationInFrames={197}>
        <TransitionOverlay
          title="+2 bước tối ưu"
          subtitle="Không cần lặp lại 30 giây thao tác mà vẫn nắm bắt cơ hội"
          delay={8}
          badge={{ text: "BONUS", color: COLORS.accentGold }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
