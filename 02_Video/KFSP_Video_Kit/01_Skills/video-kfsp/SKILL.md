---
name: video-kfsp
description: "Tạo mọi loại video tự động (Điểm tin, HDSD, Vlog,...) bằng Remotion. Có các quy định nghiêm ngặt về vùng an toàn, animation và subtitle chuẩn TikTok."
argument-hint: (không cần argument — skill sẽ hỏi thông tin)
user-invocable: true
---

> 📍 **Codebase location:** Toàn bộ engine + `_shared/` (Vbee, phiên âm, scripts Python) + per-video folder (node_modules, screen-shot, clips, final.mp4) sống ở **`~/Desktop/VIDEO KFSP/`** — KHÔNG trong workspace OneDrive (tránh sync GB). Bản skill này chỉ để Claude trigger; mọi bước pipeline (TTS, Whisper, Remotion render, stitch) chạy `cd ~/Desktop/VIDEO\ KFSP/<folder-tập>`. Đường dẫn trong file dưới đây là tương đối với folder Desktop đó. Tổng quan: [`02_Marketing/content-automation/VIDEO_SYSTEM.md`](../../../02_Marketing/content-automation/VIDEO_SYSTEM.md).

> 📚 **REF chuyên đề (đọc khi đúng chủ đề để tiết kiệm token):**
> - Video về **NẾN / mẫu hình nến / gộp nến / Búa–Sao băng / vai đầu vai** → đọc [`refs/CANDLE_NEN.md`](refs/CANDLE_NEN.md) (quy tắc OHLC + gộp + nguồn Figma + bố cục màn liệt kê + bài học nội dung). KHÔNG cần đọc cả SKILL.md cho loại video này.

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
   - **🔴 CÂU BRAND SPINE (BẮT BUỘC, Thanh chốt 13/06):** mọi video phải hiện câu **"Đưa chứng khoán về tầm tay bạn"** hoặc tagline **"Chứng khoán trong tầm tay"** ở **khung cuối / CTA** — hiện TRÊN HÌNH (overlay), không lệ thuộc giọng đọc. Dùng cả brand & nobrand. Nguồn: `02_Marketing/KFSP_MARKETING_CONTEXT.md` Module 3.4.

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

Mọi video (brand & nobrand) PHẢI có **lớp phủ gradient tím brand trên + dưới** để nhìn 1 phát nhận ra KFSP. Component tái dùng: **`_shared/remotion/BrandFrame.tsx`** (đóng băng 2026-06-05 từ video "4 điểm vào lệnh").

- **Brand tokens — lấy từ app** (`KFSP_App_Flutter/lib/core/constants/kfsp_colors.dart`), KHÔNG bịa/đoán:
  - Tím chính `#7B3AEC` (primary) · Tím sáng `#AA75FF` (primaryLight, dùng cho **tiêu đề** trên nền tối) · Tím đậm `#5B20CC`.
  - ⚠️ KHÔNG dùng `#951B81` (magenta cũ ở `Brand/MÃ MÀU.txt`) — đã lệch brand, app dùng violet `#7B3AEC`.
  - Nến xanh `#34d399` / đỏ `#f87171`, nhấn vàng `#f5c542`, nền navy `#0a1628`.
- **Overlay:** gradient `rgba(123,58,236,a)` → trong suốt; trên cao 380px (a 0.40→0), dưới cao 480px (a 0.46→0). Nhẹ, tinh tế, không che nội dung.
- **Logo:** KFSP **màu TRẮNG** (filter `brightness(0) invert(1)` + drop-shadow), top-center y=78, trong safe zone.
- **Brand-status = theo KÊNH:** KFSP = brand (logo hiện) · "Chứng khoán trong tầm tay" = nobrand (ẩn logo). **Chỉ khác có logo hay không — overlay tím GIỮ Ở CẢ HAI.** Toggle bằng 1 flag `const NOBRAND` + `<BrandLogo nobrand={NOBRAND} />`.
- **Tiêu đề kèm số thứ tự** (1/2/3/4): badge số + tiêu đề nằm **cùng 1 dòng, căn trái** (thẳng hàng), KHÔNG để số lệch dưới tiêu đề căn giữa.
- **Thứ tự layer trong `<Main>`:** scenes → `<BrandOverlay/>` → `<Subtitle/>` → `<BrandLogo/>` → `<Progress/>`.
- ⚙️ **Import component từ `_shared/`** (vd `BrandFrame.tsx`): đường dẫn từ `<tập>/<brand|nobrand>/src/` là `../../../_shared/remotion/...`; cần symlink `_shared/node_modules` (đã tạo, trỏ về node_modules video gần nhất) để bundler resolve font/remotion.

---

## 🎯 QUY ĐỊNH RIÊNG THEO LOẠI VIDEO

### 1. VIDEO HƯỚNG DẪN SỬ DỤNG (Tutorials - HDSD)
- **Hình ảnh App:** Hình tư liệu app phải được **Phóng to (Zoom-in)** thẳng vào khu vực đang được nhắc tới trên giao diện tương tác.
- **Minh họa thao tác (On-screen Pointers):** Trực tiếp trên màn hình bản chụp (Screenshot), BẮT BUỘC phải vẽ thêm các mũi tên đỏ, vòng tròn highlight hoặc con trỏ chuột hướng dẫn chỉ đúng vào nút bấm/khu vực đang nói tới. Trông như một video quay màn hình thao tác thật.

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
6. **Nobrand vs brand:** kênh Chứng khoán trong tầm tay = **không logo trong ảnh** (logo + overlay do BrandFrame xử lý). Prompt luôn *"no logo"*.

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
> 🔴 **TRƯỚC KHI RENDER: đọc mục [🐞 LỖI THƯỜNG GẶP](#-lỗi-thường-gặp-khi-render-đọc-trước-b5) ở cuối file** — các lỗi đã vấp + cách phòng. Render 1 still frame mỗi scene để QA trước khi render full.

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

## 📺 DESCRIPTION YOUTUBE — chuẩn SEO + GEO (sau khi có final.mp4)

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

## 🐞 LỖI THƯỜNG GẶP KHI RENDER (đọc trước B5)

> Kho lỗi đã vấp + cách phòng. **Mỗi lần dựng video, đọc mục này trước khi render**; gặp lỗi mới → thêm vào đây (không tạo doc tách).

| # | Triệu chứng | Nguyên nhân | Cách xử lý |
|---|---|---|---|
| L1 | **Nút/pill/tag/CTA chữ nhảy 2 dòng** (vd nút "Follow để xem tiếp" wrap xấu) | div không khoá 1 dòng → text wrap khi hẹp | LUÔN set **`whiteSpace: "nowrap"`** cho mọi button/pill/tag 1 dòng. Nếu vẫn tràn mép → giảm `fontSize` hoặc nới `width` container, KHÔNG để wrap. (Component `Tag` đã có nowrap; copy quy tắc này cho mọi badge/CTA tự viết.) — vấp ở video "5 mẫu nến" 13/06. |
| L2 | **Cảnh so sánh 2 chiều vẽ cùng hình** (vd "sắp giảm" và "sắp đáy" đều ra chữ V) | bê 1 builder cho cả 2 vế | Hai khái niệm đối nghịch phải vẽ **ngược chiều nhau**: đáy/tăng = chữ **V** (giảm→tăng); đỉnh/giảm = chữ **Λ** (tăng→giảm). Mirror nhau mới đọc đúng ý. — vấp ở "5 mẫu nến" s05. |
| L3 | Chữ Việt render lỗi dấu trong ảnh Gemini bake | Gemini sai dấu chuỗi dài | Không bake chữ vào ảnh video (render động bằng Remotion); nếu buộc bake → sửa Canva, giữ layout. |
| L4 | Mẫu nến vẽ bằng `line`/zig-zag nhìn xấu, lệch chuẩn | dùng polyline thay nến | Mẫu nến luôn vẽ bằng **nến OHLC đầy đủ** (đỏ giảm dẫn vào + xanh phục hồi), khớp rule hình KFSP. |
| L5 | Re-render toàn bộ khi chỉ sửa 1 cảnh tốn thời gian | quên atomic | Video monolithic (1 Main) thì buộc render lại cả — chấp nhận; video per-sentence thật thì chỉ re-render clip đổi rồi re-stitch (B6). |
| L6 | **Tiếng/từ CUỐI bị cắt cụt** | Whisper hay báo `end` của từ cuối **sớm hơn tiếng thật** (vd báo 89.36s nhưng tiếng chạy tới 90.9s) → set `durationInFrames` theo whisper là hụt đuôi | Đừng tin whisper cho mốc cuối. **Đo điểm kết thúc tiếng thật** bằng `ffmpeg -af silencedetect=noise=-40dB:d=0.4` → lấy `silence_start` cuối; set video duration = điểm đó + 0.4–0.6s buffer. Nới luôn `cend` chunk subtitle cuối cho karaoke phủ hết đuôi. — vấp ở "5 mẫu nến" 13/06. |
| L7 | **Giọng nghe "ngắt ngắt" giữa câu** | Vbee chèn khoảng lặng dài (~1.2–1.4s) ở mỗi dấu chấm, nhất là khi text gen có dòng trống giữa đoạn | Siết khoảng lặng: từ whisper words, cắt audio tại gap ≥0.5s, ghép lại với silence cố định ~0.24s (concat qua WAV tránh DTS warning), rồi **tính lại toàn bộ timeline** (data.json + scene + SFX). Hoặc gen lại Vbee với text liền mạch không dòng trống. — "5 mẫu nến" 13/06. |
| L8 | **SFX chỉ có ở vài màn (vd chỉ cảnh nến), các màn hook/bridge/closing im** | quên rằng SFX phải phủ TOÀN BỘ scene, không chỉ scene "rõ beat" | 🔴 **SFX ở MỌI MÀN HÌNH** là mặc định: mỗi scene tối thiểu có 1 âm (transition whoosh nhẹ ~0.12–0.16 khi vào, hoặc pop/ting/click theo hành động trong scene). Lập **bảng SFX phủ đủ 15 câu** ở B4 (cột `sfx` không được trống). Mix: BGM 0.08, SFX 0.12–0.3, voice peak 0dB. Synth nhanh bằng ffmpeg nếu không có asset (sine→click/ting, anoisesrc→whoosh). — vấp ở "5 mẫu nến" 13/06 (lần đầu chỉ có SFX ở scene nến). |
| **L9** 🔴 | **Minh hoạ mẫu hình vẽ bằng code nhìn "tệ/giả"** — Thanh chê "càng làm càng tệ" | tự vẽ nến/chart tổng hợp bằng Remotion/SVG → generic, thiếu chất thật | **ASSET-FIRST bắt buộc cho video dạy mẫu hình giá** (xem callout dưới bảng): ảnh app THẬT đã chú thích làm HERO + schematic tách SẠCH từ Figma. Chuyển động = zoom/pan/spotlight/callout/vẽ-tay TRÊN ảnh; KHÔNG redraw nến. — "Hai đáy Bài 1" 03/07 (2 vòng nến-code bị bỏ). |
| **L10** 🔴 | **Hình chuyển "vội", lệch giọng — cảnh đổi TRƯỚC khi voice nói tới** | mốc câu lấy từ **whisper word-timings TRÔI SỚM 1–2s** (sai số cộng dồn theo câu) | **KHÔNG tin mốc whisper.** Căn lại `full_start_s` từ **khoảng lặng THẬT**: `ffmpeg -i voice.mp3 -af silencedetect=noise=-32dB:d=0.35` → speech onset = `silence_end` sau mỗi gap ranh giới câu → scene start = **onset − 0.15s**. Đối chiếu bảng silence vs sentences TRƯỚC render. — "Hai đáy Bài 1" 03/07 (câu 5 lệch 1.9s). *(khác L6: L6 chỉ về từ CUỐI; L10 về toàn bộ mốc câu.)* |
| **L11** 🔴 | **Chớp đen giữa các cảnh** | mỗi Sequence fade từ opacity 0 ở ranh giới → lộ nền root đen ~6 frame | **Crossfade CHỒNG cảnh**: kéo dài mỗi cảnh thêm `XFADE≈9f`, cảnh sau nằm TRÊN fade-in đè cảnh trước (cảnh đầu `op=1`); tiling khít bằng `froms[i+1]−froms[i]`. Không để cảnh về opacity 0 giữa timeline. — "Hai đáy Bài 1" 03/07. |
| **L12** | **Lộ mã cổ phiếu trên chart (phím hàng — vi phạm compliance)** | screenshot app còn nguyên thanh mã/tên/nav | **Che mã = mặc định mọi chart**: cắt khung sát vùng nến (ảnh dọc hi-res) hoặc **pre-crop ffmpeg** (mockup vuông) bỏ thanh tìm-kiếm-mã + tên công ty + nav mã dưới. Nhãn dạy (Đáy 1/2, viền cổ) giữ được. **Ngoại lệ:** cover brand chính thức (Thanh chốt để nguyên). — "Hai đáy Bài 1" 03/07. |
| **L13** | **Spotlight đoạn xu hướng chéo bằng 1 vòng tròn → không phủ hết tới đáy** | vòng tròn đơn chỉ sáng 1 điểm | Rải **nhiều điểm sáng mềm dọc đường** (`Spot` nhiều `holes` blur, `ring=false`) → thành 1 VỆT kéo tới **sát đáy**. — "Hai đáy Bài 1" 03/07 (Thanh: "giảm rõ rệt cần spotlight đến sát đáy"). |
| **L14** 🔴 | **Kẹt lấy ảnh Figma vì `403 Token expired`** → tưởng phải đi xin token mới | nhầm REST API là đường lấy ảnh duy nhất | **Token REST hết hạn KHÔNG chặn lấy ảnh.** WebSocket bridge độc lập REST → `figma_execute` + `exportAsync` + POST localhost vẫn chạy. Xem [`refs/FIGMA_EXPORT.md`](refs/FIGMA_EXPORT.md). — "Hộp chữ nhật Bài 1" 17/07 (Thanh: *"dùng plugin chứ sao lại qua api"*). |
| **L15** | **Ảnh Figma qua base64 ngốn hàng trăm nghìn token** | trả base64 về context rồi decode | POST thẳng plugin → server local → `public/`. Ảnh không qua context. — 17/07. |
| **L18** 🔴🔴 | **SỐ trên ảnh tái dùng CHỎI với số trong lời đọc** — giọng nói "ý tưởng HAI" mà panel hiện "3 · Đảo chiều", header hiện "②" ngay cạnh → người xem thấy sai ngay | Ảnh lấy từ bài **fanpage cũ** đánh số theo thứ tự cũ; lời đọc video đã **đảo thứ tự** (rev3 đổi ý②=đảo chiều, ý③=tiếp diễn). Remap đúng *nội dung* nhưng quên *con số IN TRÊN ẢNH* | 🔴 **Tái dùng ảnh có ĐÁNH SỐ = phải kiểm số khớp lời đọc TRƯỚC khi dựng.** Nếu lệch: **đổi số trên bản CLONE** trong page tạm rồi export (`t.characters = "③..."`, nhớ `loadFontAsync`), KHÔNG sửa frame gốc (bài fanpage vẫn dùng số cũ). Nhất quán 4 chỗ: **giọng ↔ nhãn trên ảnh ↔ header ↔ caption**. — "Hộp chữ nhật Bài 1" 17/07 (Thanh bắt: *"minh hoạ 3 chiến lược đánh số bị nhầm"*). |
| **L19** | **Caption dùng CHUNG cho 2 beat liền nhau → beat sau hiện chữ của beat trước, lệch lời** | chuỗi `f < x ? ... : ...` thiếu một nhánh cho beat cuối | Mỗi beat có onset riêng thì phải có nhánh caption riêng. **QA still tại onset TỪNG beat** mới lộ (render vài frame rải rác sẽ lọt). — 17/07 (s04b đọc lời của s04a). |
| **L20** | **Ảnh/card đè lên caption** | card cao chạm vùng caption (top 1360), lại còn Ken Burns phóng thêm % | Tính cả biên Ken Burns khi đặt kích thước: card ≤860px + chừa ~120px trước caption. — 17/07 (card 960 + zoom 5% → đè chữ). |
| **L16** | **Chữ/nhãn SVG tràn khỏi khung 1080** | `Surface` để `overflow: visible` → `text` ở x gần 1000 chạy ra ngoài mép | Nhãn mép phải dùng `textAnchor="end"` + giữ x ≤ 950; co chart chừa chỗ cho nhãn. **QA still bắt buộc thấy đủ 2 mép.** — "Hộp chữ nhật Bài 1" 17/07 (hook rev5). |
| **L17** | **Chữ trên hình LẶP y hệt caption dưới màn** | vừa vẽ nhãn trong SVG vừa để caption nói cùng nội dung | 1 ý = 1 chỗ. Caption dưới đã nói thì **đừng** vẽ lại giữa hình. — 17/07 ("cả ba đều có lý" bị lặp). |
| **L21** 🔴🔴 | **"1 ẢNH biểu đồ tĩnh + PAN camera qua lại" cho cả video → các câu KHÔNG được minh hoạ** (Thanh: *"các câu chưa được minh hoạ kỹ, chỉ có 1 biểu đồ với các điểm dịch đi dịch lại từ đầu đến cuối, không ổn"*) | bê 1 ảnh Figma flat rồi zoom/pan từng điểm = các câu chia nhau 1 hình chết, không có gì DIỄN RA | 🔴 Video dạy mẫu hình/cơ chế = **biểu đồ TỰ VẼ DẦN theo giọng** (SVG code động): mỗi phần tử reveal đúng beat — `rev(f,"sXX",dur)` — đường giá chạy ra khi kể · hộp thành hình khi nói "hộp" · mũi tên/stop/volume BẬT đúng từ khoá · phản-ví-dụ có **khung chart RIÊNG** (ẩn hẳn chart chính). Camera gần như đứng yên (nét vẽ là motion chính); chỉ zoom nhẹ khi cần soi chi tiết. **KHÁC L9** (chê nến-code TĨNH generic): đây là schematic ĐỘNG diễn ra theo lời → Thanh chấp nhận. Ảnh Figma tĩnh chỉ hợp làm HERO/CTA/cover, KHÔNG làm nền chạy suốt video. — "Hộp chữ nhật Bài 2" 19/07. |
| **L23** 🔴🔴 | **Video TÁCH NHIỀU PHẦN (P1/P2) nhưng chỉ phần cuối có teaser tính năng + CTA** → người xem chỉ gặp P1 (thuật toán đẩy lẻ từng video) không thấy lời mời nào; người xem đủ 2 phần thì nghe recap thừa | coi P1+P2 như một video dài bị cắt đôi, đặt teaser/CTA theo mạch **kịch bản gốc** thay vì theo **đơn vị xuất bản** | 🔴 **Mỗi phần là một video ĐỘC LẬP: tự đủ hook · teaser tính năng · CTA · brand spine.** Phần sau mở bằng **recap 1-2 câu** (không kể lại cả phần trước). Teaser đặt ở **quãng nghỉ giữa bài** của TỪNG phần (P1 giữa combo 3-4, P2 giữa Spring-UTAD), lời khác nhau để người xem cả hai không nghe lặp y hệt. Description viết **riêng từng phần**, phần trước trỏ tới phần sau. — "Wyckoff Bài 4" 24-25/07 (tách 2 vì lời dài: P1 2:49 + P2 2:09). |
| **L24** 🔴 | **Anchor căn frame KHÔNG khớp (`MISS`) ở câu có SỐ ĐẾM hoặc tên riêng** — vd viết anchor `"một cú ở đáy"` / `"năm tình huống"` nhưng whisper ghi `"1 cú ở đáy"` / `"5 tình huống"`; `"bạn"` bị nghe thành `"vạn"` | whisper phiên âm số đọc thành **chữ số**, và nghe nhầm phụ âm đầu ở tên riêng / từ đồng âm → chuỗi anchor tự viết theo kịch bản không bao giờ tìm thấy trong transcript | 🔴 **Dump whisper segments ĐỌC TRƯỚC khi viết anchor**, không viết anchor từ trí nhớ kịch bản. Quy tắc: số đếm → **chữ số** (`"1 cú"`, `"5 tình huống"`), tên riêng/từ hay nghe nhầm → lấy **đúng chuỗi whisper ghi**. Script align phải: ① normalize bỏ dấu câu ② **forward search** (`pos = j+1`) để anchor trùng lặp giữa hai nhánh đối xứng không khớp ngược về đầu ③ **fallback nửa đầu anchor** ④ **in danh sách MISS** ra cuối — MISS còn sót thì KHÔNG render. Mẫu: `scripts/align_p2.py` (Bài 4). — "Wyckoff Bài 4" 24/07. |
| **L25** | **Phiên âm lọt lên MÀN HÌNH** — nhãn hiện "Quai-cốp" / "sờ-pring" thay vì "Wyckoff" / "Spring" | file TTS và file hiển thị dùng chung một chuỗi | **Hai đường tách bạch:** phiên âm (`Quai-cốp`, `sờ-pring`, `áp-t-rớt`, `âu-bi-vi`) **CHỈ sống trong `script_tts_*.txt`**. Trên màn luôn là **thuật ngữ gốc EN viết đúng** (Wyckoff · Spring · UTAD · SOS · OBV) + giải thích tiếng Việt ngay cạnh. Lời đọc ưu tiên nói **tên tiếng Việt** ("Dấu hiệu sức mạnh", "cú giũ", "cú đẩy vượt") thay vì đọc viết tắt. QA still: soi mọi nhãn xem có lọt phiên âm không. |
| **L26** | **Đoạn kết/chốt ý không có hình minh hoạ → để slide trống hoặc bê lại chart cũ** | đoạn tổng kết vốn không có gì "diễn ra" để vẽ | **Card chữ thuần** cho đoạn kết: 1 câu hỏi chốt (hoặc 1 câu tổng) đặt giữa màn, nền brand, chữ lớn. Không cần chart. Đủ mạnh hơn hẳn việc pan lại biểu đồ đã dùng ở giữa bài. — "Wyckoff Bài 4 P2" 25/07 (card chốt "1 câu hỏi" trước bridge Bài 5). |
| **L22** 🔴🔴 | **Chèn CLIP QUAY MÀN HÌNH APP (teaser tính năng) — 4 bẫy liên hoàn:** ① clip **đứng ở khung cuối/nhảy giữa chừng**; ② dùng `<Video>` thì **render still/video ra frame trống** (chỉ preview studio chạy); ③ `objectFit: cover` **cắt méo tỷ lệ gốc**; ④ progress bar + phủ tím đáy + disclaimer **che/đè clip**, và clip **nhỏ** vì bị nhét trong khung trên | Clip là `<OffthreadVideo>`/`<Video>` map theo **timeline TỔNG** → ở frame N clip đã chạy tới giây N (không phải giây 0 của clip) → đứng/nhảy. `<Video>` chỉ chạy preview, KHÔNG extract frame khi render. `cover` scale theo cạnh dài → crop. Overlay/progress của BrandFrame vẽ ĐÈ lên Scene | 🔴 **Bọc `<Sequence from={beatStart} layout="none">`** để clip bắt đầu **t=0 đúng lúc cảnh mở**. 🔴 **Render bằng `<OffthreadVideo>`** (không `<Video>` — nó fail still/render; OffthreadVideo vẫn chạy đúng trong studio một khi Sequence đã căn t=0). **Khớp độ dài:** `playbackRate = clipLen / windowLen` (vd 15s/20s = **0.75**) → chạy đúng 1 lần phủ hết đoạn, không lặp không đứng. **Giữ tỷ lệ gốc, KHÔNG cắt che:** `objectFit: contain` + card đặt **đúng tỷ lệ clip** (đo `ffprobe` w/h). **Phóng TO:** clip dọc bị giới hạn CHIỀU CAO → muốn to hơn thì **ẩn ProgressBar + tắt BrandOverlay `bottom` trong đúng đoạn** (gate `f>=B.sXX.on && f<B.sYY.on`) để dùng cả phần dưới màn. **Không che:** disclaimer để **dòng RIÊNG dưới clip**, KHÔNG overlay đè. **Compliance:** clip lộ mã + %lời lãi → chỉ đăng **organic + disclaimer dưới video & trong caption** (Thanh chốt); đem chạy ads Meta/TikTok vẫn rủi ro reject. — "Wyckoff Bài 2" 22-23/07 (Thanh sửa 6 vòng: đứng hình → cắt méo → logo ảnh bị zoom cắt → clip nhỏ → tràn progress bar). |

> 🔴 **ASSET-FIRST — video dạy mẫu hình giá (chốt 03/07, precedent bắt buộc):**
> 1. **HERO = ảnh app THẬT** đã chú thích (screenshot chart KFSP). Cắt khung **sát nến** để che mã. Vẽ chữ mẫu hình bằng **1 nét liền, rõ, đủ chân** (W = 5 điểm giảm→đáy1→đỉnh giữa→đáy2→hồi) — đừng vẽ rời rạc "nhìn không ra".
> 2. **Dạy cấu tạo = schematic tách SẠCH từ Figma** → xem **[`refs/FIGMA_EXPORT.md`](refs/FIGMA_EXPORT.md)** (cách chuẩn: plugin `exportAsync` → **POST thẳng vào server local**, ảnh KHÔNG qua context, KHÔNG cần token REST). Lấy sẵn **toạ độ từng nhãn** để dựng lại bằng code → nhãn **hiện dần + zoom cận + spotlight** theo câu.
> 3. **Lưu ý / cảnh báo = card text thuần** (không cần chart).
> 4. **CTA = hình thật Figma** (cover có App Store/Google Play + hình "tầm soát"). Không dựng list mockup bằng code.
> 5. **Kỷ luật:** Thanh nói "loạn" → đi **kỹ từng câu** (lời · cần minh hoạ gì · đưa hình gì), duyệt HOOK trước, QA still từng phase, **mở Remotion Studio cho Thanh tự tua+nghe TRƯỚC render full**. Nguyên tắc: **1 câu = 1 hình + tối đa 1 điểm nhấn, khung đứng yên**.

> Quy trình QA chống lỗi: **render 1 still mỗi scene → soi mắt → mới render full**. Đừng render full ngay rồi mới phát hiện lỗi chữ/hình. **Trước render: đối chiếu silencedetect vs mốc câu (L10) + kiểm crossfade (L11).**

> 🔴 **QA TỪNG CÂU (chốt 17/07, Thanh: *"QA kỹ từng frame từng câu"*):** render still tại **onset + 25f của MỌI beat** (không phải vài frame rải rác — rải rác sẽ lọt lỗi caption dùng chung L19). Sinh danh sách frame thẳng từ `timing.ts`, render loạt vào `qa_beats/<beat>_f<frame>.png`, rồi soi **từng ảnh kèm câu giọng đang nói**. Với video nhiều beat, chia nhóm cho **subagent soi song song** (mỗi agent nhận checklist + câu giọng từng beat), nhưng **tự verify lại lỗi agent báo** trước khi sửa — agent hay báo nhầm những thứ đang trong lúc fade. Checklist mỗi ảnh: ① số/nhãn nhất quán với giọng (L18) · ② caption khớp đúng câu (L19) · ③ chữ không tràn mép (L16) · ④ không lặp/chồng caption (L17, L20) · ⑤ hình khớp lời · ⑥ màu đúng nghĩa (xanh=mua/lên, đỏ=bán/xuống).

## Changelog
- 2026-07-29: **Video tách nhiều phần + căn frame bằng anchor whisper + tách phiên âm khỏi màn hình.** Thêm **L23** (🔴🔴 mỗi phần P1/P2 là video ĐỘC LẬP: tự đủ hook·teaser tính năng·CTA·spine, phần sau mở bằng recap 1-2 câu, teaser đặt ở quãng nghỉ giữa TỪNG phần với lời khác nhau), **L24** (🔴 anchor căn frame phải lấy từ **dump whisper segments**, không viết từ kịch bản — số đếm whisper ghi thành chữ số, tên riêng/đồng âm nghe lệch; script align cần normalize + forward search + fallback nửa anchor + in MISS, MISS còn sót thì không render; mẫu `scripts/align_p2.py`), **L25** (phiên âm CHỈ sống trong file TTS; trên màn luôn là thuật ngữ gốc EN viết đúng), **L26** (đoạn kết không có gì diễn ra → **card chữ thuần** 1 câu chốt, không pan lại chart cũ). Mục DESCRIPTION: bắt buộc mở `DESCRIPTION_YOUTUBE.md` bài trước làm khuôn (3 tiêu đề · caption ngắn · mô tả YT · hashtag · ghi chú GEO), video tách phần thì mỗi phần một khối trong cùng file. **Bỏ biến thể nobrand** theo CLAUDE.md rev28 (28/07) — chỉ còn một biến thể brand KFSP; Composition `Nobrand` giữ như di sản, không xuất bản. Đúc từ "Wyckoff Bài 4" (P1 2:49 + P2 2:09, 24-25/07).
- 2026-07-23: **Chèn clip QUAY MÀN HÌNH APP làm teaser tính năng (L22).** Thêm **L22** (🔴🔴 4 bẫy liên hoàn: clip đứng/nhảy vì map timeline tổng → bọc `<Sequence from>` cho t=0; `<Video>` fail render still → dùng `<OffthreadVideo>`; `cover` cắt méo → `contain` + card đúng tỷ lệ clip; muốn TO + không che → ẩn ProgressBar + tắt BrandOverlay `bottom` theo đoạn, disclaimer dòng riêng; compliance clip lộ mã/%lãi = organic + disclaimer). Kèm cách reuse ảnh Figma carousel PHA làm minh hoạ từng chặng (crop dải logo `ffmpeg crop=iw:ih-300:0:300` để không trùng/cắt logo video). Đúc từ "Wyckoff Bài 2" 22-23/07 (Thanh sửa 6 vòng độ to/tỷ lệ/che clip).
- 2026-07-19: **Biểu đồ tự-vẽ-dần theo giọng (L21) + camera giữ-yên-theo-câu.** Thêm **L21** (🔴🔴 cấm dùng 1 ảnh biểu đồ tĩnh pan camera cho cả video → phải dựng schematic ĐỘNG reveal-theo-beat, mỗi câu 1 phần tử diễn ra; phản-ví-dụ có khung riêng; ảnh Figma tĩnh chỉ làm hero/CTA/cover). Bổ sung nguyên tắc camera: giữ yên trong câu, snap-tại-onset (không lerp suốt segment) — motion chính đến từ nét vẽ. Đúc từ "Hộp chữ nhật Bài 2" 19/07 (Thanh gạt "1 biểu đồ dịch điểm đi dịch lại" + "hình chuyển động liên tục không theo nhịp giọng"). Tái dùng asset Figma có sẵn (`175:65`) + ảnh CTA Bài trước; đổi lời sau khi gen audio = gen lại (không splice).
- 2026-07-17 (b): **QA từng câu + bẫy đánh số ảnh tái dùng.** Thêm **L18** (🔴🔴 số in trên ảnh fanpage cũ chỏi số trong lời đọc → đổi số trên CLONE rồi export, nhất quán 4 chỗ giọng↔nhãn↔header↔caption), **L19** (caption dùng chung 2 beat → lệch lời), **L20** (card đè caption vì quên biên Ken Burns) + callout **QA TỪNG CÂU** (render still tại onset mọi beat, chia subagent soi song song, tự verify lại). Đúc từ "Hộp chữ nhật Bài 1" 17/07 — Thanh bắt *"minh hoạ 3 chiến lược đánh số bị nhầm, QA kỹ từng frame từng câu"*.
- 2026-07-17: **Lấy ảnh Figma = đường PLUGIN, không phải REST.** Tách [`refs/FIGMA_EXPORT.md`](refs/FIGMA_EXPORT.md) (runbook: server nhận ảnh + bẫy `allowedDomains` không khớp cổng + cắt vùng bằng page tạm `try/finally` + bảng sự cố cổng 9223/9224). Callout ASSET-FIRST điểm 2 bỏ cách base64→decode, trỏ sang runbook. Thêm L14-L17 (token REST hết hạn không chặn export; base64 ngốn token; chữ SVG tràn mép; chữ lặp caption). Đúc từ "Hộp chữ nhật Bài 1" 17/07 — Thanh chốt *"dùng plugin chứ sao lại qua api"*.
- 2026-07-03: **ASSET-FIRST cho video mẫu hình + căn giọng bằng silencedetect + crossfade.** Thêm L9–L13 (nến-code tệ→ảnh thật; hình lệch giọng→căn theo khoảng lặng thật; chớp đen→crossfade chồng cảnh; che mã→crop; spotlight vệt) + callout ASSET-FIRST (5 điểm) + kỹ thuật tách ảnh sạch từ Figma (exportAsync→base64→decode). Đúc từ "Hai đáy Bài 1" 03/07 (dựng lại thành công sau khi bản nến-code bị chê; Thanh nhấn: "không muốn nói đi nói lại chuyện minh hoạ tệ + hình lệch giọng").
- 2026-06-13: **Mục 📺 DESCRIPTION YOUTUBE (SEO + GEO).** Thêm template description + 2 checklist: SEO (keyword/chapters/hashtag/link) và GEO (Generative Engine Optimization — tóm tắt trả lời thẳng + FAQ Q&A + entity rõ để AI answer-engine trích dẫn) + geo-targeting VN. Kèm rule compliance + câu brand spine + biến thể nobrand/brand + ví dụ mẫu cho video "5 mẫu nến". (GEO ở đây = tối ưu cho bộ máy trả lời AI, không phải địa lý đơn thuần.)
- 2026-06-13: **Mục 🐞 LỖI THƯỜNG GẶP + chỉ dẫn đọc trước B5.** Ghi L1 (nút/tag nhảy 2 dòng → `whiteSpace: nowrap`), L2 (cảnh đối nghịch phải vẽ ngược chiều V↔Λ), L3-L5. Bước 5 thêm dòng "đọc LỖI THƯỜNG GẶP + render still QA trước full". Đúc từ video "5 mẫu nến đảo chiều đáy" (Thanh phát hiện nút Follow wrap + cảnh sắp giảm/sắp đáy vẽ giống nhau).
- 2026-06-13: **Bước 3-Gemini — gen hình hỗ trợ video.** Thêm sub-step sau GATE Bước 3: với asset `photo:`/`bg:` không phải screenshot app → sinh prompt Gemini đúng vân tay KFSP (neo vào `Brand/Image_Styles/kfsp_image_styles.json` + `KFSP_Image_Styles.md` + skill `kfsp-image-brief`). Có bảng map asset→kiểu hình (Kiểu 4 storytelling cho metaphor/cảm xúc...) + **6 khác biệt prompt cho video** (9:16; bg tông trầm chừa trống cho subtitle; no text/no logo; safe zone y150–1500; nến mã video `#34d399`/`#f87171`; nobrand không logo). Lý do: video "5 mẫu nến đảo chiều đáy" (13/06) cần ảnh quê chuồn chuồn/ráng mỡ gà cho hook → chuẩn hoá cách gen thay vì chế prompt ad-hoc.
- 2026-06-05: **Asset planning vào storyboard.** Bước 4 thêm cột `asset` (`code`/`photo:<file>`/`bg:<file>`) + sinh **Asset Manifest** (bảng hình cần Thanh cung cấp) trình ở GATE B4. Bước 3 đổi thành "thu thập theo manifest" (thứ tự đúng: B4 tính nhu cầu ảnh → B3 xin ảnh → B5 render). Template `PLAN_STORYBOARD_TEMPLATE.md` thêm mục 7b Asset Manifest. Lý do: video "Cái bẫy giá rẻ" (04-05/06) vẽ code hết rồi chèn ảnh See's/Berkshire/Munger giữa chừng → re-render nhiều lần. Đồng bộ QUICK REF ở engine CLAUDE.md (`~/Desktop/VIDEO KFSP/`).
- 2026-06-05: **Brand Frame chung** (mục "🟣 LỚP NHẬN DIỆN BRAND"). Đóng băng từ video "4 điểm vào lệnh": overlay gradient tím trên+dưới + logo trắng + brand tokens lấy TỪ APP (`#7B3AEC`/`#AA75FF`, bỏ magenta `#951B81` cũ). Component tái dùng `_shared/remotion/BrandFrame.tsx` (export `BrandOverlay`, `BrandLogo`, `BRAND`, `SAFE`). Brand-status theo kênh = chỉ khác có/không logo, overlay giữ ở cả 2. Tiêu đề có số → badge + tiêu đề thẳng hàng 1 dòng căn trái.
