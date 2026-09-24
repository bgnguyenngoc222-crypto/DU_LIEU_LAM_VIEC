import json
import os

# Path definitions
ROOT_DIR = os.path.dirname(__file__)
SENTENCES_FILE = os.path.join(ROOT_DIR, "sentences.json")
TIMESTAMPS_FILE = os.path.join(ROOT_DIR, "audio", "timestamps.json")
TIMING_FILE = os.path.join(ROOT_DIR, "remotion", "src", "timing.ts")

# 1. Load data
with open(SENTENCES_FILE, "r", encoding="utf-8") as f:
    sentences_data = json.load(f)

with open(TIMESTAMPS_FILE, "r", encoding="utf-8") as f:
    whisper_data = json.load(f)

# 2. Update display and tts from the user's latest voice script
user_scripts = [
    "Tại sao bạn liên tục trả lại tiền cho thị trường?",
    "Vào năm 1929, giữa lúc chứng khoán Mỹ sụp đổ, Jesse Livermore bỏ túi 100 triệu USD nhờ một cú bán khống lịch sử và bước lên đỉnh cao danh vọng.",
    "Nhưng chưa đầy một thập kỷ sau, Con gấu lớn phố Wall hoàn toàn trắng tay, phá sản và tự kết liễu đời mình.",
    "Bi kịch của Livermore bắt nguồn từ một ranh giới rất mỏng manh, gọi là sự vô kỷ luật. Ở đỉnh cao, chính ông đã tự tay xé bỏ bộ nguyên tắc giao dịch do mình đúc kết.",
    "Hầu hết chúng ta cũng thường lặp lại vòng lặp ấy. Thắng lớn trong uptrend, rồi lại trả lại tất cả khi downtrend ập đến chỉ vì gồng lỗ, nhồi lệnh hoặc nghe ngóng tin đồn.",
    "Để giữ được cái đầu lạnh, bạn không thể chỉ dựa vào những lời tự hứa, và đó là lúc bạn cần đến bộ 3 công cụ cốt lõi của KFSP",
    "Thay vì lúc nào cũng muốn mua bán, Nhịp đập thị trường (IBD) sẽ báo hiệu như đèn giao thông, buộc bạn dừng lại. Kết hợp cùng Bộ lọc Canslim và 4M theo dõi sức khỏe doanh nghiệp, triệt tiêu thói quen đánh cược theo tin đồn.",
    "Cuối cùng, công cụ Quản lý giao dịch giúp mọi lệnh mua bán và điểm cắt lỗ được ghi nhận trực quan. Bạn phải nhìn vào sức khỏe tài khoản, không được \"bỏ quên\" những khoản lỗ đang lớn dần.",
    "Thay vì đánh cược cả gia tài như Livermore, hãy để KFSP đi cùng bạn ngay hôm nay. Mọi quyết định đầu tư đều tiềm ẩn rủi ro và cần kỷ luật quản trị từ chính bạn. Đưa chứng khoán về tầm tay bạn."
]

# Update display texts
for i, sentence in enumerate(sentences_data["sentences"]):
    sentence["display"] = user_scripts[i]
    # Update TTS with proper Vietnamese pronunciation tricks
    tts_text = user_scripts[i]
    tts_text = tts_text.replace("KFSP", "KFS B")
    tts_text = tts_text.replace("IBD", "I B D")
    tts_text = tts_text.replace("4M", "4 M")
    sentence["tts"] = tts_text

# 3. Map Whisper segments to s01-s09 groups
groups = {
    "s01": [0],
    "s02": [1, 2],
    "s03": [3],
    "s04": [4, 5],
    "s05": [6, 7],
    "s06": [8, 9],
    "s07": [10, 11, 12],
    "s08": [13, 14],
    "s09": [15, 16, 17]
}

# FPS for Remotion
FPS = 30
absolute_starts = {}
durations = {}

for s_id, seg_indices in groups.items():
    # Collect all words in the group
    group_words = []
    for idx in seg_indices:
        group_words.extend(whisper_data[idx]["words"])
    
    # Absolute start and end times from Whisper
    abs_start = group_words[0]["s"]
    abs_end = group_words[-1]["e"]
    
    absolute_starts[s_id] = abs_start
    durations[s_id] = abs_end - abs_start
    
    # Calculate duration in sentences.json
    sentence_obj = next(s for s in sentences_data["sentences"] if s["id"] == s_id)
    sentence_obj["duration_s"] = round(abs_end - abs_start, 2)
    
    # Map display words to whisper timestamps
    display_words = sentence_obj["display"].split()
    N = len(display_words)
    M = len(group_words)
    
    word_timestamps = []
    for i, d_word in enumerate(display_words):
        w_idx = int(i * M / N)
        w_item = group_words[w_idx]
        w_start_rel = round(w_item["s"] - abs_start, 2)
        w_end_rel = round(w_item["e"] - abs_start, 2)
        
        if w_start_rel < 0: w_start_rel = 0.0
        if w_end_rel < w_start_rel: w_end_rel = w_start_rel + 0.1
        
        word_timestamps.append({
            "word": d_word,
            "start": w_start_rel,
            "end": w_end_rel
        })
        
    sentence_obj["word_timestamps"] = word_timestamps

# 4. Calculate timing.ts scenes
# We want each scene s_id to start at its absolute start frame
# and last until the next scene starts.
timing_scenes = {}
s_ids = list(groups.keys())

for idx, s_id in enumerate(s_ids):
    abs_start = absolute_starts[s_id]
    
    # Define start frame
    if idx == 0:
        from_frame = 0
    else:
        # Align from_frame to the silence midpoint between previous and current
        prev_s_id = s_ids[idx - 1]
        prev_abs_end = absolute_starts[prev_s_id] + durations[prev_s_id]
        silence_midpoint = prev_abs_end + (abs_start - prev_abs_end) / 2
        from_frame = int(round(silence_midpoint * FPS))
        
    timing_scenes[s_id] = {
        "from": from_frame,
        "text": user_scripts[idx]
    }

# Assign durations
for idx, s_id in enumerate(s_ids):
    if idx < len(s_ids) - 1:
        next_s_id = s_ids[idx + 1]
        timing_scenes[s_id]["dur"] = timing_scenes[next_s_id]["from"] - timing_scenes[s_id]["from"]
    else:
        # Last scene runs for duration + some padding (e.g. 1.5 seconds)
        last_dur_frames = int(round((durations[s_id] + 1.5) * FPS))
        timing_scenes[s_id]["dur"] = last_dur_frames

# Calculate total frames
total_frames = timing_scenes[s_ids[-1]]["from"] + timing_scenes[s_ids[-1]]["dur"]

# Save sentences.json
for idx, s_id in enumerate(s_ids):
    sentence_obj = next(s for s in sentences_data["sentences"] if s["id"] == s_id)
    # Calculate pause_after_ms based on scene dur vs voice dur
    scene_dur_s = timing_scenes[s_id]["dur"] / FPS
    voice_dur_s = durations[s_id]
    pause_ms = int(max(0, (scene_dur_s - voice_dur_s) * 1000))
    sentence_obj["pause_after_ms"] = pause_ms

with open(SENTENCES_FILE, "w", encoding="utf-8") as f:
    json.dump(sentences_data, f, ensure_ascii=False, indent=2)

# Write timing.ts
os.makedirs(os.path.dirname(TIMING_FILE), exist_ok=True)
with open(TIMING_FILE, "w", encoding="utf-8") as f:
    f.write("export const FPS = 30;\n\n")
    f.write("export const SCENES = {\n")
    for s_id in s_ids:
        sc = timing_scenes[s_id]
        escaped_text = sc["text"].replace('"', '\\"')
        f.write(f'  {s_id}: {{ from: {sc["from"]}, dur: {sc["dur"]}, text: "{escaped_text}" }},\n')
    f.write("};\n\n")
    f.write(f"export const TOTAL_FRAMES = {total_frames};\n")

print(f"Successfully updated sentences.json and generated timing.ts ({total_frames} total frames / {total_frames/30:.2f}s)!")
