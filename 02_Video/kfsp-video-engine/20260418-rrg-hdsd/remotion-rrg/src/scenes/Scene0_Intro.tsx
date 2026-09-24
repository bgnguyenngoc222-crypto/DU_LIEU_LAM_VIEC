import React from "react";
import {
  AbsoluteFill,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SourceVideo } from "../components/SourceVideo";
import { TitleCard } from "../components/TitleCard";
import { COLORS, SPRINGS, VIDEO } from "../design";

export const Scene0_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dimFade = spring({
    frame: frame - 8,
    fps,
    config: SPRINGS.calm,
  });

  return (
    <AbsoluteFill style={{ background: "#050912" }}>
      {/* Freeze frame at t=0 as backdrop */}
      <SourceVideo startFromSec={0} endAtSec={0.5} freeze freezeAtSec={0} />

      {/* Dim overlay */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, rgba(6,10,20,${0.55 + 0.3 * dimFade}) 0%, rgba(20,14,46,${0.72 + 0.15 * dimFade}) 100%)`,
        }}
      />

      {/* Title card */}
      <TitleCard
        kicker="Hướng dẫn KFSP"
        title="Biểu đồ RRG"
        subtitle="3 cách khám phá sức mạnh thị trường — từ ngành, mã riêng, tới watchlist"
        color={COLORS.gold}
      />

      {/* Small animated accent bar */}
      <Sequence from={30}>
        <AccentBar />
      </Sequence>
    </AbsoluteFill>
  );
};

const AccentBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = spring({ frame, fps, config: SPRINGS.calm });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 200,
          bottom: 110,
          width: 400,
          height: 4,
          borderRadius: 2,
          overflow: "hidden",
          background: "rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            width: `${draw * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${COLORS.zoneRecoverPurple}, ${COLORS.gold})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
