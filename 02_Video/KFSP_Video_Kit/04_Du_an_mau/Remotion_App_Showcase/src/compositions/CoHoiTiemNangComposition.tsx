import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene1_TeasingIntro } from "../scenes/co-hoi-tiem-nang/Scene1_TeasingIntro";
import { Scene2_FeatureShowcase } from "../scenes/co-hoi-tiem-nang/Scene2_FeatureShowcase";
import { Scene3_ChartDetail } from "../scenes/co-hoi-tiem-nang/Scene3_ChartDetail";
import { Scene4_BrandCTA } from "../scenes/co-hoi-tiem-nang/Scene4_BrandCTA";
import { BrandOverlay, BrandLogo } from "../../../../03_Engine/_shared/remotion/BrandFrame";

export const CoHoiTiemNangComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline (360 frames @ 30fps = 12 seconds)
  // Scene 1: 0 - 90 (3s) Teasing Intro
  // Scene 2: 90 - 180 (3s) Pro AI Mua/Ban & Hai Day Lists
  // Scene 3: 180 - 270 (3s) Chart & Pattern Detail
  // Scene 4: 270 - 360 (3s) Brand Spine & CTA

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1628" }}>
      {/* Scene 1 */}
      <Sequence from={0} durationInFrames={90}>
        <Scene1_TeasingIntro frame={frame} fps={fps} />
      </Sequence>

      {/* Scene 2 */}
      <Sequence from={90} durationInFrames={90}>
        <Scene2_FeatureShowcase frame={frame - 90} fps={fps} />
      </Sequence>

      {/* Scene 3 */}
      <Sequence from={180} durationInFrames={90}>
        <Scene3_ChartDetail frame={frame - 180} fps={fps} />
      </Sequence>

      {/* Scene 4 */}
      <Sequence from={270} durationInFrames={90}>
        <Scene4_BrandCTA frame={frame - 270} fps={fps} />
      </Sequence>

      {/* Shared KFSP Brand Layer */}
      <BrandOverlay />
      <BrandLogo />
    </AbsoluteFill>
  );
};
