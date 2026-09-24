import React from "react";
import { AbsoluteFill, spring, interpolate, staticFile, Img } from "remotion";
import { SubtitleBar } from "../components/SubtitleBar";

export const Scene4_CTA: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const spr = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  const buttonSpr = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  const opacity = interpolate(spr, [0, 1], [0, 1]);
  const scale = interpolate(spr, [0, 1], [0.8, 1]);
  const btnScale = interpolate(buttonSpr, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a1628",
        color: "#ffffff",
        gap: "80px",
      }}
    >
      {/* Brand Logo & Spine */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <Img
          src={staticFile("logo-kfsp.png")}
          style={{
            width: "140px",
            height: "140px",
            objectFit: "contain",
            filter: "brightness(0) invert(1) drop-shadow(0 4px 16px rgba(123, 58, 236, 0.6))",
            marginBottom: "20px",
          }}
        />

        <div
          style={{
            fontSize: "60px",
            fontWeight: 900,
            letterSpacing: "6px",
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          KFSP
        </div>

        <div
          style={{
            fontSize: "44px",
            fontWeight: 800,
            color: "#AA75FF",
            textAlign: "center",
            lineHeight: 1.3,
            marginBottom: "36px",
          }}
        >
          ĐƯA CHỨNG KHOÁN VỀ TẦM TAY BẠN
        </div>

        <div
          style={{
            transform: `scale(${Math.max(0, btnScale)})`,
            backgroundColor: "#7B3AEC",
            color: "#ffffff",
            fontSize: "30px",
            fontWeight: 800,
            padding: "18px 48px",
            borderRadius: "40px",
            boxShadow: "0 0 40px rgba(123, 58, 236, 0.8)",
            letterSpacing: "1px",
          }}
        >
          Tải App & Trải Nghiệm Ngay
        </div>
      </div>

      {/* Subtitle Banner */}
      <SubtitleBar
        text="KFSP - Đưa chứng khoán về tầm tay bạn"
        frame={frame}
        fps={fps}
      />
    </AbsoluteFill>
  );
};
