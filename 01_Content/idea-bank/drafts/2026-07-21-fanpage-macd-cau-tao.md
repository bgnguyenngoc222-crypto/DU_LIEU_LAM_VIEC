# Fanpage KFSP — HIỂU MACD QUA CÁCH NÓ ĐƯỢC TẠO RA (thuần cấu tạo)

> Kênh brand KFSP. Bài dạy TA, tầng "giới thiệu chỉ báo" (trước tầng "giao dịch" = MACD + khối lượng lọc breakout). Nguồn idea: [[IF-2026-018]]. Nền ý nghĩa đã khoá: `2026-07-20-macd-y-nghia-tu-cong-thuc.md`.
> 🔴 TRỤC (CEO chốt 21/07): KHÔNG dùng ẩn dụ (bỏ xe, bỏ dây thun — dành cho video sau). Bài gợi mở góc nhìn: HIỂU MACD QUA CÁCH NÓ ĐƯỢC TẠO NÊN (hai đường trung bình + khoảng cách), rồi đúc ý nghĩa mỗi hình dáng từ cấu tạo.
> Hook: nói thẳng, liệt kê các nhãn quen (động lượng, cắt tín hiệu, histogram, phân kỳ) rồi lật "bạn có biết nó vận động thế nào không".
> 🔴 HÌNH = minh hoạ cấu tạo, dữ liệu THẬT DIG bars 180-320, ẩn tên mã. Vẽ vào FIGMA (matplotlib chỉ preview dáng).
> Luật: không em-dash, không icon, xưng "bạn", không %lợi nhuận, không phím hàng, brand spine + disclaimer.
> Trạng thái: DRAFT. Central illustration (MACD = khoảng cách hai đường TB) đã preview OK 21/07.

---

## CAPTION CHÍNH

**Tít (chọn 1):** A) MACD không phải hộp đen: nó chỉ là khoảng cách giữa hai đường trung bình · B) Hiểu MACD được tạo ra thế nào, bạn sẽ tự đọc được nó

Nhắc tới MACD, chắc bạn đã nghe qua kha khá: nào là chỉ báo động lượng, đo động lực của một xu hướng, rồi canh lúc đường MACD cắt lên hay cắt xuống đường tín hiệu, nhìn mấy cột histogram phình ra rồi co lại, cả phân kỳ báo sắp đảo chiều. Nghe rất quen tai, và nhiều người thuộc lòng mấy quy tắc đó để dùng.

Nhưng thành thật mà nói: bạn có biết bên trong nó thật sự vận động thế nào không, hay chỉ đang làm theo lời người khác chỉ? Vì nếu không hiểu nó đang đo cái gì, thì tới lúc nó báo hụt, bạn sẽ không biết vì sao mà chỉ thấy hoang mang.

Hôm nay hãy nhìn MACD theo một cách khác: hiểu nó qua chính cách nó được tạo ra. Khi thấy nó sinh ra từ đâu, mọi đường loằng ngoằng sẽ có nghĩa.

Bắt đầu từ thứ nhiều người đã quen, là đường trung bình. MACD dùng hai đường trung bình của giá: một đường ngắn hạn, trung bình 12 phiên gần nhất, bám sát giá; và một đường dài hạn, trung bình 26 phiên, chạy chậm hơn. Khi giá tăng tốc, đường ngắn hạn vọt lên tách xa đường dài hạn, hai đường mở ra. Khi giá chững, đường ngắn hạn khựng lại, đường dài hạn đuổi gần, hai đường khép lại.

Và đây là điều cốt lõi: đường MACD chính là khoảng cách giữa hai đường đó, được kéo xuống vẽ riêng bên dưới. Cả đường sóng trông bí ẩn ấy chỉ là một phép trừ, trung bình ngắn hạn trừ trung bình dài hạn.

Hiểu vậy rồi, từng hình dáng tự có nghĩa.

Khi đường MACD nằm trên mốc 0, nghĩa là trung bình ngắn hạn đang cao hơn dài hạn, giá gần đây đang nhỉnh lên trên nền trung hạn. Nằm dưới mốc 0 thì ngược lại. Đúng lúc MACD chạm mốc 0 là lúc hai đường trung bình cắt nhau.

Khi đường MACD đi lên xa mốc 0, hai đường trung bình đang mở rộng ra, cú tăng đang mạnh dần. Khi nó bò về mốc 0, hai đường đang khép lại, cú tăng đang đuối, dù giá chưa quay đầu.

Còn đường tín hiệu chỉ là đường MACD được làm mượt thêm một lần, trung bình 9 phiên của chính nó, nên chạy chậm hơn một nhịp. Khi đường MACD cắt lên trên đường tín hiệu, nghĩa là khoảng cách hai đường trung bình đang nới rộng nhanh hơn thường lệ, cú đi vừa mạnh hẳn lên. Cắt xuống thì ngược lại.

Còn những cột histogram bạn hay thấy chính là khoảng cách giữa đường MACD và đường tín hiệu, vẽ thành cột cho dễ nhìn. Hai đường xa nhau thì cột cao, xích lại gần thì cột co dần về 0. Histogram không cho thêm thông tin gì mới, nó chỉ giúp bạn nhận ra khoảng cách giữa hai đường nhanh hơn bằng mắt, thay vì phải căng mắt đo hai đường sát nhau.

Một điều nói thật: hiểu cấu tạo giúp bạn đọc MACD có gốc, nhưng nó vẫn dựng từ đường trung bình nên có độ trễ, đứng một mình vẫn có lúc báo hụt, nhất là khi giá đi ngang loanh quanh. Vì vậy ở bài sau chúng ta sẽ ghép nó với khối lượng giao dịch để lọc ra đâu là cú đi thật, đâu là cái bẫy.

Trên KFSP, bạn mở Biểu đồ một mã bất kỳ, thêm chỉ báo MACD chỉ trong một chạm, nó hiện ngay bên dưới nến. Giờ nhìn nó, bạn sẽ không còn thấy một đường bí ẩn, mà thấy hai đường trung bình đang mở ra hay khép lại.

Bạn từng dùng MACD mà chưa để ý nó được tạo ra thế nào chứ? Kể ở phần bình luận nhé.

KFSP - Đưa chứng khoán về tầm tay bạn

Nội dung mang tính tham khảo, không phải khuyến nghị mua bán.

---

## BỐ CỤC 6 SLIDE (minh hoạ cấu tạo, chung chart DIG bars 180-320)

| Slide | Tiêu đề | Hình minh hoạ |
|---|---|---|
| S1 Bìa | SỰ THẬT VỀ CHỈ BÁO MACD / ĐƠN GIẢN MÀ RẤT HIỆU QUẢ (CEO chốt) | Chart MACD mờ + chồng nhãn quen (động lượng / cắt tín hiệu / histogram / phân kỳ) — chỉ là hook |
| S2 | ĐƯỜNG MACD (= khoảng cách hai đường trung bình) | Hai EMA (ngắn/dài) trên giá + thanh khoảng cách → chính là đường MACD dưới |
| S3 | Khoảng cách mở ra hay khép lại | Vùng hai EMA mở rộng (MACD lên cao) + vùng sát/cắt (MACD quanh mốc 0) |
| S4 | Đường tín hiệu: MACD làm mượt | MACD + đường tín hiệu (làm mượt) + đánh dấu 1 giao cắt (KHÔNG có histogram) |
| S5 | Histogram: khoảng cách MACD và tín hiệu | MACD + tín hiệu + histogram đậm; cột cao = hai đường xa, cột co về 0 = sắp cắt |
| S6 CTA | Mở MACD chỉ trong một chạm | Khối CTA + bắc cầu bài khối lượng + disclaimer |

> 🔴 Scope (CEO chốt 23/07): bài nhập môn chỉ tới HISTOGRAM. **Phân kỳ để dành bài sau** trong series (tín hiệu nâng cao). Màu đường CEO chỉnh: ngắn hạn = đỏ, dài hạn = xanh lá, MACD = xanh dương, tín hiệu = cam.

---

## DIỄN GIẢI TỪNG HÌNH (chữ đọc đi kèm mỗi slide)

### HÌNH 1 · Bìa
Động lượng, cắt đường tín hiệu, histogram, phân kỳ. Bạn nghe những từ này quen tai và có khi dùng MACD mỗi ngày. Nhưng bạn có biết nó thật sự được tạo ra thế nào không? Hiểu cái đó, bạn sẽ tự đọc được nó thay vì học thuộc.

### HÌNH 2 · MACD = khoảng cách giữa hai đường trung bình
MACD dùng hai đường trung bình của giá: một đường ngắn hạn (12 phiên) bám sát giá, một đường dài hạn (26 phiên) chạy chậm hơn. Đường MACD bạn thấy bên dưới chính là khoảng cách giữa hai đường đó, kéo xuống vẽ riêng. Chỉ là một phép trừ, không có gì bí ẩn.

### HÌNH 3 · Hai đường mở ra hay khép lại
Khi giá tăng tốc, đường ngắn hạn tách xa đường dài hạn, hai đường mở ra, đường MACD đi lên xa mốc 0, cú tăng đang mạnh dần. Khi giá chững, hai đường khép lại, MACD bò về mốc 0, cú tăng đang đuối. Đúng lúc hai đường cắt nhau là lúc MACD chạm mốc 0.

### HÌNH 4 · Đường tín hiệu: MACD làm mượt
Đường tín hiệu chỉ là đường MACD được làm mượt thêm một lần, chạy chậm hơn một nhịp. Khi đường MACD cắt lên trên nó, nghĩa là khoảng cách hai đường trung bình đang nới rộng nhanh hơn thường lệ, cú đi vừa mạnh hẳn lên. Cắt xuống thì ngược lại. Đây là một trong những cách người ta hay dùng để canh MACD.

### HÌNH 5 · Histogram: khoảng cách MACD và tín hiệu
Những cột histogram chính là khoảng cách giữa đường MACD và đường tín hiệu, vẽ thành cột cho dễ nhìn. Hai đường xa nhau thì cột cao, xích lại gần thì cột co dần về 0. Nên khi thấy các cột đang cao mà thấp dần, bạn biết hai đường sắp cắt nhau, coi như một lời báo trước cho cú giao cắt.

### HÌNH 6 · Thêm MACD trên KFSP
Bạn không cần tự tính gì cả. Trên KFSP, mở Biểu đồ một mã bất kỳ, thêm chỉ báo MACD trong một chạm, nó hiện ngay bên dưới nến. Giờ nhìn nó, bạn sẽ thấy hai đường trung bình đang mở ra hay khép lại, chứ không còn là một đường bí ẩn.
