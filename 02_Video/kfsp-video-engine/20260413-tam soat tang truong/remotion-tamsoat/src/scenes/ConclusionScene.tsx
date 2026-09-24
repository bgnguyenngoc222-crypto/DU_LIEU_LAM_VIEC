import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Img,
  staticFile,
} from "remotion";
import React from "react";
import { COLORS, FONTS, LAYOUT, SPRINGS } from "../design";

// ═══════════════════════════════════════════
// Conclusion Scene — f2267 to f3300 (1033 frames, 34.4s)
// Emotional arc: empowerment → transformation → decisive CTA → STILL
//
// Phase 1 (f0-f222):   "80%" — spring decisive
// Phase 2 (f222-f578): "Nam châm" — ease-in-out (transformation)
// Phase 3 (f578-f1033): CTA snap → ĐỨNG YÊN = tự tin tuyệt đối
// ═══════════════════════════════════════════

// ─── 80% counter — decisive snap ───
const BigPercent: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: SPRINGS.decisive });
  const count = Math.min(80, Math.round(
    interpolate(frame, [delay + 5, delay + 25], [0, 80], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    })
  ));

  return (
    <div style={{
      display: "flex", alignItems: "baseline", justifyContent: "center",
      opacity: enter, transform: `scale(${0.85 + enter * 0.15})`,
    }}>
      <span style={{ fontSize: 150, fontWeight: 700, color: COLORS.purple, fontFamily: FONTS.family, lineHeight: 1 }}>
        {count}
      </span>
      <span style={{ fontSize: 64, fontWeight: 700, color: COLORS.purple, fontFamily: FONTS.family }}>
        %
      </span>
    </div>
  );
};

// ─── CTA Button — decisive snap then PERFECTLY STILL ───
const CTAButton: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: SPRINGS.decisive });

  // NO pulse. NO glow animation. STILL = absolute confidence.
  return (
    <div style={{
      opacity: enter, transform: `scale(${enter})`,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
    }}>
      <div style={{
        background: COLORS.gradientLight, borderRadius: 24,
        padding: "22px 56px",
        boxShadow: "0 8px 32px rgba(124,58,237,0.25)",
      }}>
        <span style={{
          fontSize: 34, fontWeight: 700, color: "#fff",
          fontFamily: FONTS.family, letterSpacing: 2,
        }}>TẢI APP KFSP</span>
      </div>
      <span style={{ fontSize: 22, color: COLORS.textSecondary, fontFamily: FONTS.family }}>
        Link ở phần Bio kênh
      </span>
    </div>
  );
};

// ═══ MAIN ═══
export const ConclusionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary }}>

      {/* ─── Phase 1 (0-222f): "80% thời gian" — decisive ─── */}
      <Sequence from={0} durationInFrames={222}>
        <AbsoluteFill style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 20,
          padding: `0 ${LAYOUT.contentPadding}px`,
        }}>
          {(() => {
            const e = spring({ frame: frame - 8, fps, config: SPRINGS.calm });
            return <div style={{
              fontSize: 34, color: COLORS.textSecondary, fontFamily: FONTS.family,
              textAlign: "center", opacity: e,
            }}>Tối ưu được tới</div>;
          })()}

          <BigPercent delay={12} />

          {(() => {
            const e = spring({ frame: frame - 35, fps, config: SPRINGS.calm });
            return <div style={{
              fontSize: 32, fontWeight: 600, color: COLORS.textPrimary,
              fontFamily: FONTS.family, textAlign: "center",
              opacity: e, transform: `translateY(${(1 - e) * 10}px)`,
            }}>thời gian và công sức</div>;
          })()}

          {/* 3 pills — stagger L→R with spring resolve */}
          <div style={{ display: "flex", gap: 14, marginTop: 15 }}>
            {[
              { label: "5 bước", color: COLORS.purple },
              { label: "Tự động", color: COLORS.accentGreen },
              { label: "24/7", color: COLORS.accentBlue },
            ].map((pill, i) => {
              const pe = spring({ frame: frame - 50 - i * 10, fps, config: SPRINGS.resolve });
              return (
                <div key={i} style={{
                  background: `${pill.color}12`, border: `2px solid ${pill.color}25`,
                  borderRadius: 14, padding: "10px 22px",
                  opacity: pe, transform: `translateX(${(1 - pe) * -12}px)`,
                }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: pill.color, fontFamily: FONTS.family }}>
                    {pill.label}
                  </span>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ─── Phase 2 (222-578f): "Nam châm" — ease-in-out transformation ─── */}
      <Sequence from={222} durationInFrames={356}>
        <AbsoluteFill style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 28,
          padding: `0 ${LAYOUT.contentPadding}px`,
        }}>
          {/* "1600+ mã" — fade in */}
          {(() => {
            const e = spring({ frame: frame - 228, fps, config: SPRINGS.calm });
            return <div style={{
              fontSize: 38, fontWeight: 700, color: COLORS.textPrimary,
              fontFamily: FONTS.family, textAlign: "center", lineHeight: 1.3,
              opacity: e, maxWidth: 850,
            }}>
              Thay vì đuổi theo{"\n"}
              <span style={{ color: COLORS.accentRed }}>1600+ mã</span> trên thị trường
            </div>;
          })()}

          {/* Arrow transition L→R (progression) — ease-in-out */}
          {(() => {
            const arrowE = spring({ frame: frame - 260, fps, config: SPRINGS.calm });
            const textL = spring({ frame: frame - 255, fps, config: SPRINGS.calm });
            const textR = spring({ frame: frame - 275, fps, config: SPRINGS.resolve });
            return (
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{
                  fontSize: 26, color: COLORS.textMuted, fontFamily: FONTS.family,
                  opacity: textL, textDecoration: "line-through",
                }}>Sàng lọc thủ công</div>
                <svg width="44" height="22" viewBox="0 0 44 22" fill="none"
                  style={{ opacity: arrowE, transform: `translateX(${(1 - arrowE) * -20}px)` }}>
                  <path d="M4 11H36M30 5L38 11L30 17" stroke={COLORS.purple} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{
                  fontSize: 26, fontWeight: 700, color: COLORS.purple, fontFamily: FONTS.family,
                  opacity: textR,
                }}>Phân tích & Ra quyết định</div>
              </div>
            );
          })()}

          {/* "thỏi nam châm" */}
          {(() => {
            const e = spring({ frame: frame - 300, fps, config: SPRINGS.soft });
            return <div style={{
              fontSize: 32, color: COLORS.textSecondary, fontFamily: FONTS.family,
              textAlign: "center", lineHeight: 1.4, maxWidth: 800,
              opacity: e, transform: `translateY(${(1 - e) * 8}px)`,
            }}>
              Hãy để bản thân như thỏi{" "}
              <span style={{ color: COLORS.accentGreen, fontWeight: 700 }}>nam châm</span>
              {"\n"}hút cổ phiếu chất lượng
            </div>;
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* ─── Phase 3 (578-1033f): CTA — decisive snap → STILL ─── */}
      <Sequence from={578} durationInFrames={455}>
        <AbsoluteFill style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 25,
          padding: `0 ${LAYOUT.contentPadding}px`,
        }}>
          {/* Urgency text */}
          {(() => {
            const e = spring({ frame: frame - 585, fps, config: SPRINGS.resolve });
            return <div style={{
              fontSize: 30, color: COLORS.textSecondary, fontFamily: FONTS.family,
              textAlign: "center", opacity: e, maxWidth: 800,
            }}>Cơ hội không chờ những ai trì hoãn</div>;
          })()}

          {/* CTA — snaps in, then STILL */}
          <CTAButton delay={600} />

          {/* 7-day badge — decisive pop */}
          {(() => {
            const e = spring({ frame: frame - 625, fps, config: SPRINGS.decisive });
            return <div style={{
              opacity: e, transform: `scale(${e})`,
              background: COLORS.accentGold, borderRadius: 14, padding: "10px 24px",
            }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: FONTS.family }}>
                7 ngày miễn phí
              </span>
            </div>;
          })()}

          {/* Membership image — soft ending */}
          {(() => {
            const e = spring({ frame: frame - 660, fps, config: SPRINGS.soft });
            return <div style={{
              opacity: e, transform: `translateY(${(1 - e) * 12}px)`, marginTop: 8,
            }}>
              <Img src={staticFile("images/membership.png")} style={{
                width: 650, height: "auto", borderRadius: 14,
                boxShadow: `0 4px 20px ${COLORS.shadow}`,
              }} />
            </div>;
          })()}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
