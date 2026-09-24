#!/usr/bin/env python3
import whisper, json, os, sys
BASE = os.path.expanduser("~/Desktop/VIDEO KFSP/20260730-cktt-wyckoff-bai5")
audio = sys.argv[1] if len(sys.argv) > 1 else "voiceover_p1_full.mp3"
out = sys.argv[2] if len(sys.argv) > 2 else "whisper_p1.json"
m = whisper.load_model("medium")
r = m.transcribe(os.path.join(BASE, audio), language="vi", word_timestamps=True, verbose=False)
words = []
for seg in r["segments"]:
    for w in seg.get("words", []):
        words.append({"word": w["word"].strip(), "start": round(w["start"],3), "end": round(w["end"],3)})
json.dump({"words": words, "segments":[{"start":s["start"],"end":s["end"],"text":s["text"]} for s in r["segments"]]},
          open(os.path.join(BASE, out),"w"), ensure_ascii=False, indent=1)
print(f"whisper done: {len(words)} words, last_word_end={words[-1]['end'] if words else 0}")
