import React from "react";
import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SourceVideo } from "../components/SourceVideo";
import { ChapterBadge } from "../components/ChapterBadge";
import { Spotlight } from "../components/Spotlight";
import { ArrowCallout } from "../components/ArrowCallout";
import { TitleCard } from "../components/TitleCard";
import { COLORS, FONTS, SPRINGS, VIDEO } from "../design";

/**
 * Scene 4 — 35s — "Cách 3: Theo WATCHLIST"
 *  0-60f:       title intro
 *  60-926f:     video 50-78.87s (~28.87s)
 *  926-1050f:   freeze t=78 + summary
 *
 * Inside video (local frame after -60 offset):
 *   0-150f   (video 50-55s): click tab Watchlist, chọn "Ready"
 *   150-360f (video 55-62s): sort theo Ngành
 *   360-570f (video 62-69s): tick 5 CK stocks
 *   570-866f (video 69-78.87s): hover quan sát 5 mã CK
 */
export const Scene4_Watchlist: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#050912" }}>
      <Sequence durationInFrames={60}>
        <IntroPart />
      </Sequence>

      <Sequence from={60} durationInFrames={866}>
        <VideoPart />
      </Sequence>

      <Sequence from={926} durationInFrames={124}>
        <OutroPart />
      </Sequence>

      <Sequence from={30}>
        <ChapterBadge index={3} total={3} title="Theo WATCHLIST" color={COLORS.zoneWeakenOrange} />
      </Sequence>
    </AbsoluteFill>
  );
};

const IntroPart: React.FC = () => (
  <AbsoluteFill>
    <SourceVideo freeze freezeAtSec={50} startFromSec={50} endAtSec={50.5} />
    <AbsoluteFill style={{ background: "rgba(6,10,20,0.72)" }} />
    <TitleCard
      kicker="Cách 3 / 3"
      title="Theo WATCHLIST"
      subtitle="Load nguyên một danh mục đã tạo sẵn — tiện theo dõi danh mục đầu tư của bạn"
      color={COLORS.zoneWeakenOrange}
    />
  </AbsoluteFill>
);

const VideoPart: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <SourceVideo startFromSec={50} endAtSec={78.87} />

      {/* MOMENT 1: Click Watchlist tab + chọn "Ready" (0-150f) */}
      {frame >= 0 && frame < 150 && (
        <Sequence durationInFrames={150}>
          <Spotlight x={168} y={8} w={110} h={38} radius={6} ringColor={COLORS.zoneWeakenOrange} />
          <ArrowCallout
            cardX={320}
            cardY={70}
            cardW={520}
            targetX={224}
            targetY={52}
            text="Tab WATCHLIST: load nguyên danh mục đã lưu, đỡ phải tick từng mã"
            color={COLORS.zoneWeakenOrange}
            cardAnchor="top"
          />
        </Sequence>
      )}

      {/* MOMENT 2: Sort theo Ngành (150-360f) */}
      {frame >= 170 && frame < 380 && (
        <Sequence from={170} durationInFrames={210}>
          {/* Column "Ngành" header at ~x=220, y=100, w=110, h=30 */}
          <Spotlight x={210} y={98} w={130} h={40} radius={6} ringColor={COLORS.gold} />
          <ArrowCallout
            cardX={380}
            cardY={180}
            cardW={480}
            targetX={275}
            targetY={118}
            text="Sort theo NGÀNH ↑ → các mã cùng nhóm nằm cạnh nhau, dễ so sánh"
            color={COLORS.gold}
            cardAnchor="top"
          />
        </Sequence>
      )}

      {/* MOMENT 3: Tick 5 CK stocks (380-570f) */}
      {frame >= 400 && frame < 600 && (
        <Sequence from={400} durationInFrames={200}>
          {/* 5 checkboxes nằm ở cột đầu, rows 1-5, roughly y=140-285 */}
          <Spotlight x={8} y={138} w={26} h={150} radius={4} ringColor={COLORS.zoneLeadGreen} />
          <ArrowCallout
            cardX={420}
            cardY={200}
            cardW={540}
            targetX={40}
            targetY={220}
            text="Tick 5 mã CK: VCI · SSI · VND · VIX · MBS — xem phân hoá trong nhóm"
            color={COLORS.zoneLeadGreen}
            cardAnchor="left"
            emphasis="large"
          />
        </Sequence>
      )}

      {/* MOMENT 4: Hover 5 CK → phân hoá (620-866f) */}
      {frame >= 620 && (
        <Sequence from={620}>
          <ArrowCallout
            cardX={40}
            cardY={VIDEO.height - 280}
            cardW={720}
            targetX={VIDEO.width - 500}
            targetY={VIDEO.height / 2}
            text="5 mã cùng ngành CK nhưng phân hoá 4 vùng: VIX/MBS Dẫn dắt · SSI/VND Phục hồi · VCI Suy yếu"
            color={COLORS.gold}
            cardAnchor="right"
            emphasis="large"
          />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

const OutroPart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: SPRINGS.decisive });

  return (
    <AbsoluteFill>
      <SourceVideo freeze freezeAtSec={78} startFromSec={78} endAtSec={78.5} />
      <AbsoluteFill style={{ background: "rgba(6,10,20,0.5)" }} />

      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 540,
          top: VIDEO.height / 2 - 140,
          width: 1080,
          padding: "40px 54px",
          background: COLORS.navyGlass,
          border: `2px solid ${COLORS.zoneWeakenOrange}`,
          borderRadius: 22,
          color: COLORS.white,
          textAlign: "center",
          ...FONTS.calloutLarge,
          backdropFilter: "blur(16px)",
          opacity: p,
          transform: `scale(${0.85 + 0.15 * p})`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.65), 0 0 0 6px ${COLORS.zoneWeakenOrange}25`,
        }}
      >
        <div
          style={{
            color: COLORS.zoneWeakenOrange,
            fontSize: 24,
            letterSpacing: 3,
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          ✓ Cách 3 — Hoàn thành
        </div>
        <div style={{ fontSize: 40, lineHeight: 1.3 }}>
          Watchlist + Sort ngành → theo dõi phân hoá từng nhóm cổ phiếu bạn quan tâm
        </div>
      </div>
    </AbsoluteFill>
  );
};
