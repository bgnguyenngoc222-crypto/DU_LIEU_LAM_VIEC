# RULES.md, NGUỒN nội dung luật, không phải file luật đang chạy

> 🔴 **File này không tự hoạt động.** Nó là **nguồn** để AI sinh ra file luật đúng chuẩn của công cụ nhân viên đang dùng (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `.cursor/rules/`).
> Quy trình sinh file: xem [`../SETUP.md`](../SETUP.md) Bước 4.
> Sửa luật thì sửa ở đây rồi chạy lại SETUP để sinh lại, đừng sửa riêng file luật đã sinh.

Chép nguyên phần thân dưới đây (từ mục 1 đến mục 9) vào file luật, chỉ đổi tiêu đề cho khớp tên file. Không rút gọn, không viết lại theo ý mình.

⚠️ **Trần độ dài: 12.000 ký tự cho phần thân** (giới hạn mỗi file rule của Antigravity). Thêm luật mới mà chạm trần thì phải cắt bớt chỗ khác, đừng để tràn. Kiểm bằng `awk '/^## 1\. /,0' setup/RULES.md | wc -c`.

File luật là thứ AI đọc lại **mỗi phiên làm việc**. Vì vậy nó phải trả lời được ba câu ngay từ đầu phiên: đang làm việc trong repo nào, phải đọc gì trước khi làm, và cái gì tuyệt đối không được làm.

---

## 1. Repo này là gì, ai đang dùng

Bộ công cụ viết content organic cho KFSP (Kungfu Stocks Pro), app đầu tư cổ phiếu dành cho nhà đầu tư cá nhân mới tại Việt Nam. Người dùng repo là chuyên viên content.

Sáu kênh đều mang thương hiệu KFSP: Fanpage Facebook, TikTok, YouTube, Zalo OA, Email, Thông báo trong app. **Một giọng cho cả sáu**, không kênh ẩn danh, không persona riêng từng kênh. Kênh chỉ khác nhau ở độ dài và định dạng.

TikTok **không có tuyến nội dung riêng**, lấy từ reels của bài Fanpage. Bài nào có reels thì mới có TikTok. Không tự nghĩ ý tưởng chỉ để đăng TikTok.

🔴 **Repo cố ý không kèm tài liệu dữ kiện sản phẩm** (giá gói, tên tính năng, đối thủ). Tuyệt đối không suy đoán ra con số hay tên tính năng nghe hợp lý. Một dữ kiện bịa lọt vào bài là bài phải gỡ.

**Dữ kiện sản phẩm tra theo đúng thứ tự này:**

1. **Kho HDSD** `kfspteam/HDSD_KFSP`, tài liệu hướng dẫn sử dụng phát cho khách hàng, người dùng repo được cấp quyền đọc. Đây là **nguồn dữ kiện sản phẩm duy nhất được phép trích**: tên tính năng chính thức, tính năng đó làm gì, thao tác ở đâu trong app. Trích thì dẫn rõ tên file đã đọc.
2. **Mục DỮ KIỆN trong `JOURNAL/`**, thứ người dùng đã tự xác minh và ghi lại kèm nguồn.
3. **Không có ở cả hai thì nói thẳng là chưa biết**, đề nghị hỏi quản lý rồi ghi kết quả vào journal.

HDSD **không** trả lời giá gói, chính sách bán hàng hay so sánh đối thủ. Những thứ đó hỏi quản lý, không đoán.

## 2. Đầu mỗi phiên, đọc trước khi làm

Theo thứ tự, đường dẫn tính từ gốc thư mục bộ kit:

1. `JOURNAL/<tên người dùng>.md`, nhật ký ngày. Đây là nơi tích luỹ hiểu biết về sản phẩm, khách hàng, cái gì hiệu quả cái gì không. Đọc cả mục DỮ KIỆN ở cuối file.
2. `JOURNAL/<tên người dùng>_TUAN.md`, tổng kết tuần. Xem tuần trước đã chốt sửa một thứ gì, phiên này phải bám thứ đó.
3. `skills/kfsp-content/SKILL.md`, quy trình 5 bước.

Đọc xong báo lại ngắn gọn: đang biết gì, tuần này đang sửa thứ gì. Rồi mới bắt tay làm.

Chưa biết hôm nay viết gì thì đọc hết `idea-bank/INDEX*.md`, kho ý tưởng đã sàng sẵn trong repo, gợi ý vài cái đáng làm kèm lý do.

## 3. Quy trình bắt buộc, không được rút gọn

```
Bước 0  Tra các file `idea-bank/INDEX*.md` xem nguồn này đã có idea-fit chưa. Có rồi thì đọc lại, chưa có thì làm Bước 1
Bước 1  Idea-fit: khai Vai trò và Kỳ vọng, chấm Fit Score, phân tích ①②③, chạy Phép thử sợi chỉ
Bước 2  Chọn Archetype A (dạy kỹ thuật) hay B (tư duy)
Bước 3  Chọn khung công thức viết
Bước 4  Áp giọng theo kênh
Bước 5  Chạy Bảng tự đánh giá 4 mốc, rớt mốc chặn thì không đăng
```

Luôn trả phần phân tích TRƯỚC, content SAU. Người dùng bảo "viết luôn đi" thì vẫn phải qua Bước 1, vì một bài hay nhưng lệch khỏi sản phẩm là bỏ đi cả bài.

Ở Bước 1 phải hỏi người dùng chỉ số và ngưỡng kỳ vọng của bài, và không tự đặt thay họ. Ngưỡng là thứ họ dùng để tự chấm sau khi đăng.

Lưu idea-fit thì đặt mã `IF-YYYY-<tên người dùng>-###` và ghi dòng vào `idea-bank/INDEX_<tên người dùng>.md`, số đếm trong dãy của riêng họ. **Không ghi vào `idea-bank/INDEX.md`**, đó là trang chỉ mục chung. Mã và mục lục mang tên người là để nhiều người cùng làm không trùng mã và không xung đột lúc push.

## 4. Luật cứng, không vi phạm dù bài hay tới đâu

1. Không khoe tiền, không % lợi nhuận như lời hứa, không làm giàu nhanh.
2. Không phím hàng. Mã cổ phiếu chỉ để minh hoạ tiêu chí, không phải khuyến nghị mua bán.
3. Không gọi điểm thị trường. Không viết "đây là đáy", "lúc này rủi ro thấp nhất", "thời điểm giải ngân", "cơ hội đang xuất hiện". KFSP đưa tiêu chí để người đọc tự đánh giá.
4. Bài tài chính phải có một câu về rủi ro ở cuối.
5. Dạy một điều giá trị trước, mời dùng app sau.
6. Xưng "bạn" và KFSP. Không "nhà đầu tư" ngôi ba, không "anh em", không "thầy", không "đệ tử".
7. Không dùng từ hạ thấp người đọc. Không "dốt", "kém", "gà", "non". Đứng cùng phía người đọc.
8. Không icon, không emoji, không dấu gạch ngang dài, không cụm sáo AI kiểu "không chỉ mà còn", "hãy cùng khám phá". Bài phải đọc như người viết.
9. Nhịp câu tự nhiên. Kiêng gạch ngang dài không có nghĩa là chặt câu vụn vài ba chữ rồi chấm liên tục.
10. Mỗi bài có câu "Đưa chứng khoán về tầm tay bạn" ở đoạn đóng, một lần, chỗ chốt.
11. Không tự đăng, không tự gửi ra ngoài. Xuất bản là việc của người dùng repo.

Người dùng yêu cầu một thứ vi phạm luật cứng thì nói rõ vi phạm điều nào và đề xuất cách làm khác, đừng lặng lẽ làm theo.

## 5. Bảng tự đánh giá, và bước gửi duyệt của giai đoạn đầu

Trước khi coi một bài là xong, chạy 4 mốc trong `skills/kfsp-content/reference/idea-fit.md` (cuối file). Báo rõ từng mốc đạt hay rớt, rớt thì nói rõ vì sao và quay lại bước nào, đừng vá tạm câu chữ.

**Giai đoạn đầu, bài phải qua quản lý duyệt rồi mới đăng.** Chấm xong 4 mốc thì nhắc người dùng gửi quản lý **cả bài lẫn bảng đã chấm**, và soạn sẵn tin nhắn gửi cho họ. Quản lý duyệt bài đã chấm, không chấm hộ. Người viết vẫn là người chịu trách nhiệm bài mình, bước duyệt không chuyển trách nhiệm đó đi đâu cả.

Bỏ bước này khi ba bài liên tiếp được duyệt mà không phải sửa gì, sau đó người dùng đăng thẳng. Không rõ đang ở giai đoạn nào thì hỏi.

Hai phép thử nhanh khi phân vân:

1. Che hết đoạn nói về KFSP đi, bài còn dạy được gì không. Không còn gì tức là quảng cáo mặc áo kiến thức.
2. Đọc ý chính rồi đọc phần móc tính năng, chúng có nói cùng một chuyện không. Phải dừng lại nghĩ mới thấy khớp tức là liên kết gượng.

## 6. Chủ động nhắc ghi journal

Journal là bộ nhớ duy nhất sống sót qua các phiên, thứ không ghi lại coi như chưa từng xảy ra. Chủ động đề xuất ghi ở bốn thời điểm, không chờ người dùng nhớ ra:

1. **Xong một bài.** Nhắc ghi entry ngày theo `JOURNAL/_MAU.md`, gồm cả chỗ AI làm sai và cách người dùng sửa. Journal chỉ toàn thành công thì không dùng lại được.
2. **Người dùng vừa nói ra một dữ kiện sản phẩm đã xác minh.** Nhắc thêm vào mục DỮ KIỆN cuối file journal kèm nguồn và ngày. Đây chính là thứ thay cho tài liệu sản phẩm mà repo cố ý không kèm.
3. **Người dùng báo số thật của bài đã đăng.** Ghi kèm ngưỡng đã khai lúc đầu, để lần sau đối chiếu được.
4. **Thứ sáu.** Nhắc viết entry tổng kết tuần vào `JOURNAL/<tên>_TUAN.md`, kết bằng một thứ duy nhất sẽ sửa trong tuần sau.

Không tự ý ghi thay. Soạn sẵn nội dung, hỏi người dùng duyệt, rồi mới ghi.

## 7. Nâng cấp skill

Repo này là bản đang xây, không phải bản hoàn chỉnh. Người dùng nó là người xây tiếp.

Hai dấu hiệu skill còn thiếu, gặp là phải nói ra:

1. Người dùng phải giải thích cùng một điều cho AI đến lần thứ hai.
2. Một bài rớt vì lý do mà Bảng tự đánh giá không cảnh báo trước.

Cách sửa: bổ sung thẳng vào file skill, kèm một dòng changelog ở cuối file ghi ngày và lý do có dẫn việc thật. Ví dụ đạt: *"2026-08-05: thêm luật không dùng số liệu chưa kiểm chứng, vì bài 03/08 dẫn một con số không nguồn và phải gỡ."* Ghi *"cập nhật skill"* là không đạt.

Tạo skill mới hoặc sửa cấu trúc một skill thì **dùng skill `skill-creator`** đã cài sẵn, để file sinh ra đúng chuẩn (YAML frontmatter có `name` và `description`, mô tả trigger rõ để AI tự gọi được, phần lõi tách sang `reference/`). Đừng tự bịa cấu trúc.

Sửa xong thì tạo nhánh, commit rõ ràng, mở pull request. Không commit thẳng vào `main`.

## 8. Kiểm soát độ dài phiên

Phiên càng dài càng dễ trả lời theo trí nhớ mờ thay vì đọc lại file. Chủ động đề xuất mở phiên mới, đừng để người dùng tự đoán. Ba lúc nên đổi: xong trọn một bài · chuyển sang việc khác hẳn (đang viết bài quay sang sửa skill) · bắt đầu phải hỏi lại thứ đã nói ở đầu phiên.

Trước khi người dùng đóng phiên, **soạn sẵn prompt chuyển phiên** cho họ dán sang phiên mới, theo mẫu:

```
Tiếp phiên trước. Đọc journal của tôi trong JOURNAL/ rồi nắm lại:
- Đang làm: [việc đang dở]
- Đã chốt: [những thứ đã quyết, gạch đầu dòng]
- Còn dở: [bước tiếp theo cần làm]
- Lưu ý: [cái AI đã làm sai ở phiên trước, đừng lặp lại]
```

Điền sẵn nội dung vào bốn dòng đó, đừng đưa mẫu rỗng. Nhắc người dùng ghi journal trước khi đóng phiên, vì đó là thứ duy nhất phiên sau đọc được.

## 9. Sáu kênh bàn giao cộng dần, và cái gì ngoài phạm vi

Cả sáu kênh đều thuộc phạm vi, nhưng **không giao cùng lúc**: kênh gỡ được bài đi trước kênh không gỡ được. Fanpage xoá bài được, email và thông báo trong app gửi ra là hết đường lùi.

Tuần 1 Fanpage bài chữ · tuần 2 rút reels từ bài đã đăng · tuần 3 TikTok lấy từ chính reels đó · tuần 4 Zalo OA và Thông báo app · tháng 2 email định kỳ · YouTube chưa mở.

Nền **5 bài chữ Fanpage mỗi tuần** cố định qua mọi mốc. Kênh mở thêm đều cộng lên trên nền đó và rút từ bài đã có, không nuôi tuyến ý tưởng riêng.

**Email là hai thứ, đừng gộp.** Email định kỳ là một định dạng đầu ra của bài trong tuần, rút xuống giống cách rút reels, thuộc kế hoạch tuần từ tháng 2. Email vòng đời theo trạng thái người dùng là tài sản dựng một lần, giao thành đợt riêng, không tính vào hạn mức tuần và không tự ý bắt đầu.

🔴 **Reference giọng hiện chỉ có cho Fanpage** (`reference/style-fanpage.md`). Zalo OA, Thông báo app và Email chưa có, sẽ viết khi tới mốc bàn giao dựa trên bài Fanpage thật. Trước mốc đó, gặp yêu cầu viết cho ba kênh này thì **nói rõ chưa có reference và dừng lại hỏi quản lý**, không tự suy ra độ dài hay định dạng của kênh.

**Ngoài phạm vi, gặp thì nói rõ rồi dừng:** ads trả phí, landing page, dựng video và render, dựng hình trên Figma (chưa cấp quyền), và khâu gửi của mọi kênh (broadcast email, đẩy thông báo app, tài khoản Zalo OA).
