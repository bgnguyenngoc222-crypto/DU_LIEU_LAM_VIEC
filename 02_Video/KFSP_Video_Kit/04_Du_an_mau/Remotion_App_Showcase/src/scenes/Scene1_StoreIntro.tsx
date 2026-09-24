import React from "react";
import { AbsoluteFill, spring, interpolate, staticFile } from "remotion";
import { PhoneMockup } from "../components/PhoneMockup";
import { SubtitleBar } from "../components/SubtitleBar";

export const Scene1_StoreIntro: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const spr = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  const scale = interpolate(spr, [0, 1], [0.8, 1.05]);
  const opacity = interpolate(spr, [0, 1], [0, 1]);
  const titleX = interpolate(spr, [0, 1], [-50, 0]);

  // Using newly renamed official Vietnamese App Store screenshot
  const appScreenshot = staticFile("kfsp-appstore-vi.png");

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0a1628",
        padding: "0 140px",
      }}
    >
      {/* Left Title Text */}
      <div
        style={{
          transform: `translateX(${titleX}px)`,
          opacity,
          maxWidth: "700px",
        }}
      >
        <div
          style={{
            fontSize: "56px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "1px",
            lineHeight: 1.2,
          }}
        >
          KHÁM PHÁ<br />ỨNG DỤNG KFSP
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "#AA75FF",
            marginTop: "20px",
          }}
        >
          Nền tảng hỗ trợ đầu tư chứng khoán thông minh cho nhà đầu tư cá nhân.
        </div>
      </div>

      {/* Right Phone Showcase */}
      <div style={{ opacity, transform: `scale(${scale})` }}>
        <PhoneMockup imageSrc={appScreenshot} scale={scale} />
      </div>

      {/* Subtitle Banner */}
      <SubtitleBar
        text="Khám phá ứng dụng KFSP - Nền tảng hỗ trợ đầu tư chứng khoán"
        frame={frame}
        fps={fps}
      />
    </AbsoluteFill>
  );
};
