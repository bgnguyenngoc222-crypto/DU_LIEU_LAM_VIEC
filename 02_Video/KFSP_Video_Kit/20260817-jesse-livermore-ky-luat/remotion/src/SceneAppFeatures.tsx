import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Video, Sequence, staticFile } from 'remotion';
import { C } from './theme';
import { SCENES } from './timing';

export const SceneAppFeatures: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p1 = SCENES.s11.dur; // 408
  const p2 = p1 + SCENES.s12.dur; // 881
  const p3 = p2 + SCENES.s13.dur; // 1102

  const opacity = interpolate(frame, [0, 15, p3 - 15, p3], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isS11 = frame < p1;
  const isS12 = frame >= p1 && frame < p2;
  const isS13 = frame >= p2;

  // S11 & S12 share the iPhone mockup. We apply 3D transitions.
  const appPop = spring({ frame, fps, config: { damping: 14, mass: 0.8, stiffness: 100 } });

  // S11: Red Light logic
  const s11Frame = Math.max(0, frame);
  const showRedLight = s11Frame > 150; // After some time, flash red
  const redGlow = showRedLight ? interpolate(Math.sin((s11Frame - 150) * 0.2), [-1, 1], [0.4, 1]) : 0;

  // S13: Portfolio Card Alert
  const s13Frame = Math.max(0, frame - p2);
  const s13Pop = spring({ frame: s13Frame, fps, config: { damping: 14, mass: 0.8, stiffness: 100 } });
  const showAlert = s13Frame > 90;
  const alertScale = spring({ frame: Math.max(0, s13Frame - 90), fps, config: { damping: 12, mass: 0.7, stiffness: 140 } });

  return (
    <AbsoluteFill style={{ overflow: 'hidden', opacity, background: '#0a1628' }}>
      {/* Background Dark Purple Fintech Glow */}
      <AbsoluteFill style={{ background: 'radial-gradient(circle at 50% 50%, rgba(123, 58, 236, 0.15) 0%, rgba(10, 22, 40, 1) 70%)' }} />

      {/* Title indicating current module */}
      <div
        style={{
          position: 'absolute', top: 100, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid rgba(123, 58, 236, 0.3)', paddingBottom: 15,
        }}
      >
        <span style={{ fontSize: 38, fontWeight: 900, color: C.white, letterSpacing: 2, textShadow: '0 0 20px rgba(123, 58, 236, 0.8)' }}>
          {isS13 ? "QUẢN LÝ GIAO DỊCH" : (isS12 ? "BỘ LỌC CANSLIM & 4M" : "NHỊP ĐẬP THỊ TRƯỜNG")}
        </span>
        <span style={{ fontSize: 26, color: '#7B3AEC', fontFamily: 'monospace', fontWeight: 'bold' }}>
          {isS13 ? "MODULE 03" : (isS12 ? "MODULE 02" : "MODULE 01")}
        </span>
      </div>

      {/* S11 & S12: Smartphone 3D Mockup */}
      {!isS13 && (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Zooming Container */}
          <div style={{ position: 'absolute', top: '60%', transform: `translateY(-50%) scale(${appPop})` }}>
            {/* Device Shadow Rule */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#000',
              borderRadius: 72,
              filter: 'brightness(0) blur(30px)',
              transform: 'scale(0.97) translateY(20px)',
            }} />

            {/* Device Frame */}
            <div
              style={{
                position: 'relative',
                width: 760, height: 1640, // Huge enlarged iPhone mockup
                backgroundColor: '#030712',
                border: '18px solid #1e293b',
                borderRadius: 72,
                boxShadow: '0 0 0 4px rgba(123, 58, 236, 0.3)', // Only glow, real shadow is handled above
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
              }}
            >
            {isS11 ? (
              <Sequence from={0} durationInFrames={SCENES.s11.dur}>
                <AbsoluteFill style={{ overflow: 'hidden' }}>
                  <Video src={staticFile('app_ibd.mp4')} muted playbackRate={1.5} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {/* Traffic Light Warning UI overlay */}
                  {showRedLight && (
                    <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 100px rgba(239, 68, 68, ${redGlow})`, border: `8px solid rgba(239, 68, 68, ${redGlow})`, pointerEvents: 'none' }} />
                  )}
                </AbsoluteFill>
              </Sequence>
            ) : (
              <Sequence from={SCENES.s11.dur} durationInFrames={SCENES.s12.dur}>
                <AbsoluteFill style={{ overflow: 'hidden' }}>
                  <Video src={staticFile('app_canslim.mp4')} muted playbackRate={1.5} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {/* Radar Sweep Effect */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(52, 211, 153, 0) 0%, rgba(52, 211, 153, 0.2) 50%, rgba(52, 211, 153, 0) 100%)', transform: `translateY(${interpolate((frame % 120), [0, 120], [-1000, 1000])}px)`, pointerEvents: 'none' }} />
                </AbsoluteFill>
              </Sequence>
            )}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* S13: 3D Glassmorphism Portfolio Card */}
      {isS13 && (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              width: 800, padding: 40,
              background: 'rgba(11, 15, 25, 0.65)',
              backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
              border: '2px solid rgba(123, 58, 236, 0.4)', borderRadius: 32,
              boxShadow: '0 40px 100px rgba(0,0,0,0.9), inset 0 0 30px rgba(123, 58, 236, 0.1)',
              transform: `perspective(1000px) scale(${s13Pop}) rotateX(8deg) rotateY(-5deg)`,
              display: 'flex', flexDirection: 'column', position: 'relative',
            }}
          >
            <div style={{ fontSize: 32, color: '#7B3AEC', marginBottom: 8, letterSpacing: 2, fontWeight: 'bold' }}>QUẢN LÝ GIAO DỊCH</div>
            <div style={{ fontSize: 46, fontWeight: 900, color: C.white, marginBottom: 40, textShadow: '0 4px 20px rgba(255,255,255,0.2)' }}>DANH MỤC LỆNH</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, opacity: showAlert ? 0.2 : 1, transition: 'opacity 0.3s ease' }}>
              <PortfolioRow ticker="FPT" buyPrice="125.0" curPrice="132.5" returnPct="+6.0%" returnColor={C.green} />
              <PortfolioRow ticker="HSG" buyPrice="24.2" curPrice="21.1" returnPct="-12.8%" returnColor={C.red} />
              <PortfolioRow ticker="TCB" buyPrice="22.8" curPrice="23.1" returnPct="+1.3%" returnColor={C.green} />
            </div>

            {showAlert && (
              <div
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: `translate(-50%, -50%) scale(${alertScale})`,
                  width: 600,
                  backgroundColor: 'rgba(20, 10, 15, 0.95)', backdropFilter: 'blur(20px)',
                  border: `3px solid ${C.red}`, borderRadius: 32, padding: 40,
                  boxShadow: `0 30px 80px rgba(0,0,0,0.9), 0 0 60px ${C.red}66`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10,
                }}
              >
                <div style={{ fontSize: 80, marginBottom: 10, filter: 'drop-shadow(0 0 30px rgba(239, 68, 68, 0.9))' }}>⚠️</div>
                <div style={{ fontSize: 44, fontWeight: 900, color: C.white, marginBottom: 15, letterSpacing: 2 }}>CẮT LỖ DỨT KHOÁT</div>
                <div style={{ fontSize: 32, color: '#cbd5e1', lineHeight: 1.5, marginBottom: 30 }}>
                  <span style={{ fontWeight: 800, color: C.red }}>HSG</span> chạm ngưỡng rủi ro <span style={{ fontWeight: 900, color: C.red }}>-7%</span>
                </div>
                <div style={{ backgroundColor: C.red, color: C.white, padding: '16px 40px', borderRadius: 16, fontSize: 32, fontWeight: 900, boxShadow: `0 8px 30px ${C.red}88`, letterSpacing: 2 }}>
                  BÁN NGAY LẬP TỨC
                </div>
              </div>
            )}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

interface PortfolioRowProps {
  ticker: string;
  buyPrice: string;
  curPrice: string;
  returnPct: string;
  returnColor: string;
}

const PortfolioRow: React.FC<PortfolioRowProps> = ({ ticker, buyPrice, curPrice, returnPct, returnColor }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
    <div>
      <div style={{ fontSize: 32, fontWeight: 900, color: C.white }}>{ticker}</div>
      <div style={{ fontSize: 24, color: '#94a3b8', marginTop: 4 }}>Mua: {buyPrice} | Hiện: {curPrice}</div>
    </div>
    <div style={{ padding: '8px 16px', borderRadius: 12, backgroundColor: `${returnColor}15`, color: returnColor, fontWeight: 900, fontSize: 28, border: `1px solid ${returnColor}44` }}>
      {returnPct}
    </div>
  </div>
);

