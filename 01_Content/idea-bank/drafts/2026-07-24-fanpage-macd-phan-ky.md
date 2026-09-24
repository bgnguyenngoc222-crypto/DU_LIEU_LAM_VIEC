# Fanpage KFSP — PHÂN KỲ MACD (bài nâng cao, nối sau Bài A "cấu tạo MACD")

> Kênh brand KFSP. Bài dạy TA, tầng "tín hiệu nâng cao" trong series MACD (sau Bài A giới thiệu cấu tạo, trước bài giao dịch MACD + khối lượng). Nguồn idea: [[IF-2026-018]]. Nền ý nghĩa đã khoá: `2026-07-20-macd-y-nghia-tu-cong-thuc.md` (mục 3, Tín hiệu 3).
> 🔴 TRỤC (CEO chốt 24/07): dạy CẢ 2 loại phân kỳ (giảm ở đỉnh + tăng ở đáy), 7 slide, 2 chart. Giải nghĩa BÁM CÔNG THỨC (phân kỳ = khoảng cách EMA đỉnh sau nhỏ hơn), KHÔNG jargon. Có slide "đừng hiểu sai" bắt buộc (trung thực: phân kỳ = suy yếu, không phải lệnh mua/bán).
> 🔴 HÌNH: dữ liệu THẬT DIG. Phân kỳ giảm cửa sổ bars 105-165 (3 đỉnh giá tăng dần 18.16→19.15→19.97, MACD giảm dần 1.19→0.94→0.63). Phân kỳ tăng bars 415-468 (giá đáy 19.19→18.76, MACD -0.82→-0.49). Ẩn tên mã. Pane MACD mở rộng ~2x cho dễ nhìn. Nến xanh/đỏ opacity 0.34. Vẽ trong FIGMA.
> Luật: không em-dash, không icon, xưng "bạn", không %lợi nhuận, không phím hàng, brand spine + disclaimer.
> Trạng thái: ✅ ĐÃ ĐĂNG 24/07/2026 — 7 slide dựng trong Figma (hàng y=22200). Caption bên dưới là bản đăng.

---

## CAPTION CHÍNH

**Tít (chọn 1):** A) Phân kỳ MACD: khi giá còn lên mà sức đã đuối · B) Giá tạo đỉnh mới, MACD lại thấp hơn, đó là dấu hiệu gì

Có một tình huống thế này bạn sẽ gặp hoài: giá cổ phiếu vẫn leo lên đỉnh mới, nhìn rất khỏe, nhưng đường MACD bên dưới thì đỉnh sau lại thấp hơn đỉnh trước. Hai thứ đi ngược nhau. Người ta gọi đó là phân kỳ. Và nếu hiểu nó được sinh ra từ đâu, bạn sẽ đọc được điều thị trường đang nói.

Nhắc nhanh từ bài trước: đường MACD chính là khoảng cách giữa hai đường trung bình của giá, một đường ngắn hạn 12 phiên và một đường dài hạn 26 phiên. Khi hai đường tách xa, MACD lên cao; khi khép lại, MACD hạ xuống.

Giờ nhìn vào phân kỳ giảm. Giá tạo đỉnh sau cao hơn đỉnh trước, đó là chuyện về con số của giá. Nhưng đường MACD ở đỉnh sau lại thấp hơn ở đỉnh trước. Đọc thẳng từ công thức: MACD ở đỉnh sau thấp hơn nghĩa là khoảng cách hai đường trung bình ở đỉnh sau nhỏ hơn. Tức là lần tăng sau, dù giá lên cao hơn, đã kéo đường ngắn hạn tách khỏi đường dài hạn ít hơn lần trước. Cú tăng sau kém dốc hơn cú tăng trước. Nói cách khác, giá vẫn còn lên nhưng sức đã đuối dần, dù chưa quay đầu.

Chiều ngược lại cũng vậy, gọi là phân kỳ tăng. Giá tạo đáy sau thấp hơn đáy trước, nhưng MACD ở đáy sau lại cao hơn. Đà giảm đang yếu đi, dù giá vẫn còn dò xuống.

Một điều phải nói thẳng để bạn không hiểu sai. Phân kỳ là một dấu hiệu cho thấy đà đang suy yếu, không phải một cái lệnh bảo bạn mua hay bán ngay. Nó có thể kéo dài, giá vẫn đi tiếp một đoạn trước khi thật sự quay đầu, mà cũng có khi không quay đầu. Vì vậy đừng dùng nó một mình. Hãy coi nó là một lời nhắc để bạn để ý kỹ hơn, rồi chờ thêm tín hiệu xác nhận và kết hợp cùng công cụ khác.

Trên KFSP, bạn mở Biểu đồ một mã bất kỳ, thêm chỉ báo MACD trong một chạm, rồi thử tự soi xem đỉnh giá và đỉnh MACD có đang đi ngược nhau không. Ở bài sau chúng ta sẽ ghép MACD với khối lượng giao dịch để lọc ra đâu là cú đi thật, đâu là cái bẫy.

Bạn từng thấy phân kỳ trên biểu đồ mã nào chưa? Kể ở phần bình luận nhé.

KFSP - Đưa chứng khoán về tầm tay bạn

Nội dung mang tính tham khảo, không phải khuyến nghị mua bán.

---

## BỐ CỤC 7 SLIDE (Figma hàng y=22200)

| Slide | Tiêu đề | Node | Hình |
|---|---|---|---|
| S1 Bìa | NHẬN DIỆN PHÂN KỲ / GIÁ VÀ MACD ĐI NGƯỢC NHAU | 279:4090 | 2 chart thật thu nhỏ cạnh nhau: âm (S3) + dương (S5), giữ đường phân kỳ + chấm, bỏ chữ dài, nhãn âm/dương + câu chốt (CEO chốt 24/07) |
| S2 | NHẮC NHANH / MACD = KHOẢNG CÁCH HAI ĐƯỜNG TB | 279:4299 | Chart + nhãn nhắc EMA & MACD |
| S3 | PHÂN KỲ GIẢM / GIÁ ĐỈNH CAO, MACD ĐỈNH THẤP | 274:3242 | 3 đỉnh giá tăng ↑ · 3 đỉnh MACD giảm ↓ |
| S4 | ĐỌC TỪ CÔNG THỨC / ĐỈNH SAU HAI ĐƯỜNG TB KHÉP HƠN | 279:4508 | Đo khoảng cách EMA đỉnh 1 RỘNG vs đỉnh 3 HẸP |
| S5 | PHÂN KỲ TĂNG / GIÁ ĐÁY THẤP, MACD ĐÁY CAO | 279:4958 | Chart đáy: giá đáy thấp ↓ · MACD đáy cao ↑ |
| S6 | ĐỪNG HIỂU SAI / PHÂN KỲ LÀ DẤU HIỆU, KHÔNG PHẢI LỆNH | 279:4717 | Chart mờ + 3 ý cảnh báo |
| S7 CTA | (bản CEO chỉnh ở Bài A) | 279:4926 | 3 phone mockup + disclaimer |

> Chốt kỹ thuật dựng chart: xem handoff + Journal 2026-07 (24/07). Data DIG + generator: scratchpad `gen_geo.py` (panes PRICE 330-680, MACD 720-968).
