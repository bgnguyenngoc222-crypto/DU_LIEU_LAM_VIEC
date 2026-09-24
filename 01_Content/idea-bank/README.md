# Kho ý tưởng, cách dùng và cách thêm vào

> Kho nằm ngay trong repo này, thư mục [`idea-bank/`](idea-bank/). Không có Google Sheet, không có webhook. `git pull` là bạn có toàn bộ vốn ý tưởng đã sàng từ trước, `git push` là quản lý thấy phần bạn thêm vào.

## Vì sao có kho này

Một idea-fit là phần phân tích nặng nhất của cả quy trình: nguồn này nói gì, người đọc nhận được gì, móc vào KFSP ở đâu. Phân tích xong một lần thì dùng được cho bài Fanpage, reels, tin Zalo OA, email, thông báo trong app. Nghĩ lại từ đầu cho từng kênh là tự làm nặng việc của mình.

Kho còn để bạn không đào lại cùng một cái hố. Idea rớt cũng lưu, ghi rõ rớt ở mốc nào, để lần sau nhìn INDEX là biết nguồn nào đã khai thác và nguồn nào đã bị loại vì lý do gì.

## Vị trí trong quy trình

```
Nguồn thô (sách, quote, tin, con số, khái niệm)
  → skill kfsp-content chạy idea-fit
     → lưu thành idea-bank/IF-YYYY-###-slug.md + thêm dòng vào idea-bank/INDEX.md
        → đẻ ra bài Fanpage, reels, tin Zalo OA, email, thông báo app
           → cập nhật bảng "Đã đẻ ra content" trong chính file đó
```

## Cấu trúc

**Một idea-fit là một file**, đặt tên `IF-YYYY-<tên bạn>-###-slug.md`, tất cả không dấu. Ví dụ `IF-2026-thanh-001-oneil-7-nguyen-tac.md`.

Tên bạn nằm trong mã là có chủ ý, không phải để ghi công. Nhiều người cùng làm mà đánh số chung thì hai người mở kho cùng buổi sáng đều thấy số cuối là 040 và đều đặt 041, ra hai file khác nội dung cùng một mã, không ai sai cả. **Có tên trong mã thì mỗi người đếm dãy của riêng mình, không bao giờ đụng ai.**

Dùng tên đầy đủ không dấu, đừng viết tắt hai chữ cái. Ở KFSP `TH` trúng cả Thanh, Thắng, Thành và Thịnh.

**Mỗi người một file mục lục riêng**, `INDEX_<tên bạn>.md`. Bạn chỉ ghi vào file của mình, không ai ghi chung một chỗ, nên không bao giờ gặp xung đột khi push. Đây mới là chỗ quan trọng: mã trùng thì còn nhìn ra, chứ một dòng mục lục bị ghi đè lúc gỡ xung đột thì mất luôn mà không ai biết.

[`idea-bank/INDEX.md`](idea-bank/INDEX.md) là trang chỉ mục chung, trỏ xuống các file mục lục cá nhân và giữ 40 idea làm từ trước khi có quy ước này. **Không ghi thêm dòng mới vào đó.**

Số thứ tự đếm trong dãy của riêng bạn: mở `INDEX_<tên bạn>.md`, lấy số lớn nhất cộng một. File đầu tiên của bạn là `001`.

File sống ở đó suốt đời, không di chuyển. Đẻ thêm content thì cập nhật bảng trong file và dòng trong mục lục của mình.

Muốn nhìn toàn bộ kho một lần, gõ:

> Đọc hết các file `INDEX_*.md` trong `idea-bank/`, gộp lại thành một bảng, sắp theo ngày mới nhất trước.

## Khung một file idea-fit

```yaml
---
id: IF-2026-thanh-001    # IF-năm-tên bạn-số trong dãy của bạn
source: "Bài '7 nguyên tắc săn siêu cổ phiếu' - William O'Neil"
source_type: quote_sach   # quote_sach | tin | khai_niem | con_so | story
date_added: 2026-08-05
fit_score: 4              # trên 4
status: idea              # idea | in_production | published | archived
features:                 # tính năng KFSP móc được, tên chính thức tra ở HDSD
  - Bộ lọc
  - IBD
angles:                   # các cách triển khai cùng một ý, xem mục dưới
  - "Warren Buffett, vòng tròn năng lực"
  - "Lý Tiểu Long, một cú đá mười nghìn lần"
derived:                  # content đã đẻ ra từ idea này
  - format: fanpage       # fanpage | reels | zalo_oa | email | thong_bao_app
    status: draft
    angle: "Warren Buffett, vòng tròn năng lực"
    link: ""
---
```

Phần thân viết theo đúng output của skill:

1. **Vai trò và Kỳ vọng** (Bước 0a): bài này làm một việc chính gì, thuộc tuyến nào, đo bằng chỉ số nào, ngưỡng bao nhiêu, ngày nào quay lại nhìn số. Khai trước khi viết, không khai sau.
2. **Fit Score** trên 4 tiêu chí, kèm lý do từng điểm.
3. **① Ý chính**, một câu in đậm.
4. **② Người đọc nhận được**, bảng ba tầng cảm xúc, tư duy, hành động.
5. **③ Liên kết KFSP**, bảng móc từng luận điểm sang tính năng, cộng góc CTA.
6. **Các cách triển khai (Angles)**, bảng.
7. **Đã đẻ ra content**, bảng định dạng, trạng thái, angle đã dùng, link.

Idea rớt cũng lưu, để `status: archived` và ghi một dòng rõ rớt ở mốc nào.

**Tên tính năng ở trường `features` phải là tên chính thức**, tra trong kho HDSD. Không chắc thì để trống và hỏi quản lý, đừng đoán một cái tên nghe hợp lý.

## Angles, một ý nhiều ngả

Một ý cốt lõi, ví dụ "tập trung vào thế mạnh và kiên nhẫn", có thể land qua nhiều ngả khác nhau. Mỗi ngả là một angle: một quote, một trích sách, một câu chuyện mượn để nói cùng một ý.

Cùng ý đó có thể đi qua Warren Buffett và vòng tròn năng lực, hoặc Phil Town trong *Payback Time* với ba vòng tròn giỏi, quan tâm, được trả tiền, hoặc Mohnish Pabrai với Dhandho, hoặc Lý Tiểu Long với một cú đá mười nghìn lần.

Cách dùng: trước khi viết, liệt kê vài angle cho cùng một ý, chọn một angle chính, rồi ghi angle đã dùng vào bảng "Đã đẻ ra content". Nhờ vậy bạn biết angle nào đã khai thác và angle nào còn để dành. Một ý cốt lõi cộng vài angle là đủ nguyên liệu cho cả một chuỗi bài mà không cạn ý.

## Trạng thái

| Trạng thái | Nghĩa |
|---|---|
| `idea` | Đã phân tích fit, chưa đẻ content nào |
| `in_production` | Đang đẻ ít nhất một content, còn ở dạng nháp |
| `published` | Đã đăng ít nhất một content ra kênh |
| `archived` | Khai thác xong, hoặc đã loại vì không đạt |

## Cách thêm một idea vào kho

Chốt xong idea-fit thì lưu ngay trong ngày, đừng để mai. Ý tưởng nằm trong đầu không ai thấy, và bạn cũng quên.

> Lưu idea-fit này vào `idea-bank/`, đặt tên theo dãy của tôi, lấy số tiếp theo trong `INDEX_<tên tôi>.md`, thêm một dòng vào chính file đó. Xong thì commit và push.

Rồi tự mở `INDEX_<tên bạn>.md` ra nhìn, xem dòng mới đã có chưa. Đừng tin lời AI báo đã lưu.

Kéo bản mới nhất về trước khi bắt đầu buổi làm việc (`git pull`), để thấy idea đồng nghiệp vừa thêm và không làm trùng.

Idea-fit chỉ là phân tích nội bộ, không tự đăng và không tự gửi đi đâu. Content thành phẩm lưu ở chỗ của nó, kho này chỉ giữ gốc phân tích và link tới thành phẩm.

---
*Cập nhật 2026-07-29: kho gộp về repo. Google Sheet Idea Bank và webhook n8n `POST /idea-bank` dừng dùng, lý do là idea sống ở hai nơi thì phải nhớ hai chỗ và phải tin webhook chạy đúng.*
