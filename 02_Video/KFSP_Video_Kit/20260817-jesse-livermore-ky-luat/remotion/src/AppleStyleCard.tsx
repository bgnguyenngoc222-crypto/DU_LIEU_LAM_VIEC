import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C } from './theme';

interface AppleCardProps {
  quote: string;
  author: string;
  delayFrame: number;
  badge: string;
  index: number;
}

export const AppleStyleCard: React.FC<AppleCardProps> = ({
  quote,
  author,
  delayFrame,
  badge,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delayFrame);

  // Apple-style device rise spring
  const riseSpring = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 14,
      mass: 0.8,
      stiffness: 85,
    },
  });

  // 3D Rotations and Translations
  const rotateX = interpolate(riseSpring, [0, 1], [32, 0]);
  const translateY = interpolate(riseSpring, [0, 1], [350, 0]);
  const translateZ = interpolate(riseSpring, [0, 1], [-200, 0]);
  const opacity = interpolate(adjustedFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(riseSpring, [0, 1], [0.85, 1]);

  // Cards stay still after rising (removed continuous bobbing)
  const floatY = 0;

  if (frame < delayFrame) return null;

  return (
    <div
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 820,
          transform: `perspective(1200px) rotateX(${rotateX}deg) translateY(${translateY + floatY}px) translateZ(${translateZ}px) scale(${scale})`,
          opacity,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: '1.5px solid rgba(239, 68, 68, 0.45)',
          borderRadius: 24,
          padding: '24px 32px',
          boxShadow: `0 ${interpolate(riseSpring, [0, 1], [10, 35])}px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(239, 68, 68, 0.25)`,
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top Gloss Specular Highlight (Apple Style) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Badge Icon */}
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 16,
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 38,
            flexShrink: 0,
            boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)',
          }}
        >
          {badge}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ color: C.red, fontSize: 32, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
            {author}
          </div>
          <div style={{ color: C.white, fontSize: 42, fontWeight: 700, lineHeight: 1.35 }}>
            "{quote}"
          </div>
        </div>

        {/* Trend Indicator */}
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: C.red,
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 12,
            padding: '6px 14px',
            fontSize: 34,
            fontWeight: 800,
          }}
        >
          TIÊU CỰC
        </div>
      </div>
    </div>
  );
};
