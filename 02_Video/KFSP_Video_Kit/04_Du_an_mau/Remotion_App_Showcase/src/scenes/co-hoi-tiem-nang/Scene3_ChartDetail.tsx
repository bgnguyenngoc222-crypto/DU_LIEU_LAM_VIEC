import React from "react";
import { AbsoluteFill, spring, interpolate, staticFile } from "remotion";
import { PhoneMockup } from "../../components/PhoneMockup";
import { SubtitleBar } from "../../components/SubtitleBar";

export const Scene3_ChartDetail: React.FC<{ frame: number; fps: number }> = ({
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

  const entranceOpacity = interpolate(spr, [0, 1], [0, 1]);
  const exitOpacity = interpolate(exitSpr, [0, 1], [1, 0]);
  const opacity = entranceOpacity * exitOpacity;

  // 3D rotation entrance transition from vertical angle to landscape
  const rotateY = interpolate(spr, [0, 1], [90, 0]);
  const entranceScale = interpolate(spr, [0, 1], [0.8, 1.05]);
  const exitScale = interpolate(exitSpr, [0, 1], [1.05, 1.15]);
  const scale = frame > 75 ? exitScale : entranceScale;

  const chartImage = staticFile("kfsp-chart-dhm-pattern-landscape.png");

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a1628",
        fontFamily: "Inter, sans-serif",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Header Title */}
      <div
        style={{
          position: "absolute",
          top: "65px",
          textAlign: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "46px",
            fontWeight: 900,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "1px",
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
            marginTop: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          TỰ ĐỘNG ĐÁNH DẤU ĐÁY 1, ĐÁY 2, VÙNG BREAK & ĐIỂM CHỐT LỜI
        </div>
      </div>

      {/* Centered Landscape Phone Mockup with 3D Flip Entrance */}
      <div
        style={{
          marginTop: "110px",
          transform: `rotateY(${rotateY}deg)`,
          perspective: "1000px",
        }}
      >
        <PhoneMockup
          imageSrc={chartImage}
          rotation={0}
          scale={1.0}
          isLandscape={true}
        />
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
