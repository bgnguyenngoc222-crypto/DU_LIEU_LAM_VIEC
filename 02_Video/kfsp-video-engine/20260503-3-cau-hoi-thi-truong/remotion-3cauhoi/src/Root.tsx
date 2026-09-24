import { Composition } from "remotion";
import { SENTENCES, durationFrames } from "./data";
import { SentenceCompo } from "./SentenceShell";
import { FullPreview, fullPreviewDurationFrames } from "./FullPreview";
import { VIDEO_CONFIG } from "./design";

const Compo = SentenceCompo as unknown as React.ComponentType<Record<string, unknown>>;
const Full = FullPreview as unknown as React.ComponentType<Record<string, unknown>>;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full preview — toàn video stitched, xem trên Studio */}
      <Composition
        id="FullPreview"
        component={Full}
        durationInFrames={fullPreviewDurationFrames()}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />

      {/* Per-sentence previews */}
      {SENTENCES.map((s) => (
        <Composition
          key={s.id}
          id={`Sentence-${s.id}`}
          component={Compo}
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
