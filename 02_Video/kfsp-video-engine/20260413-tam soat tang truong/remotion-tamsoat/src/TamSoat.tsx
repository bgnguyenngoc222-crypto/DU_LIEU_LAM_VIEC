import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import React from "react";
import { LAYOUT, COLORS, FONTS } from "./design";
import { SECTIONS } from "./types";

import { Logo } from "./components/ui/Logo";
import { ProgressBar } from "./components/ui/ProgressBar";
import { SubtitleBar } from "./components/ui/SubtitleBar";
import { SFX } from "./components/audio/SFX";

import { HookScene } from "./scenes/HookScene";
import { FilterSetupScene } from "./scenes/FilterSetupScene";
import { BonusScene } from "./scenes/BonusScene";
import { ConclusionScene } from "./scenes/ConclusionScene";

import { SUBTITLES } from "./data/subtitles";

// ═══════════════════════════════════════════
// Main Composition — Video Tầm Soát Tăng Trưởng
// 110s, 1080x1920, 30fps
// Audio: v4_kfspthanh.mp3 (109.3s, speed 1.0x)
// ═══════════════════════════════════════════

export const TamSoat: React.FC = () => {
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
        <Sequence from={SECTIONS.filterSetup.start} durationInFrames={SECTIONS.filterSetup.duration}>
          <FilterSetupScene />
        </Sequence>
        <Sequence from={SECTIONS.bonus.start} durationInFrames={SECTIONS.bonus.duration}>
          <BonusScene />
        </Sequence>
        <Sequence from={SECTIONS.conclusion.start} durationInFrames={SECTIONS.conclusion.duration}>
          <ConclusionScene />
        </Sequence>
      </AbsoluteFill>

      {/* ═══ Layer 2: Subtitles (5-6 words karaoke) ═══ */}
      <AbsoluteFill>
        <SubtitleBar subtitles={SUBTITLES} />
      </AbsoluteFill>

      {/* ═══ Layer 3: Logo (centered top, always visible) ═══ */}
      <AbsoluteFill>
        <Logo />
      </AbsoluteFill>

      {/* ═══ Layer 4: Progress Bar ═══ */}
      <AbsoluteFill>
        <ProgressBar />
      </AbsoluteFill>

      {/* ═══ Layer 5: Voiceover (speed 1.0x) ═══ */}
      <Audio src={staticFile("audio/voiceover.mp3")} volume={1} />

      {/* ═══ Layer 6: Sound Effects ═══ */}
      {/* HOOK */}
      <SFX src="sfx/whoosh.mp3" triggerFrame={213} volume={0.3} />
      <SFX src="sfx/pop.mp3" triggerFrame={280} volume={0.3} />
      <SFX src="sfx/click.mp3" triggerFrame={355} volume={0.2} />
      <SFX src="sfx/click.mp3" triggerFrame={363} volume={0.2} />
      <SFX src="sfx/click.mp3" triggerFrame={371} volume={0.2} />

      {/* BƯỚC 1 */}
      <SFX src="sfx/whoosh.mp3" triggerFrame={459} volume={0.25} />
      <SFX src="sfx/pop.mp3" triggerFrame={465} volume={0.25} />
      <SFX src="sfx/swoosh.mp3" triggerFrame={490} volume={0.2} />
      <SFX src="sfx/click.mp3" triggerFrame={530} volume={0.2} />

      {/* BƯỚC 2a */}
      <SFX src="sfx/whoosh.mp3" triggerFrame={591} volume={0.25} />
      <SFX src="sfx/swoosh.mp3" triggerFrame={620} volume={0.2} />
      <SFX src="sfx/click.mp3" triggerFrame={685} volume={0.2} />
      <SFX src="sfx/click.mp3" triggerFrame={745} volume={0.2} />
      <SFX src="sfx/click.mp3" triggerFrame={805} volume={0.2} />

      {/* BƯỚC 2b */}
      <SFX src="sfx/whoosh.mp3" triggerFrame={854} volume={0.25} />
      <SFX src="sfx/swoosh.mp3" triggerFrame={905} volume={0.2} />
      <SFX src="sfx/pop.mp3" triggerFrame={1000} volume={0.25} />
      <SFX src="sfx/click.mp3" triggerFrame={1060} volume={0.2} />

      {/* BƯỚC 3 */}
      <SFX src="sfx/whoosh.mp3" triggerFrame={1218} volume={0.25} />
      <SFX src="sfx/pop.mp3" triggerFrame={1225} volume={0.25} />
      <SFX src="sfx/swoosh.mp3" triggerFrame={1265} volume={0.2} />
      <SFX src="sfx/click.mp3" triggerFrame={1355} volume={0.2} />
      <SFX src="sfx/chime.mp3" triggerFrame={1400} volume={0.3} />

      {/* CHUYỂN Ý */}
      <SFX src="sfx/whoosh.mp3" triggerFrame={1446} volume={0.3} />
      <SFX src="sfx/chime.mp3" triggerFrame={1485} volume={0.3} />
      <SFX src="sfx/pop.mp3" triggerFrame={1490} volume={0.25} />

      {/* BƯỚC 4 */}
      <SFX src="sfx/pop.mp3" triggerFrame={1680} volume={0.25} />
      <SFX src="sfx/notification.mp3" triggerFrame={1715} volume={0.3} />
      <SFX src="sfx/swoosh.mp3" triggerFrame={1855} volume={0.2} />

      {/* BƯỚC 5 */}
      <SFX src="sfx/whoosh.mp3" triggerFrame={1954} volume={0.25} />
      <SFX src="sfx/swoosh.mp3" triggerFrame={1995} volume={0.2} />
      <SFX src="sfx/click.mp3" triggerFrame={2065} volume={0.2} />
      <SFX src="sfx/notification.mp3" triggerFrame={2100} volume={0.3} />
      <SFX src="sfx/click.mp3" triggerFrame={2155} volume={0.2} />

      {/* CONCLUSION */}
      <SFX src="sfx/chime.mp3" triggerFrame={2270} volume={0.3} />
      <SFX src="sfx/pop.mp3" triggerFrame={2355} volume={0.2} />
      <SFX src="sfx/pop.mp3" triggerFrame={2365} volume={0.2} />
      <SFX src="sfx/pop.mp3" triggerFrame={2375} volume={0.2} />
      <SFX src="sfx/swoosh.mp3" triggerFrame={2605} volume={0.2} />
      {/* f2811-f3050: SILENCE = weight + confidence */}
      <SFX src="sfx/pop.mp3" triggerFrame={2945} volume={0.3} />
      <SFX src="sfx/notification.mp3" triggerFrame={3125} volume={0.3} />
      <SFX src="sfx/success.mp3" triggerFrame={3210} volume={0.25} />
    </AbsoluteFill>
  );
};
