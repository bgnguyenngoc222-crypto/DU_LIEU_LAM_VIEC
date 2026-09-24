import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate, Img, staticFile } from "remotion";
import { COLORS, SPRINGS, FONTS } from "../../design";

// Cánh cửa "11" glow vàng — Scene 3 (cánh cửa Scene 3) + Scene 5 (CTA outro)
// Door appears, number "11" glows, then door opens to reveal content behind

interface Props {
  appearFrame?: number;        // when door fades in
  openFrame?: number;          // when door swings open (revealing reveal content)
  reveal?: "S1" | "logo" | null;  // What's behind the door
  size?: "small" | "large";
}

export const DoorWithNumber: React.FC<Props> = ({
  appearFrame = 0,
  openFrame = 60,
  reveal = "S1",
  size = "small",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const W = size === "large" ? 480 : 280;
  const H = W * 1.6;

  // Door appearance
  const appearProg = spring({
    frame: frame - appearFrame,
    fps,
    config: SPRINGS.decisive,
  });

  // Number "11" pulse + glow
  const numberProg = spring({
    frame: frame - appearFrame - 20,
    fps,
    config: SPRINGS.resolve,
  });
  const numberScale = interpolate(numberProg, [0, 0.6, 1], [0, 1.3, 1.0], { extrapolateRight: "clamp" });

  // Door open animation (rotateY)
  const openProg = spring({
    frame: frame - openFrame,
    fps,
    config: SPRINGS.zoom,
  });
  const doorOpenDeg = openProg * -85;

  // Light bloom when door opens
  const bloomOpacity = interpolate(frame, [openFrame, openFrame + 30], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: W,
        height: H,
        margin: "0 auto",
        opacity: appearProg,
        transform: `scale(${appearProg})`,
        transformOrigin: "center bottom",
      }}
    >
      {/* Reveal content behind door (S1 radar blur) */}
      {reveal === "S1" && openProg > 0.1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 8,
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <Img
            src={staticFile("images/fa/S1_radar_4m_fpt.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              filter: `blur(${(1 - openProg) * 8}px) brightness(1.1)`,
            }}
          />
        </div>
      )}

      {/* Light bloom from inside door */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          background: "radial-gradient(circle at 50% 50%, rgba(245, 197, 66, 0.6), transparent 70%)",
          opacity: bloomOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Door panel (rotates open) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #6B4423, #4A2F19)",
          border: "4px solid #3A2510",
          borderRadius: "8px 8px 4px 4px",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.5), 0 8px 30px rgba(0,0,0,0.4)",
          transform: `perspective(800px) rotateY(${doorOpenDeg}deg)`,
          transformOrigin: "left center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {/* Number "11" with gold glow */}
        <div
          style={{
            fontFamily: FONTS.family,
            fontSize: W * 0.5,
            fontWeight: 900,
            color: COLORS.accentGold,
            transform: `scale(${numberScale})`,
            textShadow: `0 0 ${20 + numberScale * 30}px rgba(245, 197, 66, 0.8), 0 0 60px rgba(245, 197, 66, 0.5)`,
            lineHeight: 1,
          }}
        >
          11
        </div>

        {/* Door handle */}
        <div
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#D4AF37",
            boxShadow: "0 0 8px rgba(212, 175, 55, 0.6)",
          }}
        />
      </div>
    </div>
  );
};
