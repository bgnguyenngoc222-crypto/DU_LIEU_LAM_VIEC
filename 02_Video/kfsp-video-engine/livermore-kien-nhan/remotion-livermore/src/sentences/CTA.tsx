import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Sentence } from "../types";
import { Center, FadeUp, Headline, sp, COLORS, SPRINGS, FONT_STACK } from "./_shared";
import { HideBrand } from "../brand";

// s27 — không phải mua bán nhiều nhất: trophy struck out
export const SentenceS27: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [24, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Center gap={34}>
      <Headline size={50} cfg={SPRINGS.soft} parts={[{ t: "Nhà đầu tư vững vàng " }, { t: "không phải", c: COLORS.red }, { t: " người mua bán nhiều nhất." }]} />
      <div style={{ position: "relative", fontFamily: FONT_STACK, width: 120, height: 120 }}>
        <svg width={120} height={120} viewBox="0 0 120 120" style={{ opacity: 0.55 }}>
          {/* cup bowl */}
          <path d="M38 24 H82 V44 C82 62 72 72 60 72 C48 72 38 62 38 44 Z" fill={`${COLORS.gold}33`} stroke={COLORS.gold} strokeWidth={3} strokeLinejoin="round" />
          {/* handles */}
          <path d="M38 30 C24 30 24 50 41 53" fill="none" stroke={COLORS.gold} strokeWidth={3} />
          <path d="M82 30 C96 30 96 50 79 53" fill="none" stroke={COLORS.gold} strokeWidth={3} />
          {/* stem + base */}
          <rect x={56} y={72} width={8} height={15} fill={COLORS.gold} />
          <rect x={44} y={87} width={32} height={7} rx={2} fill={COLORS.gold} />
          <rect x={37} y={95} width={46} height={8} rx={2} fill={COLORS.gold} />
        </svg>
        <div style={{ position: "absolute", left: -20, right: -20, top: "50%", height: 6, background: COLORS.red, transform: `scaleX(${strike})`, transformOrigin: "left", borderRadius: 3 }} />
      </div>
    </Center>
  );
};

// s28 — FINAL CTA: chờ đúng lúc rồi hành động dứt khoát
export const SentenceS28: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hideBrand = React.useContext(HideBrand);
  // silence → single decisive snap
  const snap = sp(frame, fps, SPRINGS.decisive, 40);
  const logoIn = sp(frame, fps, SPRINGS.soft, 70);
  return (
    <Center gap={28}>
      <FadeUp cfg={SPRINGS.soft}>
        <div style={{ fontSize: 40, color: COLORS.textSecondary, fontFamily: FONT_STACK }}>Mà là người biết chờ đúng lúc…</div>
      </FadeUp>
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: COLORS.gold,
          fontFamily: FONT_STACK,
          opacity: Math.min(1, snap),
          transform: `scale(${0.8 + 0.2 * Math.min(1, snap)})`,
          textShadow: `0 0 44px ${COLORS.gold}66`,
        }}
      >
        rồi HÀNH ĐỘNG.
      </div>
      {!hideBrand && (
        <div style={{ opacity: Math.min(1, logoIn), transform: `translateY(${(1 - Math.min(1, logoIn)) * 24}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 16 }}>
          <Img src={staticFile("logo-kfsp.png")} style={{ width: 96, height: 96, filter: `brightness(0) invert(1) drop-shadow(0 0 12px rgba(255,255,255,0.4))` }} />
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 4, color: COLORS.purple, fontFamily: FONT_STACK }}>KFSP</div>
        </div>
      )}
    </Center>
  );
};
