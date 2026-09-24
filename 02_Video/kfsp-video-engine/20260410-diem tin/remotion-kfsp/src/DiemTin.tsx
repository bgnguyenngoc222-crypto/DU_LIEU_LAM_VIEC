import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import React from "react";
import { DiemTinData } from "./types";
import { LAYOUT } from "./design";

import { Background } from "./components/ui/BackgroundBlur";
import { SubtitleBar } from "./components/ui/SubtitleBar";
import { ProgressBar } from "./components/ui/ProgressBar";
import { Watermark } from "./components/ui/Watermark";
import { BGM } from "./components/audio/BGM";
import { Scene } from "./scenes/Scene";

const FPS = LAYOUT.fps;

export const DiemTin: React.FC<{ data: DiemTinData }> = ({ data }) => {
  return (
    <AbsoluteFill style={{
      width: LAYOUT.width,
      height: LAYOUT.height,
      fontFamily: "'Inter', 'SF Pro Display', 'Segoe UI', sans-serif",
    }}>
      {/* Layer 1: Background */}
      <Background />

      {/* Layer 2: Scenes */}
      <AbsoluteFill>
        <Series>
          {data.scenes.map((scene) => (
            <Series.Sequence key={scene.id} durationInFrames={scene.durationInSeconds * FPS}>
              <Scene config={scene} />
            </Series.Sequence>
          ))}
        </Series>
      </AbsoluteFill>

      {/* Layer 3: Subtitle */}
      <AbsoluteFill>
        <SubtitleBar subtitles={data.subtitles} />
      </AbsoluteFill>

      {/* Layer 4: Watermark */}
      <AbsoluteFill>
        <Watermark />
      </AbsoluteFill>

      {/* Layer 5: Progress bar */}
      <AbsoluteFill>
        <ProgressBar />
      </AbsoluteFill>

      {/* Layer 6: Voiceover */}
      {data.voiceover && <Audio src={staticFile(data.voiceover)} volume={1} />}

      {/* Layer 7: BGM */}
      {data.bgm && <BGM src={data.bgm} volume={0.08} fadeInDuration={60} fadeOutDuration={90} />}
    </AbsoluteFill>
  );
};
