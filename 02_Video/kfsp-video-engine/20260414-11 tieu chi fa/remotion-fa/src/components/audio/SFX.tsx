import { Audio, Sequence, staticFile } from "remotion";
import React from "react";

interface SFXProps {
  src: string;
  triggerFrame: number;
  volume?: number;
  durationInFrames?: number;
}

// Wrap trong Sequence — Remotion biết audio thuộc timeline tại triggerFrame
// Tránh bug mount toàn bộ SFX cùng lúc khi scrub preview
export const SFX: React.FC<SFXProps> = ({
  src,
  triggerFrame,
  volume = 0.4,
  durationInFrames = 90,
}) => {
  return (
    <Sequence from={triggerFrame} durationInFrames={durationInFrames} layout="none">
      <Audio src={staticFile(src)} volume={volume} />
    </Sequence>
  );
};

// Placeholder SFX paths — replace with real files
export const SFXLibrary = {
  whoosh: "sfx/whoosh.mp3",
  pop: "sfx/pop.mp3",
  chime: "sfx/chime.mp3",
  swoosh: "sfx/swoosh.mp3",
  click: "sfx/click.mp3",
  success: "sfx/success.mp3",
} as const;
