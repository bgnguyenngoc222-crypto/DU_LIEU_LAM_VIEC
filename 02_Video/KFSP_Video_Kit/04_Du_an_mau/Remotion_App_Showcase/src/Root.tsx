import React from "react";
import { Composition } from "remotion";
import { MainComposition } from "./Composition";
import { CoHoiTiemNangComposition } from "./compositions/CoHoiTiemNangComposition";
import { CoHoiTiemNangComposition916 } from "./compositions/CoHoiTiemNangComposition916";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Composition 1: Overview App Showcase (16:9 Landscape) */}
      <Composition
        id="KFSP-App-Showcase-16-9"
        component={MainComposition}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* Composition 2: Feature Launch - Co Hoi Tiem Nang (16:9 Landscape) */}
      <Composition
        id="KFSP-CoHoiTiemNang-16-9"
        component={CoHoiTiemNangComposition}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* Composition 3: Feature Launch - Co Hoi Tiem Nang (9:16 Vertical / Shorts / TikTok) */}
      <Composition
        id="KFSP-CoHoiTiemNang-9-16"
        component={CoHoiTiemNangComposition916}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};
