import React from 'react';
import { AbsoluteFill, Video, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SCENES } from './timing';

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s01Dur = SCENES.s01.dur;
  const s02Dur = SCENES.s02.dur;

  // --- S01: Storm Money ---
  // Scale-in ease-in
  const stormScale = interpolate(frame, [0, s01Dur], [1, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const stormOpacity = interpolate(frame, [s01Dur - 15, s01Dur], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- S02: Livermore Portrait ---
  // Zoom chậm ease-out
  // Frame relative to s02 start
  const s02Frame = Math.max(0, frame - s01Dur);
  const livermoreScale = interpolate(s02Frame, [0, s02Dur], [1.2, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const livermoreOpacity = interpolate(s02Frame, [0, 15, s02Dur - 15, s02Dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* S01: Storm Money */}
      {frame < s01Dur && (
        <AbsoluteFill style={{ opacity: stormOpacity }}>
          <Video
            src={staticFile('s01_money_storm.mp4')}
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${stormScale})`,
            }}
          />
        </AbsoluteFill>
      )}

      {/* S02: Livermore Portrait */}
      {frame >= s01Dur - 15 && (
        <AbsoluteFill style={{ opacity: livermoreOpacity }}>
          <Video
            src={staticFile('s02_livermore_shadow.mp4')}
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${livermoreScale})`,
            }}
          />
          {/* Black gradient overlay for "mystery" feel */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
            }}
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

