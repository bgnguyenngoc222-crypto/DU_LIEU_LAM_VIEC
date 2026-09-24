import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { SCENES, VIDEO } from "./design";
import { Scene0_Intro } from "./scenes/Scene0_Intro";
import { Scene1_RRGZones } from "./scenes/Scene1_RRGZones";
import { Scene2_Nganh } from "./scenes/Scene2_Nganh";
import { Scene3_BangDuLieu } from "./scenes/Scene3_BangDuLieu";
import { Scene4_Watchlist } from "./scenes/Scene4_Watchlist";
import { Scene5_CTA } from "./scenes/Scene5_CTA";

export const VideoRRG: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        width: VIDEO.width,
        height: VIDEO.height,
        background: "#050912",
        overflow: "hidden",
      }}
    >
      <Series>
        <Series.Sequence durationInFrames={SCENES.scene0.duration}>
          <Scene0_Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.scene1.duration}>
          <Scene1_RRGZones />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.scene2.duration}>
          <Scene2_Nganh />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.scene3.duration}>
          <Scene3_BangDuLieu />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.scene4.duration}>
          <Scene4_Watchlist />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.scene5.duration}>
          <Scene5_CTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
