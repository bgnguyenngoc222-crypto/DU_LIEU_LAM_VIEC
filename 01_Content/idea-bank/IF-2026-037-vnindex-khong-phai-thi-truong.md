---
id: IF-2026-037
source: "Email B_ANNOUNCEMENT_giao_dien_moi_v2 (04_periodic) — gửi Free và Trial, tháng 4/2026"
source_type: khai_niem
date_added: 2026-07-29
origin_note: "Nạp ngược từ email đã gửi. Bản gốc chỉ có HTML, nội dung bóc ra từ đó"
fit_score: 4
status: published
compliance: sach
features:
  - Độ rộng thị trường
  - RRG
  - Bản đồ nhiệt
  - IBD
angles:
  - "Tài khoản đỏ trong khi VN-Index xanh, bạn đang so sai thước đo"
  - "Ba phiên thật 21 đến 23/04, số mã giảm áp đảo mà index vẫn xanh"
  - "Một mã vốn hoá lớn kéo bằng cả thị trường cộng lại"
  - "Index xanh chỉ nói tổng vốn hoá tăng, không nói cổ phiếu của bạn"
derived:
  - format: email
    kenh: Email định kỳ
    status: published
    note: "email/templates/04_periodic/B_ANNOUNCEMENT_giao_dien_moi_v2_*"
  - format: landing
    kenh: Web
    status: published
    note: "Cấu trúc 1:1 với landing giao_dien_v2"
---

# IF-2026-037 — VN-Index không phải thị trường

| Trường | Giá trị |
|---|---|
| Loại | Nạp ngược từ email đã gửi |
| Ngày nạp kho | 2026-07-29 |
| Fit Score | 4/4 |
| Status | published |
| Tuân thủ | Sạch. Dùng số thật để giải thích cấu trúc chỉ số, không dự báo hướng đi |

## Fit Score: 4/4
- Dạy một hiểu lầm phổ biến và sửa được ngay, không nêu khuyến nghị
- Tính năng là câu trả lời trực tiếp cho câu hỏi bài đặt ra
- Chạm đúng nỗi ức chế cụ thể nhất của người mới: tài khoản đỏ mà báo đài nói thị trường xanh
- Có bằng chứng kiểm chứng được, không nói suông

## ① Ý chính
> **VN-Index không phải thị trường. Index xanh chỉ nói tổng vốn hoá toàn thị trường tăng, và phần lớn mức tăng đó thường do vài mã vốn hoá lớn kéo. Cổ phiếu của bạn nằm ngoài câu chuyện đó.**

Đây là idea mạnh nhất trong cả sáu email nạp ngược, vì nó giải thích một trải nghiệm mà gần như mọi người mới đều có nhưng không gọi tên được.

Bằng chứng bản gốc dùng, ba phiên liên tiếp:

| Phiên | Index | Thực tế bên dưới |
|---|---|---|
| 21/04 | giảm 0,2% | 227 mã giảm so với 94 mã tăng. Hai mã lớn cộng lại vẫn đóng góp dương 22 điểm |
| 22/04 | tăng 1,3% | Một mã tăng trần đóng góp hơn 23 điểm, bằng toàn bộ mức tăng của index |
| 23/04 | tăng 0,7% | VN30 giảm 0,03%, đi ngược chiều index |

Cách dùng số này sạch vì nó **giải thích cơ chế cấu tạo chỉ số**, không phải dự đoán chỉ số sẽ đi đâu. Đây là ranh giới quan trọng cần giữ khi tái sử dụng.

## ② Người đọc nhận được gì
| Tầng | Giá trị |
|---|---|
| Cảm xúc | Nhẹ người. Tài khoản đỏ trong khi index xanh không phải vì mình chọn sai hết, mà vì đang so với một thước đo không đo thứ mình nắm |
| Tư duy | Hiểu chỉ số là bình quân gia quyền theo vốn hoá, nên vài mã lớn có thể lấn át phần còn lại |
| Hành động | Đổi thước đo. Nhìn độ rộng thị trường, dòng tiền ngành, sức mạnh giá thay vì chỉ nhìn một con số |

## ③ Liên kết KFSP
| Ý trong nguồn | Tính năng |
|---|---|
| Bao nhiêu mã tăng so với bao nhiêu mã giảm | Độ rộng thị trường |
| Tiền đang chảy vào ngành nào, rời ngành nào | RRG |
| Nhìn toàn thị trường trong một màn hình thay vì một con số | Bản đồ nhiệt |
| Cổ phiếu của mình mạnh hay yếu so với phần còn lại | IBD, sức mạnh giá |

**Góc mời dùng:** mở app xem thử bốn thứ trên. Không bán gói.

## Phép thử sợi chỉ
1. ③ giải đúng cái khó ① đặt ra? ① nói một con số không đủ mô tả thị trường. ③ là bốn cách nhìn thay thế. Đóng đúng vòng, khớp rất chặt.
2. ② cùng mạch ①? Hành động là đổi thước đo, đúng thứ ① đòi hỏi. Cùng mạch.
3. Che phần KFSP đi còn gì? Còn nguyên một bài dạy về cách chỉ số được tính. Đạt.

## Các cách triển khai kết nối (Angles)

| # | Angle | Cách nó land ý chính | Hợp định dạng |
|---|---|---|---|
| A1 | Tài khoản đỏ mà index xanh | Mở bằng trải nghiệm người đọc đã có, không cần thuyết phục | Hook Fanpage, reels |
| A2 | Ba phiên thật với số mã tăng giảm | Bằng chứng kiểm chứng được, chống lại cảm giác nói lý thuyết | Thân bài, carousel |
| A3 | Một mã kéo bằng cả thị trường | Con số gây bất ngờ, dễ nhớ, dễ kể lại | Reels, tin ngắn Zalo OA |
| A4 | Index đo tổng vốn hoá, không đo cổ phiếu của bạn | Câu chốt gọn nhất của toàn bộ ý chính | Đoạn đóng |

## Đã đẻ ra content
| Định dạng | Kênh | Trạng thái | Angle dùng | Ghi chú |
|---|---|---|---|---|
| Email | Email định kỳ | published | A1 + A2 + A3 | `email/templates/04_periodic/B_ANNOUNCEMENT_giao_dien_moi_v2_*` |
| Landing page | Web | published | như trên | Cấu trúc 1:1 với email |

## Ghi chú khi tái sử dụng
Số liệu ba phiên là của tháng 4/2026. Muốn dùng lại thì thay bằng ba phiên gần nhất, vì sức thuyết phục nằm ở chỗ người đọc kiểm tra được ngay hôm nay.

Giữ nguyên nguyên tắc: dùng số để **giải thích cấu trúc**, tuyệt đối không thêm câu dự đoán index sẽ đi đâu tiếp.

## Liên quan
Idea này chưa từng ra bài Fanpage. Đây là idea sạch và mạnh nhất trong nhóm nạp ngược, đáng ưu tiên.
