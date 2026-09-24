import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { TransitionType } from "../../types";

interface TransitionWrapperProps {
  children: React.ReactNode;
  type?: TransitionType;
  transitionDuration?: number; // frames
}

export const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  type = "fade",
  transitionDuration = 10,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Enter transition (first N frames)
  const enterProgress = interpolate(
    frame,
    [0, transitionDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Exit transition (last N frames)
  const exitProgress = interpolate(
    frame,
    [durationInFrames - transitionDuration, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const progress = Math.min(enterProgress, exitProgress);

  const getStyle = (): React.CSSProperties => {
    switch (type) {
      case "fade":
        return { opacity: progress };

      case "slide-left":
        return {
          opacity: progress,
          transform: `translateX(${(1 - enterProgress) * 100}px)`,
        };

      case "slide-right":
        return {
          opacity: progress,
          transform: `translateX(${(1 - enterProgress) * -100}px)`,
        };

      case "slide-up":
        return {
          opacity: progress,
          transform: `translateY(${(1 - enterProgress) * 80}px)`,
        };

      case "zoom-blur":
        return {
          opacity: progress,
          transform: `scale(${0.9 + enterProgress * 0.1})`,
          filter: `blur(${(1 - enterProgress) * 8}px)`,
        };

      case "wipe":
        return {
          clipPath: `inset(0 ${(1 - enterProgress) * 100}% 0 0)`,
        };

      case "dissolve":
        return { opacity: progress };

      default:
        return { opacity: progress };
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        ...getStyle(),
      }}
    >
      {children}
    </div>
  );
};
