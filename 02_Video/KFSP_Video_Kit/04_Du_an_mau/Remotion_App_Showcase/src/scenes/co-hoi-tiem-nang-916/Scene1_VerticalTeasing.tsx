import React from "react";
import { AbsoluteFill, spring, interpolate, staticFile } from "remotion";
import { PhoneMockup } from "../../components/PhoneMockup";
import { SubtitleBar } from "../../components/SubtitleBar";

export const Scene1_VerticalTeasing: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const spr = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  const exitSpr = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const badgeSpr = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  const opacity = interpolate(spr, [0, 1], [0, 1]) * interpolate(exitSpr, [0, 1], [1, 0]);
  const scale = frame > 75 ? interpolate(exitSpr, [0, 1], [1, 0.92]) : interpolate(spr, [0, 1], [0.88, 1]);

  const dashboardImage = staticFile("kfsp-dashboard-home.png");

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#0a1628",
        paddingTop: "100px",
        fontFamily: "Inter, sans-serif",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Top Header Text (Vertical 9:16 Layout) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 60px",
          marginBottom: "40px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            transform: `scale(${Math.max(0, interpolate(badgeSpr, [0, 1], [0.5, 1]))})`,
            backgroundColor: "#7B3AEC",
            color: "#ffffff",
            fontFamily: "Inter, sans-serif",
            fontSize: "24px",
            fontWeight: 900,
            padding: "10px 28px",
            borderRadius: "24px",
            marginBottom: "18px",
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
            letterSpacing: "2px",
            marginBottom: "14px",
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
            lineHeight: 1.35,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            maxWidth: "800px",
          }}
        >
          QUÉT TÍN HIỆU MUA BÁN & MẪU HÌNH KỸ THUẬT NGAY TRÊN APP KFSP
        </div>
      </div>

      {/* Large Center Phone Mockup for 9:16 */}
      <div style={{ zIndex: 10, marginTop: "20px" }}>
        <PhoneMockup imageSrc={dashboardImage} scale={1.18} />
      </div>

      {/* Subtitle Banner Safe Zone */}
      <SubtitleBar
        text="KFSP RA MẮT TÍNH NĂNG MỚI: CƠ HỘI TIỀM NĂNG"
        frame={frame}
        fps={fps}
      />
    </AbsoluteFill>
  );
};
