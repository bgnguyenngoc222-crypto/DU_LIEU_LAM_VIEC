import json, os, subprocess, whisper
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
s = json.load(open('sentences.json', encoding='utf-8'))
model = whisper.load_model("small")
def dur(f):
    return float(subprocess.check_output(["ffprobe","-v","error","-show_entries",
        "format=duration","-of","default=noprint_wrappers=1:nokey=1",f]).decode().strip())
for x in s['sentences']:
    sid = x['id']; mp3 = f"audio/{sid}.mp3"
    r = model.transcribe(mp3, language="vi", word_timestamps=True, verbose=False)
    words=[]
    for seg in r["segments"]:
        for w in seg.get("words", []):
            words.append({"word": w["word"].strip(), "start": round(w["start"],3), "end": round(w["end"],3)})
    x['duration_s'] = round(dur(mp3),3)
    x['word_timestamps'] = words
    json.dump({"id":sid,"text":r["text"].strip(),"words":words},
              open(f"audio/{sid}.json","w",encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"{sid}  {x['duration_s']:.2f}s  {len(words)}w  | {r['text'].strip()[:60]}")
json.dump(s, open('sentences.json','w',encoding='utf-8'), ensure_ascii=False, indent=2)
tot = sum(x['duration_s'] + x['pause_after_ms']/1000 for x in s['sentences'])
print(f"TOTAL with pauses: {tot:.2f}s")
