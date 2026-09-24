import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { COLORS, FONTS, SAFE, VIDEO } from "../design";
import { Subtitle, WordTS } from "./Subtitle";

type Props = {
  id: string;
  phase: string;
  audioPath: string; // e.g. "audio/s01.mp3"
  durationSec: number;
  words: WordTS[];
  displayText?: string;
  highlightWords?: string[];
  highlightColor?: string;
  bgVariant?: "default" | "warm" | "dim" | "cinematic";
  showLogo?: boolean;
  children: React.ReactNode;
};

const PhaseChip: React.FC<{ phase: string; color: string }> = ({ phase, color }) => (
  <div
    style={{
      position: "absolute",
      top: SAFE.logoTopY[0] + 30,
      left: SAFE.leftSafe + 6,
      padding: "4px 12px",
      borderRadius: 999,
      background: `${color}1a`,
      border: `1px solid ${color}55`,
      color,
      fontFamily: FONTS.family,
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: 1.5,
    }}
  >
    {phase}
  </div>
);

const Logo: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: SAFE.logoTopY[0] + 10,
      left: 0,
      width: VIDEO.width,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      pointerEvents: "none",
    }}
  >
    <Img
      src={staticFile("images/kfsp-logo-white.png")}
      style={{
        width: 96,
        height: 96,
        objectFit: "contain",
        filter: "drop-shadow(0 4px 14px rgba(255,255,255,0.45))",
      }}
    />
    <div
      style={{
        color: "white",
        fontFamily: FONTS.family,
        fontWeight: 900,
        fontSize: 26,
        letterSpacing: 6,
        textShadow: "0 2px 8px rgba(0,0,0,0.6)",
      }}
    >
      KFSP
    </div>
  </div>
);

const ProgressBar: React.FC<{ durationSec: number }> = ({ durationSec }) => {
  // Simple progress bar
  return (
    <div
      style={{
        position: "absolute",
        top: SAFE.progressBarY,
        left: SAFE.leftSafe,
        right: VIDEO.width - SAFE.rightSafe,
        height: 4,
        background: "rgba(255,255,255,0.10)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, #f5c542, #a78bfa)",
          width: "100%",
          transformOrigin: "left",
          transform: `scaleX(${durationSec ? Math.min(1, 1) : 0})`,
        }}
      />
    </div>
  );
};

// Forest green dark vignette — KFSP CANSLIM series spec
// Primary: #03100a · Mid-stop: #0a2418 · Center 50% 40%
const bgGradient = (variant: Props["bgVariant"]) => {
  switch (variant) {
    case "warm":
      // Empathy section — vignette focal nudged lower for "intimate" feel, same green palette
      return "radial-gradient(circle at 50% 55%, #0a2418 0%, #03100a 70%)";
    case "dim":
      // Callback s17 — flat darker, no vignette focal
      return "radial-gradient(circle at 50% 50%, #061810 0%, #03100a 60%)";
    case "cinematic":
      // s01, s18-20 — softer mid-stop for cinematic depth
      return "radial-gradient(circle at 50% 45%, #0c2a1c 0%, #03100a 75%)";
    default:
      // Standard per design spec
      return "radial-gradient(circle at 50% 40%, #0a2418 0%, #03100a 70%)";
  }
};

const phaseChipColor = (phase: string) => {
  if (phase === "HOOK") return COLORS.gold;
  if (phase === "CTA") return COLORS.green;
  return COLORS.purple;
};

export const SceneFrame: React.FC<Props> = ({
  id,
  phase,
  audioPath,
  durationSec,
  words,
  displayText,
  highlightWords,
  highlightColor,
  bgVariant = "default",
  showLogo = true,
  children,
}) => {
  return (
    <AbsoluteFill style={{ background: bgGradient(bgVariant), fontFamily: FONTS.family }}>
      {/* Audio */}
      <Audio src={staticFile(audioPath)} />

      {/* Logo only (no debug chips) */}
      {showLogo && <Logo />}

      {/* Main content */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>{children}</AbsoluteFill>

      {/* Subtitle bottom — TẠM ẨN */}
      {false && (
        <Subtitle
          words={words}
          displayText={displayText}
          highlightWords={highlightWords}
          highlightColor={highlightColor}
          durationSec={durationSec}
        />
      )}

      <ProgressBar durationSec={durationSec} />
    </AbsoluteFill>
  );
};
