import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";
import { IndexData, COLORS } from "../../types";
import { CountUp } from "../animation/CountUp";

interface IndexCardProps {
  label: string;
  data: IndexData;
  delay?: number;
  icon?: string;
}

export const IndexCard: React.FC<IndexCardProps> = ({
  label,
  data,
  delay = 0,
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const isPositive = data.pct >= 0;
  const color = isPositive ? COLORS.green : COLORS.red;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.95)",
        borderRadius: 20,
        padding: "20px 24px",
        minWidth: 280,
        textAlign: "center",
        transform: `scale(${enter}) translateY(${(1 - enter) * 30}px)`,
        opacity: enter,
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: "#666",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {icon && <span>{icon}</span>}
        {label}
      </div>

      <div style={{ fontSize: 48, fontWeight: 800, color: color }}>
        <CountUp
          value={data.value}
          delay={delay + 5}
          duration={25}
          decimals={2}
        />
      </div>

      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color,
          marginTop: 4,
        }}
      >
        {isPositive ? "+" : ""}
        <CountUp
          value={data.change}
          delay={delay + 10}
          duration={20}
          decimals={2}
        />
        {" "}
        ({isPositive ? "+" : ""}
        <CountUp
          value={data.pct}
          delay={delay + 10}
          duration={20}
          decimals={2}
          suffix="%"
        />
        )
      </div>
    </div>
  );
};
