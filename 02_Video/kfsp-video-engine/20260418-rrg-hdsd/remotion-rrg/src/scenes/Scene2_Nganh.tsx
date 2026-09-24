import React from "react";
import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SourceVideo } from "../components/SourceVideo";
import { ChapterBadge } from "../components/ChapterBadge";
import { Spotlight } from "../components/Spotlight";
import { ArrowCallout } from "../components/ArrowCallout";
import { TitleCard } from "../components/TitleCard";
import { COLORS, FONTS, SPRINGS, VIDEO } from "../design";

/**
 * Scene 2 — 14s — "Cách 1: Theo NGÀNH"
 * 0-60f (2s):   freeze t=0 + big TitleCard "Cách 1 / 3 — Theo NGÀNH"
 * 60-330f (9s): video 0-9s (tick BĐS checkbox → plot green dot)
 * 330-420f (3s): freeze t≈9 + callout "BĐS đang DẪN DẮT thị trường"
 */
export const Scene2_Nganh: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#050912" }}>
      {/* PART A: Title intro 0-60f */}
      <Sequence durationInFrames={60}>
        <IntroPart />
      </Sequence>

      {/* PART B: Video 60-330f */}
      <Sequence from={60} durationInFrames={270}>
        <VideoPart />
      </Sequence>

      {/* PART C: Freeze + callout 330-420f */}
      <Sequence from={330} durationInFrames={90}>
        <OutroPart />
      </Sequence>

      {/* Global badge (persist) */}
      <Sequence from={30}>
        <ChapterBadge index={1} total={3} title="Theo NGÀNH" color={COLORS.zoneLeadGreen} />
      </Sequence>
    </AbsoluteFill>
  );
};

const IntroPart: React.FC = () => {
  return (
    <AbsoluteFill>
      <SourceVideo freeze freezeAtSec={0} startFromSec={0} endAtSec={0.5} />
      <AbsoluteFill style={{ background: "rgba(6,10,20,0.72)" }} />
      <TitleCard
        kicker="Cách 1 / 3"
        title="Theo NGÀNH"
        subtitle="Tick ngành trong tab Ngành để xem vị trí ngành đó trên biểu đồ RRG"
        color={COLORS.zoneLeadGreen}
      />
    </AbsoluteFill>
  );
};

const VideoPart: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <SourceVideo startFromSec={0} endAtSec={9} />

      {/* At frame ~150 (after the dropdown closes, ~5s into source), spotlight the "Ngành" tab */}
      {frame >= 0 && frame < 120 && (
        <Sequence durationInFrames={120}>
          {/* Tab Ngành top area - output coords roughly x=400, y=10, w=130, h=40 at 1920 */}
          <Spotlight x={398} y={8} w={100} h={38} radius={6} dimOpacity={0.55} />
          <ArrowCallout
            cardX={560}
            cardY={60}
            cardW={440}
            targetX={450}
            targetY={16}
            text="Tab NGÀNH: liệt kê 24 ngành + trạng thái RRG của mỗi ngành"
            color={COLORS.gold}
            cardAnchor="top"
          />
        </Sequence>
      )}

      {/* At source time ~6s (frame 180 of scene = frame 120 of video part), user ticks BĐS */}
      {frame >= 130 && frame < 240 && (
        <Sequence from={130} durationInFrames={110}>
          {/* BĐS checkbox — at source (20, 180) in a 3322-wide frame... that's at output (11, 104) */}
          {/* Actually BĐS is 2nd row — at output ~(12, 105), w=24, h=24 */}
          <Spotlight x={10} y={102} w={30} h={30} radius={4} ringColor={COLORS.zoneLeadGreen} />
          <ArrowCallout
            cardX={60}
            cardY={160}
            cardW={420}
            targetX={28}
            targetY={118}
            text="Tick BẤT ĐỘNG SẢN → ngành hiện lên RRG"
            color={COLORS.zoneLeadGreen}
            cardAnchor="top"
          />
        </Sequence>
      )}

      {/* After BĐS plotted (frame 200+), spotlight the green dot in DẪN DẮT quadrant */}
      {frame >= 210 && (
        <Sequence from={210}>
          <Spotlight
            x={1580}
            y={200}
            w={200}
            h={120}
            radius={16}
            ringColor={COLORS.zoneLeadGreen}
            dimOpacity={0.45}
          />
          <ArrowCallout
            cardX={1060}
            cardY={420}
            cardW={460}
            targetX={1680}
            targetY={260}
            text="Điểm BĐS rơi vào vùng DẪN DẮT — ngành mạnh & đang tăng"
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
  const pulse = spring({ frame, fps, config: SPRINGS.decisive });

  return (
    <AbsoluteFill>
      <SourceVideo freeze freezeAtSec={9} startFromSec={9} endAtSec={9.5} />
      <AbsoluteFill style={{ background: "rgba(6,10,20,0.45)" }} />

      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 500,
          top: VIDEO.height / 2 - 130,
          width: 1000,
          padding: "40px 50px",
          background: COLORS.navyGlass,
          border: `2px solid ${COLORS.zoneLeadGreen}`,
          borderRadius: 22,
          color: COLORS.white,
          textAlign: "center",
          ...FONTS.calloutLarge,
          backdropFilter: "blur(16px)",
          opacity: pulse,
          transform: `scale(${0.85 + 0.15 * pulse})`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 6px ${COLORS.zoneLeadGreen}25`,
        }}
      >
        <div
          style={{
            color: COLORS.zoneLeadGreen,
            fontSize: 24,
            letterSpacing: 3,
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          ✓ Cách 1 — Hoàn thành
        </div>
        <div style={{ fontSize: 42, lineHeight: 1.25 }}>
          Xem 24 ngành cùng lúc → biết ngành nào đang <b style={{ color: COLORS.zoneLeadGreen }}>DẪN DẮT</b> thị trường
        </div>
      </div>
    </AbsoluteFill>
  );
};
