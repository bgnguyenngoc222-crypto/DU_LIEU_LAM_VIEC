import { Audio, staticFile, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

interface BGMProps {
  src: string;
  baseVolume?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
  // Frames where voiceover is active — duck BGM to 20%
  voiceoverRanges?: Array<{ start: number; end: number }>;
}

export const BGM: React.FC<BGMProps> = ({
  src,
  baseVolume = 0.5,
  fadeInDuration = 30,
  fadeOutDuration = 45,
  voiceoverRanges = [],
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Base envelope: fade in/out
  const envelope = interpolate(
    frame,
    [0, fadeInDuration, durationInFrames - fadeOutDuration, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Duck when voiceover is active (20% of base), transition section gets 50%
  const isVoiceover = voiceoverRanges.some(r => frame >= r.start && frame <= r.end);
  const duckFactor = isVoiceover ? 0.2 : 1.0;

  const vol = envelope * baseVolume * duckFactor;

  return (
    <Audio
      src={staticFile(src)}
      volume={vol}
      loop
    />
  );
};
