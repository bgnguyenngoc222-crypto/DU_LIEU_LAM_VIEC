import { COLORS } from "../design";

interface Props {
  width: number;
  height: number;
  data: number[]; // 0..1 normalized
  stroke: string;
  fill?: string;
  showDots?: boolean;
}

export const MiniChart: React.FC<Props> = ({ width, height, data, stroke, fill, showDots }) => {
  if (data.length < 2) return null;
  const padX = 16;
  const padY = 16;
  const w = width - padX * 2;
  const h = height - padY * 2;
  const stepX = w / (data.length - 1);
  const points = data.map((v, i) => [padX + i * stepX, padY + h * (1 - v)] as const);
  const path = points
    .map((p, i) => (i === 0 ? `M ${p[0].toFixed(1)} ${p[1].toFixed(1)}` : `L ${p[0].toFixed(1)} ${p[1].toFixed(1)}`))
    .join(" ");
  const fillPath =
    fill !== undefined
      ? `${path} L ${points[points.length - 1][0].toFixed(1)} ${(padY + h).toFixed(1)} L ${padX.toFixed(1)} ${(padY + h).toFixed(1)} Z`
      : null;
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <rect x={0} y={0} width={width} height={height} rx={20} fill={COLORS.bgPanel} stroke={COLORS.border} />
      {fillPath && <path d={fillPath} fill={fill} opacity={0.18} />}
      <path d={path} fill="none" stroke={stroke} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      {showDots &&
        points.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={4} fill={stroke} />
        ))}
    </svg>
  );
};
