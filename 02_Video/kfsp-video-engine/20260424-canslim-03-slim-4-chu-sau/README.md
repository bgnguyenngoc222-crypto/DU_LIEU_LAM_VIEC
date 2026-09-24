# CANSLIM #03 — SLIM = HIỆN TẠI

Sentence-driven preview pipeline. Voice giọng Thanh Long (Vbee) là **timing reference** — Thanh sẽ thu giọng đè sau, giữ duration tương tự.

## Folder layout

```
canslim-03-slim-4-chu-sau/
├── script_display.md         # Kịch bản gốc v2
├── sentences.json            # 27 câu, đã populate duration_s + word_timestamps (B1.5+B2)
├── PLAN_STORYBOARD.md        # Storyboard sentence-driven (B4)
├── README.md                 # File này
├── audio/                    # Vbee TTS per-sentence (giọng Thanh Long)
│   ├── s01.mp3 ... s27.mp3
│   └── s01.json ... s27.json # Whisper word timestamps
├── clips/                    # Per-sentence rendered mp4
│   └── s01.mp4 ... s27.mp4
├── final.mp4                 # Stitched preview (sau khi chạy stitch_final.py)
├── logs/                     # vbee_gen.log, whisper.log
├── scripts/
│   ├── gen_tts_per_sentence.py
│   ├── whisper_per_sentence.py
│   └── stitch_final.py
└── remotion-canslim03/       # Remotion project (port 3030)
    ├── package.json
    ├── public/audio/         # Mirror của ../audio/*.mp3 cho staticFile
    └── src/
        ├── index.ts
        ├── Root.tsx          # 27 Compositions Sentence-s01 → Sentence-s27
        ├── SentenceShell.tsx # Visual recipe per sentence id
        ├── design.ts         # COLORS, FONTS, LAYOUT, PHASE_TINT/ACCENT
        ├── sentencesData.ts
        ├── sentences.json    # Copy của ../sentences.json (compile-time import)
        ├── types.ts
        └── components/       # Background, Logo, SubtitleBar, MainIdea, ...
```

## Pipeline đã chạy

| Bước | Trạng thái | Output |
|---|---|---|
| B1   | ✓ Done   | script_display.md (v2, 2026-04-25) |
| B1.5 | ✓ Done   | sentences.json — 27 câu, phase HOOK / VALUE_INTRO / VALUE_S/L/I/M / VALUE_WRAP / CTA |
| B2   | ✓ Done   | audio/s01.mp3 → s27.mp3 (giọng Thanh Long, 137.35s tổng) + whisper word_timestamps |
| B3   | ⏳ Pending | screen-shot/ — chưa có (placeholder text "B3: chèn screenshot KFSP RS rating ở đây" trong s14) |
| B4   | ✓ Done   | PLAN_STORYBOARD.md |
| B5   | ✓ Done   | clips/s01.mp4 → s27.mp4 + final.mp4 (preview) |

## Studio dev (port 3030)

```bash
cd remotion-canslim03
npm run studio
# → http://localhost:3030
```

Studio có 28 compositions:
- `FullPreview` — toàn bộ 27 câu sequenced với pause_after_ms gaps (≈155s)
- `Sentence-s01` … `Sentence-s27` — atomic per-sentence (để render rời khi cần edit câu)

## Render lại full preview

```bash
cd remotion-canslim03
npx remotion render FullPreview --output=../full_preview.mp4
```

So sánh 2 phương thức gộp:
- `final.mp4` — stitched bằng ffmpeg, mỗi pause là **freeze last frame** (mượt, không black gap)
- `full_preview.mp4` — Remotion render trực tiếp Composition `FullPreview`, mỗi pause là **black/bg-primary gap** (nhanh, dùng để xem từ Studio)

Port 3030 chọn để **không xung đột** với 2 Remotion project khác:
- `20260413-tam soat tang truong/remotion-tamsoat` đang chạy port 3000

## Render lại 1 câu (atomic edit)

```bash
cd remotion-canslim03
npx remotion render Sentence-s11 --output=../clips/s11.mp4
# Sau đó re-stitch:
cd .. && python3 scripts/stitch_final.py
```

## Thu giọng đè (B6 sau này)

1. Thanh thu thay `audio/{id}.mp3` (giữ duration tương đương — vì Vbee đọc chậm hơn Thanh, nhiều khả năng cần re-time)
2. Re-run whisper: `python3 scripts/whisper_per_sentence.py s01 s02 ...`
3. Re-render câu bị ảnh hưởng: `npx remotion render Sentence-s01 --output=../clips/s01.mp4`
4. Re-stitch: `python3 scripts/stitch_final.py`

## Known Limitations (preview hiện tại)

- **Voice Vbee Thanh Long** đọc dài hơn target (137s vs 85-92s) — Thanh thu sẽ ngắn lại
- **Visual placeholder** — chưa có screenshot KFSP, chưa có Lottie/SFX, chưa BGM
- **Subtitle** dùng whisper text (sai chính tả vài chỗ) — có thể đổi sang display text mapping nếu cần
- **Debug overlay** ở top-left mỗi câu (id · phase · main_idea) — sẽ tắt cho final render
