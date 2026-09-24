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

// Screenshots đã có phone frame → display trực tiếp
const DISPLAY_W = 560;
const DISPLAY_H = 1132;
const DISPLAY_X = (LAYOUT.width - DISPLAY_W) / 2;
const DISPLAY_Y = 295;

const SS_W = 1834;
const SS_H = 3709;
const SS_SCALE_BASE = DISPLAY_W / SS_W;

interface AnnCfg { x: number; y: number; delay: number; color?: string; size?: number; }

const useFocusTransform = (props: {
  delay: number;
  from: { focusX: number; focusY: number; scale: number };
  to?: { focusX: number; focusY: number; scale: number };
  zoomStart: number;
  zoomDuration: number;
}) => {
  const frame = useCurrentFrame();
  const f = frame - props.delay;
  let fx = props.from.focusX, fy = props.from.focusY, sc = props.from.scale;
  if (props.to) {
    const zp = interpolate(
      f, [props.zoomStart, props.zoomStart + props.zoomDuration], [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.22, 1, 0.36, 1) }
    );
    fx = interpolate(zp, [0, 1], [props.from.focusX, props.to.focusX]);
    fy = interpolate(zp, [0, 1], [props.from.focusY, props.to.focusY]);
    sc = interpolate(zp, [0, 1], [props.from.scale, props.to.scale]);
  }
  const translateX = DISPLAY_W / 2 - fx * SS_SCALE_BASE * sc;
  const translateY = DISPLAY_H / 2 - fy * SS_SCALE_BASE * sc;
  return { translateX, translateY, scale: sc };
};

const AnnDot: React.FC<{ x: number; y: number; delay: number; color?: string; size?: number }> = ({
  x, y, delay, color = COLORS.accentGold, size = 22,
}) => {
  const frame = useCurrentFrame();
  if (frame < delay) return null;
  const f = frame - delay;
  const appear = interpolate(f, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  const pulse = Math.sin(f * 0.12) * 0.5 + 0.5;
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
        background: color, opacity: appear * 0.95,
        boxShadow: `0 0 ${size}px ${color}`,
        pointerEvents: "none",
      }} />
    </>
  );
};

const Phone: React.FC<{
  src: string; delay?: number;
  transform: { translateX: number; translateY: number; scale: number };
  annotations?: AnnCfg[];
}> = ({ src, delay = 0, transform, annotations = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: SPRINGS.soft });
  const { translateX, translateY, scale } = transform;

  return (
    <div style={{
      position: "absolute", left: DISPLAY_X, top: DISPLAY_Y,
      width: DISPLAY_W, height: DISPLAY_H,
      opacity: enter, transform: `translateY(${(1 - enter) * 25}px)`,
      overflow: "hidden",
      borderRadius: 20,
    }}>
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: DISPLAY_W, height: DISPLAY_H,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        transformOrigin: "0 0",
      }}>
        <Img src={staticFile(src)} style={{
          width: DISPLAY_W, height: DISPLAY_H, display: "block",
        }} />
        {annotations.map((ann, i) => {
          const ax = ann.x * SS_SCALE_BASE;
          const ay = ann.y * SS_SCALE_BASE;
          return <AnnDot key={i} x={ax} y={ay}
            delay={delay + ann.delay} color={ann.color}
            size={(ann.size ?? 22) / scale} />;
        })}
      </div>
    </div>
  );
};

const StepBadge: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - delay, fps, config: SPRINGS.soft });
  return (
    <div style={{
      position: "absolute", top: 235, left: 0, right: 0, textAlign: "center",
      opacity: e, transform: `translateY(${(1 - e) * 6}px)`, zIndex: 30,
    }}>
      <span style={{
        background: COLORS.accentGold, color: "#fff",
        fontSize: 26, fontWeight: 700, fontFamily: FONTS.family,
        padding: "10px 28px", borderRadius: 14,
        boxShadow: `0 4px 14px ${COLORS.accentGold}40`,
      }}>{text}</span>
    </div>
  );
};

// ─── Bước 4: Self-drawn UI ───
const AlertUIMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bellEnter = spring({ frame: frame - 15, fps, config: SPRINGS.soft });
  const bellRing = frame > 25 ? Math.sin((frame - 25) * 0.3) * 8 : 0;
  const filterEnter = spring({ frame: frame - 40, fps, config: SPRINGS.soft });
  const toggleEnter = spring({ frame: frame - 60, fps, config: SPRINGS.soft });
  const toggleOn = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const notifEnter = spring({ frame: frame - 130, fps, config: SPRINGS.soft });

  return (
    <AbsoluteFill style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 50,
      paddingTop: 340,
    }}>
      <div style={{ opacity: bellEnter, transform: `scale(${bellEnter * 1.5}) rotate(${bellRing}deg)` }}>
        <svg width="140" height="140" viewBox="0 0 24 24" fill="none">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={COLORS.accentGold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={COLORS.accentGold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18" cy="6" r="4" fill={COLORS.accentRed} />
        </svg>
      </div>

      <div style={{
        opacity: filterEnter, transform: `translateY(${(1 - filterEnter) * 10}px)`,
        background: COLORS.purpleBg, borderRadius: 20, padding: "18px 36px",
        border: `2px solid ${COLORS.purple}25`,
      }}>
        <span style={{ fontSize: 36, fontWeight: 700, color: COLORS.purple, fontFamily: FONTS.family }}>
          Bộ lọc tăng trưởng
        </span>
      </div>

      <div style={{
        opacity: toggleEnter, transform: `translateY(${(1 - toggleEnter) * 12}px)`,
        display: "flex", alignItems: "center", gap: 24,
      }}>
        <span style={{ fontSize: 32, color: COLORS.textPrimary, fontFamily: FONTS.family, fontWeight: 600 }}>
          Cảnh báo
        </span>
        <div style={{
          width: 80, height: 44, borderRadius: 22,
          background: toggleOn > 0.5 ? COLORS.accentGreen : "#ddd",
          padding: 4, transition: "background 0.2s",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 18, background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            transform: `translateX(${toggleOn * 36}px)`,
          }} />
        </div>
      </div>

      <div style={{
        opacity: notifEnter,
        transform: `translateX(${(1 - notifEnter) * 100}px)`,
        background: "#fff", borderRadius: 20,
        padding: "20px 28px", width: 700,
        boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
        border: `1px solid ${COLORS.accentGold}40`,
        display: "flex", alignItems: "center", gap: 18,
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 28, background: COLORS.accentGold,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.textPrimary, fontFamily: FONTS.family }}>
            Cảnh báo Bộ lọc
          </div>
          <div style={{ fontSize: 18, color: COLORS.textSecondary, fontFamily: FONTS.family, marginTop: 2 }}>
            3 mã mới đáp ứng tiêu chí tăng trưởng
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// BƯỚC 5: step5.png
const Step5: React.FC = () => {
  const t = useFocusTransform({
    delay: 0,
    from: { focusX: SS_W / 2, focusY: 900, scale: 1 },
    to: { focusX: 1600, focusY: 650, scale: 1.8 },
    zoomStart: 25, zoomDuration: 40,
  });
  return (
    <Phone src="images/step5.png" delay={0} transform={t}
      annotations={[
        { x: 1600, y: 650, delay: 50, size: 32 },
        { x: 920, y: 3450, delay: 130, size: 32 },
      ]}
    />
  );
};

export const BonusScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
      <Sequence from={0} durationInFrames={278}>
        <StepBadge text="BƯỚC 4 — Cảnh báo Bộ lọc" delay={3} />
        <AlertUIMockup />
      </Sequence>

      <Sequence from={278} durationInFrames={274}>
        <StepBadge text="BƯỚC 5 — Cảnh báo tín hiệu" delay={3} />
        <Step5 />
      </Sequence>
    </AbsoluteFill>
  );
};
