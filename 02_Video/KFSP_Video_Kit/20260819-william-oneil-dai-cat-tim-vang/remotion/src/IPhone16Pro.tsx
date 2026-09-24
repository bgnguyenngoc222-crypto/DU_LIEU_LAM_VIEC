import React from 'react';
import { Img, staticFile } from 'remotion';

interface IPhone16ProProps {
  children?: React.ReactNode;
  scale?: number;
}

export const IPhone16Pro: React.FC<IPhone16ProProps> = ({ children, scale = 1 }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 480 * scale,
        height: 1040 * scale,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      {/* Screen Content */}
      <div
        style={{
          position: 'absolute',
          top: 15 * scale,
          left: 17 * scale,
          width: 446 * scale,
          height: 1010 * scale,
          borderRadius: 48 * scale,
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        {children}
      </div>

      {/* iPhone 16 Pro Frame overlay */}
      <Img
        src={staticFile('phone.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
