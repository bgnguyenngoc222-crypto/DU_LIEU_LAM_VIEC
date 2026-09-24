import React from "react";
import "./style.css";
import { Composition } from "remotion";
import { SCENES, TOTAL_FRAMES, VIDEO } from "./design";
import { VideoRRG } from "./VideoRRG";
import { Scene0_Intro } from "./scenes/Scene0_Intro";
import { Scene1_RRGZones } from "./scenes/Scene1_RRGZones";
import { Scene2_Nganh } from "./scenes/Scene2_Nganh";
import { Scene3_BangDuLieu } from "./scenes/Scene3_BangDuLieu";
import { Scene4_Watchlist } from "./scenes/Scene4_Watchlist";
import { Scene5_CTA } from "./scenes/Scene5_CTA";

const COMMON = {
  fps: VIDEO.fps,
  width: VIDEO.width,
  height: VIDEO.height,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full stitched composition — render via npm run render:all */}
      <Composition
        id="VideoRRG"
        component={VideoRRG}
        durationInFrames={TOTAL_FRAMES}
        {...COMMON}
      />

      {/* Per-scene compositions — render individually for gate-based review */}
      <Composition
        id="Scene0"
        component={Scene0_Intro}
        durationInFrames={SCENES.scene0.duration}
        {...COMMON}
      />
      <Composition
        id="Scene1"
        component={Scene1_RRGZones}
        durationInFrames={SCENES.scene1.duration}
        {...COMMON}
      />
      <Composition
        id="Scene2"
        component={Scene2_Nganh}
        durationInFrames={SCENES.scene2.duration}
        {...COMMON}
      />
      <Composition
        id="Scene3"
        component={Scene3_BangDuLieu}
        durationInFrames={SCENES.scene3.duration}
        {...COMMON}
      />
      <Composition
        id="Scene4"
        component={Scene4_Watchlist}
        durationInFrames={SCENES.scene4.duration}
        {...COMMON}
      />
      <Composition
        id="Scene5"
        component={Scene5_CTA}
        durationInFrames={SCENES.scene5.duration}
        {...COMMON}
      />
    </>
  );
};
