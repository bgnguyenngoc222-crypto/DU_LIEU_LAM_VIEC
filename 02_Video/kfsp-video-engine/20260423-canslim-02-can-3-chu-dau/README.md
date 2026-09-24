# CANSLIM #02 — CAN: 3 chữ đầu

> Video sentence-driven, voice **Vbee Thanh Long** placeholder để Thanh thu đè sau.

## Status pipeline (2026-04-25)

- ✅ B1: `script_display.md` — script gốc
- ✅ B1.5: `sentences.json` — 33 câu, full main_idea + enum_items + pause + speed
- ✅ B2: 33 × Vbee TTS Thanh Long → `audio/sXX.mp3` + Whisper word_timestamps
- ✅ B4: `PLAN_STORYBOARD.md` — bảng storyboard sentence-driven
- ✅ B5: 33 Remotion compositions + Full → render → stitch → `fullpreview.mp4`

## Quick commands

```bash
# Mở Remotion Studio (port 3032 — không trùng với 2 video song song)
cd remotion-canslim && npm run studio
# → http://localhost:3032

# List tất cả compositions
cd remotion-canslim && npx remotion compositions

# Render 1 câu (test)
cd remotion-canslim && npx remotion render Sentence-s05 --output=../clips/s05.mp4

# Render tất cả 33 câu + stitch fullpreview
bash scripts/render_all.sh

# Re-gen TTS 1 câu sau khi sửa script
python3 scripts/gen_audio_per_sentence.py --only s17 --skip-tts=false
```

## Workflow thu giọng Thanh đè lên placeholder

1. Mở `audio/sXX.mp3` (Thanh Long voice) làm reference timing
2. Thu giọng Thanh đè theo nhịp đó → giữ tên file y hệt `audio/sXX.mp3`
3. Re-run whisper: `python3 scripts/gen_audio_per_sentence.py --only sXX --skip-tts`
4. Copy lại sang Remotion: `cp audio/sXX.mp3 remotion-canslim/public/audio/sXX.mp3`
5. Re-render câu đó: `cd remotion-canslim && npx remotion render Sentence-sXX --output=../clips/sXX.mp4`
6. Re-stitch: `bash scripts/render_all.sh` (sẽ skip clip đã render sẵn, chỉ render câu mới + stitch)

## Folder map

```
canslim-02-can-3-chu-dau/
├── script_display.md              ← script gốc Thanh viết
├── sentences.json                 ← B1.5 + B2 result (duration + word_timestamps)
├── PLAN_STORYBOARD.md             ← bảng storyboard
├── README.md                      ← file này
├── audio/                         ← Vbee Thanh Long .mp3 + whisper .json
│   ├── s01.mp3 .. s33.mp3
│   └── s01.json .. s33.json
├── clips/                         ← per-sentence rendered .mp4
│   ├── s01.mp4 .. s33.mp4
│   ├── pause_XXX.mp4              ← silence padding
│   └── concat_list.txt
├── fullpreview.mp4                ← stitched final
├── scripts/
│   ├── gen_audio_per_sentence.py  ← Vbee TTS + Whisper runner
│   ├── build_concat.py            ← silence padding + concat list
│   └── render_all.sh              ← render-all + stitch orchestrator
└── remotion-canslim/              ← Remotion project
    ├── package.json               ← script studio --port 3032
    ├── public/audio/              ← .mp3 phục vụ qua staticFile()
    └── src/
        ├── Root.tsx               ← register Full + 33 Sentence-sXX compositions
        ├── Full.tsx               ← stitched master (Sequence chain)
        ├── design.ts              ← tokens (1080x1920, colors, springs)
        ├── visuals.tsx            ← V_s01 → V_s33 (33 visual variants)
        ├── components/
        │   ├── SceneFrame.tsx     ← shared bg + logo + subtitle wrapper
        │   ├── Subtitle.tsx       ← karaoke per-sentence từ word_timestamps
        │   └── Helpers.tsx        ← BigText, GlassCard, PillChip, springs
        └── sentences.data.json    ← static import vào Remotion
```

## Port đã dùng (tránh trùng)

| Video | Port |
|-------|------|
| ? (đang chạy của Thanh) | 3000 |
| canslim-02 (file này) | **3032** |
| Để trống cho 2 video song song | 3033, 3034 |

## Notes

- **Duration ~181s** với giọng Thanh Long — giọng talk podcast pacing chậm hơn estimate (~110s). Khi Thanh thu đè có thể nhanh hơn → re-stitch sẽ ngắn lại. Nếu cần ép ngắn ngay với placeholder, tăng `speed` trong sentences.json (hiện 0.85-0.9) và re-gen TTS.
- **Visuals V1**: chủ yếu text + animation (chưa có screenshot KFSP thật, chưa có Buffett portrait). Đã chừa chỗ trong `visuals.tsx` để swap khi có asset (S1/S2 KFSP screener cho s10, s33).
- **Highlight subtitle** auto theo phase (gold cho Hook quote, purple cho VALUE-CA, green cho VALUE-N + empathy, red cho callback s17, amber cho empathy warning s25-26, etc.).
