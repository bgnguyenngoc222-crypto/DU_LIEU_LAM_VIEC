import "./style.css";
import { Composition } from "remotion";
import { TamSoat } from "./TamSoat";
import { VIDEO_CONFIG } from "./types";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TamSoat"
      component={TamSoat}
      durationInFrames={VIDEO_CONFIG.durationInFrames}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
    />
  );
};
