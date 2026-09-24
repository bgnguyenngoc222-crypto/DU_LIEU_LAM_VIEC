import React from "react";

// Simple silhouette figure (line-art) — 3 poses for Hook scene
// Pose 1: "che mặt" (covering face — overwhelmed)
// Pose 2: "look at camera" (4th wall break)
// Pose 3: "ngước cười" (looking up smiling)

interface Props {
  pose: 1 | 2 | 3;
  size?: number;
  color?: string;
  opacity?: number;
}

export const SilhouetteFigure: React.FC<Props> = ({
  pose,
  size = 220,
  color = "#1A1A2E",
  opacity = 0.85,
}) => {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 200 280"
      style={{ opacity }}
    >
      {/* Body — same in all poses */}
      <ellipse cx="100" cy="200" rx="70" ry="80" fill={color} />

      {/* Head */}
      <circle cx="100" cy="80" r="42" fill={color} />

      {/* Pose 1: covering face — both arms up */}
      {pose === 1 && (
        <>
          <path
            d="M55 85 Q40 60, 60 50 Q80 45, 90 70"
            fill={color}
            stroke={color}
            strokeWidth="4"
          />
          <path
            d="M145 85 Q160 60, 140 50 Q120 45, 110 70"
            fill={color}
            stroke={color}
            strokeWidth="4"
          />
          {/* Hands covering face */}
          <ellipse cx="75" cy="75" rx="20" ry="25" fill={color} />
          <ellipse cx="125" cy="75" rx="20" ry="25" fill={color} />
        </>
      )}

      {/* Pose 2: looking at camera (still, eyes facing front) */}
      {pose === 2 && (
        <>
          {/* Subtle eye dots — break 4th wall */}
          <circle cx="88" cy="78" r="3" fill="#FFFFFF" />
          <circle cx="112" cy="78" r="3" fill="#FFFFFF" />
          {/* Arms down at sides */}
          <ellipse cx="40" cy="200" rx="14" ry="60" fill={color} />
          <ellipse cx="160" cy="200" rx="14" ry="60" fill={color} />
        </>
      )}

      {/* Pose 3: looking up + slight smile */}
      {pose === 3 && (
        <>
          {/* Head tilted slightly back — chin up */}
          <circle cx="100" cy="78" r="42" fill={color} />
          {/* Smile arc */}
          <path
            d="M85 90 Q100 100, 115 90"
            stroke="#FFFFFF"
            strokeWidth="3"
            fill="none"
          />
          {/* Arms slightly raised */}
          <ellipse cx="55" cy="180" rx="14" ry="55" fill={color} transform="rotate(-15 55 180)" />
          <ellipse cx="145" cy="180" rx="14" ry="55" fill={color} transform="rotate(15 145 180)" />
        </>
      )}
    </svg>
  );
};
