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
import { Chip } from "../components/Chip";

function findEnumFrame(beats: EnumBeat[] | undefined, item: string): number | null {
  return beats?.find((b) => b.item === item)?.frame_30fps ?? null;
}

// =============================================================
// Shared 2-box layout (NỘI TẠI / THỊ TRƯỜNG)
// NỘI TẠI = PURPLE (sẽ thành CHẤT XÚC TÁC = CAN ở s14)
// THỊ TRƯỜNG = GOLD (sẽ thành PHẢN ỨNG THỊ TRƯỜNG = SLIM ở s14)
// =============================================================

const FA_ITEMS = ["Doanh thu", "Lợi nhuận", "EPS", "ROE"];
const TA_ITEMS = ["Thanh khoản", "Bảo trợ tổ chức", "Vận động nhanh", "Xu hướng tích cực"];
const TA_ITEMS_TECHNICAL = ["Volume", "MA", "Breakout", "Momentum"];

type BoxMode = "empty" | "filled-no-items" | "with-items";
type BoxSymbol = "core" | "wave" | null;

interface BoxProps {
  title: string;
  color: string;
  mode: BoxMode;
  items?: string[];
  symbol?: BoxSymbol; // visual cho mode "filled-no-items"
  emphasize?: boolean;
  dim?: boolean;
  popDelay?: number;
  poppedItemFrames?: number[];
}

// SVG "core" — concentric hexagons + center dot (cảm giác cấu trúc nội tại)
const SymbolCore: React.FC<{ color: string; pulse: number }> = ({ color, pulse }) => {
  const hex = (r: number) => {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3 - Math.PI / 2;
      pts.push(`${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`);
    }
    return pts.join(" ");
  };
  return (
    <svg width={200} height={200} viewBox="0 0 200 200" style={{ overflow: "visible" }}>
      <polygon points={hex(82)} fill="none" stroke={color} strokeWidth={2.5} opacity={0.85} />
      <polygon points={hex(58)} fill="none" stroke={color} strokeWidth={2} opacity={0.55} />
      <polygon points={hex(34)} fill={`${color}22`} stroke={color} strokeWidth={1.5} opacity={0.7} />
      <circle cx={100} cy={100} r={6 + pulse * 2} fill={color} opacity={0.9} />
      <circle cx={100} cy={100} r={14 + pulse * 6} fill="none" stroke={color} strokeWidth={1} opacity={0.4 - pulse * 0.3} />
    </svg>
  );
};

// SVG "wave" — sóng tăng dần + dots + mũi tên (cảm giác động lực thị trường)
const SymbolWave: React.FC<{ color: string; pulse: number }> = ({ color, pulse }) => (
  <svg width={200} height={200} viewBox="0 0 200 200" style={{ overflow: "visible" }}>
    {/* Backdrop wave (ghost) */}
    <path
      d="M 18 150 Q 60 110, 100 120 T 182 50"
      fill="none"
      stroke={color}
      strokeWidth={2}
      opacity={0.25}
      strokeLinecap="round"
    />
    {/* Main wave */}
    <path
      d="M 20 140 Q 60 100, 100 110 T 180 60"
      fill="none"
      stroke={color}
      strokeWidth={3.5}
      strokeLinecap="round"
    />
    {/* Volume bars under wave */}
    {[30, 60, 90, 120, 150].map((x, i) => (
      <rect
        key={i}
        x={x}
        y={170 - i * 2}
        width={6}
        height={10 + i * 4}
        rx={2}
        fill={color}
        opacity={0.4 + i * 0.08}
      />
    ))}
    {/* Sparkle dots on wave */}
    <circle cx={20} cy={140} r={4} fill={color} opacity={0.7} />
    <circle cx={100} cy={110} r={5} fill={color} opacity={0.85} />
    <circle cx={180} cy={60} r={6 + pulse * 1.5} fill={color} />
    {/* Arrow head */}
    <polygon points="180,52 168,68 192,68" fill={color} />
  </svg>
);

const Box: React.FC<BoxProps> = ({
  title,
  color,
  mode,
  items,
  symbol = null,
  emphasize,
  dim,
  popDelay = 0,
  poppedItemFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - popDelay, fps, config: SPRINGS.calm });
  const visible = frame >= popDelay;

  const isFilled = mode !== "empty";
  const opacity = visible ? (dim ? 0.32 : 1) : 0.15;
  const scale = visible ? 0.88 + 0.12 * s : 0.88;
  // Subtle ambient pulse 0..1
  const pulse = 0.5 + 0.5 * Math.sin((frame / fps) * Math.PI * 0.8);

  // "?" pulse for empty
  const qScale = 1 + 0.04 * Math.sin((frame / fps) * Math.PI * 1.2);

  // Divider line draw-in
  const divW = visible ? interpolate(frame - popDelay, [4, 18], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) : 0;
  const symScale = visible ? spring({ frame: frame - popDelay - 6, fps, config: SPRINGS.calm }) : 0;
  const titleSlide = visible ? interpolate(frame - popDelay, [0, 14], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) : 10;

  // ─── EMPTY MODE ──────────────────────────────────────────
  if (mode === "empty") {
    return (
      <div
        style={{
          flex: 1,
          height: 580,
          background: COLORS.bgPanel,
          border: `2px dashed ${COLORS.border}`,
          borderRadius: 24,
          opacity,
          transform: `scale(${scale})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 130,
            color: COLORS.textMuted,
            opacity: 0.45,
            fontWeight: 900,
            transform: `scale(${qScale})`,
          }}
        >
          ?
        </div>
      </div>
    );
  }

  // ─── FILLED-NO-ITEMS MODE — gradient border + symbol ─────
  if (mode === "filled-no-items") {
    return (
      <div
        style={{
          flex: 1,
          height: 580,
          padding: 2,
          borderRadius: 24,
          opacity,
          transform: `scale(${scale})`,
          boxShadow: emphasize
            ? `0 0 80px ${color}aa, 0 0 32px ${color}66`
            : `0 0 28px ${color}44`,
          background: `linear-gradient(135deg, ${color} 0%, ${color}55 35%, ${color}22 50%, ${color}55 65%, ${color} 100%)`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 22,
            background: `radial-gradient(circle at 50% 38%, ${color}1a 0%, ${COLORS.bgPrimary} 70%), ${COLORS.bgPanel}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 36,
            gap: 20,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color,
              letterSpacing: 4,
              textTransform: "uppercase",
              textShadow: `0 0 28px ${color}88`,
              transform: `translateY(${titleSlide}px)`,
            }}
          >
            {title}
          </div>

          {/* Divider line draw-in */}
          <div
            style={{
              height: 3,
              width: `${divW}%`,
              background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
              borderRadius: 2,
            }}
          />

          {/* Abstract symbol */}
          <div
            style={{
              marginTop: 16,
              opacity: Math.max(0, Math.min(1, symScale)),
              transform: `scale(${0.7 + 0.3 * Math.max(0, Math.min(1, symScale))})`,
              filter: `drop-shadow(0 0 20px ${color}66)`,
            }}
          >
            {symbol === "core" && <SymbolCore color={color} pulse={pulse} />}
            {symbol === "wave" && <SymbolWave color={color} pulse={pulse} />}
          </div>

          {/* Three dots indicator at bottom */}
          <div style={{ display: "flex", gap: 10, marginTop: 8, opacity: 0.6 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: color,
                  opacity: 0.4 + 0.6 * Math.abs(Math.sin((frame / fps) * Math.PI * 0.7 + i * 0.7)),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── WITH-ITEMS MODE — same gradient frame, items inside ───
  return (
    <div
      style={{
        flex: 1,
        height: 580,
        padding: 2,
        borderRadius: 24,
        opacity,
        transform: `scale(${scale})`,
        boxShadow: emphasize
          ? `0 0 80px ${color}aa, 0 0 32px ${color}66`
          : `0 0 28px ${color}44`,
        background: `linear-gradient(135deg, ${color} 0%, ${color}55 35%, ${color}22 50%, ${color}55 65%, ${color} 100%)`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 22,
          background: `radial-gradient(circle at 50% 30%, ${color}14 0%, ${COLORS.bgPrimary} 70%), ${COLORS.bgPanel}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 36,
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            color,
            letterSpacing: 3,
            textTransform: "uppercase",
            textShadow: emphasize ? `0 0 32px ${color}88` : undefined,
          }}
        >
          {title}
        </div>
        <div
          style={{
            height: 2,
            width: "70%",
            background: `linear-gradient(90deg, transparent 0%, ${color}88 50%, transparent 100%)`,
            borderRadius: 1,
            marginBottom: 6,
          }}
        />
        {items && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              width: "100%",
            }}
          >
            {items.map((it, i) => {
              const popFrame = poppedItemFrames?.[i];
              let itemOpacity = 1;
              let itemScale = 1;
              if (popFrame !== undefined) {
                if (frame < popFrame) {
                  itemOpacity = 0;
                  itemScale = 0.7;
                } else {
                  const sp = spring({ frame: frame - popFrame, fps, config: SPRINGS.decisive });
                  itemOpacity = Math.max(0, Math.min(1, sp));
                  itemScale = 0.7 + 0.3 * sp;
                }
              }
              return (
                <div
                  key={i}
                  style={{
                    background: COLORS.bgPanelHover,
                    border: `1px solid ${color}55`,
                    borderRadius: 12,
                    padding: "20px 14px",
                    textAlign: "center",
                    fontSize: 28,
                    color: COLORS.textPrimary,
                    fontWeight: 600,
                    opacity: itemOpacity,
                    transform: `scale(${itemScale})`,
                  }}
                >
                  {it}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// =============================================================
// s06 — "2 VẾ" + 2 empty boxes
// =============================================================
export const SentenceS06: React.FC<{ sentence: Sentence }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleSpring = spring({ frame, fps, config: SPRINGS.resolve });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
      <Background />
      <Stage>
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 6,
            marginBottom: 30,
            transform: `scale(${0.7 + 0.3 * titleSpring})`,
            opacity: Math.max(0, titleSpring),
            textShadow: `0 0 50px rgba(255,255,255,0.4)`,
          }}
        >
          2 VẾ
        </div>
        <div style={{ display: "flex", gap: 30, width: "100%" }}>
          <Box title="VẾ 1" color={COLORS.purple} mode="empty" />
          <Box title="VẾ 2" color={COLORS.gold} mode="empty" />
        </div>
      </Stage>
    </AbsoluteFill>
  );
};

// =============================================================
// s07 — Vế 1: NỘI TẠI fills (title only, no items list)
// =============================================================
export const SentenceS07: React.FC<{ sentence: Sentence }> = () => (
  <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
    <Background />
    <Stage>
      <div
        style={{ fontSize: 60, fontWeight: 900, color: COLORS.purple, marginBottom: 24, letterSpacing: 2 }}
      >
        VẾ 1
      </div>
      <div style={{ display: "flex", gap: 30, width: "100%" }}>
        <Box title="NỘI TẠI" color={COLORS.purple} mode="filled-no-items" symbol="core" />
        <Box title="THỊ TRƯỜNG" color={COLORS.gold} mode="empty" />
      </div>
    </Stage>
  </AbsoluteFill>
);

// =============================================================
// s08 — Vế 2: THỊ TRƯỜNG fills (title only, no items list)
// =============================================================
export const SentenceS08: React.FC<{ sentence: Sentence }> = () => (
  <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
    <Background />
    <Stage>
      <div
        style={{ fontSize: 60, fontWeight: 900, color: COLORS.gold, marginBottom: 24, letterSpacing: 2 }}
      >
        VẾ 2
      </div>
      <div style={{ display: "flex", gap: 30, width: "100%" }}>
        <Box title="NỘI TẠI" color={COLORS.purple} mode="filled-no-items" symbol="core" />
        <Box title="THỊ TRƯỜNG" color={COLORS.gold} mode="filled-no-items" symbol="wave" />
      </div>
    </Stage>
  </AbsoluteFill>
);

// =============================================================
// s09 — Candlestick + MA + Breakout triangle + Volume spike
// =============================================================
export const SentenceS09: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fade = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  // ❌ pop near end of sentence (around word "thôi")
  const wts = sentence.word_timestamps ?? [];
  const thoiWord = wts.find((w) => w.word.toLowerCase().replace(/[.,!?]/g, "") === "thôi");
  const xFrame = thoiWord ? Math.round(thoiWord.start * fps) : 150;

  // 12 candles: sideways → breakout
  const candles = [
    { o: 50, c: 52, h: 54, l: 48, v: 0.32 },
    { o: 52, c: 50, h: 54, l: 48, v: 0.29 },
    { o: 50, c: 51, h: 53, l: 48, v: 0.34 },
    { o: 51, c: 53, h: 54, l: 50, v: 0.32 },
    { o: 53, c: 52, h: 54, l: 50, v: 0.26 },
    { o: 52, c: 50, h: 53, l: 49, v: 0.29 },
    { o: 50, c: 52, h: 53, l: 49, v: 0.32 },
    { o: 52, c: 53, h: 54, l: 51, v: 0.37 },
    { o: 53, c: 52, h: 54, l: 50, v: 0.26 },
    { o: 52, c: 65, h: 68, l: 52, v: 1.0 }, // BREAKOUT
    { o: 65, c: 68, h: 70, l: 64, v: 0.79 },
    { o: 68, c: 72, h: 74, l: 67, v: 0.63 },
  ];
  const breakoutIdx = 9;

  // MA(5) values
  const maValues = [51, 51, 51, 51.4, 52, 52.2, 51.8, 51.6, 52, 55, 60, 64];

  // Layout
  const W = 880;
  const Hchart = 320;
  const Hvol = 100;
  const padX = 30;
  const candleW = (W - padX * 2) / candles.length - 6;
  const gap = 6;
  const minP = 45;
  const maxP = 75;
  const priceY = (p: number) => Hchart - ((p - minP) / (maxP - minP)) * (Hchart - 30) - 10;
  const candleX = (i: number) => padX + i * (candleW + gap);

  // Reveal candles progressively
  const revealEnd = 90;
  const candleVisible = (i: number) =>
    interpolate(frame, [(i / candles.length) * revealEnd, ((i + 1) / candles.length) * revealEnd], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  // MA reveal stroke-dasharray
  const maPathLen = 800;
  const maOffset = interpolate(frame, [40, 110], [maPathLen, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Triangle marker pop at breakout candle
  const triFrame = revealEnd + 6; // around when breakout candle reveals
  const triSpring = spring({ frame: frame - triFrame, fps, config: SPRINGS.heavy });

  // Resistance line at price 54
  const resY = priceY(54);

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK, opacity: fade }}>
      <Background />
      <Stage>
        <div style={{ position: "relative" }}>
          <svg width={W} height={Hchart + Hvol + 40} style={{ overflow: "visible" }}>
            {/* Background panel */}
            <rect width={W} height={Hchart} rx={20} fill={COLORS.bgPanel} stroke={COLORS.border} />

            {/* Resistance line */}
            <line
              x1={padX}
              y1={resY}
              x2={W - padX}
              y2={resY}
              stroke={COLORS.red}
              strokeWidth={2}
              strokeDasharray="6 6"
              opacity={0.7}
            />
            <text x={W - padX - 110} y={resY - 8} fill={COLORS.red} fontSize={20} fontWeight={700}>
              KHÁNG CỰ
            </text>

            {/* Candles */}
            {candles.map((c, i) => {
              const op = candleVisible(i);
              if (op === 0) return null;
              const isBull = c.c >= c.o;
              const color = isBull ? COLORS.green : COLORS.red;
              const x = candleX(i);
              const yHigh = priceY(c.h);
              const yLow = priceY(c.l);
              const yOpen = priceY(c.o);
              const yClose = priceY(c.c);
              const bodyTop = Math.min(yOpen, yClose);
              const bodyH = Math.max(2, Math.abs(yClose - yOpen));
              return (
                <g key={i} opacity={op}>
                  {/* Wick */}
                  <line x1={x + candleW / 2} y1={yHigh} x2={x + candleW / 2} y2={yLow} stroke={color} strokeWidth={2} />
                  {/* Body */}
                  <rect x={x} y={bodyTop} width={candleW} height={bodyH} fill={color} rx={2} />
                </g>
              );
            })}

            {/* MA line */}
            <path
              d={maValues
                .map((v, i) => {
                  const x = candleX(i) + candleW / 2;
                  const y = priceY(v);
                  return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
                })
                .join(" ")}
              fill="none"
              stroke={COLORS.purple}
              strokeWidth={3}
              strokeDasharray={maPathLen}
              strokeDashoffset={maOffset}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x={padX} y={28} fill={COLORS.purple} fontSize={20} fontWeight={700}>
              MA(5)
            </text>

            {/* Breakout triangle marker */}
            {frame >= triFrame && (
              <g
                opacity={Math.max(0, Math.min(1, triSpring))}
                transform={`translate(${candleX(breakoutIdx) + candleW / 2}, ${priceY(candles[breakoutIdx].c) - 30}) scale(${0.5 + 0.5 * triSpring})`}
              >
                <polygon points="0,-18 -16,8 16,8" fill={COLORS.gold} stroke={COLORS.gold} strokeWidth={2} />
                <text textAnchor="middle" y={-26} fill={COLORS.gold} fontSize={20} fontWeight={800}>
                  BREAK
                </text>
              </g>
            )}

            {/* Volume bars */}
            <g transform={`translate(0, ${Hchart + 30})`}>
              <text x={padX} y={20} fill={COLORS.textMuted} fontSize={18} fontWeight={700}>
                VOLUME
              </text>
              {candles.map((c, i) => {
                const op = candleVisible(i);
                const isBreakout = i === breakoutIdx;
                const x = candleX(i);
                const h = c.v * (Hvol - 30);
                const color = isBreakout ? COLORS.gold : c.c >= c.o ? `${COLORS.green}99` : `${COLORS.red}99`;
                return (
                  <g key={i} opacity={op}>
                    <rect
                      x={x}
                      y={Hvol - h}
                      width={candleW}
                      height={h}
                      fill={color}
                      rx={2}
                    />
                    {isBreakout && frame >= triFrame && (
                      <text
                        x={x + candleW / 2}
                        y={Hvol - h - 8}
                        textAnchor="middle"
                        fill={COLORS.gold}
                        fontSize={18}
                        fontWeight={800}
                        opacity={Math.max(0, Math.min(1, triSpring))}
                      >
                        ↑ ĐỘT BIẾN
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* ❌ overlay */}
          {frame >= xFrame && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 220,
                  color: COLORS.red,
                  textShadow: `0 0 40px ${COLORS.red}99`,
                  fontWeight: 900,
                  opacity: interpolate(frame, [xFrame, xFrame + 14], [0, 1], { extrapolateRight: "clamp" }),
                  transform: `scale(${0.6 + 0.4 * Math.min(1, (frame - xFrame) / 14)})`,
                }}
              >
                ✕
              </div>
            </div>
          )}
        </div>

        {frame >= xFrame && (
          <div
            style={{
              marginTop: 24,
              fontSize: 64,
              fontWeight: 900,
              color: COLORS.red,
              opacity: interpolate(frame, [xFrame, xFrame + 14], [0, 1], { extrapolateRight: "clamp" }),
              textShadow: `0 0 40px ${COLORS.red}99`,
              letterSpacing: 4,
            }}
          >
            CHƯA ĐỦ
          </div>
        )}
      </Stage>
    </AbsoluteFill>
  );
};

// =============================================================
// s10 — bar chart 2-series, doanh thu/lợi nhuận pop at enum
// =============================================================
export const SentenceS10: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const fadeBg = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const dtFrame = findEnumFrame(sentence.enum_beats, "doanh thu") ?? 38;
  const lnFrame = findEnumFrame(sentence.enum_beats, "lợi nhuận") ?? 53;

  const bars = [
    { label: "Q1", revenue: 0.4, profit: 0.3 },
    { label: "Q2", revenue: 0.5, profit: 0.4 },
    { label: "Q3", revenue: 0.65, profit: 0.5 },
    { label: "Q4", revenue: 0.8, profit: 0.65 },
    { label: "Year", revenue: 0.95, profit: 0.78 },
  ];

  const dtScale = (i: number) => {
    const delay = dtFrame + i * 4;
    return interpolate(frame, [delay, delay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  };
  const lnScale = (i: number) => {
    const delay = lnFrame + i * 4;
    return interpolate(frame, [delay, delay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  };

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK, opacity: fadeBg }}>
      <Background />
      <Stage>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 50,
            height: 600,
            padding: 30,
            background: COLORS.bgPanel,
            borderRadius: 24,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          {bars.map((b, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 480 }}>
                <div
                  style={{
                    width: 50,
                    height: `${b.revenue * 100 * dtScale(i)}%`,
                    background: `linear-gradient(180deg, ${COLORS.gold}, ${COLORS.gold}aa)`,
                    borderRadius: 6,
                  }}
                />
                <div
                  style={{
                    width: 50,
                    height: `${b.profit * 100 * lnScale(i)}%`,
                    background: `linear-gradient(180deg, ${COLORS.green}, ${COLORS.green}aa)`,
                    borderRadius: 6,
                  }}
                />
              </div>
              <div style={{ fontSize: 24, color: COLORS.textSecondary, fontWeight: 700 }}>{b.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 30 }}>
          <Legend color={COLORS.gold} label="Doanh thu" pop={frame >= dtFrame} />
          <Legend color={COLORS.green} label="Lợi nhuận" pop={frame >= lnFrame} />
        </div>
      </Stage>
    </AbsoluteFill>
  );
};

const Legend: React.FC<{ color: string; label: string; pop: boolean }> = ({ color, label, pop }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 20px",
      borderRadius: 12,
      background: pop ? `${color}22` : "transparent",
      border: pop ? `2px solid ${color}` : "2px solid transparent",
    }}
  >
    <div style={{ width: 20, height: 20, background: color, borderRadius: 4 }} />
    <div style={{ fontSize: 30, fontWeight: 700, color: pop ? color : COLORS.textSecondary }}>{label}</div>
  </div>
);

// =============================================================
// s11 — 3 chips (FA quality)
// =============================================================
export const SentenceS11: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const f1 = findEnumFrame(sentence.enum_beats, "vốn hiệu quả") ?? 26;
  const f2 = findEnumFrame(sentence.enum_beats, "dư địa") ?? 67;
  const f3 = findEnumFrame(sentence.enum_beats, "tiềm năng") ?? 94;

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
      <Background />
      <Stage>
        <div style={{ display: "flex", flexDirection: "column", gap: 30, width: 800 }}>
          <Chip popAtFrame={f1} icon={"✓"} color={COLORS.green} fontSize={42} height={120}>
            Vốn hiệu quả
          </Chip>
          <Chip popAtFrame={f2} icon={"✓"} color={COLORS.green} fontSize={42} height={120}>
            Dư địa rộng
          </Chip>
          <Chip popAtFrame={f3} icon={"✓"} color={COLORS.green} fontSize={42} height={120}>
            Tiềm năng tương lai
          </Chip>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};

// =============================================================
// s12 — callback to vế 2 (THỊ TRƯỜNG = gold glow)
// =============================================================
export const SentenceS12: React.FC<{ sentence: Sentence }> = () => (
  <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
    <Background />
    <Stage>
      <div
        style={{ fontSize: 50, fontWeight: 900, color: COLORS.gold, marginBottom: 24, letterSpacing: 2 }}
      >
        ↪ VẾ 2
      </div>
      <div style={{ display: "flex", gap: 30, width: "100%" }}>
        <Box title="NỘI TẠI" color={COLORS.purple} mode="filled-no-items" symbol="core" dim />
        <Box title="THỊ TRƯỜNG" color={COLORS.gold} mode="filled-no-items" symbol="wave" emphasize />
      </div>
    </Stage>
  </AbsoluteFill>
);

// =============================================================
// s13 — 4 dấu hiệu trong THỊ TRƯỜNG box (only place items list shown)
// =============================================================
export const SentenceS13: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const f1 = findEnumFrame(sentence.enum_beats, "thanh khoản") ?? 69;
  const f2 = findEnumFrame(sentence.enum_beats, "bảo trợ tổ chức") ?? 103;
  const f3 = findEnumFrame(sentence.enum_beats, "vận động nhanh") ?? 159;
  const f4 = findEnumFrame(sentence.enum_beats, "xu hướng tích cực") ?? 198;
  const popFrames = [f1, f2, f3, f4];

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
      <Background />
      <Stage>
        <div
          style={{ fontSize: 50, fontWeight: 900, color: COLORS.gold, marginBottom: 24, letterSpacing: 2 }}
        >
          4 DẤU HIỆU THỊ TRƯỜNG
        </div>
        <div style={{ display: "flex", gap: 30, width: "100%" }}>
          <Box title="NỘI TẠI" color={COLORS.purple} mode="filled-no-items" symbol="core" dim />
          <Box
            title="THỊ TRƯỜNG"
            color={COLORS.gold}
            mode="with-items"
            items={TA_ITEMS}
            emphasize
            poppedItemFrames={popFrames}
          />
        </div>
      </Stage>
    </AbsoluteFill>
  );
};

// =============================================================
// s14 — REVEAL: 2 vế converge → chemical reaction → 7 letter cards
// CAN (3 purple, CHẤT XÚC TÁC) + SLIM (4 gold, PHẢN ỨNG THỊ TRƯỜNG)
// =============================================================
export const SentenceS14: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wts = sentence.word_timestamps ?? [];
  const canslimWord = wts.find((w) =>
    w.word.toLowerCase().replace(/[.,!?]/g, "").startsWith("canslim"),
  );
  const revealFrame = canslimWord ? Math.round(canslimWord.start * fps) : 110;

  const oneilWord = wts.find((w) => {
    const n = w.word.toLowerCase().replace(/[.,!?]/g, "");
    return n.startsWith("quyl") || n.startsWith("uyl") || n.startsWith("william");
  });
  const portraitFrame = oneilWord ? Math.round(oneilWord.start * fps) : revealFrame + 60;

  // Phase timeline (relative to revealFrame=R):
  //   pre-merge:    0 .. R-30        boxes drift
  //   collision:    R-30 .. R+5      collide, particle burst
  //   spawn cards:  R+5 .. R+20      7 cards "?" appear
  //   labels:       R+20 .. R+35     "CHẤT XÚC TÁC" / "PHẢN ỨNG THỊ TRƯỜNG"
  //   flip letters: R+35 .. R+60     cards flip CAN | SLIM
  //   CANSLIM:      R+60+ giant text
  //   portrait:     portraitFrame    O'Neil

  const mergeStart = Math.max(0, revealFrame - 30);
  const mergeProgress = interpolate(frame, [mergeStart, revealFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardsStartFrame = revealFrame + 5;
  const labelStartFrame = revealFrame + 20;
  const flipStartFrame = revealFrame + 35;
  const canslimGiantFrame = revealFrame + 65;

  const CAN_LETTERS = ["C", "A", "N"];
  const SLIM_LETTERS = ["S", "L", "I", "M"];

  // Card width for visibility
  const cardW = 100;
  const cardH = 130;

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
      <Background />
      <Stage>
        {/* Pre-merge: 2 boxes drifting */}
        {frame < revealFrame + 5 && (
          <div
            style={{
              display: "flex",
              gap: 30 - mergeProgress * 30,
              width: "100%",
              transform: `scale(${1 - mergeProgress * 0.2})`,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 360,
                background: COLORS.bgPanel,
                border: `2px solid ${COLORS.purple}`,
                borderRadius: 24,
                opacity: 1 - mergeProgress * 0.4,
                transform: `translateX(${mergeProgress * 120}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 56,
                fontWeight: 900,
                color: COLORS.purple,
                letterSpacing: 3,
                boxShadow: `0 0 ${20 + 60 * mergeProgress}px ${COLORS.purple}88`,
              }}
            >
              NỘI TẠI
            </div>
            <div
              style={{
                flex: 1,
                height: 360,
                background: COLORS.bgPanel,
                border: `2px solid ${COLORS.gold}`,
                borderRadius: 24,
                opacity: 1 - mergeProgress * 0.4,
                transform: `translateX(${-mergeProgress * 120}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 56,
                fontWeight: 900,
                color: COLORS.gold,
                letterSpacing: 3,
                boxShadow: `0 0 ${20 + 60 * mergeProgress}px ${COLORS.gold}88`,
              }}
            >
              THỊ TRƯỜNG
            </div>
          </div>
        )}

        {/* Particle burst at collision */}
        {frame >= revealFrame - 5 && frame <= revealFrame + 30 && (
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * Math.PI * 2) / 24;
              const t = Math.max(0, (frame - revealFrame + 5) / 25);
              const dist = 350 * t;
              const c = i % 2 === 0 ? COLORS.purple : COLORS.gold;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 14,
                    height: 14,
                    borderRadius: 7,
                    background: c,
                    left: 540 + Math.cos(angle) * dist,
                    top: 540 + Math.sin(angle) * dist,
                    opacity: Math.max(0, 1 - t),
                    boxShadow: `0 0 16px ${c}`,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* 7 letter cards */}
        {frame >= cardsStartFrame && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {/* CAN side (3 purple) */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  {CAN_LETTERS.map((L, i) => (
                    <LetterCard
                      key={i}
                      letter={L}
                      color={COLORS.purple}
                      spawnFrame={cardsStartFrame + i * 3}
                      flipFrame={flipStartFrame + i * 4}
                      currentFrame={frame}
                      cardW={cardW}
                      cardH={cardH}
                      stripe="purple"
                    />
                  ))}
                </div>
                {frame >= labelStartFrame && (
                  <PillLabel color={COLORS.purple} fadeFrame={labelStartFrame} currentFrame={frame}>
                    CHẤT XÚC TÁC
                  </PillLabel>
                )}
              </div>

              {/* Plus reaction symbol */}
              {frame >= cardsStartFrame + 8 && (
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 900,
                    color: "#ffffff",
                    opacity: interpolate(
                      frame,
                      [cardsStartFrame + 8, cardsStartFrame + 16],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                    ),
                  }}
                >
                  ⚡
                </div>
              )}

              {/* SLIM side (4 gold) */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  {SLIM_LETTERS.map((L, i) => (
                    <LetterCard
                      key={i}
                      letter={L}
                      color={COLORS.gold}
                      spawnFrame={cardsStartFrame + 12 + i * 3}
                      flipFrame={flipStartFrame + 12 + i * 4}
                      currentFrame={frame}
                      cardW={cardW}
                      cardH={cardH}
                      stripe="gold"
                    />
                  ))}
                </div>
                {frame >= labelStartFrame && (
                  <PillLabel color={COLORS.gold} fadeFrame={labelStartFrame + 5} currentFrame={frame}>
                    PHẢN ỨNG THỊ TRƯỜNG
                  </PillLabel>
                )}
              </div>
            </div>

            {/* CANSLIM giant text appears after reveal */}
            {frame >= canslimGiantFrame && (
              <CanslimGiant frame={frame - canslimGiantFrame} fps={fps} />
            )}

            {/* O'Neil portrait */}
            {frame >= portraitFrame && <ONeilPortrait frame={frame - portraitFrame} fps={fps} />}
          </div>
        )}
      </Stage>
    </AbsoluteFill>
  );
};

const LetterCard: React.FC<{
  letter: string;
  color: string;
  spawnFrame: number;
  flipFrame: number;
  currentFrame: number;
  cardW: number;
  cardH: number;
  stripe: "purple" | "gold";
}> = ({ letter, color, spawnFrame, flipFrame, currentFrame, cardW, cardH, stripe }) => {
  if (currentFrame < spawnFrame) return <div style={{ width: cardW, height: cardH }} />;

  const spawnT = Math.min(1, (currentFrame - spawnFrame) / 12);
  const flipT = Math.max(0, Math.min(1, (currentFrame - flipFrame) / 12));
  const flipped = flipT > 0.5;

  // Hatched stripe pattern
  const stripeBase = stripe === "purple" ? "#3a2670" : "#5a4318";

  return (
    <div
      style={{
        width: cardW,
        height: cardH,
        borderRadius: 14,
        border: `2px dashed ${color}`,
        background: !flipped
          ? `repeating-linear-gradient(45deg, ${stripeBase}, ${stripeBase} 8px, ${stripeBase}cc 8px, ${stripeBase}cc 16px)`
          : color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: flipped ? 90 : 78,
        fontWeight: 900,
        color: flipped ? "#0a2418" : color,
        opacity: spawnT,
        transform: `scale(${0.6 + 0.4 * spawnT}) rotateY(${flipT < 0.5 ? flipT * 180 : (1 - flipT) * 180}deg)`,
        boxShadow: `0 0 ${flipped ? 30 : 12}px ${color}99`,
        transition: "background 100ms",
      }}
    >
      {flipped ? letter : "?"}
    </div>
  );
};

const PillLabel: React.FC<{
  color: string;
  fadeFrame: number;
  currentFrame: number;
  children: React.ReactNode;
}> = ({ color, fadeFrame, currentFrame, children }) => {
  const op = interpolate(currentFrame, [fadeFrame, fadeFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        padding: "10px 24px",
        borderRadius: 30,
        border: `2px solid ${color}`,
        background: `${color}22`,
        color,
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: 2,
        opacity: op,
      }}
    >
      {children}
    </div>
  );
};

const CanslimGiant: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const s = spring({ frame, fps, config: SPRINGS.decisive });
  const scale = interpolate(s, [0, 1], [1.5, 1.0]);
  return (
    <div
      style={{
        marginTop: 30,
        fontSize: 130,
        fontWeight: 900,
        letterSpacing: 8,
        opacity: Math.max(0, Math.min(1, s)),
        transform: `scale(${scale})`,
        display: "flex",
        gap: 4,
      }}
    >
      <span
        style={{
          color: COLORS.purple,
          textShadow: `0 0 40px ${COLORS.purple}aa`,
        }}
      >
        CAN
      </span>
      <span
        style={{
          color: COLORS.gold,
          textShadow: `0 0 40px ${COLORS.gold}aa`,
        }}
      >
        SLIM
      </span>
    </div>
  );
};

const ONeilPortrait: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const s = spring({ frame, fps, config: SPRINGS.calm });
  return (
    <div
      style={{
        marginTop: 16,
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity: Math.max(0, Math.min(1, s)),
        transform: `translateY(${(1 - s) * 20}px)`,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.gold}aa)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
        }}
      >
        👤
      </div>
      <div>
        <div style={{ color: COLORS.gold, fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
          SÁNG LẬP
        </div>
        <div style={{ color: COLORS.textPrimary, fontSize: 30, fontWeight: 800 }}>William O'Neil</div>
      </div>
    </div>
  );
};

// =============================================================
// s15 — 3 step flow + "AN TOÀN CHO NGƯỜI MỚI" badge
// =============================================================
export const SentenceS15: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f1 = findEnumFrame(sentence.enum_beats, "tìm cổ phiếu") ?? 61;
  const f2 = findEnumFrame(sentence.enum_beats, "theo dõi") ?? 99;
  const f3 = findEnumFrame(sentence.enum_beats, "hành động") ?? 130;
  const badgeFrame = f3 + 30;
  const badgeSpring = spring({ frame: frame - badgeFrame, fps, config: SPRINGS.soft });

  const Step: React.FC<{ icon: string; label: string; popAt: number; color: string }> = ({
    icon,
    label,
    popAt,
    color,
  }) => {
    const s = spring({ frame: frame - popAt, fps, config: SPRINGS.decisive });
    if (frame < popAt) return <div style={{ width: 220 }} />;
    return (
      <div
        style={{
          width: 220,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          opacity: Math.max(0, Math.min(1, s)),
          transform: `scale(${0.7 + 0.3 * s})`,
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: 65,
            background: COLORS.bgPanel,
            border: `3px solid ${color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 70,
            boxShadow: `0 0 30px ${color}55`,
          }}
        >
          {icon}
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, color, letterSpacing: 2, textAlign: "center" }}>
          {label}
        </div>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
      <Background />
      <Stage>
        <div style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 60 }}>
          <Step icon="🔍" label="TÌM" popAt={f1} color={COLORS.purple} />
          <div style={{ fontSize: 60, color: frame >= f2 ? COLORS.gold : COLORS.textMuted }}>→</div>
          <Step icon="👁" label="THEO DÕI" popAt={f2} color={COLORS.gold} />
          <div style={{ fontSize: 60, color: frame >= f3 ? COLORS.green : COLORS.textMuted }}>→</div>
          <Step icon="⚡" label="HÀNH ĐỘNG" popAt={f3} color={COLORS.green} />
        </div>

        {frame >= badgeFrame && (
          <div
            style={{
              padding: "24px 48px",
              borderRadius: 60,
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.gold}aa)`,
              color: "#0a2418",
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: 3,
              opacity: Math.max(0, Math.min(1, badgeSpring)),
              transform: `scale(${0.7 + 0.3 * badgeSpring})`,
              boxShadow: `0 0 40px ${COLORS.gold}88`,
            }}
          >
            ✓ AN TOÀN CHO NGƯỜI MỚI
          </div>
        )}
      </Stage>
    </AbsoluteFill>
  );
};
