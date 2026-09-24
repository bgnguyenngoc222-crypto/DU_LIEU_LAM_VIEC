import { interpolate, useCurrentFrame } from "remotion";
import React from "react";

interface CountUpProps {
  value: number;
  delay?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  delay = 0,
  duration = 20,
  decimals = 2,
  prefix = "",
  suffix = "",
  style,
  className,
}) => {
  const frame = useCurrentFrame();

  const current = interpolate(
    frame,
    [delay, delay + duration],
    [0, value],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const formatted = current.toLocaleString("vi-VN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span style={style} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
};
