# Thiết lập VIDEO ENGINE trên Windows

> ⚠️ Khác repo content: pipeline video chạy bằng **bash + Python + ffmpeg + Remotion**. Trên Windows, cách sạch nhất là chạy trong **WSL2 (Ubuntu)** — toàn bộ script `.sh` chạy y như macOS. Nếu không muốn WSL, xem mục B (native, nhiều lưu ý hơn).

---

## Cách A — WSL2 (Ubuntu) — KHUYẾN NGHỊ

### A1. Bật WSL2 (PowerShell **Administrator**, 1 lần)
```powershell
wsl --install -d Ubuntu
```
Khởi động lại máy nếu được yêu cầu, rồi mở **Ubuntu** từ Start menu (tạo user/mật khẩu Linux lần đầu).

### A2. Cài toolchain (trong Ubuntu)
```bash
sudo apt update && sudo apt install -y nodejs npm ffmpeg python3 python3-pip git
pip3 install openai-whisper
# Node ≥18: nếu apt cho bản cũ, cài qua nvm
```

### A3. Đăng nhập GitHub + clone (trong Ubuntu)
```bash
# cài gh: https://github.com/cli/cli/blob/trunk/docs/install_linux.md
gh auth login
gh repo clone kfspteam/kfsp-video-engine
cd kfsp-video-engine
```

### A4. Token Vbee (BẮT BUỘC trước khi gen TTS)
```bash
cp _shared/vbee/vbee.env.example _shared/vbee/vbee.env
# mở _shared/vbee/vbee.env điền VBEE_APP_ID + VBEE_TOKEN (xin Thanh)
```

### A5. Cài Remotion cho 1 dự án (lần đầu)
```bash
cd <thư-mục-video>/brand   # hoặc nobrand
npm install                 # ~2-3 phút
```

### A6. Chạy
Mở Claude Code trong thư mục `kfsp-video-engine` (trong WSL) → gõ `/video-kfsp` hoặc `/vlog-script`. Pipeline 6 bước theo `CLAUDE.md`.

---

## Cách B — Native Windows (không WSL) — nhiều lưu ý

| Công cụ | Cài (PowerShell) |
|---|---|
| Node.js | `winget install OpenJS.NodeJS.LTS` |
| ffmpeg | `winget install Gyan.FFmpeg` |
| Python | `winget install Python.Python.3.12` rồi `pip install openai-whisper` |
| Git (kèm Git Bash) | `winget install Git.Git` |
| GitHub CLI | `winget install GitHub.cli` |

- **Script `.sh` (vd `gen_tts.sh`)** KHÔNG chạy trong PowerShell → mở **Git Bash** để chạy, hoặc dùng Cách A.
- Remotion render được native Windows (cần Chrome). Whisper cần Python + có thể tải `torch` nặng.
- Đường dẫn trong script là kiểu Unix (`~/Desktop/...`) — sẽ phải chỉnh nếu chạy native. **→ Vì vậy WSL (Cách A) đỡ phải sửa.**

---

## Bảo mật
- 🔴 KHÔNG commit `_shared/vbee/vbee.env` (đã chặn trong `.gitignore`). Chỉ commit `vbee.env.example`.
- Giọng clone Thanh = tài sản KFSP, không share ngoài KFSP.

## Lưu công việc
```bash
git add -A && git commit -m "video: <việc>" && git push
```
*(media .mp4/.mov/.mp3 + node_modules đã bị `.gitignore` loại — repo chỉ giữ source + kịch bản.)*
