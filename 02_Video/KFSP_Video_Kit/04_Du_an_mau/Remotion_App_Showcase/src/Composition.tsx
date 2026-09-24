import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene1_StoreIntro } from "./scenes/Scene1_StoreIntro";
import { Scene2_AIAssistant } from "./scenes/Scene2_AIAssistant";
import { Scene3_LandscapeChart } from "./scenes/Scene3_LandscapeChart";
import { Scene4_CTA } from "./scenes/Scene4_CTA";
import { BrandOverlay, BrandLogo } from "../../../03_Engine/_shared/remotion/BrandFrame";

export const MainComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene Durations (in frames @ 30fps)
  // Scene 1: 0 - 90 (3s)
  // Scene 2: 90 - 180 (3s)
  // Scene 3: 180 - 270 (3s)
  // Scene 4: 270 - 360 (3s)

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1628" }}>
      {/* Scene 1: Intro / Store overview */}
      <Sequence from={0} durationInFrames={90}>
        <Scene1_StoreIntro frame={frame} fps={fps} />
      </Sequence>

      {/* Scene 2: Dashboard & AI Assistant features */}
      <Sequence from={90} durationInFrames={90}>
        <Scene2_AIAssistant frame={frame - 90} fps={fps} />
      </Sequence>

      {/* Scene 3: Landscape 90-degree rotate technical chart */}
      <Sequence from={180} durationInFrames={90}>
        <Scene3_LandscapeChart frame={frame - 180} fps={fps} />
      </Sequence>

      {/* Scene 4: CTA & Brand Spine */}
      <Sequence from={270} durationInFrames={90}>
        <Scene4_CTA frame={frame - 270} fps={fps} />
      </Sequence>

      {/* Shared KFSP Brand Overlay */}
      <BrandOverlay />
      <BrandLogo />
    </AbsoluteFill>
  );
};
