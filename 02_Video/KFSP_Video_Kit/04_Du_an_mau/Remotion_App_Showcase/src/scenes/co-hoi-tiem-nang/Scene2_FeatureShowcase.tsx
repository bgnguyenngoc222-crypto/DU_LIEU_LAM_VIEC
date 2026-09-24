import React from "react";
import { AbsoluteFill, spring, interpolate, staticFile } from "remotion";
import { PhoneMockup } from "../../components/PhoneMockup";
import { SubtitleBar } from "../../components/SubtitleBar";

export const Scene2_FeatureShowcase: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  // Smooth entrance spring
  const spr = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140 },
  });

  // Smooth exit spring for last 15 frames (frame 75-90)
  const exitSpr = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const entranceOpacity = interpolate(spr, [0, 1], [0, 1]);
  const exitOpacity = interpolate(exitSpr, [0, 1], [1, 0]);
  const sceneOpacity = entranceOpacity * exitOpacity;

  const entranceScale = interpolate(spr, [0, 1], [0.92, 1]);
  const exitScale = interpolate(exitSpr, [0, 1], [1, 1.08]);
  const sceneScale = frame > 75 ? exitScale : entranceScale;

  const tag1Spr = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 14 } });
  const tag2Spr = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14 } });
  const tag3Spr = spring({ frame: Math.max(0, frame - 32), fps, config: { damping: 14 } });

  // Smooth image swap between AI Mua/Ban list and Hai Day list
  const activeImage =
    frame < 45
      ? staticFile("kfsp-pro-ai-mua-ban-list.png")
      : staticFile("kfsp-pro-hai-day-list.png");

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
        opacity: sceneOpacity,
        transform: `scale(${sceneScale})`,
      }}
    >
      {/* Left Column: Title & 3 Feature Badges stacked neatly (Zero Clipping) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "680px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "44px",
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.2,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "28px",
          }}
        >
          2 BỘ CÔNG CỤ QUÉT<br />TÍN HIỆU CHUYÊN SÂU
        </div>

        {/* Stacked Feature Badge 1 */}
        <div
          style={{
            opacity: Math.max(0, tag1Spr),
            transform: `translateX(${interpolate(tag1Spr, [0, 1], [-30, 0])}px)`,
            backgroundColor: "rgba(123, 58, 236, 0.2)",
            borderLeft: "6px solid #7B3AEC",
            padding: "14px 24px",
            borderRadius: "0 16px 16px 0",
            marginBottom: "16px",
            boxShadow: "0 4px 20px rgba(123, 58, 236, 0.2)",
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "22px",
              fontWeight: 900,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            PRO AI MUA / BÁN
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "17px",
              fontWeight: 700,
              color: "#AA75FF",
              marginTop: "4px",
              textTransform: "uppercase",
            }}
          >
            TỰ ĐỘNG BÁO ĐIỂM MUA MỚI & ĐIỂM MUA THÊM CHUẨN XÁC
          </div>
        </div>

        {/* Stacked Feature Badge 2 */}
        <div
          style={{
            opacity: Math.max(0, tag2Spr),
            transform: `translateX(${interpolate(tag2Spr, [0, 1], [-30, 0])}px)`,
            backgroundColor: "rgba(52, 211, 153, 0.15)",
            borderLeft: "6px solid #34d399",
            padding: "14px 24px",
            borderRadius: "0 16px 16px 0",
            marginBottom: "16px",
            boxShadow: "0 4px 20px rgba(52, 211, 153, 0.15)",
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "22px",
              fontWeight: 900,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            QUÉT MẪU HÌNH HAI ĐÁY
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "17px",
              fontWeight: 700,
              color: "#34d399",
              marginTop: "4px",
              textTransform: "uppercase",
            }}
          >
            PHÁT HIỆN TỰ ĐỘNG CHÂN SÓNG & ĐÁY CỔ PHIẾU
          </div>
        </div>

        {/* Stacked Feature Badge 3 */}
        <div
          style={{
            opacity: Math.max(0, tag3Spr),
            transform: `translateX(${interpolate(tag3Spr, [0, 1], [-30, 0])}px)`,
            backgroundColor: "rgba(245, 197, 66, 0.15)",
            borderLeft: "6px solid #f5c542",
            padding: "14px 24px",
            borderRadius: "0 16px 16px 0",
            boxShadow: "0 4px 20px rgba(245, 197, 66, 0.15)",
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "22px",
              fontWeight: 900,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            GIÁ MỤC TIÊU & LỢI NHUẬN
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "17px",
              fontWeight: 700,
              color: "#f5c542",
              marginTop: "4px",
              textTransform: "uppercase",
            }}
          >
            TÍNH SẴN % KỲ VỌNG & VÙNG QUẢN LÝ VỊ THẾ
          </div>
        </div>
      </div>

      {/* Right Side: Phone Mockup (Safe Center-Right position, 100% visible) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          marginRight: "40px",
        }}
      >
        <PhoneMockup imageSrc={activeImage} scale={1.0} />
      </div>

      {/* Subtitle Banner */}
      <SubtitleBar
        text="TỰ ĐỘNG QUÉT TÍN HIỆU AI MUA/BÁN & MẪU HÌNH HAI ĐÁY"
        frame={frame}
        fps={fps}
      />
    </AbsoluteFill>
  );
};
