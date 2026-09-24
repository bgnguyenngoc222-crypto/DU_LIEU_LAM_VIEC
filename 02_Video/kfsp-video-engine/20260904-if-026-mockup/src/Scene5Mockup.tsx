import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const Scene5Mockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide up phone animation
  const phoneY = spring({
    frame,
    fps,
    config: { damping: 12 },
    from: 1000,
    to: 0,
  });

  // Glowing logo animation
  const logoOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });
  const logoScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14 },
    from: 0.5,
    to: 1,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Background ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(123,58,236,0.3) 0%, rgba(5,5,5,0) 70%)',
          top: '10%',
          opacity: logoOpacity
        }}
      />

      {/* KFSP Logo (text placeholder) */}
      <div
        style={{
          position: 'absolute',
          top: 300,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          fontSize: 160,
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 0 20px #7B3AEC, 0 0 60px #7B3AEC',
          fontFamily: 'sans-serif'
        }}
      >
        KFSP
      </div>

      {/* Phone Mockup with Green Screen */}
      <div
        style={{
          position: 'absolute',
          bottom: 250,
          width: 600,
          height: 1000,
          backgroundColor: '#111',
          borderRadius: 60,
          transform: `translateY(${phoneY}px)`,
          border: '12px solid #333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
        }}
      >
        {/* Chroma key green screen */}
        <div style={{ width: '95%', height: '95%', backgroundColor: '#00FF00', borderRadius: 45 }} />
      </div>

      {/* Footer text */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          fontSize: 50,
          color: '#fff',
          fontFamily: 'sans-serif',
          opacity: logoOpacity,
          letterSpacing: 3
        }}
      >
        Đưa chứng khoán về tầm tay bạn
      </div>

    </AbsoluteFill>
  );
};
