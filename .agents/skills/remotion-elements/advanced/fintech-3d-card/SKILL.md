---
name: motion-fintech-card-generator
description: Programmatic animation skill for generating 3D Fintech/SaaS Metric Growth Cards with ticking numbers, dynamic SVG path graphs, paper texture styling, and ambient 3D tilt. Optimized for Remotion, React/Tailwind, and HTML5 Canvas.
version: 2.0.0
type: ai-coding-agent-skill
---

# Skill Specification: 3D Fintech Metric Growth Card Animation

## 1. Executive Summary & Objective
This skill guides an AI coding agent to generate production-ready programmatic video components (Remotion / React) or web animations mimicking high-end SaaS / eCommerce case-study metrics (e.g., Gross Volume, MRR jumps).

The animation consists of a textured, perforated physical card floating in a dark red ambient space, featuring:
1. Real-time formatted number increments (`$1,046,092` -> `$1,046,658`).
2. Growth percentage badge counter (`302.08%` -> `$350.08%`).
3. An ascending dynamic line chart drawn via path trimming with leading glow dot.
4. An area gradient fill under the curve.
5. Subtle 3D perspective orientation with organic floating (sine-based idle sway).

---

## 2. Design Tokens & Visual Architecture

### A. Color Palette
| Token Name | HEX / Value | Role |
| :--- | :--- | :--- |
| `bg-radial-center` | `#32070c` | Ambient spotlight behind the card |
| `bg-radial-edge` | `#0b0102` | Outer vignette dark gradient |
| `card-surface` | `#FBFBF9` | Primary card face (warm off-white / receipt stock) |
| `card-noise-tint` | `rgba(0,0,0, 0.04)` | Micro paper grain simulation |
| `text-display` | `#111827` | Main numeric counter (high-contrast black) |
| `text-muted` | `#6B7280` | Labels, axis dates ("Gross Volume", "Jan 25") |
| `accent-primary` | `#E11D48` | Graph stroke, active timeline indicators |
| `badge-bg` | `rgba(225, 29, 72, 0.08)` | Percentage pill badge background |
| `badge-border` | `rgba(225, 29, 72, 0.25)` | Percentage pill outline |
| `glow-light` | `rgba(225, 29, 72, 0.45)` | Leading point spotlight & rim bounce light |

### B. Geometry & 3D Spatial Properties
- **Container Perspective:** `perspective: 1200px`
- **Initial Card Rotation:** `rotateX(5.5deg) rotateY(-11deg) rotateZ(1.8deg)`
- **Border Radius:** `28px` on top-left / top-right; bottom edge perforated or flat with ticket notches.
- **Drop Shadows:** 
  `box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(225, 29, 72, 0.18)`

---

## 3. Mathematical Motion Logic & Interpolation

### A. Easing & Timing Curve
Animations must not be linear. Use **Ease-Out Cubic** or **Quint** for organic deceleration:
$$	ext{progress} = 1 - (1 - t)^3 \quad 	ext{where } t \in [0, 1]$$

### B. Number Formatting Routine
```typescript
/**
 * Interpolates integer values and formats as US currency
 */
export function formatCurrency(start: number, end: number, progress: number): string {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const easeOut = 1 - Math.pow(1 - clamped, 3);
  const current = Math.round(start + (end - start) * easeOut);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(current);
}

/**
 * Interpolates floating percentage with 2 decimal places
 */
export function formatPercentage(start: number, end: number, progress: number): string {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const easeOut = 1 - Math.pow(1 - clamped, 3);
  const current = start + (end - start) * easeOut;
  return `${current.toFixed(2)}%`;
}
```

### C. Organic Idle Floating (Wiggle / Breathing)
```typescript
export function calculateFloatingOffset(frame: number, fps: number) {
  const time = frame / fps;
  const floatY = Math.sin(time * 2.2) * 5; // Vertical bobbing (5px)
  const floatTilt = Math.cos(time * 1.8) * 0.75; // Subtle angle wiggle
  return { floatY, floatTilt };
}
```

---

## 4. Full Production Implementation (Remotion / React)

This single-file component is ready to drop into a Remotion project or React web canvas:

```tsx
import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export interface FintechMetricCardProps {
  label?: string;
  startValue?: number;
  endValue?: number;
  startPercent?: number;
  endPercent?: number;
  startDate?: string;
  endDate?: string;
}

export const FintechMetricCard: React.FC<FintechMetricCardProps> = ({
  label = 'Gross Volume',
  startValue = 1046092,
  endValue = 1046658,
  startPercent = 302.08,
  endPercent = 350.08,
  startDate = 'Jan 25',
  endDate = 'Jan 26',
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Normalized animation progress [0..1] over 80% of composition duration
  const rawProgress = interpolate(frame, [0, durationInFrames * 0.85], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const easeProgress = 1 - Math.pow(1 - rawProgress, 3);

  // Values calculation
  const currentNumber = useMemo(() => {
    const val = Math.round(startValue + (endValue - startValue) * easeProgress);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  }, [startValue, endValue, easeProgress]);

  const currentPercent = useMemo(() => {
    const val = startPercent + (endPercent - startPercent) * easeProgress;
    return `${val.toFixed(2)}%`;
  }, [startPercent, endPercent, easeProgress]);

  // Floating transform
  const time = frame / fps;
  const floatY = Math.sin(time * 2.0) * 5;
  const floatRotate = Math.cos(time * 1.6) * 0.7;

  // SVG Chart Geometry
  // ViewBox: 0 0 340 130
  const pathD = "M 0 115 L 35 110 L 70 120 L 105 92 L 140 102 L 175 75 L 210 85 L 255 42 L 290 52 L 340 15";
  const areaPathD = `${pathD} L 340 130 L 0 130 Z`;
  const pathTotalLength = 480;
  const dashOffset = (1 - easeProgress) * pathTotalLength;

  // Leading dot position approximation along keyframe points
  const leadingX = 340 * easeProgress;
  const leadingY = 115 - easeProgress * 100; // Simplified tracker for dot head

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, #2f0509 0%, #0c0103 100%)',
        perspective: 1200,
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Ambient Red Glow Behind Card */}
      <div
        style={{
          position: 'absolute',
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.28) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* 3D Floating Ticket Card */}
      <div
        style={{
          width: 440,
          background: '#FAF9F6',
          borderRadius: '26px 26px 14px 14px',
          padding: '36px 32px 36px 32px',
          boxShadow: '0 32px 64px -16px rgba(0,0,0,0.7), 0 0 35px rgba(225,29,72,0.15)',
          transform: `rotateX(${6 + floatRotate}deg) rotateY(-11deg) translateY(${floatY}px)`,
          transformStyle: 'preserve-3d',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          position: 'relative',
        }}
      >
        {/* Header: Label + Growth Pill Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: '#4B5563' }}>
            {label}
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#E11D48',
              backgroundColor: 'rgba(225, 29, 72, 0.08)',
              border: '1px solid rgba(225, 29, 72, 0.25)',
              padding: '2px 8px',
              borderRadius: 12,
              fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            }}
          >
            {currentPercent}
          </span>
        </div>

        {/* Dynamic Metric Value */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: '#111827',
            letterSpacing: -1.2,
            marginBottom: 20,
          }}
        >
          {currentNumber}
        </div>

        {/* Dynamic Growth Graph */}
        <div style={{ position: 'relative', width: '100%', height: 130 }}>
          <svg width="100%" height="100%" viewBox="0 0 340 130" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="metricAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E11D48" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#E11D48" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Gradient Area Fill */}
            <path
              d={areaPathD}
              fill="url(#metricAreaGradient)"
              opacity={easeProgress}
            />

            {/* Animated Graph Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#E11D48"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={pathTotalLength}
              strokeDashoffset={dashOffset}
            />

            {/* Leading Glow Head Dot */}
            {rawProgress > 0.02 && (
              <circle
                cx={leadingX}
                cy={leadingY}
                r="4.5"
                fill="#FFFFFF"
                stroke="#E11D48"
                strokeWidth="2.5"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(225, 29, 72, 0.9))',
                }}
              />
            )}
          </svg>
        </div>

        {/* Timeline Axis Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #E5E7EB',
            paddingTop: 10,
            marginTop: 4,
            fontSize: 13,
            color: '#6B7280',
            fontWeight: 500,
          }}
        >
          <span>{startDate}</span>
          <span>{endDate}</span>
        </div>

        {/* Perforated Bottom Edge Accent */}
        <div
          style={{
            position: 'absolute',
            bottom: -7,
            left: 14,
            right: 14,
            height: 6,
            backgroundImage: 'radial-gradient(circle, transparent 4px, #FAF9F6 4px)',
            backgroundSize: '12px 6px',
          }}
        />
      </div>
    </div>
  );
};
```

---

## 5. Strict Directives for AI Coding Agents
When generating or adapting components based on this skill, you must comply with:
1. **Never use Linear Progress for Financial Data:** Always apply cubic or expo ease-out. Sudden linear stops look amateurish.
2. **Strict Currency Formatting:** Use JavaScript's native `Intl.NumberFormat` instead of naive string concatenation to correctly handle commas and currency tokens.
3. **Decouple FPS from Speed:** Express all transition rates in normalized `[0, 1]` progression keyed against `durationInFrames`. Never hardcode frame steps.
4. **Contrast & Texture Preservation:** Always keep the card background slightly off-white (`#FAF9F6` rather than `#FFFFFF`) and text high-contrast dark gray/black (`#111827`) to maintain physical depth.