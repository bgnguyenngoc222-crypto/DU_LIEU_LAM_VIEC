# Fanpage KFSP: MACD + KHỐI LƯỢNG lọc phá vỡ thật/giả (bài giao dịch, nối sau bài Phân kỳ)

> Kênh brand KFSP. Bài dạy TA, tầng "ứng dụng vào giao dịch" trong series MACD (sau Bài A cấu tạo + bài Phân kỳ). Nguồn ý tưởng: [[IF-2026-018]]. Nền: `2026-07-20-macd-y-nghia-tu-cong-thuc.md` mục 7.
> 🔴 TRỤC (CEO chốt 27/07): giá vượt một vùng đỉnh cũ = "phá vỡ"; cần HAI thứ cùng xác nhận là MACD (cắt lên / khoảng cách hai đường trung bình nới ra) + khối lượng phiên vượt lớn; thiếu một, dễ là phá vỡ giả. Bộ lọc quyết định trong ví dụ = khối lượng.
> 🔴 ẨN DỤ VẬT LÝ (động lượng = khối lượng × vận tốc, hòn sỏi/xe tải) ĐỂ DÀNH cho Bài B video, KHÔNG đưa lên carousel. Carousel giải bám thứ quan sát được trên chart.
> 🔴 HÌNH: dữ liệu THẬT DIG. Chart mới có thêm KHỐI LƯỢNG = cột ở đáy pane giá (xanh/đỏ theo phiên tăng/giảm), MACD giữ pane riêng.
>   - Phá vỡ THẬT: bars ~316-344, phiên vượt 18/03/2024 (giá 24.6→26.3, khối lượng 79tr = 2.9x, MACD cắt lên, chạy tiếp lên ~29).
>   - Phá vỡ GIẢ: bars ~186-210, phiên 06/09/2023 (giá thò lên 25.5 sát đỉnh cũ 25.4, khối lượng 27tr = 1.0x lèo tèo, MACD quay đầu, tụt về ~23.5).
>   - Ẩn tên mã. Nến xanh/đỏ opacity 0.34. Vẽ trong FIGMA.
> Luật: không em-dash, không icon, xưng "bạn", không %lợi nhuận, không phím hàng, brand spine + disclaimer.
> Trạng thái: ✅ ĐÃ DUYỆT - Sẵn sàng dựng hình.

---

## CAPTION CHÍNH

MACD KẾT HỢP KHỐI LƯỢNG: LỌC PHÁ VỠ THẬT VÀ GIẢ ĐỂ TRÁNH BẪY "MUA ĐUỔI"

Bạn từng mua ngay khi giá vừa vượt lên một đỉnh mới, tưởng là bắt đầu một đợt tăng, rồi vài phiên sau giá tụt lại đúng chỗ cũ chưa? Cú vượt đó gọi là phá vỡ. Có cú phá vỡ chạy thật, có cú chỉ thò lên rồi rơi, thường gọi là phá vỡ giả. Để hạn chế bị kẹp hàng, bạn cần một bộ lọc để phân biệt chúng, và sự kết hợp giữa MACD với khối lượng giao dịch chính là câu trả lời.

Nhắc nhanh từ bài trước, đường MACD chính là khoảng cách giữa hai đường trung bình của giá, gồm đường ngắn hạn 12 phiên và đường dài hạn 26 phiên. Khi xu hướng tăng mạnh lên, hai đường tách ra và MACD cắt lên rồi nới rộng. Đó là phần đo sức mạnh của đà tăng.

Còn khối lượng giao dịch là số cổ phiếu được khớp trong phiên. Nó cho biết có bao nhiêu người thật sự tham gia vào cú vượt đó. Nếu giá vượt đỉnh mà khối lượng phiên đó vọt lên cao hơn hẳn trung bình những phiên trước, điều đó nghĩa là nhiều người cùng mua vào, cú vượt có lực đẩy thật sự phía sau. Ngược lại, nếu giá vượt mà khối lượng vẫn lèo tèo như ngày thường, nghĩa là chỉ vài người đẩy lên và không có lực đỡ bền vững.

Vì vậy, khi giá vượt một vùng đỉnh cũ, bạn cần quan sát đồng thời hai điều kiện sau:

1. Đường MACD cắt lên trên đường tín hiệu và nới rộng khoảng cách.
2. Khối lượng giao dịch của phiên vượt đỉnh cao hơn hẳn mức trung bình.

Nếu cả hai điều kiện cùng xuất hiện, cú vượt đỉnh sẽ có độ tin cậy rất cao. Ngược lại, nếu thiếu khối lượng xác nhận, bạn nên cẩn trọng vì đó rất có thể là một cái bẫy.

Nhìn vào một ví dụ thực tế. Khi giá cổ phiếu đi ngang tích lũy một thời gian rồi bật tăng vượt khỏi vùng cản cũ, nếu cột khối lượng phiên đó cao vọt và MACD cũng cắt lên mở rộng, ba dấu hiệu này đồng thời xác nhận sẽ mở ra một nhịp tăng dài phía sau.

Nhưng ở một tình huống khác, giá cũng bò lên vượt đỉnh cũ một chút, tạo cảm giác như sắp bứt phá. Thế nhưng cột khối lượng phiên vượt lại thấp và MACD lập tức quay đầu đi xuống. Việc thiếu đi lực mua của dòng tiền lớn khiến giá nhanh chóng tụt lại về vùng tích lũy cũ, khiến những người mua đuổi rơi vào thế bị động.

Một lưu ý sống còn bạn luôn phải nhớ là việc kết hợp khối lượng và MACD chỉ giúp tăng xác suất giao dịch thành công, chứ không đảm bảo chiến thắng hoàn toàn. Vẫn có những trường hợp hội đủ tín hiệu nhưng giá vẫn quay đầu giảm. Do đó, bạn luôn cần đặt trước một điểm dừng lỗ kỷ luật và tuyệt đối không bao giờ tất tay vào một tín hiệu duy nhất.

Trên KFSP, bạn có thể mở Biểu đồ của một mã bất kỳ, bật chỉ báo MACD cùng cột khối lượng để tự mình kiểm chứng các cú vượt đỉnh trong lịch sử. Ở bài viết tiếp theo, chúng ta sẽ cùng mổ xẻ một cách ứng dụng nâng cao khác của chỉ báo này.

Bạn từng gặp cú phá vỡ giả nào gần đây chưa? Hãy chia sẻ câu chuyện của bạn ở phần bình luận bên dưới nhé.

KFSP. Đưa chứng khoán về tầm tay bạn.

Nội dung mang tính tham khảo, không phải khuyến nghị mua bán.

---

## BỐ CỤC 7 SLIDE VÀ NARRATION TỪNG HÌNH

> Narration = đoạn hình "nói" gì và minh hoạ gì, không phải nhãn rời.

### S1: Bìa
* **Tiêu đề:** GIÁ VƯỢT ĐỈNH MỚI: THẬT HAY BẪY
* **Narration:** Hình bìa đặt thẳng câu hỏi người xem hay gặp: giá vừa vượt lên một đỉnh mới, đây là điểm bắt đầu một đợt tăng, hay chỉ là một cú thò lên rồi rơi. Bên dưới là một đoạn biểu đồ thật với một cú vượt đỉnh kèm cột khối lượng cao, để người xem thấy ngay tình huống mình đang nói tới, và tò mò muốn biết cách phân biệt.
* **Hình:** mini chart cú phá vỡ thật (giá vượt và một cột khối lượng vọt cao được tô sáng), overlay câu hỏi "Thật hay bẫy?".

### S2: Phá vỡ là gì, vì sao có cú giả
* **Tiêu đề:** PHÁ VỠ VÀ CÚ THÒ LÊN RỒI RƠI
* **Narration:** Hình giải thích phá vỡ là khi giá vượt qua một vùng đỉnh cũ mà trước đó nó chưa qua được. Rồi hình chỉ ra vấn đề: không phải cú vượt nào cũng thật, có cú giá chỉ nhích qua đỉnh cũ một chút rồi tụt lại, kéo theo những người mua đuổi bị kẹp. Vì thế cần một cách soi trước khi tin vào cú vượt.
* **Hình:** một đoạn giá thò nhẹ qua đường đỉnh cũ rồi rơi lại, đánh dấu vùng người mua đuổi bị kẹp.

### S3: Soi hai thứ khi giá vượt
* **Tiêu đề:** KHI GIÁ VƯỢT: SOI HAI THỨ
* **Narration:** Hình đưa ra bộ đôi cần kiểm tra. Thứ nhất là MACD, nhắc lại từ bài trước rằng MACD đo lực cú đi qua khoảng cách hai đường trung bình, cú mạnh thì MACD cắt lên và nới rộng. Thứ hai là khối lượng, tức số cổ phiếu khớp trong phiên, cho biết có bao nhiêu người thật sự tham gia. Hình chốt ý: cú vượt đáng tin khi cả hai cùng xác nhận.
* **Hình:** khung chia hai: bên trái minh hoạ MACD cắt lên, bên phải minh hoạ một cột khối lượng cao vượt mức thường ngày.

### S4: Phá vỡ thật
* **Tiêu đề:** PHÁ VỠ THẬT: BA DẤU HIỆU CÙNG LÚC
* **Narration:** Hình dùng biểu đồ thật để cho thấy một cú phá vỡ đáng tin. Giá đi ngang một vùng khá lâu rồi bật vượt hẳn lên khỏi vùng đó. Đúng phiên vượt, cột khối lượng cao vọt hơn hẳn những phiên trước, và đường MACD bên dưới cắt lên đường tín hiệu rồi mở rộng ra. Ba dấu hiệu xuất hiện cùng lúc. Sau cú đó giá đi tiếp một đoạn dài, đúng như điều bộ lọc gợi ý.
* **Hình:** chart thật DIG bars 316-344. Đánh dấu: đường vùng đỉnh cũ bị vượt, phiên phá vỡ, cột khối lượng cao được tô sáng, đoạn MACD cắt lên nới rộng.

### S5: Phá vỡ giả
* **Tiêu đề:** PHÁ VỠ GIẢ: THIẾU LỰC THẬT ĐỨNG SAU
* **Narration:** Hình dùng một biểu đồ thật khác để cho thấy cú vượt hụt. Giá bò lên chạm đúng đỉnh cũ và nhích qua một chút, nhìn qua cũng là một đỉnh mới. Nhưng cột khối lượng phiên đó không hơn gì mấy phiên thường, không có dấu hiệu nhiều người cùng vào, và ngay sau đó đường MACD quay đầu đi xuống. Không có lực thật đứng sau, nên giá tụt trở lại vùng cũ. So với hình trước, điểm khác nằm ở khối lượng.
* **Hình:** chart thật DIG bars 186-210. Đánh dấu: giá thò nhẹ qua đỉnh cũ, cột khối lượng phiên vượt ở mức thường (không tô sáng, có nhãn "không vọt lên"), đoạn MACD quay đầu.

### S6: Đừng hiểu sai
* **Tiêu đề:** ĐỪNG HIỂU SAI: TĂNG XÁC SUẤT, KHÔNG PHẢI CHẮC CHẮN
* **Narration:** Hình nói thẳng giới hạn của bộ lọc. Khối lượng lớn cộng MACD xác nhận chỉ làm cú vượt đáng tin hơn, chứ không bảo đảm giá chạy. Vẫn có cú hội đủ dấu hiệu mà vẫn quay đầu. Vì vậy luôn cần đặt trước một điểm dừng lỗ, và đừng đặt tất cả niềm tin vào một tín hiệu. Bộ lọc để nâng xác suất, không phải để chắc thắng.
* **Hình:** chart làm mờ nền + ba ý cảnh báo ngắn.

### S7: CTA
* **Tiêu đề:** (dùng bản CTA CEO đã chỉnh ở Bài A)
* **Narration:** Hình đóng lại bằng lời mời tự thực hành: mở Biểu đồ trên KFSP, bật MACD và bật cột khối lượng, tìm một lần giá vượt đỉnh cũ rồi tự soi hai thứ. Kèm brand spine và câu miễn trừ.
* **Hình:** 3 phone mockup + disclaimer, khớp Bài A.

---

## GHI CHÚ KỸ THUẬT DỰNG CHART (build sau khi CEO duyệt)
* Chart mới so bài phân kỳ: thêm KHỐI LƯỢNG = cột đáy pane giá. Cần chia pane giá thành phần nến (trên) + dải khối lượng (dưới, ~20-25% chiều cao pane giá), rồi pane MACD riêng bên dưới. Hoặc giữ tỉ lệ pane MACD >= 35% như luật.
* Cột khối lượng: xanh/đỏ theo phiên tăng/giảm, phiên phá vỡ thật tô sáng nổi bật.
* 2 cửa sổ data đã chốt (THẬT 316-344 / GIẢ 186-210). Generator `gen_geo.py` mở rộng thêm hàm tính toạ độ cột khối lượng.
* Màu/font: theo handoff (EMA12 đỏ, EMA26 xanh lá, MACD xanh dương, tín hiệu cam, histogram teal/đỏ). Đường đánh dấu đỉnh cũ + phiên vượt = vàng #ffd24d.
