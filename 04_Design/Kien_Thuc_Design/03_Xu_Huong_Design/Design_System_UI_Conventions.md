# 03 — Design System & UI Conventions

## 1. Brand Colors (theme-independent)

| Token | Hex | Dart | CSS Variable |
|---|---|---|---|
| Brand Primary | `#7B3AEC` | `KfspColors.brandPrimary` | `--kfsp-primary` |
| Brand Primary Light | `#AA75FF` | `KfspColors.brandPrimaryLight` | `--kfsp-brand-primary-light` |
| Brand Primary Dark | `#5B20CC` | `KfspColors.brandPrimaryDark` | `--kfsp-brand-primary-dark` |

**Note:** Figma dùng `#7B3AEC` (confirmed). Spec gốc CLAUDE.md ghi `#AA35FF` — đã cập nhật sang `#7B3AEC` trong code + CLAUDE.md (2026-03-12). Tất cả 3 source copies + HTML prototypes đã sync.

## 2. Stock Colors (theme-independent)

| Token | Hex | Dart | Meaning | CSS Variable |
|---|---|---|---|---|
| Stock Up | `#0DBE55` | `KfspColors.stockUp` | Tăng giá (xanh tươi) | `--kfsp-stock-up` |
| Stock Down | `#D32F2F` | `KfspColors.stockDown` | Giảm giá (đỏ đậm Finpath) | `--kfsp-stock-down` |
| Stock Ref | `#ECC800` | `KfspColors.stockRef` | Giá tham chiếu (dark gold — đổi từ #FFD700, 2026-03-28) | `--kfsp-stock-ref` |
| Stock Ceil | `#AA35FF` | `KfspColors.stockCeil` | Giá trần (tím) | `--kfsp-stock-ceil` |
