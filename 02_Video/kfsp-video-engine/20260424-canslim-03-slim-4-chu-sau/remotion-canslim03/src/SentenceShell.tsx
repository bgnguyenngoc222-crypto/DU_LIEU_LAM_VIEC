import React from "react";
import { AbsoluteFill, Audio, Freeze, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONTS, LAYOUT, PHASE_ACCENT } from "./design";
import type { Sentence } from "./types";

import { Background } from "./components/Background";
import { Logo } from "./components/Logo";
import { PhaseHeader } from "./components/PhaseHeader";
import { ProgressBar } from "./components/ProgressBar";
import { SubtitleBar } from "./components/SubtitleBar";
import { MainIdea } from "./components/MainIdea";
import { EnumPills } from "./components/EnumPills";
import { LetterCard } from "./components/LetterCard";
import { SLIMLetter } from "./components/SLIMLetter";
import { CanslimLetters } from "./components/CanslimLetters";
import { QuoteCard } from "./components/QuoteCard";
import { ThreePanels } from "./components/ThreePanels";

interface Props {
  sentence: Sentence;
  /** Sentence playback length in frames. When the parent Sequence is longer
   * (FullPreview adds pause_after_ms), frames past this value freeze the
   * visuals at the last sentence frame and mute audio — prevents black flash
   * between sentences. Omit for standalone per-sentence Compositions. */
  sentenceFrames?: number;
  /** Skip rendering the karaoke SubtitleBar — used by FullPreviewNoSub for
   * raw exports where subs will be added later by an editor/platform. */
  hideSubtitle?: boolean;
}

/**
 * Visual recipe per sentence id. Returns the central visual element(s) layered
 * between Background and SubtitleBar/ProgressBar.
 */
function SentenceVisual({ sentence: s }: Props) {
  const accent = PHASE_ACCENT[s.phase] ?? COLORS.presentGold;
  const main = s.main_idea;
  const enums = s.enum_items ?? [];
  const words = s.word_timestamps;

  switch (s.id) {
    case "s01":
      return (
        <QuoteCard
          english={`Yesterday is history, tomorrow is a mystery, but today is a gift — that's why it's called the present.`}
          highlightWord="present"
          topY={620}
        />
      );

    case "s02":
      return (
        <>
          <MainIdea text="Hôm qua. Ngày mai. Hôm nay." accent={accent} centerY={620} fontSize={62} />
          <ThreePanels topY={920} />
        </>
      );

    case "s03":
      return (
        <>
          <MainIdea text='"present"' accent={COLORS.presentGold} centerY={560} fontSize={140} />
          <EnumPills items={["MÓN QUÀ 🎁", "HIỆN TẠI ⏱"]} words={words} accent={accent} topY={780} />
        </>
      );

    case "s04":
      return <CanslimLetters highlight="ALL" topY={680} />;

    case "s05":
      // CAN cho bạn quá khứ và tương lai → C, A = past (gray); N = future (sky blue)
      return (
        <>
          <CanslimLetters
            highlight="CAN"
            letterColors={{
              C: COLORS.pastGray,
              A: COLORS.pastGray,
              N: COLORS.futureLight,
            }}
            topY={540}
          />
          <ThreePanels active={["past", "future"]} topY={840} />
        </>
      );

    case "s06":
      return (
        <>
          <CanslimLetters highlight="SLIM" accent={COLORS.presentGold} topY={540} />
          <ThreePanels active="present" topY={840} />
        </>
      );

    case "s07":
      return (
        <>
          <MainIdea text="MÓN QUÀ" accent={COLORS.presentGold} centerY={560} fontSize={180} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 800,
              fontFamily: FONTS.family,
              fontSize: 42,
              color: COLORS.textSecondary,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            thị trường đang đặt trước mặt bạn — ngay lúc này
          </div>
        </>
      );

    case "s08":
      // 4 dấu chân thị trường — 4 cards with full Happy Live names
      return (
        <>
          <MainIdea text="4 dấu chân thị trường" accent={accent} centerY={500} fontSize={68} />
          <div
            style={{
              position: "absolute",
              left: 60,
              right: 60,
              top: 720,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            {[
              { L: "S", vn: "Cung & Cầu", en: "Supply / Demand", c: COLORS.green },
              { L: "L", vn: "Dẫn dắt", en: "Leader / Laggard", c: COLORS.presentGold },
              { L: "I", vn: "Tổ chức", en: "Institutional", c: COLORS.purple },
              { L: "M", vn: "Thị trường", en: "Market Direction", c: COLORS.blue },
            ].map(({ L, vn, en, c }) => (
              <div
                key={L}
                style={{
                  padding: "26px 22px",
                  borderRadius: 22,
                  background: COLORS.bgGlass,
                  border: `2px solid ${c}66`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 8,
                  boxShadow: `0 0 24px ${c}22`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.family,
                    fontSize: 84,
                    fontWeight: 800,
                    color: c,
                    lineHeight: 0.95,
                    textShadow: `0 0 20px ${c}55`,
                  }}
                >
                  {L}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.family,
                    fontSize: 32,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                  }}
                >
                  {vn}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.family,
                    fontSize: 22,
                    fontWeight: 500,
                    color: COLORS.textSecondary,
                    fontStyle: "italic",
                  }}
                >
                  {en}
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case "s09":
      return (
        <SLIMLetter
          letter="S"
          accent={accent}
          englishName="Supply and Demand"
          vietnameseName="Cung và Cầu"
          criteria={[
            "Volume TB vừa đủ: không quá thấp (bị kiểm soát), không quá đặc (giá khó tăng)",
            "Khi breakout: volume ≥ 40–50% MA50 → xác nhận cầu thật",
          ]}
        />
      );
    case "s12":
      return (
        <SLIMLetter
          letter="L"
          accent={accent}
          englishName="Leader or Laggard"
          vietnameseName="Dẫn dắt hay Lãng quên"
          criteria={[
            "RS Rating ≥ 80",
            "Vượt trội ≥ 80% thị trường trong 12 tháng",
          ]}
        />
      );
    case "s15":
      return (
        <SLIMLetter
          letter="I"
          accent={accent}
          englishName="Institutional Sponsorship"
          vietnameseName="Bảo trợ Tổ chức"
          criteria={[
            "Số quỹ sở hữu tăng 2–3 quý liên tiếp",
            "Ví dụ Apple: 286 → 316 → 321 quỹ",
          ]}
        />
      );
    case "s18":
      return (
        <SLIMLetter
          letter="M"
          accent={accent}
          englishName="Market Direction"
          vietnameseName="Xu hướng Thị trường"
          criteria={[
            "3/4 (75%) cổ phiếu đi theo xu hướng chung",
            "4–5 distribution day / 4–5 tuần ⇒ thị trường sắp sụp",
          ]}
        />
      );

    case "s10":
      return <MainIdea text="Ai đang mua / bán mạnh?" accent={accent} centerY={780} fontSize={86} />;

    case "s11":
      return (
        <>
          <MainIdea text="Volume xác nhận BREAKOUT" accent={accent} centerY={620} fontSize={70} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 820,
              fontFamily: FONTS.family,
              fontSize: 40,
              color: COLORS.textSecondary,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            giá bứt phá + KL tăng đột biến = dòng tiền thật
          </div>
        </>
      );

    case "s13":
      return (
        <>
          <MainIdea text="Dẫn đầu hay lay theo?" accent={accent} centerY={620} fontSize={78} />
          <EnumPills items={["DẪN ĐẦU 🥇", "LAY THEO 👣"]} words={words} accent={accent} topY={860} />
        </>
      );

    case "s14":
      return (
        <>
          <MainIdea text="Mua LEADER" accent={accent} centerY={560} fontSize={140} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 800,
              fontFamily: FONTS.family,
              fontSize: 42,
              color: COLORS.textSecondary,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            xác suất thắng cao hơn rất nhiều
          </div>
          <div
            style={{
              position: "absolute",
              left: 60,
              right: 60,
              top: 920,
              padding: "26px 24px",
              background: COLORS.bgGlass,
              border: `2px dashed ${accent}66`,
              borderRadius: 18,
              fontFamily: FONTS.family,
              fontSize: 30,
              color: COLORS.textMuted,
              textAlign: "center",
            }}
          >
            [B3: chèn screenshot KFSP RS rating ở đây]
          </div>
        </>
      );

    case "s16":
      return (
        <>
          <MainIdea text="Quỹ lớn / cá mập đang gom?" accent={accent} centerY={620} fontSize={70} />
          <EnumPills items={["QUỸ LỚN 🏦", "CÁ MẬP 🦈"]} words={words} accent={accent} topY={860} />
        </>
      );

    case "s17":
      return (
        <MainIdea text="Họ vào = họ tin" accent={accent} centerY={780} fontSize={120} />
      );

    case "s19":
      return (
        <>
          <MainIdea text="VN-Index lên hay xuống?" accent={accent} centerY={620} fontSize={72} />
          <EnumPills items={["ĐANG LÊN ↑", "ĐANG XUỐNG ↓"]} words={words} accent={accent} topY={860} />
        </>
      );

    case "s20":
      return (
        <>
          <MainIdea text="75%" accent={COLORS.red} centerY={560} fontSize={280} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 820,
              fontFamily: FONTS.family,
              fontSize: 42,
              color: COLORS.textSecondary,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            cổ phiếu rơi theo sóng giảm chung
          </div>
        </>
      );

    case "s21":
      return (
        <>
          <MainIdea text="M quan trọng nhất" accent={accent} centerY={620} fontSize={84} />
          <div
            style={{
              position: "absolute",
              left: 60,
              right: 60,
              top: 820,
              padding: "20px 28px",
              background: COLORS.bgGlass,
              border: `1px solid ${COLORS.bgGlassBorder}`,
              borderRadius: 18,
              fontFamily: FONTS.family,
              fontSize: 30,
              color: COLORS.textSecondary,
              textAlign: "center",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            — William J. O'Neil
          </div>
        </>
      );

    case "s22":
      return (
        <>
          <div
            style={{
              position: "absolute",
              left: 60,
              right: 60,
              top: 540,
              padding: "60px 40px",
              background: `${COLORS.red}10`,
              border: `3px solid ${COLORS.red}`,
              borderRadius: 32,
              textAlign: "center",
              boxShadow: `0 0 80px ${COLORS.red}40`,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.family,
                fontSize: 88,
                fontWeight: 800,
                lineHeight: 1.05,
                color: COLORS.textPrimary,
                letterSpacing: "-0.02em",
              }}
            >
              THỊ TRƯỜNG{" "}
              <span style={{ color: COLORS.red }}>ĐANG CÔNG NHẬN</span>
              {" "}cổ phiếu này?
            </div>
          </div>
        </>
      );

    // s23 removed (no longer teasing deep-dive of each letter)

    case "s24":
      // CAN (past+future) + SLIM (present) callback
      return (
        <>
          <CanslimLetters
            highlight="ALL"
            letterColors={{
              C: COLORS.pastGray,
              A: COLORS.pastGray,
              N: COLORS.futureLight,
              S: COLORS.presentGold,
              L: COLORS.presentGold,
              I: COLORS.presentGold,
              M: COLORS.presentGold,
            }}
            topY={520}
          />
          <ThreePanels active={["past", "present", "future"]} topY={820} />
        </>
      );

    case "s25":
      // "vài bước" — abstract step flow, không cam kết số cụ thể
      return (
        <>
          <MainIdea text="Quy trình cho người mới" accent={accent} centerY={620} fontSize={66} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 880,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 22,
              fontFamily: FONTS.family,
              fontSize: 44,
              fontWeight: 700,
              color: accent,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ opacity: 0.55 }}>●</span>
            <span style={{ color: COLORS.textMuted, fontSize: 32 }}>→</span>
            <span style={{ opacity: 0.75 }}>●</span>
            <span style={{ color: COLORS.textMuted, fontSize: 32 }}>→</span>
            <span style={{ opacity: 0.95 }}>●</span>
            <span style={{ color: COLORS.textMuted, fontSize: 32 }}>→</span>
            <span
              style={{
                fontSize: 32,
                color: COLORS.textSecondary,
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              vài bước
            </span>
          </div>
        </>
      );

    case "s26":
      return (
        <>
          <MainIdea text="Theo dõi kênh nha 🔔" accent={accent} centerY={780} fontSize={76} />
        </>
      );

    case "s27":
      // Final CTA — punchy, no detail enum
      return (
        <>
          <CanslimLetters highlight="ALL" accent={COLORS.presentGold} topY={520} />
          <div
            style={{
              position: "absolute",
              left: 60,
              right: 60,
              top: 760,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.family,
                fontSize: 96,
                fontWeight: 800,
                color: COLORS.presentGold,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                textShadow: `0 0 60px ${COLORS.presentGold}55`,
              }}
            >
              Tải KFSP ngay
            </div>
            <div
              style={{
                marginTop: 22,
                fontFamily: FONTS.family,
                fontSize: 40,
                fontWeight: 600,
                color: COLORS.textPrimary,
                letterSpacing: "-0.005em",
              }}
            >
              Lọc cổ phiếu theo CANSLIM
            </div>
            <div
              style={{
                marginTop: 38,
                fontFamily: FONTS.family,
                fontSize: 34,
                color: COLORS.presentGold,
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              👇 link bio
            </div>
          </div>
        </>
      );

    default:
      return <MainIdea text={main} accent={accent} centerY={780} />;
  }
}

export const SentenceShell: React.FC<Props> = ({ sentence, sentenceFrames, hideSubtitle }) => {
  const accent = PHASE_ACCENT[sentence.phase] ?? COLORS.presentGold;
  const frame = useCurrentFrame();
  const sFrames = sentenceFrames ?? null;
  const isFrozen = sFrames !== null && frame >= sFrames;

  const visualLayers = (
    <>
      <Background phase={sentence.phase} />
      <Logo />
      <PhaseHeader phase={sentence.phase} />
      <SentenceVisual sentence={sentence} />
      {!hideSubtitle && (
        <SubtitleBar
          words={sentence.word_timestamps}
          displayText={sentence.display}
          accent={accent}
        />
      )}
      <ProgressBar accent={accent} totalFrames={sFrames ?? undefined} />

      {/* Debug overlay (top-left) — remove for final render */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 14,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 14,
          color: "rgba(255,255,255,0.25)",
          zIndex: 100,
        }}
      >
        {sentence.id} · {sentence.phase} · {sentence.main_idea}
      </div>
    </>
  );

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONTS.family }}>
      {isFrozen ? (
        <Freeze frame={(sFrames as number) - 1}>{visualLayers}</Freeze>
      ) : (
        visualLayers
      )}

      {/* Audio plays only during the sentence's own duration. Past
       * sentenceFrames the file is exhausted anyway; we still gate it via
       * endAt to be explicit. In standalone mode (sFrames=null) audio plays
       * the full Composition. */}
      {!isFrozen && (
        <Audio
          src={staticFile(`audio/${sentence.id}.mp3`)}
          endAt={sFrames ?? undefined}
        />
      )}
    </AbsoluteFill>
  );
};
