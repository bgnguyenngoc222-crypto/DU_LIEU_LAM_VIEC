# QUY CHUẨN WEBHOOK TRACKING & ĐO LƯỜNG EMAIL KFSP

Để quản lý chính xác tỷ lệ Mở (Open Rate), Click từng nút (Click Rate) và Chuyển đổi (Conversion Rate) vào Google Sheet thông qua n8n, mọi đường link trong Email KFSP bắt buộc phải bọc qua hệ thống Webhook của KFSP.

---

## 1. Webhook Theo Dõi Lượt Click Bài Viết / Web (`email-click`)

Dùng cho mọi nút dẫn ra ngoài: Fanpage Facebook, Youtube, Web kfsp.vn, Bài phân tích, Link App Store / Google Play.

### Cấu trúc URL chuẩn:
```text
https://link.kfsp.vn/webhook/email-click?u={{ $json.user_id }}&e={{ $json.email }}&c={campaign_id}&src={button_id}&r={target_url_encoded}
```

### Giải thích các tham số bắt buộc:
- **`u`**: `{{ $json.user_id }}` (ID định danh người dùng từ node n8n).
- **`e`**: `{{ $json.email }}` (Email của người nhận).
- **`c`**: Mã chiến dịch (ví dụ: `2026_08_co_hoi_tiem_nang_free`, `onboarding_drip`).
- **`src`**: Tên định danh vị trí nút bấm (ví dụ: `hero_cta_haiday`, `btn_xem_video_hdsd`, `sub_cta_vadv`).
- **`r`**: **Đường dẫn trang đích cần chuyển hướng tới** (Target URL).
  - 🔴 **QUY TẮC SỐNG CÒN:** Bắt buộc dùng tham số **`r=`** (Redirect). Tuyệt đối **KHÔNG DÙNG `dest=`** vì backend `link.kfsp.vn` không xử lý tham số đó và sẽ redirect về trang chủ `kfsp.vn`, làm hỏng trải nghiệm người dùng.

### Ví dụ thực tế link dẫn về bài viết Fanpage Facebook:
```text
https://link.kfsp.vn/webhook/email-click?u={{ $json.user_id }}&e={{ $json.email }}&c=2026_08_co_hoi_tiem_nang&src=btn_xem_bai_fanpage_haiday&r=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fp%2F1BBBiFL6k5%2F
```

### Luồng xử lý backend:
1. Người dùng bấm vào link trong email.
2. Webhook `https://link.kfsp.vn/webhook/email-click` nhận request và ghi log một dòng sự kiện `[click]` kèm `user_id`, `email`, `campaign_id`, `src`, thời gian vào Google Sheet `log_sent`.
3. Webhook phản hồi HTTP `302 Redirect` đưa người dùng sang đúng đường dẫn URL trong tham số `&r=`.

---

## 2. Webhook Ghi Nhận Chuyển Đổi Gói Dịch Vụ (`email-register`)

Dùng riêng cho các nút bấm Đăng ký gói Hội viên Vàng hoặc Hội viên Bạc.

### Cấu trúc URL chuẩn:
- **Gói Hội viên Vàng (1 năm):**
  ```text
  https://link.kfsp.vn/webhook/email-register?plan=gold_1y&email={{ $json.email }}&u={{ $json.user_id }}&source={source_id}&c={campaign_id}&content=cta_gold_1y
  ```
- **Gói Hội viên Bạc (3 tháng):**
  ```text
  https://link.kfsp.vn/webhook/email-register?plan=silver_3m&email={{ $json.email }}&u={{ $json.user_id }}&source={source_id}&c={campaign_id}&content=cta_silver_3m
  ```

### Luồng xử lý backend:
1. Ghi nhận sự kiện `webhook_clicked` vào cột chuyển đổi của Sheet `log_sent`.
2. Phản hồi HTTP `302 Redirect` đưa người dùng đến trang GitBook Hướng dẫn thanh toán & Cảm ơn.

---

## 3. Pixel Theo Dõi Lượt Mở Email (`email-open`)

Đặt thẻ ảnh kích thước 1x1 pixel vô hình ở cuối mã nguồn HTML (ngay trước thẻ đóng `</body>`):
```html
<img src="https://link.kfsp.vn/webhook/email-open?u={{ $json.user_id }}&c={campaign_id}" width="1" height="1" style="display:none;max-height:0px;overflow:hidden;mso-hide:all;" alt="" />
```

---

## 4. Bảng Tra Cứu Mã Campaign n8n Chuẩn

| Chiến dịch | Mã Campaign chuẩn | Ghi chú |
|---|---|---|
| Cơ hội tiềm năng - Khách Free | `2026_08_co_hoi_tiem_nang_free` | Broadcast tháng 08/2026 |
| Cơ hội tiềm năng - Hội viên Paid | `2026_08_co_hoi_tiem_nang_paid` | Broadcast tháng 08/2026 |
| Cơ hội tiềm năng - Sắp hết hạn | `2026_08_co_hoi_tiem_nang_expiring` | Broadcast tháng 08/2026 |
| Cơ hội tiềm năng - Winback | `2026_08_co_hoi_tiem_nang_winback` | Broadcast tháng 08/2026 |
| Onboarding Drip Campaign | `KFSP_Onboarding_Drip` | Tự động hóa Drip hàng ngày |
| Announcement Giao diện mới | `ANNOUNCEMENT_GiaoDienMoi_v2` | Broadcast v2 |
| Báo cáo tài chính mùa vụ | `BCTC_MuaVu_Q3_2026` | Drip / Broadcast định kỳ |
