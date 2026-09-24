import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Sequence } from 'remotion';
import { SCENES } from './timing';
import { C, FONTS } from './theme';

export const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s05Dur = SCENES.s05.dur;

  // ANIMATIONS
  const p2Opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const glassX = interpolate(Math.sin(frame / 15), [-1, 1], [150, 650]);
  const glassY = interpolate(Math.cos(frame / 10), [-1, 1], [250, 650]);

  // Stamp "RẤT KHÓ"
  const stampStart = 80;
  const stampFrame = frame - stampStart;
  const stampScale = spring({ frame: stampFrame, fps, config: { damping: 10, mass: 1, stiffness: 200 } });
  const stampOpacity = interpolate(stampFrame, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  // Rung lắc màn hình khi đóng dấu
  const screenShake = stampFrame > 0 && stampFrame < 15 ? Math.sin(stampFrame * 2) * 20 * (1 - stampFrame/15) : 0;
  
  const stocks = [
    "VND -5.4%", "SSI -2.1%", "HPG +4.2%", "VIC -1.5%", "VHM -2.3%", 
    "FPT +1.8%", "MWG -3.4%", "VPB -0.9%", "TCB +1.1%", "MBB +0.4%",
    "NVL -6.9%", "DIG -5.0%", "PVD +3.2%", "HSG -2.8%", "STB -1.5%"
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#050a14', justifyContent: 'center' }}>
      
      <AbsoluteFill style={{ opacity: p2Opacity, transform: `translateY(${screenShake}px)` }}>
        
        {/* Ticker Rain Background (Xanh Đỏ lộn xộn) */}
        <AbsoluteFill style={{ opacity: 0.3 }}>
          {Array.from({ length: 20 }).map((_, col) => {
             const delay = (col * 17) % 30; // Randomize start delay
             const speed = 10 + (col % 5) * 3; // Randomize speed
             // Có cột chạy xuống, có cột chạy lên
             const direction = col % 2 === 0 ? 1 : -1;
             const yPos = ((frame - delay) * speed * direction) % 2500;
             const finalY = direction === 1 ? yPos - 500 : 2000 + yPos;
             
             return (
               <div key={col} style={{
                  position: 'absolute', left: `${(col / 20) * 100}%`, top: finalY, width: 80,
                  display: 'flex', flexDirection: 'column', gap: 40,
                  fontSize: 35, fontWeight: 800, fontFamily: 'monospace',
               }}>
                  {stocks.map((s, i) => {
                     const isGreen = s.includes('+');
                     return (
                        <div key={i} style={{ 
                           color: isGreen ? C.green : C.red,
                           textShadow: `0 0 20px ${isGreen ? C.green : C.red}` 
                        }}>
                           {s.split(' ')[0]}
                        </div>
                     )
                  })}
               </div>
             );
          })}
        </AbsoluteFill>

        {/* Magnifying Glass with Hand */}
        <div style={{
          position: 'absolute',
          left: glassX, top: glassY,
          width: 300, height: 300,
          border: `15px solid rgba(255, 255, 255, 0.4)`,
          borderRadius: '50%',
          boxShadow: '0 0 50px rgba(255,255,255,0.2), inset 0 0 50px rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px) brightness(1.5)',
          zIndex: 2
        }}>
           {/* Handle */}
           <div style={{
              position: 'absolute', bottom: -120, right: -60,
              width: 40, height: 150, background: '#444',
              transform: 'rotate(-45deg)', borderRadius: 20
           }} />
           {/* Bàn tay (Dùng icon/SVG đơn giản) */}
           <div style={{
              position: 'absolute', bottom: -150, right: -120,
              fontSize: 150, transform: 'rotate(-45deg)'
           }}>
              🖐️
           </div>
        </div>

        {/* Stamp "RẤT KHÓ" Đóng sập xuống */}
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
           <div style={{
              transform: `scale(${stampScale}) rotate(-10deg)`,
              opacity: stampOpacity,
              fontSize: 160,
              fontWeight: 900,
              color: C.red,
              fontFamily: FONTS.main,
              border: `15px solid ${C.red}`,
              padding: '20px 60px',
              borderRadius: 30,
              textShadow: `0 0 40px rgba(255,0,0,0.5)`,
              boxShadow: `0 0 80px rgba(255,0,0,0.5), inset 0 0 40px rgba(255,0,0,0.5)`,
              zIndex: 4,
              letterSpacing: 10
           }}>
             RẤT KHÓ
           </div>
        </AbsoluteFill>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
