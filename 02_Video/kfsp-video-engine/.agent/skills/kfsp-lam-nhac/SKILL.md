---
name: kfsp-lam-nhac
description: >-
  Làm nhạc nền cho video và nội dung KFSP bằng ACE-Step 1.5 chạy tại chỗ trên máy Mac
  (giấy phép MIT, dùng thương mại thoải mái, không tốn tiền theo lượt). Dẫn qua 5 bước:
  chốt vai trò đoạn nhạc trong video → viết câu tả theo 9 lớp → dựng dàn bài theo mốc thời gian
  → sinh nhiều phương án rồi chọn → hậu kỳ và lưu. Đóng băng các luật của nhà phát triển
  (không viết nhịp/tông vào câu tả, câu tả và dàn bài phải cùng một chuyện, không chồng chữ vào mốc)
  và luật bản quyền KFSP (mặc định chỉ được "rút công thức", không phối lại nhạc người khác).
  TRIGGERS — "làm nhạc", "nhạc nền video", "tạo nhạc", "sinh nhạc", "nhạc cho video KFSP",
  "ACE-Step", "nhạc không lời", "background music", "nhạc mở đầu", "nhạc kết", "đổi nhạc nền",
  "nhạc epic", "nhạc sôi động". KHÔNG trigger cho — giọng đọc lồng tiếng (dùng video-kfsp),
  dựng video (video-kfsp), kịch bản (vlog-script).
---

# Làm nhạc KFSP — ACE-Step 1.5

> Bộ máy đặt ngoài OneDrive tại `~/ace-step`. Thư mục làm việc tại `~/Desktop/NHAC KFSP/`.
> Tài liệu mô tả đầy đủ: `~/Desktop/NHAC KFSP/MO-TA.md`. Tài liệu gốc: `~/Desktop/NHAC KFSP/tai-lieu-goc/`.

## Bảng chỉ đường — mở đúng thứ cần

| Đang làm việc gì | Đọc mục nào |
|---|---|
| Làm một đoạn nhạc nền bình thường | Mục 1 → 5, dừng ở đó |
| Nhạc nghe không ra ý muốn | Mục 6 — chín lỗi thường gặp |
| Cần nhạc dài từ 2 phút trở lên | 🔴 Mục 6.bis — bệnh lặp, phải cắt đoạn rồi ghép |
| Cần nhạc "cool ngầu" kiểu quảng cáo xe | Mục 4 — bảng bốn dòng nhạc + nhịp chuẩn từng dòng |
| Cần nhạc bám theo một bài có sẵn | Mục 7 — **đọc kỹ luật bản quyền trước** |
| Máy chủ tắt giữa chừng, tưởng mất việc | 🔴 Mục 8.bis — đừng vội làm lại |
| Cần việc lạ: tách bài, vá đoạn, xếp lớp nhạc cụ | `tai-lieu-goc/Tutorial.md` mục "Audio Control" |
| Máy không chạy, báo lỗi | Mục 8 |
| Muốn hiểu vì sao có luật này | `~/Desktop/NHAC KFSP/MO-TA.md` |

---

## 0. Trước khi làm bất cứ gì — bật máy chủ

```bash
curl -s -m 3 http://localhost:8001/health || \
  (cd ~/ace-step && source .venv/bin/activate && nohup python -m acestep.api_server > /tmp/acestep.log 2>&1 &)
```

Lần đầu trong phiên mất khoảng 4 phút nạp mô hình. Các lượt sau tức thì.

Giao diện tiếng Việt: `cd ~/Desktop/"NHAC KFSP" && ~/ace-step/.venv/bin/python giao-dien.py` → mở `localhost:7870`.

---

## 1. Bước 1 — Chốt vai trò đoạn nhạc, TRƯỚC khi tả

🔴 **Không được nhảy thẳng vào viết câu tả.** Hỏi Thanh ba câu, hoặc tự trả lời được thì ghi rõ giả định:

| Câu hỏi | Vì sao phải hỏi |
|---|---|
| **Nhạc này nằm ở đâu trong video?** Mở đầu · xuyên suốt · một đoạn cao trào · phần kết | Quyết định bố cục và cách kết |
| **Có ai nói đè lên không?** | Có người nói thì nhạc phải thưa, ít giai điệu, không có cao trào. Đây là khác biệt lớn nhất |
| **Dài bao nhiêu giây?** | Cần con số, không đoán. Nếu chưa dựng video thì hỏi độ dài dự kiến |

Có ba câu này rồi mới sang bước 2.

---

## 2. Bước 2 — Viết câu tả (caption)

Đây là thứ ảnh hưởng mạnh nhất. Ghép **ít nhất bốn** trong chín lớp sau:

| Lớp | Chữ dùng |
|---|---|
| Thể loại | `cinematic orchestral` · `modern tech pop` · `lo-fi hip hop` · `acoustic folk` · `synthwave` · `ambient` |
| Cảm xúc | `uplifting` · `melancholic` · `energetic` · `dreamy` · `nostalgic` · `intimate` · `tense` |
| Nhạc cụ | `soft piano` · `warm strings` · `synth plucks` · `punchy drums` · `acoustic guitar` · `brass section` |
| Chất tiếng | `warm` · `bright` · `crisp` · `airy` · `punchy` · `lush` · `polished` |
| Thời kỳ | `80s synth-pop` · `vintage soul` · `modern trap` |
| Kiểu thu | `lo-fi` · `high-fidelity` · `studio-polished` · `bedroom pop` |
| Giọng hát | `female vocal` · `breathy` · `choir` — bỏ qua nếu làm nhạc không lời |
| Tiết tấu | `slow tempo` · `mid-tempo` · `driving` · `laid-back` · `groovy` |
| Gợi ý bố cục | `building intro` · `catchy chorus` · `fade-out ending` |

**Luôn kết câu tả bằng `no vocals, instrumental`** nếu không muốn có giọng hát. Thiếu là máy tự chèn giọng.

### 🔴 Ba luật cứng của câu tả

| Luật | Nội dung |
|---|---|
| **Không viết nhịp, tông, phách vào câu tả** | Nhà phát triển khuyến cáo thẳng. Những thứ đó có ô riêng. Viết cả hai chỗ dễ đá nhau và làm máy rối |
| **Không ghép hai phong cách đá nhau** | Vừa `classical strings` vừa `hardcore metal` thì ra một mớ hỏng |
| **Muốn nhiều phong cách thì chuyển thành diễn biến theo thời gian** | Thay vì trộn: `"Start with soft strings, middle becomes driving rock, end turns to ambient"`. Đây là mẹo đáng giá nhất trong tài liệu gốc |

**Cụ thể luôn thắng mơ hồ.** `sad piano ballad with breathy female vocal` ăn đứt `a sad song`.

**Tả càng kỹ máy càng bị bó.** Muốn bất ngờ thì viết ít, muốn kiểm soát thì viết nhiều.

---

## 3. Bước 3 — Dựng dàn bài (điền vào ô lời hát)

Ô này tên là "lời hát" nhưng **dùng cho cả nhạc không lời**. Đây là dòng thời gian của bài.

```
[Intro - solo piano, sparse]
[Build - strings enter, drums rise]
[Chorus - anthemic, full orchestra, triumphant]
[Outro - warm sustained chord, gentle fade]
```

| Nhóm mốc | Dùng được |
|---|---|
| Bố cục | `[Intro]` `[Verse]` `[Pre-Chorus]` `[Chorus]` `[Bridge]` `[Outro]` |
| Sức căng | `[Build]` `[Drop]` `[Breakdown]` |
| Chỉ nhạc cụ | `[Instrumental]` `[Guitar Solo]` `[Piano Interlude]` |
| Đặc biệt | `[Fade Out]` `[Silence]` |
| Năng lượng | `[high energy]` `[low energy]` `[building energy]` `[explosive]` |

### 🔴 Ba luật cứng của dàn bài

| Luật | Đúng | Sai |
|---|---|---|
| Mỗi mốc **một** chữ tả | `[Chorus - anthemic]` | `[Chorus - anthemic - stacked harmonies - high energy - powerful - epic]` — máy có thể tưởng đó là lời để hát |
| **Câu tả và dàn bài phải cùng một chuyện** | Câu tả `violin, classical` ↔ dàn bài `[Violin Solo - expressive]` | Câu tả `violin, classical` ↔ dàn bài `[Guitar Solo - distorted]` |
| Chữ tả phức tạp thì đẩy sang câu tả | | Nhồi hết vào mốc |

### Dàn bài mẫu theo vai trò trong video

| Vai trò | Dàn bài |
|---|---|
| Mở đầu, ra mắt | `[Intro - sparse]` → `[Build]` → `[Chorus - anthemic]` → `[Outro - gentle fade]` |
| Nói đè lên trên | `[Intro - pad only]` → `[Main - steady, no melodic peaks]` → `[Outro - pad fades]` |
| Một đoạn cao trào | `[Build - tension rises]` → `[Drop - explosive]` → `[Outro - abrupt stop]` |
| Phần kết | `[Outro - warm sustained chord, gentle fade]` |

🔴 **Nhạc để nói đè lên trên phải không có cao trào và không có giai điệu nổi.** Đây là lỗi hay mắc nhất — nhạc hay quá thì nuốt mất lời người nói.

---

## 4. Bước 4 — Thông số nhạc lý

Chỉ chỉnh khi có ý rõ ràng. Không có ý thì bỏ trống cho máy tự lo.

| Thông số | Khoảng ổn định | Ghi chú |
|---|---|---|
| Nhịp | 60–180 | Chậm 60–80 · vừa 90–120 · nhanh 130–180. Ngoài khoảng này máy ít dữ liệu |
| Tông | `C Major` `G Major` `D Major` `Am` `Em` | Tông hiếm hay bị máy bỏ qua |
| Phách | `4` chắc nhất · `3` valse · `6` đung đưa | `5/4`, `7/8` là loại khó, hên xui |
| Độ dài | 30–60 giây, hoặc 2–4 phút | Đây là hai khoảng ổn định nhất. Rất dài dễ lặp ý |

**Đây là gợi ý, không phải lệnh.** Ghi 120 thì máy ra quanh 118–122. Giống bảo nhạc công "chơi tầm 120".

**Giới hạn máy Air:** tối đa 8 phút một lần, 4 phương án một lượt, khoảng 2–3 phút máy chạy cho mỗi phút nhạc.

### Nhịp chuẩn theo dòng nhạc — đặt sai nhịp thì không ra dòng

Dòng nhạc có nhịp riêng của nó. Đặt `hybrid trap` ở 112 thì không ra hybrid trap, dù câu tả viết đúng.

| Dòng | Nhịp chuẩn | Ghi chú |
|---|---|---|
| `hybrid trap` / `cinematic trap` | **140–150** | Trống đánh nửa nhịp nên nghe chắc, hi-hat chạy dày nên vẫn nhanh |
| `epic hybrid orchestral` / trailer | 90–110 | Trống chiến trận, kèn trầm rền |
| `drift phonk` | 130–150 | Trống méo tiếng, chuông cowbell |
| `dark tech house` / `industrial techno` | 120–130 | Nhịp máy móc đều, lạnh |
| `percussion groove` (trống thuần) | 95–120 | Cảm giác nhanh đến từ mật độ gõ, không từ nhịp |
| `lo-fi hip hop` | 70–90 | |

### Dòng nhạc "cool ngầu" kiểu quảng cáo xe — bốn dòng khác nhau, hay bị gộp

| Tên viết vào câu tả | Nghe ra sao |
|---|---|
| **hybrid trap** / **cinematic trap** | Trống điện tử nặng + kèn đồng điện ảnh + tiếng trầm hụ. Dùng nhiều nhất cho quảng cáo xe |
| **epic hybrid orchestral** | Dàn dây + trống chiến trận + "braam". Hoành tráng, ít điện tử |
| **drift phonk** | Trống méo, cowbell, bass gằn. Ngầu đường phố, hợp TikTok |
| **dark tech house** / **industrial techno** | Nhịp máy móc, lạnh, tối, không giai điệu |

Ba tiếng hay đi kèm: **braam** (kèn trầm rền, dấu hiệu phim giới thiệu) · **riser** (tiếng dâng trước cú nhấn) · **impact** (cú đập lúc hiện tên sản phẩm).

🔴 **Với KFSP chọn `hybrid trap` hoặc `dark tech house`.** *Epic hybrid orchestral* hoành tráng quá, dễ nghe thành "phím hàng làm giàu" — lệch giọng thương hiệu.

⚠️ **Hybrid trap chen vào giọng đọc nhiều hơn bộ gõ thuần.** Đo thực tế 06/08: hybrid trap chiếm 20–25% dải 500–2000 Hz, bộ gõ chỉ 11%. Đó đúng vùng tần số giọng người. Có giọng đọc đè lên thì phải hạ nhạc sâu hơn ở những đoạn có tiếng nói.

---

## 5. Bước 5 — Sinh nhiều rồi chọn

🔴 **Luật quan trọng nhất về thói quen làm việc:**

> **Sinh 2–4 phương án một lượt rồi chọn. Đừng sinh một bản rồi ngồi sửa câu tả mãi.**

Lý do nhà phát triển nêu: yếu tố ngẫu nhiên ảnh hưởng **mạnh ngang với** việc chỉnh thông số. Sửa một thông số rồi thấy khác đi — rất có thể chỉ là ngẫu nhiên chứ không phải do sửa.

**Mẹo khi cần biết một thông số có tác dụng thật:** cố định hạt giống (seed). Cùng hạt giống thì điểm xuất phát giống nhau, khác biệt mới đúng là do thông số.

**Gọi bằng lệnh:**

```bash
curl -s -X POST http://localhost:8001/release_task -H 'Content-Type: application/json' -d '{
  "prompt": "<câu tả>, no vocals, instrumental",
  "lyrics": "[Intro - sparse]\n[Build]\n[Chorus - anthemic]\n[Outro - gentle fade]",
  "bpm": 100, "key_scale": "D major", "time_signature": "4",
  "audio_duration": 60, "audio_format": "mp3", "thinking": false
}'
```

Hỏi kết quả — 🔴 tham số tên là **`task_id_list`**, không phải `task_ids`:

```bash
curl -s -X POST http://localhost:8001/query_result -H 'Content-Type: application/json' \
  -d '{"task_id_list":["<mã>"]}'
```

Trạng thái: `0` đang chạy · `1` xong · `2` hỏng. File tải về theo đường dẫn trong trường `file`, nối vào `http://localhost:8001`.

### 🔴 Bốn luật khi gọi bằng lệnh (đúc 06/08, mỗi luật đều từ một lần mắc lỗi)

| Luật | Nội dung |
|---|---|
| **Chạy lần lượt, KHÔNG bắn song song** | Bắn 3 yêu cầu cùng lúc làm máy chủ vỡ bộ nhớ và tắt hẳn. Một lượt một, chờ xong mới bắn tiếp |
| **Thời gian chờ của `curl` phải ≥ 60 giây** | Lúc nạp mô hình, ACE-Step chặn luôn cổng trả lời. Đặt `-m 10` thì hết giờ và **tưởng nhầm máy chủ đã chết** |
| **Một lượt trả về HAI file, không phải một** | Trường `result` là mảng. Đừng chỉ lấy phần tử đầu — mất một nửa kết quả |
| **`json.loads` phải đặt `strict=False`** | Trường `result` có ký tự điều khiển, đọc kiểu thường thì báo `Invalid control character` |

Đọc kết quả cho đúng:

```python
import json, urllib.parse
r = json.loads(res['data'][0]['result'], strict=False)   # strict=False bắt buộc
for i in r:                                               # lặp — có 2 file
    print(urllib.parse.unquote(i['file'].split('path=')[1]))
```

Chờ đúng cách — vòng lặp bỏ qua lượt hết giờ, chỉ dừng khi tiến trình chết thật:

```bash
for i in $(seq 1 90); do
  pgrep -f acestep.api_server >/dev/null || { echo "TIEN TRINH CHET THAT"; break; }
  r=$(curl -s -m 60 -X POST http://localhost:8001/query_result \
      -H 'Content-Type: application/json' -d '{"task_id_list":["<mã>"]}' || true)
  s=$(echo "$r" | python3 -c "import json,sys; print(json.load(sys.stdin)['data'][0]['status'])" 2>/dev/null || echo cho)
  [ "$s" = "1" ] && { echo "$r" > ket-qua.json; break; }
  [ "$s" = "2" ] && { echo HONG; break; }
  sleep 20
done
```

**Sau khi ra file, luôn kiểm hai điều trước khi trình Thanh:**

```bash
ffprobe -v error -show_entries format=duration -of csv=p=0 <file>        # đúng độ dài?
ffmpeg -hide_banner -i <file> -af volumedetect -f null /dev/null 2>&1 | grep mean_volume
```

Âm lượng trung bình quanh −16 đến −20 dB là bình thường. Nếu ra −60 dB trở xuống thì file câm, phải sinh lại.

**Lưu:** vào `~/Desktop/NHAC KFSP/nhac-ra/`, tên **không dấu**, kèm ngày giờ. Ghi câu tả đã dùng vào `mo-ta/nhat-ky.txt`.

---

## 6. Chín lỗi thường gặp

| Triệu chứng | Nguyên nhân | Cách chữa |
|---|---|---|
| Tự nhiên có giọng hát | Thiếu `no vocals, instrumental`, hoặc ô lời hát không phải `[instrumental]` | Thêm vào cả hai chỗ |
| Nhạc nuốt mất lời người nói | Nhạc có cao trào và giai điệu nổi | Dùng dàn bài "nói đè lên trên", thêm `minimal melody, stays out of the way of speech` |
| Nhạc trôi tuột, không điểm nhấn | Không có dàn bài | Thêm mốc `[Build]` và `[Chorus]` |
| Kết đột ngột, khó ghép video | Máy tự chọn kết | Ghi rõ `[Outro - warm sustained chord, gentle fade]` |
| Nhạc lung tung, không ra thể loại nào | Ghép phong cách đá nhau | Bỏ bớt, giữ một thể loại chính |
| Nhịp không đúng ý | Viết nhịp vào câu tả thay vì ô nhịp | Bỏ khỏi câu tả, đặt vào ô `bpm` |
| Máy hát nhầm chữ tả thành lời | Chồng quá nhiều chữ vào một mốc | Mỗi mốc một chữ tả |
| Mỗi lần ra một kiểu, không lặp lại được | Bản chất ngẫu nhiên | Cố định `seed` nếu cần lặp lại |
| Bài dài bị lặp ý | Sinh quá dài một lần | 🔴 Xem mục 6.bis — dàn bài nhiều chặng KHÔNG chữa được |
| Không ra đúng dòng nhạc dù câu tả đúng | Đặt sai nhịp cho dòng đó | Xem bảng nhịp chuẩn theo dòng ở mục 4 |

---

## 6.bis 🔴 Bệnh lặp của bài dài — và cách ĐO nó

**Đúc từ lần chạy 06/08:** sinh một lượt 3 phút với dàn bài **7 chặng** (có `[Breakdown]`, `[Bridge]`, ba lần `[Main]` khác nhau). Máy **không làm theo dàn bài**. Kết quả đo:

| | Bản 1 | Bản 2 |
|---|---|---|
| Độ giống nhau giữa các đoạn 20 giây, trung bình | 0,940 | 0,937 |
| Cao nhất | **1,000** | 0,999 |

Cao nhất bằng 1,000 nghĩa là có hai đoạn 20 giây **giống hệt nhau**. Năng lượng chỉ nhấp nhô nhẹ, không có đoạn tụt trống thật sự ở giữa.

**Kết luận:** *viết thêm chặng vào dàn bài KHÔNG chữa được bệnh lặp của bài dài.* Trần thật của một lượt sinh thấp hơn trần cứng 8 phút nhiều.

**Cách làm đúng khi cần ≥ 2 phút:** sinh **3–4 đoạn 45–60 giây, mỗi đoạn một câu tả khác nhau**, rồi ghép bằng `ffmpeg`. Tốn thêm chừng 10 phút chạy nhưng mỗi đoạn thật sự khác nhau.

**Công cụ đo lặp** — 🔴 máy KHÔNG có `librosa`, chỉ có `numpy` + `scipy` trong `~/ace-step/.venv`. Dùng phổ tần tự tính:

```python
# do-lap.py — chay bang ~/ace-step/.venv/bin/python
import subprocess, numpy as np, sys
from scipy.signal import stft
sr = 22050
for path in sys.argv[1:]:
    raw = subprocess.run(['ffmpeg','-v','error','-i',path,'-ac','1','-ar',str(sr),
                          '-f','f32le','-'], capture_output=True).stdout
    y = np.frombuffer(raw, dtype=np.float32)
    f, t, Z = stft(y, fs=sr, nperseg=2048, noverlap=1024)
    S = np.abs(Z); hop = t[1]-t[0]; n = len(y)//sr
    segs = np.array([S[:, int(k/hop):int(min(n,k+20)/hop)].mean(1) for k in range(0,n,20)])
    segs /= np.linalg.norm(segs, axis=1, keepdims=True) + 1e-9
    off = (segs @ segs.T)[np.triu_indices(len(segs), 1)]
    print(f"{path.split('/')[-1]}: trung binh {off.mean():.3f}, cao nhat {off.max():.3f}")
```

**Ngưỡng đọc kết quả:** cao nhất **trên 0,98 là có đoạn lặp nguyên si** — phải cắt ngắn rồi ghép. Dưới 0,90 là ổn.

Cùng bộ công cụ này đo được **nhịp** và **phổ tần** của một bài mẫu để rút công thức (mục 7): tự tương quan trên độ dồn phổ ra nhịp, trọng tâm phổ ra độ sáng tối.

---

## 7. 🔴 Luật bản quyền KFSP — đọc trước khi động vào nhạc có sẵn

Có năm cách bắt máy học từ một bài nhạc có sẵn. **Chỉ một cách được dùng mặc định.**

| Cách | Rủi ro | Được dùng? |
|---|---|---|
| **Rút công thức** (`extract`) — máy nghe rồi trả về câu tả, nhịp, tông bằng **chữ** | Không giữ lại âm thanh nào của bài gốc | ✅ **Mặc định dùng cách này** |
| Lấy làm mẫu (`reference_audio`) | Nhạc ra mang dấu vết bài gốc | ⚠️ Phải hỏi Thanh từng lần |
| Phối lại (`cover`) | Giữ nguyên giai điệu bài gốc | ⚠️ Phải hỏi Thanh từng lần |
| Vá đoạn (`repaint`) | Như trên | ⚠️ Phải hỏi Thanh từng lần |
| Dạy phong cách (LoRA) | Học thẳng từ tác phẩm người khác | ⚠️ Phải hỏi Thanh từng lần |

Chính tài liệu ACE-Step khuyến cáo chỉ huấn luyện trên tác phẩm của mình. KFSP đã từng vướng chuyện bản quyền nội dung hồi 06/2026 — không lặp lại.

**Cách làm an toàn khi Thanh đưa một bài mẫu:** rút công thức ra chữ, đưa Thanh xem, rồi dùng chữ đó sinh nhạc **hoàn toàn mới**.

### Rút công thức từ một video YouTube — cách đã chạy được 06/08

Máy chủ ACE-Step **không có sẵn cửa `extract`** (`/v1/dataset/auto_label` cần dựng cả bộ dữ liệu, quá nặng cho một bài). Cách thực tế: tải tiếng về rồi **tự đo bằng số**, không giữ lại âm thanh nào.

```bash
yt-dlp --no-warnings -q -x --audio-format mp3 -o "ref1.%(ext)s" "<đường dẫn>"
```

🔴 **Đừng thêm `--print`** — cờ đó bật chế độ mô phỏng, yt-dlp in tên ra rồi **không tải gì cả**. Mất một lượt mới nhận ra.

Rồi chạy công cụ đo ở mục 6.bis, đọc ra ba con số:

| Đo được | Suy ra |
|---|---|
| Nhịp (tự tương quan trên độ dồn phổ) | Điền vào ô `bpm`. Cẩn thận nhịp đôi: máy đọc 198 thường là 99 thật |
| Trọng tâm phổ | Trên 2.000 Hz là sáng, dưới 1.000 Hz là tối, nặng |
| Tỷ lệ từng dải tần | Dải 120–500 Hz thấp dưới 10% = bài **không có nhạc cụ giai điệu**, chỉ trống và bộ gõ |

Ví dụ thật (video "Upbeat Drums & Percussion"): 98 nhịp · trọng tâm 2.644 Hz · dải 120–500 Hz chỉ 7,3% → viết ra câu tả `percussion groove, bright, crisp, minimal melody`. **Không đụng gì tới âm thanh gốc.**

---

## 8. Khi máy không chạy

| Lỗi | Cách chữa |
|---|---|
| `Connection refused` cổng 8001 | Máy chủ chưa bật — xem mục 0 |
| Hỏi kết quả luôn trả về rỗng | Dùng sai tên tham số. Phải là `task_id_list` |
| `unrecognized arguments: --backend` | Máy chủ không nhận cờ `--backend`. Chỉ giao diện web mới nhận. Trên chip Apple máy tự chọn MLX rồi |
| Máy chạy chậm bất thường | Kiểm xem có đang bật cả giao diện web 7860 lẫn máy chủ 8001 không — hai cái cùng nạp mô hình thì tốn gấp đôi bộ nhớ |
| `curl` hết giờ, tưởng máy chủ chết | Lúc nạp mô hình máy chủ chặn cổng trả lời. **Kiểm bằng `pgrep -f acestep.api_server`, đừng kiểm bằng `curl`.** Còn tiến trình là còn sống |
| Máy chủ tắt giữa chừng | ⚠️ **KHÔNG có nghĩa là mất việc** — xem mục 8.bis |
| Muốn tắt hết | `pkill -f acestep; pkill -f giao-dien.py` |

Tắt xong kiểm lại cho chắc — mô hình ra khỏi RAM cùng tiến trình:

```bash
pgrep -fl acestep                      # rỗng là đã tắt
memory_pressure | tail -2              # xem bộ nhớ trống đã lên chưa
```

---

## 8.bis 🔴 Máy chủ tắt KHÔNG có nghĩa là mất việc

Sự cố 06/08: máy chủ tắt giữa lúc ba lượt đang chạy. Tôi kết luận mất hết và bắt đầu làm lại. **Sai.** Hai trong ba lượt vẫn chạy xong sau khi máy chủ sống lại, bốn file vẫn nằm nguyên trong kho tạm. Suýt nữa bỏ phí.

**Trước khi kết luận mất, phải làm đủ hai bước:**

```bash
# 1. Hoi lai bang ma viec cu — viec song qua lan tat may chu
curl -s -m 60 -X POST http://localhost:8001/query_result \
  -H 'Content-Type: application/json' -d '{"task_id_list":["<mã cũ>"]}'

# 2. Soi kho tam theo thoi gian sua file
ls -lt ~/ace-step/.cache/acestep/tmp/api_audio/ | head -20
```

Vì vậy: **luôn ghi lại mã việc** ngay khi bắn, đừng để nó chỉ nằm trong kết quả lệnh.

---

## 9. Nối với việc khác của KFSP

| Việc | Skill |
|---|---|
| Dựng video, lồng giọng đọc, phụ đề | `video-kfsp` |
| Viết kịch bản trước khi dựng | `vlog-script` |
| Video ghép từ clip AI, không lời không chữ | `kfsp-ai-video-clips` |
| Ý tưởng và bảng phân cảnh cho quảng cáo | `tvc-pitch` |

Nhạc làm ra để dùng trong `video-kfsp` thì đặt vào `~/Desktop/NHAC KFSP/nhac-ra/`, rồi chép sang thư mục dự án video.

---

## Nhật ký thay đổi

**06/08/2026 — dựng skill.** Cài ACE-Step 1.5 trên Mac Air M4 24GB, giấy phép MIT. Đọc trọn 19 tệp tài liệu gốc, rút ra các luật ở mục 2, 3, 4, 5. Tra thêm kinh nghiệm cộng đồng.

Bốn điều học được trong phiên đầu, ghi lại để khỏi mắc lại:

1. **Tham số hỏi kết quả là `task_id_list`**, không phải `task_ids`. Viết sai thì luôn trả về rỗng mà không báo lỗi — rất khó nhận ra.
2. **Máy chủ không nhận cờ `--backend`**, chỉ giao diện web nhận.
3. **Đừng viết nhịp và tông vào câu tả** — lỗi này tôi đã mắc ở mấy bản đầu, vừa viết `100 bpm` trong câu tả vừa đặt ô nhịp.
4. **Ô "lời hát" dùng được cho nhạc không lời** — đây là chỗ đặt dàn bài. Phiên đầu tôi bỏ sót hẳn tầng này, nên nhạc ra không có bố cục.

---

**06/08/2026 chiều — phiên dùng thật đầu tiên.** Việc: nhạc nền video ra mắt tính năng, có giọng đọc đè lên, tham khảo hai video YouTube. Làm ra 10 file ở `nhac-ra/` (6 bản bộ gõ 112 nhịp · 2 bản hybrid trap 140 nhịp · 2 bản hybrid trap 3 phút).

Bảy điều mới, đã viết thẳng vào các mục tương ứng thay vì để trong nhật ký:

| Điều học được | Đã ghi ở |
|---|---|
| Bốn dòng nhạc "cool ngầu" quảng cáo + **nhịp chuẩn theo dòng** (hybrid trap phải 140–150, đặt 112 thì không ra dòng) | Mục 4 |
| Hybrid trap chiếm dải giọng người 20–25% (bộ gõ chỉ 11%) → chen vào giọng đọc nhiều hơn | Mục 4 |
| **Chạy lần lượt, cấm bắn song song** — 3 lượt cùng lúc làm vỡ bộ nhớ, máy chủ tắt | Mục 5 |
| **`curl` phải chờ ≥ 60 giây**; kiểm máy chủ sống bằng `pgrep`, không bằng `curl` | Mục 5 + 8 |
| Một lượt trả **2 file**; `json.loads` phải `strict=False` | Mục 5 |
| **Dàn bài nhiều chặng KHÔNG chữa được bệnh lặp của bài dài** — 3 phút đo ra 1,000 (hai đoạn giống hệt). Kèm công cụ đo lặp bằng numpy/scipy vì máy **không có librosa** | Mục 6.bis |
| **Máy chủ tắt không mất việc** — 2/3 lượt vẫn xong, 4 file còn trong kho tạm, suýt bỏ phí | Mục 8.bis |

Hai lần tôi báo sai cho Thanh trong phiên này, ghi lại để tự nhắc: (1) nói "máy chủ chết" trong khi nó chỉ đang nạp mô hình và chặn cổng trả lời; (2) nói "mất hết ba lượt" trong khi hai lượt vẫn chạy xong. **Cả hai đều do kết luận từ một phép kiểm duy nhất mà không kiểm chéo.**

Cách rút công thức từ YouTube (mục 7) cũng mới: máy chủ không có cửa `extract` sẵn, phải tải tiếng về rồi tự đo bằng số. Và `yt-dlp --print` bật chế độ mô phỏng nên **không tải gì cả** — mất một lượt mới nhận ra.
