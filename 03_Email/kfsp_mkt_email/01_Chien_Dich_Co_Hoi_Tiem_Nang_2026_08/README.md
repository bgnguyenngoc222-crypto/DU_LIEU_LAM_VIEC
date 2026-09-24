# CHIẾN DỊCH: CƠ HỘI TIỀM NĂNG (THÁNG 08/2026)

> **Mã chiến dịch:** `2026_08_co_hoi_tiem_nang`  
> **Thời gian chạy:** 12/08/2026 – 13/08/2026  
> **Trạng thái:** ✅ **Đã hoàn thành xuất sắc 100% (Tổng 1.179 email đã gửi thành công)**

---

## 📊 1. KẾT QUẢ SỐ LIỆU ĐÃ GỬI (1.179 EMAIL)

| Tệp Khách Hàng | Template Sử Dụng | Thời Gian Gửi | Số Lượng Đã Gửi | n8n Workflow ID | Sheet Ghi Log |
|---|---|:---:|:---:|:---:|---|
| **Hội viên Paid** | `email_co_hoi_tiem_nang_hoi_vien.html` | 12/08 (19:12) | **75 email** | `naX7iW3rtmTPFHkO` | Tab `log_sent` |
| **Sắp hết hạn dùng thử** | `email_co_hoi_tiem_nang_sap_het_han.html` | 12/08 (19:17) | **175 email** | `Lt0gE0Ceqg64kQ1z` | Tab `log_sent` |
| **Khách hàng Free** | `email_co_hoi_tiem_nang_free.html` | 13/08 (10:46 - 12:30) | **679 email** | `nMwCdi7Ayljvxhfp` | Tab `log_sent` |
| **Khách hàng Winback** | `email_co_hoi_tiem_nang_winback.html` | 13/08 (11:09) | **250 email** | `swFRXOmWmdLXm92d` | Tab `log_sent` |
| **TỔNG CỘNG** | **4 Templates** | **12 - 13/08** | **1.179 email** | **0 lỗi hòm thư** | **100% thành công** |

---

## 📁 2. DANH SÁCH FILE TEMPLATE TRONG THƯ MỤC

1. [email_co_hoi_tiem_nang_free.html](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/CONTENT_KFSP/EMAIL/01_Chien_Dich_Co_Hoi_Tiem_Nang_2026_08/email_co_hoi_tiem_nang_free.html): Bản gửi cho khách tài khoản thường (CTA trải nghiệm và nâng cấp 2 gói Hội viên).
2. [email_co_hoi_tiem_nang_hoi_vien.html](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/CONTENT_KFSP/EMAIL/01_Chien_Dich_Co_Hoi_Tiem_Nang_2026_08/email_co_hoi_tiem_nang_hoi_vien.html): Bản gửi tri ân và hướng dẫn đặc quyền cho Hội viên trả phí (Paid Member).
3. [email_co_hoi_tiem_nang_sap_het_han.html](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/CONTENT_KFSP/EMAIL/01_Chien_Dich_Co_Hoi_Tiem_Nang_2026_08/email_co_hoi_tiem_nang_sap_het_han.html): Bản gửi cho khách sắp hết hạn dùng thử (Kêu gọi duy trì lợi thế với ưu đãi Bạc 3M & Vàng 1Y).
4. [email_co_hoi_tiem_nang_winback.html](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/CONTENT_KFSP/EMAIL/01_Chien_Dich_Co_Hoi_Tiem_Nang_2026_08/email_co_hoi_tiem_nang_winback.html): Bản gửi cho khách đã hết hạn tài khoản (Kêu gọi trở lại đường đua đầu tư cùng KFSP).

---

## 🔗 3. HỆ THỐNG TRACKING WEBHOOK & UTM

* **Mã chiến dịch chung:** `2026_08_co_hoi_tiem_nang_*`
* **Nút Mẫu hình Hai đáy:**
  `https://link.kfsp.vn/webhook/email-click?u={{ $json.user_id }}&e={{ $json.email }}&c=2026_08_co_hoi_tiem_nang_*&src=email_*_cta_haiday&r=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fp%2F1BBBiFL6k5%2F`
* **Nút Mẫu hình Vai đầu vai ngược:**
  `https://link.kfsp.vn/webhook/email-click?u={{ $json.user_id }}&e={{ $json.email }}&c=2026_08_co_hoi_tiem_nang_*&src=email_*_cta_vdv&r=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fp%2F1acdCWF4is%2F`
* **Nút Gói Bạc 3 Tháng:**
  `https://link.kfsp.vn/webhook/email-register?plan=silver_3m&email={{ $json.email }}&u={{ $json.user_id }}&source=email_co_hoi_tiem_nang_*&c=2026_08_co_hoi_tiem_nang_*&content=cta_silver_3m`
* **Nút Gói Vàng 1 Năm:**
  `https://link.kfsp.vn/webhook/email-register?plan=gold_1y&email={{ $json.email }}&u={{ $json.user_id }}&source=email_co_hoi_tiem_nang_*&c=2026_08_co_hoi_tiem_nang_*&content=cta_gold_1y`
* **Pixel Open Tracking:**
  `https://link.kfsp.vn/webhook/email-open?u={{ $json.user_id }}&e={{ $json.email }}&c=2026_08_co_hoi_tiem_nang_*&src=email_co_hoi_tiem_nang_*`
