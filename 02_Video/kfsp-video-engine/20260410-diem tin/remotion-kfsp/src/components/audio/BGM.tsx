import { Audio, staticFile, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

interface BGMProps {
  src: string;
  volume?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
}

export const BGM: React.FC<BGMProps> = ({
  src,
  volume = 0.15,
  fadeInDuration = 30,
  fadeOutDuration = 45,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const vol = interpolate(
    frame,
    [0, fadeInDuration, durationInFrames - fadeOutDuration, durationInFrames],
    [0, volume, volume, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <Audio
      src={staticFile(src)}
      volume={vol}
      loop
    />
  );
};
