import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { Sentence, EnumBeat } from "../types";
import { COLORS, SPRINGS, FONT_STACK } from "../design";
import { Background } from "../components/Background";
import { Stage } from "../components/Stage";
import { MiniChart } from "../components/MiniChart";

function findEnumFrame(beats: EnumBeat[] | undefined, item: string): number | null {
  return beats?.find((b) => b.item === item)?.frame_30fps ?? null;
}

// =============================================================
// s01 — split screen + lãi badges
// =============================================================
export const SentenceS01: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fade = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const f145 = findEnumFrame(sentence.enum_beats, "chục %") ?? 145;
  const f188 = findEnumFrame(sentence.enum_beats, "bằng lần") ?? 188;

  // Flatline data (jittered around 0.5)
  const flatData = [0.50, 0.51, 0.49, 0.52, 0.50, 0.48, 0.51, 0.50, 0.49, 0.51, 0.50];
  // Rocket data (rising)
  const rocketData = [0.15, 0.18, 0.22, 0.30, 0.40, 0.52, 0.65, 0.78, 0.88, 0.94, 0.98];

  // Badges: 4 pop times leading to "chục %" at f145, "bằng lần" at f188
  const badges = [
    { label: "+10%", frame: 60 },
    { label: "+20%", frame: 100 },
    { label: "+50%", frame: f145 },
    { label: "+100%", frame: f188 },
  ];

  return (
    <AbsoluteFill style={{ opacity: fade, fontFamily: FONT_STACK }}>
      <Background />
      <Stage>
        <div style={{ display: "flex", gap: 32, width: "100%" }}>
          {/* Left: flatline */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div
              style={{
                color: COLORS.textMuted,
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Mình
            </div>
            <MiniChart width={440} height={300} data={flatData} stroke="#94a3b8" fill="#94a3b8" />
            <div
              style={{
                color: COLORS.red,
                fontSize: 28,
                fontWeight: 700,
                marginTop: 6,
              }}
            >
              ⏸ đứng im
            </div>
          </div>

          {/* Right: rocket */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, position: "relative" }}>
            <div
              style={{
                color: COLORS.green,
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Cổ phiếu khác
            </div>
            <div style={{ position: "relative" }}>
              <MiniChart width={440} height={300} data={rocketData} stroke={COLORS.green} fill={COLORS.green} />
              {/* Badges floating above chart */}
              {badges.map((b, i) => {
                const s = spring({ frame: frame - b.frame, fps, config: SPRINGS.decisive });
                if (frame < b.frame) return null;
                const opacity = Math.max(0, Math.min(1, s));
                const scale = 0.6 + 0.4 * s;
                // Position: distribute along the rising curve
                const left = 80 + i * 90;
                const top = 230 - i * 50;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left,
                      top,
                      padding: "8px 14px",
                      borderRadius: 10,
                      background: COLORS.green,
                      color: "#0a1628",
                      fontWeight: 800,
                      fontSize: 28,
                      opacity,
                      transform: `scale(${scale})`,
                      boxShadow: `0 4px 16px ${COLORS.green}66`,
                    }}
                  >
                    {b.label}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                color: COLORS.green,
                fontSize: 28,
                fontWeight: 700,
                marginTop: 6,
              }}
            >
              🚀 tăng ầm ầm
            </div>
          </div>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};

// =============================================================
// s02 — emoji + reaction + FA twist
// =============================================================
export const SentenceS02: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fade = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // "mà" word position — pivot to twist
  const wts = sentence.word_timestamps ?? [];
  const maWord = wts.find((w) => w.word.toLowerCase().replace(/[.,!?]/g, "") === "mà");
  const twistFrame = maWord ? Math.round(maWord.start * fps) : 72;

  const reactionScale = spring({ frame, fps, config: SPRINGS.heavy });
  const twistSpring = spring({ frame: frame - twistFrame, fps, config: SPRINGS.decisive });

  return (
    <AbsoluteFill style={{ opacity: fade, fontFamily: FONT_STACK }}>
      <Background />
      <Stage>
        {/* Top: reaction emoji + text */}
        <div
          style={{
            transform: `scale(${0.7 + 0.3 * reactionScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginBottom: 60,
          }}
        >
          <div style={{ fontSize: 220 }}>🙄</div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: COLORS.red,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            "không khó chịu?"
          </div>
        </div>

        {/* Twist: FA Score badge + flatline mini callback */}
        {frame >= twistFrame && (
          <div
            style={{
              opacity: Math.max(0, Math.min(1, twistSpring)),
              transform: `scale(${0.6 + 0.4 * twistSpring})`,
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "20px 32px",
              borderRadius: 20,
              background: COLORS.bgPanel,
              border: `2px solid ${COLORS.green}`,
              boxShadow: `0 0 40px ${COLORS.green}55`,
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                background: `radial-gradient(${COLORS.green}, ${COLORS.green}aa)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0a1628",
                fontSize: 36,
                fontWeight: 800,
              }}
            >
              9/10
            </div>
            <div>
              <div style={{ color: COLORS.green, fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
                FA SCORE
              </div>
              <div style={{ color: COLORS.textPrimary, fontSize: 36, fontWeight: 700 }}>
                Tài chính đẹp ✓
              </div>
            </div>
          </div>
        )}
      </Stage>
    </AbsoluteFill>
  );
};

// =============================================================
// s03 — question marks + "CỔ PHIẾU TỐT = ?"
// =============================================================
export const SentenceS03: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const heavy = spring({ frame, fps, config: SPRINGS.heavy });
  const pulse = 1 + 0.05 * Math.sin((frame / fps) * Math.PI * 2);

  // Floating question marks
  const qmarks = Array.from({ length: 8 }).map((_, i) => {
    const seed = (i * 37) % 100;
    const x = 50 + (i * 130) % 900;
    const y = 200 + ((seed * 7) % 600);
    const delay = i * 4;
    const s = spring({ frame: frame - delay, fps, config: SPRINGS.heavy });
    return { x, y, scale: s, key: i };
  });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
      <Background />
      {/* Floating ? */}
      {qmarks.map((q) => (
        <div
          key={q.key}
          style={{
            position: "absolute",
            left: q.x,
            top: q.y,
            fontSize: 90,
            color: COLORS.red,
            opacity: 0.35 * Math.max(0, q.scale),
            transform: `scale(${q.scale})`,
            fontWeight: 800,
          }}
        >
          ?
        </div>
      ))}
      <Stage>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            transform: `scale(${0.8 + 0.2 * heavy})`,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: COLORS.gold,
              letterSpacing: 4,
              textAlign: "center",
              textShadow: `0 0 40px ${COLORS.gold}55`,
            }}
          >
            CỔ PHIẾU TỐT
          </div>
          <div
            style={{
              fontSize: 180,
              fontWeight: 900,
              color: COLORS.red,
              transform: `scale(${pulse})`,
              textShadow: `0 0 60px ${COLORS.red}66`,
            }}
          >
            = ?
          </div>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};

// =============================================================
// s04 — confused silhouette
// =============================================================
export const SentenceS04: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fade = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const tint = interpolate(frame, [0, 60], [0, 0.5], { extrapolateRight: "clamp" });

  // Jittery question marks orbiting head
  const orbit = (i: number) => {
    const angle = (frame / fps) * 2 + i * (Math.PI / 3);
    const r = 180;
    return {
      x: 540 + Math.cos(angle) * r,
      y: 540 + Math.sin(angle) * r * 0.6,
      delay: i * 5,
    };
  };

  return (
    <AbsoluteFill style={{ opacity: fade, fontFamily: FONT_STACK }}>
      <Background tint={tint} />
      <Stage>
        {/* Silhouette */}
        <svg width={300} height={500} viewBox="0 0 300 500" style={{ marginTop: 60 }}>
          <circle cx={150} cy={120} r={70} fill={COLORS.textSecondary} />
          <path
            d="M 60 480 Q 60 260 150 220 Q 240 260 240 480 Z"
            fill={COLORS.textSecondary}
          />
        </svg>
        {/* Orbiting ? */}
        {Array.from({ length: 6 }).map((_, i) => {
          const o = orbit(i);
          const s = spring({ frame: frame - o.delay, fps, config: SPRINGS.calm });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: o.x,
                top: o.y,
                fontSize: 64,
                fontWeight: 900,
                color: COLORS.red,
                opacity: 0.7 * Math.max(0, s),
                transform: `translate(-50%, -50%) scale(${s})`,
              }}
            >
              ?
            </div>
          );
        })}
      </Stage>
    </AbsoluteFill>
  );
};

// =============================================================
// s05 — arrow + "XEM TỚI CUỐI" + clock
// =============================================================
export const SentenceS05: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const arrowSpring = spring({ frame, fps, config: SPRINGS.decisive });
  const bgBrighten = interpolate(frame, [0, 30], [0.5, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
      <Background tint={bgBrighten} />
      <Stage>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            opacity: Math.max(0, Math.min(1, arrowSpring)),
            transform: `translateX(${(1 - arrowSpring) * -100}px)`,
          }}
        >
          {/* White clock SVG (forced color, not emoji) */}
          <svg width={140} height={140} viewBox="0 0 24 24" fill="none">
            <circle cx={12} cy={12} r={9} stroke="#fff" strokeWidth={2} />
            <path d="M12 7v5l3.5 2" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 2.5h6" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
            <path d="M5.5 4l1.5 1.5M18.5 4l-1.5 1.5" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
          </svg>
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 3,
              textShadow: `0 0 30px rgba(255,255,255,0.5)`,
            }}
          >
            XEM TỚI CUỐI
          </div>
          <div style={{ fontSize: 100, color: "#ffffff" }}>→</div>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
