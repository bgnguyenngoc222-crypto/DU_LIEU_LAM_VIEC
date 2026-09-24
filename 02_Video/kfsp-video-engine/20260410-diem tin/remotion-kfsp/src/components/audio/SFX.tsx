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
  volume = 0.5,
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

// Pre-defined SFX shortcuts
export const SFXLibrary = {
  swoosh: "sfx/transitions/swoosh.mp3",
  whoosh: "sfx/transitions/whoosh-soft.mp3",
  zoomBlur: "sfx/transitions/zoom-blur.mp3",
  pop: "sfx/ui/pop.mp3",
  tick: "sfx/ui/tick.mp3",
  ding: "sfx/ui/ding.mp3",
  chime: "sfx/ui/chime.mp3",
  notification: "sfx/ui/notification.mp3",
  barGrow: "sfx/charts/bar-grow.mp3",
  lineDraw: "sfx/charts/line-draw.mp3",
  blockPop: "sfx/charts/block-pop.mp3",
} as const;
