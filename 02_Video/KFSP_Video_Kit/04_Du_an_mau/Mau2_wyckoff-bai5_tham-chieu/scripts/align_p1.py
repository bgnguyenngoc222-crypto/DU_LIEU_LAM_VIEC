#!/usr/bin/env python3
# Căn frame mỗi beat P1 từ whisper_p1.json. Khớp câu mở (anchor) vào chuỗi từ (forward search).
# onset = start time của từ đầu beat; frame = round((onset-0.15)*30). In ra block B cho timing.ts.
# 🔴 ANCHOR VIẾT THEO ĐÚNG CHUỖI WHISPER GHI, không theo kịch bản (skill L24):
#    "cú giũ"→"cú rũ" · "Quai-cốp"→"quay cốt" · "cấu trúc"→"cầu chúc" · "bốn điều"→"4 điều"
#    "điểm dừng lỗ"→"điểm rừng lỗ" · "tích luỹ"→"tích lưỡi" · "giản dị"→"giàn dị" · "chặng"→"trạng"
import json, os, re
BASE = os.path.expanduser("~/Desktop/VIDEO KFSP/20260730-cktt-wyckoff-bai5")
W = json.load(open(os.path.join(BASE, "whisper_p1.json")))
words = W["words"]

def norm(s):
    s = s.lower()
    s = re.sub(r"[^0-9a-zàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ ]", " ", s)
    return re.sub(r"\s+", " ", s).strip()

buf = ""; char2wi = []
for i, w in enumerate(words):
    t = norm(w["word"])
    if not t: continue
    if buf: buf += " "; char2wi.append(-1)
    for _ in t: char2wi.append(i)
    buf += t

# 🔴 rev2 (30/07 chiều) — lời đổi nhiều ở HOOK + thêm 2 câu mới (s10 "sai lầm phổ biến",
#    s12b "dấu hiệu để biết đã đến lúc"). Thứ tự beat giữ nguyên.
ANCHORS = [
    # HOOK
    ("s01", "ngồi cả buổi đọc"),
    ("s02", "tới lúc bấm lệnh"),
    ("s03", "đọc đúng xong rồi mà vào sai chỗ"),
    ("s04", "đọc ra được cái hộp mới là phần dễ"),
    ("s05", "video này chỉ bán 3 việc"),
    # BẮC CẦU
    ("s06", "4 bài trước ta đã đi qua"),
    ("s07", "bài này khép lại loạt bài"),
    # 🔴 s08/s09 (Nói ngay... không có nút bấm mua bán...) — Vbee NUỐT MẤT đoạn này trong
    #    bản đọc 30/07 14:10. Không có audio → bỏ beat, chart bắt đầu từ s10.
    # NGUYÊN TẮC (2 câu mới: s10 sai lầm phổ biến · s12b dấu hiệu để biết đã đến lúc)
    ("s10", "trước hết ta cần biết sai"),
    ("s10b", "đừng mua ở giữa hộp"),
    ("s11", "cũng đừng đoán đáy"),
    ("s12", "chỗ đang vào nằm ở trận cuối"),
    ("s12b", "thứ làm nên khác biệt"),
    # ĐIỂM MUA 1
    ("s13", "thứ nhất nằm ngay sau cú rũ"),
    ("s14", "giá thủng xuống dưới biên dưới"),
    ("s15", "nhưng riêng cú rũ thì chưa phải"),
    ("s16", "cái cần chờ là một dấu hiệu xác nhận"),
    ("s17", "đúng cập đồng thuận ở bài"),
    ("s18", "vậy điểm mua nằm ở nhịp bật lên"),
    ("s19", "còn điểm rừng lỗ đặt ngay dưới đáy"),
    ("s20", "vì nếu giá thủng đáy đó lần nữa"),
    ("s21", "điều cần thấy ở đây cú rũ chỉ mở cửa"),
    # ĐIỂM MUA 2
    ("s22", "không phải lúc nào cũng bắt"),
    ("s23", "sau khi giá vượt lên qua biên trên"),
    ("s24", "mượn hình ảnh con suối"),
    ("s25", "giờ nó quay lại mắp suối"),
    ("s26", "nhịp quay lại này gọi là điểm hỗ trợ cuối"),
    ("s27", "thân nến co lại"),
    ("s28", "điểm rừng lỗ đặt ngay dưới cái điểm hỗ trợ cuối"),
    ("s29", "nếu giá thủng luôn cả vùng này"),
    ("s30", "giá quay lại mắp biên cũ trên"),
    # TEASER APP
    ("tz1", "tạm dừng một"),
    ("tz2", "cập nhật nhanh cho bạn"),
    ("tz3", "vài thao tác đơn giản"),
    ("tz4", "bạn cũng có thể tham khảo ý tưởng"),
    # MỤC TIÊU NHÂN-QUẢ
    ("s31", "giờ quay lại câu hỏi vào rồi"),
    ("s32", "quy luật nhân và quả"),
    ("s33", "cái hộp đi ngang càng rộng"),
    ("s34", "nhân lớn thì quả cũng có xu hướng lớn"),
    ("s35", "nên bề ngang vùng tích lũy"),
    ("s36", "đo bề ngang cái hộp rồi chiếu lên"),
    ("s37", "nhớ kỹ hai chữ ước lượng"),
    ("s38", "đây là mốc để bạn biết trước"),
    ("s39", "bề ngang cái hộp ước lượng bề cao"),
    # CẦU SANG P2
    ("s40", "đó là nửa phần mua"),
    ("s41", "cái hộp đó là một cái đỉnh"),
    ("s42", "phần hai sẽ lật ngược tấm gương"),
    # CTA
    ("s43", "theo dõi kênh để đón phần hai"),
    ("s44", "hãy tải áp"),
    ("s45", "đưa chứng khoán về tầm tay bạn"),
]

pos = 0; res = []; misses = []
for bid, anc in ANCHORS:
    a = norm(anc)
    j = buf.find(a, pos)
    if j < 0:  # fallback: khớp bằng nửa đầu anchor
        a2 = " ".join(a.split()[:3]); j = buf.find(a2, pos)
    if j < 0:
        misses.append((bid, anc)); res.append((bid, None)); continue
    wi = char2wi[j]
    onset = words[wi]["start"]
    fr = max(0, round((onset - 0.15) * 30))
    res.append((bid, fr)); pos = j + 1

dur = words[-1]["end"]
print(f"// last_word_end={dur:.2f}  TOTAL_F={round(dur*30)+30}")
prev = -1
for bid, fr in res:
    if fr is None:
        print(f"  {bid}: MISS")
    else:
        flag = "   <-- LÙI!" if fr <= prev else ""
        print(f"  {bid}: {{ on: {fr} }},{flag}")
        prev = fr
if misses:
    print("\nMISSES:", misses)
else:
    print("\nOK: khong con MISS")
