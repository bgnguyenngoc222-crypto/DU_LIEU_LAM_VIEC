import React from "react";
import { AbsoluteFill, spring, interpolate, staticFile } from "remotion";
import { PhoneMockup } from "../components/PhoneMockup";
import { SubtitleBar } from "../components/SubtitleBar";

export const Scene3_LandscapeChart: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const rotationSpr = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const scale = interpolate(rotationSpr, [0, 1], [0.9, 1.1]);
  const opacity = interpolate(rotationSpr, [0, 1], [0.3, 1]);

  // Using newly renamed landscape pattern chart image
  const chartImage = staticFile("kfsp-chart-dhm-pattern-landscape.png");

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a1628",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          textAlign: "center",
          opacity,
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontSize: "48px",
            fontWeight: 900,
            color: "#ffffff",
          }}
        >
          ĐỒ THỊ KỸ THUẬT TOÀN CẢNH
        </div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#34d399",
            marginTop: "8px",
          }}
        >
          Theo dõi diễn biến giá & nhận diện Mẫu hình Hai Đáy thực tế
        </div>
      </div>

      {/* Landscape Phone Mockup */}
      <div style={{ marginTop: "110px" }}>
        <PhoneMockup
          imageSrc={chartImage}
          rotation={0}
          scale={scale}
          isLandscape={true}
        />
      </div>

      {/* Subtitle Banner */}
      <SubtitleBar
        text="Đồ thị kỹ thuật toàn cảnh - Phân tích diễn biến giá & mẫu hình Hai Đáy thực tế"
        frame={frame}
        fps={fps}
      />
    </AbsoluteFill>
  );
};
