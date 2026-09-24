import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FONTS } from './theme';

export const Scene3Truths: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing relative to Scene start (which spans from 990 to 1815 in global timeline = 825 frames)
  // Phase 0: 0 -> 135 frames (00:33 -> 00:37) - ONLY TITLE 'Có 3 sự thật đảo chiều góc nhìn'
  // Phase 1: 135 -> 345 frames (00:38 -> 00:44.2) - TRUTH 1 Spotlight + Illustration (VN-Index drop vs Stock accumulation)
  // Phase 2: 345 -> 645 frames (00:45 -> 00:54) - TRUTH 2 Spotlight + Illustration (Support line bounce + constructive pattern)
  // Phase 3: 645 -> 825 frames (00:55 -> 01:00) - TRUTH 3 Spotlight + Illustration (Uncertainty margin of safety vs Obvious trap)

  const isIntroOnly = frame < 135;
  const activeTruth = frame < 135 ? 0 : frame < 345 ? 1 : frame < 645 ? 2 : 3;

  // Title entrance animation
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const exitOpacity = interpolate(
    frame,
    [825, 840],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: FONTS.main,
        padding: '0 40px',
        opacity: exitOpacity,
      }}
    >
      {/* PHASE 0: 00:33 -> 00:37 (ONLY TITLE INTRO) */}
      {isIntroOnly ? (
        <div
          style={{
            width: 880,
            textAlign: 'center',
            transform: `scale(${interpolate(titleSpring, [0, 1], [0.85, 1])})`,
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            border: `2px solid ${C.brandLight}`,
            borderRadius: 36,
            padding: '60px 40px',
            boxShadow: '0 30px 80px rgba(123, 58, 236, 0.35)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(245, 197, 66, 0.15)',
              border: `1.5px solid ${C.gold}`,
              color: C.gold,
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: 'uppercase',
              padding: '8px 24px',
              borderRadius: 24,
              marginBottom: 24,
            }}
          >
            Tư duy cốt lõi
          </div>
          <h1
            style={{
              color: C.white,
              fontSize: 50,
              fontWeight: 900,
              lineHeight: 1.3,
              margin: '0 0 20px 0',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            Có 3 Sự Thật Đảo Chiều Góc Nhìn
          </h1>
          <p style={{ color: C.textMuted, fontSize: 24, margin: 0 }}>
            Để phát hiện cơ hội lớn khi đám đông đang hoang mang
          </p>
        </div>
      ) : (
        /* PHASES 1, 2, 3: 3 TRUTHS WITH DYNAMIC SPOTLIGHT & VISUAL ILLUSTRATIONS */
        <div style={{ width: 920, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Header Title Bar (Compact) */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                backgroundColor: 'rgba(123, 58, 236, 0.2)',
                border: `1px solid ${C.brandLight}`,
                borderRadius: 20,
                padding: '6px 20px',
                color: C.brandLight,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
              }}
            >
              <span>💎</span> 3 Sự Thật Đảo Chiều Góc Nhìn
            </div>
          </div>

          {/* 3 Truth Cards Stack */}
          <div style={{ width: '100%', marginBottom: 24 }}>
            {/* Card 1 */}
            <div
              style={{
                backgroundColor: activeTruth === 1 ? 'rgba(123, 58, 236, 0.3)' : 'rgba(15, 23, 42, 0.45)',
                border: activeTruth === 1 ? `2.5px solid ${C.gold}` : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 22,
                padding: '18px 24px',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: activeTruth === 1 ? '0 0 35px rgba(245, 197, 66, 0.4)' : 'none',
                transform: activeTruth === 1 ? 'scale(1.02)' : 'scale(0.97)',
                opacity: activeTruth === 1 ? 1 : 0.35,
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: activeTruth === 1 ? C.gold : 'rgba(255, 255, 255, 0.1)',
                  color: activeTruth === 1 ? '#0f172a' : C.white,
                  fontSize: 24,
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                01
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: activeTruth === 1 ? C.gold : C.white, fontSize: 30, fontWeight: 800 }}>
                  Thị trường giảm không có nghĩa mọi cổ phiếu đều suy yếu
                </div>

              </div>
            </div>

            {/* Card 2 */}
            <div
              style={{
                backgroundColor: activeTruth === 2 ? 'rgba(123, 58, 236, 0.3)' : 'rgba(15, 23, 42, 0.45)',
                border: activeTruth === 2 ? `2.5px solid ${C.green}` : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 22,
                padding: '18px 24px',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: activeTruth === 2 ? '0 0 35px rgba(52, 211, 153, 0.4)' : 'none',
                transform: activeTruth === 2 ? 'scale(1.02)' : 'scale(0.97)',
                opacity: activeTruth === 2 ? 1 : 0.35,
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: activeTruth === 2 ? C.green : 'rgba(255, 255, 255, 0.1)',
                  color: activeTruth === 2 ? '#0f172a' : C.white,
                  fontSize: 24,
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                02
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: activeTruth === 2 ? C.green : C.white, fontSize: 30, fontWeight: 800 }}>
                  Cổ phiếu khoẻ nhất luôn lộ diện ngay trong đợt điều chỉnh
                </div>

              </div>
            </div>

            {/* Card 3 */}
            <div
              style={{
                backgroundColor: activeTruth === 3 ? 'rgba(123, 58, 236, 0.3)' : 'rgba(15, 23, 42, 0.45)',
                border: activeTruth === 3 ? `2.5px solid ${C.gold}` : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 22,
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: activeTruth === 3 ? '0 0 35px rgba(245, 197, 66, 0.4)' : 'none',
                transform: activeTruth === 3 ? 'scale(1.02)' : 'scale(0.97)',
                opacity: activeTruth === 3 ? 1 : 0.35,
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: activeTruth === 3 ? C.gold : 'rgba(255, 255, 255, 0.1)',
                  color: activeTruth === 3 ? '#0f172a' : C.white,
                  fontSize: 24,
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                03
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: activeTruth === 3 ? C.gold : C.white, fontSize: 30, fontWeight: 800 }}>
                  Cơ hội thực sự luôn xuất hiện khi đám đông còn nghi ngờ
                </div>

              </div>
            </div>
          </div>

          {/* DYNAMIC ILLUSTRATION PANEL (Based on active truth) */}
          <div
            style={{
              width: '100%',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: `2px solid ${activeTruth === 2 ? C.green : C.brandLight}`,
              borderRadius: 28,
              padding: '24px 28px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(16px)',
              minHeight: 360,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* ILLUSTRATION FOR TRUTH 1: VN-INDEX DROP vs STOCK ACCUMULATION */}
            {activeTruth === 1 && (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16, alignItems: 'center' }}>
                  <div style={{ color: C.red, fontSize: 24, fontWeight: 800 }}>
                    📉 Thị trường chung: Rơi sâu (-x%)
                  </div>
                  <div style={{ color: C.green, fontSize: 24, fontWeight: 800 }}>
                    🛡️ Doanh nghiệp khỏe: Đi ngang tích lũy
                  </div>
                </div>
                <svg width="100%" height="240" viewBox="0 0 800 240">
                  {/* Grid */}
                  <line x1="0" y1="60" x2="800" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />
                  <line x1="0" y1="120" x2="800" y2="120" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />
                  <line x1="0" y1="180" x2="800" y2="180" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />

                  {/* Red Drop line */}
                  <path d="M 40 40 Q 300 60, 760 210" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="8 4" />
                  <text x="500" y="225" fill="#ef4444" fontSize="24" fontWeight="800">Chỉ số chung suy yếu</text>

                  {/* Green Accumulation Curve (drawn first so it goes behind the solid rect) */}
                  <path d="M 40 110 Q 200 95, 350 110 T 550 108 T 750 105" fill="none" stroke="#34d399" strokeWidth="5" />

                  {/* Green Accumulation Box with opaque background fill to mask the curve */}
                  <rect x="230" y="75" width="540" height="70" rx="10" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
                  <text x="500" y="118" fill="#34d399" fontSize="26" fontWeight="900" textAnchor="middle">VÙNG TÍCH LŨY DÒNG TIỀN GOM</text>
                </svg>
              </div>
            )}

            {/* ILLUSTRATION FOR TRUTH 2: SUPPORT BOUNCE + CONSTRUCTIVE PATTERN */}
            {activeTruth === 2 && (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16, alignItems: 'center' }}>
                  <div style={{ color: C.brandLight, fontSize: 24, fontWeight: 800 }}>
                    ⚡ Mẫu hình kiến tạo (Hai đáy / Vai đầu vai ngược)
                  </div>
                  <div style={{ color: C.green, fontSize: 24, fontWeight: 800 }}>
                    💪 Giữ vững vùng hỗ trợ cứng
                  </div>
                </div>
                <svg width="100%" height="240" viewBox="0 0 800 240">
                  {/* Grid */}
                  <line x1="0" y1="60" x2="800" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />
                  <line x1="0" y1="120" x2="800" y2="120" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />
                  <line x1="0" y1="180" x2="800" y2="180" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />

                  {/* Support Line */}
                  <line x1="40" y1="185" x2="760" y2="185" stroke="#38bdf8" strokeWidth="3" />
                  <text x="50" y="215" fill="#38bdf8" fontSize="24" fontWeight="800">ĐƯỜNG HỖ TRỢ CỨNG (SUPPORT LINE)</text>

                  {/* Double Bottom W Shape Rebound */}
                  <path
                    d="M 60 50 L 220 185 L 360 100 L 500 185 L 740 40"
                    fill="none"
                    stroke="#f5c542"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Bounce tags (positioned in empty spaces to prevent line overlap) */}
                  <circle cx="220" cy="185" r="8" fill="#34d399" />
                  <circle cx="500" cy="185" r="8" fill="#34d399" />
                  <text x="220" y="145" fill="#f5c542" fontSize="24" fontWeight="800" textAnchor="middle">Đáy 1</text>
                  <text x="500" y="145" fill="#f5c542" fontSize="24" fontWeight="800" textAnchor="middle">Đáy 2 (Bật tăng)</text>

                  {/* Breakout Arrow (positioned at the top right peak end) */}
                  <text x="740" y="25" fill="#34d399" fontSize="26" fontWeight="900" textAnchor="end">BỨT PHÁ ↗</text>
                </svg>
              </div>
            )}

            {/* ILLUSTRATION FOR TRUTH 3: UNCERTAINTY ZONE vs OBVIOUS TRAP (Stacked vertically for 9:16 portrait mobile) */}
            {activeTruth === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Zone 1 */}
                <div
                  style={{
                    backgroundColor: 'rgba(52, 211, 153, 0.15)',
                    border: '1.5px solid #34d399',
                    borderRadius: 20,
                    padding: '16px 20px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🛡️</div>
                  <div style={{ color: C.green, fontSize: 28, fontWeight: 900, marginBottom: 6 }}>
                    KHI CÒN HOÀI NGHI
                  </div>
                  <div style={{ color: C.white, fontSize: 22, fontWeight: 700 }}>
                    Biên an toàn cực lớn · Mức giá gom tối ưu nhất
                  </div>
                </div>

                {/* Zone 2 */}
                <div
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '1.5px solid #ef4444',
                    borderRadius: 20,
                    padding: '16px 20px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
                  <div style={{ color: C.red, fontSize: 28, fontWeight: 900, marginBottom: 6 }}>
                    KHI QUÁ RÕ RÀNG
                  </div>
                  <div style={{ color: C.textMuted, fontSize: 22, fontWeight: 700 }}>
                    Biên an toàn biến mất · Rủi ro đu đỉnh đám đông
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
