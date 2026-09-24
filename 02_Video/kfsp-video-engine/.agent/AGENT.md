# KFSP Video Engine — Agent Profile

> File chỉ dẫn gốc cho mọi trợ lý AI. `GEMINI.md`/`AGENTS.md` trỏ về đây.
> 🧠 **BỘ NÃO rule sản xuất nằm ở [`CLAUDE.md`](CLAUDE.md)** (TTS, animation, safe-zone TikTok, style giọng) — đọc kỹ trước khi render.

## Đây là gì
Hệ thống sản xuất video TikTok/Shorts/Vlog của KFSP: Vbee TTS → Whisper timestamp → Remotion render per-sentence → ffmpeg stitch.

| Lớp | Ở đâu |
|---|---|
| **Rule sản xuất (brain)** | [`CLAUDE.md`](CLAUDE.md) |
| **Skills pipeline** | [`.agent/skills/`](.agent/skills/) (`video-kfsp`, `vlog-script`) → sync sang `.claude/skills/` |
| **Engine dùng chung** | [`_shared/`](_shared/) — Vbee, pronunciation, remocn-ref, BrandFrame, assets |
| **Setup máy** | [`README_NGUYEN_SETUP.md`](README_NGUYEN_SETUP.md) (mac) · [`docs/SETUP_WINDOWS.md`](docs/SETUP_WINDOWS.md) |
| **Video cũ (reference)** | các thư mục `20260xxx-*`, `livermore-*` (chỉ source — không kèm media render) |

## Dùng skills
- Claude Code: skills đã sync sang `.claude/skills/` → gõ `/video-kfsp` hoặc `/vlog-script`. Sửa skill ở `.agent/skills/` rồi chạy `./sync-skills.sh` (Win: `.\sync-skills.ps1`).
- IDE khác: mở `.agent/skills/<tên>/SKILL.md` và làm theo.

## 🔴 Bảo mật (bắt buộc)
- **KHÔNG commit `_shared/vbee/vbee.env`** (chứa APP_ID + TOKEN Vbee). Chỉ commit `vbee.env.example`. Copy thành `vbee.env` rồi điền giá trị thật.
- **Giọng clone Thanh** là tài sản KFSP — không đưa ra ngoài KFSP.

## Quy trình 6 bước (gate từng bước — chi tiết ở CLAUDE.md)
Kịch bản → TTS Vbee → Whisper timestamp → Storyboard+animation → Render per-sentence clip (CẤM monolithic) → Review+xuất final. **Mỗi bước dừng chờ duyệt.**
