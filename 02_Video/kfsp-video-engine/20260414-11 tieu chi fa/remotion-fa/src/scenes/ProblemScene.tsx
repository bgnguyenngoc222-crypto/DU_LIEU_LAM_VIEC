import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame, spring, useVideoConfig, interpolate, Easing } from "remotion";
import React from "react";
import { COLORS, FONTS, SPRINGS } from "../design";
import { ScreenContainer } from "../components/ui/ScreenContainer";

// ═══════════════════════════════════════════
// Scene 2 — PROBLEM (f500-f1050, 18.4s, scene relative 0-550)
// Emotional arc: Confusion → Overwhelm
//
// Phases (scene-relative) — canh theo Whisper voiceover.json:
//   0-310   R1 news feed scroll + 3 markers (P/E rẻ @18.6s, ROE cao @20.4s, biên LN @21.8s)
//   310-490 R3 BCTC scroll (zoom in nhiều) + counter "200 dòng" @29.4s + "50 chỉ số" @30.5s
//   490-550 3 dấu hỏi tay + "Không biết bắt đầu" @33s
// ═══════════════════════════════════════════

// Sentence-driven timing (after merging old s04+s05 → new merged s04):
//   new s04 offset vs scene = 250 (scene-relative frame khi s04 composition frame=0)
//   new s04 duration = 281 frames (9.35s)
//   PHASE_BCTC = 250 → BCTC video start ngay từ đầu new s04
//   PHASE_DOZE = 460 → "đơ luôn" bắt đầu (word "đơn" @ 32s global = scene 460)
//   PHASE_DOUBT = 490 → "không biết bắt đầu" (word "không" @ 33s global)
const PHASE_BCTC = 250;
const PHASE_DOZE = 460;
const PHASE_DOUBT = 490;

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone slide in
  const phoneProg = spring({
    frame: frame - 5,
    fps,
    config: SPRINGS.calm,
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bgSecondary, overflow: "hidden" }}>
      {/* Screenshot container — width thay đổi theo phase: news 540, BCTC 900 (mở rộng frame) */}
      {/* Phase 1: News feed scroll — 2 ảnh feed_pe + feed_roe stacked, translate Y liên tục
          Người xem cảm giác "đang lướt feed", không marker */}
      {frame < PHASE_BCTC && (
        <ScreenContainer prog={phoneProg} width={1000} height={1060} top={290} radius={32}>
          <FeedScroll frame={frame} />
        </ScreenContainer>
      )}

      {/* Video BCTC backdrop — chỉ show trong BCTC phase, dừng khi vào DOZE */}
      {frame >= PHASE_BCTC && frame < PHASE_DOZE && (
        <ScreenContainer prog={phoneProg} width={1000} height={1060} top={290} radius={32}>
          <div style={{ position: "absolute", inset: 0, filter: "blur(2px) brightness(0.55)" }}>
            <Sequence from={PHASE_BCTC} durationInFrames={70}>
              <OffthreadVideo
                src={staticFile("video/fa/R3_bctc_dcm.mp4")}
                startFrom={0}
                endAt={70}
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
              />
            </Sequence>
            <Sequence from={PHASE_BCTC + 70} durationInFrames={70}>
              <OffthreadVideo
                src={staticFile("video/fa/R3_bctc_dcm.mp4")}
                startFrom={390}
                endAt={460}
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
              />
            </Sequence>
            <Sequence from={PHASE_BCTC + 140} durationInFrames={70}>
              <OffthreadVideo
                src={staticFile("video/fa/R3_bctc_dcm.mp4")}
                startFrom={720}
                endAt={790}
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
              />
            </Sequence>
          </div>
        </ScreenContainer>
      )}

      {/* Info cards overwhelm — giữ show cả trong DOZE phase làm nền cho face confuse */}
      {frame >= PHASE_BCTC && (
        <InfoCardsOverwhelm sceneFrame={frame} />
      )}

      {/* Counter overlays — sync với Whisper word "200" @29.36s (scene 380), "50" @30.52s (scene 415).
          PHASE_BCTC=250 nên offset: 200 @ +130, 50 @ +165 */}
      {frame >= PHASE_BCTC + 130 && frame < PHASE_DOZE && (
        <CounterPill text="200 dòng" subtext="dữ liệu" frame={frame} startFrame={PHASE_BCTC + 130} />
      )}
      {frame >= PHASE_BCTC + 165 && frame < PHASE_DOZE && (
        <CounterPill
          text="50 chỉ số"
          subtext="phải đọc"
          frame={frame}
          startFrame={PHASE_BCTC + 165}
          rightSide
        />
      )}

      {/* "ĐƠ LUÔN" phase — face emoji + LoL pings liên tục.
          Che video BCTC bằng overlay tối, face to centered, ??? ping xung quanh */}
      {frame >= PHASE_DOZE && (
        <DozePhase frame={frame} startFrame={PHASE_DOZE} />
      )}

      {/* "Không biết bắt đầu từ đâu" — large red text overlay */}
      {frame >= PHASE_DOUBT + 30 && (
        <OverwhelmText frame={frame} startFrame={PHASE_DOUBT + 30} />
      )}
    </AbsoluteFill>
  );
};

const CounterPill: React.FC<{
  text: string;
  subtext: string;
  frame: number;
  startFrame: number;
  rightSide?: boolean;
}> = ({ text, subtext, frame, startFrame, rightSide }) => {
  const { fps } = useVideoConfig();
  const prog = spring({
    frame: frame - startFrame,
    fps,
    config: SPRINGS.resolve,
  });
  const pulse = 1 + Math.sin((frame - startFrame) * 0.3) * 0.04;

  return (
    <div
      style={{
        position: "absolute",
        [rightSide ? "right" : "left"]: 60,
        top: rightSide ? 1230 : 305,
        zIndex: 20,
        opacity: prog,
        transform: `scale(${prog * pulse}) ${rightSide ? "rotate(3deg)" : "rotate(-3deg)"}`,
        transformOrigin: "center",
      }}
    >
      <div
        style={{
          background: COLORS.accentRed,
          color: "#fff",
          padding: "16px 32px",
          borderRadius: 16,
          boxShadow: "0 12px 30px rgba(239, 68, 68, 0.5)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1 }}>{text}</div>
        <div style={{ fontSize: 20, opacity: 0.9, marginTop: 4, letterSpacing: 1 }}>{subtext}</div>
      </div>
    </div>
  );
};

const DoubtMarks: React.FC<{ frame: number }> = ({ frame }) => {
  const positions = [
    { left: "30%", top: "25%", delay: 0 },
    { left: "65%", top: "50%", delay: 18 },
    { left: "20%", top: "75%", delay: 36 },
  ];
  return (
    <>
      {positions.map((p, i) => {
        const localFrame = frame - PHASE_DOUBT - p.delay;
        if (localFrame < 0) return null;
        const scale = Math.min(1, localFrame / 12);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              fontSize: 80,
              fontWeight: 900,
              color: COLORS.accentRed,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${(i % 2 === 0 ? -8 : 8)}deg)`,
              textShadow: "0 4px 12px rgba(239, 68, 68, 0.5)",
            }}
          >
            ?
          </div>
        );
      })}
    </>
  );
};

const OverwhelmText: React.FC<{ frame: number; startFrame: number }> = ({ frame, startFrame }) => {
  const { fps } = useVideoConfig();
  const prog = spring({
    frame: frame - startFrame,
    fps,
    config: SPRINGS.heavy,
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 1290,
        left: 0,
        right: 0,
        zIndex: 20,
        textAlign: "center",
        opacity: prog,
        transform: `translateY(${(1 - prog) * 30}px)`,
      }}
    >
      <div
        style={{
          ...FONTS.heading,
          fontSize: 56,
          color: COLORS.accentRed,
          fontWeight: 900,
          textShadow: "0 4px 16px rgba(239, 68, 68, 0.4)",
        }}
      >
        Không biết bắt đầu từ đâu
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// FeedScroll — 2 ảnh feed_pe + feed_roe stacked theo chiều dọc,
// translate Y liên tục (cảm giác lướt feed).
// Scene frame 0-310 (s03), không marker.
// ═══════════════════════════════════════════
const FeedScroll: React.FC<{ frame: number }> = ({ frame }) => {
  // Ảnh gốc: feed_pe 1188x1586 (aspect 0.749), feed_roe 1176x1570 (aspect 0.749)
  // Container gần full-width: 1000w × 1060h (top 290 → bottom 1350).
  // Image displayed at width=100% = 1000px → height = 1000/0.749 ≈ 1335 mỗi ảnh.
  // Tổng stacked: ~2670. Container 1060 → scroll range ~1610.
  const CONTAINER_H = 1060;
  const IMG_H = 1335;
  const TOTAL_H = IMG_H * 2;
  const SCROLL_RANGE = TOTAL_H - CONTAINER_H; // ~1610

  // Scroll CHẬM HƠN: stay 0-30, scroll 30-230 reach ~80% range, stay 230+
  // s03 tổng ~256 frames. Cho cảm giác "lướt feed đọc từng tin".
  const y = interpolate(
    frame,
    [0, 30, 230, 260],
    [0, 0, -SCROLL_RANGE * 0.85, -SCROLL_RANGE],
    {
      easing: Easing.bezier(0.4, 0.1, 0.3, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: `translateY(${y}px)`,
        }}
      >
        <Img
          src={staticFile("images/feed/feed_pe.png")}
          style={{ width: "100%", display: "block" }}
        />
        <Img
          src={staticFile("images/feed/feed_roe.png")}
          style={{ width: "100%", display: "block" }}
        />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// DozePhase — "Đơ luôn" phase: face emoji biểu cảm đơ + "??" ping LoL-style
// Render trên top của video BCTC (đè overlay tối + face to + spam ??? pings)
// ═══════════════════════════════════════════
const DozePhase: React.FC<{ frame: number; startFrame: number }> = ({ frame, startFrame }) => {
  const localFrame = frame - startFrame;
  if (localFrame < 0) return null;

  // Dark overlay fade-in phủ video
  const overlayOpacity = Math.min(0.75, localFrame / 10 * 0.75);

  // Face emoji pop-in + bubble pulse (phập phồng to nhỏ chậm)
  const popIn = Math.min(1, localFrame / 10);
  const bubblePulse = 1 + Math.sin(localFrame * 0.16) * 0.08; // biên độ 0.92 ↔ 1.08
  const faceScale = popIn * bubblePulse;

  // LoL pings — 7 vị trí xung quanh face, flash rapid theo pattern khác nhau
  const pingPositions = [
    { left: "18%", top: "18%", delay: 6 },
    { left: "78%", top: "22%", delay: 12 },
    { left: "12%", top: "50%", delay: 18 },
    { left: "82%", top: "48%", delay: 24 },
    { left: "22%", top: "78%", delay: 30 },
    { left: "76%", top: "74%", delay: 36 },
    { left: "50%", top: "14%", delay: 42 },
  ];

  return (
    <AbsoluteFill style={{ zIndex: 25 }}>
      {/* Dark overlay */}
      <AbsoluteFill style={{ background: `rgba(10, 8, 20, ${overlayOpacity})` }} />

      {/* Face emoji centered */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontSize: 220,
            transform: `scale(${faceScale})`,
            transformOrigin: "center",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.6))",
            lineHeight: 1,
          }}
        >
          😵‍💫
        </div>
      </div>

      {/* LoL-style ??? pings xung quanh */}
      {pingPositions.map((p, i) => (
        <LoLPing
          key={i}
          localFrame={localFrame - p.delay}
          left={p.left}
          top={p.top}
          index={i}
        />
      ))}
    </AbsoluteFill>
  );
};

// Single LoL ping — "?" vàng + ring expand + repeat loop
const LoLPing: React.FC<{ localFrame: number; left: string; top: string; index: number }> = ({
  localFrame,
  left,
  top,
  index,
}) => {
  if (localFrame < 0) return null;
  const CYCLE = 24; // frames per ping cycle
  const cyclePhase = localFrame % CYCLE;
  const ringProg = cyclePhase / CYCLE; // 0→1
  const ringScale = 0.4 + ringProg * 1.4; // 0.4 → 1.8
  const ringOpacity = 1 - ringProg; // 1 → 0
  const textScale = cyclePhase < 8 ? 1 + cyclePhase / 8 * 0.3 : 1.3 - (cyclePhase - 8) / 16 * 0.3;
  const textOpacity = cyclePhase < 18 ? 1 : 1 - (cyclePhase - 18) / 6;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        transform: "translate(-50%, -50%)",
        zIndex: 35,
        pointerEvents: "none",
      }}
    >
      {/* Expanding ring */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 160,
          height: 160,
          marginLeft: -80,
          marginTop: -80,
          borderRadius: "50%",
          border: "4px solid #FCD34D",
          transform: `scale(${ringScale})`,
          opacity: ringOpacity * 0.8,
        }}
      />
      {/* "?" text */}
      <div
        style={{
          fontSize: 120,
          fontWeight: 900,
          color: "#FCD34D",
          textShadow: "0 0 20px rgba(252, 211, 77, 0.9), 0 4px 8px rgba(0, 0, 0, 0.5)",
          transform: `scale(${textScale}) rotate(${(index % 2 === 0 ? -10 : 10)}deg)`,
          opacity: textOpacity,
          lineHeight: 1,
          fontFamily: "sans-serif",
        }}
      >
        ?
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// BCTCSections — 3 đoạn video R3 ở speed thường:
//   0-70f (2.3s):   BCTC (từ video 0s)
//   70-140f (2.3s): Chỉ tiêu TC (từ video 13s)
//   140-210f (2.3s): Biểu đồ (từ video 24s)
// Transition: crossfade 6f giữa các đoạn
// PHASE_BCTC=250 → PHASE_DOZE=460 (210 frames tổng)
// ═══════════════════════════════════════════
const BCTCSections: React.FC<{ frame: number }> = ({ frame }) => {
  const SEG1_END = 70;
  const SEG2_END = 140;
  const TRANS = 6;

  // Compute opacity for each segment (crossfade)
  const seg1Opacity = interpolate(
    frame,
    [0, 5, SEG1_END - TRANS, SEG1_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const seg2Opacity = interpolate(
    frame,
    [SEG1_END - TRANS, SEG1_END, SEG2_END - TRANS, SEG2_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const seg3Opacity = interpolate(
    frame,
    [SEG2_END - TRANS, SEG2_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Use Sequence with negative `from` so inner video thinks it started at 0.
  // objectFit=cover + objectPosition=center to show body of phone content (not just status bar).
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {seg1Opacity > 0 && (
        <Sequence from={0} layout="none">
          <div style={{ position: "absolute", inset: 0, opacity: seg1Opacity }}>
            <OffthreadVideo
              src={staticFile("video/fa/R3_bctc_dcm.mp4")}
              startFrom={0}
              endAt={120}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
            />
          </div>
        </Sequence>
      )}
      {seg2Opacity > 0 && (
        <Sequence from={SEG1_END - TRANS} layout="none">
          <div style={{ position: "absolute", inset: 0, opacity: seg2Opacity }}>
            <OffthreadVideo
              src={staticFile("video/fa/R3_bctc_dcm.mp4")}
              startFrom={390}
              endAt={510}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
            />
          </div>
        </Sequence>
      )}
      {seg3Opacity > 0 && (
        <Sequence from={SEG2_END - TRANS} layout="none">
          <div style={{ position: "absolute", inset: 0, opacity: seg3Opacity }}>
            <OffthreadVideo
              src={staticFile("video/fa/R3_bctc_dcm.mp4")}
              startFrom={720}
              endAt={840}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
            />
          </div>
        </Sequence>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// InfoCardsOverwhelm — 16 cards pop lên ầm ầm, tăng dần mật độ
// Mỗi card: label nhỏ + value to, xoay lệch 3-8°, pop spring heavy.
// Stay ~80f không fade (stack lên để tạo feel "quá nhiều số").
// popAt = scene_frame - PHASE_BCTC (0-210)
// ═══════════════════════════════════════════
interface CardDef {
  label: string;
  value: string;
  unit: string;      // đơn vị: "tỷ", "%", "lần", "VND", "đ/cp", "vòng"
  color: string;
  popAt: number;     // relative to PHASE_BCTC
  x: number;         // left % (0-100)
  y: number;         // top % (0-100)
  rot: number;       // degrees
  size: "sm" | "md" | "lg";
}

const CARDS: CardDef[] = [
  // Wave 1 — 0-40f (slow start)
  { label: "Tổng tài sản",      value: "17,644", unit: "tỷ",    color: "#7C3AED", popAt: 5,   x: 22, y: 16, rot: -6, size: "md" },
  { label: "P/E",               value: "8.95",   unit: "lần",   color: "#3B82F6", popAt: 14,  x: 72, y: 22, rot: 5,  size: "md" },
  { label: "Doanh thu thuần",   value: "4,528",  unit: "tỷ",    color: "#10B981", popAt: 24,  x: 18, y: 58, rot: -4, size: "lg" },
  { label: "EPS",               value: "736",    unit: "đ/cp",  color: "#F59E0B", popAt: 34,  x: 68, y: 64, rot: 7,  size: "md" },
  // Wave 2 — 40-100f (medium)
  { label: "ROE",               value: "25.2",   unit: "%",     color: "#10B981", popAt: 44,  x: 42, y: 38, rot: -3, size: "lg" },
  { label: "BVPS",              value: "19,423", unit: "VND",   color: "#7C3AED", popAt: 52,  x: 28, y: 78, rot: 4,  size: "md" },
  { label: "Lợi nhuận ròng",    value: "390",    unit: "tỷ",    color: "#EF4444", popAt: 60,  x: 78, y: 44, rot: -5, size: "md" },
  { label: "Biên LN gộp",       value: "27.65",  unit: "%",     color: "#10B981", popAt: 68,  x: 52, y: 72, rot: 6,  size: "md" },
  { label: "P/B",               value: "1.66",   unit: "lần",   color: "#3B82F6", popAt: 76,  x: 10, y: 36, rot: 3,  size: "sm" },
  { label: "Vốn hóa",           value: "32,700", unit: "tỷ",    color: "#7C3AED", popAt: 84,  x: 82, y: 12, rot: -5, size: "md" },
  { label: "Hàng tồn kho",      value: "4,809",  unit: "tỷ",    color: "#F59E0B", popAt: 92,  x: 82, y: 82, rot: -7, size: "sm" },
  // Wave 3 — 100-180f (dồn dập cuối)
  { label: "Tăng trưởng LNST",  value: "+38.2",  unit: "%",     color: "#10B981", popAt: 100, x: 32, y: 26, rot: -5, size: "md" },
  { label: "Tài sản NH",        value: "14,447", unit: "tỷ",    color: "#7C3AED", popAt: 106, x: 60, y: 52, rot: 4,  size: "md" },
  { label: "Lợi nhuận gộp",     value: "1,252",  unit: "tỷ",    color: "#10B981", popAt: 112, x: 22, y: 48, rot: -6, size: "sm" },
  { label: "Tiền & TĐT",        value: "3,590",  unit: "tỷ",    color: "#3B82F6", popAt: 118, x: 50, y: 14, rot: 3,  size: "sm" },
  { label: "Nợ ngắn hạn",       value: "12,921", unit: "tỷ",    color: "#EF4444", popAt: 124, x: 12, y: 66, rot: -4, size: "sm" },
  { label: "Tăng trưởng DT",    value: "+13.4",  unit: "%",     color: "#10B981", popAt: 130, x: 88, y: 58, rot: 6,  size: "sm" },
  { label: "Nợ/VCSH",           value: "1.12",   unit: "lần",   color: "#F59E0B", popAt: 136, x: 38, y: 80, rot: -3, size: "sm" },
  { label: "Beta",              value: "0.85",   unit: "",      color: "#3B82F6", popAt: 142, x: 70, y: 34, rot: 5,  size: "sm" },
  { label: "Free float",        value: "68",     unit: "%",     color: "#7C3AED", popAt: 148, x: 14, y: 24, rot: -4, size: "sm" },
  { label: "Dòng tiền HĐKD",    value: "850",    unit: "tỷ",    color: "#10B981", popAt: 154, x: 48, y: 58, rot: 4,  size: "sm" },
  { label: "Vòng quay HTK",     value: "2.3",    unit: "vòng",  color: "#F59E0B", popAt: 160, x: 80, y: 70, rot: -6, size: "sm" },
  { label: "Cổ tức",            value: "1,200",  unit: "đ/cp",  color: "#EF4444", popAt: 166, x: 28, y: 88, rot: 3,  size: "sm" },
  { label: "CAPEX",             value: "-120",   unit: "tỷ",    color: "#EF4444", popAt: 172, x: 66, y: 88, rot: -5, size: "sm" },
  { label: "Số CP lưu hành",    value: "530",    unit: "triệu", color: "#3B82F6", popAt: 178, x: 88, y: 30, rot: 6,  size: "sm" },
  { label: "Dòng tiền tự do",   value: "730",    unit: "tỷ",    color: "#10B981", popAt: 184, x: 42, y: 62, rot: -4, size: "sm" },
];

const InfoCardsOverwhelm: React.FC<{ sceneFrame: number }> = ({ sceneFrame }) => {
  const { fps } = useVideoConfig();
  // container area: match ScreenContainer x=40, y=290, w=1000, h=1060
  const X0 = 40;
  const Y0 = 290;
  const W = 1000;
  const H = 1060;

  return (
    <div
      style={{
        position: "absolute",
        left: X0,
        top: Y0,
        width: W,
        height: H,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 15,
      }}
    >
      {CARDS.map((c, i) => {
        const localFrame = sceneFrame - PHASE_BCTC - c.popAt;
        if (localFrame < 0) return null;

        const prog = spring({ frame: localFrame, fps, config: SPRINGS.heavy });
        // Gentle drift up after pop in
        const drift = Math.min(1, localFrame / 60) * -6;
        // Cards to ra thêm + transparent hơn (thấy video BCTC lấp ló đằng sau)
        const sizeMap = {
          sm: { pad: "14px 22px", labelFs: 22, valueFs: 52, unitFs: 24, minW: 230 },
          md: { pad: "18px 28px", labelFs: 26, valueFs: 72, unitFs: 30, minW: 280 },
          lg: { pad: "22px 34px", labelFs: 30, valueFs: 92, unitFs: 36, minW: 340 },
        };
        const sz = sizeMap[c.size];

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${c.x}%`,
              top: `${c.y}%`,
              transform: `translate(-50%, ${drift}px) rotate(${c.rot}deg) scale(${prog})`,
              transformOrigin: "center",
              background: "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(4px)",
              padding: sz.pad,
              borderRadius: 16,
              boxShadow: `0 14px 34px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.18)`,
              borderLeft: `6px solid ${c.color}`,
              minWidth: sz.minW,
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: sz.labelFs,
                color: "rgba(26,26,46,0.72)",
                fontWeight: 600,
                letterSpacing: 0.3,
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {c.label}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  fontSize: sz.valueFs,
                  color: c.color,
                  fontWeight: 900,
                  letterSpacing: -0.5,
                }}
              >
                {c.value}
              </span>
              {c.unit && (
                <span
                  style={{
                    fontSize: sz.unitFs,
                    color: "rgba(26,26,46,0.65)",
                    fontWeight: 600,
                  }}
                >
                  {c.unit}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
