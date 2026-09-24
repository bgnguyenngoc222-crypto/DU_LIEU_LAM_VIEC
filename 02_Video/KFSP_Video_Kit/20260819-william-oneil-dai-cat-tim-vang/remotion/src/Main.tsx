import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, Video, spring, useVideoConfig, Img, interpolate } from 'remotion';
import { Bg } from './Bg';
import { BrandFrame } from './BrandFrame';
import { SCENES } from './timing';
import { FONTS } from './theme';
import { IPhone16Pro } from './IPhone16Pro';
import { SceneHook } from './SceneHook';
import { SceneHistory } from './SceneHistory';
import { SceneProblem } from './SceneProblem';
import { SceneCTA } from './SceneCTA';

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation values for iPhone Mockup
  const phoneEntrance = spring({ frame: frame - SCENES.s07.from, fps, config: { damping: 12 } });
  const zoomStartFrame = 900; // 00:30
  const phoneZoom = spring({ frame: frame - zoomStartFrame, fps, config: { damping: 16 } });
  
  // Phone starts at scale 1.2, then zooms to 2.4 to fill the screen
  const currentPhoneScale = phoneEntrance * interpolate(phoneZoom, [0, 1], [1.2, 2.4]);
  // Move phone down so the bottom part is cut off, but less than before
  const phoneTranslateY = interpolate(phoneZoom, [0, 1], [0, 450]);

  // Tốc độ playback cho màn hình app (Cơ hội tiềm năng)
  const cohoiDurationInFrames = SCENES.s07.dur + SCENES.s08.dur + SCENES.s09.dur;
  const cohoiPlaybackRate = (38.28 * fps) / cohoiDurationInFrames;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1628', fontFamily: FONTS.main }}>
      {/* Voiceover */}
      <Sequence from={0}>
        <Audio src={staticFile('voice_full.mp3')} />
      </Sequence>

      {/* Dynamic Background */}
      <Bg />

      {/* 1. HOOK & VALUE (s01 -> s02) */}
      <Sequence from={0} durationInFrames={SCENES.s01.dur + SCENES.s02.dur}>
         <SceneHook />
      </Sequence>

      {/* 2. HISTORY & PATTERNS (s03 -> s04) */}
      <Sequence from={SCENES.s03.from} durationInFrames={SCENES.s03.dur + SCENES.s04.dur}>
         <SceneHistory />
      </Sequence>

      {/* 3. PROBLEM (s05 -> s06) */}
      <Sequence from={SCENES.s05.from} durationInFrames={SCENES.s05.dur + SCENES.s06.dur}>
         <SceneProblem />
      </Sequence>

      {/* 4. SOLUTION - KFSP APP (s07 -> s09): Mockup iPhone 16 Pro */}
      <Sequence from={SCENES.s07.from} durationInFrames={cohoiDurationInFrames}>
         <Audio src={staticFile('whoosh.mp3')} volume={0.6} />
         <Sequence from={zoomStartFrame - SCENES.s07.from}>
            <Audio src={staticFile('whoosh.mp3')} volume={0.8} />
         </Sequence>
         <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', transform: `translateY(${phoneTranslateY}px) scale(${currentPhoneScale})` }}>
            <IPhone16Pro>
               <Video 
                  src={staticFile('rec_cohoitiemnang.mp4')} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  playbackRate={cohoiPlaybackRate}
                  volume={0}
               />
            </IPhone16Pro>
         </AbsoluteFill>
      </Sequence>

      {/* 5. CTA (s10, s11) */}
      <Sequence from={SCENES.s10.from} durationInFrames={SCENES.s10.dur + SCENES.s11.dur}>
         <Sequence from={SCENES.s11.from - SCENES.s10.from}>
            <Audio src={staticFile('whoosh.mp3')} volume={0.6} />
         </Sequence>
         <SceneCTA />
      </Sequence>

      {/* Persistent Brand Overlays (Gradient Tím + Logo) */}
      <BrandFrame />

    </AbsoluteFill>
  );
};
