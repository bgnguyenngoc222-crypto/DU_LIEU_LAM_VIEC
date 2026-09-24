---
id: IF-2026-035
source: "Email B_ALERT_TRIAL (04_periodic) — gửi Free user chưa từng dùng Cảnh báo"
source_type: khai_niem
date_added: 2026-07-29
origin_note: "Nạp ngược từ email đã gửi trước khi có quy trình idea-fit"
fit_score: 4
status: published
compliance: sach_co_luu_y
features:
  - Cảnh báo
  - Watchlist
  - Bộ lọc
angles:
  - "Xe đua chạy 200km/h được vì có phanh tốt, không vì tài xế liều"
  - "Rủi ro cao thì lợi nhuận cao là câu sai"
  - "Ba câu hỏi bạn không trả lời được về mã đang nắm"
  - "Bạn đi làm, đi ngủ, đi du lịch, Cảnh báo vẫn ở đó"
derived:
  - format: email
    kenh: Email định kỳ
    status: published
    note: "Đã gửi, bản gốc ở email/templates/04_periodic/B_ALERT_TRIAL_*"
---

# IF-2026-035 — Rủi ro nhìn thấy được là rủi ro phòng ngừa được

| Trường | Giá trị |
|---|---|
| Loại | Nạp ngược từ email đã gửi |
| Ngày nạp kho | 2026-07-29 |
| Fit Score | 4/4 |
| Status | published |
| Tuân thủ | Sạch, có một chỗ cần sửa nếu tái sử dụng (xem cuối file) |

## Fit Score: 4/4
- Dạy tư duy về rủi ro, không khoe lãi, không nêu mã cụ thể
- Tính năng giải đúng cái khó ý chính đặt ra: không biết thì không phòng được, Cảnh báo là thứ biến cái không biết thành cái biết
- Chạm nỗi đau người mới: nắm cổ phiếu mà không biết chuyện gì đang xảy ra với nó
- Đúng tông education first, mời dùng tính năng miễn phí chứ không bán gói

## ① Ý chính
> **Rủi ro lớn nhất không phải rủi ro bạn nhìn thấy, mà là rủi ro bạn không biết mình đang nắm. Nhìn thấy được thì phòng ngừa được.**

Phá một câu quen: "rủi ro cao thì lợi nhuận cao" là sai. Câu đúng là người đầu tư giỏi không chấp nhận rủi ro cao, họ nhìn thấy rủi ro trước khi nó đến.

Ẩn dụ neo: một chiếc xe dám chạy 200km/h không phải vì tài xế liều, mà vì xe có bộ phanh dừng được bất cứ lúc nào.

## ② Người đọc nhận được gì
| Tầng | Giá trị |
|---|---|
| Cảm xúc | Bớt cảm giác bất lực khi nắm cổ phiếu mà không biết chuyện gì đang diễn ra. Vấn đề không phải mình kém, mà là mình chưa bật thứ đáng bật |
| Tư duy | Đổi định nghĩa rủi ro, từ "biến động giá" sang "khoảng mù thông tin của chính mình" |
| Hành động | Bật Cảnh báo cho mã đang nắm và mã trong danh mục theo dõi, mất khoảng 3 phút |

## ③ Liên kết KFSP
| Ý trong nguồn | Tính năng |
|---|---|
| Không biết mã của mình vừa rời khỏi đường trung bình | Cảnh báo theo tín hiệu kỹ thuật |
| Không biết khối ngoại bán ròng nhiều phiên liên tiếp | Cảnh báo theo dòng tiền |
| Không biết mã trong danh sách theo dõi vừa vượt kháng cự | Cảnh báo kết hợp Watchlist |
| Giá chạm mức cắt lỗ đã đặt mà không ai báo | Cảnh báo theo ngưỡng giá |
| Muốn quét rộng hơn danh mục đang có | Bộ lọc |

Hai mặt trận của cùng một tính năng: tìm cơ hội và phòng rủi ro. Người mới thường chỉ nghĩ tới mặt thứ nhất.

**Góc mời dùng:** tính năng miễn phí, có sẵn trong app, không bán gói. Đây là lý do email này sạch.

## Phép thử sợi chỉ
1. ③ có giải đúng cái khó ① đặt ra không? ① nói rủi ro lớn nhất là khoảng mù. ③ là công cụ lấp khoảng mù. Đóng đúng vòng.
2. ② hành động có cùng mạch ① không? Bật cảnh báo chính là hành động biến không biết thành biết. Cùng mạch.
3. Che phần KFSP đi thì bài còn gì? Còn nguyên một bài dạy về định nghĩa rủi ro. Đạt.

## Các cách triển khai kết nối (Angles)

| # | Angle | Cách nó land ý chính | Hợp định dạng |
|---|---|---|---|
| A1 | Xe đua và bộ phanh | Đảo ngược trực giác về liều lĩnh, mở bài rất mạnh | Hook mọi định dạng |
| A2 | "Rủi ro cao lợi nhuận cao" là câu sai | Phá một câu ai cũng thuộc, tạo lý do đọc tiếp | Bài tư duy Fanpage |
| A3 | Ba câu hỏi bạn không trả lời được | Đẩy người đọc tự kiểm chứng khoảng mù của mình | Reels, tin ngắn Zalo OA |
| A4 | Bạn đi làm, đi ngủ, đi du lịch | Nói lợi ích bằng đời sống thật thay vì bằng tính năng | Đoạn chốt |

## Đã đẻ ra content
| Định dạng | Kênh | Trạng thái | Angle dùng | Ghi chú |
|---|---|---|---|---|
| Email | Email định kỳ | published | A1 + A2 + A4 | `email/templates/04_periodic/B_ALERT_TRIAL_*` |

## Cần sửa nếu tái sử dụng
Bản gốc có cụm "cơ hội vàng" trong danh sách loại cảnh báo. Sát ranh giới luật cấm gọi điểm thị trường. Đổi thành mô tả trung tính kiểu "vượt kháng cự" là xong.

Bản gốc viết không dấu toàn bộ. Viết lại có dấu trước khi dùng lại ở bất kỳ kênh nào.

## Liên quan
[[IF-2026-023]] cùng trục "chuẩn bị quan trọng hơn cơ hội".
