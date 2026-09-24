import { OffthreadVideo, staticFile, Img } from "remotion";
import React from "react";
import { VIDEO } from "../design";

/**
 * Wraps the screen recording. Display at full output size (1920×920).
 * `startFromSec` = which second of the 78.87s source to begin from.
 * `endAtSec` = which second to end. If equal, treated as freeze (still frame).
 */
export const SourceVideo: React.FC<{
  startFromSec: number;
  endAtSec: number;
  freeze?: boolean;
  freezeAtSec?: number;
}> = ({ startFromSec, endAtSec, freeze, freezeAtSec }) => {
  const style: React.CSSProperties = {
    width: VIDEO.width,
    height: VIDEO.height,
    objectFit: "cover",
    objectPosition: "center",
  };

  if (freeze) {
    const t = freezeAtSec ?? startFromSec;
    const tRounded = Math.round(t);
    return (
      <Img
        src={staticFile(`freeze-frames/t${tRounded}s.jpg`)}
        style={style}
      />
    );
  }

  return (
    <OffthreadVideo
      src={staticFile("source-h264.mp4")}
      startFrom={Math.round(startFromSec * 30)}
      endAt={Math.round(endAtSec * 30)}
      style={style}
      muted
    />
  );
};
