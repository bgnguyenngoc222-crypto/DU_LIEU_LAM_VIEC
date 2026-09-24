# KFSP Video Engine

Hệ thống sản xuất **video TikTok/Shorts/Vlog** của KFSP: Vbee TTS → Whisper timestamp → Remotion render per-sentence → ffmpeg stitch. Đa-IDE (Claude Code / Gemini / Cursor).

> 🔒 Repo private nội bộ KFSP (org `kfspteam`). Đi kèm repo content [`kfsp-marketing`](https://github.com/kfspteam/kfsp-marketing).

## Bắt đầu
| Máy | Hướng dẫn |
|---|---|
| 🍎 macOS | [`README_NGUYEN_SETUP.md`](README_NGUYEN_SETUP.md) (bàn giao đầy đủ) |
| 🪟 Windows | [`docs/SETUP_WINDOWS.md`](docs/SETUP_WINDOWS.md) (khuyến nghị WSL2) |
| AI agent | [`.agent/AGENT.md`](.agent/AGENT.md) · rule sản xuất: [`CLAUDE.md`](CLAUDE.md) |

## Cấu trúc
```
kfsp-video-engine/
├── CLAUDE.md                ← 🧠 BỘ NÃO: rule TTS / animation / safe-zone / style
├── .agent/skills/           ← video-kfsp, vlog-script (→ sync .claude/skills)
├── _shared/                 ← engine dùng chung
│   ├── vbee/                ← TTS (gen_tts.sh, voices_vi.md, vbee.env.example)
│   ├── pronunciation_vi.json
│   ├── remocn-ref/  remotion/  anh-ai/  📱 iPhone 17 Mockups/
├── docs/SETUP_WINDOWS.md
├── 20260xxx-* · livermore-* ← video cũ làm REFERENCE (chỉ source, không media)
└── sync-skills.sh / .ps1
```

## 🔴 Trước khi render
1. `cp _shared/vbee/vbee.env.example _shared/vbee/vbee.env` → điền APP_ID + TOKEN Vbee (xin Thanh).
2. `npm install` trong thư mục remotion của dự án (lần đầu).
3. KHÔNG commit `vbee.env`. KHÔNG share giọng clone Thanh ra ngoài KFSP.

## Không kèm trong repo
`node_modules`, video `.mp4/.mov/.mp3` đã render, screenshot per-video, `vbee.env` (secret) — cài lại / render lại / xin token.
