import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Bg } from './Bg';
import { BrandFrame } from './BrandFrame';
import { Subtitle } from './Subtitle';
import { SceneHook } from './SceneHook';
import { SceneHistory } from './SceneHistory';
import { SceneFall } from './SceneFall';
import { SceneAgitate } from './SceneAgitate';
import { SceneAnchor } from './SceneAnchor';
import { SceneAppFeatures } from './SceneAppFeatures';
import { SceneCTA } from './SceneCTA';
import { SCENES } from './timing';
import { FONTS } from './theme';

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  // Find active sentence for Subtitle
  let currentId = '';
  let currentText = '';
  let currentDur = 30;
  let currentRelFrame = 0;

  for (const key of Object.keys(SCENES) as (keyof typeof SCENES)[]) {
    const sc = SCENES[key];
    if (frame >= sc.from && frame < sc.from + sc.dur) {
      currentId = key;
      currentText = sc.text;
      currentDur = sc.dur;
      currentRelFrame = frame - sc.from;
      break;
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1628', fontFamily: FONTS.main }}>
      {/* Full Audio Voiceover Sequence */}
      <Sequence from={0} durationInFrames={SCENES.s06_b.from}>
        <Audio src={staticFile('voice_full.mp3')} />
      </Sequence>
      <Sequence from={SCENES.s06_b.from} durationInFrames={SCENES.s06_b.dur}>
        <Audio src={staticFile('S06_b.mp3')} />
      </Sequence>
      <Sequence from={SCENES.s07.from}>
        <Audio src={staticFile('voice_full.mp3')} startFrom={SCENES.s06_b.from} />
      </Sequence>

      {/* Dynamic Background Grid & Atmosphere */}
      <Bg />

      {/* 1. HOOK (s01 + s02) */}
      <Sequence from={SCENES.s01.from} durationInFrames={SCENES.s01.dur + SCENES.s02.dur}>
        <SceneHook />
      </Sequence>

      {/* 2. HISTORY (s03) */}
      <Sequence from={SCENES.s03.from} durationInFrames={SCENES.s03.dur}>
        <SceneHistory />
      </Sequence>

      {/* 3. FALL & CRACK (s04 + s05 + s06 + s06_b + s07) */}
      <Sequence from={SCENES.s04.from} durationInFrames={SCENES.s04.dur + SCENES.s05.dur + SCENES.s06.dur + SCENES.s06_b.dur + SCENES.s07.dur}>
        <SceneFall />
      </Sequence>

      {/* 4. AGITATE & ANCHOR (s08 + s09 + s10) */}
      <Sequence from={SCENES.s08.from} durationInFrames={SCENES.s08.dur + SCENES.s09.dur + SCENES.s10.dur}>
        <SceneAgitate />
      </Sequence>

      {/* 5. APP FEATURES (s11 + s12 + s13) */}
      <Sequence from={SCENES.s11.from} durationInFrames={SCENES.s11.dur + SCENES.s12.dur + SCENES.s13.dur}>
        <SceneAppFeatures />
      </Sequence>

      {/* 6. CTA & BRAND SPINE (s14) */}
      <Sequence from={SCENES.s14.from} durationInFrames={SCENES.s14.dur}>
        <SceneCTA />
      </Sequence>

      {/* Persistent Brand Overlays (Gradient Tím + Logo) */}
      <BrandFrame />

      {/* Subtitles (Karaoke) */}
      {currentId && (
        <Subtitle
          sentenceId={currentId}
          text={currentText}
          durationInFrames={currentDur}
          relFrame={currentRelFrame}
        />
      )}
    </AbsoluteFill>
  );
};
