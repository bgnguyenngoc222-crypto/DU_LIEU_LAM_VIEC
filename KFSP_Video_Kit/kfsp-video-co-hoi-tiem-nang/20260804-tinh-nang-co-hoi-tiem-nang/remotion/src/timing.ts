export const FPS = 30;
export const TOTAL_F = 780; // 26,0 giây

/** Mốc nội dung màn hình — xem STORYBOARD.md mục 2 */
export const SCREEN = {
  store: { in: 0, out: 96 },
  home: { from: 96, in: 96, out: 183 },
  list: { from: 183, in: 183, out: 399 },
  chart: { from: 399, in: 399, out: 537 },
  hhp: { from: 537, in: 537, out: 690 },
} as const;

export const CROSS = 18; // độ dài chồng mờ trên màn

/** Mốc lớp chữ và thẻ chú giải */
export const LAYER = {
  hook: { from: 24, to: 100 },
  feature: { from: 108, to: 205 },
  spot: { from: 205, to: 295 },
  call1: { from: 215, to: 300 },
  call2: { from: 322, to: 384 },
  call3: { from: 435, to: 520 },
  call4: { from: 570, to: 645 },
  closing: { from: 650, to: 702 },
  brand: { from: 700, to: 780 },
} as const;
