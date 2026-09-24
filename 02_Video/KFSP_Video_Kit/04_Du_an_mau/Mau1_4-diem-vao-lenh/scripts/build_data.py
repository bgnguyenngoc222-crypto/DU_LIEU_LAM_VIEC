import json, os, subprocess
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
S = json.load(open('sentences.json', encoding='utf-8'))['sentences']
SR = 44100
os.makedirs('audio/sil', exist_ok=True)
listf = 'audio/concat_list.txt'

def dur(f):
    return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration",
        "-of","default=noprint_wrappers=1:nokey=1",f]).decode().strip())

def chunk_words(words, size=5):
    out=[]; i=0
    while i < len(words):
        out.append(words[i:i+size]); i+=size
    # merge tiny last chunk
    if len(out)>=2 and len(out[-1])<=2:
        out[-2]+=out[-1]; out.pop()
    return out

sentences=[]; t=0.0
with open(listf,'w') as lf:
    for s in S:
        sid=s['id']; d=dur(f'audio/{sid}.mp3'); g0=t
        dwords=s['display'].split()
        wt=s['word_timestamps']
        # map display words -> time (global)
        times=[]
        if len(wt)==len(dwords):
            times=[g0+w['start'] for w in wt]
        else:
            # linear across [first whisper start, last whisper end] (or 0..d)
            a = wt[0]['start'] if wt else 0.0
            b = wt[-1]['end'] if wt else d
            n=len(dwords)
            times=[g0 + a + (b-a)*(k/max(1,n-1)) for k in range(n)] if n>1 else [g0+a]
        wobj=[{'w':w,'t':round(times[k],3)} for k,w in enumerate(dwords)]
        chunks=[]
        for ck in chunk_words(wobj,5):
            cstart=ck[0]['t']
            cend=round(ck[-1]['t']+0.5,3)
            chunks.append({'cstart':round(cstart,3),'cend':cend,'words':ck})
        # fix chunk cend to next chunk cstart
        for j in range(len(chunks)-1):
            chunks[j]['cend']=chunks[j+1]['cstart']
        if chunks: chunks[-1]['cend']=round(g0+d,3)
        sentences.append({'id':sid,'phase':s['phase'],'display':s['display'],
                          'start':round(g0,3),'end':round(g0+d,3),'chunks':chunks})
        lf.write(f"file '{os.path.abspath(f'audio/{sid}.mp3')}'\n")
        t+=d
        p=s['pause_after_ms']/1000.0
        if p>0:
            sil=f'audio/sil/{sid}.mp3'
            subprocess.run(["ffmpeg","-y","-f","lavfi","-i",f"anullsrc=r={SR}:cl=mono","-t",str(p),
                            "-q:a","9","-c:a","libmp3lame",sil],check=True,capture_output=True)
            lf.write(f"file '{os.path.abspath(sil)}'\n"); t+=p

os.makedirs('brand/public',exist_ok=True)
subprocess.run(["ffmpeg","-y","-f","concat","-safe","0","-i",listf,"-ar",str(SR),"-ac","1",
                "-c:a","libmp3lame","-q:a","2","brand/public/voice_full.mp3"],check=True,capture_output=True)
total=dur('brand/public/voice_full.mp3')
json.dump({'videoId':'20260605-4-diem-vao-lenh','total_s':round(total,3),'sentences':sentences},
          open('brand/src/data.json','w',encoding='utf-8'),ensure_ascii=False,indent=2)
print(f"voice_full.mp3 = {total:.2f}s")
for s in sentences: print(f"  {s['id']} {s['start']:6.2f}->{s['end']:6.2f}  {len(s['chunks'])} chunks")
