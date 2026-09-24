import React from 'react';
import { AbsoluteFill, interpolate, spring, staticFile, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import { C } from './theme';
import { SCENES } from './timing';

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dur = SCENES.s14.dur; // 200

  const opacity = interpolate(frame, [0, 15, dur - 15, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shield pop
  const shieldSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, mass: 1.5, stiffness: 80 } });
  
  // Risk warning pop
  const riskSpring = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 14, mass: 1, stiffness: 100 } });
  
  // Slogan & Buttons pop
  const contentSpring = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 14, mass: 1, stiffness: 100 } });

  return (
    <AbsoluteFill style={{ overflow: 'hidden', opacity, background: '#0a1628', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {/* Background Soft Purple Aura */}
      <AbsoluteFill style={{ background: 'radial-gradient(circle at 50% 50%, rgba(123, 58, 236, 0.2) 0%, rgba(10, 22, 40, 0) 70%)' }} />

      {/* 1. App Logo (Replacing Shield) */}
      <div style={{ position: 'absolute', top: 120, transform: `scale(${shieldSpring})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Img
          src={staticFile("logo-kfsp.png")}
          style={{
            width: "180px",
            height: "180px",
            objectFit: "contain",
            filter: "brightness(0) invert(1) drop-shadow(0 6px 24px rgba(123, 58, 236, 0.7))",
          }}
        />
      </div>

      {/* 2. Risk Warning Card (Mandatory Rule) */}
      <div
        style={{
          position: 'absolute', top: 400,
          transform: `scale(${riskSpring})`, opacity: riskSpring,
          width: 700, backgroundColor: 'rgba(239, 68, 68, 0.1)', backdropFilter: 'blur(20px)',
          border: '2px solid rgba(239, 68, 68, 0.4)', borderRadius: 24, padding: '30px 40px',
          textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 40px rgba(239, 68, 68, 0.15)',
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 900, color: C.red, letterSpacing: 2, marginBottom: 15 }}>⚠️ CẢNH BÁO RỦI RO</div>
        <div style={{ fontSize: 26, color: '#e2e8f0', lineHeight: 1.6, fontFamily: 'monospace' }}>Mọi quyết định đầu tư đều tiềm ẩn rủi ro và cần kỷ luật quản trị từ chính bạn.</div>
      </div>

      {/* 3. Slogan & App Download */}
      <div
        style={{
          position: 'absolute', top: 650,
          transform: `scale(${contentSpring})`, opacity: contentSpring,
          display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 50, whiteSpace: 'nowrap', fontWeight: 900, color: '#AA75FF', lineHeight: 1.3, letterSpacing: '1px', textTransform: 'uppercase' }}>
            ĐƯA CHỨNG KHOÁN VỀ TẦM TAY BẠN
          </div>
        </div>

        {/* CTA Button */}
        <div
          style={{
            backgroundColor: "#7B3AEC",
            color: "#ffffff",
            fontSize: "28px",
            fontWeight: 900,
            padding: "20px 48px",
            borderRadius: "44px",
            boxShadow: "0 0 40px rgba(123, 58, 236, 0.8)",
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: 80
          }}
        >
          MỞ APP KFSP TRẢI NGHIỆM NGAY
        </div>

        {/* Stores (Phone Mockups) */}
        <div style={{ display: 'flex', gap: 60, marginTop: 40 }}>
          {/* Phone 1: iOS */}
          <div style={{ width: 440, height: 950, backgroundColor: '#111', borderRadius: 55, padding: 14, position: 'relative', boxShadow: '0 30px 80px rgba(123, 58, 236, 0.7), inset 0 0 10px rgba(255,255,255,0.3)', border: '2px solid #333' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: 42, overflow: 'hidden', position: 'relative', backgroundColor: '#fff' }}>
              <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 140, height: 35, backgroundColor: '#000', borderRadius: 20, zIndex: 10 }}></div>
              <Img src={staticFile("store-ios.jpg")} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          </div>
          
          {/* Phone 2: Android */}
          <div style={{ width: 440, height: 950, backgroundColor: '#111', borderRadius: 55, padding: 14, position: 'relative', boxShadow: '0 30px 80px rgba(123, 58, 236, 0.7), inset 0 0 10px rgba(255,255,255,0.3)', border: '2px solid #333' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: 42, overflow: 'hidden', position: 'relative', backgroundColor: '#fff' }}>
              <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 140, height: 35, backgroundColor: '#000', borderRadius: 20, zIndex: 10 }}></div>
              <Img src={staticFile("store-android.jpg")} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
