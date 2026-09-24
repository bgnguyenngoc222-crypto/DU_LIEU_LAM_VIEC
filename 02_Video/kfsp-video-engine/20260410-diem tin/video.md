---
name: kfsp:video
description: "Video điểm tin tự động — pipeline TTS + Remotion. Fetch kịch bản, phân tích nhịp đọc, gen audio clone giọng, render video."
---

# /kfsp:video — Video Điểm Tin Tự Động

## Mục đích
Quản lý pipeline tạo video điểm tin thị trường hàng ngày: kịch bản → nhịp đọc → TTS clone giọng → video.

## Cách dùng

### Khởi động UI
```bash
kfsp-video
# Hoặc:
cd Business/4-Operations/Automation_Hub/MKT/video-diem-tin
source ~/tts-env/bin/activate
streamlit run app.py --server.port 8501 --server.headless true
```
→ Mở http://localhost:8501

### Modes

| Mode | Lệnh | Mục đích |
|------|-------|---------|
| `--ui` | `/kfsp:video` (mặc định) | Mở Streamlit UI pipeline |
| `--gen` | `/kfsp:video --gen` | Chạy full pipeline CLI (không UI) |
| `--tts` | `/kfsp:video --tts "text"` | Gen audio từ text nhanh |
| `--profile` | `/kfsp:video --profile path.mp3` | Tạo/cập nhật voice profile |

## Pipeline (8 bước)

```
Step 1: 📝 Nhập kịch bản
  → Paste từ Telegram (n8n flow blIkzcrfcEf9tcuK gửi bản tin 15:30)
  → Hoặc fetch tự động từ n8n API

Step 2: ✏️ Kiểm tra chính tả
  → Rà soát toàn bộ kịch bản: lỗi chính tả, dấu câu, ngữ pháp
  → Sửa lỗi TRƯỚC khi normalize phiên âm
  → Kịch bản gốc (hiển thị + subtitle) PHẢI chuẩn tiếng Việt có dấu
  ✅ GATE: Chính tả OK

Step 3: 🔤 Kiểm tra phiên âm (Pronunciation Check)
  → Load bảng phiên âm: shared/pronunciation_vi.json
  → Quét tất cả từ viết tắt, mã CK, thuật ngữ kỹ thuật, số liệu
  → Nếu từ CHƯA CÓ trong bảng → DỪNG, hỏi Thanh cách đọc
  → Liệt kê toàn bộ từ sẽ normalize để Thanh duyệt
  → Xuất 2 file: script_display.txt (gốc, cho subtitle) + script_tts.txt (phiên âm, cho TTS)
  ✅ GATE: Thanh duyệt phiên âm

Step 4: 🎯 Phân tích nhịp đọc
  → AI hoặc rule-based chia segments
  → Gắn type: intro/explain/buildup/highlight/list/cta
  → Tốc độ mặc định: 1.3x (tất cả segment)
  → Mã CK, viết tắt, thuật ngữ: đọc NHANH, KHÔNG nhấn nhá, KHÔNG kéo lê
  → Phong cách điểm tin: TRUNG LẬP, đều, không lên xuống giọng quá mức
  → Thanh duyệt + chỉnh speed/temp/pause từng đoạn
  ✅ GATE: Duyệt nhịp đọc

Step 5: 🖼️ Tài nguyên hình ảnh
  → LIỆT KÊ CỤ THỂ hình cần, kèm TÊN FILE gợi ý và MÔ TẢ:
    Ví dụ: "01_vnindex_chart.png — Chart VN-Index phiên hôm nay"
  → Mở folder hình ảnh để Thanh copy vào: output/{date}/images/
  → Background video: dùng ảnh nền login/register từ shared/bg_login.png (mờ nhẹ)
  → Nếu chưa có background → tìm trong Flutter app assets và lưu về shared/
  ✅ GATE: Đủ resources

Step 6: 🔊 Tạo audio
  → Chỉ dùng GIỌNG NAM: Edge TTS vi-VN-NamMinhNeural hoặc VieNeu clone
  → Rate: +30% (Edge TTS) — tốc độ mặc định 1.3x
  → Phong cách: TRUNG LẬP, không nhấn nhá, không kéo lê, đọc đều
  → Mã CK/viết tắt: đọc nhanh liền mạch, không ngắt giữa các chữ cái
  → Dynamic pacing: speed/temp khác nhau từng đoạn
  ✅ GATE: Audio generated

Step 7: 🔍 Kiểm chéo Whisper (MANDATORY)
  → Transcribe audio bằng Whisper (model base hoặc medium, language=vi)
  → So sánh transcript vs script_tts.txt
  → Đánh dấu các từ bị sai/méo — đặc biệt: mã CK, số liệu, thuật ngữ
  → Nếu sai nghiêm trọng (>10% từ quan trọng) → quay lại Step 3 sửa phiên âm
  → Lưu transcript: output/{date}/voice_{engine}_transcript.txt
  → Báo Thanh nghe thử kèm bảng so sánh lỗi
  ✅ GATE: Thanh duyệt audio

Step 8: 🎬 Render video
  → Remotion: 7 scenes (Opening, VNIndex, Wyckoff, RS, RRG, Foreign, Closing)
  → Subtitle: script_display.txt (text GỐC, KHÔNG phiên âm)
  → Subtitle PHẢI có background mờ phía dưới (tránh lẫn với video chuyển động)
  → Background video: shared/bg_login.png (blur nhẹ, opacity thấp)
  → Format: 9:16 (Shorts/TikTok) hoặc 16:9 (YouTube)
  → Merge audio + subtitle + video
  ✅ GATE: Video OK
```

## Mandatory Rules (BẮT BUỘC)

### Rule V1: Tách script hiển thị vs script đọc
- **script_display.txt** = text GỐC chuẩn tiếng Việt → dùng cho subtitle, hiển thị trên video
- **script_tts.txt** = text ĐÃ PHIÊN ÂM → dùng cho TTS engine đọc
- KHÔNG BAO GIỜ dùng text phiên âm cho subtitle

### Rule V2: Kiểm tra phiên âm TRƯỚC khi gen audio
- Load `shared/pronunciation_vi.json` — đây là Single Source of Truth
- Quét TẤT CẢ từ viết tắt, mã CK, thuật ngữ, số liệu
- Nếu từ CHƯA CÓ trong bảng → **DỪNG pipeline, hỏi Thanh**
- Sau khi Thanh xác nhận → cập nhật `pronunciation_vi.json` cho lần sau

### Rule V3: Kiểm tra chính tả
- Rà soát kịch bản TRƯỚC khi normalize
- Lỗi chính tả, thiếu dấu, sai ngữ pháp → sửa ngay
- Kịch bản tài chính: kiểm tra kỹ tên mã CK, số liệu, thuật ngữ

### Rule V4: Hỏi hình minh hoạ — CỤ THỂ
- LIỆT KÊ cụ thể hình cần, kèm **tên file gợi ý** và **mô tả nội dung**
- Ví dụ: `01_vnindex_chart.png — Chart VN-Index phiên hôm nay (từ app KFSP)`
- Mở folder `output/{date}/images/` để Thanh copy ảnh vào
- Không tự ý dùng ảnh stock hay ảnh placeholder

### Rule V5: Subtitle có background
- Subtitle PHẢI có nền mờ (semi-transparent dark background) phía dưới text
- Tránh text lẫn với video chuyển động
- Font: rõ ràng, đủ lớn cho mobile (9:16)

### Rule V6: Background video dùng chung
- Ảnh nền login/register app Flutter → lưu tại `shared/bg_login.png`
- Dùng làm background mờ nhẹ (blur + opacity) cho tất cả video
- Nếu file chưa có → tìm trong Flutter app assets và copy về

### Rule V7: Tốc độ mặc định 1.3x
- Tất cả segment type dùng base speed 1.3x
- Buildup chậm hơn (1.15x), highlight nhanh hơn (1.35x)

### Rule V8: Kiểm chéo Whisper (MANDATORY)
- SAU khi gen audio, PHẢI chạy Whisper transcribe (model base, language=vi)
- So sánh transcript vs script_tts.txt — đánh dấu từ sai/méo
- Focus: mã CK, số liệu, thuật ngữ kỹ thuật (quan trọng nhất)
- Nếu >10% từ quan trọng bị sai → quay lại sửa phiên âm hoặc đổi cách đọc
- Lưu transcript để Thanh đối chiếu
- Tool: `openai-whisper` trong `~/tts-env/`

### Rule V9: Giọng nam + Trung lập
- Chỉ dùng GIỌNG NAM (Edge TTS: NamMinhNeural, VieNeu: clone Thanh)
- Phong cách: TRUNG LẬP, đọc đều, không nhấn nhá, không kéo lê
- Mã CK, viết tắt, thuật ngữ: đọc NHANH liền mạch, ưu tiên tốc độ
- KHÔNG lên giọng, xuống giọng quá mức — điểm tin không phải kể chuyện

### Rule V10: Hình minh hoạ — đặt tên + mô tả
- Mỗi video PHẢI liệt kê danh sách hình cần, kèm:
  - Số thứ tự (01_, 02_...)
  - Tên file gợi ý (snake_case)
  - Mô tả nội dung cụ thể
- Ví dụ: `03_foreign_flow.png — Bảng khối ngoại mua/bán ròng top 10`

## Cấu trúc thư mục

```
Business/4-Operations/Automation_Hub/MKT/video-diem-tin/
├── app.py                 ← Streamlit UI
├── start.sh               ← Shortcut (alias: kfsp-video)
├── config/
│   └── pacing.json        ← Nhịp đọc (speed, temp, pause) + link pronunciation
├── shared/                ← ⭐ DÙNG CHUNG tất cả video projects
│   ├── pronunciation_vi.json  ← Bảng phiên âm (Single Source of Truth)
│   ├── bg_login.png           ← Background video (từ Flutter app)
│   └── (thêm assets chung khác)
├── data/
│   ├── sample.json        ← Market data mẫu
│   └── voice_profile_thanh.pkl  ← Voice embedding (665 bytes)
├── src/                   ← Remotion React components
│   ├── DiemTin.tsx        ← Main composition (7 scenes)
│   └── components/        ← SceneOpening, SceneVNIndex, ...
├── scripts/
│   ├── tts.mjs            ← TTS script (edge-tts fallback)
│   └── generate.mjs       ← Full pipeline CLI
├── output/                ← Generated audio + video
│   └── {YYYYMMDD}/       ← Mỗi ngày 1 folder
│       ├── script_original.txt   ← Kịch bản gốc paste vào
│       ├── script_display.txt    ← Text chuẩn cho subtitle
│       ├── script_tts.txt        ← Text phiên âm cho TTS
│       ├── images/               ← Thanh copy hình minh hoạ vào đây
│       ├── voice_vieneu.wav      ← Audio VieNeu
│       ├── voice_edge.mp3        ← Audio Edge TTS
│       └── final_video.mp4       ← Video đầu ra
└── public/                ← Static assets (audio for Remotion)
```

## Config: Nhịp đọc (pacing.json)

```json
{
  "default_speed": 1.3,
  "pronunciation_dict": "../shared/pronunciation_vi.json",
  "segment_types": {
    "intro":     { "speed": 1.3,  "temperature": 0.4, "pause_after": 0.6 },
    "explain":   { "speed": 1.3,  "temperature": 0.5, "pause_after": 0.4 },
    "buildup":   { "speed": 1.15, "temperature": 0.6, "pause_after": 0.3 },
    "highlight": { "speed": 1.35, "temperature": 0.7, "pause_after": 0.5 },
    "list":      { "speed": 1.4,  "temperature": 0.5, "pause_after": 0.3 },
    "cta":       { "speed": 1.3,  "temperature": 0.4, "pause_after": 0.0 }
  }
}
```

**Pattern nhịp đọc Thanh** (phân tích từ audio thực):
- Trung bình: 18.5 ký tự/giây
- Biên độ: 13.8 → 26.5 ch/s (tỷ lệ 1.9x)
- Pattern sóng: chậm → bình thường → nhanh → chậm lại (buildup) → nhanh (highlight)
- LUÔN có buildup trước highlight
- Không có 2 highlight liên tiếp

## Pronunciation Dictionary (shared/pronunciation_vi.json)

Single Source of Truth cho phiên âm. Cấu trúc:
```json
{
  "stock_tickers": { "HPG": { "read": "Hắt-Pê-Gờ", "alt": ["Hoà Phát"] } },
  "stock_indices": { "VN-Index": { "read": "Vi-En In-Đếch" } },
  "technical_terms": { "Wyckoff": { "read": "Why-cốc" } },
  "number_rules": { "decimal_separator": "phẩy", ... }
}
```

Thêm mã mới: sửa `shared/pronunciation_vi.json` → hỏi Thanh cách đọc trước.

## Voice Profile

**Model:** VieNeu-TTS (Apache-2.0, chạy local)
**Venv:** `~/tts-env/` (persistent, KHÔNG ở /tmp/)
**Profile:** Trung bình 4 đoạn reference (120 giây) → vector 128 chiều → 665 bytes
**File ref:** `20251128-doc co phieu.mp3`

Cập nhật profile:
```bash
source ~/tts-env/bin/activate
python3 -c "
from vieneu import Vieneu
import pickle
tts = Vieneu()
ref = tts.encode_reference('path/to/new_audio.wav')
with open('data/voice_profile_thanh.pkl', 'wb') as f:
    pickle.dump(ref, f)
"
```

## n8n Integration

**Flow:** `blIkzcrfcEf9tcuK` (IBD Nhận Định Thị Trường copy)
**Schedule:** 15:15 T2-T6
**Nhánh video (mới thêm):**
```
Clean HTML
  ├→ Send Telegram (bản tin text)
  └→ AI Pacing Analysis → Save Segments → Notify Video Ready
```

Khi n8n chạy xong → Thanh nhận TG: "🎬 Kịch bản sẵn sàng" → gõ `kfsp-video`.

## Dependencies

| Package | Version | Cài ở đâu |
|---------|---------|-----------|
| Python 3.12 | via Homebrew | `~/tts-env/` |
| vieneu | 2.4.3 | venv `~/tts-env/` |
| edge-tts | 7.2+ | pip3 global |
| streamlit | 1.56+ | venv |
| remotion | 4.0+ | `video-diem-tin/node_modules/` |
| ffmpeg | 8.0+ | Homebrew |

## Lưu ý

- **Venv:** `~/tts-env/` — persistent, không mất khi restart.
- **Voice profile** lưu trong project → không mất.
- **Remotion Studio** preview: `npm start` trong `video-diem-tin/` → http://localhost:3333
- **Shared assets** (`shared/`) dùng chung cho TẤT CẢ video projects — không xoá.
