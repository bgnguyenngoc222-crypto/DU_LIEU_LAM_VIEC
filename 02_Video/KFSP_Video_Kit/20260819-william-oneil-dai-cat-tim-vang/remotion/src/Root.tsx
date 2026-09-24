import React from 'react';
import { Composition } from 'remotion';
import { Main } from './Main';
import { FPS, TOTAL_FRAMES } from './timing';
import { loadFont } from '@remotion/google-fonts/OpenSans';

loadFont();

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Doc"
        component={Main}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Vuong"
        component={Main}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1350}
      />
      <Composition
        id="Ngang"
        component={Main}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
