import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C } from './theme';
import { StylizedCharacter } from './StylizedCharacter';
import { AppleStyleCard } from './AppleStyleCard';

export const SceneBefore: React.FC = () => {
  const frame = useCurrentFrame();

  // Static scale (removed pulse that caused visual strain)

  // Phase 1 (0 -> 150): Characters and Red Board
  // Characters fade progress from frame 95 to 145
  const charFadeProgress = interpolate(frame, [95, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Board opacity changes when cards rise up in phase 2
  const boardOpacity = interpolate(frame, [170, 210], [1, 0.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const boardScale = interpolate(frame, [170, 210], [1, 0.92], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* Background Red Trading Board (KHÔNG MÃ THẬT, KHÔNG GIÁ/CON SỐ THẬT) */}
      <div
        style={{
          position: 'absolute',
          top: 320,
          width: 880,
          backgroundColor: 'rgba(239, 68, 68, 0.08)',
          border: '2px solid rgba(239, 68, 68, 0.45)',
          borderRadius: 32,
          padding: '36px 36px',
          boxShadow: '0 25px 60px rgba(239, 68, 68, 0.2)',
          backdropFilter: 'blur(18px)',
          opacity: boardOpacity,
          transform: `scale(${boardScale})`,
          transition: 'transform 0.4s ease',
        }}
      >
        {/* Market Title Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <div style={{ color: C.red, fontSize: 46, fontWeight: 900, letterSpacing: 1.5 }}>THỊ TRƯỜNG CHUNG</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 20, marginTop: 4 }}>Sắc đỏ bao trùm diện rộng</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: C.red, fontSize: 44, fontWeight: 900 }}>-x%</div>
            <div style={{ color: 'rgba(239, 68, 68, 0.8)', fontSize: 20, fontWeight: 700 }}>ẢM ĐẠM / RỦI RO</div>
          </div>
        </div>

        {/* Ticker rows with pure placeholders A, B, C, D, E and -x%, -y%, -z% */}
        {[
          { ticker: 'Cổ phiếu A', change: '-x%' },
          { ticker: 'Cổ phiếu B', change: '-y%' },
          { ticker: 'Cổ phiếu C', change: '-z%' },
          { ticker: 'Cổ phiếu D', change: '-w%' },
          { ticker: 'Cổ phiếu E', change: '-k%' },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '14px 22px',
              borderRadius: 16,
              marginBottom: 10,
              border: '1px solid rgba(239, 68, 68, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: C.red,
                  boxShadow: '0 0 8px #ef4444',
                }}
              />
              <span style={{ color: C.white, fontSize: 30, fontWeight: 800 }}>{item.ticker}</span>
            </div>
            <span
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.25)',
                color: C.red,
                padding: '6px 18px',
                borderRadius: 10,
                fontSize: 26,
                fontWeight: 900,
                border: '1px solid rgba(239, 68, 68, 0.5)',
              }}
            >
              {item.change}
            </span>
          </div>
        ))}

        {/* Warning bar inside board */}
        <div
          style={{
            marginTop: 16,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 18,
            fontStyle: 'italic',
          }}
        >
          Áp lực bán tháo lan rộng · Tâm lý muốn buông xuôi
        </div>
      </div>

      {/* Group of 5 - 6 Stylized Characters standing in foreground (0 -> 150) */}
      {frame < 160 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {/* Character 1 (Left) */}
          <StylizedCharacter
            x={160}
            y={1240}
            scale={1.05}
            color="#94a3b8"
            headTilt={18}
            isThrowing={true}
            throwStartFrame={90}
            fadeProgress={charFadeProgress}
          />
          {/* Character 2 */}
          <StylizedCharacter
            x={310}
            y={1280}
            scale={1.15}
            color="#cbd5e1"
            headTilt={22}
            isThrowing={true}
            throwStartFrame={92}
            fadeProgress={charFadeProgress}
          />
          {/* Character 3 (Center leader) */}
          <StylizedCharacter
            x={480}
            y={1220}
            scale={1.22}
            color="#e2e8f0"
            headTilt={20}
            isThrowing={true}
            throwStartFrame={94}
            fadeProgress={charFadeProgress}
          />
          {/* Character 4 */}
          <StylizedCharacter
            x={650}
            y={1270}
            scale={1.18}
            color="#cbd5e1"
            headTilt={-18}
            isThrowing={true}
            throwStartFrame={91}
            fadeProgress={charFadeProgress}
          />
          {/* Character 5 */}
          <StylizedCharacter
            x={800}
            y={1230}
            scale={1.1}
            color="#94a3b8"
            headTilt={-22}
            isThrowing={true}
            throwStartFrame={95}
            fadeProgress={charFadeProgress}
          />
          {/* Character 6 (Right) */}
          <StylizedCharacter
            x={930}
            y={1260}
            scale={1.02}
            color="#64748b"
            headTilt={-15}
            isThrowing={true}
            throwStartFrame={93}
            fadeProgress={charFadeProgress}
          />
        </div>
      )}

      {/* Phase 2: Apple-Style Device Rise Animation (00:07 -> 00:12 = Frame 210 -> 360) */}
      {frame >= 180 && (
        <div
          style={{
            position: 'absolute',
            top: 400,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Section Header */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 30,
              opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            <div style={{ color: C.red, fontSize: 20, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>
              Làn Sóng Bi Quan
            </div>
            <div style={{ color: C.white, fontSize: 34, fontWeight: 800, marginTop: 4 }}>
              Tâm lý đám đông đang nói gì?
            </div>
          </div>

          {/* 3 Apple Style 3D Cards */}
          <AppleStyleCard
            quote="bỏ cuộc đi, không cứu vãn được đâu"
            author="Hội nhóm đầu tư A"
            badge="📉"
            delayFrame={210}
            index={0}
          />
          <AppleStyleCard
            quote="thị trường xấu quá rồi"
            author="Diễn đàn chứng khoán B"
            badge="⚠️"
            delayFrame={235}
            index={1}
          />
          <AppleStyleCard
            quote="rút lui thôi"
            author="Nhà đầu tư hoảng loạn C"
            badge="🛑"
            delayFrame={260}
            index={2}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
