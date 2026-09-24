# KFSP Video Kit — bắt đầu từ đây

Bộ này đủ để bạn tự dựng một video KFSP từ ý tưởng đến bản render, không cần hỏi lại.

## Có gì trong đây

| Thư mục | Nội dung | Dùng khi nào |
|---|---|---|
| `01_Skills/` | 4 skill Claude Code / Antigravity | Cài vào máy rồi gõ lệnh |
| `02_Tai_lieu_nen/` | Bối cảnh thương hiệu, kênh, luật cứng, hướng dẫn cài máy | Đọc trước khi làm bài đầu tiên |
| `03_Engine/_shared/` | Khung Remotion dùng chung, script gọi Vbee, file giọng, từ điển phát âm | Lúc dựng và render |
| `04_Du_an_mau/` | 2 dự án thật để bắt chước cấu trúc | Khi bí không biết đặt file ở đâu |

## Bốn skill và ranh giới giữa chúng

| Skill | Làm gì | Không làm gì |
|---|---|---|
| `vlog-script` | Viết kịch bản chữ theo 5 khung (PASA, BAB, HSS, 3Qs, LAZY-TUT) | Không dựng hình |
| `tvc-pitch` | Từ brief ra Big Idea, kịch bản, storyboard để trình duyệt | Không sản xuất |
| `video-kfsp` | Pipeline dựng thật: giọng đọc Vbee, canh chữ bằng Whisper, render Remotion có phụ đề kiểu TikTok | Không viết ý tưởng từ đầu |
| `kfsp-ai-video-clips` | Ghép nhiều clip AI (Veo, Kling, Seedance) thành một video liền mạch, không chữ | Không làm phụ đề |

Thứ tự thường dùng: ý tưởng → `vlog-script` → `video-kfsp`.

## Cài skill

Claude Code: chép 4 thư mục trong `01_Skills/` vào `~/.claude/skills/`.
Antigravity: chép vào `.agents/skills/` của dự án, hoặc `~/.gemini/config/skills/`.

Sau đó gõ `/video-kfsp`, `/vlog-script`, `/tvc-pitch`, `/kfsp-ai-video-clips`.

## Cài máy để render

Đọc `02_Tai_lieu_nen/README_SETUP_MAY.md` (Node, Remotion, Whisper, ffmpeg) và `02_Tai_lieu_nen/ENGINE_CLAUDE.md` (luật vùng an toàn, animation, phụ đề — bản đầy đủ nhất).

Chép `03_Engine/_shared/` ra một thư mục làm việc trên máy, mỗi dự án video đặt cạnh nó theo mẫu `YYYYMMDD-ten-bai/`.

## Ba thứ bắt buộc, không thương lượng

1. Câu đóng phải có **"Đưa chứng khoán về tầm tay bạn"** hoặc **"Chứng khoán trong tầm tay"**.
2. Không gọi điểm thị trường: cấm "đây là đáy", "lúc này rủi ro thấp nhất", "thời điểm giải ngân", "cơ hội đang xuất hiện". KFSP đưa tiêu chí để nhà đầu tư tự đánh giá.
3. Không khoe tiền, không khoe phần trăm lợi nhuận, không hứa làm giàu. Không dùng từ hạ thấp người xem. Không dùng dấu gạch ngang dài trong lời thoại.

Chi tiết ở `02_Tai_lieu_nen/KFSP_MARKETING_CONTEXT.md` phần luật cứng.

## Token Vbee

File `03_Engine/_shared/vbee/vbee.env.example` đã **xoá token**. Xin token từ Thanh, đổi tên file thành `vbee.env` rồi điền vào. Không đẩy file này lên bất kỳ repo nào.

Giọng mặc định: Minh Quân `hn_male_minhquan_yt-stable`, speed 1.0. Muốn đổi giọng thì hỏi trước.

## Hai dự án mẫu

- `Mau1_4-diem-vao-lenh/` — đủ nguồn để chạy lại: kịch bản, `sentences.json`, script Python dựng dữ liệu, mã Remotion, ảnh nền. Đã bỏ `node_modules` và bản render.
- `Mau2_wyckoff-bai5_tham-chieu/` — chỉ giữ kịch bản, mã nguồn và script, để bạn xem cách chia cảnh một bài dài. Không kèm ảnh và bản render.

## Đã cố ý loại khỏi gói

`node_modules` (tự cài bằng `npm install`), các bản mp4 thành phẩm, thư mục `handoff` 185MB, và token thật.
