import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SENTENCES, AUDIO_FILE, fullSpanFrames, audioTotalFrames } from "./data";
import { SentenceShell } from "./SentenceShell";
import { ProgressBar } from "./components/ProgressBar";
import { Background } from "./components/Background";
import { COLORS } from "./design";

// Monolithic-aligned: ONE continuous audio + sentence visuals positioned by
// absolute start frame (covers silence gaps). No per-sentence audio / padding.
export function fullPreviewDurationFrames(): number {
  return Math.max(1, audioTotalFrames() + 6);
}

export const FullPreview: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
      <Background />
      <Audio src={staticFile(AUDIO_FILE)} />
      {SENTENCES.map((s, i) => {
        const { from, durationInFrames } = fullSpanFrames(i);
        return (
          <Sequence key={s.id} from={from} durationInFrames={durationInFrames}>
            <SentenceShell sentenceId={s.id} withAudio={false} />
          </Sequence>
        );
      })}
      <ProgressBar />
    </AbsoluteFill>
  );
};
