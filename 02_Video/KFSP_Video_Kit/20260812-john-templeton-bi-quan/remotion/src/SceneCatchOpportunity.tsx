import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FONTS } from './theme';

export const SceneCatchOpportunity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for main container (0 -> 30f)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Central Opportunity Gem entrance & float (15 -> 60f)
  const gemSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 13, mass: 0.9, stiffness: 95 },
  });

  const gemScale = interpolate(gemSpring, [0, 1], [0.5, 1]);
  const gemFloat = Math.sin(frame / 6) * 5;

  // 2 Comparison Cards Staggered Slide In
  const cardLeftSpring = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const cardRightSpring = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Clean Strike Badge (Frame 60+)
  const strikeFrame = Math.max(0, frame - 60);
  const strikeSpring = spring({
    frame: strikeFrame,
    fps,
    config: { damping: 12, mass: 0.7, stiffness: 120 },
  });
  const strikeScale = interpolate(strikeSpring, [0, 1], [1.6, 1]);
  const strikeOpacity = interpolate(strikeFrame, [0, 6], [0, 1], { extrapolateRight: 'clamp' });

  // Bottom quote reveal (frame 75 -> 100)
  const footerReveal = interpolate(frame, [75, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: FONTS.main,
        padding: '0 30px',
        opacity: interpolate(entrance, [0, 1], [0, 1]),
      }}
    >
      {/* Main Container */}
      <div
        style={{
          width: 880,
          backgroundColor: 'rgba(11, 19, 36, 0.94)',
          border: `1.5px solid ${C.borderViolet}`,
          borderRadius: 32,
          padding: '34px 30px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top Header Badge */}
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(245, 197, 66, 0.15)',
              border: `1.5px solid ${C.gold}`,
              color: C.gold,
              fontSize: 22,
              fontWeight: 900,
              padding: '6px 20px',
              borderRadius: 20,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            <span>⚡</span>
            <span>NGUYÊN TẮC CỐT LÕI · TÂM LÝ ĐẦU TƯ</span>
          </div>
          <h2
            style={{
              color: C.white,
              fontSize: 42,
              fontWeight: 900,
              margin: '10px 0 0 0',
              letterSpacing: 0.5,
            }}
          >
            Nhìn Thấy Cơ Hội — Vượt Qua Cảm Tính
          </h2>
        </div>

        {/* Central 3D Opportunity Badge */}
        <div
          style={{
            position: 'relative',
            margin: '4px 0 20px 0',
            transform: `translateY(${gemFloat}px) scale(${gemScale})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(245, 197, 66, 0.9) 0%, rgba(123, 58, 236, 0.9) 100%)',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              borderRadius: 22,
              padding: '12px 30px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 10px 30px rgba(123, 58, 236, 0.4)',
            }}
          >
            <span style={{ fontSize: 28 }}>💎</span>
            <span
              style={{
                color: '#ffffff',
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
              }}
            >
              CƠ HỘI SINH RA TỪ SỰ HOÀI NGHI
            </span>
          </div>
        </div>

        {/* 2 Comparison Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* LEFT: BẪY CẢM TÍNH */}
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1.5px solid rgba(239, 68, 68, 0.4)',
              borderRadius: 20,
              padding: '20px 18px',
              transform: `translateX(${interpolate(cardLeftSpring, [0, 1], [-30, 0])}px)`,
              opacity: interpolate(cardLeftSpring, [0, 1], [0, 1]),
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 26 }}>🛑</span>
              <div style={{ color: C.red, fontSize: 26, fontWeight: 900 }}>BẪY CẢM TÍNH</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  padding: '9px 12px',
                  borderRadius: 10,
                  color: '#fca5a5',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                • Hoảng sợ bán tháo ngay đáy
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  padding: '9px 12px',
                  borderRadius: 10,
                  color: '#fca5a5',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                • FOMO mua đuổi khi hưng phấn
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  padding: '9px 12px',
                  borderRadius: 10,
                  color: '#fca5a5',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                • Quyết định theo tin đồn
              </div>
            </div>

            {/* Clean Strike Overlay (Frame 60+) */}
            {strikeOpacity > 0 && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(10, 15, 30, 0.85)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: 20,
                  transform: `scale(${strikeScale}) rotate(-6deg)`,
                  opacity: strikeOpacity,
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    border: '2.5px solid #ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.25)',
                    padding: '10px 18px',
                    borderRadius: 14,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      color: '#ffffff',
                      fontSize: 24,
                      fontWeight: 900,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                    }}
                  >
                    ❌ LOẠI BỎ
                  </div>
                  <div
                    style={{
                      color: '#fca5a5',
                      fontSize: 16,
                      fontWeight: 800,
                      marginTop: 2,
                    }}
                  >
                    HÀNH ĐỘNG CẢM TÍNH
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: BẢN LĨNH & KỶ LUẬT */}
          <div
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.08)',
              border: '1.5px solid rgba(34, 197, 94, 0.4)',
              borderRadius: 20,
              padding: '20px 18px',
              transform: `translateX(${interpolate(cardRightSpring, [0, 1], [30, 0])}px)`,
              opacity: interpolate(cardRightSpring, [0, 1], [0, 1]),
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 26 }}>🧭</span>
                <div style={{ color: '#4ade80', fontSize: 26, fontWeight: 900 }}>BẢN LĨNH & KỶ LUẬT</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  padding: '9px 12px',
                  borderRadius: 10,
                  color: '#86efac',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                ✓ Bình tĩnh khi thị trường hoài nghi
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  padding: '9px 12px',
                  borderRadius: 10,
                  color: '#86efac',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                ✓ Nhận diện cổ phiếu tích lũy ngầm
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  padding: '9px 12px',
                  borderRadius: 10,
                  color: '#86efac',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                ✓ Bám sát tiêu chí & mẫu hình chuẩn
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rule Footer Box (Stacked vertically to be completely readable on mobile) */}
        {footerReveal > 0 && (
          <div
            style={{
              marginTop: 18,
              width: '100%',
              backgroundColor: 'rgba(123, 58, 236, 0.15)',
              border: `1px solid ${C.brandLight}`,
              borderRadius: 16,
              padding: '16px 24px',
              textAlign: 'center',
              transform: `scale(${interpolate(footerReveal, [0, 1], [0.95, 1])})`,
              opacity: footerReveal,
            }}
          >
            <div style={{ color: C.gold, fontSize: 24, fontWeight: 900, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
              QUY TẮC VÀNG
            </div>
            <div style={{ color: C.white, fontSize: 22, fontWeight: 700, lineHeight: 1.4 }}>
              Cơ hội không đến từ sự hưng phấn của số đông — Cơ hội thuộc về người có nguyên tắc.
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
