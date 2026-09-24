import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C } from './theme';

export const SceneAnchor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 10, 233, 243], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fluctuations: before frame 75, we have active noise. After 75, we freeze.
  const noise = Array.from({ length: 20 }).map((_, i) => {
    const isFrozen = frame >= 75;
    const freezeProgress = isFrozen ? Math.min(1, (frame - 75) / 15) : 0;
    const activeNoise = Math.sin((frame + i * 3) / 4) * 25;
    const endValue = 0; // stabilize to middle
    return interpolate(freezeProgress, [0, 1], [activeNoise, endValue]);
  });

  // SVG Anchor drop spring
  const anchorDropSpring = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: { damping: 10, mass: 1.2, stiffness: 120 },
  });

  const anchorY = interpolate(anchorDropSpring, [0, 1], [-300, 680]);
  const anchorScale = interpolate(anchorDropSpring, [0, 1], [0.5, 1]);

  // Ripple effect on impact (f60 + ~10 frames)
  const isImpact = frame >= 70;
  const rippleProgress = isImpact ? (frame - 70) / 30 : 0;
  const rippleOpacity = interpolate(rippleProgress, [0, 1], [0.8, 0]);
  const rippleScale = interpolate(rippleProgress, [0, 1], [0.2, 2.5]);

  return (
    <AbsoluteFill style={{ overflow: 'hidden', opacity }}>
      {/* Background radial violet glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(123, 58, 236, ${interpolate(frame, [60, 90], [0.1, 0.25], { extrapolateRight: 'clamp' })}) 0%, rgba(10, 22, 40, 0) 60%)`,
        }}
      />

      {/* Grid line texture */}
      <div
        style={{
          position: 'absolute',
          inset: 60,
          border: '1.5px dashed rgba(255, 255, 255, 0.05)',
          borderRadius: 24,
        }}
      />

      {/* Fluctuating line chart */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <path
          d={`M 100 ${700 + noise[0]} 
             L 180 ${680 + noise[1]} 
             L 260 ${720 + noise[2]} 
             L 340 ${650 + noise[3]} 
             L 420 ${730 + noise[4]} 
             L 500 ${670 + noise[5]} 
             L 580 ${690 + noise[6]} 
             L 660 ${640 + noise[7]} 
             L 740 ${710 + noise[8]} 
             L 820 ${660 + noise[9]} 
             L 900 ${700 + noise[10]}`}
          fill="none"
          stroke={frame >= 75 ? C.gold : 'rgba(255, 255, 255, 0.3)'}
          strokeWidth={frame >= 75 ? '5' : '3'}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'stroke 0.2s ease, stroke-width 0.2s ease',
            filter: frame >= 75 ? `drop-shadow(0 0 10px ${C.gold})` : 'none',
          }}
        />
      </svg>

      {/* Stabilization Ripple */}
      {isImpact && (
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: 680,
            width: 150,
            height: 150,
            border: `3px solid ${C.gold}`,
            borderRadius: '50%',
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            opacity: rippleOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Falling Anchor SVG */}
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: anchorY,
          transform: `translate(-50%, -100%) scale(${anchorScale})`,
          filter: `drop-shadow(0 15px 25px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 15px ${C.gold}33)`,
        }}
      >
        <svg width="180" height="220" viewBox="0 0 100 120" style={{ overflow: 'visible' }}>
          {/* Rope */}
          <line x1="50" y1="-200" x2="50" y2="10" stroke={C.gold} strokeWidth="4" />

          {/* Anchor top ring */}
          <circle cx="50" cy="20" r="10" fill="none" stroke={C.gold} strokeWidth="8" />

          {/* Vertical shank */}
          <line x1="50" y1="30" x2="50" y2="90" stroke={C.gold} strokeWidth="8" />

          {/* Stock (cross bar) */}
          <line x1="25" y1="45" x2="75" y2="45" stroke={C.gold} strokeWidth="6" strokeLinecap="round" />

          {/* Flukes (arc at the bottom) */}
          <path
            d="M 15 75 A 35 35 0 0 0 85 75"
            fill="none"
            stroke={C.gold}
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Tips (triangles) */}
          <path d="M 12 70 L 18 80 L 8 76 Z" fill={C.gold} />
          <path d="M 88 70 L 82 80 L 92 76 Z" fill={C.gold} />

          {/* Center crown ring */}
          <circle cx="50" cy="90" r="6" fill={C.gold} />
        </svg>
      </div>

      {/* Anchor Text Box */}
      {frame >= 90 && (
        <div
          style={{
            position: 'absolute',
            top: 250,
            left: 0,
            right: 0,
            textAlign: 'center',
            opacity: interpolate(frame, [90, 105], [0, 1], { extrapolateLeft: 'clamp' }),
          }}
        >
          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              border: `2px solid ${C.borderViolet}`,
              borderRadius: 20,
              padding: '20px 40px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ fontSize: 42, fontWeight: 900, color: C.white, letterSpacing: 2 }}>
              MỎ NEO KỶ LUẬT
            </div>
            <div style={{ fontSize: 28, color: C.textMuted, marginTop: 6 }}>
              ỔN ĐỊNH GIAO DỊCH QUA DỮ LIỆU
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
