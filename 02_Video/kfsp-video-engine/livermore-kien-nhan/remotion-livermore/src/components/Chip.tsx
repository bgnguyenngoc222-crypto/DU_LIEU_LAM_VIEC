import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SPRINGS, FONT_STACK } from "../design";

interface Props {
  popAtFrame: number; // frame at which chip pops
  children: React.ReactNode;
  color?: string;
  icon?: React.ReactNode;
  width?: number | string;
  height?: number;
  fontSize?: number;
}

export const Chip: React.FC<Props> = ({
  popAtFrame,
  children,
  color = COLORS.green,
  icon,
  width = "100%",
  height = 90,
  fontSize = 30,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - popAtFrame,
    fps,
    config: SPRINGS.decisive,
  });
  const visible = frame >= popAtFrame;
  if (!visible) return null;

  const opacity = Math.max(0, Math.min(1, s));
  const scale = 0.7 + 0.3 * s;
  return (
    <div
      style={{
        width,
        height,
        background: COLORS.bgPanel,
        border: `1.5px solid ${color}`,
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "0 22px",
        opacity,
        transform: `scale(${scale})`,
        boxShadow: `0 0 24px ${color}33`,
        fontFamily: FONT_STACK,
        color: COLORS.textPrimary,
        fontSize,
        fontWeight: 600,
      }}
    >
      {icon && <span style={{ fontSize: fontSize + 6 }}>{icon}</span>}
      <span>{children}</span>
    </div>
  );
};
