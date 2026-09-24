const fs = require('fs');
const path = require('path');

// Path definitions
const ROOT_DIR = __dirname;
const SENTENCES_FILE = path.join(ROOT_DIR, "sentences.json");
const TIMESTAMPS_FILE = path.join(ROOT_DIR, "audio", "timestamps.json");
const TIMING_FILE = path.join(ROOT_DIR, "remotion", "src", "timing.ts");

// 1. Load data
const sentences_data = JSON.parse(fs.readFileSync(SENTENCES_FILE, 'utf-8'));
const whisper_data = JSON.parse(fs.readFileSync(TIMESTAMPS_FILE, 'utf-8'));

// 2. Update display and tts from the user's latest voice script
const user_scripts = [
    "Tại sao bạn liên tục trả lại tiền cho thị trường?",
    "Vào năm 1929, giữa lúc chứng khoán Mỹ sụp đổ, Jesse Livermore bỏ túi 100 triệu USD nhờ một cú bán khống lịch sử và bước lên đỉnh cao danh vọng.",
    "Nhưng chưa đầy một thập kỷ sau, Con gấu lớn phố Wall hoàn toàn trắng tay, phá sản và tự kết liễu đời mình.",
    "Bi kịch của Livermore bắt nguồn từ một ranh giới rất mỏng manh, gọi là sự vô kỷ luật. Ở đỉnh cao, chính ông đã tự tay xé bỏ bộ nguyên tắc giao dịch do mình đúc kết.",
    "Hầu hết chúng ta cũng thường lặp lại vòng lặp ấy. Thắng lớn trong uptrend, rồi lại trả lại tất cả khi downtrend ập đến chỉ vì gồng lỗ, nhồi lệnh hoặc nghe ngóng tin đồn.",
    "Để giữ được cái đầu lạnh, bạn không thể chỉ dựa vào những lời tự hứa, và đó là lúc bạn cần đến bộ 3 công cụ cốt lõi của KFSP",
    "Thay vì lúc nào cũng muốn mua bán, Nhịp đập thị trường (IBD) sẽ báo hiệu như đèn giao thông, buộc bạn dừng lại. Kết hợp cùng Bộ lọc Canslim và 4M theo dõi sức khỏe doanh nghiệp, triệt tiêu thói quen đánh cược theo tin đồn.",
    "Cuối cùng, công cụ Quản lý giao dịch giúp mọi lệnh mua bán và điểm cắt lỗ được ghi nhận trực quan. Bạn phải nhìn vào sức khỏe tài khoản, không được \"bỏ quên\" những khoản lỗ đang lớn dần.",
    "Thay vì đánh cược cả gia tài như Livermore, hãy để KFSP đi cùng bạn ngay hôm nay. Mọi quyết định đầu tư đều tiềm ẩn rủi ro và cần kỷ luật quản trị từ chính bạn. Đưa chứng khoán về tầm tay bạn."
];

// Update display texts
sentences_data.sentences.forEach((sentence, i) => {
    sentence.display = user_scripts[i];
    // Update TTS with proper Vietnamese pronunciation tricks
    let tts_text = user_scripts[i];
    tts_text = tts_text.replace(/KFSP/g, "KFS B");
    tts_text = tts_text.replace(/IBD/g, "I B D");
    tts_text = tts_text.replace(/4M/g, "4 M");
    sentence.tts = tts_text;
});

// 3. Map Whisper segments to s01-s09 groups
const groups = {
    "s01": [0],
    "s02": [1, 2],
    "s03": [3],
    "s04": [4, 5],
    "s05": [6, 7],
    "s06": [8, 9],
    "s07": [10, 11, 12],
    "s08": [13, 14],
    "s09": [15, 16, 17]
};

// FPS for Remotion
const FPS = 30;
const absolute_starts = {};
const durations = {};

Object.entries(groups).forEach(([s_id, seg_indices]) => {
    // Collect all words in the group
    const group_words = [];
    seg_indices.forEach(idx => {
        if (whisper_data[idx] && whisper_data[idx].words) {
            group_words.push(...whisper_data[idx].words);
        }
    });

    if (group_words.length === 0) return;

    // Absolute start and end times from Whisper
    const abs_start = group_words[0].s;
    const abs_end = group_words[group_words.length - 1].e;

    absolute_starts[s_id] = abs_start;
    durations[s_id] = abs_end - abs_start;

    // Calculate duration in sentences.json
    const sentence_obj = sentences_data.sentences.find(s => s.id === s_id);
    if (sentence_obj) {
        sentence_obj.duration_s = Math.round((abs_end - abs_start) * 100) / 100;

        // Map display words to whisper timestamps
        const display_words = sentence_obj.display.split(/\s+/);
        const N = display_words.length;
        const M = group_words.length;

        const word_timestamps = [];
        display_words.forEach((d_word, i) => {
            const w_idx = Math.floor((i * M) / N);
            const w_item = group_words[w_idx] || group_words[group_words.length - 1];
            let w_start_rel = Math.round((w_item.s - abs_start) * 100) / 100;
            let w_end_rel = Math.round((w_item.e - abs_start) * 100) / 100;

            if (w_start_rel < 0) w_start_rel = 0.0;
            if (w_end_rel < w_start_rel) w_end_rel = w_start_rel + 0.1;

            word_timestamps.push({
                "word": d_word,
                "start": w_start_rel,
                "end": w_end_rel
            });
        });

        sentence_obj.word_timestamps = word_timestamps;
    }
});

// 4. Calculate timing.ts scenes
const timing_scenes = {};
const s_ids = Object.keys(groups);

s_ids.forEach((s_id, idx) => {
    const abs_start = absolute_starts[s_id];

    // Define start frame
    let from_frame = 0;
    if (idx > 0) {
        // Align from_frame to the silence midpoint between previous and current
        const prev_s_id = s_ids[idx - 1];
        const prev_abs_end = absolute_starts[prev_s_id] + durations[prev_s_id];
        const silence_midpoint = prev_abs_end + (abs_start - prev_abs_end) / 2;
        from_frame = Math.round(silence_midpoint * FPS);
    }

    timing_scenes[s_id] = {
        "from": from_frame,
        "text": user_scripts[idx]
    };
});

// Assign durations
s_ids.forEach((s_id, idx) => {
    if (idx < s_ids.length - 1) {
        const next_s_id = s_ids[idx + 1];
        timing_scenes[s_id].dur = timing_scenes[next_s_id].from - timing_scenes[s_id].from;
    } else {
        // Last scene runs for duration + some padding (e.g. 1.5 seconds)
        const last_dur_frames = Math.round((durations[s_id] + 1.5) * FPS);
        timing_scenes[s_id].dur = last_dur_frames;
    }
});

// Calculate total frames
const total_frames = timing_scenes[s_ids[s_ids.length - 1]].from + timing_scenes[s_ids[s_ids.length - 1]].dur;

// Save sentences.json
s_ids.forEach((s_id) => {
    const sentence_obj = sentences_data.sentences.find(s => s.id === s_id);
    if (sentence_obj) {
        // Calculate pause_after_ms based on scene dur vs voice dur
        const scene_dur_s = timing_scenes[s_id].dur / FPS;
        const voice_dur_s = durations[s_id];
        const pause_ms = Math.max(0, Math.round((scene_dur_s - voice_dur_s) * 1000));
        sentence_obj.pause_after_ms = pause_ms;
    }
});

// Make sure target folder for sentences.json exists
fs.writeFileSync(SENTENCES_FILE, JSON.stringify(sentences_data, null, 2), 'utf-8');

// Write timing.ts
const timingDir = path.dirname(TIMING_FILE);
if (!fs.existsSync(timingDir)) {
    fs.mkdirSync(timingDir, { recursive: true });
}

let timingContent = "export const FPS = 30;\n\n";
timingContent += "export const SCENES = {\n";
s_ids.forEach((s_id) => {
    const sc = timing_scenes[s_id];
    const escaped_text = sc.text.replace(/"/g, '\\"');
    timingContent += `  ${s_id}: { from: ${sc.from}, dur: ${sc.dur}, text: "${escaped_text}" },\n`;
});
timingContent += "};\n\n";
timingContent += `export const TOTAL_FRAMES = ${total_frames};\n`;

fs.writeFileSync(TIMING_FILE, timingContent, 'utf-8');

console.log(`Successfully updated sentences.json and generated timing.ts (${total_frames} total frames / ${(total_frames/30).toFixed(2)}s)!`);
