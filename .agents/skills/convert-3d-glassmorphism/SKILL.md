---
name: convert-3d-glassmorphism
description: >
  Convert any flat UI card, dashboard widget, notification card, statistics panel, finance interface, or application component into a premium floating 3D glassmorphism object while preserving 100% of information from the original.
  TRIGGERS: "convert flat ui card", "3d glassmorphism", "biến card 3d", "tạo card 3d glassmorphism", "biến ui thành 3d", "card 3d fintech", "floating 3d card", "glassmorphism UI", "3d UI card", "biến ảnh UI thành 3d".
---

# Convert Flat UI Card → Premium 3D Glassmorphism Floating Card

Skill chuyển đổi mọi UI card phẳng (dashboard, popup, widget, bảng thống kê, notification, panel...) thành vật thể 3D glassmorphism nổi cao cấp theo chuẩn thiết kế Fintech (Apple VisionOS, Linear, Stripe, Revolut).

## Workflow

Khi người dùng gửi/tải lên một hình ảnh UI card:

1. **Phân tích hình ảnh**: Xác định loại UI (card, widget, dashboard, popup, notification...). DO NOT ngay lập tức tạo ảnh mà phải chờ thông số từ người dùng.
2. **Phỏng vấn thông số (Hỏi người dùng)**:
   - **Góc nghiêng / Hướng xoay**:
     1. Rotate Left (Apple style)
     2. Rotate Right
     3. Isometric Left
     4. Isometric Right
     5. Perspective From Above
     6. Perspective From Below
     7. Floating Straight
     8. Custom angle
   - **Mức độ xoay & Góc nhìn**: Độ xoay (8°, 10°, 15°...), Góc nhìn (nhẹ / trung bình / mạnh).
   - **Hiệu ứng neon / ánh sáng**: Có thêm hiệu ứng phát sáng tím `#7B3AEC` / `#8A5CFF` không?
   - **Nền (Background)**: Tách nền hoàn toàn (trong suốt) hay giữ nguyên nền gốc?
3. **Thực thi chuyển đổi**: Áp dụng bộ quy tắc 3D Glassmorphism tại [`reference/3d-glassmorphism-rules.md`](reference/3d-glassmorphism-rules.md) để tạo prompt/sinh ảnh hoặc hướng dẫn rendering.

---

## Quy tắc vàng (Core Rules)

- **Bảo toàn nội dung 100%**: Ảnh gốc là nguồn dữ kiện duy nhất. KHÔNG hallucinate, KHÔNG viết lại chữ/con số, KHÔNG đơn giản hóa, KHÔNG đổi font/spacing/icon trừ khi người dùng yêu cầu.
- **Tập trung nâng cấp thị giác**: Chỉ thay đổi diện mạo thị giác thành vật thể 3D glassmorphism nổi premium.

---

## Registry Reference

| File | Nội dung |
|---|---|
| [`reference/3d-glassmorphism-rules.md`](reference/3d-glassmorphism-rules.md) | Bộ thông số 3D Formula (Perspective, Rotation, Skew, Glass Material, Reflection, Shadow, Ambient Light) |

---

## Changelog
- 2026-08-03: Khởi tạo skill `convert-3d-glassmorphism` theo chuẩn universal Fintech Glassmorphism card 3D.
