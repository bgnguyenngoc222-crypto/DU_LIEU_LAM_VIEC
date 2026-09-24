# Layout B: Authority Wakeup Call — Hướng dẫn sử dụng

> File JSON reference: [`Authority_Wakeup_Call_Layout.json`](file:///c:/NGUYEN%20NGOC%20MKT/ANTI%20GRAVITY/.agents/skills/kfsp-banner-infographic/reference/Authority_Wakeup_Call_Layout.json)

---

## Khi nào dùng Layout này?

Dùng cho **tuyến content lấy nhân vật / huyền thoại đầu tư làm trọng tâm**, cụ thể:

- Bài câu chuyện huyền thoại (William O'Neil, Jesse Livermore, Warren Buffett, Peter Lynch...)
- Bài học sai lầm phổ biến (FOMO, mua đuổi, gồng lỗ, không cắt lỗ...)
- Bài tâm lý đầu tư có nhân vật quyền lực dẫn dắt

**KHÔNG dùng cho:** giải thích khái niệm kỹ thuật / tính năng app → dùng Layout A (Infographic Giáo dục).

---

## So sánh 2 Layout

| Tiêu chí | Layout A: Infographic Giáo dục | Layout B: Authority Wakeup Call |
|---|---|---|
| **Trọng tâm thị giác** | Biểu đồ nến kỹ thuật | Chân dung nhân vật quyền lực |
| **Mục đích** | Giải thích khái niệm TA / tính năng app | Tạo ấn tượng mạnh, câu hook cảnh báo |
| **Tone** | Giáo dục, an toàn, hướng dẫn | Cảnh báo, quyết đoán, sắc lạnh |
| **Palette** | Dark Purple KFSP | Dark Purple KFSP (chung) |
| **UI nổi bật** | Glassmorphism cards + Chart | Chân dung + Nameplate + Hook text |
| **Có biểu đồ nến?** | Có (bắt buộc) | Không (midground là hình bối cảnh mờ) |

---

## Intake Checklist riêng cho Layout B

Khi user chọn Layout B, hỏi **6 câu** sau (thay cho checklist 7 câu của Layout A):

| # | Câu hỏi | Ví dụ |
|---|---|---|
| 1 | Nhân vật trung tâm là ai? | William O'Neil |
| 2 | Câu Hook (cảnh báo / câu hỏi xoáy nỗi đau)? | BẠN CÓ ĐỦ THỜI GIAN ĐỂ ĐÃI CÁT TÌM VÀNG MỖI TỐI? |
| 3 | Dòng Sub text (nguồn bài học / giải pháp)? | Bí quyết từ 140 năm nghiên cứu của huyền thoại William O'Neil |
| 4 | Nội dung Nameplate (tên + định vị)? | WILLIAM O'NEIL · HUYỀN THOẠI CANSLIM |
| 5 | Bối cảnh 2 hình nổi hai bên? | Trái: sàn NYSE 1960s. Phải: biểu đồ mẫu hình vẽ tay |
| 6 | Kích thước canvas? (1:1 hoặc 4:5) | 1:1 |

---

## Cấu trúc lớp (Layers)

```
┌─────────────────────────────────────┐
│           HOOK TEXT (top)            │  ← Sans-serif, Bold, UPPERCASE, #FFF
│     "BẠN CÓ ĐANG MUA ĐUỔI GIÁ     │
│        VÌ SỢ LỠ CHUYẾN?"           │
├─────────────────────────────────────┤
│          SUB TEXT (below hook)       │  ← Serif, Italic, #A78BFA
│  "Từ di sản nghiên cứu 140 năm..." │
├──────────┬───────────┬──────────────┤
│ FLOATING │  CENTRAL  │   FLOATING   │
│  IMAGE   │  FIGURE   │    IMAGE     │
│  (left)  │           │   (right)    │
│  40-60%  │  Sharp,   │   40-60%     │
│ opacity  │  high     │  opacity     │
│          │ contrast  │              │
│          ├───────────┤              │
│          │ NAMEPLATE │              │  ← Glassmorphism card, #4C1D95
│          │"W. O'NEIL"│
│          │           │
│          │  (fade)   │              │  ← Fade vào nền tím ở ngực
└──────────┴───────────┴──────────────┘
│         BACKGROUND: Dark Purple      │  ← Gradient #230C59 → #0D0620
│         + grain texture + faint      │    + chart silhouettes 8-15%
│           financial elements         │
└─────────────────────────────────────┘
```

---

## Quy tắc thị giác quan trọng

1. **Nhân vật là focal point** — không phải biểu đồ, không phải text.
2. **Hook text phải đọc được ở kích thước thumbnail** — giữ ngắn, tối đa 3 dòng.
3. **Hình nổi midground phải subtlé** — chỉ tạo không khí, không tranh chấp với nhân vật.
4. **Mọi thứ phải nằm trong palette Dark Purple KFSP** — không có màu lạ.
5. **Purple rim lighting trên nhân vật** — để hòa vào nền tím, tạo cảm giác thống nhất.
6. **Nameplate rõ ràng** — glassmorphism card cùng style với hệ thống KFSP.

---

## Ví dụ: Bài William O'Neil (IF-007)

**Input:**
- Nhân vật: William O'Neil
- Hook: "BẠN CÓ ĐỦ THỜI GIAN ĐỂ ĐÃI CÁT TÌM VÀNG MỖI TỐI?"
- Sub text: "Bí quyết từ 140 năm nghiên cứu của huyền thoại William O'Neil"
- Nameplate: "WILLIAM O'NEIL · HUYỀN THOẠI CANSLIM"
- Midground trái: Sàn NYSE thập niên 60, đen trắng, đông đúc
- Midground phải: Biểu đồ mẫu hình Cup & Handle và Double Bottom vẽ tay trên giấy
- Canvas: 1:1

**Prompt gen ảnh sẽ bao gồm:** toàn bộ thông tin trên + visual_style + negative_prompt + consistency_rules từ file JSON reference.
