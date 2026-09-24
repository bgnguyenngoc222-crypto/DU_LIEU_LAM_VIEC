# BẢNG TỰ CHẤM 5 MỐC ĐÁNH GIÁ EMAIL KFSP TRƯỚC KHI GỬI

Trước khi đưa mã nguồn HTML vào các node Gmail trên n8n để broadcast hoặc kích hoạt drip campaign, người phụ trách bắt buộc phải tự chấm email theo bảng 5 mốc sau. Nếu rớt bất kỳ mốc chặn nào, không được phép phát hành.

---

## Bảng Tự Đánh Giá 5 Mốc

| Mốc | Tiêu chí đánh giá | Điều kiện ĐẠT | Trạng thái |
|:---:|---|---|:---:|
| **MỐC 1** | **Cấu trúc 8 Tầng Master** | Đầy đủ Header Logo, Journey Badge, Main Headline, Story/Quote Box, Metaphor Bridge, Multi-Section, Action/Upsell, Brand Footer. Không khuyết tầng cốt lõi nào. | ☐ ĐẠT / ☐ RỚT |
| **MỐC 2** | **Nghệ thuật Ẩn dụ & Triết lý** | Có trích dẫn triết lý đầu tư / ngụ ngôn đắt giá. Áp dụng đúng hình tượng trong Từ điển ẩn dụ KFSP (Watchlist: chim canh, Cảnh báo: chim báo bão, Bộ lọc: bầy ngựa quý thảo nguyên xanh...). | ☐ ĐẠT / ☐ RỚT |
| **MỐC 3** | **Định dạng & Nhịp văn phong** | - 0 icon/emoji cảm xúc.<br>- 0 dấu gạch ngang dài `—` trong thân bài văn xuôi.<br>- Xưng hô "bạn" và KFSP.<br>- Mỗi đoạn văn ngắt ngắn 2–3 dòng.<br>- Có kỹ thuật Preheader Spacer Hack chống tràn text trên màn hình khóa. | ☐ ĐẠT / ☐ RỚT |
| **MỐC 4** | **Tracking Webhook & Khối Gói** | - 100% link ngoài bọc qua `https://link.kfsp.vn/webhook/email-click?r=...` (đúng tham số `&r=`, không dùng `&dest=`).<br>- Nút mua gói bọc qua `email-register`.<br>- Có đủ 2 thẻ gói Hội viên Vàng 1 năm & Bạc 3 tháng đúng giá ngày. | ☐ ĐẠT / ☐ RỚT |
| **MỐC 5** | **Brand Spine & Câu chốt** | - Có câu đúc kết ngụ ngôn riêng.<br>- Đủ bộ 3 câu: *"Chủ động trong hành vi, Vững vàng trong tâm trí, Bền bỉ trong ý chí."*<br>- Có câu định vị thương hiệu: *"Đưa chứng khoán về tầm tay bạn."* | ☐ ĐẠT / ☐ RỚT |

---

## Quy Trình Xử Lý Khi Rớt Mốc
- **Rớt Mốc 1 hoặc Mốc 2:** Cấu trúc bài chưa chuẩn ➔ Viết lại nội dung theo khung 8 tầng và tra cứu lại Từ điển ẩn dụ.
- **Rớt Mốc 3:** Vi phạm quy tắc ngôn từ ➔ Gọt bỏ toàn bộ emoji, thay thế dấu gạch ngang dài bằng dấu phẩy/chấm, ngắt lại đoạn ngắn.
- **Rớt Mốc 4:** Lỗi kỹ thuật tracking ➔ Cập nhật lại URL Webhook, sửa tham số thành `&r=` và kiểm tra lại thẻ gói dịch vụ.
- **Rớt Mốc 5:** Thiếu chữ ký thương hiệu ➔ Bổ sung đầy đủ bộ câu chốt ở cuối email.
