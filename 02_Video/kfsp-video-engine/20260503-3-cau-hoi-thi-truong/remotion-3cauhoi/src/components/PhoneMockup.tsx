import { Img, staticFile } from "remotion";

interface Props {
  src: string;
  width?: number;
  tilt?: { rotateY: number; rotateX: number; rotate: number };
  glow?: string;
  maskFadeBottom?: boolean;
  maskFadeTop?: boolean;
  variant?: "blue" | "silver" | "orange";
  style?: React.CSSProperties;
  opacity?: number;
}

// iPhone 17 Pro mockup PNG: 879×1832
const MOCKUP_RATIO = 1832 / 879;
// Screen content area inside frame (measured from PNG)
const SCREEN_INSET = {
  top: 0.0207,
  bottom: 0.0207,
  left: 0.041,
  right: 0.041,
};
// iPhone 17 outer body corner radius — used to clip container so drop-shadow
// follows the rounded phone shape (not the rectangular bounds)
const BODY_RADIUS_RATIO = 0.13;     // outer phone body curve
const SCREEN_RADIUS_RATIO = 0.082;  // inner screen curve

export const PhoneMockup: React.FC<Props> = ({
  src,
  width = 360,
  tilt = { rotateY: -10, rotateX: 3, rotate: -1.5 },
  glow,
  maskFadeBottom = false,
  maskFadeTop = false,
  variant = "blue",
  style,
  opacity = 1,
}) => {
  const transform = `perspective(1200px) rotateY(${tilt.rotateY}deg) rotateX(${tilt.rotateX}deg) rotate(${tilt.rotate}deg)`;
  const height = width * MOCKUP_RATIO;

  const screenLeft = width * SCREEN_INSET.left;
  const screenTop = height * SCREEN_INSET.top;
  const screenWidth = width * (1 - SCREEN_INSET.left - SCREEN_INSET.right);
  const screenHeight = height * (1 - SCREEN_INSET.top - SCREEN_INSET.bottom);
  const screenRadius = width * SCREEN_RADIUS_RATIO;
  const bodyRadius = width * BODY_RADIUS_RATIO;

  let mask: string | undefined;
  if (maskFadeBottom && maskFadeTop) {
    mask = "linear-gradient(to bottom, transparent 0%, black 18%, black 80%, transparent 100%)";
  } else if (maskFadeBottom) {
    mask = "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)";
  } else if (maskFadeTop) {
    mask = "linear-gradient(to bottom, transparent 0%, black 30%, black 100%)";
  }

  const mockupSrc = `mockups/iphone17-${variant}.png`;

  // Outer wrapper handles tilt + drop-shadow (computed AFTER inner clip → follows rounded body)
  // Inner wrapper clips to rounded body so screenshot rectangle doesn't poke out at corners
  const dropShadow = `drop-shadow(0 40px 50px rgba(0,0,0,0.55))${glow ? ` drop-shadow(0 0 50px ${glow})` : ""}`;

  return (
    <div
      style={{
        display: "inline-block",
        transform,
        opacity,
        filter: dropShadow,
        WebkitMaskImage: mask,
        maskImage: mask,
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          width,
          height,
          borderRadius: bodyRadius,
          overflow: "hidden",
        }}
      >
        {/* Screenshot — fills screen area with rounded screen corners */}
        <Img
          src={staticFile(src)}
          style={{
            position: "absolute",
            left: screenLeft,
            top: screenTop,
            width: screenWidth,
            height: screenHeight,
            objectFit: "cover",
            objectPosition: "top center",
            borderRadius: screenRadius,
            display: "block",
          }}
        />

        {/* iPhone 17 frame on top */}
        <Img
          src={staticFile(mockupSrc)}
          style={{
            position: "absolute",
            inset: 0,
            width,
            height,
            display: "block",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};
