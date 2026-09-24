# PLAN STORYBOARD — 3 câu hỏi để biết trạng thái thị trường thật

**Video**: `20260503-3-cau-hoi-thi-truong/`
**Format**: 1080×1920 portrait, 30fps, ~2:31 (139.7s + 11.3s pauses)
**Style**: Mẫu 1 — Dark navy `#0a1628` + radial gradient + glass cards
**Voice**: Vbee Thanh Long timing reference (anh thu đè sau)
**Sentences**: 25 câu, all word_timestamps + duration_s populated

---

## Style Guide (recap)

```ts
COLORS = {
  bgPrimary:  '#0a1628',
  bgGradient: 'radial-gradient(circle at 50% 40%, #142847 0%, #0a1628 70%)',
  bgPanel:    'rgba(255,255,255,0.04)',
  border:     'rgba(255,255,255,0.10)',
  gold:       '#f5c542',  // nhấn mạnh / gọi tên
  green:      '#34d399',  // tăng/positive
  red:        '#f87171',  // giảm/pain/cảnh báo
  purple:     '#a78bfa',  // KFSP brand / NĐT lâu năm / công cụ
};
SAFE_ZONE = {
  contentTop: 280, contentBottom: 1340,
  subtitleY:  1380-1470,  progressBarY: 1490,
};
SPRINGS = {
  heavy:    {damping:20, stiffness:80,  mass:1.2},   // áp lực, "STOP"
  resolve:  {damping:12, stiffness:250},             // dứt khoát
  calm:     {damping:18, stiffness:180},             // pro smooth
  soft:     {damping:22, stiffness:120},             // nhẹ
  decisive: {damping:14, stiffness:300},             // CTA snap
  zoom:     {damping:25, stiffness:60},              // dolly-in
};
```

---

## Asset inventory (đã có)

| File | Dùng cho | Dimensions |
|---|---|---|
| `vnindex_chart.PNG` | s01 (Hook) | 1170×2532 iPhone Pro Max |
| `heatmap_1d.PNG` | s11 (Q1 — 1 phiên) | 1170×2532 |
| `heatmap_5d.PNG` | s09, s11 (Q1 — 5 phiên) | 1170×2532 |
| `heatmap_20d.PNG` | s11 (Q1 — 20 phiên) | 1170×2532 |
| `ad_counting.PNG` | s09 (Q1 — bảng thống kê) | 1170×2532 |
| `percent_above_ma.PNG` | s15 (Q2 — % MA) | 1170×2532 |
| `rrg_sector.PNG` | s20, s21 (Q3 — RRG sector) | 1170×2532 |
| `rrg_stock_in_sector.PNG` | s21 (Q3 — RRG zoom) | 1170×2532 |
| `noluc_ketqua_5d.PNG` | s20, s22 (Q3 — NLKQ 5d) | 1170×2532 |
| `noluc_ketqua_20d.PNG` | s22 (Q3 — NLKQ 20d) | 1170×2532 |

**Em sẽ tự xử lý** (motion graphics): s02, s03, s04, s05, s06, s07, s08, s10, s12, s13, s14, s16, s17, s18, s19, s23, s24, s25.

**Phone mockup**: tất cả screenshot scale fit height 1100px (giữ aspect), border-radius 36px, border 8px `#0c0c0e`, mask gradient bottom (như canslim-01 + email v2 pattern). Tilt perspective `rotateY(-10deg) rotateX(3deg) rotate(-1.5deg)` cho mockup 3D.

---

## Storyboard 25 câu

> Cột `dur` = duration_s (audio thật từ Vbee).
> Cột `anim/spring` = preset từ design.ts.
> Cột `enum_beats` = frame_30fps đã patch trong sentences.json.
> Cột `keyword highlight` = từ cần highlight trong subtitle (xem Style Guide màu).

### HOOK (0:00 → 0:09.88)

| id | dur | display | visual_anchor | anim/spring | sfx | keyword highlight |
|---|---|---|---|---|---|---|
| s01 | 4.44s | Nếu bạn vẫn đang phân tích thị trường bằng cách mở chart VN-Index — hãy dừng ngay. | `vnindex_chart.PNG` zoom-in (perspective tilt) → STOP red icon snap @ f60 + slash diagonal red | zoom (in 0-30f) → heavy STOP @ f60 | bass snap @ f60 + glitch tear | "chart VN-Index" red, **"hãy dừng ngay"** red bold |
| s02 | 5.44s | Đây là cách những NĐT lâu năm làm. Đơn giản hơn bạn nghĩ — chỉ 3 câu hỏi mỗi ngày. | Background chart fade ra → 3 ô câu hỏi placeholder pulse vào (stagger 6f) | calm spring | soft swoosh | "NĐT lâu năm" purple, "3 câu hỏi" gold |

### PAINPOINT (0:09.88 → 0:19.86)

| id | dur | display | visual_anchor | anim/spring | sfx | keyword highlight |
|---|---|---|---|---|---|---|
| s03 | 9.38s | Vì khi chỉ dựa vào VN-Index, bạn dễ rơi vào cái bẫy mang tên Xanh vỏ Đỏ lòng — Index xanh, nhưng tài khoản vẫn giảm dần mà mình không hay. | Split-screen: trái Index xanh ↑ (line chart green), phải Account đỏ ↓ (bar chart red). Text "Xanh vỏ Đỏ lòng" pop gold→pink gradient @ f100 (heavy spring) | heavy spring on text @ f100; slow background fade-darken last 2s | dramatic chime @ "Xanh vỏ Đỏ lòng" (f100); silence last 1s | "Xanh vỏ Đỏ lòng" gold→purple gradient, "âm thầm bào mòn" red, "**không hay**" red dim |

### BRIDGE (0:19.86 → 0:34.30)

| id | dur | display | visual_anchor | anim/spring | sfx | keyword highlight |
|---|---|---|---|---|---|---|
| s04 | 4.44s | Hãy thành thật với nhau: Index chỉ đại diện cho vốn hoá thị trường một cách có trọng số. | Motion: 30 weighted cubes (sizes vary by mock cap) collapse vào 1 Index value box giữa | resolve | tap @ collapse moment | "vốn hoá" gold, "trọng số" gold |
| s05 | 6.74s | Trong khi thị trường được cấu thành từ rất nhiều cổ phiếu bên trong — và sự vận động của các cổ phiếu ấy mới tạo nên thị trường thật. | Expand: 1500+ small dots fade in around the Index, soft particle | soft (stagger ramp 0-90f) | gentle ambient ramp | "nhiều cổ phiếu" purple, "thị trường thật" green |
| s06 | 3.26s | Và 3 câu hỏi sau đây giúp bạn nhìn rõ hơn sự vận động ấy. | 3 empty glass cards pulse in (stagger 8f), labelled "1", "2", "3" | calm | pop x3 | "3 câu hỏi" gold |

### Q1 — TƯƠNG QUAN MÃ TĂNG GIẢM (0:34.30 → 1:04.36)

| id | dur | display | visual_anchor | anim/spring | sfx | keyword highlight |
|---|---|---|---|---|---|---|
| s07 | 2.38s | Một: Tương quan số mã tăng giảm đang thế nào? | Big text card "MỘT" (gold) snap-in left, question text right | resolve | confident pop | "Một" gold huge, "tương quan" purple |
| s08 | 8.38s | Khi trả lời câu hỏi này, bạn sẽ biết thị trường và Index có chuyển động đồng pha hay không. Đây cũng chính là cách bạn nhận diện sớm hiện tượng Xanh vỏ Đỏ lòng. | Diagram: 2 lines side-by-side — line A (Index) + line B (avg cổ phiếu). f0-f120: đồng pha. f120+: B drift xuống. Highlight "Xanh vỏ Đỏ lòng" gold @ f180. | calm | tick @ phase divergence | "đồng pha" purple, "Xanh vỏ Đỏ lòng" gold |
| s09 | 9.12s | Bạn chỉ cần mở bản đồ nhiệt hoặc bảng thống kê số mã tăng giảm trên KFSP — nhìn mảng màu, hoặc đếm thẳng số mã tăng / giảm: đỏ nhiều hơn hay xanh nhiều hơn? | Split: trái `heatmap_5d.PNG` phone mockup, phải `ad_counting.PNG` mockup. **Beat 1 spotlight `heatmap_5d` @ f25** (purple glow). **Beat 2 spotlight `ad_counting` @ f58** (purple glow). Dim cái còn lại 60%. | calm zoom on each spotlight | tap @ f25 + tap @ f58 | "bản đồ nhiệt" purple, "bảng thống kê" purple, "đỏ" red, "xanh" green |
| s10 | 3.22s | Đơn giản như đứa trẻ nhìn. Đừng áp đặt suy nghĩ cá nhân. | Icon: child eye silhouette overlay (large, soft). Text "đứa trẻ nhìn" gold pulse | soft | child whisper soft | "đứa trẻ" gold, "đừng áp đặt" red |
| s11 | 6.96s | Bản đồ nhiệt KFSP xem được 1, 5, 20 phiên — đủ thấy dòng tiền lan toả thật, hay chỉ tập trung vài mã. | Phone mockup centered. **Beat 1 `heatmap_1d.PNG` @ f52, Beat 2 crossfade `heatmap_5d.PNG` @ f72, Beat 3 crossfade `heatmap_20d.PNG` @ f89**. Each beat: chip label "1 phiên" / "5 phiên" / "20 phiên" pop bottom. | calm crossfade 8f | subtle tick @ each beat | "1, 5, 20 phiên" gold, "lan toả thật" green, "tập trung vài mã" red |

### Q2 — XU HƯỚNG ĐỒNG THUẬN (1:04.36 → 1:36.74)

| id | dur | display | visual_anchor | anim/spring | sfx | keyword highlight |
|---|---|---|---|---|---|---|
| s12 | 3.08s | Hai: Xu hướng có đồng thuận giữa cổ phiếu và Index không? | Big text card "HAI" (gold) snap-in | resolve | confident pop | "Hai" gold huge, "đồng thuận" purple |
| s13 | 5.18s | William O'Neil có một nguyên lý — trong một xu hướng rõ rệt, 75% cổ phiếu sẽ đi theo. | Layout: trái ảnh chân dung William O'Neil (em fetch online — public domain), phải "75%" gold huge pop @ f60. Caption "trong xu hướng rõ rệt" dưới. | heavy on "75%" @ f60 | declarative thump @ f60 | "William O'Neil" purple, "**75%**" gold huge, "đi theo" green |
| s14 | 9.32s | Vì vậy khi Index tăng, bạn cần check xem chuyển động đó có sự ủng hộ của số đông cổ phiếu, hay chỉ một vài mã đơn lẻ — trong khi phần lớn còn lại đang suy yếu dần. | Chart minh hoạ: 1 fat green line (Index) ↑, 8 thin red lines (cổ phiếu) drift xuống. Animated reveal stocks dần dần. | calm reveal | soft sigh @ "suy yếu dần" | "số đông" green, "đơn lẻ" red, "suy yếu" red |
| s15 | 9.26s | Chỉ cần mở biểu đồ % cổ phiếu trên các đường MA. Nếu biểu đồ này giảm dần trong khi Index cứ tiếp tục lên — đó là dấu hiệu có gì đó bất thường. Hãy cẩn thận. | `percent_above_ma.PNG` phone mockup centered. Animated arrow ↓ red overlay theo trục biểu đồ giảm dần. "BẤT THƯỜNG" red text pop @ f200. "CẨN THẬN" red bold pop @ f240. | calm arrow draw + decisive on warning text | warning chime @ f200 | "% cổ phiếu trên MA" purple, "giảm dần" red, "bất thường" red, "**Hãy cẩn thận**" red bold |
| s16 | 5.54s | Nhớ nha: Xu hướng của Index cần có sự ủng hộ của số đông cổ phiếu, mới có thể hi vọng bền vững. | Glass card key takeaway. Text "BỀN VỮNG" green bold pop cuối @ f130. | resolve | gentle bell @ f130 | "số đông cổ phiếu" green, "**bền vững**" green bold |

### Q3 — DÒNG TIỀN HƯỚNG TỚI (1:36.74 → 2:03.46)

| id | dur | display | visual_anchor | anim/spring | sfx | keyword highlight |
|---|---|---|---|---|---|---|
| s17 | 2.82s | Ba: Dòng tiền đang tập trung ở đâu trên thị trường? | Big text card "BA" (gold) snap-in | resolve | confident pop | "Ba" gold huge, "dòng tiền" gold |
| s18 | 6.88s | Đây là câu hỏi quan trọng — vì chúng ta không chỉ muốn biết trạng thái thị trường, mà còn cần biết thị trường đang hoạt động tích cực ở nơi nào. | Map metaphor: dark canvas với glowing zones tích cực sáng lên ở các vị trí (ngành) | soft zone glow | low ambient hum | "trạng thái" purple, "tích cực" green |
| s19 | 3.42s | Hãy nhớ điều này: dòng tiền đi đến đâu, nơi đó trở nên thịnh vượng. | Animated coins flow line → glowing destination box. Word "thịnh vượng" gold pop @ f80. | resolve on destination | bell chime @ "thịnh vượng" | "dòng tiền" gold, "**thịnh vượng**" green bold |
| s20 | 4.26s | Bạn chỉ cần mở biểu đồ RRG hoặc Bảng Nỗ lực Kết quả trên KFSP. | Split: trái `rrg_sector.PNG` mockup, phải `noluc_ketqua_5d.PNG` mockup. **Beat 1 spotlight RRG @ f32**, **Beat 2 spotlight NLKQ @ f70**. | calm zoom each spotlight | tap @ f32 + tap @ f70 | "RRG" purple, "Nỗ lực Kết quả" purple |
| s21 | 4.50s | Trên RRG, hãy tập trung vào những nhóm ngành đang di chuyển nhanh hướng lên và sang phải. | `rrg_stock_in_sector.PNG` (full mockup) → highlight upper-right quadrant với border green + animated arrow ↗ | calm + arrow draw | swoosh @ arrow | "lên + sang phải" green |
| s22 | 4.84s | Trên Bảng Nỗ lực Kết quả, hãy chú ý đến những Ngành có Nỗ Lực và Kết Quả cùng tăng. | `noluc_ketqua_20d.PNG` (full mockup) → highlight 2-3 rows where Nỗ Lực + Kết Quả cùng tăng (green outline + arrow ↑) | calm + outline pulse | tick x3 | "Nỗ Lực" gold, "Kết Quả" gold, "cùng tăng" green |

### CTA (2:03.46 → 2:20.30)

| id | dur | display | visual_anchor | anim/spring | sfx | keyword highlight |
|---|---|---|---|---|---|---|
| s23 | 7.06s | Sau 3 câu hỏi, nếu mình không đi cùng hướng Index, và cũng không phải nơi dòng tiền tới — hãy chủ động phòng thủ. | Warning glass card "PHÒNG THỦ" gold center, shield icon đập vào (heavy spring) | heavy on shield | impact thump @ shield | "không đi cùng hướng" red, "**phòng thủ**" gold bold |
| s24 | 5.72s | Nâng tỷ lệ tiền mặt lên. Đây không phải là rút khỏi thị trường — mà là sẵn sàng cho những cơ hội tiếp theo. | Animated piggy bank growing + cash stack rising. "SẴN SÀNG" green bold pop cuối @ f130 | soft growth + decisive on text | coin clink + soft chime | "tiền mặt" gold, "**sẵn sàng**" green, "cơ hội tiếp theo" green |
| s25 | 4.06s | Tải KFSP ngay — và bắt đầu phân tích thị trường theo cách đầy đủ hơn. | KFSP logo big center (purple glow) + App Store + Play Store badges below. Pulse logo @ f30 | decisive logo + soft badges | brand chime | "Tải KFSP" purple, "đầy đủ hơn" gold |

---

## Subtitle approach

- Source: `display` field per câu (chính tả đúng — KHÔNG dùng `tts`)
- Map: `word_timestamps` từ `sentences.json` (Whisper, đã sai chính tả ở vài chỗ — em sẽ map sequential bằng count nếu lệch)
- Layout: 1 dòng, `whiteSpace: nowrap`, font 38-42px bold auto-scale `min(42, 960/words × 0.85)`
- Y position: 1380-1470 (TikTok safe zone)
- Karaoke: từ đã đọc highlight đậm, chưa đọc 30% opacity
- Fade: 4 frames in/out per chunk
- Chunk: 5-6 từ/dòng, chuyển liên tục theo word boundary
- Highlight color: bảng "keyword highlight" trong storyboard rows trên

---

## QA Audit Checklist (24 mục — must pass before B5)

### Content (sentence-driven)
- [ ] 1. Mỗi câu có visual_anchor riêng — không câu nào "borrow" visual của câu trước
- [ ] 2. main_idea trong `sentences.json` được phản ánh trong visual_anchor
- [ ] 3. Câu có enum_items (s09, s11, s20) → visual element pop đúng frame_30fps (lệch ≤ 2f)
- [ ] 4. CTA không kêu mua bán — chỉ kêu phòng thủ + tải app

### Timing
- [ ] 5. Tổng duration = 139.7s (per audio) + 11.3s pauses = 151s ≈ 2:31
- [ ] 6. Mỗi câu durationInFrames = ceil(duration_s × 30)
- [ ] 7. Pause giữa phase đúng theo `pause_after_ms` trong sentences.json

### Visual layout
- [ ] 8. Subtitle Y=1380-1470 (TikTok safe zone, không bị TikTok UI che)
- [ ] 9. Logo top KFSP nếu có Y=160-290
- [ ] 10. Progress bar Y=1490
- [ ] 11. Content chính Y=280-1340 (safe zone)
- [ ] 12. Phone mockup không bị crop bởi safe zone
- [ ] 13. Text/textbox minh hoạ KHÔNG đè lên screenshot app — luôn có vùng riêng

### Animation
- [ ] 14. CẤM `linear` easing — chỉ ease-out hoặc spring presets
- [ ] 15. Mỗi enum beat: element pop đúng word timestamp (lệch ≤ 2f), KHÔNG stagger đều
- [ ] 16. Spring preset matches tâm lý câu (heavy = pain, resolve = snap, calm = pro, soft = nhẹ)

### Subtitle
- [ ] 17. Subtitle dùng `display`, không phải `tts`
- [ ] 18. Karaoke từ-by-từ theo word_timestamps Whisper
- [ ] 19. Chunks 5-6 từ/dòng, fade 4f
- [ ] 20. Keyword highlight đúng màu theo Style Guide

### Audio
- [ ] 21. Mỗi câu dùng `audio/sXX.mp3` qua `staticFile()` — không re-bundle audio
- [ ] 22. Audio sync với video (khớp 1:1, không lệch)

### Render gate
- [ ] 23. Per-sentence render rồi mới stitch, KHÔNG monolithic
- [ ] 24. Gate per phase: HOOK → duyệt → PAINPOINT → ... → CTA → final

---

## Enum_beats summary (đã patch)

| Câu | Enum item | Frame | Anchor word (whisper) |
|---|---|---|---|
| s09 | "bản đồ nhiệt" | 25 | "bản" (đúng) |
| s09 | "bảng thống kê" | 58 | "bản" (whisper sai → manual patch) |
| s11 | "1 phiên" | 52 | "1" (đúng) |
| s11 | "5 phiên" | 72 | "5" (đúng) |
| s11 | "20 phiên" | 89 | "20" (đúng) |
| s20 | "RRG" | 32 | "rở rở rở" (whisper sai → manual patch) |
| s20 | "Bảng Nỗ lực Kết quả" | 70 | "bảng" (đúng) |

---

## Next: B5 — Setup Remotion + render HOOK first

1. Copy `remotion-canslim01/` → `remotion-3cauhoi/`, copy `node_modules/`
2. Đổi `package.json` name + port=3014
3. Copy `audio/*.mp3` + `screen-shot/*.PNG` → `public/`
4. Copy `sentences.json` → `src/sentences-data.json`
5. Build src files theo structure trong plan file
6. Render HOOK (s01-s02) trước → GATE
