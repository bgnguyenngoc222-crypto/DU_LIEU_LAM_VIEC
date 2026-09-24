import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SentenceShell } from "./SentenceShell";
import { SENTENCES, durationFrames } from "./sentencesData";
import { COLORS, LAYOUT } from "./design";

export interface PreviewSlot {
  id: string;
  fromFrame: number;
  durFrames: number;
  pauseFrames: number;
}

export function buildSlots(): { slots: PreviewSlot[]; totalFrames: number } {
  let offset = 0;
  const slots: PreviewSlot[] = [];
  for (let i = 0; i < SENTENCES.length; i++) {
    const s = SENTENCES[i];
    const dur = durationFrames(s, LAYOUT.fps);
    const pauseMs = i < SENTENCES.length - 1 ? s.pause_after_ms ?? 0 : 0;
    const pauseFrames = Math.round((pauseMs / 1000) * LAYOUT.fps);
    slots.push({ id: s.id, fromFrame: offset, durFrames: dur, pauseFrames });
    offset += dur + pauseFrames;
  }
  return { slots, totalFrames: offset };
}

export const FULL_PREVIEW_FRAMES = buildSlots().totalFrames;

interface FullPreviewProps {
  hideSubtitle?: boolean;
}

export const FullPreview: React.FC<FullPreviewProps> = ({ hideSubtitle }) => {
  const { slots } = buildSlots();
  const sentencesById = new Map(SENTENCES.map((s) => [s.id, s]));

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
      {slots.map(({ id, fromFrame, durFrames, pauseFrames }) => {
        const s = sentencesById.get(id)!;
        // Slot covers sentence playback + freeze padding for pause_after_ms.
        // SentenceShell freezes its last frame past durFrames (no black flash).
        const slotFrames = durFrames + pauseFrames;
        return (
          <Sequence key={id} from={fromFrame} durationInFrames={slotFrames}>
            <SentenceShell
              sentence={s}
              sentenceFrames={durFrames}
              hideSubtitle={hideSubtitle}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
