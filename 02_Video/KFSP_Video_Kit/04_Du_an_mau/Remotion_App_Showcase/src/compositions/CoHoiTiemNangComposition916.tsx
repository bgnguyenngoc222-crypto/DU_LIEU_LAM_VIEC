import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene1_VerticalTeasing } from "../scenes/co-hoi-tiem-nang-916/Scene1_VerticalTeasing";
import { Scene2_VerticalFeatures } from "../scenes/co-hoi-tiem-nang-916/Scene2_VerticalFeatures";
import { Scene3_VerticalChart } from "../scenes/co-hoi-tiem-nang-916/Scene3_VerticalChart";
import { Scene4_VerticalBrandCTA } from "../scenes/co-hoi-tiem-nang-916/Scene4_VerticalBrandCTA";

export const CoHoiTiemNangComposition916: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1628" }}>
      {/* Scene 1 (0 - 90 / 3s) */}
      <Sequence from={0} durationInFrames={90}>
        <Scene1_VerticalTeasing frame={frame} fps={fps} />
      </Sequence>

      {/* Scene 2 (90 - 180 / 3s) */}
      <Sequence from={90} durationInFrames={90}>
        <Scene2_VerticalFeatures frame={frame - 90} fps={fps} />
      </Sequence>

      {/* Scene 3 (180 - 270 / 3s) */}
      <Sequence from={180} durationInFrames={90}>
        <Scene3_VerticalChart frame={frame - 180} fps={fps} />
      </Sequence>

      {/* Scene 4 (270 - 360 / 3s) */}
      <Sequence from={270} durationInFrames={90}>
        <Scene4_VerticalBrandCTA frame={frame - 270} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};
