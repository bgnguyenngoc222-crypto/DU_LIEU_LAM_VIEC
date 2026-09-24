# VIDEO SYSTEM — Hệ thống sản xuất video KFSP (file tổng hợp)

> File điều phối (control-plane) cho toàn bộ video KFSP. Đây là **index + tóm tắt**, KHÔNG chứa codebase. Mô hình giống Product: docs/điều phối ở workspace (OneDrive), codebase ở Desktop.

---

## 1. Codebase ở đâu

| Thành phần | Vị trí | Sync OneDrive? |
|---|---|---|
| **Engine + scratch sản xuất** (Vbee TTS, Remotion, HyperFrames, node_modules, file quay, render) | **`~/Desktop/VIDEO KFSP/`** | ❌ KHÔNG (nặng GB, để ngoài) |
| **2 skill** (`vlog-script`, `video-kfsp`) | `.claude/skills/` (bản workspace để Claude trigger) | ✅ (nhẹ) |
| **Bộ skill HyperFrames (backup, local)** | `02_Marketing/content-automation/hyperframes-skills/` | ✅ (1.2M, để nâng cấp + push github sau) |
| **Docs điều phối** (file này + kênh Chứng khoán trong tầm tay) | `02_Marketing/content-automation/` | ✅ (nhẹ) |
| **`_shared/`** (Vbee clone giọng Thanh, `pronunciation_vi.json`, scripts Python) | `~/Desktop/VIDEO KFSP/_shared/` | ❌ |

> Khi dựng video thật → `cd ~/Desktop/VIDEO\ KFSP/`. Workspace chỉ giữ kịch bản .md + tracking.

---

## 2. Hai skill

### `/vlog-script` — viết kịch bản (5 framework)
Tự chọn hoặc chỉ định 1 trong 5: **PASA** (mẹo/tips), **BAB** (kể chuyện biến đổi), **HSS** (bài học xương máu), **3Qs** (giải thích thuật ngữ), **LAZY-TUT** (hướng dẫn thao tác "làm 1 lần rồi quên").

**LAZY-TUT có 2 phương án** (cốt lõi cho kênh Chứng khoán trong tầm tay):
| | **Phương án A — Set & Forget** | **Phương án B — Pure-Value** |
|---|---|---|
| CTA | **Hard**: Follow + trải nghiệm ngay + FOMO | **Soft**: chỉ "Follow xem tiếp tip" |
| Set&Forget phase | Có (Lưu bộ lọc + Bật cảnh báo) | Bỏ — chỉ dạy mẹo dùng liền |
| Brand | Tagline + nhắc tên rõ | Logo góc, nhắc nhẹ |
| Khi dùng | Khán giả đã ngấm, cần hệ thống hoá | **Kênh non, đang build trust** |

> Quy tắc CTA co giãn: value trước, bán sau. Kênh mới → mặc định **Phương án B (soft)**, chuyển sang A khi audience ngấm.

Output skill: kịch bản liền mạch + **Sentence Map** (mỗi câu 1 row) + Tiêu chí Audit Video.

### `/video-kfsp` — pipeline dựng video (6 bước, sentence-driven)
B1 chính tả+phiên âm → B1.5 tách câu (`sentences.json`) → B2 Vbee TTS + Whisper per-sentence → B3 screenshots/recording → B4 plan storyboard per-sentence → B5 render per-sentence (Remotion) + ffmpeg stitch → B6 sửa atomic. **Dừng gate cuối mỗi bước chờ Thanh duyệt.**

Đặc tả: TikTok 1080×1920, 30fps, safe zone y=150–1500, subtitle karaoke y=1380–1470, CẤM `linear` easing, render per-sentence (CẤM monolithic).

---

## 2.bis Hai engine render — chọn theo loại video (harness 2 đường ray)

KFSP có **2 engine**, cùng xuất MP4 1080×1920, ghép được bằng `ffmpeg`. Chọn theo loại nội dung — KHÔNG thay thế nhau.

| | **Remotion** (studio — engine chính) | **HyperFrames** (graphics — bổ trợ) |
|---|---|---|
| Hợp loại | **Chứng khoán trong tầm tay tutorial** (quay thao tác Bộ lọc app + giọng Vbee Thanh + sub karaoke + mũi tên/zoom), vlog kể chuyện, CANSLIM | Card đồ hoạ thuần: **intro/outro, title card, infographic 1 tiêu chí (MOFU), card "tổng kết bộ lọc tuần", quote/data card fanpage** |
| Tác giả viết | React/TSX (pipeline sentence-driven 6 bước) | 1 file HTML + GSAP (Claude viết nhanh, ít sai) |
| Footage app (màn hình quay) | ✅ thế mạnh (composite + annotation) | ❌ không hợp (HTML thuần, không phải để overlay footage phức tạp) |
| Giọng Vbee Thanh | ✅ pipeline có sẵn | ✅ nhúng được (audio track + whisper caption) — nhưng KFSP ưu tiên Remotion cho video có footage |
| Setup / render | copy node_modules, port, ~tương đương | `npx hyperframes init`, không build, render ~11s/18s |
| Lint trước render | tự lo | có sẵn `npm run check` (lint+WCAG+layout) |

**Nguyên tắc chọn ENGINE (theo loại nội dung):**
- Video **có quay màn hình app** / karaoke nặng → **Remotion** (`/video-kfsp`).
- Card đồ hoạ **không có footage** (mở/đóng, infographic, tổng kết, data card, video kể chuyện đồ hoạ thuần) → **HyperFrames**.
- Cần ghép: render mỗi đoạn → `ffmpeg concat`.

**Nguyên tắc BRAND (theo kênh — trục độc lập với engine, chốt 2026-06-05):**
- **KFSP chính** (Facebook/kênh chủ lực) = **BRAND**: có logo top + dòng "KFSP — KUNGFU STOCKS PRO" cuối.
- **Chứng khoán trong tầm tay** (TikTok persona "Lọc cổ phiếu mỗi ngày") = **NOBRAND**: KHÔNG logo, KHÔNG dòng KFSP (kênh không lộ thương hiệu).
- 1 kịch bản → 2 bản dùng **chung audio Vbee + `sentences.json` + whisper timestamps**; mỗi video lưu 2 folder: **`brand/`** (KFSP chính) + **`nobrand/`** (Chứng khoán trong tầm tay). KHÔNG đặt tên folder theo `hf-mtdt`/`remotion-kfsp`.
- 🟣 **Brand Frame chung** (Remotion): overlay gradient tím trên+dưới + logo trắng, dùng `_shared/remotion/BrandFrame.tsx` (`BrandOverlay`/`BrandLogo`/`BRAND`). **Brand tokens lấy từ app**: tím `#7B3AEC`/`#AA75FF` (KHÔNG dùng magenta `#951B81` cũ). Overlay tím GIỮ ở cả brand & nobrand — chỉ khác có/không logo. Chi tiết: SKILL `/video-kfsp` mục "🟣 LỚP NHẬN DIỆN BRAND".
- HF có generator `build_hf.py` (trong `nobrand/`): tự build nobrand + cut gọn + karaoke word-by-word + nhúng ảnh; đổi tốc độ/timing/ảnh chỉ chạy lại 1 lệnh.

**Hình minh hoạ (chốt 2026-06-05):** Bước 4 storyboard PHẢI có cột `asset` (`code`/`photo:<file>`/`bg:<file>`) + sinh **Asset Manifest** (bảng hình cần Thanh cung cấp) trình TRƯỚC khi render. KHÔNG vẽ code hết rồi chèn ảnh ngược giữa chừng.

> ⚠️ Pilot Điểm tin (`hyperframes-skills/pilot-reference/`) chỉ là **proof cú pháp + brand tokens**. Thanh chốt **không theo dạng điểm tin** — trục video chính là **Chứng khoán trong tầm tay tutorial** (xem `kenh-kfsp/README.md`).

> Font tiếng Việt trong HyperFrames: PHẢI nhúng `@font-face` `.woff2` local (Google Fonts CDN fail khi render sandbox). Brand tokens KFSP: `hyperframes-skills/pilot-reference/design.md`.

---

## 3. Voice clone Thanh (Vbee)
- Endpoint thật: `https://vbee.vn/api/v1/tts`. Script: `_shared/vbee/gen_tts.sh`.
- Voice clone publish: `n_hanam_male_kfspthanh20260411135755079_education_vc`.
- Placeholder timing (anh tự thu sau): `hn_male_thanhlong_talk_48k-fhg`.
- Trick TTS quan trọng: viết **"KFS B"** (không "KFSP"), `Em A` (đường MA), `phần trăm` (%), `Pê. E.` (P/E), "ô cây" (OK). Bảng đầy đủ: `_shared/pronunciation_vi.json` + CLAUDE.md Desktop.

---

## 4. Video đã sản xuất (reference ở Desktop)
| Folder | Trạng thái | Note |
|---|---|---|
| `20260410-diem tin/` | Done | Điểm tin thị trường (video đầu) |
| `20260413-tam soat tang truong/` | Done audio+whisper | 98 subtitle / 109.3s |
| `20260414-11 tieu chi fa/` | Đang làm | 11 tiêu chí FA, PASA |
| `20260418-rrg-hdsd/` | Done | HDSD RRG |
| `canslim-01-tai-sao-can-quan-tam/` | Preview done | Mở series CANSLIM, Hook-Value-CTA, 17 câu, port 3010 |
| `canslim-02 / canslim-03` | Pending | CAN / SLIM |
| `20260503-3-cau-hoi-thi-truong/` | — | 3 câu hỏi thị trường |

Template tốt nhất để copy: `20260414-11 tieu chi fa/remotion-fa/` (PASA) + `canslim-01/` (teaser/reveal, có scripts Python reusable).

---

## 5. Bắt đầu 1 tập mới (cheatsheet)
```bash
cd ~/Desktop/VIDEO\ KFSP/
NAME="20260603-mtdt-tich-luy-nen-gia"   # YYYYMMDD-mtdt-<chude>
SHORT="mtdt01"; PORT=3014                  # tăng 1 so video trước
mkdir -p "$NAME"/{audio,scripts,screen-shot,clips}
# 1) /vlog-script LAZY-TUT <chủ đề> → chọn Phương án A/B → lưu script_display.md + sentences.json
# 2) /video-kfsp loại Vlog → chạy 6 bước (gate từng bước)
#    - copy node_modules: cp -R 20260414-11\ tieu\ chi\ fa/remotion-fa/node_modules "$NAME/remotion-$SHORT/"
# 3) final.mp4 (1080×1920) → đăng TikTok/Reels/Shorts
# 4) Cập nhật workspace: kenh-kfsp/episodes.md + ops/tracking.md
```

---

## 6. Liên kết
- 🗺️ **Bản đồ 3 kênh** (KFSP brand / Chứng khoán trong tầm tay / NĐT Dương Quá): [`CHANNELS.md`](CHANNELS.md)
- Kênh Chứng khoán trong tầm tay (brief + SOP + lịch + tracking): [`kenh-kfsp/README.md`](kenh-kfsp/README.md)
- Kênh NĐT Dương Quá (real-face, persona): [`ndt-duong-qua/README.md`](ndt-duong-qua/README.md)
- Skill: [`/.claude/skills/vlog-script/SKILL.md`](../../.claude/skills/vlog-script/SKILL.md) · [`/.claude/skills/video-kfsp/SKILL.md`](../../.claude/skills/video-kfsp/SKILL.md)
- Pipeline điểm tin (đã có): [`video-diem-tin/`](video-diem-tin/)
- Convention đầy đủ: `~/Desktop/VIDEO KFSP/CLAUDE.md`
- Bộ skill HyperFrames + brand tokens: [`hyperframes-skills/README.md`](hyperframes-skills/README.md)

---
*Cập nhật lần cuối: 2026-06-05 — chốt 2 trục độc lập: ENGINE (theo nội dung) vs BRAND (theo kênh: KFSP chính=brand, Chứng khoán trong tầm tay=nobrand). Folder mỗi video đặt tên `brand/` + `nobrand/`. Thêm asset planning vào storyboard (cột `asset` + Asset Manifest). Generator `build_hf.py`. Karaoke chunk + whisper timing. (Trước: 2026-06-04 thêm engine HyperFrames.)*
