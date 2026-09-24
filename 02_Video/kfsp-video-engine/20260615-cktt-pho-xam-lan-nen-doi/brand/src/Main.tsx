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
const BUILD: string = (data as any).build || "nobrand";
const SEPIA = "#1c1206";

const sentStart: Record<string, number> = Object.fromEntries(data.sentences.map((s: any) => [s.id, s.start]));
const has = (id: string) => id in sentStart;
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
const CandleSeq: React.FC<{
  cands: C[]; f: number; startF: number; stepF?: number; highlight?: number[]; glowIdx?: number[];
}> = ({ cands, f, startF, stepF = 2.4, highlight = [], glowIdx = [] }) => {
  const n = cands.length; const mapY = mkMapY(cands);
  const bw = ((CH.x1 - CH.x0) / n) * 0.6;
  return (
    <svg width={1000} viewBox="0 0 1000 900" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      {cands.map((cd, i) => {
        const local = f - startF - i * stepF;
        const g = Math.max(0, Math.min(1, spring({ frame: local, fps, config: { damping: 14, stiffness: 220 } })));
        if (g <= 0.001) return null;
        const x = mapX(i, n), upC = cd.c >= cd.o, col = upC ? GREEN : RED;
        const yO = mapY(cd.o), yC = mapY(cd.c), yHi = mapY(cd.hi), yLo = mapY(cd.lo);
        const top = Math.min(yO, yC), bot = Math.max(yO, yC);
        const fullH = Math.max(5, bot - top), h = fullH * g, cy = (top + bot) / 2;
        const isHi = highlight.includes(i), isGlow = glowIdx.includes(i);
        return (
          <g key={i} style={isGlow ? { filter: `drop-shadow(0 0 16px ${GREEN})` } : undefined}>
            <line x1={x} x2={x} y1={lerp(cy, yHi, g)} y2={lerp(cy, yLo, g)} stroke={col} strokeWidth={4} />
            <rect x={x - bw / 2} y={cy - h / 2} width={bw} height={h} rx={3} fill={col}
              stroke={isHi ? GOLD : "none"} strokeWidth={isHi ? 4 : 0} />
          </g>
        );
      })}
    </svg>
  );
};
const down = (start: number, n: number, step = 6): C[] =>
  Array.from({ length: n }, (_, i) => { const o = start - i * step, c = o - step * 0.8; return { o, c, hi: o + 1.6, lo: c - 1.6 }; });
const up = (start: number, n: number, step = 6): C[] =>
  Array.from({ length: n }, (_, i) => { const o = start + i * step, c = o + step * 0.8; return { o, c, hi: c + 1.6, lo: o - 1.6 }; });

// ---------- shared UI ----------
const Title: React.FC<{ f: number; lines: string[]; size?: number; color?: string; top?: number }> =
  ({ f, lines, size = 64, color = "#fff", top = 230 }) => (
    <div style={{ position: "absolute", top, left: 56, right: 56, textAlign: "center" }}>
      {lines.map((l, i) => (
        <div key={i} style={{ ...popIn(f, i * 4, 30), fontFamily: FF, fontWeight: 800, fontSize: size,
          lineHeight: 1.12, color, textShadow: "0 4px 22px rgba(0,0,0,.6)" }}>{l}</div>
      ))}
    </div>
  );
const Tag: React.FC<{ x: number; y: number; f: number; delay: number; text: string; bg: string; fg?: string; glow?: boolean }> =
  ({ x, y, f, delay, text, bg, fg = "#0a1628", glow }) => {
    const s = cs(f, delay, { damping: 13, stiffness: 200 });
    if (s <= 0.01) return null;
    return (
      <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${0.7 + s * 0.3})`,
        opacity: s, background: bg, color: fg, fontFamily: FF, fontWeight: 800, fontSize: 34, padding: "12px 26px",
        borderRadius: 16, whiteSpace: "nowrap", boxShadow: glow ? `0 0 30px ${bg}` : "0 6px 20px rgba(0,0,0,.4)" }}>{text}</div>
    );
  };
const NavyBase: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 34%, #14253f 0%, #0a1628 74%)", fontFamily: FF, color: "#f2f6ff" }}>{children}</AbsoluteFill>
);
const SepiaBase: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <AbsoluteFill style={{ background: dark
    ? "radial-gradient(circle at 50% 40%, #2a1c0a 0%, #0d0803 80%)"
    : "radial-gradient(circle at 50% 38%, #3a2a12 0%, #1c1206 78%)", fontFamily: FF, color: "#f3e7cf" }}>{children}</AbsoluteFill>
);
const ChartHolder: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: 40, right: 40, top: 470, height: 860 }}>{children}</div>
);

// ---------- HOOK scenes (sepia) ----------
const HeroSepia: React.FC<{ f: number; src: string; fallback: string; title: string[]; dark?: boolean }> =
  ({ f, src, fallback, title, dark }) => {
    const sc = interpolate(f, [0, 180], [1.05, 1.15], { extrapolateRight: "extend" });
    return (
      <SepiaBase dark={dark}>
        <Img src={staticFile(src)} onError={(e: any) => { e.currentTarget.src = staticFile(fallback); }}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${sc})`,
            filter: `sepia(0.55) saturate(0.8) brightness(${dark ? 0.5 : 0.82})` }} />
        <AbsoluteFill style={{ background: dark
          ? "linear-gradient(180deg, rgba(10,6,2,.55) 0%, rgba(10,6,2,.2) 40%, rgba(10,6,2,.8) 100%)"
          : "linear-gradient(180deg, rgba(28,18,6,.5) 0%, rgba(28,18,6,0) 35%, rgba(28,18,6,.7) 100%)" }} />
        <Title f={f} lines={title} size={60} color="#fbe7c4" top={250} />
      </SepiaBase>
    );
  };

// s03 — kho tàng trao truyền (ảnh thật, đời trước → đời sau)
const SceneTrao: React.FC<{ f: number }> = ({ f }) => {
  const sc = interpolate(f, [0, 200], [1.06, 1.16], { extrapolateRight: "extend" });
  return (
    <SepiaBase>
      <Img src={staticFile("trao-truyen.png")} onError={(e: any) => { e.currentTarget.src = staticFile("chuon-chuon.png"); }}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${sc})`,
          filter: "sepia(0.55) saturate(0.85) brightness(0.78)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(28,18,6,.55) 0%, rgba(28,18,6,0) 35%, rgba(28,18,6,.72) 100%)" }} />
      <Title f={f} lines={["Kho tàng trực giác", "đổi bằng xương máu"]} size={60} color="#fbe7c4" top={250} />
    </SepiaBase>
  );
};

// s04 — không hỏi sắp mưa, hỏi MỨC ĐỘ
const SceneHoiMucDo: React.FC<{ f: number }> = ({ f }) => {
  const strike = interpolate(f, [F(0.6), F(1.4)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const md = cs(f, F(1.8), { damping: 11, stiffness: 220 });
  return (
    <SepiaBase>
      <div style={{ position: "absolute", top: 560, left: 60, right: 60, textAlign: "center", fontFamily: FF,
        fontWeight: 700, fontSize: 56, color: "#cbb185" }}>
        <span style={{ position: "relative" }}>“Sắp mưa chưa?”
          <span style={{ position: "absolute", left: 0, top: "55%", width: `${strike * 100}%`, height: 5, background: RED }} />
        </span>
      </div>
      <div style={{ position: "absolute", top: 760, left: 60, right: 60, textAlign: "center", fontFamily: FF,
        fontWeight: 800, fontSize: 92, color: GOLD, opacity: md, transform: `scale(${0.7 + md * 0.3})`,
        textShadow: "0 4px 24px rgba(0,0,0,.6)" }}>MỨC ĐỘ?</div>
    </SepiaBase>
  );
};

// s05 — chuồn chuồn 3 độ cao
const SceneChuonChuon: React.FC<{ f: number }> = ({ f }) => {
  const levels = [
    { d: F(1.2), y: 360, lab: "Bay thấp → sắp mưa", col: "#e8c87a" },
    { d: F(2.6), y: 640, lab: "Sát đất → gặt gấp", col: "#e0a85a" },
    { d: F(4.2), y: 940, lab: "Sà mặt ao → khỏi ra đồng", col: "#d98a45" },
  ];
  return (
    <SepiaBase>
      <Img src={staticFile("chuon-chuon.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", opacity: 0.28, filter: "sepia(0.6) brightness(0.6) blur(2px)" }} />
      <Title f={f} lines={["Nhìn chuồn chuồn —", "đọc ĐỘ CAO"]} size={58} color="#fbe7c4" top={200} />
      {levels.map((lv, i) => {
        const s = cs(f, lv.d, { damping: 13, stiffness: 200 });
        if (s <= 0.01) return null;
        return (
          <div key={i} style={{ position: "absolute", top: lv.y, left: 0, right: 0, textAlign: "center",
            opacity: s, transform: `translateY(${(1 - s) * -30}px)` }}>
            <div style={{ fontSize: 70 }}>🪰</div>
            <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 40, color: lv.col, whiteSpace: "nowrap" }}>{lv.lab}</div>
          </div>
        );
      })}
    </SepiaBase>
  );
};

// s06 — kiến 2 mức
const SceneKien: React.FC<{ f: number }> = ({ f }) => {
  const rows = [
    { d: F(1.2), lab: "Lác đác → bình thường", n: 3, col: "#e8c87a" },
    { d: F(2.8), lab: "Tha trứng lên cao → bão lớn", n: 9, col: "#d98a45" },
  ];
  return (
    <SepiaBase>
      <Img src={staticFile("kien.png")} onError={(e: any) => { e.currentTarget.src = staticFile("chuon-chuon.png"); }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          opacity: 0.3, filter: "sepia(0.6) brightness(0.6) blur(2px)" }} />
      <Title f={f} lines={["Nhìn kiến —", "đọc MẬT ĐỘ"]} size={58} color="#fbe7c4" top={220} />
      {rows.map((r, i) => {
        const s = cs(f, r.d, { damping: 13, stiffness: 200 });
        if (s <= 0.01) return null;
        return (
          <div key={i} style={{ position: "absolute", top: 620 + i * 280, left: 60, right: 60, textAlign: "center", opacity: s }}>
            <div style={{ fontSize: 46, letterSpacing: 4 }}>{"🐜".repeat(Math.round(r.n * Math.min(1, s + 0.3) / 1))}</div>
            <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 40, color: r.col, marginTop: 8, whiteSpace: "nowrap" }}>{r.lab}</div>
          </div>
        );
      })}
    </SepiaBase>
  );
};

// s07 — ráng trời gradient
const SceneRang: React.FC<{ f: number }> = ({ f }) => {
  const sweep = interpolate(f, [F(0.6), F(4.0)], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SepiaBase>
      <Img src={staticFile("rang-mo-ga.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", opacity: 0.34, filter: "sepia(0.4) brightness(0.7) blur(1px)" }} />
      <Title f={f} lines={["Trông trời —", "đọc MÀU RÁNG"]} size={58} color="#fbe7c4" top={210} />
      <div style={{ position: "absolute", top: 700, left: 80, right: 80, height: 120, borderRadius: 20, overflow: "hidden",
        background: "linear-gradient(90deg, #3b82f6 0%, #93c5fd 35%, #fde68a 70%, #f59e0b 100%)",
        boxShadow: "0 10px 30px rgba(0,0,0,.5)" }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${sweep}%`, width: 4, background: "#fff" }} />
      </div>
      <div style={{ position: "absolute", top: 850, left: 90, fontWeight: 800, fontSize: 34, color: "#93c5fd" }}>Trong xanh: yên tâm</div>
      <div style={{ position: "absolute", top: 850, right: 90, fontWeight: 800, fontSize: 34, color: "#f59e0b", ...popIn(f, F(3.2), 16) }}>Ráng mỡ gà: gia cố</div>
    </SepiaBase>
  );
};

// s08 — 3 icon hội tụ
const SceneHoiTu: React.FC<{ f: number }> = ({ f }) => {
  const icons = ["🪰", "🐜", "🌅"];
  return (
    <SepiaBase>
      <Title f={f} lines={["Không công nghệ —", "chỉ có bài học từ tổn thất"]} size={52} color="#fbe7c4" top={300} />
      <div style={{ position: "absolute", top: 760, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 50 }}>
        {icons.map((ic, i) => {
          const conv = interpolate(f, [F(1.0), F(2.4)], [(i - 1) * 90, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return <div key={i} style={{ fontSize: 96, transform: `translateX(${conv}px)`, opacity: cs(f, 4 + i * 3) }}>{ic}</div>;
        })}
      </div>
    </SepiaBase>
  );
};

// s09 — KEY 1: cùng dấu hiệu, khác mức độ, khác hành động
const SceneKey1: React.FC<{ f: number }> = ({ f }) => {
  const parts = [{ t: "Cùng một dấu hiệu", c: "#f3e7cf", d: F(0.2) }, { t: "Khác MỨC ĐỘ", c: GOLD, d: F(1.0) }, { t: "Khác HÀNH ĐỘNG", c: GREEN, d: F(1.8) }];
  return (
    <SepiaBase>
      {parts.map((p, i) => (
        <div key={i} style={{ position: "absolute", top: 560 + i * 180, left: 60, right: 60, textAlign: "center",
          ...popIn(f, p.d, 36), fontFamily: FF, fontWeight: 800, fontSize: i === 0 ? 56 : 76, color: p.c,
          textShadow: "0 4px 22px rgba(0,0,0,.6)" }}>{p.t}</div>
      ))}
    </SepiaBase>
  );
};

// ---------- BRIDGE (navy) ----------
const NameChip: React.FC<{ f: number; delay: number; text: string; x: number; y: number }> = ({ f, delay, text, x, y }) => {
  const s = cs(f, delay, { damping: 12, stiffness: 200 });
  if (s <= 0.01) return null;
  return <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${0.6 + s * 0.4})`, opacity: s,
    background: "rgba(123,58,236,0.25)", border: `2px solid ${TITLEC}`, color: "#fff", fontFamily: FF, fontWeight: 800,
    fontSize: 40, padding: "16px 30px", borderRadius: 18, whiteSpace: "nowrap" }}>{text}</div>;
};
const SceneBridgeNames: React.FC<{ f: number }> = ({ f }) => (
  <NavyBase>
    <Title f={f} lines={["Biểu đồ nến", "cũng vậy"]} size={62} color={TITLEC} top={230} />
    {[["Phản công", F(2.0)], ["Xuyên thấu", F(2.7)], ["Nhấn chìm", F(3.4)], ["Đáy nhíp", F(4.1)]].map(([t, d], i) => (
      <NameChip key={i} f={f} delay={d as number} text={t as string} x={i % 2 ? 720 : 360} y={640 + Math.floor(i / 2) * 180} />
    ))}
  </NavyBase>
);
const SceneCapNenHoi: React.FC<{ f: number }> = ({ f }) => {
  const cands = [...down(70, 2, 6), { o: 50, c: 46, hi: 51, lo: 45 }, { o: 46, c: 53, hi: 54, lo: 45 }];
  const q = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <NavyBase>
      <Title f={f} lines={["Mở chart, thấy cặp nến —", "vẫn hỏi: đáng tin không?"]} size={50} top={230} />
      <ChartHolder><CandleSeq cands={cands} f={f} startF={6} stepF={3} /></ChartHolder>
      <div style={{ position: "absolute", top: 820, left: "50%", transform: "translateX(-50%)", fontSize: 150,
        fontWeight: 800, color: GOLD, opacity: q }}>?</div>
    </NavyBase>
  );
};
const SceneGhostChuon: React.FC<{ f: number }> = ({ f }) => {
  const op = interpolate(f, [F(1.0), F(2.0), F(3.4), F(4.4)], [0, 0.22, 0.22, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cands = [...down(70, 2, 6), { o: 50, c: 46, hi: 51, lo: 45 }, { o: 46, c: 53, hi: 54, lo: 45 }];
  return (
    <NavyBase>
      {/* ghost chuồn chuồn full nền — atmosphere, không phải ô ảnh */}
      <Img src={staticFile("chuon-chuon.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", opacity: op, filter: "sepia(0.7) brightness(0.7) blur(6px)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, rgba(10,22,40,.55), rgba(10,22,40,.85))" }} />
      <Title f={f} lines={["Bạn hỏi “chuồn chuồn loài gì?”", "— chưa hỏi “bay cao bao nhiêu?”"]} size={44} top={220} />
      <ChartHolder><CandleSeq cands={cands} f={f} startF={4} stepF={3} /></ChartHolder>
    </NavyBase>
  );
};
const SceneDoXamLan: React.FC<{ f: number }> = ({ f }) => {
  const cands = [...down(80, 3, 5), { o: 64, c: 56, hi: 65, lo: 55 }, { o: 50, c: 60, hi: 61, lo: 49 }];
  const mY = mkMapY(cands); const arrow = interpolate(f, [F(1.4), F(2.6)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const yTop = mY(64), yArr = lerp(mY(56), mY(60), arrow);
  const gx = mapX(4, cands.length);
  return (
    <NavyBase>
      <Title f={f} lines={["Câu hỏi đúng:", "xâm lấn được BAO SÂU?"]} size={52} color={TITLEC} top={210} />
      <ChartHolder>
        <CandleSeq cands={cands} f={f} startF={2} stepF={2.2} />
        <svg width={1000} viewBox="0 0 1000 900" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <line x1={CH.x0} x2={CH.x1} y1={yTop} y2={yTop} stroke={GOLD} strokeWidth={2} strokeDasharray="10 8" opacity={0.8} />
          <line x1={gx + 70} x2={gx + 70} y1={yTop} y2={yArr} stroke={GOLD} strokeWidth={5} markerEnd="url(#a)" />
          <defs><marker id="a" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill={GOLD} /></marker></defs>
        </svg>
      </ChartHolder>
    </NavyBase>
  );
};
const SceneKey2: React.FC<{ f: number }> = ({ f }) => {
  const s = cs(f, F(0.6), { damping: 11, stiffness: 200 });
  return (
    <NavyBase>
      <div style={{ position: "absolute", top: 640, left: 50, right: 50, textAlign: "center", fontFamily: FF, fontWeight: 800,
        fontSize: 70, lineHeight: 1.18, color: "#fff", opacity: s, transform: `scale(${0.8 + s * 0.2})`, textShadow: "0 4px 26px rgba(0,0,0,.6)" }}>
        XÂM LẤN CÀNG SÂU<br /><span style={{ color: GREEN }}>SỨC MẠNH CÀNG LỚN</span>
      </div>
    </NavyBase>
  );
};
const SceneTitle4: React.FC<{ f: number }> = ({ f }) => (
  <NavyBase>
    <div style={{ position: "absolute", top: 760, left: 50, right: 50, textAlign: "center", ...popIn(f, 2, 40),
      fontFamily: FF, fontWeight: 800, fontSize: 92, color: TITLEC, textShadow: "0 6px 30px rgba(123,58,236,.5)" }}>
      4 MỨC<br />XÂM LẤN</div>
  </NavyBase>
);

// ---------- 4 PATTERN scenes (đúng mức xâm lấn) ----------
const LEAD = down(80, 3, 5);
const PHANCONG: C[] = [...LEAD, { o: 64, c: 58, hi: 65, lo: 57 }, { o: 48, c: 58, hi: 58.5, lo: 47 }];
const XUYENTHAU: C[] = [...LEAD, { o: 64, c: 56, hi: 65, lo: 55 }, { o: 50, c: 61, hi: 61.5, lo: 49 }];
const NHANCHIM: C[] = [...LEAD, { o: 62, c: 57, hi: 63, lo: 56 }, { o: 55.5, c: 64, hi: 64.5, lo: 55 }];
const DAYNHIP: C[] = [...LEAD, { o: 64, c: 58, hi: 65, lo: 52 }, { o: 58, c: 63, hi: 64, lo: 52 }];
const RI = LEAD.length, GI = LEAD.length + 1; // red idx, green idx

type Anno = "equal" | "mid" | "engulf" | "tweezer";
const PatternScene: React.FC<{ f: number; n: number; title: string; cands: C[]; anno: Anno; annoY: number;
  zoneLabel: string; zoneColor: string; zoneFg?: string; zoneDelayId: string; baseId: string; glow?: boolean }> =
  ({ f, n, title, cands, anno, annoY, zoneLabel, zoneColor, zoneFg = "#0a1628", zoneDelayId, baseId, glow }) => {
    const mY = mkMapY(cands); const y = mY(annoY);
    const rx = mapX(RI, cands.length), gx = mapX(GI, cands.length);
    const zoneLocal = F(ss(zoneDelayId) - ss(baseId));
    return (
      <NavyBase>
        <div style={{ position: "absolute", top: 220, left: 70, right: 56, display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ width: 84, height: 84, borderRadius: "50%", background: GOLD, color: "#17192b", fontFamily: FF,
            fontWeight: 800, fontSize: 46, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            ...{ opacity: cs(f, 2), transform: `scale(${0.5 + cs(f, 2) * 0.5})` } }}>{n}</div>
          <div style={{ ...popIn(f, 5, 20), fontFamily: FF, fontWeight: 800, fontSize: 56, color: TITLEC }}>{title}</div>
        </div>
        <ChartHolder>
          <CandleSeq cands={cands} f={f} startF={F(0.6)} stepF={2.0} highlight={[GI]} glowIdx={glow ? [GI] : []} />
          <svg width={1000} viewBox="0 0 1000 900" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
            {(anno === "equal" || anno === "mid") && f > F(1.6) && (
              <line x1={rx - 50} x2={gx + 50} y1={y} y2={y} stroke={GOLD} strokeWidth={3} strokeDasharray="10 8" opacity={0.9} />
            )}
            {anno === "tweezer" && f > F(1.6) && (<>
              <line x1={rx - 60} x2={gx + 60} y1={y} y2={y} stroke={GOLD} strokeWidth={3} strokeDasharray="10 8" opacity={0.95} />
              <path d={`M ${rx - 60} ${y + 26} L ${rx - 60} ${y} L ${gx + 60} ${y} L ${gx + 60} ${y + 26}`} fill="none" stroke={GOLD} strokeWidth={3} opacity={0.9} />
            </>)}
          </svg>
        </ChartHolder>
        <div style={{ position: "absolute", top: 1300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <Tag x={540} y={0} f={f} delay={zoneLocal + 4} text={zoneLabel} bg={zoneColor} fg={zoneFg} glow={glow} />
        </div>
      </NavyBase>
    );
  };

// ---------- EXTRA + CTA ----------
const SceneExtra: React.FC<{ f: number }> = ({ f }) => {
  // nến xanh mọc TỪ DƯỚI nến đỏ, chạy lên BAO PHỦ TRỌN nến đỏ (engulf)
  const gp = Math.max(0, Math.min(1, spring({ frame: f - F(0.9), fps, config: { damping: 18, stiffness: 120 } })));
  const vol = interpolate(f, [F(2.8), F(4.4)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cx = 540;                          // cùng trục → xanh phủ lên đỏ
  const redW = 150, redTop = 540, redH = 150, redBot = redTop + redH; // nến đỏ ngắn, đưa lên cao
  const greenW = 210, greenBot = 980;      // đáy nến xanh cố định dưới đáy đỏ
  const greenFullTop = 430;                // đỉnh xanh cuối cùng (cao hơn đỉnh đỏ → phủ trọn)
  const greenTop = greenBot - (greenBot - greenFullTop) * gp;
  const greenH = greenBot - greenTop;
  return (
    <NavyBase>
      <Title f={f} lines={["Nến thứ hai càng DÀI", "khối lượng ủng hộ → mạnh hơn"]} size={48} top={240} />
      {/* nến đỏ (vẽ trước, bị xanh phủ dần) */}
      <div style={{ position: "absolute", left: cx - 2, top: redTop - 60, width: 4, height: redH + 120, background: RED }} />
      <div style={{ position: "absolute", left: cx - redW / 2, top: redTop, width: redW, height: redH, background: RED, borderRadius: 8 }} />
      {/* nến xanh mọc lên phủ trọn (glow) */}
      <div style={{ position: "absolute", left: cx - 3, top: greenTop - 36, width: 6, height: greenH + 72, background: GREEN, opacity: gp }} />
      <div style={{ position: "absolute", left: cx - greenW / 2, top: greenTop, width: greenW, height: greenH,
        background: GREEN, borderRadius: 10, filter: `drop-shadow(0 0 20px ${GREEN})` }} />
      {/* volume bars dưới — cây cuối cao + xanh */}
      <div style={{ position: "absolute", top: 1150, left: 170, right: 170, height: 120, display: "flex", alignItems: "flex-end", gap: 18 }}>
        {[0.3, 0.45, 0.4, 0.6, 1.0].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h * 100 * (i === 4 ? vol : 1)}%`,
            background: i === 4 ? GREEN : "rgba(255,255,255,0.22)", borderRadius: 8,
            ...(i === 4 ? { filter: `drop-shadow(0 0 12px ${GREEN})` } : {}) }} />
        ))}
      </div>
    </NavyBase>
  );
};
const SceneCTAhoi: React.FC<{ f: number }> = ({ f }) => (
  <NavyBase>
    <Title f={f} lines={["Thay vì học thuộc tên —", "hãy đặt câu hỏi"]} size={54} top={260} />
    {[{ t: "Ăn vào cây đỏ bao nhiêu %?", d: F(1.6), c: GREEN }, { t: "Hai cây chạm cùng một đáy?", d: F(3.2), c: GOLD }].map((q, i) => (
      <div key={i} style={{ position: "absolute", top: 640 + i * 200, left: 70, right: 70, textAlign: "center",
        ...popIn(f, q.d, 30), fontFamily: FF, fontWeight: 800, fontSize: 48, color: q.c,
        background: "rgba(255,255,255,0.05)", border: `2px solid ${q.c}`, borderRadius: 20, padding: "24px 20px" }}>{q.t}</div>
    ))}
  </NavyBase>
);
const SceneCTAclose: React.FC<{ f: number }> = ({ f }) => {
  const glow = interpolate(f, [0, 40], [0.1, 0.5], { extrapolateRight: "clamp" });
  return (
    <NavyBase>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 45%, rgba(52,211,153,${glow * 0.2}), transparent 60%)` }} />
      <div style={{ position: "absolute", top: 740, left: 60, right: 60, textAlign: "center", ...popIn(f, 2, 30),
        fontFamily: FF, fontWeight: 800, fontSize: 60, lineHeight: 1.25, color: "#fff" }}>
        Tự đọc được <span style={{ color: GREEN }}>lực</span><br />của từng mẫu nến</div>
    </NavyBase>
  );
};
// CTA cuối CHUNG cho cả 2 build (mẫu chốt từ video "3 câu hỏi siêu cổ phiếu" 07/06).
// Brand tự có logo+KFSP ở top qua <BrandLogo/>. Lưu bản tái dùng: _shared/remotion/CtaFinal.tsx
const SceneCTAFinal: React.FC<{ f: number }> = ({ f }) => {
  const fb = cs(f, 18, { damping: 11, stiffness: 220 });
  return (
    <NavyBase>
      <div style={{ position: "absolute", top: 430, left: 60, right: 60, textAlign: "center" }}>
        <div style={{ ...popIn(f, 0), fontFamily: FF, fontSize: 60, fontWeight: 800, lineHeight: 1.2, color: "#fff" }}>Mỗi ngày thêm<br />một mẹo giao dịch</div>
        <div style={{ ...popIn(f, 10), marginTop: 36, fontFamily: FF, fontSize: 64, fontWeight: 800, lineHeight: 1.18, color: TITLEC }}>Chứng khoán<br />trong tầm tay bạn</div>
      </div>
      <div style={{ position: "absolute", top: 1180, left: "50%", transform: `translateX(-50%) scale(${0.6 + fb * 0.4})`,
        opacity: fb, background: PUR, color: "#fff", fontFamily: FF, fontSize: 44, fontWeight: 800, padding: "22px 56px",
        borderRadius: 44, whiteSpace: "nowrap", textAlign: "center",
        boxShadow: "0 0 50px rgba(123,58,236,.7), 0 12px 34px rgba(123,58,236,.55)" }}>Theo dõi mình nha</div>
    </NavyBase>
  );
};

// ---------- SFX ----------
type Sfx = { f: number; src: string; v: number; d: number };
const SFX: Sfx[] = (() => {
  const ev: Sfx[] = [];
  const at = (id: string, off: number, src: string, v: number, d = 4) => { if (has(id)) ev.push({ f: F(ss(id)) + off, src, v, d }); };
  at("s01", 3, "whoosh.mp3", 0.14, 17); at("s02", 3, "whoosh.mp3", 0.14, 17);
  at("s03", F(0.5), "ting.mp3", 0.22, 11);
  at("s04", F(1.8), "pop.mp3", 0.26, 3);
  at("s05", F(1.2), "pop.mp3", 0.2); at("s05", F(2.6), "pop.mp3", 0.2); at("s05", F(4.2), "pop.mp3", 0.2);
  at("s06", F(1.2), "pop.mp3", 0.2); at("s06", F(2.8), "pop.mp3", 0.22);
  at("s07", F(0.6), "whoosh.mp3", 0.16, 17); at("s07", F(3.2), "pop.mp3", 0.2);
  at("s08", F(1.0), "whoosh.mp3", 0.16, 17);
  at("s09", F(0.2), "ting.mp3", 0.18); at("s09", F(1.0), "ting.mp3", 0.2); at("s09", F(1.8), "ting.mp3", 0.26, 11);
  at("s10", 2, "whoosh.mp3", 0.3, 17);
  at("s10", F(2.0), "pop.mp3", 0.2); at("s10", F(2.7), "pop.mp3", 0.2); at("s10", F(3.4), "pop.mp3", 0.2); at("s10", F(4.1), "pop.mp3", 0.2);
  at("s11", F(0.4), "click.mp3", 0.16);
  at("s12", F(1.0), "pop.mp3", 0.18);
  at("s13", F(1.4), "click.mp3", 0.22);
  at("s14", F(0.6), "ting.mp3", 0.3, 11);
  at("s15", 2, "whoosh.mp3", 0.24, 17);
  for (const [bid, vid] of [["s16", "s17"], ["s18", "s19"], ["s20", "s21"], ["s22", "s23"]]) {
    const base = F(ss(bid)) + F(0.6);
    for (let i = 0; i < 5; i++) ev.push({ f: base + i * 2, src: "click.mp3", v: 0.14, d: 2 });
    ev.push({ f: base + 10, src: "ting.mp3", v: 0.3, d: 11 });
    at(vid, 4, "pop.mp3", 0.24);
  }
  at("s24", F(0.6), "whoosh.mp3", 0.16, 17); at("s24", F(3.0), "pop.mp3", 0.2);
  at("s25", F(1.6), "pop.mp3", 0.24); at("s25", F(3.2), "pop.mp3", 0.24);
  at("s26", F(0.4), "ting.mp3", 0.24, 11);
  at("s27A", F(0.3), "ting.mp3", 0.3, 11);
  at("s27B", 8, "pop.mp3", 0.28); at("s28B", F(0.2), "ting.mp3", 0.26, 11);
  return ev;
})();
const SfxLayer: React.FC = () => (<>{SFX.map((e, i) => (
  <Sequence key={i} from={Math.max(0, e.f)} durationInFrames={e.d + 2}><Audio src={staticFile(e.src)} volume={e.v} /></Sequence>
))}</>);

// ---------- subtitle ----------
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
        fontFamily: FF, fontSize, fontWeight: 800, whiteSpace: "nowrap", opacity: op, textShadow: "0 3px 16px rgba(0,0,0,.8)" }}>
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
const BrandLogo: React.FC = () => {
  if (BUILD !== "brand") return null;
  return (
    <div style={{ position: "absolute", top: 44, left: "50%", transform: "translateX(-50%)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <Img src={staticFile("logo-kfsp.png")} style={{ width: 104,
        filter: "brightness(0) invert(1) drop-shadow(0 4px 12px rgba(0,0,0,.5))" }} />
      <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 30, letterSpacing: 3, color: "#fff",
        textShadow: "0 2px 10px rgba(0,0,0,.6)" }}>KFSP</div>
    </div>
  );
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

// ---------- scene schedule ----------
type Scene = { a: string; b: string | null; hardIn?: boolean; el: (f: number) => React.ReactNode };
const SCENES: Scene[] = (() => {
  const list: Scene[] = [
    { a: "s01", b: "s02", el: (f) => <HeroSepia f={f} src="que-canh-dong.png" fallback="chuon-chuon.png" title={["Ông bà xưa không có", "dự báo — vẫn chuẩn bị được"]} /> },
    { a: "s02", b: "s03", el: (f) => <HeroSepia f={f} src="dem-lu.png" fallback="chuon-chuon.png" dark title={["Bao mùa trắng tay,", "đêm thức trắng chạy lũ"]} /> },
    { a: "s03", b: "s04", el: (f) => <SceneTrao f={f} /> },
    { a: "s04", b: "s05", el: (f) => <SceneHoiMucDo f={f} /> },
    { a: "s05", b: "s06", el: (f) => <SceneChuonChuon f={f} /> },
    { a: "s06", b: "s07", el: (f) => <SceneKien f={f} /> },
    { a: "s07", b: "s08", el: (f) => <SceneRang f={f} /> },
    { a: "s08", b: "s09", el: (f) => <SceneHoiTu f={f} /> },
    { a: "s09", b: "s10", el: (f) => <SceneKey1 f={f} /> },
    { a: "s10", b: "s11", hardIn: true, el: (f) => <SceneBridgeNames f={f} /> },
    { a: "s11", b: "s12", el: (f) => <SceneCapNenHoi f={f} /> },
    { a: "s12", b: "s13", el: (f) => <SceneGhostChuon f={f} /> },
    { a: "s13", b: "s14", el: (f) => <SceneDoXamLan f={f} /> },
    { a: "s14", b: "s15", el: (f) => <SceneKey2 f={f} /> },
    { a: "s15", b: "s16", el: (f) => <SceneTitle4 f={f} /> },
    { a: "s16", b: "s18", el: (f) => <PatternScene f={f} n={1} title="PHẢN CÔNG" cands={PHANCONG} anno="equal" annoY={58} zoneLabel="VÙNG NGOÀI RÌA" zoneColor="#94a3b8" baseId="s16" zoneDelayId="s17" /> },
    { a: "s18", b: "s20", el: (f) => <PatternScene f={f} n={2} title="XUYÊN THẤU" cands={XUYENTHAU} anno="mid" annoY={60} zoneLabel="VÙNG GIỮA" zoneColor="#fbbf24" baseId="s18" zoneDelayId="s19" /> },
    { a: "s20", b: "s22", el: (f) => <PatternScene f={f} n={3} title="NHẤN CHÌM" cands={NHANCHIM} anno="engulf" annoY={60} zoneLabel="VÙNG ĐẸP" zoneColor={GREEN} baseId="s20" zoneDelayId="s21" glow /> },
    { a: "s22", b: "s24", el: (f) => <PatternScene f={f} n={4} title="ĐÁY NHÍP" cands={DAYNHIP} anno="tweezer" annoY={52} zoneLabel="VÙNG MẠNH NHẤT" zoneColor="#10b981" zoneFg="#fff" baseId="s22" zoneDelayId="s23" glow /> },
    { a: "s24", b: "s25", el: (f) => <SceneExtra f={f} /> },
    { a: "s25", b: "s26", el: (f) => <SceneCTAhoi f={f} /> },
  ];
  if (BUILD === "brand") {
    list.push({ a: "s26", b: "s27A", el: (f) => <SceneCTAclose f={f} /> });
    list.push({ a: "s27A", b: null, el: (f) => <SceneCTAFinal f={f} /> });
  } else {
    list.push({ a: "s26", b: "s27B", el: (f) => <SceneCTAclose f={f} /> });
    list.push({ a: "s27B", b: null, el: (f) => <SceneCTAFinal f={f} /> });
  }
  return list.filter((s) => has(s.a));
})();

export const Main: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1628" }}>
      <Audio src={staticFile("voice_full.mp3")} />
      <SfxLayer />
      {SCENES.map((g, i) => {
        const from = F(ss(g.a)); const to = g.b && has(g.b) ? F(ss(g.b)) : durationInFrames;
        if (f < from - 1 || f >= to) return null;
        const local = f - from;
        const fade = g.hardIn
          ? interpolate(f, [from, to - 6, to], [1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
          : interpolate(f, [from, from + 6, to - 6, to], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return <AbsoluteFill key={i} style={{ opacity: fade }}>{g.el(local)}</AbsoluteFill>;
      })}
      <BrandOverlay />
      <BrandLogo />
      <Subtitle />
      <Progress />
    </AbsoluteFill>
  );
};
