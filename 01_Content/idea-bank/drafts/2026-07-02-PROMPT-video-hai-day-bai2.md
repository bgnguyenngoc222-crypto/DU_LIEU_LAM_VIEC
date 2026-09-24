# PROMPT handoff — Video Bài 2 Hai đáy (dán sang phiên mới)

> Copy nguyên khối "PROMPT" bên dưới, dán vào phiên mới. Cập nhật 03/07 theo cách làm ĐÃ THẮNG ở Bài 1 (CEO duyệt OK).

---

## PROMPT

Dựng video **Bài 2 mẫu hình Hai đáy** (kênh brand **KFSP - Chứng khoán trong tầm tay**), theo **ĐÚNG cách đã làm thành công ở Bài 1**. Chạy skill `/video-kfsp`. **Storyboard + still QA từng câu → CEO duyệt trong Remotion Studio → mới render full.** KHÔNG render vội, KHÔNG vẽ nến bằng code.

### 0. ĐỌC TRƯỚC (bắt buộc — đừng lặp lỗi cũ)
- Skill `video-kfsp` mục **🐞 LỖI THƯỜNG GẶP L9–L13 + callout ASSET-FIRST**. Đây là 2 lỗi CEO ghét nhất: **minh hoạ tệ (nến code)** và **hình lệch giọng**.
- Journal `00_CEO/Journal/2026-07.md` entry 03/07 (Bài 1 hoàn thành) — cách asset-first + căn giọng.
- Xem bản Bài 1 làm mẫu chất lượng: `~/Desktop/VIDEO KFSP/20260702-cktt-hai-day-bai1/remotion/out/final.mp4`.

### 1. TÁI DÙNG engine Bài 1 (không dựng lại từ đầu)
Copy folder `~/Desktop/VIDEO KFSP/20260702-cktt-hai-day-bai1/` → `20260703-cktt-hai-day-bai2/`. Đã có sẵn components trong `remotion/src/Main.tsx`:
- `Plate/View/toScreen` — đặt ảnh + overlay bám ảnh (zoom/pan).
- `Spot` (spotlight nhiều lỗ mềm → VỆT; `ring=false` khi cần vệt dài), `WPath`/`HandLine` (vẽ tay), `SchLabel` (nhãn hiện dần), `NoteCard` (card text), `Heading`, `Pill`.
- `Main` = crossfade chồng cảnh (XFADE≈9f) + subtitle karaoke + `BrandFrame`.
Chỉ cần thay **asset** (public/), **sentences.json**, và viết lại các Scene theo storyboard Bài 2.

### 2. Nguồn nội dung (đã chốt)
- Master: `02_Marketing/content-automation/idea-bank/drafts/2026-07-01-fanpage-hai-day-bai2-giao-dich.md`.
- Khung: **3 điểm HÀNH ĐỘNG + 4 điểm QUAN SÁT CÓ CHỦ ĐÍCH** (IF-2026-030). Mạch: tiêu đề nghịch lý "không chỉ 3 điểm" → 3 điểm hành động (vào tại viền cổ / cắt lỗ dứt khoát dưới đáy 2 / chốt lời dần) → twist "CHƯA CHẮC ĐÂU" (false break / washout) → cần kế hoạch quan sát → 4 điểm quan sát theo dòng thời gian (rẽ nhánh xấu/tốt) → "bấm 3 lệnh, quan sát rất nhiều" → KFSP sắp có tầm soát mẫu hình → brand spine.
- Thuật ngữ LOCKED: đường viền cổ · đáy mẫu hình · cắt lỗ dứt khoát · chốt lời dần · kiểm tra lại lực cầu · dời điểm dừng. Song ngữ khi phổ biến: neckline, false break, washout, trailing stop.

### 3. Hình — ASSET-FIRST (KHÔNG vẽ nến code)
**a. Ảnh Figma Bài 2 — tách SẠCH (bỏ logo/bg/nhãn dư) rồi export.** File `candlestick pattern`, page `🎨 Hình content (nháp)`. REST token đã chết → dùng **bridge**. Kỹ thuật (như Bài 1):
```
1 figma_execute: ẩn layer thừa theo id → frame.fills=[] → exportAsync PNG scale 2
   → figma.base64Encode → restore lại (non-destructive).
Kết quả base64 to → tự lưu tool-results/*.txt → grep b64 + base64 -d ra PNG trong suốt.
Lấy sẵn toạ độ từng nhãn/mốc để dựng lại bằng code (hiện dần + zoom + spotlight).
```
Frames Bài 2:
- Cover: `99:671`
- Khung 3 hành động + 4 quan sát: `99:688`
- Line chart lý tưởng (false break + retest, 2 kịch bản): `101:795`
- Ví dụ thật (kế hoạch phủ lên chart KFSP thật): `104:1121`
- CTA "Tầm soát ngay với KFSP" (3 chart thật): `104:1561` *(đã export sẵn ở Bài 1 = `cta-tamsoat.png`)*

**b. Ảnh chart THẬT** — screenshot app KFSP các mã có Hai đáy. **Che mã bắt buộc:** cắt khung sát nến hoặc pre-crop ffmpeg bỏ thanh mã/tên/nav (ngoại lệ: cover brand chính thức để nguyên). Bài 1 đã có `hook-ctg.png`, `real-vds.png`, `ex-*.png` — tái dùng nếu hợp; CEO cấp thêm mã nếu cần chart có false break/retest thật.

→ Storyboard **kết hợp**: infographic Figma sạch (dạy khung 3+4) xen chart thật (chứng minh false break/retest/dời điểm dừng). Chuyển động = zoom/pan/spotlight/vẽ-tay TRÊN ảnh.

### 4. Giọng đọc (HỎI CEO TRƯỚC khi gen)
Hỏi engine (Vbee/VieNeu) + giọng + speed. Bài 1 CEO tự gen trên **Vbee web** → dùng file đó. Mặc định nếu CEO nói "dùng mặc định": Vbee Minh Quân `hn_male_minhquan_yt-stable`.

### 5. 🔴 CĂN GIỌNG (đừng lặp lỗi "hình vội, lệch giọng")
Sau khi có file voice: **KHÔNG tin mốc whisper.** Căn `full_start_s` từ khoảng lặng THẬT:
```
ffmpeg -i voice.mp3 -af silencedetect=noise=-32dB:d=0.35 -f null -
→ speech onset = silence_end sau mỗi gap ranh giới câu
→ scene start = onset − 0.15s. Ghi đè sentences.json. Đối chiếu bảng silence vs câu TRƯỚC render.
```

### 6. Quy trình (gate từng bước)
1. Đọc mục 0 + master → export + tách sạch hình Figma Bài 2.
2. Trình **storyboard bảng** (Cảnh · lời đọc · cần minh hoạ gì · đưa hình gì) — **1 câu = 1 hình + tối đa 1 điểm nhấn, khung đứng yên**. CEO duyệt.
3. Dựng HOOK trước → still QA → CEO duyệt → dựng tiếp từng phần.
4. Căn giọng (mục 5) + crossfade. **Mở Remotion Studio cho CEO tự tua + nghe TRƯỚC render full.**
5. Render full → hỏi CEO nhạc nền/SFX → đóng gói + description YouTube SEO+GEO.

### 7. Luật cứng
- Kết bằng brand spine "Đưa chứng khoán về tầm tay bạn" (overlay cuối).
- KHÔNG em-dash "—", KHÔNG emoji trong voiceover, KHÔNG từ hạ thấp người xem.
- Education-first: không %lợi nhuận, không phím hàng, không hứa chắc thắng. App "giúp quan sát/canh break", không "đảm bảo đúng".
- Tính năng tầm soát mẫu hình = "sắp ra mắt".

Bắt đầu bằng: đọc mục 0 → copy engine Bài 1 → export + tách sạch hình Figma Bài 2 → trình storyboard bảng cho CEO duyệt.

---

## Ghi chú cho CEO
- Prompt đủ context, phiên mới không cần kể lại. Chỉnh độ dài/giọng nếu đã có ý (Bài 2 có 3+4 điểm → cân nhắc dài hơn 60s, hỏi CEO).
- Độ dài: hỏi CEO 60s rút gọn hay 90s+ (3 hành động + 4 quan sát nhiều ý).
