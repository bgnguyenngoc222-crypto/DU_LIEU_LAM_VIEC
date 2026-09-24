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

// Brand purple lấy từ app: kfsp_colors.dart primary=#7B3AEC, primaryLight=#AA75FF
const GREEN = COLORS.green, RED = COLORS.red, GOLD = COLORS.gold, PUR = "#7B3AEC", TITLEC = "#AA75FF", DIM = "#9fb0cc";

const sentStart: Record<string, number> =
  Object.fromEntries(data.sentences.map((s: any) => [s.id, s.start]));
const ss = (id: string) => sentStart[id] ?? 0;

const clampSpring = (frame: number, delay: number, cfg: any = { damping: 16, stiffness: 170 }) =>
  spring({ frame: frame - delay, fps, config: cfg });
const popIn = (f: number, delay: number, dist = 40) => {
  const s = clampSpring(f, delay);
  return { opacity: Math.min(1, s * 1.2), transform: `translateY(${(1 - s) * dist}px)` } as React.CSSProperties;
};
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// ---------- candle chart engine ----------
type Candle = { o: number; c: number; hi: number; lo: number };
function makeCandles(prices: number[]): Candle[] {
  return prices.map((c, i) => {
    const o = i ? prices[i - 1] : prices[0] - 1;
    const r = 1.4 + ((i * 37) % 13) / 10; // deterministic wick
    return { o, c, hi: Math.max(o, c) + r, lo: Math.min(o, c) - r };
  });
}
// chart area in svg viewBox 0..1000 x 0..900
const CH = { x0: 60, x1: 940, y0: 60, y1: 840 };
function mapX(i: number, n: number) { return lerp(CH.x0, CH.x1, n <= 1 ? 0.5 : i / (n - 1)); }
function makeMapY(min: number, max: number) {
  const pad = (max - min) * 0.12 || 1;
  return (p: number) => lerp(CH.y1, CH.y0, (p - (min - pad)) / ((max + pad) - (min - pad)));
}

const Chart: React.FC<{
  prices: number[]; f: number; startF: number; stepF?: number;
  width?: number; lastColor?: string; highlightFrom?: number;
}> = ({ prices, f, startF, stepF = 2.2, width = 1000, lastColor, highlightFrom }) => {
  const candles = makeCandles(prices);
  const n = candles.length;
  const min = Math.min(...prices), max = Math.max(...prices);
  const mapY = makeMapY(min, max);
  const bw = ((CH.x1 - CH.x0) / n) * 0.62;
  return (
    <svg width={width} viewBox="0 0 1000 900" style={{ overflow: "visible" }}>
      {candles.map((cd, i) => {
        const local = f - startF - i * stepF;
        const g = Math.max(0, Math.min(1, spring({ frame: local, fps, config: { damping: 14, stiffness: 220 } })));
        if (g <= 0.001) return null;
        const x = mapX(i, n);
        const isUp = cd.c >= cd.o;
        let col = isUp ? GREEN : RED;
        if (lastColor && i === n - 1) col = lastColor;
        if (highlightFrom != null && i >= highlightFrom) col = isUp ? GREEN : col;
        const yO = mapY(cd.o), yC = mapY(cd.c), yHi = mapY(cd.hi), yLo = mapY(cd.lo);
        const top = Math.min(yO, yC), bot = Math.max(yO, yC);
        const fullH = Math.max(4, bot - top);
        const h = fullH * g, cy = (top + bot) / 2;
        const wickMidTop = lerp(cy, yHi, g), wickMidBot = lerp(cy, yLo, g);
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={wickMidTop} y2={wickMidBot} stroke={col} strokeWidth={3} />
            <rect x={x - bw / 2} y={cy - h / 2} width={bw} height={h} rx={3} fill={col} />
          </g>
        );
      })}
    </svg>
  );
};

// horizontal level line that draws left->right
const Level: React.FC<{ y: number; color: string; f: number; delay: number; dash?: boolean; label?: string; labelColor?: string }> =
  ({ y, color, f, delay, dash, label, labelColor }) => {
    const p = interpolate(f, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    if (p <= 0) return null;
    return (
      <g>
        <line x1={CH.x0} x2={lerp(CH.x0, CH.x1, p)} y1={y} y2={y} stroke={color} strokeWidth={4}
          strokeDasharray={dash ? "12 10" : undefined} />
        {label && p > 0.5 && (
          <text x={CH.x0 + 8} y={y - 14} fontFamily={FF} fontWeight={700} fontSize={30}
            fill={labelColor || color} opacity={(p - 0.5) * 2}>{label}</text>
        )}
      </g>
    );
  };

// pulsing circle marker
const Marker: React.FC<{ cx: number; cy: number; f: number; delay: number; color?: string }> = ({ cx, cy, f, delay, color = GOLD }) => {
  const s = clampSpring(f, delay, { damping: 12, stiffness: 200 });
  if (s <= 0.01) return null;
  const pulse = 1 + 0.18 * Math.sin((f - delay) / 4);
  return <circle cx={cx} cy={cy} r={26 * s * pulse} fill="none" stroke={color} strokeWidth={5} />;
};

const Badge: React.FC<{ n: number; f: number; delay: number }> = ({ n, f, delay }) => {
  const s = clampSpring(f, delay, { damping: 11, stiffness: 220 });
  return (
    <div style={{ position: "absolute", top: 360, left: 70, width: 96, height: 96, borderRadius: "50%",
      background: GOLD, color: "#0a1628", fontFamily: FF, fontWeight: 800, fontSize: 56,
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: s, transform: `scale(${0.4 + s * 0.6})`, boxShadow: "0 8px 26px rgba(245,197,66,.45)" }}>{n}</div>
  );
};

const Tag: React.FC<{ x: number; y: number; f: number; delay: number; text: string; bg: string; fg?: string }> =
  ({ x, y, f, delay, text, bg, fg = "#0a1628" }) => {
    const s = clampSpring(f, delay, { damping: 13, stiffness: 200 });
    if (s <= 0.01) return null;
    return (
      <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${0.7 + s * 0.3})`,
        opacity: s, background: bg, color: fg, fontFamily: FF, fontWeight: 800, fontSize: 34,
        padding: "12px 22px", borderRadius: 14, whiteSpace: "nowrap",
        boxShadow: "0 6px 20px rgba(0,0,0,.35)" }}>{text}</div>
    );
  };

const Title: React.FC<{ f: number; lines: string[]; color?: string; size?: number }> = ({ f, lines, color = TITLEC, size = 78 }) => (
  <div style={{ position: "absolute", top: 200, left: 60, right: 60, textAlign: "center" }}>
    {lines.map((l, i) => (
      <div key={i} style={{ ...popIn(f, i * 4, 30), fontFamily: FF, fontWeight: 800, fontSize: size,
        lineHeight: 1.08, color, textShadow: "0 4px 18px rgba(0,0,0,.4)" }}>{l}</div>
    ))}
  </div>
);

// Header cho 4 setup: badge SỐ + tiêu đề THẲNG HÀNG trên cùng 1 dòng (căn trái)
const SetupHeader: React.FC<{ f: number; n: number; title: string }> = ({ f, n, title }) => {
  const sb = clampSpring(f, 2, { damping: 11, stiffness: 220 });
  return (
    <div style={{ position: "absolute", top: 214, left: 70, right: 60, display: "flex", alignItems: "center", gap: 26 }}>
      <div style={{ width: 92, height: 92, borderRadius: "50%", background: GOLD, color: "#17192b",
        fontFamily: FF, fontWeight: 800, fontSize: 54, display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, opacity: sb, transform: `scale(${0.4 + sb * 0.6})`, boxShadow: "0 8px 26px rgba(245,197,66,.45)" }}>{n}</div>
      <div style={{ ...popIn(f, 5, 24), fontFamily: FF, fontWeight: 800, fontSize: 62, lineHeight: 1.04,
        color: TITLEC, textShadow: "0 4px 18px rgba(0,0,0,.45)" }}>{title}</div>
    </div>
  );
};

const BgPhoto: React.FC<{ src: string }> = ({ src }) => {
  const f = useCurrentFrame();
  const sc = interpolate(f, [0, 150], [1.06, 1.16], { extrapolateRight: "extend" });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover",
        filter: "blur(20px) brightness(0.4) saturate(1.1)", transform: `scale(${sc})` }} />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 38%, rgba(10,22,40,.66) 0%, rgba(10,22,40,.9) 82%)" }} />
    </AbsoluteFill>
  );
};
const Base: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg }) => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 34%, #14253f 0%, #0a1628 74%)", fontFamily: FF, color: "#f2f6ff" }}>
    {bg && <BgPhoto src={bg} />}
    {children}
  </AbsoluteFill>
);
const ChartHolder: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: 40, right: 40, top: 470, height: 820 }}>{children}</div>
);

// ---------- SCENES ----------
const SceneHook: React.FC<{ f: number }> = ({ f }) => {
  const prices = [50, 53, 49, 52, 56, 52, 47, 50, 54, 49, 45, 48, 52, 47];
  const min = Math.min(...prices), max = Math.max(...prices); const mapY = makeMapY(min, max);
  const buyX = mapX(4, prices.length), buyY = mapY(56);
  const sellX = mapX(10, prices.length), sellY = mapY(45);
  const lf = f;
  return (
    <Base bg="bg-cover.png">
      <Title f={lf} lines={["4 ĐIỂM VÀO LỆNH ĐẸP", "NGƯỜI MỚI NÊN BIẾT"]} size={70} />
      <ChartHolder>
        <Chart prices={prices} f={lf} startF={6} />
        <svg width={1000} viewBox="0 0 1000 900" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <Marker cx={buyX} cy={buyY} f={lf} delay={26} color={RED} />
          <Marker cx={sellX} cy={sellY} f={lf} delay={56} color={GREEN} />
        </svg>
        <Tag x={buyX - 70} y={buyY + 56} f={lf} delay={28} text="MUA ↓" bg={RED} fg="#fff" />
        <Tag x={sellX + 80} y={sellY - 60} f={lf} delay={58} text="BÁN ↑" bg={GREEN} />
      </ChartHolder>
    </Base>
  );
};

const SceneFour: React.FC<{ f: number; beat: number }> = ({ f, beat }) => {
  const items = [
    { t: "Phá vỡ", c: GREEN }, { t: "Thuận xu hướng", c: GOLD },
    { t: "Đảo chiều", c: RED }, { t: "Dòng tiền lớn", c: PUR },
  ];
  return (
    <Base bg="bg-cover.png">
      <Title f={f} lines={["4 MẪU HÌNH", "QUEN THUỘC"]} size={76} />
      <div style={{ position: "absolute", top: 560, left: 80, right: 80, display: "grid",
        gridTemplateColumns: "1fr 1fr", gap: 36 }}>
        {items.map((it, i) => {
          const s = clampSpring(f, beat + i * 5, { damping: 13, stiffness: 200 });
          return (
            <div key={i} style={{ height: 280, borderRadius: 28, background: "rgba(255,255,255,0.05)",
              border: `2px solid ${it.c}`, display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 18, opacity: s, transform: `scale(${0.7 + s * 0.3})` }}>
              <div style={{ fontSize: 84, fontWeight: 800, color: it.c }}>{i + 1}</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#eaf0fb" }}>{it.t}</div>
            </div>
          );
        })}
      </div>
    </Base>
  );
};

const SceneBreakout: React.FC<{ f: number; entryBeat: number }> = ({ f, entryBeat }) => {
  const prices = [50, 52, 49, 51, 50, 48, 51, 49, 50, 49, 51, 50, 60, 57, 59, 70, 77, 84];
  const min = Math.min(...prices), max = Math.max(...prices); const mapY = makeMapY(min, max);
  const resY = mapY(54.5);
  const retestX = mapX(14, prices.length), retestY = mapY(59);
  return (
    <Base bg="bg-breakout.png">
      <SetupHeader f={f} n={1} title="PHÁ VỠ KHÁNG CỰ" />
      <ChartHolder>
        <Chart prices={prices} f={f} startF={6} stepF={1.8} />
        <svg width={1000} viewBox="0 0 1000 900" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <Level y={resY} color={RED} f={f} delay={20} label="Kháng cự" />
          <Marker cx={retestX} cy={retestY} f={f} delay={entryBeat} color={GOLD} />
        </svg>
        <Tag x={mapX(15, prices.length)} y={mapY(70) + 30} f={f} delay={30} text="Phá vỡ" bg={GREEN} />
        <Tag x={retestX} y={retestY + 150} f={f} delay={entryBeat + 4} text="VÀO LỆNH" bg={GREEN} />
      </ChartHolder>
    </Base>
  );
};

const SceneTrend: React.FC<{ f: number; entryBeat: number }> = ({ f, entryBeat }) => {
  const prices = [30, 33, 31, 36, 39, 37, 42, 45, 44, 43, 45, 44, 46, 51, 57, 63, 69];
  const min = Math.min(...prices), max = Math.max(...prices); const mapY = makeMapY(min, max);
  const entX = mapX(12, prices.length), entY = mapY(46);
  // moving average polyline
  const ma = prices.map((_, i) => {
    const a = prices.slice(Math.max(0, i - 3), i + 1); return a.reduce((x, y) => x + y, 0) / a.length;
  });
  const maP = interpolate(f, [8, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const maShown = ma.slice(0, Math.max(2, Math.ceil(maP * ma.length)));
  return (
    <Base bg="bg-trend.png">
      <SetupHeader f={f} n={2} title="THUẬN XU HƯỚNG" />
      <ChartHolder>
        <Chart prices={prices} f={f} startF={6} stepF={1.8} />
        <svg width={1000} viewBox="0 0 1000 900" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <polyline points={maShown.map((m, i) => `${mapX(i, prices.length)},${mapY(m)}`).join(" ")}
            fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" opacity={0.85} />
          <Marker cx={entX} cy={entY} f={f} delay={entryBeat} color={GREEN} />
        </svg>
        <Tag x={mapX(9, prices.length)} y={mapY(50)} f={f} delay={24} text="Nhịp nghỉ (cờ)" bg="#1e3a8a" fg="#fff" />
        <Tag x={entX} y={entY + 150} f={f} delay={entryBeat + 4} text="VÀO LỆNH" bg={GREEN} />
      </ChartHolder>
    </Base>
  );
};

const SceneReversal: React.FC<{ f: number; topBeat: number; warnBeat: number }> = ({ f, topBeat, warnBeat }) => {
  const prices = [28, 34, 42, 50, 56, 52, 47, 50, 55, 56, 50, 44, 47, 41, 35, 30];
  const min = Math.min(...prices), max = Math.max(...prices); const mapY = makeMapY(min, max);
  const neckY = mapY(48);
  const t1x = mapX(4, prices.length), t1y = mapY(56);
  const t2x = mapX(9, prices.length), t2y = mapY(56);
  return (
    <Base bg="bg-reversal.png">
      <SetupHeader f={f} n={3} title="ĐẢO CHIỀU" />
      <ChartHolder>
        <Chart prices={prices} f={f} startF={6} stepF={1.8} />
        <svg width={1000} viewBox="0 0 1000 900" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <Level y={neckY} color="#e0a8a8" f={f} delay={warnBeat - 6} dash label="Đường viền cổ" labelColor={DIM} />
          <Marker cx={t1x} cy={t1y} f={f} delay={topBeat} color={RED} />
          <Marker cx={t2x} cy={t2y} f={f} delay={topBeat + 6} color={RED} />
        </svg>
        <Tag x={(t1x + t2x) / 2} y={t1y - 80} f={f} delay={topBeat} text="Hai đỉnh" bg={RED} fg="#fff" />
        <Tag x={760} y={560} f={f} delay={warnBeat} text="CẢNH BÁO" bg={RED} fg="#fff" />
        <Tag x={760} y={640} f={f} delay={warnBeat + 6} text="Chờ xác nhận" bg="rgba(248,113,113,.18)" fg="#ffd9d9" />
      </ChartHolder>
    </Base>
  );
};

const SceneBigMoney: React.FC<{ f: number; bounceBeat: number }> = ({ f, bounceBeat }) => {
  const prices = [72, 66, 60, 52, 46, 42, 40, 44, 49, 47, 45, 49, 53, 51, 56, 64, 72];
  const min = Math.min(...prices), max = Math.max(...prices); const mapY = makeMapY(min, max);
  const zoneTop = mapY(58), zoneBot = mapY(44);
  const zp = clampSpring(f, 16, { damping: 18, stiffness: 140 });
  const bx = mapX(13, prices.length), by = mapY(51);
  return (
    <Base bg="bg-bigmoney.png">
      <SetupHeader f={f} n={4} title="DÒNG TIỀN LỚN" />
      <ChartHolder>
        <svg width={1000} viewBox="0 0 1000 900" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <rect x={CH.x0} y={zoneTop} width={(CH.x1 - CH.x0)} height={Math.max(0, zoneBot - zoneTop)}
            fill="rgba(96,165,250,0.16)" stroke="rgba(96,165,250,0.5)" strokeWidth={2} opacity={zp} rx={6} />
        </svg>
        <Chart prices={prices} f={f} startF={6} stepF={1.7} />
        <svg width={1000} viewBox="0 0 1000 900" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <Marker cx={bx} cy={by} f={f} delay={bounceBeat} color={GREEN} />
          {f > bounceBeat + 4 && (
            <path d={`M ${bx + 30} ${by} L ${mapX(16, prices.length)} ${mapY(72)}`} stroke={GREEN} strokeWidth={8}
              strokeLinecap="round" markerEnd="url(#ah)" opacity={interpolate(f, [bounceBeat + 4, bounceBeat + 16], [0, 1], { extrapolateRight: "clamp" })} />
          )}
          <defs><marker id="ah" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={GREEN} /></marker></defs>
        </svg>
        <Tag x={500} y={mapY(58) - 18} f={f} delay={18} text="Vùng giá quan trọng" bg="rgba(96,165,250,.25)" fg="#dbeafe" />
        <Tag x={bx} y={by + 150} f={f} delay={bounceBeat + 2} text="Chờ phản ứng" bg={GREEN} />
      </ChartHolder>
    </Base>
  );
};

const SceneRecap: React.FC<{ f: number }> = ({ f }) => {
  const items = ["Phá vỡ", "Thuận xu hướng", "Đảo chiều", "Dòng tiền lớn"];
  return (
    <Base bg="bg-cover.png">
      <Title f={f} lines={["NHẬN RA MẪU HÌNH", "LÀ CHƯA ĐỦ"]} size={66} />
      <div style={{ position: "absolute", top: 600, left: 100, right: 100, display: "flex", flexDirection: "column", gap: 22 }}>
        {items.map((t, i) => {
          const s = clampSpring(f, 6 + i * 6, { damping: 16, stiffness: 180 });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, padding: "22px 34px",
              borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              opacity: s, transform: `translateX(${(1 - s) * 40}px)` }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: GREEN, color: "#0a1628",
                fontWeight: 800, fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
              <div style={{ fontSize: 40, fontWeight: 700 }}>{t}</div>
            </div>
          );
        })}
      </div>
      <div style={{ ...popIn(f, 34), position: "absolute", top: 1180, left: 80, right: 80, textAlign: "center",
        fontSize: 44, fontWeight: 800, color: GOLD }}>Chờ ĐÚNG điểm vào mới quyết định</div>
    </Base>
  );
};

const SceneCTA: React.FC<{ f: number }> = ({ f }) => {
  const s = clampSpring(f, 2, { damping: 16, stiffness: 150 });
  const fb = clampSpring(f, 18, { damping: 11, stiffness: 220 });
  if (NOBRAND) {
    const steps = ["Lọc cổ phiếu khoẻ", "Thêm vào Watchlist", "Bật cảnh báo vùng giá"];
    return (
      <Base bg="bg-cover.png">
        <div style={{ position: "absolute", top: 300, left: 60, right: 60, textAlign: "center" }}>
          <div style={{ ...popIn(f, 0), fontSize: 62, fontWeight: 800, lineHeight: 1.18, color: "#fff" }}>
            Đừng bỏ lỡ<br />điểm vào đẹp
          </div>
        </div>
        <div style={{ position: "absolute", top: 640, left: 90, right: 90, display: "flex", flexDirection: "column", gap: 24 }}>
          {steps.map((t, i) => {
            const sp = clampSpring(f, 10 + i * 7, { damping: 16, stiffness: 180 });
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, padding: "26px 34px", borderRadius: 22,
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                opacity: sp, transform: `translateY(${(1 - sp) * 40}px)` }}>
                <div style={{ width: 54, height: 54, borderRadius: "50%", background: GREEN, color: "#0a1628",
                  fontWeight: 800, fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                <div style={{ fontSize: 40, fontWeight: 700 }}>{t}</div>
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", top: 1240, left: "50%", transform: `translateX(-50%) scale(${0.6 + fb * 0.4})`,
          opacity: fb, background: GREEN, color: "#0a1628", fontSize: 44, fontWeight: 800, padding: "20px 54px",
          borderRadius: 40, boxShadow: "0 10px 30px rgba(52,211,153,.5)" }}>Follow để xem tiếp</div>
      </Base>
    );
  }
  return (
    <Base bg="bg-cover.png">
      <div style={{ position: "absolute", top: 250, left: 60, right: 60, textAlign: "center" }}>
        <div style={{ ...popIn(f, 0), fontSize: 56, fontWeight: 800, lineHeight: 1.2 }}>
          Để <span style={{ color: TITLEC }}>KFSP</span> nhắc bạn<br />khi có điểm vào
        </div>
      </div>
      <Img src={staticFile("app-cta.png")} style={{ position: "absolute", top: 560, left: "50%",
        transform: `translateX(-50%) scale(${0.9 + s * 0.1})`, width: 760, borderRadius: 28,
        border: "1px solid rgba(255,255,255,.16)", boxShadow: "0 20px 55px rgba(0,0,0,.55)", opacity: s }} />
      <div style={{ position: "absolute", top: 1230, left: "50%", transform: `translateX(-50%) scale(${0.6 + fb * 0.4})`,
        opacity: fb, background: PUR, color: "#fff", fontSize: 44, fontWeight: 800, padding: "20px 54px",
        borderRadius: 40, boxShadow: "0 10px 30px rgba(123,58,236,.5)" }}>Follow để xem tiếp</div>
    </Base>
  );
};

// ---------- subtitle (karaoke) ----------
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
        fontFamily: FF, fontSize, fontWeight: 800, whiteSpace: "nowrap", opacity: barOp,
        textShadow: "0 3px 16px rgba(0,0,0,.6)" }}>
        {act.words.map((w, i) => {
          const lit = interpolate(t, [w.t, w.t + 0.13], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const r = li(120, 245, lit), g = li(160, 220, lit), b = li(210, 90, lit);
          return <span key={i} style={{ color: `rgb(${r},${g},${b})`, opacity: 0.55 + 0.45 * lit }}>{w.w}{" "}</span>;
        })}
      </div>
    </AbsoluteFill>
  );
};
// brand toggle: false = brand (logo hiện), true = nobrand (ẩn logo). Overlay tím giữ ở cả 2.
const NOBRAND = false;

// Lớp phủ gradient tím brand trên+dưới — nhẹ, tinh tế, nhận diện KFSP ngay
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
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
      <div style={{ position: "absolute", top: 78, display: "flex", alignItems: "center", gap: 10 }}>
        <Img src={staticFile("logo-kfsp.png")} style={{ width: 56, height: 56, objectFit: "contain",
          filter: "brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,.5))" }} />
        <div style={{ fontFamily: FF, fontSize: 30, fontWeight: 800, letterSpacing: 4, color: "#ffffff",
          textShadow: "0 2px 8px rgba(0,0,0,.5)" }}>KFSP</div>
      </div>
    </AbsoluteFill>
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

// scene schedule: [fromSec, toSec, render(localFrame)]
const SCENES: { a: string; b: string | null; el: (f: number) => React.ReactNode }[] = [
  { a: "s01", b: "s03", el: (f) => <SceneHook f={f} /> },
  { a: "s03", b: "s04", el: (f) => <SceneFour f={f} beat={F(ss("s03") + 2.40 - ss("s03"))} /> },
  { a: "s04", b: "s06", el: (f) => <SceneBreakout f={f} entryBeat={F(ss("s05") - ss("s04"))} /> },
  { a: "s06", b: "s08", el: (f) => <SceneTrend f={f} entryBeat={F(ss("s07") - ss("s06"))} /> },
  { a: "s08", b: "s10", el: (f) => <SceneReversal f={f} topBeat={F(2.0)} warnBeat={F(ss("s09") - ss("s08"))} /> },
  { a: "s10", b: "s12", el: (f) => <SceneBigMoney f={f} bounceBeat={F(ss("s11") - ss("s10") + 0.2)} /> },
  { a: "s12", b: "s13", el: (f) => <SceneRecap f={f} /> },
  { a: "s13", b: null, el: (f) => <SceneCTA f={f} /> },
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
