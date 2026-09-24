# Mô tả YouTube — chuẩn SEO + GEO

> Tách khỏi `SKILL.md` ngày 05/08/2026 vì chỉ cần tới **sau khi đã có `final.mp4`**, không liên quan lúc dựng.

**Đọc khi:** sắp đăng, cần tiêu đề + mô tả + hashtag.
(GEO ở đây = tối ưu cho bộ máy trả lời AI trích dẫn, không phải địa lý.)

---

> Mỗi video đăng YouTube (Shorts hoặc dài) PHẢI có description viết theo template này. Mục tiêu kép: **SEO** (lên top tìm kiếm YouTube/Google) + **GEO** (để bộ máy trả lời AI trích dẫn).

**3 khái niệm:**
- **SEO** (Search Engine Optimization): tối ưu **từ khoá** để video lên top tìm kiếm YouTube + Google video.
- **GEO** (Generative Engine Optimization): tối ưu để **AI answer engines** (Google AI Overviews, YouTube AI summary, Perplexity, ChatGPT search) **đọc hiểu + trích dẫn** video. Khác SEO ở chỗ cần **câu trả lời rõ ràng, định nghĩa, dữ kiện trích dẫn được, cấu trúc hỏi-đáp** — không nhồi keyword.
- **Geo-targeting (VN):** nhắm thị trường Việt Nam — keyword tiếng Việt có dấu + neo địa lý ("chứng khoán Việt Nam", "VN-Index", "nhà đầu tư F0 Việt").

### Template description (theo thứ tự)
```
[Dòng 1-2 — HOOK + KEYWORD CHÍNH]   ← chỉ ~150 ký tự đầu hiện trước "...more", phải chứa từ khoá chính + lời hứa
[Dòng 3-4 — TÓM TẮT GEO]            ← 2-3 câu trả lời thẳng "video này dạy gì", văn tự nhiên để AI trích nguyên câu
⏱ NỘI DUNG (chapters)               ← timestamps, BẮT BUỘC mốc 00:00 + ≥3 mốc, mỗi mốc ≥10s
00:00 Mở đầu: ...
00:xx ...
🔑 BẠN SẼ HỌC ĐƯỢC                  ← 3-5 bullet, mỗi bullet 1 ý trích dẫn được (GEO)
❓ CÂU HỎI THƯỜNG GẶP (FAQ)          ← 2-3 Q&A ngắn — đòn GEO mạnh nhất (AI lấy nguyên Q→A)
👉 [CTA + link]                      ← app/fanpage + CÂU BRAND SPINE (Module 3.4)
#hashtag (3-5)                       ← 3 hashtag đầu hiện trên tiêu đề
[Keyword block cuối]                 ← 1 dòng các cụm từ khoá liên quan, ngăn bằng "·"
```

### SEO checklist (YouTube)
- [ ] **Từ khoá chính xuất hiện trong: tiêu đề + 1-2 dòng đầu description + 1 lần ở chapters**. Nhất quán cùng 1 cụm.
- [ ] **Chapters/timestamps** đủ chuẩn (00:00 + ≥3 mốc) → YouTube tạo chapter, tăng giữ chân + hiện trong search.
- [ ] **3-5 hashtag** liên quan (#ChứngKhoán #PhânTíchKỹThuật...); 3 cái đầu hiện trên tiêu đề.
- [ ] Description **150-300 từ** cho Shorts, dài hơn cho video dài; keyword tự nhiên, KHÔNG nhồi.
- [ ] Có **link** (app/fanpage) + gợi ý video liên quan (internal link giữ session).
- [ ] (Tốt) Pinned comment lặp CTA + 1 câu hỏi kéo bình luận.

### GEO checklist (Generative Engine)
- [ ] **Câu tóm tắt trả lời thẳng** ở đầu ("Video này giải thích 5 mẫu nến đảo chiều đáy và cách nhận biết...") — AI trích nguyên câu.
- [ ] **Khối FAQ** (Q&A) với câu hỏi đúng cách người dùng hỏi ("Nến búa là gì?", "Làm sao nhận biết đáy?") + trả lời gọn 1-2 câu, dữ kiện rõ.
- [ ] **Định nghĩa + thực thể (entity) rõ ràng**: gọi đúng tên khái niệm (nến Hammer, Doji, Morning Star...) để AI map entity.
- [ ] Văn **khẳng định, dữ kiện kiểm chứng được**, tránh mơ hồ; không cường điệu (AI hạ tin cậy nội dung hype).
- [ ] Nhất quán thông tin giữa **tiêu đề ↔ description ↔ transcript/sub** (AI đối chiếu).

### Rule cứng + biến thể kênh
- **Compliance (Module 4):** KHÔNG % lợi nhuận / get-rich / phím hàng trong description. Education-first.
- **CÂU BRAND SPINE (Module 3.4):** description PHẢI có **"Đưa chứng khoán về tầm tay bạn"** / **"Chứng khoán trong tầm tay"** ở khối CTA.
- **🔴 Chỉ còn MỘT biến thể: BRAND KFSP** (CLAUDE.md rev28, 28/07 — mô hình kênh nobrand dừng hẳn, 6 kênh đều mang thương hiệu KFSP). CTA đẩy tải app + link store + fanpage; nhắc KFSP rõ. *"Chứng khoán trong tầm tay" nay là brand spine, không còn là tên kênh.* Composition `Nobrand` trong Root.tsx giữ lại như di sản, **không dùng để xuất bản**.
- **🔴 Luôn mở `DESCRIPTION_YOUTUBE.md` của bài TRƯỚC làm khuôn**, không viết lại từ đầu mỗi lần. Khuôn cố định: 3 tiêu đề để chọn → caption ngắn (FB/TikTok/Reels) → mô tả YouTube → hashtag → ghi chú GEO. Video tách nhiều phần: **mỗi phần một khối riêng trong cùng file**, phần trước trỏ tới phần sau (L23). Link app/fanpage để `[LINK APP — chờ Thanh]` nếu chưa có, đừng bịa.

### Ví dụ — video "5 mẫu nến đảo chiều đáy" (nobrand)
```
5 mẫu nến đảo chiều đáy giúp bạn nhận ra khi nào bên mua quay lại, thay vì bắt dao rơi.
Video giải thích 5 mẫu nến đảo chiều tăng tại đáy (nến Búa, Nhấn chìm tăng, Sao Mai, Doji chuồn chuồn, Nến xuyên thấu) và cách đọc tín hiệu trên biểu đồ chứng khoán.

⏱ NỘI DUNG
00:00 Ông bà xem trời đoán mưa — thị trường cũng có điềm
00:30 5 mẫu nến đảo chiều đáy
00:35 Nến búa
... (điền theo timestamp thật)

🔑 BẠN SẼ HỌC ĐƯỢC
- Nhận biết 5 mẫu nến đảo chiều đáy phổ biến
- Vì sao vị trí quan trọng hơn hình dạng nến
- Tại sao nên chờ thêm 1 cây nến xác nhận trước khi vào

❓ CÂU HỎI THƯỜNG GẶP
Nến búa là gì? Là nến có bóng dưới dài, cho thấy giá bị dìm sâu rồi được kéo lên — bên mua phản công ở đáy.
Doji chuồn chuồn báo hiệu gì? Hai phe mua bán cân bằng, bên bán mất đà ép giá — dấu hiệu đáy.

👉 Follow để xem tiếp cách đọc điềm của thị trường. Chứng khoán trong tầm tay.

#ChứngKhoán #PhânTíchKỹThuật #MẫuNến #ĐầuTưChứngKhoán #VNIndex
mẫu nến đảo chiều · nến đảo chiều đáy · cách đọc nến · phân tích kỹ thuật chứng khoán Việt Nam · nến Nhật
```

---
