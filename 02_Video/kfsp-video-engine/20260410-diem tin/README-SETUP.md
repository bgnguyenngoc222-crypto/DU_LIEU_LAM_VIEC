# VIDEO ĐIỂM TIN KFSP — Hướng dẫn cài đặt

## Yêu cầu hệ thống

- **macOS** (Apple Silicon hoặc Intel)
- **Claude Code** CLI đã cài đặt

## Cài đặt (1 lần duy nhất)

### 1. Homebrew (nếu chưa có)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Node.js + ffmpeg
```bash
brew install node ffmpeg
```

### 3. Python + mlx-whisper (cho kiểm chéo audio)
```bash
brew install python3
pip3 install mlx-whisper
```

### 4. Cài dependencies Remotion
```bash
cd "VIDEO DIEM TIN KFSP/remotion-kfsp"
npm install
```

> Lần đầu render, Remotion sẽ tự tải Chrome Headless Shell (~90MB). Chỉ tải 1 lần.

## Kiểm tra cài đặt

```bash
node -v        # v18+ 
ffmpeg -version # v6+
python3 -c "import mlx_whisper; print('OK')"
```

## Sử dụng

Mở folder project trong Claude Code:

```bash
cd "VIDEO DIEM TIN KFSP"
claude
```

Trong Claude Code, gõ:

```
/video-diemtin
```

Claude sẽ hỏi anh từng bước:
1. Ngày phiên
2. Paste kịch bản
3. Duyệt phiên âm
4. Duyệt audio
5. Copy screenshots
6. Duyệt video

## Cấu trúc thư mục

```
VIDEO DIEM TIN KFSP/
├── CLAUDE.md                  ← Hướng dẫn tổng cho Claude
├── video.md                   ← Pipeline + rules
├── pronunciation_vi.json      ← Bảng phiên âm TTS
├── kich-ban-template.md       ← Template kịch bản
├── vbee/                      ← Vbee TTS API config
│   └── vbee.env               ← API credentials + voice
├── remotion-kfsp/             ← Remotion video engine
│   ├── src/                   ← Source code (MAU 1 style)
│   ├── data/                  ← JSON data mỗi phiên
│   └── public/                ← Audio, screenshots
├── reference/                 ← Sample + style guide
│   ├── MAU_1_style.mp4        ← Video mẫu style
│   └── sample-20260410/       ← Sample hoàn chỉnh
├── output/                    ← Video output mỗi ngày
└── .claude/skills/            ← Skill /video-diemtin
```

## Lưu ý

- **Vbee token** trong `vbee/vbee.env` có thể hết hạn — liên hệ Vbee để gia hạn
- **Pronunciation** — nếu có mã CK/thuật ngữ mới, Claude sẽ hỏi trước khi gen audio
- **Screenshots BẮT BUỘC** — cần copy từ app KFSP vào folder khi được hỏi
