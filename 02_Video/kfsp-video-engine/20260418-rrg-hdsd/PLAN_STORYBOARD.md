# PLAN — Video HDSD Biểu đồ RRG (KFSP)

## Context

Thanh có sẵn `Screen Recording 2026-04-18 at 10.50.47.mov` (78.8s, 3322×1594, 60fps, landscape, không tiếng) demo 3 cách dùng tab RRG trong app KFSP:

1. **Tab Ngành** — view 24 ngành tổng quan trên RRG
2. **Tab Bảng dữ liệu** — search & so sánh từng mã CK
3. **Tab Watchlist** — theo dõi danh mục, sort theo ngành

User muốn **không thêm voiceover**, chỉ **add overlay text + mũi tên + spotlight** để biến screen recording thành video HDSD trực quan. Output **giữ landscape gốc**, có thể pause/freeze frame để giải thích.

Mục tiêu: F0/tay ngang xem xong hiểu (a) RRG là gì — 4 vùng trên đồ thị, (b) 3 cách feed dữ liệu vào RRG, (c) cách đọc trạng thái mã.

---

## Timeline screen recording (đã map từ frame-by-frame)

| t (s) | Hành động trong recording | Tab |
|---|---|---|
| 0.0–6.0 | Tab "Ngành" mặc định, dropdown "Phân tích BCTC mới" hiện top-right rồi đóng. Bảng list 24 ngành, BĐS = "Dẫn dắt" | Ngành |
| 6.0–9.0 | Tick checkbox **BẤT ĐỘNG SẢN** → ngành plot lên RRG (xanh, vùng DẪN DẮT) | Ngành |
| 9.0–12.0 | Click sang tab **"Bảng dữ liệu"** | Chuyển tab |
| 12.0–18.0 | Type "VIC" trong ô search | Bảng DL |
| 18.0–23.0 | Tick **VIC + NVL** → 2 stocks plot (VIC tím, NVL đỏ ở SUY YẾU) | Bảng DL |
| 23.0–30.0 | Bỏ tick VIC, search "n", chỉ còn NVL | Bảng DL |
| 30.0–38.0 | Tick **NLG** → NVL + NLG (cả 2 BĐS) | Bảng DL |
| 38.0–45.0 | Tick **VIC + VHM** → 4 mã BĐS, hover tooltip VHM (Dẫn dắt, Sức mạnh 111.13) | Bảng DL |
| 45.0–50.0 | Click "Xóa tất cả" → reset, ngành BĐS lại hiện | Bảng DL |
| 50.0–55.0 | Click tab **"Watchlist"**, chọn watchlist "Ready" (nhiều stocks: CK, Công nghệ, Phân bón…) | Watchlist |
| 55.0–62.0 | Sort by Ngành ↑, scroll list | Watchlist |
| 62.0–69.0 | Tick 5 mã Chứng khoán (**VCI, SSI, VND, VIX, MBS**) → 5 plot | Watchlist |
| 69.0–78.8 | Hover quanh RRG để khoe đường đi của từng mã | Watchlist |

---

## Cấu trúc video output (target ~110–125s)

Recording 78.8s + 5 freeze-frame "giảng bài" (mỗi cái 4–8s) = **khoảng 110–125s**. Không thêm voiceover, chỉ overlay.

### Phân chương

| Chương | Thời lượng | Source | Nội dung overlay |
|---|---|---|---|
| **0. INTRO** | 0–8s | Freeze frame 0 (RRG trống) + ảnh app | Title: "Hướng dẫn dùng Biểu đồ RRG" + sub: "3 cách khám phá sức mạnh thị trường" |
| **1. RRG là gì** | 8–18s | Freeze frame 0 (RRG trống) | Label 4 vùng + giải thích 1 dòng: PHỤC HỒI / DẪN DẮT / ĐUỐI SỐ / SUY YẾU. Hai trục: SỨC MẠNH (x), GIÁ (y) |
| **2. Cách 1 — Tab Ngành** | 18–32s | Recording 0–9s + freeze 4s | Đầu: badge "CÁCH 1 / 3 — Theo NGÀNH". Khi tick BĐS: spotlight checkbox + arrow → spotlight điểm BĐS trong RRG, callout "Ngành BĐS đang DẪN DẮT thị trường" |
| **3. Cách 2 — Bảng dữ liệu** | 32–80s | Recording 9–50s + freeze 5s | Đầu: badge "CÁCH 2 / 3 — Theo từng MÃ". Spotlight ô search khi type "VIC". Khi tick VIC+NVL: callout "VIC vùng tím (Phục hồi yếu) — NVL vùng đỏ (Suy yếu)". Khi 4 BĐS hiện: callout "So sánh 4 mã cùng ngành — chọn mã DẪN DẮT". Khi hover VHM tooltip: arrow vào tooltip + zoom 1.5x |
| **4. Cách 3 — Watchlist** | 80–115s | Recording 50–78.8s + freeze 4s | Đầu: badge "CÁCH 3 / 3 — Theo WATCHLIST". Khi đổi watchlist Ready: callout "Theo dõi danh mục riêng". Khi sort ngành: arrow vào header "Ngành ↑" + caption "Sort để so sánh cùng nhóm". Khi tick 5 CK: callout "5 mã CK — phân hoá rõ rệt: VND/SSI Phục hồi, VIX/MBS Dẫn dắt, VCI Suy yếu" |
| **5. CTA** | 115–125s | Freeze frame cuối | "Mở app KFSP → Tab RRG → Thử ngay" + logo + link bio |

---

## Overlay design system (giữ tone CLAUDE.md)

### Màu (đồng bộ với 4 vùng RRG có sẵn)

- **DẪN DẮT** = green `#34d399`
- **PHỤC HỒI** = purple `#a78bfa`
- **SUY YẾU** = orange `#f5a142` (cam)
- **ĐUỐI SỐ** = red `#f87171`
- **Highlight chung** = gold `#f5c542`
- **BG callout** = navy glass `rgba(10, 22, 40, 0.85)` + blur 12 + border 1px
- **Mũi tên** = `#f5c542` stroke 6, có drop-shadow

### Loại overlay (4 primitive)

1. **TitleCard** — fullscreen, fade-in spring `heavy`, dùng cho INTRO + đầu mỗi chương
2. **Spotlight + Dim** — vùng quan tâm sáng nguyên, ngoài vùng dim 60% bằng SVG mask. Spring `calm`, hold 1.5–3s
3. **Arrow + Callout** — mũi tên cong từ callout vào target. Callout glass card, chữ trắng. Mũi tên draw stroke `decisive` 14f
4. **Zoom-in lens** — magnify 1.5–2x vào vùng nhỏ (vd tooltip VHM, dropdown). Spring `zoom` 25f, hold 2s

### Easing — tuân CLAUDE.md (CẤM linear)

- TitleCard: spring `heavy` (stiff 80, mass 1.2)
- Callout pop: spring `decisive` (stiff 300)
- Spotlight reveal: spring `calm` (stiff 180)
- Zoom-in: spring `zoom` (stiff 60, dur 25f)

### Subtitle/badge bottom bar (chương)

- Y=1500–1580 (bottom safe — landscape khác portrait, có thể đè), bg navy glass
- Format: `[CÁCH 2/3 — BẢNG DỮ LIỆU]` — bold gold, 32px

---

## Architecture Remotion

### Project mới: `20260418-rrg-hdsd/remotion-rrg/`

Folder structure:

```
20260418-rrg-hdsd/
├── PLAN_STORYBOARD.md            (copy plan này, archive)
├── source.mov                    (symlink → Screen Recording 2026-04-18 at 10.50.47.mov)
├── source-h264.mp4               (pre-transcode 30fps h264 cho Remotion)
├── final.mp4
└── remotion-rrg/
    ├── package.json
    ├── remotion.config.ts
    ├── public/
    │   └── source-h264.mp4       (Remotion staticFile)
    └── src/
        ├── Root.tsx              (registerRoot composition VideoRRG)
        ├── VideoRRG.tsx          (Series of 6 scenes)
        ├── design.ts             (color, easing, spring presets)
        ├── components/
        │   ├── TitleCard.tsx
        │   ├── Spotlight.tsx     (SVG dim mask + bright window)
        │   ├── ArrowCallout.tsx  (animated SVG path + glass card)
        │   ├── ZoomLens.tsx      (CSS transform-origin zoom)
        │   ├── ChapterBadge.tsx  (bottom bar badge)
        │   └── RRGZoneLabels.tsx (4 labels overlay khi giảng RRG)
        └── scenes/
            ├── Scene0_Intro.tsx       (0–8s, freeze frame)
            ├── Scene1_RRGZones.tsx    (8–18s, freeze + 4 zone labels stagger)
            ├── Scene2_Nganh.tsx       (18–32s, OffthreadVideo + overlays + freeze 4s)
            ├── Scene3_BangDuLieu.tsx  (32–80s, OffthreadVideo + overlays + freeze 5s)
            ├── Scene4_Watchlist.tsx   (80–115s, OffthreadVideo + overlays + freeze 4s)
            └── Scene5_CTA.tsx         (115–125s, freeze + logo + CTA)
```

### Composition

- `<Composition id="VideoRRG" width=1920 height=920 fps=30 durationInFrames=3750>` (≈125s)
  - Width/height: 1920×920 (giảm từ 3322×1594, giữ aspect 2.085, lossless visual)
- Scene wiring: `<Series>` với `<Series.Sequence durationInFrames={...}>` cho 6 scenes
- Mỗi Scene render một instance `<OffthreadVideo src={staticFile('source-h264.mp4')} startFrom={x} endAt={y} />` (trừ Scene0/1/5 là freeze hoặc CTA)
- Freeze-frame achieved bằng `<OffthreadVideo startFrom={X} endAt={X+1} playbackRate={0.001}>` hoặc kỹ thuật `<Img>` trích từ ffmpeg trước

### Key technical decisions

1. **Pre-transcode .mov → .mp4 h264 30fps** trước khi đưa vào Remotion (CLAUDE.md mục 6, đã làm cho HEVC):
   ```bash
   ffmpeg -i "Screen Recording 2026-04-18 at 10.50.47.mov" \
     -c:v libx264 -r 30 -an -crf 18 source-h264.mp4
   ```
   60fps → 30fps OK vì recording static UI, không có motion blur quan trọng.

2. **Freeze frame** = trích PNG bằng ffmpeg ở các timestamp key, hiển thị `<Img>` thay vì pause video. Đơn giản, tránh issue Remotion offthread với playbackRate=0.

3. **Coordinate map**: tất cả tọa độ overlay (arrow, spotlight, callout) đo trên frame 1920×920 sau scale. Tôi sẽ dùng frame screenshot để đo pixel chính xác cho từng spotlight (vd checkbox BĐS ở `(x=20, y=70, w=18, h=18)` trên 960-wide preview → x2 ra final).

4. **Reusable arrow primitive** — dùng SVG `<path>` với `pathLength` + `strokeDasharray` để draw stroke animation (CLAUDE.md mục 5: ease-out).

5. **Per-scene render + stitch** (theo nguyên tắc 4 của CLAUDE.md mục 13 — sentence-driven, ở đây là scene-driven):
   - `npx remotion render Scene0 ... clips/scene0.mp4` → ... → `clips/scene5.mp4`
   - `ffmpeg -f concat -i list.txt -c copy final.mp4`
   - Sửa overlay chương 3 → chỉ re-render `scene3.mp4` → re-stitch.

---

## Critical files to create

| File | Mục đích |
|---|---|
| `20260418-rrg-hdsd/source-h264.mp4` | Pre-transcoded source |
| `20260418-rrg-hdsd/freeze-frames/*.png` | Freeze frames trích từ source ở t=0, 9, 32, 50, 78 |
| `remotion-rrg/src/Root.tsx` | Register composition |
| `remotion-rrg/src/VideoRRG.tsx` | Series wiring 6 scenes |
| `remotion-rrg/src/design.ts` | Color/spring presets — **reuse trực tiếp từ `20260414-11 tieu chi fa/remotion-fa/src/design.ts`** (có sẵn heavy/calm/decisive/zoom springs) |
| `remotion-rrg/src/components/Spotlight.tsx` | SVG dim mask primitive |
| `remotion-rrg/src/components/ArrowCallout.tsx` | Animated arrow + glass card |
| `remotion-rrg/src/scenes/Scene{0..5}.tsx` | 6 scene components |

**Reuse từ project cũ** (không code chay):
- `20260414-11 tieu chi fa/remotion-fa/src/design.ts` — color palette + spring presets
- `20260414-11 tieu chi fa/remotion-fa/src/components/` — kiểm tra có `SubtitleBar`, `SFXLayer` reuse được không
- Pattern Series/scene từ `ShortFA.tsx`

---

## Verification

1. **Pre-flight**:
   - `ffprobe source-h264.mp4` xác nhận codec h264, fps=30, duration=78.8s
   - Trích 5 freeze frame PNG, mở xem rõ
2. **Per-scene preview**:
   - `npx remotion studio` → preview từng scene Scene0…Scene5
   - Gate sau Scene1 (RRG zones): Thanh duyệt 4 label vùng đúng vị trí, màu khớp
3. **Per-scene render** (gate theo chương):
   - Render Scene0+1 → Thanh duyệt INTRO + RRG là gì
   - Render Scene2 → duyệt Cách 1 (Ngành)
   - Render Scene3 → duyệt Cách 2 (Bảng DL) — chương dài nhất, nhiều overlay
   - Render Scene4 → duyệt Cách 3 (Watchlist)
   - Render Scene5 → duyệt CTA
4. **Stitch + final review**:
   - `ffmpeg concat` → `final.mp4`
   - Xem trên iPhone (landscape) confirm safe zone không cắt overlay
   - Check: arrow không đè vào dropdown/tooltip cần đọc, spotlight không che mất số liệu

---

## Decisions đã chốt

- **Resolution**: 1920×920 (scale từ 3322×1594, aspect 2.085)
- **Audio**: Silent hoàn toàn — không BGM, không SFX. Chỉ overlay visual.
- **Logo**: Dùng `_shared/anh-ai/TACH NEN-2.png` hoặc `tachnen.png` (PNG transparent có sẵn). Tôi sẽ chọn ảnh phù hợp INTRO/CTA sau khi xem.

## Pipeline thực thi (sau khi approved)

1. Tạo folder `20260418-rrg-hdsd/`, copy plan này vào `PLAN_STORYBOARD.md`
2. Pre-transcode `Screen Recording 2026-04-18 at 10.50.47.mov` → `source-h264.mp4` (h264 30fps)
3. Trích 5 freeze frame PNG ở t={0, 9, 32, 50, 78}
4. Scaffold `remotion-rrg/` từ template, copy `design.ts` từ remotion-fa
5. Build 4 component primitive (TitleCard, Spotlight, ArrowCallout, ZoomLens, ChapterBadge)
6. Build Scene0 → Scene1 → **GATE Thanh duyệt INTRO + RRG zones**
7. Build Scene2 → render → **GATE Cách 1**
8. Build Scene3 → render → **GATE Cách 2** (chương dài nhất, có thể cần 2 vòng)
9. Build Scene4 → render → **GATE Cách 3**
10. Build Scene5 → render → **GATE CTA**
11. ffmpeg concat → `final.mp4` → review trên iPhone landscape
12. B6 atomic fix theo feedback (re-render từng scene riêng, không re-render toàn bộ)
