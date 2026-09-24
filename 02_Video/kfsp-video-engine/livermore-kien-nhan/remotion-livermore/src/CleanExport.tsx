import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SENTENCE_BY_ID } from "./data";
import { SentenceShell } from "./SentenceShell";
import { ProgressBar } from "./components/ProgressBar";
import { Background } from "./components/Background";
import { COLORS, VIDEO_CONFIG } from "./design";
import { HideBrand } from "./brand";

// No-brand export: keep s01–s22 + s27–s28, DROP KFSP section s23–s26 (visual + audio).
// Audio = pre-cut public/audio/livermore_noband.mp3 (segA 0→s23.start, segB s27.start→end).
const NOBRAND_AUDIO = "audio/livermore_noband.mp3";

const KEPT_IDS = [
  "s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s10",
  "s11", "s12", "s13", "s14", "s15", "s16", "s17", "s18", "s19", "s20",
  "s21", "s22", "s27", "s28",
];

const fps = VIDEO_CONFIG.fps;

// cut params derived from data
const segACut = SENTENCE_BY_ID["s23"].abs_start_s; // end of part 1 (incl s22 trailing pause)
const b0 = SENTENCE_BY_ID["s27"].abs_start_s; // start of part 2
const b1 = SENTENCE_BY_ID["s28"].abs_end_s; // end
const cleanTotalS = segACut + (b1 - b0);

function newStartS(id: string): number {
  const s = SENTENCE_BY_ID[id];
  if (s.abs_start_s < segACut) return s.abs_start_s; // group A unchanged
  return segACut + (s.abs_start_s - b0); // group B shifted earlier
}

export function cleanExportDurationFrames(): number {
  return Math.max(1, Math.round(cleanTotalS * fps) + 6);
}

export const CleanExport: React.FC = () => {
  const items = KEPT_IDS.map((id) => ({ id, from: Math.round(newStartS(id) * fps) }));
  return (
    <HideBrand.Provider value={true}>
      <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
        <Background />
        <Audio src={staticFile(NOBRAND_AUDIO)} />
        {items.map((it, i) => {
          const next = items[i + 1];
          const end = next ? next.from : Math.round(cleanTotalS * fps);
          return (
            <Sequence key={it.id} from={it.from} durationInFrames={Math.max(1, end - it.from)}>
              <SentenceShell sentenceId={it.id} withAudio={false} />
            </Sequence>
          );
        })}
        <ProgressBar />
      </AbsoluteFill>
    </HideBrand.Provider>
  );
};
