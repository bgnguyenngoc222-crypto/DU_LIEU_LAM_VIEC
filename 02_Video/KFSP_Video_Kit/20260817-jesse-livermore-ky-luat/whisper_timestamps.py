"""
Whisper Timestamps Extractor — Video Livermore
Chạy: python whisper_timestamps.py
Input: audio/voice_full.mp3
Output: audio/timestamps.json
"""
import sys, os

# Tự tìm Python path nếu chạy từ shell mới
PYTHON_DIR = os.path.join(os.environ.get("LOCALAPPDATA", ""), "Programs", "Python", "Python312")

try:
    import whisper
except ImportError:
    print("Whisper chưa cài. Đang cài...")
    os.system(f'"{os.path.join(PYTHON_DIR, "python.exe")}" -m pip install openai-whisper')
    import whisper

import json

AUDIO_FILE = os.path.join(os.path.dirname(__file__), "audio", "voice_full.mp3")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "audio", "timestamps.json")

if not os.path.exists(AUDIO_FILE):
    print(f"❌ Chưa có file audio: {AUDIO_FILE}")
    print("   Hãy tạo audio từ Vbee trước, lưu thành audio/voice_full.mp3")
    sys.exit(1)

print(f"🎤 Đang transcribe: {AUDIO_FILE}")
print("   (Lần đầu sẽ tải model ~500MB, lần sau dùng cache)")

model = whisper.load_model("small")  # 'small' cho tiếng Việt tốt hơn 'base'
result = model.transcribe(AUDIO_FILE, language="vi", word_timestamps=True)

segments = result["segments"]
output = []

for seg in segments:
    entry = {
        "s": round(seg["start"], 2),
        "e": round(seg["end"], 2),
        "t": seg["text"].strip(),
    }
    if "words" in seg:
        entry["words"] = [
            {
                "w": w["word"].strip(),
                "s": round(w["start"], 2),
                "e": round(w["end"], 2),
            }
            for w in seg["words"]
        ]
    output.append(entry)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"✅ Done! {len(output)} segments → {OUTPUT_FILE}")
print()
print("Gửi file timestamps.json cho Claude để điền vào sentences.json")
