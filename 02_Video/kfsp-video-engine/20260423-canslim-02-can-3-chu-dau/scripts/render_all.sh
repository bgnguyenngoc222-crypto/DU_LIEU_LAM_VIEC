#!/bin/bash
# Render per-sentence then stitch fullpreview
set -e
cd "$(dirname "$0")/.."
CLIPS=clips
mkdir -p "$CLIPS"

cd remotion-canslim
SENTS=$(node -e "console.log(require('./src/sentences.data.json').sentences.map(s=>s.id).join(' '))")

# Phase 1: render all per-sentence in serial (avoid overload — concurrency in remotion.config.ts)
for sid in $SENTS; do
  out="../$CLIPS/$sid.mp4"
  if [ -f "$out" ]; then
    echo "[$sid] skip (exists)"
    continue
  fi
  echo "[$sid] rendering…"
  npx remotion render "Sentence-$sid" --output="$out" --concurrency=2 --log=error 2>&1 | grep -vE "^$" | tail -3
done
echo "✅ All sentence clips done"

# Phase 2: build concat list with silence padding
cd ..
python3 scripts/build_concat.py
echo "🎬 Stitching → fullpreview.mp4 …"
ffmpeg -y -f concat -safe 0 -i clips/concat_list.txt -c:v libx264 -preset fast -crf 22 -c:a aac -b:a 128k fullpreview.mp4 2>&1 | tail -8
echo "✅ fullpreview.mp4 ready"
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 fullpreview.mp4
