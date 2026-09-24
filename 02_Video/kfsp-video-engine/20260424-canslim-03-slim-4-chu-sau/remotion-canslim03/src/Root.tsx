import React from "react";
import { Composition } from "remotion";
import { SentenceShell } from "./SentenceShell";
import { FullPreview, FULL_PREVIEW_FRAMES } from "./FullPreview";
import { SENTENCES, durationFrames } from "./sentencesData";
import { LAYOUT } from "./design";

const SentenceShellAny =
  SentenceShell as unknown as React.ComponentType<Record<string, unknown>>;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* FullPreview — all sentences sequenced with pause_after_ms gaps */}
      <Composition
        id="FullPreview"
        component={FullPreview}
        durationInFrames={FULL_PREVIEW_FRAMES}
        fps={LAYOUT.fps}
        width={LAYOUT.width}
        height={LAYOUT.height}
        defaultProps={{ hideSubtitle: false }}
      />

      {/* FullPreviewNoSub — same content, subtitle bar hidden (raw export) */}
      <Composition
        id="FullPreviewNoSub"
        component={FullPreview}
        durationInFrames={FULL_PREVIEW_FRAMES}
        fps={LAYOUT.fps}
        width={LAYOUT.width}
        height={LAYOUT.height}
        defaultProps={{ hideSubtitle: true }}
      />

      {/* Per-sentence atomic compositions */}
      {SENTENCES.map((s) => (
        <Composition
          key={s.id}
          id={`Sentence-${s.id}`}
          component={SentenceShellAny}
          durationInFrames={durationFrames(s, LAYOUT.fps)}
          fps={LAYOUT.fps}
          width={LAYOUT.width}
          height={LAYOUT.height}
          defaultProps={{ sentence: s }}
        />
      ))}
    </>
  );
};
