import { AbsoluteFill, Series } from "remotion";
import { SENTENCES, durationFrames } from "./data";
import { SentenceShell } from "./SentenceShell";
import { ProgressBar } from "./components/ProgressBar";
import { COLORS, VIDEO_CONFIG } from "./design";

function pauseFrames(pause_after_ms: number): number {
  return Math.round((pause_after_ms / 1000) * VIDEO_CONFIG.fps);
}

export function fullPreviewDurationFrames(): number {
  let total = 0;
  for (const s of SENTENCES) {
    total += durationFrames(s);
    total += pauseFrames(s.pause_after_ms);
  }
  // ensure at least 1 frame
  return Math.max(1, total);
}

export const FullPreview: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
      <Series>
        {SENTENCES.map((s) => {
          const f = durationFrames(s) + pauseFrames(s.pause_after_ms);
          return (
            <Series.Sequence key={s.id} durationInFrames={f}>
              <SentenceShell sentenceId={s.id} />
            </Series.Sequence>
          );
        })}
      </Series>
      <ProgressBar />
    </AbsoluteFill>
  );
};
