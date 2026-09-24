import { useThree } from "@react-three/fiber";
import { ThreeCanvas } from "@remotion/three";
import { Video } from "@remotion/media";
import React, { useCallback, useMemo, useState } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useRemotionEnvironment,
  useVideoConfig,
} from "remotion";
import { CanvasTexture, Shape } from "three";

/** Kích thước thật của clip quay màn hình */
const VW = 828;
const VH = 1792;
const RATIO = VW / VH;

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

/** Hình chữ nhật bo góc — dùng cho cả thân máy (đùn ra thành khối) và mặt màn */
const roundedRect = (width: number, height: number, radius: number) => {
  const s = new Shape();
  s.moveTo(0, radius);
  s.lineTo(0, height - radius);
  s.quadraticCurveTo(0, height, radius, height);
  s.lineTo(width - radius, height);
  s.quadraticCurveTo(width, height, width, height - radius);
  s.lineTo(width, radius);
  s.quadraticCurveTo(width, 0, width - radius, 0);
  s.lineTo(radius, 0);
  s.quadraticCurveTo(0, 0, 0, radius);
  return s;
};

const BASE = 1;
const PHONE_W = BASE;
const PHONE_H = BASE / RATIO;
const THICK = BASE * 0.115; // bề dày thân máy
const BEVEL = BASE * 0.035; // viền quanh màn
const SCREEN_R = BASE * 0.075;
const SCREEN_W = PHONE_W - BEVEL * 2;
const SCREEN_H = PHONE_H - BEVEL * 2;
const PHONE_R = SCREEN_R + BEVEL;

const PhoneBody: React.FC<{ src: string; color: string }> = ({ src, color }) => {
  const [gear] = useState(() => {
    const canvas = new OffscreenCanvas(VW, VH);
    const context = canvas.getContext("2d")!;
    const texture = new CanvasTexture(canvas);
    // shapeGeometry lấy toạ độ hình làm UV (0..SCREEN_W, 0..SCREEN_H),
    // phải chuẩn hoá về 0..1 nếu không ảnh sẽ phóng to và lệch
    texture.repeat.x = 1 / SCREEN_W;
    texture.repeat.y = 1 / SCREEN_H;
    return { canvas, context, texture };
  });

  const { invalidate, advance } = useThree();
  const { isRendering } = useRemotionEnvironment();

  const onVideoFrame = useCallback(
    (f: CanvasImageSource) => {
      gear.context.drawImage(f, 0, 0, VW, VH);
      gear.texture.needsUpdate = true;
      if (isRendering) advance(performance.now());
      else invalidate();
    },
    [gear, invalidate, advance, isRendering]
  );

  const bodyShape = useMemo(() => roundedRect(PHONE_W, PHONE_H, PHONE_R), []);
  const screenShape = useMemo(() => roundedRect(SCREEN_W, SCREEN_H, SCREEN_R), []);
  const extrude = useMemo(
    () => ({ depth: THICK, bevelEnabled: true, bevelSize: 0.004, bevelThickness: 0.004, curveSegments: 16 }),
    []
  );

  return (
    <>
      <Video src={src} onVideoFrame={onVideoFrame} muted headless />

      {/* thân máy — khối đặc, có bề dày, xoay là thấy mặt sau */}
      <mesh position={[-PHONE_W / 2, -PHONE_H / 2, 0]} castShadow receiveShadow>
        <extrudeGeometry args={[bodyShape, extrude]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.85}
          roughness={0.28}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* mặt màn hình — clip quay dán lên, đặt nhô hơn mặt trước một chút */}
      <mesh position={[-SCREEN_W / 2, -SCREEN_H / 2, THICK + 0.006]}>
        <shapeGeometry args={[screenShape]} />
        <meshBasicMaterial map={gear.texture} toneMapped={false} />
      </mesh>
    </>
  );
};

/**
 * Bản thử khung máy 3D theo mẫu chính chủ Remotion (`template-three`).
 * Khác bản ảnh PNG phẳng: thân máy là khối đặc có BỀ DÀY, xoay quanh trục dọc
 * là thấy mặt sau, ánh sáng và phản chiếu tính thật.
 */
export const Phone3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // Vào bằng mặt sau rồi xoay dần về mặt trước, sau đó đung đưa rất chậm
  const spin = interpolate(
    frame,
    [0, durationInFrames * 0.55, durationInFrames],
    [Math.PI * 1.35, 0, -0.24],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );
  const tilt = interpolate(frame, [0, durationInFrames], [0.22, -0.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const dolly = interpolate(frame, [0, durationInFrames], [6.2, 3.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(120% 92% at 50% 40%, #1c2440 0%, #101728 46%, #060a12 100%)",
      }}
    >
      <ThreeCanvas
        linear
        width={width}
        height={height}
        camera={{ position: [0, 0, dolly], fov: 42, near: 0.1, far: 60 }}
      >
        <ambientLight intensity={0.85} color={0xffffff} />
        <directionalLight position={[3, 5, 6]} intensity={2.1} />
        <pointLight position={[-4, 2, 3]} intensity={18} color={0xaa75ff} />
        <pointLight position={[4, -2, 4]} intensity={10} color={0x7b3aec} />

        <group rotation={[tilt, spin, 0]}>
          <PhoneBody src={staticFile("v_list.mp4")} color="#20242e" />
        </group>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
