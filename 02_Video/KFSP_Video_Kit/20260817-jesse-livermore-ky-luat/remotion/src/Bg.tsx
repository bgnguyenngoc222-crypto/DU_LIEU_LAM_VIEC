import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C } from './theme';

export const Bg: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(Math.sin(frame / 30), [-1, 1], [0.3, 0.6]);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bgNavy, overflow: 'hidden' }}>
      {/* Background radial gradient */}
      <div
        style={{
          position: 'absolute',
          width: '140%',
          height: '100%',
          left: '-20%',
          top: '10%',
          background: `radial-gradient(circle at 50% 40%, rgba(123, 58, 236, ${glow * 0.35}) 0%, rgba(10, 22, 40, 0) 70%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Grid line texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
