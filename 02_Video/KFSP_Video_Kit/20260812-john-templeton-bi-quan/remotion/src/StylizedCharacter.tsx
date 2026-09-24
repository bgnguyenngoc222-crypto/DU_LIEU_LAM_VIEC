import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface StylizedCharacterProps {
  x: number;
  y: number;
  scale?: number;
  color?: string;
  isThrowing?: boolean;
  throwStartFrame?: number;
  headTilt?: number;
  fadeProgress?: number;
  bodyColor?: string;
}

export const StylizedCharacter: React.FC<StylizedCharacterProps> = ({
  x,
  y,
  scale = 1,
  color = '#e2e8f0',
  isThrowing = false,
  throwStartFrame = 90,
  headTilt = 15,
  fadeProgress = 0,
  bodyColor = '#334155',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle breathing idle
  const idleY = Math.sin((frame + x) / 12) * 4;

  // Throw animation
  let armAngle = 0;
  let phoneX = 22;
  let phoneY = 20;
  let phoneRot = 0;
  let phoneOpacity = 1;
  let phoneScale = 1;

  if (isThrowing && frame >= throwStartFrame) {
    const t = frame - throwStartFrame;

    // Throwing spring
    const throwSpring = spring({
      frame: t,
      fps,
      config: { damping: 12, mass: 0.6, stiffness: 140 },
    });

    // Right arm swings back
    armAngle = interpolate(throwSpring, [0, 1], [0, -110]);

    // Phone flies in an arching trajectory to the left/back
    phoneX = interpolate(t, [0, 25], [22, -140], { extrapolateRight: 'clamp' });
    phoneY = interpolate(t, [0, 12, 25], [20, -100, 160], { extrapolateRight: 'clamp' });
    phoneRot = interpolate(t, [0, 25], [0, -450], { extrapolateRight: 'clamp' });
    phoneScale = interpolate(t, [0, 25], [1, 0.4], { extrapolateRight: 'clamp' });
    phoneOpacity = interpolate(t, [15, 25], [1, 0], { extrapolateRight: 'clamp' });
  }

  // Fade and dissolve
  const opacity = interpolate(fadeProgress, [0, 1], [1, 0], { extrapolateRight: 'clamp' });
  const dissolveScale = interpolate(fadeProgress, [0, 1], [1, 0.85], { extrapolateRight: 'clamp' });

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + idleY,
        transform: `translate(-50%, -50%) scale(${scale * dissolveScale})`,
        opacity,
        filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.7))',
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
      }}
    >
      <svg width="180" height="340" viewBox="-90 -170 180 340" style={{ overflow: 'visible' }}>
        {/* Soft Ground Shadow */}
        <ellipse cx="0" cy="145" rx="42" ry="12" fill="rgba(0, 0, 0, 0.45)" />

        {/* 2 Legs */}
        {/* Left Leg */}
        <path
          d="M -14 30 L -18 135 L -10 138"
          stroke={bodyColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Right Leg */}
        <path
          d="M 14 30 L 18 135 L 26 138"
          stroke={bodyColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Torso (Solid stylized body leaning forward) */}
        <path
          d="M -22 -45 Q 0 -50, 22 -45 L 16 35 Q 0 40, -16 35 Z"
          fill={bodyColor}
        />

        {/* Left Shoulder & Arm (Bent holding phone) */}
        <path
          d="M -20 -35 Q -10 5, 14 18"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />

        {/* Head (Sleek Circle tilted down) */}
        <g transform={`translate(${headTilt > 0 ? 8 : -8}, -72) rotate(${headTilt})`}>
          <circle cx="0" cy="0" r="22" fill={color} />
          {/* Subtle headphone / ear contour */}
          <ellipse cx={headTilt > 0 ? 16 : -16} cy="2" rx="4" ry="7" fill="rgba(0,0,0,0.2)" />
        </g>

        {/* Right Arm (Holding phone or throwing back) */}
        <g transform={`translate(16, -35) rotate(${armAngle})`}>
          <path
            d="M 0 0 Q 15 25, 6 52"
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Smartphone with intense screen glow */}
        {phoneOpacity > 0 && (
          <g
            transform={`translate(${phoneX}, ${phoneY}) rotate(${phoneRot}) scale(${phoneScale})`}
            opacity={phoneOpacity}
          >
            {/* Red Screen Ambient Glow */}
            <circle cx="0" cy="0" r="25" fill="rgba(239, 68, 68, 0.4)" style={{ filter: 'blur(8px)' }} />

            {/* Phone Body */}
            <rect
              x="-8"
              y="-16"
              width="16"
              height="32"
              rx="4"
              fill="#0f172a"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            {/* Screen */}
            <rect
              x="-6"
              y="-14"
              width="12"
              height="28"
              rx="2"
              fill="#ef4444"
              style={{
                filter: 'drop-shadow(0 0 8px #ef4444)',
              }}
            />
          </g>
        )}
      </svg>
    </div>
  );
};
