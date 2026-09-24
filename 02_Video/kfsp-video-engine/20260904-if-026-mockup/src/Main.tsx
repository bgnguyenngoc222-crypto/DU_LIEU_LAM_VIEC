import {
  AbsoluteFill, Audio, Img, Sequence, staticFile,
  useCurrentFrame, useVideoConfig, interpolate, spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/BeVietnamPro";
import { COLORS, SAFE_ZONE } from "./design";
import data from "./data.json";

const { fontFamily: FF } = loadFont("normal", { weights: ["500", "600", "700", "800"] });
const fps = 30;
const sent: Record<string, { id: string; display: string; start: number; end: number }> =
  Object.fromEntries(data.sentences.map((s) => [s.id, s]));
const st = (id: string) => sent[id].start;

const GOLD = COLORS.gold, GREEN = COLORS.green, PUR = COLORS.purple, RED = COLORS.red, SKY = "#60a5fa", DIM = "#9fb0cc";

const Glow: React.FC<{ c1: string; c2: string }> = ({ c1, c2 }) => {
  const f = useCurrentFrame();
  const s = (a: number, b: number) => interpolate(f, [0, 120], [a, b], { extrapolateRight: "extend" });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 1000, height: 1000, borderRadius: "50%", left: "-12%", top: "2%",
        background: `radial-gradient(circle, ${c1}55, transparent 70%)`, filter: "blur(70px)",
        transform: `translate(${s(0, 70)}px, ${s(0, 50)}px) scale(${s(0.9, 1.18)})` }} />
      <div style={{ position: "absolute", width: 1000, height: 1000, borderRadius: "50%", right: "-16%", bottom: "-4%",
        background: `radial-gradient(circle, ${c2}48, transparent 70%)`, filter: "blur(70px)",
        transform: `translate(${s(0, -60)}px, ${s(0, -40)}px) scale(${s(1.12, 0.92)})` }} />
    </AbsoluteFill>
  );
};
const Base: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 36%, #14253f 0%, #0a1628 72%)", fontFamily: FF, color: "#f2f6ff" }}>{children}</AbsoluteFill>
);
const up = (frame: number, delay: number, dist = 60) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 180 } });
  return { opacity: s, transform: `translateY(${(1 - s) * dist}px)` } as React.CSSProperties;
};
const Center: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "300px 90px 520px", textAlign: "center" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, width: "100%" }}>{children}</div>
  </AbsoluteFill>
);
const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  return <div style={{ ...up(f, 0, 24), fontSize: 34, fontWeight: 700, letterSpacing: 7, textTransform: "uppercase", color: "#8aa0c2" }}>{children}</div>;
};
const countUp = (f: number, to: number, d0 = 8, d1 = 44) => interpolate(f, [d0, d1], [0, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// ---- SVG illustrations ----
const Cigar: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({ frame: f - 2, fps, config: { damping: 16, stiffness: 150 } });
  const ember = 0.5 + 0.5 * Math.sin(f / 5);
  const smoke = interpolate(f, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <svg width={560} height={210} viewBox="0 0 560 210" style={{ opacity: s, transform: `scale(${0.9 + s * 0.1})` }}>
      <rect x={60} y={100} width={360} height={46} rx={23} fill="#8a5a32" />
      <rect x={60} y={100} width={62} height={46} rx={23} fill="#5c3a1e" />
      <rect x={420} y={102} width={34} height={42} rx={8} fill="#3a2412" />
      <circle cx={468} cy={123} r={20} fill="#f5a742" opacity={0.5 + ember * 0.5} />
      <path d="M468 98 q26 -34 0 -64 q-26 -30 0 -58" stroke="#cfd8e8" strokeWidth={7} fill="none" strokeLinecap="round" opacity={smoke * 0.7} />
    </svg>
  );
};
const Factory: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({ frame: f - 2, fps, config: { damping: 16, stiffness: 150 } });
  return (
    <svg width={460} height={210} viewBox="0 0 460 210" style={{ opacity: s, transform: `scale(${0.9 + s * 0.1})` }}>
      <path d="M40 120 l58 -48 v48 l58 -48 v48 l58 -48 v48 l58 -48 v48" fill="none" stroke="#7e8aa3" strokeWidth={8} strokeLinejoin="round" />
      <rect x={40} y={118} width={290} height={84} fill="#27344d" />
      <rect x={346} y={58} width={22} height={144} fill="#3a4760" />
      {[70, 128, 186, 244].map((x) => <rect key={x} x={x} y={150} width={30} height={30} fill="#5b6a86" />)}
    </svg>
  );
};
const Candy: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({ frame: f - 2, fps, config: { damping: 13, stiffness: 200 } });
  return (
    <svg width={300} height={210} viewBox="0 0 300 210" style={{ opacity: s, transform: `scale(${0.7 + s * 0.3})` }}>
      <rect x={40} y={70} width={220} height={126} rx={16} fill="#f2f6ff" />
      <rect x={40} y={70} width={220} height={38} rx={16} fill="#e7ecf6" />
      <rect x={140} y={50} width={20} height={146} fill="#f5c542" />
      <rect x={40} y={124} width={220} height={18} fill="#f5c542" />
    </svg>
  );
};
const Moat: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({ frame: f - 2, fps, config: { damping: 16, stiffness: 150 } });
  return (
    <svg width={460} height={220} viewBox="0 0 460 220" style={{ opacity: s, transform: `scale(${0.9 + s * 0.1})` }}>
      <path d="M40 196 q190 60 380 0" fill="none" stroke="#3b82f6" strokeWidth={14} opacity={0.6} />
      <rect x={150} y={72} width={160} height={110} fill="#2b3a55" />
      <path d="M150 72 v-22 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v22" fill="#2b3a55" />
      <rect x={210} y={126} width={40} height={56} fill={PUR} />
    </svg>
  );
};
const Dice: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({ frame: f - 2, fps, config: { damping: 12, stiffness: 160 } });
  const rot = interpolate(f, [0, 30], [-18, 0], { extrapolateRight: "clamp" });
  const pip = (cx: number, cy: number) => <circle cx={cx} cy={cy} r={9} fill="#0a1628" />;
  return (
    <svg width={300} height={180} viewBox="0 0 300 180" style={{ opacity: s, transform: `scale(${0.8 + s * 0.2}) rotate(${rot}deg)` }}>
      <rect x={30} y={40} width={110} height={110} rx={20} fill="#f2f6ff" />
      {pip(60, 70)}{pip(110, 70)}{pip(85, 95)}{pip(60, 120)}{pip(110, 120)}
      <rect x={160} y={50} width={100} height={100} rx={18} fill="#e7ecf6" />
      <circle cx={210} cy={100} r={9} fill="#f87171" />
    </svg>
  );
};
const TrendChart: React.FC<{ up?: boolean; color: string }> = ({ up: isUp, color }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [6, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pts = isUp ? [[20, 200], [130, 162], [240, 142], [350, 86], [480, 30]] : [[20, 36], [130, 86], [240, 120], [350, 178], [480, 248]];
  const shown = pts.slice(0, Math.max(2, Math.ceil(p * pts.length)));
  const last = shown[shown.length - 1];
  return (
    <svg width={520} height={270} viewBox="0 0 520 270">
      <polyline points={shown.map((q) => q.join(",")).join(" ")} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r={14} fill={color} />
    </svg>
  );
};

// ---- photo helpers (real images: blurred bg + framed card) ----
const BgPhoto: React.FC<{ src: string }> = ({ src }) => {
  const f = useCurrentFrame();
  const sc = interpolate(f, [0, 120], [1.08, 1.18], { extrapolateRight: "extend" });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(16px) brightness(0.45)", transform: `scale(${sc})` }} />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, rgba(10,22,40,.6) 0%, rgba(10,22,40,.82) 80%)" }} />
    </AbsoluteFill>
  );
};
const PhotoCard: React.FC<{ src: string }> = ({ src }) => {
  const f = useCurrentFrame();
  const s = spring({ frame: f - 2, fps, config: { damping: 16, stiffness: 150 } });
  return (
    <Img src={staticFile(src)} style={{ width: 860, borderRadius: 26, border: "1px solid rgba(255,255,255,.16)",
      boxShadow: "0 20px 55px rgba(0,0,0,.55)", opacity: s, transform: `scale(${0.92 + s * 0.08})` }} />
  );
};

// ---- scenes ----
const Great: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({ frame: f, fps, config: { damping: 16, stiffness: 150 } });
  return (
    <Base><Glow c1={GOLD} c2={PUR} /><Center>
      <Kicker>Huyền thoại</Kicker>
      <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 1, opacity: s, transform: `scale(${0.9 + s * 0.1})` }}>WARREN<br />BUFFETT</div>
      <div style={{ ...up(f, 12), fontSize: 48, fontWeight: 600, color: GOLD }}>nhà đầu tư vĩ đại nhất lịch sử</div>
    </Center></Base>
  );
};
const Twist: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({ frame: f, fps, config: { damping: 13, stiffness: 130 } });
  return (
    <Base><Glow c1={RED} c2="#7f1d1d" /><Center>
      <div style={{ ...up(f, 0, 24), fontSize: 38, fontWeight: 700, letterSpacing: 4, color: DIM }}>Nhưng ít ai biết</div>
      <div style={{ fontSize: 84, fontWeight: 800, color: RED, lineHeight: 1.1, opacity: s, transform: `scale(${0.86 + s * 0.14})` }}>MỘT SAI LẦM<br />SUÝT XOÁ SỔ TÊN ÔNG</div>
      <div style={{ ...up(f, 14), fontSize: 44, fontWeight: 600, color: DIM }}>khỏi bản đồ đầu tư</div>
    </Center></Base>
  );
};
const Teaser: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Base><Glow c1={GOLD} c2={PUR} /><Center>
      <div style={{ ...up(f, 0), fontSize: 56, fontWeight: 700, color: DIM }}>Thứ cứu ông không phải<br />một thương vụ thần kỳ</div>
      <div style={{ ...up(f, 14), fontSize: 92, fontWeight: 800, color: GOLD, lineHeight: 1.1 }}>chỉ là<br />MỘT CÂU NÓI</div>
    </Center></Base>
  );
};
const CigarButt: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Base><Glow c1={GOLD} c2="#6d4bd8" /><Center>
      <Kicker>Buffett thời trẻ</Kicker>
      <Cigar />
      <div style={{ ...up(f, 10), fontSize: 80, fontWeight: 800, color: GOLD }}>"Điếu xì gà hút dở"</div>
      <div style={{ ...up(f, 18), fontSize: 44, fontWeight: 600, color: DIM }}>nhặt công ty gần phá sản chỉ vì nó rẻ</div>
    </Center></Base>
  );
};
const WorstBet: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Base><Glow c1={RED} c2="#b45309" /><Center>
      <Dice />
      <div style={{ ...up(f, 10), fontSize: 78, fontWeight: 800, lineHeight: 1.1 }}>Canh bạc<br /><span style={{ color: RED }}>tệ nhất đời mình</span></div>
    </Center></Base>
  );
};
const Berkshire: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Base><BgPhoto src="berkshire.png" /><Center>
      <PhotoCard src="berkshire.png" />
      <div style={{ ...up(f, 10), fontSize: 46, fontWeight: 600, color: RED }}>một xưởng dệt đang hấp hối</div>
      <div style={{ ...up(f, 30), fontSize: 56, fontWeight: 800, color: GOLD }}>mắc kẹt gần 20 năm</div>
    </Center></Base>
  );
};
const DumbestCost: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(countUp(f, 200, 14, 50));
  return (
    <Base><BgPhoto src="berkshire.png" /><Center>
      <div style={{ ...up(f, 0), fontSize: 56, fontWeight: 800, lineHeight: 1.15 }}>"Cổ phiếu <span style={{ color: RED }}>ngu ngốc nhất</span><br />tôi từng mua"</div>
      <div style={{ ...up(f, 10), fontSize: 150, fontWeight: 800, color: RED, lineHeight: 1 }}>{n} tỷ$</div>
      <div style={{ ...up(f, 18), fontSize: 42, fontWeight: 600, color: DIM }}>chi phí cơ hội đã mất</div>
    </Center></Base>
  );
};
const MungerScene: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({ frame: f, fps, config: { damping: 16, stiffness: 150 } });
  return (
    <Base><BgPhoto src="munger.png" /><Center>
      <Kicker>Người kéo ông ra khỏi vực</Kicker>
      <PhotoCard src="munger.png" />
      <div style={{ ...up(f, 10), fontSize: 84, fontWeight: 800 }}>Charlie Munger</div>
    </Center></Base>
  );
};
const TheQuote: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Base><Glow c1={GREEN} c2={RED} /><Center>
      <div style={{ ...up(f, 2), fontSize: 62, fontWeight: 800, lineHeight: 1.32 }}>
        <span style={{ color: GREEN }}>Doanh nghiệp tuyệt vời</span><br />ở giá hợp lý<br />
        <span style={{ color: DIM, fontSize: 44 }}>tốt hơn</span><br />
        <span style={{ color: RED }}>doanh nghiệp tầm thường</span><br />ở giá thật rẻ
      </div>
    </Center></Base>
  );
};
const Reverse: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({ frame: f, fps, config: { damping: 12, stiffness: 120 } });
  const rot = interpolate(f, [0, 40], [0, 180], { extrapolateRight: "clamp" });
  return (
    <Base><Glow c1={PUR} c2={GREEN} /><Center>
      <svg width={200} height={200} viewBox="0 0 100 100" style={{ opacity: s, transform: `rotate(${rot}deg)` }}>
        <path d="M20 50 a30 30 0 1 1 9 21" fill="none" stroke={PUR} strokeWidth={8} strokeLinecap="round" />
        <path d="M22 78 l7 -8 9 7" fill="none" stroke={PUR} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{ ...up(f, 12), fontSize: 80, fontWeight: 800, lineHeight: 1.12 }}>Một câu thôi,<br />nhưng <span style={{ color: PUR }}>đảo ngược tất cả</span></div>
    </Center></Base>
  );
};
const Sees: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Base><BgPhoto src="sees.png" /><Center>
      <PhotoCard src="sees.png" />
      <div style={{ ...up(f, 12), display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 92, fontWeight: 800, color: GOLD, lineHeight: 1 }}>3× sổ sách</span>
        <span style={{ fontSize: 42, fontWeight: 600, color: DIM }}>"nhiều người chê đắt"</span>
      </div>
    </Center></Base>
  );
};
const Profit: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(countUp(f, 2, 10, 42));
  return (
    <Base><BgPhoto src="sees.png" /><Center>
      <Kicker>Sức mạnh thương hiệu</Kicker>
      <TrendChart up color={GREEN} />
      <div style={{ ...up(f, 10), fontSize: 100, fontWeight: 800, color: GREEN }}>+{n} tỷ đô</div>
      <div style={{ ...up(f, 18), fontSize: 44, fontWeight: 600, color: DIM }}>lợi nhuận mang về</div>
    </Center></Base>
  );
};
const MoatScene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Base><Glow c1={PUR} c2={SKY} /><Center>
      <Moat />
      <div style={{ ...up(f, 8), fontSize: 92, fontWeight: 800, color: PUR }}>Con hào kinh tế</div>
      <div style={{ ...up(f, 16), fontSize: 44, fontWeight: 600, color: DIM }}>lợi thế đối thủ không cướp được</div>
    </Center></Base>
  );
};
const TwoCheap: React.FC = () => {
  const f = useCurrentFrame();
  const row = (delay: number, x: number, good: boolean, t: string, d: string) => {
    const s = spring({ frame: f - delay, fps, config: { damping: 16, stiffness: 170 } });
    return (
      <div style={{ width: "100%", borderRadius: 26, padding: "38px 44px", textAlign: "left",
        background: good ? "rgba(52,211,153,0.10)" : "rgba(248,113,113,0.10)",
        border: `1px solid ${good ? "rgba(52,211,153,0.4)" : "rgba(248,113,113,0.4)"}`,
        opacity: s, transform: `translateX(${(1 - s) * x}px)` }}>
        <div style={{ fontSize: 50, fontWeight: 800, color: good ? GREEN : RED }}>{t}</div>
        <div style={{ fontSize: 38, fontWeight: 600, color: "#c7d3e6", marginTop: 6 }}>{d}</div>
      </div>
    );
  };
  return (
    <Base><Glow c1="#64748b" c2={SKY} /><Center>
      <Kicker>Hai loại "rẻ"</Kicker>
      <div style={{ display: "flex", flexDirection: "column", gap: 28, width: "100%" }}>
        {row(6, -60, true, "Rẻ vì bị định giá sai", "có thể là cơ hội")}
        {row(14, 60, false, "Rẻ vì đang chết dần", "chính là cái bẫy")}
      </div>
    </Center></Base>
  );
};
const Health: React.FC = () => {
  const f = useCurrentFrame();
  const chips = [
    { t: "Lợi nhuận", d: "có thật không?", c: GREEN },
    { t: "Nợ vay", d: "có đang nuốt công ty?", c: RED },
    { t: "Định giá", d: "đắt hay rẻ so giá trị thật?", c: GOLD },
  ];
  return (
    <Base><Glow c1={PUR} c2={GREEN} /><Center>
      <div style={{ ...up(f, 0), fontSize: 58, fontWeight: 800, lineHeight: 1.2 }}>Khác biệt nằm ở<br /><span style={{ color: PUR }}>sức khoẻ doanh nghiệp</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%", marginTop: 8 }}>
        {chips.map((c, i) => {
          const s = spring({ frame: f - 10 - i * 8, fps, config: { damping: 16, stiffness: 180 } });
          return (
            <div key={c.t} style={{ display: "flex", alignItems: "center", gap: 24, width: "100%", borderRadius: 22,
              padding: "28px 38px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)",
              opacity: s, transform: `translateY(${(1 - s) * 50}px)` }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: c.c, flexShrink: 0 }} />
              <div style={{ textAlign: "left" }}>
                <span style={{ fontSize: 46, fontWeight: 800 }}>{c.t} </span>
                <span style={{ fontSize: 38, fontWeight: 600, color: DIM }}>{c.d}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Center></Base>
  );
};
const CTA: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({ frame: f, fps, config: { damping: 14, stiffness: 140 } });
  return (
    <Base><Glow c1={GOLD} c2={PUR} /><Center>
      <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.22, opacity: s, transform: `scale(${0.86 + s * 0.14})` }}>
        Bạn giữ mã này vì<br /><span style={{ color: GREEN }}>nó TỐT</span>,<br />hay chỉ vì <span style={{ color: RED }}>nó RẺ</span>?
      </div>
      <div style={{ ...up(f, 18), fontSize: 42, fontWeight: 700, color: PUR, letterSpacing: 3, marginTop: 36 }}>KFSP — KUNGFU STOCKS PRO</div>
    </Center></Base>
  );
};

type Chunk = { cstart: number; cend: number; words: { w: string; t: number }[] };
const ALL_CHUNKS: Chunk[] = data.sentences.flatMap((s: any) => s.chunks as Chunk[]);
const lerp = (a: number, b: number, p: number) => Math.round(a + (b - a) * p);
const Subtitle: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / fps;
  let act: Chunk | null = null;
  for (const c of ALL_CHUNKS) { if (t >= c.cstart - 0.04 && t < c.cend) { act = c; break; } }
  if (!act) return null;
  const chars = act.words.reduce((a, w) => a + w.w.length + 1, 0);
  const fontSize = Math.max(32, Math.min(46, Math.floor(980 / (chars * 0.5))));
  // fade in 4 frames at chunk start
  const barOp = interpolate(t, [act.cstart - 0.02, act.cstart + 0.13], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
      <div style={{ position: "absolute", top: SAFE_ZONE.subtitleTop - 6, left: 50, right: 50, textAlign: "center",
        fontFamily: FF, fontSize, fontWeight: 700, whiteSpace: "nowrap", opacity: barOp }}>
        {act.words.map((w, i) => {
          const lit = interpolate(t, [w.t, w.t + 0.13], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const r = lerp(91, 242, lit), g = lerp(107, 246, lit), b = lerp(134, 255, lit);
          return <span key={i} style={{ color: `rgb(${r},${g},${b})`, opacity: 0.5 + 0.5 * lit }}>{w.w}{" "}</span>;
        })}
      </div>
    </AbsoluteFill>
  );
};
const Logo: React.FC = () => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
    <div style={{ position: "absolute", top: 150, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <Img src={staticFile("logo-kfsp.png")} style={{ width: 74, height: 74, objectFit: "contain", filter: "drop-shadow(0 0 14px rgba(167,139,250,.45))" }} />
      <div style={{ fontFamily: FF, fontSize: 24, fontWeight: 800, letterSpacing: 6, color: "#f2f6ff" }}>KFSP</div>
    </div>
  </AbsoluteFill>
);
const Progress: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const w = interpolate(f, [0, durationInFrames], [0, 100], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end" }}>
      <div style={{ height: 8, background: "rgba(255,255,255,0.08)" }}>
        <div style={{ height: "100%", width: `${w}%`, background: `linear-gradient(90deg, ${PUR}, ${GREEN})` }} />
      </div>
    </AbsoluteFill>
  );
};

const groups: { a: string; b: string | null; el: React.ReactNode }[] = [
  { a: "s01", b: "s02", el: <Great /> },
  { a: "s02", b: "s03", el: <Twist /> },
  { a: "s03", b: "s04", el: <Teaser /> },
  { a: "s04", b: "s06", el: <CigarButt /> },
  { a: "s06", b: "s07", el: <WorstBet /> },
  { a: "s07", b: "s09", el: <Berkshire /> },
  { a: "s09", b: "s10", el: <DumbestCost /> },
  { a: "s10", b: "s11", el: <MungerScene /> },
  { a: "s11", b: "s12", el: <TheQuote /> },
  { a: "s12", b: "s13", el: <Reverse /> },
  { a: "s13", b: "s14", el: <Sees /> },
  { a: "s14", b: "s15", el: <Profit /> },
  { a: "s15", b: "s16", el: <MoatScene /> },
  { a: "s16", b: "s17", el: <TwoCheap /> },
  { a: "s17", b: "s19", el: <Health /> },
  { a: "s19", b: null, el: <CTA /> },
];

export const Main: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const F = (sec: number) => Math.round(sec * fps);
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1628" }}>
      <Audio src={staticFile("voice_full.mp3")} />
      {groups.map((g, i) => {
        const from = F(st(g.a));
        const to = g.b ? F(st(g.b)) : durationInFrames;
        return (
          <Sequence key={i} from={from} durationInFrames={to - from} layout="none">
            {g.el}
          </Sequence>
        );
      })}
      <Subtitle />
      <Logo />
      <Progress />
    </AbsoluteFill>
  );
};
