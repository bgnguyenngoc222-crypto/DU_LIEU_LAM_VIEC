import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

type Direction = "left" | "right" | "up" | "down";

interface SlideInProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  style?: React.CSSProperties;
}

const getTransform = (direction: Direction, progress: number, distance: number) => {
  const offset = interpolate(progress, [0, 1], [distance, 0]);
  switch (direction) {
    case "left": return `translateX(${-offset}px)`;
    case "right": return `translateX(${offset}px)`;
    case "up": return `translateY(${-offset}px)`;
    case "down": return `translateY(${offset}px)`;
  }
};

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = "up",
  delay = 0,
  distance = 100,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 120, mass: 0.8 },
  });

  const opacity = interpolate(frame, [delay, delay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: getTransform(direction, progress, distance),
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
