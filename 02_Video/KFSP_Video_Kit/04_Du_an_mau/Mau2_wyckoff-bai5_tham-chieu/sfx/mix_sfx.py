#!/usr/bin/env python3
# Mix SFX lên bản ĐÃ TĂNG TỐC — "Wyckoff · Bài 5 · Điểm vào theo Wyckoff (nửa MUA)".
# Mốc theo FRAME gốc (30fps, timeline 1x) bám timing.ts. Giây bản tăng tốc = frame/30/SPEED.
# SPEED chốt 1.38 (CEO 30/07): 239.26s → 173.4s = 2:53, dưới trần 3 phút.
# Phủ đủ MỌI màn: hook · bắc cầu · H1 bản đồ · H2 điểm mua 1 · H3 điểm mua 2 · teaser app
#                 · H4 Nhân-Quả · cầu sang phần hai · kết.
import subprocess, os, sys
BASE = os.path.dirname(os.path.abspath(__file__)); SPEED = 1.38; FPS = 30
SFX = {"whoosh": f"{BASE}/whoosh.mp3", "pop": f"{BASE}/pop.mp3", "ting": f"{BASE}/ting.mp3", "thud": f"{BASE}/thud.wav"}
GAIN = {"whoosh": 0.5, "pop": 0.6, "ting": 0.5, "thud": 0.85}
EVENTS = [
    # ---- HOOK ----
    (0,    "whoosh"),  # s01 vào bài
    (160,  "thud"),    # s02 bấm mua ngay giữa hộp (cú sai)
    (306,  "pop"),     # s03 công sức đổ sông đổ bể
    (590,  "ting"),    # s05 ba thẻ hứa hẹn
    # ---- BẮC CẦU ----
    (789,  "whoosh"),  # s06 bốn bài trước
    (1024, "ting"),    # s07 card bài khép
    # ---- H1 BẢN ĐỒ: phản-ví-dụ rồi vùng đáng vào ----
    (1243, "whoosh"),  # s10 vào chart, sai lầm phổ biến
    (1454, "thud"),    # s10b ✕ đừng mua giữa hộp
    (1616, "thud"),    # s11 ✕ đừng đoán đáy
    (1761, "ting"),    # s12 vòng xanh chặng cuối
    # ---- H2 ĐIỂM MUA 1 ----
    (2098, "whoosh"),  # s13 sang điểm mua thứ nhất
    (2203, "thud"),    # s14 giá thủng biên dưới
    (2528, "pop"),     # s16 xác nhận: nến dài + khối lượng lớn
    (2844, "ting"),    # s18 điểm mua
    (2976, "thud"),    # s19 điểm dừng lỗ dưới đáy cú giũ
    (3301, "ting"),    # s21 chip "Điều cần thấy" 1
    # ---- H3 ĐIỂM MUA 2 ----
    (3490, "whoosh"),  # s22 sang cơ hội thứ hai
    (3607, "pop"),     # s23 giá vượt biên trên
    (3889, "pop"),     # s25 quay lại mép suối
    (4351, "thud"),    # s28 điểm dừng lỗ dưới điểm hỗ trợ cuối
    (4602, "ting"),    # s30 chip "Điều cần thấy" 2
    # ---- TEASER APP ----
    (4778, "whoosh"),  # tz1 teaser "Cơ hội tiềm năng" vào
    # ---- H4 NHÂN-QUẢ ----
    (5279, "whoosh"),  # s31 quay lại chart mục tiêu
    (5465, "pop"),     # s33 NHÂN: bề ngang vùng tích luỹ
    (5878, "pop"),     # s36 QUẢ: chiếu lên phía trên
    (6330, "ting"),    # s39 chip "Điều cần thấy" 3
    # ---- CẦU SANG PHẦN HAI + KẾT ----
    (6468, "whoosh"),  # s40 nửa phần mua xong
    (6706, "ting"),    # s42 card phần hai
    (6863, "whoosh"),  # s43 CTA vào
    (7115, "ting"),    # s45 brand spine
]
SRC = sys.argv[1] if len(sys.argv) > 1 else None
DST = sys.argv[2] if len(sys.argv) > 2 else None
if not SRC or not DST: sys.exit("Usage: python3 mix_sfx.py <in.mp4> <out_sfx.mp4>")
inp = ["-i", SRC]; types = sorted(set(t for _, t in EVENTS)); idx = {}
for i, t in enumerate(types): inp += ["-i", SFX[t]]; idx[t] = i + 1
fc = []; cnt = {t: sum(1 for _, tt in EVENTS if tt == t) for t in types}; splits = {}
for t in types:
    n = cnt[t]; outs = "".join(f"[{t}{k}]" for k in range(n))
    fc.append(f"[{idx[t]}:a]asplit={n}{outs}"); splits[t] = [f"{t}{k}" for k in range(n)]
used = {t: 0 for t in types}; labels = []
for fr, t in EVENTS:
    ms = int(fr / FPS / SPEED * 1000); lbl = splits[t][used[t]]; used[t] += 1; out = f"e_{lbl}"
    fc.append(f"[{lbl}]adelay={ms}|{ms},volume={GAIN[t]}[{out}]"); labels.append(out)
mixins = "[0:a]" + "".join(f"[{l}]" for l in labels)
fc.append(f"{mixins}amix=inputs={len(labels)+1}:normalize=0:dropout_transition=0[aout]")
cmd = ["ffmpeg", "-y"] + inp + ["-filter_complex", ";".join(fc), "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", DST]
print(f"events: {len(EVENTS)} SPEED={SPEED} -> {DST}")
r = subprocess.run(cmd, capture_output=True, text=True)
print(r.stderr[-500:] if r.returncode else f"OK -> {DST}")
