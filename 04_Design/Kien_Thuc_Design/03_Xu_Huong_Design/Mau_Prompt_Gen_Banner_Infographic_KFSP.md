# 📊 QUY TRÌNH & CẤU TRÚC JSON GEN BANNER / INFOGRAPHIC KFSP

> **Tài liệu tham chiếu chuẩn hóa quy trình tạo prompt sinh hình ảnh banner, infographic tài chính giáo dục cho KFSP.**  
> *Lưu file JSON gốc tại:* [`Mau_Prompt_Gen_Banner_Infographic_KFSP.json`](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/Kien_Thuc_Design/03_Xu_Huong_Design/Mau_Prompt_Gen_Banner_Infographic_KFSP.json)

---

## 🛑 QUY TẮC BẮT BUỘC TRƯỚC KHI GEN ẢNH (INTAKE CHECKLIST)

Tuyệt đối **KHÔNG tự ý sinh ảnh ngay lập tức** khi người dùng yêu cầu tạo banner/infographic. AI phải chủ động phỏng vấn / hỏi người dùng đầy đủ các thông tin sau để điền vào cấu trúc JSON:

1. **Nội dung chính**: Khái niệm tài chính, tính năng, hoặc bài học cốt lõi muốn truyền tải là gì?
2. **Head Title (Tiêu đề chính)**: Tiêu đề in hoa (UPPERCASE), ngắn gọn, đánh trúng điểm đau/tò mò của nhà đầu tư.
3. **Các nội dung bên trong**:
   - Các mục/khối thông tin (Sections / Cards): Số thứ tự, tiêu đề mục, mô tả ngắn gọn.
   - Điểm nhấn (Highlight): Con số hoặc kết luận quan trọng (ví dụ: `-2,5%`, `Vượt đỉnh`, `Tự động chuyển trạng thái`).
   - Khối hành động đề xuất (Action Recommendation): 1 - 2 hành động cụ thể trong app (ví dụ: Thêm vào Watchlist, Đặt cảnh báo).
4. **Mẫu hình chart / Nến minh họa**:
   - Có cần biểu đồ nến kỹ thuật không?
   - Nếu có: Loại mẫu hình (Hai đáy, VCP, Phá vỡ nền giá, Cốc tay cầm...), các điểm chú thích (Đáy 1, Đáy 2, Đỉnh giữa, Vùng break...), các đường hỗ trợ / kháng cự và chỉ báo khoảng cách.
5. **Logo chính & Tagline**:
   - Sử dụng Logo KFSP dạng nào (Dark mode / Light mode / Text + Icon)?
   - Tagline ở chân trang: *"KFSP · Đưa chứng khoán về tầm tay bạn"*.
6. **Kích thước & Tỉ lệ khung hình (Canvas)**:
   - `1:1` (1080x1080px - Square Post Fanpage)
   - `16:9` (1920x1080px - Banner ngang / YouTube)
   - `9:16` (1080x1920px - Story / Reels / TikTok)
   - `4:5` (1080x1350px - Portrait Post)
7. **Thông tin liên quan khác**: Màu nhấn đặc biệt, mức độ chi tiết đồ thị, ghi chú phong cách bổ sung.

---

## 📑 CẤU TRÚC JSON CHUẨN

```json
{
  "prompt_type": "image_generation",
  "project": "KFSP Stock Investing Educational Infographic",
  "reference_instruction": "Preserve the same visual design system, color palette, typography hierarchy, lighting, UI treatment, chart style and overall aesthetic.",
  "canvas": {
    "width": 1080,
    "height": 1080,
    "aspect_ratio": "1:1",
    "orientation": "square"
  },
  "subject": {
    "industry": "stock market and investing",
    "category": "technical analysis",
    "purpose": "educational financial infographic",
    "audience": "stock investors",
    "visual_priority": "explain the financial concept visually and simply"
  },
  "content": {
    "title": "TIÊU ĐỀ IN HOA CHÍNH",
    "sections": [
      {
        "number": "01",
        "title": "TIÊU ĐỀ KHỐI 1",
        "description": "Mô tả ngắn gọn và dễ hiểu."
      }
    ],
    "action": {
      "title": "HÀNH ĐỘNG ĐỀ XUẤT",
      "items": [
        "Hành động 1",
        "Hành động 2"
      ]
    }
  },
  "chart": {
    "enabled": true,
    "type": "simple candlestick stock chart",
    "pattern": "double bottom / breakout / vcp",
    "elements": ["Đáy 1", "Đỉnh giữa", "Đáy 2", "Vùng break"],
    "technical_levels": {
      "breakout": "horizontal dashed violet line",
      "support": "horizontal dashed subtle purple line"
    },
    "candles": {
      "bullish": "green",
      "bearish": "red"
    }
  },
  "visual_style": {
    "style_name": "Premium Fintech Dark Purple",
    "background": {
      "type": "dark purple gradient",
      "colors": ["#0D0620", "#230C59"],
      "lighting": "soft violet ambient glow"
    },
    "color_palette": {
      "primary": "#8B5CF6",
      "secondary": "#6D28D9",
      "background": "#0D0620",
      "white": "#FFFFFF",
      "light_text": "#E9E2FF",
      "success": "#22D3A0",
      "bearish": "#EF4444"
    },
    "glassmorphism": {
      "enabled": true,
      "card_color": "dark translucent purple",
      "border": "thin luminous violet",
      "corner_radius": "large rounded corners"
    }
  }
}
```

---

## 🎯 NGUYÊN TẮC HÌNH ẢNH (VISUAL RULES)
1. **Biểu đồ trực quan là trọng tâm**: Người đọc nhìn hình là hiểu khái niệm ngay cả khi chưa đọc hết chữ.
2. **Độ tương phản cao**: Chữ trắng `#FFFFFF` và tím nhạt `#E9E2FF` trên nền tím thẫm gradient `#0D0620` &rarr; `#230C59`.
3. **Màu nến chuẩn tài chính**: Xanh lá cây (Bullish) và Đỏ (Bearish).
4. **Hiệu ứng Glassmorphism**: Thẻ bo tròn góc lớn, viền neon tím mảnh `#8B5CF6`, đổ bóng tím mềm mại.
5. **Không dùng yếu tố gây nhiễu**: Không đưa người thật, không 3D character phức tạp, không hiệu ứng cyberpunk quá gắt.
