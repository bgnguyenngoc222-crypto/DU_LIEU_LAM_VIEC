import {
  Img,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import React from "react";
import { LAYOUT, COLORS, SPRINGS } from "../../design";

interface ZoomRegion {
  // Normalized coordinates (0-1) on the original screenshot
  x: number; // center X
  y: number; // center Y
  scale: number; // how much to zoom in (1 = no zoom, 2 = 2x)
}

interface AnnotationConfig {
  // Normalized coordinates on the screenshot
  x: number;
  y: number;
  type: "circle" | "box" | "arrow-down" | "arrow-right";
  width?: number;  // for box type, normalized
  height?: number; // for box type, normalized
  label?: string;
  delay: number; // frames after screenshot appears
  color?: string;
}

interface AppScreenshotProps {
  src: string;
  delay?: number;
  zoom?: ZoomRegion;
  zoomDelay?: number; // frames after entry to start zoom
  annotations?: AnnotationConfig[];
  springPreset?: keyof typeof SPRINGS;
}

export const AppScreenshot: React.FC<AppScreenshotProps> = ({
  src,
  delay = 0,
  zoom,
  zoomDelay = 15,
  annotations = [],
  springPreset = "calm",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry animation
  const enter = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS[springPreset],
  });

  const opacity = interpolate(frame, [delay, delay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Zoom animation
  let currentScale = 1;
  let translateX = 0;
  let translateY = 0;

  if (zoom) {
    const zoomProgress = spring({
      frame: frame - delay - zoomDelay,
      fps,
      config: SPRINGS.zoom,
    });

    currentScale = interpolate(zoomProgress, [0, 1], [1, zoom.scale]);
    // Translate to center the zoom region
    translateX = -(zoom.x - 0.5) * LAYOUT.screenshotWidth * (currentScale - 1);
    translateY = -(zoom.y - 0.5) * LAYOUT.screenshotMaxHeight * (currentScale - 1);
  }

  const contentWidth = LAYOUT.screenshotWidth;
  const contentHeight = LAYOUT.screenshotMaxHeight;

  return (
    <div
      style={{
        position: "absolute",
        top: LAYOUT.contentTop,
        left: (LAYOUT.width - contentWidth) / 2,
        width: contentWidth,
        height: contentHeight,
        opacity,
        transform: `translateY(${(1 - enter) * 30}px)`,
        overflow: "hidden",
        borderRadius: LAYOUT.screenshotBorderRadius,
        boxShadow: `0 8px 40px ${COLORS.shadowScreenshot}`,
      }}
    >
      {/* Screenshot image with zoom */}
      <Img
        src={staticFile(src)}
        style={{
          width: contentWidth,
          height: contentHeight,
          objectFit: "cover",
          objectPosition: "top center",
          transform: `scale(${currentScale}) translate(${translateX / currentScale}px, ${translateY / currentScale}px)`,
          transformOrigin: "center center",
        }}
      />

      {/* Annotations overlay */}
      {annotations.map((ann, i) => (
        <Annotation key={i} config={ann} parentDelay={delay} scale={currentScale} />
      ))}
    </div>
  );
};

// ─── Annotation Component ───
const Annotation: React.FC<{
  config: AnnotationConfig;
  parentDelay: number;
  scale: number;
}> = ({ config, parentDelay, scale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const totalDelay = parentDelay + config.delay;
  const color = config.color || COLORS.annotationRed;

  const enter = spring({
    frame: frame - totalDelay,
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  const opacity = interpolate(frame, [totalDelay, totalDelay + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow
  const pulse = frame > totalDelay ? 0.5 + Math.sin((frame - totalDelay) * 0.12) * 0.5 : 0;

  const x = config.x * LAYOUT.screenshotWidth;
  const y = config.y * LAYOUT.screenshotMaxHeight;

  if (config.type === "circle") {
    const radius = 28;
    return (
      <div
        style={{
          position: "absolute",
          left: x - radius - 4,
          top: y - radius - 4,
          width: (radius + 4) * 2,
          height: (radius + 4) * 2,
          borderRadius: "50%",
          border: `4px solid ${color}`,
          opacity: opacity * enter,
          transform: `scale(${0.5 + enter * 0.5})`,
          boxShadow: `0 0 ${12 + pulse * 12}px ${color}${Math.round(pulse * 180).toString(16).padStart(2, "0")}`,
          pointerEvents: "none",
        }}
      />
    );
  }

  if (config.type === "box") {
    const w = (config.width || 0.3) * LAYOUT.screenshotWidth;
    const h = (config.height || 0.05) * LAYOUT.screenshotMaxHeight;
    return (
      <>
        <div
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: w,
            height: h,
            border: `3px solid ${color}`,
            borderRadius: 8,
            opacity: opacity * enter,
            boxShadow: `0 0 ${8 + pulse * 8}px ${COLORS.annotationGlow}`,
            pointerEvents: "none",
          }}
        />
        {config.label && (
          <div
            style={{
              position: "absolute",
              left: x + w + 12,
              top: y + h / 2 - 16,
              background: color,
              borderRadius: 8,
              padding: "6px 14px",
              opacity: opacity * enter,
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Be Vietnam Pro', sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {config.label}
            </span>
          </div>
        )}
      </>
    );
  }

  // Arrow types
  const arrowSize = 32;
  const isDown = config.type === "arrow-down";
  return (
    <div
      style={{
        position: "absolute",
        left: x - arrowSize / 2,
        top: isDown ? y : y - arrowSize / 2,
        opacity: opacity * enter,
        transform: `translateY(${isDown ? -4 + Math.sin((frame - totalDelay) * 0.15) * 6 : 0}px)`,
        pointerEvents: "none",
      }}
    >
      <svg width={arrowSize} height={arrowSize} viewBox="0 0 32 32" fill="none">
        {isDown ? (
          <path d="M16 4V24M8 18L16 26L24 18" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M4 16H24M18 8L26 16L18 24" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </div>
  );
};
