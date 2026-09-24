# Hướng dẫn kết nối n8n vào Antigravity

Tài liệu dành cho nhân viên KFSP. Làm xong, bạn có thể nhắn thẳng trong Antigravity kiểu *"liệt kê các luồng n8n đang bật"* và máy tự đọc n8n giúp bạn.

Làm một lần duy nhất, khoảng 15 phút. Không cần biết lập trình, chỉ cần làm đúng thứ tự.

---

## Bước 1 — Cài Node.js (nếu máy chưa có)

Antigravity cần Node.js để chạy phần nối với n8n.

1. Vào https://nodejs.org
2. Tải bản có chữ **LTS** (bản ổn định, không lấy bản Current).
3. Mở tệp vừa tải, bấm Next/Continue đến hết.

**Cách kiểm tra máy đã có chưa:**
- Máy Mac: mở ứng dụng **Terminal**.
- Máy Windows: mở **Command Prompt**.

Gõ đúng dòng này rồi bấm Enter:

```
node -v
```

Nếu màn hình hiện một dãy kiểu `v20.11.0` là đã có, bỏ qua bước cài. Nếu báo lỗi *command not found* thì cài theo hướng dẫn trên.

---

## Bước 2 — Lấy khoá riêng của bạn trong n8n

Mỗi người dùng khoá của chính mình. Không xin khoá của người khác, không gửi khoá của mình cho ai.

1. Mở trình duyệt vào **https://n8n.kfsp.vn** và đăng nhập bằng tài khoản của bạn.
2. Bấm vào tên/ảnh đại diện của bạn ở góc dưới bên trái → chọn **Settings**.
3. Trong danh sách bên trái, chọn **n8n API**.
4. Bấm nút **Create an API key**.
5. Đặt tên cho dễ nhớ, ví dụ `Antigravity - <tên bạn>`. Phần thời hạn để mặc định.
6. Bấm tạo. Màn hình sẽ hiện ra một dãy chữ và số rất dài.

🔴 **Dãy này chỉ hiện đúng một lần.** Bấm nút copy rồi dán tạm vào một chỗ an toàn (ứng dụng ghi chú riêng của bạn). Đóng cửa sổ đi là không xem lại được, phải tạo khoá mới.

> Dãy chữ đó là chìa khoá vào n8n của công ty. Không dán vào nhóm chat, không gửi email, không đưa cho người ngoài.

---

## Bước 3 — Mở tệp cấu hình trong Antigravity

1. Mở **Antigravity**.
2. Mở khung trò chuyện với trợ lý (Agent) ở bên phải.
3. Bấm biểu tượng bánh răng (cài đặt) ở phía trên khung đó → chọn **MCP Servers**.
4. Bấm **View raw config**. Một tệp tên `mcp_config.json` sẽ mở ra.

**Nếu không tìm thấy nút đó**, mở thẳng tệp bằng đường dẫn sau (menu File → Open File, rồi dán đường dẫn vào):

- Máy Mac: `~/.gemini/config/mcp_config.json`
- Máy Windows: `%USERPROFILE%\.gemini\config\mcp_config.json`

---

## Bước 4 — Dán đoạn cấu hình vào

Tệp `mcp_config.json` có thể đang **rỗng**, hoặc đang **có sẵn nội dung**. Hai trường hợp làm khác nhau.

### Trường hợp A — tệp đang rỗng

Dán trọn đoạn dưới đây vào:

```json
{
  "mcpServers": {
    "n8n-kfsp": {
      "command": "npx",
      "args": ["-y", "n8n-mcp"],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true",
        "N8N_API_URL": "https://n8n.kfsp.vn/api/v1",
        "N8N_API_KEY": "DÁN_KHOÁ_CỦA_BẠN_VÀO_ĐÂY"
      }
    }
  }
}
```

### Trường hợp B — tệp đã có sẵn thứ khác

Đã có sẵn `"mcpServers": {` rồi thì **chỉ chèn thêm phần `"n8n-kfsp": { ... }`** vào bên trong, nhớ thêm dấu phẩy ngăn cách với mục đứng trước. Đừng dán chồng cả khối, tệp sẽ hỏng.

### Việc phải làm ở cả hai trường hợp

Thay `DÁN_KHOÁ_CỦA_BẠN_VÀO_ĐÂY` bằng dãy chữ bạn lấy ở Bước 2. **Giữ nguyên hai dấu nháy kép hai đầu**, chỉ thay phần chữ ở giữa.

Đúng như thế này:

```
"N8N_API_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI..."
```

Rồi lưu tệp lại: máy Mac bấm `Cmd + S`, máy Windows bấm `Ctrl + S`.

---

## Bước 5 — Bật lên và kiểm tra

1. Quay lại mục **MCP Servers**, bấm **Refresh** (hoặc đóng hẳn Antigravity rồi mở lại).
2. Chờ khoảng 1 phút. Lần đầu máy phải tải phần nối về nên hơi lâu.
3. Nhìn dòng `n8n-kfsp` — có chấm xanh hoặc chữ *connected* là xong.

**Kiểm tra thật:** nhắn vào khung trò chuyện câu này:

```
Liệt kê giúp tôi 5 luồng n8n đang bật trên n8n.kfsp.vn
```

Máy trả về danh sách tên luồng là đã thông. Máy nói không thấy công cụ nào thì xem phần dưới.

---

## Khi không chạy được

| Hiện tượng | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| Chấm đỏ, hoặc không thấy `n8n-kfsp` | Tệp cấu hình sai dấu ngoặc, dấu phẩy | Dán lại nguyên khối ở Trường hợp A, chỉ thay phần khoá |
| Báo *command not found: npx* | Chưa cài Node.js | Làm lại Bước 1 |
| Báo *401* hoặc *unauthorized* | Khoá dán thiếu ký tự, hoặc dán nhầm cả khoảng trắng | Tạo khoá mới ở Bước 2, copy lại cho đủ |
| Chờ mãi không lên | Lần đầu tải hơi lâu | Chờ thêm 2 phút, rồi mở lại Antigravity |
| Vẫn không được | | Nhắn nhóm kỹ thuật, kèm ảnh chụp màn hình mục MCP Servers |

---

## Ba điều bắt buộc nhớ

1. **Khoá là của riêng bạn.** Không gửi cho ai, không dán vào nhóm chat. Nghi bị lộ thì vào n8n xoá khoá cũ, tạo khoá mới.
2. **Công cụ này sửa và xoá được luồng thật đang chạy.** Chỉ dùng để xem và hỏi. Muốn sửa hay tạo luồng mới thì hỏi nhóm kỹ thuật trước.
3. **Nghỉ việc hoặc đổi máy** thì báo để xoá khoá cũ.

---

*Cập nhật lần cuối: 11/08/2026*
