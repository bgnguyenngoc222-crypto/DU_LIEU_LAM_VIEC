# Reference — Style Thông báo App (Push Notification) KFSP

> Reference của skill **kfsp-content**. Đọc khi viết nội dung Thông báo App (Push Notification) cho **KFSP Mobile App** (Bước 2 chọn Archetype + Bước 4 áp giọng + Bước 5 self-check).
> Đây KHÔNG phải skill độc lập — được điều phối bởi `kfsp-content/SKILL.md`.

---

## 1. 🔴 QUY ĐỊNH KỸ THUẬT & ĐỊNH DẠNG PUSH NOTIFICATION

| Thành phần | Quy định kỹ thuật (iOS & Android) | Quy chuẩn KFSP |
|---|---|---|
| **Tiêu đề (Title)** | Tối đa **40 – 50 ký tự** | Viết ngắn gọn, CAPS từ khóa chính, đi thẳng vào cảnh báo hoặc tính năng |
| **Nội dung (Body)** | Tối đa **90 – 120 ký tự** | Hiển thị trọn vẹn trong 2 dòng màn hình khóa, kích thích mở app ngay |
| **Điều hướng (Deep Link)** | Bắt buộc đính kèm đường dẫn mở app | Trỏ thẳng đến màn hình tính năng (vd: `kfsp://screener/potential-opportunities`) |
| **Rich Notification (Ảnh)** | Khuyến nghị tỷ lệ 2:1 hoặc 16:9 (< 300KB) | Tùy chọn cho các thông báo ra mắt tính năng lớn |

---

## 2. 🔴 LUẬT FORMAT & BẢNG VÀNG KFSP CHO PUSH NOTIFICATION

1. **Xưng hô:** Xưng **"bạn"** và **KFSP**. Tuyệt đối không dùng "Quý nhà đầu tư", "Quý khách", "anh em", "thầy".
2. **Luật 0 Icon / Emoji:** Bỏ 100% icon và emoji (🚨📈👉📲...). Nhấn mạnh bằng VIẾT HOA cụm từ chính.
3. **Luật 0 Em-dash:** Cấm dùng dấu gạch ngang dài `—` hoặc gạch ngang `-` ngắt câu. Tách câu bằng phẩy hoặc chấm.
4. **Không sáo ngữ AI:** Không dùng "hãy cùng khám phá", "thông báo chính thức", "trân trọng".
5. **Luật an toàn tài chính:**
   - Không khoe tiền, không cam kết % lợi nhuận.
   - Không phím hàng (mã cổ phiếu chỉ để minh họa tiêu chí).
   - Không gọi đáy/đỉnh thị trường.
6. **Mục tiêu duy nhất:** Thúc đẩy người dùng thực hiện **1 hành vi chạm (tap/click)** để mở app.

---

## 3. KHUNG BÀI PUSH NOTIFICATION MẪU CỦA KFSP

```text
Title: [TIÊU ĐỀ THÔNG BÁO (30-45 KÝ TỰ - VIẾT HOA TỪ KHÓA)]
Body:  [NỘI DUNG 2 DÒNG (70-100 KÝ TỰ - NÊU GIÁ TRỊ VÀ HÀNH ĐỘNG)]
Deep Link: [URL ĐIỀU HƯỚNG MỞ MÀN HÌNH APP]
```

---

## 4. BẢNG TỰ CHẤM 4 MỐC DÀNH CHO PUSH NOTIFICATION

| Mốc | Tiêu chí | Đạt / Rớt |
|---|---|---|
| **Mốc 1: Chuẩn kỹ thuật Push** | Title ≤ 50 char, Body ≤ 120 char, có Deep Link đính kèm. | ☐ |
| **Mốc 2: Luật cứng KFSP** | Xưng "bạn", 0 icon, 0 em-dash, 0 phím hàng, 0 kính ngữ. | ☐ |
| **Mốc 3: Tính năng & Giá trị** | Trích đúng tính năng app KFSP + lý do người dùng cần mở app ngay. | ☐ |
| **Mốc 4: Tỷ lệ chạm (Clickability)** | Nội dung gây tò mò/thúc đẩy hành động chạm ngay trên màn hình khóa. | ☐ |
