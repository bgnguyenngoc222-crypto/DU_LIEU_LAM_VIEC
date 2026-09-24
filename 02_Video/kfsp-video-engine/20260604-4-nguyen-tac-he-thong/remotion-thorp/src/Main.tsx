import {
  AbsoluteFill, Audio, Img, Sequence, staticFile,
  useCurrentFrame, useVideoConfig, interpolate, spring, Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/BeVietnamPro";
import { COLORS, SAFE_ZONE } from "./design";
import data from "./data.json";

const { fontFamily } = loadFont("normal", { weights: ["500", "600", "700", "800"] });
const FF = fontFamily;
const fps = 30;
const sent: Record<string, { id: string; display: string; start: number; end: number }> =
  Object.fromEntries(data.sentences.map((s) => [s.id, s]));
const st = (id: string) => sent[id].start;

const GOLD = COLORS.gold, GREEN = COLORS.green, PUR = COLORS.purple, SKY = "#38bdf8";

// ---------- shared bg glow ----------
const Glow: React.FC<{ c1: string; c2: string }> = ({ c1, c2 }) => {
  const f = useCurrentFrame();
  const s = (a: number, b: number) => interpolate(f, [0, 120], [a, b], { extrapolateRight: "extend" });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 1000, height: 1000, borderRadius: "50%",
        left: "-12%", top: "2%", background: `radial-gradient(circle, ${c1}66, transparent 70%)`,
        filter: "blur(70px)", transform: `translate(${s(0, 70)}px, ${s(0, 50)}px) scale(${s(0.9, 1.18)})` }} />
      <div style={{ position: "absolute", width: 1000, height: 1000, borderRadius: "50%",
        right: "-16%", bottom: "-4%", background: `radial-gradient(circle, ${c2}55, transparent 70%)`,
        filter: "blur(70px)", transform: `translate(${s(0, -60)}px, ${s(0, -40)}px) scale(${s(1.12, 0.92)})` }} />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, rgba(10,22,40,.45) 0%, rgba(10,22,40,.82) 78%)" }} />
    </AbsoluteFill>
  );
};

const Base: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 36%, #12233f 0%, #0a1628 72%)",
    fontFamily: FF, color: "#f2f6ff" }}>{children}</AbsoluteFill>
);

const Center: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center",
    padding: "300px 90px 520px", textAlign: "center" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, width: "100%" }}>
      {children}
    </div>
  </AbsoluteFill>
);

const up = (frame: number, delay: number, dist = 60) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 180 } });
  return { opacity: s, transform: `translateY(${(1 - s) * dist}px)` };
};

// stroke draw-on for SVG paths
const draw = (f: number, delay: number, dur = 22) => {
  const p = interpolate(f, [delay, delay + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - p } as React.CSSProperties;
};

// animated icon per principle (draws itself in)
const PrIcon: React.FC<{ kind: string; color: string }> = ({ kind, color }) => {
  const f = useCurrentFrame();
  const common = { fill: "none", stroke: color, strokeWidth: 6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={130} height={130} viewBox="0 0 100 100" style={{ filter: `drop-shadow(0 0 14px ${color}66)` }}>
      {kind === "doubt" && (<>
        <circle cx={42} cy={42} r={26} {...common} style={draw(f, 4)} />
        <line x1={61} y1={61} x2={84} y2={84} {...common} style={draw(f, 16)} />
      </>)}
      {kind === "survive" && (<>
        <path d="M50 12 L84 25 V52 C84 73 67 86 50 92 C33 86 16 73 16 52 V25 Z" {...common} style={draw(f, 4)} />
        <path d="M37 50 l9 10 18-20" {...common} style={draw(f, 18)} />
      </>)}
      {kind === "edge" && (<>
        <circle cx={50} cy={50} r={32} {...common} style={draw(f, 4)} />
        <circle cx={50} cy={50} r={18} {...common} style={draw(f, 12)} />
        <circle cx={50} cy={50} r={5} fill={color} stroke="none" style={{ opacity: interpolate(f, [24, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
      </>)}
      {kind === "freedom" && (<>
        <circle cx={36} cy={40} r={17} {...common} style={draw(f, 4)} />
        <line x1={48} y1={52} x2={84} y2={88} {...common} style={draw(f, 14)} />
        <line x1={70} y1={74} x2={80} y2={64} {...common} style={draw(f, 20)} />
        <line x1={78} y1={82} x2={88} y2={72} {...common} style={draw(f, 24)} />
      </>)}
    </svg>
  );
};

// floating cards + chips for casino scene
const CasinoDeco: React.FC = () => {
  const f = useCurrentFrame();
  const card = (i: number, x: number, y: number, rot: number) => {
    const s = spring({ frame: f - 8 - i * 7, fps, config: { damping: 16, stiffness: 140 } });
    const dy = interpolate(f, [0, 130], [0, -18], { extrapolateRight: "extend" });
    const suit = ["♠", "♥", "♦"][i];
    const col = i === 0 ? "#1a1a1a" : "#c0392b";
    return (
      <div key={i} style={{ position: "absolute", left: x, top: y, width: 96, height: 132, borderRadius: 12,
        background: "#f4f1ea", boxShadow: "0 10px 30px rgba(0,0,0,.5)", border: "1px solid rgba(0,0,0,.1)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, color: col, fontWeight: 800,
        opacity: s * 0.92, transform: `translateY(${(1 - s) * 60 + dy}px) rotate(${rot}deg) scale(${0.7 + s * 0.3})` }}>{suit}</div>
    );
  };
  const chip = (i: number, x: number, y: number, c: string) => {
    const s = spring({ frame: f - 20 - i * 5, fps, config: { damping: 14, stiffness: 200 } });
    return (
      <div key={"c" + i} style={{ position: "absolute", left: x, top: y, width: 70, height: 70, borderRadius: "50%",
        background: c, border: "5px dashed rgba(255,255,255,.7)", boxShadow: "0 8px 22px rgba(0,0,0,.5)",
        opacity: s, transform: `scale(${s})` }} />
    );
  };
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {card(0, 120, 470, -16)}
      {card(1, 860, 430, 14)}
      {card(2, 770, 560, 24)}
      {chip(0, 150, 1180, "#c0392b")}
      {chip(1, 205, 1200, "#2c3e50")}
      {chip(2, 260, 1185, "#27ae60")}
    </AbsoluteFill>
  );
};

// ---------- scenes ----------
const Casino: React.FC = () => {
  const f = useCurrentFrame();
  const sc = interpolate(f, [0, 130], [1.06, 1.2], { extrapolateRight: "clamp" });
  const op = interpolate(f, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const ls = interpolate(f, [0, 30], [28, 14], { extrapolateRight: "clamp" });
  return (
    <Base>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img src={staticFile("casino.png")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${sc})` }} />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,22,40,.55), rgba(10,22,40,.35) 35%, rgba(10,22,40,.9))" }} />
      </AbsoluteFill>
      <CasinoDeco />
      <Center>
        <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: ls, opacity: op }}>LAS VEGAS</div>
        <div style={{ fontSize: 44, fontWeight: 500, color: "#cdd9ee", opacity: op }}>Có người đến đây không phải để chơi</div>
      </Center>
    </Base>
  );
};

const Reveal: React.FC = () => {
  const f = useCurrentFrame();
  const ps = spring({ frame: f, fps, config: { damping: 14, stiffness: 120 } });
  const n = Math.round(interpolate(f, [10, 42], [0, 20], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <Base>
      <Glow c1={GOLD} c2={GREEN} />
      <Center>
        <Img src={staticFile("thorp.png")} style={{ width: 360, borderRadius: 24, background: "#f4f1ea",
          padding: 10, boxShadow: "0 18px 50px rgba(0,0,0,.5)", border: "1px solid rgba(255,255,255,.12)",
          opacity: ps, transform: `scale(${0.8 + ps * 0.2})` }} />
        <div style={{ ...up(f, 6), fontSize: 100, fontWeight: 800, letterSpacing: 2, lineHeight: 1 }}>EDWARD THORP</div>
        <div style={{ ...up(f, 14), display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 130, fontWeight: 800, color: GOLD, lineHeight: 1 }}>{n} NĂM</span>
          <span style={{ fontSize: 46, fontWeight: 600, color: "#cdd9ee" }}>không một quý thua lỗ</span>
        </div>
      </Center>
    </Base>
  );
};

const Four: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Base>
      <Glow c1={PUR} c2={SKY} />
      <Center>
        <div style={{ ...up(f, 2), fontSize: 80, fontWeight: 800 }}>KHÔNG MÃ THẦN KỲ</div>
        <div style={{ ...up(f, 10), fontSize: 46, fontWeight: 500, color: "#cdd9ee" }}>Chỉ có bốn nguyên tắc</div>
        <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
          {[1, 2, 3, 4].map((d, i) => {
            const s = spring({ frame: f - 16 - i * 6, fps, config: { damping: 12, stiffness: 220 } });
            return (
              <div key={d} style={{ width: 96, height: 96, borderRadius: "50%", border: "2px solid rgba(255,255,255,.2)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 800,
                color: [PUR, GREEN, GOLD, SKY][i], opacity: s, transform: `scale(${s})` }}>{d}</div>
            );
          })}
        </div>
      </Center>
    </Base>
  );
};

const Principle: React.FC<{ num: string; title: string; sub: string; color: string; c2: string; kind: string }> =
  ({ num, title, sub, color, c2, kind }) => {
    const f = useCurrentFrame();
    const ns = spring({ frame: f, fps, config: { damping: 16, stiffness: 170 } });
    const lw = interpolate(f, [16, 36], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <Base>
        <Glow c1={color} c2={c2} />
        <Center>
          <PrIcon kind={kind} color={color} />
          <div style={{ fontSize: 168, fontWeight: 800, color, lineHeight: 0.9, opacity: ns,
            transform: `translateY(${(1 - ns) * 50}px)` }}>{num}</div>
          <div style={{ ...up(f, 10), fontSize: 78, fontWeight: 800, letterSpacing: 1 }}>{title}</div>
          <div style={{ width: lw, height: 8, borderRadius: 4, background: color }} />
          <div style={{ ...up(f, 18), fontSize: 48, fontWeight: 500, color: "#aebfd8", maxWidth: 840 }}>{sub}</div>
        </Center>
      </Base>
    );
  };

const Lesson: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Base>
      <Glow c1="#64748b" c2={SKY} />
      <Center>
        <div style={{ ...up(f, 2), fontSize: 84, fontWeight: 800, lineHeight: 1.1 }}>HỆ THỐNG<br />&amp; KỶ LUẬT</div>
        <div style={{ ...up(f, 12), fontSize: 46, fontWeight: 500, color: "#cdd9ee" }}>Thị trường thưởng người kiên nhẫn</div>
      </Center>
    </Base>
  );
};

const phones = [
  { src: "app-boloc.png", cap: "Tự lọc cổ phiếu" },
  { src: "app-canhbao.png", cap: "Tự đặt cảnh báo" },
  { src: "app-nhatky.png", cap: "Tự ghi nhật ký" },
];
const KFSP: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Base>
      <Glow c1={PUR} c2={GREEN} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "260px 70px 500px" }}>
        <div style={{ ...up(f, 2), fontSize: 64, fontWeight: 800, marginBottom: 30 }}>Với KFSP, bạn tự làm chủ</div>
        <div style={{ display: "flex", gap: 22, alignItems: "flex-end", justifyContent: "center" }}>
          {phones.map((p, i) => {
            const s = spring({ frame: f - 10 - i * 8, fps, config: { damping: 18, stiffness: 170 } });
            return (
              <div key={p.src} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: 250,
                opacity: s, transform: `translateY(${(1 - s) * 70}px)` }}>
                <div style={{ width: "100%", borderRadius: 22, overflow: "hidden", border: "1px solid rgba(255,255,255,.16)",
                  boxShadow: "0 16px 40px rgba(0,0,0,.5)", background: "#0a1628" }}>
                  <Img src={staticFile(p.src)} style={{ width: "100%", display: "block" }} />
                </div>
                <div style={{ fontSize: 34, fontWeight: 700, color: "#cdd9ee" }}>{p.cap}</div>
              </div>
            );
          })}
        </div>
        <div style={{ ...up(f, 26), fontSize: 46, fontWeight: 700, color: GOLD, marginTop: 26, letterSpacing: 1 }}>không theo phím hàng</div>
      </AbsoluteFill>
    </Base>
  );
};

const CTA: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({ frame: f, fps, config: { damping: 14, stiffness: 140 } });
  return (
    <Base>
      <Glow c1={GOLD} c2={PUR} />
      <Center>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.25, opacity: s, transform: `scale(${0.85 + s * 0.15})` }}>
          Bạn đang đầu tư bằng cảm xúc,<br />hay bằng một <span style={{ color: GOLD }}>hệ thống</span>?
        </div>
      </Center>
    </Base>
  );
};

// ---------- subtitle karaoke (absolute) ----------
const Subtitle: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / fps;
  const list = data.sentences;
  let active = list[0];
  for (let i = 0; i < list.length; i++) {
    const next = i + 1 < list.length ? list[i + 1].start : 1e9;
    if (t >= list[i].start - 0.05 && t < next) { active = list[i]; break; }
  }
  const words = active.display.split(/\s+/);
  const span = Math.max(active.end - active.start, 0.4);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
      <div style={{ position: "absolute", top: SAFE_ZONE.subtitleTop - 20, left: 70, right: 70, textAlign: "center",
        fontFamily: FF, fontSize: 46, fontWeight: 700, lineHeight: 1.3 }}>
        {words.map((w, i) => {
          const wt = active.start + (span * i) / words.length;
          const on = t >= wt;
          return (
            <span key={i} style={{ color: on ? "#f2f6ff" : "#5b6b86", opacity: on ? 1 : 0.5, transition: "none" }}>
              {w}{" "}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Logo: React.FC = () => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
    <div style={{ position: "absolute", top: 150, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <Img src={staticFile("logo-kfsp.png")} style={{ width: 74, height: 74, objectFit: "contain",
        filter: "drop-shadow(0 0 14px rgba(167,139,250,.45))" }} />
      <div style={{ fontFamily: FF, fontSize: 24, fontWeight: 800, letterSpacing: 6, color: "#f2f6ff" }}>KFSP</div>
    </div>
  </AbsoluteFill>
);

// ---------- groups ----------
const groups: { a: string; b: string | null; el: React.ReactNode }[] = [
  { a: "s01", b: "s02", el: <Casino /> },
  { a: "s02", b: "s03", el: <Reveal /> },
  { a: "s03", b: "s04", el: <Four /> },
  { a: "s04", b: "s06", el: <Principle kind="doubt" num="01" title="LUÔN HOÀI NGHI" sub="Không tin nếu chưa tự kiểm chứng" color={PUR} c2="#6d4bd8" /> },
  { a: "s06", b: "s08", el: <Principle kind="survive" num="02" title="ƯU TIÊN SINH TỒN" sub="Tránh phá sản trước khi nghĩ đến lãi" color={GREEN} c2="#0f766e" /> },
  { a: "s08", b: "s10", el: <Principle kind="edge" num="03" title="PHẢI CÓ LỢI THẾ" sub="Chỉ vào lệnh khi phần thắng nghiêng về mình" color={GOLD} c2="#b45309" /> },
  { a: "s10", b: "s12", el: <Principle kind="freedom" num="04" title="HƯỚNG VỀ TỰ DO" sub="Đích đến là tự chủ, không phải con số" color={SKY} c2="#6366f1" /> },
  { a: "s12", b: "s13", el: <Lesson /> },
  { a: "s13", b: "s15", el: <KFSP /> },
  { a: "s15", b: null, el: <CTA /> },
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
    </AbsoluteFill>
  );
};
