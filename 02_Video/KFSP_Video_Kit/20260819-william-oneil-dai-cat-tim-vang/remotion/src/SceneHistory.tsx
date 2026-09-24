import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { SCENES } from './timing';
import { C } from './theme';
import { Chart, Level, Marker, Tag, GREEN, RED, GOLD } from './Chart';

export const SceneHistory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s03Start = 0; 
  const s03Dur = SCENES.s03.dur;
  const s04Start = SCENES.s04.from - SCENES.s03.from; 
  const s04Dur = SCENES.s04.dur;

  // William O'Neil Animation
  const oneilScale = spring({ frame: frame - s03Start, fps, config: { damping: 14 } });
  const oneilOpacity = interpolate(frame - s03Start, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const oneilY = interpolate(frame, [0, s03Dur], [0, -30], { extrapolateRight: 'clamp' });
  
  const patternStartFrame = s03Start + 120;
  const oneilFadeOut = interpolate(frame, [patternStartFrame, patternStartFrame + 15], [1, 0], { extrapolateRight: 'clamp' });

  // Hai Đáy
  const doubleBottomPrices = [80, 75, 68, 60, 50, 42, 38, 45, 52, 49, 41, 39, 45, 55, 65, 75];
  // VĐVN
  const invHSPrices = [80, 72, 60, 52, 60, 68, 55, 45, 35, 48, 62, 55, 48, 55, 65, 75];

  const p1Scale = spring({ frame: frame - patternStartFrame, fps, config: { damping: 12 } });
  const pattern2StartFrame = patternStartFrame + 60;
  const p2Scale = spring({ frame: frame - pattern2StartFrame, fps, config: { damping: 12 } });

  const s04Frame = frame - s04Start;
  const s04Scale = spring({ frame: s04Frame, fps, config: { damping: 12 } });
  const s04Opacity = interpolate(s04Frame, [0, 15], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const quote = '"Trước khi tăng tốc, dòng tiền lớn luôn để lại dấu vết"';
  const typingLength = Math.max(0, Math.floor(interpolate(frame - s03Start - 10, [0, 45], [0, quote.length], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })));
  const displayQuote = quote.substring(0, typingLength);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bgNavy }}>
      
      {/* S03: William O'Neil Portrait */}
      {frame < patternStartFrame + 15 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: oneilOpacity * oneilFadeOut }}>
          <div style={{
            transform: `scale(${oneilScale}) translateY(${oneilY}px)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            padding: 40, borderRadius: 40,
            border: `2px solid ${C.brandLight}`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(167, 139, 250, 0.3)`,
            backdropFilter: 'blur(20px)'
          }}>
            <Img src={staticFile('william oneil.png')} style={{ width: 400, borderRadius: 20, marginBottom: 30 }} />
            <div style={{ fontSize: 50, fontWeight: 900, color: C.brandLight, letterSpacing: 2 }}>WILLIAM O'NEIL</div>
            <div style={{ fontSize: 30, color: C.white, marginTop: 10 }}>Huyền thoại đầu tư</div>
            <div style={{ 
              fontSize: 28, color: C.green, marginTop: 25, fontStyle: 'italic', 
              maxWidth: 420, textAlign: 'center', minHeight: 40, fontWeight: 600
            }}>
              {displayQuote}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* S03: Các mẫu hình vẽ bằng code */}
      {frame >= patternStartFrame && frame < s04Start && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 40, perspective: 1200 }}>
          
          <div style={{
            transform: `scale(${p1Scale}) rotateY(5deg)`,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              border: `2px solid rgba(167, 139, 250, 0.4)`,
              borderRadius: 36,
              padding: 24,
              boxShadow: `0 30px 60px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(167, 139, 250, 0.1)`,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              width: 460, height: 500, position: 'relative'
            }}>
               <Sequence from={patternStartFrame + 10}><Audio src={staticFile('pop.mp3')} volume={0.4} /></Sequence>
               <div style={{ position: 'absolute', top: '50%', left: '50%', width: 1000, height: 900, transform: 'translate(-50%, -50%) scale(0.42)' }}>
                 <Chart prices={doubleBottomPrices} f={frame} startF={patternStartFrame + 10} stepF={2} />
               </div>
               <div style={{ 
                 marginTop: 'auto', fontSize: 26, fontWeight: 700, color: '#A78BFA', padding: '10px 24px', 
                 backgroundColor: 'rgba(167, 139, 250, 0.15)', borderRadius: 20, border: '1px solid rgba(167, 139, 250, 0.3)',
                 opacity: frame >= patternStartFrame + 20 ? 1 : 0, transition: 'opacity 0.5s'
               }}>
                 HAI ĐÁY
               </div>
            </div>

          {frame >= pattern2StartFrame && (
            <div style={{
              transform: `scale(${p2Scale}) rotateY(-5deg)`,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              border: `2px solid rgba(52, 211, 153, 0.4)`,
              borderRadius: 36,
              padding: 24,
              boxShadow: `0 30px 60px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(52, 211, 153, 0.1)`,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              width: 460, height: 500, position: 'relative'
            }}>
              <Sequence from={pattern2StartFrame + 10}><Audio src={staticFile('pop.mp3')} volume={0.4} /></Sequence>
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 1000, height: 900, transform: 'translate(-50%, -50%) scale(0.42)' }}>
                 <Chart prices={invHSPrices} f={frame} startF={pattern2StartFrame + 10} stepF={2} />
              </div>
              <div style={{ 
                marginTop: 'auto', fontSize: 26, fontWeight: 700, color: '#34D399', padding: '10px 24px', 
                backgroundColor: 'rgba(52, 211, 153, 0.15)', borderRadius: 20, border: '1px solid rgba(52, 211, 153, 0.3)',
                opacity: frame >= pattern2StartFrame + 20 ? 1 : 0, transition: 'opacity 0.5s'
              }}>
                VAI ĐẦU VAI NGƯỢC
              </div>
            </div>
          )}

        </AbsoluteFill>
      )}

      {/* S04: Lò xo nén chặt vẽ bằng code */}
      {frame >= s04Start && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: s04Opacity, perspective: 1200 }}>
          <div style={{ 
            transform: `scale(${s04Scale}) rotateX(5deg)`, 
            position: 'relative',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: `2px solid rgba(167, 139, 250, 0.4)`,
            borderRadius: 36,
            padding: 24,
            boxShadow: `0 40px 80px rgba(0, 0, 0, 0.8), inset 0 0 50px rgba(167, 139, 250, 0.15)`,
            width: 900, height: 600
          }}>
             <Sequence from={s04Start + 10}><Audio src={staticFile('pop.mp3')} volume={0.4} /></Sequence>
             <Sequence from={s04Start + 70}><Audio src={staticFile('pop.mp3')} volume={0.6} /></Sequence>
             <div style={{ position: 'absolute', top: '50%', left: '50%', width: 1000, height: 900, transform: 'translate(-50%, -50%) scale(0.65)' }}>
                <Chart prices={doubleBottomPrices} f={frame} startF={s04Start + 10} stepF={2.5} highlightFrom={13} />
                <svg width={1000} viewBox="0 0 1000 900" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
                  <Level y={485} color={RED} f={frame} delay={s04Start + 40} dash label="Kháng cự" labelColor={RED} />
                  <Marker cx={810} cy={485} f={frame} delay={s04Start + 60} color={GREEN} />
                </svg>
                <Tag x={900} y={350} f={frame} delay={s04Start + 70} text="BẬT TUNG" bg={GREEN} />
             </div>
          </div>
        </AbsoluteFill>
      )}

    </AbsoluteFill>
  );
};
