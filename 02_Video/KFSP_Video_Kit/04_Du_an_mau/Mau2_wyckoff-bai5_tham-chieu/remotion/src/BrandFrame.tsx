/**
 * KFSP Brand Frame — lớp nhận diện dùng CHUNG cho mọi video (brand & nobrand).
 * Đóng băng 2026-06-05 từ video "4 điểm vào lệnh". Brand tokens lấy từ app
 * KFSP_App_Flutter/lib/core/constants/kfsp_colors.dart.
 *
 * Cách dùng trong 1 video Remotion:
 *   import { BrandOverlay, BrandLogo, BRAND } from "../../_shared/remotion/BrandFrame";
 *   // cuối <Main>, SAU scenes, TRƯỚC/ngang Subtitle:
 *   <BrandOverlay />
 *   <BrandLogo nobrand={NOBRAND} />   // nobrand=true -> ẩn logo, vẫn giữ overlay tím
 *   // copy public/logo-kfsp.png vào video (logo gốc, component tự đổi sang trắng)
 *
 * Quy ước brand-status: kênh KFSP = brand (logo hiện) · kênh "Một tay đầu tư" = nobrand.
 * Chỉ khác có logo hay không; lớp phủ tím GIỮ Ở CẢ HAI để luôn nhận ra KFSP.
 */
import { AbsoluteFill, Img, staticFile } from "remotion";

// ----- Brand tokens (nguồn: app kfsp_colors.dart) -----
export const BRAND = {
  purple: "#7B3AEC",       // primary
  purpleLight: "#AA75FF",  // primaryLight — dùng cho tiêu đề trên nền tối
  purpleDark: "#5B20CC",   // primaryDark
  purpleRGB: "123,58,236", // cho rgba() overlay
  darkBg: "#0a1628",       // nền video (navy)
  green: "#34d399",        // tăng
  red: "#f87171",          // giảm
  gold: "#f5c542",         // nhấn
} as const;

// Safe zone TikTok/Shorts/Reels (1080x1920)
export const SAFE = {
  logoTop: 78,        // logo nằm dưới mép trên
  subtitleTop: 1380,  // phụ đề (y < 1500)
  progressY: 1490,
} as const;

// ----- Lớp phủ gradient tím brand trên+dưới (nhẹ, tinh tế) -----
export const BrandOverlay: React.FC<{ bottom?: boolean }> = ({ bottom = true }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 380,
      background: `linear-gradient(180deg, rgba(${BRAND.purpleRGB},0.40) 0%, rgba(${BRAND.purpleRGB},0.13) 52%, rgba(${BRAND.purpleRGB},0) 100%)` }} />
    {bottom && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 480,
      background: `linear-gradient(0deg, rgba(${BRAND.purpleRGB},0.46) 0%, rgba(${BRAND.purpleRGB},0.15) 50%, rgba(${BRAND.purpleRGB},0) 100%)` }} />}
  </AbsoluteFill>
);

// ----- Logo KFSP trắng, top-center (ẩn khi nobrand) -----
export const BrandLogo: React.FC<{ nobrand?: boolean; fontFamily?: string }> = ({ nobrand, fontFamily }) => {
  if (nobrand) return null;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
      <div style={{ position: "absolute", top: SAFE.logoTop, display: "flex", alignItems: "center", gap: 10 }}>
        <Img src={staticFile("logo-kfsp.png")} style={{ width: 56, height: 56, objectFit: "contain",
          filter: "brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,.5))" }} />
        <div style={{ fontFamily, fontSize: 30, fontWeight: 800, letterSpacing: 4, color: "#ffffff",
          textShadow: "0 2px 8px rgba(0,0,0,.5)" }}>KFSP</div>
      </div>
    </AbsoluteFill>
  );
};
