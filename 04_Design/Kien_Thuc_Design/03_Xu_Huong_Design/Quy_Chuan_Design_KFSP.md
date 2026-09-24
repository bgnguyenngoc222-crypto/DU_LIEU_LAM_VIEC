# 🎨 QUY CHUẨN THIẾT KẾ VISUAL & LAYOUT THƯƠNG HIỆU KFSP (BRAND DESIGN SYSTEM)

> **Tài liệu lưu trữ chính thức bộ quy chuẩn thiết kế hình ảnh, banner và infographic truyền thông cho KFSP.**  
> *Định dạng JSON cấu trúc cố định (Fixed Keys) dùng trực tiếp trên Gemini, Flow AI, Dify, n8n, HTML/CSS Generator hoặc AI Prompting.*

---

## 📄 File JSON Cấu Trúc Gốc

File JSON nguyên bản lưu tại: [`Quy_Chuan_Design_KFSP.json`](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/Kien_Thuc_Design/03_Xu_Huong_Design/Quy_Chuan_Design_KFSP.json)

```json
{
  "design_system": "KFSP Visual Identity & Content Graphics",
  "brand_identity": {
    "brand_name": "KFSP",
    "logo": {
      "position": "top_center",
      "style": "circular_icon_with_text",
      "icon_color": "#FFFFFF",
      "text_color": "#FFFFFF",
      "text_transform": "UPPERCASE"
    },
    "tagline": {
      "text_options": [
        "KFSP · Mang chứng khoán về tầm tay bạn",
        "KFSP · Đưa chứng khoán về tầm tay bạn"
      ],
      "position": "bottom_center",
      "font_color": "#A78BFA",
      "font_size_relative": "small",
      "text_transform": "MIXED_CASE"
    }
  },
  "canvas": {
    "aspect_ratio": "1:1",
    "recommended_resolution": "1080x1080px",
    "background": {
      "type": "radial_gradient",
      "center_color": "#230C59",
      "edge_color": "#0D0620",
      "overlay_pattern": "subtle_puzzle_contour_watermark"
    }
  },
  "color_palette": {
    "background": {
      "dark_purple_deep": "#0D0620",
      "violet_primary": "#230C59",
      "overlay_dark": "rgba(15, 8, 38, 0.75)"
    },
    "typography": {
      "primary_white": "#FFFFFF",
      "secondary_silver": "#D1D5DB",
      "accent_gold": "#FBBF24",
      "tagline_purple": "#A78BFA"
    },
    "technical_chart_accents": {
      "price_trend_blue": "#3577FF",
      "support_green": "#22C55E",
      "resistance_red": "#EF4444",
      "channel_ice_gold": "#F59E0B",
      "volume_bull_green": "#00E676",
      "volume_bear_red": "#FF3B30",
      "projection_dashed_line": "rgba(255, 255, 255, 0.5)"
    },
    "ui_elements": {
      "pill_badge_bg": "#4C1D95",
      "pill_badge_border": "#7C3AED",
      "card_border": "rgba(255, 255, 255, 0.15)"
    }
  },
  "typography": {
    "font_family": "Inter, sans-serif",
    "hierarchy": {
      "main_title": {
        "text_transform": "UPPERCASE",
        "font_weight": "Bold (700)",
        "font_size": "Large (32px - 40px)",
        "color": "#FFFFFF",
        "alignment": "center",
        "letter_spacing": "0.5px"
      },
      "subtitle": {
        "text_transform": "Sentence_Case",
        "font_weight": "Medium (500)",
        "font_size": "Medium (18px - 22px)",
        "color": "#FFFFFF",
        "alignment": "center"
      },
      "badge_pill_text": {
        "text_transform": "UPPERCASE",
        "font_weight": "SemiBold (600)",
        "font_size": "Small (13px - 15px)",
        "color": "#FFFFFF",
        "alignment": "center"
      },
      "chart_technical_labels": {
        "text_transform": "UPPERCASE",
        "font_weight": "Bold (700)",
        "font_size": "Small (12px - 14px)",
        "color": "#FBBF24"
      },
      "annotation_body": {
        "text_transform": "Sentence_Case",
        "font_weight": "Regular (400)",
        "font_size": "Small (13px - 15px)",
        "color": "#FBBF24",
        "alignment": "center"
      },
      "footer_tagline": {
        "text_transform": "Sentence_Case",
        "font_weight": "Medium (500)",
        "font_size": "Extra_Small (12px - 13px)",
        "color": "#A78BFA",
        "alignment": "center"
      }
    }
  },
  "layout_composition": {
    "structure": "3_tier_vertical_stack",
    "header_zone": {
      "height_share": "20%",
      "elements": [
        "top_center_logo_kfsp",
        "main_title_uppercase",
        "subtitle_sentence_case",
        "optional_pill_badge"
      ],
      "alignment": "center"
    },
    "content_zone": {
      "height_share": "70%",
      "elements": [
        "technical_chart_or_diagram",
        "translucent_annotation_cards",
        "dotted_yellow_highlight_circles",
        "volume_bar_chart",
        "bottom_summary_text"
      ],
      "alignment": "center_centered"
    },
    "footer_zone": {
      "height_share": "10%",
      "elements": [
        "tagline_kfsp_mang_chung_khoan_ve_tam_tay_ban"
      ],
      "alignment": "center"
    }
  },
  "components_and_ui_styles": {
    "header_pill_badge": {
      "border_radius": "9999px",
      "background": "linear-gradient(135deg, #4C1D95 0%, #581C87 100%)",
      "border": "1px solid #7C3AED",
      "padding": "6px 20px"
    },
    "callout_box": {
      "border_radius": "8px",
      "background": "rgba(15, 8, 38, 0.75)",
      "border": "1px solid rgba(255, 255, 255, 0.15)",
      "padding": "8px 12px"
    },
    "diagram_annotations": {
      "highlight_circle": "dotted_1px_yellow_gold",
      "projection_lines": "dashed_1px_white_transparent",
      "support_line": "solid_2px_neon_green",
      "resistance_line": "solid_2px_crimson_red"
    }
  },
  "design_rules": {
    "dos": [
      "Luôn dùng Font chữ 'Inter' chuẩn với quy tắc phân cấp: Tiêu đề chính & Thuật ngữ kỹ thuật (PSY, BC, ST, AR...) in hoa (UPPERCASE); Mô tả chi tiết dạng chữ thường (Sentence case).",
      "Duy trì phông nền tím thẫm mờ (Deep Violet Gradient) đồng nhất trên tất cả thiết kế.",
      "Luôn đặt Logo KFSP trên cùng chính giữa và Tagline ở chân ảnh chính giữa.",
      "Tạo độ tương phản cao cho đồ thị bằng các màu dạ quang/neon (Xanh dương Royal, Xanh lá Neon, Đỏ Crimson, Vàng Gold)."
    ],
    "donts": [
      "Không dùng nền màu sáng hoặc lệch khỏi tông màu tím thương hiệu KFSP.",
      "Không thay đổi font chữ sang các font có chân (Serif) hoặc font nắn uốn.",
      "Không đặt Logo chệch khỏi vị trí căn giữa đỉnh hình."
    ]
  }
}
```

---

## 🛠️ HƯỚNG DẪN SỬ DỤNG TRONG WORKFLOW & TOOL AI

1. **Dán làm Custom Knowledge / System Instruction cho Gemini:**
   - Cung cấp file JSON này cho Gemini để tự động tạo banner/code HTML/CSS canvas theo đúng định dạng KFSP.
2. **Sử dụng trong Flow AI / Automation Workflows:**
   - Dùng mã JSON làm cấu trúc thông số biến cố định (Constant Variables) cho các Node sinh nội dung tự động.
