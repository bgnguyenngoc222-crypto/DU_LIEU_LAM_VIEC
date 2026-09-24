import {
  AbsoluteFill, Audio, Img, Sequence, staticFile,
  useCurrentFrame, useVideoConfig, interpolate, spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/BeVietnamPro";
import { COLORS, SAFE_ZONE } from "./design";
import data from "./data.json";

const { fontFamily: FF } = loadFont("normal", { weights: ["500", "600", "700", "800"] });
const fps = 30;
const F = (sec: number) => Math.round(sec * fps);
const GREEN = COLORS.green, RED = COLORS.red, GOLD = COLORS.gold, PUR = "#7B3AEC", TITLEC = "#AA75FF";
const NOBRAND = true;

const sentStart: Record<string, number> = Object.fromEntries(data.sentences.map((s: any) => [s.id, s.start]));
const ss = (id: string) => sentStart[id] ?? 0;

const cs = (frame: number, delay: number, cfg: any = { damping: 16, stiffness: 170 }) =>
  spring({ frame: frame - delay, fps, config: cfg });
const popIn = (f: number, delay: number, dist = 40): React.CSSProperties => {
  const s = cs(f, delay); return { opacity: Math.min(1, s * 1.2), transform: `translateY(${(1 - s) * dist}px)` };
};
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// ---------- candle engine (explicit OHLC) ----------
type C = { o: number; c: number; hi: number; lo: number };
const CH = { x0: 80, x1: 920, y0: 80, y1: 820 };
const mapX = (i: number, n: number) => lerp(CH.x0, CH.x1, n <= 1 ? 0.5 : i / (n - 1));
function mkMapY(cands: C[]) {
  const lo = Math.min(...cands.map((c) => c.lo)), hi = Math.max(...cands.map((c) => c.hi));
  const pad = (hi - lo) * 0.08 || 1;
  return (p: number) => lerp(CH.y1, CH.y0, (p - (lo - pad)) / ((hi + pad) - (lo - pad)));
}
// progressive reveal candle sequence with optional highlighted indexes
const CandleSeq: React.FC<{
  cands: C[]; f: number; startF: number; stepF?: number; highlight?: number[];
}> = ({ cands, f, startF, stepF = 2.4, highlight = [] }) => {
  const n = cands.length; const mapY = mkMapY(cands);
  const bw = ((CH.x1 - CH.x0) / n) * 0.6;
  return (
    <svg width={1000} viewBox="0 0 1000 900" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      {cands.map((cd, i) => {
        const local = f - startF - i * stepF;
        const g = Math.max(0, Math.min(1, spring({ frame: local, fps, config: { damping: 14, stiffness: 220 } })));
        if (g <= 0.001) return null;
        const x = mapX(i, n), up = cd.c >= cd.o, col = up ? GREEN : RED;
        const yO = mapY(cd.o), yC = mapY(cd.c), yHi = mapY(cd.hi), yLo = mapY(cd.lo);
        const top = Math.min(yO, yC), bot = Math.max(yO, yC);
        const fullH = Math.max(5, bot - top), h = fullH * g, cy = (top + bot) / 2;
        const isHi = highlight.includes(i);
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={lerp(cy, yHi, g)} y2={lerp(cy, yLo, g)} stroke={col} strokeWidth={4} />
            <rect x={x - bw / 2} y={cy - h / 2} width={bw} height={h} rx={3} fill={col}
              stroke={isHi ? GOLD : "none"} strokeWidth={isHi ? 4 : 0} />
            {isHi && g > 0.6 && (
              <rect x={x - bw / 2 - 14} y={Math.min(yHi, lerp(cy, yHi, g)) - 14}
                width={bw + 28} height={Math.abs(lerp(cy, yLo, g) - lerp(cy, yHi, g)) + 28}
                rx={12} fill="none" stroke={GOLD} strokeWidth={3} strokeDasharray="8 8" opacity={0.85} />
            )}
          </g>
        );
      })}
    </svg>
  );
};

// candle builders
const down = (start: number, n: number, step = 6): C[] =>
  Array.from({ length: n }, (_, i) => {
    const o = start - i * step, c = o - step * 0.8;
    return { o, c, hi: o + 1.6, lo: c - 1.6 };
  });
const up = (start: number, n: number, step = 6): C[] =>
  Array.from({ length: n }, (_, i) => {
    const o = start + i * step, c = o + step * 0.8;
    return { o, c, hi: c + 1.6, lo: o - 1.6 };
  });

const Title: React.FC<{ f: number; lines: string[]; size?: number; color?: string; top?: number }> =
  ({ f, lines, size = 70, color = "#fff", top = 196 }) => (
    <div style={{ position: "absolute", top, left: 56, right: 56, textAlign: "center" }}>
      {lines.map((l, i) => (
        <div key={i} style={{ ...popIn(f, i * 4, 30), fontFamily: FF, fontWeight: 800, fontSize: size,
          lineHeight: 1.1, color, textShadow: "0 4px 22px rgba(0,0,0,.55)" }}>{l}</div>
      ))}
    </div>
  );

const SetupHeader: React.FC<{ f: number; n: number; title: string }> = ({ f, n, title }) => {
  const sb = cs(f, 2, { damping: 11, stiffness: 220 });
  return (
    <div style={{ position: "absolute", top: 210, left: 70, right: 56, display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ width: 90, height: 90, borderRadius: "50%", background: GOLD, color: "#17192b",
        fontFamily: FF, fontWeight: 800, fontSize: 52, display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, opacity: sb, transform: `scale(${0.4 + sb * 0.6})`, boxShadow: "0 8px 26px rgba(245,197,66,.45)" }}>{n}</div>
      <div style={{ ...popIn(f, 5, 22), fontFamily: FF, fontWeight: 800, fontSize: 58, lineHeight: 1.05,
        color: TITLEC, textShadow: "0 4px 18px rgba(0,0,0,.5)" }}>{title}</div>
    </div>
  );
};

const Tag: React.FC<{ x: number; y: number; f: number; delay: number; text: string; bg: string; fg?: string }> =
  ({ x, y, f, delay, text, bg, fg = "#0a1628" }) => {
    const s = cs(f, delay, { damping: 13, stiffness: 200 });
    if (s <= 0.01) return null;
    return (
      <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${0.7 + s * 0.3})`,
        opacity: s, background: bg, color: fg, fontFamily: FF, fontWeight: 800, fontSize: 32, padding: "10px 20px",
        borderRadius: 14, whiteSpace: "nowrap", boxShadow: "0 6px 20px rgba(0,0,0,.4)" }}>{text}</div>
    );
  };

const NavyBase: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 34%, #14253f 0%, #0a1628 74%)", fontFamily: FF, color: "#f2f6ff" }}>
    {children}
  </AbsoluteFill>
);
const ChartHolder: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: 40, right: 40, top: 430, height: 880 }}>{children}</div>
);

// faint countryside callback overlay
const ChuonChuonGhost: React.FC<{ f: number; delay: number; dur: number }> = ({ f, delay, dur }) => {
  const op = interpolate(f, [delay, delay + 10, delay + dur - 10, delay + dur], [0, 0.28, 0.28, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (op <= 0.001) return null;
  return <Img src={staticFile("chuon-chuon.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
    objectFit: "cover", opacity: op, filter: "blur(3px)" }} />;
};

// ---------- SCENES ----------
const HeroImage: React.FC<{ f: number; src: string; title: string[] }> = ({ f, src, title }) => {
  const sc = interpolate(f, [0, 180], [1.05, 1.14], { extrapolateRight: "extend" });
  return (
    <AbsoluteFill style={{ background: "#0a1628", fontFamily: FF }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${sc})` }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,22,40,.55) 0%, rgba(10,22,40,0) 30%, rgba(10,22,40,.2) 70%, rgba(10,22,40,.7) 100%)" }} />
      <Title f={f} lines={title} size={66} color="#fff" top={210} />
    </AbsoluteFill>
  );
};

// s03 bridge: 2 điềm
const SceneOmen: React.FC<{ f: number }> = ({ f }) => (
  <AbsoluteFill style={{ background: "#0a1628", fontFamily: FF }}>
    <Img src={staticFile("chuon-chuon.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.22, filter: "blur(5px)" }} />
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, rgba(10,22,40,.5), rgba(10,22,40,.85))" }} />
    <Title f={f} lines={["Ông bà không đoán mò", "Đọc đúng điềm là biết trước"]} size={56} top={250} />
    {[{ icon: "🌧", lab: "Sắp mưa", d: 30, x: 320 }, { icon: "⛈", lab: "Sắp bão", d: 70, x: 760 }].map((o, i) => {
      const s = cs(f, o.d, { damping: 13, stiffness: 180 });
      return (
        <div key={i} style={{ position: "absolute", top: 720, left: o.x, transform: `translate(-50%,0) scale(${0.6 + s * 0.4})`, opacity: s, textAlign: "center" }}>
          <div style={{ fontSize: 130 }}>{o.icon}</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#eaf0fb" }}>{o.lab}</div>
        </div>
      );
    })}
  </AbsoluteFill>
);

// s04 morph trời -> chart (cross-dissolve mượt: ảnh quê -> wash ấm -> navy + nến mọc lên)
const SceneMorph: React.FC<{ f: number }> = ({ f }) => {
  const imgOp = interpolate(f, [0, 25, 55, 72], [0.92, 0.7, 0.22, 0], { extrapolateRight: "clamp" });
  const imgBlur = interpolate(f, [0, 60], [2, 16], { extrapolateRight: "clamp" });
  const imgScale = interpolate(f, [0, 80], [1.05, 1.18], { extrapolateRight: "extend" });
  const warmOp = interpolate(f, [0, 30, 70], [0.5, 0.32, 0], { extrapolateRight: "clamp" });
  const navyOp = interpolate(f, [20, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const candRise = interpolate(f, [F(1.6), F(2.6)], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const candOp = interpolate(f, [F(1.6), F(2.4)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cands = [...down(60, 4, 5), ...up(40, 4, 6)];
  return (
    <NavyBase>
      <Img src={staticFile("chuon-chuon.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", opacity: imgOp, filter: `blur(${imgBlur}px)`, transform: `scale(${imgScale})` }} />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 42%, rgba(245,197,66,.28), rgba(123,58,236,.10))", opacity: warmOp }} />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 34%, #14253f 0%, #0a1628 78%)", opacity: navyOp }} />
      <Title f={f} lines={["Thị trường cũng nói chuyện", "với mình qua những cây nến"]} size={52} top={250} />
      <ChartHolder>
        <div style={{ opacity: candOp, transform: `translateY(${candRise}px)` }}>
          <CandleSeq cands={cands} f={f} startF={F(1.6)} stepF={1.8} />
        </div>
      </ChartHolder>
    </NavyBase>
  );
};

// s05 hai chiều: trái = tạo ĐỈNH sắp giảm (Λ, ngược với đáy) / phải = ĐÁY sắp tăng (V)
const SceneTwoWays: React.FC<{ f: number }> = ({ f }) => {
  const downC = [...up(40, 3, 7), { o: 60, c: 58, hi: 63, lo: 57 }, ...down(58, 3, 6)]; // Λ tạo đỉnh
  const bottomC = [...down(60, 3, 6), { o: 42, c: 44, hi: 45, lo: 35 }, ...up(45, 3, 7)]; // V tạo đáy
  const leftOp = interpolate(f, [10, 30], [0, 0.42], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rightOp = interpolate(f, [40, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <NavyBase>
      <Title f={f} lines={["Điềm sắp giảm để giữ của", "Điềm đáy khi bên mua quay lại"]} size={50} top={210} />
      <div style={{ position: "absolute", left: -30, top: 540, width: 560, height: 700, opacity: leftOp }}>
        <svg width={560} viewBox="0 0 1000 900" style={{ overflow: "visible" }}>
          {(() => { const mY = mkMapY(downC); const bw = ((CH.x1 - CH.x0) / downC.length) * 0.55;
            return downC.map((cd, i) => { const x = mapX(i, downC.length), up2 = cd.c >= cd.o, col = up2 ? GREEN : RED;
              const yO = mY(cd.o), yC = mY(cd.c); return (<g key={i}><line x1={x} x2={x} y1={mY(cd.hi)} y2={mY(cd.lo)} stroke={col} strokeWidth={4} /><rect x={x - bw / 2} y={Math.min(yO, yC)} width={bw} height={Math.max(5, Math.abs(yC - yO))} rx={3} fill={col} /></g>); }); })()}
        </svg>
        <div style={{ position: "absolute", top: 20, left: 60, fontSize: 34, fontWeight: 800, color: RED }}>SẮP GIẢM</div>
      </div>
      <div style={{ position: "absolute", right: -30, top: 540, width: 560, height: 700, opacity: rightOp }}>
        <svg width={560} viewBox="0 0 1000 900" style={{ overflow: "visible" }}>
          {(() => { const mY = mkMapY(bottomC); const bw = ((CH.x1 - CH.x0) / bottomC.length) * 0.55;
            return bottomC.map((cd, i) => { const x = mapX(i, bottomC.length), up2 = cd.c >= cd.o, col = up2 ? GREEN : RED;
              const yO = mY(cd.o), yC = mY(cd.c); return (<g key={i}><line x1={x} x2={x} y1={mY(cd.hi)} y2={mY(cd.lo)} stroke={col} strokeWidth={4} /><rect x={x - bw / 2} y={Math.min(yO, yC)} width={bw} height={Math.max(5, Math.abs(yC - yO))} rx={3} fill={col} /></g>); }); })()}
        </svg>
        <div style={{ position: "absolute", top: 20, right: 60, fontSize: 34, fontWeight: 800, color: GREEN }}>ĐÁY GẦN KỀ</div>
      </div>
    </NavyBase>
  );
};

// s06 năm khung nến trống
const SceneFive: React.FC<{ f: number }> = ({ f }) => {
  const names = ["Búa", "Nhấn chìm", "Sao mai", "Doji", "Xuyên thấu"];
  return (
    <NavyBase>
      <Title f={f} lines={["NĂM MẪU NẾN", "ĐẢO CHIỀU ĐÁY"]} size={74} color={TITLEC} top={250} />
      <div style={{ position: "absolute", top: 720, left: 50, right: 50, display: "flex", justifyContent: "center", gap: 18 }}>
        {names.map((nm, i) => {
          const s = cs(f, F(2.0) + i * 6, { damping: 13, stiffness: 200 });
          return (
            <div key={i} style={{ width: 168, height: 230, borderRadius: 18, background: "rgba(255,255,255,0.05)",
              border: `2px solid ${i % 2 ? GREEN : GOLD}`, display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 12, opacity: s, transform: `scale(${0.6 + s * 0.4})` }}>
              <div style={{ fontSize: 60, fontWeight: 800, color: i % 2 ? GREEN : GOLD }}>{i + 1}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "#eaf0fb", textAlign: "center" }}>{nm}</div>
            </div>
          );
        })}
      </div>
    </NavyBase>
  );
};

// pattern scene wrapper
const Pattern: React.FC<{ f: number; n: number; title: string; cands: C[]; highlight: number[];
  tag: string; tagIdx: number; ghost?: boolean }> = ({ f, n, title, cands, highlight, tag, tagIdx, ghost }) => {
  const mY = mkMapY(cands); const tx = mapX(tagIdx, cands.length);
  return (
    <NavyBase>
      {ghost && <ChuonChuonGhost f={f} delay={F(2.0)} dur={F(2.2)} />}
      <SetupHeader f={f} n={n} title={title} />
      <ChartHolder>
        <CandleSeq cands={cands} f={f} startF={F(0.6)} stepF={2.0} highlight={highlight} />
        <Tag x={tx} y={mY(Math.min(...cands.map((c) => c.lo))) + 70} f={f} delay={F(2.4)} text={tag} bg={GOLD} />
      </ChartHolder>
    </NavyBase>
  );
};

// s12 nến đẹp chưa phải mua
const SceneWarn: React.FC<{ f: number }> = ({ f }) => {
  const cands = [...down(60, 3, 6), { o: 42, c: 44, hi: 45, lo: 35 }];
  return (
    <NavyBase>
      <ChartHolder><CandleSeq cands={cands} f={f} startF={2} stepF={2} highlight={[3]} /></ChartHolder>
      <div style={{ ...popIn(f, F(1.2), 30), position: "absolute", top: 1180, left: 60, right: 60, textAlign: "center",
        fontSize: 60, fontWeight: 800, color: RED, textShadow: "0 4px 18px rgba(0,0,0,.5)" }}>CHƯA PHẢI LỆNH MUA</div>
    </NavyBase>
  );
};

// s13 chờ xác nhận + ghost chuồn chuồn
const SceneConfirm: React.FC<{ f: number }> = ({ f }) => {
  const cands = [...down(60, 3, 6), { o: 42, c: 44, hi: 45, lo: 35 }, ...up(45, 2, 7)];
  return (
    <NavyBase>
      <ChuonChuonGhost f={f} delay={F(0.4)} dur={F(2.4)} />
      <Title f={f} lines={["Vị trí quan trọng hơn hình dạng", "Chờ thêm một cây xác nhận"]} size={48} top={230} />
      <ChartHolder>
        <CandleSeq cands={cands} f={f} startF={F(1.0)} stepF={2} highlight={[5]} />
      </ChartHolder>
      <Tag x={760} y={1180} f={f} delay={F(3.5)} text="Cây xác nhận" bg={GREEN} />
    </NavyBase>
  );
};

// s14 mở biểu đồ tự soi
const SceneApp: React.FC<{ f: number }> = ({ f }) => {
  const cands = [...down(60, 4, 6), { o: 40, c: 42, hi: 43, lo: 33 }, ...up(43, 3, 6)];
  const s = cs(f, 4, { damping: 16, stiffness: 150 });
  return (
    <NavyBase>
      <Title f={f} lines={["Mở biểu đồ, tự soi", "cây nến gần nhất"]} size={58} top={220} />
      <div style={{ position: "absolute", top: 560, left: "50%", transform: `translateX(-50%) scale(${0.92 + s * 0.08})`,
        width: 760, height: 660, borderRadius: 40, background: "rgba(255,255,255,0.04)", border: "3px solid rgba(255,255,255,0.18)",
        boxShadow: "0 20px 55px rgba(0,0,0,.5)", overflow: "hidden", opacity: s }}>
        <svg width={760} height={620} viewBox="0 0 1000 900" style={{ overflow: "visible", marginTop: 20 }}>
          {(() => { const mY = mkMapY(cands); const bw = ((CH.x1 - CH.x0) / cands.length) * 0.6;
            return cands.map((cd, i) => { const g = Math.max(0, Math.min(1, spring({ frame: f - F(0.8) - i * 2, fps, config: { damping: 14, stiffness: 220 } })));
              if (g <= 0.001) return null; const x = mapX(i, cands.length), up2 = cd.c >= cd.o, col = up2 ? GREEN : RED;
              const yO = mY(cd.o), yC = mY(cd.c); return (<g key={i}><line x1={x} x2={x} y1={mY(cd.hi)} y2={mY(cd.lo)} stroke={col} strokeWidth={4} /><rect x={x - bw / 2} y={Math.min(yO, yC)} width={bw} height={Math.max(5, Math.abs(yC - yO)) * g} rx={3} fill={col} /></g>); }); })()}
        </svg>
      </div>
      {f > F(3.5) && (
        <div style={{ position: "absolute", top: 1000, left: 600, fontSize: 80, transform: `rotate(-20deg)`, opacity: cs(f, F(3.5)) }}>👆</div>
      )}
    </NavyBase>
  );
};

// s15 follow
const SceneCTA: React.FC<{ f: number }> = ({ f }) => {
  const fb = cs(f, 14, { damping: 11, stiffness: 220 });
  return (
    <NavyBase>
      <div style={{ ...popIn(f, 0), position: "absolute", top: 480, left: 60, right: 60, textAlign: "center",
        fontSize: 60, fontWeight: 800, lineHeight: 1.2, color: "#fff" }}>
        Đọc điềm của<br />thị trường
      </div>
      <div style={{ position: "absolute", top: 820, left: "50%", transform: `translateX(-50%) scale(${0.6 + fb * 0.4})`,
        opacity: fb, background: GREEN, color: "#0a1628", fontSize: 46, fontWeight: 800, padding: "22px 60px",
        borderRadius: 44, whiteSpace: "nowrap", boxShadow: "0 10px 30px rgba(52,211,153,.5)" }}>Follow để xem tiếp</div>
      <div style={{ ...popIn(f, 26, 24), position: "absolute", top: 1080, left: 60, right: 60, textAlign: "center",
        fontFamily: FF, fontWeight: 800, fontSize: 52, color: TITLEC, letterSpacing: 1,
        textShadow: "0 4px 20px rgba(0,0,0,.5)", whiteSpace: "nowrap" }}>Chứng khoán trong tầm tay</div>
    </NavyBase>
  );
};

// ---------- candle data for 5 patterns ----------
const HAMMER: C[] = [...down(80, 4, 6), { o: 56, c: 57, hi: 58, lo: 45 }, ...up(57, 3, 6)];
const ENGULF: C[] = [...down(80, 4, 6), { o: 58, c: 55, hi: 59, lo: 54 }, { o: 54, c: 64, hi: 65, lo: 53 }, ...up(64, 2, 6)];
const MORNING: C[] = [...down(82, 3, 6), { o: 66, c: 60, hi: 67, lo: 59 }, { o: 57, c: 56, hi: 58, lo: 55 }, { o: 58, c: 68, hi: 69, lo: 57 }, ...up(68, 2, 6)];
const DOJI: C[] = [...down(80, 4, 6), { o: 56.5, c: 56, hi: 57.5, lo: 45 }, ...up(57, 3, 6)];
const PIERCE: C[] = [...down(82, 3, 6), { o: 70, c: 60, hi: 71, lo: 59 }, { o: 58, c: 66, hi: 67, lo: 57 }, ...up(66, 2, 6)];

// ---------- SFX layer ----------
type Sfx = { f: number; src: string; v: number; d: number };
const PATTERNS: { id: string; cands: C[]; hi: number[] }[] = [
  { id: "s07", cands: HAMMER, hi: [4] }, { id: "s08", cands: ENGULF, hi: [4, 5] },
  { id: "s09", cands: MORNING, hi: [3, 4, 5] }, { id: "s10", cands: DOJI, hi: [4] },
  { id: "s11", cands: PIERCE, hi: [3, 4] },
];
const SFX_EVENTS: Sfx[] = (() => {
  const ev: Sfx[] = [];
  // morph whoosh
  ev.push({ f: F(ss("s04")) + F(1.6), src: "whoosh.mp3", v: 0.3, d: 17 });
  // s06 năm ô pop
  for (let i = 0; i < 5; i++) ev.push({ f: F(ss("s06")) + F(2.0) + i * 6, src: "pop.mp3", v: 0.22, d: 3 });
  // pattern candle clicks + ting on highlight reveal
  for (const p of PATTERNS) {
    const base = F(ss(p.id)) + F(0.6);
    p.cands.forEach((_, i) => ev.push({ f: base + Math.round(i * 2.0), src: "click.mp3", v: 0.15, d: 2 }));
    const hiF = base + Math.round(Math.max(...p.hi) * 2.0) + 2;
    ev.push({ f: hiF, src: "ting.mp3", v: 0.32, d: 11 });
  }
  // s14 app tap
  ev.push({ f: F(ss("s14")) + F(0.8), src: "click.mp3", v: 0.2, d: 2 });
  // s15 follow pop
  ev.push({ f: F(ss("s15")) + 14, src: "pop.mp3", v: 0.28, d: 3 });
  // SFX phủ các màn còn lại (mọi màn đều có âm — L8)
  ev.push({ f: F(ss("s01")) + 3, src: "whoosh.mp3", v: 0.14, d: 17 });   // hook chuồn chuồn vào
  ev.push({ f: F(ss("s02")) + 3, src: "whoosh.mp3", v: 0.14, d: 17 });   // hook ráng mỡ gà (gió)
  ev.push({ f: F(ss("s03")) + 30, src: "pop.mp3", v: 0.2, d: 3 });        // omen icon 1
  ev.push({ f: F(ss("s03")) + 70, src: "pop.mp3", v: 0.2, d: 3 });        // omen icon 2
  ev.push({ f: F(ss("s05")) + 40, src: "pop.mp3", v: 0.18, d: 3 });       // đáy gần kề hiện
  ev.push({ f: F(ss("s12")) + F(1.2), src: "click.mp3", v: 0.24, d: 2 }); // "chưa phải lệnh mua" snap
  ev.push({ f: F(ss("s13")) + F(3.5), src: "ting.mp3", v: 0.26, d: 11 }); // cây xác nhận
  return ev;
})();
const SfxLayer: React.FC = () => (
  <>
    {SFX_EVENTS.map((e, i) => (
      <Sequence key={i} from={e.f} durationInFrames={e.d + 2}>
        <Audio src={staticFile(e.src)} volume={e.v} />
      </Sequence>
    ))}
  </>
);

// ---------- subtitle karaoke ----------
type Chunk = { cstart: number; cend: number; words: { w: string; t: number }[] };
const ALL: Chunk[] = (data.sentences as any[]).flatMap((s) => s.chunks);
const li = (a: number, b: number, p: number) => Math.round(a + (b - a) * p);
const Subtitle: React.FC = () => {
  const f = useCurrentFrame(); const t = f / fps;
  let act: Chunk | null = null;
  for (const c of ALL) { if (t >= c.cstart - 0.05 && t < c.cend) { act = c; break; } }
  if (!act) return null;
  const chars = act.words.reduce((a, w) => a + w.w.length + 1, 0);
  const fontSize = Math.max(34, Math.min(46, Math.floor(1000 / (chars * 0.52))));
  const op = interpolate(t, [act.cstart - 0.03, act.cstart + 0.12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
      <div style={{ position: "absolute", top: SAFE_ZONE.subtitleTop, left: 50, right: 50, textAlign: "center",
        fontFamily: FF, fontSize, fontWeight: 800, whiteSpace: "nowrap", opacity: op, textShadow: "0 3px 16px rgba(0,0,0,.7)" }}>
        {act.words.map((w, i) => {
          const lit = interpolate(t, [w.t, w.t + 0.13], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const r = li(150, 245, lit), g = li(180, 220, lit), b = li(220, 90, lit);
          return <span key={i} style={{ color: `rgb(${r},${g},${b})`, opacity: 0.55 + 0.45 * lit }}>{w.w}{" "}</span>;
        })}
      </div>
    </AbsoluteFill>
  );
};

const BrandOverlay: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 360,
      background: "linear-gradient(180deg, rgba(123,58,236,0.34) 0%, rgba(123,58,236,0.1) 55%, rgba(123,58,236,0) 100%)" }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 440,
      background: "linear-gradient(0deg, rgba(123,58,236,0.42) 0%, rgba(123,58,236,0.13) 52%, rgba(123,58,236,0) 100%)" }} />
  </AbsoluteFill>
);
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

const SCENES: { a: string; b: string | null; el: (f: number) => React.ReactNode }[] = [
  { a: "s01", b: "s02", el: (f) => <HeroImage f={f} src="chuon-chuon.png" title={["Ông bà xem trời", "đoán mưa nắng"]} /> },
  { a: "s02", b: "s03", el: (f) => <HeroImage f={f} src="rang-mo-ga.png" title={["Ráng mỡ gà,", "có nhà thì giữ"]} /> },
  { a: "s03", b: "s04", el: (f) => <SceneOmen f={f} /> },
  { a: "s04", b: "s05", el: (f) => <SceneMorph f={f} /> },
  { a: "s05", b: "s06", el: (f) => <SceneTwoWays f={f} /> },
  { a: "s06", b: "s07", el: (f) => <SceneFive f={f} /> },
  { a: "s07", b: "s08", el: (f) => <Pattern f={f} n={1} title="NẾN BÚA" cands={HAMMER} highlight={[4]} tag="Bóng dưới dài" tagIdx={4} /> },
  { a: "s08", b: "s09", el: (f) => <Pattern f={f} n={2} title="NHẤN CHÌM TĂNG" cands={ENGULF} highlight={[4, 5]} tag="Nuốt trọn cây đỏ" tagIdx={5} /> },
  { a: "s09", b: "s10", el: (f) => <Pattern f={f} n={3} title="SAO MAI" cands={MORNING} highlight={[3, 4, 5]} tag="Cân bằng chặn đà" tagIdx={4} /> },
  { a: "s10", b: "s11", el: (f) => <Pattern f={f} n={4} title="DOJI CHUỒN CHUỒN" cands={DOJI} highlight={[4]} tag="Bất phân thắng bại" tagIdx={4} ghost /> },
  { a: "s11", b: "s12", el: (f) => <Pattern f={f} n={5} title="NẾN XUYÊN THẤU" cands={PIERCE} highlight={[3, 4]} tag="Phản công rõ rệt" tagIdx={4} /> },
  { a: "s12", b: "s13", el: (f) => <SceneWarn f={f} /> },
  { a: "s13", b: "s14", el: (f) => <SceneConfirm f={f} /> },
  { a: "s14", b: "s15", el: (f) => <SceneApp f={f} /> },
  { a: "s15", b: null, el: (f) => <SceneCTA f={f} /> },
];

export const Main: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1628" }}>
      <Audio src={staticFile("voice_full.mp3")} />
      <SfxLayer />
      {SCENES.map((g, i) => {
        const from = F(ss(g.a)); const to = g.b ? F(ss(g.b)) : durationInFrames;
        if (f < from - 1 || f >= to) return null;
        const local = f - from;
        const fade = interpolate(f, [from, from + 6, to - 6, to], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return <AbsoluteFill key={i} style={{ opacity: fade }}>{g.el(local)}</AbsoluteFill>;
      })}
      <BrandOverlay />
      <Subtitle />
      <Progress />
    </AbsoluteFill>
  );
};
