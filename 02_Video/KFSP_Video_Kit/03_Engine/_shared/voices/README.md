# Giọng clone — VieNeu-TTS

> Clone từ audio Vbee gốc, dùng VieNeu-TTS v3 Turbo (zero-shot, 20s reference).
> Tạo ngày 2026-06-21, trên máy Windows (Quadro P620).

## 2 giọng

| File | Giọng gốc | Reference | Clone model | Ghi chú |
|---|---|---|---|---|
| `clone-thanh.wav` | Thanh (clone Vbee `kfspthanh`) | `ref-thanh-20s.wav` (từ `draft_1_thanh.mp3`) | VieNeu-TTS Turbo | Giọng Nam Bắc, điềm đạm |
| `clone-minhquan.wav` | Minh Quân (Vbee `hn_male_minhquan_yt-stable`) | `ref-minhquan-20s.wav` (từ `draft_3_minhquan.mp3`) | VieNeu-TTS Turbo | Giọng Nam Bắc, trẻ |

## Cách dùng (Python)

```python
from vieneu import Vieneu
tts = Vieneu()

# Clone từ reference
audio = tts.infer(text="Nội dung cần đọc", ref_audio="_shared/voices/clone-thanh.wav")
tts.save(audio, "output.wav")
```

## Reference files

- `ref-thanh-20s.wav` — 20s, 16kHz mono — từ `draft_1_thanh.mp3` (4 điểm vào lệnh)
- `ref-minhquan-20s.wav` — 20s, 16kHz mono — từ `draft_3_minhquan.mp3` (4 điểm vào lệnh)

Dùng `ref-*.wav` để re-clone nếu cần cập nhật model sau này.
