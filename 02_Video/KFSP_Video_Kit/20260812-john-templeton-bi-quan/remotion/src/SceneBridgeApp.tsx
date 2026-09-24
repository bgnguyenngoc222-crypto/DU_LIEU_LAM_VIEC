import React from 'react';
import { AbsoluteFill, Img, Video, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FONTS } from './theme';

const TapIndicator: React.FC<{ x: string; y: string; active: boolean }> = ({ x, y, active }) => {
  const frame = useCurrentFrame();
  if (!active) return null;

  // Simple pulsing effect based on frame
  const pulseScale = interpolate((frame % 15) / 15, [0, 1], [0.6, 1.8]);
  const pulseOpacity = interpolate((frame % 15) / 15, [0, 0.8, 1], [0.8, 0.5, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 60,
        height: 60,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 150,
      }}
    >
      {/* Pulsing Outer Ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '3px solid #f5c542',
          transform: `scale(${pulseScale})`,
          opacity: pulseOpacity,
        }}
      />
      {/* Solid Center Orb */}
      <div
        style={{
          position: 'absolute',
          left: 15,
          top: 15,
          width: 30,
          height: 30,
          borderRadius: '50%',
          backgroundColor: '#f5c542',
          border: '2.5px solid #fff',
          boxShadow: '0 0 15px #f5c542',
        }}
      />
    </div>
  );
};

export const SceneBridgeApp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // TIMELINE & VOICE SYNCHRONIZATION (Total 640 frames = 21.33s | 00:01:02.17 -> 00:01:23.5)
  // =========================================================================
  const isStage1 = frame < 195;
  const isStage2a = frame >= 195 && frame < 290;
  const isStage2b = frame >= 290 && frame < 360;
  const isStage2c = frame >= 360 && frame < 445;
  const isStage3a = frame >= 445 && frame < 495;
  const isStage3b = frame >= 495;

  const isPhoneView = frame < 495;
  const floatY = Math.sin(frame / 16) * 3;

  // Zoom & Pan translations (smooth CapCut keyframes to focus on details of the phone screen)
  const scale = interpolate(
    frame,
    [0, 150, 175, 230, 245, 335, 350, 420, 440, 495],
    [1, 1, 1.45, 1.45, 1.35, 1.35, 1.25, 1.25, 1.55, 1.55],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const tx = interpolate(
    frame,
    [0, 150, 175, 230, 245, 335, 350, 420, 440, 495],
    [0, 0, -80, -80, -60, -60, 0, 0, 120, 120],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const ty = interpolate(
    frame,
    [0, 150, 175, 230, 245, 335, 350, 420, 440, 495],
    [0, 0, 280, 280, 80, 80, 100, 100, 220, 220],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const s3bRelFrame = Math.max(0, frame - 495);
  const chartEntranceSpring = spring({ frame: s3bRelFrame, fps, config: { damping: 14, mass: 0.8 } });
  const s3bBadgeBreakout = spring({ frame: Math.max(0, s3bRelFrame - 12), fps, config: { damping: 12 } });
  const s3bBadgeStoploss = spring({ frame: Math.max(0, s3bRelFrame - 45), fps, config: { damping: 12 } });

  const entranceOpacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Phone size specs based on phone.png aspect ratio
  const w = 640;
  const h = 1334;
  const screenW = 585;
  const screenH = 1273;
  const screenLeft = 28;
  const screenTop = 31;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: FONTS.main,
        padding: '0 20px',
        opacity: entranceOpacity,
      }}
    >
      {isPhoneView && (
        <>
          {/* Premium dark radial background for phone view */}
          <AbsoluteFill
            style={{
              zIndex: -1,
              background: 'radial-gradient(120% 90% at 18% 12%, #1a103c 0%, #0c081e 50%, #030208 100%)',
            }}
          />

          {/* ZOOMING & TRANSLATING PHONE CONTAINER */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transformOrigin: '50% 40%',
              transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            }}
          >
            {/* Phone Bezel container */}
            <div style={{ position: 'relative', width: w, height: h }}>
              {/* Bezel shadow */}
              <Img
                src={staticFile("phone.png")}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: w,
                  height: h,
                  filter: `brightness(0) blur(${h * 0.014}px)`,
                  scale: 0.97,
                  opacity: 0.45,
                  pointerEvents: 'none',
                }}
              />
              
              {/* Screen Hole */}
              <div
                style={{
                  position: "absolute",
                  left: screenLeft,
                  top: screenTop,
                  width: screenW,
                  height: screenH,
                  borderRadius: screenW * 0.115,
                  overflow: "hidden",
                  backgroundColor: "#0a1628",
                }}
              >
                {/* raw screen recording rec_cohoitiemnang.mp4 */}
                <Video
                  src={staticFile('rec_cohoitiemnang.mp4')}
                  startFrom={72} // Start from frame 72 (2.4s)
                  endAt={1206}   // End at frame 1206 (40.2s)
                  playbackRate={2.29} // Speed factor to fit 495 frames
                  muted={true}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* Tapping indicators synchronized with video taps */}
                <TapIndicator x="30.4%" y="40%" active={frame >= 40 && frame < 60} />
                <TapIndicator x="28.9%" y="17.5%" active={frame >= 210 && frame < 230} />
                <TapIndicator x="28.9%" y="17.5%" active={frame >= 305 && frame < 325} />
                <TapIndicator x="30.4%" y="54.2%" active={frame >= 435 && frame < 455} />
              </div>
              
              {/* Bezel Overlay */}
              <Img
                src={staticFile("phone.png")}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: w,
                  height: h,
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* DOCKED FRONT-ROW LABELS & FOOTER (Stays out of zoom container to keep static safe zone layout) */}
          <AbsoluteFill
            style={{
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '60px 40px 180px 40px',
            }}
          >
            {/* Top Pill Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'rgba(123, 58, 236, 0.35)',
                border: `1.5px solid ${C.brandLight}`,
                borderRadius: 24,
                padding: '8px 24px',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: C.gold }} />
              <span style={{ color: C.white, fontSize: 20, fontWeight: 900, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                TÍNH NĂNG KFSP · CƠ HỘI TIỀM NĂNG
              </span>
            </div>

            {/* Bottom docked card showing active features */}
            <div
              style={{
                width: 880,
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: `1.5px solid ${C.borderViolet}`,
                borderRadius: 24,
                padding: '20px 28px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {isStage1 && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(123, 58, 236, 0.2)', border: `1px solid ${C.brandLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                      ⚡
                    </div>
                    <div>
                      <div style={{ color: C.gold, fontSize: 18, fontWeight: 900, textTransform: 'uppercase' }}>
                        Tầm soát tự động
                      </div>
                      <div style={{ color: C.white, fontSize: 24, fontWeight: 800 }}>
                        Tính năng Cơ Hội Tiềm Năng · Cắt giảm thời gian lọc tay
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(123, 58, 236, 0.35)', color: C.brandLight, padding: '6px 14px', borderRadius: 12, fontSize: 15, fontWeight: 800 }}>
                    Tự động quét
                  </div>
                </>
              )}

              {isStage2a && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                      📈
                    </div>
                    <div>
                      <div style={{ color: '#4ade80', fontSize: 18, fontWeight: 900, textTransform: 'uppercase' }}>
                        Nhận diện sớm mẫu hình
                      </div>
                      <div style={{ color: C.white, fontSize: 24, fontWeight: 800 }}>
                        Mẫu hình Hai đáy · Tự động quét toàn thị trường
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.25)', border: '1px solid #22c55e', color: '#4ade80', padding: '6px 14px', borderRadius: 12, fontSize: 15, fontWeight: 800 }}>
                    Hai đáy
                  </div>
                </>
              )}

              {isStage2b && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                      📊
                    </div>
                    <div>
                      <div style={{ color: '#38bdf8', fontSize: 18, fontWeight: 900, textTransform: 'uppercase' }}>
                        Nhận diện sớm mẫu hình
                      </div>
                      <div style={{ color: C.white, fontSize: 24, fontWeight: 800 }}>
                        Mẫu hình Vai đầu vai ngược · Không cần soi từng đồ thị
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.25)', border: '1px solid #38bdf8', color: '#38bdf8', padding: '6px 14px', borderRadius: 12, fontSize: 15, fontWeight: 800 }}>
                    VĐV ngược
                  </div>
                </>
              )}

              {isStage2c && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(245, 197, 66, 0.2)', border: `1px solid ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                      🎯
                    </div>
                    <div>
                      <div style={{ color: C.gold, fontSize: 18, fontWeight: 900, textTransform: 'uppercase' }}>
                        Trạng thái "Chờ xác nhận"
                      </div>
                      <div style={{ color: C.white, fontSize: 24, fontWeight: 800 }}>
                        Đo sẵn chỉ số "Cách break -X%" đến điểm nổ
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(245, 197, 66, 0.25)', border: `1px solid ${C.gold}`, color: C.gold, padding: '6px 14px', borderRadius: 12, fontSize: 15, fontWeight: 800 }}>
                    Chờ xác nhận
                  </div>
                </>
              )}

              {isStage3a && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(245, 197, 66, 0.25)', border: `1px solid ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                      👆
                    </div>
                    <div>
                      <div style={{ color: C.gold, fontSize: 18, fontWeight: 900, textTransform: 'uppercase' }}>
                        Thao tác 1 chạm
                      </div>
                      <div style={{ color: C.white, fontSize: 24, fontWeight: 800 }}>
                        Bấm nút "Biểu đồ" để mở đồ thị nến kỹ thuật vẽ sẵn
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: C.gold, color: '#0a1628', padding: '6px 14px', borderRadius: 12, fontSize: 15, fontWeight: 900 }}>
                    BẤM BIỂU ĐỒ
                  </div>
                </>
              )}
            </div>
          </AbsoluteFill>
        </>
      )}

      {/* ===================================================================== */}
      {/* SECTION 2: DEDICATED LANDSCAPE CHART VIEW (s12b: Frames 495 -> 640)  */}
      {/* ===================================================================== */}
      {isStage3b && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 1020,
            transform: `translateY(${floatY}px) scale(${interpolate(
              chartEntranceSpring,
              [0, 1],
              [0.92, 1]
            )})`,
            opacity: interpolate(chartEntranceSpring, [0, 1], [0, 1]),
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                backgroundColor: 'rgba(123, 58, 236, 0.25)',
                border: `1.5px solid ${C.brandLight}`,
                borderRadius: 20,
                padding: '6px 18px',
              }}
            >
              <span style={{ fontSize: 18 }}>📊</span>
              <span style={{ color: C.white, fontSize: 17, fontWeight: 900, letterSpacing: 1 }}>
                ĐỒ THỊ NẾN THẬT · TỰ ĐỘNG VẼ SẴN
              </span>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid #22c55e',
                color: '#4ade80',
                borderRadius: 16,
                padding: '6px 14px',
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              ✓ Mốc Breakout & Mốc Hủy
            </div>
          </div>

          {/* LANDSCAPE CHART CONTAINER (Scaled up from 900x440px to 1020x580px for larger chart details) */}
          <div
            style={{
              position: 'relative',
              width: 1020,
              height: 468, // Adjusted height to match native 1024x470 aspect ratio
              borderRadius: 24,
              backgroundColor: '#070f1e',
              border: `2px solid ${C.borderViolet}`,
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85)',
              overflow: 'hidden',
            }}
          >
            <Img
              src={staticFile('co_hoi_tiem_nang_chart_bsr.jpg')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Eliminates empty margins
                display: 'block',
              }}
            />
          </div>

          {/* 2 DOCKED ANALYSIS CARDS BELOW CHART */}
          <div
            style={{
              marginTop: 14,
              width: '100%',
              display: 'flex',
              gap: 14,
            }}
          >
            {/* Card 1: Vùng Breakout */}
            <div
              style={{
                flex: 1,
                backgroundColor: 'rgba(15, 23, 42, 0.92)',
                border: '1.5px solid rgba(34, 197, 94, 0.5)',
                borderRadius: 20,
                padding: '14px 20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transform: `scale(${interpolate(s3bBadgeBreakout, [0, 1], [0.9, 1])})`,
                opacity: interpolate(s3bBadgeBreakout, [0, 1], [0, 1]),
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  border: '1px solid #22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}
              >
                🟢
              </div>
              <div>
                <div style={{ color: '#4ade80', fontSize: 22, fontWeight: 900, textTransform: 'uppercase' }}>
                  Mốc Bứt Phá (Breakout)
                </div>
                <div style={{ color: C.white, fontSize: 26, fontWeight: 800 }}>
                  Xác nhận điểm vào lệnh
                </div>
              </div>
            </div>

            {/* Card 2: Mốc Hủy */}
            <div
              style={{
                flex: 1,
                backgroundColor: 'rgba(15, 23, 42, 0.92)',
                border: '1.5px solid rgba(239, 68, 68, 0.5)',
                borderRadius: 20,
                padding: '14px 20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transform: `scale(${interpolate(s3bBadgeStoploss, [0, 1], [0.9, 1])})`,
                opacity: interpolate(s3bBadgeStoploss, [0, 1], [0, 1]),
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid #ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}
              >
                🛡️
              </div>
              <div>
                <div style={{ color: '#f87171', fontSize: 22, fontWeight: 900, textTransform: 'uppercase' }}>
                  Mốc Hủy Mô Hình
                </div>
                <div style={{ color: C.white, fontSize: 26, fontWeight: 800 }}>
                  Quản trị rủi ro cắt lỗ
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
