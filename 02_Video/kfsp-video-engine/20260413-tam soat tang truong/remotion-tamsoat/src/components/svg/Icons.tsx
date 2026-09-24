import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";
import { COLORS } from "../../design";

// ═══════════════════════════════════════════
// SVG Icons — Minimalist, KFSP purple brand
// ═══════════════════════════════════════════

interface IconProps {
  delay?: number;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

// Animated wrapper
const AnimatedIcon: React.FC<IconProps & { children: React.ReactNode }> = ({
  delay = 0,
  size = 80,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 200 },
    from: 0,
    to: 1,
  });

  const opacity = interpolate(frame, [delay, delay + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      width: size,
      height: size,
      transform: `scale(${scale})`,
      opacity,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}>
      {children}
    </div>
  );
};

// ─── Clock / Timer Icon ───
export const ClockIcon: React.FC<IconProps> = (props) => {
  const frame = useCurrentFrame();
  const { size = 80, color = COLORS.purple, delay = 0 } = props;
  // Rotating hand
  const rotation = interpolate(frame, [delay, delay + 60], [0, 360], {
    extrapolateRight: "extend",
  });

  return (
    <AnimatedIcon {...props}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="36" stroke={color} strokeWidth="3" fill="none" />
        <circle cx="40" cy="40" r="3" fill={color} />
        {/* Minute hand */}
        <line
          x1="40" y1="40" x2="40" y2="16"
          stroke={color} strokeWidth="3" strokeLinecap="round"
          transform={`rotate(${rotation} 40 40)`}
        />
        {/* Hour hand */}
        <line
          x1="40" y1="40" x2="40" y2="22"
          stroke={color} strokeWidth="4" strokeLinecap="round"
          transform={`rotate(${rotation / 12} 40 40)`}
        />
        {/* Ticks */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <line
            key={angle}
            x1="40" y1="8" x2="40" y2="12"
            stroke={color} strokeWidth="2" strokeLinecap="round"
            transform={`rotate(${angle} 40 40)`}
          />
        ))}
      </svg>
    </AnimatedIcon>
  );
};

// ─── Chart Growth / Trending Up ───
export const GrowthChartIcon: React.FC<IconProps> = (props) => {
  const frame = useCurrentFrame();
  const { size = 80, color = COLORS.accentGreen, delay = 0 } = props;
  const pathProgress = interpolate(frame, [delay + 6, delay + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AnimatedIcon {...props}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        {/* Grid lines */}
        <line x1="10" y1="70" x2="70" y2="70" stroke={`${color}30`} strokeWidth="1.5" />
        <line x1="10" y1="50" x2="70" y2="50" stroke={`${color}15`} strokeWidth="1" />
        <line x1="10" y1="30" x2="70" y2="30" stroke={`${color}15`} strokeWidth="1" />
        {/* Growth line */}
        <polyline
          points="10,60 25,50 40,45 55,30 70,15"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="120"
          strokeDashoffset={120 * (1 - pathProgress)}
        />
        {/* Arrow tip */}
        <polygon
          points="65,12 73,15 68,22"
          fill={color}
          opacity={pathProgress > 0.9 ? 1 : 0}
        />
      </svg>
    </AnimatedIcon>
  );
};

// ─── Document / Report Icon ───
export const DocumentIcon: React.FC<IconProps> = (props) => {
  const { size = 80, color = COLORS.purple } = props;

  return (
    <AnimatedIcon {...props}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <rect x="16" y="8" width="48" height="64" rx="6" stroke={color} strokeWidth="2.5" fill={`${color}08`} />
        {/* Lines */}
        <line x1="26" y1="24" x2="54" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="26" y1="36" x2="54" y2="36" stroke={`${color}60`} strokeWidth="2" strokeLinecap="round" />
        <line x1="26" y1="48" x2="44" y2="48" stroke={`${color}40`} strokeWidth="2" strokeLinecap="round" />
        {/* Checkmark */}
        <circle cx="54" cy="56" r="10" fill={COLORS.accentGreen} />
        <polyline points="49,56 52,59 59,52" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </AnimatedIcon>
  );
};

// ─── Filter / Funnel Icon ───
export const FilterIcon: React.FC<IconProps> = (props) => {
  const { size = 80, color = COLORS.purple } = props;

  return (
    <AnimatedIcon {...props}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <path
          d="M12 16 H68 L48 42 V60 L32 68 V42 Z"
          stroke={color}
          strokeWidth="2.5"
          fill={`${color}10`}
          strokeLinejoin="round"
        />
      </svg>
    </AnimatedIcon>
  );
};

// ─── Lightning / Speed Icon ───
export const LightningIcon: React.FC<IconProps> = (props) => {
  const frame = useCurrentFrame();
  const { size = 80, color = COLORS.accentGold, delay = 0 } = props;
  const flash = Math.sin((frame - delay) * 0.2) * 0.15 + 0.85;

  return (
    <AnimatedIcon {...props}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" opacity={flash}>
        <path
          d="M44 8 L20 44 H36 L32 72 L60 32 H42 Z"
          fill={color}
          stroke={`${color}80`}
          strokeWidth="1.5"
        />
      </svg>
    </AnimatedIcon>
  );
};

// ─── Shield / Protection Icon ───
export const ShieldIcon: React.FC<IconProps> = (props) => {
  const { size = 80, color = COLORS.purple } = props;

  return (
    <AnimatedIcon {...props}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <path
          d="M40 8 L64 20 V44 C64 58 52 70 40 74 C28 70 16 58 16 44 V20 Z"
          stroke={color}
          strokeWidth="2.5"
          fill={`${color}08`}
        />
        <polyline
          points="28,40 36,48 52,32"
          stroke={COLORS.accentGreen}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </AnimatedIcon>
  );
};

// ─── Bell / Alert Icon ───
export const BellIcon: React.FC<IconProps> = (props) => {
  const frame = useCurrentFrame();
  const { size = 80, color = COLORS.purple, delay = 0 } = props;
  // Ring animation
  const ring = Math.sin((frame - delay) * 0.3) * 6;

  return (
    <AnimatedIcon {...props}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
        style={{ transform: `rotate(${ring}deg)` }}>
        <path
          d="M40 12 C28 12 20 22 20 34 V48 L14 56 H66 L60 48 V34 C60 22 52 12 40 12 Z"
          stroke={color}
          strokeWidth="2.5"
          fill={`${color}10`}
        />
        <circle cx="40" cy="64" r="6" fill={color} />
        {/* Notification dot */}
        <circle cx="56" cy="18" r="6" fill={COLORS.accentRed} />
      </svg>
    </AnimatedIcon>
  );
};

// ─── Coffee Cup Icon ───
export const CoffeeIcon: React.FC<IconProps> = (props) => {
  const frame = useCurrentFrame();
  const { size = 80, color = COLORS.purple, delay = 0 } = props;
  // Steam animation
  const steamY = Math.sin((frame - delay) * 0.1) * 3;

  return (
    <AnimatedIcon {...props}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        {/* Steam */}
        <path d={`M30 ${18 + steamY} Q33 12 30 6`} stroke={`${color}40`} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d={`M40 ${16 + steamY} Q43 10 40 4`} stroke={`${color}40`} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d={`M50 ${18 + steamY} Q53 12 50 6`} stroke={`${color}40`} strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Cup */}
        <rect x="18" y="24" width="44" height="38" rx="6" stroke={color} strokeWidth="2.5" fill={`${color}08`} />
        {/* Handle */}
        <path d="M62 32 C70 32 74 40 70 48 H62" stroke={color} strokeWidth="2.5" fill="none" />
        {/* Saucer */}
        <line x1="12" y1="68" x2="68" y2="68" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </AnimatedIcon>
  );
};

// ─── Rocket Icon ───
export const RocketIcon: React.FC<IconProps> = (props) => {
  const frame = useCurrentFrame();
  const { size = 80, color = COLORS.purple, delay = 0 } = props;
  const fly = interpolate(frame, [delay, delay + 40], [0, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AnimatedIcon {...props}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
        style={{ transform: `translateY(${fly}px)` }}>
        {/* Body */}
        <path
          d="M40 8 C32 20 28 36 28 52 H52 C52 36 48 20 40 8 Z"
          stroke={color}
          strokeWidth="2.5"
          fill={`${color}10`}
        />
        {/* Window */}
        <circle cx="40" cy="32" r="6" fill={color} opacity={0.3} />
        <circle cx="40" cy="32" r="3" fill={color} />
        {/* Fins */}
        <path d="M28 44 L16 56 L28 52" fill={color} opacity={0.4} />
        <path d="M52 44 L64 56 L52 52" fill={color} opacity={0.4} />
        {/* Flame */}
        <path
          d="M34 52 L40 68 L46 52"
          fill={COLORS.accentGold}
          opacity={0.6 + Math.sin((frame - delay) * 0.4) * 0.3}
        />
      </svg>
    </AnimatedIcon>
  );
};

// ─── Savings / Piggy Bank Icon ───
export const SavingsIcon: React.FC<IconProps> = (props) => {
  const { size = 80, color = COLORS.purple } = props;

  return (
    <AnimatedIcon {...props}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        {/* Body */}
        <ellipse cx="38" cy="44" rx="24" ry="20" stroke={color} strokeWidth="2.5" fill={`${color}08`} />
        {/* Ear */}
        <ellipse cx="22" cy="30" rx="6" ry="8" stroke={color} strokeWidth="2" fill={`${color}15`} />
        {/* Eye */}
        <circle cx="30" cy="38" r="3" fill={color} />
        {/* Snout */}
        <ellipse cx="52" cy="44" rx="8" ry="6" stroke={color} strokeWidth="2" fill={`${color}15`} />
        <circle cx="50" cy="42" r="1.5" fill={color} />
        <circle cx="54" cy="42" r="1.5" fill={color} />
        {/* Coin slot */}
        <line x1="32" y1="24" x2="44" y2="24" stroke={color} strokeWidth="3" strokeLinecap="round" />
        {/* Legs */}
        <line x1="24" y1="62" x2="24" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="52" y1="62" x2="52" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </AnimatedIcon>
  );
};

// ─── Download / App Store Icon ───
export const DownloadIcon: React.FC<IconProps> = (props) => {
  const frame = useCurrentFrame();
  const { size = 80, color = COLORS.purple, delay = 0 } = props;
  const bounce = Math.sin((frame - delay) * 0.15) * 4;

  return (
    <AnimatedIcon {...props}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <rect x="16" y="8" width="48" height="64" rx="10" stroke={color} strokeWidth="2.5" fill={`${color}05`} />
        {/* Screen */}
        <rect x="20" y="16" width="40" height="44" rx="4" fill={`${color}08`} />
        {/* Download arrow */}
        <g transform={`translate(0, ${bounce})`}>
          <line x1="40" y1="26" x2="40" y2="46" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <polyline points="32,40 40,48 48,40" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
        {/* Home button */}
        <circle cx="40" cy="66" r="4" stroke={color} strokeWidth="1.5" fill="none" />
      </svg>
    </AnimatedIcon>
  );
};

// ─── Animated Number Counter ───
export const AnimatedNumber: React.FC<{
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  duration?: number;
  color?: string;
  fontSize?: number;
}> = ({
  value,
  suffix = "",
  prefix = "",
  delay = 0,
  duration = 30,
  color = COLORS.purple,
  fontSize = 96,
}) => {
  const frame = useCurrentFrame();
  const current = Math.round(
    interpolate(frame, [delay, delay + duration], [0, value], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const opacity = interpolate(frame, [delay, delay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span style={{
      fontSize,
      fontWeight: 700,
      color,
      opacity,
      fontFamily: "'Be Vietnam Pro', sans-serif",
    }}>
      {prefix}{current}{suffix}
    </span>
  );
};

// ─── Floating Particles (decorative) ───
export const FloatingParticles: React.FC<{
  count?: number;
  color?: string;
  area?: { width: number; height: number };
}> = ({
  count = 12,
  color = COLORS.purple,
  area = { width: 1080, height: 1920 },
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: count }, (_, i) => {
    const seed = i * 137.5;
    const x = (seed * 7.3) % area.width;
    const baseY = (seed * 4.1) % area.height;
    const y = baseY + Math.sin((frame + seed) * 0.02) * 30;
    const size = 4 + (i % 4) * 2;
    const opacity = 0.06 + (i % 3) * 0.04;

    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={size}
        fill={color}
        opacity={opacity}
      />
    );
  });

  return (
    <svg
      width={area.width}
      height={area.height}
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
    >
      {particles}
    </svg>
  );
};
