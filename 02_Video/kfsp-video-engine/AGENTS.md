# KFSP Video Engine — AGENTS.md

> Chuẩn mở agents.md. Chỉ dẫn đầy đủ: [`.agent/AGENT.md`](.agent/AGENT.md). Rule sản xuất: [`CLAUDE.md`](CLAUDE.md).

## Setup
- Skills: `.agent/skills/<name>/SKILL.md` (video-kfsp, vlog-script).
- Engine: `_shared/` (Vbee TTS, Whisper, Remotion, pronunciation, assets).
- Render cần: Node≥18, ffmpeg, Python+Whisper. Pipeline bash → Windows dùng WSL (xem docs/SETUP_WINDOWS.md).

## Hard rules
1. KHÔNG commit `_shared/vbee/vbee.env` (APP_ID + TOKEN). Chỉ `vbee.env.example`.
2. Giọng clone Thanh = tài sản KFSP, không share ngoài.
3. Render per-sentence + ffmpeg concat (CẤM render monolithic). Safe-zone TikTok y=150–1500. Mỗi bước pipeline dừng chờ duyệt.
