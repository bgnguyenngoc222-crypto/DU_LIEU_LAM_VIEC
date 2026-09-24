import { AbsoluteFill, Img, staticFile, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import React from "react";
import { COLORS, FONTS, SPRINGS } from "../design";
import { ScreenContainer } from "../components/ui/ScreenContainer";

// ═══════════════════════════════════════════
// Scene 5 — ACTION (scene-relative 0-330, s13 → s16 theo sentences.json mới)
//
// Sentence → scene-frame offsets (approx):
//   s13 "5 giây nắm sơ bộ"   offset 0,   dur 124f  → PHASE_RADAR
//   s14 "tooltip xem chi tiết" offset 132, dur 75f  → PHASE_TOOLTIP
//   s15 "cánh cửa FA"         offset 218, dur 58f  → PHASE_PROMISE
//   s16 "link tải bio"        offset 286, dur 43f  → PHASE_BOLOC_CTA
//
// Changes (Thanh's request):
//   - Screenshots (S1 radar, S2 tooltip) đưa lên s13-s14 (was in s14-s15 before)
//   - Bỏ door opening ở cuối s16
//   - s16 zoom S6_boloc_kfsp để khoe bộ lọc có điểm 4M/CANSLIM nhiều mã
//   - Thêm "Hẹn video sau: 11 tiêu chí KFSP" tease
// ═══════════════════════════════════════════

const PHASE_TOOLTIP = 130;
const PHASE_PROMISE = 210;
const PHASE_BOLOC_CTA = 280;

export const ActionScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: COLORS.bgSecondary, overflow: "hidden" }}>
      {frame < PHASE_TOOLTIP && <RadarFiveSec frame={frame} />}
      {frame >= PHASE_TOOLTIP && frame < PHASE_PROMISE && (
        <TooltipPhase frame={frame} startFrame={PHASE_TOOLTIP} />
      )}
      {/* s15 + s16 share cùng 1 background — S6_boloc zoom in dần suốt 2 câu */}
      {frame >= PHASE_PROMISE && (
        <BolocPromiseCtaPhase frame={frame} startFrame={PHASE_PROMISE} />
      )}
    </AbsoluteFill>
  );
};

// ─── Phase 1: s13 — S1 radar + "5 GIÂY" counter (screenshot)
const RadarFiveSec: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const phoneProg = spring({ frame, fps, config: SPRINGS.calm });

  // 5 second tick (each tick at 22f — 22/30≈0.73s; 5 ticks ~ 110f, fits in 124f duration)
  const ticks = Math.min(5, Math.floor(frame / 22));

  return (
    <>
      <ScreenContainer prog={phoneProg} width={920} height={978} top={380} radius={20}>
        <Img
          src={staticFile("images/fa/S1_radar_crop.png")}
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
        />
      </ScreenContainer>

      {/* "5 GIÂY" counter badge, top */}
      <div
        style={{
          position: "absolute",
          top: 305,
          zIndex: 20,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: phoneProg,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            background: COLORS.accentGold,
            color: "#0A1628",
            padding: "12px 32px",
            borderRadius: 40,
            fontSize: 48,
            fontWeight: 900,
            boxShadow: "0 8px 30px rgba(245, 197, 66, 0.5)",
          }}
        >
          <span style={{ minWidth: 40, textAlign: "center" }}>{ticks}</span>
          GIÂY
        </div>
      </div>
    </>
  );
};

// ─── Phase 2: s14 — S2 tooltip (screenshot)
const TooltipPhase: React.FC<{ frame: number; startFrame: number }> = ({ frame, startFrame }) => {
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;
  const phoneProg = spring({ frame: localFrame, fps, config: SPRINGS.decisive });
  const labelProg = spring({ frame: localFrame - 15, fps, config: SPRINGS.resolve });

  return (
    <>
      <ScreenContainer prog={phoneProg} width={480} height={1040} top={320} radius={28}>
        <Img
          src={staticFile("images/fa/S2_tooltip_4m.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
      </ScreenContainer>
      {/* "Điểm thành phần" label dưới */}
      <div
        style={{
          position: "absolute",
          top: 1300,
          zIndex: 20,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: labelProg,
          transform: `scale(${labelProg})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: COLORS.accentGold,
            color: "#0A1628",
            padding: "10px 28px",
            borderRadius: 30,
            fontSize: 36,
            fontWeight: 900,
            boxShadow: "0 6px 20px rgba(245, 197, 66, 0.5)",
          }}
        >
          ✦ ĐIỂM THÀNH PHẦN
        </div>
      </div>
    </>
  );
};

// ─── Phase 3+4 UNIFIED: s15 + s16 — 2 app store screenshots from START
// Timeline (localFrame):
//   0-68   s15 "Cánh cửa vào FA / cho người mới" — 2 stores + promise text
//   68-113 s16 audio "Link tải ở bio nha" — 2 stores + tease banner + CTA
//   113-208 s16 TAIL 3s — continue with 2 stores visible, CTA STILL
const BolocPromiseCtaPhase: React.FC<{ frame: number; startFrame: number }> = ({
  frame,
  startFrame,
}) => {
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const S16_START = 68;

  // Store screenshots appear ngay từ đầu, stagger iOS → Android
  const storeIosProg = spring({ frame: localFrame, fps, config: SPRINGS.decisive });
  const storeAndroidProg = spring({ frame: localFrame - 10, fps, config: SPRINGS.decisive });

  // s15 promise text
  const promise1Prog = spring({ frame: localFrame - 18, fps, config: SPRINGS.decisive });
  const promise2Prog = spring({ frame: localFrame - 28, fps, config: SPRINGS.decisive });
  const promiseFadeOut = interpolate(
    localFrame,
    [S16_START - 10, S16_START + 4],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // s16 tease banner + CTA
  const teaseProg = spring({ frame: localFrame - S16_START, fps, config: SPRINGS.resolve });
  const ctaProg = spring({ frame: localFrame - S16_START - 10, fps, config: SPRINGS.decisive });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #FFFFFF, #F3F0F8)",
      }}
    >
      {/* Title "Tải KFSP ngay" — TOP (vị trí ổn định suốt phase) */}
      <div
        style={{
          position: "absolute",
          top: 310,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 25,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.family,
            fontSize: 64,
            fontWeight: 900,
            color: COLORS.purpleDark,
            letterSpacing: 1,
            textShadow: "0 2px 6px rgba(124,58,237,0.2)",
          }}
        >
          Tải KFSP ngay
        </div>
      </div>

      {/* 2 app store screenshots side-by-side — show from start */}
      <div
        style={{
          position: "absolute",
          top: 430,
          left: 40,
          right: 40,
          display: "flex",
          justifyContent: "center",
          gap: 30,
          zIndex: 20,
        }}
      >
        {/* iOS */}
        <div
          style={{
            width: 480,
            borderRadius: 28,
            overflow: "hidden",
            boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
            opacity: storeIosProg,
            transform: `translateY(${(1 - storeIosProg) * 40}px) scale(${storeIosProg})`,
          }}
        >
          <Img
            src={staticFile("images/stores/appstore_ios.jpg")}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        {/* Android */}
        <div
          style={{
            width: 480,
            borderRadius: 28,
            overflow: "hidden",
            boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
            opacity: storeAndroidProg,
            transform: `translateY(${(1 - storeAndroidProg) * 40}px) scale(${storeAndroidProg})`,
          }}
        >
          <Img
            src={staticFile("images/stores/playstore_android.jpg")}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      {/* s15 promise text — fade in dưới 2 hình rồi fade out khi vào s16 */}
      {localFrame < S16_START + 8 && (
        <div
          style={{
            position: "absolute",
            top: 1200,
            left: 40,
            right: 40,
            textAlign: "center",
            opacity: promiseFadeOut,
            zIndex: 22,
          }}
        >
          <div
            style={{
              background: "rgba(10, 22, 40, 0.92)",
              padding: "16px 26px",
              borderRadius: 18,
              boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
              display: "inline-block",
            }}
          >
            <div
              style={{
                fontSize: 46,
                fontWeight: 900,
                color: "#FFFFFF",
                opacity: promise1Prog,
                transform: `scale(${promise1Prog})`,
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              Cánh cửa vào FA
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: COLORS.accentGold,
                opacity: promise2Prog,
                transform: `scale(${promise2Prog})`,
                textShadow: "0 0 14px rgba(245, 197, 66, 0.6)",
                lineHeight: 1.1,
              }}
            >
              cho người mới
            </div>
          </div>
        </div>
      )}

      {/* s16 tease banner — trên đầu title (slot khác) */}
      {localFrame >= S16_START - 4 && (
        <div
          style={{
            position: "absolute",
            top: 1200,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: teaseProg,
            transform: `translateY(${(1 - teaseProg) * 10}px)`,
            zIndex: 25,
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(124, 58, 237, 0.95)",
              color: "#FFFFFF",
              padding: "10px 24px",
              borderRadius: 24,
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 0.8,
              boxShadow: "0 6px 20px rgba(124, 58, 237, 0.5)",
            }}
          >
            Hẹn video sau: 11 tiêu chí KFSP
          </div>
        </div>
      )}

      {/* CTA "↑ Link tải ở bio" — bottom, visible s16 + tail */}
      {localFrame >= S16_START - 4 && (
        <div
          style={{
            position: "absolute",
            top: 1300,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: ctaProg,
            zIndex: 30,
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: COLORS.accentGold,
              color: "#0A1628",
              padding: "14px 36px",
              borderRadius: 40,
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: 1,
              boxShadow: "0 10px 30px rgba(245, 197, 66, 0.55)",
            }}
          >
            ↑ Link tải ở bio
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
