import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FONTS } from './theme';

export const SceneTempleton: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0 -> 60 frames (14s -> 16s): Portrait reveal animation
  const portraitSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 90 },
  });

  const portraitScale = interpolate(portraitSpring, [0, 1], [0.75, 1]);
  const portraitOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 60 -> 270 frames (16s -> 23s): Typewriter Quote Effect
  // Target quote: "Cơ hội đầu cơ sinh ra trong sự ảm đạm, lớn lên bằng sự hoài nghi, phát triển nhờ lạc quan và chết bởi thỏa mãn."
  const quoteText = '“Cơ hội đầu cơ sinh ra trong sự ảm đạm, lớn lên bằng sự hoài nghi, phát triển nhờ lạc quan và chết bởi thỏa mãn.”';
  const typewriterStartFrame = 55;
  const typewriterDuration = 180; // 6 seconds

  const charsToShow = Math.floor(
    interpolate(
      frame,
      [typewriterStartFrame, typewriterStartFrame + typewriterDuration],
      [0, quoteText.length],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    )
  );

  const displayedText = quoteText.slice(0, charsToShow);
  const isTyping = frame >= typewriterStartFrame && frame < typewriterStartFrame + typewriterDuration + 15;
  const showCursor = isTyping; // Always show cursor while typing, no blink

  // 4 stage pill reveals as typewriter progresses
  const p1 = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p2 = interpolate(frame, [125, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p3 = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p4 = interpolate(frame, [215, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', fontFamily: FONTS.main }}>
      {/* Main Quote Glass Card */}
      <div
        style={{
          width: 880,
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          border: `2px solid ${C.borderViolet}`,
          borderRadius: 36,
          padding: '40px 36px',
          boxShadow: '0 30px 70px rgba(123, 58, 236, 0.3)',
          backdropFilter: 'blur(20px)',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Sir John Templeton Portrait (14s - 16s reveal) */}
        <div
          style={{
            position: 'relative',
            width: 190,
            height: 190,
            margin: '0 auto 20px auto',
            transform: `scale(${portraitScale})`,
            opacity: portraitOpacity,
          }}
        >
          {/* Glowing Aura Ring */}
          <div
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${C.gold} 0%, rgba(123, 58, 236, 0.8) 60%, transparent 80%)`,
              filter: 'blur(10px)',
              opacity: 0.75,
            }}
          />
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              border: `4px solid ${C.gold}`,
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8)',
              backgroundColor: '#0a1628',
            }}
          >
            <Img
              src={staticFile('john_templeton_face.jpg')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </div>
        </div>

        {/* Title Tag */}
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'rgba(245, 197, 66, 0.15)',
            border: `1px solid ${C.gold}`,
            borderRadius: 20,
            padding: '6px 20px',
            color: C.gold,
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 16,
            opacity: portraitOpacity,
          }}
        >
          Sir John Templeton
        </div>

        {/* Typewriter Quote Box (16s - 23s) */}
        <div
          style={{
            minHeight: 140,
            color: C.white,
            fontSize: 38,
            fontWeight: 700,
            fontStyle: 'italic',
            lineHeight: 1.5,
            marginBottom: 32,
            padding: '0 10px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {displayedText}
          {showCursor && (
            <span
              style={{
                color: C.gold,
                fontWeight: 900,
                marginLeft: 4,
                display: 'inline-block',
                transform: 'translateY(-2px)',
              }}
            >
              |
            </span>
          )}
        </div>

        {/* 4 Cycle Stages (Glowing as Quote Typewriter passes through them) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Stage 1: Ảm đạm */}
          <div
            style={{
              opacity: p1,
              transform: `scale(${interpolate(p1, [0, 1], [0.9, 1])})`,
              backgroundColor: 'rgba(123, 58, 236, 0.25)',
              border: `1.5px solid ${C.brandLight}`,
              padding: '16px 18px',
              borderRadius: 20,
              boxShadow: `0 0 20px rgba(123, 58, 236, ${0.4 * p1})`,
            }}
          >
            <div style={{ color: C.textMuted, fontSize: 16, marginBottom: 4 }}>Sinh ra trong</div>
            <div style={{ color: C.brandLight, fontSize: 34, fontWeight: 900 }}>ẢM ĐẠM</div>
          </div>

          {/* Stage 2: Hoài nghi */}
          <div
            style={{
              opacity: p2,
              transform: `scale(${interpolate(p2, [0, 1], [0.9, 1])})`,
              backgroundColor: 'rgba(52, 211, 153, 0.2)',
              border: `1.5px solid ${C.green}`,
              padding: '16px 18px',
              borderRadius: 20,
              boxShadow: `0 0 20px rgba(52, 211, 153, ${0.4 * p2})`,
            }}
          >
            <div style={{ color: C.textMuted, fontSize: 16, marginBottom: 4 }}>Lớn lên bằng</div>
            <div style={{ color: C.green, fontSize: 34, fontWeight: 900 }}>HOÀI NGHI</div>
          </div>

          {/* Stage 3: Lạc quan */}
          <div
            style={{
              opacity: p3,
              transform: `scale(${interpolate(p3, [0, 1], [0.9, 1])})`,
              backgroundColor: 'rgba(245, 197, 66, 0.2)',
              border: `1.5px solid ${C.gold}`,
              padding: '16px 18px',
              borderRadius: 20,
              boxShadow: `0 0 20px rgba(245, 197, 66, ${0.4 * p3})`,
            }}
          >
            <div style={{ color: C.textMuted, fontSize: 16, marginBottom: 4 }}>Phát triển nhờ</div>
            <div style={{ color: C.gold, fontSize: 34, fontWeight: 900 }}>LẠC QUAN</div>
          </div>

          {/* Stage 4: Thỏa mãn */}
          <div
            style={{
              opacity: p4,
              transform: `scale(${interpolate(p4, [0, 1], [0.9, 1])})`,
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: `1.5px solid ${C.red}`,
              padding: '16px 18px',
              borderRadius: 20,
              boxShadow: `0 0 20px rgba(239, 68, 68, ${0.4 * p4})`,
            }}
          >
            <div style={{ color: C.textMuted, fontSize: 16, marginBottom: 4 }}>Chết bởi</div>
            <div style={{ color: C.red, fontSize: 34, fontWeight: 900 }}>THỎA MÃN</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
