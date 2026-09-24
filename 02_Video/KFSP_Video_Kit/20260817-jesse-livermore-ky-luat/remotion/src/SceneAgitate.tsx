import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Video, Sequence, staticFile } from 'remotion';
import { C } from './theme';
import { SCENES } from './timing';

export const SceneAgitate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p1 = SCENES.s08.dur; // 372
  const p2 = p1 + SCENES.s09.dur; // 769
  const p3 = p2 + SCENES.s10.dur; // 981

  // S08: Chart to smoke
  const s08Progress = interpolate(frame, [0, p1], [0, 1], { extrapolateRight: 'clamp' });
  const chartDraw = interpolate(frame, [0, 60], [0, 1000], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [p1 - 60, p1], [1, 0], { extrapolateRight: 'clamp' });
  const smokeBlur = interpolate(frame, [p1 - 60, p1], [0, 30], { extrapolateRight: 'clamp' });
  const smokeY = interpolate(frame, [p1 - 60, p1], [0, -100], { extrapolateRight: 'clamp' });

  const kdt1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12 } });
  const kdt2 = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12 } });
  const kdt3 = spring({ frame: Math.max(0, frame - 230), fps, config: { damping: 12 } });

  // S09: Loop of Death (Green -> Red -> Fire)
  const s09Frame = Math.max(0, frame - p1);
  const loopRot = interpolate(s09Frame, [0, p2 - p1], [0, 360]);
  const step1 = spring({ frame: Math.max(0, s09Frame - 30), fps, config: { damping: 12 } });
  const step2 = spring({ frame: Math.max(0, s09Frame - 150), fps, config: { damping: 12 } });
  const step3 = spring({ frame: Math.max(0, s09Frame - 270), fps, config: { damping: 12 } });

  // S10: Anchor dropping
  const s10Frame = Math.max(0, frame - p2);
  const chaoticPath = `M -100 960 L 200 ${960 - Math.sin(frame * 0.5) * 150} L 400 ${960 + Math.cos(frame * 0.3) * 200} L 600 ${960 - Math.sin(frame * 0.8) * 250} L 800 ${960 + Math.cos(frame * 0.2) * 150} L 1200 960`;
  const phoneScale = spring({ frame: Math.max(0, s10Frame), fps, config: { damping: 14, mass: 1, stiffness: 100 } });
  const impactScale = interpolate(phoneScale, [0, 0.9, 1], [1, 0.98, 1]);

  const s10Text1 = spring({ frame: Math.max(0, s10Frame - 15), fps, config: { damping: 12 } });
  const s10Text2 = spring({ frame: Math.max(0, s10Frame - 60), fps, config: { damping: 12 } });
  const s10TextFade = interpolate(s10Frame, [90, 110], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: '#0a1628' }}>
      
      {/* S08: Biểu đồ mây khói */}
      {frame < p1 && (
        <AbsoluteFill style={{ opacity: fadeOut, filter: `blur(${smokeBlur}px)`, transform: `translateY(${smokeY}px)` }}>
          
          {/* Texts FIRST so they render BEHIND the SVG line */}
          {kdt1 > 0 && (
            <div style={{ position: 'absolute', top: 100, left: 120, fontSize: 60, fontWeight: 900, color: C.gold, opacity: fadeOut, transform: `scale(${kdt1})` }}>
              KIẾM TIỀN ĐÃ KHÓ
            </div>
          )}
          {kdt2 > 0 && (
            <div style={{ position: 'absolute', top: 550, left: 300, fontSize: 60, fontWeight: 900, color: C.red, opacity: fadeOut, transform: `scale(${kdt2})` }}>
              GIỮ TIỀN CÒN KHÓ HƠN
            </div>
          )}
          {kdt3 > 0 && (
            <div style={{ position: 'absolute', bottom: 200, right: 100, fontSize: 70, fontWeight: 900, color: '#94a3b8', opacity: fadeOut, transform: `scale(${kdt3})`, textAlign: 'right' }}>
              THÀNH QUẢ<br/>TAN THÀNH MÂY KHÓI
            </div>
          )}

          {/* SVG Line rendered ON TOP of texts */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <path
              d="M 100 700 Q 300 600 400 400 T 800 200 T 1000 100"
              fill="none"
              stroke={C.green}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray="1000"
              strokeDashoffset={1000 - chartDraw}
              style={{ filter: `drop-shadow(0 0 20px ${C.green})` }}
            />
            {/* Glowing profit point */}
            <circle cx="800" cy="200" r={15 * (chartDraw > 900 ? 1 : 0)} fill={C.green} style={{ filter: `drop-shadow(0 0 30px ${C.green})` }} />
          </svg>

        </AbsoluteFill>
      )}

      {/* S09: Vòng lặp chết người */}
      {frame >= p1 && frame < p2 && (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle, #1a0f0f 0%, #0a1628 100%)' }}>
          <div style={{ position: 'relative', width: 600, height: 600, transform: `rotate(${loopRot}deg)` }}>
            {/* Circular track */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="40" />
            </svg>
            
            {/* Step 1: Uptrend */}
            {step1 > 0 && (
              <div style={{ position: 'absolute', top: 0, left: 200, width: 200, height: 100, background: 'rgba(52, 211, 153, 0.1)', backdropFilter: 'blur(10px)', border: `2px solid ${C.green}`, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', color: C.green, fontSize: 32, fontWeight: 'bold', transform: `scale(${step1}) rotate(${-loopRot}deg)`, boxShadow: `0 0 30px rgba(52, 211, 153, 0.3)` }}>
                THẮNG LỚN
              </div>
            )}
            
            {/* Step 2: Gồng lỗ */}
            {step2 > 0 && (
              <div style={{ position: 'absolute', bottom: 100, right: -50, width: 200, height: 100, background: 'rgba(248, 113, 113, 0.1)', backdropFilter: 'blur(10px)', border: `2px solid ${C.red}`, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', color: C.red, fontSize: 32, fontWeight: 'bold', transform: `scale(${step2}) rotate(${-loopRot}deg)`, boxShadow: `0 0 30px rgba(248, 113, 113, 0.3)` }}>
                GỒNG LỖ
              </div>
            )}
            
            {/* Step 3: Cháy TK */}
            {step3 > 0 && (
              <div style={{ position: 'absolute', bottom: 100, left: -50, width: 200, height: 100, background: 'rgba(245, 197, 66, 0.1)', backdropFilter: 'blur(10px)', border: `2px solid ${C.gold}`, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', color: C.gold, fontSize: 32, fontWeight: 'bold', transform: `scale(${step3}) rotate(${-loopRot}deg)`, boxShadow: `0 0 40px rgba(245, 197, 66, 0.5)` }}>
                CHÁY TÀI KHOẢN
              </div>
            )}
          </div>
          <div style={{ position: 'absolute', top: 150, fontSize: 64, fontWeight: 900, color: '#fff', letterSpacing: 4 }}>VÒNG LẶP CHẾT NGƯỜI</div>
        </AbsoluteFill>
      )}

      {/* S10: Mỏ neo rơi */}
      {frame >= p2 && (
        <AbsoluteFill style={{ background: '#0a1628' }}>
          <div style={{ transform: `scale(${impactScale})`, width: '100%', height: '100%', position: 'absolute' }}>
            {/* Chaotic background chart */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6 }}>
              <path d={chaoticPath} fill="none" stroke={C.red} strokeWidth="6" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 10px ${C.red})` }} />
            </svg>
            
            {/* Texts before phone */}
            {s10Text1 > 0 && (
              <div style={{ position: 'absolute', top: 150, left: '50%', transform: `translateX(-50%) scale(${s10Text1})`, fontSize: 80, fontWeight: 900, color: '#94a3b8', textAlign: 'center', opacity: s10TextFade, zIndex: 10 }}>
                ĐỂ GIỮ CÁI ĐẦU LẠNH...
              </div>
            )}

            {/* The Smartphone Mockup */}
            <Sequence from={p2}>
              {/* Zooming Container */}
              <div style={{ position: 'absolute', top: '65%', left: '50%', transform: `translate(-50%, -50%) scale(${phoneScale})` }}>
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
                <div style={{
                  position: 'relative',
                  width: 760, height: 1640, // Huge enlarged iPhone mockup
                  backgroundColor: '#030712',
                  border: '18px solid #1e293b',
                  borderRadius: 72,
                  boxShadow: '0 0 0 4px rgba(123, 58, 236, 0.3)', // Only glow, real shadow is handled above
                  overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <Video src={staticFile('v_home.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </Sequence>
            
            {/* KFSP Brand appearing after impact */}
            {phoneScale > 0.8 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 100,
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  fontSize: 120,
                  fontWeight: 900,
                  color: '#7B3AEC', // Violet brand
                  textShadow: '0 0 50px rgba(123, 58, 236, 0.8)',
                  letterSpacing: 10,
                  zIndex: 10
                }}
              >
                KFSP
              </div>
            )}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
