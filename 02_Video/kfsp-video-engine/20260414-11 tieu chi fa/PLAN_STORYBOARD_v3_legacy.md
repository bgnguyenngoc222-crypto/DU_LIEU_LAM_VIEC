# Plan Storyboard — Video "11 Tiêu chí FA" (Shorts 77-78s)

## Context

Kịch bản Vlog/Shorts ~78s đã viết đầy đủ 5 cảnh (HOOK → P → A → S → ACTION) theo framework PASA, nằm ở [kich ban 11 tieu chi fa.md](20260414-11%20tieu%20chi%20fa/kich%20ban%20%2011%20tieu%20chi%20fa.md). Mục tiêu: convert kịch bản sáng tạo đó thành **plan storyboard kỹ thuật** ở định dạng Remotion (frame-by-frame, 1080×1920, 30fps) để gen video ngay khi đã có audio TTS.

Style thống nhất: **Illustration flat 2D** cho C1-C3 (theo script); C4-C5 dùng KFSP screenshots thật (S1-S7) + overlay sweep. Audio sẽ gen Vbee + Whisper ngay sau khi approve plan này (BƯỚC 2 của skill pipeline).

**Lưu ý quan trọng**:
- Frame range ở plan này là **ƯỚC LƯỢNG** từ script timing (18+14+14+20+12 = 78s). Sau khi chạy Whisper, sẽ refine lại frame assignment chính xác theo word timestamps ở vòng sau.
- **Voice-over đã SỬA theo app reality** (Thanh chốt): "11 chỉ số" = **11 trục của 4M**, không phải "4M+CANSLIM=11". Xem section "Voice-over v2" bên dưới.
- **Mã demo Scene 5 = DCM** (Điểm 4M 49.19, CANSLIM 75.68) — drama "4M thấp → tap xem tại sao" tốt nhất.
- **Chờ Thanh chụp thêm 3 hình** trước khi finalize Scene 1 (home) + Scene 2 (news feed + lệnh MUA). Plan hiện tại đã mark vị trí chờ.

---

## Voice-over v2 — SỬA theo app reality (cần re-record Vbee)

### [HOOK] 0:00 → 0:18 *(giữ nguyên)*
> "P/E, ROE, Vòng quay tài sản, EBITDA, OCF, TTM, YoY... mới vào thị trường chứng khoán mà thấy mấy từ khoá này thì chỉ có thấy choáng sắc choáng. Nếu bạn cũng thấy choáng thì đây đúng là video dành cho bạn, vì những gì tiếp theo trong video này sẽ là cứu cánh để bạn vượt qua giai đoạn đầu phân tích FA."

### [P — PROBLEM] 0:18 → 0:28 **(v2 — bỏ "quyết bằng phím")**
> "Bạn mở app đọc tin: P/E rẻ, ROE cao, biên lợi nhuận cải thiện — nghe thì hiểu. Nhưng đặt vào BCTC mã đang quan tâm: 200 dòng số, 50 chỉ số. Không biết bắt đầu từ đâu."

**Changes v2**: Scene 2 ngắn lại (10s thay vì 14s). Không còn cảnh "quyết bằng phím" (nhưng S8 Tín Hiệu M/B vẫn dùng được nếu muốn — hiện chưa).

### [A — AGITATE] 0:28 → 0:50 **(v2 — thêm TAM SUẤT analogy)**
> "Vấn đề này xuất hiện ở bất kỳ ai khi mới bắt đầu tham gia thị trường chứng khoán. Phân tích FA cần năm trời để đọc chỉ số nào hiểu chỉ số ấy. Đây là điểm phần lớn người mới bỏ cuộc. Nhưng bạn không cần đợi cả năm. Bạn cần một bộ chỉ số đã chọn sẵn — đủ để bắt đầu phân tích thật. **Như cách bạn từng chấp nhận 'quy tắc tam suất' để giải toán tiểu học trước khi tìm hiểu ngọn nguồn công thức ấy ở các cấp cao hơn.**"

**Changes v2**: Scene 3 dài thêm (22s thay vì 14s). Thêm analogy **"quy tắc tam suất"** — so sánh việc học FA với học toán tiểu học (chấp nhận quy tắc trước, hiểu công thức sau). Cần visual minh hoạ scene học toán tiểu học.

### [S — SOLVE] 0:50 → 1:10 **(v2 — "bấm vào các điểm" thay "chạm trục yếu")**
> "Trên KFS B, **11 chỉ số phân tích cơ bản** được vẽ thành 1 radar — giống radar cầu thủ bóng đá: trục nhô là mạnh, trục lõm là yếu. **Bấm vào các điểm trên radar** — KFS B hiện ngay điểm thành phần, giải thích vì sao điểm thấp. Bạn vẫn đang phân tích FA. Chỉ là có lối vào, có người dẫn."

**Changes v2**: "Chạm trục yếu" → "Bấm vào các điểm trên radar" (tổng quát — bấm được nhiều điểm, không chỉ trục yếu). Bỏ cụm "11 chỉ số 4M và CANSLIM" (không khớp app), thay bằng "11 chỉ số phân tích cơ bản". Bỏ "dẫn về BCTC", thay bằng "hiện ngay điểm thành phần" (khớp S2 tooltip).

### [ACTION] 1:10 → 1:22 **(v2 — "bấm vào các điểm")**
> "Mở KFS B, chọn mã đang quan tâm. Xem radar — 5 giây hiểu sơ bộ. **Bấm vào các điểm trên radar để đào BCTC đúng chỗ.** Cánh cửa cho người mới phân tích FA. Link tải ở bio."

---

## 1. Thông tin Video

| Mục | Giá trị |
|---|---|
| Loại | Vlog / TikTok Shorts |
| Thời lượng | ~78s (2340 frames @ 30fps) |
| Canvas | 1080×1920 (9:16 portrait) |
| Framework | PASA (Problem-Agitate-Solve-Action) |
| Persona | F0 NĐT mới + tay ngang |
| Audio TTS | Vbee (clone giọng anh bạn trader) — **viết "KFS B" thay "KFSP"** |
| Kịch bản | [kich ban 11 tieu chi fa.md](20260414-11%20tieu%20chi%20fa/kich%20ban%2011%20tieu%20chi%20fa.md) |
| Output folder | `output/20260414/` |
| Remotion project | `remotion-kfsp/` (share với video điểm tin/tầm soát) |

---

## 2. Frame Map — REFINED theo Whisper Thanh Long v3.10 (audio thật 88.1s)

```
Audio file: voiceover.mp3 (Thanh Long voice, speed 1.0, 88.1s)
Whisper: voiceover.json (13 segments, word_timestamps=True)

Scene 1 HOOK    0:00→0:16.2  (16.2s)  f0     – f486    [Illustration + Typography]
Scene 2 P       0:16.6→0:35  (18.4s)  f500   – f1050   [R1 news feed + R3 BCTC]
Scene 3 A       0:35→0:59    (24.0s)  f1050  – f1770   [Bức tường + TAM SUẤT + Cánh cửa]
Scene 4 S       0:59→1:15.8  (16.8s)  f1770  – f2275   [Radar 11 trục + BÓNG ĐÁ + drill-down]
Scene 5 ACTION  1:16.4→1:27.4 (11s)   f2295  – f2625   [KFSP screens + CTA]

Total: 2625 frames (~87.5s render, có buffer trailing 0.5s silence → 2643f = 88.1s audio match)
```

### Whisper segment boundaries (exact)

| Seg | Start | End | Nội dung | Scene |
|-----|-------|-----|----------|-------|
| 1 | 0.00 | 9.36 | HOOK terms + "mới vô chứng khoán... choáng sắc choáng" | HOOK |
| 2 | 10.12 | 16.20 | "Nếu bạn cũng đang choáng... vượt qua lạc lối... phân tích FA" | HOOK |
| 3 | 16.64 | 25.06 | "Có phải bạn đang mở app đọc tin..." | P start |
| 4 | 25.06 | 37.14 | "200 dòng số, 50 chỉ số, đơ luôn... Mà đây không phải" | P→A transition |
| 5 | 37.80 | 44.92 | "Ai mới vô thị trường... vài năm đọc mới thấm" | A |
| 6 | 45.50 | 52.56 | "Nhưng bạn không cần đợi vài năm nữa..." | A |
| 7 | 53.02 | 60.04 | "Tam suất... hiểu gốc công thức sau. Và đó là cái Kungfu làm" | A→S transition |
| 8 | 60.62 | 67.82 | "11 chỉ số... trục nhô mạnh, trục lõm yếu" | S |
| 9 | 68.40 | 71.64 | "Bấm thẳng vào từng điểm trên radar" | S |
| 10 | 72.34 | 75.82 | "Bạn vẫn đang phân tích FA... có người dẫn" | S end |
| 11 | 76.44 | 80.44 | "Mở áp Kungfu lên... nhìn radar 5 giây" | ACTION |
| 12 | 80.96 | 83.30 | "Bấm vào các tooltip xem điểm số" | ACTION |
| 13 | 83.80 | 87.38 | "Cánh cửa vào FA... Link tải ở bio" | ACTION end |

### Key changes vs v2 estimate

- **HOOK ngắn hơn** 500f (vs 540f estimate) — Thanh Long đọc nhanh hơn
- **P DÀI HƠN đáng kể** 550f (vs 300f estimate) — user đã thêm "có phải bạn đang mở app... thấy gì, thấy 200 dòng..."
- **A tương đương** 720f (vs 660f estimate)
- **S ngắn hơn** 505f (vs 600f estimate) — bỏ "kèm lý do vì sao nó thấp"
- **ACTION ngắn hơn** 330f (vs 360f estimate)

**Tổng: 2625f render** — production ready. Mỗi scene sẽ có word-level timing cho subtitle karaoke trong `voiceover.json`.

---

## 3. Asset Checklist (Thanh drop vào folder images/)

### A. KFSP screenshots + screen recordings — 11 assets Thanh đã cung cấp

**Thư mục**: `20260414-11 tieu chi fa/screen-shot/`

#### Screenshots (9 hình)

| # | File | Nội dung app | Scene / Frame | Mục đích |
|---|------|--------------|---------------|----------|
| **S1** | `IMG_0038.PNG` | **FPT — Điểm 4M 61.69 + Radar 11 trục + section CANSLIM 29.46** | Scene 4 f1380-f1530 (main) + Scene 3 f1300 (reveal sau cửa, blur) | Proof chủ chốt radar 11 trục 4M |
| **S2** | `IMG_0039.PNG` | **FPT — Radar 4M với tooltip drill-down** (ROE 100, ROIC 100, Nợ dài hạn 66, CLLN 93, VQTS 71, %G DT 68…) | Scene 4 f1680-f1800 | Drill-down proof |
| **S3** | `IMG_0040.PNG` | **FPT — Line chart Điểm 4M theo quý** (8 điểm lịch sử) | Scene 4 f1510-f1530 (icon toggle góc trên) | "Có data đủ sâu" |
| **S4** | `IMG_0041.PNG` | **DCM — Radar CANSLIM 75.68 + 9 trục** | Scene 4 f1540-f1630 (analogy slot) | CANSLIM standalone radar |
| **S5** | `IMG_0042.PNG` | **DCM — Radar CANSLIM drill-down tooltip** | Scene 5 f2180-f2250 (tap radar yếu drill-down) | Drill-down Scene 5 |
| **S6** | `IMG_0043.PNG` | **Bộ lọc KFSP — bảng 8 mã** với Điểm 4M / Thay đổi 4M / Điểm CANSLIM (NAF, PC1, DXP, CTD, PET, DCM, MST, NSH) | Scene 5 f1980-f2070 | Tổng hợp điểm toàn thị trường |
| **S7** | `IMG_0044.PNG` | **Bộ lọc KFSP — swipe cột RRG cổ phiếu / RRG ngành** (Suy yếu/Dẫn dắt/Đội sổ) | Scene 5 f2020-f2040 (swipe reveal) | Bonus "nhiều view" |
| **S8** | `IMG_0046.PNG` | **Màn Tín Hiệu M/B** (tab Thông báo → Tín Hiệu M/B) — list signals HPG/TCB/VPB/VCI/DSE tiềm năng **MUA** với rủi ro 45-65/100 + DSE/PAN/DPM **BÁN** | Scene 2.3 f840-f960 "quyết bằng phím" | **Thay mock nút MUA bằng app thật** — user tap signal MUA theo list |
| **S9** | `IMG_0047.PNG` | **Home/Dashboard KFSP** — Live banner tin tài chính quốc tế + Sự kiện cổ phiếu (cổ tức TDM/BNW/QNS/BWA/SBT/CTD) + Sự kiện Quốc tế (USD PPI, Dầu thô) | Scene 1 f180-f270 (blur backdrop) + Scene 5.1 f1980-f2020 (opening brand recognition) | Brand exposure + proof "app có nhiều content" |

#### Screen recordings (3 video — 20-31s @ 60fps, 828×1792 HEVC)

| # | File | Nội dung | Scene / Frame | Cách dùng |
|---|------|----------|---------------|-----------|
| **R1** | `ScreenRecording_04-15-2026 00-13-47_1.MP4` | **Scroll qua news feed KFSP + mở article đọc** (20.68s) — live ticker, card tin, full-screen article | Scene 2.1 f540-f690 (5s) | Video overlay trong phone — trim đoạn scroll đẹp, `playbackRate` 0.6x đồng bộ voice |
| **R2** | `ScreenRecording_04-15-2026 00-14-52_1.MP4` | **Scroll article phân tích kỹ thuật** (21.62s) — mẫu hình giá, candlestick patterns | Scene 3.1 f960-f1110 (5s) backdrop blur 50% | Video backdrop blur phía sau bức tường — show content FA phức tạp |
| **R3** ⭐ | `ScreenRecording_04-15-2026 00-20-39_1.MP4` | **BCTC thật của DCM** (31.25s) — tabs: Cân đối kế toán → BC thu nhập → BC dòng tiền → **Chi tiết TC** (ROE 3.66, ROA 2.49, ROIC, VQTS 3.64, OCF/LN 2.18, FCF -3,766.22, Tỷ lệ thanh toán…) → **Biểu đồ** (tăng trưởng doanh thu/LNST/biên LN per Q) | Scene 2.2 f690-f840 (5s) — PERFECT match voice "200 dòng số, 50 chỉ số" | Video overlay trong phone — trim segment có: Cân đối KT → Chi tiết TC (0-9s thực recording, cover đủ "200 dòng" + "50 chỉ số"). `playbackRate` 0.6x. **Replacement cho BCTC mock** |

### Gap hoàn toàn giải quyết — không còn hình nào thiếu

- ✅ News feed → **R1 video** (20.68s — scroll feed + đọc article)
- ✅ Lệnh MUA → **S8 Tín Hiệu M/B** (list HPG/TCB/VPB MUA thật)
- ✅ Home KFSP → **S9** (Home với live ticker + sự kiện)
- ✅ **BCTC 200 dòng + 50 chỉ số** → **R3 video** (31.25s — Cân đối KT + BC thu nhập + Chi tiết TC + Biểu đồ) — khớp chính xác voice "200 dòng số, 50 chỉ số"
- ✅ Content FA phức tạp cho Scene 3 → **R2 video** (21.62s — mẫu hình giá + candlestick)
- ✅ Drill-down radar yếu → **S2 tooltip** (match app reality)

**Quyết định script vs app reality**: Script viết "radar dẫn về BCTC", nhưng app KFSP drill-down thực tế là **tooltip breakdown score từng trục** (S2, S5). Plan sẽ dùng **drill-down tooltip** thay vì "mở BCTC tab" — vì đó mới là hành vi thật của app. Cập nhật narrative Scene 4 phía dưới cho match.

### Radar 11 trục — LABEL CHÍNH XÁC (theo S1)

11 trục của "Điểm 4M" trong app KFSP:

```
1.  ROE
2.  ROIC
3.  ROA
4.  %G Doanh thu
5.  %G EPS
6.  %G BVPS
7.  %G OCF
8.  Nợ dài hạn
9.  Vòng quay tài sản
10. Biên lợi nhuận
11. Chất Lượng lợi nhuận
```

Note: script nói "11 chỉ số 4M-CANSLIM" nhưng app thực ra là **11 trục của 4M**, còn CANSLIM là radar **riêng 9 trục**. Plan sẽ match app reality — radar WOW moment = **11 trục 4M của S1**. Sau đó nhắc thêm "CANSLIM cũng có radar riêng" bằng cut S4 (analogy slot thay Messi).

### B. Illustration assets (tự vẽ bằng Remotion/SVG — không cần file)

| # | Asset | Component source |
|---|-------|------------------|
| B1 | Silhouette nhân vật (line-art đen, 3 pose: che mặt / nhìn camera / ngước cười) | SVG tự vẽ |
| B2 | Bức tường gạch với chữ khắc FA | SVG + `StaggeredFadeUp` (remocn) |
| B3 | Cánh cửa nhỏ với số "11" glow vàng | SVG + spring scale + glow filter |
| B4 | Radar cầu thủ bóng đá 5-6 trục (Pace/Shoot/Pass/Dribble/Defense/Physical) | SVG polygon style FIFA/Sofascore tự vẽ |
| B5 | ~~Radar 11 trục code riêng~~ **BỎ — dùng trực tiếp S1 screenshot** | Không cần code |
| B6 | Background nhịp tim đỏ nhạt (Hook overload) | `MeshGradientBg` (remocn) red variant |
| B7 | QR code + logo KFSP + slogan | PNG từ `_shared/` |
| B8 | Callout cards & red pills highlight (Scene 4 drill-down) | SVG + Framer style |
| B9 | 7 thuật ngữ FA "overload" typography (P/E, ROE, Vòng quay tài sản, EBITDA, OCF, TTM, YoY) | SVG text + spring heavy |
| B10 ★v2 | Bảng đen lớp tiểu học + công thức tam suất chalk + notebook | SVG + chalk draw-on + `TamSuatScene` component |

### C. Audio assets

| # | File | Nguồn |
|---|------|-------|
| C1 | `voiceover.mp3` | Vbee TTS (bản "KFS B" từ script) → `remotion-kfsp/public/audio/` |
| C2 | `whisper_words.json` | Whisper MLX base, word_timestamps=True |
| C3 | SFX (7 files) | `public/sfx/` — reuse từ project tầm soát |
| C4 | BGM nhẹ | Pixabay — cần Thanh pick 1 track upbeat-to-warm |

### D. Pronunciation check (BƯỚC 1 skill)

Từ cần kiểm tra trong `_shared/vbee/pronunciation_vi.json`:
- **P/E, ROE, EBITDA, OCF, TTM, YoY, LN, BCTC, CANSLIM, 4M** → xác nhận cách phát âm đã có
- **KFSP → "KFS B"** đã xác nhận (memory)
- **Phil Town, William O'Neil** (chú thích 4.1) → có thể cần thêm
- **HĐKD** → "hoạt động kinh doanh"

---

## 4. Subtitle Plan (5-6 từ/chunk, sẽ finalize sau Whisper)

Tách script Vbee thành chunks. Ví dụ cho HOOK:

```
f0-f30:    "P trên E, R-O-E"
f30-f60:   "Vòng quay tài sản, EBITDA"
f60-f90:   "OCF, TTM, YoY"
f90-f150:  "mới vào thị trường chứng khoán"
f150-f210: "mà thấy mấy từ khoá này"
f210-f270: "thì chỉ có thấy choáng sắc choáng"
f270-f330: "Nếu bạn cũng thấy choáng"
f330-f400: "thì đây đúng là video dành cho bạn"
f400-f480: "vì những gì tiếp theo trong video này"
f480-f540: "sẽ là cứu cánh để bạn vượt qua"
... (tiếp tục cho P/A/S/Action)
```

**Keywords highlight** (màu theo SKILL):
- Gold #f5c542 (nhấn): "11 chỉ số", "cứu cánh", "cánh cửa", "5 giây"
- Green #34d399 (positive): "lối vào", "có người dẫn", "bắt đầu"
- Red #f87171 (pain): "choáng", "200 dòng", "50 chỉ số", "bỏ cuộc", "quyết bằng phím"
- Purple #a78bfa (brand): "KFS B", "radar", "4M", "CANSLIM"

---

## 5. Storyboard Frame-by-Frame

### SCENE 1 — HOOK (f0-f540, 18s)

**Emotional arc**: Overwhelm → Tension freeze → Relief/hope

| Frame | Giọng | Visual | Animation / Easing | SFX |
|-------|-------|--------|---------------------|-----|
| f0-f180 | "P/E, ROE, Vòng quay tài sản, EBITDA, OCF, TTM, YoY…" | **OVERLOAD**: 7 thuật ngữ FA bay vào từ 8 hướng (top, TR, R, BR, bottom, BL, L, TL). Scale tăng dần 0.5→1.5x, opacity 1→0.6. Phủ kín. Silhouette B1 (pose che mặt) ở center. BG: B6 nhịp tim đỏ nhạt, nhịp pulse 80bpm. | `ease-in` (tăng tốc = mất kiểm soát), stagger 20f/từ | Noise dồn dập vol 0.3 + heartbeat loop vol 0.2 + glitch pop f90, f120, f150 |
| f180-f270 | *(continuation)* | Từ còn lại bay vào. Silhouette bắt đầu quay cuồng (rotate ±5°). **S9 `IMG_0047.PNG` (Home KFSP)** fade in làm BG blur opacity 0.35 — thấy thoáng live ticker + sự kiện cổ phiếu sau chaos (brand recognition ngầm). | `heavy` spring {d:20,s:80,m:1.2} + BG fade `ease-out` | — |
| f270-f360 | *silence ~1s* + "Nếu bạn cũng thấy choáng…" | **FREEZE**: tất cả thuật ngữ đông cứng. S9 backdrop vẫn mờ phía sau. Camera dolly-in (scale 1→1.15) vào silhouette. Silhouette xoay về pose B1-2 (nhìn thẳng camera). | Đột ngột đứng yên, sau đó `zoom` spring {d:25,s:60} dolly-in | **Silence** f270-f300 (tension), tick đồng hồ f300, f330 |
| f360-f420 | "…thì đây đúng là video dành cho bạn" | Text overlay lớn "BẠN CŨNG THẤY CHOÁNG?" snap vào center, dấu "?" nháy 3 lần. | `resolve` spring {d:12,s:250} + overshoot | **pop** f360, **chime nhẹ** f395 |
| f420-f540 | "vì những gì tiếp theo trong video này sẽ là cứu cánh để bạn vượt qua giai đoạn đầu phân tích FA" | **PROMISE**: BG chuyển từ đỏ→navy xanh (5s gradient). Các thuật ngữ fade out. Silhouette pose B1-3 (ngước cười). Text 2 dòng: "ĐÚNG VIDEO DÀNH CHO BẠN" → (f480) "CỨU CÁNH GIAI ĐOẠN ĐẦU PHÂN TÍCH FA". Arrow "↓ Xem tiếp ↓" ở dưới. | `ease-out` BG transition 120f + `soft` spring cho text | **whoosh** f420 (relief) + synth bell mở f430, f460 |

### SCENE 2 — PROBLEM (f540-f840, 10s) ★ Scene ngắn lại theo v2

**Emotional arc**: Confusion → Overwhelm (bỏ beat "quyết bằng phím")

| Frame | Giọng | Visual | Animation | SFX |
|-------|-------|--------|-----------|-----|
| f540-f690 | "Bạn mở app đọc tin: P/E rẻ, ROE cao, biên lợi nhuận cải thiện — nghe thì hiểu." | **First-person POV** phone mockup với **R1 video** — trim 0s→5s (scroll news feed). `playbackRate` 0.6x. Marker highlight gạch chân trên cụm "P/E rẻ" f580, "ROE cao" f610, "biên LN" f640 — pulsing dot gold. | `calm` spring phone entry, video native scroll | Tiếng lướt feed loop, **click** f580, f610, f640 |
| f690-f840 | "Nhưng đặt vào BCTC mã đang quan tâm: 200 dòng số, 50 chỉ số. Không biết bắt đầu từ đâu." | Crossfade R1 → **R3 video** (BCTC DCM) — trim 0s→10s. `playbackRate` 0.6x. Zoom slow 1→1.3x. Counter: "200 dòng" f720 (Cân đối KT), "50 chỉ số" f770 (tab "Chi tiết TC" hiện ROE/ROA/ROIC/OCF/FCF). Tay SVG chấm 3 dấu hỏi: f790, f810, f825. Cuối cảnh overlay text mờ "**Không biết bắt đầu từ đâu**" f815 (red pulse). | `ease-out` zoom + `resolve` counter snap | **swoosh** f690, **pop** f720, f770, **tick** f790, f810, f825 |

> **Note**: S8 Tín Hiệu M/B + beat "quyết bằng phím" tạm bỏ theo script v2. Có thể tái sử dụng trong video khác nếu cần.

### SCENE 3 — AGITATE (f840-f1500, 22s) ★ Scene dài thêm: tam suất analogy

**Emotional arc**: Empathy → Hopelessness → Recognition (tam suất) → Discovery (cửa)

| Frame | Giọng | Visual | Animation | SFX |
|-------|-------|--------|-----------|-----|
| f840-f990 | "Vấn đề này xuất hiện ở bất kỳ ai khi mới bắt đầu tham gia thị trường chứng khoán." | **R2 video backdrop blur 50% opacity 0.3** — trim 3s→8s (content "Các mẫu hình giá phổ biến" + candlestick patterns). Trên video là **BỨC TƯỜNG (B2)** xây dần từ dưới lên. Gạch khắc thuật ngữ FA (P/E, ROE, EBITDA, OCF, TTM, YoY…) reveal staggered. Nhiều silhouette (5-7 người) đang leo. Text "PHÂN TÍCH FA" khắc đỉnh tường f930. | `heavy` build-up spring, stagger 10f/gạch | Gió hú loop + **thud** mỗi gạch (vol 0.15) |
| f990-f1080 | "Phân tích FA cần năm trời để đọc chỉ số nào hiểu chỉ số ấy." | Text "5 NĂM" snap in góc phải f1020 (red pulse). Lịch quay mỗi năm ở góc + thuật ngữ stack chồng lên nhau. Silhouette người xem đứng dưới chân tường ngước lên. | `heavy` spring + `ease-out` lịch quay | **tick tock** f1020, **pop** f1050 |
| f1080-f1170 | "Đây là điểm phần lớn người mới bỏ cuộc." | 9/10 silhouette trượt rơi xuống **slow-motion** (1.5x slower). 1 silhouette cô đơn leo tiếp đến đỉnh. Mũi tên + "Bạn ở đâu?" f1140. | `heavy` gravity (d:20,s:80,m:1.5) slow-mo | **whoosh rơi** x9 stagger f1080-f1140 (vol 0.2), **silence** f1140-f1170 (tension) |
| f1170-f1260 | "Nhưng bạn không cần đợi cả năm. Bạn cần một bộ chỉ số đã chọn sẵn — đủ để bắt đầu phân tích thật." | **CÁNH CỬA (B3)**: trên tường xuất hiện cánh cửa nhỏ. Số "11" glow vàng scale 0→1.2→1.0 f1200. Cửa mở f1230, ánh sáng vàng tràn ra + hé lộ **S1 `IMG_0038.PNG` blur** phía sau (foreshadow radar). Text "Đừng leo. Có cửa." fade in f1250. | `decisive` spring cho số 11 + `zoom` camera + `ease-out` reveal | **click cửa mở** f1200, **chime sáng** f1230, **light bloom + whoosh** f1245 |
| f1260-f1500 | "**Như cách bạn từng chấp nhận 'quy tắc tam suất' để giải toán tiểu học** — trước khi tìm hiểu ngọn nguồn công thức ấy ở các cấp cao hơn." | **★ TAM SUẤT ANALOGY** (mới v2) — transition vào scene CLASSROOM. Bảng đen lớp tiểu học SVG. Công thức cross-multiplication tự vẽ ra: **`3/4 = x/12`** → arrow → **`x = 9`** (stagger reveal). Notebook mở ra kế bên với chữ tay pencil nhẹ. Tay học sinh (line-art silhouette nhỏ) giải bài. Text "QUY TẮC TAM SUẤT" pin top gold. Sau đó (f1400) zoom-out: bảng đen → shrink thành icon cửa số "11" ở Scene 3 — liên kết analogy. Text hiện liên tục: "Chấp nhận quy tắc" (f1300) → "Bắt đầu làm trước" (f1360) → "Hiểu công thức sau" (f1430). | `soft` spring formula stagger + `calm` zoom-out transition + `resolve` icon merge | **chalk scribble** f1265, **ding** f1330, f1390 (từng bước công thức), **chime merge** f1410 |

### 🎓 Tam Suất Scene — Illustration spec

| Element | Vị trí | Style |
|---------|--------|-------|
| **Bảng đen** | center x=540, y=550-950 | SVG 600×400, dark green (#1a3a2a), khung gỗ nâu |
| **Công thức** `3/4 = x/12` | trên bảng đen | Font chalk handwriting, white, scale 1.4x, stagger 3 frames per symbol |
| **Arrow** → | giữa công thức và x=9 | Chalk arrow draw-on animation |
| **x = 9 glow** | sau arrow | Yellow chalk, glow pulse |
| **Notebook** | bên phải bảng x=780 | SVG notebook lined, pencil writing animation |
| **Silhouette học sinh** | dưới bảng, ngồi | Line-art đen đơn giản, nhỏ hơn silhouette leo tường |
| **Badge "QUY TẮC TAM SUẤT"** | top y=200 | Gold pill, center, fade in f1265 |
| **Liên kết với cửa "11"** | f1400-f1500 transition | Bảng đen morph → cửa Scene 3 zoom in, số "11" overlay |

### SCENE 4 — SOLVE (f1500-f2100, 20s) ★ WOW MOMENT (frames shifted theo v2)

**Emotional arc**: Wonder → Recognition (BÓNG ĐÁ!) → Aha

| Frame | Giọng | Visual | Animation | SFX |
|-------|-------|--------|-----------|-----|
| f1500-f1650 | "Trên KFS B, 11 chỉ số phân tích cơ bản được vẽ thành 1 radar…" | Camera từ cửa zoom out → center canvas. **S1 `IMG_0038.PNG`** (FPT Điểm 4M 61.69 + Radar 11 trục) slide up phone mockup 1x f1515. Zoom 1.4x vào radar f1540. 11 label stagger highlight sequence: ROE → ROIC → ROA → %G Doanh thu → %G EPS → %G BVPS → %G OCF → Nợ dài hạn → Vòng quay tài sản → Biên lợi nhuận → Chất lượng lợi nhuận (stagger 12f, yellow pulse). Counter "11" gold snap in f1630. | `soft` spring phone slide + `calm` zoom + `resolve` pulse label stagger | **whoosh** f1515, **swoosh** f1540, **ding** x11 stagger (f1550-f1630, vol 0.15), **pop** f1630 counter |
| f1650-f1830 | "giống radar cầu thủ bóng đá: trục nhô là mạnh, trục lõm là yếu." | **★ ANALOGY BÓNG ĐÁ — KHOẢNH KHẮC "À HÁ"**: Full-screen split. **LEFT (radar bóng đá)**: SVG polygon 5 trục — PAS, SHO, PHY, DRI, DEF, PAC (style FIFA/Sofascore, gold polygon fill trên dark). Ảnh avatar cầu thủ generic (silhouette #10) ở góc. Tên "#10" + "9.2" rating ở đầu. **RIGHT (radar KFSP)**: S1 crop tight radar 4M, cùng orientation. **CENTER overlay**: Text lớn gold **"CÙNG 1 CÁCH ĐỌC"** f1700 + arrow bi-directional giữa 2 radar f1720. Pulse đồng bộ: trục nhô L (Shooting = Shooting nhô) + trục nhô R (ROIC = ROIC nhô) f1740 cùng lúc. Subtitle nhỏ dưới "KFS B còn có radar CANSLIM riêng" f1800 (thoáng thấy **S4 `IMG_0041.PNG`** blur ở corner). | `resolve` spring split-in + `decisive` center text + `calm` pulse đồng bộ | **whoosh cut** f1650, **pop** f1680, **ding x2 đồng bộ** f1740 (L+R), **ding** f1800 |
| f1830-f1950 | "Bấm vào các điểm trên radar — KFS B hiện ngay điểm thành phần…" | Cut về S1 radar full phone. Finger SVG tap **lần lượt 3 điểm trên radar** f1860 (trục ROE), f1880 (trục Nợ dài hạn), f1900 (trục %G EPS). Ripple gold mỗi lần tap. Sau tap cuối, crossfade S1 → **S2 `IMG_0039.PNG`** (radar tooltip) f1905. Zoom 1.6x vào tooltip (hiện ROE 100, ROIC 100, Nợ dài hạn 66, %G EPS 60, CLLN 93…) f1930. Mũi tên gold dẫn từ các điểm vừa tap → row tương ứng trong tooltip. | `decisive` multi-tap + `ease-in-out` crossfade + `Easing.bezier(0.22,1,0.36,1)` zoom | **tap** x3 (f1860, f1880, f1900), **ripple** x3, **swoosh** f1905 |
| f1950-f2030 | "…giải thích vì sao điểm thấp." | Trên S2, **highlight dòng "Nợ dài hạn: 66"** bằng red pill f1970 — vì đây là điểm thấp nhất. Callout gold từ phải "Điểm thấp nhất trong 11 chỉ số" f1980. Arrow callout → dòng 66 f2000. | `resolve` spring highlight + callout slide | **pop** f1970, **swoosh** f1980, **chime** f2010 |
| f2030-f2100 | "Bạn vẫn đang phân tích FA. Chỉ là có lối vào, có người dẫn." | Zoom out về full radar. Text **"Bạn vẫn đọc FA."** snap in f2050 + **"Chỉ là biết bắt đầu từ đâu."** (gold) snap in f2080. Pulse nhẹ gold glow. | `decisive` spring 2 lines + soft glow pulse | **pop** f2050, **chime** f2080 |

### ⚽ BÓNG ĐÁ ANALOGY — Chi tiết spec (Scene 4.2 f1650-f1830)

**Mục tiêu**: Đây là KHOẢNH KHẮC "À HÁ" của video — chuyển từ "chỉ số FA phức tạp" → "đã quen rồi". Cần dàn dựng RÕ RÀNG, không thoáng qua.

| Element | Vị trí | Design |
|---------|--------|--------|
| **Background** | Full canvas | Dark navy với mesh gradient, center line split L/R |
| **Radar bóng đá (LEFT)** | x=0-540, y=500-1200 | SVG hexagon 5 trục: PAS (Passing), SHO (Shooting), PHY (Physical), DRI (Dribbling), DEF (Defense), PAC (Pace). Gold stroke #f5c542, fill rgba(245,197,66,0.2). 1 trục nhô (Shooting 92), 1 trục lõm (Defense 48). |
| **Avatar silhouette** | LEFT top, x=100, y=400 | Circle silhouette cầu thủ #10 generic (không cần Messi — tránh bản quyền) |
| **Rating "9.2"** | LEFT above radar | Font mono, gold, scale 1.5x |
| **Radar KFSP (RIGHT)** | x=540-1080, y=500-1200 | S1 crop tight vùng radar 11 trục (từ IMG_0038.PNG), cùng center alignment với LEFT radar |
| **Điểm "61.69"** | RIGHT above radar | From S1, match size với "9.2" |
| **Divider line** | x=540, y=500-1200 | Vertical gold line 2px |
| **Center text "CÙNG 1 CÁCH ĐỌC"** | y=1300 | Gold #f5c542, font bold 56px, center, snap in f1700 |
| **Arrow bi-directional** | y=850 (giữa 2 radar) | Gold arrows L↔R, pulse 2 lần f1720-f1780 |
| **Pulse đồng bộ** | Trục Shooting L + Trục ROIC R | Cùng nháy gold f1740 — cho viewer thấy "cả 2 đều có trục nhô = giỏi điểm đó" |

**Critical**: Không dùng Messi/Ronaldo thật — vẽ cầu thủ #10 generic (silhouette + số áo). Phong cách FIFA/Sofascore familiar mà không vi phạm bản quyền.

### SCENE 5 — ACTION (f2100-f2460, 12s) ★ frames shifted theo v2

**Emotional arc**: Clarity → Empowerment → CTA Still

| Frame | Giọng | Visual | Animation | SFX |
|-------|-------|--------|-----------|-----|
| f2100-f2190 | "Mở KFS B, chọn mã đang quan tâm." | Phone mockup slide up với **S9 `IMG_0047.PNG` (Home KFSP)** f2100 (1s brand). Slide left → **S6 `IMG_0043.PNG`** (Bộ lọc — bảng 8 mã) f2125. Zoom 1.3x. Swipe phải f2140 → **S7 `IMG_0044.PNG`** (cột RRG) f2160. Swipe về S6 f2170. Finger tap mã **DCM** f2180. | `soft` spring slide + `ease-out` swipe loop | **whoosh** f2100, **swoosh** f2125, **scroll-swipe** f2140, f2160, **tap** f2180 |
| f2190-f2280 | "Xem radar — 5 giây hiểu sơ bộ." | Crossfade **S1** (Radar 11 trục FPT) f2190. Zoom 1.5x vào radar. Counter "1, 2, 3, 4, 5" đếm, tick mỗi 18f. Sweep highlight trục. Badge "5 GIÂY" pop in f2210 (gold). | `calm` spring zoom + `resolve` counter tick | **tick** x5 (f2210, f2228, f2246, f2264, f2280) + **pop** badge f2210 |
| f2280-f2370 | "Bấm vào các điểm trên radar để đào BCTC đúng chỗ." | Finger tap **3 điểm** trên S1 radar f2300, f2315, f2330 (hồi lại motion Scene 4 nhưng nhanh hơn). Crossfade **S2 tooltip** slide in f2340. Red pill highlight dòng thấp nhất f2355. Text "Đào đúng chỗ" f2360 (gold). | `decisive` multi-tap + `zoom` transition 30f + `resolve` pill | **tap** x3 (f2300, f2315, f2330), **swoosh** f2340, **pop** f2355 |
| f2370-f2460 | "Cánh cửa cho người mới phân tích FA. Link tải ở bio." | **OUTRO**: cánh cửa B3 Scene 3 reopens center, số "11" glow. Slogan **"11 chỉ số. Cánh cửa cho người mới phân tích FA."** snap in (gold on navy). QR code + logo KFSP bên phải. Arrow "Link tải ở bio ↑" nháy nhẹ. **ĐỨNG YÊN** từ f2420. | `decisive` spring slogan + **STILL** từ f2420 | **chime** f2380, **success jingle** f2400 (3s, vol 0.25) |

---

## 6. Animation Psychology Map

| Scene | Cảm xúc | Spring preset | Easing chính | Hướng |
|-------|---------|---------------|--------------|-------|
| 1.1 Overload | Ngộp thở, áp lực | `heavy` {d:20,s:80,m:1.2} | `ease-in` | Đổ vào từ 8 hướng |
| 1.2 Freeze | Tension tĩnh | — (đứng yên) | camera dolly-in `zoom` {d:25,s:60} | Zoom in chậm |
| 1.3 Promise | Relief, hy vọng | `soft` {d:22,s:120} | `ease-out` dài | Bay lên ↑ + sáng dần |
| 2 Problem | Confusion cumulative | `calm` {d:18,s:180} | `ease-out` | Rơi ↓ + zoom in bảng |
| 3.1 Wall | Nặng nề, áp lực | `heavy` build-up | `ease-in` chồng chất | Xây lên ↑ (nghịch lý) |
| 3.2 Fall 9/10 | Bình thường hóa | `heavy` gravity | slow-mo `ease-out` | Rơi ↓ |
| 3.3 Door | Discovery, hy vọng | `decisive` {d:14,s:300} | `ease-out` snap | Zoom camera vào cửa |
| 4.1-4.2 Radar | Chỉn chu, quen thuộc | `calm` stagger | `ease-out` + overshoot Messi | Vẽ dần tỏa ra |
| 4.3-4.4 Drill | Aha moment | `decisive` + `zoom` | `Easing.bezier(0.22,1,0.36,1)` | Xuống → Zoom vào |
| 4.5 Line đắt | Empowerment | `decisive` snap | `ease-out` mạnh | Đứng yên glow |
| 5.1-5.3 | Calm confidence | `soft` + `calm` | `ease-out` | Trái→Phải tiến triển |
| 5.4 CTA | Tự tin tuyệt đối | `decisive` → **STILL** | `ease-out` snap → đứng yên 40f | Snap rồi đứng yên |

**Cấm tuyệt đối**: `linear`, emoji, sparkle overkill, text bouncing lặp.

---

## 7. Safe Zone & Layout (TikTok/Reels)

```
Canvas: 1080 × 1920 @ 30fps

┌─────────────────────────────┐ y=0
│  UNSAFE — status/caption    │ y=0-150
├─────────────────────────────┤
│  LOGO KFSP (top-center)     │ y=160-290  (lớn, 140px)
├─────────────────────────────┤
│                             │
│  MAIN CONTENT               │ y=300-1200
│  (illustration / phone /    │
│   radar / BCTC)             │
│                             │
├─────────────────────────────┤ y=1220
│  (gap)                      │
├─────────────────────────────┤
│  SUBTITLE (5-6 từ 1 dòng)   │ y=1380-1470
│  PROGRESS BAR               │ y=1490 (4px)
├─────────────────────────────┤ y=1500
│  UNSAFE — TikTok UI         │ y=1500-1920
└─────────────────────────────┘

Horizontal safe: x=60-1020 (60px padding hai bên).
CTA/QR scene 5: đặt trong y=600-1200, không lấn subtitle.
```

**Kiểm tra bắt buộc**:
- Text hoặc phone mockup không vượt y>1500
- Logo KFSP to, rõ, y=160-290
- Silhouette/bức tường scene 3 không lấn subtitle zone

---

## 8. Component Inventory (Remotion)

### Dùng lại từ `remotion-kfsp` (remocn)

- `DeviceMockupZoom` — Phone + zoom (Scene 2, 4, 5)
- `SimulatedCursor` / finger SVG — Tap/chấm (Scene 2, 4, 5)
- `PulsingIndicator` — Dot chỉ trục radar
- `SpringPopIn` — Badge, counter snap in
- `BlurReveal` — Text cinematic hook
- `MarkerHighlight` — Gạch chân feed (Scene 2)
- `StaggeredFadeUp` — Thuật ngữ overload (Scene 1.1), viên gạch (Scene 3.1)
- `ZoomThroughTransition` — Scene 3→4 (qua cánh cửa), Scene 4 (radar→BCTC)
- `MeshGradientBg` — BG đỏ/navy (Scene 1), gold (Scene 5.4)
- `ToastNotification` — Callout BCTC (Scene 4.4)
- `DirectionalWipe` — Scene transitions
- `SpotlightCard` — CTA highlight Scene 5.4

### Cần code mới (không reuse được)

1. **`FootballRadar`** — SVG polygon 5-6 trục style FIFA (PAS/SHO/PHY/DRI/DEF/PAC) + avatar silhouette #10 + rating 9.2. Split-screen Scene 4.2 (~100 LOC)
2. **`BrickWall`** — SVG bức tường gạch animated stagger reveal + text khắc (~80 LOC)
3. **`DoorWithNumber`** — Cánh cửa + số "11" glow + light bloom (~60 LOC)
4. **`SilhouetteClimbers`** — Line-art silhouettes với pose + fall animation (~100 LOC)
5. **`TermsOverload`** — 7 terms bay từ 8 hướng với spring heavy (~70 LOC)
6. **`RadarLabelSweep`** — Component sweep highlight 11 label trên screenshot radar (overlay pulse) (~60 LOC)
7. **`CalloutCardKFSP`** — Card callout style app KFSP để highlight "Điểm thấp nhất" / "Đào đúng chỗ" (~50 LOC)
8. **`TamSuatScene`** ★ mới v2 — Bảng đen lớp tiểu học + công thức `3/4 = x/12 → x=9` chalk draw-on + notebook + silhouette học sinh. Morph về cửa Scene 3 (~120 LOC)

Tổng code mới ~640 LOC — vẫn vừa phải cho 1 video. **Tiết kiệm 120 LOC** nhờ dùng S1 screenshot thay vì code radar riêng.

---

## 9. SFX Volume & Principles

| SFX | Volume | Dùng ở | Scene |
|-----|--------|--------|-------|
| `noise_loop.mp3` | 0.3 | Hook overload | f0-f270 |
| `heartbeat.mp3` | 0.2 | Hook + phím (Scene 2.3) | f0-f270, f910 |
| `tick.mp3` | 0.25 | Freeze tension + counter 5s | f300,f330 + f2090-f2160 |
| `glitch_pop.mp3` | 0.25 | Hook overload accents | f90, f120, f150 |
| `whoosh.mp3` | 0.3 | Scene transition | f420, f540, f690, f840, f1530, f1720, f1980, f2200 |
| `pop.mp3` | 0.2 | Element appear | f360, f720, f770, f1490, f1555, f1830, f1920, f2090 |
| `click.mp3` | 0.25 | Tap/chọn | f580, f610, f640, f1680, f2030, f2060, f2180 |
| `chime.mp3` | 0.3 | Khám phá + line đắt | f430, f1280, f1860, f1950, f2260 |
| `thud.mp3` | 0.15 | Viên gạch + rơi silhouette | f960-f1110, f1110-f1170 |
| `success.mp3` | 0.25 | CTA outro | f2280-f2340 |
| BGM upbeat | 0.08 | Toàn video (duck -6dB khi voice) | f0-f2340 |

**Silence moments (tuyệt đối không SFX)**:
- f270-f300 (Hook tension trước break-4th-wall)
- f1170-f1210 (Scene 3 sau rơi, trước cửa)
- f2300-f2340 (CTA đứng yên — tự tin tuyệt đối)

---

## 10. Bảng Audit Nghiệm thu (QA Checklist)

| # | Hạng mục | Tiêu chí Pass | Gate |
|---|----------|---------------|------|
| 1 | **Audio Vbee** | Đọc đủ "KFS B" (không bị tắt thành "káp-sờ-pi"), 77-80s | B2 |
| 2 | **Whisper timestamps** | File `whisper_words.json` có, mapping khớp ±5 frames | B2 |
| 3 | **Subtitle 5-6 từ** | Mỗi chunk 5-6 từ, 1 dòng, không wrap | B5 |
| 4 | **Subtitle safe zone** | y=1380-1470, không đè TikTok UI y>1500 | B5 |
| 5 | **Keywords highlight** | "11 chỉ số" gold, "choáng"/"200 dòng" red, "lối vào" green | B5 |
| 6 | **Scene 1 overload** | 7 terms bay từ 8 hướng, scale tăng, overlap opacity, heavy spring | B5 |
| 7 | **Scene 1 freeze** | Đứng yên ≥1s, silence absolute, dolly-in smooth | B5 |
| 8 | **Scene 3 bức tường** | Gạch stagger build-up, thuật ngữ khắc đọc được, 9/10 silhouette rơi slow-mo | B5 |
| 9 | **Scene 3 cửa + số 11** | Glow vàng rõ, scale spring decisive, light bloom | B5 |
| 10 | **Scene 4 radar 11 trục** | Đủ 11 trục (4M + 7 CANSLIM), label đọc rõ, nhô/lõm phân biệt | B5 |
| 11 | **Scene 4 analogy Messi** | Split-screen clean, cut nhanh 1.5-2s, không giải thích | B5 |
| 12 | **Scene 4 drill-down** | Radar → BCTC motion "xuống" rõ, mũi tên dẫn, highlight đúng section | B5 |
| 13 | **Scene 4 line đắt** | "Bạn vẫn đọc FA. Chỉ là biết bắt đầu từ đâu." gold + glow đắt | B5 |
| 14 | **Scene 5 CTA đứng yên** | f2300-f2340 snap rồi STILL, không pulse/nhấp nháy cuối | B5 |
| 15 | **Slogan + QR** | "11 chỉ số. Cánh cửa cho người mới phân tích FA." rõ + QR đọc được | B5 |
| 16 | **Safe zone toàn video** | Mọi content x:60-1020, y:150-1500 | B5 |
| 17 | **KFSP screenshots** | Watchlist/detail/BCTC không cắt rìa, zoom đúng vùng | B3+B5 |
| 18 | **Animation psychology** | Overload=heavy ease-in, Freeze=still, Promise=soft ease-out, CTA=decisive→still | B5 |
| 19 | **Không linear** | Không frame nào dùng linear easing | B5 |
| 20 | **SFX volume** | BGM 0.08, SFX 0.15-0.3, voice peak 0dB, không lấn voice | B5 |
| 21 | **Silence moments** | f270-f300 + f1170-f1210 + f2300-f2340 hoàn toàn không SFX | B5 |
| 22 | **Số neo trí nhớ** | 200 → 50 → 11 → 5 đều xuất hiện rõ trong video | B5 |
| 23 | **Persona F0** | Không xúc phạm, không giả định kinh nghiệm dài | B5 |
| 24 | **Tổng thể 78s** | Render đúng 2340 ±30 frames, audio không cắt cuối | B5 |

---

## 11. Pipeline Gates (theo skill `/video-kfsp`)

Plan này là output của **BƯỚC 4 Plan Chi Tiết**. Để chạy toàn pipeline:

```
✅ BƯỚC 1 — Chính tả + phiên âm (KFSP→"KFS B", P/E, ROE, EBITDA, OCF, TTM, YoY, HĐKD, Phil Town, William O'Neil)
✅ BƯỚC 2 — Vbee TTS → voiceover.mp3 + Whisper MLX → whisper_words.json
✅ BƯỚC 3 — Thanh drop 5 screenshots vào images/ (A1-A5)
➡️ BƯỚC 4 — Plan này (đang chờ Thanh duyệt)
⏳ BƯỚC 5 — Render: `npx remotion render ShortFA --props=./data/20260414.json --output=./output/20260414/11_tieu_chi_fa.mp4`
⏳ BƯỚC 6 — Review + sửa theo feedback
```

---

## 12. Files sẽ được tạo/sửa khi execute plan

| File | Mục đích |
|------|----------|
| `remotion-kfsp/src/compositions/ShortFA.tsx` | Composition mới cho video 11 tiêu chí |
| `remotion-kfsp/src/components/fa/RadarChart11Truc.tsx` | Radar SVG 11 trục |
| `remotion-kfsp/src/components/fa/BrickWall.tsx` | Bức tường FA |
| `remotion-kfsp/src/components/fa/DoorWithNumber.tsx` | Cánh cửa + số 11 |
| `remotion-kfsp/src/components/fa/SilhouetteClimbers.tsx` | Silhouette leo + rơi |
| `remotion-kfsp/src/components/fa/TermsOverload.tsx` | Thuật ngữ bay (Hook) |
| `remotion-kfsp/src/scenes/fa/Scene1Hook.tsx` | Scene 1 composition |
| `remotion-kfsp/src/scenes/fa/Scene2Problem.tsx` | Scene 2 |
| `remotion-kfsp/src/scenes/fa/Scene3Agitate.tsx` | Scene 3 |
| `remotion-kfsp/src/scenes/fa/Scene4Solve.tsx` | Scene 4 (WOW) |
| `remotion-kfsp/src/scenes/fa/Scene5Action.tsx` | Scene 5 CTA |
| `remotion-kfsp/data/20260414.json` | Props: subtitle chunks, SFX cues, screenshot paths, video trim ranges |
| `remotion-kfsp/public/audio/voiceover_fa.mp3` | Từ Vbee |
| `remotion-kfsp/public/images/fa/S1-S9.png` | 9 screenshots (copy từ screen-shot/) |
| `remotion-kfsp/public/video/fa/R1.mp4`, `R2.mp4`, `R3.mp4` | 3 screen recordings (copy từ screen-shot/, transcode HEVC 60fps → h264 30fps để Remotion đọc nhanh hơn) |
| `remotion-kfsp/public/whisper/20260414_words.json` | Whisper timestamps |

---

## 13. Verification (cách test)

1. **Sau B2**: Play `voiceover.mp3` — nghe đủ 4 chữ cái "KFS B", không méo thuật ngữ FA. Đo duration ≈ 77-80s.
2. **Sau B4** (plan này): Thanh review bảng 24 QA + frame map. Chốt duyệt hoặc feedback trước khi code.
3. **Sau B5** (render):
   - `npx remotion studio` — play từ đầu, check sync từng scene
   - Pause tại f270 (freeze), f1170 (drop silence), f2300 (CTA still) — verify silence absolute
   - Export 15s đoạn Scene 4 (f1380-f1830) riêng, xem trên điện thoại thật — verify radar đọc được, drill-down đắt
   - Overlay TikTok UI mockup lên full video — verify safe zone
4. **Final**: Điền bảng 24 QA, tick hoặc ghi fail. Nếu fail → back về B4 (sửa plan) hoặc B5 (sửa code).

---

## 15. EXECUTION PLAN — Chi tiết từng Scene (build order + code spec)

Plan thực thi cho Remotion project `remotion-fa/` — chi tiết component, frame, SFX, animation presets cho từng scene. Dùng SPRINGS presets từ [design.ts](20260414-11%20tieu%20chi%20fa/remotion-fa/src/design.ts).

### Global / Pre-work (làm TRƯỚC khi build scene)

#### 15.0.1 Refine subtitle timing với Whisper word timestamps
- **File**: `remotion-fa/src/data/subtitles.ts` (hiện 60 chunks distribute linear)
- **Input**: `public/whisper/voiceover.json` có word-level timestamps
- **Approach**: Python script đọc Whisper words theo thứ tự, match với chunk text từ display, gán `start`/`end` từ whisper word đầu/cuối mỗi chunk
- **Script vị trí**: tạo `scripts/gen_subtitles.py` ở project root
- **Text**: dùng chính tả đúng từ `script_display.txt`, timing từ Whisper
- **Thêm keywords highlight** (theo design system):
  - Gold: "11 chỉ số", "cứu cánh", "cánh cửa", "5 giây"
  - Green: "lối vào", "có người dẫn", "bắt đầu"
  - Red: "choáng", "200 dòng", "50 chỉ số", "bỏ cuộc", "đơ luôn"
  - Purple: "Kungfu", "radar", "FA", "4M"

#### 15.0.2 Copy + Wire-up components từ tamsoat
- **Copy sang `remotion-fa/src/components/remocn/`**:
  - `SpringPopIn.tsx` — element pop vào (badge, counter)
  - `BlurReveal.tsx` — text cinematic Hook
  - `directional_wipe.tsx` — scene transition
  - `ZoomThroughTransition.tsx` — qua cửa Scene 3→4
  - `MeshGradientBg.tsx` — BG đỏ/navy
- **Already exists trong remotion-fa**: StaggeredFadeUp, PulsingIndicator, ProgressSteps
- **UI components**: dùng `PhoneMockup.tsx` từ tamsoat thay vì tự code phone (hiện Solve/Action đang code manual)

#### 15.0.3 SFX layer
- **Tạo file**: `remotion-fa/src/SFXLayer.tsx`
- **Approach**: component render tất cả `<SFX>` cues, import vào ShortFA.tsx
- **Format mỗi cue**: `<SFX src="sfx/whoosh.mp3" triggerFrame={F} volume={0.3} />`
- **Tất cả cues list ở section 9 plan** — apply theo frame mới (refined)

#### 15.0.4 BGM (optional, sau final)
- Pixabay pick track 88s upbeat→warm
- Save `public/bgm/main.mp3`
- `<BGM src="bgm/main.mp3" volume={0.08} />` trong ShortFA.tsx

---

### 15.1 Scene 1 — HOOK (f0-f486, 16.2s)

**File**: `remotion-fa/src/scenes/HookScene.tsx` (rewrite từ placeholder)

**Emotional arc**: Overwhelm → Tension freeze → Relief/hope

#### Phases & Frames

| Sub-frame | Relative | Action | Component | Animation |
|-----------|----------|--------|-----------|-----------|
| f0-f180 | 0-6s | Terms overload | `<TermsOverload>` (new) | 7 terms fly in từ 8 hướng, `heavy` spring, stagger 20f |
| f180-f300 | 6-10s | Freeze + dolly-in | `<BlurReveal>` | Terms đông cứng, camera scale 1→1.15 với `zoom` spring |
| f300-f360 | 10-12s | "Bạn cũng thấy choáng?" snap | `<SpringPopIn>` | Center text, `resolve` spring + dấu "?" nháy 3 lần |
| f360-f486 | 12-16.2s | Promise transition | BG fade red→navy + text stagger | `soft` spring, arrow "↓ Xem tiếp ↓" |

#### Components cần tạo

1. **`TermsOverload.tsx`** (~80 LOC) ở `components/fa/`
   - 7 terms array: `["P/E", "ROE", "EBITDA", "OCF", "TTM", "YoY", "Vòng quay tài sản"]`
   - Mỗi term có `delay`, `direction` (8 vectors), `scale start 0.5 → 1.5x`, `opacity 1 → 0.6`
   - Dùng `spring({config: SPRINGS.heavy})` + `ease-in` cho translate
   - BG: nhịp tim đỏ nhạt `MeshGradientBg` variant red
   - Silhouette center (pose "che mặt") SVG inline

2. **Silhouette SVG** inline (3 pose: che mặt / nhìn camera / ngước cười)
   - Không cần component riêng, render inline trong HookScene
   - Stroke-dasharray animation để draw-on khi xuất hiện

#### SFX cues (f0-f486)

```tsx
<SFX src="sfx/noise_loop.mp3" triggerFrame={0} volume={0.25} />     // overload
<SFX src="sfx/heartbeat.mp3" triggerFrame={0} volume={0.2} />       // pulse
<SFX src="sfx/pop.mp3" triggerFrame={90} volume={0.2} />            // glitch accent
<SFX src="sfx/pop.mp3" triggerFrame={120} volume={0.2} />
<SFX src="sfx/pop.mp3" triggerFrame={150} volume={0.2} />
// f180-f300: SILENCE (tension) — không SFX
<SFX src="sfx/chime.mp3" triggerFrame={300} volume={0.3} />         // tick đồng hồ
<SFX src="sfx/pop.mp3" triggerFrame={360} volume={0.25} />          // snap "?"
<SFX src="sfx/whoosh.mp3" triggerFrame={400} volume={0.3} />        // promise transition
<SFX src="sfx/chime.mp3" triggerFrame={430} volume={0.3} />         // synth bell
```

---

### 15.2 Scene 2 — PROBLEM (f500-f1050, 18.4s) — refine từ draft

**File**: `remotion-fa/src/scenes/ProblemScene.tsx` (đã có draft)

**Emotional arc**: Confusion → Overwhelm

#### Phases & Frames (frame relative trong scene, offset +500)

| Rel frame | Abs | Action | Asset/Component | Animation |
|-----------|-----|--------|-----------------|-----------|
| 0-150 | f500-f650 | R1 news feed scroll | `<OffthreadVideo>` R1 0-5s, playbackRate 0.6 | `calm` spring phone slide up |
| 150-160 | f650-f660 | Marker highlight "P/E rẻ" | `<PulsingIndicator>` gold dot | f640 pulse |
| 170-180 | f670-f680 | Marker "ROE cao" | `<PulsingIndicator>` | f670 pulse |
| 200-210 | f700-f710 | Marker "biên LN" | `<PulsingIndicator>` | f700 pulse |
| 250-400 | f750-f900 | Crossfade → R3 BCTC | `<OffthreadVideo>` R3 0-10s | `ease-out` zoom 1→1.3x |
| 280-310 | f780-f810 | Counter "200 dòng" snap | `<SpringPopIn>` red pill | `resolve` spring |
| 360-390 | f860-f890 | Counter "50 chỉ số" snap | `<SpringPopIn>` red pill | `resolve` spring |
| 420-480 | f920-f980 | 3 dấu hỏi chấm trên bảng | SVG tay + "?" pulse | `decisive` spring stagger |
| 500-550 | f1000-f1050 | Overlay "Không biết bắt đầu từ đâu" red pulse | Text fade + red glow | `soft` ease-out |

#### Refinements cần làm trên code hiện tại

- Replace manual phone div với `<PhoneMockup>` từ tamsoat (có highlight prop)
- Thêm `<PulsingIndicator>` cho 3 highlight markers theo timing ở trên
- Animate counter popup với `SpringPopIn` thay vì CSS opacity
- Crossfade R1→R3 dùng `interpolate(frame, [150, 180], [1, 0])` cho R1 opacity

#### SFX cues

```tsx
<SFX src="sfx/whoosh.mp3" triggerFrame={500} volume={0.3} />    // phone slide in
<SFX src="sfx/click.mp3" triggerFrame={640} volume={0.25} />    // marker 1
<SFX src="sfx/click.mp3" triggerFrame={670} volume={0.25} />    // marker 2
<SFX src="sfx/click.mp3" triggerFrame={700} volume={0.25} />    // marker 3
<SFX src="sfx/swoosh.mp3" triggerFrame={750} volume={0.3} />    // crossfade to BCTC
<SFX src="sfx/pop.mp3" triggerFrame={780} volume={0.25} />      // "200 dòng"
<SFX src="sfx/pop.mp3" triggerFrame={860} volume={0.25} />      // "50 chỉ số"
<SFX src="sfx/click.mp3" triggerFrame={920} volume={0.2} />     // ? 1
<SFX src="sfx/click.mp3" triggerFrame={950} volume={0.2} />     // ? 2
<SFX src="sfx/click.mp3" triggerFrame={980} volume={0.2} />     // ? 3
```

---

### 15.3 Scene 3 — AGITATE (f1050-f1770, 24s) ★ Scene lớn nhất

**File**: `remotion-fa/src/scenes/AgitateScene.tsx` (rewrite từ placeholder)

**Emotional arc**: Empathy → Hopelessness → Recognition → Discovery

#### Phases & Frames

| Rel frame | Abs | Action | Component | Animation |
|-----------|-----|--------|-----------|-----------|
| 0-150 | f1050-f1200 | R2 video blur backdrop + bức tường build-up | `<OffthreadVideo>` R2 3-8s + `<BrickWall>` | `heavy` spring stagger 10f/gạch |
| 150-210 | f1200-f1260 | "PHÂN TÍCH FA" khắc đỉnh + text "5 NĂM" | `SpringPopIn` red | `heavy` spring |
| 210-330 | f1260-f1380 | 9/10 silhouette rơi slow-mo + "Bạn ở đâu?" | `<SilhouetteClimbers>` fall animation | `heavy` gravity (d:20,s:80,m:1.5) |
| 330-360 | f1380-f1410 | SILENCE — tension | — | Đứng yên 1s |
| 360-510 | f1410-f1560 | Cửa "11" xuất hiện + mở + hé lộ S1 blur | `<DoorWithNumber>` | `decisive` spring + `zoom` camera |
| 510-720 | f1560-f1770 | Tam suất classroom analogy | `<TamSuatScene>` | `soft` spring formula stagger |

#### Components cần tạo

1. **`BrickWall.tsx`** (~80 LOC) ở `components/fa/`
   - Grid 6x10 gạch (brick), size 100×50px, màu gray-brown
   - Animate: mỗi viên stagger 10f `heavy` spring, translateY -20→0
   - Text khắc FA terms trên gạch (chalk font, carved style)
   - Prop: `triggerFrame`, `wallHeight`

2. **`SilhouetteClimbers.tsx`** (~100 LOC)
   - 10 silhouettes (line-art SVG), pose leo, vị trí random trên wall
   - Prop: `fallStartFrame` — khi trigger, 9/10 silhouette rơi
   - Fall: `heavy` gravity spring, rotate ±30deg random, slow-mo 1.5x
   - 1 silhouette "cô đơn" ở lại đỉnh

3. **`DoorWithNumber.tsx`** (~60 LOC)
   - SVG cánh cửa gỗ + số "11" gold center
   - Animate: scale 0→1.2→1 với `decisive` spring
   - Light bloom filter (`filter: drop-shadow`)
   - Khi mở: rotateY -90deg + reveal `<Img src={S1}>` phía sau với blur
   - Prop: `openFrame`

4. **`TamSuatScene.tsx`** (~120 LOC)
   - Bảng đen SVG 600×400 center
   - Công thức chalk draw-on: `3/4 = x/12` → arrow → `x = 9`
   - Stagger từng symbol 3f/char với `soft` spring
   - Text sequence fade-in:
     - "Chấp nhận quy tắc" (f300)
     - "Bắt đầu làm trước" (f360)
     - "Hiểu công thức sau" (f430)
   - Morph về cửa "11" Scene 3 f410-f500

#### SFX cues

```tsx
// f1050-f1200: bức tường build
<SFX src="sfx/pop.mp3" triggerFrame={1060} volume={0.15} />   // thud gạch 1
<SFX src="sfx/pop.mp3" triggerFrame={1080} volume={0.15} />   // gạch 2
// ... (stagger mỗi 20f)

// f1260-f1380: silhouette rơi
<SFX src="sfx/whoosh.mp3" triggerFrame={1270} volume={0.2} />  // rơi 1
<SFX src="sfx/whoosh.mp3" triggerFrame={1290} volume={0.2} />  // rơi 2
// ... (stagger 9 times)

// f1380-f1410: SILENCE

// f1410-f1560: cửa
<SFX src="sfx/click.mp3" triggerFrame={1420} volume={0.3} />   // click cửa mở
<SFX src="sfx/chime.mp3" triggerFrame={1450} volume={0.3} />   // số 11 glow
<SFX src="sfx/whoosh.mp3" triggerFrame={1490} volume={0.3} />  // light bloom

// f1560-f1770: tam suất
<SFX src="sfx/click.mp3" triggerFrame={1580} volume={0.2} />   // chalk scribble
<SFX src="sfx/chime.mp3" triggerFrame={1640} volume={0.25} />  // công thức 1
<SFX src="sfx/chime.mp3" triggerFrame={1700} volume={0.25} />  // công thức 2
<SFX src="sfx/chime.mp3" triggerFrame={1730} volume={0.3} />   // merge về cửa
```

---

### 15.4 Scene 4 — SOLVE (f1770-f2275, 16.8s) ★ WOW MOMENT — refine

**File**: `remotion-fa/src/scenes/SolveScene.tsx` (đã có draft 4 phase)

**Emotional arc**: Wonder → Recognition → Aha

#### Phases & Frames

| Rel frame | Abs | Action | Component | Animation |
|-----------|-----|--------|-----------|-----------|
| 0-150 | f1770-f1920 | S1 radar 11 trục + sweep label stagger | `<PhoneMockup S1>` + `<RadarLabelSweep>` | `calm` spring stagger 12f/label |
| 150-210 | f1920-f1980 | Badge "11" gold snap | `<SpringPopIn>` | `resolve` spring overshoot |
| 210-360 | f1980-f2130 | Football analogy split-screen | `<FootballRadar>` + S1 + S4 | `resolve` spring + pulse đồng bộ |
| 360-450 | f2130-f2220 | Drill-down: tap trục → S2 tooltip zoom | `<PhoneMockup S2>` + red pill | `decisive` tap + zoom bezier |
| 450-505 | f2220-f2275 | Line đắt "Bạn vẫn đọc FA" gold glow | Text snap | `decisive` spring + glow pulse |

#### Components cần tạo

1. **`FootballRadar.tsx`** (~100 LOC) ở `components/fa/`
   - SVG polygon 5-6 trục: PAS, SHO, PHY, DRI, DEF, PAC
   - Style FIFA/Sofascore: gold stroke, rgba(245,197,66,0.2) fill
   - Trục nhô: Shooting 92, Defense 48 (trục lõm)
   - Avatar silhouette #10 circle ở top
   - Rating "9.2" monospace gold

2. **`RadarLabelSweep.tsx`** (~60 LOC)
   - Overlay component trên S1 screenshot
   - 11 labels stagger pulse sequence (ROE → ROIC → ROA → %G DT → %G EPS → %G BVPS → %G OCF → Nợ dài hạn → VQTS → BLN → CLLN)
   - Mỗi label: `yellow glow pulse` 30f, stagger 12f
   - Tọa độ labels: map trên screenshot S1 (1834×3709)

3. **`CalloutCardKFSP.tsx`** (~50 LOC)
   - Card style KFSP: gold border, white bg, shadow
   - "Điểm thấp nhất trong 11 chỉ số" + arrow pointing
   - Slide in from right với `resolve` spring

#### Refinements cần làm trên code hiện tại

- Replace emoji "⚽ #10" với `<FootballRadar>` component thật
- Thêm `<RadarLabelSweep>` overlay trên S1 trong phase 1
- Thêm red pill highlight dòng "Nợ dài hạn: 66" trong phase 3 (S2 tooltip)
- Gold glow pulse cho text cuối phase 4

#### SFX cues

```tsx
<SFX src="sfx/whoosh.mp3" triggerFrame={1770} volume={0.3} />    // phone slide in
<SFX src="sfx/swoosh.mp3" triggerFrame={1800} volume={0.2} />    // zoom radar
// Sweep 11 labels stagger
{Array.from({length: 11}).map((_, i) => (
  <SFX src="sfx/pop.mp3" triggerFrame={1820 + i*12} volume={0.15} />
))}
<SFX src="sfx/chime.mp3" triggerFrame={1940} volume={0.3} />     // badge "11"
<SFX src="sfx/whoosh.mp3" triggerFrame={1980} volume={0.3} />    // analogy cut
<SFX src="sfx/pop.mp3" triggerFrame={2020} volume={0.2} />       // pulse sync L+R
<SFX src="sfx/click.mp3" triggerFrame={2140} volume={0.25} />    // tap radar
<SFX src="sfx/swoosh.mp3" triggerFrame={2160} volume={0.3} />    // drill-down zoom
<SFX src="sfx/pop.mp3" triggerFrame={2200} volume={0.25} />      // red pill
<SFX src="sfx/chime.mp3" triggerFrame={2240} volume={0.3} />     // line đắt
```

---

### 15.5 Scene 5 — ACTION (f2295-f2625, 11s) — refine

**File**: `remotion-fa/src/scenes/ActionScene.tsx` (đã có draft)

**Emotional arc**: Clarity → Empowerment → CTA Still

#### Phases & Frames

| Rel frame | Abs | Action | Component | Animation |
|-----------|-----|--------|-----------|-----------|
| 0-60 | f2295-f2355 | S9 home 1s → slide S6 bộ lọc | `<PhoneMockup>` swap | `soft` spring slide |
| 60-150 | f2355-f2445 | Swipe S6 → S7 RRG → back | Crossfade transition | `ease-out` swipe loop |
| 150-180 | f2445-f2475 | Tap DCM mã | `<SimulatedCursor>` + flash | `decisive` tap |
| 180-270 | f2475-f2565 | S1 radar DCM + "5 GIÂY" counter | `<PhoneMockup>` + counter pulse | `calm` spring + `resolve` tick |
| 270-300 | f2565-f2595 | Tap trục yếu + S2 tooltip | `<PhoneMockup>` crossfade | `decisive` + zoom |
| 300-330 | f2595-f2625 | CTA cánh cửa + slogan + QR | `<DoorWithNumber>` + text + QR | `decisive` spring → **STILL** từ f2610 |

#### Refinements

- Thay `🚪` emoji với `<DoorWithNumber>` component (reuse từ Scene 3)
- Thêm QR code asset (placeholder) hoặc generate QR với library
- Slogan "11 chỉ số. Cánh cửa phân tích FA." gold on navy
- **CTA STILL từ f2610**: không animation cuối, đứng yên = confidence

#### SFX cues

```tsx
<SFX src="sfx/whoosh.mp3" triggerFrame={2295} volume={0.3} />    // phone slide in
<SFX src="sfx/swoosh.mp3" triggerFrame={2355} volume={0.2} />    // swipe
<SFX src="sfx/swoosh.mp3" triggerFrame={2405} volume={0.2} />    // swipe back
<SFX src="sfx/click.mp3" triggerFrame={2465} volume={0.3} />     // tap DCM
<SFX src="sfx/pop.mp3" triggerFrame={2490} volume={0.25} />      // badge "5 GIÂY"
// Tick 5 times (f2505, f2523, f2541, f2559, f2577)
{[2505, 2523, 2541, 2559, 2577].map(f => (
  <SFX src="sfx/click.mp3" triggerFrame={f} volume={0.2} />
))}
<SFX src="sfx/click.mp3" triggerFrame={2575} volume={0.25} />    // tap trục yếu
<SFX src="sfx/swoosh.mp3" triggerFrame={2585} volume={0.3} />    // drill-down
<SFX src="sfx/chime.mp3" triggerFrame={2595} volume={0.3} />     // cửa mở
<SFX src="sfx/success.mp3" triggerFrame={2600} volume={0.25} />  // CTA
// f2610-f2625: STILL — KHÔNG SFX (tự tin tuyệt đối)
```

---

### 15.6 Thứ tự build (proposed, có thể điều chỉnh)

**Wave 1 — Pre-work (cần trước)**
1. Refine subtitle timing (15.0.1) — quick win, ~30min
2. Copy cross-cutting components (15.0.2) — ~20min

**Wave 2 — Fill content placeholders**
3. Scene 1 HookScene (15.1) — largest new component work, ~2h
4. Scene 3 AgitateScene (15.3) — largest scene, 4 sub-scenes, ~3h

**Wave 3 — Refine drafts**
5. Scene 2 ProblemScene (15.2) — polish existing draft, ~1h
6. Scene 4 SolveScene (15.4) — add FootballRadar + sweep + callout, ~1.5h
7. Scene 5 ActionScene (15.5) — refine CTA + QR, ~1h

**Wave 4 — Integration**
8. SFX layer (15.0.3) — wire all SFX cues, ~30min
9. Scene transitions (optional): `directional_wipe` between scenes, ~30min
10. BGM pick + mix (15.0.4) — optional, ~30min

**Wave 5 — Verification**
11. Run `npm run studio` — full preview
12. Check 24 QA audit items (xem section 10)
13. Export 15s Scene 4 để xem mobile
14. Overlay TikTok UI mock — verify safe zone

Total estimate: **~10-12h** cho full production-ready video.

### 15.7 Quyết định đã chốt (Thanh confirmed)

- ✅ **Scope**: Đầy đủ ngay — build tất cả component, production-ready v1 (10-12h)
- ✅ **Build order**: Hook → Agitate theo thứ tự video (Wave 2 tuần tự)
- ✅ **QR code**: SKIP — chỉ dùng text "Link tải ở bio ↑" + arrow nháy
- ⏳ **BGM**: em pick 1-2 Pixabay candidate Thanh duyệt sau Wave 4

### 15.8 Checklist verify sau build

Run `npm run studio` tại `remotion-fa/`:

- [ ] Audio 88s play đủ, sync với 5 scenes
- [ ] Scene 1 Hook: 7 terms bay đủ, freeze dolly-in, promise text snap gold
- [ ] Scene 2 Problem: R1 scroll → R3 BCTC, counter 200/50 pop, 3 dấu hỏi
- [ ] Scene 3 Agitate: bức tường build, 9/10 silhouette rơi, cửa "11" mở reveal S1 blur, tam suất công thức
- [ ] Scene 4 Solve: radar sweep 11 label, football split, S2 drill-down red pill, line đắt gold
- [ ] Scene 5 Action: S9→S6→S7 swipe, radar DCM 5 giây tick, CTA cửa STILL từ f2610
- [ ] Subtitle karaoke khớp từng từ (Whisper timing)
- [ ] SFX đủ 40+ cues, volume 0.15-0.3, không lấn voice
- [ ] 3 silence moments: f180-f300 + f1380-f1410 + f2610-f2625
- [ ] Safe zone x=60-1020, y=150-1500 — không element vượt
- [ ] Keywords highlight gold/red/green/purple đúng màu

Sau verify: `npm run render` → `output/short_fa.mp4` 1080×1920 @ 30fps 2643 frames.

---

## 14. Vấn đề / Câu hỏi còn lại

### Đã chốt với Thanh
- ✅ **Voice-over**: sửa theo app reality (11 chỉ số = 11 trục 4M) — xem section "Voice-over v2"
- ✅ **Drill-down**: dùng tooltip S2 (match app reality)
- ✅ **Mã demo Scene 5**: DCM (drama 4M thấp/CANSLIM cao)
- ✅ **Hình bổ sung**: Thanh đã gửi đầy đủ S8 (Tín Hiệu M/B), S9 (Home), R1 (news feed video), R2 (phân tích kỹ thuật video), **R3 (BCTC DCM đầy đủ — Cân đối + Chi tiết TC + Biểu đồ)** — mọi gap đã giải quyết

### Còn chờ Thanh (không blocker)
1. **BGM**: Thanh pick 1 track upbeat→warm 80s (em suggest Pixabay sau khi approve plan)
2. **Silhouette design** (Scene 1, 3): line-art đen tối giản hay có accent màu? *Mặc định em chọn: đen thuần + opacity accent khi rơi*
3. **Cánh cửa "11"** (Scene 3): font Serif cổ điển hay Sans hiện đại? *Mặc định: Serif glow vàng*
4. **Football radar** (Scene 4.2): tự vẽ generic 5-6 trục (tránh bản quyền Messi/FIFA)? *Mặc định: OK tự vẽ*
5. **Video trim segment** R1 (20.68s) và R2 (21.62s): em propose trim đoạn đẹp nhất sau khi approve plan (scroll smooth, không jerk)

### Rủi ro + mitigation
- **R1/R2/R3 @ 60fps HEVC → Remotion 30fps h264**: pre-transcode bằng ffmpeg (`-c:v libx264 -r 30 -an`) — tránh HEVC decode chậm trên Remotion renderer.
- **R1/R2/R3 828×1792 portrait** vs phone mockup inner 360×740: cần scale down ~0.43x. Quality OK vì crop tight (bitrate cao ~12Mbps).
- **R1/R3 có audio**: mute hoàn toàn (`-an` khi transcode), chỉ dùng visual.
- **R3 chuyển nhiều tab** trong 31s: cần chọn segment 9s chứa 2 "moment" mạnh nhất (Cân đối KT dày đặc + Chi tiết TC với ROE/ROIC/FCF) — em propose segment sau khi render nháp.

