import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Sentence } from "../types";
import { COLORS, FONT_STACK, SPRINGS, SAFE_ZONE } from "../design";
import { Background } from "../components/Background";

// Helper: stable pseudo-random generator from seed
function rng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// =====================================================================
// s04 — "Hãy thành thật với nhau: Index chỉ đại diện cho vốn hoá thị trường
//        một cách có trọng số."  (4.44s ≈ 134f)
// Visual: 30 weighted cubes converge into 1 INDEX box at center
// =====================================================================

export const SentenceS04: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cubes generated with stable random
  const r = rng(42);
  const cubes = Array.from({ length: 30 }, (_, i) => {
    const startX = r() * 1080;
    const startY = SAFE_ZONE.contentTop + r() * 700;
    const size = 50 + r() * 80; // weighted by mock cap
    const delay = Math.floor(r() * 30);
    return { startX, startY, size, delay, idx: i };
  });

  // Each cube: appear @ 0+delay, converge to center @ 60-110
  const centerX = 540;
  const centerY = SAFE_ZONE.contentCenterY;

  // INDEX box appears at center after collapse — spring resolve @ f100
  const boxSp = spring({ frame: frame - 100, fps, config: SPRINGS.resolve });
  const boxOp = interpolate(boxSp, [0, 1], [0, 1]);
  const boxScale = interpolate(boxSp, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill>
      <Background />

      {/* Cubes */}
      {cubes.map((c) => {
        const appear = interpolate(frame, [c.delay, c.delay + 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const conv = interpolate(frame, [60, 100], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const x = c.startX + (centerX - c.startX) * conv - c.size / 2;
        const y = c.startY + (centerY - c.startY) * conv - c.size / 2;
        const op = appear * (1 - conv * 0.6); // fade out as converging
        const scale = 1 - conv * 0.5;
        return (
          <div
            key={c.idx}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: c.size,
              height: c.size,
              background: COLORS.purple,
              opacity: op * 0.7,
              borderRadius: 8,
              transform: `scale(${scale})`,
              boxShadow: `0 0 18px rgba(167,139,250,0.5)`,
            }}
          />
        );
      })}

      {/* Center INDEX box */}
      <div
        style={{
          position: "absolute",
          left: centerX - 200,
          top: centerY - 110,
          width: 400,
          height: 220,
          borderRadius: 24,
          background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.pink} 100%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          fontFamily: FONT_STACK,
          opacity: boxOp,
          transform: `scale(${boxScale})`,
          boxShadow: `0 0 60px rgba(167,139,250,0.55), 0 18px 50px rgba(0,0,0,0.4)`,
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          VN-INDEX
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#fff",
            opacity: 0.92,
          }}
        >
          = vốn hoá có trọng số
        </div>
      </div>

      {/* Caption bottom */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1180,
          textAlign: "center",
          fontFamily: FONT_STACK,
          fontSize: 26,
          color: COLORS.textSecondary,
          letterSpacing: 1,
          opacity: boxOp,
        }}
      >
        Chỉ <b style={{ color: COLORS.gold }}>30 mã vốn hoá lớn</b> đã quyết định Index.
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s05 — "Trong khi thị trường được cấu thành từ rất nhiều cổ phiếu bên trong —
//        và sự vận động của các cổ phiếu ấy mới tạo nên thị trường thật."
// 6.74s ≈ 203f
// Visual: 300 dots fade in around the INDEX box (expand)
// =====================================================================

export const SentenceS05: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();

  const r = rng(7);
  const dots = Array.from({ length: 280 }, (_, i) => {
    const angle = r() * Math.PI * 2;
    const radius = 220 + r() * 360;
    const cx = 540 + Math.cos(angle) * radius;
    const cy = SAFE_ZONE.contentCenterY + Math.sin(angle) * radius * 0.6;
    const size = 4 + r() * 8;
    const delay = Math.floor(r() * 90);
    const isGreen = r() > 0.55;
    return { cx, cy, size, delay, isGreen, idx: i };
  });

  // INDEX box stays from previous, slight pulse
  const boxOp = interpolate(frame, [0, 30], [1, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />

      {/* Dots */}
      {dots.map((d) => {
        const op = interpolate(
          frame,
          [d.delay, d.delay + 25],
          [0, 0.65],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={d.idx}
            style={{
              position: "absolute",
              left: d.cx - d.size / 2,
              top: d.cy - d.size / 2,
              width: d.size,
              height: d.size,
              borderRadius: "50%",
              background: d.isGreen ? COLORS.green : COLORS.red,
              opacity: op,
              boxShadow: `0 0 6px ${d.isGreen ? "rgba(52,211,153,0.6)" : "rgba(248,113,113,0.6)"}`,
            }}
          />
        );
      })}

      {/* Center small INDEX box (smaller now, dimmer) */}
      <div
        style={{
          position: "absolute",
          left: 540 - 120,
          top: SAFE_ZONE.contentCenterY - 70,
          width: 240,
          height: 140,
          borderRadius: 18,
          background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.pink} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_STACK,
          fontSize: 28,
          fontWeight: 800,
          color: "#fff",
          letterSpacing: 4,
          opacity: boxOp,
          boxShadow: `0 0 60px rgba(167,139,250,0.5)`,
        }}
      >
        VN-INDEX
      </div>

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1180,
          textAlign: "center",
          fontFamily: FONT_STACK,
          fontSize: 28,
          color: COLORS.textPrimary,
          fontWeight: 700,
        }}
      >
        Thị trường thật ={" "}
        <span style={{ color: COLORS.green }}>1.500+ cổ phiếu</span>
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// s06 — "Và 3 câu hỏi sau đây giúp bạn nhìn rõ hơn sự vận động ấy."
// 3.26s ≈ 98f
// Visual: 3 empty glass cards pulse-in (stagger 8f), labelled 1/2/3
// =====================================================================

export const SentenceS06: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSp = [0, 1, 2].map((i) =>
    spring({ frame: frame - (i * 10), fps, config: SPRINGS.calm })
  );

  return (
    <AbsoluteFill>
      <Background />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 40,
          textAlign: "center",
          fontFamily: FONT_STACK,
          fontSize: 56,
          fontWeight: 800,
          color: COLORS.textPrimary,
          letterSpacing: -1,
        }}
      >
        <span style={{ color: COLORS.gold }}>3 câu hỏi</span> sau đây
        <br />
        <span style={{ fontSize: 38, color: COLORS.textSecondary, fontWeight: 600 }}>
          giúp bạn nhìn rõ hơn.
        </span>
      </div>

      {/* 3 cards center */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SAFE_ZONE.contentTop + 540,
          display: "flex",
          justifyContent: "center",
          gap: 32,
          padding: "0 80px",
        }}
      >
        {[1, 2, 3].map((n, i) => {
          const sp = cardSp[i];
          const op = interpolate(sp, [0, 1], [0, 1]);
          const ty = interpolate(sp, [0, 1], [40, 0]);
          const sc = interpolate(sp, [0, 1], [0.85, 1]);
          return (
            <div
              key={n}
              style={{
                width: 240,
                height: 320,
                borderRadius: 24,
                background: COLORS.bgPanel,
                border: `1px solid ${COLORS.borderStrong}`,
                boxShadow: `0 12px 40px rgba(0,0,0,0.45), inset 0 0 40px rgba(167,139,250,0.08)`,
                opacity: op,
                transform: `translateY(${ty}px) scale(${sc})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 18,
                fontFamily: FONT_STACK,
              }}
            >
              <div
                style={{
                  fontSize: 130,
                  fontWeight: 800,
                  lineHeight: 1,
                  color: COLORS.gold,
                  textShadow: `0 0 28px rgba(245,197,66,0.45)`,
                }}
              >
                {n}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
