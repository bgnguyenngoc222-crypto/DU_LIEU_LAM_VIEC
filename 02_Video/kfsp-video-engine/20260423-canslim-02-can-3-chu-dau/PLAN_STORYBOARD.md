# PLAN_STORYBOARD — CANSLIM #02 (CAN: 3 chữ đầu)

> **Date:** 2026-04-25
> **Source script:** `script_display.md`
> **Sentences:** `sentences.json` (33 câu, B1.5 done — duration_s sẽ populate sau B2)
> **Framework:** Hook-Value-CTA (KHÔNG phải PASA — series Foundations dùng cấu trúc viral khác)
> **Target duration:** 95–110s (script header note ~104–108s)
> **Style:** Mẫu 1 (dark navy `#0a1628` + glass cards) — kế thừa từ video #01
> **Persona:** Anh bạn trader cà phê — nhịp nói, có pause cảm xúc, không formal

---

## 0. Pipeline status

- [x] **B1** — chính tả + phiên âm (script_display.md done, đã handle KFSP/EPS/ROE/AI/Buffett)
- [x] **B1.5** — sentences.json (33 câu, đã gán main_idea + enum_items + pause_after_ms + speed)
- [ ] **B2** — Vbee TTS + Whisper per-sentence → populate `duration_s` + `word_timestamps`
- [ ] **B3** — screenshots (xem section 11 — list cần Thanh chuẩn bị)
- [x] **B4** — storyboard (file này, dùng duration ESTIMATE)
- [ ] **B5** — render per-sentence + stitch
- [ ] **B6** — sửa atomic theo feedback

> **Lưu ý:** Bảng storyboard dưới dùng **duration estimate** (chars × speed). Sau B2, chạy script populate lại `duration_s` thật → cập nhật cột Duration + Enum beats (frame thật từ word_timestamps).

---

## 1. Phase Map (Hook-Value-CTA)

| Phase | Sentences | Estimate | Tâm lý mục tiêu | Visual mode |
|-------|-----------|----------|------------------|-------------|
| **HOOK** (5 câu) | s01–s05 | ~14s | Authority (Buffett) → Pattern Interrupt → Curiosity Gap | Cinematic — quote book, pivot snap text, frame "quá khứ ↔ tương lai" |
| **VALUE-CA** (5 câu) | s06–s10 | ~25s | Calm + structured + reassuring (KFSP auto) | Phone mockup screenshot + chỉ tiêu cards + KFSP filter UI |
| **VALUE-N concrete** (6 câu) | s11–s16 | ~28s | Energy → curiosity (chất xúc tác) | Headline cards stagger, expectation/desire icons, breakout chart |
| **VALUE-Callback** (1 câu) | s17 | ~6s | Tension callback từ #01 ("giá đứng im") | Chart dim, ngắt nhịp, color pull-back |
| **VALUE-Bridge Buffett** (3 câu) | s18–s20 | ~12s | Authority bridge → **Visual Anchor "kính chắn gió"** | Split-screen gương chiếu hậu vs kính chắn gió |
| **VALUE-Empathy** (10 câu) | s21–s30 | ~50s | Warm normalization → long-term framing → hopeful | Soft tones, người ngồi quán cà phê analogy, timeline 1m→1y→vài năm |
| **CTA** (3 câu) | s31–s33 | ~10s | Tease + decisive CTA + KFSP feature | Logo SLIM teaser + follow button + phone mockup KFSP filter |

**Ratio:** CA:N-concrete:Empathy ≈ 25:35:40 (đúng định hướng "đi nhanh tới N + cho N nhiều space, đặc biệt empathy").

---

## 2. Animation Easing Map (Hook-Value-CTA adapted)

| Phase | Spring preset | Easing | Hướng | Lý do |
|-------|---------------|--------|-------|-------|
| HOOK (s01 quote) | `zoom` {d:25, s:60} | `Easing.bezier(0.22, 1, 0.36, 1)` | Dolly-in chậm vào trang sách | Authority + intimate "anh bạn kể chuyện Buffett" |
| HOOK (s02 pattern interrupt) | `resolve` {d:12, s:250} | `ease-out` snap | Snap text vô giữa | "Chưa đủ" như cú giật mạnh |
| HOOK (s03–s05 frame) | `calm` {d:18, s:180} | `ease-out` | Trái → Phải (timeline) | Frame structure mượt |
| VALUE-CA (s06–s10) | `calm` + `decisive` | `ease-out` | Stagger pop từ trên xuống | Recap có hệ thống, KFSP auto = professional |
| VALUE-N concrete (s11–s16) | `resolve` stagger | `ease-out` mạnh | Pop nhanh theo enum_beats | Energy, "chất xúc tác" vibrant |
| VALUE-Callback s17 | `heavy` {d:20, s:80} | `ease-in` chậm | Chart dim/pull-back | Tension "giá đứng im" |
| VALUE-Buffett bridge (s18–s20) | `zoom` + `calm` | `Easing.bezier(0.22, 1, 0.36, 1)` | Split-screen reveal L/R | Visual Anchor sticky |
| VALUE-Empathy (s21–s30) | `soft` {d:22, s:120} | `ease-in-out` | Fade gentle, breathing | Warm, normalized, không áp lực |
| CTA (s31–s33) | `decisive` {d:14, s:300} | `ease-out` snap → STILL | Snap rồi đứng yên | Confidence CTA, không pulse |

**CẤM:** `linear`, pulse khi CTA đứng yên, stagger đều bất kể giọng (phải sync enum_beats từ whisper).

---

## 3. Subtitle (per-sentence)

- 1 dòng duy nhất, 5–6 từ/chunk, `whiteSpace: "nowrap"`
- Position: `y=1380-1470`
- Font 38–42px bold, auto-scale `min(42, 960 / words × 0.85)`
- Fade in/out 4f mỗi đầu/cuối câu
- Highlight color theo phase:
  - HOOK quote Buffett → Gold `#f5c542` ("thủ thư", "kính chắn gió")
  - VALUE CA chỉ số → Purple `#a78bfa` ("Doanh thu", "EPS", "ROE", "25%", "3 năm")
  - VALUE N keyword → Green `#34d399` ("kỳ vọng", "niềm tin", "ham muốn", "chất xúc tác")
  - Callback s17 → Red `#f87171` ("đứng im")
  - Empathy → Default white, "bình thường thôi" + "không phải lỗi" highlight Green
  - CTA → Gold `#f5c542` ("KFSP", "bộ lọc C và A")

---

## 4. Safe Zone (TikTok)

```
y=0-150       UNSAFE (status bar)
y=150-1500    SAFE
y=1500-1920   UNSAFE (TikTok UI)
x=60-1020     horizontal safe

Subtitle:     y=1380-1470
Progress bar: y=1490
Logo top:     y=160-290
```

---

## 5. 📋 SENTENCE STORYBOARD (bảng chính)

> **Duration** = ESTIMATE (sẽ thay bằng giá trị B2). **Enum beats** = relative frame, lấy chính xác từ whisper sau B2.

### PHASE: HOOK — Authority + Pattern Interrupt

| id  | Câu (rút gọn) | Main idea | Dur est | Visual anchor | Animation | Enum beats | SFX | Pause |
|-----|---------------|-----------|---------|---------------|-----------|------------|-----|-------|
| s01 | "Buffett… thủ thư thư viện đã là nhà đầu tư thành công nhất rồi." | quote Buffett thủ thư | ~10s | Dark bg → ảnh Buffett (B&W chân dung) zoom-in chậm góc trái. Quote text fade-in từng chunk theo subtitle. Chữ "thủ thư" + "thư viện" highlight gold. Background icon thư viện kệ sách lờ mờ phía sau | `zoom` {d:25, s:60} dolly-in 30f, text BlurReveal stagger | "thủ thư"@(B2 fill), "thư viện"@(B2 fill) | swoosh @ f0 (page turn), low ambient piano | 350ms |
| s02 | "Quá khứ tốt — chưa đủ." | quá khứ chưa đủ | ~2s | Cut sang big text "QUÁ KHỨ TỐT" snap vào → strikethrough đỏ "— CHƯA ĐỦ" snap kế tiếp | `resolve` {d:12, s:250} snap text + strikethrough wipe ease-out | — | tick @ f0 (pattern interrupt) | 250ms |
| s03 | "Cổ phiếu đáng mua cần phải có cả kỳ vọng vào tương lai." | cần kỳ vọng tương lai | ~4s | "QUÁ KHỨ TỐT" mờ về 30% bên trái. "KỲ VỌNG TƯƠNG LAI" pop bên phải, có icon ✨ kèm. 2 chữ nối bằng dấu "+" lớn | `calm` {d:18, s:180} stagger L→R, "+" pop ở giữa | "kỳ vọng" highlight green @(B2 fill) | pop @ f0 (right card) | 400ms |
| s04 | "Ghép quá khứ với tương lai — chính là CAN, 3 chữ đầu của CANSLIM." | CAN = quá khứ + tương lai | ~5s | 2 card "QUÁ KHỨ" + "TƯƠNG LAI" trượt vào giữa, hợp thành 1 chip lớn "**CAN**" gold. Bên dưới hiện "**CANSLIM**" với "CAN" highlight, "SLIM" mờ 40% | `calm` ease-out merge animation, "CAN" scale-pop spring resolve | — | chime @ frame merge | 250ms |
| s05 | "C và A soi quá khứ, còn N nhìn về tương lai." | CA quá khứ — N tương lai | ~4s | Chip CAN tách 3 chữ. "C" + "A" rời sang TRÁI (icon gương chiếu hậu), "N" lệch sang PHẢI (icon kính chắn gió) | `resolve` stagger theo enum: C+A trượt trái → N trượt phải | "C và A → quá khứ"@(B2: word "C"), "N → tương lai"@(B2: word "N") | pop × 2 (CA, N), whoosh phân tách | 600ms |

### PHASE: VALUE-CA — Recap + KFSP Auto

| id  | Câu (rút gọn) | Main idea | Dur est | Visual anchor | Animation | Enum beats | SFX | Pause |
|-----|---------------|-----------|---------|---------------|-----------|------------|-----|-------|
| s06 | "Thực ra C và A bạn đã nghe trong video FA 11 tiêu chí trước đây." | CA recap từ video FA | ~6s | Thumbnail video FA #11 tiêu chí (small card góc phải) trượt vào, có badge "ĐÃ XEM". Bên trái: 2 chữ "C" + "A" được khoanh từ "11 tiêu chí" radar mờ phía sau | `calm` ease-out card slide-in, badge pop | — | swoosh card vào @ f0 | 250ms |
| s07 | "CANSLIM gọn hơn — chỉ dùng 3 chỉ tiêu: Doanh thu, EPS, ROE." | 3 chỉ tiêu CANSLIM | ~5s | 3 pill cards stagger pop vào giữa: 📈 "Doanh thu" / 💰 "EPS" / 🎯 "ROE". Mỗi pill có icon riêng. Background dark navy với glow nhẹ | `resolve` stagger spring 3 pills theo word timestamps | "Doanh thu"@(B2), "EPS"@(B2), "ROE"@(B2) — pop ±2f, KHÔNG stagger đều | pop × 3 @ each timestamp | 400ms |
| s08 | "C — xét theo Quý — quý gần nhất tăng tối thiểu 25% so cùng kỳ." | C: Quý ≥ 25% | ~6s | Card "C" zoom focus. Lịch quý hiện 4 ô (Q1/Q2/Q3/Q4), highlight ô cuối + arrow lên kèm "+25%" gold lớn. Subtitle: "tối thiểu 25%" highlight purple | `calm` ease-out, "+25%" spring decisive scale-pop | — | tick lịch tăng + chime @ "+25%" | 300ms |
| s09 | "A — xét theo Năm — lãi năm tăng đều ít nhất 3 năm liên tiếp." | A: Năm ≥ 3 năm | ~5s | Card "A" zoom focus. 3 cột bar chart năm Y1/Y2/Y3 stagger mọc lên, mỗi cột cao hơn cột trước. Trên mỗi cột có ✓ xanh | `calm` 3 bars stagger grow ease-out 12f mỗi bar | "ba năm" highlight purple @(B2) | tick × 3 @ mỗi bar mọc | 400ms |
| s10 | "Trên KFSP, bộ lọc C và A đã có sẵn — vài cú bấm là ra danh sách." | KFSP auto bộ lọc CA | ~8s | **Phone mockup** 380×760 trượt từ phải vào, screenshot KFSP screener với filter CA active. Cursor tap vào checkbox C và A → list doanh nghiệp xổ ra. Text overlay "VÀI CÚ BẤM" gold | `decisive` phone slide-in 14f, cursor tap, list expand ease-out | — | whoosh phone slide + click × 2 (C, A) + chime list reveal | 600ms |

### PHASE: VALUE-N concrete — chất xúc tác

| id  | Câu (rút gọn) | Main idea | Dur est | Visual anchor | Animation | Enum beats | SFX | Pause |
|-----|---------------|-----------|---------|---------------|-----------|------------|-----|-------|
| s11 | "Phần thật sự cần bạn tập trung sức lực — chính là chữ N." | N cần tập trung | ~4s | Phone mockup mờ về 20%, chữ "N" purple lớn pop vào trung tâm với glow. Spotlight focus vô N | `resolve` snap N vào, glow pulse 1 lần rồi giữ | — | swoosh focus @ f0 | 250ms |
| s12 | "Đây cũng là nơi bạn tìm thấy 'kỳ vọng' và 'niềm tin'." | N = kỳ vọng + niềm tin | ~4s | 2 chip xuất hiện hai bên N: "✨ KỲ VỌNG" (trái) + "💚 NIỀM TIN" (phải). Đường nét nối từ N tới 2 chip | `resolve` stagger 2 chips theo word timestamps | "kỳ vọng"@(B2), "niềm tin"@(B2) | pop × 2 mỗi chip | 450ms |
| s13 | "N là cái thứ làm thị trường bắt đầu nhìn lại doanh nghiệp này — kích thích kỳ vọng tăng trưởng tương lai," | N kích thích kỳ vọng | ~7s | Bg chuyển nhạt sang xanh hy vọng. "Thị trường" represent bằng cluster người silhouette quay đầu nhìn về 1 logo doanh nghiệp. Arrow "📈 KỲ VỌNG TĂNG TRƯỞNG" mọc lên | `calm` cluster turn animation, arrow grow ease-out | "kỳ vọng tăng trưởng" highlight green @(B2) | ambient bell rise | 200ms |
| s14 | "và quan trọng hơn, kích thích cả sự 'ham muốn' của thị trường." | N kích thích ham muốn | ~6s | Cluster người silhouette tăng số lượng + arrow đỏ "💢 HAM MUỐN" snap vào lớn. "ham muốn" highlight red-orange (emotional) | `resolve` snap "HAM MUỐN" decisive, cluster swell | "ham muốn" highlight emotional red @(B2) | thump bass đập 1 lần @ "ham muốn" | 500ms |
| s15 | "Có thể là headline về bán dẫn, AI, lãnh đạo thay máu, mở rộng TT…" | 4 ví dụ headline N | ~10s | 4 headline cards stagger pop từ trên xuống theo nhịp liệt kê: 📰 "VN Tech ra mắt chip 7nm" → 🤖 "FPT công bố sản phẩm AI mới" → 👔 "HPG có CEO mới" → 🌏 "MWG khai trương Indonesia". Layout grid 2×2 hoặc waterfall | `resolve` stagger 4 cards theo enum_beats — KHÔNG đều, lấy word timestamps thật | "công nghệ bán dẫn"@(B2), "sản phẩm AI"@(B2), "lãnh đạo thay máu"@(B2), "mở rộng thị trường"@(B2) | pop × 4 mỗi card | 200ms |
| s16 | "hay thậm chí đơn giản là cổ phiếu vừa lập đỉnh giá mới…" | N có thể = đỉnh giá mới | ~7s | 4 headline cards mờ về 30%. Card mới "📊 CHART BREAKOUT" pop vào lớn nhất ở giữa: chart đi ngang rồi snap nhảy lập đỉnh mới với arrow gold. Text "ĐỈNH GIÁ MỚI" gold pulse 1 lần | `decisive` chart snap up + breakout particle | "đỉnh giá mới" highlight gold @(B2) | tick rise + chime breakout | 600ms |

### PHASE: VALUE-Callback — "giá đứng im"

| id  | Câu (rút gọn) | Main idea | Dur est | Visual anchor | Animation | Enum beats | SFX | Pause |
|-----|---------------|-----------|---------|---------------|-----------|------------|-----|-------|
| s17 | "Đó cũng là lý do nhiều cổ phiếu C và A đẹp mà giá vẫn đứng im — vì chưa có N." | callback CA đẹp giá đứng im | ~7s | Bg dim. Split: bên trái 2 chip "C ✓" + "A ✓" green (CA đẹp). Bên phải chart phẳng lì màu xám, không động. Cuối câu hiện "CHƯA CÓ N" red snap vô | `heavy` slow ease-in chart phẳng giữ static, "CHƯA CÓ N" snap @ cuối câu (word "N" timestamp) | "đứng im" highlight red @(B2), "chưa có N"@(B2 word "N") | (silence) chỉ tick nhỏ @ "CHƯA CÓ N" — KHÔNG SFX trong đoạn dim | 500ms |

### PHASE: VALUE-Bridge Buffett 2 — Visual Anchor

| id  | Câu (rút gọn) | Main idea | Dur est | Visual anchor | Animation | Enum beats | SFX | Pause |
|-----|---------------|-----------|---------|---------------|-----------|------------|-----|-------|
| s18 | "Buffett còn câu nữa — 'Trong kinh doanh, gương chiếu hậu rõ hơn kính chắn gió.'" | quote gương chiếu hậu | ~8s | Cinematic xe ô tô góc nghiêng (illustration đơn giản dark style). Highlight gương chiếu hậu sáng + kính chắn gió hơi mờ. Quote text fade-in dưới | `zoom` {d:25, s:60} dolly chậm vào xe, quote BlurReveal | "gương chiếu hậu" gold @(B2), "kính chắn gió" gold @(B2) | swoosh + low cinematic ambient | 350ms |
| s19 | "Quá khứ dễ nhìn — vì nó đã xảy ra rồi." | quá khứ dễ nhìn | ~3s | Zoom focus vô gương chiếu hậu, label "QUÁ KHỨ" appear. Background dim phần kính chắn gió | `calm` zoom focus mirror | — | tick focus | 250ms |
| s20 | "Còn N — chính là phần kính chắn gió đó." | N = kính chắn gió | ~4s | Zoom pivot focus sang kính chắn gió (camera pan), label "N" purple snap vào kính chắn gió. Outside thấy đường mở ra phía trước (tương lai) | `decisive` camera pan ease-out + N snap onto windshield | — | chime + whoosh pan | 600ms |

### PHASE: VALUE-Empathy — Long-term framing

| id  | Câu (rút gọn) | Main idea | Dur est | Visual anchor | Animation | Enum beats | SFX | Pause |
|-----|---------------|-----------|---------|---------------|-----------|------------|-----|-------|
| s21 | "N không có công thức cố định." | N không công thức | ~3s | Cut sang scene mới. Hình ảnh trang giấy với công thức toán bị gạch chéo X đỏ to | `resolve` snap X cross | — | tick gạch X | 250ms |
| s22 | "Nó cần thời gian, cần theo dõi tin tức và hiểu ngành đủ sâu để nhìn ra…" | cần thời gian theo dõi | ~9s | Scene anh trader ngồi cà phê đọc báo (silhouette warm tone). Headlines lướt nhẹ phía sau. Bubble thoughts "À, cái này có thể là xúc tác thật." pop vào ở câu cuối | `soft` ease-in-out fade gentle, bubble pop @ "À" word | "À, cái này có thể là xúc tác thật" highlight green @(B2) | ambient cafe nhẹ + bubble pop @ "À" | 700ms |
| s23 | "Mà này — nếu thời gian đầu chưa nhìn ra N ngay, bình thường thôi, ai cũng vậy." | chưa thấy N: bình thường | ~6s | Direct camera đối thoại cảm giác "anh bạn nói thật": text overlay "BÌNH THƯỜNG THÔI" green warm tone, hand-drawn underline | `soft` text fade-in 18f, underline draw 24f | "bình thường thôi" highlight green @(B2) | (silence) — soft warm pad bg | 250ms |
| s24 | "Đó là hiện tượng tự nhiên, không phải lỗi của bạn." | không phải lỗi của bạn | ~4s | Tiếp tục direct address. "KHÔNG PHẢI LỖI CỦA BẠN" green text snap vô gentle, có ✓ icon | `soft` snap text gentle | "không phải lỗi của bạn" highlight green @(B2) | soft chime @ ✓ | 450ms |
| s25 | "Nó chỉ thành vấn đề nếu bạn không chịu bắt đầu tìm hiểu," | vấn đề: không tìm hiểu | ~4s | Tone shift sang warning soft. Text "VẤN ĐỀ:" amber + sub "Không chịu tìm hiểu" | `calm` ease-out fade-in | — | (silence) | 200ms |
| s26 | "hay coi đầu tư chỉ là cuộc chơi ngắn hạn — kiếm lời nhanh rồi rút." | vấn đề: chơi ngắn hạn | ~5s | Sub thứ 2 "Coi là cuộc chơi ngắn hạn" amber, dưới có icon stopwatch ngắn + arrow đỏ "rút" | `calm` stagger fade | "ngắn hạn" highlight amber @(B2) | tick stopwatch @ icon | 500ms |
| s27 | "Còn nếu bạn tin đây là hành trình lâu dài, chủ động chuyển mình…" | tin hành trình dài hạn | ~8s | Tone shift sang hopeful warm. Background gradient navy → warm peach gentle. Hình ảnh con đường dài có người đi bước chậm về phía bình minh | `soft` bg lerp 60f + walking silhouette move L→R chậm | "hành trình lâu dài" highlight green @(B2), "vững vàng và bền bỉ" highlight green @(B2) | warm pad rise + footsteps soft | 250ms |
| s28 | "Thì 1 tháng, vài tháng, 1 năm, vài năm sau, con mắt nhìn N sẽ tự sắc dần." | con mắt sắc dần theo thời gian | ~7s | Timeline ngang: 4 mốc stagger pop "1 tháng" → "vài tháng" → "1 năm" → "vài năm". Mỗi mốc có icon mắt — mắt mờ → mắt rõ dần. Cuối câu mắt cuối cùng glow gold | `resolve` 4 milestones stagger theo enum_beats, mắt cuối glow decisive | "1 tháng"@(B2), "vài tháng"@(B2), "1 năm"@(B2), "vài năm"@(B2) | tick × 4 mỗi milestone + chime @ mắt cuối | 500ms |
| s29 | "Thời gian đầu cứ chấp nhận chưa làm tốt — tham khảo tin tức, BCPT, cộng đồng." | tham khảo: tin tức/BCPT/cộng đồng | ~8s | 3 source cards stagger pop: 📰 "TIN TỨC" / 📊 "BÁO CÁO PHÂN TÍCH" / 👥 "CỘNG ĐỒNG". Layout horizontal pills | `calm` stagger 3 cards theo enum_beats | "tin tức"@(B2), "báo cáo phân tích"@(B2), "cộng đồng"@(B2) | pop × 3 mỗi card | 300ms |
| s30 | "Không ai bắt đầu là pro liền." | không ai pro liền | ~3s | Direct text gentle "KHÔNG AI BẮT ĐẦU LÀ PRO LIỀN" warm green, có icon 🌱 (cây con) | `soft` text fade-in 18f, 🌱 pop gentle | — | warm chime nhẹ | 700ms |

### PHASE: CTA

| id  | Câu (rút gọn) | Main idea | Dur est | Visual anchor | Animation | Enum beats | SFX | Pause |
|-----|---------------|-----------|---------|---------------|-----------|------------|-----|-------|
| s31 | "Video tới mình bóc 4 chữ SLIM — phần 'thị trường' trong CANSLIM." | tease #03 SLIM | ~5s | "CANSLIM" lớn ở giữa. "CAN" mờ 30%, "**SLIM**" highlight purple pulse 1 lần. Sub-text: "Tập 03 — Phần thị trường" | `decisive` SLIM scale-pop + 1 pulse only (KHÔNG nhấp nháy nhiều) | — | chime tease | 350ms |
| s32 | "Theo dõi kênh đừng bỏ lỡ nha." | follow CTA | ~3s | Big "FOLLOW" button red snap vào, có ➕ icon. Background black gentle | `decisive` snap button → STILL (KHÔNG pulse) | — | click @ button snap | 300ms |
| s33 | "Và tải KFSP ở bio để dùng luôn bộ lọc C và A." | tải KFSP bio | ~4s | Phone mockup KFSP screener (lặp lại visual s10) + arrow ↓ "BIO" gold pointing down. Logo KFSP top center | `decisive` phone slide-up + arrow snap → STILL | — | success chime ngắn @ frame final | 0ms |

---

## 6. Series-level callbacks

- **s05 ↔ #01:** Frame "C/A quá khứ — N tương lai" mở rộng frame "2 vế nội tại + thị trường" của #01.
- **s17 ↔ #01 hook:** Câu *"giá vẫn đứng im — vì chưa có N"* gợi lại painpoint Hook #01 ("nhiều người mua thấy đẹp nhưng giá không lên").
- **s06 thumbnail FA #11 tiêu chí:** Visual reference video FA cũ — viewer thấy series có liên kết.
- **s31 SLIM tease:** Setup video #03.

---

## 7. Visual Anchors quan trọng (B4 emphasis)

1. **s05 — CA trượt trái / N trượt phải:** Visual cho frame chính video. Phải làm thật chỉn chu, animation rõ ràng — đây là moment "À, hiểu rồi".
2. **s10 — KFSP screener phone mockup:** Cần screenshot thật từ app. Cursor tap precise vào checkbox C và A.
3. **s15 — 4 headline cards:** Mock-up giống tin tức thật, có logo công ty (FPT, HPG, MWG, VN Tech). Stagger PHẢI sync word timestamps — không stagger đều.
4. **s17 — Chart phẳng + "CHƯA CÓ N":** Callback emotion. Chart phải rõ là "đứng im" không động (không lừa với candlestick động).
5. **s18–s20 — Xe ô tô gương/kính chắn gió:** Visual Anchor sticky cho concept N. Minh hoạ cần đẹp cinematic. Camera pan từ gương sang kính chắn gió là moment khắc cốt.
6. **s28 — Timeline mắt sắc dần:** 4 icon mắt mờ → rõ dần. Đây là payoff cảm xúc của empathy section.
7. **s31 — CANSLIM với SLIM highlight:** Visual tease video tới.

---

## 8. SFX strategy

- **Spam-free zones:** s17 (callback dim), s23–s25 (empathy direct address), s32 CTA still — silence/ambient only.
- **Key SFX per phase:**
  - HOOK: page turn @ s01, snap tick @ s02, chime CAN @ s04
  - VALUE-CA: pop chỉ tiêu @ s07, click filter @ s10
  - VALUE-N: pop headlines @ s15, chime breakout @ s16
  - Buffett bridge: cinematic ambient s18–s20
  - Empathy: warm pad continuous, soft chime accents
  - CTA: click button s32, success chime @ s33 final

- **Volume mix:** BGM 0.06 (giảm nhẹ vì có nhiều text), SFX 0.18–0.30, voice peak 0dB.
- **BGM gợi ý:** Soft warm piano + ambient pad (Pixabay "soft piano corporate" hoặc Mixkit "thoughtful piano"). Tone xuyên suốt, nhưng giảm 20% ở Empathy section để direct address rõ hơn.

---

## 9. Components inventory

### Đã có (remotion-kfsp shared)
- DeviceMockupZoom (s10, s33)
- SimulatedCursor (s10 click filter)
- BlurReveal (s01, s18 quote text)
- SpringPopIn (cards các loại)
- StaggeredFadeUp (s07, s15, s28, s29 enum)
- MarkerHighlight (subtitle keywords)
- ZoomThroughTransition (giữa phase)
- MeshGradientBg (background warm trong empathy)
- DirectionalWipe (callback dim s17)
- SubtitleBar (per-sentence)
- SFX: whoosh, pop, click, chime, swoosh, success

### Cần chuẩn bị thêm

| Mục | Nguồn | Status |
|-----|-------|--------|
| Ảnh chân dung Buffett B&W (bản quyền-safe / illustration) | Wikipedia commons / illustration tự vẽ | ☐ |
| Illustration xe ô tô góc nghiêng dark cinematic | Tự vẽ Figma hoặc Pixabay | ☐ |
| Icon: 👔 lãnh đạo, 🤖 AI, 📰 tin, 📊 BCPT, 👥 cộng đồng, 🌱 cây con, 👁 mắt mờ→rõ | Lucide icons / Phosphor | ☐ |
| Lottie: walking silhouette (s27) | LottieFiles | ☐ |
| Lottie: page turn (s01) | LottieFiles | ☐ |
| BGM: soft warm piano corporate (~110s loop) | Pixabay Music | ☐ |
| Headline mockup cards (4 ví dụ N) | Tự dựng Figma | ☐ |

---

## 10. Screenshots/Recordings cần Thanh chuẩn bị

| ID | Mô tả | Dùng cho câu | Ghi chú |
|----|-------|--------------|---------|
| **S1** | KFSP screener — bộ lọc CA, checkbox C+A đang được tick | s10 | Cần PNG full screen iPhone 1834×3709 |
| **S2** | KFSP screener — list doanh nghiệp đạt CA hiển thị (sau khi bấm filter) | s10 (tiếp theo S1) | Hiển thị ≥5 mã, có giá + % |
| **S3** | KFSP screener — thumbnail nhỏ cho s33 (lặp lại) | s33 | Có thể reuse S1+S2 |
| **R1** (optional) | Screen recording quick demo bấm filter CA → ra list | s10 | Pre-transcode h264 30fps trước khi import |
| **Thumbnail video FA #11** | Cover thumbnail của video #11 tiêu chí (đã làm) | s06 | Screenshot từ TikTok/YT |

---

## 11. 📋 QA AUDIT CHECKLIST (24 mục)

### A. Audio / Subtitle
| # | Hạng mục | Pass? |
|---|----------|-------|
| 1 | Subtitle sync 5–6 từ/chunk khớp whisper mỗi câu | ☐ |
| 2 | Subtitle vị trí y=1380-1470 không bị TikTok UI đè | ☐ |
| 3 | Subtitle 1 dòng không wrap | ☐ |
| 4 | Subtitle atomic không tách ngang 2 câu | ☐ |
| 5 | Voice mỗi câu phát hết duration không cut cuối | ☐ |

### B. Visual / Layout
| # | Hạng mục | Pass? |
|---|----------|-------|
| 6 | Logo KFSP top căn giữa y=160-290 | ☐ |
| 7 | Phone mockup s10/s33 không cắt rìa | ☐ |
| 8 | Zoom KFSP screener đúng vùng filter CA | ☐ |
| 9 | Pulsing/highlight đúng tọa độ checkbox C, A | ☐ |
| 10 | Safe zone x:60-1020 y:150-1500 | ☐ |
| 11 | Progress bar y=1490 smooth | ☐ |
| 12 | Textbox không đè screenshot KFSP | ☐ |

### C. Animation / SFX
| # | Hạng mục | Pass? |
|---|----------|-------|
| 13 | Animation khớp giọng ±5f | ☐ |
| 14 | Không linear easing | ☐ |
| 15 | Emotional arc: Hook authority → Value energy → Empathy warm → CTA decisive | ☐ |
| 16 | SFX timing đúng, không spam (silence ở s17, s23–25, s32) | ☐ |
| 17 | SFX volume 0.18–0.30 không lấn voice | ☐ |
| 18 | Silence: s17 callback + s23–25 empathy + s32 button still | ☐ |
| 19 | Transition mượt giữa câu (no jump) | ☐ |
| 20 | CTA s32 button snap rồi đứng yên (no pulse) | ☐ |

### D. Sentence-Driven (BẮT BUỘC)
| # | Hạng mục | Pass? |
|---|----------|-------|
| 21 | **Sentence atomicity**: mỗi câu = 1 clip riêng, không animation đè ranh giới câu | ☐ |
| 22 | **Main idea match**: visual câu X minh hoạ đúng main_idea, không câu X-1/X+1 | ☐ |
| 23 | **Enum beat sync**: s05/s07/s12/s15/s28/s29 pop element đúng word timestamp ±2f, KHÔNG stagger đều | ☐ |
| 24 | **Stitch gap**: silence padding khớp pause_after_ms (đặc biệt s05→s06=600ms, s10→s11=600ms, s16→s17=600ms, s20→s21=600ms, s30→s31=700ms) | ☐ |

---

## 12. Render workflow (B5 — gate theo phase)

```bash
cd remotion-kfsp

# Phase HOOK (s01–s05) → gate
for s in s01 s02 s03 s04 s05; do
  npx remotion render Sentence_$s --output=../canslim-02-can-3-chu-dau/clips/$s.mp4
done
# Thanh xem clips/s01–s05.mp4 → duyệt HOOK ✓ hoặc fix atomic

# Phase VALUE-CA (s06–s10) → gate
# Phase VALUE-N concrete (s11–s16) → gate
# Phase VALUE-Callback s17 → gate (1 câu nhưng quan trọng emotion)
# Phase VALUE-Bridge Buffett (s18–s20) → gate (visual anchor sticky)
# Phase VALUE-Empathy (s21–s30) → gate (đoạn quan trọng nhất video)
# Phase CTA (s31–s33) → gate

# Stitch final với silence padding theo pause_after_ms
python3 scripts/stitch_final.py canslim-02-can-3-chu-dau
```

**Order gate priority:**
1. **Empathy (s21–s30)** — critical, đây là persona-defining section
2. **Bridge Buffett (s18–s20)** — Visual Anchor sticky
3. **Hook (s01–s05)** — first impression
4. **N concrete (s11–s16)** — energy transition
5. **CA + Callback + CTA** — supporting

---

## 13. Open questions (cần Thanh confirm)

1. **Buffett ảnh:** Dùng ảnh Buffett thật (B&W) hay illustration vẽ tay style? Ảnh thật mạnh hơn nhưng cần check bản quyền cho TikTok upload.
2. **Empathy section bg gradient:** Có nên shift hẳn sang warm peach từ s27, hay giữ navy + accent warm?
3. **s14 "ham muốn" SFX bass thump:** Có rủi ro hơi over-dramatic. Test xem có quá tay không, có thể downgrade thành tick mạnh nếu cần.
4. **Headline mock s15:** Dùng tên công ty thật (FPT, HPG, MWG) hay generic ("Doanh nghiệp A/B/C")? Tên thật relatable hơn nhưng có thể bị hiểu nhầm là khuyến nghị.
5. **Duration overflow:** Estimate ~110s, vượt rule <90s ~20s. Confirm chấp nhận tradeoff (đoạn empathy không cắt được).
6. **Series CTA pattern:** Confirm áp pattern "tải KFSP bio + feature CA" cho cả #03–#09?
