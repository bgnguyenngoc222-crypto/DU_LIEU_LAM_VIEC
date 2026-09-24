# PLAN STORYBOARD — Phổ xâm lấn nến đôi (29 câu)

> Video: `20260615-cktt-pho-xam-lan-nen-doi` · Framework 3Qs · ~158s
> 2 build: **nobrand** (Chứng khoán trong tầm tay) + **brand** (KFSP) — chung s01–s26, khác CTA.
> Kiến trúc: clone tập `20260613` (Main.tsx + data.json timeline + voice_full.mp3 + BrandFrame). Tái dùng candle engine `CandleSeq`, assets chuồn chuồn/ráng, SFX.
> Style: nền sepia/vintage cho HOOK dân gian → hard cut sang navy `#0a1628` cho chart. Nến xanh `#34d399`/đỏ `#f87171`.

---

## A. SENTENCE STORYBOARD (row = 1 câu)

| id | phase | dur | main_idea | visual_anchor | asset | animation | enum_beats | sfx |
|---|---|---|---|---|---|---|---|---|
| s01 | HOOK | 4.7 | ông bà không có app | Cánh đồng quê sepia, gió nhẹ; chữ "không dự báo — vẫn chuẩn bị" | bg:que-canh-dong (opt) / code gradient | fade-in chậm, ease-in-out, tông ấm | — | whoosh nhẹ vào |
| s02 | HOOK | 4.9 | trắng tay, thức trắng | Tối dần → đêm lũ đèn dầu; ngột ngạt | bg:dem-lu (opt) / code tối dần | background tối dần (áp lực), ↓ | — | rumble thấp |
| s03 | HOOK | 6.4 | kho tàng đổi bằng xương máu | Bàn tay già trao bàn tay trẻ (biểu tượng trao truyền) | code (2 hand silhouette) | ease-in-out ấm, sáng nhẹ lên | — | ting ấm |
| s04 | HOOK | 4.5 | hỏi mức độ không phải tên | Text overlay: "không hỏi sắp mưa — hỏi MỨC ĐỘ" | code | "MỨC ĐỘ" snap to, ease-out | — | pop |
| s05 | HOOK_C1 | 7.9 | 3 mức độ chuồn chuồn | chuồn chuồn ở 3 độ cao: cao→sát đất→sà mặt ao | photo:chuon-chuon ✓ + code 3 vị trí | mỗi mức pop đúng nhịp, bay xuống dần ↓ | bay thấp@..., sát đất@..., sà mặt ao@... | pop×3 |
| s06 | HOOK_C2 | 6.3 | 2 mức độ kiến | đàn kiến: lác đác → tha trứng lên cao | **photo:kien (CẦN GEN)** + code density | mật độ tăng dần, bò trái→phải | lác đác@..., tha trứng lên cao@... | pop×2 |
| s07 | HOOK_C3 | 6.0 | 2 mức độ ráng trời | gradient trời: xanh trong → ráng mỡ gà | photo:rang-mo-ga ✓ + code gradient | màu chuyển trái→phải | trong xanh@..., ráng mỡ gà@... | whoosh |
| s08 | HOOK | 3.8 | học từ tổn thất | 3 icon (chuồn/kiến/ráng) thu nhỏ về giữa | code | 3 icon scale-down hội tụ | — | whoosh |
| s09 | HOOK | 3.3 | mức độ quyết định hành động | KEY: "Cùng 1 dấu hiệu — khác MỨC ĐỘ — khác hành động" | code | 3 vế pop từng vế, ease-out mạnh, **pause 700ms** | cùng một@.., khác mức độ@.., khác hành động@.. | ting |
| s10 | BRIDGE | 7.5 | học thuộc 4 tên nến | **HARD CUT** sepia→navy; 4 tên nến pop | code | hard cut (điểm đảo thị giác), 4 tên pop | phản công@.., xuyên thấu@.., nhấn chìm@.., đáy nhíp@.. | whoosh mạnh + pop×4 |
| s11 | BRIDGE | 5.9 | mở chart vẫn bối rối | 1 cặp nến + dấu "?" nhấp nháy | code | "?" pulse, zoom nhẹ | — | — |
| s12 | BRIDGE | 5.6 | hỏi sai câu hỏi | icon chuồn chuồn nhỏ cạnh cặp nến → fade (khoá metaphor) | photo:chuon-chuon ✓ (nhỏ) + code | chuồn chuồn fade-in cạnh nến rồi mờ | — | pop nhẹ |
| s13 | BRIDGE | 5.5 | câu hỏi đúng xâm lấn bao sâu | dashed line ngang thân nến đỏ + mũi tên đo khoảng xâm lấn | code | mũi tên vẽ dần đo độ sâu | — | click |
| s14 | BRIDGE | 4.1 | xâm lấn sâu mạnh hơn | KEY: "XÂM LẤN CÀNG SÂU = SỨC MẠNH CÀNG LỚN" | code | text snap center, ease-out mạnh, **pause 700ms** | — | ting |
| s15 | HOW | 4.5 | 4 mức xâm lấn | title card "4 MỨC XÂM LẤN" tím gradient | code | slide-up, tăng nhịp | — | whoosh |
| s16 | HOW_P1 | 7.3 | phản công leo về ngang | **PHẢN CÔNG**: 4 đỏ downtrend → đỏ + xanh; xanh gap dưới, leo về NGANG giá đóng đỏ (dashed line bằng nhau, KHÔNG vào thân) | code (CandleSeq) | nến xanh leo lên dừng đúng mức đóng đỏ | — | click + ting |
| s17 | HOW_P1 | 3.9 | lực yếu vùng ngoài rìa | label "VÙNG NGOÀI RÌA" xám | code | label pop SAU câu, xám nhạt | lực còn yếu@.., cần xác nhận@.., vùng ngoài rìa@.. | pop |
| s18 | HOW_P2 | 6.4 | xuyên thấu vượt nửa thân | **XUYÊN THẤU**: xanh đóng vượt quá 50% thân đỏ (dashed midpoint) | code (CandleSeq) | xanh ăn lên vượt midpoint rồi dừng | — | click + ting |
| s19 | HOW_P2 | 3.6 | lực rõ hơn vùng giữa | label "VÙNG GIỮA" vàng nhạt | code | label pop SAU câu | lực rõ hơn@.., đáng chú ý@.., vùng giữa@.. | pop |
| s20 | HOW_P3 | 6.7 | nhấn chìm nuốt trọn | **NHẤN CHÌM**: xanh dài nuốt trọn thân đỏ, đóng trên đỉnh (glow xanh) | code (CandleSeq, ENGULF) | xanh trùm trọn đỏ, glow `#34d399` | — | click + ting mạnh |
| s21 | HOW_P3 | 2.9 | lực dứt khoát vùng đẹp | label "VÙNG ĐẸP" xanh glow | code | label pop SAU câu, glow | lực dứt khoát@.., vùng đẹp@.. | pop |
| s22 | HOW_P4 | 7.0 | đáy nhíp cùng một đáy | **ĐÁY NHÍP**: đỏ + xanh chung 1 đáy (shared dashed bottom + bracket 2 đáy bằng) | code (CandleSeq) | bracket đánh dấu 2 đáy, mũi tên bật lên | — | click + ting |
| s23 | HOW_P4 | 4.0 | lực đỡ đáy chắc | label "VÙNG MẠNH NHẤT" xanh đậm glow mạnh nhất | code | label pop SAU câu, glow mạnh nhất | có lực đỡ@.., đáy chắc@.., vùng mạnh nhất@.. | pop + ting |
| s24 | EXTRA | 8.1 | nến dài, khối lượng củng cố | zoom-out 4 cặp nến cạnh nhau + thanh volume dưới | code | zoom-out nhẹ, nến thứ 2 dài hơn + volume bar mọc | — | whoosh nhẹ |
| s25 | CTA | 9.5 | tập đặt câu hỏi chẩn đoán | 2 câu hỏi pop: "ăn bao nhiêu %?" / "chạm cùng 1 đáy?" | code | zoom-in viewer, 2 câu hỏi pop | ăn bao nhiêu phần@.., chạm cùng một đáy@.. | pop×2 |
| s26 | CTA | 4.1 | tự đọc được lực | "tự đọc được lực từng mẫu nến" — tông ấm | code | sáng dần, ease-out | — | ting |
| **s27A** | CTA_BRAND | 3.0 | brand spine KFSP | overlay tím `#7B3AEC` + logo KFSP + "Đưa chứng khoán về tầm tay bạn" | code + photo:logo-kfsp ✓ | brand overlay fade-in, logo | — | ting brand |
| **s27B** | CTA_NOBRAND | 3.0 | follow xem tiếp | nút "Theo dõi" nảy (KHÔNG logo) | code | nút Follow bounce, ease-out | — | pop |
| **s28B** | CTA_NOBRAND | 2.0 | tagline kênh | text "Chứng khoán trong tầm tay" `#AA75FF` | code | fade-in, giữ | — | ting |

> **s27A** chỉ vào build **brand** · **s27B + s28B** chỉ vào build **nobrand**. s01–s26 dùng chung.

---

## B. ASSET MANIFEST (hình cần cho video)

| File | Scene | Trạng thái | Mô tả |
|---|---|---|---|
| `chuon-chuon.png` | s05, s12 | ✅ TÁI DÙNG (0613) | chuồn chuồn / cảnh quê sepia |
| `rang-mo-ga.png` | s07 | ✅ TÁI DÙNG (0613) | ráng trời mỡ gà |
| `logo-kfsp.png` | s27A (brand) | ✅ TÁI DÙNG (0613 brand) | logo KFSP trắng |
| `whoosh/pop/ting/click.mp3` | toàn bộ | ✅ TÁI DÙNG (0613) | SFX |
| **`kien.png`** | s06 | 🔴 **CẦN GEN (Gemini)** | đàn kiến tha trứng bò lên cao, nền sepia/vintage, 9:16, no text, no logo |
| `que-canh-dong.png` | s01 | 🟡 TUỲ CHỌN (code fallback) | cánh đồng lúa trước bão, sepia |
| `dem-lu.png` | s02 | 🟡 TUỲ CHỌN (code fallback) | đêm lũ, ánh đèn dầu leo lét, tông tối |

**Tất cả nến (s16–s24) + bridge + key message + CTA = `code`** (Remotion SVG, không cần ảnh).

→ **Tối thiểu chỉ cần gen 1 hình `kien.png`**; 2 hình opera (s01/s02) làm video giàu hơn nhưng có code fallback nếu anh không gen.

---

## C. CANDLE GEOMETRY (4 mẫu — vẽ ĐÚNG mức xâm lấn, bài học L2/L4)

> Nến đỏ (giảm): mép TRÊN = open, mép DƯỚI = close. Nến xanh (tăng): mép DƯỚI = open, mép TRÊN = close.

1. **PHẢN CÔNG** (s16): xanh open gap sâu **dưới** đáy đỏ → leo lên đóng **đúng = close đỏ** (mép dưới thân đỏ). Dashed line nối 2 close bằng nhau. **KHÔNG vào thân đỏ.**
2. **XUYÊN THẤU** (s18): xanh open dưới đáy đỏ → đóng **trên midpoint 50%** thân đỏ. Dashed midpoint.
3. **NHẤN CHÌM** (s20): xanh open dưới close đỏ → đóng **trên open đỏ** → thân xanh **trùm trọn** thân đỏ. Glow.
4. **ĐÁY NHÍP** (s22): đỏ rồi xanh, **2 đáy (low) bằng nhau** trên shared dashed bottom line. Bracket đánh dấu. Xanh bật lên.

---

## D. QA AUDIT (24 mục — trọng tâm)

- [ ] **Hard cut s09→s10**: sepia→navy phải dứt khoát (điểm đảo thị giác), không fade mờ.
- [ ] **Metaphor khoá s12**: chuồn chuồn nhỏ hiện cạnh cặp nến rồi mới fade.
- [ ] **Spectrum 3 dấu hiệu** s05/s06/s07 animate theo mức độ (không hiện đồng loạt).
- [ ] **Pause 700ms** giữ trên màn ở s09 + s14 (2 key message).
- [ ] **Nến ăn sâu đúng mức** s16/s18/s20/s22 (theo mục C — đây là lõi bài, sai là hỏng thông điệp).
- [ ] **Label vùng pop SAU câu chốt** s17/s19/s21/s23 (không hiện trước).
- [ ] **Enum beat sync** ≤2 frames: s05, s06, s07, s09, s10, s17, s19, s23, s25.
- [ ] **SFX phủ mọi scene** (cột sfx không trống — bài học L8).
- [ ] **Nút/label 1 dòng** `whiteSpace:nowrap` (L1).
- [ ] **Đuôi tiếng không cụt** — đo silencedetect, nới duration cuối (L6).
- [ ] **Brand spine hiện overlay**: s27A "Đưa chứng khoán về tầm tay bạn" / s28B "Chứng khoán trong tầm tay".
- [ ] **Subtitle** y1380–1470, 1 dòng karaoke theo word timestamps trong câu.
- [ ] **Sentence atomicity / Main idea match / Stitch gap** (3 mục sentence-driven).

---

*Sau khi CEO duyệt storyboard + Asset Manifest → gen `kien.png` (Bước 3) → clone project Remotion + code scene → render theo phase (Bước 5).*
