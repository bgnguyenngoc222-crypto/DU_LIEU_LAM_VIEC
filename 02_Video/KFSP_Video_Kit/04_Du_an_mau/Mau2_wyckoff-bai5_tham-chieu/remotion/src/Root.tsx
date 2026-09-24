import { Composition } from "remotion";
import { Main } from "./Main";
import { TOTAL_F } from "./timing";

// 🔴 Chỉ một Composition: bản BRAND (CLAUDE.md rev28 — kênh nobrand đã dừng hẳn).
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Main" component={Main} durationInFrames={TOTAL_F} fps={30} width={1080} height={1920} />
  </>
);
