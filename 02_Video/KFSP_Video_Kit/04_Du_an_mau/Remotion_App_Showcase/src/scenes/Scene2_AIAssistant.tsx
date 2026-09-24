import React from "react";
import { AbsoluteFill, spring, interpolate, staticFile } from "remotion";
import { PhoneMockup } from "../components/PhoneMockup";
import { SubtitleBar } from "../components/SubtitleBar";

export const Scene2_AIAssistant: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const spr = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 150 },
  });

  const tagSpr1 = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const tagSpr2 = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  const tagSpr3 = spring({ frame: frame - 30, fps, config: { damping: 14 } });

  const scale = interpolate(spr, [0, 1], [1.0, 1.12]);
  const dashboardImage = staticFile("kfsp-dashboard-home.png");

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0a1628",
        padding: "0 120px",
      }}
    >
      {/* Left Title Panel */}
      <div style={{ maxWidth: "600px", zIndex: 20 }}>
        <div
          style={{
            fontSize: "52px",
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.2,
          }}
        >
          CÔNG CỤ HỖ TRỢ<br />GIAO DỊCH VƯỢT TRỘI
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#AA75FF",
            marginTop: "16px",
            fontWeight: 600,
          }}
        >
          Lọc cổ phiếu, tự động hóa cảnh báo và hỗ trợ phân tích dữ liệu.
        </div>
      </div>

      {/* Center Phone Mockup */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <PhoneMockup imageSrc={dashboardImage} scale={scale} />

        {/* Feature Badges */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "-220px",
            opacity: Math.max(0, tagSpr1),
            transform: `scale(${tagSpr1})`,
            backgroundColor: "rgba(123, 58, 236, 0.95)",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "30px",
            fontSize: "22px",
            fontWeight: 700,
            boxShadow: "0 8px 24px rgba(123, 58, 236, 0.5)",
            zIndex: 30,
            whiteSpace: "nowrap",
          }}
        >
          Bộ lọc tự nhiên
        </div>

        <div
          style={{
            position: "absolute",
            top: "260px",
            right: "-240px",
            opacity: Math.max(0, tagSpr2),
            transform: `scale(${tagSpr2})`,
            backgroundColor: "rgba(52, 211, 153, 0.95)",
            color: "#0a1628",
            padding: "12px 24px",
            borderRadius: "30px",
            fontSize: "22px",
            fontWeight: 800,
            boxShadow: "0 8px 24px rgba(52, 211, 153, 0.4)",
            zIndex: 30,
            whiteSpace: "nowrap",
          }}
        >
          Watchlist & Cảnh báo
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "120px",
            right: "-260px",
            opacity: Math.max(0, tagSpr3),
            transform: `scale(${tagSpr3})`,
            backgroundColor: "rgba(245, 197, 66, 0.95)",
            color: "#0a1628",
            padding: "12px 24px",
            borderRadius: "30px",
            fontSize: "22px",
            fontWeight: 800,
            boxShadow: "0 8px 24px rgba(245, 197, 66, 0.4)",
            zIndex: 30,
            whiteSpace: "nowrap",
          }}
        >
          Tín hiệu AI Assistant
        </div>
      </div>

      {/* Subtitle Banner */}
      <SubtitleBar
        text="Bộ lọc tự nhiên, Watchlist & Tín hiệu cảnh báo AI Assistant"
        frame={frame}
        fps={fps}
      />
    </AbsoluteFill>
  );
};
