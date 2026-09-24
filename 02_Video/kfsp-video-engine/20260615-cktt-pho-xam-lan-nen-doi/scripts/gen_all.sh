#!/bin/bash
# Chạy 1 phát: gen 3 voiceover Vbee → whisper → align → populate sentences.json
# Yêu cầu: token Vbee trong _shared/vbee/vbee.env còn hiệu lực.
set -e
cd "$(dirname "$0")/.."
SH="../_shared/vbee/gen_tts.sh"

echo "===== [1/3] gen voiceover (Vbee) ====="
bash "$SH" audio/seg_core.txt        audio/voiceover_core.mp3        1.0
bash "$SH" audio/seg_cta_brand.txt   audio/voiceover_cta_brand.mp3   1.0
bash "$SH" audio/seg_cta_nobrand.txt audio/voiceover_cta_nobrand.mp3 1.0

echo "===== [2/3] whisper word-timestamps ====="
python3 scripts/run_whisper.py audio/voiceover_core.mp3        audio/voiceover_core_words.json
python3 scripts/run_whisper.py audio/voiceover_cta_brand.mp3   audio/voiceover_cta_brand_words.json
python3 scripts/run_whisper.py audio/voiceover_cta_nobrand.mp3 audio/voiceover_cta_nobrand_words.json

echo "===== [3/3] align per-sentence + populate sentences.json ====="
python3 scripts/align_multi.py

echo "✅ XONG. Kiểm tra audio/s*.mp3 + sentences.json (duration_s + word_timestamps)."
