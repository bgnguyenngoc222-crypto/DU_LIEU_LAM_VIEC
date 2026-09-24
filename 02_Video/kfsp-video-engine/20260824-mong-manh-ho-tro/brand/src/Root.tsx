import { Composition } from "remotion";
import { Main } from "./Main";
import data from "./data.json";

const fps = 30;
const durationInFrames = Math.ceil(data.total_s * fps) + 6;

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Main"
    component={Main}
    durationInFrames={durationInFrames}
    fps={fps}
    width={1080}
    height={1920}
  />
);
