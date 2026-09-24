# Plan v4: Sentence-Driven Storyboard Template

> Template chuẩn cho B4 (Plan Storyboard). Mỗi video copy template này, fill theo `sentences.json` đã tạo ở B1.5 + whisper timestamps ở B2.
>
> **Nguyên tắc**: Row = 1 câu. Cảnh đi theo câu. Liệt kê pop đúng word timestamp.

---

## 0. Input required (từ B1.5 + B2)

- `sentences.json` đã có full fields: `id`, `phase`, `display`, `tts`, `main_idea`, `enum_items`, `pause_before_ms`, `pause_after_ms`, `speed`, `duration_s`, `word_timestamps`
- `screen-shot/` đã có đủ asset (B3)
- Pronunciation bảng đã duyệt (B1)

---

## 1. Screenshot Analysis (tọa độ chính xác)

**Format từng screenshot (1834x3709, aspect 0.494):**

### S1 — [Tên màn hình]
- Element key 1: center x≈{X}, y≈{Y}
- Element key 2: center x≈{X}, y≈{Y}
- Screenshot path: `screen-shot/IMG_XXXX.PNG`

*(Copy format này cho mỗi S1, S2, S3... và R1, R2 recording)*

---

## 2. Phone Mockup — tỉ lệ chuẩn

```
Phone outer: 380x760, screen inner: 360x740
Screenshot 1834x3709 → screen 360px width
Scale factor: 360/1834 = 0.1963

Screenshot coord → Screen coord:
  screen_x = screenshot_x * 0.1963
  screen_y = screenshot_y * 0.1963

Ví dụ: Element (550, 300) → screen (108, 59)
```

---

## 3. Subtitle (per-sentence rule)

**Khác với workflow cũ**: subtitle cũng atomic per-sentence. Mỗi `Sentence{ID}.tsx` render SubtitleBar riêng từ `audio/{id}.json`.

- SubtitleBar hiển thị **1 dòng duy nhất**, 5-6 từ, chuyển liên tục theo whisper word timestamps **trong phạm vi câu**.
- Không có subtitle nào bị tách ngang ranh giới câu — mỗi câu tự kết subtitle của mình.
- Fade in 4f đầu câu, fade out 4f cuối câu.
- Font 38-42px bold, auto scale nếu dài: `fontSize = min(42, 960 / words × 0.85)`.
- Vị trí: y=1380-1470.

---

## 4. Safe Zone (TikTok)

```
y=0-150      UNSAFE (status bar)
y=150-1500   SAFE zone (nội dung)
y=1500-1920  UNSAFE (TikTok UI)
x=60-1020    horizontal safe

Subtitle:     y=1380-1470
Progress bar: y=1490
Logo top:     y=160-290
```

---

## 5. Animation Psychology — Easing Map theo Phase

| Phase | Cảm xúc mục tiêu | Spring preset | Easing | Hướng chuyển động |
|-------|-------------------|---------------|--------|-------------------|
| HOOK | Overwhelm, áp lực | `heavy` {d:20, s:80, m:1.2} | `ease-in` (tăng tốc = mất kiểm soát) | Rơi xuống ↓ |
| PROBLEM | Tension, stagnation | `heavy` + silence pause | `ease-in` chậm | Background tối dần |
| AGITATE | Escalation, choáng | `resolve` {d:12, s:250} | `ease-out` mạnh (snap = sự thật) | Snap các hướng |
| SOLVE | Calm confidence | `calm` {d:18, s:180} | `ease-out` (chuyên nghiệp) | Zoom-in chậm (intimate) |
| ACTION | Urgency → Confidence | `decisive` {d:14, s:300} | `ease-out` snap → STILL | Snap rồi đứng yên |

**Quy tắc easing**:
- CẤM `linear`
- `ease-in` = mất kiểm soát (chỉ Hook/Problem)
- `ease-out` = tự tin, sự thật (dùng nhiều nhất)
- `ease-in-out` = dẫn dắt nhẹ nhàng (Bonus/chuyển ý)
- `Easing.bezier(0.22, 1, 0.36, 1)` = zoom chuyên nghiệp

---

## 6. SFX Library (public/sfx/)

| File | Dùng cho | Tâm lý |
|------|---------|--------|
| `whoosh.mp3` (0.4s) | Scene transition, phone slide in/out | Chuyển động, năng lượng |
| `pop.mp3` (0.08s) | Element xuất hiện (badge, dot, pill) | Nhẹ, chú ý |
| `click.mp3` (0.03s) | Tap/chọn checkbox, nhấn nút | Hành động chính xác |
| `chime.mp3` (0.3s) | Hoàn thành bước, kết quả tốt | Thành tựu |
| `swoosh.mp3` (0.3s) | Zoom vào screenshot | Focus, intimate |
| `notification.mp3` (0.35s) | Cảnh báo bell, thông báo | Alert, quan trọng |
| `success.mp3` (3.9s) | CTA cuối, hoàn thành 5 bước | Phấn khởi, đạt được |

**SFX principles:**
- Volume mix: BGM 0.08, SFX 0.15-0.3, voice peak 0dB
- Không spam — chỉ tại điểm hành động chính
- **Silence = mạnh nhất** (tension, CTA đứng yên không SFX)
- 1 SFX = 1 hành động

---

## 7. 📋 SENTENCE STORYBOARD (bảng chính — BẮT BUỘC)

**Row = 1 câu.** Copy bảng này và fill cho từng câu trong `sentences.json`.

| id  | Phase   | Giọng (tts)                                       | Main idea           | Duration | Visual anchor                                | Asset            | Animation                   | Enum beats (relative frame)                    | SFX                    |
|-----|---------|---------------------------------------------------|---------------------|----------|----------------------------------------------|------------------|-----------------------------|------------------------------------------------|------------------------|
| s01 | HOOK    | "Bạn có thấy choáng khi mở bảng giá?"             | choáng bảng giá     | 2.1s     | Terms swirl bg tối, "200 dòng" rơi xuống     | code             | `spring heavy`, rơi ↓       | —                                              | whoosh @ f0            |
| s02 | HOOK    | "200 dòng số, hàng trăm mã, không biết đâu."      | 200 dòng ngộp       | 3.4s     | Numbers rain fullscreen                      | code             | `ease-in` tăng tốc          | "200 dòng"@f18, "hàng trăm mã"@f52            | pop × 2 @ f18, f52     |
| s03 | PROBLEM | "Người sửa cho ông là Charlie Munger."            | Munger             | 3.5s     | Chân dung Munger card + ảnh nền mờ           | photo:munger.png · bg:munger.png | `spring calm`               | —                                              | whoosh @ f0            |
| s04 | SOLVE   | "Thứ nhất doanh thu, thứ hai lợi nhuận, thứ ba E-P-S." | 3 trục tăng trưởng  | 4.2s     | 3 pills stagger L→R theo nhịp liệt kê         | code             | `spring resolve` stagger    | "doanh thu"@f18, "lợi nhuận"@f52, "EPS"@f92  | pop × 3                |
| ... | ...     | ...                                               | ...                 | ...      | ...                                          | ...              | ...                         | ...                                            | ...                    |

**Quy tắc fill bảng:**

1. **`Main idea`** (≤5 từ): keyword visual editor phải minh hoạ. Không trùng với câu trước/sau.
2. **`Visual anchor`**: mô tả CHÍNH XÁC minh hoạ cho ý chính câu đó. CẤM "minh hoạ cả đoạn". CẤM đè visual từ câu trước.
3. **`Asset`** (🔴): `code` (vẽ Remotion/SVG/CSS) · `photo:<file>.png` (ảnh thật Thanh cung cấp, dạng card) · `bg:<file>.png` (ảnh nền mờ + overlay navy). Mặc định `code`; chỉ dùng `photo`/`bg` khi ảnh thật làm scene mạnh hơn hẳn (nhân vật/thương hiệu/bằng chứng).
4. **`Duration`**: từ `sentences.json.duration_s`. Composition của câu: `durationInFrames = Math.ceil(duration × 30)`.
5. **`Enum beats`**: nếu câu có `enum_items`, ghi `"X"@f{n}, "Y"@f{n}` (frame relative to câu, lấy từ `word_timestamps`). Element phải pop đúng frame này, lệch ≤2f. CẤM stagger đều.
6. **`Animation`**: chọn easing theo phase (section 5). Câu liệt kê → stagger spring theo từng item.
7. **`SFX`**: ghi rõ file + frame relative. Không spam, chỉ tại key action.

---

## 7b. 📋 ASSET MANIFEST (Bảng hình cần Thanh cung cấp — chốt TRƯỚC khi render)

Gom mọi dòng `Asset` có `photo:`/`bg:` ở bảng trên. Đây là phần trình Thanh ở cuối Bước 4 để gửi ảnh cho Bước 3. Scene `code` không liệt kê ở đây.

| Tên file (vào `screen-shot/`) | Scene dùng | Vai trò | Mô tả ảnh cần |
|---|---|---|---|
| munger.png | s03 | card + bg | Chân dung Charlie Munger rõ mặt, nền đơn giản |
| ... | ... | ... | ... |

> 🔴 Nếu manifest rỗng (toàn `code`) thì ghi rõ "không cần ảnh ngoài". KHÔNG được mặc định vẽ code hết rồi để Thanh chèn ảnh giữa lúc render (gây re-render nhiều lần).

---

## 7c. 🔴 SHOT SPEC CHI TIẾT (BẮT BUỘC — viết dưới bảng, mỗi beat 1 block)

> Bảng mục 7 chỉ là index 1 dòng. Mỗi beat PHẢI có 1 block spec đủ để build thẳng (ngang mức tả Figma). 5 mục: ① Bố cục+toạ độ · ② Phần tử + DỮ LIỆU (OHLC/màu/vị trí) · ③ Keyframe theo CHỮ · ④ Chữ on-screen · ⑤ Khớp ý.

### Ví dụ — beat cơ chế "Đẩy mạnh rồi đánh mất thành quả" (nến đảo chiều)

**① Bố cục:** Badge ① + tên nhóm ở y=232 (badge tròn 92px màu #3b82f6 trái, tên trắng 44px phải). Vùng minh hoạ chính: 1 nến TO chính giữa, svg x=300..780, y=470..1150. Lưới giá mờ 3 đường ngang. Chips tên ở y=1180.

**② Phần tử + dữ liệu:**
- 2 nến bối cảnh xanh dim (uptrend dẫn vào): C1 {o:40,c:52,h:54,l:38} cx≈360; C2 {o:52,c:64,h:66,l:50} cx≈480 — opacity 0.4, màu #34d399.
- Nến chính (Sao băng): {o:60,c:56,h:92,l:58} cx=620, w=120, màu #f87171, glow (thân nhỏ dưới, BÓNG TRÊN dài tới giá 92).
- Mũi tên ① "đẩy đi": từ (620, y@giá58) → (620, y@giá92), màu #34d399, nét 9px.
- Mũi tên ② "bị kéo lại": từ (700, y@giá92) → (700, y@giá58), màu #f87171, nét 9px, đầu mũi xuống.

**③ Keyframe (theo word_timestamps câu):**
- f0–f8: badge + tên trượt vào (popIn).
- từ "đẩy giá đi rất xa" (~f30): BÓNG TRÊN kéo dài dần từ y@60 lên y@92 (grow 0→1 trong 12f) + mũi tên ① chạy lên.
- từ "bị kéo ngược" (~f60): giá đóng tụt về 56 → thân co nhỏ (10f) + mũi tên ② chạy xuống; bóng trên Ở LẠI (= thành quả đã mất).
- từ "để lại bóng dài" (~f80): bóng trên nhấp nháy glow 2 nhịp.

**④ Chữ:** Tiêu đề "① Đẩy mạnh rồi đánh mất thành quả" (#fff 44px). Chips: "Búa · Sao băng · Nhấn chìm · Mây đen" (#3b82f6 32px y=1180).

**⑤ Khớp ý:** bóng trên dài = phần giá ĐÃ đẩy đi nhưng bị trả lại = "đánh mất thành quả" — đúng main_idea.

> Viết block tương tự cho MỌI beat. Beat liệt kê tên (s06/s08…): ghi rõ mẫu nào pop frame nào (theo từ), OHLC từng mẫu, vị trí lưới.

---

## 8. 📋 QA AUDIT CHECKLIST (24 mục)

### A. Audio / Subtitle

| # | Hạng mục | Tiêu chí | Pass? |
|---|----------|----------|-------|
| 1 | Subtitle sync | 5-6 từ/chunk, khớp 100% whisper timestamps của câu | ☐ |
| 2 | Subtitle vị trí | y=1380-1470, không bị TikTok UI đè | ☐ |
| 3 | Subtitle 1 dòng | Mỗi lần 1 dòng, không wrap | ☐ |
| 4 | Subtitle atomic | Không có subtitle nào tách ngang 2 câu | ☐ |
| 5 | Audio không cắt | Voiceover mỗi câu phát hết duration, không cut cuối | ☐ |

### B. Visual / Layout

| # | Hạng mục | Tiêu chí | Pass? |
|---|----------|----------|-------|
| 6 | Logo | Căn giữa top, 120px, y=160-290 | ☐ |
| 7 | Phone mockup | Không cắt rìa, screenshot hiển thị đầy đủ | ☐ |
| 8 | Zoom chính xác | Zoom vào đúng vùng cần chú ý | ☐ |
| 9 | Annotation | Pulsing dot/box đúng tọa độ element | ☐ |
| 10 | Safe zone | Content trong x:60-1020, y:150-1500 | ☐ |
| 11 | Progress bar | y=1490, animate smooth | ☐ |
| 12 | Textbox không đè app | Hình app luôn hiển thị rõ, không bị textbox che | ☐ |

### C. Animation / SFX

| # | Hạng mục | Tiêu chí | Pass? |
|---|----------|----------|-------|
| 13 | Animation khớp giọng | Visual sync speech ±5 frames | ☐ |
| 14 | Easing curves | Không có linear, mọi chuyển động có ease-out/spring | ☐ |
| 15 | Emotional arc | Hook=overwhelm→relief, Solve=calm, CTA=decisive→still | ☐ |
| 16 | SFX đúng timing | Click=tap, pop=appear, whoosh=transition, không spam | ☐ |
| 17 | SFX volume | 0.2-0.4, không lấn voiceover | ☐ |
| 18 | Silence moments | CTA still và tension gaps KHÔNG có SFX | ☐ |
| 19 | Transition mượt | Crossfade/wipe, không jump cut giữa câu | ☐ |
| 20 | CTA đứng yên | Button snap vào rồi KHÔNG pulse/nhấp nháy | ☐ |

### D. Sentence-Driven (MỚI — bắt buộc)

| # | Hạng mục | Tiêu chí | Pass? |
|---|----------|----------|-------|
| 21 | **Sentence atomicity** | Mỗi câu = 1 clip riêng. Không transition/animation đè qua ranh giới câu | ☐ |
| 22 | **Main idea match** | Visual câu X minh hoạ đúng `main_idea`, KHÔNG phải câu X-1/X+1 | ☐ |
| 23 | **Enum beat sync** | Câu liệt kê: element pop đúng word timestamp ±2 frames (không stagger đều) | ☐ |
| 24 | **Stitch gap** | Silence padding giữa câu khớp `pause_after_ms`, không hụt/dư | ☐ |

### Quy trình nghiệm thu

1. **Gate mỗi phase PASA**: xem batch clip của phase → điền cột Pass/Fail cho các câu trong phase → Thanh duyệt hoặc yêu cầu sửa câu cụ thể
2. **Sau stitch**: play `final.mp4` trong Remotion Studio hoặc VLC — check sync tổng thể + silence padding
3. **Check safe zone**: overlay TikTok UI mockup lên
4. **Check trên mobile**: export 1 đoạn 15s, xem trên điện thoại
5. **Điền bảng audit**: đánh dấu Pass/Fail từng hạng mục
6. **Feedback** → sửa atomic câu lỗi, không re-render toàn bộ

---

## 9. Components / Source Inventory Checklist

### Mặc định đã có (từ remotion-kfsp shared)

| Component | Source | Dùng cho |
|-----------|--------|----------|
| DeviceMockupZoom | remocn | Phone frame + zoom |
| SimulatedCursor | remocn | Con trỏ tap trên screenshot |
| PulsingIndicator | remocn | Dot nhấp nháy chỉ vào nút |
| SpringPopIn | remocn | Element pop vào (badge, pill) |
| BlurReveal | remocn | Text xuất hiện cinematic (Hook) |
| MarkerHighlight | remocn | Highlight từ khóa |
| StaggeredFadeUp | remocn | Nhiều element stagger (dots ①②③) |
| ZoomThroughTransition | remocn | Transition zoom giữa scenes |
| MeshGradientBg | remocn | Background gradient đẹp |
| ProgressSteps | remocn | Hiển thị bước 1→N progress |
| ToastNotification | remocn | Notification card |
| DirectionalWipe | remocn | Wipe transition |
| SuccessConfetti | remocn | Confetti nhẹ (Conclusion) |
| SubtitleBar | local | Karaoke subtitle per-sentence |
| SFX (7 files) | public/sfx/ | whoosh, pop, click, chime, swoosh, notification, success |
| @remotion/transitions | npm | Transition effects |
| @remotion/lottie + lottie-web | npm | Lottie animation player |
| remotion-animated | npm | Declarative Fade/Scale/Move |

### Cần chuẩn bị thêm (check từng video)

| Mục | Nguồn | Cần không? |
|-----|-------|------------|
| Lottie: Bell/notification | LottieFiles | ☐ |
| Lottie: Checkmark/success | LottieFiles | ☐ |
| Lottie: Tap finger/click | LottieFiles | ☐ |
| Lottie: Arrow/swipe | LottieFiles | ☐ |
| SFX Pixabay/Mixkit chất lượng cao | Pixabay/Mixkit | ☐ |
| BGM nhạc nền | Pixabay Music | ☐ |
| Screenshots | Thanh cung cấp | ☐ |
| Screen recordings | Thanh cung cấp (pre-transcode h264 30fps) | ☐ |

---

## 10. Stitch script reference

```bash
# Tạo concat_list.txt từ sentences.json
# Mỗi entry: file clips/{id}.mp4 + silence file pause_{ms}.mp4 (nếu pause_after_ms > 0)

# Option A: concat demuxer (nhanh nhất, yêu cầu cùng codec)
ffmpeg -f concat -safe 0 -i concat_list.txt -c copy final.mp4

# Option B: nếu cần tạo silence padding video (nền đen câm)
ffmpeg -f lavfi -i color=c=black:s=1080x1920:r=30 -f lavfi -i anullsrc=r=48000:cl=stereo \
  -shortest -t {pause_s} -c:v libx264 -c:a aac pause_{ms}.mp4
```

Concat list format:
```
file 'clips/s01.mp4'
file 'pause_300.mp4'
file 'clips/s02.mp4'
file 'pause_500.mp4'
file 'clips/s03.mp4'
```
