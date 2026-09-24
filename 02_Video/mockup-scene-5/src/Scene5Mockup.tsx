import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Img, Video, Composition } from 'remotion';
import { staticFile } from 'remotion';

const Scene5MockupComponent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide up phone animation
  const phoneY = spring({
    frame,
    fps,
    config: { damping: 12 },
    from: 1000,
    to: 0,
  });

  // Glowing logo animation
  const logoOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });
  const logoScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14 },
    from: 0.5,
    to: 1,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0221', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Background ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(123,58,236,0.4) 0%, rgba(13,2,33,0) 70%)',
          top: '10%',
          opacity: logoOpacity
        }}
      />

      {/* KFSP Logo (text placeholder) */}
      <div
        style={{
          position: 'absolute',
          top: 250,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          fontSize: 160,
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 0 20px #7B3AEC, 0 0 60px #7B3AEC',
          fontFamily: 'sans-serif'
        }}
      >
        KFSP
      </div>

      {/* Phone Mockup Area - Aspect ratio strictly matches 879x1832 */}
      <div style={{ position: 'absolute', bottom: 150, width: 720, height: 1500, transform: `translateY(${phoneY}px)`, display: 'flex' }}>
        
        {/* Screen mask layer calculated exactly from the PNG transparent area */}
        {/* Scale factor: 1500 / 1832 = 0.81877 */}
        {/* Screen size: 803x1747 * 0.81877 = 657.5 x 1430.4 */}
        {/* Offset: x=38, y=42 * 0.81877 = 31.1 x 34.4 */}
        <div style={{ position: 'absolute', left: 31.1, top: 34.4, width: 657.5, height: 1430.4, borderRadius: 75.6, overflow: 'hidden', backgroundColor: '#050505', zIndex: 1 }}>
           <Video 
             src={staticFile("rec_h264.mp4")} 
             style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
             muted 
           />
        </div>

        {/* Asset PNG viền điện thoại thật từ _shared */}
        <Img 
          src={staticFile('iphone.png')} 
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'fill', zIndex: 2, pointerEvents: 'none' }} 
        />
      </div>

      {/* Footer text */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          fontSize: 50,
          color: '#fff',
          fontFamily: 'sans-serif',
          opacity: logoOpacity,
          letterSpacing: 3
        }}
      >
        Đưa chứng khoán về tầm tay bạn
      </div>

    </AbsoluteFill>
  );
};

export const Scene5Composition: React.FC = () => {
  return (
    <Composition
      id="Scene5Mockup"
      component={Scene5MockupComponent}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
