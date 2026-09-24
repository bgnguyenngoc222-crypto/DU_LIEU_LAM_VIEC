import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS, VIDEO } from "../design";

/**
 * A glass card with an animated curved arrow pointing to a target point.
 * card = where the text sits, target = pixel that arrow tip points at.
 * Arrow draws with stroke-dash from card towards target.
 */
export const ArrowCallout: React.FC<{
  cardX: number;
  cardY: number;
  cardW?: number;
  targetX: number;
  targetY: number;
  text: string;
  color?: string;
  delay?: number;
  emphasis?: "default" | "large";
  /** Direction the arrow exits the card: which side of card does the arrow come out */
  cardAnchor?: "right" | "left" | "bottom" | "top";
}> = ({
  cardX,
  cardY,
  cardW = 480,
  targetX,
  targetY,
  text,
  color = COLORS.gold,
  delay = 0,
  emphasis = "default",
  cardAnchor = "bottom",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardAppear = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.decisive,
  });

  const arrowDraw = spring({
    frame: frame - delay - 8,
    fps,
    config: SPRINGS.calm,
  });

  const cardHeight = emphasis === "large" ? 140 : 110;

  // Arrow start point = anchor point on card edge
  let startX = cardX + cardW / 2;
  let startY = cardY + cardHeight;
  if (cardAnchor === "top") {
    startY = cardY;
  } else if (cardAnchor === "right") {
    startX = cardX + cardW;
    startY = cardY + cardHeight / 2;
  } else if (cardAnchor === "left") {
    startX = cardX;
    startY = cardY + cardHeight / 2;
  }

  // Control point for curved path — bias towards target, slight arc
  const dx = targetX - startX;
  const dy = targetY - startY;
  const cpX = startX + dx * 0.4 + (Math.abs(dy) > Math.abs(dx) ? dx * 0.3 : 0);
  const cpY = startY + dy * 0.6 + (Math.abs(dx) > Math.abs(dy) ? 40 : 0);

  const pathId = `arrow-${Math.round(cardX)}-${Math.round(cardY)}-${Math.round(targetX)}`;
  const pathD = `M ${startX} ${startY} Q ${cpX} ${cpY} ${targetX} ${targetY}`;

  // Arrowhead size + angle
  const angle = Math.atan2(targetY - cpY, targetX - cpX);
  const headLen = 22;
  const headAngle = 0.5;
  const hx1 = targetX - headLen * Math.cos(angle - headAngle);
  const hy1 = targetY - headLen * Math.sin(angle - headAngle);
  const hx2 = targetX - headLen * Math.cos(angle + headAngle);
  const hy2 = targetY - headLen * Math.sin(angle + headAngle);

  const fontStyle = emphasis === "large" ? FONTS.calloutLarge : FONTS.callout;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Arrow SVG */}
      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        viewBox={`0 0 ${VIDEO.width} ${VIDEO.height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={1000}
          strokeDashoffset={1000 - 1000 * arrowDraw}
          style={{ filter: `drop-shadow(0 2px 6px rgba(0,0,0,0.35))` }}
        />
        {arrowDraw > 0.85 && (
          <g
            opacity={Math.min(1, (arrowDraw - 0.85) / 0.15)}
            style={{ filter: `drop-shadow(0 2px 6px rgba(0,0,0,0.35))` }}
          >
            <polygon
              points={`${targetX},${targetY} ${hx1},${hy1} ${hx2},${hy2}`}
              fill={color}
            />
          </g>
        )}
      </svg>

      {/* Glass card */}
      <div
        style={{
          position: "absolute",
          left: cardX,
          top: cardY,
          width: cardW,
          minHeight: cardHeight,
          padding: "22px 28px",
          background: COLORS.navyGlass,
          border: `1.5px solid ${COLORS.navyBorder}`,
          borderRadius: 16,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          color: COLORS.offWhite,
          ...fontStyle,
          transform: `scale(${0.7 + 0.3 * cardAppear}) translateY(${(1 - cardAppear) * 12}px)`,
          transformOrigin: "center",
          opacity: cardAppear,
          boxShadow: `0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px ${color}40`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -1,
            left: -1,
            right: -1,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            borderRadius: "16px 16px 0 0",
          }}
        />
        {text}
      </div>
    </AbsoluteFill>
  );
};
