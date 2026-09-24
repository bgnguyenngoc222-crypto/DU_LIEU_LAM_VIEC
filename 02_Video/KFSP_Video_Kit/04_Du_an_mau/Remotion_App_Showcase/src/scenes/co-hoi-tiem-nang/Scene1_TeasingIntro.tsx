import React from "react";
import { AbsoluteFill, spring, interpolate, staticFile } from "remotion";
import { PhoneMockup } from "../../components/PhoneMockup";
import { SubtitleBar } from "../../components/SubtitleBar";

export const Scene1_TeasingIntro: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const spr = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  // Exit transition for frames 75-90
  const exitSpr = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const badgeSpr = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  const entranceOpacity = interpolate(spr, [0, 1], [0, 1]);
  const exitOpacity = interpolate(exitSpr, [0, 1], [1, 0]);
  const opacity = entranceOpacity * exitOpacity;

  const entranceScale = interpolate(spr, [0, 1], [0.88, 1]);
  const exitScale = interpolate(exitSpr, [0, 1], [1, 0.92]);
  const scale = frame > 75 ? exitScale : entranceScale;

  const titleX = interpolate(spr, [0, 1], [-40, 0]);
  const badgeScale = interpolate(badgeSpr, [0, 1], [0.5, 1]);

  const dashboardImage = staticFile("kfsp-dashboard-home.png");

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0a1628",
        padding: "0 140px",
        fontFamily: "Inter, sans-serif",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Left Title Panel */}
      <div
        style={{
          transform: `translateX(${titleX}px)`,
          maxWidth: "680px",
        }}
      >
        {/* NEW Badge */}
        <div
          style={{
            transform: `scale(${Math.max(0, badgeScale)})`,
            display: "inline-block",
            backgroundColor: "#7B3AEC",
            color: "#ffffff",
            fontFamily: "Inter, sans-serif",
            fontSize: "20px",
            fontWeight: 900,
            padding: "8px 22px",
            borderRadius: "20px",
            marginBottom: "20px",
            boxShadow: "0 0 24px rgba(123, 58, 236, 0.6)",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          TÍNH NĂNG MỚI ĐỘT PHÁ
        </div>

        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "56px",
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.15,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          CƠ HỘI TIỀM NĂNG
        </div>

        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "24px",
            fontWeight: 700,
            color: "#AA75FF",
            marginTop: "18px",
            lineHeight: 1.4,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          TỰ ĐỘNG QUÉT TÍN HIỆU MUA BÁN VÀ PHÁT HIỆN MẪU HÌNH KỸ THUẬT NGAY TRÊN APP KFSP
        </div>
      </div>

      {/* Right Phone Mockup */}
      <div style={{ marginRight: "40px" }}>
        <PhoneMockup imageSrc={dashboardImage} scale={1.0} />
      </div>

      {/* Subtitle Banner */}
      <SubtitleBar
        text="KFSP RA MẮT TÍNH NĂNG MỚI: CƠ HỘI TIỀM NĂNG"
        frame={frame}
        fps={fps}
      />
    </AbsoluteFill>
  );
};
