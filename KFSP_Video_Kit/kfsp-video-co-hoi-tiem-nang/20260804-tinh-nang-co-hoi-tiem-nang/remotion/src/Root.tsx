import { Composition } from "remotion";
import { Main } from "./Main";
import { Phone3D } from "./Phone3D";
import { FPS, TOTAL_F } from "./timing";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Doc"   component={Main} durationInFrames={TOTAL_F} fps={FPS} width={1080} height={1920} />
    <Composition id="Vuong" component={Main} durationInFrames={TOTAL_F} fps={FPS} width={1080} height={1350} />
    <Composition id="Ngang" component={Main} durationInFrames={TOTAL_F} fps={FPS} width={1920} height={1080} />
    {/* Bản thử khung máy 3D — xoay thấy mặt sau, có bề dày thật */}
    <Composition id="Thu3D" component={Phone3D} durationInFrames={150} fps={FPS} width={1080} height={1920} />
  </>
);
