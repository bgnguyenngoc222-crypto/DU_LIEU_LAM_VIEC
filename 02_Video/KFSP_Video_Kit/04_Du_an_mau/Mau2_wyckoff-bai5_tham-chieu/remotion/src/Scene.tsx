import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/BeVietnamPro";
import { B } from "./timing";

const { fontFamily: FF } = loadFont("normal", { weights: ["500", "600", "700", "800"] });
export { FF };

export const BG = "#0a1628";
export const PUR = "#7B3AEC";
export const PURL = "#AA75FF";
export const GOLD = "#f5c542";
export const GREEN = "#34d399";
export const RED = "#f87171";
const bgFill = { background: `radial-gradient(circle at 50% 38%, #16123a 0%, ${BG} 82%)` } as React.CSSProperties;

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const appear = (f: number, on: number, dur = 16) => ease(clamp01((f - on) / dur));
const O = (id: string) => B[id].on;
const BEATS = Object.keys(B);
const activeBeat = (f: number): string => {
  let cur = BEATS[0];
  for (const id of BEATS) if (f >= O(id)) cur = id;
  return cur;
};

// ---------- Caption (phụ đề trắng đáy) ----------
const Caption: React.FC<{ text: string; on: number }> = ({ text, on }) =>
  !text || on <= 0.01 ? null : (
    <div style={{ position: "absolute", top: 1358, left: 60, right: 60, textAlign: "center", fontFamily: FF, fontWeight: 800, fontSize: 44, lineHeight: 1.24, color: "#fff", textShadow: "0 3px 16px rgba(0,0,0,.95)", opacity: on }}>{text}</div>
  );

// ---------- Chip "Điều cần thấy" ----------
const SeeChip: React.FC<{ kicker: string; text: string; on: number; tone?: string }> = ({ kicker, text, on, tone = PUR }) =>
  on <= 0.01 ? null : (
    <div style={{ position: "absolute", left: 64, right: 64, top: 1180, transform: `translateY(${(1 - on) * 26}px)`, opacity: on }}>
      <div style={{ background: "rgba(123,58,236,0.20)", border: `2px solid ${tone}`, borderRadius: 26, padding: "22px 30px 26px", boxShadow: `0 14px 44px rgba(0,0,0,.6), 0 0 36px ${tone}55`, backdropFilter: "blur(3px)" }}>
        <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 28, letterSpacing: 1, color: GOLD, marginBottom: 8 }}>👉 {kicker}</div>
        <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 40, lineHeight: 1.28, color: "#fff" }}>{text}</div>
      </div>
    </div>
  );

// =========================================================================
// HOOK (s01-s05): phân tích đúng mà bấm sai chỗ. Ảnh concept + 3 dòng "bạn đã..." rồi cú lật.
const Hook: React.FC<{ op: number }> = ({ op }) => {
  const f = useCurrentFrame();
  const kb = 1.06 + clamp01((f - O("s01")) / 420) * 0.07;
  const l1 = appear(f, O("s01") + 6, 12);
  const l2 = appear(f, O("s01") + 46, 12);
  const l3 = appear(f, O("s01") + 90, 12);
  const bad = appear(f, O("s02") + 8, 14);
  const drop = appear(f, O("s03") + 4, 14);
  const hard = appear(f, O("s04") + 4, 14);
  const prom = appear(f, O("s05") + 6, 14);
  const Tick = (o: number, y: number, txt: string) => o <= 0.01 ? null : (
    <div style={{ position: "absolute", left: 90, top: y, opacity: o * 0.95, transform: `translateX(${(1 - o) * -18}px)`, display: "flex", alignItems: "center", gap: 14, fontFamily: FF, fontWeight: 700, fontSize: 40, color: "#dfe7f5", whiteSpace: "nowrap" }}>
      <span style={{ color: GREEN, fontWeight: 800 }}>✓</span>{txt}
    </div>
  );
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img src={staticFile("wyckoff-composite-man.png")} style={{ position: "absolute", left: "50%", top: "50%", width: 1240, transform: `translate(-50%,-50%) scale(${kb})`, opacity: 1 }} />
      </AbsoluteFill>
      {/* chỉ tối vừa đủ để chữ nổi — trước đây phủ 0.72-0.96 làm ảnh mất hẳn */}
      <AbsoluteFill style={{ background: "linear-gradient(to bottom, rgba(10,22,40,0.30) 0%, rgba(10,22,40,0.62) 46%, rgba(10,22,40,0.86) 100%)" }} />
      {Tick(l1, 420, "ngồi cả buổi đọc cái đáy tích luỹ")}
      {Tick(l2, 500, "vẽ biên trên, biên dưới")}
      {Tick(l3, 580, "thấy cả cú giũ ở cuối chặng")}
      {bad > 0.01 && (
        <div style={{ position: "absolute", left: 70, right: 70, top: 730, transform: `scale(${0.95 + bad * 0.05})`, opacity: bad, background: "rgba(248,113,113,0.14)", border: `2px solid ${RED}`, borderRadius: 24, padding: "26px 30px", textAlign: "center", boxShadow: `0 0 34px ${RED}44` }}>
          <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 44, lineHeight: 1.26, color: "#fff" }}>rồi bấm mua ngay <span style={{ color: RED }}>giữa hộp</span><br />lúc giá chưa ngã về bên nào</div>
        </div>
      )}
      {drop > 0.01 && (
        <div style={{ position: "absolute", left: 70, right: 70, top: 960, textAlign: "center", opacity: drop, fontFamily: FF, fontWeight: 800, fontSize: 46, lineHeight: 1.28, color: GOLD }}>Đọc đúng mà vào sai chỗ<br />công sức trước đó đổ sông đổ bể</div>
      )}
      {hard > 0.01 && (
        <div style={{ position: "absolute", left: 70, right: 70, top: 1140, textAlign: "center", opacity: hard, fontFamily: FF, fontWeight: 800, fontSize: 42, lineHeight: 1.3, color: "#fff" }}>Đọc ra cái hộp mới là phần dễ<br /><span style={{ color: PURL }}>phần khó là ngồi đợi đúng nhịp để vào</span></div>
      )}
      {prom > 0.01 && (
        <div style={{ position: "absolute", left: 80, right: 80, top: 1330, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, opacity: prom }}>
          {["vào ở 2 chỗ", "đặt mục tiêu ra sao", "đặt điểm dừng lỗ ở đâu"].map((t, i) => (
            <div key={i} style={{ background: "rgba(123,58,236,0.20)", border: `2px solid ${PUR}`, borderRadius: 18, padding: "12px 22px", fontFamily: FF, fontWeight: 800, fontSize: 32, color: "#fff", whiteSpace: "nowrap" }}>{t}</div>
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};

// =========================================================================
// BẮC CẦU (s06-s07): 4 bài trước ✓ → bài khép, câu hỏi duy nhất.
const Bridge: React.FC<{ op: number }> = ({ op }) => {
  const f = useCurrentFrame();
  const head = appear(f, O("s06"), 14);
  const c1 = appear(f, O("s06") + 18, 12);
  const c2 = appear(f, O("s06") + 44, 12);
  const c3 = appear(f, O("s06") + 70, 12);
  const q = appear(f, O("s07") + 6, 14);
  const Chip = (o: number, x: number, y: number, txt: string) => o <= 0.01 ? null : (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${0.92 + o * 0.08})`, opacity: o * 0.92, background: "rgba(52,211,153,0.12)", border: `2px solid ${GREEN}`, color: "#fff", fontFamily: FF, fontWeight: 800, fontSize: 32, padding: "16px 22px", borderRadius: 18, whiteSpace: "nowrap" }}>{txt}</div>
  );
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 36%, #1a1440 0%, #0a1628 82%)" }} />
      {head > 0.01 && <div style={{ position: "absolute", left: 540, top: 540, transform: "translateX(-50%)", opacity: head, fontFamily: FF, fontWeight: 700, fontSize: 34, letterSpacing: 1, color: PURL, whiteSpace: "nowrap" }}>Bốn bài trước · bạn đã có</div>}
      {Chip(c1, 540, 680, "cái khung: ai gom, ai xả")}
      {Chip(c2, 540, 790, "hai câu chuyện: đáy và đỉnh")}
      {Chip(c3, 540, 900, "cách đọc: lực thật hay lực giả")}
      {q > 0.01 && (
        <div style={{ position: "absolute", left: 80, right: 80, top: 1060, transform: `scale(${0.95 + q * 0.05})`, opacity: q, background: "rgba(245,197,66,0.14)", border: `2px solid ${GOLD}`, borderRadius: 24, padding: "30px 30px", textAlign: "center", boxShadow: `0 0 34px ${GOLD}55` }}>
          <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 30, color: GOLD, marginBottom: 10 }}>BÀI KHÉP · không thêm khái niệm mới</div>
          <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 46, lineHeight: 1.26, color: "#fff" }}>Đọc được cấu trúc rồi<br />thì giao dịch ở đâu?</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// =========================================================================
// CHART (s10-s39): 4 slide Figma (bản đồ · mua 1 · mua 2 · mục tiêu).
// Camera SNAP-theo-beat (L21: giữ yên trong câu, không lerp suốt segment) + spotlight dẫn mắt.
const VP = { left: 0, top: 300, w: 1080, h: 760 };
const IMG_W = 1080, IMG_H = 680;   // 2160×1360 đưa về bề rộng 1080 (đã crop bỏ logo + TIÊU ĐỀ + dòng chân)

type View = { img: string; fx: number; fy: number; z: number };
const MAP = "wyk5-h1-map.png", BUY1 = "wyk5-h2-buy1.png", BUY2 = "wyk5-h3-buy2.png", TGT = "wyk5-h4-target.png";
// 🔴 fy ≈ CY (tâm khối chart) ở gần như MỌI beat: giọng nhắc khối lượng liên tục nên khung
// phải luôn thấy CẢ vùng giá VÀ vùng khối lượng. Camera gần như đứng yên; cái DIỄN RA theo
// từng câu là lớp MARK (vòng/mũi tên/vạch vẽ bằng code) + spotlight — đúng L21.
// Vùng chart trong ảnh đã crop (2160×1360): y 0.173..0.826 (giá 0.173..0.616 · khối lượng 0.640..0.826).
const CY = 0.50;
const VIEW: Record<string, View> = {
  // bản đồ hành vi + phản-ví-dụ (không mua giữa hộp / không đoán đáy)
  s10:  { img: MAP, fx: 0.50, fy: CY,   z: 1.14 },   // toàn cảnh: sai lầm phổ biến
  s10b: { img: MAP, fx: 0.45, fy: CY,   z: 1.34 },   // zoom giữa hộp: đừng mua chỗ này
  s11:  { img: MAP, fx: 0.24, fy: CY,   z: 1.34 },
  s12:  { img: MAP, fx: 0.76, fy: CY,   z: 1.45 },
  s12b: { img: MAP, fx: 0.76, fy: CY,   z: 1.45 },   // giữ khung: có dấu hiệu mới vào
  // ĐIỂM MUA 1 — Spring → SOS (x≈0.76). Camera giữ yên s14→s20, chỉ spotlight chạy.
  s13: { img: BUY1, fx: 0.68, fy: CY,   z: 1.34 },
  s14: { img: BUY1, fx: 0.76, fy: CY,   z: 1.55 },
  s15: { img: BUY1, fx: 0.76, fy: CY,   z: 1.55 },
  s16: { img: BUY1, fx: 0.77, fy: CY,   z: 1.58 },
  s17: { img: BUY1, fx: 0.77, fy: CY,   z: 1.58 },
  s18: { img: BUY1, fx: 0.77, fy: CY,   z: 1.58 },
  s19: { img: BUY1, fx: 0.76, fy: CY,   z: 1.58 },
  s20: { img: BUY1, fx: 0.76, fy: CY,   z: 1.58 },
  s21: { img: BUY1, fx: 0.74, fy: CY,   z: 1.36 },
  // ĐIỂM MUA 2 — LPS / mép suối (x≈0.77)
  s22: { img: BUY2, fx: 0.68, fy: CY,   z: 1.34 },
  s23: { img: BUY2, fx: 0.76, fy: CY,   z: 1.52 },
  s24: { img: BUY2, fx: 0.76, fy: CY,   z: 1.52 },
  s25: { img: BUY2, fx: 0.77, fy: CY,   z: 1.58 },
  s26: { img: BUY2, fx: 0.77, fy: CY,   z: 1.58 },
  s27: { img: BUY2, fx: 0.77, fy: CY,   z: 1.58 },
  s28: { img: BUY2, fx: 0.77, fy: CY,   z: 1.58 },
  s29: { img: BUY2, fx: 0.77, fy: CY,   z: 1.58 },
  s30: { img: BUY2, fx: 0.74, fy: CY,   z: 1.36 },
  // MỤC TIÊU — NHÂN (bề ngang, cần khung RỘNG) → QUẢ (chiếu lên, nâng khung lên chút)
  s31: { img: TGT,  fx: 0.50, fy: CY,   z: 1.14 },
  s32: { img: TGT,  fx: 0.50, fy: CY,   z: 1.14 },
  s33: { img: TGT,  fx: 0.50, fy: CY,   z: 1.22 },
  s34: { img: TGT,  fx: 0.50, fy: CY,   z: 1.22 },
  s35: { img: TGT,  fx: 0.58, fy: CY,   z: 1.26 },
  s36: { img: TGT,  fx: 0.80, fy: 0.42, z: 1.48 },
  s37: { img: TGT,  fx: 0.80, fy: 0.42, z: 1.48 },
  s38: { img: TGT,  fx: 0.80, fy: 0.42, z: 1.48 },
  s39: { img: TGT,  fx: 0.55, fy: CY,   z: 1.16 },
};
const VIEW_IDS = Object.keys(VIEW);

// spotlight: y theo % viewport. Với khung ngắm fy=CY z≈1.58, chart chiếm viewport y 4%..96%:
// vùng GIÁ ≈ 4..66% (tâm 35) · vùng KHỐI LƯỢNG ≈ 70..96% (tâm 83) · CẢ HAI ≈ 55.
const SPOT_Y: Record<string, number> = {
  s10: 55, s10b: 40, s11: 40, s12: 55, s12b: 55,
  s13: 50, s14: 65, s15: 45, s16: 62, s17: 35, s18: 35, s19: 52, s20: 52, s21: 55,
  s22: 50, s23: 38, s24: 38, s25: 40, s26: 40, s27: 64, s28: 50, s29: 50, s30: 55,
  s31: 55, s32: 55, s33: 60, s34: 60, s35: 50, s36: 28, s37: 28, s38: 30, s39: 55,
};

const curViewIdx = (f: number): number => {
  let i = 0;
  for (let k = 0; k < VIEW_IDS.length; k++) if (f >= O(VIEW_IDS[k])) i = k;
  return i;
};

// ---------------------------------------------------------------------------
// MARK — lớp NHẤN vẽ bằng code, hiện đúng beat theo giọng. Đây là thứ DIỄN RA
// giữa các câu (L21): ảnh Figma đứng yên, nhưng mỗi câu có một dấu nhấn riêng
// nên người xem thấy đang nói về chỗ nào. Toạ độ theo hệ ẢNH đã crop (0..1),
// quy đổi sang viewport bằng CHÍNH phép biến đổi camera nên luôn dính đúng chỗ.
type Mk =
  | { k: "ring"; x: number; y: number; r: number; c?: string }
  | { k: "hbar"; x0: number; x1: number; y: number; c?: string }
  | { k: "vbar"; x: number; y0: number; y1: number; c?: string }
  | { k: "cross"; x: number; y: number; r: number };

// nhấn theo beat (dùng chung cho H1/H2/H3/H4 — toạ độ đo từ ảnh thật)
const MARK: Record<string, Mk[]> = {
  // 🔴 Toạ độ ĐO BẰNG LƯỚI HIỆU CHUẨN trên chính ảnh đã crop (drawgrid 0.05), KHÔNG suy ra từ
  // ảnh trước crop — lần đầu suy ra làm vòng khối lượng lệch 0.10 (rơi vào vùng giá).
  // Mốc chart trong ảnh: giá 0.171..0.679 · khối lượng 0.679..0.842 · biên trên 0.422 · biên dưới 0.586.

  // H1 bản đồ: phản-ví-dụ (✕ giữa hộp · ✕ nhịp còn rơi) rồi ✓ chặng cuối
  s10:  [{ k: "cross", x: 0.500, y: 0.500, r: 100 }],
  s10b: [{ k: "cross", x: 0.500, y: 0.500, r: 100 }],
  s11:  [{ k: "cross", x: 0.215, y: 0.320, r: 95 }],
  s12:  [{ k: "ring", x: 0.750, y: 0.440, r: 106, c: GREEN }],
  s12b: [{ k: "ring", x: 0.750, y: 0.440, r: 106, c: GREEN }],
  // H2 điểm mua 1 (đo: nến Spring 0.683/0.555 · cột vol cạn 0.672/0.812 · SOS 0.760/0.352
  //                · vol SOS 0.748/0.778 · pill MUA 0.689/0.266 · vạch stop y0.635 · pill stop 0.580/0.651)
  s14: [{ k: "ring", x: 0.683, y: 0.555, r: 66, c: RED }, { k: "ring", x: 0.672, y: 0.812, r: 40, c: RED }],
  s15: [{ k: "ring", x: 0.683, y: 0.555, r: 66, c: RED }],
  s16: [{ k: "ring", x: 0.760, y: 0.352, r: 62, c: GREEN }, { k: "ring", x: 0.748, y: 0.778, r: 44, c: GREEN }],
  s17: [{ k: "ring", x: 0.760, y: 0.352, r: 62, c: GREEN }],
  s18: [{ k: "ring", x: 0.689, y: 0.266, r: 66, c: GOLD }],
  s19: [{ k: "hbar", x0: 0.630, x1: 0.750, y: 0.635, c: RED }, { k: "ring", x: 0.580, y: 0.651, r: 52, c: RED }],
  s20: [{ k: "hbar", x0: 0.630, x1: 0.750, y: 0.635, c: RED }],
  // H3 điểm mua 2 (đo: vòng LPS 0.785/0.425 · biên trên 0.417 · vạch stop y0.490 x0.750..0.830 · pill stop 0.686/0.523)
  s23: [{ k: "hbar", x0: 0.560, x1: 0.845, y: 0.417, c: GOLD }],
  s24: [{ k: "hbar", x0: 0.560, x1: 0.845, y: 0.417, c: GOLD }],
  s25: [{ k: "ring", x: 0.785, y: 0.425, r: 62, c: GOLD }],
  s26: [{ k: "ring", x: 0.785, y: 0.425, r: 62, c: GREEN }],
  s27: [{ k: "ring", x: 0.785, y: 0.425, r: 62, c: GREEN }],
  s28: [{ k: "hbar", x0: 0.735, x1: 0.845, y: 0.490, c: RED }, { k: "ring", x: 0.686, y: 0.523, r: 52, c: RED }],
  s29: [{ k: "hbar", x0: 0.735, x1: 0.845, y: 0.490, c: RED }],
  // H4 mục tiêu (đo: NHÂN y0.624 x0.283..0.778 · QUẢ x0.825 y0.270..0.425)
  s33: [{ k: "hbar", x0: 0.283, x1: 0.778, y: 0.624, c: PURL }],
  s34: [{ k: "hbar", x0: 0.283, x1: 0.778, y: 0.624, c: PURL }],
  s35: [{ k: "hbar", x0: 0.283, x1: 0.778, y: 0.624, c: PURL }, { k: "vbar", x: 0.825, y0: 0.270, y1: 0.425, c: GOLD }],
  s36: [{ k: "vbar", x: 0.825, y0: 0.270, y1: 0.425, c: GOLD }],
  s37: [{ k: "vbar", x: 0.825, y0: 0.270, y1: 0.425, c: GOLD }],
  s38: [{ k: "vbar", x: 0.825, y0: 0.270, y1: 0.425, c: GOLD }],
};

const MarkLayer: React.FC<{ v: View; on: number }> = ({ v, on }) => {
  const f = useCurrentFrame();
  const beat = activeBeat(f);
  const marks = MARK[beat];
  if (!marks || on <= 0.01) return null;
  const z = v.z;
  const iw = IMG_W * z, ih = IMG_H * z;
  const tx = Math.max(VP.w - iw, Math.min(0, VP.w / 2 - v.fx * iw));
  const ty = Math.max(VP.h - ih, Math.min(0, VP.h / 2 - v.fy * ih));
  const PX = (x: number) => tx + x * iw;   // ảnh(0..1) -> viewport px
  const PY = (y: number) => ty + y * ih;
  // nhịp thở nhẹ để mắt bắt được dấu nhấn
  const pulse = 1 + Math.sin(((f - O(beat)) / 30) * Math.PI * 2) * 0.045;
  return (
    <div style={{ position: "absolute", left: VP.left, top: VP.top, width: VP.w, height: VP.h, overflow: "hidden", pointerEvents: "none" }}>
      {marks.map((m, i) => {
        const c = ("c" in m && m.c) ? m.c : GOLD;
        if (m.k === "ring" || m.k === "cross") {
          const r = m.r * on * pulse;
          const isX = m.k === "cross";
          return (
            <div key={i} style={{ position: "absolute", left: PX(m.x) - r, top: PY(m.y) - r, width: r * 2, height: r * 2, borderRadius: "50%", border: `${isX ? 5 : 6}px solid ${isX ? RED : c}`, boxShadow: `0 0 26px ${isX ? RED : c}bb, inset 0 0 22px ${isX ? RED : c}44`, opacity: on, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {isX && <span style={{ fontFamily: FF, fontWeight: 800, fontSize: r * 1.15, color: RED, lineHeight: 1 }}>✕</span>}
            </div>
          );
        }
        if (m.k === "hbar") {
          const x0 = PX(m.x0), x1 = PX(m.x1);
          const w = (x1 - x0) * on;
          return <div key={i} style={{ position: "absolute", left: x0, top: PY(m.y) - 5, width: w, height: 10, borderRadius: 5, background: c, boxShadow: `0 0 22px ${c}dd`, opacity: on }} />;
        }
        const y0 = PY(m.y0), y1 = PY(m.y1);
        const h = (y1 - y0) * on;
        return <div key={i} style={{ position: "absolute", left: PX(m.x) - 5, top: y0, width: 10, height: h, borderRadius: 5, background: c, boxShadow: `0 0 22px ${c}dd`, opacity: on }} />;
      })}
    </div>
  );
};

const Plate: React.FC<{ v: View; op: number; drift: number }> = ({ v, op, drift }) => {
  const z = v.z * (1 + drift * 0.02);
  const iw = IMG_W * z, ih = IMG_H * z;
  const tx = Math.max(VP.w - iw, Math.min(0, VP.w / 2 - v.fx * iw));
  const ty = Math.max(VP.h - ih, Math.min(0, VP.h / 2 - v.fy * ih));
  return (
    <div style={{ position: "absolute", left: VP.left, top: VP.top, width: VP.w, height: VP.h, opacity: op, overflow: "hidden" }}>
      <Img src={staticFile(v.img)} style={{ position: "absolute", left: 0, top: 0, width: IMG_W, height: IMG_H, transformOrigin: "0 0", transform: `translate(${tx}px, ${ty}px) scale(${z})` }} />
    </div>
  );
};

const Chart: React.FC<{ op: number }> = ({ op }) => {
  const f = useCurrentFrame();
  const i = curViewIdx(f);
  const id = VIEW_IDS[i];
  const cur = VIEW[id];
  const prev = i > 0 ? VIEW[VIEW_IDS[i - 1]] : cur;
  const t = ease(clamp01((f - O(id)) / 14));          // snap ngắn 14f tại onset
  const drift = clamp01((f - O(id)) / 240);           // trôi rất nhẹ trong câu

  // cùng ảnh -> nội suy khung ngắm; khác ảnh -> crossfade 2 tấm
  const sameImg = prev.img === cur.img;
  const lerped: View = sameImg
    ? { img: cur.img, fx: prev.fx + (cur.fx - prev.fx) * t, fy: prev.fy + (cur.fy - prev.fy) * t, z: prev.z + (cur.z - prev.z) * t }
    : cur;

  const sy = (() => {
    const c = SPOT_Y[id];
    if (c === undefined) return 50;
    const p = i > 0 ? SPOT_Y[VIEW_IDS[i - 1]] : c;
    return (p === undefined ? c : p) + (c - (p === undefined ? c : p)) * t;
  })();

  return (
    <AbsoluteFill style={{ opacity: op }}>
      <AbsoluteFill style={{ background: BG }} />
      {!sameImg && <Plate v={prev} op={1 - t} drift={1} />}
      <Plate v={lerped} op={sameImg ? 1 : t} drift={drift} />
      {/* spotlight: thu hẹp + đậm hơn để THẤY RÕ vùng đang nói, nhưng chưa tới mức xoá nhãn */}
      <div style={{ position: "absolute", left: VP.left, top: VP.top, width: VP.w, height: VP.h, pointerEvents: "none", background: `radial-gradient(ellipse 52% 26% at 50% ${sy}%, rgba(10,22,40,0) 42%, rgba(10,22,40,0.34) 74%, rgba(10,22,40,0.58) 100%)` }} />
      <MarkLayer v={lerped} on={appear(f, O(id), 14)} />
    </AbsoluteFill>
  );
};

// =========================================================================
// TEASER APP (tz1-tz4): clip app thật + disclaimer dòng riêng (L22).
const TeaserApp: React.FC<{ op: number }> = ({ op }) => {
  const head = appear(useCurrentFrame(), O("tz1"), 16);
  const top = 168, CH = 1636, CW = Math.round(CH * 0.462); // 756×1636, giữ tỷ lệ gốc clip
  const left = 540 - CW / 2;
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <AbsoluteFill style={{ background: "rgba(8,14,32,0.96)" }} />
      <div style={{ position: "absolute", left: 60, right: 60, top: 128, textAlign: "center", opacity: head, fontFamily: FF, fontWeight: 800, fontSize: 30, letterSpacing: 1, color: GOLD }}>SẮP RA MẮT · Cơ hội tiềm năng</div>
      <div style={{ position: "absolute", left, top, width: CW, height: CH, borderRadius: 30, overflow: "hidden", background: "#0a1628", border: "3px solid rgba(170,117,255,0.45)", boxShadow: `0 26px 70px rgba(0,0,0,.6), 0 0 44px rgba(123,58,236,0.35)` }}>
        <Sequence from={O("tz1")} layout="none">
          <OffthreadVideo src={staticFile("app_cohoi_tiemnang.mov")} playbackRate={0.84} muted style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </Sequence>
      </div>
      <div style={{ position: "absolute", left: 40, right: 40, top: 1832, textAlign: "center", opacity: head, fontFamily: FF, fontWeight: 600, fontSize: 22, color: "#8496b5" }}>Nội dung mang tính tham khảo, không phải khuyến nghị mua bán.</div>
    </AbsoluteFill>
  );
};

// =========================================================================
// CẦU SANG VIDEO SAU (s40-s42): card chữ (L26 — đoạn kết không pan lại chart).
const BridgeNext: React.FC<{ op: number }> = ({ op }) => {
  const f = useCurrentFrame();
  const done = appear(f, O("s40"), 14);
  const half = appear(f, O("s41") + 4, 14);
  const next = appear(f, O("s42") + 4, 14);
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #1a1440 0%, #0a1628 84%)" }} />
      {/* nền đỡ: bản đồ mờ để card không trống trơn */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 760, overflow: "hidden", opacity: 0.16 }}>
        <Img src={staticFile(MAP)} style={{ position: "absolute", left: 0, top: -20, width: 1080 }} />
      </div>
      {done > 0.01 && (
        <div style={{ position: "absolute", left: 540, top: 480, transform: `translate(-50%,-50%) scale(${0.94 + done * 0.06})`, opacity: done * 0.92, background: "rgba(52,211,153,0.14)", border: `2px solid ${GREEN}`, color: "#fff", fontFamily: FF, fontWeight: 800, fontSize: 40, padding: "22px 40px", borderRadius: 22, textAlign: "center", whiteSpace: "nowrap", boxShadow: `0 0 30px ${GREEN}44` }}>Nửa phần MUA ✓</div>
      )}
      {half > 0.01 && (
        <div style={{ position: "absolute", left: 80, right: 80, top: 660, textAlign: "center", opacity: half, fontFamily: FF, fontWeight: 800, fontSize: 44, lineHeight: 1.3, color: "#fff" }}>Còn khi cái hộp đó là một <span style={{ color: RED }}>cái đỉnh</span>?<br /><span style={{ color: PURL, fontSize: 40 }}>tránh ở đâu, thoát ở đâu</span></div>
      )}
      {next > 0.01 && (
        <div style={{ position: "absolute", left: 80, right: 80, top: 940, transform: `scale(${0.95 + next * 0.05})`, opacity: next, background: "rgba(245,197,66,0.14)", border: `2px solid ${GOLD}`, borderRadius: 24, padding: "28px 30px", textAlign: "center", boxShadow: `0 0 34px ${GOLD}55` }}>
          <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 42, lineHeight: 1.28, color: "#fff" }}>Phần hai · lật ngược tấm gương<br /><span style={{ color: GOLD }}>+ bốn giới hạn của phương pháp</span></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// =========================================================================
// CTA (s43-s45): theo dõi + 2 hình store + brand spine
const StoreCard: React.FC<{ src: string; label: string; on: number }> = ({ src, label, on }) =>
  on <= 0.01 ? null : (
    <div style={{ opacity: on, transform: `translateY(${(1 - on) * 40}px) scale(${0.96 + on * 0.04})` }}>
      <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 26, color: PURL, textAlign: "center", marginBottom: 12 }}>{label}</div>
      <div style={{ width: 406, borderRadius: 26, overflow: "hidden", border: "2px solid rgba(170,117,255,0.4)", boxShadow: "0 18px 44px rgba(0,0,0,0.5)" }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    </div>
  );
const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const follow = appear(f, O("s43") + 4, 14);
  const app0 = appear(f, O("s44") + 8, 14);
  const app1 = appear(f, O("s44") + 20, 14);
  const spine = appear(f, O("s45"), 16);
  const kb = 1 + clamp01((f - O("s45")) / 120) * 0.05;
  return (
    <AbsoluteFill>
      {/* nền đỡ: đoạn s43 trước khi 2 hình store hiện lên vốn trống ~4 giây */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 420, height: 900, overflow: "hidden", opacity: 0.12 }}>
        <Img src={staticFile(TGT)} style={{ position: "absolute", left: 0, top: 0, width: 1080 }} />
      </div>
      <div style={{ position: "absolute", left: 540, top: 250, transform: `translate(-50%,-50%) scale(${0.9 + follow * 0.1})`, opacity: follow, display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.06)", border: `1.5px solid ${PURL}`, borderRadius: 28, padding: "18px 38px", fontFamily: FF, fontWeight: 800, fontSize: 42, color: "#fff", whiteSpace: "nowrap" }}>🔔 Theo dõi để đón phần hai</div>
      {app0 > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 392, textAlign: "center", opacity: app0, fontFamily: FF, fontWeight: 800, fontSize: 36, letterSpacing: 0.5, color: GOLD }}>Tải app KFSP · App Store & CH Play</div>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: 478, display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 26 }}>
        <StoreCard src="store-ios.jpg" label="App Store" on={app0} />
        <StoreCard src="store-android.jpg" label="CH Play" on={app1} />
      </div>
      {spine > 0.01 && (
        <div style={{ position: "absolute", left: 540, top: 1440, transform: `translate(-50%,-50%) scale(${(0.94 + spine * 0.06) * kb})`, opacity: spine, background: "rgba(10,22,40,0.82)", borderRadius: 22, padding: "16px 36px", fontFamily: FF, fontWeight: 800, fontSize: 44, color: PURL, textAlign: "center", whiteSpace: "nowrap", boxShadow: "0 8px 30px rgba(0,0,0,.6)" }}>KFSP, đưa chứng khoán về tầm tay bạn</div>
      )}
    </AbsoluteFill>
  );
};

// =========================================================================
// PHỤ ĐỀ từng beat (script chuẩn, KHÔNG dùng whisper). Beat có CHIP thì để rỗng (L17/L19).
const CAP: Record<string, string> = {
  s10: "Sai lầm phổ biến: mua khi mọi thứ còn lưng chừng",
  s10b: "Đừng mua ở giữa hộp: cung với cầu còn giằng co",
  s11: "Cũng đừng đoán đáy khi nhịp giảm còn đang rơi",
  s12: "Chỗ đáng vào ở chặng cuối, khi cầu đã thắng cung",
  s12b: "Khác biệt: có dấu hiệu để biết, không vào theo cảm giác",
  s13: "Điểm mua thứ nhất: ngay sau cú giũ",
  s14: "Giá thủng biên dưới trên khối lượng cạn khô, rồi bật lại",
  s15: "Riêng cú giũ chưa phải lệnh mua, vào ngay là dễ mắc kẹt",
  s16: "Cái cần chờ là xác nhận: nến dài kèm khối lượng lớn",
  s17: "Đó là Dấu hiệu sức mạnh, cầu đã thắng cung",
  s18: "Điểm mua: nhịp bật lên sau cú giũ, có xác nhận",
  s19: "Điểm dừng lỗ đặt ngay dưới đáy của cú giũ",
  s20: "Thủng đáy đó lần nữa là cú giũ không thành, rời đi là đúng",
  s21: "",
  s22: "Không bắt kịp nhịp đó? Cấu trúc thường cho thêm cơ hội",
  s23: "Giá vượt biên trên, rồi biên cũ được test lại một lần",
  s24: "Wyckoff ví như con suối: giá đã nhảy qua suối kháng cự",
  s25: "Giờ quay lại mép suối xem lớp nền cũ có đỡ được không",
  s26: "Nhịp quay lại này gọi là Điểm hỗ trợ cuối",
  s27: "Thân nến co lại, khối lượng cạn: kháng cự thành hỗ trợ",
  s28: "Điểm dừng lỗ đặt ngay dưới điểm hỗ trợ cuối",
  s29: "Thủng luôn vùng này thì cấu trúc hỏng, rời đi gọn gàng",
  s30: "",
  tz1: "",
  tz2: "App KFSP sắp ra mắt: Cơ hội tiềm năng",
  tz3: "AI lọc sẵn cổ phiếu vào mẫu hình + mức giá cần để mắt",
  tz4: "Hoặc tham khảo ý tưởng vị thế mua và AI thực hiện",
  s31: "Vào rồi thì kỳ vọng giá đi tới đâu?",
  s32: "Quy luật thứ hai của Wyckoff: Nhân và Quả",
  s33: "Hộp càng rộng càng dài, nhân tích luỹ càng lớn",
  s34: "Nhân lớn thì quả cũng lớn: sóng sau đi được xa hơn",
  s35: "Bề ngang vùng tích luỹ ước lượng bề cao con sóng",
  s36: "Đo bề ngang hộp, chiếu lên từ điểm giá vượt biên",
  s37: "Nhớ kỹ hai chữ ước lượng",
  s38: "Mốc để biết trước sẽ chốt ở đâu, không bán sớm không ôm lâu",
  s39: "",
};
const CHIP: Record<string, { k: string; t: string; tone?: string }> = {
  s21: { k: "Điều cần thấy", t: "Cú giũ chỉ mở cửa. Dấu hiệu sức mạnh mới là lời mời vào, stop dưới đáy cú giũ.", tone: GREEN },
  s30: { k: "Điều cần thấy", t: "Quay lại mép biên cũ trên khối lượng cạn là cơ hội thứ hai, stop dưới điểm hỗ trợ cuối.", tone: GREEN },
  s39: { k: "Điều cần thấy", t: "Bề ngang cái hộp ước lượng bề cao con sóng. Là mốc tham khảo, không phải lời hứa.", tone: GOLD },
};

// ============================================================
export const Scene: React.FC = () => {
  const f = useCurrentFrame();

  const hookOp = clamp01(appear(f, O("s01"), 12) - appear(f, O("s06") - 8, 14));
  const bridgeOp = clamp01(appear(f, O("s06"), 14) - appear(f, O("s10") - 8, 14));
  // chart = 2 khoảng, bị teaser ngắt ở giữa: (s10 → tz1) và (s31 → s40)
  const chartA = clamp01(appear(f, O("s10"), 14) - appear(f, O("tz1") - 8, 14));
  const chartB = clamp01(appear(f, O("s31"), 14) - appear(f, O("s40") - 8, 14));
  const chartOp = Math.max(chartA, chartB);
  const teaserOp = clamp01(appear(f, O("tz1"), 14) - appear(f, O("s31") - 8, 14));
  const nextOp = clamp01(appear(f, O("s40"), 14) - appear(f, O("s43") - 8, 14));
  const endOp = appear(f, O("s43") - 4, 12);

  const beat = activeBeat(f);
  const chipData = CHIP[beat];
  const chipOn = chipData ? appear(f, O(beat), 12) : 0;
  const capText = chipData ? "" : (CAP[beat] || "");
  const capOn = appear(f, O(beat), 10);
  const showCap = chartOp > 0.5 || teaserOp > 0.5;

  return (
    <AbsoluteFill style={bgFill}>
      {hookOp > 0.01 && <Hook op={hookOp} />}
      {bridgeOp > 0.01 && <Bridge op={bridgeOp} />}
      {chartOp > 0.01 && <Chart op={chartOp} />}
      {teaserOp > 0.01 && <TeaserApp op={teaserOp} />}
      {nextOp > 0.01 && <BridgeNext op={nextOp} />}
      {endOp > 0.01 && <div style={{ opacity: endOp, position: "absolute", inset: 0 }}><EndCard /></div>}

      {showCap && capText && <div style={{ position: "absolute", left: 0, right: 0, top: 1320, height: 220, background: "linear-gradient(to bottom, rgba(10,22,40,0) 0%, rgba(10,22,40,0.55) 40%, rgba(10,22,40,0) 100%)", opacity: capOn }} />}
      {showCap && <Caption text={capText} on={capOn} />}
      {chipData && chartOp > 0.5 && <SeeChip kicker={chipData.k} text={chipData.t} on={chipOn} tone={chipData.tone} />}
    </AbsoluteFill>
  );
};
