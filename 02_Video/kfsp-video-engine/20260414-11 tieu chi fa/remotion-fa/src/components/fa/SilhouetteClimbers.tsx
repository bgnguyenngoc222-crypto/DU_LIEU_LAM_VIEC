import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { SPRINGS } from "../../design";

// 10 stick man trên tường — 9 ngã + 1 lone climber thành công
// Dạng STICK MAN line-art (đầu tròn + thân/tay/chân nét)
// Khi ngã: spin + dizzy swirl ring quanh đầu (kiểu chóng mặt)

interface ClimberConfig {
  startX: number;
  startY: number;
  rotation: number;
  isLoneClimber?: boolean;
}

// Vị trí start trên wall (BrickWall y=440-860)
const CLIMBERS: ClimberConfig[] = [
  { startX: 280, startY: 620, rotation: -5 },
  { startX: 380, startY: 720, rotation: 3 },
  { startX: 460, startY: 560, rotation: -8 },
  { startX: 540, startY: 670, rotation: 4 },
  { startX: 620, startY: 600, rotation: -6 },
  { startX: 700, startY: 740, rotation: 7 },
  { startX: 800, startY: 580, rotation: -4 },
  { startX: 380, startY: 520, rotation: 5 },
  { startX: 700, startY: 500, rotation: -7 },
  { startX: 540, startY: 460, rotation: 0, isLoneClimber: true }, // top of wall
];

interface Props {
  fallStartFrame?: number;
}

export const SilhouetteClimbers: React.FC<Props> = ({ fallStartFrame = 60 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {CLIMBERS.map((c, i) => {
        if (c.isLoneClimber) {
          const climbProg = spring({
            frame: frame - fallStartFrame - 30,
            fps,
            config: SPRINGS.calm,
          });
          const finalY = c.startY - 50 * climbProg;
          return (
            <StickMan
              key={i}
              x={c.startX}
              y={finalY}
              rotation={0}
              opacity={1}
              isLone
              dizzy={false}
            />
          );
        }

        const fallDelay = i * 8;
        const fallProg = spring({
          frame: frame - fallStartFrame - fallDelay,
          fps,
          config: { damping: 20, stiffness: 60, mass: 1.5 },
        });

        const dropY = fallProg * 1500;
        // Spin tumble — quay quay khó hiểu khi ngã
        const tumble = c.rotation + fallProg * (i % 2 === 0 ? 540 : -540);
        const opacity = interpolate(fallProg, [0, 0.7, 1], [1, 1, 0], { extrapolateRight: "clamp" });

        return (
          <StickMan
            key={i}
            x={c.startX}
            y={c.startY + dropY}
            rotation={tumble}
            opacity={opacity}
            dizzy={fallProg > 0.05 && fallProg < 0.8}
          />
        );
      })}
    </>
  );
};

// Stick man line-art: đầu tròn + thân + 2 tay + 2 chân
const StickMan: React.FC<{
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  isLone?: boolean;
  dizzy?: boolean;
}> = ({ x, y, rotation, opacity, isLone, dizzy }) => {
  const frame = useCurrentFrame();
  const color = isLone ? "#7C3AED" : "#1A1A2E";
  const stroke = isLone ? 3.5 : 3;

  // Dizzy swirl: 3 stars/dots quay quanh đầu
  const swirlAngle = (frame * 8) % 360;

  return (
    <svg
      width={70}
      height={100}
      viewBox="0 0 70 100"
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        opacity,
        overflow: "visible",
      }}
    >
      {/* Đầu */}
      <circle cx="35" cy="18" r="11" fill="none" stroke={color} strokeWidth={stroke} />

      {/* Thân (line) */}
      <line x1="35" y1="29" x2="35" y2="62" stroke={color} strokeWidth={stroke} strokeLinecap="round" />

      {/* Tay (climbing pose: arms up - chữ V ngược) */}
      <line x1="35" y1="38" x2="18" y2="22" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      <line x1="35" y1="38" x2="52" y2="22" stroke={color} strokeWidth={stroke} strokeLinecap="round" />

      {/* Chân */}
      <line x1="35" y1="62" x2="22" y2="88" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      <line x1="35" y1="62" x2="48" y2="88" stroke={color} strokeWidth={stroke} strokeLinecap="round" />

      {/* Dizzy swirl — chóng mặt khi ngã */}
      {dizzy && (
        <>
          {[0, 120, 240].map((offset, idx) => {
            const ang = (swirlAngle + offset) * Math.PI / 180;
            const cx = 35 + Math.cos(ang) * 18;
            const cy = 8 + Math.sin(ang) * 6;
            return (
              <text
                key={idx}
                x={cx}
                y={cy}
                fontSize="12"
                fill="#F59E0B"
                fontWeight="900"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                ✦
              </text>
            );
          })}
        </>
      )}

      {/* Glow ring cho lone climber */}
      {isLone && (
        <circle
          cx="35"
          cy="50"
          r="42"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1.5"
          opacity="0.5"
          strokeDasharray="4 4"
        />
      )}
    </svg>
  );
};
