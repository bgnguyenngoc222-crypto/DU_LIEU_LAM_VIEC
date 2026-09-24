import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Video, Sequence, staticFile } from 'remotion';
import { AppleStyleCard } from './AppleStyleCard';
import { SCENES } from './timing';
import { C, FONTS } from './theme';

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s01Dur = SCENES.s01.dur;
  const s02Start = SCENES.s02.from;

  // S01 Animations
  const chartProgress = interpolate(frame, [0, 40], [0, 100], { extrapolateRight: 'clamp' });
  const breakoutSpring = spring({ frame: frame - 45, fps, config: { damping: 12, stiffness: 80 } });
  
  const textDrop = spring({ frame: frame - 60, fps, config: { damping: 10, mass: 2 } });
  const textShake = frame > 60 && frame < 90 ? Math.sin(frame) * 10 : 0;
  const s01Opacity = interpolate(frame, [s01Dur - 15, s01Dur], [1, 0], { extrapolateRight: 'clamp' });

  // S02 Animations (Book & Particles)
  const s02Frame = frame - s02Start;
  const bookOpenProgress = spring({ frame: s02Frame, fps, config: { damping: 15 } });
  const leftPageRotate = interpolate(bookOpenProgress, [0, 1], [0, -160]);
  const rightPageRotate = interpolate(bookOpenProgress, [0, 1], [0, 160]);
  const bookOpacity = interpolate(s02Frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bgNavy }}>
      
      {/* S01: Cảnh Tiếc Nuối (Dùng AI Video) */}
      <Sequence from={0} durationInFrames={s01Dur}>
        <AbsoluteFill style={{ opacity: s01Opacity }}>
          <Video 
            src={staticFile('ai_scene_hook.mp4.mp4')} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            muted 
          />
        </AbsoluteFill>
      </Sequence>

      {/* S02: Lời Truyền Lại (Typography Minimalist) */}
      {frame >= s02Start && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: bookOpacity }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            width: '95%',
            textAlign: 'center',
            fontFamily: FONTS.main
          }}>
            <h1 style={{
              fontSize: 60,
              fontWeight: 800,
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '-1px',
              whiteSpace: 'nowrap',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              Sự thật là, siêu cổ phiếu không
            </h1>
            <h1 style={{
              fontSize: 60,
              fontWeight: 800,
              color: '#A78BFA', // Màu tím pastel
              margin: 0,
              letterSpacing: '-1px',
              whiteSpace: 'nowrap',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              bùng nổ một cách ngẫu nhiên
            </h1>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
