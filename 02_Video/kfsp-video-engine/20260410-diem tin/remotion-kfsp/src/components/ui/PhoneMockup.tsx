import { Img, staticFile, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";
import { COLORS } from "../../design";

interface PhoneMockupProps {
  src: string;
  delay?: number;
  scale?: number;
  position?: "center" | "left" | "right";
  // Slow zoom effect
  zoomFrom?: number;
  zoomTo?: number;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  src,
  delay = 0,
  scale = 0.55,
  position = "center",
  zoomFrom = 1,
  zoomTo = 1.04,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 70 },
  });

  const innerZoom = interpolate(
    frame, [delay, durationInFrames],
    [zoomFrom, zoomTo],
    { extrapolateRight: "clamp" }
  );

  const posX =
    position === "left" ? -80 :
    position === "right" ? 80 : 0;

  return (
    <div style={{
      position: "relative",
      transform: `scale(${scale * enter}) translateX(${posX}px) translateY(${(1 - enter) * 40}px)`,
      opacity: enter,
    }}>
      {/* Phone frame */}
      <div style={{
        width: 380,
        height: 820,
        borderRadius: 40,
        border: `3px solid rgba(255,255,255,0.15)`,
        overflow: "hidden",
        background: "#000",
        boxShadow: `0 20px 80px rgba(0,0,0,0.6), 0 0 40px ${COLORS.gradientStart}15`,
      }}>
        {/* Status bar */}
        <div style={{
          height: 44,
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            width: 120, height: 28, borderRadius: 14,
            background: "#000",
          }} />
        </div>

        {/* Screenshot content */}
        <div style={{ overflow: "hidden", height: 776 }}>
          <Img
            src={staticFile(src)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${innerZoom})`,
            }}
          />
        </div>
      </div>

      {/* Subtle glow under phone */}
      <div style={{
        position: "absolute",
        bottom: -20,
        left: "10%",
        right: "10%",
        height: 40,
        background: `radial-gradient(ellipse, ${COLORS.gradientStart}20 0%, transparent 70%)`,
        filter: "blur(15px)",
      }} />
    </div>
  );
};
