# CLAUDE.md — Project Video KFSP (MAU 1)

> File memory cho Claude. Load tự động mỗi khi làm việc trong folder này.
> User: **Thanh** — CEO của KFSP, app phân tích chứng khoán Việt Nam.

---

## QUICK REFERENCE (đọc trước mọi thứ)

| Rule | Giá trị |
|---|---|
| Viết KFSP trong script TTS | **"KFS B"** (không viết KFSP — Vbee nuốt P cuối) |
| "OK" → Thanh đọc | **"ô cây"** — dùng cả trong TTS lẫn review |
| Hạt ngữ khí cho phép | "nha", "đơ luôn", "ấy", "vậy đó", "chỗ này" |
| Hạt ngữ khí CẤM | **"nè"** (không tự nhiên với Thanh) |
| Hạt ngữ khí "á" kiểu Nam | Thay bằng **"ấy"** |
| TikTok safe zone | y=150–1500, x=60–1020 |
| Subtitle | y=1380–1470, progress bar y=1490, logo top y=160–290 |
| Easing | **CẤM `linear`** — chỉ ease-out hoặc spring |
| Gate | **Dừng cuối mỗi bước**, chờ Thanh duyệt trước khi tiếp |
| Script → câu | Tách theo dấu chấm/?/!, id `s01, s02…`, mỗi câu 1 shot |
| Render | **Per-sentence clip + ffmpeg concat**, CẤM render monolithic |
| Liệt kê | Element pop đúng nhịp word timestamp (±2f), không stagger đều |
| Cảnh ↔ câu | Cảnh đi theo câu — mọi câu đều phải có visual minh hoạ đúng `main_idea` |
| Voice mode | **2 mode**: Vbee clone (KFSP Thanh) **HOẶC** self-recorded (anh tự thu, dùng Vbee Thanh Long làm timing reference) |
| Port Remotion | **Mỗi video = 1 port** để chạy song song. Convention: `canslim-01=3010`, `canslim-02=3011`, `canslim-03=3012`... Pass `--port=3010` cho `studio` và render |
| Setup remotion mới | **CẤM `npm install`** — copy `node_modules` từ video gần nhất (`cp -R remotion-fa/node_modules remotion-{name}/`) — tiết kiệm 2-3 phút |
| **Background minh hoạ** | 🔴 LUÔN HỎI Thanh gửi hình minh hoạ cho từng scene TRƯỚC khi dựng. Đặt làm background mờ (blur 14-16px + overlay navy ~0.72) để chữ vẫn đọc rõ. Không tự bịa hình. |
| **Asset per-scene** | 🔴 Bước 4 storyboard phải có cột `asset`: `code` / `photo:<file>` / `bg:<file>`, và sinh **Asset Manifest** (bảng hình cần Thanh cung cấp) → chốt code-vs-ảnh TRƯỚC render. CẤM vẽ code hết rồi chèn ảnh ngược giữa lúc render. |
| **Engine + brand theo kênh** | 🔴 **KFSP chính → Remotion + BRAND** (có logo + dòng KFSP cuối). **Một tay đầu tư → HyperFrames + NOBRAND** (KHÔNG logo, KHÔNG dòng KFSP — kênh persona riêng). Audio Vbee gen **1 lần dùng chung**. Không có "HF brand". Xem Section 0. |

---

## 0. ENGINE + BRAND THEO KÊNH (routing) — chốt 2026-06-04, sửa 2026-06-05

Một kịch bản xuất **2 bản video** cho 2 kênh, **dùng chung audio Vbee** (gen 1 lần). 🔴 **2 trục riêng biệt, đừng lẫn:** *engine* (công nghệ render) và *brand* (có/không logo KFSP).

| Kênh | Engine | Brand | Logo + dòng "KFSP" cuối? | Folder output |
|---|---|---|---|---|
| **KFSP chính** (Facebook/kênh chủ lực, education-first) | **Remotion** | **BRAND** | CÓ logo top + CÓ "KFSP — KUNGFU STOCKS PRO" | `brand/out/final.mp4` |
| **Một tay đầu tư** (TikTok "Lọc cổ phiếu mỗi ngày", top-funnel) | **HyperFrames** | **NOBRAND** | KHÔNG logo, KHÔNG dòng KFSP | `nobrand/renders/final-hf.mp4` |

> 🔴 **2 trục độc lập, đừng gộp cứng:**
> - **Brand-status = theo KÊNH (cố định):** KFSP chính = BRAND (logo + KFSP), Một tay đầu tư = NOBRAND. Luôn đúng bất kể engine.
> - **Engine = theo LOẠI NỘI DUNG:** có footage app/karaoke nặng → Remotion; card đồ hoạ thuần → HyperFrames (xem VIDEO_SYSTEM.md mục 2.bis). Bảng trên là combo của *video kể chuyện này* (KFSP=Remotion, Một tay đầu tư=HF), KHÔNG có nghĩa Một tay đầu tư luôn = HF.
>
> **Folder đặt tên theo brand-status** (chốt 2026-06-05): `brand/` (KFSP chính) · `nobrand/` (Một tay đầu tư). KHÔNG dùng tên `hf-mtdt`/`remotion-kfsp` nữa. `build_hf.py` (trong `nobrand/`) mặc định build nobrand.

**Nguyên tắc chia sẻ asset (BẮT BUỘC):**
1. **Audio per-sentence (Vbee) gen 1 lần** ở `audio/` → cả Remotion và HyperFrames dùng chung. KHÔNG gen lại 2 lần (trừ khi đổi tốc độ/giọng).
2. `sentences.json` (script + timing + main_idea + word_timestamps) là **single source of truth** cho cả 2 bản.
3. Whisper word-timestamps dùng chung cho karaoke (cả 2 engine).
4. Output: `brand/out/final.mp4` (KFSP chính, Remotion brand) + `nobrand/renders/final-hf.mp4` (Một tay đầu tư, HF nobrand). Có thể khác độ dài cắt theo kênh, nội dung lõi giống nhau.

**Pipeline tách nhánh:** Bước 1 → 1.5 → 2 (audio + whisper) **dùng chung**. Từ Bước 4 (storyboard) trở đi **tách 2 nhánh** Remotion (brand) và HyperFrames (nobrand), gate riêng.

> Bối cảnh: HF (HeyGen, Apache 2.0) proof-of-tech 2026-06-04. Font tiếng Việt nhúng Be Vietnam Pro `.woff2` local (Google Fonts CDN fail trong sandbox). 2 engine **bổ trợ theo layer, không thay thế** (xem `02_Marketing/content-automation/VIDEO_SYSTEM.md`). `build_hf.py` (per-video) sinh HF nobrand + cut + karaoke + ảnh; đổi tốc độ/timing chỉ chạy lại 1 lệnh.

---

## 1. User Pronunciation Habits

### Cách đọc của Thanh (Vbee phải match)

- `OK` → **"ô cây"** (Southern — không đọc kiểu English "o-kei")
- `á` kiểu Nam → **"ấy"** (ví dụ: "vậy ấy" thay vì "vậy á")
- KHÔNG dùng **"nè"** — không tự nhiên
- DÙNG được: "nha", "đơ luôn", "ấy", "ô cây", "vậy đó", "chỗ này"

### Persona & Tông giọng

- **"Anh bạn trader đồng cảm"** — dạy nhẹ, không xúc phạm, không formal
- Persona target: **F0 NĐT mới + tay ngang** — không jargon nếu không giải thích
- Tông **"nói chuyện"**, không "đọc bài":
  - Câu ngắn, 1 hơi thở
  - Rhetorical question: "Bạn cũng thấy choáng?"
  - Interjection: "ô cây", "vậy đó"
  - Contractions: "vô" thay "vào"
  - **Word play giữ nguyên** (vd: "choang sắc choáng" — đồng âm)
  - Analogy đời thường ưu tiên: bóng đá (radar cầu thủ), toán tiểu học (quy tắc tam suất)

---

## 2. Vbee TTS — Voice Clone

**Endpoint thật**: `https://vbee.vn/api/v1/tts` (không phải vbee.ai)

**Script gen TTS**: `_shared/vbee/gen_tts.sh` — reusable, đọc credentials từ `_shared/vbee/vbee.env`. Args: `<script_tts.txt> <output.mp3> [speed_rate=1.0] [voice_code=from_env]`.

### Voice IDs theo mục đích

| Mode | Voice ID | Khi nào |
|---|---|---|
| **Voice clone Thanh** | `n_hanam_male_kfspthanh20260411135755079_education_vc` | Final voice (publish) |
| **Placeholder Thanh Long** | `hn_male_thanhlong_talk_48k-fhg` | Khi anh tự thu sau — gen Vbee để có timing reference, anh thu đè lên storyboard |
| Backup news (nam) | `hn_male_manhdung_news_48k-fhg` | Tin tức |
| Nữ chính | `hn_female_ngochuyen_full_48k-fhg` | Khi cần giọng nữ |

> Full voice list: `_shared/vbee/voices_vi.md` (24 giọng VN)

### Self-recorded mode (anh tự thu)

Skip B1 (TTS trick) + B2 (Vbee clone). Workflow:
1. Gen Vbee Thanh Long full audio (1 call, không per-câu) → `audio/voice_full.mp3` — speed `0.95` cho podcast pace tự nhiên
2. Whisper full → `audio/voice_full.json`
3. Hardcode boundaries `(abs_start, abs_end)` per câu (Whisper hay sai vài chữ → sequential alignment fail) → split per-sentence audio bằng `ffmpeg -ss/-to`
4. Anh thu đè sau: re-run whisper + re-split + re-render. KHÔNG re-generate Vbee.

### Known bugs + tricks

| Từ gốc | Lỗi Vbee | Trick TTS |
|---|---|---|
| `KFSP` | Nuốt P cuối → "KFS" | Viết **"KFS B"** |
| `PE` → "Pê E" | Vbee đọc "Vê" (nuốt) | Viết `Pê. E.` (chấm tách) |
| `ROE` | Đọc "Rô" | Viết `R-O-E` |
| `EBITDA` | Đọc "David" | Viết phiên âm `Ê bít đa` |
| `OCF` → "Ô Xê Ép" | Nghe thành "Hossev" | Viết `Ô. Xê. Ép.` |
| `FA` → "Ép A" | Đọc "eva" | Viết `Ép. A.` |
| `TTM` | Nuốt chữ | Viết `T-T-M` |
| `YoY` | Lộn xộn | Viết `Y-ô-Y` |
| `CANSLIM` | Đọc kẹt | Viết `Can Slim` (2 từ) |
| `William O'Neil` | Vbee Thanh Long đọc thành "Quyliamonin" | Viết `Uy-li-am Ô Nin` |
| `MA` (đường MA) | Đọc "ma" | Viết `Em A` (Em + A) |
| `%` | Bỏ qua | Viết `phần trăm` |
| `CAN`, `SLIM` (single word) | Đọc kẹt | Viết `Can`, `Slim` (capitalize đầu, không all caps) |

### Timing

- Speed rate `1.0` cho ~1400 chars → ~62s output
- Cần target 78-82s → dùng speed **0.85**
- `callback_url` bắt buộc có trong request body → dùng `https://httpbin.org/post` làm placeholder

### Pronunciation update workflow

1. Quét script → list từ chưa có trong `_shared/pronunciation_vi.json`
2. Hỏi Thanh phát âm đề xuất
3. Update JSON với field `tts_trick` (cách viết cho Vbee)
4. Ghi pattern lặp vào mục "User Pronunciation Habits" trên

---

## 3. Script Writing — Framework & Style

### Framework mặc định: PASA

```
[HOOK]   0:00→0:18  18s  — Jargon overload → đồng cảm
[P]      0:18→0:28  10s  — Problem cụ thể (200 dòng số, không biết bắt đầu)
[A]      0:28→0:50  22s  — Agitate + analogy đời thường
[S]      0:50→1:10  20s  — Solve bằng KFSP (radar, drill-down)
[ACTION] 1:10→1:22  12s  — CTA + link bio
Total: ~82s
```

### Framework alt: Hook-Value-CTA (teaser/reveal)

Dùng cho video mở series — giấu key concept tới cuối VALUE để bracketing surprise.
```
[HOOK]   0:00→0:21  21s  — Pain cảm xúc cụ thể + curiosity gap
[VALUE]  0:21→1:11  50s  — Set up framework → drill phần A → drill phần B → REVEAL key concept
[CTA]    1:11→1:21  10s  — Tease video sau + follow
Total: ~80s
```
Reveal moment: pause 200ms ngay trước key word + decisive snap + zoom + particles + reverb chime.

### Script sync với app thật

- Nếu script nói "tính năng X" mà app thật là "tính năng Y" → **sửa script theo app**
- Ví dụ đã xảy ra: script cũ nói "11 chỉ số 4M-CANSLIM" → app thật là "11 trục của Điểm 4M" → đã sửa thành "11 chỉ số phân tích cơ bản"
- "Chạm trục yếu" → app thật là "Bấm vào các điểm trên radar" (tổng quát hơn)
- "Mở BCTC tab" → app thật là "drill-down tooltip" → dùng "hiện ngay điểm thành phần"

### 2 file script mỗi video

- `script_display.txt` — hiển thị subtitle (chính tả đúng)
- `script_tts.txt` — gửi Vbee (dùng trick phiên âm, "KFS B", dấu chấm tách)

---

## 4. Storyboard Conventions

### Canvas & timing

- **1080×1920 portrait** (9:16), **30fps**
- `frame = giây × 30`

### TikTok Safe Zone

```
y=0-150      UNSAFE (status bar)
y=150-1500   SAFE zone (nội dung)
y=1500-1920  UNSAFE (TikTok UI)
x=60-1020    horizontal safe

Subtitle:     y=1380-1470
Progress bar: y=1490
Logo top:     y=160-290
```

### Subtitle karaoke

- Mỗi chunk 5-6 từ, 1 dòng, `whiteSpace: "nowrap"`
- Chuyển liên tục theo word timestamps từ Whisper
- Font 38-42px bold, auto scale: `fontSize = min(42, 960 / words × 0.85)`
- Fade in/out 4 frames mỗi đầu/cuối

### Keyword highlight màu

| Màu | Hex | Dùng cho |
|---|---|---|
| Gold | `#f5c542` | Nhấn mạnh ("11 chỉ số", "cứu cánh") |
| Green | `#34d399` | Positive ("lối vào", "có người dẫn") |
| Red | `#f87171` | Pain ("choáng", "200 dòng", "bỏ cuộc") |
| Purple | `#a78bfa` | Brand ("KFS B", "radar", "4M") |

### Storyboard table format

| Frame | Giọng | Visual | Animation/Easing | SFX |
|---|---|---|---|---|

---

## 5. Animation Psychology

**CẤM `linear` easing** — mọi animation phải có ease-out hoặc spring.

### Preset springs

| Tên | Duration | Stiffness | Mass | Dùng khi |
|---|---|---|---|---|
| `heavy` | 20f | 80 | 1.2 | Áp lực, nặng nề (Hook overload) |
| `resolve` | 12f | 250 | — | Dứt khoát, tự tin (snap text) |
| `calm` | 18f | 180 | — | Mượt chuyên nghiệp (tutorial steps) |
| `soft` | 22f | 120 | — | Nhẹ nhàng (bonus, outro) |
| `decisive` | 14f | 300 | — | Snap chính xác (CTA) |
| `zoom` | 25f | 60 | — | Intimate dolly-in |

### Motion → Tâm lý

- Rơi xuống = áp lực, nặng nề
- Bay lên = tự do, nhẹ nhõm
- Zoom-in chậm = thân mật, riêng tư
- Đứng yên tuyệt đối = tự tin, quyền lực
- Trái → Phải = tiến về phía trước
- Background tối dần = ngộp thở, bế tắc
- Background sáng dần = hy vọng, thoáng

### SFX principles

- **Volume mix**: BGM 0.08, SFX 0.15-0.3, voice peak 0dB
- Không spam — chỉ tại điểm hành động chính
- **Silence = mạnh nhất** (tension, CTA đứng yên không SFX)
- 1 SFX = 1 hành động: click=tap, pop=appear, whoosh=transition, swoosh=zoom, chime=complete

---

## 6. Asset Management

### Naming convention

- Screenshots: `S1`, `S2`... (file thật: `IMG_XXXX.PNG`)
- Screen recordings: `R1`, `R2`, `R3`... (file thật: `ScreenRecording*.MP4`)
- Folder: `YYYYMMDD-ten-ngan/screen-shot/`

### Format specs

- Screenshots: PNG 1834×3709 (iPhone screenshot gốc)
- Recordings: HEVC 60fps 828×1792 → **pre-transcode h264 30fps cho Remotion**
  ```bash
  ffmpeg -i input.MP4 -c:v libx264 -r 30 -an output.mp4
  ```
- Audio: MP3 128kbps mono từ Vbee
- Whisper output: JSON với `word_timestamps=True`

### Layout rule (quan trọng)

- Text/textbox minh họa **KHÔNG được đè lên hình tư liệu app**
- Hình app phải luôn hiển thị rõ detail — có vùng riêng
- Video HDSD: zoom-in vào vùng tương tác, thêm mũi tên đỏ / vòng tròn highlight

---

## 7. Decision-Making Pattern

### Thanh thích

- **Hỏi rõ ràng** — không đoán khi không chắc
- **Plan kỹ trước khi code** (dùng plan mode, frame-by-frame table)
- **Screenshot app thật** hơn illustration khi cần proof
- **Sync plan 2 nơi**: `~/.claude/plans/*.md` (working) + `{video-folder}/PLAN_STORYBOARD.md` (archive)
- **Gate pattern** — dừng cuối mỗi bước chờ duyệt Y/N
- Nếu script của Thanh đổi → plan phải update theo ngay

### Thanh không thích

- Tự quyết mà không hỏi
- Plan sơ sài, thiếu tọa độ
- Illustration thay screenshot khi đang cần proof
- Tông "đọc bài" (quá formal, dài)
- Tự ý thêm hạt ngữ khí không tự nhiên
- Emoji trong output (trừ khi Thanh yêu cầu)

---

## 8. Pipeline 6 Bước (skill `/video-kfsp`)

```
B1   — Chính tả + phiên âm
       • Update pronunciation_vi.json
       • Tạo script_display.txt + script_tts.txt
       GATE: bảng phiên âm + 2 file script

B1.5 — Tách câu + markup nhịp đọc (MỚI, bắt buộc từ 2026-04-15)
       • Parse script_display.txt → sentences.json
         [{id, phase, display, tts, main_idea, enum_items, pause_before_ms, pause_after_ms, speed}, ...]
       • Ranh giới câu = dấu chấm/?/!. Câu >25 từ → tách tại dấu phẩy trọng yếu.
       • Mỗi câu gắn main_idea (≤5 từ) — anchor cho visual ở B4.
       • Câu liệt kê → field enum_items: ["X", "Y", "Z"]
       • Script TTS markup mỗi câu:
           [s01 | pause_before=0 | pause_after=400 | speed=0.85]
           Nội dung câu, dùng "," cho nhịp 150ms, dùng "…" cho nhịp 600ms.
       GATE: bảng sentences.json (id | phase | tts | main_idea | enum? | pause)

B2   — Vbee TTS + Whisper
       MODE A — Vbee clone (final voice cho publish):
       • Loop sentences.json: gen_tts.sh cho từng câu → audio/{id}.mp3
       • Whisper per-sentence → audio/{id}.json
       • Populate duration_s, word_timestamps vào sentences.json
       MODE B — Self-recorded (anh tự thu sau, dùng Vbee Thanh Long làm timing reference):
       • Gen Vbee Thanh Long FULL audio (1 call) → audio/voice_full.mp3, speed 0.95
       • Whisper FULL → audio/voice_full.json (word_timestamps tuyệt đối)
       • Hardcode boundaries (abs_start, abs_end) per câu trong scripts/align_sentences_v2.py
         → split audio bằng `ffmpeg -ss/-to` → audio/{id}.mp3
         → populate sentences.json (duration_s + word_timestamps relative + enum_beats)
       • Whisper hay sai vài chữ tiếng Việt ("Như"→"Nhưng", "ngay"→"nay,",
         "phiếu"→"phíu", "doanh"→"dành", "xu"→"su") — KHÔNG dựa vào sequential
         token alignment, dùng manual inspection abs boundaries
       GATE: bảng {id, duration, word count, lỗi phát âm}

B3   — Screenshots/Recordings
       • Thanh drop vào folder screen-shot/
       GATE: list asset đầy đủ

B4   — Plan storyboard PER-SENTENCE
       • 1 bảng duy nhất, mỗi row = 1 câu
       • Cột: id | phase | tts | main_idea | duration | visual_anchor | animation | enum_beats | sfx
       • Enum beats: "X"@f12, "Y"@f45 (frame relative to câu, lấy từ whisper)
       • Bảng QA audit (24 mục), có 4 mục sentence-driven
       GATE: cả bảng plan + bảng audit phải duyệt

B5   — Render PER-SENTENCE + stitch (BẮT BUỘC)
       • Mỗi câu: 1 Remotion composition Sentence{ID}.tsx, durationInFrames = ceil(duration × 30)
       • Render từng câu: npx remotion render SentenceXX --output clips/{id}.mp4
       • GATE theo phase PASA: Hook → duyệt → Problem → duyệt → Agitate → duyệt → Solve → duyệt → Action → duyệt
       • Stitch: ffmpeg concat demuxer + silence padding = pause_after_ms giữa câu → final.mp4
       GATE: (1) mỗi phase PASA, (2) final stitched video

B6   — Sửa theo feedback (atomic)
       • Sửa câu X audio → re-gen TTS + whisper CHỈ câu X → re-render clip X → re-stitch
       • Sửa animation câu X → edit SentenceX.tsx → re-render clip X → re-stitch
       • KHÔNG re-render câu khác. KHÔNG re-render toàn bộ.
```

---

## 9. Remotion Stack

### Project per-video (KHÔNG share project)

- Mỗi video có folder Remotion riêng: `{video-folder}/remotion-{shortname}/`
  - `20260414-11 tieu chi fa/remotion-fa/`
  - `canslim-01-tai-sao-can-quan-tam/remotion-canslim01/`
- **Setup mới**: copy `node_modules` từ video gần nhất (tiết kiệm 2-3 phút):
  ```bash
  mkdir -p {newvideo}/remotion-{name}
  cp -R 20260414-11\ tieu\ chi\ fa/remotion-fa/node_modules {newvideo}/remotion-{name}/
  ```
- Sao chép `package.json`, `tsconfig.json`, `remotion.config.ts` từ template `remotion-fa/`
- Đổi name + port trong `package.json` script `studio`

### Port assignment (chạy song song nhiều video)

| Video | Port |
|---|---|
| canslim-01 | 3010 |
| canslim-02 | 3011 |
| canslim-03 | 3012 |
| (các video sau) | 3013+ |
| Default Remotion | 3000 — tránh dùng |

`package.json`:
```json
{ "scripts": { "studio": "npx remotion studio --port=3010" } }
```

Khi render serial nhiều clip, dùng `--port=$((3010+RANDOM%100))` để tránh va port giữa các lần render.

### Data structure mỗi remotion-{name}/src/

```
src/
├── index.ts             # registerRoot
├── Root.tsx             # Compositions list per-sentence
├── SentenceShell.tsx    # router by sentenceId → renders correct visual
├── SubtitleBar.tsx      # karaoke chunks 5-6 từ, fade 4f
├── design.ts            # COLORS, SPRINGS, SAFE_ZONE, FONT_STACK
├── types.ts             # Sentence, WordTS, EnumBeat
├── data.ts              # SENTENCES, durationFrames, audioPath
├── sentences-data.json  # copy của sentences.json (resolveJsonModule)
├── components/          # Background, Stage, Chip, MiniChart, ProgressBar
└── sentences/           # Hook.tsx, Value.tsx, CTA.tsx — exports SentenceS01..S17
```

### Output

- Render từng câu: `clips/sXX.mp4` (per-sentence preview)
- Stitch: `final_preview.mp4` (full preview)
- Audio assets via `staticFile()` từ `public/audio/sXX.mp3`

### 5 thư viện bắt buộc

| Lib | Dùng cho |
|---|---|
| `remocn` | Copy-paste motion blocks (DeviceMockupZoom, PulsingIndicator, BlurReveal...) |
| `remotion-ui` | 25+ motion components, particles, gradient animation |
| `remotion-animated` | Declarative Fade/Scale/Move gộp 1 cụm |
| `@remotion/lottie` | Animated assets từ LottieFiles |
| `@remotion/transitions` | Chuyển cảnh chuyên nghiệp |

**Luôn dùng thư viện trước khi code chay.**

### SubtitleBar component

- Word-by-word karaoke: từ đã đọc = đậm màu, chưa đọc = mờ
- 1 dòng duy nhất, `whiteSpace: "nowrap"`
- Fade in/out 4 frames

### Style Guide — Mẫu 1

- Background: dark navy `#0a1628`, radial gradient nhẹ
- Glass cards: `bg rgba(255,255,255,0.04)`, border 1px, blur 10px, radius 16px
- Highlight: green `#34d399` = tăng/positive, red `#f87171` = giảm/pain, gold `#f5c542` = nhấn mạnh

---

## 10. Known Issues & Mitigations

| Issue | Mitigation |
|---|---|
| Vbee nuốt spell-out terms | Trick dấu chấm (`Pê. E.`) hoặc phiên âm Việt thuần |
| Whisper hallucinate cuối audio | Dùng model `small` thay `base`, hoặc split audio |
| HEVC 60fps chậm trong Remotion | Pre-transcode h264 30fps: `ffmpeg -c:v libx264 -r 30 -an` |
| Plan mode restrictions | Chỉ edit plan file trong plan mode — exit trước khi sửa file khác |
| Vbee `callback_url` bắt buộc | Dùng `https://httpbin.org/post` làm placeholder |
| Whisper sai chính tả tiếng Việt ("Như"→"Nhưng", "ngay"→"nay,") | Đừng dựa sequential token alignment — hardcode `(abs_start, abs_end)` per câu trong `align_sentences_v2.py` sau manual inspection. Cho enum_beats có anchor word mistranscribed → patch index trong post-fix script |
| Sentence boundary detection (gap ≥ 400ms) | Không reliable — Vbee đôi khi không pause giữa câu liền ý. Dùng manual boundaries verified |
| Remotion port conflict khi chạy 2-3 video song song | Mỗi video 1 port (canslim-01=3010, canslim-02=3011, ...). Render: `--port=$((3010+RANDOM%100))` |
| `npm install` chậm khi setup video mới | Copy `node_modules` từ video gần nhất (`cp -R`) — tiết kiệm 2-3 phút |

---

## 11. Videos Đã Sản Xuất (Reference)

| Folder | Status | Note |
|---|---|---|
| `20260410-diem tin/` | Done | Video đầu tiên, điểm tin thị trường |
| `20260413-tam soat tang truong/` | Done audio+whisper | 98 subtitle chunks / 109.3s |
| `20260414-11 tieu chi fa/` | Đang làm | 11 tiêu chí FA, framework PASA, v2 script đã sync app |
| `20260418-rrg-hdsd/` | Done | Hướng dẫn RRG |
| `canslim-01-tai-sao-can-quan-tam/` | Preview done | Mở series CANSLIM, framework Hook-Value-CTA, voice mode self-recorded (Vbee Thanh Long làm timing), 17 câu, port 3010 |
| `canslim-02-can-3-chu-dau/` | Pending | CAN — 3 chữ đầu (planned port 3011) |
| `canslim-03-slim-4-chu-sau/` | Pending | SLIM — 4 chữ sau (planned port 3012) |

---

## 12. Nguồn Tham Khảo (Claude đọc khi cần)

```
_shared/pronunciation_vi.json          — Bảng phiên âm master
_shared/vbee/gen_tts.sh               — Script gen TTS reusable
_shared/vbee/vbee.env                 — Credentials Vbee

.claude/skills/video-kfsp/SKILL.md                  — Pipeline chuẩn 6 bước
.claude/skills/video-kfsp/PLAN_STORYBOARD_TEMPLATE.md — Template storyboard

20260414-11 tieu chi fa/PLAN_STORYBOARD.md           — Plan video PASA (good ref)
20260414-11 tieu chi fa/kich ban 11 tieu chi fa.md   — Kịch bản gốc
20260414-11 tieu chi fa/script_display.txt           — Script display v2
20260414-11 tieu chi fa/script_tts.txt               — Script TTS v2
20260414-11 tieu chi fa/remotion-fa/                  — Template Remotion (copy node_modules từ đây)

canslim-01-tai-sao-can-quan-tam/PLAN_STORYBOARD.md   — Plan video Hook-Value-CTA (teaser/reveal)
canslim-01-tai-sao-can-quan-tam/sentences.json       — Sentences với enum_beats real từ Whisper
canslim-01-tai-sao-can-quan-tam/scripts/             — run_whisper.py, align_sentences_v2.py, stitch_preview.py (reusable)
canslim-01-tai-sao-can-quan-tam/remotion-canslim01/  — Template per-sentence dark theme + Hook/Value/CTA components
```

---

## 13. Sentence-Driven Workflow (bắt buộc từ 2026-04-15)

### 6 nguyên tắc cốt lõi

**1. Cảnh theo câu, không phải câu theo cảnh.**
Mỗi câu trong kịch bản = 1 "shot" độc lập, có id (`s01`, `s02`...). Visual phải minh hoạ đúng `main_idea` của câu đó. CẤM minh hoạ chung chung "cho cả đoạn" hoặc đè visual từ câu trước sang câu sau.

**2. Liệt kê đi theo nhịp liệt kê.**
Câu có dạng "thứ nhất X, thứ hai Y, thứ ba Z" → 3 element X/Y/Z phải pop đúng tại word timestamp của "X", "Y", "Z" (lấy từ whisper, lệch ≤2 frames). CẤM stagger đều bất kể giọng.

**3. Kịch bản viết liên tục, thực thi tách câu.**
Kịch bản viết flow tự nhiên. Tách câu chỉ ở B1.5. Ranh giới câu = `. ? !`. Không tách theo dấu phẩy trừ khi câu >25 từ. Câu <6 từ + câu kế tiếp cùng ý → gộp.

**4. Gen TTS từng câu, render từng câu, stitch sau.**
Mỗi câu = 1 request Vbee riêng với `pause_before_ms`, `pause_after_ms`, `speed` override. Mỗi câu = 1 whisper json riêng. Mỗi câu = 1 Remotion composition. Mỗi câu = 1 file mp4. `ffmpeg concat` + silence padding cuối cùng.

**5. Plan toàn bộ, render dần.**
B4 (plan) lập bảng cho TẤT CẢ câu trong 1 lần. B5 (render) theo phase PASA: render hết Hook → gate → Problem → gate → ... CẤM render monolithic rồi mới sửa.

**6. Nhịp đọc & ngắt nghỉ explicit.**
Vbee SSML không ổn định → dùng **dấu phẩy** cho nhịp 150ms, **"…"** cho nhịp 600ms, và `pause_after_ms` (silence padding khi stitch) giữa câu. Mỗi câu trong `script_tts.txt` có header:
```
[s01 | pause_before=0 | pause_after=400 | speed=0.85]
Nội dung câu.
```

### Sentence as Atomic Unit — pipeline diagram

```
KỊCH BẢN (viết liên tục)
    ↓  B1.5: tách câu + gắn main_idea
sentences.json
    ↓  B2: gen Vbee + whisper PER-SENTENCE
audio/s01.mp3 + audio/s01.json, ...
    ↓  B4: plan storyboard PER-SENTENCE
PLAN_STORYBOARD.md (bảng sentence-driven)
    ↓  B5: render từng câu, gate theo phase PASA
clips/s01.mp4, clips/s02.mp4, ...
    ↓  ffmpeg concat demuxer + silence padding
final.mp4
```

**Lợi ích**: Sửa câu N → re-gen TTS câu N → re-render clip N → re-stitch. Không ảnh hưởng câu N-1, N+1.

### Schema `sentences.json`

```json
{
  "videoId": "20260420-ten-video",
  "framework": "PASA",
  "sentences": [
    {
      "id": "s01",
      "phase": "HOOK",
      "display": "Bạn có thấy choáng khi mở bảng giá?",
      "tts": "Bạn có thấy choáng khi mở bảng giá?",
      "main_idea": "choáng khi mở bảng",
      "enum_items": null,
      "pause_before_ms": 0,
      "pause_after_ms": 300,
      "speed": 0.9,
      "duration_s": null,
      "word_timestamps": null
    },
    {
      "id": "s02",
      "phase": "PROBLEM",
      "display": "Thứ nhất tăng trưởng doanh thu, thứ hai tăng trưởng lợi nhuận, thứ ba tăng trưởng EPS.",
      "tts": "Thứ nhất tăng trưởng doanh thu, thứ hai tăng trưởng lợi nhuận, thứ ba tăng trưởng E. P. S.",
      "main_idea": "3 trục tăng trưởng",
      "enum_items": ["doanh thu", "lợi nhuận", "EPS"],
      "pause_before_ms": 0,
      "pause_after_ms": 500,
      "speed": 0.85,
      "duration_s": null,
      "word_timestamps": null
    }
  ]
}
```

B2 populate `duration_s` và `word_timestamps` sau khi Vbee + Whisper xong.

### Folder structure 1 video (từ 2026-04-15)

```
{name-of-video}/
├── script_display.md           ← chính tả đúng (subtitle)
├── script_tts.txt              ← script gửi Vbee (placeholder hoặc final)
├── sentences.json              ← B1.5 (populated dần qua các bước)
├── PLAN_STORYBOARD.md          ← B4
├── screen-shot/                ← B3 assets
├── audio/
│   ├── voice_full.mp3          (mode B: Vbee Thanh Long full call)
│   ├── voice_full.json         (mode B: Whisper full output)
│   ├── s01.mp3 ... s17.mp3     (split per câu — cả 2 mode)
│   └── (về sau: voice_self.mp3 = anh thu, voice_self.json)
├── scripts/
│   ├── run_whisper.py
│   ├── align_sentences_v2.py   (hardcode boundaries)
│   └── stitch_preview.py
├── remotion-{shortname}/       ← per-video Remotion project
│   ├── package.json            (port riêng)
│   ├── node_modules/           (copy từ video trước)
│   ├── public/audio/           (copy từ ../audio/)
│   └── src/
├── clips/                      ← per-sentence render (xoá được sau khi có final)
│   └── s01.mp4 ... s17.mp4
└── final_preview.mp4           ← stitched preview
```

### Rule pause_after_ms (tham khảo)

| Ngữ cảnh | pause_after_ms |
|---|---|
| Cuối phase (HOOK→PROBLEM, PROBLEM→AGITATE…) | 600–800 |
| Cuối câu bình thường | 250–400 |
| Giữa 2 câu cùng ý, liệt kê nối tiếp | 150–200 |
| Câu chốt CTA | 0 (không cần pause cuối) |

### Rule main_idea

- ≤5 từ
- Là keyword anchor cho visual editor
- Không được trùng với câu trước hoặc câu sau
- Nếu 2 câu có main_idea giống → merge thành 1 câu hoặc đổi main_idea 1 câu

### Rule enum_items

- Câu chứa "thứ nhất/thứ hai/thứ ba" hoặc cấu trúc ", ..., ... và ..."
- List các item theo đúng thứ tự đọc
- Editor phải pop element đúng word timestamp của từng item (B4 populate `enum_beats`)
- Schema mỗi beat: `{item, anchor_word, rel_start_s, frame_30fps}`. Khi Whisper sai chính tả (anchor "doanh" → whisper "dành"), patch trực tiếp `frame_30fps` qua post-fix script — visual vẫn pop đúng nhịp giọng vì frame là từ Vbee timing thật.

---

## 14. Quick Setup New Video (cheatsheet)

```bash
# 1. Tạo folder + script display
NAME="canslim-04-lo-trinh-f0"
SHORT="canslim04"
PORT=3013   # tăng 1 so với video trước
mkdir -p "$NAME"/{audio,scripts,screen-shot,clips}

# 2. Viết script_display.md + sentences.json (B1, B1.5)

# 3. Mode B (anh tự thu): Gen Vbee Thanh Long timing reference
cd "$NAME"
bash ../_shared/vbee/gen_tts.sh script_tts.txt audio/voice_full.mp3 0.95 hn_male_thanhlong_talk_48k-fhg

# 4. Whisper + align (copy scripts từ canslim-01)
cp ../canslim-01-tai-sao-can-quan-tam/scripts/{run_whisper,align_sentences_v2,stitch_preview}.py scripts/
python3 scripts/run_whisper.py
# Manual inspect audio/voice_full.json → update BOUNDARIES dict in align_sentences_v2.py
python3 scripts/align_sentences_v2.py

# 5. Setup Remotion (copy từ canslim-01)
cp -R ../canslim-01-tai-sao-can-quan-tam/remotion-canslim01 "remotion-$SHORT"
cd "remotion-$SHORT"
# Sửa package.json: name + port=$PORT
# Copy audio + sentences-data.json fresh
cp ../audio/s*.mp3 public/audio/
cp ../sentences.json src/sentences-data.json
# Adapt sentences/ visuals theo storyboard mới

# 6. Render
for i in 01 02 ... ; do npx remotion render "Sentence-s$i" "../clips/s$i.mp4" --port=$((PORT+RANDOM%100)); done

# 7. Stitch
cd ..
python3 scripts/stitch_preview.py
```

---

## 15. Agent Prompt — Sản xuất video KFSP (self-contained, copy-paste cho agent khác)

> Block dưới đây là prompt độc lập, đủ ngữ cảnh để bất kỳ agent (Claude, GPT, Cursor…) nào cũng có thể tiếp nhận và làm video đúng convention KFSP. Khi anh muốn nhờ agent khác làm video #02, #03… thì copy nguyên block + đính kèm `script_display.md`.

````
# PROMPT: Sản xuất video TikTok cho KFSP — series CANSLIM/Foundations

## 1. Bối cảnh
- User: Thanh, CEO của KFSP (app phân tích chứng khoán VN).
- Đối tượng xem: F0 nhà đầu tư mới + tay ngang. Tông "anh bạn trader cà phê" — đồng cảm, không xúc phạm, không formal.
- Format: TikTok 1080×1920 portrait, 30fps. Mỗi video 75-90s.
- Stack: Remotion 4 + ffmpeg + Whisper (Python) + Vbee TTS (placeholder).

## 2. Đầu vào bạn nhận
1. Folder video, ví dụ `canslim-02-can-3-chu-dau/`, đã có sẵn `script_display.md` (kịch bản chính tả đúng).
2. Số thứ tự video trong series (để chọn port Remotion: canslim-01=3010, canslim-02=3011, ...).
3. Voice mode:
   - **A. Vbee clone** (`n_hanam_male_kfspthanh20260411135755079_education_vc`) — final voice publish.
   - **B. Self-recorded** (Vbee `hn_male_thanhlong_talk_48k-fhg` placeholder cho timing, anh thu đè sau).

## 3. Đầu ra cuối cùng
- Remotion Studio chạy ở port video → user xem live preview tại `http://localhost:{port}`.
- Compositions: 1 `FullPreview` (Series chuỗi 17 câu + silence padding) + N `Sentence-sXX` cho từng câu inspect.
- Render `.mp4` chỉ khi user yêu cầu (default xem qua Studio).
- KHÔNG được render monolithic — phải per-sentence + ffmpeg concat.

## 4. Pipeline 6 bước (DỪNG cuối mỗi bước, chờ user duyệt)

### B1 — Chính tả + phiên âm
- Đọc `script_display.md`, list các từ Vbee có thể đọc sai (CANSLIM, William O'Neil, MA, %, EBITDA, ROE, CAN, SLIM…).
- Tạo `script_tts.txt` áp dụng phiên âm: `Can Slim` (2 từ), `Uy-li-am Ô Nin`, `Em A`, `phần trăm`, `Pê. E.`, `R-O-E`, `Ê bít đa`.
- KHÔNG nhắc KFSP / bio trong video Foundations — chỉ CTA cuối.
- **GATE:** bảng phiên âm + 2 file script.

### B1.5 — Tách câu → sentences.json
- Ranh giới câu = `. ? !`. Câu >25 từ tách tại dấu phẩy trọng yếu. Câu <6 từ + câu kế tiếp cùng ý → gộp.
- Schema mỗi câu: `{id: "s01"|"s02"..., phase: "HOOK"|"VALUE"|"CTA", display, tts, main_idea (≤5 từ, không trùng câu khác), enum_items: string[]|null, pause_before_ms, pause_after_ms (250-700ms), speed: null}`.
- pause_after_ms: cuối phase 600-800, cuối câu 250-400, giữa câu liền ý 150-200, câu chốt CTA = 0.
- enum_items: liệt kê "thứ nhất/hai/ba" hoặc ", ..., ... và ..." → list theo thứ tự đọc.
- **GATE:** bảng `{id, phase, tts, main_idea, enum?, pause}`.

### B2 — Vbee TTS + Whisper
- Mode A: per-sentence Vbee → audio/sXX.mp3 + Whisper → audio/sXX.json.
- **Mode B (mặc định cho Foundations):** Vbee Thanh Long FULL audio (1 call, speed 0.95) → audio/voice_full.mp3 → Whisper full → audio/voice_full.json. Sau đó hardcode `(abs_start, abs_end)` per câu trong `scripts/align_sentences_v2.py` (manual inspection vì Whisper hay sai: "Như"→"Nhưng", "ngay"→"nay,", "phíu", "doanh"→"dành"). Split audio bằng `ffmpeg -ss/-to`.
- Populate `duration_s`, `abs_start_s`, `abs_end_s`, `word_timestamps` (relative), `enum_beats[].frame_30fps` vào sentences.json. Khi enum anchor whisper sai (vd "doanh"→"dành"), patch index trong post-fix script — visual vẫn pop đúng nhịp giọng vì frame là từ Vbee timing thật.
- **GATE:** bảng `{id, duration, words, lỗi phát âm}`.

### B3 — Assets
- User drop screenshots/recordings vào `screen-shot/`. Pre-transcode HEVC 60fps → h264 30fps: `ffmpeg -i in.MP4 -c:v libx264 -r 30 -an out.mp4`.
- Logo KFSP đã có sẵn trong template (`logo new color.png`).
- **GATE:** list asset đầy đủ.

### B4 — PLAN_STORYBOARD.md (sentence-driven)
- 1 bảng duy nhất 17 row, cột: `id | phase | frames | display | main_idea | visual_anchor | animation/easing | enum_beats | sfx`.
- Visual phải minh hoạ đúng `main_idea` câu đó. CẤM cảnh đè sang câu kế tiếp.
- enum_beats: pop element đúng word timestamp (lệch ≤2 frames).
- QA audit 24 mục: sentence-driven, easing không linear, safe zone, subtitle karaoke, layout không đè asset, voice/stitch, render gate.
- **GATE:** plan + audit duyệt.

### B5 — Render PER-SENTENCE
- Setup Remotion project: `cp -R {video-cũ}/remotion-{x}/node_modules {video-mới}/remotion-{shortname}/`. KHÔNG `npm install`.
- Update `package.json` script `studio: npx remotion studio --port={port}`.
- Build src/{Root, SentenceShell, FullPreview, SubtitleBar, design, types, data, components/, sentences/Hook+Value+CTA}.
- Render từng câu: `npx remotion render "Sentence-s01" "../clips/s01.mp4" --port=$((port+RANDOM%100))`.
- **GATE per phase** (Hook → duyệt → Value → duyệt → CTA → duyệt → final).
- Stitch: `ffmpeg -f concat` + silence pad từ `pause_after_ms`.

### B6 — Atomic edits
- Sửa câu X audio → re-gen TTS + whisper CHỈ câu X → re-render clip X → re-stitch.
- KHÔNG re-render câu khác. KHÔNG re-render toàn bộ.

## 5. Design System (tuân thủ chính xác)

```ts
// design.ts
COLORS = {
  bgPrimary:  "#03100a",   // gần đen, ám forest green
  bgGradient: "#0a2418",   // tâm radial vignette
  bgPanel:    "rgba(255,255,255,0.04)",
  border:     "rgba(255,255,255,0.10)",
  // accent
  gold:       "#f5c542",   // SLIM brand, nhấn mạnh, PHẢN ỨNG THỊ TRƯỜNG
  purple:     "#a78bfa",   // CAN brand, KFSP, CHẤT XÚC TÁC, NỘI TẠI
  green:      "#34d399",   // positive, growth
  red:        "#f87171",   // pain, negative
};
SAFE_ZONE = {
  top: 150, bottom: 1500, left: 60, right: 1020,
  contentTop: 280, contentBottom: 1340,
  subtitleTop: 1380, subtitleBottom: 1470, progressBarY: 1490,
};
SPRINGS = {
  heavy:    {damping:20, stiffness:80,  mass:1.2},  // pain, áp lực
  resolve:  {damping:12, stiffness:250},            // snap
  calm:     {damping:18, stiffness:180},            // pro smooth
  soft:     {damping:22, stiffness:120},            // soft landing
  decisive: {damping:14, stiffness:300},            // CTA
  zoom:     {damping:25, stiffness:60},             // dolly
};
// CẤM linear easing — luôn ease-out hoặc spring
```

Background CSS: `radial-gradient(circle at 50% 40%, #0a2418 0%, #03100a 70%)`.

## 6. Convention màu CANSLIM (ràng buộc series)
- **NỘI TẠI = purple** (CAN = 3 chữ đầu = CHẤT XÚC TÁC, sức mạnh nội tại doanh nghiệp).
- **THỊ TRƯỜNG = gold** (SLIM = 4 chữ sau = PHẢN ỨNG THỊ TRƯỜNG, lực kéo bên ngoài).
- 7 chữ CANSLIM: cards 3 purple + 4 gold = chemistry metaphor (xúc tác + phản ứng).

## 7. Subtitle karaoke
- Dùng `sentence.display` (chính tả đúng) làm text, KHÔNG dùng `tts` (Vbee tricks).
- Map display tokens → word_timestamps (Whisper). Nếu count khớp → 1-1; lệch → distribute đều theo time span.
- Chunks 5-6 từ, 1 dòng, `whiteSpace: nowrap`. Font auto-scale: `min(42, 960/words × 0.85)`.
- Highlight màu keyword: gold (nhấn), green (positive), red (pain), purple (brand/CANSLIM).
- Fade in/out 4 frames mỗi đầu/cuối chunk.
- Vị trí y=1380-1470.

## 8. Logo KFSP top
- File: `public/logo-kfsp.png`. Dùng `<Img src={staticFile("logo-kfsp.png")} />` size 78×78.
- Filter: `brightness(0) invert(1) drop-shadow(0 0 12px rgba(255,255,255,0.4))` → silhouette trắng.
- Text "KFSP" trắng dưới logo, fontSize 24, letterSpacing 5.
- Y=158 (trong safe zone top 150-280).

## 9. Remotion Compositions
- 1 Composition `Sentence-sXX` per câu, durationInFrames = ceil(duration_s × 30).
- 1 Composition `FullPreview`: dùng `<Series>` chuỗi `<Series.Sequence durationInFrames={sentence + pause}>` cho mỗi câu, audio nằm trong SentenceShell (Series tự dừng audio cuối sequence → silence pause tự nhiên).
- ProgressBar tách OUT khỏi SentenceShell (vì useCurrentFrame trong Series.Sequence là local) → wrap riêng ở level SentenceCompo + FullPreview.

## 10. Lỗi thường gặp + fix
| Issue | Fix |
|---|---|
| Whisper sai chính tả tiếng Việt | Hardcode `(abs_start, abs_end)` per câu trong `align_sentences_v2.py`, patch enum_beats nếu anchor sai |
| Sentence boundary detection (gap ≥400ms) không reliable | Dùng manual boundaries verified, không dựa gap auto |
| Port Remotion conflict khi 2-3 video song song | Mỗi video 1 port (canslim-01=3010+). Render: `--port=$((port+RANDOM%100))` |
| `npm install` chậm | Copy `node_modules` từ video gần nhất, không install fresh |
| Vbee `callback_url` bắt buộc | Dùng `https://httpbin.org/post` placeholder |
| Vbee nuốt từ tiếng Anh (KFSP, MA, FA) | Trick phiên âm Việt: "KFS B", "Em A", "Ép. A.", "Pê. E." |
| Linear easing | CẤM — chỉ ease-out hoặc spring presets |
| Render monolithic | CẤM — phải per-sentence + ffmpeg concat |

## 11. Tham chiếu
- Template gốc: `canslim-01-tai-sao-can-quan-tam/` — đầy đủ scripts, sentences.json, remotion-canslim01/, PLAN_STORYBOARD.md.
- Quick setup: copy node_modules + adapt sentences/Hook,Value,CTA.tsx theo storyboard mới + đổi port + đổi sentences-data.json.
````

