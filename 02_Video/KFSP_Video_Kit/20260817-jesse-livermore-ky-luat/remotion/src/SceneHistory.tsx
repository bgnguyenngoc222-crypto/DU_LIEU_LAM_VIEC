import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C } from './theme';

export const SceneHistory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // s03 duration is 355 frames
  // Mưa tiền vàng + nến đỏ lao dốc

  const zoom = interpolate(frame, [0, 355], [1, 1.15], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [0, 15, 340, 355], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden', opacity }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${zoom})`,
          position: 'relative',
          background: 'linear-gradient(to bottom, #1a0f0f 0%, #0d0a07 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Falling Red Candles */}
        <Candle x={200} delay={10} dropY={frame * 8} />
        <Candle x={400} delay={40} dropY={(frame - 30) * 12} />
        <Candle x={800} delay={20} dropY={(frame - 10) * 10} />
        <Candle x={900} delay={60} dropY={(frame - 50) * 15} />

        {/* Rain of Gold Coins */}
        {Array.from({ length: 15 }).map((_, i) => {
          const delay = i * 20;
          const fall = Math.max(0, frame - delay) * (8 + (i % 5));
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: -100,
                left: 100 + (i * 123) % 900,
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: C.gold,
                transform: `translateY(${fall}px) rotateY(${frame * 5}deg)`,
                opacity: fall > 0 ? 0.8 : 0,
                boxShadow: `0 0 20px ${C.gold}88`,
                zIndex: 5,
              }}
            />
          );
        })}

        {/* Center visual: 100M USD Peak Text */}
        <div style={{ textAlign: 'center', zIndex: 10, marginTop: -200 }}>
          <div
            style={{
              fontSize: 140,
              fontWeight: 900,
              color: C.gold,
              textShadow: `0 0 60px ${C.gold}88`,
              fontFamily: 'serif',
            }}
          >
            $100,000,000
          </div>
          <div
            style={{
              fontSize: 44,
              color: '#fff',
              letterSpacing: 4,
              marginTop: 20,
              textTransform: 'uppercase',
            }}
          >
            Lợi nhuận bán khống lịch sử
          </div>
        </div>

        {/* Rising pillar of gold */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: 400,
            height: Math.min(600, frame * 3),
            backgroundColor: 'rgba(245, 197, 66, 0.2)',
            borderTop: `10px solid ${C.gold}`,
            boxShadow: `0 -20px 60px ${C.gold}88`,
            zIndex: 2,
          }}
        />

      </div>
    </AbsoluteFill>
  );
};

// Simple red candle falling
const Candle: React.FC<{ x: number; delay: number; dropY: number }> = ({ x, delay, dropY }) => {
  const frame = useCurrentFrame();
  if (frame < delay) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: -300,
        left: x,
        width: 40,
        height: 200,
        backgroundColor: C.red,
        transform: `translateY(${dropY}px)`,
        boxShadow: `0 0 30px ${C.red}aa`,
      }}
    >
      <div style={{ position: 'absolute', top: -50, left: 18, width: 4, height: 50, backgroundColor: C.red }} />
      <div style={{ position: 'absolute', bottom: -50, left: 18, width: 4, height: 50, backgroundColor: C.red }} />
    </div>
  );
};
