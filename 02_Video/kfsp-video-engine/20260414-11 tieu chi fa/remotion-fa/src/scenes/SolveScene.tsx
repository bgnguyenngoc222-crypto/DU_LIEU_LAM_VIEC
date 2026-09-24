import { AbsoluteFill, Img, staticFile, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import React from "react";
import { COLORS, FONTS, SPRINGS } from "../design";
import { FootballRadar } from "../components/fa/FootballRadar";
import { ScreenContainer } from "../components/ui/ScreenContainer";

// ═══════════════════════════════════════════
// Scene 4 — SOLVE (f1770-f2275, 16.8s, scene-relative 0-505) ★ WOW MOMENT
// Phases (canh Whisper):
//   0-119   Radar slide + 11 sweep ("Mười một chỉ số phân tích cơ bản") @60.62s
//   119-215 Badge "11 CHỈ SỐ" + LIST 11 chip pills ("vẽ thành...") @62.98s
//   215-340 Football analogy ("gia đa cầu thủ bóng đại") @64s
//   340-465 Drill-down ("Bấm thẳng vào tình điểm") @68.40s
//   465-505 Line đắt ("Bạn vẫn đang phân tích FA") @72.34s
// ═══════════════════════════════════════════

const PHASE_BADGE = 119;
const PHASE_ANALOGY = 215;
const PHASE_DRILL = 340;
const PHASE_LINE = 465;

export const SolveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "#0A1628", overflow: "hidden" }}>
      {/* Mesh gradient bg */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(124, 58, 237, 0.18), transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(245, 197, 66, 0.1), transparent 60%)",
        }}
      />

      {/* Phase 1+2: S1 radar with badge "11" */}
      {frame < PHASE_ANALOGY && (
        <RadarPhase frame={frame} />
      )}

      {/* Phase 3: Football analogy */}
      {frame >= PHASE_ANALOGY && frame < PHASE_DRILL && (
        <AnalogyPhase frame={frame} startFrame={PHASE_ANALOGY} />
      )}

      {/* Phase 4: Drill-down S2 */}
      {frame >= PHASE_DRILL && frame < PHASE_LINE && (
        <DrillPhase frame={frame} startFrame={PHASE_DRILL} />
      )}

      {/* Phase 5: Line đắt */}
      {frame >= PHASE_LINE && (
        <LineDatPhase frame={frame} startFrame={PHASE_LINE} />
      )}
    </AbsoluteFill>
  );
};

// Cropped radar dimensions (S1_radar_crop.png = 828x880, ratio 0.94)
// Sweep phase: full radar
const RADAR_W = 800;
const RADAR_H = Math.round(RADAR_W * 880 / 828); // 850
const RADAR_TOP = 320; // đưa lên cao hơn (was 380)

// Badge phase: radar shrink để có chỗ cho 11 chip list
const RADAR_W_SHRINK = 620;
const RADAR_H_SHRINK = Math.round(RADAR_W_SHRINK * 880 / 828); // 659
const RADAR_TOP_SHRINK = 360;

const ELEVEN_CRITERIA = [
  "ROE", "ROIC", "ROA", "Biên LN",
  "%G DT", "%G EPS", "%G BVPS", "%G OCF",
  "Vòng quay", "Nợ DH", "Chất lượng LN",
];

// ─── Phase 1+2: Radar + sweep + badge + 11 chip list
const RadarPhase: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const phoneProg = spring({ frame, fps, config: SPRINGS.calm });
  const badgeProg = spring({ frame: frame - PHASE_BADGE, fps, config: SPRINGS.resolve });

  // Radar transition full → shrink khi badge phase
  const shrinkProg = interpolate(frame, [PHASE_BADGE, PHASE_BADGE + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const radarW = RADAR_W + (RADAR_W_SHRINK - RADAR_W) * shrinkProg;
  const radarH = RADAR_H + (RADAR_H_SHRINK - RADAR_H) * shrinkProg;
  const radarTop = RADAR_TOP + (RADAR_TOP_SHRINK - RADAR_TOP) * shrinkProg;

  return (
    <>
      <ScreenContainer prog={phoneProg} width={radarW} height={radarH} top={radarTop} radius={20}>
        <Img
          src={staticFile("images/fa/S1_radar_crop.png")}
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
        />
      </ScreenContainer>

      {/* Badge "11 CHỈ SỐ" — under logo */}
      {frame >= PHASE_BADGE && (
        <div
          style={{
            position: "absolute",
            top: 305,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: badgeProg,
            transform: `scale(${badgeProg})`,
            zIndex: 20,
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: COLORS.accentGold,
              color: "#0A1628",
              padding: "10px 32px",
              borderRadius: 40,
              fontSize: 44,
              fontWeight: 900,
              fontFamily: FONTS.family,
              boxShadow: "0 8px 30px rgba(245, 197, 66, 0.5)",
            }}
          >
            11 CHỈ SỐ
          </div>
        </div>
      )}

      {/* 11 chip pill list — appear sau badge, dưới radar */}
      {frame >= PHASE_BADGE + 10 && (
        <ElevenChipList frame={frame - PHASE_BADGE - 10} />
      )}
    </>
  );
};

// 11 chip pills hiển thị flex wrap dưới radar
const ElevenChipList: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: 1050,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "12px 10px",
        zIndex: 18,
      }}
    >
      {ELEVEN_CRITERIA.map((name, i) => {
        const localFrame = frame - i * 4;
        if (localFrame < 0) return null;
        const opacity = interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
        const scale = interpolate(localFrame, [0, 10], [0.7, 1], { extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `scale(${scale})`,
              padding: "8px 18px",
              borderRadius: 24,
              background: "rgba(245, 197, 66, 0.95)",
              color: "#0A1628",
              fontSize: 26,
              fontWeight: 700,
              fontFamily: FONTS.family,
              letterSpacing: 0.3,
              boxShadow: "0 4px 14px rgba(245, 197, 66, 0.35)",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

// Sweep highlight: pulsing gold rings tại đúng vị trí 11 label trên S1_radar_crop.png (828×880)
// Mỗi position là (left%, top%) đo trực tiếp trên ảnh crop, clockwise từ 12h
const SweepHighlight: React.FC<{ frame: number }> = ({ frame }) => {
  const POSITIONS = [
    { left: "50%", top: "20%", label: "%G Doanh thu" },
    { left: "75%", top: "27%", label: "%G EPS" },
    { left: "87%", top: "42%", label: "%G BVPS" },
    { left: "87%", top: "59%", label: "%G OCF" },
    { left: "77%", top: "77%", label: "Nợ dài hạn" },
    { left: "54%", top: "93%", label: "Vòng quay tài sản" },
    { left: "31%", top: "93%", label: "Biên lợi nhuận" },
    { left: "19%", top: "77%", label: "Chất lượng LN" },
    { left: "13%", top: "59%", label: "ROA" },
    { left: "13%", top: "42%", label: "ROE" },
    { left: "31%", top: "27%", label: "ROIC" },
  ];

  const STAGGER = 10;
  return (
    <>
      {POSITIONS.map((pos, i) => {
        const localFrame = frame - i * STAGGER;
        if (localFrame < 0 || localFrame > 36) return null;
        const opacity = interpolate(localFrame, [0, 8, 26, 36], [0, 1, 1, 0]);
        const scale = interpolate(localFrame, [0, 8, 36], [0.5, 1.6, 1]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.left,
              top: pos.top,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
              pointerEvents: "none",
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: "3px solid rgba(245, 197, 66, 0.95)",
              background: "radial-gradient(circle, rgba(245, 197, 66, 0.45), transparent 70%)",
              boxShadow: "0 0 24px rgba(245, 197, 66, 0.7)",
            }}
          />
        );
      })}
    </>
  );
};

// ─── Phase 3: Football analogy split-screen
const AnalogyPhase: React.FC<{ frame: number; startFrame: number }> = ({ frame, startFrame }) => {
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const leftProg = spring({ frame: localFrame, fps, config: SPRINGS.resolve });
  const rightProg = spring({ frame: localFrame - 20, fps, config: SPRINGS.resolve });
  const centerTextProg = spring({ frame: localFrame - 40, fps, config: SPRINGS.calm });

  return (
    <>
      {/* LEFT: Football radar */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 480,
          opacity: leftProg,
          transform: `translateX(${(1 - leftProg) * -100}px)`,
        }}
      >
        <FootballRadar appearFrame={startFrame} pulseFrame={startFrame + 50} size={380} />
      </div>

      {/* RIGHT: KFSP radar (zoom crop of S1) */}
      <div
        style={{
          position: "absolute",
          right: 90,
          top: 480,
          width: 380,
          height: 380,
          opacity: rightProg,
          transform: `translateX(${(1 - rightProg) * 100}px)`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 16,
            overflow: "hidden",
            background: "#FFF",
            boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img
            src={staticFile("images/fa/S1_radar_4m_fpt.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        {/* "Điểm 4M" label */}
        <div
          style={{
            position: "absolute",
            top: -36,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 30,
            fontWeight: 800,
            color: COLORS.accentGold,
          }}
        >
          ĐIỂM 4M
        </div>
        <div
          style={{
            position: "absolute",
            bottom: -50,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 56,
            fontWeight: 900,
            color: COLORS.accentGold,
            fontFamily: FONTS.family,
          }}
        >
          61.7
        </div>
      </div>

      {/* Center text */}
      <div
        style={{
          position: "absolute",
          top: 1000,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: centerTextProg,
          transform: `scale(${centerTextProg})`,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: COLORS.accentGold,
            letterSpacing: 2,
            textShadow: "0 0 30px rgba(245, 197, 66, 0.5)",
          }}
        >
          CÙNG 1 CÁCH ĐỌC
        </div>
        <div style={{ fontSize: 28, color: "#FFFFFFAA", marginTop: 12 }}>
          ↔️
        </div>
      </div>
    </>
  );
};

// ─── Phase 4: Drill-down S2 tooltip + red pill
const DrillPhase: React.FC<{ frame: number; startFrame: number }> = ({ frame, startFrame }) => {
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;
  const phoneProg = spring({ frame: localFrame, fps, config: SPRINGS.decisive });

  return (
    <ScreenContainer prog={phoneProg} width={480} height={1040} top={320} radius={28}>
      <Img
        src={staticFile("images/fa/S2_tooltip_4m.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
      />
    </ScreenContainer>
  );
};

// ─── Phase 5: Line đắt
const LineDatPhase: React.FC<{ frame: number; startFrame: number }> = ({ frame, startFrame }) => {
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;
  const line1Prog = spring({ frame: localFrame, fps, config: SPRINGS.decisive });
  const line2Prog = spring({ frame: localFrame - 20, fps, config: SPRINGS.decisive });
  const glow = Math.sin(localFrame * 0.15) * 0.3 + 0.7;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: "#FFFFFF",
          opacity: line1Prog,
          transform: `scale(${line1Prog})`,
          marginBottom: 40,
        }}
      >
        Bạn vẫn đọc FA.
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: COLORS.accentGold,
          opacity: line2Prog,
          transform: `scale(${line2Prog})`,
          textShadow: `0 0 ${20 + glow * 30}px rgba(245, 197, 66, ${glow})`,
          lineHeight: 1.3,
          maxWidth: 900,
        }}
      >
        Chỉ là biết bắt đầu từ đâu.
      </div>
    </div>
  );
};

