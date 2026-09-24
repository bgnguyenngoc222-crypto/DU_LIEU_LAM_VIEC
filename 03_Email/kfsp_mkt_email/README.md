# TRUNG TÂM QUẢN LÝ EMAIL MARKETING KFSP (`kfsp_mkt_email`)

> Thư mục tập trung duy nhất lưu trữ toàn bộ tài sản Email Marketing của KFSP: từ Skill quy chuẩn, tài liệu kỹ thuật, kho hình ảnh assets đến tất cả các chiến dịch Email HTML đã và đang phát hành.

---

## 🧭 CẤU TRÚC PHÂN KHU TỔNG QUAN

```text
kfsp_mkt_email/
├── 00_Skill_Quy_Chuan/                          # 📘 Bộ tài liệu quy chuẩn & Bảng tự chấm 5 mốc
│   ├── SKILL_HUONG_DAN.md                       # Quy trình 5 bước sản xuất email mới
│   ├── QUY_CHUAN_8_TANG_MASTER.md               # Cấu trúc 8 tầng, bảng màu, typography
│   ├── TU_DIEN_AN_DU_TINH_NANG.md               # Từ điển ẩn dụ hình tượng hóa tính năng
│   ├── QUY_CHUAN_WEBHOOK_TRACKING.md            # Cơ chế email-click?r= và email-register
│   ├── THIET_KE_GIA_GOI_VA_FOOTER.md            # Thẻ gói Hội viên Vàng & Bạc, 4 câu chốt Brand
│   └── BANG_TU_CHAM_5_MOC.md                    # Bảng tự đánh giá 5 mốc trước khi xuất bản
│
├── 01_Chien_Dich_Co_Hoi_Tiem_Nang_2026_08/       # 🎯 Chiến dịch 1: Ra mắt tính năng Cơ Hội Tiềm Năng
│   ├── README.md                                # Tổng kết số liệu gửi (1.179 email), UTM & Webhook
│   ├── email_co_hoi_tiem_nang_free.html         # Template gửi khách hàng Free
│   ├── email_co_hoi_tiem_nang_hoi_vien.html     # Template gửi Hội viên Paid
│   ├── email_co_hoi_tiem_nang_sap_het_han.html  # Template gửi khách Sắp hết hạn dùng thử
│   └── email_co_hoi_tiem_nang_winback.html      # Template gửi khách Winback (đã hết hạn)
│
├── 02_Chien_Dich_Onboarding_Drip/                # 🚀 Chiến dịch 2: Chuỗi Email Vòng đời & Onboarding
│   ├── README.md                                # Kịch bản chuỗi Drip Campaign
│   └── onboarding_mail_5.html                   # Email Onboarding #5: Hướng dẫn kích hoạt giá trị
│
├── 03_Chien_Dich_Thong_Bao_Giao_Dien_Moi/        # 📱 Chiến dịch 3: Thông báo Ra mắt Giao diện mới v2
│   ├── README.md                                # Tài liệu chiến dịch Announcement
│   ├── announcement_giao_dien_moi_dark.html     # Phiên bản Dark Mode
│   └── announcement_giao_dien_moi_light.html    # Phiên bản Light Mode
│
├── 04_Chien_Dich_BCTC_Mua_Vu/                    # 📊 Chiến dịch 4: Mùa Báo Cáo Tài Chính & Hệ Thống Thiết Kế
│   ├── README.md                                # Tài liệu chiến dịch BCTC
│   ├── bctc_7_chu_de_mua_vu.html                # 7 Chủ đề Content BCTC Mùa Vụ
│   └── design_system_email.html                 # Bản mẫu Master Design System Email KFSP
│
└── email-assets/                                # 🖼️ Kho hình ảnh, logo, icon đính kèm email
    ├── logo/                                    # Bộ 2 logo KFSP chính thức
    ├── mockup/                                  # Ảnh mockup giao diện app
    ├── onboarding/                              # Visual chuỗi onboarding
    ├── signals/                                 # Ảnh biểu đồ kỹ thuật
    └── broadcast/                               # Ảnh dùng cho các đợt phát tin tức
```

---

## 📊 DANH MỤC CÁC CHIẾN DỊCH VÀ TRẠNG THÁI TRIỂN KHAI

| STT | Tên Chiến Dịch | Mã Campaign n8n | Số Template | Trạng Thái Triển Khai | Số Lượng Đã Gửi |
|:---:|---|---|:---:|:---:|:---:|
| **01** | **Cơ Hội Tiềm Năng (08/2026)** | `2026_08_co_hoi_tiem_nang_*` | 4 templates | ✅ **Đã hoàn tất 100%** | **1.179 email** |
| **02** | **Onboarding & Drip Vòng Đời** | `KFSP_Onboarding_Drip` | 1+ templates | 🔄 Đang vận hành tự động | Theo trigger người dùng |
| **03** | **Thông báo Giao Diện Mới v2** | `ANNOUNCEMENT_GiaoDienMoi_v2` | 2 templates | 📦 Lưu trữ tài sản | Đợt ra mắt v2 |
| **04** | **Mùa Báo Cáo Tài Chính** | `BCTC_MuaVu` | 2 templates | 📦 Bản mẫu Master | Chuẩn bị mùa BCTC |

---

## ⚙️ CÁC NGUYÊN TẮC KỸ THUẬT BẮT BUỘC

1. **Cấu trúc 8 Tầng Master:** Bắt buộc tuân thủ theo [QUY_CHUAN_8_TANG_MASTER.md](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/kfsp_mkt_email/00_Skill_Quy_Chuan/QUY_CHUAN_8_TANG_MASTER.md).
2. **Preheader Spacer Hack:** Luôn chèn khối đệm `&zwnj;&nbsp;` (~150 ký tự) với thuộc tính `mso-hide: all` để chống lộ đoạn code thừa trên màn hình khóa smartphone.
3. **Webhook Link Tracking:**
   - Link điều hướng bài viết ngoài: Dùng `https://link.kfsp.vn/webhook/email-click?u={{ $json.user_id }}&e={{ $json.email }}&c={campaign}&src={source}&r={target_url}`. Bắt buộc dùng tham số **`&r=`**, tuyệt đối không dùng `&dest=`.
   - Link đăng ký gói: Dùng `https://link.kfsp.vn/webhook/email-register?plan={plan}&email={{ $json.email }}&u={{ $json.user_id }}&source={source}&c={campaign}`.
4. **Open Pixel:** Luôn có thẻ ảnh 1x1 pixel vô hình `email-open` ở cuối file HTML.
5. **Đánh giá trước khi gửi:** Chạy đủ 5 mốc trong [BANG_TU_CHAM_5_MOC.md](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/kfsp_mkt_email/00_Skill_Quy_Chuan/BANG_TU_CHAM_5_MOC.md).
