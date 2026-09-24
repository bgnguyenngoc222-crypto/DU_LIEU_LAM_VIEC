import { interpolate, useCurrentFrame } from "remotion";
import React from "react";
import { RSData } from "../../types";

interface LineChartProps {
  data: RSData[];
  delay?: number;
  width?: number;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  delay = 0,
  width = 960,
  height = 600,
}) => {
  const frame = useCurrentFrame();
  const padding = { top: 40, right: 40, bottom: 60, left: 80 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Find min/max across all data
  const allValues = data.flatMap((d) => d.values);
  const minVal = Math.min(...allValues) - 5;
  const maxVal = Math.max(...allValues) + 5;

  // Draw progress (animated line drawing)
  const drawProgress = interpolate(
    frame,
    [delay, delay + 45],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <svg width={width} height={height} style={{ margin: "0 auto", display: "block" }}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = padding.top + chartH * (1 - t);
        const val = minVal + (maxVal - minVal) * t;
        return (
          <g key={t}>
            <line
              x1={padding.left}
              y1={y}
              x2={padding.left + chartW}
              y2={y}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={1}
            />
            <text
              x={padding.left - 12}
              y={y + 5}
              fill="rgba(255,255,255,0.6)"
              fontSize={18}
              textAnchor="end"
            >
              {val.toFixed(0)}
            </text>
          </g>
        );
      })}

      {/* Data lines */}
      {data.map((series) => {
        const points = series.values.map((val, i) => {
          const x = padding.left + (i / (series.values.length - 1)) * chartW;
          const y =
            padding.top +
            chartH * (1 - (val - minVal) / (maxVal - minVal));
          return `${x},${y}`;
        });

        const totalPoints = points.length;
        const visibleCount = Math.floor(totalPoints * drawProgress);
        const visiblePoints = points.slice(0, visibleCount + 1);

        return (
          <polyline
            key={series.sector}
            points={visiblePoints.join(" ")}
            fill="none"
            stroke={series.color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}

      {/* Legend */}
      {data.map((series, i) => (
        <g key={series.sector} transform={`translate(${padding.left + i * 180}, ${height - 20})`}>
          <rect width={16} height={16} rx={4} fill={series.color} />
          <text
            x={22}
            y={13}
            fill="rgba(255,255,255,0.8)"
            fontSize={16}
            fontWeight={600}
          >
            {series.sector}
          </text>
        </g>
      ))}
    </svg>
  );
};
