import React from "react";
import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SourceVideo } from "../components/SourceVideo";
import { RRGZoneLabels } from "../components/RRGZoneLabels";
import { COLORS, FONTS, SPRINGS, VIDEO } from "../design";

/**
 * Scene 1 — 10s — "RRG là gì"
 * 0-30f: title "Đọc biểu đồ RRG" slides in + dim left half (stock table)
 * 30-270f: 4 zone labels stagger in
 * 270-300f: hold
 */
export const Scene1_RRGZones: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#050912" }}>
      <SourceVideo startFromSec={0} endAtSec={0.5} freeze freezeAtSec={0} />

      {/* Dim left half (stock table) so attention goes to RRG chart */}
      <LeftDim />

      {/* Top title banner */}
      <TopTitle />

      {/* 4 zone labels — stagger starting at frame 30 */}
      <Sequence from={30}>
        <RRGZoneLabels />
      </Sequence>

      {/* Axis hint arrows */}
      <Sequence from={180}>
        <AxisHints />
      </Sequence>
    </AbsoluteFill>
  );
};

const LeftDim: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: SPRINGS.calm });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 760,
          height: VIDEO.height,
          background: `rgba(6, 10, 20, ${0.72 * p})`,
        }}
      />
    </AbsoluteFill>
  );
};

const TopTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: SPRINGS.decisive });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 40,
          padding: "20px 32px",
          background: COLORS.navyGlass,
          border: `1.5px solid ${COLORS.gold}80`,
          borderRadius: 14,
          color: COLORS.white,
          ...FONTS.calloutLarge,
          backdropFilter: "blur(14px)",
          opacity: p,
          transform: `translateY(${(1 - p) * -20}px)`,
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        <span style={{ color: COLORS.gold, letterSpacing: 2, fontSize: 22, display: "block", marginBottom: 4 }}>
          BIỂU ĐỒ RRG CÓ 4 VÙNG
        </span>
        <span style={{ fontSize: 34 }}>Cho biết sức mạnh & đà tăng của mỗi nhóm</span>
      </div>
    </AbsoluteFill>
  );
};

const AxisHints: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: SPRINGS.calm });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Horizontal axis label - SỨC MẠNH */}
      <div
        style={{
          position: "absolute",
          left: 1000,
          bottom: 32,
          color: COLORS.gold,
          ...FONTS.chapterBadge,
          fontSize: 22,
          opacity: p,
          padding: "6px 14px",
          background: COLORS.navyGlass,
          borderRadius: 8,
          border: `1px solid ${COLORS.gold}60`,
          transform: `translateX(${(1 - p) * -30}px)`,
        }}
      >
        ↔ Trục X: SỨC MẠNH tương đối
      </div>
      {/* Vertical axis label - GIÁ */}
      <div
        style={{
          position: "absolute",
          left: 760,
          top: 400,
          color: COLORS.gold,
          ...FONTS.chapterBadge,
          fontSize: 22,
          opacity: p,
          padding: "6px 14px",
          background: COLORS.navyGlass,
          borderRadius: 8,
          border: `1px solid ${COLORS.gold}60`,
          transform: `translateY(${(1 - p) * 20}px)`,
        }}
      >
        ↕ Trục Y: Đà tăng GIÁ
      </div>
    </AbsoluteFill>
  );
};
