---
name: kfsp-mkt-email
description: >
  Skill chuyên trách viết và dựng Email Marketing cho KFSP (Kungfu Stocks Pro) — chuẩn 8 tầng Master,
  mobile-responsive, tối ưu cho Gmail/Apple Mail, tuân thủ vân tay giọng "bạn", 0 icon/emoji, 0 em-dash,
  bọc link qua Webhook link.kfsp.vn/webhook/email-click?r= và email-register, tích hợp thẻ gói Vàng/Bạc
  và bảng tự chấm 5 mốc.
  TRIGGERS: "viết email KFSP", "tạo template email", "email marketing", "drip email", "email onboarding",
  "email broadcast", "email chiến dịch", "soạn mail kfsp", "html email kfsp", "email cơ hội tiềm năng".
  Trigger khi user muốn VIẾT nội dung hoặc DỰNG mã HTML Email cho các chiến dịch marketing của KFSP.
---

# KFSP Email Marketing — Skill Dựng & Viết Email Chuẩn Master

Quy trình chuẩn hóa toàn diện từ ý tưởng, biên soạn nội dung, thiết kế HTML responsive đến cấu hình link tracking và đẩy lên n8n.

---

## 1. Cấu trúc 8 Tầng Master (Architecture)

Mọi Email KFSP bắt buộc tuân thủ đúng 8 tầng:
1. **[1. HEADER LOGO]**: Logo KFSP căn giữa ở đỉnh email (chiều rộng tối đa 140px, link trỏ về `https://kfsp.vn`).
2. **[2. JOURNEY BADGE]**: Nhãn hành trình căn giữa, in hoa cách chữ (ví dụ: `✨ T Í N H  N Ă N G  M Ớ I` hoặc `N G À Y  1 · H À N H  T R A N G  # 1`).
3. **[3. MAIN HEADLINE]**: Tiêu đề chính 2-3 vế, căn giữa, phông to, từ khóa chính phối màu Tím (`#7B3AEC`), Vàng hoặc Đỏ.
4. **[4. STORY / QUOTE]**: Khung ngụ ngôn / Trích dẫn triết lý đầu tư (Charlie Munger, Warren Buffett, ngụ ngôn cổ). Khối chữ nghiêng bọc trong khung màu xám nhạt/viền tím.
5. **[5. METAPHOR BRIDGE]**: Cầu nối ẩn dụ từ câu chuyện sang bài học thực chiến thị trường chứng khoán.
6. **[6. MULTI-SECTION]**: Các khối nội dung/lăng kính phân tích rõ ràng, kèm minh họa giao diện hoặc số liệu thực tế.
7. **[7. ACTION / PREVIEW & UPSELL]**: Nút hành động chính (Primary CTA) + Khối gợi ý 2 gói Hội viên Vàng & Bạc + Dòng hé lộ bài tiếp theo (nếu là chuỗi drip).
8. **[8. BRAND FOOTER]**: Đúc kết ngụ ngôn + Bộ 3 câu triết lý + "Đưa chứng khoán về tầm tay bạn" + Footer pháp lý KFSP.

---

## 2. Bảng Từ Điển Ẩn Dụ Tính Năng KFSP

| Tính năng kỹ thuật | Ẩn dụ hình tượng | Thông điệp cốt lõi |
|---|---|---|
| **Watchlist** | *Vùng trời nhỏ để chim canh* | Khoanh vùng 20–30 mã đáng theo dõi, không hoang mang giữa bầu trời mênh mông. |
| **Cảnh báo (Alerts)** | *Đàn chim báo bão / Hải âu báo bão* | Nhận diện dấu vết biến động giá, khối lượng, MA trước để kịp chuẩn bị. |
| **Nhịp đập TT & Diễn biến** | *Đôi mắt đọc nước đọc gió / Thiên văn chí* | Dùng ngũ quan đọc tín hiệu thị trường thay vì nghe tin đồn. |
| **Bộ lọc (Screeners)** | *Thảo nguyên xanh (bầy ngựa quý tự tìm về)* | Chăm bãi cỏ tươi (60 tiêu chí), ngựa quý tự tìm đến trước cửa. |
| **Cơ hội tiềm năng** | *Bẫy săn điểm nén / Đáy bứt phá tự động* | Tầm soát tự động 3 nhóm: AI Mua/Bán có lãi, Mẫu hình Hai đáy, Mẫu hình VĐV ngược. |
| **Định giá 4M** | *Bộ lăng kính kiểm tra sức khỏe doanh nghiệp* | Meaning, Moat, Management, Margin of Safety. |
| **Mẫu hình CANSLIM** | *Lăng kính 3 thì (Quá khứ - Hiện tại - Tương lai)* | C · A + N · S · L · I · M -> Chấm điểm 0-100. |
| **Chỉ báo RS & RRG** | *Dòng chảy sức mạnh ngành (Đồ thị 4 góc)* | Dẫn dắt, Phục hồi, Suy yếu, Đội sổ. |

---

## 3. Quy Chuẩn Kỹ Thuật HTML & Tracking

### A. Preheader Spacer Hack (Bắt buộc)
Chèn khối đệm 150 ký tự trắng ẩn ngay sau thẻ `<body>` để ngăn màn hình khóa điện thoại kéo dính chữ thừa từ thân email:
```html
<div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;">
  {{Preheader_Text}}
  &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>
```

### B. Quy tắc Bọc Link qua Webhook Tracking KFSP:
1. **Link chuyển tiếp bài viết / web (`email-click`):**
   ```text
   https://link.kfsp.vn/webhook/email-click?u={{ $json.user_id }}&e={{ $json.email }}&c={campaign_id}&src={button_location}&r={target_url_encoded}
   ```
   - 🔴 **BẮT BUỘC:** Dùng tham số `&r=` cho URL đích. Tuyệt đối KHÔNG dùng `&dest=` (backend không hỗ trợ và sẽ bị fallback về trang chủ).
   - 🔴 **QUY TẮC ĐẶT TÊN `src`:** Bắt buộc phải có tính mô tả cao, gắn với ngữ cảnh chiến dịch để dễ phân loại trên Sheet/n8n. Cấu trúc chuẩn: `email_{tên_chiến_dịch}_{hành_động}`. Tuyệt đối KHÔNG đặt chung chung kiểu `src=tu_van_fanpage`. Phải đặt đầy đủ như `src=email_birthday_expiring_tu_van_fanpage`.
   - **Ví dụ thực tế dẫn về bài viết Fanpage Facebook (đã URL-encode):**
     * Nút bài Hai đáy: `https://link.kfsp.vn/webhook/email-click?u={{ $json.user_id }}&e={{ $json.email }}&c=2026_08_co_hoi_tiem_nang&src=email_cohoitiemnang_cta_haiday&r=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fp%2F1BBBiFL6k5%2F`
     * Nút bài Vai đầu vai ngược: `https://link.kfsp.vn/webhook/email-click?u={{ $json.user_id }}&e={{ $json.email }}&c=2026_08_co_hoi_tiem_nang&src=email_cohoitiemnang_cta_vdv&r=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fp%2F1acdCWF4is%2F`
2. **Link đăng ký gói dịch vụ (`email-register`):**
   - Gói Hội viên Vàng (1 năm):
     `https://link.kfsp.vn/webhook/email-register?plan=gold_1y&email={{ $json.email }}&u={{ $json.user_id }}&source={source_name}&c={campaign_id}&content=cta_gold_1y`
   - Gói Hội viên Bạc (3 tháng):
     `https://link.kfsp.vn/webhook/email-register?plan=silver_3m&email={{ $json.email }}&u={{ $json.user_id }}&source={source_name}&c={campaign_id}&content=cta_silver_3m`
3. **Open Tracking Pixel:**
   Đặt thẻ ảnh 1x1 ở cuối email trước `</body>`:
   ```html
   <img src="https://link.kfsp.vn/webhook/email-open?u={{ $json.user_id }}&c={campaign_id}" width="1" height="1" style="display:none;" alt="" />
   ```

---

## 4. Thẻ Gói Hội Viên Chuẩn (Upsell Section)

1. **Gói Hội viên Vàng 1 năm (🥇 Tinh hoa · Tiết kiệm ~1,5 triệu):**
   - Giá: `~21.000đ/ngày` (Trọn gói 7.680.000đ/năm, giá gốc 9.216.000đ, tiết kiệm 16,67%).
   - Nút CTA: Gradient cam vàng `linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)`.
2. **Gói Hội viên Bạc 3 tháng (🥈 Bắt sóng · Vừa đủ cho 1 con sóng):**
   - Giá: `~24.000đ/ngày` (Trọn gói 2.168.000đ/3 tháng, giá gốc 2.304.000đ).
   - Nút CTA: Nền xám `#475569`.

---

## 5. Bảng Tự Chấm 5 Mốc Trước Khi Gửi

| Mốc | Tiêu chí |
|---|---|
| **Mốc 1: Chuẩn 8 tầng Master** | Đầy đủ Header Logo, Badge, Headline, Quote/Story, Metaphor Bridge, Multi-section, CTA/Upsell, Brand Footer. |
| **Mốc 2: Ẩn dụ & Trích dẫn** | Có trích dẫn triết lý/ngụ ngôn + Sử dụng đúng hình tượng trong Từ điển ẩn dụ KFSP. |
| **Mốc 3: Định dạng & Nhịp văn** | 0 icon/emoji, 0 em-dash `—` trong văn xuôi, nhịp đoạn 2-3 dòng, xưng "bạn" và KFSP. |
| **Mốc 4: Tracking & Upsell** | 100% link bọc qua Webhook `email-click?r=` hoặc `email-register` + Có thẻ gợi ý gói Vàng & Bạc. |
| **Mốc 5: Brand Spine & Footer** | Có câu đúc kết ngụ ngôn + Bộ 3 câu triết lý "Chủ động trong hành vi, Vững vàng trong tâm trí, Bền bỉ trong ý chí" + "Đưa chứng khoán về tầm tay bạn". |
