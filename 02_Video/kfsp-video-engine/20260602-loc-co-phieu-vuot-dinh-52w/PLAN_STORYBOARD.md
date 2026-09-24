# PLAN STORYBOARD — Lọc cổ phiếu vượt đỉnh 52 tuần (~30s)

- **Framework:** LAZY-TUT — Phương án B (Pure-Value, soft CTA / nuôi kênh)
- **Canvas:** 1080×1920, 30fps · **Voice mode:** B (self-recorded; Vbee Thanh Long timing reference)
- **Mục tiêu:** trao giá trị thuần → xin Follow. KHÔNG ép cài/trải nghiệm. Brand nhẹ (logo góc + nhắc tên 1 lần).
- **Port Remotion dự kiến:** 3013 (tăng 1 so với video gần nhất)

## Bảng storyboard per-sentence

| id  | Phase  | Câu (display)                                                              | Main idea            | Visual anchor                                                       | Animation / Easing                                  | SFX                          |
|-----|--------|----------------------------------------------------------------------------|----------------------|---------------------------------------------------------------------|-----------------------------------------------------|------------------------------|
| s01 | HOOK   | Cổ phiếu vừa vượt đỉnh 52 tuần thường là mã khoẻ nhất sàn, dòng tiền lớn đang gom. | mã khoẻ nhất sàn     | Chart 1 mã break lên qua đường đỉnh ngang (đỉnh 52w), nến xanh bật  | nhịp nhanh, zoom-in chậm vào điểm phá đỉnh (zoom)   | whoosh nhẹ                   |
| s02 | HOOK   | Lọc ra hết trong 30 giây, để mình chỉ.                                     | lọc trong 30 giây    | Chữ "30 giây" + đồng hồ tích nhanh                                  | "30 giây" snap-in (resolve), ease-out mạnh          | tick nhanh                   |
| s03 | STEPS  | Bước một: vô KFSP, mở mục Bộ lọc cổ phiếu.                                  | mở Bộ lọc            | Screenshot KFSP, zoom-to-tap nút "Bộ lọc cổ phiếu"                  | zoom-to-tap, con trỏ chạm (calm)                    | click                        |
| s04 | STEPS  | Bước hai: chọn tiêu chí Giá vượt đỉnh 52 tuần.                             | chọn tiêu chí vượt đỉnh | Zoom vào tiêu chí "Giá vượt đỉnh 52 tuần", tick xanh             | tiêu chí pop sáng đúng nhịp đọc (calm)              | pop                          |
| s05 | STEPS  | Bước ba: thêm điều kiện thanh khoản trên 5 tỷ một phiên, để loại mã rác.    | lọc thanh khoản      | Pop điều kiện thanh khoản; vài "mã rác" mờ rớt xuống                | pop điều kiện + mã rác mờ rơi xuống (heavy nhẹ)     | pop + tiếng "rụng" nhẹ       |
| s06 | STEPS  | Bước bốn: bấm Lọc.                                                          | bấm Lọc              | Zoom-to-tap nút "Lọc"                                               | tap dứt khoát (decisive)                            | click + whoosh               |
| s07 | STEPS  | Vậy là ra nguyên list mã vừa phá đỉnh, gọn gàng.                           | ra list phá đỉnh     | List kết quả mã trượt lên từ dưới                                   | list trượt lên mượt (calm), ease-out                | ting thoả mãn                |
| s08 | PAYOFF | Cực kỳ đơn giản đúng không.                                                 | cực kỳ đơn giản      | Chữ "cực kỳ đơn giản"                                               | scale nhẹ, sáng dần (soft)                          | nhẹ                          |
| s09 | CTA    | Follow để mình chỉ tiếp mấy bộ lọc ngon mỗi ngày nha.                       | follow xem tiếp tip  | Nút Follow + logo KFSP mờ ở góc                                     | nút Follow nảy (decisive), ease-out                 | pop dứt khoát                |

## QA Audit (sentence-driven)

- [ ] **Hook visual = phá đỉnh thật**: s01 có đường giá break qua đỉnh ngang 52w, KHÔNG chart generic.
- [ ] **Zoom-to-tap chuẩn**: s03–s06 zoom sát đúng nút thật trên screenshot KFSP, con trỏ/mũi tên mượt, không lẹm viền, không đè text lên vùng app.
- [ ] **SFX map**: click (s03,s06) · pop (s04,s05) + "rụng" mã rác (s05) · whoosh (s06) · ting (s07).
- [ ] **Soft CTA (nuôi kênh)**: s09 CHỈ kêu Follow, KHÔNG ép cài/trải nghiệm; brand chỉ logo góc + nhắc tên 1 lần (s03); pause_after_ms=0.
- [ ] **Motif "đơn giản"**: "30 giây" (s02) + "cực kỳ đơn giản" (s08) nhấn visual (snap/scale).
- [ ] **Safe zone**: nội dung y=150–1500, subtitle y=1380–1470, logo top y=160–290.
- [ ] **Easing**: không linear — chỉ ease-out/spring presets.
- [ ] **Subtitle karaoke**: chunk 5–6 từ, 1 dòng nowrap, fade 4f, dùng display (không dùng tts tricks).
- [ ] **Sentence atomicity**: mỗi câu 1 clip, không transition đè ranh giới (s05→s06→s07 tách bạch).
- [ ] **Main idea match**: visual câu nào đúng main_idea câu đó — s05 không nhảy sớm sang list của s07.
- [ ] **Stitch gap**: silence padding khớp pause_after_ms (HOOK→STEPS giãn 500ms ở s02).

## Assets cần Thanh cung cấp (B3)
- Screenshot màn Bộ lọc cổ phiếu (trạng thái trống) — cho s03.
- Screenshot/recording chọn tiêu chí "Giá vượt đỉnh 52 tuần" — cho s04.
- Screenshot điều kiện thanh khoản — cho s05.
- Screenshot/recording nút Lọc + list kết quả trượt ra — cho s06, s07.
- Logo KFSP (đã có trong template).

## TTS notes
- `52 tuần` → "năm mươi hai tuần" · `5 tỷ` → "năm tỷ" · `30 giây` → "ba mươi giây" · `KFSP` → "KFS B".
- Subtitle hiển thị chính tả đúng ("52 tuần", "KFSP").
