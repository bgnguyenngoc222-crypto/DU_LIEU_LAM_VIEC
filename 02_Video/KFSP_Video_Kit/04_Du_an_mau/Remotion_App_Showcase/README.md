# Remotion App Showcase & Launch Feature Video (16:9 Landscape)

Dự án Remotion chứa bộ sản phẩm video giới thiệu ứng dụng KFSP và ra mắt tính năng mới **"Cơ Hội Tiềm Năng"** theo chuẩn 16:9 ngang (1920×1080), 30fps, không voiceover (chỉ dùng phụ đề).

---

## 1. Composition: `KFSP_CoHoiTiemNang_16_9` (Ra mắt tính năng mới)

Video giới thiệu chuyên biệt tính năng **Cơ Hội Tiềm Năng** (`IF-2026-ngoc-005`):

- **Scene 1 (Frame 0 - 90 / 3s)**: Teasing tính năng mới với thẻ "TÍNH NĂNG MỚI ĐỘT PHÁ - CƠ HỘI TIỀM NĂNG" trên giao diện Dashboard (`kfsp-dashboard-home.png`).
- **Scene 2 (Frame 90 - 180 / 3s)**: Trình diễn 2 bộ công cụ quét tín hiệu Pro AI Mua/Bán (`kfsp-pro-ai-mua-ban-list.png`) & Quét mẫu hình Hai Đáy (`kfsp-pro-hai-day-list.png`).
- **Scene 3 (Frame 180 - 270 / 3s)**: Trực quan hóa chi tiết điểm vào lệnh và mẫu hình kỹ thuật trên đồ thị xoay ngang (`kfsp-chart-dhm-pattern-landscape.png`).
- **Scene 4 (Frame 270 - 360 / 3s)**: Khung kết thúc chứa tên tính năng "CƠ HỘI TIỀM NĂNG - Mang lợi thế về tầm tay bạn", logo KFSP trắng và brand spine *"ĐƯA CHỨNG KHOÁN VỀ TẦM TAY BẠN"*.

### Lệnh Render Video "Cơ Hội Tiềm Năng":
```bash
npx remotion render src/Root.tsx KFSP_CoHoiTiemNang_16_9 out/KFSP_CoHoiTiemNang_16_9.mp4
```

---

## 2. Composition: `KFSP_App_Showcase_16_9` (Tổng quan Ứng dụng)

Video giới thiệu tổng quan trải nghiệm app KFSP từ App Store đến Đồ thị kỹ thuật.

### Lệnh Render Video "Tổng quan App":
```bash
npx remotion render src/Root.tsx KFSP_App_Showcase_16_9 out/KFSP_App_Showcase_16_9.mp4
```
