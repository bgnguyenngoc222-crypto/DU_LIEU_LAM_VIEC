# PLAN_STORYBOARD v4 — Sentence-Driven (20260414-11 tieu chi fa)

> Refactored from v3 monolithic storyboard → per-sentence atomic.
> Source: `sentences.json` (20 câu, tái sử dụng voiceover.mp3 + whisper cũ, cắt per-sentence).
> Scene components: tái sử dụng HookScene / ProblemScene / AgitateScene / SolveScene / ActionScene.
> Render per-sentence → gate theo phase PASA → stitch bằng ffmpeg concat.

## Summary

- Total sentences: 17
- Total audio: 81.65s + total pause: 5.94s = 87.59s
- Original voiceover: 87.38s
- Phases: HOOK 3 | PROBLEM 3 | AGITATE 6 | SOLVE 4 | ACTION 4

## Sentence Storyboard

| id | Phase | Câu | Main idea | Dur | Offset | Visual anchor | Animation | Enum beats | SFX | Pause |
|----|-------|-----|-----------|-----|--------|---------------|-----------|------------|-----|-------|
| s01 | HOOK | "Pê trên E, rờ ô e, Ê Bít Đa, Ô Xê Ép, Tê Tê Mờ, Dia-ô-vờ-dia... mới…" | **jargon overload** | 9.44s (283f) | +0f | TermsOverload swirl 2 rings (P/E, ROE, EBITDA, OCF, TTM, YoY + 12 từ khác) — center trống, bg red heartbeat | spring heavy, terms rơi xuống từ mọi hướng, scale tăng dần + opacity giảm (overload feel) | "P/E"@f0, "ROE"@f30, "EBITDA"@f59, "OCF"@f87, "TTM"@f118, "YoY"@f145 | heartbeat low @ f0, whoosh @ f0 (beat khi mỗi term xuất hiện trong enum_beats) | 630ms |
| s02 | HOOK | "Nếu bạn cũng đang choáng thì video này cho bạn đó. Mình sẽ giúp bạn…" | **bạn cũng đang CHOÁNG** | 6.21s (186f) | +302f | Terms freeze + dim 35%. Big text 'BẠN CŨNG THẤY CHOÁNG?' snap vào giữa. '?' blink đỏ | spring resolve (snap dứt khoát), '?' blink every 12f | — | tick @ f0 (tension break) | 310ms |
| s03 | PROBLEM | "Có phải bạn đang mở áp đọc tin, thấy "Pê trên E có vẻ rẻ", "Rờ Ô Ê …" | **nghe qua cũng hiểu** | 8.55s (256f) | -2f | Bg transition red→purple soft. Text 'ĐÚNG VIDEO DÀNH CHO BẠN' fade-in. Terms tiếp tục dim | ease-out bg lerp 80f, text fade-in 20f | "P/E rẻ"@f61, "ROE cao"@f108, "biên LN cải thiện"@f148 | synth bell @ f5 (relief, hy vọng) | 0ms |
| s04 | PROBLEM | "Xong bấm vào báo cáo tài chính của mã đang quan tâm, thấy gì, thấy …" | **BCTC → đơ luôn** | 9.35s (280f) | +250f | News feed scroll FPV. 3 pills liệt kê: 'P/E rẻ' (f0), 'ROE cao' (f60), 'biên LN cải thiện' (f87) pop theo enum_beats | spring resolve stagger theo enum_beats (word timestamp lệch ≤2f) | "200 dòng số"@f131, "50 chỉ số"@f165 | scroll ambient low, pop @ mỗi pill timestamp | 410ms |
| s05 | AGITATE | "Mà... đây không phải vấn đề của riêng bạn đâu. Ai mới vô thị trường…" | **không phải riêng bạn** | 4.57s (137f) | -7f | Mở BCTC → bảng số dày đặc. Số '200' pop (f0), '50' pop (f44). Tay chấm dòng | ease-in camera dolly vào bảng, pop spring decisive cho số | — | cuộn giấy @ f0, pop @ 200, pop @ 50 | 390ms |
| s06 | AGITATE | "Phân tích Ép ây xịn thì phải mất tầm vài năm đọc mới thấm từng chỉ số." | **FA xịn vài năm thấm** | 3.25s (98f) | +142f | 'ĐƠ LUÔN' snap freeze lớn, pause 8f. Rồi 'Không biết bắt đầu từ đâu nữa' subtitle | spring resolve snap + hard pause | — | tap nhịp tim 1 lần @ f0, silence cuối câu | 0ms |
| s07 | AGITATE | "Nên đa số người mới bỏ cuộc từ khúc này." | **đa số bỏ cuộc** | 2.02s (61f) | +239f | Big reassuring text 'KHÔNG PHẢI RIÊNG BẠN' fade-in gentle | spring soft, zoom-in chậm | — | ambient calm | 450ms |
| s08 | AGITATE | "Nhưng bạn không cần đợi vài năm nữa mới có thể tiếp tục trên thị tr…" | **không cần đợi — có lối** | 7.19s (216f) | +314f | Nhiều silhouette người (new traders) xếp hàng ngang mờ mờ | stagger fade-in 5 silhouettes | — | — | 330ms |
| s09 | AGITATE | "Giống hồi cấp một học "quy tắc tam suất" vậy đó. Chấp nhận quy tắc …" | **tam suất: luật trước** | 4.99s (150f) | +539f | BrickWall tái xuất. 9/10 silhouette leo trượt rơi slow-motion. 'VÀI NĂM' hiện to ở góc | ease-in slow-motion fall, 'VÀI NĂM' spring decisive | — | wind whoosh rơi @ f30 | 350ms |
| s10 | SOLVE | "Và đó là cái Kungfu làm." | **Kungfu làm được** | 1.81s (54f) | -21f | Text 'NHƯNG BẠN KHÔNG CẦN ĐỢI' snap vào, bg sáng dần (hy vọng) | spring resolve + bg lerp ease-out 60f | — | tick sáng @ f0 | 450ms |
| s11 | SOLVE | "11 chỉ số phân tích cơ bản gom lại, vẽ thành 1 cái ra-đa, kiểu ra-đ…" | **11 trục → radar** | 7.33s (220f) | +47f | 'BỘ CHỈ SỐ ĐÃ CHỌN SẴN' text + icon gift/box wrapped | spring resolve scale-in | "11 chỉ số gom"@f1, "radar cầu thủ"@f90, "nhô = mạnh"@f152, "lõm = yếu"@f192 | pop bow @ f0 | 450ms |
| s12 | SOLVE | "Bấm thẳng vào từng điểm trên ra-đa, áp hiện luôn điểm thành phần." | **bấm → hiện điểm** | 3.37s (101f) | +280f | TamSuatScene reuse — bảng học trò + '3/4 = 6/x' + 'chấp nhận quy tắc trước' | ease-out reveal 40f | — | pen write @ f10 | 570ms |
| s13 | SOLVE | "Bạn vẫn đang phân tích Ép ây, chỉ là bây giờ có lối vào, có người dẫn." | **có lối vào, có người dẫn** | 3.61s (108f) | +399f | Logo KFSP glow lớn ở giữa, 'Kungfu làm được' subtitle | spring decisive + glow pulse | — | chime @ f5 (reveal) | 490ms |
| s14 | ACTION | "Mở áp Kungfu lên, chọn mã quan tâm, nhìn ra-đa, 5 giây là nắm sơ bộ." | **5 giây nắm sơ bộ** | 4.13s (124f) | -3f | RADAR 11 TRỤC: enum_beats → '11 chỉ số gom' (f0) → 'radar cầu thủ' (f78) → 'nhô=mạnh' (f151) → 'lõm=yếu' (f192) | FootballRadar vẽ 11 trục stagger 50ms, mỗi enum beat pop label | — | ding × 11 (vẽ trục), whoosh cut sang analogy @ f78 | 390ms |
| s15 | ACTION | "Bấm vào các tooltip để xem điểm số từng khía cạnh." | **tooltip xem chi tiết** | 2.47s (74f) | +132f | Bấm vào 1 điểm radar → tooltip drill-down hiện điểm thành phần (mockup) | cursor tap spring decisive + tooltip scale-in | — | tap @ f10, pop @ f25 | 370ms |
| s16 | ACTION | "Cánh cửa vào Ép ây cho người mới là đây." | **cánh cửa FA** | 1.93s (58f) | +217f | Bức tường xuất hiện mờ có cửa sáng vàng. 'LỐI VÀO' + 'NGƯỜI DẪN' text promise | DoorWithNumber với '11' glow, ease-in-out | — | click cửa mở @ f20 | 350ms |
| s17 | ACTION | "Link tải ở bai-ô nha." | **link tải bio** | 1.43s (43f) | +286f | Phone mockup watchlist → radar xuất hiện. Counter '5 giây' 0→5 | spring calm phone slide-up, counter decisive | — | tap @ f5, tick đếm × 5 | 0ms |

**Offset** = frame trong scene PASA cũ khi composition của câu bắt đầu (dùng cho `<Sequence from={-offset}>`).
Giá trị âm hiếm (≤10f) = scene phase bắt đầu sau sentence cut_start một chút → clamp về 0, 1-2 frames bg default không nghiêm trọng.

## QA Audit Checklist (24 mục)

### A. Audio / Subtitle
| # | Hạng mục | Pass? |
|---|---------|-------|
| 1 | Subtitle sync: 5-6 từ/chunk, khớp whisper timestamps mỗi câu | ☐ |
| 2 | Subtitle vị trí: y=1380-1470, không bị TikTok UI đè | ☐ |
| 3 | Subtitle 1 dòng: mỗi lần 1 dòng, không wrap | ☐ |
| 4 | Subtitle atomic: không có subtitle nào tách ngang 2 câu | ☐ |
| 5 | Audio không cắt: voiceover mỗi câu phát hết duration | ☐ |

### B. Visual / Layout
| # | Hạng mục | Pass? |
|---|---------|-------|
| 6 | Logo: căn giữa top, y=160-290 | ☐ |
| 7 | Phone mockup: không cắt rìa | ☐ |
| 8 | Zoom chính xác vào vùng cần chú ý | ☐ |
| 9 | Annotation: pulsing dot/box đúng tọa độ | ☐ |
| 10 | Safe zone: content trong x:60-1020, y:150-1500 | ☐ |
| 11 | Progress bar: y=1490 smooth | ☐ |
| 12 | Textbox không đè hình app | ☐ |

### C. Animation / SFX
| # | Hạng mục | Pass? |
|---|---------|-------|
| 13 | Animation khớp giọng ±5f | ☐ |
| 14 | Easing: không linear | ☐ |
| 15 | Emotional arc: Hook overwhelm→relief, Solve calm, CTA decisive→still | ☐ |
| 16 | SFX đúng timing, không spam | ☐ |
| 17 | SFX volume 0.2-0.4, không lấn voiceover | ☐ |
| 18 | Silence moments: CTA still không SFX | ☐ |
| 19 | Transition mượt giữa câu (không jump) | ☐ |
| 20 | CTA đứng yên, không pulse | ☐ |

### D. Sentence-Driven (MỚI)
| # | Hạng mục | Pass? |
|---|---------|-------|
| 21 | **Sentence atomicity**: mỗi câu 1 clip riêng, không transition đè ranh giới câu | ☐ |
| 22 | **Main idea match**: visual câu X = đúng main_idea (không câu X-1/X+1) | ☐ |
| 23 | **Enum beat sync**: câu liệt kê pop element ≤2f lệch, không stagger đều | ☐ |
| 24 | **Stitch gap**: silence padding giữa câu khớp pause_after_ms | ☐ |

## Render workflow

```bash
# Gate theo phase PASA:
# 1. HOOK (s01-s03):
cd remotion-fa
for s in s01 s02 s03; do npx remotion render Sentence_$s --output=../clips/$s.mp4; done
# → Thanh xem clips/s01.mp4 s02.mp4 s03.mp4 → duyệt HOOK

# 2. PROBLEM (s04-s06): …
# 3. AGITATE (s07-s12): …
# 4. SOLVE (s13-s16): …
# 5. ACTION (s17-s20): …

# Stitch final sau khi 5 phase OK:
python3 scripts/stitch_final.py
```
