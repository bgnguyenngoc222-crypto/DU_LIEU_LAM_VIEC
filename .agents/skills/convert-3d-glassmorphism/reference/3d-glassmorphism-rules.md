# 3D Glassmorphism Transformation Rules & Formula

## 1. Quality Target & Style
Standard visual quality derived from:
- Apple VisionOS UI
- Linear & Arc Browser
- Stripe Dashboard
- Revolut & TradingView Premium
- Modernized Bloomberg Terminal

---

## 2. 3D Formula & Parameters

### Perspective
- Apply subtle perspective deformation.
- Top width: 97% – 99%
- Bottom width: 100%
- Perspective depth: 3% – 6%

### Rotation & Skew
- Default Rotation: 8° – 12° (or as specified by user)
- Small X skew: 3% – 5% for realistic depth

### Glass Material
- Dark frosted glass material
- Opacity: 80% – 90%
- Background Blur: 24px – 36px
- Preserve original rounded corners

### Border & Glow
- Border width: 1px – 2px
- Soft violet border color: `#8A5CFF`
- Neon glow color: `#7B3AEC`
- Border Glow Opacity: 20% – 35%

### Reflection
- Soft diagonal glossy reflection strip across glass surface
- Color: White (`#FFFFFF`)
- Opacity: 5% – 10%
- Blur: 20px – 50px
- Blend Mode: Soft Light

### Shadow & Elevation
- Soft floating drop shadow
- Shadow Distance: 16px – 24px
- Shadow Blur: 60px – 100px
- Shadow Opacity: 20% – 35%
- Apparent Floating Depth: 5cm – 15cm above background surface

### Ambient Light & Color
- Subtle purple neon ambient light (no overexposure)
- Do NOT alter original color palette; only enhance contrast, transparency, depth, and lighting highlights.

---

## 3. Background Treatment
- **Isolate / Remove Background**: Completely remove background if requested by user.
- **Keep Original**: Preserve original background untouched unless requested otherwise.
- Do NOT generate a new random environment unless explicitly prompted.
