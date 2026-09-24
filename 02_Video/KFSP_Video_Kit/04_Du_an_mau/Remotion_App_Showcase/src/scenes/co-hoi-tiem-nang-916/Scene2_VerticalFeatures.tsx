import React from "react";
import { AbsoluteFill, spring, interpolate, staticFile } from "remotion";
import { PhoneMockup } from "../../components/PhoneMockup";
import { SubtitleBar } from "../../components/SubtitleBar";

export const Scene2_VerticalFeatures: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const spr = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140 },
  });

  const exitSpr = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const opacity = interpolate(spr, [0, 1], [0, 1]) * interpolate(exitSpr, [0, 1], [1, 0]);
  const scale = frame > 75 ? interpolate(exitSpr, [0, 1], [1, 1.08]) : interpolate(spr, [0, 1], [0.92, 1]);

  const tag1Spr = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 14 } });
  const tag2Spr = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 14 } });
  const tag3Spr = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 14 } });

  const activeImage =
    frame < 45
      ? staticFile("kfsp-pro-ai-mua-ban-list.png")
      : staticFile("kfsp-pro-hai-day-list.png");

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#0a1628",
        paddingTop: "90px",
        fontFamily: "Inter, sans-serif",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "44px",
          fontWeight: 900,
          color: "#ffffff",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "24px",
          padding: "0 40px",
        }}
      >
        2 BỘ CÔNG CỤ QUÉT TÍN HIỆU PRO
      </div>

      {/* 3 Horizontal Feature Pills stacked vertically */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "90%",
          maxWidth: "880px",
          marginBottom: "30px",
          zIndex: 20,
        }}
      >
        {/* Pill 1 */}
        <div
          style={{
            opacity: Math.max(0, tag1Spr),
            transform: `translateY(${interpolate(tag1Spr, [0, 1], [20, 0])}px)`,
            backgroundColor: "rgba(123, 58, 236, 0.25)",
            borderLeft: "6px solid #7B3AEC",
            padding: "12px 24px",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: 900, color: "#ffffff", textTransform: "uppercase" }}>
            PRO AI MUA / BÁN
          </span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#AA75FF", textTransform: "uppercase" }}>
            TỰ ĐỘNG BÁO ĐIỂM VÀO LỆNH
          </span>
        </div>

        {/* Pill 2 */}
        <div
          style={{
            opacity: Math.max(0, tag2Spr),
            transform: `translateY(${interpolate(tag2Spr, [0, 1], [20, 0])}px)`,
            backgroundColor: "rgba(52, 211, 153, 0.2)",
            borderLeft: "6px solid #34d399",
            padding: "12px 24px",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: 900, color: "#ffffff", textTransform: "uppercase" }}>
            QUÉT MẪU HÌNH HAI ĐÁY
          </span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#34d399", textTransform: "uppercase" }}>
            BẮT ĐÚNG CHÂN SÓNG
          </span>
        </div>

        {/* Pill 3 */}
        <div
          style={{
            opacity: Math.max(0, tag3Spr),
            transform: `translateY(${interpolate(tag3Spr, [0, 1], [20, 0])}px)`,
            backgroundColor: "rgba(245, 197, 66, 0.2)",
            borderLeft: "6px solid #f5c542",
            padding: "12px 24px",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: 900, color: "#ffffff", textTransform: "uppercase" }}>
            GIÁ MỤC TIÊU & LN
          </span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#f5c542", textTransform: "uppercase" }}>
            TÍNH SẴN % KỲ VỌNG
          </span>
        </div>
      </div>

      {/* Large Phone Mockup for 9:16 */}
      <div style={{ zIndex: 10 }}>
        <PhoneMockup imageSrc={activeImage} scale={1.12} />
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
