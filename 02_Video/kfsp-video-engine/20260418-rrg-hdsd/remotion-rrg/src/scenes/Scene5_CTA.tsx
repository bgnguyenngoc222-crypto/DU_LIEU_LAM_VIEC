import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SourceVideo } from "../components/SourceVideo";
import { COLORS, FONTS, SPRINGS, VIDEO } from "../design";

export const Scene5_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgDim = spring({ frame, fps, config: SPRINGS.calm });
  const logoIn = spring({ frame: frame - 10, fps, config: SPRINGS.heavy });
  const titleIn = spring({ frame: frame - 24, fps, config: SPRINGS.decisive });
  const stepsIn = spring({ frame: frame - 40, fps, config: SPRINGS.calm });
  const ctaIn = spring({ frame: frame - 70, fps, config: SPRINGS.decisive });

  return (
    <AbsoluteFill style={{ background: "#050912" }}>
      <SourceVideo freeze freezeAtSec={78} startFromSec={78} endAtSec={78.5} />
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, rgba(6,10,20,${0.72 + 0.15 * bgDim}) 0%, rgba(20,14,46,${0.82 + 0.1 * bgDim}) 100%)`,
        }}
      />

      {/* Logo area */}
      <div
        style={{
          position: "absolute",
          left: VIDEO.width / 2 - 80,
          top: 80,
          width: 160,
          height: 160,
          borderRadius: 32,
          overflow: "hidden",
          boxShadow: `0 16px 50px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.12)`,
          opacity: logoIn,
          transform: `scale(${0.7 + 0.3 * logoIn})`,
          background: COLORS.navyGlass,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile("logos/TACH NEN-2.png")}
          style={{ width: "85%", height: "85%", objectFit: "contain" }}
        />
      </div>

      {/* Main CTA text */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 290,
          textAlign: "center",
          color: COLORS.white,
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 20}px)`,
        }}
      >
        <div
          style={{
            color: COLORS.gold,
            ...FONTS.chapterBadge,
            fontSize: 24,
            marginBottom: 14,
          }}
        >
          Mở app KFSP — thử ngay Biểu đồ RRG
        </div>
        <h1
          style={{
            ...FONTS.title,
            fontSize: 74,
            margin: 0,
            textShadow: "0 4px 24px rgba(0,0,0,0.55)",
          }}
        >
          Thấy ngành mạnh · Thấy mã mạnh · Thấy cơ hội
        </h1>
      </div>

      {/* 3 steps */}
      <Sequence from={40}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 560,
            display: "flex",
            justifyContent: "center",
            gap: 32,
            opacity: stepsIn,
            transform: `translateY(${(1 - stepsIn) * 20}px)`,
          }}
        >
          <StepCard num="1" text="Mở app KFSP" color={COLORS.zoneLeadGreen} />
          <StepCard num="2" text="Vào tab Biểu đồ RRG" color={COLORS.zoneRecoverPurple} />
          <StepCard num="3" text="Tick ngành / mã / watchlist" color={COLORS.zoneWeakenOrange} />
        </div>
      </Sequence>

      {/* Bottom link */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 60,
          textAlign: "center",
          color: COLORS.gold,
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: 1,
          opacity: ctaIn,
          transform: `scale(${0.9 + 0.1 * ctaIn})`,
        }}
      >
        → Link app trong phần mô tả
      </div>
    </AbsoluteFill>
  );
};

const StepCard: React.FC<{ num: string; text: string; color: string }> = ({
  num,
  text,
  color,
}) => (
  <div
    style={{
      minWidth: 340,
      padding: "24px 30px",
      background: COLORS.navyGlass,
      border: `1.5px solid ${color}80`,
      borderRadius: 18,
      display: "flex",
      alignItems: "center",
      gap: 18,
      backdropFilter: "blur(12px)",
      boxShadow: `0 12px 36px rgba(0,0,0,0.45), 0 0 0 2px ${color}18`,
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        fontWeight: 800,
        flexShrink: 0,
      }}
    >
      {num}
    </div>
    <span style={{ color: COLORS.white, fontSize: 26, fontWeight: 600 }}>{text}</span>
  </div>
);
