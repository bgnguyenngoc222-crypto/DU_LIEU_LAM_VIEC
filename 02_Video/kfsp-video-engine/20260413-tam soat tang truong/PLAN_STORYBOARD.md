# Plan v3: Animation Storyboard — Tọa độ chính xác từ Screenshots

## Screenshots đã phân tích (1834x3709, aspect 0.494)

### step1.png — Trang Công cụ KFSP
- Grid icons 4x3, **"Bộ lọc" icon** hàng 1 cột 2: center x≈550, y≈300
- Tab bar "Công cụ" active ở dưới

### step2-1.png — Chọn tiêu chí lọc (tab Cơ bản)  
- Tabs: "Thông tin chung | **Cơ bản** | Kỹ thuật | KFSP"
- **Tăng trưởng EPS** (checkbox hồng, TTM checked): y≈410
- **Tăng trưởng DTT** (checkbox hồng): y≈730
- **Tăng trưởng LNST** (checkbox hồng): y≈830

### step2-2.png — Tiêu chí lọc chi tiết
- 3 dòng: DTT(TTM) Lớn hơn 15, LNST(TTM) Lớn hơn 15, EPS(TTM) Lớn hơn 15
- Viền đỏ bao quanh cả 3: y 240-500
- Nút "Thêm tiêu chí" hồng ở dưới

### step3-4.png — Kungfu Watchlist (kết quả lọc)
- Danh sách 11 mã: BID, BSR, FPT, HPG, MBB, MWG, NAB, NVL, OIL, VCB, VIC
- Nút "+" ở header

### step5.png — Cảnh báo (mã ACB)
- **"Báo cáo tài chính" toggle ON** (xanh, viền tím): y≈320-380
- Nút **"Lưu cảnh báo"** tím ở dưới cùng

## Phone Mockup tính toán

```
Phone outer: 380x760, screen inner: 360x740
Screenshot 1834x3709 → screen 360px width
Scale factor: 360/1834 = 0.1963

Screenshot coord → Screen coord:
  screen_x = screenshot_x * 0.1963
  screen_y = screenshot_y * 0.1963

Ví dụ: "Bộ lọc" icon (550, 300) → screen (108, 59)
```

## Subtitle: 5-6 từ mỗi lần, liên tục

Mỗi subtitle chỉ hiển thị **5-6 từ**, chuyển liên tục theo nhịp giọng đọc.
Dựa trên whisper word timestamps, tách thành chunks nhỏ:

```
f0-f66:     "Trong khi nhiều người chỉ mất"
f66-f144:   "chừng 30 giây để lọc ra"  
f144-f184:  "hàng chục mã cổ phiếu tăng trưởng"
f213-f240:  "Đừng tốn thời gian đọc"
f240-f255:  "thủ công như vậy nữa"
f271-f320:  "Hôm nay mình sẽ hướng dẫn"
f320-f370:  "các bạn cách tìm ra"
f370-f427:  "cổ phiếu tăng trưởng chỉ với 3 thao tác"
...
```

## Subtitle Safe Zone

```
Subtitle karaoke nằm trong TikTok safe zone:
- Vị trí Y: 1380-1470px (trên vùng unsafe 1500px)
- Padding trái/phải: 80px mỗi bên (trong safe left 60px + thêm 20px)
- Max width: 920px (1080 - 80*2)
- Font: 38-42px tùy số từ, bold
- Căn giữa horizontal
- 1 dòng duy nhất, 5-6 từ mỗi lần

Kiểm tra: subtitle KHÔNG bị đè bởi:
  ✓ TikTok caption text (y > 1500px) 
  ✓ Share/Like icons bên phải (x < 1020px)
  ✓ Progress bar ngay dưới (y=1490px, cách 20px)
```

## Animation Psychology — Easing Curves Map

| Phase | Cảm xúc mục tiêu | Spring preset | Easing | Hướng chuyển động |
|-------|-------------------|---------------|--------|-------------------|
| HOOK (f0-f184) | Overwhelm, áp lực | `heavy` {d:20, s:80, m:1.2} | `ease-in` (tăng tốc = mất kiểm soát) | Rơi xuống ↓ |
| HOOK pause (f184-f213) | Tension, tĩnh lặng | — | — (đứng yên) | — |
| HOOK resolve (f213-f428) | Relief, tự tin | `resolve` {d:12, s:250} | `ease-out` mạnh (snap = chắc chắn) | Snap lên ↑ |
| BƯỚC 1-3 (f459-f1419) | Calm confidence | `calm` {d:18, s:180} | `ease-out` (chuyên nghiệp) | Zoom-in chậm (intimate) |
| CHUYỂN Ý (f1446-f1650) | Surprise/delight | `resolve` {d:12, s:250} | `ease-out` + overshoot nhẹ | Pop scale ↗ |
| BƯỚC 4-5 (f1675-f2235) | Relaxation, thư thái | `soft` {d:22, s:120} | `ease-in-out` dài (landing mềm) | Đặt xuống nhẹ ↓ |
| KẾT QUẢ (f2267-f2456) | Empowerment | `decisive` {d:14, s:300} | `ease-out` nhanh | Scale snap |
| NAM CHÂM (f2489-f2722) | Transformation | `calm` {d:18, s:180} | `ease-in-out` | Trái→Phải → |
| CTA (f2939-f3300) | Urgency → Confidence | `decisive` → STILL | `ease-out` snap → đứng yên | Snap rồi ĐỨNG YÊN |

**Quy tắc easing:**
- CẤM `linear` — mọi chuyển động phải có acceleration/deceleration
- `ease-in` = mất kiểm soát (chỉ dùng ở Hook overwhelm)
- `ease-out` = tự tin, sự thật (dùng nhiều nhất)
- `ease-in-out` = dẫn dắt nhẹ nhàng (Bonus scene)
- `Easing.bezier(0.22, 1, 0.36, 1)` = zoom chuyên nghiệp

## SFX Library (public/sfx/)

| File | Dùng cho | Tâm lý |
|------|---------|--------|
| `whoosh.mp3` (0.4s) | Scene transition, phone slide in/out | Chuyển động, năng lượng |
| `pop.mp3` (0.08s) | Element xuất hiện (badge, dot, pill) | Nhẹ, chú ý |
| `click.mp3` (0.03s) | Tap/chọn checkbox, nhấn nút | Hành động chính xác |
| `chime.mp3` (0.3s) | Hoàn thành bước, kết quả tốt | Thành tựu |
| `swoosh.mp3` (0.3s) | Zoom vào screenshot | Focus, intimate |
| `notification.mp3` (0.35s) | Cảnh báo bell, thông báo | Alert, quan trọng |
| `success.mp3` (3.9s) | CTA cuối, hoàn thành 5 bước | Phấn khởi, đạt được |

## Storyboard — Frame by Frame + SFX + Easing

### HOOK (f0-f428) — Không phone, text only

| Frame | Giọng đọc | Visual | Easing | SFX |
|-------|-----------|--------|--------|-----|
| f0-f90 | "Trong khi...30 giây...tăng trưởng" | Counter "30 GIÂY" + data rơi | `ease-in` (rơi tăng tốc = áp lực) | — |
| f90-f184 | "...loay hoay...dày cộp" | "30s vs Hàng giờ" — right side falls | `spring heavy` {d:20,s:80,m:1.2} | — |
| f184-f213 | *silence 1s* | **ĐỨNG YÊN** — tension tĩnh lặng | — | — (silence) |
| f213-f255 | "Đừng tốn thời gian..." | Wipe sáng, bg clear | `ease-out` mạnh (relief) | **whoosh** f213 |
| f271-f350 | "...3 thao tác" | "3 thao tác" text snap | `spring resolve` {d:12,s:250} | **pop** f280 |
| f350-f427 | "...tiết kiệm...mệt mỏi" | Dots ①②③ stagger L→R | `spring resolve` stagger 8f | **click** f355, f363, f371 |

### BƯỚC 1 (f459-f591) — step1.png

| Frame | Giọng | Phone state | Annotation | Easing | SFX |
|-------|-------|------------|------------|--------|-----|
| f459-f490 | "Thứ nhất" | Phone slide up, **FULL** 1x | Badge "BƯỚC 1" | `spring calm` {d:18,s:180} | **whoosh** f459, **pop** f465 |
| f490-f530 | "truy cập Bộ lọc" | **ZOOM 2x** → "Bộ lọc" icon | origin 30% 8% | `Easing.bezier(0.22,1,0.36,1)` 30f | **swoosh** f490 |
| f530-f557 | "trên ứng dụng KFSP" | Hold zoom + **pulsing dot** | dot (108, 59) | `ease-out` | **click** f530 |
| f557-f591 | *silence* | Hold | — | — | — |

### BƯỚC 2a (f591-f854) — step2-1.png

| Frame | Giọng | Phone state | Annotation | Easing | SFX |
|-------|-------|------------|------------|--------|-----|
| f591-f612 | "Thứ hai" | Crossfade → step2-1, **FULL** 1x | Badge "BƯỚC 2" | `spring calm` crossfade 15f | **whoosh** f591 |
| f612-f680 | "Chọn nhóm tiêu chí Cơ bản" | **ZOOM 1.8x** checkbox area | origin 27% 22% | `Easing.bezier(0.22,1,0.36,1)` 30f | **swoosh** f620 |
| f680-f740 | "Doanh thu thuần" | Pulsing dot → **DTT checkbox** | dot (19, 143) | `ease-out` appear | **click** f685 |
| f740-f800 | "Lợi nhuận sau thuế" | Dot move → **LNST checkbox** | dot (19, 163) | `ease-out` move | **click** f745 |
| f800-f854 | "và EPS" | Dot move → **EPS checkbox** | dot (19, 80) | `ease-out` move | **click** f805 |

### BƯỚC 2b (f854-f1189) — step2-2.png

| Frame | Giọng | Phone state | Annotation | Easing | SFX |
|-------|-------|------------|------------|--------|-----|
| f854-f900 | "mốc TTM" | Crossfade → step2-2, **FULL** 1x | — | `spring calm` crossfade 15f | **whoosh** f854 |
| f900-f1000 | "hệ thống tự ghép 4 quý" | **ZOOM 2x** → 3 criteria | origin 50% 12% | `Easing.bezier(0.22,1,0.36,1)` 30f | **swoosh** f905 |
| f1000-f1037 | "gần nhất" | **Red box** bao 3 dòng | box (8,47,344,65) | `spring resolve` {d:12,s:250} | **pop** f1000 |
| f1054-f1189 | "lớn hơn 15%" | Pulsing dot trên "15" | dot (300, 55) | `ease-out` | **click** f1060 |

### BƯỚC 3 (f1218-f1419) — step3-4.png

| Frame | Giọng | Phone state | Annotation | Easing | SFX |
|-------|-------|------------|------------|--------|-----|
| f1218-f1260 | "Cuối cùng" | Crossfade → step3-4, **FULL** 1x | Badge "BƯỚC 3" | `spring calm` | **whoosh** f1218, **pop** f1225 |
| f1260-f1350 | "lưu các mã...theo dõi" | **ZOOM 1.5x** stock list | origin 50% 25% | `Easing.bezier(0.22,1,0.36,1)` 30f | **swoosh** f1265 |
| f1350-f1419 | "lưu luôn bộ lọc" | Pulsing dot → nút "+" | dot (330, 22) | `ease-out` | **click** f1355, **chime** f1400 |

### CHUYỂN Ý (f1446-f1650)

| Frame | Giọng | Visual | Easing | SFX |
|-------|-------|--------|--------|-----|
| f1446-f1480 | "xong phần sàng lọc" | Phone shrink out | `ease-in` scale→0 (exit) | **whoosh** f1446 |
| f1480-f1650 | "2 điểm tối ưu" | "BONUS" badge gold + text | `spring resolve` + overshoot | **chime** f1485, **pop** f1490 |

### BƯỚC 4 (f1675-f1926) — Tự vẽ UI mockup (animation + effect)

| Frame | Giọng | Visual | Easing | SFX |
|-------|-------|--------|--------|-----|
| f1675-f1710 | "Hãy bật cảnh báo" | Badge "BƯỚC 4" gold | `spring soft` {d:22,s:120} | **pop** f1680 |
| f1710-f1850 | "cho bộ lọc vừa lưu" | Bell icon + toggle switch ON | `ease-in-out` mềm (relax) | **notification** f1715 |
| f1850-f1926 | "thông báo ngay cho bạn" | Notification card slide in | `spring soft` slide from right | **swoosh** f1855 |

### BƯỚC 5 (f1954-f2235) — step5.png

| Frame | Giọng | Phone state | Annotation | Easing | SFX |
|-------|-------|------------|------------|--------|-----|
| f1954-f1990 | "Song song với đó" | Phone slide up, **FULL** 1x | Badge "BƯỚC 5" | `spring soft` {d:22,s:120} | **whoosh** f1954 |
| f1990-f2060 | "Bật cảnh báo tín hiệu" | **ZOOM 2x** toggle area | origin 50% 10% | `Easing.bezier(0.22,1,0.36,1)` 40f (chậm hơn) | **swoosh** f1995 |
| f2060-f2150 | "tiềm năng...báo ngay" | Pulsing dot → toggle ON | dot (310, 69) | `ease-in-out` | **click** f2065, **notification** f2100 |
| f2150-f2235 | "điểm vào lệnh" | Dot → "Lưu cảnh báo" btn | dot (180, 680) | `ease-in-out` | **click** f2155 |

### CONCLUSION (f2267-f3300) — Không phone

| Frame | Giọng | Visual | Easing | SFX |
|-------|-------|--------|--------|-----|
| f2267-f2350 | "5 bước tự động" | "80%" counter 0→80 | `spring decisive` {d:14,s:300} | **chime** f2270 |
| f2350-f2456 | "80% thời gian" | 3 pills stagger L→R | `spring resolve` stagger 10f | **pop** f2355, f2365, f2375 |
| f2489-f2600 | "1600 mã" | "1600+" big text red | `ease-out` fade | — |
| f2600-f2722 | "nam châm" | Arrow "Sàng lọc → Phân tích" | `ease-in-out` slide L→R | **swoosh** f2605 |
| f2811-f2929 | "cơ hội không chờ" | Text centered | `ease-out` fade | — (silence = weight) |
| f2939-f3050 | "Tải app KFSP" | CTA button snap → **ĐỨNG YÊN** | `spring decisive` → **STILL** | **pop** f2945 |
| f3050-f3120 | "Bio kênh" | Hold CTA still (không animation) | — (đứng yên = tự tin tuyệt đối) | — |
| f3120-f3200 | "7 ngày miễn phí" | Gold badge pop | `spring decisive` | **notification** f3125 |
| f3200-f3300 | "nhịp sóng tới nhé!" | Membership image | `spring soft` (ending mềm) | **success** f3210 |

### SFX PRINCIPLES

- **Không spam SFX** — chỉ tại điểm hành động chính (tap, appear, transition)
- **Silence = mạnh nhất** — khoảng nghỉ f184-f213 và CTA đứng yên KHÔNG có SFX
- **Volume thấp** — SFX ở 0.2-0.4 volume, không lấn voiceover
- **Mỗi loại SFX = 1 hành động**: click=tap, pop=appear, whoosh=transition, swoosh=zoom, notification=alert, chime=complete

---

## BẢNG AUDIT NGHIỆM THU VIDEO

### Checklist trước khi Thanh duyệt

| # | Hạng mục | Tiêu chí | Pass? |
|---|----------|----------|-------|
| 1 | **Subtitle sync** | 5-6 từ/chunk, khớp 100% nhịp giọng đọc (whisper timestamps) | ☐ |
| 2 | **Subtitle vị trí** | Nằm trong safe zone y=1380-1470, không bị TikTok UI đè | ☐ |
| 3 | **Subtitle 1 dòng** | Mỗi lần chỉ hiển thị 1 dòng, không wrap | ☐ |
| 4 | **Logo** | Căn giữa top, 120px, rõ nét, trong safe zone y=160-290 | ☐ |
| 5 | **Phone mockup** | Không bị cắt rìa, screenshot hiển thị đầy đủ | ☐ |
| 6 | **Zoom chính xác** | Zoom vào đúng vùng cần chú ý (nút, checkbox, toggle) | ☐ |
| 7 | **Annotation đúng vị trí** | Pulsing dot/box ở đúng tọa độ element trên screenshot | ☐ |
| 8 | **Animation khớp giọng** | Visual thay đổi sync với speech segment ±5 frames | ☐ |
| 9 | **Easing curves** | Không có linear, mọi chuyển động có ease-out/spring | ☐ |
| 10 | **Emotional arc** | Hook=overwhelm→relief, Tutorial=calm, Bonus=soft, CTA=decisive→still | ☐ |
| 11 | **SFX đúng timing** | Click=tap, pop=appear, whoosh=transition, không spam | ☐ |
| 12 | **SFX volume** | 0.2-0.4, không lấn voiceover | ☐ |
| 13 | **Silence moments** | f184-f213 (tension) và CTA still KHÔNG có SFX | ☐ |
| 14 | **Safe zone** | Tất cả content trong x:60-1020, y:150-1500 | ☐ |
| 15 | **Progress bar** | Vị trí y=1490, trong safe zone, animate smooth | ☐ |
| 16 | **Transition mượt** | Crossfade/wipe giữa screenshots, không jump cut | ☐ |
| 17 | **Bước 4 minh họa** | UI mockup tự vẽ đẹp, bell icon + toggle + notification card | ☐ |
| 18 | **CTA đứng yên** | Button snap vào rồi KHÔNG pulse/nhấp nháy | ☐ |
| 19 | **Audio không cắt** | Voiceover phát hết 109.3s, không bị cut cuối | ☐ |
| 20 | **Tổng thể chuyên nghiệp** | Nhìn như video tutorial app premium, không rẻ tiền | ☐ |

### Quy trình nghiệm thu

1. **Play full video** trong Remotion Studio — check sync tổng thể
2. **Check từng scene** — pause tại các frame chuyển đổi
3. **Check safe zone** — overlay TikTok UI mockup lên để verify
4. **Check trên mobile** — export 1 đoạn 15s, xem trên điện thoại
5. **Điền bảng audit** — đánh dấu Pass/Fail từng hạng mục
6. **Feedback** → quay lại sửa nếu có Fail

## Components/Source Inventory

### Đã có ✅

| Component | Source | Dùng cho |
|-----------|--------|----------|
| DeviceMockupZoom | remocn | Phone frame + zoom (Bước 1-5) |
| SimulatedCursor | remocn | Con trỏ tap trên screenshot (Bước 2) |
| PulsingIndicator | remocn | Dot nhấp nháy chỉ vào nút |
| SpringPopIn | remocn | Element pop vào (badge, pill) |
| BlurReveal | remocn | Text xuất hiện cinematic (Hook) |
| MarkerHighlight | remocn | Highlight từ khóa |
| StaggeredFadeUp | remocn | Nhiều element stagger (dots ①②③) |
| ZoomThroughTransition | remocn | Transition zoom giữa scenes |
| MeshGradientBg | remocn | Background gradient đẹp (Hook, Conclusion) |
| ProgressSteps | remocn | Hiển thị bước 1→5 progress |
| ToastNotification | remocn | Notification card (Bước 4) |
| DirectionalWipe | remocn | Wipe transition giữa scenes |
| SuccessConfetti | remocn | Confetti nhẹ (Conclusion) |
| SpotlightCard | remocn | Highlight card CTA |
| ImageExpandToFullscreen | remocn | Mở rộng hình ảnh |
| @remotion/transitions | npm | Transition effects |
| @remotion/lottie + lottie-web | npm | Lottie animation player |
| remotion-animated | npm | Declarative Fade/Scale/Move |
| SFX (7 files) | ffmpeg gen | whoosh, pop, click, chime, swoosh, notification, success |
| Screenshots (5 files) | Thanh cung cấp | step1-5 app screens |

### Cần chuẩn bị thêm ❌

| Mục | Nguồn | Cách lấy | Dùng cho |
|-----|-------|----------|----------|
| **Lottie: Bell/notification** | [LottieFiles](https://lottiefiles.com/free-animations/bell-notification) | Download JSON thủ công | Bước 4 — chuông cảnh báo |
| **Lottie: Checkmark/success** | [LottieFiles](https://lottiefiles.com/free-animations/check-mark) | Download JSON thủ công | Hoàn thành mỗi bước |
| **Lottie: Tap finger/click** | [LottieFiles](https://lottiefiles.com/free-animations/hand-click) | Download JSON thủ công | Tap trên phone screen |
| **Lottie: Arrow/swipe** | [LottieFiles](https://lottiefiles.com/free-animations/swipe-right-arrow) | Download JSON thủ công | Transition L→R (Conclusion) |
| ~~Screenshot: Bật cảnh báo Bộ lọc~~ | ~~Thanh chụp~~ | Tự minh họa bằng animation + effect | Bước 4 — vẽ UI mockup bằng code |
| **SFX chất lượng cao** | [Pixabay](https://pixabay.com/sound-effects/) / [Mixkit](https://mixkit.co/free-sound-effects/) | Download thủ công | Thay thế SFX gen bằng ffmpeg |
| **BGM nhạc nền** | [Pixabay Music](https://pixabay.com/music/) | Download thủ công | Nhạc nền nhẹ dưới voiceover |

### Hướng dẫn download Lottie

1. Vào [lottiefiles.com](https://lottiefiles.com)
2. Tìm animation cần (bell, checkmark, tap, arrow)
3. Chọn style phù hợp (minimalist, purple/brand color)
4. Download dạng **Lottie JSON** (không phải dotLottie)
5. Lưu vào `remotion-tamsoat/public/lottie/[tên].json`

### Cấu trúc thư mục cần có

```
public/
├── audio/
│   └── voiceover.mp3        ✅
├── sfx/
│   ├── whoosh.mp3            ✅ (cần thay bản chất lượng cao)
│   ├── pop.mp3               ✅
│   ├── click.mp3             ✅
│   ├── chime.mp3             ✅
│   ├── swoosh.mp3            ✅
│   ├── notification.mp3      ✅
│   └── success.mp3           ✅
├── lottie/
│   ├── bell.json             ❌ Cần download
│   ├── checkmark.json        ❌ Cần download
│   ├── tap-finger.json       ❌ Cần download
│   └── arrow-right.json      ❌ Cần download
└── images/
    ├── logo.jpg              ✅
    ├── step1.png             ✅
    ├── step2-1.png           ✅
    ├── step2-2.png           ✅
    ├── step3-4.png           ✅
    ├── step5.png             ✅
    ├── (step4: tự vẽ bằng React component)
    ├── membership.png        ✅
    └── homepage.png          ✅
```

## Vấn đề cần giải quyết

1. **Bước 4** không có screenshot → tự vẽ UI mockup bằng React (toggle switch, bell icon, notification card animation)
2. **Lottie JSON** — cần download 4 files từ LottieFiles
3. **SFX** — file generate bằng ffmpeg rất basic, nên thay bản Pixabay/Mixkit
4. **BGM** — video ngắn cần nhạc nền nhẹ
5. **Subtitle** — tách 5-6 từ/chunk từ whisper timestamps
6. **Phone zoom** — phải thay đổi size thực sự, không chỉ CSS transform
