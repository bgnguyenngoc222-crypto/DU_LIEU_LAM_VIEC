# Bước 2 — Cài lên máy Windows và đăng nhập

Khoảng 10 phút.

Từ đây có mấy chỗ phải gõ lệnh. Mở **Command Prompt**: bấm phím Windows, gõ `cmd`,
bấm Enter. Cửa sổ đen hiện ra là đúng.

Trong tài liệu này, khối chữ nền xám là **lệnh cần gõ**. Gõ xong bấm Enter.

---

## 2.1 Cài Node.js

Kiểm tra xem máy có sẵn chưa:

```
node --version
```

Hiện ra số kiểu `v20.11.0` hay lớn hơn là có rồi, bỏ qua mục này.

Báo `'node' is not recognized...` thì tải về cài:

1. Vào https://nodejs.org/
2. Tải bản **LTS** cho Windows
3. Cài, bấm Next hết, giữ nguyên mọi lựa chọn mặc định
4. **Đóng cửa sổ Command Prompt rồi mở lại**, kiểm tra lại lệnh trên

---

## 2.2 Cài bộ nối Google

```
npm install -g @pegasusheavy/google-mcp
```

Chạy khoảng một phút. Có vài dòng chữ vàng `warn` là bình thường, kệ nó. Chỉ khi
thấy chữ `ERR!` màu đỏ mới là hỏng.

---

## 2.3 Tìm đường dẫn của bộ nối

```
npm root -g
```

Máy in ra một đường dẫn, thường là:

```
C:\Users\TenBan\AppData\Roaming\npm\node_modules
```

**Chép lại dòng đó**, lát nữa dùng. Đường dẫn đầy đủ của bộ nối là dòng đó nối thêm
`\@pegasusheavy\google-mcp\dist\index.js` vào cuối. Ví dụ:

```
C:\Users\TenBan\AppData\Roaming\npm\node_modules\@pegasusheavy\google-mcp\dist\index.js
```

---

## 2.4 Đặt tệp chìa khoá vào đúng chỗ

Tạo thư mục chứa chìa khoá:

```
mkdir "%APPDATA%\google-mcp"
```

Báo "already exists" thì kệ, có sẵn rồi.

Chép tệp `credentials.json` bạn đã đổi tên ở bước 1 vào đó:

```
copy "%USERPROFILE%\Downloads\credentials.json" "%APPDATA%\google-mcp\"
```

Kiểm tra đã vào chưa:

```
dir "%APPDATA%\google-mcp"
```

Phải thấy dòng có chữ `credentials.json`. Không thấy thì mở File Explorer, dán
`%APPDATA%\google-mcp` vào ô địa chỉ, rồi kéo thả tệp vào bằng tay.

---

## 2.5 Khai báo với Claude Code

Thay đoạn `C:\Users\TenBan\...` bên dưới bằng đúng đường dẫn của máy bạn ở mục 2.3:

```
claude mcp add google --scope user -- node "C:\Users\TenBan\AppData\Roaming\npm\node_modules\@pegasusheavy\google-mcp\dist\index.js"
```

Máy báo `Added stdio MCP server google` là được.

> `--scope user` nghĩa là nối cho toàn máy, mở thư mục dự án nào cũng dùng được.

---

## 2.6 Đăng nhập Google

1. Mở Claude Code (gõ `claude` trong Command Prompt, hoặc mở từ VS Code)
2. Gõ `/mcp` rồi Enter — phải thấy dòng `google` trong danh sách
3. Gõ câu này cho Claude:

```
Chạy google_auth để tôi đăng nhập Google
```

Claude đưa ra một đường dẫn dài bắt đầu bằng `https://accounts.google.com/...`.
Chép nó, dán vào trình duyệt.

Rồi làm theo trình duyệt:

| Màn hình | Bạn bấm gì |
|---|---|
| Chọn tài khoản | Chọn **đúng Gmail cá nhân** bạn đã thêm vào Test users |
| Màn vàng "Google hasn't verified this app" | Bấm chữ nhỏ **Advanced** ở góc dưới trái → bấm **Go to Claude Code (unsafe)** |
| Danh sách quyền | Kéo xuống cuối, bấm **Continue** / **Allow** |

Trình duyệt hiện chữ báo đã xong. Quay lại Claude Code, Claude báo đăng nhập thành công.

> **Về màn hình màu vàng:** chữ "unsafe" nghe đáng sợ nhưng nó chỉ có nghĩa là ứng
> dụng chưa nộp hồ sơ cho Google duyệt. Ứng dụng đó là cái bạn tự tạo ở bước 1,
> chạy ngay trên máy bạn, không gửi gì đi đâu.

### Nếu trình duyệt báo lỗi không mở được trang

Trong đường dẫn trên thanh địa chỉ có đoạn `code=` theo sau là một chuỗi dài.
Chép chuỗi đó (từ sau dấu `=` tới trước dấu `&` nếu có), rồi nói với Claude:

```
Dùng google_auth_code với mã này: <dán chuỗi vào đây>
```

---

## 2.7 Thử một việc thật

Gõ cho Claude:

```
Liệt kê 5 tệp mới nhất trong Drive của tôi
```

Ra danh sách tệp của bạn là xong. Ra lỗi thì mở `03_KIEM_TRA_VA_LOI_HAY_GAP.md`.

---

## Xong bước 2 khi nào

- [ ] `/mcp` thấy dòng `google`
- [ ] Đã đăng nhập qua trình duyệt
- [ ] Hỏi Claude về Drive thì ra tệp thật của bạn

Sau đó đọc `04_LUAT_SU_DUNG.md` — một trang, bắt buộc.
