import { AbsoluteFill, Audio, staticFile } from "remotion";
import { SENTENCE_BY_ID } from "./data";
import { ProgressBar } from "./components/ProgressBar";
import { COLORS } from "./design";

import { SentenceS01, SentenceS02 } from "./sentences/Hook";
import { SentenceS03 } from "./sentences/Painpoint";
import { SentenceS04, SentenceS05, SentenceS06 } from "./sentences/Bridge";
import {
  SentenceS07,
  SentenceS08,
  SentenceS09,
  SentenceS10,
  SentenceS11,
} from "./sentences/Q1";
import {
  SentenceS12,
  SentenceS13,
  SentenceS14,
  SentenceS15,
  SentenceS16,
} from "./sentences/Q2";
import {
  SentenceS17,
  SentenceS18,
  SentenceS19,
  SentenceS20,
  SentenceS21,
  SentenceS22,
} from "./sentences/Q3";
import { SentenceS23, SentenceS24, SentenceS25 } from "./sentences/CTA";
import { PlaceholderSentence } from "./sentences/Placeholder";
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
  s18: SentenceS18,
  s19: SentenceS19,
  s20: SentenceS20,
  s21: SentenceS21,
  s22: SentenceS22,
  s23: SentenceS23,
  s24: SentenceS24,
  s25: SentenceS25,
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
  const Comp = REGISTRY[sentenceId] ?? PlaceholderSentence;
  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
      <Comp sentence={sentence} />
      <Audio src={staticFile(`audio/${sentence.id}.mp3`)} />
    </AbsoluteFill>
  );
};

export const SentenceCompo: React.FC<{ sentenceId: string }> = ({ sentenceId }) => (
  <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
    <SentenceShell sentenceId={sentenceId} />
    <ProgressBar />
  </AbsoluteFill>
);
