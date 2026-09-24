---
name: kfsp-2d-video-prompt
description: Tạo prompt Text-to-Video chuẩn phong cách 2D Vector Animation của KFSP (Flat Art, Silhouette). Sử dụng skill này khi người dùng yêu cầu tạo prompt hoặc mô tả cảnh để gen video/ảnh minh họa 2D cho KFSP.
---

# Tạo Prompt Text-to-Video / Ảnh minh hoạ chuẩn KFSP

Mọi video hoặc ảnh minh họa trong chuỗi nội dung của KFSP hiện tại sẽ tuân thủ phong cách **Dark Purple Fintech Glassmorphism** kết hợp với **Silhouette** (Bóng đen nhân vật). Đây là sự tiến hóa từ Flat Art 2D thuần túy sang một giao diện UI hiện đại, mang lại cảm giác công nghệ, sắc nét và có chiều sâu.

Đặc trưng bắt buộc: Nền tím tối trầm, các thẻ UI trôi nổi với hiệu ứng kính mờ (frosted glass), viền phát sáng neon (xanh lá/xanh cyan/tím sáng), biểu đồ nến mờ ảo hoặc sắc nét tùy ý đồ.

## Công thức Prompt chuẩn

Khi người dùng yêu cầu tạo prompt mô tả một cảnh, hãy áp dụng bộ khung từ khóa (magic keywords) sau:

**Cấu trúc Prompt (Positive):**
`2D vector illustration, minimalist, dark purple fintech glassmorphism, dark silhouette of [MÔ TẢ CHI TIẾT NHÂN VẬT VÀ HÀNH ĐỘNG BẰNG TIẾNG ANH], [MÔ TẢ BỐI CẢNH UI TRÔI NỔI: floating UI cards, glowing elements...], frosted glass effect, neon [MÀU SẮC] glowing accents, dark deep purple #2D1B4E background, abstract geometry, high contrast, clean modern UI interface`

**Negative Prompt (Bắt buộc phải kèm theo để giữ nét 2D/UI, không bị biến thành tả thực nặng nề):**
`3d, realistic, cinematic, detailed face, photorealistic, photography, heavy shading, messy, complex background, text, watermark, text-heavy`

## Ví dụ

**Yêu cầu của user:** "Tạo prompt cho cảnh một người đàn ông đối diện với bảng điện đỏ rực lúc thị trường sụp đổ năm 1915."

**Output của AI:**
**Positive Prompt:** `2D vector illustration, minimalist, dark purple fintech glassmorphism, dark silhouette of a faceless man standing in front of a giant abstract candlestick chart falling down, glowing red panic atmosphere 1915 wall street, floating UI cards with frosted glass effect, neon red glowing accents, dark deep purple background, abstract geometry, high contrast, clean modern UI interface`
**Negative Prompt:** `3d, realistic, cinematic, detailed face, photorealistic, photography, heavy shading, messy, complex background, text, watermark, text-heavy`

## Quy trình thao tác
1. Phân tích yêu cầu của người dùng xem họ muốn nhân vật làm gì, bối cảnh ra sao.
2. Dịch ý tưởng đó sang tiếng Anh để điền vào phần `[MÔ TẢ...]`.
3. Lắp ghép thành 1 đoạn Prompt và 1 đoạn Negative Prompt hoàn chỉnh.
4. Trả kết quả dưới dạng text copy-paste để người dùng mang đi gen (Runway, Midjourney, v.v.).
