import {
  AbsoluteFill, Audio, Img, staticFile,
  useCurrentFrame, useVideoConfig, interpolate, spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/BeVietnamPro";
import { COLORS, SAFE_ZONE } from "./design";
import data from "./data.json";

const { fontFamily: FF } = loadFont("normal", { weights: ["500", "600", "700", "800"] });
const fps = 30;
const F = (sec: number) => Math.round(sec * fps);
const GREEN = COLORS.green, RED = COLORS.red, GOLD = COLORS.gold, PUR = "#7B3AEC", TITLEC = "#AA75FF", DIM = "#9fb0cc";

const sentStart: Record<string, number> = Object.fromEntries(data.sentences.map((s: any) => [s.id, s.start]));
const ss = (id: string) => sentStart[id] ?? 0;
const clampSpring = (frame: number, delay: number, cfg: any = { damping: 16, stiffness: 170 }) =>
  spring({ frame: frame - delay, fps, config: cfg });
const popIn = (f: number, delay: number, dist = 40) => {
  const s = clampSpring(f, delay);
  return { opacity: Math.min(1, s * 1.2), transform: `translateY(${(1 - s) * dist}px)` } as React.CSSProperties;
};
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

// ---------- candle engine (viewBox 0..1000 x 0..900) ----------
type Candle = { o: number; c: number; hi: number; lo: number };
function makeCandles(prices: number[]): Candle[] {
  return prices.map((c, i) => {
    const o = i ? prices[i - 1] : prices[0] - 1;
    const r = 1.4 + ((i * 37) % 13) / 10;
    return { o, c, hi: Math.max(o, c) + r, lo: Math.min(o, c) - r };
  });
}
const CH = { x0: 70, x1: 940, y0: 70, y1: 560 };
function mapX(i: number, n: number) { return lerp(CH.x0, CH.x1, n <= 1 ? 0.5 : i / (n - 1)); }
function makeMapY(min: number, max: number, y0 = CH.y0, y1 = CH.y1) {
  const pad = (max - min) * 0.12 || 1;
  return (p: number) => lerp(y1, y0, (p - (min - pad)) / ((max + pad) - (min - pad)));
}

const Chart: React.FC<{ prices: number[]; f: number; startF: number; stepF?: number; mapY: (p: number) => number; reversalIdx?: number }> =
  ({ prices, f, startF, stepF = 1.9, mapY, reversalIdx }) => {
    const candles = makeCandles(prices); const n = candles.length;
    const bw = ((CH.x1 - CH.x0) / n) * 0.6;
    return (
      <>
        {candles.map((cd, i) => {
          const local = f - startF - i * stepF;
          const g = clamp01(spring({ frame: local, fps, config: { damping: 14, stiffness: 220 } }));
          if (g <= 0.001) return null;
          const x = mapX(i, n);
          const isUp = cd.c >= cd.o;
          let col = isUp ? GREEN : RED;
          if (reversalIdx != null && i === reversalIdx) col = GREEN;
          const yO = mapY(cd.o), yC = mapY(cd.c), yHi = mapY(cd.hi), yLo = mapY(cd.lo);
          const top = Math.min(yO, yC), bot = Math.max(yO, yC);
          const fullH = Math.max(4, bot - top); const h = fullH * g, cy = (top + bot) / 2;
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={lerp(cy, yHi, g)} y2={lerp(cy, yLo, g)} stroke={col} strokeWidth={3} />
              <rect x={x - bw / 2} y={cy - h / 2} width={bw} height={h} rx={3} fill={col} />
            </g>
          );
        })}
      </>
    );
  };

const Marker: React.FC<{ cx: number; cy: number; f: number; delay: number; color?: string }> = ({ cx, cy, f, delay, color = GOLD }) => {
  const s = clampSpring(f, delay, { damping: 12, stiffness: 200 });
  if (s <= 0.01) return null;
  const pulse = 1 + 0.16 * Math.sin((f - delay) / 4);
  return <circle cx={cx} cy={cy} r={24 * s * pulse} fill="none" stroke={color} strokeWidth={5} />;
};

// polyline that draws progressively
const DrawLine: React.FC<{ pts: [number, number][]; f: number; delay: number; color: string; width?: number; dash?: boolean }> =
  ({ pts, f, delay, color, width = 5, dash }) => {
    const p = clamp01(interpolate(f, [delay, delay + 16], [0, 1]));
    if (p <= 0) return null;
    const m = Math.max(2, Math.ceil(p * pts.length));
    const shown = pts.slice(0, m);
    return <polyline points={shown.map(([x, y]) => `${x},${y}`).join(" ")} fill="none" stroke={color}
      strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash ? "10 9" : undefined} opacity={0.92} />;
  };

const VolBars: React.FC<{ vols: number[]; cols: string[]; f: number; startF: number; stepF?: number; y0: number; y1: number }> =
  ({ vols, cols, f, startF, stepF = 1.6, y0, y1 }) => {
    const n = vols.length; const mx = Math.max(...vols); const bw = ((CH.x1 - CH.x0) / n) * 0.6;
    return (<>
      {vols.map((v, i) => {
        const g = clamp01(spring({ frame: f - startF - i * stepF, fps, config: { damping: 15, stiffness: 220 } }));
        if (g <= 0.001) return null;
        const h = (v / mx) * (y1 - y0) * g; const x = mapX(i, n);
        return <rect key={i} x={x - bw / 2} y={y1 - h} width={bw} height={h} rx={2} fill={cols[i]} opacity={0.9} />;
      })}
    </>);
  };

const Tag: React.FC<{ x: number; y: number; f: number; delay: number; text: string; bg: string; fg?: string; size?: number }> =
  ({ x, y, f, delay, text, bg, fg = "#0a1628", size = 32 }) => {
    const s = clampSpring(f, delay, { damping: 13, stiffness: 200 });
    if (s <= 0.01) return null;
    return (
      <div style={{ position: "absolute", left: `${x / 1000 * 100}%`, top: `${y / 900 * 100}%`,
        transform: `translate(-50%,-50%) scale(${0.7 + s * 0.3})`, opacity: s, background: bg, color: fg,
        fontFamily: FF, fontWeight: 800, fontSize: size, padding: "10px 20px", borderRadius: 13, whiteSpace: "nowrap",
        boxShadow: "0 6px 20px rgba(0,0,0,.4)" }}>{text}</div>
    );
  };

const Title: React.FC<{ f: number; lines: string[]; color?: string; size?: number; top?: number }> =
  ({ f, lines, color = TITLEC, size = 78, top = 230 }) => (
    <div style={{ position: "absolute", top, left: 60, right: 60, textAlign: "center" }}>
      {lines.map((l, i) => (
        <div key={i} style={{ ...popIn(f, i * 4, 30), fontFamily: FF, fontWeight: 800, fontSize: size,
          lineHeight: 1.1, color, textShadow: "0 4px 18px rgba(0,0,0,.5)" }}>{l}</div>
      ))}
    </div>
  );

const SetupHeader: React.FC<{ f: number; n: number; title: string }> = ({ f, n, title }) => {
  const sb = clampSpring(f, 2, { damping: 11, stiffness: 220 });
  return (
    <div style={{ position: "absolute", top: 220, left: 70, right: 60, display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ width: 90, height: 90, borderRadius: "50%", background: PUR, color: "#fff",
        fontFamily: FF, fontWeight: 800, fontSize: 52, display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, opacity: sb, transform: `scale(${0.4 + sb * 0.6})`, boxShadow: "0 8px 26px rgba(123,58,236,.5)" }}>{n}</div>
      <div style={{ ...popIn(f, 5, 22), fontFamily: FF, fontWeight: 800, fontSize: 56, lineHeight: 1.06,
        color: TITLEC, textShadow: "0 4px 18px rgba(0,0,0,.5)" }}>{title}</div>
    </div>
  );
};

const BgPhoto: React.FC<{ src: string; dark?: number }> = ({ src, dark = 0.4 }) => {
  const f = useCurrentFrame();
  const sc = interpolate(f, [0, 150], [1.06, 1.15], { extrapolateRight: "extend" });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover",
        filter: `blur(8px) brightness(${dark}) saturate(1.1)`, transform: `scale(${sc})` }} />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, rgba(10,22,40,.7) 0%, rgba(10,22,40,.9) 84%)" }} />
    </AbsoluteFill>
  );
};
const Base: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg }) => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 34%, #14253f 0%, #0a1628 74%)", fontFamily: FF, color: "#f2f6ff" }}>
    {bg && <BgPhoto src={bg} />}
    {children}
  </AbsoluteFill>
);
const Holder: React.FC<{ children: React.ReactNode; top?: number; height?: number }> = ({ children, top = 470, height = 840 }) => (
  <div style={{ position: "absolute", left: 40, right: 40, top, height }}>{children}</div>
);
const SVG: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width="100%" viewBox="0 0 1000 900" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>
);

// ================= SCENES =================

// HOOK s01-s03: "Đáy chưa?" nhan nhản -> gạch bỏ "ĐỪNG CỐ ĐOÁN ĐÁY" -> dao rơi
const SceneHook: React.FC<{ f: number; q2Beat: number; knifeBeat: number }> = ({ f, q2Beat, knifeBeat }) => {
  const prices = [64, 60, 62, 56, 58, 51, 53, 47, 49, 43, 45, 39, 41, 35, 31, 28];
  const mapY = makeMapY(Math.min(...prices), Math.max(...prices), 470, 1080);
  const lowX = mapX(14, prices.length), lowY = mapY(31);
  // scattered "Đáy chưa?" bubbles (nhan nhản)
  const bubbles = [
    { x: 16, y: 470, d: 10 }, { x: 72, y: 430, d: 20 }, { x: 40, y: 600, d: 30 },
    { x: 84, y: 690, d: 40 }, { x: 22, y: 800, d: 52 }, { x: 62, y: 880, d: 64 }, { x: 38, y: 1000, d: 78 },
  ];
  const struck = f >= q2Beat;           // sau q2: gạch bỏ
  const phase3 = f >= knifeBeat;        // dao rơi
  const knifeY = interpolate(f, [knifeBeat, knifeBeat + 14], [120, 760], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleS = clampSpring(f, q2Beat, { damping: 13, stiffness: 200 });
  const strikeP = clamp01(interpolate(f, [q2Beat, q2Beat + 12], [0, 1]));
  return (
    <Base bg="cover_4dauhieu.png">
      {/* falling market behind */}
      <Holder top={300} height={1080}>
        <SVG>
          <Chart prices={prices} f={f} startF={4} stepF={1.5} mapY={mapY} />
          {phase3 && (
            <>
              <Marker cx={lowX} cy={lowY} f={f} delay={knifeBeat} color={GOLD} />
              <g transform={`translate(${mapX(13, prices.length)}, ${knifeY}) rotate(180)`} opacity={clamp01((f - knifeBeat) / 6)}>
                <path d="M0,-66 L11,44 L0,76 L-11,44 Z" fill="#dce1ec" stroke="#9aa3b5" strokeWidth={2} />
                <rect x={-8} y={76} width={16} height={40} rx={3} fill="#5b3a1e" />
              </g>
            </>
          )}
        </SVG>
      </Holder>
      {/* phase 1: "Đáy chưa?" nhan nhản */}
      {!phase3 && bubbles.map((b, i) => {
        const s = clampSpring(f, b.d, { damping: 12, stiffness: 220 });
        if (s <= 0.01) return null;
        const fade = struck ? 1 - strikeP * 0.55 : 1;
        return (
          <div key={i} style={{ position: "absolute", left: `${b.x}%`, top: b.y, transform: `translate(-50%,-50%) scale(${0.6 + s * 0.4}) rotate(${(i % 2 ? -1 : 1) * 4}deg)`,
            opacity: s * fade, background: "rgba(255,255,255,0.95)", color: "#0a1628", fontWeight: 800, fontSize: 34,
            padding: "12px 22px", borderRadius: 18, borderBottomLeftRadius: 4, whiteSpace: "nowrap",
            boxShadow: "0 8px 22px rgba(0,0,0,.4)", textDecoration: struck ? "line-through" : "none",
            textDecorationColor: RED, textDecorationThickness: 4 }}>Đáy chưa?</div>
        );
      })}
      {/* phase 2: red strike sweep + title */}
      {struck && !phase3 && (
        <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <line x1={120} y1={1080} x2={lerp(120, 960, strikeP)} y2={lerp(1080, 360, strikeP)} stroke={RED} strokeWidth={14} strokeLinecap="round" opacity={0.9} />
        </svg>
      )}
      {(struck) && (
        <div style={{ position: "absolute", top: phase3 ? 150 : 250, left: 60, right: 60, textAlign: "center",
          opacity: titleS, transform: `scale(${0.7 + titleS * 0.3})` }}>
          <div style={{ fontFamily: FF, fontWeight: 800, fontSize: phase3 ? 88 : 104, lineHeight: 1.05, color: TITLEC,
            textShadow: "0 6px 24px rgba(0,0,0,.6)" }}>ĐỪNG CỐ<br />ĐOÁN ĐÁY</div>
        </div>
      )}
      {/* phase 1 caption */}
      {!struck && (
        <div style={{ ...popIn(f, 4), position: "absolute", top: 250, left: 60, right: 60, textAlign: "center",
          fontFamily: FF, fontWeight: 800, fontSize: 56, color: "#fff", textShadow: "0 4px 18px rgba(0,0,0,.6)" }}>
          Thị trường vừa giảm mạnh?
        </div>
      )}
      {phase3 && <Tag x={520} y={300} f={f} delay={knifeBeat + 3} text="Bắt dao rơi" bg={RED} fg="#fff" size={40} />}
    </Base>
  );
};

// s04: 4 dấu hiệu cards
const SceneFour: React.FC<{ f: number; beat: number }> = ({ f, beat }) => {
  const items = [
    { t: "Thanh khoản cạn", c: GREEN }, { t: "Phân kỳ dương", c: GOLD },
    { t: "Hai đáy (W)", c: "#60a5fa" }, { t: "Trụ ngừng rơi", c: PUR },
  ];
  return (
    <Base bg="cover_4dauhieu.png">
      <Title f={f} lines={["CÓ 4 DẤU HIỆU", "ĐỂ KỲ VỌNG"]} size={72} top={210} />
      <div style={{ position: "absolute", top: 560, left: 80, right: 80, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 34 }}>
        {items.map((it, i) => {
          const s = clampSpring(f, beat + i * 6, { damping: 13, stiffness: 200 });
          return (
            <div key={i} style={{ height: 270, borderRadius: 28, background: "rgba(255,255,255,0.05)", border: `2px solid ${it.c}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
              opacity: s, transform: `scale(${0.7 + s * 0.3})` }}>
              <div style={{ fontSize: 82, fontWeight: 800, color: it.c }}>{i + 1}</div>
              <div style={{ fontSize: 34, fontWeight: 700, color: "#eaf0fb", textAlign: "center", padding: "0 12px" }}>{it.t}</div>
            </div>
          );
        })}
      </div>
    </Base>
  );
};

// WHY s05-s06: ngộp bảng điện -> tập trung
const SceneWhy: React.FC<{ f: number; focusBeat: number }> = ({ f, focusBeat }) => {
  const cells = Array.from({ length: 60 });
  const focus = clamp01(interpolate(f, [focusBeat, focusBeat + 18], [0, 1]));
  const prices = [40, 42, 39, 43, 41, 38, 42, 45, 44, 47, 50, 53];
  const mapY = makeMapY(Math.min(...prices), Math.max(...prices), 70, 450);
  return (
    <Base>
      <Title f={f} lines={["Đừng nhìn", "cả ngàn mã"]} size={60} top={180} color="#fff" />
      <div style={{ position: "absolute", top: 430, left: 50, right: 50, display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10,
        opacity: 0.5 - focus * 0.46, filter: `blur(${focus * 3}px)` }}>
        {cells.map((_, i) => {
          const up = (i * 7) % 3 === 0; const sh = clamp01(spring({ frame: f - i * 0.6, fps, config: { damping: 16, stiffness: 200 } }));
          return (
            <div key={i} style={{ height: 64, borderRadius: 8, background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center",
              color: up ? GREEN : RED, fontWeight: 700, fontSize: 21, opacity: sh }}>
              {up ? "▲" : "▼"}{((i * 13) % 9) + 1}.{(i * 7) % 10}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 600, left: 150, right: 150, opacity: focus,
        transform: `scale(${0.86 + focus * 0.14})` }}>
        <div style={{ borderRadius: 26, background: "rgba(123,58,236,0.12)", border: `2px solid ${PUR}`, padding: 22,
          boxShadow: `0 0 ${focus * 60}px rgba(123,58,236,.4)` }}>
          <svg width="100%" viewBox="0 0 1000 520" style={{ overflow: "visible", display: "block" }}>
            {makeCandles(prices).map((cd, i) => {
              const x = lerp(90, 910, i / (prices.length - 1)); const isUp = cd.c >= cd.o; const col = isUp ? GREEN : RED;
              const yO = mapY(cd.o), yC = mapY(cd.c); const top = Math.min(yO, yC), bot = Math.max(yO, yC);
              return <g key={i}><line x1={x} x2={x} y1={mapY(cd.hi)} y2={mapY(cd.lo)} stroke={col} strokeWidth={3} />
                <rect x={x - 24} y={top} width={48} height={Math.max(5, bot - top)} rx={3} fill={col} /></g>;
            })}
          </svg>
          <div style={{ textAlign: "center", color: TITLEC, fontWeight: 800, fontSize: 36, marginTop: 4 }}>Chỉ soi vài mã bạn hiểu</div>
        </div>
      </div>
    </Base>
  );
};

// DH1 s07-s08: thanh khoản cạn + đảo chiều
const SceneDH1: React.FC<{ f: number; reversalBeat: number }> = ({ f, reversalBeat }) => {
  const prices = [72, 70, 67, 64, 62, 59, 57, 54, 52, 49, 47, 45, 43, 41, 50, 53, 51];
  const mapY = makeMapY(Math.min(...prices), Math.max(...prices), 340, 600);
  const vols = [44, 41, 37, 33, 30, 27, 24, 21, 18, 16, 14, 12, 11, 10, 58, 22, 19];
  const cols = vols.map((_, i) => (i >= 14 ? GREEN : RED));
  const revIdx = 14; const revX = mapX(revIdx, prices.length), revY = mapY(50);
  return (
    <Base bg="sig1_thanhkhoan.png">
      <SetupHeader f={f} n={1} title="Thanh khoản cạn + đảo chiều" />
      <Holder top={420} height={900}>
        <SVG>
          <Chart prices={prices} f={f} startF={4} mapY={mapY} reversalIdx={revIdx} />
          <Marker cx={revX} cy={revY} f={f} delay={reversalBeat} color={GREEN} />
          {/* volume panel */}
          <line x1={CH.x0} x2={CH.x1} y1={640} y2={640} stroke="rgba(255,255,255,.12)" strokeWidth={2} />
          <VolBars vols={vols} cols={cols} f={f} startF={8} y0={650} y1={830} />
        </SVG>
        <Tag x={revX} y={mapY(50) - 90} f={f} delay={reversalBeat} text="PHIÊN ĐẢO CHIỀU" bg={GREEN} size={30} />
        <Tag x={300} y={760} f={f} delay={20} text="Thanh khoản cạn" bg="rgba(248,113,113,.2)" fg="#ffd9d9" size={28} />
        <Tag x={mapX(14, prices.length)} y={690} f={f} delay={reversalBeat + 4} text="Khối lượng đột biến" bg={GREEN} size={26} />
      </Holder>
    </Base>
  );
};

// DH2 s09-s11: phân kỳ dương
const SceneDH2: React.FC<{ f: number; priceBeat: number; indiBeat: number }> = ({ f, priceBeat, indiBeat }) => {
  // price (zigzag) two LOWER lows in upper area; indicator two HIGHER lows in subpanel
  const pricePts: [number, number][] = [
    [70, 200], [150, 150], [230, 230], [320, 180], [410, 300], [470, 360], [540, 290],
    [620, 340], [700, 420], [770, 470], [840, 400], [910, 440],
  ];
  const low1 = pricePts[5], low2 = pricePts[9]; // 360 -> 470 (lower)
  const indi: [number, number][] = [
    [70, 760], [150, 730], [230, 800], [320, 770], [410, 840], [470, 855], [540, 800],
    [620, 820], [700, 800], [770, 790], [840, 740], [910, 720],
  ];
  const ilow1 = indi[5], ilow2 = indi[9]; // 855 -> 790 (higher = smaller y)
  return (
    <Base bg="sig2_phanky.png">
      <SetupHeader f={f} n={2} title="Phân kỳ dương" />
      <Holder top={430} height={880}>
        <SVG>
          <line x1={CH.x0} x2={CH.x1} y1={620} y2={620} stroke="rgba(255,255,255,.12)" strokeWidth={2} />
          {/* price line */}
          <DrawLine pts={pricePts} f={f} delay={6} color={RED} width={5} />
          {/* descending guide under price lows */}
          <DrawLine pts={[low1, low2]} f={f} delay={priceBeat} color="#fca5a5" width={3} dash />
          <Marker cx={low1[0]} cy={low1[1]} f={f} delay={priceBeat} color={RED} />
          <Marker cx={low2[0]} cy={low2[1]} f={f} delay={priceBeat + 4} color={RED} />
          {/* indicator line */}
          <DrawLine pts={indi} f={f} delay={10} color={GOLD} width={4} />
          {/* ascending guide under indicator lows */}
          <DrawLine pts={[ilow1, ilow2]} f={f} delay={indiBeat} color={GREEN} width={3} dash />
          <Marker cx={ilow1[0]} cy={ilow1[1]} f={f} delay={indiBeat} color={GREEN} />
          <Marker cx={ilow2[0]} cy={ilow2[1]} f={f} delay={indiBeat + 4} color={GREEN} />
        </SVG>
        <Tag x={300} y={460} f={f} delay={priceBeat} text="Giá tạo đáy thấp hơn" bg="rgba(248,113,113,.22)" fg="#ffd9d9" size={28} />
        <Tag x={700} y={760} f={f} delay={indiBeat} text="Chỉ báo tạo đáy cao hơn" bg="rgba(52,211,153,.2)" fg="#c9f7e5" size={26} />
        <Tag x={500} y={600} f={f} delay={indiBeat + 6} text="PHÂN KỲ DƯƠNG" bg={GREEN} size={32} />
      </Holder>
    </Base>
  );
};

// DH3 s12-s13: hai đáy W
const SceneDH3: React.FC<{ f: number; confirmBeat: number }> = ({ f, confirmBeat }) => {
  const prices = [60, 55, 50, 46, 43, 41, 45, 49, 47, 44, 42, 46, 51, 54, 52, 56];
  const mapY = makeMapY(Math.min(...prices), Math.max(...prices), 340, 640);
  const supY = mapY(41.5), neckY = mapY(49.5);
  const b1x = mapX(5, prices.length), b1y = mapY(41);
  const b2x = mapX(10, prices.length), b2y = mapY(42);
  const brkX = mapX(13, prices.length), brkY = mapY(54);
  const vols = prices.map((p, i) => (i === 13 ? 56 : 14 + ((i * 11) % 16)));
  const cols = vols.map((_, i) => (i >= 11 ? GREEN : i % 2 ? RED : GREEN));
  return (
    <Base bg="sig3_haiday.png">
      <SetupHeader f={f} n={3} title="Mô hình hai đáy (W)" />
      <Holder top={420} height={900}>
        <SVG>
          <Level dash y={supY} />
          <line x1={CH.x0} x2={lerp(CH.x0, CH.x1, clamp01(interpolate(f, [10, 24], [0, 1])))} y1={supY} y2={supY}
            stroke={GREEN} strokeWidth={4} strokeDasharray="12 10" />
          <line x1={CH.x0} x2={lerp(CH.x0, CH.x1, clamp01(interpolate(f, [12, 26], [0, 1])))} y1={neckY} y2={neckY}
            stroke={DIM} strokeWidth={3} strokeDasharray="10 9" />
          <Chart prices={prices} f={f} startF={4} mapY={mapY} />
          <Marker cx={b1x} cy={b1y} f={f} delay={16} color={RED} />
          <Marker cx={b2x} cy={b2y} f={f} delay={22} color={RED} />
          <Marker cx={brkX} cy={brkY} f={f} delay={confirmBeat} color={GREEN} />
          <line x1={CH.x0} x2={CH.x1} y1={670} y2={670} stroke="rgba(255,255,255,.12)" strokeWidth={2} />
          <VolBars vols={vols} cols={cols} f={f} startF={8} y0={680} y1={830} />
        </SVG>
        <Tag x={b1x} y={b1y + 90} f={f} delay={16} text="Đáy 1" bg={RED} fg="#fff" size={28} />
        <Tag x={b2x} y={b2y + 90} f={f} delay={22} text="Test đáy" bg="#1e3a8a" fg="#fff" size={28} />
        <Tag x={brkX} y={brkY - 90} f={f} delay={confirmBeat} text="ĐIỂM XÁC NHẬN" bg={GREEN} size={30} />
      </Holder>
    </Base>
  );
};

// DH4 s14-s15: trụ ngừng rơi
const SceneDH4: React.FC<{ f: number; leadBeat: number; groupBeat: number }> = ({ f, leadBeat, groupBeat }) => {
  // LEADER (trụ): bottoms EARLY (x~340) then rises sharply, cutting UP through the faint group lines
  const leader: [number, number][] = [
    [70, 380], [160, 430], [250, 465], [340, 470], [430, 420], [520, 330], [610, 250], [700, 195], [790, 165], [910, 145],
  ];
  // GROUP lines (nhóm theo sau): still flat/declining through the middle, bottom LATER (x~520-610), rise late, stay BELOW leader
  const group1: [number, number][] = [
    [70, 300], [160, 350], [250, 410], [340, 470], [430, 510], [520, 525], [610, 515], [700, 480], [790, 445], [910, 415],
  ];
  const group2: [number, number][] = [
    [70, 335], [160, 385], [250, 450], [340, 510], [430, 555], [520, 580], [610, 585], [700, 560], [790, 525], [910, 495],
  ];
  const idx: [number, number][] = [[70, 800], [200, 795], [340, 805], [480, 800], [620, 800], [760, 790], [910, 782]];
  const turnX = 340, turnY = 470; // leader's early bottom
  return (
    <Base bg="sig4_tru.png">
      <SetupHeader f={f} n={4} title="Cổ phiếu trụ ngừng rơi" />
      <Holder top={430} height={880}>
        <SVG>
          {/* leader rises FIRST */}
          <DrawLine pts={leader} f={f} delay={6} color={PUR} width={9} />
          {/* groups lag — drawn later */}
          <DrawLine pts={group1} f={f} delay={groupBeat} color="rgba(255,255,255,.42)" width={3} />
          <DrawLine pts={group2} f={f} delay={groupBeat + 5} color="rgba(255,255,255,.28)" width={3} />
          <DrawLine pts={idx} f={f} delay={18} color="rgba(52,211,153,.5)" width={3} />
          {f > leadBeat && (
            <path d={`M ${turnX} ${turnY + 115} L ${turnX} ${turnY + 28}`} stroke={GREEN} strokeWidth={7}
              strokeLinecap="round" markerEnd="url(#ah4)" opacity={clamp01((f - leadBeat) / 8)} />
          )}
          <defs><marker id="ah4" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={GREEN} /></marker></defs>
        </SVG>
        <Tag x={760} y={210} f={f} delay={10} text="Cổ phiếu đầu ngành" bg={PUR} fg="#fff" size={28} />
        <Tag x={turnX} y={turnY + 175} f={f} delay={leadBeat} text="TRỤ TẠO ĐÁY TRƯỚC" bg={GREEN} size={28} />
        <Tag x={820} y={470} f={f} delay={groupBeat + 6} text="Nhóm theo sau" bg="rgba(255,255,255,.16)" fg="#dbe4f5" size={26} />
        <Tag x={790} y={835} f={f} delay={20} text="Thị trường chung" bg="rgba(52,211,153,.18)" fg="#c9f7e5" size={24} />
      </Holder>
    </Base>
  );
};

const Level: React.FC<{ y: number; dash?: boolean }> = () => null;

// BRIDGE s16-s17: Watchlist + Cảnh báo (app) -> câu chốt
const SceneBridge: React.FC<{ f: number; starBeat: number; bellBeat: number; closeBeat: number }> = ({ f, starBeat, bellBeat, closeBeat }) => {
  const star = clampSpring(f, starBeat, { damping: 12, stiffness: 220 });
  const bell = clampSpring(f, bellBeat, { damping: 11, stiffness: 240 });
  const closeP = clamp01(interpolate(f, [closeBeat, closeBeat + 14], [0, 1]));
  return (
    <Base bg="app_tamsoat.png" >
      <div style={{ position: "absolute", top: 200, left: 60, right: 60, textAlign: "center", ...popIn(f, 0, 24) }}>
        <div style={{ fontSize: 58, fontWeight: 800, color: "#fff", lineHeight: 1.16 }}>Không cần canh<br />bảng cả ngày</div>
      </div>
      <Img src={staticFile("app_tamsoat.png")} style={{ position: "absolute", top: 470, left: "50%",
        transform: "translateX(-50%)", width: 720, borderRadius: 26, border: "1px solid rgba(255,255,255,.16)",
        boxShadow: "0 20px 55px rgba(0,0,0,.55)", opacity: clamp01(interpolate(f, [4, 20], [0, 1])) }} />
      {/* Watchlist star */}
      <div style={{ position: "absolute", top: 560, left: 120, opacity: star, transform: `scale(${0.5 + star * 0.5})`,
        background: GOLD, color: "#0a1628", borderRadius: 18, padding: "16px 26px", fontWeight: 800, fontSize: 34,
        boxShadow: "0 10px 30px rgba(245,197,66,.5)" }}>★ Watchlist</div>
      {/* Cảnh báo bell */}
      <div style={{ position: "absolute", top: 560, right: 110, opacity: bell,
        transform: `scale(${0.5 + bell * 0.5}) rotate(${Math.sin(f / 3) * 6 * bell}deg)`,
        background: GREEN, color: "#0a1628", borderRadius: 18, padding: "16px 26px", fontWeight: 800, fontSize: 34,
        boxShadow: "0 10px 30px rgba(52,211,153,.5)" }}>🔔 Cảnh báo</div>
      {/* closing line s17 */}
      <div style={{ position: "absolute", top: 1180, left: 70, right: 70, textAlign: "center", opacity: closeP,
        transform: `translateY(${(1 - closeP) * 20}px)`, fontSize: 44, fontWeight: 800, color: TITLEC, lineHeight: 1.25 }}>
        Đáy thưởng cho người<br />quan sát đúng chỗ
      </div>
    </Base>
  );
};

// CTA s18
const SceneCTA: React.FC<{ f: number }> = ({ f }) => {
  const fb = clampSpring(f, 12, { damping: 11, stiffness: 220 });
  return (
    <Base bg="cover_4dauhieu.png">
      <div style={{ position: "absolute", top: 420, left: 60, right: 60, textAlign: "center", ...popIn(f, 0) }}>
        <div style={{ fontSize: 66, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>Đọc tín hiệu<br />cùng bạn mỗi ngày</div>
      </div>
      <div style={{ position: "absolute", top: 820, left: "50%", transform: `translateX(-50%) scale(${0.6 + fb * 0.4})`,
        opacity: fb, background: GREEN, color: "#0a1628", fontSize: 46, fontWeight: 800, padding: "22px 56px",
        borderRadius: 44, whiteSpace: "nowrap", boxShadow: "0 10px 30px rgba(52,211,153,.5)" }}>Follow để xem tiếp</div>
    </Base>
  );
};

// ---------- subtitle ----------
type Chunk = { cstart: number; cend: number; words: { w: string; t: number }[] };
const ALL_CHUNKS: Chunk[] = (data.sentences as any[]).flatMap((s) => s.chunks);
const li = (a: number, b: number, p: number) => Math.round(a + (b - a) * p);
const Subtitle: React.FC = () => {
  const f = useCurrentFrame(); const t = f / fps;
  let act: Chunk | null = null;
  for (const c of ALL_CHUNKS) { if (t >= c.cstart - 0.05 && t < c.cend) { act = c; break; } }
  if (!act) return null;
  const chars = act.words.reduce((a, w) => a + w.w.length + 1, 0);
  const fontSize = Math.max(34, Math.min(48, Math.floor(1000 / (chars * 0.5))));
  const barOp = interpolate(t, [act.cstart - 0.03, act.cstart + 0.12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
      <div style={{ position: "absolute", top: SAFE_ZONE.subtitleTop, left: 50, right: 50, textAlign: "center",
        fontFamily: FF, fontSize, fontWeight: 800, whiteSpace: "nowrap", opacity: barOp, textShadow: "0 3px 16px rgba(0,0,0,.7)" }}>
        {act.words.map((w, i) => {
          const lit = interpolate(t, [w.t, w.t + 0.13], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const r = li(120, 245, lit), g = li(160, 220, lit), b = li(210, 90, lit);
          return <span key={i} style={{ color: `rgb(${r},${g},${b})`, opacity: 0.55 + 0.45 * lit }}>{w.w}{" "}</span>;
        })}
      </div>
    </AbsoluteFill>
  );
};

const NOBRAND = true;
const BrandOverlay: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 380,
      background: "linear-gradient(180deg, rgba(123,58,236,0.40) 0%, rgba(123,58,236,0.13) 52%, rgba(123,58,236,0) 100%)" }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 480,
      background: "linear-gradient(0deg, rgba(123,58,236,0.46) 0%, rgba(123,58,236,0.15) 50%, rgba(123,58,236,0) 100%)" }} />
  </AbsoluteFill>
);
const Logo: React.FC = () => {
  if (NOBRAND) return null;
  return null;
};
const Progress: React.FC = () => {
  const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig();
  const w = interpolate(f, [0, durationInFrames], [0, 100], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end" }}>
      <div style={{ height: 8, background: "rgba(255,255,255,0.08)" }}>
        <div style={{ height: "100%", width: `${w}%`, background: `linear-gradient(90deg, ${PUR}, ${GREEN})` }} />
      </div>
    </AbsoluteFill>
  );
};

// scene schedule
const SCENES: { a: string; b: string | null; el: (f: number) => React.ReactNode }[] = [
  { a: "s01", b: "s04", el: (f) => <SceneHook f={f} q2Beat={F(ss("s02") - ss("s01"))} knifeBeat={F(ss("s03") - ss("s01"))} /> },
  { a: "s04", b: "s05", el: (f) => <SceneFour f={f} beat={F(1.6)} /> },
  { a: "s05", b: "s07", el: (f) => <SceneWhy f={f} focusBeat={F(ss("s06") - ss("s05"))} /> },
  { a: "s07", b: "s09", el: (f) => <SceneDH1 f={f} reversalBeat={F(ss("s08") - ss("s07") + 2.6)} /> },
  { a: "s09", b: "s12", el: (f) => <SceneDH2 f={f} priceBeat={F(ss("s10") - ss("s09")) + 17} indiBeat={F(ss("s10") - ss("s09")) + 100} /> },
  { a: "s12", b: "s14", el: (f) => <SceneDH3 f={f} confirmBeat={F(ss("s13") - ss("s12") + 3.0)} /> },
  { a: "s14", b: "s16", el: (f) => <SceneDH4 f={f} leadBeat={F(ss("s15") - ss("s14") + 0.6)} groupBeat={26} /> },
  { a: "s16", b: "s18", el: (f) => <SceneBridge f={f} starBeat={82} bellBeat={108} closeBeat={F(ss("s17") - ss("s16"))} /> },
  { a: "s18", b: null, el: (f) => <SceneCTA f={f} /> },
];

export const Main: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1628" }}>
      <Audio src={staticFile("voice_full.mp3")} />
      {SCENES.map((g, i) => {
        const from = F(ss(g.a));
        const to = g.b ? F(ss(g.b)) : durationInFrames;
        if (f < from - 1 || f >= to) return null;
        const local = f - from;
        const fade = interpolate(f, [from, from + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return <AbsoluteFill key={i} style={{ opacity: fade }}>{g.el(local)}</AbsoluteFill>;
      })}
      <BrandOverlay />
      <Subtitle />
      <Logo />
      <Progress />
    </AbsoluteFill>
  );
};
