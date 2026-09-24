import { Audio, staticFile, useCurrentFrame } from "remotion";
import React from "react";

interface SFXProps {
  src: string;
  triggerFrame: number;
  volume?: number;
}

export const SFX: React.FC<SFXProps> = ({
  src,
  triggerFrame,
  volume = 0.4,
}) => {
  const frame = useCurrentFrame();
  if (frame < triggerFrame) return null;

  return (
    <Audio
      src={staticFile(src)}
      startFrom={0}
      volume={volume}
    />
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
