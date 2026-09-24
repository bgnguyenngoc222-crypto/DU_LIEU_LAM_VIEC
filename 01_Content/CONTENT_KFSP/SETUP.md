# SETUP.md, file dành cho AI đọc, không phải cho người

> Nhân viên chỉ cần gõ: **"Đọc SETUP.md và cài đặt bộ kit này cho tôi."**
> AI làm đúng 6 bước dưới đây, theo thứ tự, không bỏ bước.

**Kho bộ kit:** `https://github.com/kfspteam/kfsp-content-kit` (private)
**Phiên bản file bootstrap này:** 2026-07-28

Nhân viên chỉ nhận 2 file: `HUONG_DAN.md` và `SETUP.md` này. **Toàn bộ skill, reference và tài liệu nằm trên kho GitHub**, bạn phải tải về. Không có sẵn trên máy, đừng tự bịa nội dung skill.

🔴 **Bộ kit cố ý KHÔNG kèm tài liệu dữ kiện sản phẩm** (giá gói, tên tính năng, đối thủ). Người viết tự dựng dần qua `JOURNAL/`. Vì vậy khi được hỏi một dữ kiện sản phẩm mà không có nguồn trong kho hoặc trong journal, **nói thẳng là chưa biết và đề nghị người dùng xác minh rồi ghi vào journal**. Tuyệt đối không suy đoán ra con số hay tên tính năng nghe hợp lý.

---

## Bước 1. Kiểm điều kiện cần, chưa đủ thì dừng

Kiểm ba thứ, thiếu cái nào thì hướng dẫn người dùng khắc phục rồi mới đi tiếp:

| # | Kiểm | Lệnh | Thiếu thì |
|---|---|---|---|
| 1 | Có `git` không | `git --version` | Hướng dẫn cài git |
| 2 | Có `gh` và đã đăng nhập chưa | `gh auth status` | Bảo người dùng chạy `gh auth login`, chọn GitHub.com, đăng nhập bằng trình duyệt |
| 3 | Có quyền vào kho bộ kit không | `gh repo view kfspteam/kfsp-content-kit` | Báo người dùng nguyên văn: **"Bạn chưa có quyền vào kho. Nhắn quản lý kèm tên tài khoản GitHub của bạn để được cấp, xong quay lại gõ lại câu lệnh cài đặt."** Dừng tại đây, không làm tiếp, không tự dựng nội dung thay thế |
| 4 | Có quyền đọc kho HDSD không | `gh repo view kfspteam/HDSD_KFSP` | **Không dừng cài đặt.** Ghi nhận là chưa có, làm tiếp, và cuối buổi nhắc người dùng xin quyền. HDSD là nguồn dữ kiện sản phẩm duy nhất được phép trích, thiếu nó thì mọi câu hỏi về tên tính năng đều phải trả lời là chưa biết |

Không có `gh` mà có `git` thì vẫn clone được bằng HTTPS, nhưng người dùng phải tự nhập tài khoản. Ưu tiên `gh` vì đỡ rắc rối hơn.

**Nếu người dùng dùng bản web (Claude.ai, ChatGPT):** không clone được. Hướng dẫn họ vào kho trên GitHub, bấm Code rồi Download ZIP, giải nén, upload các file `.md` vào Project. Bỏ qua Bước 2 và 4, làm tiếp từ Bước 3.

---

## Bước 2. Tải bộ kit về

Hỏi người dùng muốn để bộ kit ở đâu, gợi ý mặc định là `~/kfsp-content-kit`. Rồi:

```bash
gh repo clone kfspteam/kfsp-content-kit ~/kfsp-content-kit
cd ~/kfsp-content-kit
```

Nếu thư mục đã tồn tại thì **không clone đè**, mà cập nhật:

```bash
cd ~/kfsp-content-kit && git pull
```

Tải xong, liệt kê file để xác nhận có đủ: `IDEA_BANK_huong-dan.md`, `setup/RULES.md`, thư mục `JOURNAL/`, thư mục `idea-bank/` (phải có `INDEX.md` và hàng chục file `IF-2026-*.md`, rỗng là tải hỏng), và thư mục `skills/` chứa đủ ba: `kfsp-content`, `cong-thuc-viet-content-by-noti`, `giat-tit-content`.

---

## Bước 3. HỎI người dùng đang dùng công cụ nào

Hỏi đúng một câu và **chờ trả lời**, không suy đoán:

> "Bạn đang dùng công cụ nào để làm việc với AI: Claude Code, Antigravity, Cursor, Gemini CLI, Codex, hay bản web (Claude.ai / ChatGPT)?"

Chưa có câu trả lời thì không tạo file nào cả. Cài sai chỗ thì skill nằm im mà người dùng không biết, đó là lỗi tệ nhất của bước này.

---

## Bước 4. Tự xác nhận cơ chế của công cụ đó, rồi mới sinh file luật

Bộ kit **cố ý không kèm sẵn** `CLAUDE.md`, `AGENTS.md` hay `GEMINI.md`, vì mỗi công cụ đọc một tên khác nhau. File luật được sinh lúc cài, đúng một cái.

Không chép mù theo bảng bên dưới. Làm ba việc theo thứ tự:

1. **Đối chiếu với chính mình.** Bạn là model đang chạy trong công cụ đó, nên bạn biết mình được nạp ngữ cảnh từ file nào. Xác nhận lại bằng thư mục thật trên máy: có `~/.claude/` không, có `.agents/` không, có `~/.gemini/` không.
2. **Không chắc thì tra tài liệu chính chủ**, đừng đoán. Quy ước file luật của các hãng thay đổi theo phiên bản.
3. **Vẫn không chắc thì hỏi người dùng**, đừng tạo bừa một file rồi báo là xong.

Bảng dưới là **điểm khởi đầu tính tới 28/07/2026**, phải xác nhận lại chứ không dùng thẳng:

| Công cụ | File luật cần sinh | Nơi đặt skill | Cần xác nhận thêm |
|---|---|---|---|
| **Claude Code** | `CLAUDE.md` ở gốc thư mục bộ kit | `~/.claude/skills/` | Claude Code đọc `CLAUDE.md`, **không** tự đọc `AGENTS.md` |
| **Antigravity** | `AGENTS.md` ở gốc workspace. Cần ưu tiên cao hơn thì `GEMINI.md` | `.agents/skills/` (workspace) hoặc `~/.gemini/config/skills/` (toàn máy) | `GEMINI.md` thắng `AGENTS.md` khi xung đột. Rule workspace còn đặt được ở `.agents/rules/`. Mỗi file rule giới hạn khoảng 12.000 ký tự |
| **Cursor** | Rule file trong `.cursor/rules/` | Dán `SKILL.md` vào project rules | Quy ước rule file của Cursor đã đổi vài lần, kiểm bản đang dùng |
| **Gemini CLI** | `GEMINI.md` | Theo tài liệu bản đang cài | |
| **Codex** | `AGENTS.md` | Theo tài liệu bản đang cài | |
| **Bản web** | Không có file. Dùng custom instruction của Project | Upload file `.md` vào Project | |

**Cách sinh:** đọc `setup/RULES.md` trong kho vừa tải, chép nguyên phần thân của nó (từ mục 1 đến mục 9) vào file luật vừa xác định, chỉ đổi tiêu đề cho khớp tên file. Không viết lại theo ý mình, không rút gọn, không bỏ mục nào.

Đây là file quan trọng nhất của cả bộ kit, vì nó là thứ AI đọc lại **mỗi phiên làm việc**, và cũng là thứ nhân viên đọc để biết mình bị ràng buộc gì. Sinh xong phải có đủ 9 mục:

1. Repo này là gì, ai đang dùng (gồm luật 6 kênh một giọng, TikTok lấy từ reels Fanpage, và luật cấm suy đoán dữ kiện sản phẩm)
2. Đầu mỗi phiên đọc gì trước khi làm
3. Quy trình bắt buộc 5 bước, không được rút gọn
4. Luật cứng 11 điều
5. Bảng tự đánh giá và 2 phép thử nhanh
6. Chủ động nhắc ghi journal, 4 thời điểm
7. Nâng cấp skill, gồm việc dùng `skill-creator` và mở pull request
8. Kiểm soát độ dài phiên, kèm mẫu prompt chuyển phiên
9. Không thuộc phạm vi repo

Thiếu mục nào thì sinh lại, đừng vá thêm vào cuối. Sinh xong đọc lại một lượt và báo người dùng file luật của họ nằm ở đâu, có bao nhiêu mục.

**File luật đã tồn tại với nội dung khác thì hỏi người dùng trước khi ghi đè.**

Thêm dòng này vào file luật vừa sinh, đặt ngay dưới tiêu đề:

```markdown
> Bộ kit gốc: https://github.com/kfspteam/kfsp-content-kit
> Nội dung luật lấy từ `setup/RULES.md`. Sửa luật thì sửa ở kho rồi mở pull request, đừng sửa riêng file này.
```

---

## Bước 5. Cài skill rồi tự kiểm

Copy cả thư mục `skills/`, đừng copy riêng từng `SKILL.md`, vì phần lõi nằm trong `reference/`.

```bash
# Claude Code
mkdir -p ~/.claude/skills && cp -R skills/* ~/.claude/skills/

# Antigravity, cho riêng workspace này
mkdir -p .agents/skills && cp -R skills/* .agents/skills/
```

### Cài thêm `skill-creator`

Bộ kit yêu cầu nhân viên tự nâng cấp skill, nên họ cần công cụ tạo skill đúng chuẩn thay vì tự bịa cấu trúc. Cài `skill-creator` của Anthropic vào cùng thư mục skill.

Kiểm trước xem công cụ đang dùng đã có sẵn `skill-creator` chưa (Claude Code có thể đã kèm). Có rồi thì bỏ qua, báo người dùng là đã có. Chưa có thì tải từ kho công khai:

```bash
git clone --depth 1 https://github.com/anthropics/skills /tmp/anthropic-skills
```

Kho này có thể đổi cấu trúc thư mục theo thời gian, nên **đừng đoán đường dẫn**. Tìm đúng thư mục chứa `SKILL.md` của skill-creator rồi copy cả thư mục đó sang thư mục skill đích:

```bash
find /tmp/anthropic-skills -name SKILL.md -path "*skill-creator*"
```

Không tìm thấy hoặc kho không truy cập được thì **báo người dùng là chưa cài được và nói rõ lý do**, đừng tự viết một file `skill-creator/SKILL.md` giả. Bộ kit vẫn chạy bình thường, chỉ là lúc tạo skill mới sẽ không có khuôn chuẩn.

Chạy năm kiểm tra, báo từng cái đạt hay hỏng. **Không được báo "đã cài xong" khi chưa chạy đủ năm.**

| # | Kiểm tra | Đạt khi |
|---|---|---|
| 1 | Kho đã tải đủ | Có `IDEA_BANK_huong-dan.md`, `setup/RULES.md`, `JOURNAL/`, `idea-bank/` không rỗng, và 3 thư mục trong `skills/` |
| 2 | File luật đã sinh đúng chỗ | Đúng tên, đúng vị trí theo công cụ đã xác nhận ở Bước 4, và có đủ 9 mục |
| 3 | Skill nằm đúng thư mục | Thư mục đích có `kfsp-content/SKILL.md` và `kfsp-content/reference/idea-fit.md` |
| 4 | `skill-creator` đã có | Thư mục đích có `skill-creator/SKILL.md`, hoặc đã báo rõ vì sao chưa cài được |
| 5 | Luật thật sự được nạp | **Bảo người dùng mở phiên mới**, rồi hỏi AI ba điều cấm trong content KFSP. Trả lời đúng mới tính là đạt |

Xong năm kiểm tra thì hỏi tên người dùng, **viết thường không dấu, một từ**, ví dụ `thanh`. Đừng dùng viết tắt hai chữ cái, vì ở KFSP `TH` trúng cả Thanh, Thắng, Thành và Thịnh. Rồi tạo **ba file** cho họ:

1. `JOURNAL/<tên>.md`, chép từ `JOURNAL/_MAU.md`, là nhật ký ngày.
2. `JOURNAL/<tên>_TUAN.md`, rỗng có tiêu đề, là tổng kết tuần ghi vào mỗi thứ sáu.
3. `idea-bank/INDEX_<tên>.md`, chép từ `idea-bank/_MAU_INDEX.md`, là mục lục ý tưởng của riêng họ. Xoá dòng mẫu trong bảng.

Nói rõ vì sao mục lục tách riêng: **mã idea và mục lục đều mang tên người là để nhiều người cùng làm mà không đụng nhau.** Đánh số chung thì hai người mở kho cùng buổi sáng đều đặt trùng một mã, và một file mục lục chung thì lần nào push cũng xung đột, lúc gỡ dễ nuốt mất dòng của đồng nghiệp. Dặn họ tuyệt đối không thêm dòng vào `idea-bank/INDEX.md`, đó là trang chỉ mục chung và kho 40 idea cũ.

Ghi entry đầu tiên vào file nhật ký ngày là hôm nay nhận và cài xong bộ kit. Hướng dẫn họ commit và push, đó là dấu mốc bắt đầu.

Nói rõ hạn mức đang áp: **nền cố định 5 bài chữ Fanpage mỗi tuần, mỗi ngày một bài, tuần đầu chưa làm video.** Số reels từ tuần thứ hai do quản lý giao vào thứ hai, không tự đặt. Bảo họ ghi số được giao vào journal đầu tuần để cuối tuần đối chiếu.

Kiểm tra 5 quan trọng nhất, vì tạo được file không đồng nghĩa với việc file đó được nạp. Chỉ phiên mới mới chứng minh được.

---

## Bước 6. Báo cho nhân viên biết họ đang có gì

Cài xong thì in ra đúng nội dung dưới đây.

### Bộ kit vừa tải về có gì

| File | Là gì | Khi nào cần |
|---|---|---|
| `HUONG_DAN.md` | Hướng dẫn dùng, có sẵn câu lệnh mẫu | Đọc đầu tiên |
| `JOURNAL/` | **Nơi bạn tự dựng hiểu biết của mình** về sản phẩm, khách hàng, cái gì hiệu quả | Ghi mỗi ngày làm việc |
| `skills/kfsp-content/SKILL.md` | Quy trình 5 bước | Đọc một lần để hiểu vì sao có thứ tự đó |
| `skills/kfsp-content/reference/idea-fit.md` | **Quan trọng nhất.** Cách sàng ý tưởng và Bảng tự đánh giá | Đọc kỹ, đọc lại nhiều lần |
| `skills/kfsp-content/reference/style-fanpage.md` | Giọng viết, 2 kiểu bài thắng, 8 công thức hook | Đọc kỹ trước khi viết bài đầu |
| `skills/kfsp-content/reference/mau-hinh-*.md` | Template bài mẫu hình giá. Phần chuẩn vẽ hình cần quyền Figma, **chưa cấp ở giai đoạn đầu**, nên chỉ lấy phần chữ | Chỉ khi làm bài về mẫu hình |
| `skills/cong-thuc-viet-content-by-noti/` | 14 công thức viết | Tra khi cần chọn khung bài |
| `skills/giat-tit-content/` | 72 cách đặt tít theo 8 nhóm tâm lý | Tra khi cần tít hoặc hook mở bài |
| `skills/skill-creator/` | Khuôn tạo skill đúng chuẩn của Anthropic | Khi bạn muốn thêm skill mới hoặc sửa cấu trúc skill cũ |
| `idea-bank/` | **Kho ý tưởng đã sàng sẵn**, có vốn từ trước bạn. `INDEX.md` là 40 idea cũ, `INDEX_<tên bạn>.md` là mục lục của riêng bạn | Khi chưa biết hôm nay viết gì |
| `IDEA_BANK_huong-dan.md` | Cách đọc kho trên và cách thêm idea mới vào | Khi chốt xong một idea-fit |
| File luật vừa sinh (`CLAUDE.md` hoặc `AGENTS.md` hoặc `GEMINI.md`) | **9 mục luật AI đọc lại mỗi phiên.** Cũng là thứ cho bạn biết mình bị ràng buộc gì | Đọc một lần cho hết, sau đó chỉ mở khi muốn đổi luật |
| `setup/RULES.md` | Nguồn sinh ra file luật trên. Sửa luật thì sửa ở đây rồi mở pull request | Chỉ mở khi muốn sửa luật |

Nói rõ với người dùng: **TikTok không có tuyến nội dung riêng.** Nội dung TikTok lấy từ reels của bài Fanpage, bài nào có reels thì mới có bài TikTok. Không nghĩ ý tưởng riêng chỉ để đăng TikTok.

### Nên tự đọc theo thứ tự này

1. `HUONG_DAN.md`, đọc hết, khoảng 10 phút
2. File luật vừa sinh, đọc hết 9 mục, đây là thứ ràng buộc mọi việc bạn làm
3. `skills/kfsp-content/reference/idea-fit.md`, đọc kỹ, đây là xương sống
4. `skills/kfsp-content/reference/style-fanpage.md`, đọc kỹ phần giọng và 8 công thức hook
5. `JOURNAL/_MAU.md`, xem mẫu ghi journal ngày và mẫu tổng kết tuần

Phần còn lại để khi nào gặp việc thì tra.

### Cập nhật và đóng góp

```bash
cd ~/kfsp-content-kit && git pull        # lấy bản mới nhất
git checkout -b <ten-nhanh>              # sửa gì thì tạo nhánh
gh pr create                             # xong thì mở pull request
```

Sau khi `git pull` mà thấy `skills/` có thay đổi thì **cài lại skill** (chạy lại lệnh copy ở Bước 5), vì bản đang nạp là bản đã copy đi chỗ khác.

### Việc tiếp theo

Mở `HUONG_DAN.md` Bước 2, làm đủ ba lớp kiểm chứng (nhìn thư mục, mở thư mục skill, mở phiên mới gõ 3 câu), rồi bắt đầu làm việc theo Bước 3.
