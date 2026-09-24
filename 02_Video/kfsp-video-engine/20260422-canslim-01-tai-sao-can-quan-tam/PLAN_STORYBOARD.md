# PLAN STORYBOARD — CANSLIM #01: Tại sao bạn cần biết CANSLIM

> **Ngày plan:** 2026-04-25
> **Series:** CANSLIM Foundations — video #01 (mở series)
> **Framework:** Hook-Value-CTA (teaser/reveal-driven)
> **Duration target:** 75–80s (estimate hiện tại: ~82s, sẽ refit sau khi anh thu)
> **Voice mode:** Self-recorded (anh Thanh tự thu — KHÔNG dùng Vbee)
> **Style:** Mẫu 1 — dark navy `#0a1628` + glass cards + highlights gold/green/red/purple
> **Reveal moment:** s14 (~0:58) — chữ CANSLIM xuất hiện lần đầu trong video.

---

## 1. Sentence-Driven Storyboard Table

> **Quy ước**: Frame số = 30fps. Frame range trong cột `frames` đã bao gồm pause sau câu. Tất cả số là **estimate** (ước tính ở 4.5 syl/s + pause). Khi anh thu xong, chạy Whisper full audio → populate `duration_s` + `word_timestamps` vào `sentences.json` → re-fit toàn bảng (chỉ frame number đổi, concept visual giữ nguyên).
>
> **enum_beats**: hiện đánh dấu `TBD-whisper` cho mọi câu liệt kê. Sau khi có word timestamps, populate frame chính xác (lệch ≤2f so với word "thanh khoản", "lợi nhuận"...).

### HOOK — paint pain (0:00 → 0:21)

| ID | Phase | Frames | Display (subtitle) | Main idea | Visual anchor | Animation / Easing | Enum beats | SFX |
|----|-------|--------|-------------------|-----------|---------------|--------------------|----|-----|
| s01 | HOOK | 0–188 (0:00–0:06) | Cổ phiếu mình cầm thì đứng im một chỗ, trong khi cổ phiếu khác cứ tăng ầm ầm — lãi tính chục %, có khi bằng lần. | mình đứng im, đối thủ bằng lần | **Split screen** từ frame đầu: **trái** = chart flatline gray (mình cầm), label "Mình" mờ; **phải** = chart rocket xanh tăng dốc 60° + chuỗi badge **"+10%" → "+20%" → "+50%" → "+100%"** pop dần phía trên đường cong. | Split screen fade-in `calm`. Chart trái flatline đứng yên tuyệt đối (bế tắc). Chart phải tăng `ease-out`. Badge "+10%" pop đúng tại word "**chục %**", badge "+100%" pop đúng tại word "**bằng lần**" (TBD-whisper). | `["chục %", "bằng lần"]` @ TBD-whisper | flat-tone (chart trái) + whoosh-up ×2 nhẹ (badge phải) |
| s02 | HOOK | 188–340 (0:06–0:11) | Bảo không khó chịu thì có vẻ chưa thật lòng lắm — mà chỉ số tài chính của mình đẹp lắm chứ. | khó chịu, mà FA đẹp mà | Center: emoji 🙄 lớn + text "không khó chịu?" red. Tại dấu **—** twist: chart trái s01 callback hiện lại + badge **"FA Score 9/10"** green pulse pop bên cạnh (irony: metrics đẹp mà giá đứng). | Emoji + text pop `heavy` spring (cảm xúc nặng). Twist tại word "**mà**": chart callback fade-in + badge FA scale-in `decisive` 14f + glow green. | — | reaction-bell (subtle) khi twist appear |
| s03 | HOOK | 340–463 (0:11–0:15) | Ai cũng bảo mua cổ phiếu tốt đi, nhưng cổ phiếu tốt là như thế nào? | cổ phiếu tốt là gì | Question marks (`?`) lớn floating. Center: text **"CỔ PHIẾU TỐT"** gold + dấu `=` + dấu `?` đỏ pulse. BG dark navy radial. | `?` rơi xuống `heavy` spring (mass 1.2). "= ?" pulse 2x. | — | thinking-tone (low hum) |
| s04 | HOOK | 463–553 (0:15–0:18) | Bạn biết có gì đó không đúng nhưng không thể chứng minh. | biết sai không chứng minh | Silhouette người dùng (line-art) đứng giữa, các `?` nhỏ scrambling xung quanh đầu. BG tối hơn (ngộp thở). | `?` jitter loop. Silhouette đứng yên. BG darken `calm` 18f. | — | confusion-bell (subtle) |
| s05 | HOOK | 553–652 (0:18–0:21) | Nếu vậy, xem tới cuối nha, mình giải đáp ngay. | xem tới cuối | Mũi tên gold trỏ phải → text "XEM TỚI CUỐI" + clock icon. BG sáng nhẹ trở lại (đoạn đồng cảm chuyển sang hứa hẹn). | Mũi tên slide-in từ trái `decisive` 14f. BG brighten `soft` 22f (chuyển tone hy vọng). | — | clock-tick (1 lần) + chime nhẹ |

### VALUE phase A — 2 vế intro (0:22 → 0:31)

| ID | Phase | Frames | Display (subtitle) | Main idea | Visual anchor | Animation / Easing | Enum beats | SFX |
|----|-------|--------|-------------------|-----------|---------------|--------------------|----|-----|
| s06 | VALUE | 652–735 (0:21–0:24) | Cổ phiếu đáng mua thật ra phải có 2 vế: | phải có 2 vế | Center text "2 VẾ" gold cực lớn, 2 ô trống (placeholder) hai bên — ô trái + ô phải. | Text "2 VẾ" pop `resolve` 12f. 2 ô trống fade-in `calm`. | — | pop (1 lần) |
| s07 | VALUE | 735–822 (0:24–0:27) | Một là nội tại doanh nghiệp tốt như bạn đã làm, | vế 1: nội tại tốt | Ô trái fill: header **"NỘI TẠI"** gold + 4 icon nhỏ FA (revenue, profit, EPS, ROE). | Ô trái scale-in `decisive`, 4 icon stagger nhanh (3f mỗi cái). Highlight subtitle "nội tại" gold. | — | pop (subtle, ô trái) |
| s08 | VALUE | 822–933 (0:27–0:31) | Và hai là thêm được "thị trường" chú ý và thúc đẩy giá lên. | vế 2: thị trường công nhận | Ô phải fill: header **"THỊ TRƯỜNG"** purple + 4 icon nhỏ TA (volume, MA, breakout, momentum). 2 ô giờ đứng cạnh nhau cân đối. | Ô phải scale-in `decisive`. Subtitle "thị trường" purple. Cuối câu cả 2 ô subtle glow (cùng valid). | — | pop (subtle, ô phải) |

### VALUE phase B — drill vào vế 1 (FA) (0:31 → 0:47)

| ID | Phase | Frames | Display (subtitle) | Main idea | Visual anchor | Animation / Easing | Enum beats | SFX |
|----|-------|--------|-------------------|-----------|---------------|--------------------|----|-----|
| s09 | VALUE | 933–1146 (0:31–0:38) | Không ai trong chúng ta muốn mua một cổ phiếu chỉ vì thấy giá vừa mượt lên MA, hay có break khỏi một mẫu hình nào đó thôi đúng không. | TA đơn thuần chưa đủ | Chart minh hoạ: nến + đường MA + arrow break-out, overlay text mờ "MA", "Pattern Break". Sau đó dấu ❌ đỏ lớn đè lên: text "CHƯA ĐỦ" red. Subtitle "MA" highlight purple, "break" highlight purple. | Chart fade-in `calm`. Đến từ "thôi đúng không" → ❌ + "CHƯA ĐỦ" pop `heavy` spring (mass 1.2 — áp lực phủ định). | — | shake/buzz nhẹ khi ❌ pop |
| s10 | VALUE | 1146–1268 (0:38–0:42) | Chúng ta cần cổ phiếu ấy có doanh thu và lợi nhuận tăng từ quý này sang năm nọ. | doanh thu lợi nhuận tăng | Bar chart 2 series: "Doanh thu" (xanh) + "Lợi nhuận" (gold), 4 cột Q1-Q4 + 1 cột Year hightlight. Cột tăng dần. | Bar grow `ease-out` 18f mỗi cột. **Doanh thu pop tại word "doanh thu"**, **lợi nhuận pop tại word "lợi nhuận"** (frame TBD-whisper). | `["doanh thu"]` @ TBD-whisper, `["lợi nhuận"]` @ TBD-whisper | growing-chime ×2 |
| s11 | VALUE | 1268–1424 (0:42–0:47) | Công ty sử dụng vốn hiệu quả và đang có nhiều dư địa, tiềm năng mới để kỳ vọng trong tương lai. | vốn hiệu quả tiềm năng | 3 chip stagger appear: "✓ Vốn hiệu quả" (ROE/ROIC icon) → "✓ Dư địa" (factory icon) → "✓ Tiềm năng" (rocket icon). | Mỗi chip slide-up `calm` 18f. **Pop đúng nhịp đọc của 3 cụm từ** (frame TBD-whisper). Chip màu green check. | `["vốn hiệu quả", "dư địa", "tiềm năng"]` @ TBD-whisper | positive-chime ×3 nhẹ |

### VALUE phase C — drill vào vế 2 (TA) + REVEAL (0:47 → 1:11)

| ID | Phase | Frames | Display (subtitle) | Main idea | Visual anchor | Animation / Easing | Enum beats | SFX |
|----|-------|--------|-------------------|-----------|---------------|--------------------|----|-----|
| s12 | VALUE | 1424–1541 (0:47–0:51) | Như nói lúc nãy, còn vế hai — "thị trường" chú ý và thúc đẩy giá lên. | quay lại vế 2 | 2 ô NỘI TẠI / THỊ TRƯỜNG quay lại (callback từ s07-s08). Ô **THỊ TRƯỜNG** highlight viền purple sáng + glow; ô NỘI TẠI dim đi. | Ô THỊ TRƯỜNG glow-up `calm`, NỘI TẠI fade dim 30%. | — | gentle re-emphasis (chime nhỏ) |
| s13 | VALUE | 1541–1757 (0:51–0:58) | Ở đó chúng ta cần thấy cổ phiếu có thanh khoản, có sự bảo trợ của tổ chức lớn, đang vận động nhanh hơn số đông và xu hướng chung là tích cực. | 4 dấu hiệu thị trường | 4 chip stagger: "💧 Thanh khoản" → "🏛 Bảo trợ tổ chức" → "⚡ Vận động nhanh" → "📈 Xu hướng tích cực". Sắp xếp 2×2 grid hoặc hàng ngang scroll. | Mỗi chip pop `decisive` 14f, **đúng nhịp word timestamps** (lệch ≤2f). | `["thanh khoản", "bảo trợ tổ chức", "vận động nhanh", "xu hướng tích cực"]` @ TBD-whisper | pop ×4 |
| **s14** | **VALUE / REVEAL** | **1757–1955 (0:58–1:05)** | Và nếu có thể gọi gọn cả 2 vế trên thành 1 từ đơn giản, thì đó sẽ là CANSLIM do nhà đầu tư huyền thoại William O'Neil tạo nên. | **REVEAL CANSLIM của O'Neil** | **MOMENT REVEAL.** Trước "CANSLIM" được đọc: 2 ô NỘI TẠI + THỊ TRƯỜNG hợp lại center. Tại word "CANSLIM" → text **"CANSLIM"** purple GIANT pop ra giữa screen + glow + particles. Sau đó frame William O'Neil portrait + text "William O'Neil" gold xuất hiện bên dưới. | 2 ô merge `calm`. **"CANSLIM" pop `decisive` 14f + zoom 110% → 100% spring** đúng tại word "CANSLIM" (TBD-whisper). Particles burst out. O'Neil portrait fade-in `calm`. | — | **REVEAL chime + reverb tail** (volume 0.3, peak ở pop). Silence 200ms ngay trước pop để bracket. |
| s15 | VALUE | 1955–2171 (1:05–1:12) | Cái hay của CANSLIM là hoàn thiện cả 3 khâu — tìm cổ phiếu, theo dõi, rồi hành động — quy tắc rõ ràng, dễ làm, đặc biệt an toàn cho người mới. | hoàn thiện 3 khâu | 3 step flow ngang: **TÌM** (kính lúp icon) → **THEO DÕI** (mắt icon) → **HÀNH ĐỘNG** (mũi tên icon). Sau khi 3 step appear, badge gold "AN TOÀN CHO NGƯỜI MỚI" pop bên dưới. | 3 step pop **đúng word "tìm"/"theo dõi"/"hành động"** (TBD-whisper). Connector arrow giữa step `ease-out`. Badge an toàn fade-in `soft` 22f. | `["tìm cổ phiếu", "theo dõi", "hành động"]` @ TBD-whisper | step-chime ×3 + badge ding |

### CTA — tease + follow (1:12 → 1:21)

| ID | Phase | Frames | Display (subtitle) | Main idea | Visual anchor | Animation / Easing | Enum beats | SFX |
|----|-------|--------|-------------------|-----------|---------------|--------------------|----|-----|
| s16 | CTA | 2171–2393 (1:12–1:19) | Mấy video tới mình sẽ bóc từng chữ — CAN trước, rồi SLIM, rồi từng bước thực hành cho người mới bắt đầu, yên tâm rất dễ làm và có công cụ hỗ trợ. | tease CAN, SLIM, lộ trình | 3 video card mock thumb dạng portrait: **#02 "CAN"** (bg navy + text gold) → **#03 "SLIM"** (bg navy + text purple) → **#04 "Lộ trình F0"** (bg navy + text green). | Mỗi card pop `decisive` đúng word "CAN"/"SLIM"/"thực hành" (TBD-whisper). Card hover-bounce subtle. | `["CAN", "SLIM", "thực hành"]` @ TBD-whisper | pop ×3 (mỗi card) |
| s17 | CTA | 2393–2444 (1:19–1:21) | Theo dõi kênh đừng bỏ lỡ nha. | follow kênh | Subscribe button gold lớn center + channel logo. Hand cursor pulse trỏ vào button. | Button scale-in `decisive` 14f. Hand cursor click animation 2 lần. **Đứng yên 0.5s cuối** (silence = mạnh nhất, thúc giục). | — | subscribe-ding (1 lần đầu), silence cuối |

---

## 2. Visual Concept — Reveal Architecture

```
HOOK (0:00 - 0:21)
├─ s01 split+lãi  ★ pain cảm xúc mạnh: mình đứng im, đối thủ +10%→+100%
├─ s02 reaction   khó chịu + twist (FA đẹp mà)
├─ s03 ?          câu hỏi core: cổ phiếu tốt là gì
├─ s04 silhouette paint confusion (biết sai không cmt)
└─ s05 arrow→     bridge: "xem tới cuối"
   ↓ pause 600ms (phase break)

VALUE (0:22 - 1:11)
A. 2 vế intro     [s06 → s08]   set up framework
B. drill FA       [s09 → s11]   sao TA đơn thuần chưa đủ → cần FA
C. drill TA       [s12 → s13]   4 dấu hiệu thị trường
D. REVEAL         [s14]         ★ CANSLIM xuất hiện lần đầu ★
E. trust build    [s15]         3 khâu — an toàn cho người mới
   ↓ pause 700ms (phase break)

CTA (1:12 - 1:21)
├─ s16 cards     tease video #02/#03/#04
└─ s17 subscribe follow kênh
```

**Reveal psychology:**
- s01–s13 GIẤU tên CANSLIM hoàn toàn — chỉ build painpoint + framework "2 vế"
- s14 là **bracketing surprise**: pause 200ms ngay trước "CANSLIM" + REVEAL chime + zoom = đập mạnh vào curiosity gap
- s15 ngay sau là **trust build** — không bỏ lửng reveal, gắn ngay với "an toàn cho người mới"

---

## 3. Asset Checklist (B3 — anh drop vào `screen-shot/`)

### Bắt buộc

- [ ] **William O'Neil portrait** — ảnh chân dung (PD/wiki, hoặc CC-licensed). Dùng cho s14. Khoảng 800×800.
- [ ] (Optional) Logo kênh KFSP cho s17. Có sẵn rồi thì copy vô.

### Có thể illustrate (không cần screenshot)

- s02 chart flatline → vẽ chart trong Remotion (synthetic data: giá phẳng quanh 1 mức + jitter nhẹ)
- s03 chart rocket → vẽ Remotion (synthetic data: tăng dốc 60°)
- s09 chart MA + break → vẽ Remotion (synthetic data: nến + MA20 + arrow break)
- s10 bar chart doanh thu/LN → vẽ Remotion
- s14 particles + glow → Remotion (`@remotion/lottie` particle preset hoặc dùng `remotion-ui`)
- s16 video card mock → vẽ Remotion frame portrait

> Video #01 không cần screenshot app KFSP vì đây là video framework/foundation (chưa nói tính năng app cụ thể). Để dành screenshot app cho video #04 (lộ trình F0).

### Audio asset

- [ ] **Voice anh thu** (anh tự thu, lưu vào `audio/voice_full.wav` hoặc `voice_full.mp3`)
- [ ] BGM ambient nhẹ (volume 0.08), gợi ý: lo-fi hoặc cinematic ambient. Tránh có lời.
- [ ] SFX library: thinking-tone, flat-tone, whoosh-up, confusion-bell, clock-tick, pop, chime, growing-chime, step-chime, REVEAL-chime, subscribe-ding, ❌-buzz.

---

## 4. Recording Note (cho anh khi tự thu)

> Em note ở đây những điểm anh nhìn vào script lúc thu sẽ giúp pacing đúng với storyboard:

- **s05 → s06**: pause **rõ ~0.6s** (chuyển phase HOOK→VALUE). Nếu thu liền mạch, sau Whisper em phải insert silence padding khi stitch.
- **s08 → s09**: pause **~0.5s** (kết thúc intro 2 vế, bắt đầu drill).
- **s11 → s12**: pause **~0.5s** (kết FA, sang TA).
- **s13 → s14 (REVEAL)**: pause **~0.5s** trước câu này. **Câu s14**: nhấn từ "**CANSLIM**" — kéo dài âm + nâng cao giọng nhẹ. Đây là moment reveal chính của video.
- **s15 → s16 (VALUE→CTA)**: pause **~0.7s** (lớn nhất — kết Value, mở CTA).
- Câu liệt kê quan trọng (s10, s11, s13, s15, s16): đọc **rõ từng item**, có nhịp ngắn giữa các item (~150ms — dấu phẩy). Whisper sẽ bắt được — em populate enum_beats sau.
- Tốc độ tự nhiên của anh ~4.5 syl/s là OK. Nếu thu xong tổng > 85s, cân nhắc đọc nhanh hơn 1 chút (hoặc trim s09 — câu dài nhất) thay vì cắt nội dung.

---

## 5. QA Audit (24 mục) — duyệt trước khi qua B5

### Sentence-driven (4 mục bắt buộc)

- [ ] Mỗi câu (s01–s17) đều có visual_anchor riêng, không câu nào dùng visual câu trước
- [ ] Mọi câu liệt kê (s10, s11, s13, s15, s16) đều có `enum_items` + `enum_beats` field (hiện TBD-whisper, sẽ populate)
- [ ] Mọi câu có `main_idea` ≤5 từ, không trùng câu trước/sau
- [ ] Phase break (HOOK→VALUE→CTA) có pause ≥500ms

### Cảnh ↔ câu (rule cốt lõi)

- [ ] Không có visual nào "đè" sang câu kế tiếp (cảnh đi theo câu)
- [ ] Element pop trong câu liệt kê ăn đúng word timestamp (sẽ check sau khi có whisper)

### Easing & Animation

- [ ] Không câu nào dùng `linear` easing
- [ ] Mỗi câu có ít nhất 1 motion (không có câu nào "đứng hình" trừ câu reveal có chủ đích — s17 cuối)
- [ ] Spring presets dùng đúng tâm lý: `heavy` cho HOOK pain, `decisive` cho REVEAL + CTA, `calm` cho drill, `soft` cho transition hy vọng
- [ ] s14 (REVEAL) có zoom + particles + chime + reverb đầy đủ

### TikTok Safe Zone

- [ ] Mọi visual chính nằm trong y=150–1500, x=60–1020
- [ ] Subtitle ở y=1380–1470
- [ ] Progress bar ở y=1490
- [ ] Logo top (nếu có) ở y=160–290

### Subtitle Karaoke

- [ ] Mỗi chunk 5-6 từ, 1 dòng, nowrap
- [ ] Word timestamps chuyển liên tục (sau khi có whisper)
- [ ] Highlight đúng màu: gold (nhấn), green (positive), red (pain), purple (brand/CANSLIM)
- [ ] Fade in/out 4 frames mỗi đầu/cuối chunk
- [ ] Font auto-scale: `min(42, 960 / words × 0.85)`

### Asset & Layout

- [ ] Không có textbox nào đè lên hình tư liệu app (rule layout)
- [ ] William O'Neil portrait có source rõ (PD hoặc CC)
- [ ] Tất cả icon dùng từ thư viện consistent (ví dụ Lucide hoặc Heroicons) — không trộn style

### Voice & Stitch

- [ ] Audio anh thu lưu vào `audio/voice_full.wav` (hoặc per-sentence nếu thu từng câu)
- [ ] Whisper chạy `model=small` (tránh hallucinate)
- [ ] BGM volume 0.08, voice peak 0dB, SFX 0.15–0.3
- [ ] Pause padding stitch theo `pause_after_ms` trong sentences.json

### Rendering

- [ ] Render PER-SENTENCE: 17 file `clips/s01.mp4` … `clips/s17.mp4`
- [ ] Stitch bằng ffmpeg concat demuxer + silence padding
- [ ] Không render monolithic
- [ ] Phase gate (B5): Hook (s01-s05) → duyệt → Value (s06-s15) → duyệt → CTA (s16-s17) → duyệt → final stitched

### Pronunciation (anh tự thu — chỉ check)

- [ ] "CANSLIM" → anh đọc "**Can Slim**" rõ 2 từ (KHÔNG đọc "Can-x-lim" hay nuốt)
- [ ] "William O'Neil" → "**Uy-li-am Ô Nin**" hoặc giữ phát âm tiếng Anh nhẹ — tự nhiên với anh
- [ ] "MA" trong s09 → đọc "Em A" (2 chữ cái rõ)

---

## 6. Estimate Duration vs Target

| Phase | Target | Estimate | Status |
|-------|--------|----------|--------|
| HOOK | 22s | 21.7s (s01-s05 + pause 600ms cuối) | ✓ ok |
| VALUE | 46s | 50.7s (s06-s15 + pause 700ms cuối) | ⚠ hơi dài 4.7s |
| CTA | 10s | 9.1s | ✓ ok |
| **Total** | **75–80s** | **~81.5s** | ⚠ vượt 1.5s |

**Nếu sau khi thu vẫn >85s**: candidate trim
1. Gộp s10 + s11 thành 1 câu (cùng ý FA tăng trưởng) → tiết kiệm ~4s
2. Trim s09 vế cuối "thôi đúng không" → còn "thôi" → tiết kiệm ~1s
3. Bỏ "đặc biệt an toàn cho người mới" trong s15, để dành ý đó cho video #04 → tiết kiệm ~2s

Em đề xuất chờ anh thu lần đầu rồi quyết — có thể anh đọc nhanh hơn estimate, lại vừa khít.

---

## 7. Next Steps (gate flow)

```
[B1.5 Gate]   ✓ sentences.json đã tạo, chờ anh duyệt
              → Anh check bảng main_idea + enum_items + pause_after_ms
              → Pass / sửa câu nào em adjust

[B3 Gate]     ⏳ Asset William O'Neil portrait (anh drop) +
                 BGM + SFX library
              → KHÔNG cần screenshot app cho video #01

[B2 Gate]     ⏳ Anh thu voice → em chạy Whisper → populate
                 duration_s + word_timestamps vào sentences.json
              → Em re-fit frame numbers trong PLAN này

[B4 Gate]     ✓ PLAN_STORYBOARD.md đã tạo, chờ anh duyệt visual concept
              → Pass concept rồi B5 mới render

[B5]          Render per-sentence theo phase gate:
              HOOK (s01-s05) → duyệt → VALUE (s06-s15) → duyệt → CTA → duyệt → final
```

**Đang chờ anh:**
1. Duyệt `sentences.json` (đặc biệt main_idea + cách tách câu)
2. Duyệt concept visual trong bảng trên (đặc biệt s14 REVEAL)
3. Drop William O'Neil portrait
4. Thu voice
