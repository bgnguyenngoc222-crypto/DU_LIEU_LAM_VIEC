import React from "react";
import { spring, interpolate } from "remotion";

interface SubtitleBarProps {
  text: string;
  frame: number;
  fps: number;
}

export const SubtitleBar: React.FC<SubtitleBarProps> = ({ text, frame, fps }) => {
  const spr = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 160 },
  });

  const opacity = interpolate(spr, [0, 1], [0, 1]);
  const translateY = interpolate(spr, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "80px", // Vùng an toàn phía dưới, tách biệt hoàn toàn khỏi logo top (y:78) và tagline
        left: "50%",
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        backgroundColor: "rgba(10, 22, 40, 0.92)",
        border: "2px solid #7B3AEC", // Viền màu tím chủ đạo KFSP
        padding: "16px 44px",
        borderRadius: "40px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 24px rgba(123, 58, 236, 0.4)",
        backdropFilter: "blur(10px)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "28px",
          fontWeight: 800,
          color: "#ffffff",
          textAlign: "center",
          letterSpacing: "1px",
          textTransform: "uppercase", // In hoa toàn bộ phụ đề
        }}
      >
        {text}
      </div>
    </div>
  );
};
