import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import React from "react";
import { COLORS, FONTS, SPRINGS } from "../design";
import { BrickWall } from "../components/fa/BrickWall";
import { TamSuatScene } from "../components/fa/TamSuatScene";

// ═══════════════════════════════════════════
// Scene 3 — AGITATE (f1050-f1770, 24s, scene relative 0-720)
// Sequence (Thanh confirmed 49s rework):
//   0-150    Wall build + R2 backdrop blur
//   150-210  "5 NĂM" badge red pulse
//   210-330  9 stick man rơi (spin + dizzy swirl), 1 lone climber stays
//   330-420  Cửa appear → brick wall FADE DẦN
//   420-480  Cửa mở → số "11" BIG hiện ra (gold glow)
//   480-540  "11" fade out → biểu đồ RADAR S1 fade in (crossfade)
//   540-720  TAM SUẤT classroom analogy
// ═══════════════════════════════════════════

export const AgitateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const WALL_BUILD = 0;
  const FIVE_YEARS = 150;
  const FALL_START = 210;
  const DOOR_APPEAR = 330;
  const DOOR_OPEN = 420;
  const ELEVEN_PEAK = 470;   // số "11" rõ nhất
  const RADAR_REVEAL = 480;  // bắt đầu crossfade "11" → radar
  const RADAR_FULL = 540;    // radar full visible
  const TAM_SUAT = 540;      // chuyển sang tam suất ngay khi radar full

  // Brick wall fade out khi cửa appear
  const wallFadeOut = interpolate(frame, [DOOR_APPEAR, DOOR_OPEN + 30], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgPhaseEarly = frame < TAM_SUAT;

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: bgPhaseEarly ? "#F5EEE6" : "#1A1A2E" }}>
      {/* ═══ Wall only (no stick man, no 5 NĂM card) — fade out khi cửa appear ═══ */}
      {frame < TAM_SUAT && (
        <div style={{ opacity: wallFadeOut }}>
          {/* R2 video backdrop blur — nhẹ, làm texture sau bức tường trong suốt */}
          {frame < DOOR_APPEAR + 30 && (
            <AbsoluteFill style={{ opacity: 0.18 }}>
              <OffthreadVideo
                src={staticFile("video/fa/R2_technical.mp4")}
                startFrom={90}
                playbackRate={0.5}
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "blur(10px)",
                }}
              />
            </AbsoluteFill>
          )}

          <BrickWall startFrame={WALL_BUILD} />
        </div>
      )}

      {/* ═══ Door + Radar Reveal Unified (f330-f540) ═══ */}
      {/* Style cánh cửa giống CTA cuối video: "11" embed trên cửa, S1 radar zoom dần ra to match SOLVE size */}
      {frame >= DOOR_APPEAR && frame < TAM_SUAT && (
        <DoorRevealRadar
          frame={frame}
          appearFrame={DOOR_APPEAR}
          openFrame={DOOR_OPEN}
          fadeOutFrame={RADAR_REVEAL}
          fullFrame={RADAR_FULL}
        />
      )}

      {/* ═══ Tam Suất (f540-f720) ═══ */}
      {frame >= TAM_SUAT && (
        <TamSuatScene startFrame={TAM_SUAT} />
      )}
    </AbsoluteFill>
  );
};


// Door + Radar reveal unified — cánh cửa FULL SIZE (= radar size), mở hết sang trái
// Radar đứng yên phía sau, cửa rotate -170° reveal full radar. Không còn "11", không zoom.
const DoorRevealRadar: React.FC<{
  frame: number;
  appearFrame: number;
  openFrame: number;
  fadeOutFrame: number;
  fullFrame: number;
}> = ({ frame, appearFrame, openFrame, fadeOutFrame, fullFrame }) => {
  const { fps } = useVideoConfig();

  const DOOR_W = 800;
  const DOOR_H = 850;
  const DOOR_TOP = 320;

  const appearProg = spring({ frame: frame - appearFrame, fps, config: SPRINGS.decisive });
  const openProg = spring({ frame: frame - openFrame, fps, config: SPRINGS.zoom });
  // Mở hết sang trái ~ -170° (gần như nằm phẳng)
  const doorOpenDeg = openProg * -170;
  const doorOpacity = interpolate(frame, [fadeOutFrame, fullFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Radar luôn visible full size ngay khi appear (không zoom)
  const radarOpacity = interpolate(frame, [appearFrame, appearFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: DOOR_TOP,
        width: DOOR_W,
        height: DOOR_H,
        transform: `translateX(-50%) scale(${appearProg})`,
        transformOrigin: "center center",
        opacity: appearProg,
        zIndex: 15,
      }}
    >
      {/* Radar S1 phía sau cửa — đứng yên, full size, + 11 markers highlight các trục */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 18px 50px rgba(0,0,0,0.18)",
          opacity: radarOpacity,
        }}
      >
        <Img
          src={staticFile("images/fa/S1_radar_crop.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            filter: "brightness(1.05)",
          }}
        />
      </div>

      {/* Cánh cửa wood — rotate đến -170° (mở hết sang trái), không có "11" */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #6B4423, #4A2F19)",
          border: "4px solid #3A2510",
          borderRadius: "8px 8px 4px 4px",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.5), 0 8px 30px rgba(0,0,0,0.4)",
          transform: `perspective(1200px) rotateY(${doorOpenDeg}deg)`,
          transformOrigin: "left center",
          opacity: doorOpacity,
          // Texture vân gỗ nhẹ bằng gradient lặp
          backgroundImage:
            "linear-gradient(135deg, #6B4423, #4A2F19), repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 2px, transparent 2px, transparent 40px)",
        }}
      >
        {/* Tay nắm cửa */}
        <div
          style={{
            position: "absolute",
            right: 24,
            top: "50%",
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#D4AF37",
            boxShadow: "0 0 12px rgba(212, 175, 55, 0.7)",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    </div>
  );
};

// 11 markers highlight ôm các label tiêu chí — vị trí HARDCODE theo % container
// (đo trực tiếp từ ảnh S1_radar_crop.png). Không tính polar vì labels không đều khoảng cách.
const RADAR_CRITERIA: { label: string; xPct: number; yPct: number; w: number; h: number }[] = [
  { label: "%G Doanh thu",         xPct: 0.50, yPct: 0.395, w: 200, h: 50 },
  { label: "%G EPS",               xPct: 0.73, yPct: 0.440, w: 120, h: 50 },
  { label: "%G BVPS",              xPct: 0.82, yPct: 0.530, w: 140, h: 50 },
  { label: "%G OCF",               xPct: 0.78, yPct: 0.605, w: 130, h: 50 },
  { label: "Nợ dài hạn",           xPct: 0.71, yPct: 0.670, w: 150, h: 50 },
  { label: "Vòng quay tài sản",    xPct: 0.55, yPct: 0.720, w: 220, h: 50 },
  { label: "Biên lợi nhuận",       xPct: 0.38, yPct: 0.690, w: 180, h: 50 },
  { label: "Chất lượng lợi nhuận", xPct: 0.22, yPct: 0.625, w: 240, h: 50 },
  { label: "ROA",                  xPct: 0.18, yPct: 0.530, w: 90,  h: 50 },
  { label: "ROE",                  xPct: 0.22, yPct: 0.445, w: 90,  h: 50 },
  { label: "ROIC",                 xPct: 0.32, yPct: 0.385, w: 100, h: 50 },
];

const RadarCriteriaMarkers: React.FC<{
  frame: number;
  startFrame: number;
  containerW: number;
  containerH: number;
}> = ({ frame, startFrame, containerW, containerH }) => {
  const { fps } = useVideoConfig();

  return (
    <>
      {RADAR_CRITERIA.map((c, i) => {
        const x = c.xPct * containerW;
        const y = c.yPct * containerH;

        const delay = i * 3;
        const prog = spring({
          frame: frame - startFrame - delay,
          fps,
          config: SPRINGS.resolve,
        });
        if (prog <= 0) return null;

        // Pulse breathing
        const localF = frame - startFrame - delay;
        const pulse = 1 + Math.sin(localF * 0.2) * 0.06;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: c.w,
              height: c.h,
              marginLeft: -c.w / 2,
              marginTop: -c.h / 2,
              borderRadius: 14,
              border: "3px solid #F59E0B",
              background: "rgba(245, 158, 11, 0.12)",
              boxShadow:
                "0 0 16px rgba(245, 158, 11, 0.6), inset 0 0 8px rgba(245, 158, 11, 0.25)",
              opacity: prog,
              transform: `scale(${prog * pulse})`,
              transformOrigin: "center",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};
