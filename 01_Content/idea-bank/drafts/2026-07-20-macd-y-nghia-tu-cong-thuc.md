# MACD — ý nghĩa rút từ công thức (bản chuẩn, khoá lại)

> Ghi chú nền cho IF-2026-018. Mục tiêu: giải nghĩa MACD **chỉ bám công thức**, dùng từ chuẩn, bỏ ví von tự suy diễn ("động lượng", "nền cũ", "chạy trước"). Dùng làm nguồn cho Bài 1 (giới thiệu MACD) và Bài 2 (MACD + khối lượng lọc breakout).

---

## 1. Công thức chuẩn

MACD dùng ba đường trung bình động hàm mũ (EMA — loại trung bình động đặt trọng số cao hơn cho các phiên gần nhất):

```
Đường MACD    = EMA 12 phiên (của giá) − EMA 26 phiên (của giá)
Đường tín hiệu = EMA 9 phiên (của chính Đường MACD)
Histogram     = Đường MACD − Đường tín hiệu
```

- EMA 12 phiên: trung bình giá của 12 phiên gần nhất — phản ứng nhanh với giá hiện tại.
- EMA 26 phiên: trung bình giá của 26 phiên — phản ứng chậm hơn, đóng vai mốc so sánh.
- Mốc 0: đường nằm ngang tham chiếu, ứng với lúc EMA 12 phiên = EMA 26 phiên.

---

## 2. Ý nghĩa từng thành phần (đọc thẳng từ công thức)

### Đường MACD = hiệu hai EMA = khoảng cách giữa trung bình ngắn hạn và trung bình dài hạn
- MACD **dương** ⟺ EMA 12 phiên cao hơn EMA 26 phiên ⟺ trung bình giá ngắn hạn đang **cao hơn** trung bình giá dài hạn.
- MACD **âm** ⟺ trung bình ngắn hạn **thấp hơn** trung bình dài hạn.
- Độ lớn của MACD = **hai đường trung bình đang cách nhau bao nhiêu**.
  - Khoảng cách **nới rộng**: giá gần đây đang tăng nhanh hơn tốc độ mà trung bình dài hạn theo kịp → xu hướng tăng đang mạnh lên.
  - Khoảng cách **co lại** (dù MACD còn dương): giá gần đây chững lại, trung bình dài hạn đuổi gần lại → cú tăng đang yếu đi, ngay cả khi giá chưa quay đầu.

### Đường tín hiệu = EMA 9 phiên của Đường MACD = mức trung bình gần đây của chính khoảng cách đó
- Nó làm mượt Đường MACD, chạy chậm hơn một nhịp.
- So Đường MACD với Đường tín hiệu = so giá trị khoảng cách hiện tại với mức trung bình gần đây của chính nó.

### Histogram = Đường MACD − Đường tín hiệu = chiều cao chênh lệch giữa hai đường
- Histogram giãn ra: hai đường đang tách xa → thay đổi đang tăng tốc.
- Histogram co về 0: hai đường đang xích lại → sắp giao cắt.

### Mốc 0
- MACD = 0 ⟺ EMA 12 phiên = EMA 26 phiên ⟺ hai đường trung bình cắt nhau.
- MACD cắt lên trên 0: trung bình ngắn hạn vừa vượt lên trên trung bình dài hạn.
- MACD cắt xuống dưới 0: trung bình ngắn hạn vừa tụt xuống dưới trung bình dài hạn.

---

## 3. Ba tín hiệu (giải bằng công thức, không bằng khẩu hiệu)

### Tín hiệu 1 — Giao cắt giữa Đường MACD và Đường tín hiệu
- MACD **cắt lên** đường tín hiệu: khoảng cách hai EMA đang nới ra nhanh hơn mức trung bình gần đây của nó → cú đi vừa mạnh lên.
- MACD **cắt xuống** đường tín hiệu: khoảng cách đang co lại nhanh hơn mức trung bình gần đây → cú đi vừa yếu đi.

### Tín hiệu 2 — Vị trí so với mốc 0
- MACD trên 0: trung bình ngắn hạn cao hơn dài hạn (nghiêng về phe mua).
- MACD dưới 0: trung bình ngắn hạn thấp hơn dài hạn (nghiêng về phe bán).
- Thời điểm MACD cắt từ dưới lên trên 0 = thời điểm hai đường trung bình cắt nhau theo hướng tăng.

### Tín hiệu 3 — Phân kỳ
- Định nghĩa: giá tạo đỉnh sau **cao hơn** đỉnh trước, nhưng Đường MACD ở đỉnh sau **thấp hơn** ở đỉnh trước.
- Đọc từ công thức: MACD ở đỉnh sau thấp hơn nghĩa là khoảng cách EMA 12 − EMA 26 ở đỉnh sau **nhỏ hơn** ở đỉnh trước. Tức lần tăng sau, dù giá lên cao hơn về con số, đã kéo trung bình ngắn hạn tách khỏi trung bình dài hạn **ít hơn** lần trước → mức tăng gần đây kém dốc hơn so với đợt trước.

---

## 4. Câu gói (rút từ công thức)

> **MACD là khoảng cách giữa trung bình giá ngắn hạn (12 phiên) và trung bình giá dài hạn (26 phiên). Khoảng cách đó dương hay âm cho biết trung bình ngắn hạn đang cao hơn hay thấp hơn dài hạn; nó nới ra hay co lại cho biết cú đi đang mạnh lên hay yếu đi.**

---

## 5. Trường hợp giới hạn (1, 10) — lộ bản chất
- EMA chu kỳ 1 có α = 2/(1+1) = 1 → EMA(1) = chính đường giá.
- Nên MACD(1, 10) = giá − EMA(10) = **chênh lệch giữa giá và đường trung bình của nó**.
- Suy ra MACD chuẩn (12, 26) chỉ là bản làm mượt của cùng ý tưởng: thay giá trần bằng EMA12 cho đỡ nhiễu, thay EMA10 bằng EMA26 cho nền chậm hơn. Bản chất: **mức giá gần đây đang cách trung bình dài hạn bao xa**.

## 6. Hai ẩn dụ trụ (cả hai bám công thức — dùng cho 2 video test)

### Ẩn dụ A — Đồng hồ xe (vị trí / vận tốc / gia tốc)
Ánh xạ một-một, phủ trọn 3 thành phần:
| Vật lý | Định nghĩa | Thành phần MACD | Đọc trên biểu đồ |
|---|---|---|---|
| Vị trí | Đang ở đâu | Giá | Nến ở mức nào |
| Vận tốc (tốc độ CÓ HƯỚNG) | Đi nhanh cỡ nào, hướng nào | Đường MACD | Trên/dưới mốc 0 = lên/xuống; xa mốc 0 = nhanh |
| Gia tốc | Vận tốc đang tăng hay giảm | Histogram | Cột cao dần = tăng tốc; co lại = giảm tốc |
- Giao cắt MACD × tín hiệu (histogram = 0) = chuyển từ đạp ga sang phanh (hoặc ngược).
- Mốc 0 = xe đổi chiều tiến/lùi.
- Phân kỳ = tới chỗ xa hơn (giá đỉnh cao hơn) bằng vận tốc chậm hơn (MACD thấp hơn) = giảm tốc, sắp hết trớn.
- **"Động lượng" định nghĩa cho chặt** = trong tài chính chính là vận tốc của giá (khối lượng coi như hằng). Nên "MACD là chỉ báo động lượng" = MACD đo vận tốc của giá.

### Ẩn dụ B — Dây thun (giá căng khỏi đường trung bình)
- Sợi dây thun nối giá với đường trung bình của nó. Giá rời xa trung bình = dây căng; giá về sát = dây chùng.
- MACD = thước đo độ căng đó. Dương = căng lên trên; âm = căng xuống dưới; về 0 = chùng.
- Neo vào MA (F0 nhiều người đã quen). Nhược: histogram gắn gượng (dây thun giải Đường MACD tốt, gia tốc thì không tự nhiên).

## 7. Cú nối vàng sang Bài 2 — động lượng = khối lượng × vận tốc
- Vật lý: động lượng p = m·v.
- Ánh xạ: vận tốc = Đường MACD · khối lượng (mass) = Khối lượng giao dịch → **động lượng thật của cú phá vỡ = Khối lượng × MACD**.
- Phá vỡ MACD mạnh nhưng khối lượng lèo tèo = vận tốc cao, khối lượng nhỏ = động lượng bé = hòn sỏi ném nhanh, chạm nhẹ bật lại (phá vỡ giả).
- Phá vỡ khối lượng lớn + MACD cùng chiều = động lượng lớn = xe tải lao tới, khó cản (phá vỡ thật).
- Đây là lý do VẬT LÝ (không phải khẩu hiệu) vì sao breakout cần cả khối lượng lẫn MACD → xương sống Bài 2.

## 8. Từ CẤM (dùng như lời giải thích trần) / Từ CHUẨN
- CẤM để trần (không gói ẩn dụ): "động lượng", "gia tốc", "quán tính", "nền cũ", "chạy trước".
- CHUẨN: "trung bình giá ngắn hạn / dài hạn", "khoảng cách hai đường trung bình", "cao hơn / thấp hơn", "nới rộng / co lại", "cú đi mạnh lên / yếu đi", "sức đã đuối dù giá chưa quay đầu".
- Ngoại lệ: "vận tốc / gia tốc / động lượng" ĐƯỢC dùng khi bọc trong ẩn dụ đồng hồ xe (kim tốc độ / chân ga / phanh) để F0 thấm.
