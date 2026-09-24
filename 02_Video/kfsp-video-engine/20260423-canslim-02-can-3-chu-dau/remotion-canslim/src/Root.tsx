import React from "react";
import "./style.css";
import { Composition } from "remotion";
import { VIDEO } from "./design";
import data from "./sentences.data.json";
import { SceneFrame } from "./components/SceneFrame";
import { VISUALS } from "./visuals";
import type { WordTS } from "./components/Subtitle";
import { Full } from "./Full";

const COMMON = {
  fps: VIDEO.fps,
  width: VIDEO.width,
  height: VIDEO.height,
};

const FPS = VIDEO.fps;

type SentenceData = {
  id: string;
  phase: string;
  duration_s: number;
  pause_after_ms: number;
  main_idea: string;
  enum_items: string[] | null;
  display: string;
  audio: string;
  words: WordTS[];
};

const SENTENCES: SentenceData[] = data.sentences as SentenceData[];

// Highlight words map per phase
const highlightWordsForSentence = (s: SentenceData): { words: string[]; color: string } => {
  const main = (s.main_idea || "").toLowerCase();
  if (s.phase === "HOOK") return { words: ["thủ", "thư", "viện", "kỳ", "vọng", "tương", "lai", "can"], color: "#f5c542" };
  if (s.phase === "CTA") return { words: ["kfs", "b", "bio", "bai-ô", "slim", "follow", "theo", "dõi"], color: "#34d399" };
  if (main.includes("đứng im") || main.includes("callback")) return { words: ["đứng", "im", "yếu", "tố", "mới"], color: "#f87171" };
  if (main.includes("ham muốn")) return { words: ["ham", "muốn"], color: "#f87171" };
  if (main.includes("bình thường") || main.includes("không phải lỗi") || main.includes("hành trình") || main.includes("sắc dần") || main.includes("pro liền")) {
    return { words: ["bình", "thường", "không", "phải", "lỗi", "hành", "trình", "lâu", "dài", "pro"], color: "#34d399" };
  }
  if (main.includes("ngắn hạn") || main.includes("vấn đề")) return { words: ["ngắn", "hạn", "vấn", "đề"], color: "#f5a142" };
  if (main.includes("kfsp") || main.includes("ca ") || main.includes("chỉ tiêu") || main.includes("recap") || main.includes("c:") || main.includes("a:")) {
    return { words: ["kfsp", "doanh", "thu", "eps", "roe", "25", "phần", "trăm", "ba", "năm", "quý"], color: "#a78bfa" };
  }
  return { words: ["yếu", "tố", "mới", "kỳ", "vọng", "niềm", "tin", "xúc", "tác"], color: "#34d399" };
};

const bgVariantForSentence = (s: SentenceData): "default" | "warm" | "dim" | "cinematic" => {
  if (s.phase === "HOOK" && (s.id === "s01")) return "cinematic";
  if (s.id === "s17") return "dim";
  if (s.id === "s18" || s.id === "s19" || s.id === "s20") return "cinematic";
  // Empathy = warm
  if (["s21", "s22", "s23", "s24", "s25", "s26", "s27", "s28", "s29", "s30"].includes(s.id)) return "warm";
  return "default";
};

const SceneFor: React.FC<{ s: SentenceData }> = ({ s }) => {
  const Visual = VISUALS[s.id];
  const hl = highlightWordsForSentence(s);
  return (
    <SceneFrame
      id={s.id}
      phase={s.phase}
      audioPath={s.audio}
      durationSec={s.duration_s}
      words={s.words}
      displayText={s.display}
      highlightWords={hl.words}
      highlightColor={hl.color}
      bgVariant={bgVariantForSentence(s)}
    >
      {Visual ? <Visual words={s.words} /> : null}
    </SceneFrame>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master Full composition */}
      <Composition
        id="Full"
        component={Full}
        durationInFrames={Math.ceil(
          SENTENCES.reduce((sum, s) => sum + s.duration_s + s.pause_after_ms / 1000, 0) * FPS,
        )}
        {...COMMON}
      />

      {/* Per-sentence compositions */}
      {SENTENCES.map((s) => {
        const Comp: React.FC = () => <SceneFor s={s} />;
        return (
          <Composition
            key={s.id}
            id={`Sentence-${s.id}`}
            component={Comp}
            durationInFrames={Math.max(2, Math.ceil(s.duration_s * FPS))}
            {...COMMON}
          />
        );
      })}
    </>
  );
};
