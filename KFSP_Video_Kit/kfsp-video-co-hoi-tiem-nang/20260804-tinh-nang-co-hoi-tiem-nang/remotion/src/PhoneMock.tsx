import React from "react";
import { Img, staticFile } from "remotion";
import { HOLE, MOCK_RATIO } from "./theme";

/**
 * Khung điện thoại = ảnh mockup iPhone 17 Pro thật (PNG viền, giữa trong suốt).
 * Nội dung đặt SAU ảnh, vừa khít hố màn — hố tỉ lệ 0,4600 vs clip 0,4621
 * nên đặt trọn, KHÔNG cắt (luật: muốn phóng thì phóng cả khung máy).
 */
export const PhoneMock: React.FC<{
  h: number;
  children: React.ReactNode;
  glare?: number;
}> = ({ h, children, glare = 0 }) => {
  const w = h * MOCK_RATIO;
  const screenW = HOLE.width * w;
  const screenH = HOLE.height * h;

  return (
    <div style={{ position: "relative", width: w, height: h }}>
      {/*
       * Bóng đổ bám ĐÚNG hình thân máy (bo góc như máy thật).
       * KHÔNG dùng quầng box-shadow trên khối chữ nhật: nó vẽ mảng có viền
       * hình chữ nhật quanh máy, trên nền tối đọc thành một vùng tối rất xấu.
       * Cũng bỏ quầng màu tím — viền kim loại của mockup đã đủ tách khỏi nền.
       */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: w * 0.152,
          boxShadow: `0 ${h * 0.035}px ${h * 0.1}px rgba(0,0,0,.42), 0 ${h * 0.012}px ${
            h * 0.035
          }px rgba(0,0,0,.3)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: HOLE.left * w,
          top: HOLE.top * h,
          width: screenW,
          height: screenH,
          // góc bo đúng bằng góc hố của mockup, nếu để vuông thì bốn góc lòi ra ngoài viền
          borderRadius: screenW * 0.115,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {children}

        {/* che thanh trạng thái iOS: giờ, pin, và viên đỏ "đang ghi màn hình" */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: screenH * 0.052,
            background: "#ffffff",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(112deg, rgba(255,255,255,0) 34%, rgba(255,255,255,.30) 46%, rgba(255,255,255,0) 58%)",
            opacity: glare,
            pointerEvents: "none",
          }}
        />
      </div>

      <Img
        src={staticFile("phone.png")}
        style={{ position: "absolute", inset: 0, width: w, height: h }}
      />
    </div>
  );
};

/**
 * Vòng sáng khoanh một vùng TRÊN MÀN — toạ độ tính theo phần trăm của màn hình,
 * nên tự bám theo máy khi máy phóng to hay xoay.
 */
export const ScreenRing: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  p: number;
  pulse: number;
  r: number;
}> = ({ x, y, w, h, p, pulse, r }) => (
  <div
    style={{
      position: "absolute",
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      width: `${w * 100}%`,
      height: `${h * 100}%`,
      borderRadius: r,
      border: `${Math.max(2, r * 0.16)}px solid rgba(123,58,236,${0.95 * p})`,
      boxShadow: `0 0 ${r * (1.4 + 1.4 * pulse)}px rgba(123,58,236,${0.7 * p})`,
      opacity: p,
      scale: 1 + (1 - p) * 0.06,
      pointerEvents: "none",
    }}
  />
);
