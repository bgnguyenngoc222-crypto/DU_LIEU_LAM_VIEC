import { Composition } from "remotion";
import { SENTENCES, durationFrames } from "./data";
import { SentenceCompo } from "./SentenceShell";
import { FullPreview, fullPreviewDurationFrames } from "./FullPreview";
import { CleanExport, cleanExportDurationFrames } from "./CleanExport";
import { VIDEO_CONFIG } from "./design";

const Compo = SentenceCompo as unknown as React.ComponentType<Record<string, unknown>>;
const Full = FullPreview as unknown as React.ComponentType<Record<string, unknown>>;
const Clean = CleanExport as unknown as React.ComponentType<Record<string, unknown>>;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FullPreview"
        component={Full}
        durationInFrames={fullPreviewDurationFrames()}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
      <Composition
        id="CleanExport"
        component={Clean}
        durationInFrames={cleanExportDurationFrames()}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
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
