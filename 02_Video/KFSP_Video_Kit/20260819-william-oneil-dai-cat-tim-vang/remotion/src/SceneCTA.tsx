import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SCENES } from './timing';
import { C } from './theme';

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // S10: Lá chắn bảo vệ (Từ 0 đến SCENES.s11.from)
  const s10Dur = SCENES.s10.dur;
  const s11Start = SCENES.s11.from - SCENES.s10.from; // relative to sequence start

  const shieldScale = spring({ frame, fps, config: { damping: 12 } });
  const logoScale = spring({ frame: frame - s11Start, fps, config: { damping: 14 } });
  const opacity = interpolate(frame - s11Start, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bgDark, justifyContent: 'center', alignItems: 'center' }}>
      
      {/* S10: Kịch bản giải ngân / Bảo vệ tài khoản */}
      {frame < s11Start && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            transform: `scale(${shieldScale})`,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '2px solid #A78BFA',
            borderRadius: 30,
            padding: '40px 60px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(167, 139, 250, 0.3)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}>
            <div style={{ fontSize: 120 }}>🎯</div>
            <div style={{ fontSize: 50, fontWeight: 900, color: '#A78BFA', letterSpacing: 2 }}>KỊCH BẢN GIẢI NGÂN</div>
            <div style={{ fontSize: 35, fontWeight: 600, color: '#fff', textAlign: 'center', lineHeight: 1.5 }}>
              Chủ động giao dịch<br/>Không để cảm xúc chi phối
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* S11: CTA Tải App */}
      {frame >= s11Start && (
        <AbsoluteFill style={{ alignItems: 'center', opacity }}>
          
          <div style={{ position: 'absolute', top: 250, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Img 
              src={staticFile('logo-kfsp.png')} 
              style={{ 
                width: 320, 
                marginBottom: 50,
                transform: `scale(${logoScale})`,
                filter: `drop-shadow(0 0 50px ${C.brandGlow})`
              }} 
            />
            <div style={{
              fontSize: 85,
              fontWeight: 800,
              color: C.white,
              textAlign: 'center',
              letterSpacing: 2,
              lineHeight: 1.2
            }}>
              ĐƯA CHỨNG KHOÁN<br/>VỀ TẦM TAY BẠN
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: -200, display: 'flex', gap: 20 }}>
            <Img src={staticFile('store-ios.jpg')} style={{ width: 510, borderRadius: 40, boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }} />
            <Img src={staticFile('store-android.jpg')} style={{ width: 510, borderRadius: 40, boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }} />
          </div>

        </AbsoluteFill>
      )}
      
    </AbsoluteFill>
  );
};
