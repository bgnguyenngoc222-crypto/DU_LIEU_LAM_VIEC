# Changelog — KFSP Video Engine

## [0.1.0] — 2026-06-21 — Khởi tạo repo engine đa-IDE
### Added
- Engine sản xuất video KFSP từ `~/Desktop/VIDEO KFSP/`: `CLAUDE.md` (brain), `_shared/` (Vbee, pronunciation, remocn-ref, remotion, anh-ai, mockups), 2 skill (video-kfsp, vlog-script).
- Kiến trúc `.agent/` đa-IDE + pointer GEMINI.md/AGENTS.md + sync-skills.sh/.ps1.
- `docs/SETUP_WINDOWS.md` (WSL2 + native), giữ `README_NGUYEN_SETUP.md` (mac).
- 18 video cũ làm reference (CHỈ source — bỏ node_modules + media render + screenshot).
### Security
- Loại `vbee.env` (APP_ID + TOKEN Vbee) → thay bằng `vbee.env.example`. Verify token KHÔNG rò rỉ trong repo. `.gitignore` chặn `*.env`.
### Notes
- Pipeline bash/Python → Windows nên chạy trong WSL2.
