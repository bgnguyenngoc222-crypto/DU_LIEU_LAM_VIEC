import { AbsoluteFill, spring } from "remotion";

/**
 * CTA cuối video CHUẨN KFSP (chốt 2026-06-15, mẫu từ video "3 câu hỏi siêu cổ phiếu").
 * Dùng cho CẢ brand & nobrand — brand tự thêm logo+KFSP top qua <BrandLogo/> của video.
 * Layout: dòng giá trị trắng + spine tím "Chứng khoán trong tầm tay bạn" + nút glow "Theo dõi mình nha".
 *
 * Dùng:
 *   import { CtaFinal } from "../../../_shared/remotion/CtaFinal";
 *   <CtaFinal f={local} ff={FF} />            // f = local frame của scene
 * Tuỳ biến: valueLines / spineLines / button / fps.
 */
const PUR = "#7B3AEC", TITLEC = "#AA75FF";
const fpsDefault = 30;

export const CtaFinal: React.FC<{
  f: number;
  ff: string;
  fps?: number;
  valueLines?: [string, string];
  spineLines?: [string, string];
  button?: string;
}> = ({ f, ff, fps = fpsDefault, valueLines = ["Mỗi ngày thêm", "một mẹo giao dịch"],
       spineLines = ["Chứng khoán", "trong tầm tay bạn"], button = "Theo dõi mình nha" }) => {
  const cs = (d: number, cfg: any = { damping: 16, stiffness: 170 }) => spring({ frame: f - d, fps, config: cfg });
  const pop = (d: number, dist = 40) => ({ opacity: Math.min(1, cs(d) * 1.2), transform: `translateY(${(1 - cs(d)) * dist}px)` });
  const fb = cs(18, { damping: 11, stiffness: 220 });
  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 34%, #14253f 0%, #0a1628 74%)", fontFamily: ff, color: "#f2f6ff" }}>
      <div style={{ position: "absolute", top: 430, left: 60, right: 60, textAlign: "center" }}>
        <div style={{ ...pop(0), fontFamily: ff, fontSize: 60, fontWeight: 800, lineHeight: 1.2, color: "#fff" }}>{valueLines[0]}<br />{valueLines[1]}</div>
        <div style={{ ...pop(10), marginTop: 36, fontFamily: ff, fontSize: 64, fontWeight: 800, lineHeight: 1.18, color: TITLEC }}>{spineLines[0]}<br />{spineLines[1]}</div>
      </div>
      <div style={{ position: "absolute", top: 1180, left: "50%", transform: `translateX(-50%) scale(${0.6 + fb * 0.4})`,
        opacity: fb, background: PUR, color: "#fff", fontFamily: ff, fontSize: 44, fontWeight: 800, padding: "22px 56px",
        borderRadius: 44, whiteSpace: "nowrap", textAlign: "center",
        boxShadow: "0 0 50px rgba(123,58,236,.7), 0 12px 34px rgba(123,58,236,.55)" }}>{button}</div>
    </AbsoluteFill>
  );
};
