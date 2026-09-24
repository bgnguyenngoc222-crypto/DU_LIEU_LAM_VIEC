# 🧊 Quy Chuẩn Thiết Kế 3D Glassmorphism: Convert Flat UI Card → Premium 3D Floating Object

> Tài liệu quy chuẩn lưu trữ trong danh mục **Kien_Thuc_Design/03_Xu_Huong_Design/**.
> Skill tương ứng trong repo: `.agents/skills/convert-3d-glassmorphism/SKILL.md`

---

## 🎯 1. Vai trò & Mục tiêu (Role & Objective)

Chuyển đổi mọi giao diện phẳng (Flat UI Card, Widget, Panel thống kê, Popup, Notification, App component) thành **Vật thể 3D Glassmorphism nổi cao cấp (Floating 3D Glassmorphism)**.

* **Nguyên tắc bảo tồn 100% dữ liệu**: Giữ nguyên toàn bộ văn bản, con số, biểu tượng, logo, đường viền, khoảng cách và bố cục của hình ảnh gốc. Không bịa đặt (hallucinate), không chỉnh sửa nội dung.
* **Định chuẩn chất lượng**: Tương đương render visual từ Apple VisionOS, Linear, Arc Browser, Stripe Dashboard, Revolut, TradingView Premium.

---

## 📐 2. Bộ Thông Số Công Thức 3D (3D Formula)

### 2.1. Perspective & Depth (Phối cảnh & Độ sâu)
- **Top width**: 97% – 99%
- **Bottom width**: 100%
- **Perspective depth**: 3% – 6%
- **Floating depth**: Độ nổi từ 5cm – 15cm so với mặt nền.

### 2.2. Rotation & Skew (Góc xoay & Độ lệch)
- **Góc xoay mặc định**: 8° – 12° (tuỳ chỉnh theo phỏng vấn user).
- **Small X skew**: 3% – 5% tạo chiều sâu góc nhìn thực tế.

### 2.3. Glass Material (Chất liệu kính mờ)
- **Dark Frosted Glass**: Kính tối màu mờ.
- **Opacity (Độ trong suốt)**: 80% – 90%.
- **Background Blur**: 24px – 36px.
- Giữ nguyên bo góc rounded corners của card gốc.

### 2.4. Border & Neon Glow (Viền & Ánh sáng dạ quang)
- **Độ dày viền**: 1px – 2px.
- **Màu viền tím dịu**: `#8A5CFF`.
- **Hiệu ứng Neon Glow**: `#7B3AEC`.
- **Opacity viền phát sáng**: 20% – 35%.

### 2.5. Reflection & Shadow (Vệt phản quang & Bóng đổ)
- **Reflective Strip**: Vệt sáng chéo màu trắng (`#FFFFFF`), Opacity 5-10%, Blur 20-50px, Blend Mode *Soft Light*.
- **Floating Shadow**: Khoảng cách 16-24px, Blur 60-100px, Opacity 20-35%.

---

## 🔄 3. Quy Trình Phỏng Vấn & Thực Hiện (Workflow)

Khi người dùng gửi ảnh UI card, AI **không tự ý sinh ảnh ngay** mà thực hiện theo các bước:

1. **Phân tích loại UI card**: Xác định xem đó là dashboard, popup, notification hay statistics panel.
2. **Đặt câu hỏi xác nhận góc nhìn**:
   - *Hướng xoay*: Rotate Left, Rotate Right, Isometric Left/Right, Perspective From Above/Below, Floating Straight.
   - *Góc xoay*: 8°, 10°, 15°...
   - *Mức độ góc nhìn*: Nhẹ / Trung bình / Mạnh.
   - *Hiệu ứng*: Có thêm phát sáng tím neon `#7B3AEC` không?
   - *Xử lý nền*: Tách nền trong suốt hay giữ nguyên nền gốc?
3. **Thực thi render/chuyển đổi visual**.
