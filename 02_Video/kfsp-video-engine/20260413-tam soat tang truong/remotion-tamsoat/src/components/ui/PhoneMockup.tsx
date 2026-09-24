import { Img, staticFile, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";
import { COLORS } from "../../design";

interface PhoneMockupProps {
  src: string;
  delay?: number;
  scale?: number;
  position?: "center" | "left" | "right";
  highlightAreas?: Array<{
    x: number; y: number; width: number; height: number;
    color?: string;
    delay?: number;
  }>;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  src,
  delay = 0,
  scale = 0.75,
  position = "center",
  highlightAreas = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 200 },
  });

  const posX =
    position === "left" ? -100 :
    position === "right" ? 100 : 0;

  return (
    <div style={{
      position: "relative",
      transform: `scale(${scale * enter}) translateX(${posX}px) translateY(${(1 - enter) * 40}px)`,
      opacity: enter,
      display: "flex",
      justifyContent: "center",
    }}>
      {/* Phone frame */}
      <div style={{
        width: 380,
        height: 780,
        borderRadius: 44,
        border: `3px solid rgba(26, 26, 46, 0.12)`,
        overflow: "hidden",
        background: "#fff",
        boxShadow: `0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)`,
        position: "relative",
      }}>
        {/* Dynamic island */}
        <div style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 28,
          borderRadius: 14,
          background: "#1a1a2e",
          zIndex: 10,
        }} />

        {/* Screenshot */}
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Highlight areas with pulsing border */}
        {highlightAreas.map((area, i) => {
          const hlDelay = area.delay ?? (delay + 15 + i * 10);
          const hlOpacity = interpolate(frame, [hlDelay, hlDelay + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const pulse = 2 + Math.sin((frame - hlDelay) * 0.15) * 1;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: area.x,
                top: area.y,
                width: area.width,
                height: area.height,
                border: `${pulse}px solid ${area.color || COLORS.accentRed}`,
                borderRadius: 8,
                opacity: hlOpacity,
                boxShadow: `0 0 ${pulse * 3}px ${area.color || COLORS.accentRed}40`,
              }}
            />
          );
        })}
      </div>

      {/* Shadow under phone */}
      <div style={{
        position: "absolute",
        bottom: -15,
        left: "15%",
        right: "15%",
        height: 30,
        background: `radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)`,
        filter: "blur(10px)",
      }} />
    </div>
  );
};
