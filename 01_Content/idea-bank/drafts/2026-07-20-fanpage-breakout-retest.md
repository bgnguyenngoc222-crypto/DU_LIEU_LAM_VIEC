# Fanpage KFSP — BREAKOUT / RETEST (hai điểm mua)

> Kênh brand KFSP. Bài dạy TA, nối tiếp bài Hỗ trợ/Kháng cự (IF-2026-016). Nguồn idea-fit: [[IF-2026-021]].
> Trục bài: một cú phá vỡ mở ra HAI điểm mua (không phải "đừng mua đuổi, chờ retest"). Điểm 1 = cú phá vỡ (sớm, rủi ro hơn, lợi thế lớn); Điểm 2 = giá quay lại giữ vùng (chậm hơn, chắc hơn). Cả hai đều cần KHỐI LƯỢNG. Retest = phản ứng tâm lý (phe mua nghỉ, đón người lỡ tàu + người đoán sai quay lại), không phải quy tắc kỹ thuật.
> 🔴 HÌNH = nến + KHỐI LƯỢNG dữ liệu THẬT (vnstock), ẩn tên mã. 3 chart:
>   - Chính (breakout-retest thành công): CEO tuần... thực ra ngày, cửa sổ bars 172-209. Phá vỡ vol 100%, quay về giữ vùng bật lại vol 86%. Dùng slide 1/2/4/6.
>   - Phá vỡ giả (vol yếu): HPX cửa sổ 178-200, cú nhử vol ~21% rồi tụt. Slide 3.
>   - Retest thất bại (vol bán lớn): DGW cửa sổ 452-486, thủng vùng vol 100%. Slide 5.
> Chú thích panel nền tối + khoanh vòng + mũi tên + highlight thanh khối lượng.
> Luật: không gạch ngang dài, không icon, xưng "bạn", brand spine + disclaimer. Không %lợi nhuận, không phím hàng.
> Trạng thái: ✅ ĐÃ ĐĂNG 20/07/2026 (CEO tự đăng). Carousel 6 hình.
> Figma (file `candlestick pattern`, page `🎨 Hình content (nháp)`, hàng y=15185): S1 Bìa 257:16461 · S2 257:16606 · S3 257:16751 · S4 257:16896 · S5 257:17041 · S6 CTA 257:17186. Base `BR · _NGUON` 257:16035.
> Hạ tầng nến+vol: venv `/tmp/vnenv`; generator `/tmp/gen_all_v.py` (nén nến PT360-PB800, volume VT838-VB976); data CSV `/tmp/{CEO,HPX,DGW}.csv`.

---

## CAPTION CHÍNH

Tít (chọn 1): A) Một cú phá vỡ, hai điểm mua: chọn sớm mà lời nhiều hay chậm mà chắc? · B) Phá vỡ vùng cản: mua ngay hay chờ giá quay lại?

Bạn thấy một mã phá qua vùng kháng cự, nến xanh dứt khoát, khối lượng nhảy vọt. Mua ngay thì sợ dính phá vỡ giả, mà đứng chờ thì sợ tàu chạy mất. Thật ra một cú phá vỡ tốt cho bạn tới hai điểm mua, mỗi điểm một kiểu đánh đổi, chọn điểm nào là tuỳ khẩu vị rủi ro của bạn.

1. Điểm mua thứ nhất, ngay tại cú phá vỡ
Khi giá đóng cửa vượt hẳn lên trên vùng kháng cự đã kìm nó nhiều lần, kèm khối lượng tăng mạnh, đó là lúc bạn có thể đặt cược sớm. Khối lượng lớn ở đây rất quan trọng, nó cho thấy có dòng tiền thật đẩy giá đi chứ không phải một cú nhử. Điểm này rủi ro hơn vì cú phá có thể là giả, giá quay lại thủng vùng kháng cự và bạn dính bẫy. Nhưng đổi lại bạn vào sớm nhất, giá tốt nhất, nếu đúng thì lợi thế rất lớn.

2. Điểm mua thứ hai, khi giá quay lại và giữ vùng
Sau cú đẩy đầu, giá thường chững lại rồi quay về chạm chính cái vùng kháng cự vừa phá. Đây không phải một quy tắc kỹ thuật bắt buộc, nó là phản ứng tâm lý rất người của thị trường. Đợt đẩy đầu tiên lấy đi nhiều sức của phe mua nên họ cần một nhịp nghỉ. Trong lúc nghỉ đó, những người lỡ tàu vì mua chậm hay đặt lệnh bị trượt sẽ chờ giá chỉnh về để vào, những người trước đó đoán sai chiều cũng nhận ra và quay lại mua đúng hướng. Khi giá về chạm vùng kháng cự cũ mà giữ được rồi bật lên kèm khối lượng, nghĩa là kháng cự cũ đã thành vùng hỗ trợ mới và cầu thật đã quay lại. Điểm mua này vào chậm hơn nhưng chắc hơn nhiều.

Cả hai điểm mua đều cần chung một điều kiện là khối lượng. Vào lúc phá vỡ mà khối lượng lèo tèo thì rất dễ là phá vỡ giả. Vào lúc giá bật lên khi kiểm tra lại vùng hỗ trợ mà khối lượng cạn thì cũng chưa đủ tin. Khối lượng là chữ ký của dòng tiền, thiếu nó thì cả hai điểm mua đều chỉ là phỏng đoán.

3. Khi điểm mua thứ hai cũng thất bại
Nhịp quay lại không phải lúc nào cũng giữ. Nếu giá về vùng hỗ trợ rồi thủng luôn xuống dưới, nghĩa là cầu không đủ và kịch bản đã sai. Lúc đó đứng ngoài là đúng, còn nếu bạn đã mua ở điểm một thì đây là chỗ để cắt lỗ chứ không cố gồng.

Tóm lại, phá vỡ không phải một cái nút bấm mua duy nhất, nó mở ra hai cơ hội. Vào sớm ở cú phá là chọn lợi thế và chịu rủi ro cao hơn, vào khi giá quay lại giữ vùng hỗ trợ là chọn sự chắc chắn và chấp nhận giá kém hơn một chút. Điểm chung của cả hai là luôn nhìn khối lượng để biết dòng tiền có thật hay không, và luôn có điểm cắt lỗ ngay dưới vùng.

Thực chiến trên KFSP, bạn không phải ngồi canh từng phiên. Dùng Bộ lọc để tầm soát những mã đang tạo vùng kháng cự và vừa phá vùng, đưa mã ưng ý vào Watchlist, rồi đặt Cảnh báo tại vùng đó. Giá phá lên hay quay về kiểm tra, ứng dụng đều báo cho bạn, việc còn lại là nhìn khối lượng rồi quyết định.

Bạn quen vào ở cú phá hay chờ giá quay lại giữ vùng hỗ trợ? Kể ở phần bình luận nhé.

KFSP - Đưa chứng khoán về tầm tay bạn

Nội dung mang tính tham khảo, không phải khuyến nghị mua bán.

---

## DIỄN GIẢI TỪNG HÌNH (chữ đọc đi kèm mỗi hình)

### HÌNH 1 · Bìa — Hai điểm mua trên một cú phá vỡ
Một cú phá vỡ tốt không chỉ có một chỗ để mua. Khi giá vượt qua vùng kháng cự, bạn có hai thời điểm để vào: ngay lúc phá vỡ, và lúc giá quay lại kiểm tra vùng đó rồi giữ được. Điểm đầu vào sớm, lời nhiều hơn nhưng rủi ro hơn; điểm sau chắc chắn hơn nhưng giá kém hơn một chút. Cả hai chỉ đáng tin khi có khối lượng đi kèm.

### HÌNH 2 · Điểm mua 1 — Cú phá vỡ
Điểm mua đầu tiên nằm ngay tại cây nến phá vỡ. Khi giá đóng cửa vượt hẳn lên trên vùng kháng cự đã kìm nó nhiều lần, kèm khối lượng tăng mạnh, đó là lúc dòng tiền thật đang vào. Bạn vào ở đây là vào sớm nhất, giá tốt nhất. Đổi lại, đây là điểm rủi ro hơn vì cú phá có thể là giả, nên luôn đặt cắt lỗ ngay dưới vùng.

### HÌNH 3 · Rủi ro — Phá vỡ giả
Không phải cú phá nào cũng thật. Nếu giá vọt lên trên vùng kháng cự mà khối lượng lèo tèo, tức là không có dòng tiền thật đẩy, chỉ vài phiên sau giá thường tụt lại xuống dưới. Đó là phá vỡ giả, và người mua đuổi ngay cây nến phá là người mắc kẹt đầu tiên. Vì vậy đừng dồn hết vốn vào lần phá đầu khi khối lượng chưa xác nhận.

### HÌNH 4 · Điểm mua 2 — Kiểm tra hỗ trợ thành công
Điểm mua thứ hai đến khi giá quay lại chạm vùng cũ và giữ được, lúc này vùng kháng cự cũ đổi vai thành hỗ trợ mới. Đây không phải quy tắc kỹ thuật gì, mà là tâm lý con người: đợt đẩy đầu ngốn sức phe mua nên họ cần nghỉ, còn vùng thì đón thêm những người lỡ tàu và những người đoán sai giờ quay lại đúng chiều. Khi giá bật lên từ vùng kèm khối lượng, đó là điểm vào chắc hơn, và bạn đặt cắt lỗ ngay dưới vùng hỗ trợ.

### HÌNH 5 · Rủi ro — Retest thất bại
Nhịp quay lại cũng có thể hỏng. Nếu giá về vùng rồi thủng luôn xuống dưới kèm khối lượng bán lớn, nghĩa là cầu không đủ và kịch bản đã sai, vùng không giữ được để thành hỗ trợ. Lúc đó việc đúng là đứng ngoài, còn nếu bạn đã mua ở điểm một thì đây là chỗ để cắt lỗ chứ không cố gồng.

### HÌNH 6 · Thiết lập cảnh báo với KFSP
Bạn không cần ngồi canh bảng từng phiên để bắt hai điểm mua này. Trên KFSP, dùng Bộ lọc để tìm những mã đang tạo vùng và vừa phá vùng, lưu vào Watchlist, rồi đặt Cảnh báo ngay tại vùng. Giá phá lên hay quay về kiểm tra, ứng dụng đều báo cho bạn, việc còn lại chỉ là nhìn khối lượng rồi quyết định.
