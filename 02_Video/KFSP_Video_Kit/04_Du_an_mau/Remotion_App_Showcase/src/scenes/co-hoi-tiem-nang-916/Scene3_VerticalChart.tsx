import React from "react";
import { AbsoluteFill, spring, interpolate, staticFile } from "remotion";
import { PhoneMockup } from "../../components/PhoneMockup";
import { SubtitleBar } from "../../components/SubtitleBar";

export const Scene3_VerticalChart: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const spr = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const exitSpr = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const opacity = interpolate(spr, [0, 1], [0, 1]) * interpolate(exitSpr, [0, 1], [1, 0]);
  const scale = frame > 75 ? interpolate(exitSpr, [0, 1], [1, 1.08]) : interpolate(spr, [0, 1], [0.88, 1.02]);
  const rotateY = interpolate(spr, [0, 1], [90, 0]);

  // Using vertical chart screenshot for portrait 9:16
  const chartImage = staticFile("kfsp-chart-dhm-pattern-portrait.png");

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
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 50px",
          marginBottom: "35px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "48px",
            fontWeight: 900,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "1px",
            lineHeight: 1.15,
            marginBottom: "12px",
          }}
        >
          TRỰC QUAN HÓA MẪU HÌNH GIÁ
        </div>

        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "#34d399",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          TỰ ĐỘNG ĐÁNH DẤU ĐÁY 1, ĐÁY 2 & ĐIỂM CHỐT LỜI
        </div>
      </div>

      {/* Large Center Phone Mockup displaying portrait technical chart */}
      <div
        style={{
          zIndex: 10,
          transform: `rotateY(${rotateY}deg)`,
          perspective: "1000px",
        }}
      >
        <PhoneMockup imageSrc={chartImage} scale={1.22} />
      </div>

      {/* Subtitle Banner */}
      <SubtitleBar
        text="TRỰC QUAN HÓA ĐIỂM VÀO LỆNH & QUẢN LÝ VỊ THẾ CHI TIẾT"
        frame={frame}
        fps={fps}
      />
    </AbsoluteFill>
  );
};
