import json, os, subprocess, whisper
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
S = json.load(open('sentences.json', encoding='utf-8'))['sentences']
NB_DISPLAY = "Follow để xem tiếp cách đọc điểm vào, còn muốn được nhắc khi giá tới vùng đẹp thì theo dõi mình nha."

def dur(f):
    return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration",
        "-of","default=noprint_wrappers=1:nokey=1",f]).decode().strip())

# whisper s13_nb
model = whisper.load_model("small")
r = model.transcribe("audio/s13_nb.mp3", language="vi", word_timestamps=True, verbose=False)
wt=[]
for seg in r["segments"]:
    for w in seg.get("words", []):
        wt.append({"word":w["word"].strip(),"start":round(w["start"],3),"end":round(w["end"],3)})

# build nobrand sentence list
sent=[]
for s in S:
    if s['id']=='s13':
        s=dict(s); s['display']=NB_DISPLAY; s['tts']=NB_DISPLAY
        s['duration_s']=round(dur("audio/s13_nb.mp3"),3); s['word_timestamps']=wt
        s['_audio']="audio/s13_nb.mp3"
    else:
        s=dict(s); s['_audio']=f"audio/{s['id']}.mp3"
    sent.append(s)

def chunk_words(words,size=5):
    out=[];i=0
    while i<len(words): out.append(words[i:i+size]); i+=size
    if len(out)>=2 and len(out[-1])<=2: out[-2]+=out[-1]; out.pop()
    return out

SR=44100; os.makedirs('audio/sil',exist_ok=True)
listf='audio/concat_nb.txt'; sentences=[]; t=0.0
with open(listf,'w') as lf:
    for s in sent:
        d=dur(s['_audio']); g0=t
        dwords=s['display'].split(); w=s['word_timestamps']
        if len(w)==len(dwords): times=[g0+x['start'] for x in w]
        else:
            a=w[0]['start'] if w else 0; b=w[-1]['end'] if w else d; n=len(dwords)
            times=[g0+a+(b-a)*(k/max(1,n-1)) for k in range(n)] if n>1 else [g0+a]
        wobj=[{'w':x,'t':round(times[k],3)} for k,x in enumerate(dwords)]
        chunks=[]
        for ck in chunk_words(wobj,5):
            chunks.append({'cstart':round(ck[0]['t'],3),'cend':round(ck[-1]['t']+0.5,3),'words':ck})
        for j in range(len(chunks)-1): chunks[j]['cend']=chunks[j+1]['cstart']
        if chunks: chunks[-1]['cend']=round(g0+d,3)
        sentences.append({'id':s['id'],'phase':s['phase'],'display':s['display'],
                          'start':round(g0,3),'end':round(g0+d,3),'chunks':chunks})
        lf.write(f"file '{os.path.abspath(s['_audio'])}'\n"); t+=d
        p=s['pause_after_ms']/1000.0
        if p>0:
            sil=f"audio/sil/{s['id']}_nb.mp3"
            subprocess.run(["ffmpeg","-y","-f","lavfi","-i",f"anullsrc=r={SR}:cl=mono","-t",str(p),
                            "-q:a","9","-c:a","libmp3lame",sil],check=True,capture_output=True)
            lf.write(f"file '{os.path.abspath(sil)}'\n"); t+=p

subprocess.run(["ffmpeg","-y","-f","concat","-safe","0","-i",listf,"-ar",str(SR),"-ac","1",
                "-c:a","libmp3lame","-q:a","2","nobrand/public/voice_full.mp3"],check=True,capture_output=True)
total=dur("nobrand/public/voice_full.mp3")
json.dump({'videoId':'20260605-4-diem-vao-lenh-nobrand','total_s':round(total,3),'sentences':sentences},
          open('nobrand/src/data.json','w',encoding='utf-8'),ensure_ascii=False,indent=2)
print(f"nobrand voice_full = {total:.2f}s ; s13: {sentences[-1]['display']}")
