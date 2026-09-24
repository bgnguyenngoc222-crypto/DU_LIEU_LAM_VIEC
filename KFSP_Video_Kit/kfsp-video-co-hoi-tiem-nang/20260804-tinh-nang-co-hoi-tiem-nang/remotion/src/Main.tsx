import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Bg } from "./Bg";
import { Callout, Glass, WordReveal, useLife } from "./Layers";
import { PhoneMock, ScreenRing } from "./PhoneMock";
import { T } from "./theme";
import { CROSS, LAYER, SCREEN } from "./timing";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

/** Một lớp nội dung trên màn: chồng mờ vào, chồng mờ ra, clip luôn bắt đầu ở t=0. */
const ScreenClip: React.FC<{ src: string; from: number; fadeIn: number; fadeOut: number }> = ({
  src,
  from,
  fadeIn,
  fadeOut,
}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [fadeIn, fadeIn + CROSS, fadeOut, fadeOut + CROSS], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (o <= 0.001) return null;
  return (
    <Sequence from={from} layout="none">
      <AbsoluteFill style={{ opacity: o }}>
        <OffthreadVideo
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

export const Main: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const wide = width > height;
  const k = Math.min(width, height) / 1080; // theo cạnh ngắn, để ba khổ cùng cỡ chữ

  // ---- Máy quay: một mạch liên tục, không cắt cảnh ----
  const KF = [0, 96, 183, 300, 387, 411, 460, 525, 549, 620, 690, 712, 780];
  // Máy phải đủ lớn để đọc được chữ trong app. Khi nằm ngang, chiều dài máy
  // không được vượt bề ngang khung, nếu không thì màn hình bị cắt.
  const H_NARROW = [0.22, 0.62, 0.84, 0.88, 0.9, 0.55, 0.56, 0.56, 0.86, 0.9, 0.92, 0.94, 1.0];
  const H_WIDE = [0.26, 0.62, 0.8, 0.86, 0.9, 1.12, 1.15, 1.15, 0.88, 0.92, 0.94, 0.96, 1.05];

  const phoneH =
    interpolate(f, KF, wide ? H_WIDE : H_NARROW, {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE,
    }) *
    height *
    // hơi thở: máy không bao giờ đứng chết, luôn nhích rất nhẹ
    (1 + 0.008 * Math.sin(f / 42));

  const rotY =
    interpolate(
      f,
      [0, 96, 183, 300, 387, 411, 460, 525, 549, 620, 690, 780],
      [-22, -16, -12, -6, -2, 14, 7, -3, -12, -6, -3, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
    ) +
    2.2 * Math.sin(f / 55);
  const rotX = interpolate(
    f,
    [0, 183, 387, 411, 525, 549, 690, 780],
    [9, 5, 2, -4, -2, 4, 2, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );
  const rotZ = interpolate(f, [0, 387, 411, 525, 549, 780], [0, 0, -90, -90, 0, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // dải sáng lướt mặt kính mạnh nhất đúng lúc máy xoay
  const glare = interpolate(f, [380, 411, 440, 520, 549, 580], [0, 0.9, 0, 0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phoneOpacity = interpolate(f, [688, 704], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const brand = useLife(LAYER.brand.from, LAYER.brand.to + 40);
  const closing = useLife(LAYER.closing.from, LAYER.closing.to);
  const hook = useLife(LAYER.hook.from, LAYER.hook.to);
  const feat = useLife(LAYER.feature.from, LAYER.feature.to);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Bg />

      {/* ---------- Chiếc máy: một khung duy nhất suốt video ---------- */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          perspective: `${2200 * k}px`,
          opacity: phoneOpacity,
        }}
      >
        <div
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <PhoneMock h={phoneH} glare={glare}>
            {/* Nội dung màn hình đổi ngay trên màn, máy không dừng */}
            <AbsoluteFill
              style={{
                opacity: interpolate(f, [SCREEN.store.out, SCREEN.store.out + CROSS], [1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <Img
                src={staticFile("store-ios.jpg")}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </AbsoluteFill>
            <ScreenClip src="v_home.mp4" from={SCREEN.home.from} fadeIn={SCREEN.home.in} fadeOut={SCREEN.home.out} />
            <ScreenClip src="v_list.mp4" from={SCREEN.list.from} fadeIn={SCREEN.list.in} fadeOut={SCREEN.list.out} />
            <ScreenClip src="v_chart.mp4" from={SCREEN.chart.from} fadeIn={SCREEN.chart.in} fadeOut={SCREEN.chart.out} />
            <ScreenClip src="v_hhp.mp4" from={SCREEN.hhp.from} fadeIn={SCREEN.hhp.in} fadeOut={SCREEN.hhp.out} />

            {/* Vòng sáng khoanh cụm nguồn tín hiệu "AI Mua/Bán · Hai đáy" — toạ độ theo màn */}
            <ScreenRing
              x={0.028}
              y={0.1}
              w={0.56}
              h={0.052}
              r={phoneH * 0.014}
              p={interpolate(f, [LAYER.spot.from, LAYER.spot.from + 12, LAYER.spot.to - 12, LAYER.spot.to], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              pulse={0.5 + 0.5 * Math.sin((f - LAYER.spot.from) / 9)}
            />
          </PhoneMock>
        </div>
      </AbsoluteFill>

      {/* ---------- Lớp chữ mở bài ---------- */}
      {hook.p > 0.001 ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", opacity: hook.p }}>
          <div style={{ marginTop: height * 0.09, maxWidth: width * 0.82 }}>
            <WordReveal
              text="Mở app xong, không biết nhìn mã nào?"
              local={hook.local}
              size={(wide ? 62 : 72) * k}
              color={T.ink}
            />
          </div>
        </AbsoluteFill>
      ) : null}

      {/* ---------- Thẻ tên tính năng ---------- */}
      {feat.p > 0.001 ? (
        <div
          style={{
            position: "absolute",
            left: wide ? width * 0.06 : width * 0.07,
            top: height * (wide ? 0.14 : 0.11),
            maxWidth: width * (wide ? 0.32 : 0.62),
            opacity: feat.p,
            scale: interpolate(feat.p, [0, 1], [0.94, 1]),
            translate: `${interpolate(feat.p, [0, 1], [-28 * k, 0])}px 0px`,
          }}
        >
          <Glass tone="light" k={k}>
            <div
              style={{
                fontFamily: T.font,
                fontSize: 22 * k,
                fontWeight: 800,
                letterSpacing: 3 * k,
                color: T.purple,
                marginBottom: 8 * k,
              }}
            >
              TÍNH NĂNG MỚI
            </div>
            <WordReveal
              text="Cơ hội tiềm năng"
              local={feat.local}
              size={54 * k}
              color={T.ink}
              align="left"
            />
            <div
              style={{
                fontFamily: T.font,
                fontSize: 28 * k,
                fontWeight: 600,
                color: T.ink,
                opacity: interpolate(feat.local, [20, 34], [0, 0.82], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                marginTop: 10 * k,
                lineHeight: 1.35,
              }}
            >
              App gợi ý sẵn vài mã đáng xem hôm nay
            </div>
          </Glass>
        </div>
      ) : null}

      {/* ---------- Bốn thẻ chú giải ---------- */}
      <Callout
        from={LAYER.call1.from}
        to={LAYER.call1.to}
        x={wide ? 0.8 : 0.5}
        y={wide ? 0.3 : 0.075}
        toX={wide ? 0.6 : 0.5}
        toY={wide ? 0.31 : 0.185}
        text={"Hai nguồn tín hiệu, mỗi cơ hội đều kèm lý\u00A0do"}
        tone="light"
        maxW={wide ? 0.26 : 0.84}
      />
      <Callout
        from={LAYER.call2.from}
        to={LAYER.call2.to}
        x={wide ? 0.19 : 0.5}
        y={wide ? 0.3 : 0.925}
        toX={wide ? 0.4 : 0.5}
        toY={wide ? 0.46 : 0.76}
        text="Bấm vào là ra cơ sở đằng sau"
        tone="light"
        maxW={wide ? 0.26 : 0.8}
      />
      <Callout
        from={LAYER.call3.from}
        to={LAYER.call3.to}
        x={wide ? 0.22 : 0.5}
        y={wide ? 0.12 : 0.16}
        toX={wide ? 0.4 : 0.5}
        toY={wide ? 0.32 : 0.46}
        text="Mở thẳng biểu đồ để bạn tự kiểm chứng"
        tone="dark"
        maxW={wide ? 0.28 : 0.84}
      />
      <Callout
        from={LAYER.call4.from}
        to={LAYER.call4.to}
        x={wide ? 0.79 : 0.5}
        y={wide ? 0.78 : 0.925}
        toX={wide ? 0.58 : 0.5}
        toY={wide ? 0.62 : 0.8}
        text={"Mẫu hình được gọi tên rõ\u00A0ràng"}
        tone="light"
        maxW={wide ? 0.26 : 0.8}
      />

      {/* ---------- Chữ chốt ---------- */}
      {closing.p > 0.001 ? (
        <>
          {/* làm tối cả khung để chữ nổi, không dùng hộp nền thô */}
          <AbsoluteFill style={{ background: "rgba(4,8,16,.46)", opacity: closing.p }} />
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: closing.p }}>
            <div style={{ maxWidth: width * 0.84, filter: `drop-shadow(0 ${6 * k}px ${18 * k}px rgba(0,0,0,.6))` }}>
              <WordReveal
                text="Không phím hàng."
                local={closing.local}
                size={(wide ? 72 : 84) * k}
                color="#ffffff"
              />
              <div style={{ height: 10 * k }} />
              <WordReveal
                text="Bạn tự quyết."
                local={closing.local - 16}
                size={(wide ? 72 : 84) * k}
                color="#ffffff"
              />
            </div>
          </AbsoluteFill>
        </>
      ) : null}

      {/* ---------- Khung đóng ---------- */}
      {brand.p > 0.001 ? (
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 30 * k,
            opacity: brand.p,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20 * k,
              translate: `0px ${interpolate(brand.local, [0, 20], [30 * k, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE,
              })}px`,
            }}
          >
            <Img
              src={staticFile("logo-kfsp.png")}
              style={{
                width: 116 * k,
                height: 116 * k,
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
            <div
              style={{
                fontFamily: T.font,
                fontSize: 86 * k,
                fontWeight: 800,
                letterSpacing: 8 * k,
                color: "#fff",
              }}
            >
              KFSP
            </div>
          </div>

          <div style={{ maxWidth: width * 0.86 }}>
            <WordReveal
              text="Đưa chứng khoán về tầm tay bạn"
              local={brand.local}
              size={54 * k}
              weight={650}
              color="rgba(255,255,255,.96)"
            />
          </div>

          {/* hai thẻ chợ ứng dụng */}
          <div
            style={{
              display: "flex",
              gap: 22 * k,
              marginTop: 12 * k,
              opacity: interpolate(brand.local, [26, 44], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: `0px ${interpolate(brand.local, [26, 44], [26 * k, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE,
              })}px`,
            }}
          >
            {["App Store", "Google Play"].map((s) => (
              <div
                key={s}
                style={{
                  fontFamily: T.font,
                  fontSize: 32 * k,
                  fontWeight: 700,
                  color: "#fff",
                  padding: `${16 * k}px ${34 * k}px`,
                  borderRadius: 999,
                  border: `${2 * k}px solid rgba(255,255,255,.55)`,
                  background: "rgba(255,255,255,.15)",
                  backdropFilter: `blur(${14 * k}px)`,
                  WebkitBackdropFilter: `blur(${14 * k}px)`,
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </AbsoluteFill>
      ) : null}

      {/* ---------- Tiếng chuyển ---------- */}
      {[96, 183, 399, 537].map((from, i) => (
        <Sequence key={i} from={from - 6} durationInFrames={30} layout="none">
          <Audio src={staticFile("whoosh.mp3")} volume={0.26} />
        </Sequence>
      ))}
      <Sequence from={LAYER.brand.from - 6} durationInFrames={30} layout="none">
        <Audio src={staticFile("pop.mp3")} volume={0.34} />
      </Sequence>
    </AbsoluteFill>
  );
};
