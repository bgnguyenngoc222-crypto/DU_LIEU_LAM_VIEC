import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { T } from "./theme";

const LIGHT = "radial-gradient(120% 92% at 50% 32%, #ffffff 0%, #f3f3f7 44%, #e2e2e9 100%)";
const DARK = "radial-gradient(120% 92% at 50% 40%, #1c2440 0%, #101728 46%, #060a12 100%)";

/** Nền: sáng → tối → tím thương hiệu, cộng đốm nhoè và vệt sáng quét. */
export const Bg: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const dark = interpolate(f, [300, 348, 690, 714], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const brand = interpolate(f, [690, 720], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: LIGHT }} />

      {/* vệt sáng quét chậm trên nền sáng */}
      <AbsoluteFill
        style={{
          opacity: (1 - dark) * 0.85,
          background:
            "linear-gradient(104deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.85) 46%, rgba(255,255,255,0) 62%)",
          translate: `${interpolate(f, [0, 360], [-width * 0.7, width * 0.7])}px 0px`,
        }}
      />

      <AbsoluteFill style={{ background: DARK, opacity: dark }} />

      {/* đốm nhoè hậu cảnh bàn làm việc, chỉ trên nền tối */}
      <AbsoluteFill style={{ opacity: dark * 0.95 }}>
        {[
          { x: 0.1, y: 0.16, r: 0.4, c: "rgba(123,58,236,.34)" },
          { x: 0.88, y: 0.24, r: 0.3, c: "rgba(52,211,153,.16)" },
          { x: 0.2, y: 0.82, r: 0.36, c: "rgba(170,117,255,.24)" },
          { x: 0.8, y: 0.74, r: 0.46, c: "rgba(91,32,204,.28)" },
        ].map((b, i) => {
          const r = b.r * width;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: b.x * width - r / 2,
                top: b.y * height - r / 2,
                width: r,
                height: r,
                borderRadius: "50%",
                background: b.c,
                filter: `blur(${width * 0.09}px)`,
                translate: `0px ${Math.sin((f + i * 60) / 90) * width * 0.012}px`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: brand,
          background: `linear-gradient(158deg, ${T.purpleDark} 0%, ${T.purple} 54%, #8f52f7 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
