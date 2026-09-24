import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FONTS } from './theme';

export const SceneActionCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isRiskPhase = frame < 180;
  const phaseFrame = isRiskPhase ? frame : frame - 180;

  // Spring animation for entrance
  const phaseSpring = spring({
    frame: phaseFrame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const floatY = Math.sin(frame / 14) * 5;
  // Removed continuous pulse — button stays static after entrance

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: FONTS.main,
        perspective: 1200,
      }}
    >
      <div
        style={{
          width: 880,
          textAlign: 'center',
          transform: `translateY(${floatY}px) scale(${interpolate(phaseSpring, [0, 1], [0.85, 1])})`,
          opacity: interpolate(phaseSpring, [0, 1], [0, 1]),
        }}
      >
        {isRiskPhase ? (
          /* Risk Disclaimer Box */
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              border: '2px solid rgba(245, 197, 66, 0.5)',
              borderRadius: 36,
              padding: '52px 44px',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 35px rgba(245, 197, 66, 0.2)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 24,
                backgroundColor: 'rgba(245, 197, 66, 0.15)',
                border: '1.5px solid rgba(245, 197, 66, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 44,
                margin: '0 auto 24px auto',
                boxShadow: '0 0 25px rgba(245, 197, 66, 0.3)',
              }}
            >
              🛡️
            </div>
            <h3
              style={{
                color: C.gold,
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: 1,
                margin: '0 0 18px 0',
                textTransform: 'uppercase',
              }}
            >
              Nguyên Tắc Quản Trị Rủi Ro
            </h3>
            <p
              style={{
                color: C.white,
                fontSize: 30,
                fontWeight: 600,
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              Mọi dữ liệu và mẫu hình đều là công cụ hỗ trợ tầm soát. Bạn luôn cần tuân thủ kế hoạch giao dịch và kỷ luật quản trị rủi ro từ chính bạn.
            </p>
          </div>
        ) : (
          /* Brand Spine & App CTA */
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: `2.5px solid ${C.brandLight}`,
              borderRadius: 40,
              padding: '60px 48px',
              boxShadow: '0 35px 90px rgba(0, 0, 0, 0.85), 0 0 45px rgba(123, 58, 236, 0.5)',
              backdropFilter: 'blur(24px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Gloss */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 18,
                marginBottom: 26,
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 20,
                  backgroundColor: 'rgba(123, 58, 236, 0.25)',
                  border: `1.5px solid ${C.brandLight}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  boxShadow: '0 0 20px rgba(123, 58, 236, 0.5)',
                }}
              >
                <Img src={staticFile('logo-kfsp.png')} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span
                style={{
                  color: C.white,
                  fontSize: 48,
                  fontWeight: 900,
                  letterSpacing: 2,
                }}
              >
                KFSP
              </span>
            </div>

            <div
              style={{
                color: C.gold,
                fontSize: 40,
                fontWeight: 900,
                lineHeight: 1.4,
                marginBottom: 36,
                textShadow: '0 0 25px rgba(245, 197, 66, 0.4)',
              }}
            >
              "Đưa chứng khoán về tầm tay bạn."
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: C.brandViolet,
                border: '1.5px solid #a855f7',
                color: C.white,
                padding: '20px 52px',
                borderRadius: 50,
                fontSize: 28,
                fontWeight: 900,
                boxShadow: '0 12px 35px rgba(123, 58, 236, 0.7), 0 0 20px rgba(123, 58, 236, 0.5)',
                // Static scale, no pulse
              }}
            >
              <span>🚀</span>
              <span>Mở App KFSP Ngay Hôm Nay</span>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
