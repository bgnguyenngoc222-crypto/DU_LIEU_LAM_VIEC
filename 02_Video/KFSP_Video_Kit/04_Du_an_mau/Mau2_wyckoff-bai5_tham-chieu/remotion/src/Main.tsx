import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { BrandOverlay, BrandLogo } from "./BrandFrame";
import { Scene, FF, PUR, GREEN } from "./Scene";
import { B } from "./timing";

const ProgressBar: React.FC = () => {
  const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig();
  // ẩn ở đoạn CTA cuối (2 hình store + brand spine) để khỏi đè chữ
  if (B.s43 && f >= B.s43.on) return null;
  const w = interpolate(f, [0, durationInFrames], [0, 100], { extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", left: 0, right: 0, top: 1500, height: 7, background: "rgba(255,255,255,0.08)" }}><div style={{ height: "100%", width: `${w}%`, background: `linear-gradient(90deg, ${PUR}, ${GREEN})` }} /></div>;
};

// Teaser app: ẩn progress bar + tắt overlay đáy để clip dùng được cả phần dưới màn (L22)
const inTeaser = (f: number) => Boolean(B.tz1 && B.s31 && f >= B.tz1.on && f < B.s31.on);

const Overlays: React.FC = () => {
  const f = useCurrentFrame();
  const teaser = inTeaser(f);
  return (
    <>
      <BrandOverlay bottom={!teaser} />
      <BrandLogo fontFamily={FF} />
      {!teaser && <ProgressBar />}
    </>
  );
};

// 🔴 Chỉ còn bản BRAND (CLAUDE.md rev28 — kênh nobrand đã dừng).
export const Main: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0a1628" }}>
    <Audio src={staticFile("voiceover_p1_full.mp3")} />
    <Scene />
    <Overlays />
  </AbsoluteFill>
);
