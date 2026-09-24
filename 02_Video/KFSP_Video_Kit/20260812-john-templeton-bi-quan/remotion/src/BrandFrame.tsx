import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { C } from './theme';

export const BrandFrame: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 100 }}>
      {/* Top purple gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 380,
          background: 'linear-gradient(180deg, rgba(123, 58, 236, 0.45) 0%, rgba(123, 58, 236, 0) 100%)',
        }}
      />
      {/* Bottom purple gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 480,
          background: 'linear-gradient(0deg, rgba(10, 22, 40, 0.95) 0%, rgba(123, 58, 236, 0.3) 50%, rgba(123, 58, 236, 0) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
