import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../design";

/**
 * Big labels for the 4 RRG zones, staggered. Only used in Scene 1 (RRG Zones intro).
 * Coordinates in output space (1920×920).
 * Scene 1 uses freeze frame t=0 where RRG chart occupies roughly x=770-1860, y=35-870.
 */
const ZONES = [
  {
    label: "DẪN DẮT",
    desc: "Sức mạnh cao · Giá tăng",
    color: COLORS.zoneLeadGreen,
    x: 1400,
    y: 110,
    delay: 0,
  },
  {
    label: "PHỤC HỒI",
    desc: "Sức mạnh yếu · Giá tăng",
    color: COLORS.zoneRecoverPurple,
    x: 820,
    y: 110,
    delay: 18,
  },
  {
    label: "SUY YẾU",
    desc: "Sức mạnh cao · Giá giảm",
    color: COLORS.zoneWeakenOrange,
    x: 1400,
    y: 680,
    delay: 36,
  },
  {
    label: "ĐUỐI SỐ",
    desc: "Sức mạnh yếu · Giá giảm",
    color: COLORS.zoneLaggardRed,
    x: 820,
    y: 680,
    delay: 54,
  },
];

export const RRGZoneLabels: React.FC<{ startDelay?: number }> = ({
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {ZONES.map((z) => {
        const localFrame = frame - startDelay - z.delay;
        const appear = spring({
          frame: localFrame,
          fps,
          config: SPRINGS.decisive,
        });
        return (
          <div
            key={z.label}
            style={{
              position: "absolute",
              left: z.x,
              top: z.y,
              opacity: appear,
              transform: `scale(${0.6 + 0.4 * appear}) translateY(${(1 - appear) * 14}px)`,
              transformOrigin: "left center",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "12px 22px",
                background: `${z.color}ee`,
                color: "#ffffff",
                borderRadius: 10,
                ...FONTS.zoneLabel,
                boxShadow: `0 8px 24px ${z.color}55, 0 0 0 2px rgba(255,255,255,0.35)`,
                marginBottom: 8,
              }}
            >
              {z.label}
            </div>
            <div
              style={{
                background: COLORS.navyGlass,
                color: COLORS.offWhite,
                padding: "8px 16px",
                borderRadius: 8,
                ...FONTS.zoneDesc,
                backdropFilter: "blur(10px)",
                border: `1px solid ${COLORS.navyBorder}`,
                maxWidth: 340,
              }}
            >
              {z.desc}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
