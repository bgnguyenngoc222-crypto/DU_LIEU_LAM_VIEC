// Bảng khoá ngôn ngữ hình — mục 1 của STORYBOARD.md
export const T = {
  purple: "#7B3AEC",
  purpleLight: "#AA75FF",
  purpleDark: "#5B20CC",
  ink: "#0f1424",
  font: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, system-ui, sans-serif',
} as const;

// Hố màn của ảnh mockup iPhone 17 Pro (879×1832) — đo bằng flood fill
export const HOLE = {
  left: 38 / 879,
  top: 42 / 1832,
  width: 804 / 879,
  height: 1748 / 1832,
} as const;

export const MOCK_RATIO = 879 / 1832; // rộng / cao của ảnh mockup
