---
name: kfsp-banner-infographic
description: >
  Tạo banner, infographic giáo dục đầu tư chứng khoán cho KFSP theo hệ thống nhận diện Dark Purple Fintech Glassmorphism. Hỗ trợ 2 layout: (A) Infographic Giáo dục (biểu đồ nến + thẻ glassmorphism giải thích khái niệm) và (B) Authority Wakeup Call (chân dung nhân vật quyền lực + câu hook cảnh báo + bối cảnh lịch sử). BẮT BUỘC hỏi người dùng chọn layout trước, rồi phỏng vấn đầy đủ thông tin cốt lõi theo checklist của layout đó trước khi sinh ảnh hoặc tạo prompt JSON.
  TRIGGERS: "tạo banner KFSP", "gen banner", "tạo infographic KFSP", "gen infographic", "banner cho bài viết", "ảnh minh họa KFSP", "thiết kế banner", "tạo ảnh bài viết", "banner mẫu hình", "infographic nến", "banner chứng khoán", "banner nhân vật", "banner huyền thoại", "banner authority", "banner wakeup call", "banner câu chuyện", "banner FOMO", "banner tâm lý đầu tư".
---

# KFSP Banner & Infographic Generation Workflow

Skill hỗ trợ tạo hình ảnh banner, infographic tài chính giáo dục cho KFSP theo phong cách **Premium Dark Purple Fintech Glassmorphism**, với **2 layout** phục vụ 2 tuyến content khác nhau.

---

## 🔀 BƯỚC 0: CHỌN LAYOUT

Trước khi phỏng vấn thông số, hỏi người dùng chọn 1 trong 2 layout:

| Layout | Tên | Dùng cho | Trọng tâm thị giác |
|---|---|---|---|
| **A** | **Infographic Giáo dục** (mặc định) | Giải thích khái niệm TA, tính năng app, chỉ báo kỹ thuật | Biểu đồ nến + thẻ glassmorphism |
| **B** | **Authority Wakeup Call** | Câu chuyện huyền thoại, bài học sai lầm, tâm lý FOMO | Chân dung nhân vật + câu hook cảnh báo |

Nếu người dùng nói "banner cho bài William O'Neil", "banner FOMO", "banner nhân vật" → gợi ý Layout B.
Nếu nói "banner mẫu hình Hai đáy", "infographic Cách break" → gợi ý Layout A.

---

## 🛑 BƯỚC 1: PHỎNG VẤN TRƯỚC KHI GEN ẢNH (INTAKE CHECKLIST)

Tuyệt đối **KHÔNG** tự ý sinh ảnh hoặc tạo prompt sơ sài ngay lập tức.

### Nếu Layout A (Infographic Giáo dục)

Hỏi người dùng **7 nhóm thông tin**:

1. **Nội dung chính**: Khái niệm/tính năng/bài học đầu tư cốt lõi muốn truyền tải là gì?
2. **Head Title (Tiêu đề chính)**: Tiêu đề in hoa (UPPERCASE) hiển thị ở đầu ảnh.
3. **Các nội dung bên trong**:
   - Các khối thông tin / thẻ (Section 01, 02, 03...): Tiêu đề và nội dung tóm tắt.
   - Điểm nhấn / con số nổi bật (Highlight): Ví dụ `-2,5%`, `Vượt đỉnh`, `Tín hiệu mua`...
   - Hành động đề xuất (Action items): 1 - 2 gợi ý hành động cụ thể trong app (ví dụ: Thêm vào Watchlist, Đặt cảnh báo).
4. **Mẫu hình chart / Nến minh họa**:
   - Có cần biểu đồ nến kỹ thuật không?
   - Nếu có: Loại mẫu hình (Hai đáy, VCP, Phá vỡ đỉnh, Cốc tay cầm...), các điểm chú thích (Đáy 1, Đáy 2, Đỉnh giữa, Vùng break...), đường hỗ trợ/kháng cự và mũi tên đo khoảng cách.
5. **Logo chính**: Có đưa logo KFSP không? Dạng Dark mode / Light mode / Text + Icon?
6. **Kích thước & Tỉ lệ khung hình (Canvas)**:
   - `1:1` (1080x1080px - Vuông Fanpage)
   - `16:9` (1920x1080px - Ngang / Banner web / YouTube)
   - `9:16` (1080x1920px - Dọc Story / Reels / TikTok)
   - `4:5` (1080x1350px - Dọc Facebook/Instagram)
7. **Thông tin liên quan khác**: Màu nhấn đặc biệt, mức độ chi tiết đồ thị, ghi chú phong cách bổ sung.

### Nếu Layout B (Authority Wakeup Call)

Đọc hướng dẫn chi tiết tại [`reference/Authority_Wakeup_Call_Layout.md`](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/.agents/skills/kfsp-banner-infographic/reference/Authority_Wakeup_Call_Layout.md), rồi hỏi người dùng **6 câu**:

1. **Nhân vật trung tâm** là ai? (William O'Neil, Jesse Livermore, Warren Buffett...)
2. **Câu Hook** (câu hỏi / cảnh báo xoáy vào nỗi đau)? Ví dụ: "BẠN CÓ ĐANG MUA ĐUỔI GIÁ VÌ SỢ LỠ CHUYẾN?"
3. **Dòng Sub text** (nguồn bài học / tên giải pháp)? Ví dụ: "Từ di sản nghiên cứu 140 năm của William O'Neil"
4. **Nội dung Nameplate** (tên + định vị ngắn)? Ví dụ: "WILLIAM O'NEIL · HUYỀN THOẠI CANSLIM"
5. **Bối cảnh 2 hình nổi hai bên** (midground)? Ví dụ: Trái: sàn NYSE 1960s. Phải: biểu đồ mẫu hình vẽ tay.
6. **Kích thước canvas**? `1:1` (1080x1080) hoặc `4:5` (1080x1350)

---

## 📋 BƯỚC 2: TỔNG HỢP VÀO CẤU TRÚC JSON CHUẨN

Sau khi người dùng cung cấp thông tin, điền vào cấu trúc JSON tham chiếu tương ứng:

- **Layout A**: [`Kien_Thuc_Design/03_Xu_Huong_Design/Mau_Prompt_Gen_Banner_Infographic_KFSP.json`](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/Kien_Thuc_Design/03_Xu_Huong_Design/Mau_Prompt_Gen_Banner_Infographic_KFSP.json)
- **Layout B**: [`reference/Authority_Wakeup_Call_Layout.json`](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/.agents/skills/kfsp-banner-infographic/reference/Authority_Wakeup_Call_Layout.json)

---

## 🎨 BƯỚC 3: THỰC THI SINH ẢNH (GENERATE IMAGE)

- Sử dụng tool `generate_image` với prompt chi tiết dựa trên JSON đã xác nhận.
- Áp dụng các tài sản tham chiếu visual trong thư mục `Anh_KFSP/` nếu cần.
- Lưu ảnh vào thư mục artifact và nhúng vào bản xem trước cho người dùng đánh giá.

---

## 📚 TÀI LIỆU THAM KHẢO

- Quy chuẩn thiết kế KFSP: [`Kien_Thuc_Design/03_Xu_Huong_Design/Quy_Chuan_Design_KFSP.md`](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/Kien_Thuc_Design/03_Xu_Huong_Design/Quy_Chuan_Design_KFSP.md)
- Hướng dẫn mẫu prompt Layout A: [`Kien_Thuc_Design/03_Xu_Huong_Design/Mau_Prompt_Gen_Banner_Infographic_KFSP.md`](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/Kien_Thuc_Design/03_Xu_Huong_Design/Mau_Prompt_Gen_Banner_Infographic_KFSP.md)
- Hướng dẫn Layout B: [`reference/Authority_Wakeup_Call_Layout.md`](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/.agents/skills/kfsp-banner-infographic/reference/Authority_Wakeup_Call_Layout.md)
- JSON Reference Layout B: [`reference/Authority_Wakeup_Call_Layout.json`](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/.agents/skills/kfsp-banner-infographic/reference/Authority_Wakeup_Call_Layout.json)

---

## Changelog
- 2026-08-10: Khởi tạo skill `kfsp-banner-infographic` với intake checklist bắt buộc phỏng vấn thông số trước khi sinh ảnh.
- 2026-08-15: Thêm Layout B "Authority Wakeup Call" cho tuyến content chân dung nhân vật / huyền thoại đầu tư. Thêm Bước 0 chọn layout, intake checklist riêng cho Layout B, file JSON reference và hướng dẫn tiếng Việt tại `reference/`. Bổ sung trigger: "banner nhân vật", "banner huyền thoại", "banner authority", "banner wakeup call", "banner câu chuyện", "banner FOMO".
