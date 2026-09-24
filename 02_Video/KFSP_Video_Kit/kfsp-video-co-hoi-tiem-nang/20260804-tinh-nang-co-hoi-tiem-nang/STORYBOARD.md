# STORYBOARD — Video giới thiệu "Cơ hội tiềm năng"

> Bản dựng kỹ, có chữ, thẻ chú giải và lớp kính mờ. Thay bản 6-cảnh-cắt-rời trước đó.
> Ngày 04/08/2026 · **26,0 giây** · 30 hình/giây · ba khổ 9:16 · 4:5 · 16:9
> Mốc giờ thật nằm ở `remotion/src/timing.ts` — mục 2 dưới đây là bản phác ban đầu, giữ để đối chiếu ý đồ.
> Nguồn tham khảo: [`refs/REMOTION_RESOURCES.md`](../../Library/CloudStorage/OneDrive-Personal/Work/KFSP/.claude/skills/video-kfsp/refs/REMOTION_RESOURCES.md)

---

## 0. Ba điều rút ra từ clip mẫu (soi ở 12 hình/giây)

| Điều | Mẫu làm gì | Bản trước của tôi | Bản này |
|---|---|---|---|
| **Không có cú cắt cảnh** | Một cú phóng máy quay **liên tục** 0→5 giây; nội dung màn hình tự đổi ngay trên màn trong lúc phóng | Cắt 6 cảnh rời, máy đứng yên | Một mạch máy quay liên tục, nội dung màn chồng mờ ngay trên màn |
| **Phối cảnh 3D** | Máy luôn hơi nghiêng, xoay chậm quanh trục dọc; đoạn sau nằm ngang trong tay, xoay liên tục | Máy phẳng, chỉ có phóng to | `perspective` + `rotateY` / `rotateX` chạy suốt |
| **Thẻ nổi ngoài viền máy** | Các thẻ phần trăm bay ra hai bên, có bóng đổ | Không có | Thẻ chú giải **kính mờ**, nội dung là lý do khách quan, không phải phần trăm lãi |

**Khung máy:** dùng ảnh mockup thật `iPhone 17 Pro Deep Blue.png` trong `_shared/`, không vẽ bằng mã nữa. Hố màn tỉ lệ 0,4600 — clip quay 0,4621, khớp gần tuyệt đối nên **đặt vừa khít, không cắt một pixel nào** (luật Thanh: muốn phóng thì phóng cả khung máy).

---

## 1. Ngôn ngữ hình — bảng khoá

| Yếu tố | Quy cách |
|---|---|
| **Nền sáng** | Toả tròn `#ffffff → #e9e9ee`, có vệt sáng quét chậm ngang |
| **Nền tối** | Toả tròn `#1b2338 → #070b14` + 4 đốm nhoè tím/xanh (hậu cảnh bàn làm việc) |
| **Kính mờ (liquid glass)** | `backdrop-filter: blur(22px)` · nền `rgba(255,255,255,.16)` trên nền tối / `rgba(255,255,255,.62)` trên nền sáng · viền trong `1px rgba(255,255,255,.45)` · bo góc 26 · bóng `0 18px 44px rgba(0,0,0,.28)` · vệt sáng chéo phía trên |
| **Chữ chính** | Inter 800, trắng trên nền tối / `#0f1424` trên nền sáng, hiện **theo từng từ** cách nhau 2 hình |
| **Chữ phụ** | Inter 600, cỡ 52% chữ chính, mờ 0,82 |
| **Tím thương hiệu** | `#7B3AEC` · sáng `#AA75FF` |
| **Đường nối thẻ chú giải** | Nét 2px tím, vẽ dần từ thẻ tới điểm trên màn, đầu mút chấm tròn phát sáng |
| **Vào của mọi lớp** | `spring` damping 18 · dịch lên 22px · nở 0,94→1 |

---

## 2. Bảng phân cảnh chi tiết

### Đoạn A — nền sáng, máy dọc, một cú phóng liên tục (0,0 → 6,2 giây)

| Giây | Máy quay | Màn hình | Lớp chữ / thẻ | Ghi chú |
|---|---|---|---|---|
| 0,0–0,6 | Máy nhỏ giữa khung (cao 18% khung), `rotateY -20°`, `rotateX 6°`; bắt đầu phóng | Trang App Store KFSP | — | Nền sáng dần từ trắng |
| 0,6–2,2 | Phóng đều, `rotateY` về -12° | App Store | **Chữ hook** giữa khung trên: *"Mở app xong, không biết nhìn mã nào?"* — hiện theo từng từ | Chữ nằm trên nền sáng, màu `#0f1424` |
| 2,2–2,6 | Phóng tiếp (cao 46%) | **Chồng mờ** sang màn Cơ hội tiềm năng | Chữ hook mờ đi | Nội dung đổi ngay trên màn, máy không dừng |
| 2,6–4,4 | Phóng tới cao 66%, `rotateY` -12°→-4° | Danh sách 6 cơ hội (`rec3` giây 1,2) | **Thẻ tên tính năng** (kính mờ) trượt vào từ trái, ghim mép trái: <br>**Cơ hội tiềm năng**<br>*App gợi ý sẵn vài mã đáng xem hôm nay* | Vòng sáng tím khoanh thẻ đầu danh sách, đồng thời |
| 4,4–6,2 | Phóng tới cao 82%, `rotateY` về -2° | **Chồng mờ** sang màn mở chi tiết (`rec3` giây 3,3) | **Thẻ chú giải 1** bay ra **ngoài viền máy** bên phải, có đường nối vào khối chi tiết: *"Mỗi cơ hội đều kèm lý do"* | Đây là chỗ thay cho các thẻ phần trăm của mẫu |

### Chuyển đoạn — máy xoay nằm ngang (6,2 → 7,0 giây)

| Giây | Máy quay | Màn hình | Lớp chữ / thẻ |
|---|---|---|---|
| 6,2–7,0 | `rotateZ` 0° → −90° liên tục, thu nhỏ về cao 52% (vì xoay ngang thì chiều dài chiếm bề ngang); `rotateY` −2°→ +14° | Chồng mờ sang biểu đồ | Mọi thẻ rời khung theo hướng ngược chiều xoay |

> Đây chính là cú chuyển của mẫu: **chuyển cảnh bằng chính vật thể**, không cắt, không mờ đen.

### Đoạn B — nền tối, máy ngang, xoay 3D chậm (7,0 → 12,4 giây)

| Giây | Máy quay | Màn hình | Lớp chữ / thẻ |
|---|---|---|---|
| 7,0–8,4 | Nằm ngang, `rotateY` +14° → +6°, trôi rất chậm | Biểu đồ ABB (`rec2` giây 5,0 — dùng clip **gốc chưa xoay**, để khung máy xoay thay) | **Thẻ chú giải 2** kính mờ, góc trên trái, đường nối tới vùng nến: *"Mở thẳng biểu đồ để bạn tự kiểm chứng"* |
| 8,4–10,4 | `rotateY` +6° → −4° (lướt qua chính diện), nở nhẹ 1,0→1,05 | Biểu đồ tiếp | Thẻ 2 rời; **thẻ chú giải 3** vào từ dưới phải: *"Mẫu hình và mốc mua bán vẽ sẵn trên chart"* |
| 10,4–12,4 | `rotateY` −4° → −12°, lùi nhẹ | Biểu đồ tiếp | **Chữ chốt** giữa khung, hiện theo từng từ: *"Không phím hàng. Bạn tự quyết."* |

### Đoạn C — khung đóng (12,4 → 14,4 giây)

| Giây | Nội dung |
|---|---|
| 12,4–12,8 | Máy trôi ra khỏi khung theo hướng xoay; nền chuyển tím thương hiệu |
| 12,8–14,4 | Logo KFSP + **"Đưa chứng khoán về tầm tay bạn"** hiện theo từng từ · hai nút chợ ứng dụng (`store-ios.jpg` / `store-android.jpg` thu nhỏ thành hai thẻ kính mờ nhỏ) trượt vào từ dưới |

---

## 3. Toàn bộ chữ xuất hiện trong video

| # | Giây | Loại | Nội dung |
|---|---|---|---|
| 1 | 0,6–2,4 | Hook | Mở app xong, không biết nhìn mã nào? |
| 2 | 2,6–6,2 | Thẻ tên tính năng | **Cơ hội tiềm năng** · App gợi ý sẵn vài mã đáng xem hôm nay |
| 3 | 4,4–6,2 | Thẻ chú giải | Mỗi cơ hội đều kèm lý do |
| 4 | 7,0–8,6 | Thẻ chú giải | Mở thẳng biểu đồ để bạn tự kiểm chứng |
| 5 | 8,6–10,6 | Thẻ chú giải | Mẫu hình và mốc mua bán vẽ sẵn trên chart |
| 6 | 10,6–12,4 | Chữ chốt | Không phím hàng. Bạn tự quyết. |
| 7 | 12,8–14,4 | Khung đóng | Đưa chứng khoán về tầm tay bạn |

**Đối chiếu luật cứng — cả 7 dòng đều qua:**

| Luật | Kiểm |
|---|---|
| Không khoe phần trăm lợi nhuận | ✅ không dòng nào có số phần trăm |
| Không gọi điểm thị trường ("đây là đáy", "thời điểm giải ngân") | ✅ không dòng nào nói thời điểm |
| Không phím hàng | ✅ dòng 6 nói thẳng điều ngược lại |
| Có brand spine ở đoạn đóng | ✅ dòng 7 |
| Không dùng dấu gạch ngang dài | ✅ |
| Không hạ thấp người xem | ✅ dòng 1 là câu hỏi đồng cảm, không chê |

> ⚠️ Còn một rủi ro **không nằm ở chữ mà ở hình**: clip quay màn hình có sẵn mã cổ phiếu và phần trăm lãi của app (ABB +22,5%…). Xem mục 5.

---

## 4. Lớp dựng của mỗi khung hình (từ dưới lên)

```
1. Nền            toả tròn sáng/tối + đốm nhoè + vệt sáng quét
2. Bóng đổ máy    ellipse nhoè dưới thân máy, nở theo cỡ máy
3. Khung máy      ảnh mockup iPhone 17 (PNG viền), có
   3a. Màn hình     clip quay đặt vừa khít hố màn, KHÔNG cắt
   3b. Ánh phản     dải sáng chéo lướt trên mặt kính khi máy xoay
4. Vòng sáng      khoanh một thẻ cơ hội (chỉ đoạn A)
5. Thẻ kính mờ    ngoài viền máy + đường nối vào điểm trên màn
6. Chữ            hook · chốt · khung đóng
7. Hạt sáng       vài chấm nhoè trôi rất chậm (chỉ nền tối)
```

---

## 5. Việc phải quyết trước khi xuất bản

| Việc | Vì sao | Lựa chọn |
|---|---|---|
| **Mã cổ phiếu + phần trăm lãi lộ trong clip** | Đăng tự nhiên thì được nếu kèm dòng miễn trừ; đem chạy quảng cáo trả tiền thì rủi ro bị từ chối cao | (a) giữ nguyên, đăng tự nhiên + dòng miễn trừ · (b) làm mờ mã và phần trăm để dùng được cả cho quảng cáo |
| **Nhạc nền** | Chưa có; tôi không tự lấy vì bản quyền | Thanh gửi file, tôi ghép |
| **Độ dài 26,0 giây** | Thanh cho phép dài hơn miễn giới thiệu được tính năng; mạch nay đi trọn: nỗi đau → khối cơ hội trên trang chủ → danh sách đầy đủ → mở lý do → biểu đồ ngang → mẫu hình gọi tên → chốt → tải app | Rút được xuống ~20 giây nếu bỏ đoạn biểu đồ nằm ngang |

---

## 6. Trạng thái — ĐÃ DỰNG XONG 04/08/2026

- [x] Soi clip mẫu ở 12 hình/giây, rút ra công thức thật
- [x] Lấy khung máy mockup thật, đo hố màn bằng flood fill
- [x] Storyboard chi tiết (file này)
- [x] Cài bộ skill Remotion chính chủ (`npx skills add remotion-dev/skills`) và áp best practice
- [x] Dựng mã Remotion
- [x] Soi bằng **video chạy** ở 4 hình/giây cho cả ba khổ
- [x] Xuất ba khổ — 26,0 giây
- [ ] Thanh chọn nhạc nền
- [ ] Thanh quyết cách xử lý mã cổ phiếu và phần trăm lãi lộ trong clip

**File ra:** `remotion/out/co-hoi-tiem-nang-{doc,vuong,ngang}.mp4`

### Sáu lỗi bắt được khi QA bằng video chạy (khung tĩnh không lộ ra)

| Lỗi | Vì sao xảy ra | Cách chữa |
|---|---|---|
| Bốn góc màn lòi ra ngoài viền máy | Hố mockup bo góc, div nội dung vuông | `borderRadius = 0,115 × bề ngang màn` |
| Viên đỏ "đang ghi màn hình" của iOS lọt vào khung | Clip quay thật luôn có | Phủ dải trắng 5,2% chiều cao ở đỉnh màn |
| Vòng sáng khoanh trúng cụm phần trăm lãi | Toạ độ đặt theo khung hình, máy phóng thì lệch | Chuyển vòng sáng vào **trong** màn, toạ độ theo phần trăm màn |
| Chữ trong app không đọc được ở khổ dọc | Máy để nhỏ để chừa chỗ cho thẻ | Máy chiếm 0,88 chiều cao khung, thẻ đè lên vùng ít thông tin |
| Thẻ chú giải chữ trắng trên nền app trắng | Chọn tông theo nền video thay vì theo cái nằm sau thẻ | Thẻ đè lên màn app luôn dùng tông sáng |
| Chữ khổ ngang vỡ 6 dòng | Hệ số cỡ chữ tính theo cạnh dài | `k = min(rộng, cao) / 1080` |
