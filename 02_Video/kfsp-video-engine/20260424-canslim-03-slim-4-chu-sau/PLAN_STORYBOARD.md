# PLAN_STORYBOARD — CANSLIM #03: SLIM (4 chữ cuối) = HIỆN TẠI

> **Ngày:** 2026-04-25
> **Series:** CANSLIM #03 (Foundations) — nối từ #02
> **Framework:** Hook-Value-CTA (3 phase) — sub-phase HOOK / VALUE_INTRO / VALUE_S / VALUE_L / VALUE_I / VALUE_M / VALUE_WRAP / CTA
> **Source:** `sentences.json` (27 câu, B1.5 done; duration_s + word_timestamps null đến khi B2 chạy)
> **Render:** Per-sentence → gate theo phase → ffmpeg concat
> **Target duration:** 85–92s (kịch bản); **estimate ~107s** với pauses (xem mục Duration Analysis bên dưới — cần Thanh quyết)

---

## Summary

| Metric | Value |
|---|---|
| Total sentences | 27 |
| Estimated audio | ~98s (chưa có B2 actual) |
| Total pauses | ~10.75s |
| **Total estimate** | **~108–110s** |
| Phase distribution | HOOK 7 \| VALUE_INTRO 1 \| VALUE_S 3 \| VALUE_L 3 \| VALUE_I 3 \| VALUE_M 4 \| VALUE_WRAP 2 \| CTA 4 |

**⚠ Duration vượt target 15-25s.** Nếu B2 actual confirm ≥110s, cân nhắc 2 option compact:
- **Option A (cắt nhẹ ~5s)**: Compact câu giải thích wordplay s03 (cắt cụm `vừa có nghĩa là "món quà", vừa có nghĩa là "hiện tại"` → `vừa là món quà, vừa là hiện tại`).
- **Option B (cắt mạnh ~15s)**: Gộp s09+s10, s12+s13, s15+s16, s18+s19 (mỗi cặp letter intro + câu hỏi) → còn 23 câu, mỗi letter chiếm ít space hơn.

---

## Visual Concept — 3 thì + continuity từ #02

**Frame chính**: 3 mảnh kính xe — extension natural từ #02 (chiếu hậu + chắn gió).

| Mảnh | Phase #02 | Phase #03 | Visual cue |
|---|---|---|---|
| Kính chiếu hậu | C, A — quá khứ | callback | gray, mờ, ở phía sau xe |
| Kính chắn gió | N — tương lai | callback | trong, ánh sáng nhẹ |
| **Kính bên (driver view)** | — | **SLIM — hiện tại** | highlight đỏ/vàng, nét rõ nhất |

**Color coding**:
- Quá khứ: `#94a3b8` (gray-blue)
- Tương lai: `#cbd5e1` (light blue)
- **Hiện tại: `#f5c542` (gold) + `#f87171` (red accent)** — đây là phần highlight

**Gift box motif**: Wordplay "present = món quà" → gift box icon `#f5c542` xuất hiện ở Hook, callback ở s07, lặp lại ở s24.

**4 letter cards (S/L/I/M)**: Glass cards `bg rgba(255,255,255,0.04)`, border 1px, blur 10px, radius 16px. Mỗi card có icon riêng:
- **S** — biểu đồ volume bar (cung/cầu, mua/bán)
- **L** — huy chương vàng (leader)
- **I** — toà nhà / cá mập (institution)
- **M** — chart index / sóng (market direction)

---

## Easing Map theo Phase (Hook-Value-CTA — không phải PASA)

| Phase | Cảm xúc mục tiêu | Spring preset | Easing | Hướng |
|---|---|---|---|---|
| HOOK (s01-s07) | Thân mật, dẫn dắt, curiosity | `calm` {d:18, s:180} cho text fade-in. `resolve` {d:12, s:250} cho reveal "HIỆN TẠI" | `Easing.bezier(0.22, 1, 0.36, 1)` zoom chuyên nghiệp | Zoom-in chậm (intimate), reveal trung tâm |
| VALUE_INTRO (s08) | Authority, frame setup | `resolve` cho 4 dấu chân pop | `ease-out` mạnh | Stagger từ trái → phải (4 footprints) |
| VALUE_S/L/I/M (s09-s21) | Khám phá, làm rõ | `resolve` cho letter card. `decisive` {d:14, s:300} cho data point. | `ease-out` mạnh (sự thật) | Letter card snap vào giữa, supporting visuals reveal sau |
| VALUE_WRAP (s22-s23) | Cao trào, tổng kết | `decisive` cho big text "đang công nhận?". `soft` {d:22, s:120} cho tease | `ease-out` snap → still | Snap câu chốt, tease nhẹ nhàng |
| CTA (s24-s27) | Quyết đoán, kết hợp 7 chữ | `decisive` cho 7 chữ snap. `calm` cho 4 enum item | `ease-out` snap → STILL | Snap rồi đứng yên (không pulse) |

**CẤM** `linear`. **CẤM** stagger đều cho enum — element pop đúng word timestamp ±2 frames.

---

## SENTENCE STORYBOARD (bảng chính)

> **Lưu ý:** `Dur (est)` là estimate ở speed 0.85-0.9. **B2 sẽ overwrite** với duration_s thật. `Enum beats` đang là **frame estimate uniform pacing** — B2 + Whisper sẽ cho frame chính xác (lệch ≤2f).

### Phase 1: HOOK (s01-s07) — Quote + wordplay + bridge

| id  | Phase | Giọng (tts)                                                          | Main idea | Dur (est) | Visual anchor | Animation | Enum beats (est) | SFX | Pause after |
|-----|-------|----------------------------------------------------------------------|-----------|-----------|---------------|-----------|------------------|-----|-------------|
| s01 | HOOK  | "Có một câu rất hay — Yesterday is history, tomorrow is a mystery, but today is a gift…" | quote 3 thì | ~10.0s (300f) | Dark navy bg radial gradient. Quote text English fade-in cinematic, gold highlight "**present**" cuối câu. Subtle 3 panels ghost behind: gray (past) / mid (mystery) / gold (gift) | `BlurReveal` text từ remocn. `ease-out` 30f fade. Highlight "present" gold @ end | — | ambient warm pad, single soft chime @ "present" | 600 |
| s02 | HOOK  | "Tạm dịch, hôm qua là lịch sử, ngày mai là điều bí ẩn, còn hôm nay là một món quà." | dịch 3 thì | ~4.2s (126f) | 3 timeline labels appear sequentially: `hôm qua` (gray) / `ngày mai` (light) / `hôm nay` (gold + gift box icon) | Stagger pop theo word timestamp. `spring resolve` cho từng label | "hôm qua"@~f15, "ngày mai"@~f60, "hôm nay"@~f100 | pop × 3 đúng từng beat | 350 |
| s03 | HOOK  | "Present trong tiếng Anh, vừa có nghĩa là món quà, vừa có nghĩa là hiện tại." | wordplay present | ~4.0s (120f) | Split screen: bên trái gift box (`#f5c542`), bên phải clock/calendar; chữ "present" lớn ở giữa, 2 mũi tên trỏ sang 2 phía | `MarkerHighlight` chữ "present". Stagger: gift box pop trái, clock pop phải | "món quà"@~f50, "hiện tại"@~f95 | pop × 2 (gift, clock), swoosh nhẹ @ split | 500 |
| s04 | HOOK  | "Can Slim cũng vậy."                                                  | bridge sang CANSLIM | ~0.9s (27f) | Zoom-out → 7 letters CANSLIM xuất hiện ngang, glass cards, vẫn bg dark | `spring decisive` snap-in 7 cards stagger nhẹ | — | whoosh transition @ f0 | 300 |
| s05 | HOOK  | "Can cho bạn quá khứ và tương lai."                                   | CAN = quá khứ + tương lai | ~1.7s (51f) | C, A, N highlight gold trong dãy 7 letters. Sau lưng: kính chiếu hậu (CA, gray) + kính chắn gió (N, light) — **callback #02** | `MarkerHighlight` 3 letters CAN @ f0. Mảnh kính fade-in sau letter | "quá khứ"@~f25, "tương lai"@~f40 | pop × 2 cho 2 mảnh kính | 300 |
| s06 | HOOK  | "Còn Sờ Lim, 4 chữ cuối, chính là… HIỆN TẠI."                          | SLIM = HIỆN TẠI | ~2.9s (87f) | C/A/N dim, S/L/I/M glow gold. Mảnh kính bên (driver view) xuất hiện as 3rd piece — **highlight đỏ/vàng**. Big text "HIỆN TẠI" snap @ "..." pause | `BlurReveal` SLIM glow. **Hard pause 600ms** @ "..." (silence). `spring resolve` HIỆN TẠI snap | — | silence @ "...", chime @ "HIỆN TẠI" snap | 250 |
| s07 | HOOK  | "Là món quà mà thị trường đang đặt trước mặt bạn, ngay lúc này."       | món quà thị trường | ~3.1s (93f) | Gift box `#f5c542` lớn xuất hiện giữa màn hình, có ribbon. Subtitle "thị trường" đè trên gift. Text "ngay lúc này" pop cuối | `spring soft` gift slide-up từ dưới. "ngay lúc này" `spring decisive` snap | — | ribbon untie SFX @ f10, snap @ "ngay lúc này" | 700 |

### Phase 2: VALUE_INTRO (s08) — 4 dấu chân

| id  | Phase | Giọng (tts) | Main idea | Dur (est) | Visual anchor | Animation | Enum beats | SFX | Pause after |
|-----|-------|-------------|-----------|-----------|---------------|-----------|------------|-----|-------------|
| s08 | VALUE_INTRO | "Sờ Lim là 4 dấu chân thị trường đang để lại, bạn đọc được, là biết cổ phiếu có thực sự được công nhận hay không." | 4 dấu chân thị trường | ~5.7s (171f) | 4 footprint icons xuất hiện ngang (golden gradient), mỗi footprint label sẽ là S / L / I / M (chưa show). Text dưới: "đang để lại — bạn đọc được" | `StaggeredFadeUp` 4 footprints @ "4 dấu chân". `MarkerHighlight` "công nhận" cuối | "4 dấu chân"@~f30 (4 footprints stagger 4f apart từ f30) | step × 4 nhẹ (footstep SFX) | 500 |

### Phase 3: VALUE_S (s09-s11) — Cung và cầu

| id  | Phase | Giọng (tts) | Main idea | Dur (est) | Visual anchor | Animation | Enum beats | SFX | Pause after |
|-----|-------|-------------|-----------|-----------|---------------|-----------|------------|-----|-------------|
| s09 | VALUE_S | "Sờ, cung và cầu." | S = cung cầu | ~0.9s (27f) | Footprint #1 transform → glass card "S" lớn `#f5c542`. Icon volume bar bên cạnh | `spring decisive` card pop. Icon stagger sau 6f | — | pop @ f0 (card), pop @ f8 (icon) | 250 |
| s10 | VALUE_S | "Có ai đang mua bán mạnh cùng bạn không?" | ai đang mua bán mạnh | ~2.0s (60f) | 2 hand icons (mua trái green, bán phải red) pulse alternately. "?" gold cuối | `PulsingIndicator` 2 hands. "?" pop `spring resolve` | — | tap × 2 (mua, bán) | 250 |
| s11 | VALUE_S | "Khi giá bứt phá, khối lượng phải tăng đột biến — chứng tỏ dòng tiền thật sự đang lệch sang phía mua, không phải vài cây nến đẹp ngẫu nhiên." | volume xác nhận breakout | ~6.9s (207f) | Chart breakout candlestick (green) + volume bar spike vẽ animate. Highlight green volume @ "tăng đột biến". Cuối câu, 1 vài candle nhỏ "ngẫu nhiên" mờ dim | Chart line draw @ "bứt phá". Volume bar grow `spring decisive` @ "đột biến". Dim ngẫu nhiên candles @ cuối | "tăng đột biến"@~f55, "lệch sang phía mua"@~f130 | chart-up SFX @ f55, dim swoosh @ f150 | 600 |

### Phase 4: VALUE_L (s12-s14) — Leader

| id  | Phase | Giọng (tts) | Main idea | Dur (est) | Visual anchor | Animation | Enum beats | SFX | Pause after |
|-----|-------|-------------|-----------|-----------|---------------|-----------|------------|-----|-------------|
| s12 | VALUE_L | "Lờ, Lít-đờ, tức cổ phiếu dẫn đầu." | L = leader | ~1.7s (51f) | Footprint #2 → glass card "L" + huy chương vàng (medal icon) | `spring decisive` card pop. Medal `spring resolve` rotate-in | — | chime medal @ f10 | 250 |
| s13 | VALUE_L | "Cổ phiếu này đang dẫn đầu ngành, hay đang lay theo người khác?" | dẫn đầu hay lay theo | ~3.1s (93f) | 2 stock cards side-by-side: trái = leader (cao, mũi tên xanh, chart breakout); phải = laggard (thấp hơn, mũi tên xám, chart phẳng). "?" gold cuối | `MarkerHighlight` 2 cards. Leader pulse @ "dẫn đầu", laggard dim @ "lay theo" | "dẫn đầu ngành"@~f25, "lay theo người khác"@~f60 | up-tick @ f25, low-tick @ f60 | 250 |
| s14 | VALUE_L | "Mua Lít-đờ, xác suất thắng cao hơn rất nhiều, vì đó là cổ phiếu thị trường đang chọn để nâng giá đầu tiên." | mua leader thắng cao | ~5.4s (162f) | **Screenshot KFSP RS rating panel** (asset có sẵn, zoom-in vào leader). Highlight cổ phiếu RS rating cao 90+ | `DeviceMockupZoom` zoom-in 60f. `PulsingIndicator` chỉ vào RS top | — | zoom whoosh @ f0, pulse loop low | 600 |

### Phase 5: VALUE_I (s15-s17) — Institution

| id  | Phase | Giọng (tts) | Main idea | Dur (est) | Visual anchor | Animation | Enum beats | SFX | Pause after |
|-----|-------|-------------|-----------|-----------|---------------|-----------|------------|-----|-------------|
| s15 | VALUE_I | "I, sự tham gia của tổ chức." | I = tổ chức tham gia | ~1.4s (42f) | Footprint #3 → glass card "I" + icon toà nhà cao tầng | `spring decisive` card pop. Building grow @ f12 | — | low rumble building @ f12 | 250 |
| s16 | VALUE_I | "Có quỹ lớn, có cá mập nào, đang gom cổ phiếu không?" | quỹ lớn cá mập gom | ~2.6s (78f) | Icon quỹ (briefcase) + cá mập (shark) pop sequential. Cá mập "ăn" small fish (cổ phiếu) | Stagger pop theo enum_beats. Cá mập animate eat @ "gom" | "quỹ lớn"@~f10, "cá mập"@~f30 | pop × 2, gulp SFX @ "gom" | 250 |
| s17 | VALUE_I | "Vì khi tổ chức lớn vào, dòng tiền không bao giờ là chuyện nhỏ, họ vào nghĩa là họ tin." | họ vào = họ tin | ~4.3s (129f) | Money flow visualization: large green arrows từ tổ chức → vào cổ phiếu. Counter $ tăng. Cuối câu, big text "HỌ TIN" gold | Money flow arrows continuous draw. Big text `spring decisive` snap @ "họ tin" | — | money rustle low, snap @ "họ tin" | 600 |

### Phase 6: VALUE_M (s18-s21) — Market Direction

| id  | Phase | Giọng (tts) | Main idea | Dur (est) | Visual anchor | Animation | Enum beats | SFX | Pause after |
|-----|-------|-------------|-----------|-----------|---------------|-----------|------------|-----|-------------|
| s18 | VALUE_M | "Mờ, xu hướng thị trường chung." | M = xu hướng chung | ~1.6s (48f) | Footprint #4 → glass card "M" + icon sóng/chart trend | `spring decisive` card pop. Wave icon flow @ f10 | — | wave SFX @ f10 | 250 |
| s19 | VALUE_M | "Cuối cùng, Vê En In-đếch đang lên, hay đang xuống?" | VN-Index lên hay xuống | ~2.5s (75f) | VN-Index chart split: nửa trái lên (green arrow), nửa phải xuống (red arrow). "?" gold cuối | Split chart morph theo enum_beats: green up @ "đang lên", red down @ "đang xuống" | "đang lên"@~f25, "đang xuống"@~f55 | up-tick @ f25, down-tick @ f55 | 250 |
| s20 | VALUE_M | "Cổ phiếu tốt đến mấy, gặp sóng giảm chung, thì bảy mươi lăm phần trăm cổ phiếu vẫn rơi theo." | 75% rơi theo sóng giảm | ~4.7s (141f) | Sóng giảm lớn (red wave) → kéo theo 75/100 cổ phiếu mini falling. Big "**75%**" red number snap @ word timestamp | Wave animate left→right. Stocks fall stagger. **75% snap** `spring decisive` đúng @ "bảy mươi lăm phần trăm" | "75%"@~f80 | wave whoosh @ f10, crash @ "75%" | 300 |
| s21 | VALUE_M | "Đó là lý do, Ô Nin bảo, Mờ là chữ quan trọng nhất." | M quan trọng nhất | ~2.7s (81f) | Portrait William O'Neil (silhouette / book icon "How to Make Money in Stocks") + quote callout. **"M quan trọng nhất"** highlight gold lớn | `MarkerHighlight` "M". Quote callout fade-in `calm` 18f | — | book turn page @ f5, gentle chime @ "quan trọng nhất" | 700 |

### Phase 7: VALUE_WRAP (s22-s23) — Câu chốt + tease

| id  | Phase | Giọng (tts) | Main idea | Dur (est) | Visual anchor | Animation | Enum beats | SFX | Pause after |
|-----|-------|-------------|-----------|-----------|---------------|-----------|------------|-----|-------------|
| s22 | VALUE_WRAP | "Gộp lại, Sờ Lim trả lời 1 câu duy nhất… thị trường có thực sự đang công nhận cổ phiếu này, ngay lúc này, hay không." | SLIM = câu hỏi công nhận | ~6.7s (201f) | 4 letter cards S/L/I/M dim ở rìa. **Big text 1 dòng đậm trung tâm**: `THỊ TRƯỜNG ĐANG CÔNG NHẬN?` (gold) — moment cao trào nhất | 4 cards dim 30f. **Hard pause 600ms** @ "...". Big text `spring decisive` snap, sau đó **đứng yên tuyệt đối** | — | silence @ "...", thunder-clap @ snap, sau đó silence còn lại | 500 |
| s23 | VALUE_WRAP | "Mỗi chữ ở đây còn cả 1 thế giới riêng, series này mình sẽ bóc sâu từng chữ, ở các video sau." | tease video sau | ~4.6s (138f) | 4 mini "world" icons mỗi cái mờ trong 4 letter cards (như planet preview). Subtitle "video sau" pulse | `spring soft` 4 worlds appear stagger. Subtitle `MarkerHighlight` | — | gentle whoosh × 4 (mỗi world appear) | 700 |

### Phase 8: CTA (s24-s27) — Tổng kết + tải app

| id  | Phase | Giọng (tts) | Main idea | Dur (est) | Visual anchor | Animation | Enum beats | SFX | Pause after |
|-----|-------|-------------|-----------|-----------|---------------|-----------|------------|-----|-------------|
| s24 | CTA | "Vậy là đủ 7 chữ, Can cho quá khứ với tương lai, Sờ Lim cho hiện tại." | callback 7 chữ 3 thì | ~3.4s (102f) | 7 letters CANSLIM laid out lớn. CAN highlight gray (quá khứ) + light (tương lai). SLIM highlight gold (hiện tại) | Letters scale-up `spring decisive`. Color tint stagger theo enum word timestamp | "quá khứ"@~f30, "tương lai"@~f55, "hiện tại"@~f80 | tint × 3 đúng từng beat | 400 |
| s25 | CTA | "Video tới mình ráp cả 7 thành 1 quy trình bạn dùng được luôn, chỉ 3 bước cho người mới bắt đầu." | video sau: 3 bước | ~4.8s (144f) | 3 numbered steps placeholder (1-2-3 circles) appear. **Tease "Video #04"** badge. Sub "ngay tuần sau" | `ProgressSteps` reveal 3 steps stagger. Badge `spring resolve` snap | — | step-tick × 3 | 350 |
| s26 | CTA | "Theo dõi kênh, đừng bỏ lỡ nha." | subscribe nha | ~1.5s (45f) | YouTube/TikTok subscribe button + bell icon, channel logo KFSP top center | `spring decisive` button snap, bell ring small. **STILL** sau snap (không pulse) | — | bell @ f15, **silence sau f15** | 250 |
| s27 | CTA | "Tải KFS B ở bai-ô để có sẵn data cho cả 4 chữ Sờ Lim, RS rating, độ rộng, sở hữu tổ chức, xu hướng index." | data 4 chữ SLIM | ~5.5s (165f) | KFSP app screenshot phone mockup. 4 features pill pop @ enum word timestamps. Cuối: link bio glow | `DeviceMockupZoom` zoom phone. 4 pills `spring resolve` stagger đúng word timestamp ±2f | "RS rating"@~f70, "độ rộng"@~f95, "sở hữu tổ chức"@~f120, "xu hướng index"@~f145 | pop × 4 đúng từng beat, `success` SFX (3.9s) overlay từ f100 | 0 |

---

## QA Audit Checklist (24 mục)

### A. Audio / Subtitle
| # | Hạng mục | Tiêu chí | Pass? |
|---|---|---|-------|
| 1 | Subtitle sync | 5-6 từ/chunk, khớp 100% whisper timestamps mỗi câu | ☐ |
| 2 | Subtitle vị trí | y=1380-1470, không bị TikTok UI đè | ☐ |
| 3 | Subtitle 1 dòng | Mỗi lần 1 dòng, không wrap | ☐ |
| 4 | Subtitle atomic | Không có subtitle nào tách ngang 2 câu | ☐ |
| 5 | Audio không cắt | Voiceover mỗi câu phát hết duration | ☐ |

### B. Visual / Layout
| # | Hạng mục | Tiêu chí | Pass? |
|---|---|---|-------|
| 6 | Logo KFSP | Căn giữa top, y=160-290, kích thước rõ | ☐ |
| 7 | Phone mockup (s14, s27) | Không cắt rìa, RS rating + 4 features hiển thị đầy đủ | ☐ |
| 8 | Zoom chính xác | s14 zoom đúng RS rating, s27 zoom đúng 4 chữ SLIM section | ☐ |
| 9 | Annotation | Pulsing dot/box đúng tọa độ element | ☐ |
| 10 | Safe zone | Content trong x:60-1020, y:150-1500 | ☐ |
| 11 | Progress bar | y=1490, animate smooth | ☐ |
| 12 | Textbox không đè app | Hình app screenshot luôn hiển thị rõ | ☐ |

### C. Animation / SFX
| # | Hạng mục | Tiêu chí | Pass? |
|---|---|---|-------|
| 13 | Animation khớp giọng | Visual sync speech ±5 frames | ☐ |
| 14 | Easing curves | Không linear, mọi chuyển động ease-out/spring | ☐ |
| 15 | Emotional arc | HOOK calm→curiosity, VALUE confident reveal, WRAP cao trào, CTA decisive→still | ☐ |
| 16 | SFX đúng timing | pop=appear, chime=reveal, whoosh=transition, không spam | ☐ |
| 17 | SFX volume | 0.2-0.4, không lấn voiceover | ☐ |
| 18 | Silence moments | s06 "..." + s22 "..." silence rõ. s26 bell xong silence | ☐ |
| 19 | Transition mượt | Crossfade/wipe giữa câu, không jump cut | ☐ |
| 20 | CTA đứng yên | s26 bell xong, button snap rồi KHÔNG pulse | ☐ |

### D. Sentence-Driven (BẮT BUỘC)
| # | Hạng mục | Tiêu chí | Pass? |
|---|---|---|-------|
| 21 | **Sentence atomicity** | Mỗi câu = 1 clip riêng. Không transition đè ranh giới câu | ☐ |
| 22 | **Main idea match** | Visual câu X minh hoạ đúng `main_idea`, không câu X-1/X+1. Đặc biệt: s05/s06/s24 đúng "3 thì" callback, s09/s12/s15/s18 đúng letter card | ☐ |
| 23 | **Enum beat sync** | Câu liệt kê pop element đúng word timestamp ±2f. Đặc biệt: s02 (3 thì), s03 (wordplay 2 nghĩa), s13 (2 cổ phiếu), s16 (2 actor), s19 (2 hướng), s24 (3 thì callback), s27 (4 features KFSP) | ☐ |
| 24 | **Stitch gap** | Silence padding khớp `pause_after_ms`. Đặc biệt: 700ms cuối HOOK (s07), VALUE_WRAP (s23), 600ms inter-letter (s11/s14/s17) | ☐ |

---

## Pronunciation TBD (B1 cần Thanh duyệt)

Các từ chưa chắc Vbee sẽ đọc đúng — test ở B2:

| Từ | Cách viết hiện tại trong tts | Concern | Fallback nếu fail |
|---|---|---|---|
| `Yesterday is history…` (s01) | English nguyên bản | Vbee VN voice clone đọc accent VN, có thể stress sai | Tách thành 4 câu English độc lập, hoặc compact dịch luôn |
| `Sờ Lim` | Sờ Lim | Đã dùng từ video #01? Confirm consistency | Test giữ nguyên SLIM |
| `Lờ — Lít-đờ` (s12) | Lờ, Lít-đờ | Vbee có thể đọc "Lờ" cứng | `L`, hoặc bỏ chữ cái → "Leader, tức là cổ phiếu dẫn đầu" |
| `I` (s15) | I | Vbee có thể đọc "y dài" | "Chữ I", hoặc "Ai" English |
| `Mờ` (s18, s21) | Mờ | Vbee có thể nuốt | "Chữ M", hoặc "em" |
| `Vê En In-đếch` (s19) | đã phiên âm | Test xem có natural không | "VN Index" giữ nguyên test trước |
| `Ô Nin` (s21) | đã phiên âm | OK | — |
| `KFS B` (s27) | đã phiên âm | OK (đã dùng video #01, #02) | — |
| `bai-ô` (s27) | bai-ô (= bio) | Vbee có thể đọc "bi-ô" | "phần mô tả" |
| `RS rating` (s27) | giữ nguyên | Vbee có thể đọc "Rờ Sờ" | "Rờ Ét rating", hoặc bỏ luôn còn "độ mạnh tương đối" |

---

## Render Workflow

```bash
# Folder structure dự kiến (tạo khi B2):
canslim-03-slim-4-chu-sau/
├── script_display.md           ✓ DONE
├── sentences.json              ✓ DONE (B1.5, duration_s null đến B2)
├── PLAN_STORYBOARD.md          ✓ DONE (file này)
├── audio/                      ⏳ B2 sẽ tạo (s01.mp3, s01.json, …, s27.mp3, s27.json)
├── screen-shot/                ⏳ B3 cần Thanh thả assets
│   ├── KFSP_RS_rating.PNG      (cho s14)
│   ├── KFSP_4features.PNG      (cho s27)
│   └── ONeil_book.PNG          (cho s21, optional)
├── remotion-canslim03/         ⏳ B5 sẽ tạo
│   └── src/sentences/
│       ├── Sentence_s01.tsx
│       ├── …
│       └── Sentence_s27.tsx
├── clips/                      ⏳ B5 output (s01.mp4 → s27.mp4)
└── final.mp4                   ⏳ B5 stitched
```

### Gate theo phase (8 batch)

```bash
# 1. HOOK (s01-s07) → 7 clips → Thanh duyệt
# 2. VALUE_INTRO (s08) → 1 clip → duyệt
# 3. VALUE_S (s09-s11) → 3 clips → duyệt
# 4. VALUE_L (s12-s14) → 3 clips → duyệt
# 5. VALUE_I (s15-s17) → 3 clips → duyệt
# 6. VALUE_M (s18-s21) → 4 clips → duyệt
# 7. VALUE_WRAP (s22-s23) → 2 clips → duyệt
# 8. CTA (s24-s27) → 4 clips → duyệt

# Render từng câu:
cd remotion-canslim03
for s in s01 s02 ... s27; do
  npx remotion render Sentence_$s --output=../clips/$s.mp4
done

# Stitch (sau khi 8 phase OK):
ffmpeg -f concat -safe 0 -i concat_list.txt -c copy final.mp4
```

### Concat list (sample)

```
file 'clips/s01.mp4'
file 'pause_600.mp4'
file 'clips/s02.mp4'
file 'pause_350.mp4'
file 'clips/s03.mp4'
…
file 'clips/s27.mp4'
```

---

## Components Inventory

### Đã có (remotion-kfsp shared)
- `BlurReveal` (Hook s01, s06) — text fade-in cinematic
- `MarkerHighlight` (s05, s11, s23) — highlight từ khoá
- `StaggeredFadeUp` (s08) — 4 footprints stagger
- `DeviceMockupZoom` (s14, s27) — phone mockup + zoom
- `PulsingIndicator` (s10, s14) — pulse vào element
- `SpringPopIn` (mọi câu có letter card) — pop vào
- `ProgressSteps` (s25) — 3 numbered steps
- `MarkerHighlight` cho keyword
- SubtitleBar (per-sentence)
- SFX library: pop, chime, whoosh, swoosh, click, success

### Cần chuẩn bị thêm
| Mục | Nguồn | Cho câu | Có chưa? |
|---|---|---|---|
| Gift box icon (gold) | Lottie hoặc SVG static | s02, s07 | ☐ |
| Footprint icon (gold gradient) | SVG | s08 | ☐ |
| Volume bar chart (animate) | Code chay từ remotion-animated | s11 | ☐ |
| Medal/leader badge | Lottie | s12 | ☐ |
| Building/skyscraper icon | SVG | s15 | ☐ |
| Shark + fish icons | SVG hoặc Lottie | s16 | ☐ |
| Money flow arrows (continuous) | remotion-animated | s17 | ☐ |
| Screenshot KFSP RS rating | Thanh cung cấp | s14 | ☐ |
| Screenshot KFSP 4 features | Thanh cung cấp | s27 | ☐ |
| O'Neil portrait/book | Stock photo / book cover | s21 | ☐ |
| BGM nhạc nền | Pixabay (calm, intimate) | toàn video | ☐ |

---

## Key Decisions cần Thanh confirm trước khi đi tiếp

1. **Duration ~108-110s** vượt target 85-92s ~20s. Quyết option:
   - (A) Giữ nguyên 27 câu, chấp nhận ~108s (giàu nội dung).
   - (B) Compact s03 wordplay → ~103s.
   - (C) Gộp letter intro + question (s09+s10, s12+s13, s15+s16, s18+s19) → ~93s nhưng mất nhịp "câu hỏi present tense".
2. **English Hook (s01)**: Test ở B2 — nếu Vbee đọc không tự nhiên, fallback split 4 câu hay compact thẳng dịch?
3. **3 mảnh kính callback #02**: OK với analogy "kính bên = driver view = hiện tại"? Hay đổi sang frame "3 timeline ngang" đơn giản hơn?
4. **Gift box motif**: Có thực sự appear lặp lại 3 lần (s02 Hook, s07 Hook, s24 CTA), hay chỉ Hook?
5. **Asset KFSP**: Thanh có sẵn screenshot RS rating + screenshot 4 features (RS rating, độ rộng, sở hữu tổ chức, xu hướng index) chưa? Nếu chưa, B3 sẽ chờ.
6. **Pronunciation**: 10 từ TBD ở mục trên — cần Thanh duyệt cách viết Vbee trước B2.

---

## Notes (cho B5/B6)

- **Visual continuity**: 3 mảnh kính (chiếu hậu / chắn gió / kính bên) nên xuất hiện sớm trong Hook (s05, s06) để callback #02 — quan trọng cho viewer đã xem #02 cảm thấy "ăn khớp".
- **Câu chốt s22 là moment cao trào** — render đậm, big text 1 dòng, **đứng yên tuyệt đối** sau snap. Đây là frame hot nhất video, có thể dùng làm thumbnail.
- **CTA s27 enum beats CRITICAL**: 4 features KFSP phải pop đúng word timestamp. Nếu Whisper bắt sai timestamp → rework `enum_beats` ngay.
- **Mỗi chữ S/L/I/M sẽ có 1 video deep-dive ở #04-#09** — visual hint nhẹ ở s23 (4 mini worlds preview) là setup, không nên over-design.
- **Sửa atomic**: nếu B6 Thanh feedback "câu s11 visual không hiện volume bar đủ rõ" → chỉ edit `Sentence_s11.tsx` → re-render `clips/s11.mp4` → re-stitch. KHÔNG đụng câu khác.
