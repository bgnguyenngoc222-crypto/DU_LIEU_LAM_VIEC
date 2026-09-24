---
name: motion-dark-trading-psychology-generator
description: Programmatic animation skill for creating high-impact Dark Trading Psychology & Financial Discipline motion graphics. Features volumetric rim lighting, metallic coin extrusions, dual-state fear/greed grid shifts, animated minimalist humanoid avatars with orbital rings, and laser spotlight counters. Designed for Remotion, Three.js / WebGL, SVG Canvas, and AI coding agents.
version: 1.0.0
type: ai-coding-agent-skill
---

# Skill Specification: Dark Trading Psychology & Financial Mindset Motion Graphics

## 1. Domain Overview & Visual Philosophy
This style represents the **"Dark Financial Realism / Trading Psychology"** archetype popularized by high-end quantitative trading and mindset channels (e.g., GatesFX style). 

Unlike bright SaaS dashboards, this aesthetic relies on:
1. **Chiaroscuro / Low-Key Volumetric Lighting**: Deep pitch-black background (`#050505`) with razor-sharp monochromatic white rim highlights and isolated spectral light cones (Red for Panic/Risk, Green for Profit/Euphoria).
2. **Minimalist Vector-3D Hybrid**: Minimalist humanoid silhouettes with glassmorphism head globes, back-lit curved torsos, and orbiting planetary status nodes.
3. **Polarity Grid States (Fear vs. Greed)**: Real-time shifting between Red (loss, drawdown, warning alerts) and Green (profit accumulation, laser projections, stacking metallic asset cylinders).
4. **Cinematic Ray Casting**: Top-down cone spotlights cutting through atmospheric haze to reveal dynamic numeric targets.

---

## 2. Design Tokens & Sensory Architecture

### A. Color Palette & Lighting States
| Token Name | HEX / Value | State / Function |
| :--- | :--- | :--- |
| `void-black` | `#050505` to `#000000` | Background canvas void |
| `rim-white` | `#FFFFFF` | Razor edge lighting on characters/cards |
| `monochrome-grid`| `rgba(255, 255, 255, 0.08)` | Chart coordinate grid |
| `fear-red` | `#EF4444` / `#DC2626` | Drawdown, emotional panic, stop-loss trigger |
| `fear-cone` | `rgba(239, 68, 68, 0.18)` | Volumetric red spotlight cone |
| `greed-green` | `#22C55E` / `#16A34A` | Profit mode, discipline milestone |
| `greed-laser` | `rgba(34, 197, 94, 0.35)` | Ascending laser beam cone to target |
| `metal-edge-top` | `#4ADE80` | High-specular reflective rim of coin/cylinder |
| `metal-body` | `#14532D` to `#052e16` | Shaded metallic green cylinder body |

### B. Spatial & Optical Properties
- **Camera Perspective:** `1000px` to `1400px`.
- **Lighting Direction:** Key rim light at `135°` (top-right or top-left diagonal) casting hard contrast borders with deep shadow core.
- **Glass / Acrylic Frosting:** `backdrop-filter: blur(16px); background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.15);`.

---

## 3. Mathematical & Motion Primitives

### A. Volumetric Spotlight Angle & Ray Cone
A laser spotlight cone projecting from a 2D/3D coordinate to infinity:
```typescript
interface LightConeConfig {
  apexX: number;     // e.g. 50% (Center X)
  apexY: number;     // e.g. 35% (Target point)
  baseWidth: number; // e.g. 380px at bottom
  height: number;    // e.g. 700px
}

export function generateSpotlightPath(cfg: LightConeConfig): string {
  const leftBase = cfg.apexX - cfg.baseWidth / 2;
  const rightBase = cfg.apexX + cfg.baseWidth / 2;
  const bottomY = cfg.apexY + cfg.height;
  return `M ${cfg.apexX} ${cfg.apexY} L ${rightBase} ${bottomY} L ${leftBase} ${bottomY} Z`;
}
```

### B. Parametric Circular Orbit (Warning & Rule Nodes)
For nodes orbiting around the trader avatar's head:
```typescript
export function getOrbitPosition(angleDeg: number, radiusX: number, radiusY: number, centerX: number, centerY: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: centerX + radiusX * Math.cos(rad),
    y: centerY + radiusY * Math.sin(rad),
  };
}
```

### C. Exponential Metallic Cylinder Stacking
When displaying compound interest or disciplined growth (the green stacked coin visual):
```typescript
export function calculateCoinScale(index: number, totalCoins: number, progress: number): number {
  const threshold = index / totalCoins;
  if (progress < threshold) return 0;
  const localT = Math.min((progress - threshold) * totalCoins, 1);
  // Bounce-out ease for landing coin
  return 1 - Math.pow(1 - localT, 4);
}
```

---

## 4. Full Component Architecture (Remotion / React)

This single-file component contains the complete Dark Trading Psychology scene with:
- Minimalist back-lit avatar with glowing eyes and rim light.
- Volumetric switching cone light (Red drawdown -> Green disciplined laser).
- Dynamic high-speed Profit/Volume numeric ticker.
- Orbiting discipline rule pills.
- Perspective dark grid backdrop.

```tsx
import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export interface DarkTradingSceneProps {
  initialAccount?: number;
  finalProfit?: number;
  disciplineRule?: string;
}

export const DarkTradingMindsetCard: React.FC<DarkTradingSceneProps> = ({
  initialAccount = 41167,
  finalProfit = 744170,
  disciplineRule = 'DISCIPLINE TURNS STRATEGY INTO PROFIT',
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Phase 1: Drawdown / Fear (0 -> 40%)
  // Phase 2: Transformation / Discipline (40% -> 60%)
  // Phase 3: Laser Greed / Mastery (60% -> 100%)
  const progress = frame / durationInFrames;

  // Active state flag
  const isProfitPhase = progress > 0.45;
  const activeColor = isProfitPhase ? '#22C55E' : '#EF4444';
  const activeColorDim = isProfitPhase ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)';

  // Profit Ticker Calculation
  const displayValue = useMemo(() => {
    if (!isProfitPhase) {
      // Ticking down from initial
      const dropProgress = Math.min(progress / 0.45, 1);
      const val = Math.round(initialAccount - dropProgress * (initialAccount - 14990));
      return `$${val.toLocaleString()}`;
    } else {
      // Rapid exponential rocket to target profit
      const profitT = (progress - 0.45) / 0.55;
      const easeProfit = Math.pow(profitT, 2.5);
      const val = Math.round(457951 + easeProfit * (finalProfit - 457951));
      return `${val.toLocaleString()}`;
    }
  }, [progress, isProfitPhase, initialAccount, finalProfit]);

  // Orbit rotation angle for warning icons around avatar
  const orbitAngle = frame * 2.2;

  // Subtle breathing scale
  const breath = 1 + Math.sin(frame / (fps * 0.4)) * 0.015;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#040405',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace',
      }}
    >
      {/* Background Volumetric Cone Light */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <linearGradient id="coneGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={activeColor} stopOpacity="0.85" />
            <stop offset="35%" stopColor={activeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={activeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {isProfitPhase ? (
          // Ascending Green Target Laser Cone
          <polygon points="270,360 460,920 80,920" fill="url(#coneGrad)" />
        ) : (
          // Ambient Warning Red Bloom
          <circle cx="270" cy="500" r="260" fill="url(#coneGrad)" opacity="0.3" />
        )}
      </svg>

      {/* Top HUD: Counter & Status Banner */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 14,
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: '#9CA3AF',
            marginBottom: 6,
            fontWeight: 600,
          }}
        >
          {isProfitPhase ? 'Profit' : 'My Account'}
        </div>

        {/* Numeric Display with Frosted Glass Badge */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${isProfitPhase ? '#22C55E' : 'rgba(255, 255, 255, 0.12)'}`,
            borderRadius: 14,
            padding: '10px 28px',
            fontSize: 44,
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: 1,
            boxShadow: `0 0 30px ${activeColorDim}`,
            minWidth: 280,
            textAlign: 'center',
          }}
        >
          {displayValue}
        </div>
      </div>

      {/* Centerpiece: Back-lit Minimalist Trader Avatar */}
      <div
        style={{
          position: 'relative',
          width: 260,
          height: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${breath})`,
          marginTop: 60,
        }}
      >
        {/* Orbital Discipline Nodes (Arc Ring) */}
        {!isProfitPhase && (
          <svg
            style={{
              position: 'absolute',
              top: -30,
              width: 240,
              height: 120,
              overflow: 'visible',
            }}
          >
            {/* Guide Arc */}
            <path
              d="M 20 90 A 100 60 0 0 1 220 90"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Warning Orbit Nodes */}
            {[0, 60, 120].map((baseAngle, idx) => {
              const currentA = (baseAngle + orbitAngle) % 180;
              const rad = (currentA * Math.PI) / 180;
              const nx = 120 - 100 * Math.cos(rad);
              const ny = 90 - 55 * Math.sin(rad);
              return (
                <g key={idx} transform={`translate(${nx}, ${ny})`}>
                  <circle r="14" fill="#18181B" stroke="#EF4444" strokeWidth="1.5" />
                  <circle r="4" fill="#FFFFFF" />
                </g>
              );
            })}
          </svg>
        )}

        {/* Head Sphere (Chiaroscuro glass sphere) */}
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 25%, #404040 0%, #171717 65%, #050505 100%)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.45), 0 0 20px rgba(0,0,0,0.9)',
            borderTop: '1px solid rgba(255,255,255,0.5)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            zIndex: 4,
          }}
        >
          {/* Glowing Eyes */}
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 0 8px #FFFFFF',
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 0 8px #FFFFFF',
            }}
          />
        </div>

        {/* Torso Silhouette (Rim-lit curved dome) */}
        <div
          style={{
            width: 170,
            height: 140,
            borderRadius: '90px 90px 0 0',
            background: 'linear-gradient(180deg, #262626 0%, #0d0d0d 75%, transparent 100%)',
            borderTop: '2px solid rgba(255,255,255,0.7)',
            boxShadow: '0 -8px 24px rgba(255,255,255,0.12)',
            marginTop: -10,
            zIndex: 3,
          }}
        />

        {/* Horizon Shadow Cutoff */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '120%',
            height: 60,
            background: 'linear-gradient(0deg, #040405 40%, transparent 100%)',
            zIndex: 5,
          }}
        />
      </div>

      {/* Bottom Subtitle / Manifest Typography */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          fontSize: 18,
          fontWeight: 700,
          fontStyle: 'italic',
          color: '#F4F4F5',
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          textAlign: 'center',
          maxWidth: 320,
          lineHeight: 1.4,
          textShadow: '0 2px 10px rgba(0,0,0,0.8)',
        }}
      >
        {disciplineRule}
      </div>
    </div>
  );
};
```

---

## 5. Execution Directives for AI Coding Agents
When prompt engineers ask to generate, modify, or extend scenes of this style:
1. **Never use flat ambient light:** All foreground shapes (heads, torsos, cards) MUST have an top/side rim border (`borderTop: '2px solid rgba(255,255,255,0.7)'`) to simulate cinematic rim backlighting against a pure void.
2. **Strict Red/Green Polarity:** Never blend casual rainbow palettes. Reserve Red (`#EF4444`) exclusively for Fear / Impulsive Overtrading / Risk, and Emerald Green (`#22C55E`) exclusively for Discipline / Rule Adherence / Profit.
3. **Motion Ticker Math:** Loss counters must decelerate linearly or with step jitters (simulating panic bleeding), while Profit counters must follow an accelerating power curve ($t^{2.5}$) projecting into a spotlight laser.
4. **Minimal Geometric Characters:** Render people not as complex cartoon SVGs, but as abstract architectural spheres and parabolas with white specular rim glows.
