import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate, Easing } from "remotion";
import React from "react";
import { COLORS, FONTS, SPRINGS } from "../design";
import { TermsOverload } from "../components/fa/TermsOverload";

// ═══════════════════════════════════════════
// Scene 1 — HOOK (f0-f486, 16.2s)
// Layout: 18 từ khoá tài chính NGUY HIỂM swirl 2 vòng tròn ngược chiều
// Trung tâm bỏ trống → cảm giác overwhelm hoàn toàn
//
// Phases:
//   f0-f180   Terms swirl 2 ring ngược chiều (overload)
//   f180-f300 Slow down — tension freeze
//   f300-f360 Snap "BẠN CŨNG THẤY CHOÁNG?" ở giữa + ? nháy
//   f360-f486 Terms dim đi — bg chuyển warm (sub kể chuyện)
// ═══════════════════════════════════════════

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const FREEZE_FROM = 180;
  const SNAP_FROM = 300;
  const RELIEF_FROM = 360;
  const CHOANG_EMPHASIS_FROM = 330; // frame khi từ CHOÁNG bắt đầu nhấn mạnh

  // BG: từ red-warm overload → dần soft purple (hope) sau RELIEF
  const reliefProg = interpolate(frame, [RELIEF_FROM, RELIEF_FROM + 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Snap text scale — line 1 "Bạn cũng đang" xuất hiện trước, CHOÁNG snap sau
  const snapProg = spring({ frame: frame - SNAP_FROM, fps, config: SPRINGS.resolve });
  const choangProg = spring({ frame: frame - CHOANG_EMPHASIS_FROM, fps, config: SPRINGS.decisive });
  const showSnap = frame >= SNAP_FROM; // giữ đến hết HOOK scene
  // Pulse gentle cho CHOÁNG (sau khi snap xong)
  const choangPulse = frame >= CHOANG_EMPHASIS_FROM + 10
    ? 1 + Math.sin((frame - CHOANG_EMPHASIS_FROM) * 0.12) * 0.025
    : 1;

  // Terms dim sau RELIEF
  const termsOpacity = interpolate(frame, [RELIEF_FROM, RELIEF_FROM + 60], [1, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Blur terms từ FREEZE_FROM → tăng dần tới RELIEF (signal sắp hết HOOK)
  const termsBlur = interpolate(
    frame,
    [FREEZE_FROM, SNAP_FROM, RELIEF_FROM + 40],
    [0, 3, 7],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Dark overlay đè lên BG từ FREEZE_FROM (tối dần để chữ nổi)
  const darkOverlay = interpolate(
    frame,
    [FREEZE_FROM, SNAP_FROM, RELIEF_FROM + 40],
    [0, 0.18, 0.32],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* BG layer 1: red overload heartbeat */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(239, 68, 68, ${0.10 + Math.sin(frame * 0.4) * 0.04}), rgba(255, 240, 240, 0.4))`,
          opacity: 1 - reliefProg,
        }}
      />
      {/* BG layer 2: relief purple glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15), rgba(245, 240, 255, 0.6))`,
          opacity: reliefProg,
        }}
      />

      {/* Terms swirl 2 ring ngược chiều — center trống */}
      <div style={{ opacity: termsOpacity, filter: `blur(${termsBlur}px)` }}>
        <TermsOverload freezeFrame={FREEZE_FROM} />
      </div>

      {/* Dark overlay — tối dần từ FREEZE để text snap/relief nổi bật */}
      <AbsoluteFill
        style={{
          background: `rgba(15, 12, 30, ${darkOverlay})`,
          pointerEvents: "none",
        }}
      />

      {/* Snap text 2 dòng — centered trên nền tối mờ
          Dòng 1: "Bạn cũng đang" — đều tông
          Dòng 2: "CHOÁNG" — to gấp rưỡi, màu đỏ rực, glow, pulse nhẹ */}
      {showSnap && (
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            zIndex: 30,
          }}
        >
          <div
            style={{
              ...FONTS.heading,
              fontFamily: FONTS.family,
              fontSize: 88,
              color: "#FFFFFF",
              fontWeight: 800,
              letterSpacing: -1,
              textShadow: "0 2px 20px rgba(0,0,0,0.7)",
              transform: `scale(${snapProg})`,
              transformOrigin: "center",
              lineHeight: 1,
            }}
          >
            Bạn cũng đang
          </div>
          <div
            style={{
              ...FONTS.heading,
              fontFamily: FONTS.family,
              fontSize: 200,
              color: "#EF4444",
              fontWeight: 900,
              letterSpacing: -3,
              textShadow: "0 4px 30px rgba(239,68,68,0.55), 0 0 60px rgba(239,68,68,0.35)",
              transform: `scale(${choangProg * choangPulse})`,
              transformOrigin: "center",
              lineHeight: 1,
            }}
          >
            CHOÁNG
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
