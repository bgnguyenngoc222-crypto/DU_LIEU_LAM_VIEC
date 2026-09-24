import React from "react";

interface Props {
  prog: number;
  width?: number;
  height?: number;
  top?: number;
  left?: number | string;
  radius?: number;
  shadow?: boolean;
  children: React.ReactNode;
}

// Clean screenshot container — KHÔNG khung điện thoại, chỉ rounded card + shadow
// Default placement nằm gọn trong content safe zone (y: 300-1370)
export const ScreenContainer: React.FC<Props> = ({
  prog,
  width = 540,
  height = 1040,
  top = 320,
  left = "50%",
  radius = 24,
  shadow = true,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      width,
      height,
      transform: `translateX(-50%) translateY(${(1 - prog) * 100}px) scale(${0.94 + prog * 0.06})`,
      opacity: prog,
      borderRadius: radius,
      overflow: "hidden",
      background: "#fff",
      boxShadow: shadow ? "0 18px 50px rgba(0,0,0,0.18)" : "none",
    }}
  >
    {children}
  </div>
);
