import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { GLASS_CARD } from "../../design";

interface GlassCardProps {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  return (
    <div
      style={{
        ...GLASS_CARD,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 20}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
