import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';

// Toggle BRAND / NOBRAND status
const NOBRAND = true;

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

      {/* Top-Center White Logo (only for BRAND mode) */}
      {!NOBRAND && (
        <div
          style={{
            position: 'absolute',
            top: 78,
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'brightness(0) invert(1) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))',
          }}
        >
          <Img
            src={staticFile('logo-kfsp.png')}
            style={{
              height: 48,
              objectFit: 'contain',
            }}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
