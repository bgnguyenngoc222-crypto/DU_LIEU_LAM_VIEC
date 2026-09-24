# Bước 3 — Kiểm tra chạy đúng, và bảy lỗi hay gặp

## 3.1 Bốn câu để thử

Gõ lần lượt cho Claude. Mỗi câu chạm một cửa dịch vụ khác nhau, nên biết ngay
cái nào bật thiếu.

| Gõ cho Claude | Đúng thì ra |
|---|---|
| `Liệt kê 5 tệp mới nhất trong Drive của tôi` | Tên tệp thật của bạn |
| `Tạo Trang tính mới tên "Thử nối Claude"` | Đường dẫn tệp mới, mở ra thấy trên Drive |
| `Tôi có bao nhiêu thư chưa đọc?` | Một con số |
| `Hôm nay lịch tôi có gì?` | Lịch của bạn, hoặc báo trống |

Bốn câu ra đúng là nối xong.

---

## 3.2 Bảy lỗi hay gặp

### Lỗi 1 — `Error 403: access_denied`

Gmail của bạn chưa nằm trong danh sách **Test users**.

Chữa: vào https://console.cloud.google.com/auth/audience → mục **Test users** →
**+ Add users** → gõ Gmail của bạn → **Save**. Rồi đăng nhập lại (mục 2.6).

### Lỗi 2 — `Error 400: redirect_uri_mismatch`

Bạn đã chọn nhầm loại ứng dụng khi tạo mã ở mục 1.5.

Chữa: vào https://console.cloud.google.com/auth/clients, tạo lại một mã mới, lần này
chọn đúng **Desktop app**. Tải JSON mới về, đổi tên `credentials.json`, chép đè
vào `%APPDATA%\google-mcp\`, đăng nhập lại.

### Lỗi 3 — `Error 400: invalid_request` hoặc trình duyệt báo "malformed"

Trình duyệt của bạn đang đăng nhập nhiều tài khoản Google cùng lúc.

Chữa: thoát hết, chỉ đăng nhập lại đúng một Gmail cá nhân. Hoặc mở đường dẫn đăng nhập
trong cửa sổ ẩn danh. Rồi làm lại mục 2.6. Đây là lỗi phổ biến nhất.

### Lỗi 4 — `Google Drive API has not been used in project ... before or it is disabled`

Bạn bật thiếu một cửa dịch vụ ở mục 1.2. Trong dòng báo lỗi có ghi rõ tên cái nào thiếu.

Chữa: vào https://console.cloud.google.com/apis/library, tìm đúng tên đó, bấm **Enable**.
Chờ khoảng một phút cho Google ngấm, rồi thử lại. Không cần đăng nhập lại.

### Lỗi 5 — Gõ `/mcp` không thấy dòng `google`

Lệnh khai báo ở mục 2.5 chưa vào.

Chữa: chạy `claude mcp list` trong Command Prompt để xem có `google` không.
Không có thì chạy lại lệnh ở mục 2.5, chú ý đường dẫn phải nằm trong ngoặc kép và
phải là đường dẫn thật lấy từ `npm root -g`.

### Lỗi 6 — Thấy dòng `google` nhưng ghi `failed`

Máy không tìm thấy tệp của bộ nối theo đường dẫn bạn khai.

Chữa: kiểm tra tệp có thật không:

```
dir "C:\Users\TenBan\AppData\Roaming\npm\node_modules\@pegasusheavy\google-mcp\dist\index.js"
```

Báo `File Not Found` thì cài lại `npm install -g @pegasusheavy/google-mcp`, chạy lại
`npm root -g` lấy đường dẫn đúng, rồi gỡ và khai lại:

```
claude mcp remove google
```

Sau đó chạy lại lệnh ở mục 2.5.

### Lỗi 7 — Đang chạy tốt, đúng một tuần sau báo hết hạn đăng nhập

Ứng dụng của bạn còn ở chế độ **Testing**. Chế độ đó Google cắt đăng nhập sau 7 ngày.

Chữa dứt điểm: vào https://console.cloud.google.com/auth/audience, mục
**Publishing status** bấm **Publish app** → **Confirm**, cho tới khi nó ghi `In production`.
Đây chính là mục 1.4 mà bạn đã bỏ qua.

Rồi nói với Claude `Chạy google_auth để tôi đăng nhập lại Google`, làm y như mục 2.6.
Lần này đăng nhập một lần là dùng mãi.

---

## 3.3 Cần gỡ hẳn

Gỡ khai báo khỏi Claude Code:

```
claude mcp remove google
```

Xoá chìa khoá trên máy:

```
rmdir /s /q "%APPDATA%\google-mcp"
```

Cắt luôn quyền phía Google: vào https://myaccount.google.com/permissions, tìm mục
`Claude Code`, bấm **Remove access**.

Làm đủ ba việc trên là máy không còn đụng được vào tài khoản của bạn nữa.
