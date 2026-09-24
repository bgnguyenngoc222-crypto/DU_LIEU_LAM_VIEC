import { AbsoluteFill, Audio, staticFile } from "remotion";
import { SENTENCE_BY_ID, AUDIO_FILE, absStartFrame } from "./data";
import { SubtitleBar } from "./SubtitleBar";
import { ProgressBar } from "./components/ProgressBar";
import { Logo } from "./components/Logo";
import { Background } from "./components/Background";
import { COLORS } from "./design";
import { Sentence } from "./types";

import { SentenceS01, SentenceS02, SentenceS03 } from "./sentences/Hook";
import { SentenceS04, SentenceS05, SentenceS06 } from "./sentences/Problem";
import {
  SentenceS07,
  SentenceS08,
  SentenceS09,
  SentenceS10,
  SentenceS11,
} from "./sentences/Agitate";
import {
  SentenceS12,
  SentenceS13,
  SentenceS14,
  SentenceS15,
  SentenceS16,
  SentenceS17,
  SentenceS18,
  SentenceS19,
} from "./sentences/Lesson";
import { SentenceS20, SentenceS21, SentenceS22 } from "./sentences/Gap";
import {
  SentenceS23,
  SentenceS24,
  SentenceS25,
  SentenceS26,
} from "./sentences/Solve";
import { SentenceS27, SentenceS28 } from "./sentences/CTA";

const REGISTRY: Record<string, React.FC<{ sentence: Sentence }>> = {
  s01: SentenceS01, s02: SentenceS02, s03: SentenceS03,
  s04: SentenceS04, s05: SentenceS05, s06: SentenceS06,
  s07: SentenceS07, s08: SentenceS08, s09: SentenceS09, s10: SentenceS10, s11: SentenceS11,
  s12: SentenceS12, s13: SentenceS13, s14: SentenceS14, s15: SentenceS15,
  s16: SentenceS16, s17: SentenceS17, s18: SentenceS18, s19: SentenceS19,
  s20: SentenceS20, s21: SentenceS21, s22: SentenceS22,
  s23: SentenceS23, s24: SentenceS24, s25: SentenceS25, s26: SentenceS26,
  s27: SentenceS27, s28: SentenceS28,
};

// Keyword color map per CLAUDE.md — gold(nhấn/cơ hội), green(positive), red(pain), purple(brand)
const GLOBAL_KEYWORDS: Record<string, string> = {
  "tiền": COLORS.gold, "kiên": COLORS.purple, "nhẫn": COLORS.purple,
  "chờ": COLORS.gold, "đợi": COLORS.gold, "đúng": COLORS.gold,
  "thời": COLORS.gold, "điểm": COLORS.gold, "cơ": COLORS.gold, "hội": COLORS.gold,
  "pivotal": COLORS.gold, "vị": COLORS.gold, "thế": COLORS.gold,
  "bận": COLORS.red, "rộn": COLORS.red, "nhầm": COLORS.red, "cảm": COLORS.red,
  "xúc": COLORS.red, "sai": COLORS.red, "lầm": COLORS.red, "khó": COLORS.red,
  "kế": COLORS.green, "hoạch": COLORS.green, "chuẩn": COLORS.green, "bị": COLORS.green,
  "kfsp": COLORS.purple, "kfs": COLORS.purple,
};

export const SentenceShell: React.FC<{
  sentenceId: string;
  withAudio?: boolean;
  showSubtitle?: boolean;
}> = ({ sentenceId, withAudio = true, showSubtitle = true }) => {
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
      <Background />
      {Comp ? <Comp sentence={sentence} /> : null}
      <Logo />
      {showSubtitle && (
        <SubtitleBar sentence={sentence} keywordColors={GLOBAL_KEYWORDS} />
      )}
      {withAudio && (
        <Audio
          src={staticFile(AUDIO_FILE)}
          startFrom={absStartFrame(sentence)}
        />
      )}
    </AbsoluteFill>
  );
};

// Per-sentence Composition wrapper: ProgressBar at top level (absolute frame).
export const SentenceCompo: React.FC<{ sentenceId: string }> = ({ sentenceId }) => (
  <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
    <SentenceShell sentenceId={sentenceId} />
    <ProgressBar />
  </AbsoluteFill>
);
