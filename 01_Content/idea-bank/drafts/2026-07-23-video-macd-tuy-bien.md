# Video KFSP — TÙY BIẾN MACD (từ hộp đen thành chỉ báo của riêng bạn)

> Kênh brand KFSP. Nguồn idea: [[IF-2026-018]]. Nền ý nghĩa đã khoá: `2026-07-20-macd-y-nghia-tu-cong-thuc.md`.
> 🔴 CHỐT FORMAT (CEO 23/07): angle này đi **VIDEO**, KHÔNG carousel. Lý do: nội dung là chuyện *quá trình* (đổi bộ số thì đường đổi thế nào) + *bản chất* (1,10,9 = giá − EMA10), không có "khoảnh khắc" để khoanh trên 1 chart tĩnh. Video animate được nên hợp; carousel ép vào sẽ toàn chữ.
> Cặp giới thiệu MACD: Bài A (đồng hồ xe, carousel) `2026-07-21-fanpage-macd-A-dong-ho-xe.md` — trực quan 3 tín hiệu, giữ nguyên là carousel. Video này là hướng KHÁC: tùy biến bộ số.
> Trục: MACD kinh điển/phổ biến/đơn giản/dễ đọc/hiệu quả → nhưng nhiều người tùy biến theo cách riêng → hiểu cấu tạo (giá cách trung bình bao xa) → **tự tay đổi về 1,10,9 để thấy bản chất trần trụi** (EMA1 = chính giá) → suy ra các bộ số khác chỉ là bản làm mượt/điều chỉnh độ nhạy → hết hộp đen → tự tùy biến thành chỉ báo riêng.
> Cú chốt kỹ thuật đã xác nhận với CEO: EMA chu kỳ 1 có hệ số làm mượt = 1 → EMA(1) = chính giá đóng cửa → MACD(1,10) = giá − EMA10 = khoảng cách giá với đường trung bình, không lớp làm mượt.
> Luật: không em-dash, không icon, xưng "bạn", không %lợi nhuận, không phím hàng, brand spine + disclaimer. Không jargon trần (động lượng/gia tốc/nhịp).
> 🟡 CẦN VERIFY tính năng app trước khi khoá CTA: Biểu đồ KFSP cho (a) chỉnh thẳng 3 con số MACD? (b) thêm bộ MACD thứ hai? Nếu chỉ bật/tắt MACD thì hạ CTA "thử 1,10,9 trên app" xuống.
> Trạng thái: nội dung/luận điểm ĐÃ CHỐT (qua nhiều vòng với CEO). Kịch bản video + TTS đã có (dưới). 2 hình minh hoạ ĐÃ DỰNG FIGMA style bộ cũ (24/07): H1 "BẢN CHẤT CỦA MACD" node `281:7220`, H2 "NHANH HAY CHẬM?" node `281:7946` (page `🎨 Hình content (nháp)`, y≈19600). Idea-fit đầy đủ: [[IF-2026-034]]. Chờ: TTS/dựng video + (mở) Hình 3 cho phần twist.

---

## NỘI DUNG NGUỒN (bản văn xuôi đã chốt — dùng làm gốc viết kịch bản video)

Mạch: Hook → bản chất → thí nghiệm 1,10,9 → 3 kiểu thiết lập → đánh đổi/không chân lý → nói thật + nối bài khối lượng → CTA.

MACD là một trong những chỉ báo kinh điển và phổ biến nhất. Nó được ưa dùng vì ba điều: thiết lập đơn giản, thông tin hiện ra dễ đọc, và đủ hiệu quả để nhiều người dựa vào đó ra quyết định. Nhưng nếu để ý, bạn sẽ thấy không phải ai cũng dùng MACD giống nhau, rất nhiều người tùy biến nó theo cách riêng. Nếu bạn tò mò, muốn tự tinh chỉnh, hay chỉ đơn giản muốn hiểu MACD thật ra hoạt động thế nào, thì xem hết. Xem xong, MACD sẽ không còn là một cái hộp đen bí ẩn với bạn nữa, thậm chí bạn có thể biến nó thành một chỉ báo của riêng mình.

Trước khi xem người ta tùy biến ra sao, cần nắm một điều đơn giản: dù đặt con số nào, MACD cũng chỉ đo đúng một thứ, là giá đang cách đường trung bình của chính nó bao xa.

Muốn tự mắt thấy điều đó, bạn thử một mẹo nhỏ ngay trên app: mở MACD lên và đổi ba con số về 1, 10, 9. Con số đầu tiên là số phiên để tính đường trung bình ngắn, mà trung bình của đúng một phiên thì chính là giá của phiên đó. Vậy nên với bộ 1, 10, 9, đường MACD lúc này đúng bằng giá trừ đi đường trung bình mười phiên, tức là khoảng cách giữa giá và trung bình của nó, không thêm bớt gì. Nhìn nó dao động lên xuống quanh mốc 0, bạn đang thấy trần trụi cái thứ mà MACD đo. Bộ mặc định 12, 26, 9 cũng đo đúng khoảng cách ấy, chỉ khác là thay giá trần bằng một đường trung bình ngắn cho đỡ nhiễu, và lấy nền dài hơn cho mượt.

Hiểu tới đây rồi thì các kiểu thiết lập bạn thấy ngoài kia không còn bí ẩn nữa, mỗi kiểu chỉ là một lựa chọn có lý do.

Kiểu thứ nhất, để mặc định 12, 26, 9. Đây là bộ số gốc, cân bằng giữa nhanh và chậm, vốn hợp với người nhìn đồ thị theo ngày. Cái lợi của việc để mặc định là bạn đang nói cùng một ngôn ngữ với số đông, tín hiệu bạn thấy cũng là tín hiệu phần lớn người khác thấy.

Kiểu thứ hai, rút các con số ngắn lại, chẳng hạn 10, 20, 9. Con số nhỏ hơn làm cái thước nhạy hơn, phản ứng nhanh với giá mới, báo tín hiệu sớm hơn. Người lướt ngắn thích kiểu này vì được vào sớm. Đổi lại, thước càng nhạy thì càng rung, tín hiệu giả cũng nhiều hơn.

Kiểu thứ ba, dùng hai bộ MACD cùng lúc cho hai khung thời gian. Một bộ đặt theo khung tuần để nhìn xu hướng lớn đang nghiêng bên nào, một bộ đặt theo khung ngày để tìm điểm vào, và chỉ hành động khi cả hai cùng chiều. Kiểu này công phu hơn nhưng giúp lọc bớt những tín hiệu đi ngược xu hướng lớn, hợp với người muốn chắc chắn.

Nhìn ba kiểu là thấy: không có bộ số hay cách bày nào là chân lý. Mỗi kiểu là một đánh đổi giữa nhạy và mượt, phục vụ một khung thời gian và một cách giao dịch. Người đánh nhanh cần nhạy, người giữ lâu cần mượt, người cẩn thận thì soi nhiều khung. Hiểu bản chất rồi, bạn chọn kiểu hợp với mình, và khi có ai khuyên bạn đổi MACD sang một bộ số nào đó, bạn không chỉnh theo cho có, mà biết hỏi đổi lại mình được gì và mất gì.

Một điều nói thật với bạn: bày kiểu gì thì MACD vẫn chỉ đo một thứ duy nhất, và đứng một mình nó vẫn có lúc báo hụt, nhất là khi giá đi ngang loanh quanh. Vì vậy ở bài sau chúng ta sẽ ghép nó với khối lượng giao dịch để lọc ra đâu là cú đi thật, đâu là cái bẫy.

Trên KFSP, bạn mở Biểu đồ một mã bất kỳ, thêm MACD chỉ trong một chạm rồi chỉnh lại theo ý mình, thử ngay bộ 1, 10, 9 để thấy bản chất, rồi so với bộ mặc định.

KFSP - Đưa chứng khoán về tầm tay bạn

Nội dung mang tính tham khảo, không phải khuyến nghị mua bán.

---

## KỊCH BẢN VIDEO (Framework 3Qs, ~70s) — CHỐT 23/07

**[HOOK / What — 0:00-0:14]**
MACD là chỉ báo quen mặt nhất trên mọi biểu đồ: thiết lập đơn giản, thông tin dễ đọc, nhiều người tin dùng để ra quyết định. `[Animation: nhịp nhanh, ba từ pop lần lượt]`
Nhưng để ý mà xem, mỗi người lại chỉnh nó một bộ số khác nhau. Vì sao vậy? `[Animation: ease-out, ba khung MACD nhấp nháy, zoom vào câu hỏi]`

**[Why / demo — 0:14-0:44]**
Thật ra dù đặt con số nào, MACD cũng chỉ đo đúng một thứ: giá đang cách đường trung bình của chính nó bao xa. `[Animation: chậm, gạch chân]`
Muốn thấy tận mắt, bạn mở app đổi ba con số về một, mười, chín. Trung bình của đúng một phiên thì chính là giá phiên đó, nên lúc này đường MACD đúng bằng giá trừ đường trung bình mười phiên, trần trụi không che đậy. `[Animation: overlay giá + trung bình 10 phiên, khoảng cách = cột MACD]`
Giờ đổi sang mười, hai mươi, chín. Số ngắn hơn làm nó nhạy hơn, báo sớm hơn, nhưng cũng rung hơn và nhiều tín hiệu giả hơn. `[Animation: đường nhạy cạnh đường mặc định]`

**[How / kết luận — 0:44-1:10]**
Nên đây mới là điều đáng nhớ: bộ số nào không quan trọng bằng việc bạn đọc được thông tin gì từ nó, và bạn sẽ làm gì tiếp theo với thông tin đó. `[Animation: chậm, nghỉ dài, nhấn "đọc được gì" + "làm gì tiếp theo"]`
Trên KFSP, bạn chỉnh thẳng bộ số MACD ngay trên biểu đồ để thử, thậm chí lọc cả loạt cổ phiếu theo MACD chỉ trong vài chạm. Chọn bộ hợp với mình, rồi biến nó thành chỉ báo của riêng bạn. `[Animation: zoom-to-tap ô chỉnh số + màn Bộ lọc]`
KFSP - Đưa chứng khoán về tầm tay bạn. `[Animation: logo + brand spine, sáng dần]`
*(Chữ trên màn cuối: Nội dung mang tính tham khảo, không phải khuyến nghị mua bán.)*

### Sentence Map
| id | Phase | Câu (display) | Main idea | pause_after_ms | Enum |
|---|---|---|---|---|---|
| s01 | HOOK | MACD là chỉ báo quen mặt nhất trên mọi biểu đồ: thiết lập đơn giản, thông tin dễ đọc, nhiều người tin dùng để ra quyết định. | MACD quen mặt, dễ dùng | 300 | [đơn giản, dễ đọc, tin dùng] |
| s02 | HOOK | Nhưng để ý mà xem, mỗi người lại chỉnh nó một bộ số khác nhau. Vì sao vậy? | mỗi người một bộ số | 700 | — |
| s03 | WHY | Thật ra dù đặt con số nào, MACD cũng chỉ đo đúng một thứ: giá đang cách đường trung bình của chính nó bao xa. | giá cách trung bình bao xa | 600 | — |
| s04 | WHY | Muốn thấy tận mắt, bạn mở app đổi ba con số về một, mười, chín. | thử bộ 1 10 9 | 200 | — |
| s05 | WHY | Trung bình của đúng một phiên thì chính là giá phiên đó, nên lúc này đường MACD đúng bằng giá trừ đường trung bình mười phiên, trần trụi không che đậy. | MACD = giá trừ trung bình | 600 | — |
| s06 | WHY | Giờ đổi sang mười, hai mươi, chín. | thử bộ 10 20 9 | 200 | — |
| s07 | WHY | Số ngắn hơn làm nó nhạy hơn, báo sớm hơn, nhưng cũng rung hơn và nhiều tín hiệu giả hơn. | nhạy hơn, nhiều giả hơn | 700 | — |
| s08 | HOW | Nên đây mới là điều đáng nhớ: bộ số nào không quan trọng bằng việc bạn đọc được thông tin gì từ nó, và bạn sẽ làm gì tiếp theo với thông tin đó. | đọc gì, làm gì tiếp | 600 | — |
| s09 | HOW | Trên KFSP, bạn chỉnh thẳng bộ số MACD ngay trên biểu đồ để thử, thậm chí lọc cả loạt cổ phiếu theo MACD chỉ trong vài chạm. | chỉnh + lọc trên KFSP | 250 | [chỉnh bộ số, lọc cổ phiếu] |
| s10 | HOW | Chọn bộ hợp với mình, rồi biến nó thành chỉ báo của riêng bạn. | chỉ báo của riêng bạn | 400 | — |
| s11 | CTA | KFSP - Đưa chứng khoán về tầm tay bạn. | brand spine | 0 | — |

### Script TTS (bản đọc thuần cho Vbee web)
> KFSP đọc "KFS B" (subtitle hiện KFSP). Số đọc rời. 🟡 "MACD" chốt cách đọc khi gen. Disclaimer để chữ trên màn, KHÔNG đọc.

```
MACD là chỉ báo quen mặt nhất trên mọi biểu đồ: thiết lập đơn giản, thông tin dễ đọc, nhiều người tin dùng để ra quyết định.
Nhưng để ý mà xem, mỗi người lại chỉnh nó một bộ số khác nhau. Vì sao vậy?
Thật ra dù đặt con số nào, MACD cũng chỉ đo đúng một thứ: giá đang cách đường trung bình của chính nó bao xa.
Muốn thấy tận mắt, bạn mở app đổi ba con số về một, mười, chín.
Trung bình của đúng một phiên thì chính là giá phiên đó, nên lúc này đường MACD đúng bằng giá trừ đường trung bình mười phiên, trần trụi không che đậy.
Giờ đổi sang mười, hai mươi, chín.
Số ngắn hơn làm nó nhạy hơn, báo sớm hơn, nhưng cũng rung hơn và nhiều tín hiệu giả hơn.
Nên đây mới là điều đáng nhớ: bộ số nào không quan trọng bằng việc bạn đọc được thông tin gì từ nó, và bạn sẽ làm gì tiếp theo với thông tin đó.
Trên KFS B, bạn chỉnh thẳng bộ số MACD ngay trên biểu đồ để thử, thậm chí lọc cả loạt cổ phiếu theo MACD chỉ trong vài chạm.
Chọn bộ hợp với mình, rồi biến nó thành chỉ báo của riêng bạn.
KFS B, đưa chứng khoán về tầm tay bạn.
```

## Ý TƯỞNG HÌNH ẢNH ĐỘNG (cho khâu dựng)
- Cảnh đinh: đường giá + đường trung bình 10 phiên; khoảng cách giữa hai đường co giãn → đúng bằng cột MACD(1,10,9) hiện bên dưới (đồng bộ animation).
- Chuyển bộ số: kéo/đổi 1,10,9 → 12,26,9 → đường MACD từ răng cưa gồ ghề mượt dần ra, cho thấy "làm mượt".
- So nhạy/mượt: đặt 10,20,9 cạnh 12,26,9 trên cùng đoạn giá → bộ nhạy bắt sớm hơn nhưng rung/nhiều tín hiệu giả.
- Hai khung: MACD khung tuần (xu hướng lớn) + MACD khung ngày (điểm vào) cùng chiều.
- Chart nền dùng dữ liệu THẬT (vnstock), ẩn tên mã.
