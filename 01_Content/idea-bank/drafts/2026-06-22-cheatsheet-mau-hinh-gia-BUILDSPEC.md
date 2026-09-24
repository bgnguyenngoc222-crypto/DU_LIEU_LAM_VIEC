# BUILD-SPEC — Cheat-sheet Mẫu hình GIÁ (IF-2026-026)

> Bản dựng kỹ thuật để vẽ Figma tuần sau. Chuẩn bị offline 22/06 (lúc chờ plugin VIỆC 1).
> Nguồn đúng: [LOGIC_MAU_HINH.md](../../../../01_Product/Features/research/Chart%20Pattern%20Scanning/LOGIC_MAU_HINH.md) + [VISUALIZATION_SPEC.md](../../../../01_Product/Features/research/Chart%20Pattern%20Scanning/VISUALIZATION_SPEC.md). Idea-fit: [IF-2026-026](../IF-2026-026-cheatsheet-mau-hinh-gia.md).
> 🔴 Khác tuyến nến: mẫu hình giá = **đường giá / đường cong** (vector path), KHÔNG phải hình chữ nhật nến.

---

## 0. Bảng màu (KHỚP spec sản phẩm — để hình marketing = app)

| Vai trò | Màu | Dùng cho |
|---|---|---|
| Đỉnh / kháng cự | đỏ `#EF4444` | chấm pivot đỉnh, mẫu giảm |
| Đáy / hỗ trợ | xanh lá `#22C55E` | chấm pivot đáy, mẫu tăng |
| Neckline / rim | xanh dương `#58A6FF` | đường cổ / miệng cốc — **nét đứt** |
| Khung nối (đường giá) | vàng `#F0C040` HOẶC trắng/đậm theo nền | polyline giá cách điệu |
| Điểm phá vỡ (breakout) | cam `#F97316` | chấm tròn tại điểm phá |
| Điểm mở đầu / chân | tím `#7B3AEC` | nhấn điểm đầu mẫu (chân sóng) |
| Mũi tên mục tiêu | xanh lá (lên) / đỏ (xuống) | target = neckline ± chiều cao mẫu |

- **Light grid:** nền `#FFFFFF`/`#F7F8FA`, lưới mờ `#E5E7EB`, đường giá `#1F2937`.
- **Dark grid 🌙:** nền `#0D1117`, lưới `#1F2937`, đường giá `#E6EDF3`. (Frame tiền tố "🌙" như tuyến nến.)

---

## 1. Sáu mẫu KFSP quét — hình học chuẩn hoá (0–100 × 0–100, y = giá, CAO = lên)

> ⚠️ Figma y hướng XUỐNG → khi dựng đổi `y_figma = H − y_spec` (hoặc set scale âm). Toạ độ dưới là "giá đi lên = số lớn".
> Mỗi mẫu BẮT BUỘC 4 thành phần (mục 0.bis VISUALIZATION_SPEC): **chân/điểm mở đầu (tím) · pivot cấu thành (đỏ/xanh) · neckline (xanh dương đứt) · điểm phá vỡ + mũi tên mục tiêu (cam→target)**.

### Khối A — ĐẢO CHIỀU ĐỈNH (báo GIẢM ↓)

**1. Hai đỉnh — Double Top (chữ M)**
- Polyline: `(0,25)→ Đỉnh1(25,80) → Đáy giữa(45,55) → Đỉnh2(65,80) → (80,55)breakdown → (88,40)`
- 2 đỉnh cân (TWIN_TOL 3% → vẽ ngang nhau). Neckline ngang `y=55` (xanh đứt) từ x=20→95.
- Chiều cao h = 80−55 = 25 → **mục tiêu = 55−25 = 30** (mũi tên đỏ xuống tới y=30).
- Chấm: đỉnh đỏ ×2, neckline = "Đáy giữa", phá vỡ cam tại (80,55).
- Nhãn: `Đỉnh 1` · `Đỉnh 2` · `Đáy giữa (neckline)` · `Phá vỡ` · `Mục tiêu`.

**3. Vai đầu vai — Head & Shoulders (báo GIẢM)**
- Polyline: `(0,25)→ Vai trái(18,60) → Hõm trái(30,45) → Đầu(50,82) → Hõm phải(70,45) → Vai phải(82,60) → (88,45)breakdown`
- Đầu cao nhất (HEAD_OVER ≥5%). 2 vai cân (SHO_TOL 5%). Neckline nối 2 hõm `y≈45` (gần ngang, có thể dốc nhẹ).
- h = 82−45 = 37 → **mục tiêu = 45−37 = 8**.
- Nhãn: `Vai trái` · `Đầu` · `Vai phải` · `Neckline` · `Phá vỡ` · `Mục tiêu`.

**4. Ba đỉnh — Triple Top (báo GIẢM)**
- Polyline: `(0,25)→ Đỉnh1(20,75) → hõm(32,55) → Đỉnh2(50,75) → hõm(68,55) → Đỉnh3(80,75) → (88,55)breakdown`
- 3 đỉnh cân ≤3%; neckline ngang `y=55`. h = 20 → mục tiêu = 35.
- Nhãn: `Đỉnh 1·2·3` · `Neckline` · `Phá vỡ`.

### Khối B — ĐẢO CHIỀU ĐÁY (báo TĂNG ↑) = gương khối A qua trục ngang

**2. Hai đáy — Double Bottom (chữ W)**
- Polyline: `(0,75)→ Đáy1(25,20) → Đỉnh giữa(45,45) → Đáy2(65,20) → (80,45)breakup → (88,60)`
- Neckline ngang `y=45`. h = 45−20 = 25 → **mục tiêu = 45+25 = 70** (mũi tên xanh lên).
- Nhãn: `Đáy 1` · `Đáy 2` · `Đỉnh giữa (neckline)` · `Phá vỡ` · `Mục tiêu`.

**3b. Vai đầu vai NGƯỢC — Inverse H&S (báo TĂNG)** — gương mẫu 3 (đầu thấp nhất, phá LÊN).

**4b. Ba đáy — Triple Bottom (báo TĂNG)** — gương mẫu 4.

### Khối C — LƯỠNG TÍNH (phá hướng nào theo hướng đó)

**5. Tam giác — Triangle (cân/tăng/giảm)**
- 2 đường hội tụ: kháng cự dốc xuống `(15,75)→(82,56)` + hỗ trợ dốc lên `(15,42)→(82,54)` → đỉnh tam giác ~`(83,55)`.
- Đường giá zigzag dội giữa 2 cạnh, biên độ co dần (4–5 chạm).
- Phá vỡ minh hoạ LÊN: chấm cam `(83,55)` → mũi tên `(91,68)`. (Ghi chú: "phá xuống thì ngược lại".)
- Nhãn: `Kháng cự` · `Hỗ trợ` · `Điểm phá` · `Mục tiêu`.

### Khối D — TIẾP DIỄN (đi tiếp theo trend cũ)

**6. Cốc tay cầm — Cup & Handle (báo TĂNG)**
- Chân lên tới Miệng trái `(15,70)` → cốc cong U (parabol ~8 đoạn) đáy `Đáy cốc(45,35)` → Miệng phải `(72,70)`.
- Tay cầm: dip nhẹ `(78,62)` (trên điểm giữa cốc).
- Rim ngang `y=70` (xanh đứt, từ Miệng trái → phải). Phá vỡ cam vượt rim `(85,75)`.
- Độ sâu = 70−35 = 35 → **mục tiêu = 70+35 = 105** (cắt mép trên → kéo dài/ghi số, hoặc nén thang để vừa khung).
- U-curve: vẽ bằng vector path bậc 2 (quadratic) hoặc ≥8 điểm nội suy, KHÔNG gấp khúc.
- Nhãn: `Miệng trái` · `Đáy cốc` · `Tay cầm` · `Vượt đỉnh (phá vỡ)` · `Mục tiêu`.

---

## 2. Bốn định dạng (y hệt tuyến nến)

| Format | Layout | Dùng |
|---|---|---|
| **Dọc** | 6 ô xếp dọc, nhóm theo khối A/B/C/D, tiêu đề trên | post chính fanpage |
| **Ngang (gọn)** | lưới 3×2, 1 dòng caption/ô | ảnh phụ / chia sẻ nhanh |
| **Carousel** | 8 slide: bìa + A(2) + B(2) + C(1) + D(1) + CTA | reels/album |
| **Dark 🌙** | bản dọc nền tối | dùng ban đêm / đồng bộ app dark |

- **Tiêu đề cheat-sheet:** "MẪU HÌNH GIÁ — BỘ KFSP QUÉT" · Sub: "Đảo chiều · Lưỡng tính · Tiếp diễn — mỗi mẫu có neckline + điểm phá vỡ + mục tiêu."
- **Chân hình (CTA):** móc tính năng **Quét mẫu hình (Chart Wizard)** + brand spine **"đưa chứng khoán về tầm tay bạn"**.
- **Mỗi ô gồm:** tên mẫu + nhãn loại (Đảo chiều ↓/↑ · Lưỡng tính · Tiếp diễn) + hình vector + neckline + phá vỡ + mũi tên mục tiêu.

---

## 3. Kỹ thuật Figma (bài học đã ghi — tránh lặp lỗi)

- Vẽ đường giá = `figma.createVector()` + set `vectorPaths` (`data: "M x y L x y ..."`, cốc dùng `Q` cho cong). KHÔNG ghép nhiều line rời.
- `fontSize` luôn truyền **number**; text wrap cần đặt trong **frame dọc** (autolayout) để không bị cụt.
- ĐỪNG ungroup; capture theo từng **frame id**.
- Neckline/rim nét đứt: `strokeStyle`/`dashPattern = [6,4]`.
- 🔴 Chỉ để DUY NHẤT 1 file mở plugin lúc ghi (tránh flap kết nối — precedent CW6).
- Tham chiếu page sẵn có **"📐 Cách xác định mẫu hình"** (5 sơ đồ + 3 thẻ logic) trong cùng file `candlestick pattern` để giữ phong cách nhất quán → page mới **"📈 Mẫu hình giá"**.

---

## 4. Việc còn cần CEO chốt trước khi dựng (tuần sau)
1. **Ba đỉnh/Ba đáy:** để chung 1 ô (mẫu 4 + 4b) hay tách 2 ô? (catalog ghi gộp dòng 4.)
2. **Tam giác:** vẽ 1 loại (cân) đại diện, hay 3 mini (cân/tăng/giảm)?
3. **Cốc — mục tiêu y=105 vượt khung:** nén thang giá hay ghi nhãn "mục tiêu = miệng + độ sâu" thay vì vẽ tới?
4. Đường giá nền sáng: vàng `#F0C040` hay xám đậm `#1F2937`? (Nến đang dùng màu gì → đồng bộ.)
