import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS, SPRINGS, FONTS } from "../../design";

// Football player radar (FIFA/Sofascore style) — Scene 4 analogy
// 6 axes: PAS / SHO / PHY / DRI / DEF / PAC
// Pulse glow on Shooting axis to match "trục nhô" sync with KFSP radar

interface Props {
  appearFrame?: number;
  pulseFrame?: number;  // when "Shooting" axis glows in sync with KFSP "ROIC"
  size?: number;
}

const STATS = [
  { label: "PAS", value: 86, angleDeg: -90 },     // top
  { label: "SHO", value: 92, angleDeg: -30 },     // top-right (NHÔ — strongest)
  { label: "PHY", value: 78, angleDeg: 30 },      // bottom-right
  { label: "DRI", value: 90, angleDeg: 90 },      // bottom
  { label: "DEF", value: 48, angleDeg: 150 },     // bottom-left (LÕM — weakest)
  { label: "PAC", value: 84, angleDeg: 210 },     // top-left
];

export const FootballRadar: React.FC<Props> = ({
  appearFrame = 0,
  pulseFrame = 100,
  size = 360,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.42;

  // Appear progress
  const appearProg = spring({
    frame: frame - appearFrame,
    fps,
    config: SPRINGS.calm,
  });

  // Pulse on SHO (Shooting) axis
  const pulseProg = spring({
    frame: frame - pulseFrame,
    fps,
    config: SPRINGS.resolve,
  });
  const pulseAlpha = pulseProg > 0 ? Math.sin((frame - pulseFrame) * 0.4) * 0.4 + 0.6 : 0;

  // Compute polygon points
  const points = STATS.map((s) => {
    const a = (s.angleDeg * Math.PI) / 180;
    const r = (s.value / 100) * maxR * appearProg;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  const polygonStr = points.map((p) => `${p[0]},${p[1]}`).join(" ");

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1].map((r) => maxR * r);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* Player avatar #10 silhouette */}
      <div
        style={{
          position: "absolute",
          left: -10,
          top: -50,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1A1A2E, #3A3A5E)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          fontWeight: 900,
          color: COLORS.accentGold,
          fontFamily: FONTS.family,
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          opacity: appearProg,
        }}
      >
        10
      </div>

      {/* Rating */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: -30,
          fontSize: 56,
          fontWeight: 900,
          color: COLORS.accentGold,
          fontFamily: FONTS.family,
          textShadow: "0 2px 8px rgba(245, 197, 66, 0.5)",
          opacity: appearProg,
        }}
      >
        9.2
      </div>

      <svg width={size} height={size}>
        {/* Grid rings */}
        {rings.map((r, i) => {
          const ringPoints = STATS.map((s) => {
            const a = (s.angleDeg * Math.PI) / 180;
            return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
          }).join(" ");
          return (
            <polygon
              key={i}
              points={ringPoints}
              fill="none"
              stroke="rgba(245, 197, 66, 0.15)"
              strokeWidth={1}
            />
          );
        })}

        {/* Axis lines */}
        {STATS.map((s, i) => {
          const a = (s.angleDeg * Math.PI) / 180;
          const x2 = cx + maxR * Math.cos(a);
          const y2 = cy + maxR * Math.sin(a);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke="rgba(245, 197, 66, 0.2)"
              strokeWidth={1}
            />
          );
        })}

        {/* Player polygon */}
        <polygon
          points={polygonStr}
          fill="rgba(245, 197, 66, 0.3)"
          stroke={COLORS.accentGold}
          strokeWidth={2.5}
          style={{
            filter: pulseAlpha > 0.3 ? `drop-shadow(0 0 ${10 + pulseAlpha * 12}px rgba(245, 197, 66, 0.7))` : undefined,
          }}
        />

        {/* Pulse on SHO axis (index 1) */}
        {pulseProg > 0 && (
          <circle
            cx={points[1][0]}
            cy={points[1][1]}
            r={8 + pulseAlpha * 6}
            fill={COLORS.accentGold}
            opacity={pulseAlpha}
          />
        )}

        {/* Vertex dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={4} fill={COLORS.accentGold} opacity={appearProg} />
        ))}

        {/* Stat labels */}
        {STATS.map((s, i) => {
          const a = (s.angleDeg * Math.PI) / 180;
          const labelR = maxR + 28;
          const x = cx + labelR * Math.cos(a);
          const y = cy + labelR * Math.sin(a);
          return (
            <g key={i}>
              <text
                x={x}
                y={y}
                fill="#FFFFFF"
                fontSize={16}
                fontWeight={700}
                textAnchor="middle"
                alignmentBaseline="middle"
                opacity={appearProg}
              >
                {s.label}
              </text>
              <text
                x={x}
                y={y + 16}
                fill={s.value >= 80 ? COLORS.accentGreen : s.value <= 50 ? COLORS.accentRed : "#FFFFFF"}
                fontSize={14}
                fontWeight={700}
                textAnchor="middle"
                alignmentBaseline="middle"
                opacity={appearProg}
              >
                {s.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
