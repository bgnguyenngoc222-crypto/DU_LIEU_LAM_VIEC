---
name: vox-explainer-video
description: Tự động lập Kế hoạch Sản xuất Video toàn diện theo phong cách Vox Explainer (video giải thích) từ một nội dung văn bản thô. Sử dụng skill này khi người dùng yêu cầu làm video Vox, kịch bản Vox, prompt AI tạo video Vox, hoặc chuyển bài viết thành video giải thích phong cách cắt dán giấy (paper cutout).
---

# Vox Explainer Video Creator

## Mục đích
Nhận một nội dung thô (kịch bản bài viết, thông tin), biên tập lại câu chữ cho sắc bén và lập Kế hoạch Sản xuất Video chi tiết đến từng phân cảnh (scene) theo đúng đặc trưng hình ảnh của Vox.

## Đặc trưng phong cách Vox CẦN TUÂN THỦ
1. **Nhịp độ (Pacing)**: Nhanh, dứt khoát, thông tin dày đặc nhưng trực quan.
2. **Hình ảnh (Visuals)**: Sử dụng đồ họa phẳng (Flat design), mô hình cắt dán giấy (Paper cutout), bản đồ, biểu đồ minh họa hoặc không gian 3D diorama (mô hình giấy). Không dùng video quay thực tế (live-action) trừ khi là tư liệu lịch sử.
3. **Âm thanh (Audio)**: Giọng đọc khách quan, rõ chữ. Nhạc nền tạo nhịp điệu tò mò, học thuật. Hiệu ứng âm thanh (SFX) mang tính vật lý (tiếng sột soạt của giấy, tiếng gõ phím, tiếng highlight marker).
4. **Xử lý Nhân vật**: Tuyệt đối không sử dụng ảnh chụp thực tế hay khuôn mặt thật. Minh họa nhân vật dưới dạng hình vẽ 2D phẳng (flat vector portrait), phác họa, hiệu ứng halftone, hoặc chỉ lấy hình bóng (silhouette).

## Luật chuyển hóa hình ảnh cho Prompt AI
- Tuyệt đối không đưa các khái niệm trừu tượng vào prompt. Phải chuyển hóa ý nghĩa câu thoại thành HÀNH ĐỘNG VẬT LÝ CỤ THỂ của các vật thể giấy. (Ví dụ: Thay vì "Kinh tế suy thoái", hãy tả "A red cardboard arrow breaking in half and falling down on a vintage map").
- **Cấu trúc Prompt chuẩn**: [Hành động/Chuyển động cụ thể của chủ thể] + [Phong cách cốt lõi] + [Chất liệu & Chi tiết] + [Ánh sáng & Màu sắc] + [Chất lượng]
- **Core Style**: Vox explainer video aesthetic, stop-motion style animation, 2D paper cutout collage, editorial illustration, flat design, mixed media art.
- **Chất liệu**: vintage paper texture, layered cardboard, newspaper clippings (no readable text), topographic map elements.
- **Ánh sáng & Màu sắc**: clear drop shadows to create paper depth, soft directional lighting, high contrast editorial color palette.
- **Negative Prompt BẮT BUỘC (giữ nguyên cho mọi cảnh)**: photorealistic, photography, live action, cinematic, real human faces, celebrity faces, realistic portrait, realistic eyes, 3d render, octane render, unreal engine, messy, cluttered, text, typography, letters, words, watermark, blurry, depth of field, anime, cartoonish.

## Cấu trúc đầu ra bắt buộc
Tuyệt đối không dùng định dạng bảng. Trình bày theo đúng template sau:

### 1. TỔNG QUAN DỰ ÁN
- Thời lượng dự kiến: [Tính theo tốc độ 150-160 từ/phút]
- Style Giọng đọc (Voiceover): Nam/Nữ, tone giọng khách quan... Tốc độ đọc: Nhanh (1.15x - 1.25x).
- Style Nhạc nền (BGM): [Thể loại]. Âm lượng: 10-15%.

### 2. DANH SÁCH TƯ LIỆU CẦN CHUẨN BỊ
- Background: [Ví dụ: Giấy báo cũ, Bản đồ vector...]
- Vật thể/Nhân vật (Cutouts): [Các yếu tố cần xuất hiện]

### 3. KỊCH BẢN CHI TIẾT TỪNG PHÂN CẢNH

**SCENE [STT]: [Thời lượng ước tính... giây. TUYỆT ĐỐI KHÔNG VƯỢT QUÁ 10 GIÂY/CẢNH. Nếu thoại VO quá dài, BẮT BUỘC phải ngắt thành nhiều cảnh nhỏ]**
- Lời đọc (VO): [Câu thoại bám sát nội dung gốc, hãy chuyển thể đánh vào trọng tâm hơn nhưng vẫn giữ nguyên thông điệp và từ ngữ cốt lõi mà người dùng gửi, tuyệt đối không rút gọn quá mức làm mất chất và sự mượt mà của bài viết]
- Tư liệu & Hình ảnh (Visuals): [Mô tả chi tiết bố cục hình ảnh và các vật thể bằng giấy/đồ họa. **ĐẶC BIỆT LƯU Ý:** Nếu cảnh có nhắc đến app "KFSP", BẮT BUỘC phải yêu cầu người dùng cung cấp ảnh chụp màn hình app (càng chi tiết thao tác càng tốt) để chèn vào video, và ghi chú rõ "Logo KFSP đã có sẵn trên máy".]
- Hiệu ứng (Motion/SFX): [Cách hình ảnh chuyển động + Âm thanh đi kèm]
- Prompt AI tạo Video: [Prompt tiếng Anh tuân thủ Luật chuyển hóa hình ảnh. **NẾU CẢNH CÓ ẢNH CHỤP MÀN HÌNH KFSP:** Bắt buộc thêm dòng này vào cuối prompt để AI không bóp méo giao diện: "Slight slow camera pan. Do not alter the text or UI elements on the screen, keep the screenshot exactly as is."]
- Negative Prompt: photorealistic, photography, live action, cinematic, real human faces, celebrity faces, realistic portrait, realistic eyes, 3d render, octane render, unreal engine, messy, cluttered, text, typography, letters, words, watermark, blurry, depth of field, anime, cartoonish.

... [Lặp lại cho đến hết kịch bản]

---

> [!IMPORTANT] LƯU Ý TỐI QUAN TRỌNG (Ghi chú phần này cho người dùng ở cuối output):
> Nhắc nhở người dùng sử dụng tính năng **Image-to-Image (hoặc Image Reference/sref)** khi mang prompt sang các công cụ như Flow AI, Midjourney, hoặc Veo. Khuyên họ đính kèm một bức ảnh chụp màn hình (screenshot) bất kỳ từ các video thực tế của Vox để làm ảnh gốc (seed image). Điều này ép các công cụ AI tuân thủ tuyệt đối tone màu và bố cục phẳng, không tự ý sáng tạo sai lệch.
