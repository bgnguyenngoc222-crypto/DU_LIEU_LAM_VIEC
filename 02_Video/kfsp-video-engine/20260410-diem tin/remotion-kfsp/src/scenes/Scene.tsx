import { interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import React from "react";
import { SceneConfig, CardItem, ListItem, GridItem } from "../types";
import { COLORS, FONTS, LAYOUT, GLASS_CARD } from "../design";

// ═══════════════════════════════════════════
// Universal Scene — MAU 1 Style
// Text-first, cards, lists, grids on dark bg
// ═══════════════════════════════════════════

// ─── Sub-components ───

const FadeIn: React.FC<{
  children: React.ReactNode;
  delay: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ children, delay, duration = 15, style }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [delay, delay + duration], [25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ opacity, transform: `translateY(${y}px)`, ...style }}>
      {children}
    </div>
  );
};

const GradLine: React.FC<{ delay: number; width?: number }> = ({ delay, width = 300 }) => {
  const frame = useCurrentFrame();
  const scaleX = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{
      width,
      height: 3,
      background: `linear-gradient(90deg, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
      borderRadius: 2,
      margin: "20px auto",
      transform: `scaleX(${scaleX})`,
    }} />
  );
};

const Card: React.FC<{ item: CardItem; delay: number }> = ({ item, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });

  return (
    <div style={{
      ...GLASS_CARD,
      opacity: enter,
      transform: `translateY(${(1 - enter) * 20}px)`,
      textAlign: "center",
      flex: 1,
      minWidth: 180,
      padding: "20px 16px",
    }}>
      {item.icon && <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>}
      <div style={{
        fontSize: 38,
        fontWeight: 900,
        color: item.color || COLORS.accentGold,
        lineHeight: 1.1,
      }}>
        {item.value}
      </div>
      <div style={{
        fontSize: 18,
        fontWeight: 600,
        color: COLORS.textSecondary,
        marginTop: 8,
      }}>
        {item.label}
      </div>
      {item.sublabel && (
        <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 4 }}>
          {item.sublabel}
        </div>
      )}
    </div>
  );
};

const RankedListItem: React.FC<{ item: ListItem; index: number; delay: number }> = ({ item, index, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      padding: "14px 20px",
      borderBottom: `1px solid rgba(255,255,255,0.06)`,
      opacity: enter,
      transform: `translateX(${(1 - enter) * 30}px)`,
      gap: 14,
    }}>
      {item.rank !== undefined && (
        <span style={{
          fontSize: 22,
          fontWeight: 800,
          color: COLORS.accentBlue,
          minWidth: 30,
        }}>
          {item.rank}
        </span>
      )}
      <span style={{
        fontSize: 26,
        fontWeight: 700,
        color: COLORS.textPrimary,
        flex: 1,
      }}>
        {item.name}
      </span>
      {item.tag && (
        <span style={{
          fontSize: 15,
          fontWeight: 600,
          color: item.tagColor || COLORS.accentBlue,
          background: `${item.tagColor || COLORS.accentBlue}18`,
          padding: "4px 12px",
          borderRadius: 8,
          textTransform: "uppercase",
        }}>
          {item.tag}
        </span>
      )}
      {item.value && (
        <span style={{
          fontSize: 26,
          fontWeight: 800,
          color: item.color || COLORS.accentGold,
        }}>
          {item.value}
        </span>
      )}
    </div>
  );
};

const GridCard: React.FC<{ item: GridItem; delay: number }> = ({ item, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });

  return (
    <div style={{
      ...GLASS_CARD,
      opacity: enter,
      transform: `scale(${0.9 + enter * 0.1})`,
      flex: "1 1 45%",
      minWidth: 200,
      padding: "24px 20px",
    }}>
      {item.icon && <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>}
      <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.textPrimary }}>
        {item.title}
      </div>
      {item.subtitle && (
        <div style={{ fontSize: 16, color: COLORS.textMuted, marginTop: 6 }}>
          {item.subtitle}
        </div>
      )}
    </div>
  );
};

const CTAButton: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 60 } });
  // Subtle pulse
  const pulse = 1 + Math.sin((frame - delay) * 0.08) * 0.02;

  return (
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
      padding: "18px 48px",
      borderRadius: 16,
      opacity: enter,
      transform: `scale(${enter * pulse})`,
      textAlign: "center",
    }}>
      <span style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{text}</span>
    </div>
  );
};

// ─── Main Scene Component ───

export const Scene: React.FC<{ config: SceneConfig }> = ({ config }) => {
  const frame = useCurrentFrame();

  // Screenshot as subtle background
  const screenshotOpacity = config.screenshot
    ? interpolate(frame, [0, 30], [0, 0.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Optional screenshot background */}
      {config.screenshot && (
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          opacity: screenshotOpacity,
        }}>
          <Img
            src={staticFile(config.screenshot)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(8px) brightness(0.5)",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div style={{
        position: "absolute",
        top: LAYOUT.zoneA_top + 40,
        left: LAYOUT.contentPadding,
        right: LAYOUT.contentPadding,
        bottom: LAYOUT.zoneD_top,
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Label */}
        <FadeIn delay={0} style={{ textAlign: "center" }}>
          <p style={{ ...FONTS.label, margin: 0 }}>{config.label}</p>
        </FadeIn>

        {/* Heading */}
        {config.heading && (
          <>
            <FadeIn delay={8}>
              <p style={{
                ...FONTS.heading,
                fontSize: config.content?.type === "title" ? 56 : 48,
                textAlign: "center",
                margin: "16px 0 0",
                color: config.headingColor || COLORS.textPrimary,
              }}>
                {config.heading}
              </p>
            </FadeIn>
            <GradLine delay={12} width={280} />
          </>
        )}

        {/* Body text */}
        {config.body && (
          <FadeIn delay={18} style={{ textAlign: "center", marginBottom: 20 }}>
            <p style={{ ...FONTS.body, fontSize: 26, margin: 0 }}>{config.body}</p>
          </FadeIn>
        )}

        {/* Dynamic content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {config.content?.type === "title" && (
            <FadeIn delay={20} style={{ textAlign: "center" }}>
              <p style={{
                fontSize: 36,
                fontWeight: 600,
                color: COLORS.textSecondary,
                margin: 0,
              }}>
                Phiên {config.content.date}
              </p>
            </FadeIn>
          )}

          {config.content?.type === "cards" && (
            <div style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "0 10px",
            }}>
              {config.content.items.map((item, i) => (
                <Card key={i} item={item} delay={22 + i * 6} />
              ))}
            </div>
          )}

          {config.content?.type === "list" && (
            <div style={{
              ...GLASS_CARD,
              padding: 0,
              overflow: "hidden",
            }}>
              {config.content.items.map((item, i) => (
                <RankedListItem key={i} item={item} index={i} delay={22 + i * 5} />
              ))}
            </div>
          )}

          {config.content?.type === "grid" && (
            <div style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "0 10px",
            }}>
              {config.content.items.map((item, i) => (
                <GridCard key={i} item={item} delay={22 + i * 6} />
              ))}
            </div>
          )}

          {config.content?.type === "cta" && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
            }}>
              {config.content.features && (
                <div style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}>
                  {config.content.features.map((feat, i) => (
                    <FadeIn key={i} delay={22 + i * 5}>
                      <span style={{
                        background: COLORS.bgCard,
                        border: `1px solid ${COLORS.bgCardBorder}`,
                        padding: "10px 20px",
                        borderRadius: 20,
                        fontSize: 20,
                        fontWeight: 600,
                        color: COLORS.textSecondary,
                      }}>
                        {feat}
                      </span>
                    </FadeIn>
                  ))}
                </div>
              )}
              <CTAButton text={config.content.buttonText} delay={40} />
            </div>
          )}

          {config.content?.type === "quote" && (
            <FadeIn delay={20}>
              <div style={{
                ...GLASS_CARD,
                borderLeft: `4px solid ${COLORS.gradientStart}`,
                padding: "28px 32px",
              }}>
                <p style={{
                  fontSize: 30,
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  lineHeight: 1.5,
                  margin: 0,
                  fontStyle: "italic",
                }}>
                  "{config.content.text}"
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute",
        bottom: 60,
        left: "50%",
        transform: "translateX(-50%)",
        width: 300,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${COLORS.gradientStart}40, ${COLORS.gradientEnd}40, transparent)`,
      }} />
    </div>
  );
};
