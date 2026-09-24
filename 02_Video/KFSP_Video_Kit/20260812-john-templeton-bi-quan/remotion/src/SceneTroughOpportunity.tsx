import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FONTS } from './theme';

export const SceneTroughOpportunity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  // Chart line drawing progress
  const lineProgress = interpolate(frame, [8, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Bottom glow pulse
  const bottomPulse = interpolate(Math.sin(frame / 5), [-1, 1], [0.8, 1.2]);
  const radarWave = interpolate((frame % 30) / 30, [0, 1], [0, 1]);
  const radarOpacity = interpolate((frame % 30) / 30, [0, 0.5, 1], [0.8, 0.4, 0]);

  // Highlight badge reveals
  const revealBottom = interpolate(frame, [38, 60], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: FONTS.main,
        transform: `scale(${interpolate(entrance, [0, 1], [0.9, 1])})`,
        opacity: interpolate(entrance, [0, 1], [0, 1]),
      }}
    >
      <div
        style={{
          width: 880,
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          border: '2px solid rgba(123, 58, 236, 0.4)',
          borderRadius: 36,
          padding: '36px 36px',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
        }}
      >
        {/* Header Badge */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(123, 58, 236, 0.2)',
              border: `1px solid ${C.brandLight}`,
              color: C.brandLight,
              fontSize: 22,
              fontWeight: 900,
              padding: '6px 20px',
              borderRadius: 20,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Quy luật tạo đáy thị trường
          </div>
          <h2 style={{ color: C.white, fontSize: 42, fontWeight: 800, margin: '10px 0 0 0' }}>
            Bi Quan Cực Độ = Cơ Hội Lớn Nhất
          </h2>
        </div>

        {/* Dynamic Interactive Chart SVG */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 460,
            backgroundColor: 'rgba(10, 15, 30, 0.85)',
            borderRadius: 24,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
            padding: 20,
          }}
        >
          {/* Background Grid Lines */}
          <svg width="100%" height="100%" viewBox="0 0 800 340" style={{ overflow: 'visible' }}>
            {/* Grid */}
            <line x1="0" y1="80" x2="800" y2="80" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="6 6" />
            <line x1="0" y1="170" x2="800" y2="170" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="6 6" />
            <line x1="0" y1="260" x2="800" y2="260" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="6 6" />

            {/* Plunging Bearish Zone Area */}
            <path
              d="M 50 40 Q 250 80, 400 270 L 400 340 L 50 340 Z"
              fill="url(#redPlungeGrad)"
              opacity="0.3"
            />

            {/* Accumulation / Reversal Zone Area */}
            <path
              d="M 400 270 Q 550 270, 750 110 L 750 340 L 400 340 Z"
              fill="url(#purpleGrad)"
              opacity={revealBottom * 0.35}
            />

            <defs>
              <linearGradient id="redPlungeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7B3AEC" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f5c542" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Price Line Stroke with Dash offset */}
            <path
              d="M 50 40 Q 220 90, 400 270 Q 550 270, 750 110"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="5"
              strokeDasharray="1000"
              strokeDashoffset={1000 - lineProgress * 1000}
            />

            {/* Plunging Phase label */}
            <text x="120" y="70" fill="#ef4444" fontSize="26" fontWeight="800" letterSpacing="1">
              ĐỢT ĐIỀU CHỈNH / BI QUAN
            </text>

            {/* Bottom Radar Beacon at Trough point (400, 270) */}
            {revealBottom > 0 && (
              <g transform="translate(400, 270)">
                {/* Expanding Radar Wave */}
                <circle
                  r={radarWave * 80}
                  fill="none"
                  stroke={C.gold}
                  strokeWidth="2.5"
                  opacity={radarOpacity * revealBottom}
                />
                <circle
                  r={radarWave * 120}
                  fill="none"
                  stroke={C.brandLight}
                  strokeWidth="1.5"
                  opacity={radarOpacity * 0.7 * revealBottom}
                />

                {/* Core Glowing Orb */}
                <circle
                  r="14"
                  fill={C.gold}
                  style={{
                    filter: `drop-shadow(0 0 16px ${C.gold})`,
                    transform: `scale(${bottomPulse})`,
                    transformOrigin: 'center center',
                  }}
                />
                <circle r="6" fill="#fff" />
              </g>
            )}

            {/* Rebound Phase label */}
            {revealBottom > 0.5 && (
              <text x="500" y="90" fill={C.gold} fontSize="26" fontWeight="800" letterSpacing="1" opacity={revealBottom}>
                ÂM THẦM BỨT PHÁ ↗
              </text>
            )}
          </svg>

          {/* Bottom Highlight Tag */}
          {revealBottom > 0 && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 310,
                transform: `translateX(-50%) scale(${interpolate(revealBottom, [0, 1], [0.8, 1])})`,
                opacity: revealBottom,
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: `2px solid ${C.gold}`,
                borderRadius: 16,
                padding: '8px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                boxShadow: '0 0 25px rgba(245, 197, 66, 0.5)',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: 22 }}>✨</span>
              <span style={{ color: C.gold, fontSize: 26, fontWeight: 900, letterSpacing: 1 }}>
                VÙNG CƠ HỘI LỚN NHẤT TẠO ĐÁY
              </span>
            </div>
          )}
        </div>

        {/* 2 Opposite Forces Comparison Footer (Stacked vertically to prevent horizontal crowding in 9:16) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: 18,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span style={{ fontSize: 28 }}>🛑</span>
            <div>
              <div style={{ color: C.red, fontSize: 26, fontWeight: 900 }}>Đám đông hoảng loạn</div>
              <div style={{ color: C.textMuted, fontSize: 22, fontWeight: 700 }}>Bán tháo ngay đáy sâu</div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(123, 58, 236, 0.2)',
              border: `1px solid ${C.brandLight}`,
              borderRadius: 18,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span style={{ fontSize: 28 }}>💎</span>
            <div>
              <div style={{ color: C.gold, fontSize: 26, fontWeight: 900 }}>Dòng tiền thông minh</div>
              <div style={{ color: C.textMuted, fontSize: 22, fontWeight: 700 }}>Âm thầm gom cổ phiếu khỏe</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
