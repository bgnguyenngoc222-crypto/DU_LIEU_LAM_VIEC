import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import React from "react";
import { LAYOUT, COLORS, FONTS } from "../design";
import { getSentence, sceneOffsetFrame } from "../data/sentencesData";
import type { Phase } from "../data/sentencesData";

import { Logo } from "../components/ui/Logo";
import { SentenceSubtitleBar } from "../components/ui/SentenceSubtitleBar";

import { HookScene } from "../scenes/HookScene";
import { ProblemScene } from "../scenes/ProblemScene";
import { AgitateScene } from "../scenes/AgitateScene";
import { SolveScene } from "../scenes/SolveScene";
import { ActionScene } from "../scenes/ActionScene";

// Generic wrapper for a single sentence composition.
// Reuses old phase scene via Sequence offset (scene plays its local frame range
// corresponding to the sentence's portion of the original timeline).

const PHASE_SCENE: Record<Phase, React.FC> = {
  HOOK: HookScene,
  PROBLEM: ProblemScene,
  AGITATE: AgitateScene,
  SOLVE: SolveScene,
  ACTION: ActionScene,
};

interface Props {
  sentenceId: string;
}

export const SentenceShell: React.FC<Props> = ({ sentenceId }) => {
  const s = getSentence(sentenceId);
  const PhaseScene = PHASE_SCENE[s.phase];
  // Offset into the old scene's local frame space; clamp to >=0 to avoid a
  // blank leading gap (1-2f background default is acceptable).
  const offset = Math.max(0, sceneOffsetFrame(s));

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
      {/* Layer 1: phase scene, fast-forwarded to its local frame = offset */}
      <AbsoluteFill>
        <Sequence from={-offset}>
          <PhaseScene />
        </Sequence>
      </AbsoluteFill>

      {/* Layer 2: Logo (top) */}
      <Logo />

      {/* Layer 3: per-sentence subtitle from whisper word timestamps */}
      <SentenceSubtitleBar words={s.word_timestamps} displayText={s.display} />

      {/* Layer 4: per-sentence audio */}
      <Audio src={staticFile(`audio/sentences/${s.id}.mp3`)} />

      {/* Layer 5: debug overlay (sentence id + main_idea) — top-left corner */}
      {/* Remove for final render */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 14,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 16,
          color: "rgba(0,0,0,0.35)",
          zIndex: 100,
        }}
      >
        {s.id} · {s.phase} · {s.main_idea}
      </div>
    </AbsoluteFill>
  );
};
