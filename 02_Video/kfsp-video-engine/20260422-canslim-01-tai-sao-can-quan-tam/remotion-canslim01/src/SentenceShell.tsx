import { AbsoluteFill, Audio, staticFile } from "remotion";
import { SENTENCE_BY_ID } from "./data";
import { SubtitleBar } from "./SubtitleBar";
import { ProgressBar } from "./components/ProgressBar";
import { Logo } from "./components/Logo";
import { COLORS } from "./design";

import {
  SentenceS01,
  SentenceS02,
  SentenceS03,
  SentenceS04,
  SentenceS05,
} from "./sentences/Hook";
import {
  SentenceS06,
  SentenceS07,
  SentenceS08,
  SentenceS09,
  SentenceS10,
  SentenceS11,
  SentenceS12,
  SentenceS13,
  SentenceS14,
  SentenceS15,
} from "./sentences/Value";
import { SentenceS16, SentenceS17 } from "./sentences/CTA";
import { Sentence } from "./types";

const REGISTRY: Record<string, React.FC<{ sentence: Sentence }>> = {
  s01: SentenceS01,
  s02: SentenceS02,
  s03: SentenceS03,
  s04: SentenceS04,
  s05: SentenceS05,
  s06: SentenceS06,
  s07: SentenceS07,
  s08: SentenceS08,
  s09: SentenceS09,
  s10: SentenceS10,
  s11: SentenceS11,
  s12: SentenceS12,
  s13: SentenceS13,
  s14: SentenceS14,
  s15: SentenceS15,
  s16: SentenceS16,
  s17: SentenceS17,
};

// Keyword color map per CLAUDE.md
const GLOBAL_KEYWORDS: Record<string, string> = {
  "canslim": COLORS.purple,
  "câu": COLORS.gold,
  "nội": COLORS.gold,
  "tại": COLORS.gold,
  "thị": COLORS.purple,
  "trường": COLORS.purple,
  "đứng": COLORS.red,
  "im": COLORS.red,
  "đẹp": COLORS.green,
  "khó": COLORS.red,
  "chịu": COLORS.red,
};

export const SentenceShell: React.FC<{ sentenceId: string }> = ({ sentenceId }) => {
  const sentence = SENTENCE_BY_ID[sentenceId];
  if (!sentence) {
    return (
      <AbsoluteFill style={{ background: "#000", color: "#fff", padding: 40 }}>
        Missing sentence: {sentenceId}
      </AbsoluteFill>
    );
  }
  const Comp = REGISTRY[sentenceId];
  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
      {Comp && <Comp sentence={sentence} />}
      <Logo />
      {/* Subtitle tạm ẩn — uncomment khi cần lại */}
      {/* <SubtitleBar sentence={sentence} keywordColors={GLOBAL_KEYWORDS} /> */}
      <Audio src={staticFile(`audio/${sentence.id}.mp3`)} />
    </AbsoluteFill>
  );
};

// Wrapper for per-sentence Composition: adds ProgressBar at top-level
// (ProgressBar uses useCurrentFrame which is composition-relative — must be
// outside any Series.Sequence to get absolute frame in FullPreview).
export const SentenceCompo: React.FC<{ sentenceId: string }> = ({ sentenceId }) => (
  <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
    <SentenceShell sentenceId={sentenceId} />
    <ProgressBar />
  </AbsoluteFill>
);
