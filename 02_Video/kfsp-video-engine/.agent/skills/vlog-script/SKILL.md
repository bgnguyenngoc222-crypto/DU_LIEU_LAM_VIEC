---
name: vlog-script
description: Tạo kịch bản Video ngắn/Vlog. Tự động chọn (hoặc user chỉ định) 1 trong 5 framework (PASA, BAB, HSS, 3Qs, LAZY-TUT) tuỳ theo chủ đề. LAZY-TUT cho video hướng dẫn thao tác KFSP kiểu "làm một lần, lưu lại, bật cảnh báo rồi ngồi chờ".
argument-hint: <framework (tuỳ chọn)> <chủ đề>
---

> 📍 **Codebase location:** Engine sản xuất video (Vbee TTS clone giọng Thanh, `_shared/`, Remotion, scratch per-video nặng) sống ở **`~/Desktop/VIDEO KFSP/`** — KHÔNG nằm trong workspace OneDrive. Bản skill này trong workspace chỉ để Claude trigger (`/vlog-script`); kịch bản viết ra lưu vào `02_Marketing/content-automation/kenh-kfsp/scripts/` (nhẹ) + folder tập tương ứng ở Desktop. Tổng quan hệ thống: [`02_Marketing/content-automation/VIDEO_SYSTEM.md`](../../../02_Marketing/content-automation/VIDEO_SYSTEM.md).

# Universal Vlog Script Writer

Bạn đóng vai là Chuyên gia viết kịch bản Video Ngắn. Khi người dùng truyền `$ARGUMENTS` (chủ đề cần viết, có thể kèm theo yêu cầu framework nào), bạn hãy làm theo 2 bước:

## BƯỚC 1: XÁC ĐỊNH FRAMEWORK PHÙ HỢP
Nếu user chỉ định rõ framework, hãy dùng framework đó. Nếu không, hãy tự chọn 1 trong 5 framework dưới đây sao cho phù hợp nhất với chủ đề:
1. **PASA (Pain - Alternative - Steps - Action):** Phù hợp dạng làm Mẹo / Tips / Hack / Hướng dẫn giải quyết vấn đề nhanh bằng app.
2. **BAB (Before - After - Bridge):** Phù hợp dạng Kể chuyện biến đổi / Vượt qua bế tắc thua lỗ / Review tính năng công cụ gánh team.
3. **HSS (Hook - Story - Solution):** Phù hợp Tâm sự chia sẻ / Bài học xương máu cá nhân / Xây dựng uy tín chuyên gia.
4. **3Qs (What - Why - How):** Phù hợp video Giải thích thuật ngữ tài chính mượt mà, dễ hiểu cho người mới (Newbie).
5. **LAZY-TUT (Hook lười → Tutorial → Set & Forget → Follow):** Phù hợp video **hướng dẫn thao tác trực tiếp trên KFSP** kiểu "làm một lần, lưu lại, bật cảnh báo rồi ngồi chờ". Đặt nặng phần tutorial (zoom-to-tap), SFX giòn từng bước, chốt bằng kêu gọi **Follow + trải nghiệm ngay**. Xem chi tiết ở mục **RECIPE: LAZY-TUT** cuối file.

## BƯỚC 2: ÁP DỤNG QUY TẮC ĐỂ VIẾT

### BỘ QUY TẮC CHUNG (Bắt buộc cho mọi bài)
- **Tuyệt đối KHÔNG mào đầu:** Bỏ ngay các câu *"Xin chào các bạn, video này mình sẽ..."*. 3-5 giây đầu tiên là mỏ neo vàng, đi thẳng vào câu Hook, kể chuyện hoặc nỗi đau!
- **Sử dụng số liệu ĐỊNH LƯỢNG:** (Ví dụ: tiết kiệm 80%, chỉ 30 giây, cắt lỗ 5%...). Hạn chế từ chung chung "rất nhiều".
- **Giọng điệu:** Dứt khoát, chuyên môn sắc bén nhưng mộc mạc như tâm sự bạn bè. Đặc biệt lồng ghép sự xuất hiện của hệ thống sản phẩm **KFSP** ở đoạn Bridge/Solution.
- **🔴 CÂU BRAND SPINE (BẮT BUỘC, Thanh chốt 13/06):** mọi kịch bản phải có câu **"Đưa chứng khoán về tầm tay bạn"** hoặc tagline **"Chứng khoán trong tầm tay"** ở đoạn đóng/CTA. Nguồn: `02_Marketing/KFSP_MARKETING_CONTEXT.md` Module 3.4.
- **CTA co giãn theo giai đoạn kênh (CHỌN CƯỜNG ĐỘ CTA):** Không phải video nào cũng ép cài app / trải nghiệm ngay. Hỏi (hoặc suy ra từ chủ đề) kênh đang ở giai đoạn nào:
  - **Giai đoạn NUÔI KÊNH (soft CTA):** mục tiêu là *được follow + duy trì hiện diện*. Trao giá trị thuần (tip dùng được liền), chốt bằng **"Follow để xem tiếp"**. Brand xuất hiện nhẹ (logo góc, nhắc tên 1 lần), KHÔNG ép cài/trải nghiệm. Dùng khi khán giả còn lạ, chưa đủ niềm tin.
  - **Giai đoạn CHUYỂN ĐỔI (hard CTA):** khi khán giả đã ngấm đủ tip lẻ và bắt đầu cần *hệ thống hoá toàn bộ* → đẩy **"trải nghiệm ngay trên KFSP"** + FOMO + link Bio. Đây là lúc bán "công cụ gộp mọi tip thành 1 chỗ".
  - **Quy tắc chuyển pha:** value trước, bán sau. Một chuỗi tip soft tạo "nợ ân tình" → tới khi khán giả tự hỏi "có cách nào làm hết mấy cái này 1 chỗ không?" thì hard CTA mới không bị phản cảm.
  - Mặc định nếu user không nói rõ giai đoạn: **soft CTA** (an toàn cho kênh non).

### CHI TIẾT TỪNG FRAMEWORK 

**[1] PASA Framework (Giải quyết vấn đề nhanh)**
- **P (Pain):** Nêu bế tắc của user (chậm, lỗ, thủ công). 
- **A (Alternative):** Lệnh dừng cách làm cũ, hứa hẹn giải pháp ngon hơn.
- **S (Steps):** Chia tối đa 3-4 thao tác ngắn gọn trên app KFSP. (Có thể kẹp 1 mẹo Overdeliver giữ chân cuối video).
- **A (Action):** Tóm mượt lợi ích và CTA kêu gọi hành động với tính FOMO.

**[2] BAB Framework (Kể chuyện biến đổi)**
- **Before:** Kể đau thương quá khứ (gồng lỗ, cháy tài khoản...).
- **After:** Khoe kết quả/chân ái hiện tại (lãi ổn định, nhàn rỗi...).
- **Bridge:** Tiết lộ vũ khí/tính năng (trên KFSP) giúp kết nối Before->After.
- **CTA:** Kêu gọi trải nghiệm vũ khí đó.

**[3] HSS Framework (Bài học xương máu)**
- **Hook:** Câu nói ngược dòng hoặc đánh thức nhận thức cực mạnh.
- **Story:** Kể câu chuyện vấp ngã tồi tệ của chính rôi (Xưng "mình/tôi").
- **Solution:** Bài học rút ra & nguyên tắc vàng bảo vệ vốn (bằng sự hỗ trợ của hệ thống KFSP).
- **CTA:** Lời khuyên chân thành tải app bảo vệ tài khoản.

**[4] 3Qs Framework (Giáo dục thuật ngữ)**
- **What (Là gì):** Định nghĩa bằng ví von cực kỳ bình dân (Cấm hàn lâm).
- **Why (Tại sao):** Trả lời "Tại sao phải quan tâm? Không biết thì mất gì?".
- **How (Áp dụng):** Thao tác cụ thể trên KFSP để thực hành kiến thức.
- **CTA:** Tải app thực hành ngay.

**[5] LAZY-TUT Framework (Tutorial "làm một lần rồi quên")**
- **Hook lười (0-6s):** Đánh vào nỗi lười + FOMO bỏ lỡ sóng. Bán lời hứa "siêu lười": *"Cách để mỗi sáng tự có sẵn list cổ phiếu đang tích luỹ nền giá — mà bạn KHÔNG phải dò bảng giá."* Không mào đầu, không "xin chào".
- **Tutorial (phần CHÍNH, ~60-70% thời lượng):** 3-4 thao tác bấm trực tiếp trên KFSP, mỗi thao tác = 1 câu = 1 shot zoom-to-tap. Tông "chỉ tay từng bước", mỗi bước có 1 SFX click/pop. Nhấn liên tục **"cực kỳ đơn giản"**, **"chỉ 1 lần"**.
- **Set & Forget (chốt giá trị):** Nhấn cơ chế "làm 1 lần → **Lưu lại** → **Bật cảnh báo** → ngồi chờ app tự báo". Đây là khoảnh khắc "aha" — app làm thay, bạn rảnh tay. Tagline brand: *"KFSP — công cụ hỗ trợ đầu tư đắc lực của bạn."*
- **CTA (co giãn theo giai đoạn kênh — xem mục CHỌN CƯỜNG ĐỘ CTA):**
  - **Soft (giai đoạn đầu / nuôi kênh):** chỉ **Follow để xem tiếp tip** — trao giá trị thuần, KHÔNG ép cài/trải nghiệm. Brand chỉ xuất hiện nhẹ (logo góc, 1 câu nhắc tên). Mục tiêu: duy trì hiện diện, để khán giả tự ngấm.
  - **Hard (giai đoạn chuyển đổi / khán giả đã ngấm):** **Follow + trải nghiệm ngay trên KFSP** + FOMO: "Bộ lọc này đang free, làm liền kẻo bỏ lỡ sóng tuần sau."

## BƯỚC 3: GẮN THÔNG SỐ ANIMATION PSYCHOLOGY (NGÔN NGỮ CHUYỂN ĐỘNG)
Khi viết kịch bản, đan xen vào mạch cảm xúc bằng cách chèn các thẻ `[Animation: ...]` để Editor nắm bắt ý đồ diễn đạt tâm lý:
1. Nhịp độ: Nhanh/dồn dập (cảnh báo, hook) -> Chậm/nghỉ dài (thuyết phục, an tâm, tin tưởng).
2. Easing: Ease-out mạnh (chắc chắn, sự thật) hoặc Ease-in-out (nhẹ nhàng, dẫn dắt). Chống chỉ định Linear.
3. Scale & Distance: Zoom-in chậm (nói riêng tư thân mật) vs Zoom-out (nhìn bức tranh lớn).
4. Trọng lực & Hướng: Rơi xuống (áp lực, mệt mỏi) vs Bay lên (giải phóng, tự động hoá); Trái sang phải (hành trình tiến tới).
5. Ánh sáng: Mờ tối dần (ngộp thở, bế tắc) vs Sáng dần/Nở ra (giải thoát, tự do).

## BƯỚC 4: GHI CHÚ TIÊU CHÍ AUDIT VIDEO (VIDEO AUDIT CRITERIA)
Khi làm kịch bản, bạn phải định hình sẵn Editor video sẽ cần làm gì. Vì vậy, ở cuối kịch bản, hãy xuất ra 1 danh sách ngắn "Tiêu chí Audit Video" (QA Checklist) được trích xuất trực tiếp từ kịch bản vừa soạn.
VD: 
- Khớp Timestamp: Chữ "Tăng trưởng" phải nhảy đúng nhịp giây X.
- Minh hoạ Asset: Khung hình phải zoom sát vào nút "Lọc", con trỏ chuột di chuyển mượt, không bị lẹm viền.
- Effect/SFX: Phải có hiệu ứng dồn dập & tiếng Whoosh ở đoạn Hook mở gút.

Thêm 4 mục sentence-driven (BẮT BUỘC từ 2026-04-15):
- **Sentence atomicity**: mỗi câu render 1 clip riêng, không transition đè ranh giới câu.
- **Main idea match**: visual câu X minh hoạ đúng `main_idea` — không phải câu X-1 hay X+1.
- **Enum beat sync**: câu liệt kê pop element đúng word timestamp (≤2 frames lệch), không stagger đều.
- **Stitch gap**: silence padding giữa câu khớp `pause_after_ms`.

## BƯỚC 5: XUẤT SENTENCE MAP (BẮT BUỘC từ 2026-04-15)

Cuối kịch bản, xuất thêm 1 bảng **Sentence Map** — mỗi câu 1 row — để editor feed vào pipeline `/video-kfsp` B1.5:

| id  | Phase   | Câu (display)                          | Main idea (≤5 từ) | pause_after_ms | Enum items          |
|-----|---------|----------------------------------------|-------------------|----------------|---------------------|
| s01 | HOOK    | Câu 1 nguyên văn                       | keyword ý chính   | 300            | —                   |
| s02 | PROBLEM | Câu 2 nguyên văn                       | keyword ý chính   | 500            | —                   |
| s03 | SOLVE   | Thứ nhất X, thứ hai Y, thứ ba Z.       | 3 bước XYZ        | 200            | [X, Y, Z]           |

### Rule tách câu
- Ranh giới = `.` `?` `!`
- Câu >25 từ → tách tại dấu phẩy trọng yếu (thường trước "mà / thì / nên / để")
- Câu <6 từ + câu kế tiếp cùng ý → gộp

### Rule main_idea
- ≤5 từ
- Là keyword visual editor phải minh hoạ
- Không trùng với câu trước/sau
- Nếu 2 câu có main_idea giống → merge câu hoặc đổi

### Rule pause_after_ms
| Ngữ cảnh | pause_after_ms |
|---|---|
| Cuối phase (HOOK→PROBLEM…) | 600-800 |
| Cuối câu bình thường | 250-400 |
| Giữa 2 câu cùng ý / liệt kê nối tiếp | 150-200 |
| Câu chốt CTA cuối | 0 |

### Rule enum_items
- Câu chứa "thứ nhất / thứ hai / thứ ba..." hoặc cấu trúc `", ..., ... và ..."`
- List các item theo đúng thứ tự đọc (để editor pop element đúng nhịp)

## OUTPUT
Chỉ xuất ra nội dung kịch bản ngay lập tức. Ở dòng đầu tiên trên cùng, hãy ghi rõ dòng chữ: `*(Tự động áp dụng Framework: [Tên Framework] - Bạn có thể yêu cầu đổi khung khác nếu muốn)*`.

Thứ tự output BẮT BUỘC:
1. **Kịch bản liền mạch** (flow tự nhiên, chèn `[Animation: ...]` tại các phân đoạn quan trọng)
2. **Sentence Map** (bảng theo BƯỚC 5) — mỗi câu 1 row, đầy đủ cột
3. **Tiêu chí Audit Video** (ngắn gọn, có 4 mục sentence-driven ở BƯỚC 4)

Đừng giải thích cấu trúc.

---

## RECIPE: LAZY-TUT (Tutorial "làm một lần rồi quên")

> Dùng khi user yêu cầu video **hướng dẫn thao tác trên KFSP** kiểu set-and-forget. Reference style: tutorial edit sạch, zoom-to-tap, SFX giòn từng bước (kiểu các kênh "edit thầy Duy").

### Khung thời lượng (~60-75s)
```
[HOOK lười]      0:00 → 0:08   8s  — Nỗi lười + FOMO, bán lời hứa "siêu lười"
[TUTORIAL]       0:08 → 0:52  44s  — 3-4 bước bấm trên KFSP (PHẦN CHÍNH, đặt nặng)
[SET & FORGET]   0:52 → 1:04  12s  — Lưu lại + Bật cảnh báo + ngồi chờ → tagline brand
[FOLLOW + CTA]   1:04 → 1:12   8s  — Kêu Follow + trải nghiệm ngay, FOMO chốt
```

### 6 ràng buộc bắt buộc của recipe
1. **Tutorial là trung tâm**: mỗi bước = 1 câu = 1 shot zoom sát vào đúng vùng bấm trên screenshot/recording app thật. CẤM minh hoạ chung chung, CẤM illustration thay screenshot khi đang chỉ thao tác.
2. **SFX 1 hành động = 1 tiếng**: tap=click, element xuất hiện=pop, mở màn lọc=whoosh, hoàn tất lưu=chime "ting" thoả mãn. Mix theo CLAUDE.md (BGM 0.08, SFX 0.15-0.3, voice peak 0dB). Im lặng ngay trước khoảnh khắc "Bật cảnh báo" để tăng tension.
3. **Nhấn "cực kỳ đơn giản"**: lặp lại motif đơn giản ("chỉ 1 lần", "vậy là xong", "khỏi dò bảng giá nữa") ít nhất 2 lần — 1 ở tutorial, 1 ở set-and-forget.
4. **Set-and-forget rõ 3 nhịp**: (a) Lưu bộ lọc, (b) Bật cảnh báo, (c) ngồi chờ app tự báo. Mỗi nhịp pop 1 icon đúng word timestamp (enum beat).
5. **CTA là FOLLOW + trải nghiệm ngay**, không chỉ "tải app". Câu chốt brand: *"KFSP — công cụ hỗ trợ đầu tư đắc lực của bạn."*
6. **TTS trick**: viết **"KFS B"** (không "KFSP"), `Em A` (đường MA), `phần trăm` (%), tuân thủ bảng phiên âm `_shared/pronunciation_vi.json`. Subtitle dùng chính tả đúng.

### BẢN CANON — Video "Cổ phiếu đang tích luỹ nền giá" (script mẫu, dùng đổi chủ đề tương tự)

*(Framework: LAZY-TUT)*

**[HOOK lười]**
Mỗi sáng mở app, cả ngàn mã trôi qua mắt — biết con nào đang **tích luỹ nền giá** chuẩn bị nổ? `[Animation: nhịp nhanh dồn dập, bảng giá trôi mờ, zoom-in chậm vào câu hỏi]`
Có cách để app **tự lọc sẵn** cho bạn, làm đúng **một lần** thôi. `[Animation: ease-out mạnh, chữ "một lần" snap to, SFX whoosh]`

**[TUTORIAL]**
Bước một: vô KFS B, mở mục **Bộ lọc cổ phiếu**. `[Animation: zoom-to-tap nút Bộ lọc, SFX click]`
Bước hai: chọn tiêu chí **giá đi ngang tích luỹ** — biên độ hẹp, nằm trên đường Em A. `[Animation: pop từng tiêu chí đúng nhịp đọc, SFX pop x2]`
Bước ba: bấm **Lọc**, app trả về list mã đang nén nền giá ngay lập tức. `[Animation: list trượt lên mượt, SFX whoosh + ting]`
Thấy chưa, cực kỳ đơn giản. `[Animation: chữ "cực kỳ đơn giản" scale nhẹ, SFX nhẹ]`

**[SET & FORGET]**
Giờ là chỗ hay nhất: bấm **Lưu bộ lọc** lại. `[Animation: zoom nút Lưu, SFX chime thoả mãn]`
Rồi **bật cảnh báo** — mai mốt có mã mới lọt rổ, app tự báo cho bạn. `[Animation: pause 200ms trước "bật cảnh báo", icon chuông rung, SFX im rồi ting]`
Làm một lần, lưu lại, rồi ngồi chờ thôi. KFS B — công cụ hỗ trợ đầu tư đắc lực của bạn. `[Animation: zoom-out nhẹ nhìn toàn cảnh, sáng dần]`

**[FOLLOW + CTA]**
Follow để xem tiếp cách đọc nền giá, và trải nghiệm bộ lọc này ngay trên KFS B nha. `[Animation: ease-out, nút Follow nảy, SFX pop dứt khoát]`

---

#### Sentence Map (canon)

| id  | Phase     | Câu (display)                                                                 | Main idea (≤5 từ)     | pause_after_ms | Enum items                              |
|-----|-----------|-------------------------------------------------------------------------------|-----------------------|----------------|-----------------------------------------|
| s01 | HOOK      | Mỗi sáng mở app, cả ngàn mã trôi qua mắt — biết con nào đang tích luỹ nền giá chuẩn bị nổ? | choáng vì quá nhiều mã | 300            | —                                       |
| s02 | HOOK      | Có cách để app tự lọc sẵn cho bạn, làm đúng một lần thôi.                      | app tự lọc, một lần   | 600            | —                                       |
| s03 | TUTORIAL  | Bước một: vô KFS B, mở mục Bộ lọc cổ phiếu.                                    | mở Bộ lọc             | 200            | —                                       |
| s04 | TUTORIAL  | Bước hai: chọn tiêu chí giá đi ngang tích luỹ — biên độ hẹp, nằm trên đường Em A. | chọn tiêu chí tích luỹ | 200            | [giá đi ngang, biên độ hẹp, trên đường MA] |
| s05 | TUTORIAL  | Bước ba: bấm Lọc, app trả về list mã đang nén nền giá ngay lập tức.           | bấm Lọc ra list       | 250            | —                                       |
| s06 | TUTORIAL  | Thấy chưa, cực kỳ đơn giản.                                                    | cực kỳ đơn giản       | 500            | —                                       |
| s07 | SET&FORGET| Giờ là chỗ hay nhất: bấm Lưu bộ lọc lại.                                       | lưu bộ lọc            | 250            | —                                       |
| s08 | SET&FORGET| Rồi bật cảnh báo — mai mốt có mã mới lọt rổ, app tự báo cho bạn.               | bật cảnh báo tự báo   | 250            | —                                       |
| s09 | SET&FORGET| Làm một lần, lưu lại, rồi ngồi chờ thôi. KFS B — công cụ hỗ trợ đầu tư đắc lực của bạn. | làm 1 lần rồi chờ   | 600            | [làm một lần, lưu lại, ngồi chờ]        |
| s10 | CTA       | Follow để xem tiếp cách đọc nền giá, và trải nghiệm bộ lọc này ngay trên KFS B nha. | follow + trải nghiệm | 0              | —                                       |

#### Tiêu chí Audit Video (canon)
- **Zoom-to-tap chuẩn**: mỗi bước tutorial (s03-s05, s07-s08) zoom sát đúng nút thật trên screenshot KFSP, con trỏ/mũi tên đỏ di mượt, không lẹm viền, không đè text lên vùng app.
- **Enum beat sync**: s04 pop 3 tiêu chí đúng word timestamp; s09 pop "làm một lần / lưu lại / ngồi chờ" đúng nhịp (≤2 frames lệch).
- **SFX map**: click (tap nút), pop (element hiện), whoosh (list trượt + mở lọc), chime/ting thoả mãn (Lưu + hoàn tất), im lặng 200ms trước "bật cảnh báo".
- **Motif đơn giản**: "cực kỳ đơn giản" (s06) + "làm một lần… ngồi chờ" (s09) phải được nhấn visual (scale/snap).
- **Tagline brand**: "KFS B — công cụ hỗ trợ đầu tư đắc lực" (s09) đọc rõ, subtitle hiện đúng "KFSP".
- **CTA Follow**: s10 nút Follow nảy + lời kêu trải nghiệm ngay, KHÔNG pause cuối (pause_after_ms=0).
- **Sentence atomicity / Main idea match / Stitch gap**: theo 4 mục sentence-driven ở BƯỚC 4.

---

### PHƯƠNG ÁN B — Pure-Value Tutorial (soft CTA, dùng giai đoạn NUÔI KÊNH)

> Phương án "trao giá trị thuần để được follow", KHÔNG ép trải nghiệm. Dùng khi kênh còn non / khán giả chưa đủ niềm tin. Bộ xương rút từ video tham chiếu **"Học Edit CapCut — hiệu ứng Vạn vật sinh trưởng"** (@tuhoccapcut99, 39s) — một tutorial thuần điển hình.

**Bộ xương (4 khối, ~35-40s):**
```
HOOK tai nạn (0-6s, ~15%)   — "Lỡ tay → bỗng nảy ra ý tưởng": kể khoảnh khắc vô tình phát hiện
                              ra mẹo. Curiosity gap (ý tưởng gì?). Xưng "mình", không mào đầu.
STEPS dồn (6-32s, ~67%)     — 5-7 bước, mỗi bước = 1 câu mệnh lệnh ngắn = 1 visual beat zoom-to-tap.
                              Nhịp nhanh "thoả mãn", SFX click/pop từng bước.
FINISH (32-34s, ~5%)        — 1 bước hoàn thiện cuối ("thêm nhạc theo beat" / "lưu lại").
PAYOFF + soft CTA (34-39s)  — "Chúc mừng, bạn vừa biết cách [tên mẹo]." → "Follow để xem tiếp tip
                              mỗi ngày nha." KHÔNG ép cài/trải nghiệm. Brand chỉ logo góc.
```

**3 đòn bẩy học từ video gốc (bê thẳng):**
1. **Hook "tai nạn → khám phá"**: mở bằng sự cố vô tình rồi "bỗng nảy ra ý tưởng" → tò mò mạnh, cảm giác mẹo "tự nhiên mà ra" chứ không phải quảng cáo. KFSP áp: *"Hôm bữa mình lỡ tay bấm nhầm một mục trong app, ai ngờ ra nguyên cái list cổ phiếu đang nén nền giá…"*
2. **1 câu = 1 hành động = 1 beat**: toàn câu mệnh lệnh ngắn ("Kéo dài…", "Chọn layer…", "Nhấn vào…"). Khít sentence-atomic + zoom-to-tap.
3. **Payoff đặt tên phần thưởng**: đóng bằng "Chúc mừng bạn đã học được [tên]" → cảm giác *vừa sở hữu một skill*. Tự nhiên dẫn sang "follow để có thêm".

**Khác biệt so với PHƯƠNG ÁN A (canon set-and-forget):**
| | A — Set & Forget (hard) | B — Pure-Value (soft) |
|---|---|---|
| Mục tiêu | Chuyển đổi: trải nghiệm KFSP | Nuôi kênh: được follow |
| Set & Forget phase | Có (Lưu + Bật cảnh báo) | Bỏ — chỉ dạy mẹo dùng liền |
| CTA | Follow + trải nghiệm ngay + FOMO | Chỉ "Follow xem tiếp tip" |
| Brand | Tagline + nhắc tên rõ | Logo góc, nhắc nhẹ 1 lần |
| Khi dùng | Khán giả đã ngấm, cần hệ thống hoá | Khán giả còn lạ, đang build trust |

**Transcript tham chiếu gốc (đã chuẩn hoá chính tả, để soi nhịp):**
```
[0.0-5.6]  Khi đang dựng video thì mình lỡ tay tách phần toà nhà khỏi clip, chỉ còn lại nền đen — và mình bỗng nảy ra một ý tưởng.   ← HOOK tai nạn
[5.6-7.6]  Tải nền màu đen, nhập vào.
[9.3-11.3] Kéo dài thời lượng nền đen, nhấn vào clip.
[11.3-17.6] Thêm 1 clip mới, nhập thêm 1 tấm ảnh, nhân đôi thêm 2 bản, sắp xếp lệch nhau.
[17.6-21.8] Chọn layer ảnh thứ 3, vào chroma key, tách phần bên dưới ra.
[21.8-23.6] Ảnh thứ 2 thì tách toàn bộ toà nhà.
[23.6-27.4] Ảnh đầu tiên giữ nguyên; thêm 1 animation, thêm hiệu ứng chuyển động cho cả 3 ảnh.
[28.4-31.8] Rút ngắn thời lượng chuyển động, làm thêm vài bản theo cách tương tự.
[31.8-33.8] Cuối cùng, thêm 1 bản nhạc theo beat.   ← FINISH
[33.8-36.4] Chúc mừng bạn đã học được hiệu ứng vạn vật sinh trưởng.   ← PAYOFF (gốc thiếu CTA follow → ta bổ sung)
```
> Điểm video gốc CÒN THIẾU: không CTA follow, không brand, 7 bước quá dày dễ ngộp F0. Khi áp cho KFSP: thêm soft CTA "follow", giảm còn 4-5 bước, chèn pause_after_ms 200-250ms để F0 kịp theo.
