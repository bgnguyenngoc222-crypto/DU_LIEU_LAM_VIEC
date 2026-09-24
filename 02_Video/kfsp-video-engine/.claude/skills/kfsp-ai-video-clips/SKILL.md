---
name: kfsp-ai-video-clips
description: >
  Dựng video AI cho KFSP: gen nhiều clip AI text-to-video (Gemini Veo, Kling, Seedance) rồi GHÉP thành 1 video liền mạch — KHÔNG chữ trên hình. Khoá style nhất quán (STYLE LOCK + cùng seed/tỷ lệ/fps + last-frame chaining), GIỮ ambient audio AI gen (đẩy lên làm nền), kết bằng cú chuyển "đồ thị nến cổ → app KFSP thật". Có thể phủ voiceover rời (sync theo mốc giọng) — nhưng đây vẫn là BẢN NỀN để Thanh edit tiếp ở editor.
  RANH GIỚI: skill này = giai đoạn VIDEO AI (gen clip + ghép base, không subtitle chữ). KHÁC video-kfsp = pipeline Remotion + TTS + SUBTITLE chữ trên màn kiểu TikTok.
  TRIGGERS: "video AI", "video Gemini/Veo/Omni", "video Kling", "video Seedance", "clip AI ghép lại", "cinematic AI video", "text-to-video", "prompt video AI", "nối clip AI thành 1 video", "ghép clip AI có voiceover".
  KHÔNG trigger cho: video cần SUBTITLE chữ trên màn (→ video-kfsp), prompt HÌNH tĩnh (→ kfsp-image-brief), kịch bản chữ (→ vlog-script).
---

> **Bối cảnh KFSP:** đọc `02_Marketing/KFSP_MARKETING_CONTEXT.md` (brand voice + rule cứng) trước khi sản xuất. Brand spine bắt buộc cuối video: **"Chứng khoán trong tầm tay" / "Đưa chứng khoán về tầm tay bạn"**.

# KFSP AI Video Clips — sinh & ghép video AI không lời

Biến 1 ý tưởng/câu chuyện thành **một video ngắn cinematic** ghép từ nhiều clip AI text-to-video, **không giọng, không chữ trên hình**, nhất quán style, kết bằng brand reveal KFSP.

## Khi dùng / không dùng

| Dùng skill này | Dùng skill khác |
|---|---|
| Video AI: gen + ghép clip (Veo/Kling/Seedance), **không subtitle chữ trên màn** | Video cần **subtitle chữ chuẩn TikTok** → **`video-kfsp`** (Remotion + TTS) |
| Giữ ambient AI gen + (tuỳ chọn) phủ voiceover rời — ra **bản nền để edit tiếp** | Kịch bản chữ/voiceover → **`vlog-script`** |
| Cần ghép nhiều clip 5–8s thành 1 video liền mạch | Hình tĩnh/cover/infographic → **`kfsp-image-brief`** |

## 5 nguyên tắc NHẤT QUÁN (xương sống của skill)

1. **STYLE LOCK** — 1 khối mô tả art-direction **dán y nguyên vào đầu MỌI prompt clip** (style + palette + mood + nhân vật + "no text/no captions/no UI" + tỷ lệ + fps). Đây là thứ giữ 6 clip trông như 1 phim.
2. **Cùng thông số kỹ thuật** — mọi clip cùng **tỷ lệ** (9:16 dọc mặc định / 16:9 nếu YouTube), **fps** (24), **độ dài** (~5–8s), và **cùng seed** nếu nền tảng cho nhập.
3. **Last-frame chaining** — xuất clip N → lấy **khung hình cuối** làm ảnh khởi đầu (image-to-video) cho clip N+1. Cách chống "đổi mặt / đổi cảnh" của AI video.
4. **Nhân vật = SILHOUETTE không mặt** — AI giữ silhouette nhất quán tốt hơn nhiều so với mặt người chi tiết (và khớp rule KFSP "no detailed faces").
5. **No subtitle-text trên hình; GIỮ ambient; voiceover tuỳ chọn** — KHÔNG nướng chữ/subtitle/logo vào clip AI (chữ + logo + brand spine thêm ở **editor**). **GIỮ ambient audio AI gen** (Veo gen tiếng minh hoạ khá tốt → đẩy lên làm nền, đừng `-an`). Có thể phủ **voiceover rời** (sync theo mốc giọng — xem mục dưới), nhưng output luôn là **bản nền để Thanh edit tiếp**.

## Quy trình 6 bước

**Bước 0 — Bẻ câu chuyện thành BEAT.** 1 beat = 1 clip ~5–8s. Video 40–50s ≈ **6 clip**. Mỗi beat 1 ý hình rõ (mở → các ý giữa → đóng + brand reveal).

**Bước 1 — Viết STYLE LOCK** (xem template dưới). Khoá: phong cách (cinematic thực / ukiyo-e / flat-vector…), bảng màu, ánh sáng (lưu ý đúng bối cảnh — vd. chợ gạo Nhật giao dịch **buổi sáng**), mood, "characters are rim-lit SILHOUETTES no detailed faces", "NO text, NO captions, NO words, NO subtitles, NO UI", tỷ lệ + fps.

**Bước 2 — Viết prompt từng clip** = `[STYLE LOCK]` + **cảnh** + **chuyển động camera** (slow dolly / gentle pan / parallax / pull-back — chậm, không cắt giật trong 1 clip).

**Bước 3 — Sinh & chain.** Gen clip 1 → lấy frame cuối → image-to-video cho clip 2 → … Soi từng clip: **nền tảng hay tự chèn chữ → gen lại** clip nào lòi chữ.

**Bước 4 — Brand reveal cuối (KHÔNG để AI bịa UI app).** AI chỉ lo morph nghệ thuật → đồ thị nến hiện đại trên **điện thoại generic, không logo/UI**. Cảnh **app KFSP thật** = quay **screen-recording app thật**, ghép ở editor bằng **match-cut** (căn cùng vị trí điện thoại/đồ thị để cú cắt liền mạch "xuyên thời gian"). Không có app thật → dùng screenshot store/Remotion mock 2–3s.

**Bước 5 — Ghép + brand.** Xuất `01..0N.mp4` cùng tỷ lệ/fps. Ghép CapCut/ffmpeg, crossfade ~0.4s (AI hay khựng mép). **Nhạc nền không lời** hợp tông. **3 giây cuối:** overlay logo tím KFSP + "Chứng khoán trong tầm tay" (brand spine — overlay brand, không tính là "text nội dung").

## STYLE LOCK — template (điền {{ }})

```
{{Cinematic painterly | Cinematic ukiyo-e woodblock | Flat-vector editorial}} animation,
{{bối cảnh: vd 18th-century Japanese rice-market town}}, {{ánh sáng: early MORNING golden light}}.
Palette: {{vd indigo, ink-black, vermilion red, gold leaf, off-white paper}}.
{{đặc tả style: bold woodblock linework, layered flat planes, cinematic depth, drifting mist, paper grain, like a living woodblock print}}.
Characters are stylized SILHOUETTES with no detailed faces. Subtle cool purple accent in the sky.
NO text, NO captions, NO words, NO subtitles, NO UI overlays. {{9:16 vertical | 16:9}}, 24fps.
```

## Prompt 1 clip — template

```
[STYLE LOCK] {{cảnh: chủ thể + hành động + bối cảnh}}. {{chuyển động camera: slow dolly-in / gentle parallax pan / elegant pull-back}}. No text, no captions.
```

## Negative prompt (BẮT BUỘC cho Kling / Seedance — nền tảng có ô negative riêng)

```
text, words, letters, captions, subtitles, watermark, logo, signature, UI, interface,
distorted faces, deformed hands, extra fingers, blurry, low quality, flicker
```

## Khác biệt nền tảng

| Nền tảng | Độ dài/clip | Image-to-video (chain) | Seed | Ô negative riêng | Lưu ý |
|---|---|---|---|---|---|
| **Gemini Omni / Veo** | ~8s | Có (first frame) | Tuỳ bản | Không — nhồi "no text" vào prompt | Cinematic đẹp; **hay tự chèn chữ** → lặp "NO text" + soi lại |
| **Kling** | 5–10s | **Mạnh** (start + END frame) | Có | **Có** | Hợp giữ nhất quán + điều khiển chuyển động; dùng end-frame để khớp clip sau |
| **Seedance (ByteDance)** | ~5–10s, multi-shot | Có (reference) | Có | **Có** | Tốt cho stylized/ukiyo-e; đặt style + negative chặt |

> Mọi nền tảng: **silhouette + STYLE LOCK + cùng seed + chain frame** là combo giữ nhất quán. Nền tảng có negative prompt thì luôn dán khối negative ở trên.

## Ghép — ffmpeg nhanh (hard-cut)

```
printf "file '01.mp4'\nfile '02.mp4'\nfile '03.mp4'\nfile '04.mp4'\nfile '05.mp4'\nfile '06.mp4'\n" > list.txt
ffmpeg -f concat -safe 0 -i list.txt -c copy out.mp4
```
Muốn crossfade: ghép từng cặp bằng filter `xfade` (offset = độ dài clip − 0.4), hoặc dựng trong CapCut cho nhanh.

## Hình asset cho clip (base-frame / cảnh chèn) — 🔴 KHÔNG logo, KHÔNG text

Khi sinh **hình** làm base-frame (last-frame chaining) hoặc cảnh chèn cho clip AI:
- **KHÔNG logo, KHÔNG title, KHÔNG chữ** trong hình — logo + mọi chữ thêm ở **editor** (Canva/Remotion/CapCut) sau.
- Bỏ dòng `TITLE (...)` và `KFSP logo ...` khỏi prompt hình; thêm "no text, no logo, no captions, no UI" vào ràng buộc.
- Chừa **khoảng trống** (negative space) ở vùng sẽ đặt chữ/logo về sau.
- Lý do: clip ghép + overlay động ở editor; chữ/logo nướng cứng vào hình sẽ lệch khi cắt/crossfade và khoá cứng 1 ngôn ngữ.
- (Khác `kfsp-image-brief` Kiểu 1-4 mặc định CÓ logo+tít cho ảnh đăng tĩnh; ở pipeline video luôn dùng nhánh **no text + no logo**.)

## Rule cứng KFSP

- **Brand spine cuối video** (overlay): "Chứng khoán trong tầm tay" / "Đưa chứng khoán về tầm tay bạn".
- Bản **brand** (fanpage KFSP) có logo cuối; bản **nobrand** ("Chứng khoán trong tầm tay" faceless) bỏ tên KFSP, chỉ overlay câu spine. Xem `02_Marketing/content-automation/CHANNELS.md`.
- KHÔNG % lợi nhuận, KHÔNG mã CK cụ thể, KHÔNG get-rich, KHÔNG mặt người chi tiết.
- KHÔNG để AI bịa UI app KFSP — app thật = screen-recording ghép editor.
- Đúng bối cảnh lịch sử/sự thật (vd. sàn gạo Dojima giao dịch **ban ngày**, không phải đêm).

## Anti-patterns

| ❌ Sai | ✅ Đúng |
|---|---|
| Mỗi clip 1 art-direction khác nhau | STYLE LOCK dán y nguyên mọi clip |
| Nhân vật có mặt chi tiết | Silhouette không mặt (AI giữ nhất quán hơn) |
| Để AI tự render "app KFSP" | AI lo morph generic → app thật ghép match-cut |
| Quên "no text" → clip lòi chữ | Lặp "NO text/captions/UI" + negative prompt + soi lại |
| Ghép clip khác tỷ lệ/fps | Khoá cùng 9:16 (hoặc 16:9) + 24fps từ đầu |
| Cảnh đêm cho chợ gạo (sai sử) | Buổi sáng đúng bối cảnh giao dịch |
| Nhồi brand spine thành text giữa clip | Brand spine = overlay 3s cuối ở editor |
| Viết "candlestick" trần → AI ra nến sáp có lửa | "stock-market candlestick chart bar, rectangular body + wicks, NOT a wax candle, no flame" + negative `wax candle, flame, fire` |
| Chia đều thời lượng clip cho khớp giọng | Transcribe giọng (Whisper) lấy mốc THẬT từng câu → map cảnh ↔ câu |
| Lấy AUDIO làm master, cắt clip theo giọng | 🔴 VIDEO là master; voiceover rải lên, clip chạy ĐỦ |
| Trim clip từ giây 0 → rụng action muộn (mưa/chim ở cuối) | Phát FULL clip; phân tích frame (Bước 0) để biết action ở đâu |
| Ghép mà chưa xem clip gen ra gì | Bước 0: contact sheet frame giữa+cuối, Read để soi nội dung |
| Cắt clip ngắn bằng đúng câu Vbee → cảnh chớp qua, hụt thông tin | `clip_dur = max(clip_gốc, lead+câu+nghỉ)`; dài hơn clip → slow-mo |
| `-an` bỏ audio ambient Gemini gen kèm | GIỮ ambient từng clip, mix ~20% dưới voiceover |
| Giãn/đổi tốc độ giọng để khớp hình | Giữ nguyên giọng, **chèn khoảng lặng giữa câu** để khớp nhịp hình |

## Reference — ví dụ đã làm (đóng băng 25/06/2026)

**Video "Homma & hệ thống thông tin nến Nhật"** (style Cinematic ukiyo-e, 6 clip, 9:16, không lời/không chữ):
- Beat: ① cuộn nến mở · ② Tầng 1 mùa vụ/thời tiết · ③ Tầng 2 truyền tin cờ hiệu · ④ Tầng 3 tâm lý đám đông (sóng tham/sợ) · ⑤ Tầng 4 đưa tất cả lên 1 trang · ⑥ chim báo bão → đồ thị hiện đại trên điện thoại generic → **match-cut sang app KFSP thật**.
- Nguồn nội dung: `02_Marketing/content-automation/idea-bank/drafts/2026-06-25-fanpage-homma-he-thong-thong-tin-chim-bao-bao.md` (mục PHIÊN BẢN VIDEO) + idea-fit `IF-2026-027` Angle 3.

## 🟢 Gen tự động qua Gemini API — Veo 3.1 Lite (đã verify 26/06/2026)

Cách rẻ nhất + nhanh nhất để gen clip không cần Kling/Seedance thủ công. **Veo 3.1 Lite = $0.05/giây** (rẻ nhất, audio gộp sẵn) → clip 8s ≈ **$0.40 (~10k VNĐ)**.

**Chốt cấu hình KFSP:**
- **Model rẻ nhất:** `veo-3.1-lite-generate-preview` (mặc định dùng cái này). Mức trên: `veo-3.1-fast-generate-preview` ($0.10/s). ⚠️ `veo-2.0` / `veo-3.0` **khai tử 30/06/2026** — đừng dùng.
- **Audio:** để **bình thường** (mặc định Veo tự tạo). Tắt audio KHÔNG giảm tiền (Gemini API chỉ 1 mức giá) → không cần `generateAudio:false`.
- **Tỷ lệ:** `aspectRatio:"9:16"` · ra **720×1280 · 24fps · 8s**.
- **API key:** key Gemini của Thanh (project đã bật **billing** — Veo KHÔNG có free tier, free = lỗi 429).
  🔴 **Từ 06/08/2026 khoá đã lưu tại `~/Desktop/VIDEO KFSP/_shared/gemini/gemini.env`** (quyền 600, nằm NGOÀI OneDrive và ngoài git, đặt cạnh `vbee.env` theo đúng nếp đã có). Lấy ra bằng `set -a; source ~/Desktop/"VIDEO KFSP"/_shared/gemini/gemini.env`. Tệp đó giữ luôn `VEO_MODEL`. **Đừng chép giá trị khoá vào bất kỳ tệp nào khác**, nhất là tệp trong workspace KFSP vì workspace đồng bộ OneDrive.

**Script (gen → poll → tải → mở):**
```bash
export GEMINI_API_KEY='...' # key Thanh, billing ON
MODEL="veo-3.1-lite-generate-preview"
BASE="https://generativelanguage.googleapis.com/v1beta"
PROMPT='[STYLE LOCK + mô tả clip ...]'
# 1) Gửi lệnh (predictLongRunning trả operation name)
OP=$(curl -s "$BASE/models/$MODEL:predictLongRunning" -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg p "$PROMPT" '{instances:[{prompt:$p}],parameters:{aspectRatio:"9:16",sampleCount:1}}')" | jq -r '.name')
# 2) Poll mỗi 12s (Veo render ~36-60s)
while :; do sleep 12
  R=$(curl -s "$BASE/$OP" -H "x-goog-api-key: $GEMINI_API_KEY")
  [ "$(echo "$R" | jq -r '.done // false')" = "true" ] && break; done
# 3) Tải về (URI cần kèm header key)
URI=$(echo "$R" | jq -r '.response.generateVideoResponse.generatedSamples[0].video.uri')
curl -s -L "$URI" -H "x-goog-api-key: $GEMINI_API_KEY" -o ~/Downloads/clip.mp4
```

**Bẫy đã gặp (đừng lặp):**
- `read -r -d '' PROMPT <<EOF` dưới `set -e` → `read` trả exit 1 → **giết script ngay**. Dùng biến `PROMPT='...'` thường, đừng heredoc-read.
- Model id phải lấy từ `GET /v1beta/models?pageSize=200` → lọc `veo`. `veo-3.0-generate-preview` **404** (đúng là `veo-3.0-generate-001`); bản 3.1 là `-preview`.
- Free tier → **429 RESOURCE_EXHAUSTED** ("check your plan and billing"): phải bật billing project gắn key.
- URI tải về phải kèm `-H "x-goog-api-key"` (không thì 403).
- "Candlestick" hay bị AI hiểu thành **nến sáp có lửa** → ghi rõ *"stock-market price candlestick bar, rectangular body with wicks, NOT a wax candle, no flame"*.

**Giá tham chiếu (720p, mỗi giây, audio gộp):** Veo 3.1 Lite **$0.05** · Veo 3.1 Fast $0.10 · Veo 3 Fast $0.10 · Veo 3 $0.40. → cả bộ 10 clip N1–N10 bằng Lite ≈ **$4 (~100k)**.

## 🟢 Ghép có voiceover — 🔴 VIDEO LÀ MASTER, không cắt theo giọng (verify 26/06/2026)

🔴 **Nguyên tắc gốc: VIDEO là master, KHÔNG cắt clip sát theo audio TTS.** Veo gen hình minh hoạ có *mạch truyện riêng* (vd. clip thời tiết: nắng ở đầu → **mưa ở cuối**). Cắt clip ngắn theo câu Vbee = **chém mất phần minh hoạ đắt** (cắt từ giây 0 → rụng action xuất hiện muộn). Voiceover RẢI LÊN video, không phải ngược lại. Output là **bản nền đầy đủ footage để Thanh edit/tỉa tiếp**.

**Bước 0 — 🔴 PHÂN TÍCH clip gốc trước khi ghép.** Trích frame để "xem" từng clip có gì + action nằm ở đâu (đầu/giữa/cuối). Contact sheet 2 frame/clip (giữa + gần cuối, bắt action muộn):
```bash
for f in clip*.mp4; do dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  ffmpeg -y -ss $(awk "BEGIN{print $dur/2}")  -i "$f" -frames:v 1 -vf scale=190:-1 "${f%.mp4}_mid.png"
  ffmpeg -y -ss $(awk "BEGIN{print $dur-1}") -i "$f" -frames:v 1 -vf scale=190:-1 "${f%.mp4}_late.png"; done
# hstack từng cặp → vstack 4 hàng → 1 lưới, rồi Read lưới để soi nội dung
```
Mục tiêu: (1) xác nhận clip đúng beat/đúng nội dung câu nói; (2) thấy action muộn (mưa, chim, morph) → biết clip phải chạy ĐỦ, không trim đầu.

**Bước 1 — Mốc giọng THẬT.** Whisper (`openai-whisper` có sẵn trên mac) lấy start/end từng câu:
```python
import whisper, json
segs = whisper.load_model('small').transcribe('vo.mp3', language='vi')['segments']
json.dump([{'s':round(x['start'],2),'e':round(x['end'],2),'t':x['text'].strip()} for x in segs], open('seg.json','w'), ensure_ascii=False, indent=1)
```

**Bước 2 — Map 1 cảnh ↔ 1 câu (hoặc cụm câu)**, cắt audio ở RANH GIỚI CÂU (điểm lặng) để không chém mid-word.

**Bước 3 — 🔴 Clip LUÔN chạy đủ.** `clip_dur = max(clip_gốc, LEAD 0.5 + câu + PAUSE 1.2)`:
- Hầu hết câu ngắn hơn clip → `clip_dur = clip_gốc` → **phát FULL** (action muộn được giữ). Phần dư = nghỉ thở (ambient chạy).
- Câu DÀI hơn clip → kéo clip: lố ≤1.5s freeze khung cuối; lố nhiều → **slow-mo** (`setpts=PTS*fac`) mượt hơn freeze. Clip cuối (CTA/chờ app thật) → freeze.

**Bước 4 — Giãn giọng khớp hình (giữ nguyên cao độ/tốc độ).** Mỗi cảnh: `[lead silence] + [slice câu] + [silence lấp đến clip_dur]` (`adelay 500|500` + `apad` + `-t clip_dur`), concat → voiceover trải đúng theo timeline video.

**Bước 5 — Giữ ambient (đẩy lên) + mix.** GIỮ audio Gemini từng clip (đừng `-an`); clip slow thì `atempo=1/fac` cho ambient khớp. Veo gen ambient tốt → để to làm nền (mặc định **0.45**, chỉnh 0.35–0.55). Mix:
```
[amb]volume=0.45[a];[vo]volume=1.0[v];[a][v]amix=inputs=2:duration=first:normalize=0[out]
```
(`normalize=0` để amix không tự giảm.) Không có voiceover → ambient ~1.0 (full).

> Script tham chiếu đầy đủ: `…/scratchpad/ghep_homma_v6.sh` (phiên 26/06, video-master). Output: `~/Desktop/VIDEO KFSP/20260625-homma-ukiyoe/Homma_full_16clip_v6.mp4` (16 cảnh full, 169s, ambient 45%).
> ⚠️ `bc` không có sẵn ổn định → dùng `awk "BEGIN{...}"` cho mọi phép tính float. Script ghép chạy bằng `bash file.sh` (KHÔNG inline trong zsh — mảng `${!arr[@]}` lỗi "bad substitution").

## Changelog

- **2026-08-06** — v1.5. **Khoá Gemini nay có chỗ ở cố định:** `~/Desktop/VIDEO KFSP/_shared/gemini/gemini.env` (quyền 600, ngoài OneDrive, cạnh `vbee.env`), giữ luôn `VEO_MODEL`. Trước đó luật là "không lưu vào tệp", hệ quả là mỗi phiên phải hỏi lại Thanh và có phiên tôi kết luận nhầm rằng **không hề có đường API**, trong khi mục "Gen tự động qua Gemini API" đã nằm sẵn trong chính tệp này từ 26/06. **Bài học: skill dài thì phải đọc hết trước khi kết luận là thiếu; tôi mới đọc 120 dòng đầu đã báo là không có.** Xác nhận lại ngày 06/08: ba model còn sống là `veo-3.1-lite-generate-preview`, `veo-3.1-fast-generate-preview`, `veo-3.1-generate-preview`.
- **2026-06-26** — v1.4. 🔴 **VIDEO LÀ MASTER** (Thanh chốt): KHÔNG cắt clip theo audio TTS — clip chạy ĐỦ, voiceover rải lên + đệm lặng. Thêm **Bước 0: PHÂN TÍCH clip gốc** (contact sheet frame giữa+cuối → Read soi nội dung + bắt action muộn như mưa/chim). `clip_dur = max(clip_gốc, lead+câu+nghỉ)`. +4 anti-pattern (audio-làm-master, trim-từ-giây-0-rụng-action-muộn, ghép-chưa-xem-clip). Script video-master: `ghep_homma_v6.sh`. Lý do: bản trước cắt theo Vbee làm mất khúc mưa clip thời tiết.
- **2026-06-26** — v1.3. **Ranh giới mới** (Thanh chốt): skill = giai đoạn VIDEO AI (gen clip + ghép base, KHÔNG subtitle chữ); phân biệt với `video-kfsp` bằng "có/không subtitle chữ trên màn" (không còn bằng "có/không giọng"). Cho phép **phủ voiceover rời** → output là **bản nền Thanh edit tiếp**. **GIỮ ambient AI gen và đẩy lên** (Veo gen tiếng minh hoạ tốt) — mặc định mix 0.45 (0.35–0.55), no-voiceover thì để ~1.0. Sửa nguyên tắc #5, bảng dùng/không dùng, description.
- **2026-06-26** — v1.2. Thêm mục **Ghép có voiceover — sync theo giọng + nhịp nghỉ** (Whisper lấy mốc câu → cắt cảnh đúng ranh giới → cho thở `lead+câu+pause` → slow-mo thay freeze → giãn giọng bằng silence → giữ ambient mix 20%). +7 anti-pattern (candlestick→nến sáp, chia-đều, cắt-ngắn-theo-giọng, bỏ-ambient, đổi-tốc-độ-giọng). Dùng `awk` thay `bc`.
- **2026-06-26** — v1.1. Thêm mục **Gen tự động qua Gemini API — Veo 3.1 Lite** (đã verify): model rẻ nhất `veo-3.1-lite-generate-preview` $0.05/s, script gen/poll/tải, 5 bẫy (heredoc-read+set -e, model id 404, free-tier 429, URI cần header key, candlestick→nến sáp). Audio để bình thường (tắt không giảm tiền). Veo 2/3 khai tử 30/06/2026.
- **2026-06-25** — v1.0. Tạo từ phiên Content Homma. Đóng băng: STYLE LOCK + cùng seed/tỷ lệ/fps + last-frame chaining + silhouette + no voice/no text + brand reveal "đồ thị cổ → app KFSP thật" (match-cut, không để AI bịa UI). Đa nền tảng Gemini Omni/Veo · Kling · Seedance (bảng khác biệt + negative prompt). Ví dụ tham chiếu: video ukiyo-e Homma 6 clip.
