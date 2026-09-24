import { Composition } from "remotion";
import { DiemTin } from "./DiemTin";
import { LAYOUT } from "./design";
import sampleData from "../data/2026-04-10.json";

const FPS = LAYOUT.fps;

export const RemotionRoot: React.FC = () => {
  const data = sampleData as any;

  // Calculate total duration from scenes
  const totalFrames = data.scenes.reduce(
    (sum: number, scene: any) => sum + scene.durationInSeconds * FPS,
    0
  );

  return (
    <Composition
      id="DiemTin"
      component={DiemTin}
      durationInFrames={totalFrames}
      fps={FPS}
      width={LAYOUT.width}
      height={LAYOUT.height}
      defaultProps={{ data }}
    />
  );
};
