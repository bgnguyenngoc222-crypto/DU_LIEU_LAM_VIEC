import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import React from "react";
import { LAYOUT, COLORS, FONTS } from "./design";
import { SECTIONS } from "./types";

import { Logo } from "./components/ui/Logo";
import { ProgressBar } from "./components/ui/ProgressBar";
import { SubtitleBar } from "./components/ui/SubtitleBar";

import { HookScene } from "./scenes/HookScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { AgitateScene } from "./scenes/AgitateScene";
import { SolveScene } from "./scenes/SolveScene";
import { ActionScene } from "./scenes/ActionScene";
import { SFXLayer } from "./SFXLayer";

import { SUBTITLES } from "./data/subtitles";

// ═══════════════════════════════════════════
// Main Composition — Video 11 tiêu chí FA
// 88.1s, 1080x1920, 30fps
// Audio: voiceover.mp3 (Thanh Long voice)
// Framework: PASA — Hook → Problem → Agitate → Solve → Action
// ═══════════════════════════════════════════

export const ShortFA: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        width: LAYOUT.width,
        height: LAYOUT.height,
        fontFamily: FONTS.family,
        background: COLORS.bgPrimary,
        overflow: "hidden",
      }}
    >
      {/* ═══ Layer 1: Scene Content ═══ */}
      <AbsoluteFill>
        <Sequence from={SECTIONS.hook.start} durationInFrames={SECTIONS.hook.duration}>
          <HookScene />
        </Sequence>
        <Sequence from={SECTIONS.problem.start} durationInFrames={SECTIONS.problem.duration}>
          <ProblemScene />
        </Sequence>
        <Sequence from={SECTIONS.agitate.start} durationInFrames={SECTIONS.agitate.duration}>
          <AgitateScene />
        </Sequence>
        <Sequence from={SECTIONS.solve.start} durationInFrames={SECTIONS.solve.duration}>
          <SolveScene />
        </Sequence>
        <Sequence from={SECTIONS.action.start} durationInFrames={SECTIONS.action.duration}>
          <ActionScene />
        </Sequence>
      </AbsoluteFill>

      {/* ═══ Layer 2: Logo (top) ═══ */}
      <Logo />

      {/* ═══ Layer 3: Subtitle (karaoke) ═══ */}
      <SubtitleBar subtitles={SUBTITLES} />

      {/* ═══ Layer 4: Progress Bar (bottom) ═══ */}
      <ProgressBar />

      {/* ═══ Layer 5: Audio ═══ */}
      <Audio src={staticFile("audio/voiceover.mp3")} />

      {/* ═══ Layer 6: SFX cues ═══ */}
      <SFXLayer />
    </AbsoluteFill>
  );
};
