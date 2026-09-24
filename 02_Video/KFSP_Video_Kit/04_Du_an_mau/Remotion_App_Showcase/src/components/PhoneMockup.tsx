import React from "react";
import { Img } from "remotion";

interface PhoneMockupProps {
  imageSrc: string;
  rotation?: number; // deg
  scale?: number;
  perspective?: number; // px
  isLandscape?: boolean;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  imageSrc,
  rotation = 0,
  scale = 1,
  perspective = 1400,
  isLandscape = false,
}) => {
  // Sizing optimized for 16:9 1920x1080 canvas
  const width = isLandscape ? 900 : 360;
  const height = isLandscape ? 450 : 700;

  return (
    <div
      style={{
        perspective: `${perspective}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          borderRadius: isLandscape ? "32px" : "44px",
          padding: "10px",
          background: "linear-gradient(145deg, #1f2233, #0d0e14)",
          boxShadow: `
            0 20px 45px -10px rgba(0, 0, 0, 0.8),
            0 0 35px rgba(123, 58, 236, 0.45),
            inset 0 0 2px 2px rgba(170, 117, 255, 0.25)
          `,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dynamic Island / Notch */}
        {!isLandscape ? (
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "92px",
              height: "22px",
              backgroundColor: "#000000",
              borderRadius: "16px",
              zIndex: 10,
              boxShadow: "0 0 4px rgba(0,0,0,0.8)",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "22px",
              height: "92px",
              backgroundColor: "#000000",
              borderRadius: "16px",
              zIndex: 10,
            }}
          />
        )}

        {/* Screen Container */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: isLandscape ? "24px" : "36px",
            overflow: "hidden",
            backgroundColor: "#0d1117",
            position: "relative",
          }}
        >
          <Img
            src={imageSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
};
