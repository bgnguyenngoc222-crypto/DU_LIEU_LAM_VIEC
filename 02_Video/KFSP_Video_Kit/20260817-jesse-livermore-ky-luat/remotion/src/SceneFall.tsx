import React from 'react';
import { AbsoluteFill, Img, Video, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { C } from './theme';
import { SCENES } from './timing';

const SHARDS = [
  { clip: 'polygon(45% 55%, 0% 0%, 35% 0%)', tx: -400, ty: -500, r: -70 },
  { clip: 'polygon(45% 55%, 35% 0%, 85% 0%)', tx: 100, ty: -600, r: 40 },
  { clip: 'polygon(45% 55%, 85% 0%, 100% 25%)', tx: 500, ty: -400, r: 90 },
  { clip: 'polygon(45% 55%, 100% 25%, 100% 65%)', tx: 600, ty: 100, r: 120 },
  { clip: 'polygon(45% 55%, 100% 65%, 75% 100%)', tx: 400, ty: 500, r: 150 },
  { clip: 'polygon(45% 55%, 75% 100%, 25% 100%)', tx: 0, ty: 600, r: 45 },
  { clip: 'polygon(45% 55%, 25% 100%, 0% 75%)', tx: -500, ty: 400, r: -45 },
  { clip: 'polygon(45% 55%, 0% 75%, 0% 0%)', tx: -600, ty: -100, r: -120 },
];

export const SceneFall: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p1 = SCENES.s04.dur;
  const p2 = p1 + SCENES.s05.dur;
  const p3 = p2 + SCENES.s06.dur; // start of s06_b
  const p4 = p3 + SCENES.s06_b.dur; // start of s07

  // s04: Bear collapse spring
  const bearSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 20, mass: 2, stiffness: 35 },
  });
  const bearY = interpolate(bearSpring, [0, 1], [0, 80]);
  const bearRotate = interpolate(bearSpring, [0, 1], [0, 30]);
  
  // Texts for s04
  const t1 = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12 } });
  const t2 = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 12 } });
  const t3 = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 12 } });

  // s05: Vô Kỷ Luật & Scale
  const s05Frame = Math.max(0, frame - p1);
  const scaleTilt = spring({
    frame: Math.max(0, s05Frame - 15),
    fps,
    config: { damping: 8, mass: 1, stiffness: 50 },
  });
  const tiltAngle = interpolate(scaleTilt, [0, 1], [0, -30]);
  const crossS05 = spring({ frame: Math.max(0, s05Frame - 60), fps, config: { damping: 12 } });

  // s06: Rules card ripped
  const s06Frame = Math.max(0, frame - p2);
  const ripCross = spring({ frame: Math.max(0, s06Frame - 60), fps, config: { damping: 12 } });
  const giaoDichQuaTay = spring({ frame: Math.max(0, s06Frame - 150), fps, config: { damping: 12 } });
  const lamDungDonBay = spring({ frame: Math.max(0, s06Frame - 210), fps, config: { damping: 12 } });
  const phimHang = spring({ frame: Math.max(0, s06Frame - 270), fps, config: { damping: 12 } });
  
  const coinRoll = interpolate(s06Frame, [120, 240], [-500, 500], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinRot = interpolate(s06Frame, [120, 240], [0, 720]);

  // s07: Coin explode
  const s07Frame = Math.max(0, frame - p4);
  const introSpring = spring({ frame: s07Frame, fps, config: { damping: 14, mass: 1, stiffness: 60 } });
  const coinY = interpolate(introSpring, [0, 1], [800, 0]); // Slide up from bottom
  const explodeSpring = spring({ frame: s07Frame - 45, fps, config: { damping: 20, mass: 3, stiffness: 40 } }); // Much slower explode
  const shatterProgress = interpolate(explodeSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: 'radial-gradient(circle, #0e1624 0%, #050a12 100%)' }}>
      {/* S04: Bear Collapse */}
      {frame < p1 && (
        <AbsoluteFill>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translateY(${bearY}px) rotate(${bearRotate}deg)`,
              transformOrigin: '70% 80%',
            }}
          >
            <Img
              src={staticFile('bear.png')}
              style={{
                width: 1350,
                height: 1050,
                objectFit: 'contain',
                filter: 'brightness(0) invert(1) drop-shadow(0 0 50px rgba(255, 255, 255, 0.4))',
                opacity: 0.5,
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 40,
            }}
          >
            <div style={{ transform: `scale(${t1})`, opacity: t1, fontSize: 100, fontWeight: 900, color: C.red, textShadow: `0 0 40px ${C.red}` }}>TRẮNG TAY</div>
            <div style={{ transform: `scale(${t2})`, opacity: t2, fontSize: 100, fontWeight: 900, color: C.red, textShadow: `0 0 40px ${C.red}` }}>PHÁ SẢN</div>
            <div style={{ transform: `scale(${t3})`, opacity: t3, fontSize: 100, fontWeight: 900, color: C.red, textShadow: `0 0 40px ${C.red}` }}>TỰ KẾT LIỄU</div>
          </div>
        </AbsoluteFill>
      )}

      {/* S05: Vô Kỷ Luật Scale */}
      {frame >= p1 && frame < p2 && (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Scale UI */}
          <div style={{ position: 'relative', width: 400, height: 400, transform: 'scale(1.2)' }}>
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 80, height: 200, backgroundColor: '#334155', borderRadius: '40px 40px 0 0' }} />
            <div
              style={{
                position: 'absolute', top: 180, left: '50%', width: 300, height: 10, backgroundColor: '#cbd5e1',
                transform: `translateX(-50%) rotate(${tiltAngle}deg)`, transformOrigin: 'center center',
              }}
            >
              <div style={{ position: 'absolute', left: 0, top: 10, transform: `translateX(-50%) rotate(${-tiltAngle}deg)` }}>
                <div style={{ position: 'absolute', bottom: -60, left: -25, width: 60, height: 40, backgroundColor: C.red, borderRadius: 8, boxShadow: `0 0 20px ${C.red}` }} />
                <div style={{ marginTop: 80, fontSize: 32, fontWeight: 'bold', color: C.red, textShadow: `0 0 10px ${C.red}` }}>CẢM XÚC</div>
              </div>
              <div style={{ position: 'absolute', right: 0, top: 10, transform: `translateX(50%) rotate(${-tiltAngle}deg)` }}>
                <div style={{ position: 'absolute', bottom: -40, right: -10, width: 30, height: 20, backgroundColor: C.gold, borderRadius: 4 }} />
                <div style={{ marginTop: 80, fontSize: 32, fontWeight: 'bold', color: C.gold }}>KỶ LUẬT</div>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '15%', fontSize: 120, fontWeight: 900, color: '#fff', letterSpacing: 4 }}>VÔ KỶ LUẬT</div>
          {crossS05 > 0 && (
            <div style={{ position: 'absolute', top: '17%', width: 800, height: 20, backgroundColor: C.red, transform: `scaleX(${crossS05}) rotate(-5deg)`, boxShadow: `0 0 30px ${C.red}` }} />
          )}
        </AbsoluteFill>
      )}

      {/* S06: Xé Quy Tắc */}
      {frame >= p2 && frame < p3 && (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              width: 800, height: 'auto',
              background: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.1)', borderRadius: 24,
              boxShadow: '0 35px 70px rgba(0,0,0,0.9), inset 0 0 40px rgba(255,255,255,0.05)',
              padding: '60px 50px',
              display: 'flex', flexDirection: 'column', position: 'relative',
            }}
          >
            <div style={{ fontSize: 54, fontWeight: 800, color: C.gold, textAlign: 'center', marginBottom: 40 }}>QUY TẮC GIAO DỊCH</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontSize: 40, color: '#94a3b8' }}>
              <div>✔ 1. Cắt lỗ dứt khoát tại 7%</div>
              <div>✔ 2. Tuyệt đối không gồng lỗ</div>
              <div>✔ 3. Không mua đuổi cổ phiếu</div>
              <div>✔ 4. Nói KHÔNG với đòn bẩy quá mức</div>
            </div>
            {ripCross > 0 && (
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <line x1="60" y1="60" x2={60 + 680 * ripCross} y2={60 + 400 * ripCross} stroke={C.red} strokeWidth="24" style={{ filter: `drop-shadow(0 0 25px ${C.red})` }} />
                {ripCross > 0.5 && (
                  <line x1="740" y1="60" x2={740 - 680 * ((ripCross - 0.5) * 2)} y2={60 + 400 * ((ripCross - 0.5) * 2)} stroke={C.red} strokeWidth="24" style={{ filter: `drop-shadow(0 0 25px ${C.red})` }} />
                )}
              </svg>
            )}
          </div>

          {/* Texts for mistakes */}
          {giaoDichQuaTay > 0 && (
            <div style={{ position: 'absolute', top: 200, left: 100, transform: `scale(${giaoDichQuaTay}) rotate(-10deg)`, fontSize: 48, fontWeight: 900, color: C.red, textShadow: '0 10px 20px rgba(0,0,0,0.8)', background: 'rgba(0,0,0,0.5)', padding: '20px 40px', borderRadius: 20, border: `4px solid ${C.red}` }}>
              GIAO DỊCH QUÁ TAY
            </div>
          )}
          {lamDungDonBay > 0 && (
            <div style={{ position: 'absolute', top: 400, right: 100, transform: `scale(${lamDungDonBay}) rotate(15deg)`, fontSize: 48, fontWeight: 900, color: C.red, textShadow: '0 10px 20px rgba(0,0,0,0.8)', background: 'rgba(0,0,0,0.5)', padding: '20px 40px', borderRadius: 20, border: `4px solid ${C.red}` }}>
              LẠM DỤNG ĐÒN BẨY
            </div>
          )}
          {phimHang > 0 && (
            <div style={{ position: 'absolute', bottom: 350, left: 150, transform: `scale(${phimHang}) rotate(-5deg)`, fontSize: 48, fontWeight: 900, color: C.red, textShadow: '0 10px 20px rgba(0,0,0,0.8)', background: 'rgba(0,0,0,0.5)', padding: '20px 40px', borderRadius: 20, border: `4px solid ${C.red}` }}>
              NGHE PHÍM HÀNG
            </div>
          )}
          {/* Coin rolling */}
          {s06Frame > 120 && (
            <div
              style={{
                position: 'absolute', bottom: 150, left: '50%',
                width: 120, height: 120, borderRadius: '50%', backgroundColor: '#f1c40f',
                border: '10px solid #f39c12',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                fontSize: 60, fontWeight: 'bold', color: '#fff',
                transform: `translateX(calc(-50% + ${coinRoll}px)) rotate(${coinRot}deg)`,
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)', zIndex: 10,
              }}
            >
              $
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* S06_B: 1915 Bankruptcy Video */}
      <Sequence from={p3} durationInFrames={p4 - p3}>
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Video src={staticFile('S06_b.mp4')} playbackRate={0.473} volume={0.1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </AbsoluteFill>
      </Sequence>

      {/* S07: Coin Explode */}
      {frame >= p4 && (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 200, height: 200, transform: `translateY(${coinY}px)` }}>
            {/* Base Coin (visible before shatter) */}
            {shatterProgress === 0 && (
              <div
                style={{
                  position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: '#f1c40f',
                  border: '15px solid #f39c12', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  fontSize: 100, fontWeight: 'bold', color: '#fff',
                }}
              >
                $
              </div>
            )}
            
            {/* Shattered Glass Fragments */}
            {shatterProgress > 0 && SHARDS.map((shard, i) => {
              const explodeX = shard.tx * shatterProgress;
              const explodeY = shard.ty * shatterProgress + (shatterProgress * shatterProgress * 800); // Add gravity curve
              const rot = shard.r * shatterProgress;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: '#f1c40f',
                    border: '15px solid #f39c12', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    fontSize: 100, fontWeight: 'bold', color: '#fff',
                    clipPath: shard.clip,
                    transform: `translate(${explodeX}px, ${explodeY}px) rotate(${rot}deg)`,
                    opacity: 1 - shatterProgress * 0.7, // Fade out gradually as they fall
                  }}
                >
                  $
                </div>
              );
            })}
          </div>
          <div style={{ position: 'absolute', bottom: 300, fontSize: 80, fontWeight: 900, color: C.red, opacity: shatterProgress, textShadow: `0 0 40px ${C.red}` }}>
            KHÔNG SÓT MỘT ĐỒNG
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
