---
id: IF-2026-034
source: "Tinh chỉnh MACD — hiểu bản chất bộ số (12,26,9) để chỉnh có chủ đích, thay vì đi tìm 'bộ số thần thánh'. Cụm MACD, nối [[IF-2026-018]]"
source_type: khai_niem
date_added: 2026-07-24
fit_score: 4
status: in_production
features:
  - TA
  - Biểu đồ TradingView
  - Bộ lọc
angles:
  - "Không có bộ số thần thánh — thôi đi săn thông số hoàn hảo"
  - "Mẹo đưa đường ngắn về 1 lộ bản chất: MACD = giá trừ đường trung bình"
  - "Nhanh hay chậm chỉ là đánh đổi, không phải đúng/sai"
  - "Bộ số không quan trọng bằng bạn cần gì từ thông tin chênh lệch xu hướng ngắn/dài"
derived:
  - "[[IF-2026-018]] — cùng cụm MACD (bài cấu tạo + phân kỳ + MACD×khối lượng)"
---

# IF-2026-034 — Tinh chỉnh MACD (hiểu bản chất bộ số)

## Fit Score: 4/4
1. Dạy phương pháp (hiểu 3 con số để tinh chỉnh có chủ đích, không chỉnh mù): ✅
2. Móc tính năng cụ thể (chỉnh bộ số MACD trên Biểu đồ TradingView + Bộ lọc cổ phiếu theo MACD): ✅
3. Chạm nỗi đau F0 (loay hoay đổi bộ số tìm "bộ hoàn hảo", hoặc bị ai đó khuyên chỉnh mà không hiểu được/mất gì): ✅
4. Education-first (không phím "bộ số thần thánh", dạy tư duy ra quyết định): ✅

**Nguồn:** kiến thức phân tích kỹ thuật (cấu tạo MACD từ EMA), KFSP-hoá cho người mới. Nối cụm MACD của [[IF-2026-018]].

## ① Ý chính
**Chỉnh bộ số MACD chỉ đổi độ NHẠY của cùng một thông tin — khoảng chênh giữa xu hướng ngắn hạn và dài hạn — chứ không đổi thứ nó đo. Nên bộ số nào không quan trọng bằng việc bạn cần gì từ thông tin đó, và nó đứng ở đâu trong các tiêu chí ra quyết định của bạn.**

## ② Người đọc nhận được
| Tầng | Nội dung |
|---|---|
| Cảm xúc | Thôi loay hoay đi tìm "bộ số thần thánh"; bớt bị động khi ai đó khuyên chỉnh MACD |
| Tư duy | Hiểu 12/26/9 chỉ là chọn độ nhạy của một cái thước đo cùng một thứ; nhanh hay chậm là đánh đổi, không có bộ đúng cho tất cả |
| Hành động | Biết chỉnh bộ số theo khung thời gian và cách đánh của mình, và luôn hỏi "mình cần gì từ tín hiệu này, nó xếp đâu trong quyết định" |

## ③ Liên kết KFSP
| Thành phần | Vai trò | Tính năng KFSP | Bước hành trình |
|---|---|---|---|
| Đổi thử bộ số (kể cả 1,10,9 để thấy bản chất) | Tự tay thấy "chỉnh thì đổi gì" | Biểu đồ TradingView (chỉnh thẳng tham số MACD) | 2 |
| So bộ nhanh vs chậm trên cùng mã | Cảm nhận đánh đổi nhạy/mượt | Biểu đồ TradingView | 2 |
| Quét cả loạt mã theo tín hiệu MACD | Đưa MACD vào bộ tiêu chí lọc, không canh từng mã | Bộ lọc cổ phiếu (điều kiện MACD) | 1 |

**Góc CTA:** trên KFSP bạn chỉnh thẳng bộ số MACD trên biểu đồ để thử (kể cả bộ 1,10,9 để thấy bản chất), và lọc cả loạt cổ phiếu theo MACD chỉ trong vài chạm — chọn bộ hợp mình rồi đặt nó đúng chỗ trong cách bạn quyết định.

## 🎯 Các cách triển khai kết nối (Angles)
| # | Angle | Cách land idea | Hợp persona/format |
|---|---|---|---|
| 1 | **Không có bộ số thần thánh** | Hook: thua vài lệnh là đi đổi bộ số/đổi chỉ báo, tài khoản vẫn vậy | P1 video hook |
| 2 | **Mẹo đưa đường ngắn về 1** | Đưa 12→1: EMA1 = chính giá → MACD = giá − trung bình, trần trụi | P1 hình H1 · video |
| 3 | **Nhanh hay chậm = đánh đổi** | Đặt bộ nhạy cạnh bộ chậm trên cùng mã, chỉ ra nhiều tín hiệu giả | P1 hình H2 · video |
| 4 | **Cần gì từ thông tin** (twist) | Bộ số chỉ đổi độ nhạy; câu hỏi thật là thông tin đó đứng đâu trong tiêu chí quyết định | P1 kết bài · caption |

## 📄 Nội dung cả bài (mạch đã chốt với CEO)
Định vị: **tập nối tiếp** sau bài "cấu tạo MACD" (không giảng lại bản chất cho biết, mà dùng để trả lời "chỉnh thì đổi gì").

1. **Hook** — công nhận MACD dễ dùng/dễ hiểu, nhưng là chỉ báo chậm (tín hiệu tới sau khi giá đã đi); nếu bạn từng muốn chỉnh nó cho nhanh hơn thì xem/đọc hết.
2. **Thế lưỡng nan** — chỉnh nhanh thì bắt tín hiệu sớm hơn nhưng nhiều tín hiệu giả hơn; loay hoay giữa nhanh và chắc, đi tìm một bộ số hoàn hảo.
3. **Bản chất (mẹo EMA về 1)** — đường MACD dựng từ hai đường trung bình ngắn/dài; đưa con số đường ngắn về 1 thì trung bình một phiên chính là giá, nên MACD = giá − đường trung bình dài = đo xu hướng ngắn hạn đang tách xa hay xích lại gần xu hướng dài hạn.
4. **Tinh chỉnh** — kéo số ngắn lại: nhạy hơn, sớm hơn, nhiều nhiễu hơn; kéo dài ra: mượt, chậm, chắc hơn. Giờ chỉnh nhanh/chậm đều tự tin vì biết đang đổi cái gì.
5. **Twist (kết)** — chỉnh bộ số thế nào không quan trọng bằng việc bạn cần gì từ thông tin đó (chênh lệch xu hướng ngắn/dài); nó chỉ là một mảnh, câu hỏi thật là nó đứng ở đâu trong tiêu chí ra quyết định của bạn.
6. **CTA** — chỉnh bộ số MACD trên biểu đồ + lọc cổ phiếu theo MACD trên KFSP. Brand spine "Đưa chứng khoán về tầm tay bạn" + disclaimer.

## 🖼️ Diễn giải từng hình (2 hình minh hoạ, dữ liệu DIG thật, ẩn tên mã)
**Hình 1 — "BẢN CHẤT CỦA MACD"** (Figma frame `281:7220`, style bộ cũ: nền tím + logo + footer brand)
Trên: nến thật + đường trung bình dài (EMA26) + vùng tím tô khoảng chênh giữa giá và đường trung bình. Dưới: MACD(1, 26) = giá − EMA26. Một điểm được khoanh: mũi tên đo khoảng chênh giá–trung bình ở trên gióng thẳng xuống đúng giá trị MACD ở dưới → "MACD chính là khoảng chênh đó". Phục vụ đoạn 3 (bản chất).

**Hình 2 — "NHANH HAY CHẬM?"** (Figma frame `281:7946`)
Trên: nến thật. Giữa: MACD NHANH (5, 20, 10) — dao động nhiều, cắt qua lại. Dưới: MACD CHẬM (12, 26, 9) — mượt hơn, ít cắt hơn. Vùng vàng khoanh cùng một đoạn để so: bản nhanh "cắt qua lại nhiều, dễ tín hiệu giả" vs bản chậm "mượt hơn, ít cắt". Phục vụ đoạn 4 (tinh chỉnh).
> Ghi chú bộ nhanh 5,20,10: EMA5 ≈ 1 tuần, EMA20 ≈ 1 tháng, tín hiệu EMA10 ≈ 2 tuần (khung thời gian có nghĩa thật).

**Hình 3 — "MACD CHỈ LÀ MỘT MẢNH"** (Figma frame `283:8815`, hình khái niệm, cùng style)
5 thẻ tiêu chí ra quyết định (Xu hướng chung · Vùng hỗ trợ/kháng cự · Khối lượng · **MACD** (highlight vàng, nhãn "thứ bạn đang mải chỉnh") · Bối cảnh thị trường) → mũi tên → hộp "QUYẾT ĐỊNH của bạn (mua · bán · đứng ngoài)". Câu chốt: "Bộ số nào không quan trọng bằng việc bạn cần gì từ nó, và nó đứng đâu trong cả bức tranh." Phục vụ đoạn 5 (twist).

## Đã đẻ ra content
| Format | Persona/Kênh | Trạng thái | Angle dùng | Link |
|---|---|---|---|---|
| Video ~70-80s | P1 brand KFSP | Script chốt 23/07, chờ TTS + dựng | 1→4 | `drafts/2026-07-23-video-macd-tuy-bien.md` |
| 3 hình minh hoạ | Bài text/carousel fanpage | Dựng Figma xong 24/07 (style bộ cũ) | 2, 3, 4 | Figma `281:7220` (H1) · `281:7946` (H2) · `283:8815` (H3 twist) |
| Bài text fanpage | P1 brand KFSP | Chưa viết (dùng mạch trên + 2 hình) | 1→4 | (chờ) |
