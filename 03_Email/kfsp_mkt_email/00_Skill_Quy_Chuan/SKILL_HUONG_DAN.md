# HƯỚNG DẪN VẬN HÀNH SKILL EMAIL MARKETING KFSP

Skill **kfsp-mkt-email** là công cụ điều phối toàn diện quy trình sản xuất và gửi Email Marketing của KFSP từ khâu lên ý tưởng nội dung, thiết kế giao diện HTML đến cấu hình luồng n8n.

---

## 1. Bản Đồ Tài Nguyên Trong Thư Mục `kfsp_mkt_email/`

```text
kfsp_mkt_email/
├── README.md                                    # Chỉ mục tổng quan & hướng dẫn n8n
├── 00_Skill_Quy_Chuan/                          # Bộ tài liệu quy chuẩn chuẩn mực
│   ├── SKILL_HUONG_DAN.md                       # Tài liệu hướng dẫn vận hành (file này)
│   ├── QUY_CHUAN_8_TANG_MASTER.md               # Cấu trúc 8 tầng, màu sắc, font chữ
│   ├── TU_DIEN_AN_DU_TINH_NANG.md               # Từ điển ẩn dụ KFSP cho Email
│   ├── QUY_CHUAN_WEBHOOK_TRACKING.md            # Quy tắc link webhook email-click?r=
│   ├── THIET_KE_GIA_GOI_VA_FOOTER.md            # Thẻ gói Hội viên Vàng/Bạc & Footer
│   └── BANG_TU_CHAM_5_MOC.md                    # Bảng tự đánh giá 5 mốc trước khi gửi
│
├── 01_Chien_Dich_Co_Hoi_Tiem_Nang_2026_08/       # 🎯 Chiến dịch: Ra mắt tính năng Cơ Hội Tiềm Năng
│   ├── README.md                                # Báo cáo số liệu gửi & tham số
│   ├── email_co_hoi_tiem_nang_free.html         # Template gửi tệp Free
│   ├── email_co_hoi_tiem_nang_hoi_vien.html     # Template gửi tệp Hội viên Paid
│   ├── email_co_hoi_tiem_nang_sap_het_han.html  # Template gửi tệp Sắp hết hạn dùng thử
│   └── email_co_hoi_tiem_nang_winback.html      # Template gửi tệp Winback đã hết hạn
│
├── 02_Chien_Dich_Onboarding_Drip/                # 🚀 Chiến dịch: Chuỗi Onboarding & Nuôi dưỡng
│   ├── README.md                                # Kịch bản chuỗi Drip
│   └── onboarding_mail_5.html                   # Email Onboarding #5
│
├── 03_Chien_Dich_Thong_Bao_Giao_Dien_Moi/        # 📱 Chiến dịch: Ra mắt Giao diện mới v2
│   ├── README.md                                # Tài liệu chiến dịch
│   ├── announcement_giao_dien_moi_dark.html     # Bản Dark Mode
│   └── announcement_giao_dien_moi_light.html    # Bản Light Mode
│
├── 04_Chien_Dich_BCTC_Mua_Vu/                    # 📊 Chiến dịch: Mùa BCTC & Design System
│   ├── README.md                                # Tài liệu chiến dịch
│   ├── bctc_7_chu_de_mua_vu.html                # 7 Chủ đề Content BCTC
│   └── design_system_email.html                 # Bản mẫu Master Design System Email
│
└── email-assets/                                # Kho hình ảnh, logo, icon đính kèm email
    ├── logo/                                    # Bộ nhận diện logo KFSP
    ├── mockup/                                  # Ảnh phối cảnh màn hình app
    ├── onboarding/                              # Ảnh minh họa chuỗi onboarding
    ├── signals/                                 # Ảnh biểu đồ và tín hiệu kỹ thuật
    └── broadcast/                               # Ảnh dùng cho các đợt phát tin tức
```

---

## 2. Quy Trình 5 Bước Sản Xuất Email Mới

```text
Bước 1: Xác định Tệp người nhận & Mục tiêu chuyển đổi (Free, Paid, Trial, Winback, Onboarding)
Bước 2: Lựa chọn Câu chuyện ngụ ngôn & Tra cứu Từ điển ẩn dụ KFSP
Bước 3: Biên soạn nội dung bám sát Khung 8 tầng Master
Bước 4: Dựng mã HTML Responsive, nhúng Preheader Spacer Hack & Bọc Link Webhook Tracking (email-click?r=)
Bước 5: Chạy Bảng tự chấm 5 mốc -> Đạt 5/5 mốc mới đưa lên n8n
```
