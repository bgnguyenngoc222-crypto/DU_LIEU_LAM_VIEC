# Nối Google vào Claude Code bằng Gmail cá nhân — đọc trang này trước

Bộ tài liệu này hướng dẫn bạn nối tài khoản Gmail cá nhân của mình vào Claude Code,
để Claude có thể thay bạn làm việc trên Drive, Trang tính, Tài liệu, Trình chiếu,
Thư, Lịch và Việc cần làm.

Dành cho máy **Windows**.

---

## Bạn sẽ được gì sau khi làm xong

Claude Code trên máy bạn nói chuyện thẳng được với Google của bạn. Ví dụ bạn gõ:

- "tìm trong Drive tệp lịch nội dung tháng 8"
- "tạo Trang tính mới tên Báo cáo tuần 33, điền 3 cột này vào"
- "đọc thư chưa đọc hôm nay, tóm tắt lại"
- "thêm việc vào lịch: thứ Năm 9h họp nội dung"

Claude tự làm, không cần bạn mở trình duyệt.

---

## Ba tệp cần đọc, theo đúng thứ tự

| Thứ tự | Tệp | Làm gì | Mất bao lâu |
|---|---|---|---|
| 1 | `01_TAO_MA_UNG_DUNG.md` | Tạo mã ứng dụng Google của riêng bạn | ~15 phút, chỉ làm một lần |
| 2 | `02_CAI_DAT_TREN_MAY.md` | Cài lên máy và đăng nhập | ~10 phút |
| 3 | `03_KIEM_TRA_VA_LOI_HAY_GAP.md` | Kiểm tra chạy được, và cách chữa khi hỏng | đọc khi cần |

Tệp cuối `04_LUAT_SU_DUNG.md` là mấy luật của KFSP về chuyện dùng tài khoản cá nhân
cho việc công ty. **Bắt buộc đọc**, chỉ dài một trang.

---

## Hai điều cần biết trước khi bắt đầu

**Một.** Bạn dùng Gmail cá nhân của chính bạn, và bạn tự tạo mã ứng dụng của mình.
KFSP không giữ mật khẩu, không đọc thư của bạn. Ngày bạn nghỉ việc, bạn tự gỡ,
không dính dáng gì tới công ty.

**Hai.** Vì là mã ứng dụng tự tạo, Google sẽ hiện một màn hình cảnh báo màu vàng
kiểu "ứng dụng này chưa được xác minh" khi bạn đăng nhập lần đầu. Đó là bình thường —
ứng dụng đó chính là cái bạn vừa tạo ra vài phút trước. Cách đi qua màn hình đó
nằm ở tệp số 2.

---

## Cần sẵn trên máy

- Windows 10 hoặc 11
- Claude Code đã cài và đăng nhập được
- Một tài khoản Gmail cá nhân bạn đang dùng bình thường

Nếu chưa có Node.js thì tệp số 2 có hướng dẫn cài.

---

## Kẹt ở đâu thì hỏi ai

Đọc `03_KIEM_TRA_VA_LOI_HAY_GAP.md` trước. Trong đó có 7 lỗi hay gặp nhất kèm cách chữa.
Vẫn không xong thì nhắn trong nhóm kỹ thuật, **chụp màn hình chỗ báo lỗi** kèm theo.

⚠️ Đừng gửi tệp `credentials.json` hay `tokens.json` của bạn cho ai, kể cả người
trong công ty. Hai tệp đó là chìa khoá vào tài khoản của bạn. Xem tệp số 4.
