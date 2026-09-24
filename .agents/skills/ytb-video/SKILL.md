---
name: ytb-video
description: Hệ thống 10 bước tự động hóa quy trình làm video YouTube (Từ ý tưởng đến lúc đăng). Cung cấp 10 câu lệnh độc lập để tạo ngách, dàn ý, kịch bản, giọng đọc, ảnh bìa, dịch thuật, SEO...
---

# SKILL: YTB-VIDEO (10 BƯỚC LÀM VIDEO YOUTUBE)

> **Mục tiêu:** Biến một ý tưởng thô thành một video hoàn chỉnh sẵn sàng đăng thông qua 10 mắt xích. KHÔNG gộp chung các bước. Chạy lần lượt từ 1 đến 10, hoặc gọi lẻ đúng khâu đang cần.
> **Quy định:** Tuân thủ tuyệt đối 10 tiêu chuẩn chất lượng từ bài hướng dẫn gốc.

## TỔNG QUAN DÂY CHUYỀN
Ý tưởng thô → 01 Niche → 02 Outline → 03 Script → 04 Humanize → 05 Voice → 06 Thumbnail → 07 Translate → 08 Storyboard → 09 SEO → 10 Package.

## CHI TIẾT 10 CÂU LỆNH (PROMPT)

Khi người dùng gọi một trong các lệnh dưới đây, AI phải đóng vai chuyên gia YouTube và thực thi đúng nhiệm vụ của bước đó:

### 01. `/niche-research` (Nghiên cứu ngách)
- **Nhiệm vụ:** Đào ngách hot ít cạnh tranh + chốt bộ từ khoá cho kênh.
- **Tiêu chuẩn:** Sàng lọc chủ đề từ 16 chủ đề nền tảng, chọn 2-3 ngách nhỏ. Volume tìm kiếm người mới 3.600–40.000/tháng. Đảm bảo từ khóa long-tail >1.000 lượt/tháng.
- **Đầu ra mong muốn:** 3 ngách tiềm năng kèm bộ từ khóa.

### 02. `/outline` (Lên dàn ý)
- **Nhiệm vụ:** Dựng khung Mở – Thân – Chốt, cài sẵn cao trào.
- **Tiêu chuẩn:** Hook 0-15s, Intro 10-20s, Thân 3-5 ý (mỗi ý 30-60s), Cao trào, Kết + CTA. Tư duy ngược từ điểm sóng cao. Rải đều 3 CTA, không dồn cuối.
- **Đầu ra mong muốn:** Dàn ý chi tiết phân bổ thời gian và điểm sóng cao.

### 03. `/script` (Viết kịch bản)
- **Nhiệm vụ:** Viết kịch bản chi tiết dựa trên dàn ý. Hook 5 giây + mở vòng giữ chân.
- **Tiêu chuẩn:** Viết theo cách giọng AI sẽ đọc lên (không viết tự do). Mỗi 30-60s mở một vòng lặp chưa trả lời ngay, đóng ở đoạn sau rồi mở vòng mới. Đủ cảm xúc, con số. Ghi timecode và link nguồn.

### 04. `/humanize` (Khử mùi AI)
- **Nhiệm vụ:** Chỉnh sửa kịch bản cho giống người thật viết.
- **Tiêu chuẩn:** Cắt thẳng cụm sáo rỗng ("trong thế giới ngày nay", "không thể phủ nhận rằng", "hãy cùng khám phá"). Đa dạng nhịp câu (ép ít nhất 1 câu cực ngắn mỗi đoạn). Thêm quan điểm cá nhân/thái độ để bình luận.

### 05. `/voice` (Tạo giọng đọc)
- **Nhiệm vụ:** Chuẩn hóa text để đưa vào công cụ TTS (Text-To-Speech).
- **Tiêu chuẩn:** Viết số ra chữ, mở viết tắt, bỏ emoji và markdown. Phân chia thành các khối 150-300 từ. Ghi chú điểm cần nhấn nhá.

### 06. `/thumbnail` (Tạo Thumbnail)
- **Nhiệm vụ:** Lên ý tưởng + prompt tạo ảnh bìa "ép bấm" để kéo CTR.
- **Tiêu chuẩn:** Áp dụng tư duy Thumbnail-first. Đề xuất bố cục lưới 9 ô, chủ thể ở giao điểm. Chữ tối đa 3-5 từ, tương phản mạnh. Cung cấp Prompt tiếng Anh (tỷ lệ 16:9, không text). Mục tiêu CTR 2-6%.

### 07. `/translate` (Dịch đa ngôn ngữ)
- **Nhiệm vụ:** Bản địa hóa nội dung để đánh thị trường ngoại RPM cao.
- **Tiêu chuẩn:** KHÔNG dịch word-by-word. Dịch qua tiếng Anh trung gian rồi VIẾT LẠI theo văn bản địa. Giữ số ký tự tương đương để khớp bản dựng. Đổi ví dụ, tiền tệ cho hợp thị trường sở tại.

### 08. `/storyboard` (Dựng Video / Shot list)
- **Nhiệm vụ:** Biến kịch bản thành bảng phân cảnh (Shot list) chi tiết.
- **Tiêu chuẩn:** Kẻ bảng gồm các cột: Timecode, Lời bình, Hình ảnh/Video cần dùng, Text trên màn hình, Nhạc nền. Gợi ý footage tái sử dụng, AI chỉ làm ảnh tĩnh. Tối đa 5 giây/nguồn để tránh bản quyền.

### 09. `/seo` (Tối ưu SEO)
- **Nhiệm vụ:** Viết Tiêu đề, mô tả và tag long-tail chuẩn.
- **Tiêu chuẩn:** 
  - Tiêu đề: Công thức Cảm xúc + Bối cảnh + Hành động. < 70 ký tự. Cung cấp 10 options.
  - Mô tả: 250-350 từ, chứa từ khóa ở 2-3 câu đầu, có timestamps và hashtag.
  - Tag: 8-15 tag long-tail (300-500 ký tự), không viết hoa. (Shorts để trắng tag).

### 10. `/package` (Đóng gói quy trình)
- **Nhiệm vụ:** Gộp tất cả thành hệ thống cỗ máy lặp lại (SOP).
- **Tiêu chuẩn:** Tạo bảng Production Board. Viết SOP từng khâu (đầu vào, các bước, đầu ra). Tách 3 job brief: researcher, editor, designer.
