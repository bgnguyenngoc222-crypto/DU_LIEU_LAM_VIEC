# Bước 1 — Tạo mã ứng dụng Google của riêng bạn

Làm một lần duy nhất. Miễn phí. Khoảng 15 phút.

Mở trình duyệt, **đăng nhập sẵn bằng đúng Gmail cá nhân bạn muốn nối**. Nếu máy bạn
đang đăng nhập nhiều tài khoản Google cùng lúc, hãy thoát bớt, chỉ để lại một tài khoản —
đây là nguyên nhân số một gây lỗi ở bước sau.

---

## 1.1 Tạo một dự án

1. Vào https://console.cloud.google.com/
2. Bấm ô chọn dự án ở thanh trên cùng, cạnh chữ "Google Cloud"
3. Bấm **New Project** (Dự án mới)
4. Đặt tên: `claude-<tên bạn>` — ví dụ `claude-ngoc`
5. Bấm **Create**, chờ khoảng 30 giây

Xong thì nhớ bấm lại ô chọn dự án và **chọn đúng dự án vừa tạo**. Google hay để bạn
đứng ở dự án cũ mà không báo gì.

---

## 1.2 Bật các cửa dịch vụ

Google mặc định khoá hết. Bạn phải bật từng cái.

Vào https://console.cloud.google.com/apis/library — gõ tên vào ô tìm kiếm, mở ra,
bấm nút **Enable**. Làm lần lượt 8 cái sau:

| Tên gõ vào ô tìm | Để làm gì |
|---|---|
| `Google Drive API` | Tệp trên Drive |
| `Google Sheets API` | Trang tính |
| `Google Docs API` | Tài liệu |
| `Google Slides API` | Trình chiếu |
| `Gmail API` | Thư |
| `Google Calendar API` | Lịch |
| `Google Tasks API` | Việc cần làm |
| `People API` | Danh bạ |

Bật thêm nếu bạn cần (không bắt buộc):

- `Google Forms API` — biểu mẫu
- `YouTube Data API v3` — kênh YouTube

> Google Chat và Google Meet **không dùng được với Gmail cá nhân**, chỉ chạy trên tài
> khoản công ty. Bỏ qua hai cái đó.

Mỗi lần bật mất vài giây. Bật thiếu cái nào thì đúng nhóm việc đó sẽ báo lỗi
khi dùng, chứ không hỏng cả hệ thống — lúc đó quay lại đây bật thêm là được.

---

## 1.3 Khai báo màn hình đăng nhập

1. Vào https://console.cloud.google.com/auth/overview
2. Bấm **Get started**
3. **App name**: gõ `Claude Code` — **User support email**: chọn Gmail của bạn
4. **Audience**: chọn **External** (Bên ngoài). Đây là lựa chọn duy nhất có cho Gmail cá nhân
5. **Contact information**: gõ lại Gmail của bạn
6. Đồng ý điều khoản, bấm **Create**

### Rồi tự thêm mình vào danh sách người được dùng thử

Ứng dụng của bạn đang ở chế độ **Testing** (thử nghiệm). Ở chế độ này chỉ những
địa chỉ thư nằm trong danh sách mới đăng nhập được — kể cả chính bạn.

1. Vào https://console.cloud.google.com/auth/audience
2. Kéo tới mục **Test users**, bấm **+ Add users**
3. Gõ **chính Gmail của bạn**, bấm **Save**

🔴 Bỏ qua bước này là ở bước 2 bạn sẽ nhận lỗi `403: access_denied`.

---

## 1.4 Đổi sang chế độ Chính thức — đừng bỏ qua

Ở chế độ **Testing**, Google cắt đăng nhập của bạn **sau đúng 7 ngày**. Cứ một tuần
lại phải đăng nhập lại một lần. Đổi sang chế độ Chính thức là hết hẳn chuyện đó.

1. Vẫn ở trang https://console.cloud.google.com/auth/audience
2. Tìm mục **Publishing status**, đang ghi `Testing`
3. Bấm nút **Publish app**
4. Hiện ô xác nhận, bấm **Confirm**

Mục đó chuyển thành `In production` là xong. Có hiệu lực ngay.

> **Đây không phải là nộp hồ sơ cho Google duyệt.** Bạn chỉ đổi trạng thái, không ai
> xét gì cả, không phải chờ. Vì chưa qua vòng duyệt của Google nên lúc đăng nhập
> vẫn hiện màn hình vàng cảnh báo — chuyện đó bình thường, bước 2 có chỉ cách đi qua.

Đổi xong thì đăng nhập một lần dùng mãi, trừ khi bạn tự gỡ quyền hoặc bỏ không dùng
suốt 6 tháng.

---

## 1.5 Tạo mã ứng dụng

1. Vào https://console.cloud.google.com/auth/clients
2. Bấm **+ Create client**
3. **Application type**: chọn **Desktop app** (Ứng dụng máy tính)
4. **Name**: gõ `claude-desktop`
5. Bấm **Create**

Hiện ra một ô báo có mã ứng dụng và mật khẩu ứng dụng. Bấm nút **Download JSON**.

Máy tải về một tệp tên dài kiểu `client_secret_1234...json`, thường nằm trong thư mục
**Downloads**.

---

## 1.6 Đổi tên tệp vừa tải

Đổi tên tệp đó thành đúng chữ này:

```
credentials.json
```

Cẩn thận: Windows hay giấu phần đuôi tên tệp. Nếu bạn đổi tên mà thấy nó thành
`credentials.json.json` thì mở File Explorer → thẻ **View** → tích ô
**File name extensions**, rồi đổi lại cho đúng.

Để tạm tệp này trong Downloads. Bước 2 sẽ chỉ chỗ đặt nó.

---

## Xong bước 1 khi nào

Bạn có đủ năm thứ:

- [ ] Dự án Google Cloud tên `claude-<tên bạn>`
- [ ] 8 cửa dịch vụ đã bật
- [ ] Gmail của bạn nằm trong **Test users**
- [ ] **Publishing status** đã là `In production`
- [ ] Tệp `credentials.json` nằm trong Downloads

Đủ rồi thì sang `02_CAI_DAT_TREN_MAY.md`.
