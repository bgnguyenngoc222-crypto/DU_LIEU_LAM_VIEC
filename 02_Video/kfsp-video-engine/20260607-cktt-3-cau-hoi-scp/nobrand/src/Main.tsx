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
const NOBRAND = true;

const sentStart: Record<string, number> = Object.fromEntries(data.sentences.map((s: any) => [s.id, s.start]));
const ss = (id: string) => sentStart[id] ?? 0;
const sp = (f: number, delay: number, cfg: any = { damping: 15, stiffness: 180 }) => spring({ frame: f - delay, fps, config: cfg });
const popIn = (f: number, delay: number, dist = 36) => {
  const s = sp(f, delay); return { opacity: Math.min(1, s * 1.2), transform: `translateY(${(1 - s) * dist}px)` } as React.CSSProperties;
};
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// ---------- base ----------
const Base: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 34%, #14253f 0%, #0a1628 74%)", fontFamily: FF, color: "#f2f6ff" }}>{children}</AbsoluteFill>
);
const Title: React.FC<{ f: number; lines: string[]; color?: string; size?: number; top?: number }> =
  ({ f, lines, color = TITLEC, size = 72, top = 210 }) => (
    <div style={{ position: "absolute", top, left: 60, right: 60, textAlign: "center" }}>
      {lines.map((l, i) => (
        <div key={i} style={{ ...popIn(f, i * 4, 28), fontFamily: FF, fontWeight: 800, fontSize: size, lineHeight: 1.1, color, textShadow: "0 4px 18px rgba(0,0,0,.45)" }}>{l}</div>
      ))}
    </div>
  );

// ---------- candle chart ----------
const CH = { x0: 60, x1: 940, y0: 60, y1: 840 };
const mapX = (i: number, n: number) => lerp(CH.x0, CH.x1, n <= 1 ? 0.5 : i / (n - 1));
const makeMapY = (min: number, max: number) => { const pad = (max - min) * 0.12 || 1; return (p: number) => lerp(CH.y1, CH.y0, (p - (min - pad)) / ((max + pad) - (min - pad))); };
const Chart: React.FC<{ prices: number[]; f: number; startF: number; stepF?: number }> = ({ prices, f, startF, stepF = 2.0 }) => {
  const n = prices.length, min = Math.min(...prices), max = Math.max(...prices), mapY = makeMapY(min, max);
  const bw = ((CH.x1 - CH.x0) / n) * 0.6;
  return (
    <svg width={1000} viewBox="0 0 1000 900" style={{ overflow: "visible" }}>
      {prices.map((c, i) => {
        const o = i ? prices[i - 1] : prices[0] - 1; const r = 1.4 + ((i * 37) % 13) / 10;
        const hi = Math.max(o, c) + r, lo = Math.min(o, c) - r;
        const local = f - startF - i * stepF; const g = Math.max(0, Math.min(1, spring({ frame: local, fps, config: { damping: 14, stiffness: 220 } })));
        if (g <= 0.001) return null;
        const x = mapX(i, n), isUp = c >= o, col = isUp ? GREEN : RED;
        const yO = mapY(o), yC = mapY(c), top = Math.min(yO, yC), bot = Math.max(yO, yC);
        const h = Math.max(4, bot - top) * g, cy = (top + bot) / 2;
        return (<g key={i}>
          <line x1={x} x2={x} y1={lerp(cy, mapY(hi), g)} y2={lerp(cy, mapY(lo), g)} stroke={col} strokeWidth={3} />
          <rect x={x - bw / 2} y={cy - h / 2} width={bw} height={h} rx={3} fill={col} />
        </g>);
      })}
    </svg>
  );
};
const Holder: React.FC<{ children: React.ReactNode; top?: number }> = ({ children, top = 500 }) => (
  <div style={{ position: "absolute", left: 40, right: 40, top, height: 780 }}>{children}</div>
);

// ---------- badge + chips ----------
const QHeader: React.FC<{ f: number; n: number; title: string }> = ({ f, n, title }) => {
  const sb = sp(f, 2, { damping: 11, stiffness: 220 });
  return (
    <div style={{ position: "absolute", top: 220, left: 70, right: 60, display: "flex", alignItems: "center", gap: 26 }}>
      <div style={{ width: 96, height: 96, borderRadius: "50%", background: PUR, color: "#fff", fontFamily: FF, fontWeight: 800, fontSize: 54, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: sb, transform: `scale(${0.4 + sb * 0.6})`, boxShadow: "0 8px 28px rgba(123,58,236,.5)" }}>{n}</div>
      <div style={{ ...popIn(f, 5, 22), fontFamily: FF, fontWeight: 800, fontSize: 56, lineHeight: 1.06, color: TITLEC, textShadow: "0 4px 18px rgba(0,0,0,.45)" }}>{title}</div>
    </div>
  );
};
const Chips: React.FC<{ f: number; items: string[]; beats: number[]; color?: string }> = ({ f, items, beats, color = GREEN }) => (
  <div style={{ position: "absolute", top: 380, left: 80, right: 80, display: "flex", flexDirection: "column", gap: 26 }}>
    {items.map((t, i) => {
      const s = sp(f, beats[i], { damping: 14, stiffness: 200 });
      return (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, padding: "26px 32px", borderRadius: 20, background: "rgba(255,255,255,0.05)", border: `2px solid ${color}`, opacity: s, transform: `translateX(${(1 - s) * 44}px)` }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: color, color: "#0a1628", fontWeight: 800, fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#eaf0fb" }}>{t}</div>
        </div>
      );
    })}
  </div>
);

// ---------- SCENES ----------
// s01-s02: candle rising + "ngoài tầm tay"
const SceneHook: React.FC<{ f: number }> = ({ f }) => {
  const prices = [40, 43, 41, 45, 44, 48, 52, 50, 55, 60, 58, 64, 70, 76];
  const outBeat = F(ss("s02") - ss("s01"));
  const drift = Math.max(0, sp(f, outBeat + 6, { damping: 18, stiffness: 90 }));
  return (
    <Base>
      <Title f={f} lines={["Cổ phiếu này", "có thành SIÊU cổ phiếu?"]} size={66} />
      <Holder top={520}><Chart prices={prices} f={f} startF={6} /></Holder>
      {/* "ngoài tầm tay" gray, drifts out to right */}
      <div style={{ position: "absolute", top: 1180, left: 0, right: 0, textAlign: "center", opacity: drift * (1 - drift * 0.15), transform: `translateX(${drift * 240}px)` }}>
        <span style={{ fontFamily: FF, fontWeight: 800, fontSize: 50, color: DIM, background: "rgba(159,176,204,.12)", padding: "14px 30px", borderRadius: 16 }}>nằm ngoài tầm tay</span>
      </div>
    </Base>
  );
};

// s03-s04: trong tầm tay + 3 question cards
const SceneFrame: React.FC<{ f: number }> = ({ f }) => {
  const ring = sp(f, 8, { damping: 16, stiffness: 120 });
  return (
    <Base>
      <Title f={f} lines={["Nhưng có thứ", "TRONG TẦM TAY"]} size={70} />
      {/* glowing purple ring */}
      <div style={{ position: "absolute", top: 470, left: "50%", transform: `translateX(-50%) scale(${0.7 + ring * 0.3})`, width: 360, height: 360, borderRadius: "50%", border: `6px solid ${PUR}`, opacity: ring * 0.5, boxShadow: `0 0 80px ${PUR}` }} />
      <div style={{ position: "absolute", top: 560, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ ...popIn(f, 14), fontSize: 44, fontWeight: 700, color: "#dfe7f5" }}>Soi nó qua</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 30, marginTop: 40 }}>
          {[0, 1, 2].map((i) => {
            const s = sp(f, 20 + i * 6, { damping: 12, stiffness: 220 });
            return <div key={i} style={{ width: 150, height: 190, borderRadius: 24, background: "rgba(123,58,236,0.14)", border: `2px solid ${PUR}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 96, fontWeight: 800, color: TITLEC, opacity: s, transform: `scale(${0.5 + s * 0.5})` }}>?</div>;
          })}
        </div>
        <div style={{ ...popIn(f, 40), marginTop: 56, fontSize: 56, fontWeight: 800, color: GOLD }}>BA CÂU HỎI</div>
      </div>
    </Base>
  );
};

// s05-s06: Q1 doanh nghiệp khoẻ thật + 3 chips + rising profit bars
const SceneQ1: React.FC<{ f: number }> = ({ f }) => {
  const enumBeat = F(ss("s06") - ss("s05"));
  const bars = [30, 42, 56, 72];
  return (
    <Base>
      <QHeader f={f} n={1} title={"Doanh nghiệp\ncó khoẻ thật?"} />
      <Chips f={f} items={["Lợi nhuận quý tăng tốc", "Nhiều năm liền tăng đều", "Có điều gì đó mới mẻ"]} beats={[enumBeat + 6, enumBeat + 34, enumBeat + 62]} color={GREEN} />
      <div style={{ position: "absolute", bottom: 230, left: 90, right: 90, height: 200, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 30 }}>
        {bars.map((h, i) => {
          const g = sp(f, enumBeat + 8 + i * 6, { damping: 15, stiffness: 200 });
          return <div key={i} style={{ width: 70, height: h * 2.4 * g, background: `linear-gradient(180deg, ${GREEN}, #1f9e74)`, borderRadius: "8px 8px 0 0", opacity: 0.4 + 0.6 * g }} />;
        })}
      </div>
    </Base>
  );
};

// s07-s08: Q2 dòng tiền lớn + chips + volume bars
const SceneQ2: React.FC<{ f: number }> = ({ f }) => {
  const enumBeat = F(ss("s08") - ss("s07"));
  const vols = [26, 34, 30, 40, 28, 70, 58, 88];
  return (
    <Base>
      <QHeader f={f} n={2} title={"Có dòng tiền lớn\nđứng sau?"} />
      <Chips f={f} items={["Khối lượng tăng vọt", "Dấu chân của tổ chức", "Mã dẫn đầu ngành"]} beats={[enumBeat + 6, enumBeat + 32, enumBeat + 60]} color={PUR} />
      <div style={{ position: "absolute", bottom: 220, left: 80, right: 80, height: 230, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 18 }}>
        {vols.map((h, i) => {
          const g = sp(f, 10 + i * 3, { damping: 16, stiffness: 220 });
          const big = h > 60;
          return <div key={i} style={{ width: 60, height: h * 2.4 * g, background: big ? GOLD : "rgba(123,58,236,.55)", borderRadius: 6, opacity: 0.5 + 0.5 * g, boxShadow: big ? `0 0 24px ${GOLD}` : "none" }} />;
        })}
      </div>
    </Base>
  );
};

// s09-s10: Q3 sóng chung thuận + index line up
const SceneQ3: React.FC<{ f: number }> = ({ f }) => {
  const idx = [20, 24, 22, 28, 33, 31, 38, 44, 50, 58, 66];
  const min = Math.min(...idx), max = Math.max(...idx), mapY = makeMapY(min, max);
  const p = interpolate(f, [10, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shown = idx.slice(0, Math.max(2, Math.ceil(p * idx.length)));
  return (
    <Base>
      <QHeader f={f} n={3} title={"Con sóng chung\ncó thuận?"} />
      <Holder top={520}>
        <svg width={1000} viewBox="0 0 1000 900" style={{ overflow: "visible" }}>
          <defs><linearGradient id="ig" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={DIM} /><stop offset="1" stopColor={GREEN} /></linearGradient></defs>
          <polyline points={shown.map((m, i) => `${mapX(i, idx.length)},${mapY(m)}`).join(" ")} fill="none" stroke="url(#ig)" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          {p > 0.6 && <circle cx={mapX(shown.length - 1, idx.length)} cy={mapY(shown[shown.length - 1])} r={16} fill={GREEN} />}
        </svg>
      </Holder>
      <div style={{ ...popIn(f, 50), position: "absolute", bottom: 250, left: 80, right: 80, textAlign: "center", fontSize: 40, fontWeight: 700, color: "#dfe7f5" }}>Thị trường lên thì xuôi chèo mát mái</div>
    </Base>
  );
};

// s11: recap checklist
const SceneRecap: React.FC<{ f: number }> = ({ f }) => {
  const items = ["Doanh nghiệp khoẻ thật", "Dòng tiền lớn đứng sau", "Sóng chung đang thuận"];
  return (
    <Base>
      <Title f={f} lines={["3 câu hỏi này", "giúp bạn nhìn cho TỈNH"]} size={62} />
      <div style={{ position: "absolute", top: 560, left: 100, right: 100, display: "flex", flexDirection: "column", gap: 26 }}>
        {items.map((t, i) => {
          const s = sp(f, 8 + i * 7, { damping: 16, stiffness: 180 });
          return <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, padding: "26px 34px", borderRadius: 20, background: "rgba(123,58,236,0.10)", border: "1px solid rgba(123,58,236,0.4)", opacity: s, transform: `translateX(${(1 - s) * 40}px)` }}>
            <div style={{ width: 50, height: 50, borderRadius: "50%", background: GREEN, color: "#0a1628", fontWeight: 800, fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
            <div style={{ fontSize: 42, fontWeight: 700 }}>{t}</div>
          </div>;
        })}
      </div>
      <div style={{ ...popIn(f, 34), position: "absolute", top: 1140, left: 80, right: 80, textAlign: "center", fontSize: 42, fontWeight: 800, color: GOLD }}>trước khi xuống tiền</div>
    </Base>
  );
};

// s13n: CTA
const SceneCTA: React.FC<{ f: number }> = ({ f }) => {
  const fb = sp(f, 18, { damping: 11, stiffness: 220 });
  return (
    <Base>
      <div style={{ position: "absolute", top: 430, left: 60, right: 60, textAlign: "center" }}>
        <div style={{ ...popIn(f, 0), fontSize: 60, fontWeight: 800, lineHeight: 1.2, color: "#fff" }}>Mỗi ngày thêm<br />một mẹo giao dịch</div>
        <div style={{ ...popIn(f, 10), marginTop: 36, fontSize: 64, fontWeight: 800, color: TITLEC }}>Chứng khoán<br />trong tầm tay bạn</div>
      </div>
      <div style={{ position: "absolute", top: 1180, left: "50%", transform: `translateX(-50%) scale(${0.6 + fb * 0.4})`, opacity: fb, background: PUR, color: "#fff", fontSize: 44, fontWeight: 800, padding: "22px 56px", borderRadius: 44, whiteSpace: "nowrap", textAlign: "center", boxShadow: "0 12px 34px rgba(123,58,236,.55)" }}>Theo dõi mình nha</div>
    </Base>
  );
};

// ---------- subtitle karaoke ----------
type Chunk = { cstart: number; cend: number; words: { w: string; t: number }[] };
const ALL_CHUNKS: Chunk[] = (data.sentences as any[]).flatMap((s) => s.chunks);
const li = (a: number, b: number, p: number) => Math.round(a + (b - a) * p);
const Subtitle: React.FC = () => {
  const f = useCurrentFrame(), t = f / fps;
  let act: Chunk | null = null;
  for (const c of ALL_CHUNKS) { if (t >= c.cstart - 0.05 && t < c.cend) { act = c; break; } }
  if (!act) return null;
  const chars = act.words.reduce((a, w) => a + w.w.length + 1, 0);
  const fontSize = Math.max(34, Math.min(46, Math.floor(1000 / (chars * 0.5))));
  const barOp = interpolate(t, [act.cstart - 0.03, act.cstart + 0.12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
      <div style={{ position: "absolute", top: SAFE_ZONE.subtitleTop, left: 50, right: 50, textAlign: "center", fontFamily: FF, fontSize, fontWeight: 800, whiteSpace: "nowrap", opacity: barOp, textShadow: "0 3px 16px rgba(0,0,0,.6)" }}>
        {act.words.map((w, i) => {
          const lit = interpolate(t, [w.t, w.t + 0.13], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const r = li(150, 245, lit), g = li(170, 220, lit), b = li(220, 120, lit);
          return <span key={i} style={{ color: `rgb(${r},${g},${b})`, opacity: 0.55 + 0.45 * lit }}>{w.w}{" "}</span>;
        })}
      </div>
    </AbsoluteFill>
  );
};
const BrandOverlay: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 360, background: "linear-gradient(180deg, rgba(123,58,236,0.38) 0%, rgba(123,58,236,0.12) 52%, rgba(123,58,236,0) 100%)" }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 460, background: "linear-gradient(0deg, rgba(123,58,236,0.44) 0%, rgba(123,58,236,0.14) 50%, rgba(123,58,236,0) 100%)" }} />
  </AbsoluteFill>
);
const Logo: React.FC = () => {
  if (NOBRAND) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
      <div style={{ position: "absolute", top: 78, display: "flex", alignItems: "center", gap: 10 }}>
        <Img src={staticFile("logo-kfsp.png")} style={{ width: 56, height: 56, objectFit: "contain", filter: "brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,.5))" }} />
        <div style={{ fontFamily: FF, fontSize: 30, fontWeight: 800, letterSpacing: 4, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,.5)" }}>KFSP</div>
      </div>
    </AbsoluteFill>
  );
};
const Progress: React.FC = () => {
  const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig();
  const w = interpolate(f, [0, durationInFrames], [0, 100], { extrapolateRight: "clamp" });
  return (<AbsoluteFill style={{ justifyContent: "flex-end" }}>
    <div style={{ height: 8, background: "rgba(255,255,255,0.08)" }}><div style={{ height: "100%", width: `${w}%`, background: `linear-gradient(90deg, ${PUR}, ${GREEN})` }} /></div>
  </AbsoluteFill>);
};

const SCENES: { a: string; b: string | null; el: (f: number) => React.ReactNode }[] = [
  { a: "s01", b: "s03", el: (f) => <SceneHook f={f} /> },
  { a: "s03", b: "s05", el: (f) => <SceneFrame f={f} /> },
  { a: "s05", b: "s07", el: (f) => <SceneQ1 f={f} /> },
  { a: "s07", b: "s09", el: (f) => <SceneQ2 f={f} /> },
  { a: "s09", b: "s11", el: (f) => <SceneQ3 f={f} /> },
  { a: "s11", b: "s13n", el: (f) => <SceneRecap f={f} /> },
  { a: "s13n", b: null, el: (f) => <SceneCTA f={f} /> },
];

export const Main: React.FC = () => {
  const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1628" }}>
      <Audio src={staticFile("voice_full.mp3")} />
      {SCENES.map((g, i) => {
        const from = F(ss(g.a)); const to = g.b ? F(ss(g.b)) : durationInFrames;
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
