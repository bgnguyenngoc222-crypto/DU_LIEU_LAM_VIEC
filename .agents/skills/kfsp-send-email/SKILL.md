---
name: kfsp-send-email
description: >
  Tự động hóa quá trình cập nhật luồng (workflow) gửi Email Marketing trên n8n.
  Skill này giúp tự động đẩy mã HTML của email vào node "Email Content"
  và cập nhật đường link (ID) Google Sheet vào các node lưu log thông qua n8n MCP.
  TRIGGERS: "đẩy email lên n8n", "cập nhật luồng n8n", "chèn html vào n8n", "setup n8n gửi mail", "tự động hóa n8n", "auto update n8n".
  Trigger khi user đã làm xong HTML Email hoặc Google Sheet và muốn nạp chúng vào n8n để sẵn sàng chạy gửi mail.
---

# Kỹ Năng: Tự Động Cập Nhật Luồng Gửi Email n8n (kfsp-send-email)

Skill này giúp trợ lý AI tự động cập nhật cấu hình hệ thống n8n thay cho người dùng. Vì người dùng không rành kỹ thuật, AI phải sử dụng **ngôn ngữ cực kỳ đơn giản, đời thường** và tự động hóa các thao tác JSON/API ở hậu trường.

## Mục tiêu của Skill
1. Tự động chèn mã HTML mới nhất vào node Email trên n8n.
2. Tự động cập nhật ID của file Google Sheets (để lưu log) vào luồng n8n.
3. Hạn chế tối đa việc người dùng phải tự copy/paste thủ công.

---

## Hướng dẫn Quy trình cho AI (Không bê nguyên văn cho người dùng xem)

Khi người dùng kích hoạt skill này (ví dụ: *"Đẩy giúp tôi email lên n8n nhé"*), AI hãy ngầm thực hiện các bước sau. **Giao tiếp với người dùng giống như một người trợ lý mẫn cán, báo cáo ngắn gọn.**

### Bước 1: Khai Thác Thông Tin (Bộ Câu Hỏi Chuẩn)
Nếu người dùng chưa cung cấp đủ dữ kiện khi gọi skill, AI hãy đưa ra một tin nhắn thân thiện gộp 4 câu hỏi dưới đây:

> *"Để tôi tự động cập nhật hệ thống n8n, bạn giúp tôi bổ sung các mảnh ghép này nhé:*
> 
> *1. **Tệp khách hàng:** Bạn muốn đẩy email này lên luồng nào (Trial, Free, Expired hay Expiring Soon)?*
> *2. **Tiêu đề & HTML:** Tiêu đề email đợt này là gì? (Và xác nhận tên file HTML nếu có nhiều file).*
> *3. **Tên Chiến Dịch:** Mã tên chiến dịch (ví dụ: `2026_08_4mcanslim`) để tôi cài vào bộ lọc.*
> *4. **Link Google Sheet:** Bạn gửi tôi link Sheet data của đợt này nhé (tôi sẽ tự động tách ID để cài cho cả `list_mail` và `log_sent`).*
> 
> *Có đủ đồ nghề, tôi sẽ tự 'lắp ráp' vào n8n ngay!"*

*(Lưu ý cho AI: Dưới đây là danh sách ID luồng cố định, tự động map theo câu trả lời số 1 của người dùng)*
- Tệp **Trial**: `Lt0gE0Ceqg64kQ1z`
- Tệp **Free**: `nMwCdi7Ayljvxhfp`
- Tệp **Expired** (Winback): `swFRXOmWmdLXm92d`
- Tệp **Expiring Soon**: `8sfsjbdd8qWEEsEa`

### Bước 2: Kéo và Xử Lý Dữ Liệu
Dùng `n8n_get_workflow` để kéo bản gốc của luồng về. Trích xuất ID của Google Sheet từ link người dùng đưa.
Tiến hành sửa các node sau trong JSON của luồng:
1. **Node `Read Input`**: Cập nhật ID Google Sheet mới. Chọn/giữ đúng tên sheet (tab) cần lấy dữ liệu là `list_mail`.
2. **Node `Read Log Sheet` và `Append to Log`**: Cập nhật ID Google Sheet mới. Chọn/giữ đúng tên sheet (tab) cần thao tác là `log_sent`.
3. **Node `Read Unsub`**: **KHÔNG CHẠM VÀO**, node này luôn dùng một link file cố định.
4. **Node `Filter & Limit 250`**: Tìm trường chứa tên chiến dịch hiện tại, cập nhật bằng Tên Chiến Dịch người dùng vừa đưa.
5. **Node `Email Content`**: Cập nhật **Tiêu đề email (Subject)** và đoạn mã HTML mới vào đúng các tham số tương ứng của node.

### Bước 3: Đẩy Lên n8n
- Dùng `n8n_update_full_workflow` để lưu lại bản mới lên n8n.

### Bước 4: Báo Cáo & Checklist Kiểm Tra (Mẫu giao tiếp)
Sau khi thành công, hãy báo cho người dùng và đưa ra **Checklist 7 bước kiểm tra hệ thống n8n** để họ tự rà soát trước khi gửi thật. Giọng điệu tương tự thế này:

> *"Tuyệt vời! Tôi đã tự động cập nhật mã HTML và gắn đúng link Google Sheet vào hệ thống n8n cho bạn rồi.*
> 
> *Trước khi bấm gửi chính thức, bạn hãy rà soát nhanh qua **Checklist 7 bước** dọc theo luồng n8n nhé:*
> 
> - [ ] **1. Read Input:** Kiểm tra node đọc danh sách email đầu vào đã đúng file/tệp khách hàng chưa.
> - [ ] **2. Read Log Sheet:** Kiểm tra node đọc file log cũ xem có báo lỗi mất kết nối (Sheet not found) không. Nếu có, xóa tên Sheet chọn lại.
> - [ ] **3. Read Unsub:** Kiểm tra node đọc danh sách hủy đăng ký (unsubscribe) để loại trừ khách không muốn nhận mail.
> - [ ] **4. Filter & Limit 250:** Kiểm tra node lọc xem đã điền đúng **Tên chiến dịch (Current Campaign)** và cài đặt số lượng gửi chưa.
> - [ ] **5. Email Content:** Mở node Email kiểm tra lại **Tiêu đề mail** và phần mã HTML tôi vừa chèn. Bấm Test Step gửi thử 1 mail nháp.
> - [ ] **6. Append to Log:** Mở node Log kiểm tra xem đã nối đúng vào Sheet cần ghi log sau khi gửi chưa.
> - [ ] **7. Notify người gửi:** Kiểm tra node thông báo đã báo đúng người/kênh chưa.
> 
> *Nếu mọi thứ đã tích xanh, bạn có thể tự tin bấm Execute (Chạy luồng) rồi đó!"*

---

## Cảnh Báo Khi Dùng Tool n8n MCP
- Luôn cẩn thận khi cập nhật workflow (`n8n_update_full_workflow`). Hãy đảm bảo giữ nguyên 100% cấu trúc của các node khác, chỉ can thiệp vào node HTML và node Google Sheets.
- Nếu không chắc chắn về cấu trúc JSON của node, hãy đọc `n8n_get_workflow` thật kỹ trước khi ghi đè.
