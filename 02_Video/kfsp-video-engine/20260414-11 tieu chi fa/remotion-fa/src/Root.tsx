import "./style.css";
import { Composition } from "remotion";
import { ShortFA } from "./ShortFA";
import { VIDEO_CONFIG } from "./types";
import { SENTENCES, durationFrames } from "./data/sentencesData";
import { SentenceShell } from "./sentences/SentenceShell";

// Cast to accept arbitrary defaultProps shape without a zod schema.
const SentenceShellAny = SentenceShell as unknown as React.ComponentType<Record<string, unknown>>;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Legacy monolithic composition (kept for reference / fallback) */}
      <Composition
        id="ShortFA"
        component={ShortFA}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />

      {/* Per-sentence atomic compositions — render each separately, stitch later */}
      {SENTENCES.map((s) => (
        <Composition
          key={s.id}
          id={`Sentence-${s.id}`}
          component={SentenceShellAny}
          durationInFrames={durationFrames(s)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          defaultProps={{ sentenceId: s.id }}
        />
      ))}
    </>
  );
};
