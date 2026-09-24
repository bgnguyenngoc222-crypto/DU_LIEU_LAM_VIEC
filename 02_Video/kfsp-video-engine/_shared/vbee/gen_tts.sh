#!/bin/bash
# Vbee TTS generator — dùng chung cho mọi video KFSP
# Usage: ./gen_tts.sh <script_tts.txt> <output.mp3>

set -e

SCRIPT_FILE="${1:?Usage: gen_tts.sh <script_tts.txt> <output.mp3> [speed_rate=1.0] [voice_code=from_env]}"
OUTPUT_FILE="${2:?Usage: gen_tts.sh <script_tts.txt> <output.mp3> [speed_rate=1.0] [voice_code=from_env]}"
SPEED_RATE="${3:-1.0}"
VOICE_OVERRIDE="${4:-}"

# Load credentials (handles spaces after =)
ENV_FILE="$(dirname "$0")/vbee.env"
VBEE_APP_ID=$(grep '^VBEE_APP_ID' "$ENV_FILE" | cut -d= -f2- | tr -d ' ')
VBEE_TOKEN=$(grep '^VBEE_TOKEN' "$ENV_FILE" | cut -d= -f2- | tr -d ' ')
VBEE_VOICE=$(grep '^VBEE_VOICE' "$ENV_FILE" | cut -d= -f2- | tr -d ' ')
[ -n "$VOICE_OVERRIDE" ] && VBEE_VOICE="$VOICE_OVERRIDE"

# Strip comment lines (#...) and section headers ([...]), join dialog
TEXT=$(grep -v '^#' "$SCRIPT_FILE" | grep -v '^\[' | grep -v '^$' | tr '\n' ' ' | sed 's/"/\\"/g')

echo "📝 Input length: ${#TEXT} chars"
echo "🎤 Voice: $VBEE_VOICE"
echo "⏱  Speed rate: $SPEED_RATE"

# Submit TTS request
echo "⏳ Submitting to Vbee..."
RESPONSE=$(curl -s -X POST "https://vbee.vn/api/v1/tts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $VBEE_TOKEN" \
  -d "{\"app_id\":\"$VBEE_APP_ID\",\"voice_code\":\"$VBEE_VOICE\",\"input_text\":\"$TEXT\",\"audio_type\":\"mp3\",\"bitrate\":128,\"speed_rate\":\"$SPEED_RATE\",\"callback_url\":\"https://httpbin.org/post\"}")

REQ_ID=$(echo "$RESPONSE" | python3 -c "import json,sys;print(json.load(sys.stdin)['result']['request_id'])")
echo "✅ Request ID: $REQ_ID"

# Poll until SUCCESS
for i in {1..60}; do
  sleep 2
  STATUS_JSON=$(curl -s "https://vbee.vn/api/v1/tts/$REQ_ID" -H "Authorization: Bearer $VBEE_TOKEN")
  STATUS=$(echo "$STATUS_JSON" | python3 -c "import json,sys;print(json.load(sys.stdin)['result']['status'])")
  PROGRESS=$(echo "$STATUS_JSON" | python3 -c "import json,sys;print(json.load(sys.stdin)['result'].get('progress', 0))")
  echo "   [$i] status=$STATUS progress=$PROGRESS%"
  if [ "$STATUS" = "SUCCESS" ]; then
    AUDIO_URL=$(echo "$STATUS_JSON" | python3 -c "import json,sys;print(json.load(sys.stdin)['result']['audio_link'])")
    echo "🎧 Audio URL: $AUDIO_URL"
    break
  fi
  if [ "$STATUS" = "FAILED" ]; then
    echo "❌ FAILED: $STATUS_JSON"
    exit 1
  fi
done

# Download
echo "⬇️  Downloading..."
curl -sL "$AUDIO_URL" -o "$OUTPUT_FILE"
SIZE=$(stat -f%z "$OUTPUT_FILE" 2>/dev/null || stat -c%s "$OUTPUT_FILE")
DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$OUTPUT_FILE" 2>/dev/null)
echo "✅ Saved: $OUTPUT_FILE ($SIZE bytes, ${DURATION}s)"
