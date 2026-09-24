---
name: video-kfsp
description: "Tạo mọi loại video tự động (Điểm tin, HDSD, Vlog,...) bằng Remotion. Có các quy định nghiêm ngặt về vùng an toàn, animation và subtitle chuẩn TikTok."
argument-hint: (không cần argument — skill sẽ hỏi thông tin)
user-invocable: true
---

> 📍 **Codebase location:** Toàn bộ engine + `_shared/` (Vbee, phiên âm, scripts Python) + per-video folder (node_modules, screen-shot, clips, final.mp4) sống ở **`~/Desktop/VIDEO KFSP/`** — KHÔNG trong workspace OneDrive (tránh sync GB). Bản skill này chỉ để Claude trigger; mọi bước pipeline (TTS, Whisper, Remotion render, stitch) chạy `cd ~/Desktop/VIDEO\ KFSP/<folder-tập>`. Đường dẫn trong file dưới đây là tương đối với folder Desktop đó. Tổng quan: [`02_Marketing/content-automation/VIDEO_SYSTEM.md`](../../../02_Marketing/content-automation/VIDEO_SYSTEM.md).

> 📚 **BẢNG CHỈ ĐƯỜNG — đọc tệp nào, lúc nào**
>
> Tệp này (`SKILL.md`) chỉ giữ **luật chung + dây chuyền 6 bước**. Mọi thứ chuyên đề nằm ở `refs/`.
> 🔴 **Đừng đọc hết `refs/`.** Xác định đang làm gì rồi mở đúng một hai tệp — bảng dưới xếp theo *việc đang làm*, không theo tên tệp.
>
> **Theo LOẠI VIDEO** (đọc ngay từ đầu, thay cho việc đọc cả tệp này):
>
> | Đang làm video gì | Mở tệp |
> |---|---|
> | Hướng dẫn thao tác trên app/web — bấm ở đâu, làm thế nào | [`refs/HDSD_THAO_TAC.md`](refs/HDSD_THAO_TAC.md) |
> | Dạy mẫu hình nến, gộp nến, Búa–Sao băng, vai đầu vai | [`refs/CANDLE_NEN.md`](refs/CANDLE_NEN.md) |
> | Giới thiệu tính năng app (product demo, khung điện thoại) | [`refs/REMOTION_RESOURCES.md`](refs/REMOTION_RESOURCES.md) + [`refs/MOCKUP_3D.md`](refs/MOCKUP_3D.md) |
>
> **Theo BƯỚC ĐANG CHẠY:**
>
> | Đang ở bước nào | Mở tệp |
> |---|---|
> | Muốn thử ý đồ hình trước khi dựng (Google Flow, Storyboard Studio) | [`refs/GOOGLE_FLOW.md`](refs/GOOGLE_FLOW.md) |
> | **Đoạn mở chỉ có CHỮ, không có hình gánh đỡ** — hoặc Thanh chê hook "chưa ấn tượng" | [`refs/HOOK_CHU.md`](refs/HOOK_CHU.md) |
> | **Chọn góc máy cho chiếc điện thoại** — hoặc Thanh chê góc máy không đẹp | [`refs/GOC_MAY.md`](refs/GOC_MAY.md) |
> | Cần lấy hình từ Figma về | [`refs/FIGMA_EXPORT.md`](refs/FIGMA_EXPORT.md) |
> | **Bóng đổ của vật hở ra ở góc, không bám hình** | [`refs/MOCKUP_3D.md`](refs/MOCKUP_3D.md) mục *Đổ bóng cho chiếc máy* |
> | **Sắp render (Bước 5)** — bắt buộc đọc trước | [`refs/LOI_RENDER.md`](refs/LOI_RENDER.md) |
> | **Soi lỗi khung hình — khung trống, cú giống cắt cứng, vật nhảy cỡ** | [`refs/LOI_RENDER.md`](refs/LOI_RENDER.md) mục L73 (quét toàn bộ khung bằng máy) |
> | Đã có `final.mp4`, sắp đăng | [`refs/DESCRIPTION_YOUTUBE.md`](refs/DESCRIPTION_YOUTUBE.md) |
>
> **Khi có câu hỏi riêng:**
>
> | Câu hỏi | Mở tệp |
> |---|---|
> | Công cụ này dùng thương mại được không | [`refs/GIAY_PHEP.md`](refs/GIAY_PHEP.md) |
> | Vì sao luật này lại như vậy · định đổi một luật đã có | [`refs/CHANGELOG.md`](refs/CHANGELOG.md) |
>
> 🔴 **Phát hiện điều mới thì ghi vào ĐÚNG ref của chủ đề đó, và ghi một dòng nhật ký ở [`refs/CHANGELOG.md`](refs/CHANGELOG.md).** Không nhồi ngược vào `SKILL.md` — tệp này phình lên là mọi lần dùng đều tốn oan.

# /video-kfsp — Pipeline Sản Xuất Mọi Loại Video Mẫu KFSP (Điểm tin, HDSD, Vlog)

## Khi invoke

Hỏi Thanh lần lượt:
1. **Loại video:** "Loại video nào? (Điểm tin / Hướng dẫn sử dụng / Vlog)"
2. **Ngày phiên (nếu là Điểm tin):** "Ngày xuất bản?" → lưu `{date}` (format YYYY-MM-DD)
3. **Kịch bản:** "Paste kịch bản vào đây"
4. Tạo folder output theo format `output/{YYYYMMDD}/`

Sau đó chạy pipeline 6 bước. **MỖI BƯỚC PHẢI DỪNG** để Thanh duyệt trước khi qua bước tiếp theo.

---

## 🛑 QUY ĐỊNH CHUNG (Áp dụng cho mọi loại Video)

1. **Subtitles (Phụ đề) — Quy trình đã kiểm chứng:**

   **Bước 1: Whisper transcribe lấy word timestamps**
   ```python
   import whisper
   model = whisper.load_model("base")
   result = model.transcribe("voiceover.mp3", language="vi", word_timestamps=True)
   # Lưu ra whisper_words.json — mỗi word có {word, start, end}
   ```
   > Lưu ý: Whisper base Vietnamese transcript sai chính tả nhiều nhưng **timestamps chính xác**. Chỉ dùng timestamps, không dùng text.

   **Bước 2: Group whisper words thành chunks 5-6 từ**
   - Dùng silence gaps > 0.4s để tách segments
   - Mỗi segment chia thành groups tối đa 6 whisper-words
   - Lấy timing (start, end) từ whisper word đầu/cuối mỗi group
   - **Text dùng từ kịch bản gốc** (chính tả đúng), KHÔNG dùng whisper text

   **Bước 3: Map text gốc → timing chunks**
   - Kịch bản gốc chia thành các dòng nhỏ 5-6 từ, đánh số thứ tự
   - Ghép 1:1 với whisper timing chunks theo thứ tự
   - Convert timing sang frames: `frame = seconds × 30`

   **Bước 4: Format thành SubtitleEntry[]**
   ```typescript
   { start: 0, end: 24, text: "Trong khi nhiều người chỉ mất" },
   { start: 24, end: 55, text: "chừng 30 giây để lọc ra" },
   // ... 5-6 từ mỗi entry, chuyển liên tục
   ```
   - Thêm `keywords` cho từ cần highlight màu (purple, green, red, gold)

   **Bước 5: SubtitleBar component**
   - Hiển thị **1 dòng duy nhất**, 5-6 từ, chuyển liên tục theo nhịp giọng
   - Word-by-word karaoke: từ đã đọc = đậm màu, từ chưa đọc = mờ
   - Font: 38-42px bold, auto scale nếu quá dài (`fontSize = min(42, 960 / words × 0.85)`)
   - `whiteSpace: "nowrap"` — không wrap dòng
   - Vị trí: y=1380-1470 (trong TikTok safe zone, trên progress bar y=1490)
   - Fade in/out 4 frames mỗi đầu/cuối subtitle

   **Kết quả mẫu:** Video "Tầm soát tăng trưởng" → 98 subtitle chunks từ 109.3s audio.

   **Vị trí Safe Zone:**
   - Bắt buộc nằm TRONG vùng an toàn TikTok/Shorts/Reels (y < 1500px)
   - Không bị đè bởi caption text, share/like icons, tab bar

2. **Layout & Logo:**
   - Text và content chính: Canh giữa (Center Alignment) vào trung tâm màn hình, nằm trọn trong vùng Safe Zone.
   - **Logo KFSP:** Đặt phía trên, canh giữa (Top-Center) và GIA TĂNG KÍCH THƯỚC cho rõ nét nhất.
   - **🔴 CÂU BRAND SPINE (BẮT BUỘC, Thanh chốt 13/06):** mọi video phải hiện câu **"Đưa chứng khoán về tầm tay bạn"** hoặc tagline **"Chứng khoán trong tầm tay"** ở **khung cuối / CTA** — hiện TRÊN HÌNH (overlay), không lệ thuộc giọng đọc. Áp cho mọi video. Nguồn: `02_Marketing/KFSP_MARKETING_CONTEXT.md` Module 3.4.

3. **Motion & Animation (Vô cùng quan trọng):**
   - **Bắt buộc LÀM PLAN kỹ cho animation.** Không sử dụng các animate transition hời hợt, sơ sài hoặc trượt qua cho có.
   - Mọi frame chữ, pop-up component phải KHỚP CHÍNH XÁC với nhịp giọng đọc.
   - Việc trình bày bố cục: Các bảng thông tin, textbox minh hoạ thêm tuyệt đối **KHÔNG ĐỀ LÊN HÌNH TƯ LIỆU APP**. Phải có vùng dành riêng để hình nền và app screen không bị che mờ chi tiết.

4. **Animation Psychology (Ngôn ngữ chuyển động bắt buộc tuân thủ):**
   Người xem cảm nhận animation trước ngôn ngữ, do đó phải map logic chuyển động với tâm lý:
   - **Nhịp độ (Pacing):** Chuyển động chậm/nghỉ dài (tạo sự thư giãn, tin tưởng). Chuyển động nhanh/dồn dập (cảnh giác, chú ý). Thường đi từ Nhanh (đầu video) -> Chậm (giữa) -> Nhanh quyết đoán (cuối).
   - **Easing curves (Tính cách):** `ease-out` mạnh (chắc chắn, sự thật), `ease-in-out` (mềm mại, dẫn dắt), `overshoot` nhẹ (sống động). CẤM dùng `linear`.
   - **Scale & Distance:** `Zoom-in` chậm (thân mật, riêng tư), `Zoom-out` (bức tranh lớn).
   - **Trọng lực & Hướng:** Rơi xuống (áp lực, nặng nề), Bay lên (nhẹ nhõm, tự động hoá), Trái sang Phải (tiến về phía trước).
   - **Ánh sáng & Không gian:** Background tối dần/hẹp lại (ngộp thở, bế tắc) vs Sáng dần/Nở ra (thoáng, tự do, hy vọng).

5. **Sentence-Driven Rendering (BẮT BUỘC từ 2026-04-15):**
   Mọi video đều render per-sentence rồi stitch. **CẤM render monolithic.**
   - **Mỗi câu = atomic unit**: TTS riêng, whisper riêng, composition riêng (`Sentence{ID}.tsx`), clip mp4 riêng (`clips/{id}.mp4`).
   - **Cảnh đi theo câu** (không phải câu đi theo cảnh): visual phải minh hoạ đúng `main_idea` của câu đó. CẤM visual "cho cả đoạn" hoặc đè visual từ câu trước sang câu sau.
   - **Câu liệt kê**: element pop đúng word timestamp của từng item (lệch ≤2 frames), KHÔNG stagger đều bất kể giọng.
   - **Plan toàn bộ, render dần**: B4 lập bảng cho TẤT CẢ câu. B5 render theo phase PASA, gate sau mỗi phase.
   - **Sửa atomic**: sửa câu X → re-gen/re-render chỉ câu X → re-stitch. KHÔNG đụng câu khác.

---

## 🟣 LỚP NHẬN DIỆN BRAND (Brand Frame — BẮT BUỘC mọi video)

Mọi video PHẢI có **lớp phủ gradient tím brand trên + dưới** để nhìn 1 phát nhận ra KFSP. Component tái dùng: **`_shared/remotion/BrandFrame.tsx`** (đóng băng 2026-06-05 từ video "4 điểm vào lệnh").

- **Brand tokens — lấy từ app** (`KFSP_App_Flutter/lib/core/constants/kfsp_colors.dart`), KHÔNG bịa/đoán:
  - Tím chính `#7B3AEC` (primary) · Tím sáng `#AA75FF` (primaryLight, dùng cho **tiêu đề** trên nền tối) · Tím đậm `#5B20CC`.
  - ⚠️ KHÔNG dùng `#951B81` (magenta cũ ở `Brand/MÃ MÀU.txt`) — đã lệch brand, app dùng violet `#7B3AEC`.
  - Nến xanh `#34d399` / đỏ `#f87171`, nhấn vàng `#f5c542`, nền navy `#0a1628`.
- **Overlay:** gradient `rgba(123,58,236,a)` → trong suốt; trên cao 380px (a 0.40→0), dưới cao 480px (a 0.46→0). Nhẹ, tinh tế, không che nội dung.
- **Logo:** KFSP **màu TRẮNG** (filter `brightness(0) invert(1)` + drop-shadow), top-center y=78, trong safe zone.
- **Logo LUÔN hiện.** Mô hình kênh nobrand dừng hẳn từ 28/07/2026 — sáu kênh đều mang thương hiệu KFSP, nên không còn thế "ẩn logo". Cờ `NOBRAND` trong mã cũ giữ như di sản, **luôn để tắt**.
- **Tiêu đề kèm số thứ tự** (1/2/3/4): badge số + tiêu đề nằm **cùng 1 dòng, căn trái** (thẳng hàng), KHÔNG để số lệch dưới tiêu đề căn giữa.
- **Thứ tự layer trong `<Main>`:** scenes → `<BrandOverlay/>` → `<Subtitle/>` → `<BrandLogo/>` → `<Progress/>`.
- ⚙️ **Import component từ `_shared/`** (vd `BrandFrame.tsx`): đường dẫn từ `<tập>/src/` là `../../_shared/remotion/...` (dự án cũ có thêm một cấp `brand/` thì thêm một `../`); cần symlink `_shared/node_modules` (đã tạo, trỏ về node_modules video gần nhất) để bundler resolve font/remotion.

---

## 🎯 QUY ĐỊNH RIÊNG THEO LOẠI VIDEO

### 1. VIDEO HƯỚNG DẪN THAO TÁC (HDSD)
🔴 **Loại này KHÔNG bắt đầu bằng kịch bản, mà bắt đầu bằng BẢN QUAY MÀN HÌNH.** Viết lời trước rồi ép bản quay khớp theo là làm ngược, và luôn phải quay lại.

Kiểu hình đã chốt (05/08/2026) — **quay màn hình thật** lồng khung điện thoại, thêm **dấu ngón tay**, **tự phóng** vào vùng đang bấm, **chú thích ngắn** bám theo tay. Bốn thứ đó thiếu một là hỏng. (Cách cũ — vẽ mũi tên đỏ lên ảnh chụp tĩnh — đã bỏ.)

Bộ dựng có sẵn ở `~/Desktop/VIDEO KFSP/_shared/remotion/tutorial/`: làm bài mới chỉ cần thay bản quay và viết danh sách mốc trong `steps.ts`, **không đụng vào mã**.

→ Quy trình 6 bước, yêu cầu gửi Thanh khi xin bản quay, và bảng soi trước khi trình: [`refs/HDSD_THAO_TAC.md`](refs/HDSD_THAO_TAC.md).

### 2. VIDEO ĐIỂM TIN (Market News)
- Screenshots: Dùng làm background (blur) và hiển thị thông tin VNI, Bảng giá, Biểu đồ RRG.
- Ưu tiên Focus vào Animation nảy lên Data Cards khớp với số liệu người đọc giọng nam truyền cảm/news.

### 3. VIDEO VLOG / SHORTS
- Focus vào phụ đề và từ khoá "Tâm Điểm" nhảy vọt lên màn hình. 
- Giữ sự sôi động, nhịp độ cắt nhanh.

---

## Pipeline Sản Xuất (Sentence-Driven)

### BƯỚC 1: KIỂM TRA CHÍNH TẢ + PHIÊN ÂM
**Thực hiện:**
1. Rà soát chuẩn hoá kịch bản (viết liên tục, flow tự nhiên).
2. Load `pronunciation_vi.json` (quét từ lạ, mã CK, tên riêng).
3. Bảng liệt kê: Từ ĐÃ CÓ (hiển thị) và Từ CHƯA CÓ (đề xuất phát âm, hỏi duyệt).
4. Sửa file JSON phát âm.
5. Tạo `script_display.txt` (chính tả đúng) và `script_tts.txt` (trick Vbee).

**GATE:** Trình Thanh bảng phát âm + 2 file script. Chờ duyệt.

### BƯỚC 1.5: TÁCH CÂU + MARKUP NHỊP ĐỌC (MỚI — bắt buộc từ 2026-04-15)
**Thực hiện:**
1. Parse `script_display.txt` → `sentences.json`.
2. Ranh giới câu = dấu `.` `?` `!`. Câu >25 từ → tách tại dấu phẩy trọng yếu. Câu <6 từ cùng ý câu sau → gộp.
3. Mỗi câu gắn:
   - `id`: `s01, s02, ...` (zero-padded)
   - `phase`: HOOK / PROBLEM / AGITATE / SOLVE / ACTION (hoặc phase của framework đang dùng)
   - `main_idea`: ≤5 từ — anchor cho visual ở B4. Không trùng với câu trước/sau.
   - `enum_items`: nếu câu là liệt kê (`thứ nhất..., thứ hai..., ...` hoặc `, ..., ... và ...`)
   - `pause_before_ms`, `pause_after_ms`: silence padding khi stitch
   - `speed`: speed override Vbee cho câu này (default 0.85)
4. Update `script_tts.txt`: mỗi câu prefix header markup:
   ```
   [s01 | pause_before=0 | pause_after=400 | speed=0.85]
   Nội dung câu, dùng "," cho nhịp 150ms, dùng "…" cho nhịp 600ms.

   [s02 | pause_before=0 | pause_after=500 | speed=0.85]
   Nội dung câu tiếp theo.
   ```

**pause_after_ms tham khảo:**
- Cuối phase (chuyển HOOK→PROBLEM…): 600-800ms
- Cuối câu bình thường: 250-400ms
- Giữa 2 câu cùng ý / liệt kê nối tiếp: 150-200ms
- Câu chốt CTA cuối: 0

**GATE:** Trình bảng `sentences.json` (id | phase | tts | main_idea | enum? | pause_after). Chờ duyệt.

### BƯỚC 2: TẠO AUDIO PER-SENTENCE (VBEE TTS + WHISPER)
**Thực hiện:**
1. Loop qua `sentences.json`, cho mỗi câu:
   - Gọi `_shared/vbee/gen_tts.sh` với `tts` text + `speed` per-sentence → `audio/{id}.mp3`
   - Chạy Whisper với `word_timestamps=True` → `audio/{id}.json` (word timestamps trong phạm vi câu, offset 0)
2. Populate `duration_s` và `word_timestamps` vào `sentences.json` cho từng câu.
3. Tổng duration check: `Σ (duration_s + pause_after_ms/1000)` ≈ target duration kịch bản.

**GATE:** Trình bảng `{id, duration_s, word_count, lỗi phát âm nếu có}`. Thanh nghe vài câu spot-check. Chờ duyệt.

### BƯỚC 3: THU THẬP HÌNH ẢNH (theo Asset Manifest của Bước 4)
> 🔴 **Thứ tự đúng: Bước 4 (storyboard) tính ra cần ảnh gì → Bước 3 thu thập → Bước 5 render.** KHÔNG mặc định vẽ code hết rồi chèn ảnh ngược giữa chừng (gây re-render nhiều lần — đã vấp ở video "Cái bẫy giá rẻ" 04/06). B3 thực chất chạy SAU khi có Asset Manifest từ B4 (chỉ video HDSD screens-tư-liệu mới làm B3 trước).

**Thực hiện:**
1. Lấy **Asset Manifest** từ Bước 4 (các dòng `photo:` / `bg:`). Tạo thư mục `screen-shot/`.
2. Trình Thanh danh sách hình cần: tên file + scene dùng + mô tả ảnh (vd. "munger.png — chân dung Charlie Munger, dùng card + ảnh nền scene s10").
3. Đợi Thanh thả đúng các file đó vào `screen-shot/`. Scene `code` không cần chờ hình.
4. (Video HDSD) screens tư liệu app theo **Quy định Riêng** (zoom/chỉ mũi tên).

**GATE:** Đối chiếu Asset Manifest — đủ tất cả file `photo`/`bg` mới qua Bước 5. Thiếu file nào thì hỏi Thanh, không tự vẽ thay.

#### BƯỚC 3-GEMINI: GEN HÌNH BẰNG GEMINI (cho asset `photo:`/`bg:` không phải screenshot app)

> Khi Asset Manifest cần ảnh KHÔNG phải màn hình app thật (cảnh minh hoạ, metaphor, bối cảnh không khí, chân dung danh nhân) → **không chờ Thanh đi tìm ảnh**, mà sinh **prompt Gemini đúng vân tay KFSP** để Thanh gen rồi thả vào `screen-shot/`. Đây là cầu nối pipeline video ↔ bộ image-styles marketing.

**🔴 Nguồn vân tay hình (đọc/trích trước khi viết prompt — KHÔNG bịa màu/kiểu):**
- `02_Marketing/Brand/Image_Styles/kfsp_image_styles.json` — brand tokens + 5 kiểu hình + luật chữ Việt (máy đọc).
- `02_Marketing/Brand/Image_Styles/KFSP_Image_Styles.md` — bản người đọc.
- Skill **`kfsp-image-brief`** — sinh prompt Gemini chuẩn; cần nhiều prompt/đúng kiểu thì gọi skill này rồi chỉnh theo 6 điểm video dưới.
- Ảnh mẫu gốc: `02_Marketing/sample img/`.

**Map asset video → kiểu hình KFSP:**
| Asset trong manifest | Kiểu KFSP | Ghi chú cho VIDEO |
|---|---|---|
| Cảnh metaphor / tư duy / bối cảnh cảm xúc (quê, before-after, hành trình) | **Kiểu 4 Storytelling** (flat-vector, silhouette, ≥1 relevance anchor) | hợp HOOK / bridge kể chuyện |
| Bảng nhiều mô hình nến/giá (1 ảnh tổng) | Kiểu 1 (nền tối) / Kiểu 2 (nền sáng) | video thường tự vẽ nến = `code`; chỉ dùng ảnh khi làm cover/thumbnail |
| 1 chart chỉ báo tĩnh làm nền | Kiểu 3 Hero Indicator | thường ưu tiên `code` để animate được |
| Chân dung danh nhân / thương hiệu / bằng chứng | ảnh thật (photo card) | Buffett, O'Neil... — gen hoặc lấy ảnh thật |

**🔴 6 khác biệt prompt cho VIDEO (so với ảnh fanpage tĩnh 4:5):**
1. **Khung `9:16 vertical` (1080×1920)**, KHÔNG 4:5 — trừ khi ảnh chỉ là card nhỏ chèn giữa khung.
2. **`bg:` = nền sẽ bị phủ overlay tím + chữ + nến code** → yêu cầu **tông trầm hơn, ít chi tiết vùng giữa/dưới**, chừa khoảng trống cho subtitle (y 1380–1470). Prompt ghi: *"darker, low-contrast, leave clear negative space in the center and bottom third for overlaid text and charts."*
3. **KHÔNG bake chữ vào ảnh** (tít + nhãn do Remotion render động khớp giọng). Prompt: *"No text, no letters, no logo."*
4. **An toàn vùng:** chủ thể chính trong y 150–1500; tránh nhồi chi tiết sát mép trên/dưới (overlay tím + progress bar che).
5. **Nhất quán nến:** nếu ảnh có nến, dùng **xanh `#34d399` / đỏ `#f87171`** (mã VIDEO, khác mã ảnh tĩnh `#22C55E`/`#EF4444`) để khớp chart code trong video.
6. **Ảnh gen ra KHÔNG được có logo:** logo và lớp phủ tím do BrandFrame lo, chèn sẵn vào ảnh là chồng hai lớp. Prompt luôn ghi *"no logo"*.

**Quy trình:**
1. Lọc các dòng `photo:`/`bg:` trong manifest KHÔNG phải screenshot app.
2. Mỗi asset → 1 prompt Gemini (theo map trên, hoặc gọi `kfsp-image-brief` rồi chỉnh 6 điểm video). Prompt tiếng Anh sẵn dán, ghi rõ 9:16, no text, no logo, tông phù hợp overlay.
3. Trình Thanh bảng: `tên file | scene | prompt | (chuỗi chữ Việt nếu BẮT BUỘC bake)`.
4. Thanh gen trên Gemini → thả vào `screen-shot/` đúng tên file manifest. Lỗi dấu chữ (nếu bake) → sửa Canva.
5. Quay lại GATE Bước 3 (đối chiếu đủ file) → Bước 5.

> Ảnh dùng nhiều cảnh (vd 1 bg quê cho cả hook + callback mờ) chỉ gen 1 lần; trong code chỉnh opacity/blur cho cảnh callback.

### BƯỚC 4: LẬP PLAN STORYBOARD PER-SENTENCE (BẮT BUỘC)
**Thực hiện:**
1. Dựa trên `sentences.json` (đã có duration + word_timestamps) lập 1 bảng duy nhất — **mỗi row = 1 câu**.
2. Copy cấu trúc từ `.claude/skills/video-kfsp/PLAN_STORYBOARD_TEMPLATE.md` (bảng Sentence Storyboard).
3. Các cột bắt buộc:
   - `id` | `phase` | `tts` | `main_idea` | `duration` | `visual_anchor` | `asset` | `animation` | `enum_beats` | `sfx`
   - **`asset`** (🔴 BẮT BUỘC, quyết nguồn hình mỗi scene): `code` (vẽ bằng Remotion/SVG/CSS, không cần ảnh) · `photo:<tên-file>.png` (ảnh thật Thanh phải cung cấp, hiện dạng card) · `bg:<tên-file>.png` (ảnh nền mờ + overlay navy). 1 scene có thể vừa `photo` vừa `bg` cùng 1 ảnh.
4. **Enum beats**: nếu câu có `enum_items`, ghi rõ `"X"@f{n}, "Y"@f{n}, "Z"@f{n}` (frame relative to câu, lấy từ whisper word timestamps). Element phải pop đúng frame này, lệch ≤2f.
5. **🔴 SHOT SPEC chi tiết (BẮT BUỘC — thay cho "visual anchor 1 dòng")**: mỗi beat KHÔNG được mô tả cụt kiểu *"1 nến sống: giá bị đẩy xa"*. Phải viết **spec đủ chi tiết để build thẳng, không phải đoán** — ngang mức chi tiết khi dựng Figma. Mỗi beat 1 block gồm **5 mục**:
   - **① Bố cục (layout + toạ độ):** chia vùng màn 1080×1920 — tiêu đề (y?), vùng minh hoạ chính (x,y,w,h), nhãn/chips (y?). Ghi toạ độ thật.
   - **② Phần tử + DỮ LIỆU CHÍNH XÁC:** liệt kê từng phần tử vẽ. Nếu là nến → ghi **OHLC từng cây** (thang giá 0..100) + màu (#hex) + cây nào glow. Nếu mũi tên → ghi điểm đầu→điểm cuối + màu. Nếu badge/chip → text + màu + vị trí. KHÔNG bỏ lửng "vài cây nến".
   - **③ Animation keyframe (theo CHỮ, không phải "pop đẹp"):** ghi mốc theo từ trong câu — *từ "đẩy xa" (f?) → bóng nến kéo dài từ y=A xuống y=B; từ "kéo ngược" (f?) → thân co từ h=X về h=Y, mũi tên chạy ngược*. Mỗi chuyển động ghi rõ **cái gì, từ đâu, tới đâu, frame nào** (lấy từ word_timestamps).
   - **④ Chữ on-screen:** text chính xác + vị trí + màu/size.
   - **⑤ Vì sao minh hoạ này khớp Ý câu:** 1 câu — nối visual ↔ main_idea (chống minh hoạ lạc).
   - Cấm "minh hoạ cả đoạn", cấm đè visual câu trước. Cột bảng `visual_anchor` chỉ ghi tóm tắt 1 dòng; SHOT SPEC chi tiết viết Ở DƯỚI bảng, mỗi beat 1 block (xem ví dụ trong PLAN_STORYBOARD_TEMPLATE mục 7c).
   - **🔴 Với video CƠ CHẾ / khái niệm động (nến đảo chiều, gộp nến, price action):** beat cơ chế phải mô tả **giá ĐANG diễn ra** (đẩy/kéo/khựng/áp đảo) bằng nến biến đổi + mũi tên có hướng — KHÔNG để nến đứng yên. Tên mẫu hình hiện ĐÚNG nhịp đọc (enum). Bài học từ video "4 nhóm nến đảo chiều" (26/06): storyboard mô tả cụt → minh hoạ build ra "sơ sài", phải làm lại nhiều vòng.
5b. **Asset Manifest (Bảng hình cần cung cấp)** — gom mọi dòng có `photo:`/`bg:` thành 1 bảng riêng: `tên file | scene dùng | mô tả ảnh cần`. Đây là phần TRÌNH THANH ở cuối B4 để gửi ảnh cho Bước 3. Mặc định ưu tiên `code`; chỉ đề xuất `photo`/`bg` khi ảnh thật làm scene mạnh hơn hẳn (nhân vật có thật, thương hiệu, bằng chứng). Quyết code-vs-photo phải xong Ở ĐÂY, không để giữa lúc render.
6. **ỨNG DỤNG BẮT BUỘC 5 THƯ VIỆN REMOTION** (giữ nguyên như cũ):
   - `remocn` — motion blocks (DeviceMockupZoom, PulsingIndicator, BlurReveal...)
   - `remotion-ui` — 25+ components, particles, gradient animation
   - `remotion-animated` — declarative Fade/Scale/Move
   - `@remotion/lottie` — assets từ LottieFiles
   - `@remotion/transitions` — chuyển cảnh chuyên nghiệp
7. **Bảng QA Audit** — 24 mục, có 4 mục sentence-driven:
   - Sentence atomicity: mỗi câu là 1 clip riêng, không transition đè ranh giới câu
   - Main idea match: visual câu X minh hoạ đúng `main_idea` (không phải X-1/X+1)
   - Enum beat sync: câu liệt kê pop đúng word timestamp ±2 frames
   - Stitch gap: silence padding khớp `pause_after_ms`, không hụt/dư

**GATE:** Chỉ đi tiếp khi Thanh duyệt: Sentence Storyboard + QA Audit + **Asset Manifest** (chốt scene nào `code`, scene nào chờ ảnh Thanh gửi). Sau GATE này mới quay lại Bước 3 thu thập ảnh, rồi Bước 5.

### BƯỚC 5: RENDER PER-SENTENCE + STITCH (BẮT BUỘC)
> 🔴 **TRƯỚC KHI RENDER: đọc [`refs/LOI_RENDER.md`](refs/LOI_RENDER.md)** — các lỗi đã vấp + cách phòng.
>
> 🔴 **QA phải QUÉT TOÀN BỘ KHUNG BẰNG MÁY, không chỉ soi vài khung chọn tay** (đúc 06/08, xem L73). Bộ khung chọn tay bao giờ cũng thưa, mà lỗi hay rơi đúng vào khe giữa hai khung được chọn — một dự án bắt được **sáu lỗ** kiểu đó, không lỗ nào lọt vào bộ khung soi. Cách làm, tốn khoảng hai phút:
> 1. Dựng bản nháp cả video ở `--scale=0.25` vào thư mục tạm (không phải bản giao).
> 2. `ffmpeg` trích toàn bộ khung ra ảnh nhỏ.
> 3. Đo hai đại lượng: **chênh lệch điểm ảnh trung bình giữa hai khung liền** (vượt 6 lần TRUNG VỊ của chính video đó = có cú giống cắt cứng hoặc vật nhảy cỡ) và **độ lệch điểm ảnh trong từng khung** (dưới 9 = khung gần như trơn, tức trống).
> 4. Phân biệt lỗi với chuyển động thật: **lỗi vọt lên đúng một khung rồi tụt; chuyển động thật giữ giá trị cao trải đều nhiều khung liên tiếp.**
>
> Rồi mới render still từng cảnh để soi chất bằng mắt.

**Thực hiện:**
1. **Code**: mỗi câu 1 file `remotion-{video}/src/sentences/Sentence{ID}.tsx`:
   - `durationInFrames = Math.ceil(duration_s × 30)`
   - Composition chỉ chứa visual cho câu đó, frame offset về 0
   - Audio prop: `audio/{id}.mp3`
2. **Render từng câu**:
   ```bash
   npx remotion render Sentence{ID} --output=./clips/{id}.mp4
   ```
3. **Gate theo phase PASA** (thay vì gate cuối):
   - Render hết các câu của HOOK → Thanh xem batch `clips/s01.mp4, s02.mp4, …` của phase HOOK → duyệt
   - Render hết các câu của PROBLEM → duyệt
   - ... tương tự AGITATE, SOLVE, ACTION
4. **Stitch** sau khi tất cả phase OK:
   ```bash
   # Tạo concat list với silence padding giữa câu
   # Silence padding = pause_after_ms của câu trước
   ffmpeg -f concat -safe 0 -i concat_list.txt -c copy final.mp4
   ```
5. Output cuối: `output/{YYYYMMDD}/{name}.mp4`

**GATE:** (1) mỗi phase PASA render xong. (2) final stitched video.

### BƯỚC 6: CHỈNH SỬA ATOMIC
Dựa trên Feedback, sửa theo phạm vi câu:
- **Sửa audio câu X** → re-gen Vbee + whisper CHỈ câu X → `audio/{id}.mp3` mới → re-render clip X → re-stitch final.
- **Sửa animation câu X** → edit `Sentence{X}.tsx` → re-render clip X → re-stitch final.
- **Sửa main_idea/visual_anchor câu X** → update `sentences.json` + storyboard → edit `Sentence{X}.tsx` → re-render → re-stitch.
- **Sửa nhịp đọc/ngắt nghỉ câu X** → update `pause_after_ms` trong `sentences.json` → regenerate concat list → re-stitch (KHÔNG cần re-render).
- **CẤM**: re-render các câu khác. CẤM re-render toàn bộ.

---

## Schema `sentences.json`

```json
{
  "videoId": "20260420-ten-video",
  "framework": "PASA",
  "sentences": [
    {
      "id": "s01",
      "phase": "HOOK",
      "display": "Bạn có thấy choáng khi mở bảng giá?",
      "tts": "Bạn có thấy choáng khi mở bảng giá?",
      "main_idea": "choáng bảng giá",
      "enum_items": null,
      "pause_before_ms": 0,
      "pause_after_ms": 300,
      "speed": 0.9,
      "duration_s": 2.1,
      "word_timestamps": [
        {"word": "Bạn", "start": 0.0, "end": 0.18},
        {"word": "có", "start": 0.18, "end": 0.32}
      ]
    }
  ]
}
```

## Folder structure 1 video

```
{YYYYMMDD}-{ten}/
├── kich ban.md
├── script_display.txt
├── script_tts.txt              ← có markup [sXX | pause=... | speed=...]
├── sentences.json              ← tạo ở B1.5, populate ở B2
├── screen-shot/
├── audio/                      ← per-sentence
│   ├── s01.mp3
│   ├── s01.json                (whisper của câu s01, offset 0)
│   ├── s02.mp3
│   └── s02.json
├── clips/                      ← per-sentence render output
│   ├── s01.mp4
│   └── s02.mp4
├── final.mp4                   ← stitched cuối cùng
└── PLAN_STORYBOARD.md          ← bảng Sentence Storyboard
```

---

## Style Guide Chung - MAU 1
- Background: dark navy thuần (#0a1628), radial gradient nhẹ
- Padding safe zone TikTok: Tránh che Header trên cùng và UI Reaction bên phải.
- Highlight Keywords: xanh (#34d399) = tăng, đỏ (#f87171) = giảm, vàng (#f5c542) = điểm nhấn.
- Glass cards: bg rgba(255,255,255,0.04), border 1px, blur 10px, radius 16px

---

## Style Guide MAU 2 - Foundations Series (CANSLIM/Education)

> Dùng cho video mở series, teaser/reveal, education concept-heavy. Lần đầu áp dụng ở `canslim-01-tai-sao-can-quan-tam/`.

- **Background**: dark forest green (#03100a), radial gradient `#0a2418 0% → #03100a 70%` center 50%/40%.
- **Framework**: Hook-Value-CTA (teaser/reveal) thay PASA. Reveal key concept ở cuối VALUE — pause 200ms ngay trước key word + decisive snap + zoom + particles.
- **Voice mode**: Self-recorded — gen Vbee Thanh Long FULL audio (1 call, speed 0.95) làm timing reference, anh thu đè sau.
- **Logo top**: KFSP PNG (silhouette trắng filter `brightness(0) invert(1)`) + text "KFSP" trắng. Y=158, size 78px.
- **Color convention CANSLIM**: NỘI TẠI = purple (#a78bfa) = CAN = CHẤT XÚC TÁC; THỊ TRƯỜNG = gold (#f5c542) = SLIM = PHẢN ỨNG THỊ TRƯỜNG.
- **Box thiết kế**: gradient border (135deg), inner radial glow, 4 corner accent brackets, abstract SVG symbol giữa (core hexagon nest cho NỘI TẠI / wave ascending cho THỊ TRƯỜNG), divider line draw-in, 3 dots indicator dưới đáy. Không dùng emoji icons.
- **Subtitle**: Dùng `sentence.display` (chính tả đúng) làm text, map sang `word_timestamps` (Whisper) cho timing. Nếu count khớp → 1-1; lệch → distribute đều theo span.
- **Reveal moment**: 2 vế NỘI TẠI/THỊ TRƯỜNG converge → 24 particles burst (purple+gold xen kẽ) → 7 letter cards (3 purple `?` C-A-N + 4 gold `?` S-L-I-M) → labels "CHẤT XÚC TÁC" / "PHẢN ỨNG THỊ TRƯỜNG" → cards flip rotateY reveal letters → CANSLIM giant text (purple CAN + gold SLIM, 2 spans riêng để tránh chữ N gradient cắt giữa) → O'Neil portrait.
- **Compositions**: 1 `FullPreview` (Series chuỗi 17 câu + silence padding) + N `Sentence-sXX`. ProgressBar OUT khỏi SentenceShell (wrap riêng vì useCurrentFrame trong Series.Sequence là local).
- **Port Remotion**: per-video, không trùng. canslim-01=3010, canslim-02=3011, …
- **Setup mới**: CẤM `npm install` — copy `node_modules` từ video gần nhất.

---

## Agent Prompt — copy-paste cho agent khác (full self-contained)

> Khi anh muốn nhờ agent khác (Cursor/ChatGPT/Claude session mới) làm video #02, #03 trong series, copy nguyên block prompt này + đính kèm `script_display.md`. Block đầy đủ ngữ cảnh + design system + pipeline + lỗi thường gặp.

> **Nguồn:** `CLAUDE.md` Section 15 — đọc đoạn ` ```` ... ```` ` ở cuối file. Block đó độc lập, không phụ thuộc vào CLAUDE.md.

> **Tham chiếu template:** `canslim-01-tai-sao-can-quan-tam/` chứa đầy đủ:
> - `script_display.md` — kịch bản gốc
> - `script_tts.txt` — script gửi Vbee có phiên âm
> - `sentences.json` — schema sentence-driven đã populate (duration_s, word_timestamps, enum_beats)
> - `PLAN_STORYBOARD.md` — bảng storyboard sentence-driven 17 row + QA audit 24 mục
> - `scripts/run_whisper.py`, `align_sentences_v2.py`, `stitch_preview.py` — reusable Python scripts
> - `remotion-canslim01/src/` — Remotion project: design.ts, types.ts, data.ts, Root.tsx, SentenceShell.tsx, FullPreview.tsx, SubtitleBar.tsx, components/ (Background, Logo, Stage, Chip, MiniChart, ProgressBar), sentences/ (Hook.tsx, Value.tsx, CTA.tsx)

---
