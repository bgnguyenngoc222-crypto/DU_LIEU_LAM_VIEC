# Video giới thiệu tính năng "Cơ hội tiềm năng" — kịch bản phân cảnh

> Dựng lại từ video mẫu AI gen (`~/Downloads/gen_minh_hoa_video.mp4`, 10 giây, ngang 16:9) bằng **hình ảnh thật**.
> Chốt 04/08/2026: dựng Remotion · xuất 3 tỉ lệ (9:16 · 4:5 · 16:9) · **không chữ trong thân video**, chỉ tiếng nền.
> Cơ sở sản phẩm: [`01_Product/Why/WHY_co-hoi-tiem-nang.md`](../../Library/CloudStorage/OneDrive-Personal/Work/KFSP/01_Product/Why/WHY_co-hoi-tiem-nang.md)

---

## 1. Video mẫu tháo ra — cái gì giữ, cái gì bỏ

| Yếu tố trong mẫu | Quyết |
|---|---|
| Nhịp cắt 1,5–2 giây một cảnh, tổng 10 giây | **Giữ** |
| Không mặt người, chỉ bàn tay cầm máy | **Giữ** (dựng bằng khung máy tĩnh + chuyển động máy quay giả lập) |
| Nền trắng studio ↔ nền tối bokeh luân phiên | **Giữ** — tạo nhịp thở |
| Thẻ số bay ra ngoài viền màn hình | **Giữ dạng thức, đổi nội dung** — xem mục 3 |
| Mở bằng trang App Store | **Giữ** — nói ngay "app này tên gì, tải ở đâu" |
| Kết bằng Trang chủ app | **Giữ** |
| Chữ trong giao diện ("Vất tiết bản", "Chấy AI Assistant", giá "Điện 2002") | **Bỏ sạch** — chữ AI bịa, thay bằng màn hình thật |
| Nhãn "+20,5%" "+23,2%" "AI Mua/Bán đang lãi" "Thành công" | **Bỏ** — chạm luật cấm khoe phần trăm lợi nhuận và gọi điểm mua bán |

---

## 2. Bảng phân cảnh (10 giây, 24 hình/giây = 240 khung)

| # | Giây | Nền | Nội dung màn hình | Chuyển động | Hình cần |
|---|---|---|---|---|---|
| C1 | 0,0–1,8 | Trắng studio | Trang App Store của KFSP | Máy đứng dọc, trôi lên rất nhẹ, sáng dần từ trắng | `A1` |
| C2 | 1,8–2,4 | Trắng → tối | (chuyển cảnh) | Máy xoay nhẹ + nhoè chuyển động | — |
| C3 | 2,4–4,4 | Tối, bokeh | **Khối "Cơ hội tiềm năng" trên Trang chủ** — vài mã kèm lý do | Cuộn chậm đúng bằng clip quay thật | `R1` |
| C4 | 4,4–5,6 | Tối | Ngón tay chạm một dòng cơ hội → mở Chart | Thẻ **lý do** (chữ trong app, ví dụ "Mẫu hình hai đáy đang chờ vượt") tách khỏi màn bay ra ngoài viền | `R1` (đoạn chạm) |
| C5 | 5,6–8,2 | Tối | **Chart TA ngang** — mẫu hình vẽ sẵn trên biểu đồ thật | Máy xoay sang ngang, phóng nhẹ vào vùng mẫu hình | `R2` |
| C6 | 8,2–10,0 | Trắng studio | Trang chủ app toàn cảnh | Máy lùi ra, dừng | `R3` hoặc `A2` |
| C7 | 10,0–11,5 | Tím thương hiệu | Khung đóng: logo KFSP + "Đưa chứng khoán về tầm tay bạn" | Hiện lên | `_shared/remotion/BrandFrame.tsx` |

> Tổng thành phẩm ~11,5 giây. Nếu Thanh muốn đúng 10 giây thì rút C1 còn 1,2 giây.

---

## 3. Đổi cách thể hiện cho hợp luật cứng

Mẫu AI khoe "+20,5%", "AI Mua/Bán đang lãi +23,2%", "Thành công". Ba nhãn này đều là hứa hẹn kết quả — cấm.

Thay bằng **lý do khách quan** bay ra ngoài viền máy, đúng tinh thần WHY của tính năng (mỗi cơ hội phải nói rõ vì sao, không phải nút "Mua"):

- "Mẫu hình hai đáy — đang chờ vượt"
- "Vượt đỉnh 52 tuần"
- "Khối lượng tăng gấp đôi trung bình"

Giữ nguyên hiệu ứng thẻ nổi 3D của mẫu, chỉ đổi ruột. Kèm việc mã cổ phiếu trong clip: xem mục 5.

---

## 4. Bảng hình cần Thanh cung cấp

| Mã | Loại | Nội dung | Ghi chú quay |
|---|---|---|---|
| **A1** | Ảnh tĩnh | Trang App Store của KFSP trên iPhone | Chụp màn hình thẳng, đủ icon + tên + nút tải |
| **R1** | Quay màn hình ~6 giây | Trang chủ app, cuộn xuống tới khối **Cơ hội tiềm năng**, dừng 2 giây cho đọc được các dòng, rồi **chạm một dòng** để mở Chart | Quay chậm, đều tay. Đừng vuốt nhanh |
| **R2** | Quay màn hình ~5 giây | Chart TA của mã vừa chạm, **xoay ngang**, mẫu hình hiện trên biểu đồ | Để yên vài giây ở khung có mẫu hình rõ |
| **R3** | Quay màn hình ~3 giây | Trang chủ app từ đầu, đứng yên | Dùng cho cảnh kết |
| **A2** | Ảnh tĩnh (dự phòng) | Trang chủ app | Nếu không tiện quay R3 |

**Cách quay trên iPhone:** Cài đặt → Trung tâm điều khiển → thêm "Ghi màn hình". Quay xong gửi file vào `~/Desktop/VIDEO KFSP/20260804-tinh-nang-co-hoi-tiem-nang/screen-rec/`.

---

## 5. Ba việc phải xử lý trước khi đăng

| Việc | Vì sao | Cách xử |
|---|---|---|
| **Mã cổ phiếu thật lộ trong clip** | Lộ mã kèm ngữ cảnh "cơ hội" dễ bị hiểu là phím hàng | Hoặc làm mờ mã, hoặc chấp nhận và **thêm dòng miễn trừ trách nhiệm dưới video và trong phần mô tả** (theo tiền lệ L22 trong skill: chỉ đăng tự nhiên, không đem chạy quảng cáo trả tiền) |
| **Số dư danh mục thật** | Không nên lộ | Quay bằng tài khoản demo, hoặc tránh màn có số dư |
| **Ba tỉ lệ khung** | Cùng một nội dung, ba khung khác nhau | Dựng một lần, xuất ba bản: chart ngang trong khung dọc 9:16 sẽ **phóng to vào vùng mẫu hình** thay vì thu nhỏ cả biểu đồ |

---

## 6. Bản đã dựng — 04/08/2026

11,0 giây · 30 hình/giây · ba khổ trong `remotion/out/`:

| File | Khổ | Dùng cho |
|---|---|---|
| `co-hoi-tiem-nang-doc.mp4` | 1080×1920 | TikTok · Reels · Shorts |
| `co-hoi-tiem-nang-vuong.mp4` | 1080×1350 | Fanpage Facebook |
| `co-hoi-tiem-nang-ngang.mp4` | 1920×1080 | YouTube · website · thông báo trong app |

**Sáu cảnh thật sự dựng** (mốc trong `remotion/src/timing.ts`):

| Giây | Cảnh | Nguồn | Chuyển động |
|---|---|---|---|
| 0,0–1,8 | Trang App Store KFSP, nền trắng | `store-ios.jpg` (dùng lại từ video Wyckoff Bài 3) | Trôi lên, phóng nhẹ |
| 1,8–4,0 | Danh sách Cơ hội tiềm năng, nền tối | `rec3` giây 1,2 | Nghiêng về thẳng, vòng sáng tím khoanh thẻ đầu |
| 4,0–5,6 | Mở một cơ hội xem lý do | `rec3` giây 3,3 | Phóng gần vào khối chi tiết |
| 5,6–8,2 | Biểu đồ nằm ngang | `rec2` giây 4,6 (xoay ‑90°) | Máy xoay ngang, nội dung phóng vào vùng nến |
| 8,2–9,8 | Trang chủ app, nền trắng trở lại | `rec1` giây 0,2 | Lùi ra |
| 9,8–11,0 | Khung đóng thương hiệu | mã | Logo + "Đưa chứng khoán về tầm tay bạn" |

**Nguồn tư liệu:** `screen-rec/rec1.mp4` (13,4 giây) · `rec2.mp4` (17,4 giây, chart xoay ngang) · `rec3.mp4` (34 giây, màn danh sách đầy đủ). Các đoạn đã cắt sẵn nằm ở `remotion/public/c3_list.mp4`, `c4_detail.mp4`, `c5_chart.mp4`, `c6_home.mp4`.

**Cách nhấn không dùng chữ:** vòng sáng tím khoanh một thẻ cơ hội (cảnh 2) và phóng gần (cảnh 3) — thay cho các thẻ phần trăm bay ra trong bản AI mẫu.

**Tiếng:** hiện chỉ có tiếng chuyển cảnh (`whoosh`, `pop`). **Chưa có nhạc nền** — cần Thanh chọn bản nhạc có bản quyền dùng được, tôi ghép vào sau.

### Việc còn lại

- [ ] Thanh chọn nhạc nền
- [ ] Quyết cách xử lý mã cổ phiếu và phần trăm lãi lộ trong clip (mục 5)
- [ ] Duyệt bản dọc → tôi ghép nhạc và xuất bản cuối

### Sửa nhanh nếu cần

| Muốn đổi | Sửa ở đâu |
|---|---|
| Độ dài từng cảnh | `remotion/src/timing.ts` |
| Vị trí vòng sáng | `Main.tsx`, `<Spotlight top height>` cảnh danh sách |
| Cỡ máy trong khung | `Main.tsx`, `portraitH` và `landscapeW` |
| Xem lại trực quan | `cd remotion && npm run studio` |
