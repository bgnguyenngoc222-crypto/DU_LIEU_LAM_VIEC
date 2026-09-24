import React from "react";
import { AbsoluteFill, spring, interpolate, staticFile, Img } from "remotion";
import { SubtitleBar } from "../../components/SubtitleBar";

export const Scene4_VerticalBrandCTA: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const spr = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  const logoSpr = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  const buttonSpr = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  const opacity = interpolate(spr, [0, 1], [0, 1]);
  const scale = interpolate(spr, [0, 1], [0.85, 1]);
  const logoScale = interpolate(logoSpr, [0, 1], [0.6, 1]);
  const btnScale = interpolate(buttonSpr, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a1628",
        color: "#ffffff",
        fontFamily: "Inter, sans-serif",
        opacity,
        padding: "0 60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${scale})`,
          textAlign: "center",
          marginTop: "-100px",
        }}
      >
        {/* App Logo */}
        <div style={{ transform: `scale(${Math.max(0, logoScale)})`, marginBottom: "20px" }}>
          <Img
            src={staticFile("logo-kfsp.png")}
            style={{
              width: "160px",
              height: "160px",
              objectFit: "contain",
              filter: "brightness(0) invert(1) drop-shadow(0 6px 24px rgba(123, 58, 236, 0.7))",
            }}
          />
        </div>

        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "52px",
            fontWeight: 900,
            letterSpacing: "3px",
            color: "#ffffff",
            marginBottom: "12px",
            textTransform: "uppercase",
          }}
        >
          CƠ HỘI TIỀM NĂNG
        </div>

        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "30px",
            fontWeight: 800,
            color: "#34d399",
            marginBottom: "32px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          MANG LỢI THẾ VỀ TẦM TAY BẠN
        </div>

        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "40px",
            fontWeight: 900,
            color: "#AA75FF",
            textAlign: "center",
            lineHeight: 1.25,
            marginBottom: "48px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          ĐƯA CHỨNG KHOÁN VỀ TẦM TAY BẠN
        </div>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${Math.max(0, btnScale)})`,
            backgroundColor: "#7B3AEC",
            color: "#ffffff",
            fontFamily: "Inter, sans-serif",
            fontSize: "28px",
            fontWeight: 900,
            padding: "20px 48px",
            borderRadius: "44px",
            boxShadow: "0 0 40px rgba(123, 58, 236, 0.8)",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          MỞ APP KFSP TRẢI NGHIỆM NGAY
        </div>
      </div>

      {/* Subtitle Banner */}
      <SubtitleBar
        text="KFSP - ĐƯA CHỨNG KHOÁN VỀ TẦM TAY BẠN"
        frame={frame}
        fps={fps}
      />
    </AbsoluteFill>
  );
};
