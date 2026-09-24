import React from "react";
import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SourceVideo } from "../components/SourceVideo";
import { ChapterBadge } from "../components/ChapterBadge";
import { Spotlight } from "../components/Spotlight";
import { ArrowCallout } from "../components/ArrowCallout";
import { TitleCard } from "../components/TitleCard";
import { COLORS, FONTS, SPRINGS, VIDEO } from "../design";

/**
 * Scene 3 — 48s — "Cách 2: Theo từng MÃ (Bảng dữ liệu)"
 *  0-60f:       title intro
 *  60-1290f:    video 9-50s with layered overlays
 *  1290-1440f:  freeze t=50 + summary callout
 *
 * Video inside: 41s source, mapped to scene frames 60..1290
 * Key moments (scene frames, add 60):
 *   60-150f   (video 0-3s):    click tab "Bảng dữ liệu"
 *   150-330f  (video 3-9s):    type "VIC" in search
 *   330-480f  (video 9-14s):   tick VIC+NVL, explain 2 points in 2 zones
 *   480-690f  (video 14-21s):  untick VIC, search "n"
 *   690-930f  (video 21-29s):  tick NLG, compare 2 BĐS
 *   930-1110f (video 29-35s):  4 BĐS + hover VHM tooltip → zoom lens
 *   1110-1290f (video 35-41s): clear + recap
 */
export const Scene3_BangDuLieu: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#050912" }}>
      <Sequence durationInFrames={60}>
        <IntroPart />
      </Sequence>

      <Sequence from={60} durationInFrames={1230}>
        <VideoPart />
      </Sequence>

      <Sequence from={1290} durationInFrames={150}>
        <OutroPart />
      </Sequence>

      <Sequence from={30}>
        <ChapterBadge index={2} total={3} title="Theo MÃ riêng lẻ" color={COLORS.zoneRecoverPurple} />
      </Sequence>
    </AbsoluteFill>
  );
};

const IntroPart: React.FC = () => (
  <AbsoluteFill>
    <SourceVideo freeze freezeAtSec={9} startFromSec={9} endAtSec={9.5} />
    <AbsoluteFill style={{ background: "rgba(6,10,20,0.72)" }} />
    <TitleCard
      kicker="Cách 2 / 3"
      title="Theo MÃ riêng lẻ"
      subtitle="Tìm kiếm và tick từng mã CK để so sánh vị trí trên biểu đồ RRG"
      color={COLORS.zoneRecoverPurple}
    />
  </AbsoluteFill>
);

/**
 * Main video segment — overlays layered by scene frame (after 60f intro offset).
 * Local frame starts at 0 here (== scene frame 60 == source time 9s).
 */
const VideoPart: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <SourceVideo startFromSec={9} endAtSec={50} />

      {/* MOMENT 1: Click "Bảng dữ liệu" tab (first 2s, frame 0-60 local) */}
      {frame >= 0 && frame < 75 && (
        <Sequence durationInFrames={75}>
          {/* Bảng dữ liệu tab at output ~x=18, y=10, w=140, h=36 */}
          <Spotlight x={16} y={8} w={145} h={38} radius={6} ringColor={COLORS.zoneRecoverPurple} />
          <ArrowCallout
            cardX={260}
            cardY={70}
            cardW={520}
            targetX={88}
            targetY={50}
            text="Tab BẢNG DỮ LIỆU: search từng mã CK để tick vào RRG"
            color={COLORS.zoneRecoverPurple}
            cardAnchor="top"
          />
        </Sequence>
      )}

      {/* MOMENT 2: Type "VIC" search (frame 90-270 local) */}
      {frame >= 90 && frame < 270 && (
        <Sequence from={90} durationInFrames={180}>
          {/* Search box at output ~x=15, y=60, w=440, h=40 */}
          <Spotlight x={10} y={58} w={450} h={42} radius={6} ringColor={COLORS.gold} />
          <ArrowCallout
            cardX={520}
            cardY={140}
            cardW={480}
            targetX={250}
            targetY={104}
            text="Gõ mã CK vào ô tìm kiếm để thêm vào danh sách"
            color={COLORS.gold}
            cardAnchor="top"
          />
        </Sequence>
      )}

      {/* MOMENT 3: VIC + NVL ticked → 2 dots in 2 zones (frame 280-450 local) */}
      {frame >= 280 && frame < 450 && (
        <Sequence from={280} durationInFrames={170}>
          <ArrowCallout
            cardX={40}
            cardY={420}
            cardW={440}
            targetX={1250}
            targetY={200}
            text="VIC vùng tím (Phục hồi) — sức mạnh yếu nhưng giá bắt đầu phục hồi"
            color={COLORS.zoneRecoverPurple}
            cardAnchor="right"
          />
          <ArrowCallout
            cardX={40}
            cardY={570}
            cardW={440}
            targetX={1800}
            targetY={500}
            text="NVL vùng cam (Suy yếu) — sức mạnh cao nhưng đang giảm đà"
            color={COLORS.zoneWeakenOrange}
            cardAnchor="right"
          />
        </Sequence>
      )}

      {/* MOMENT 4: Untick VIC, search n (frame 480-630 local) */}
      {frame >= 480 && frame < 630 && (
        <Sequence from={480} durationInFrames={150}>
          <ArrowCallout
            cardX={40}
            cardY={250}
            cardW={440}
            targetX={60}
            targetY={125}
            text="Bỏ tick để xoá mã khỏi RRG — danh sách tuỳ chỉnh linh hoạt"
            color={COLORS.gold}
            cardAnchor="top"
          />
        </Sequence>
      )}

      {/* MOMENT 5: NLG added → 2 BĐS compared (frame 660-870 local) */}
      {frame >= 660 && frame < 870 && (
        <Sequence from={660} durationInFrames={210}>
          <ArrowCallout
            cardX={40}
            cardY={500}
            cardW={500}
            targetX={1420}
            targetY={400}
            text="Thêm NLG cùng ngành BĐS → so sánh 2 mã cùng lúc trên RRG"
            color={COLORS.zoneLaggardRed}
            cardAnchor="right"
            emphasis="large"
          />
        </Sequence>
      )}

      {/* MOMENT 6: 4 BĐS hover VHM tooltip (frame 900-1080 local) */}
      {frame >= 900 && frame < 1080 && (
        <Sequence from={900} durationInFrames={180}>
          {/* Spotlight around VHM tooltip area — roughly x=1380, y=460, w=240, h=140 */}
          <Spotlight
            x={1380}
            y={460}
            w={260}
            h={160}
            radius={10}
            ringColor={COLORS.zoneLeadGreen}
            dimOpacity={0.55}
          />
          <ArrowCallout
            cardX={40}
            cardY={320}
            cardW={460}
            targetX={1380}
            targetY={520}
            text="Hover vào điểm trên RRG → tooltip hiện TRẠNG THÁI + SỨC MẠNH của mã"
            color={COLORS.zoneLeadGreen}
            cardAnchor="right"
            emphasis="large"
          />
        </Sequence>
      )}

      {/* MOMENT 7: So sánh 4 BĐS (frame 1110-1230 local) — recap */}
      {frame >= 1110 && (
        <Sequence from={1110}>
          <ArrowCallout
            cardX={VIDEO.width / 2 - 380}
            cardY={VIDEO.height - 220}
            cardW={760}
            targetX={VIDEO.width / 2}
            targetY={VIDEO.height - 260}
            text="So sánh 4 mã BĐS cùng ngành → chọn mã đang DẪN DẮT để đi trước"
            color={COLORS.zoneLeadGreen}
            cardAnchor="top"
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
      <SourceVideo freeze freezeAtSec={50} startFromSec={50} endAtSec={50.5} />
      <AbsoluteFill style={{ background: "rgba(6,10,20,0.5)" }} />

      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 540,
          top: VIDEO.height / 2 - 150,
          width: 1080,
          padding: "42px 54px",
          background: COLORS.navyGlass,
          border: `2px solid ${COLORS.zoneRecoverPurple}`,
          borderRadius: 22,
          color: COLORS.white,
          textAlign: "center",
          ...FONTS.calloutLarge,
          backdropFilter: "blur(16px)",
          opacity: p,
          transform: `scale(${0.85 + 0.15 * p})`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.65), 0 0 0 6px ${COLORS.zoneRecoverPurple}25`,
        }}
      >
        <div
          style={{
            color: COLORS.zoneRecoverPurple,
            fontSize: 24,
            letterSpacing: 3,
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          ✓ Cách 2 — Hoàn thành
        </div>
        <div style={{ fontSize: 40, lineHeight: 1.3 }}>
          Search · tick từng mã → so sánh tới <b style={{ color: COLORS.gold }}>5-10 mã</b> cùng ngành trên 1 RRG
        </div>
      </div>
    </AbsoluteFill>
  );
};
