# 🎬 BÀN GIAO HỆ THỐNG SẢN XUẤT VIDEO KFSP — cho Nguyên

> Người bàn giao: **Thanh** (PM/CEO KFSP) · Ngày: **04/06/2026**
> Mục đích: Nguyên tiếp nhận sản xuất video TikTok/Shorts/Vlog KFSP **thay Thanh**.
> Đọc hết file này TRƯỚC khi bắt đầu. Sau đó đọc `CLAUDE.md` (rule chi tiết).

---

## 0. Gói này gồm gì

```
VIDEO KFSP/
├── README_NGUYEN_SETUP.md   ← file này (hướng dẫn cài + bàn giao)
├── CLAUDE.md                ← BỘ NÃO: toàn bộ rule TTS, animation, safe-zone, style
├── _shared/                 ← ENGINE dùng chung cho mọi video
│   ├── vbee/                ← TTS Vbee (script gen + token + 24 giọng VN)
│   ├── pronunciation_vi.json← từ điển phát âm (cách viết cho Vbee đọc đúng)
│   ├── remocn-ref/          ← 11 component Remotion mẫu (animation chuẩn)
│   ├── anh-ai/              ← ảnh nhân vật AI tách nền
│   └── 📱 iPhone 17 Mockups/ ← khung điện thoại để lồng app
├── .claude/skills/          ← 2 skill chạy pipeline (video-kfsp, vlog-script)
└── 20260xxx-*/ + livermore-* ← 11 dự án video CŨ làm REFERENCE (xem cách làm)
```

> ⚠️ Gói **KHÔNG kèm `node_modules`** (nặng 3.2GB) — Nguyên tự cài ở bước 2.

---

## 1. Cài công cụ (toolchain) — chạy 1 lần

Mở Terminal trên máy Nguyên (macOS), cài theo thứ tự:

| Công cụ | Lệnh cài | Kiểm tra |
|---|---|---|
| **Homebrew** (nếu chưa có) | `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` | `brew -v` |
| **Node.js** (chạy Remotion) | `brew install node` | `node -v` (cần ≥ 18) |
| **ffmpeg** (ghép/cắt video+audio) | `brew install ffmpeg` | `ffmpeg -version` |
| **Python 3** | `brew install python` | `python3 -V` |
| **Whisper** (lấy timestamp phụ đề) | `pip3 install openai-whisper` | `python3 -c "import whisper"` (không báo lỗi) |
| **curl** | có sẵn macOS | `curl --version` |
| **Claude Code** | cài theo hướng dẫn Anthropic | `claude` chạy được |

> Lần đầu Whisper chạy sẽ tự tải model `base` (~140MB) — cần mạng.

---

## 2. Cài `node_modules` cho Remotion (lần đầu)

Mỗi dự án video có 1 folder `remotion-*`. Để render được, vào folder đó cài 1 lần:

```bash
cd "~/Desktop/VIDEO KFSP/20260503-3-cau-hoi-thi-truong/remotion-3cauhoi"
npm install        # ~2-3 phút lần đầu
```

**Mẹo tiết kiệm (theo CLAUDE.md):** khi tạo video MỚI, KHÔNG cần `npm install` lại — copy `node_modules` từ project gần nhất:
```bash
cp -R "remotion-3cauhoi/node_modules" "remotion-tenmoi/node_modules"
```

---

## 3. Đăng ký 2 skill vào Claude Code của Nguyên

Skill nằm sẵn trong gói tại `.claude/skills/`. Có 2 cách:

**Cách A — dùng tại chỗ (khuyến nghị):** Mở Claude Code NGAY trong folder `VIDEO KFSP/`. Claude tự load `.claude/skills/` của folder + `CLAUDE.md`.

**Cách B — cài global:** copy 2 folder skill vào máy:
```bash
cp -R "~/Desktop/VIDEO KFSP/.claude/skills/video-kfsp"  ~/.claude/skills/
cp -R "~/Desktop/VIDEO KFSP/.claude/skills/vlog-script" ~/.claude/skills/
```
> ⚠️ KHÔNG để folder backup nào bên trong `~/.claude/skills/` — mọi subfolder ở đó đều bị load thành skill.

Gõ `/video-kfsp` hoặc `/vlog-script` để gọi.

---

## 4. 🔴 BẢO MẬT — Token Vbee + giọng clone của Thanh

File `_shared/vbee/vbee.env` chứa:
- **Token API Vbee** (tài khoản trả phí của KFSP)
- **Voice code clone giọng Thanh** (`...kfspthanh...`) — tài sản riêng của KFSP

**Quy tắc bắt buộc:**
- ❌ KHÔNG commit `vbee.env` lên git/public, KHÔNG share ra ngoài KFSP.
- ❌ KHÔNG đưa giọng clone Thanh cho bên thứ 3.
- ✅ Token có thể hết hạn → báo Thanh để gia hạn với Vbee.
- Đổi giọng: sửa `VBEE_VOICE` trong `vbee.env` (xem danh sách `_shared/vbee/voices_vi.md`).

---

## 5. Quy trình làm 1 video (pipeline 6 bước — GATE từng bước)

Gọi `/video-kfsp` (Điểm tin / HDSD / Vlog) hoặc `/vlog-script` (viết kịch bản trước). Pipeline:

1. **Kịch bản** → tách câu `s01, s02…`, mỗi câu 1 shot.
2. **TTS Vbee** → `_shared/vbee/gen_tts.sh script_tts.txt voiceover.mp3 [speed]`.
3. **Whisper** → lấy word timestamp (chỉ dùng timing, KHÔNG dùng text whisper).
4. **Storyboard + animation** → mỗi câu 1 cảnh, pop đúng nhịp giọng.
5. **Render per-sentence clip** → CẤM render monolithic, ghép bằng ffmpeg concat.
6. **Review + xuất final**.

> 🛑 **Mỗi bước DỪNG chờ duyệt** trước khi qua bước kế. Đọc `CLAUDE.md` để nắm rule TTS (vd viết "KFS B" thay "KFSP"), safe-zone TikTok (y=150–1500), cấm easing `linear`.

---

## 6. Tham khảo nhanh khi bí

| Cần gì | Xem ở đâu |
|---|---|
| Rule tổng (TTS, animation, safe-zone, style giọng Thanh) | `CLAUDE.md` |
| Cách gen TTS + đổi giọng | `_shared/vbee/README.md` |
| Component animation mẫu (Remotion .tsx) | `_shared/remocn-ref/` |
| Ví dụ 1 video hoàn chỉnh từ A→Z | `20260503-3-cau-hoi-thi-truong/` (Vlog) · `20260418-rrg-hdsd/` (HDSD) |
| Storyboard template | `.claude/skills/video-kfsp/PLAN_STORYBOARD_TEMPLATE.md` |

---

## 7. Liên hệ

Vướng ở đâu nhắn **Thanh**. Khi tìm ra cách làm mới / sửa bug → cập nhật ngay vào `CLAUDE.md` (mục tương ứng) để lần sau không lặp lại.
