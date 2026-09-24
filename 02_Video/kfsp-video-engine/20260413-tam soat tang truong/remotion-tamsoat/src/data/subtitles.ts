import { SubtitleEntry } from "../types";

// ═══════════════════════════════════════════
// Subtitle data — 5-6 word karaoke chunks
// Synced with Whisper word timestamps
// Audio: v4_kfspthanh.mp3 (109.3s)
// FPS = 30 | Total: 98 chunks
// ═══════════════════════════════════════════

export const SUBTITLES: SubtitleEntry[] = [
  // ─── HOOK ───
  { start: 0, end: 24, text: "Trong khi nhiều người chỉ mất" },
  { start: 24, end: 55, text: "chừng 30 giây để lọc ra" },
  { start: 55, end: 81, text: "hàng chục mã cổ phiếu tăng" },
  { start: 81, end: 122, text: "trưởng, thì bạn vẫn đang loay" },
  { start: 122, end: 153, text: "hoay hàng giờ đồng hồ ngụp" },
  { start: 153, end: 180, text: "lặn trong mớ Báo cáo tài" },
  { start: 180, end: 184, text: "chính dày cộp?" },
  { start: 213, end: 242, text: "Đừng tốn thời gian đọc thủ" },
  { start: 242, end: 255, text: "công như vậy nữa!" },
  { start: 271, end: 297, text: "Hôm nay mình sẽ hướng dẫn" },
  { start: 297, end: 321, text: "các bạn cách tìm ra cổ" },
  { start: 321, end: 357, text: "phiếu tăng trưởng chỉ với 3" },
  { start: 357, end: 397, text: "thao tác, giúp tiết kiệm hàng" },
  { start: 397, end: 423, text: "giờ đồng hồ đọc số liệu" },
  { start: 423, end: 427, text: "mệt mỏi." },

  // ─── BƯỚC 1 ───
  { start: 459, end: 499, text: "Thứ nhất, bạn hãy truy cập" },
  { start: 499, end: 526, text: "vào công cụ Bộ lọc cổ" },
  { start: 526, end: 554, text: "phiếu ngay trên ứng dụng KFSP." },

  // ─── BƯỚC 2a ───
  { start: 586, end: 595, text: "Thứ hai." },
  { start: 612, end: 648, text: "Thao tác ở phần tùy chỉnh," },
  { start: 648, end: 673, text: "bạn chọn vào nhóm tiêu chí" },
  { start: 673, end: 712, text: "Cơ bản, và thêm giúp mình" },
  { start: 712, end: 733, text: "3 chỉ số then chốt sau." },
  { start: 746, end: 786, text: "Tăng trưởng Doanh thu thuần, Tăng", keywords: [{ word: "Doanh thu thuần", color: "green" as const }] },
  { start: 786, end: 807, text: "trưởng Lợi nhuận sau thuế,", keywords: [{ word: "Lợi nhuận sau thuế", color: "green" as const }] },
  { start: 820, end: 837, text: "và Tăng trưởng EPS.", keywords: [{ word: "EPS", color: "green" as const }] },

  // ─── BƯỚC 2b ───
  { start: 854, end: 880, text: "Lưu ý là chúng ta sẽ" },
  { start: 880, end: 912, text: "chọn tất cả ở mốc TTM", keywords: [{ word: "TTM", color: "purple" as const }] },
  { start: 912, end: 922, text: "nhé." },
  { start: 934, end: 960, text: "Tức là hệ thống sẽ tự" },
  { start: 960, end: 988, text: "động ghép số liệu bốn quý" },
  { start: 988, end: 1017, text: "gần nhất lại, để có cái" },
  { start: 1017, end: 1037, text: "nhìn tròn trịa một năm." },
  { start: 1054, end: 1075, text: "Và để lọc ra những doanh" },
  { start: 1075, end: 1113, text: "nghiệp thực sự bứt phá, hãy" },
  { start: 1113, end: 1140, text: "mạnh dạn đặt điều kiện cho" },
  { start: 1140, end: 1170, text: "cả 3 tiêu chí này lớn" },
  { start: 1170, end: 1189, text: "hơn 15%.", keywords: [{ word: "15%", color: "purple" as const }] },

  // ─── BƯỚC 3 ───
  { start: 1218, end: 1231, text: "Cuối cùng," },
  { start: 1246, end: 1281, text: "khi đã có kết quả, bạn" },
  { start: 1281, end: 1306, text: "chỉ cần lưu các mã tiềm" },
  { start: 1306, end: 1338, text: "năng vào danh sách theo dõi," },
  { start: 1338, end: 1376, text: "và nhớ lưu luôn lại bộ" },
  { start: 1376, end: 1404, text: "lọc này, để dùng cho những" },
  { start: 1404, end: 1419, text: "lần sau nhé." },

  // ─── CHUYỂN Ý ───
  { start: 1446, end: 1473, text: "Đến đây là xong phần sàng" },
  { start: 1473, end: 1481, text: "lọc rồi," },
  { start: 1495, end: 1520, text: "nhưng mình sẽ chỉ thêm 2" },
  { start: 1520, end: 1536, text: "điểm tối ưu nữa.", keywords: [{ word: "tối ưu", color: "gold" as const }] },
  { start: 1550, end: 1573, text: "Giúp bạn thậm chí không cần" },
  { start: 1573, end: 1606, text: "lặp lại 30 giây thao tác" },
  { start: 1606, end: 1633, text: "vừa rồi, mà vẫn nắm bắt" },
  { start: 1633, end: 1650, text: "ngay được cơ hội." },

  // ─── BƯỚC 4 ───
  { start: 1675, end: 1687, text: "Đó là," },
  { start: 1702, end: 1728, text: "hãy bật tính năng cảnh báo", keywords: [{ word: "cảnh báo", color: "gold" as const }] },
  { start: 1728, end: 1765, text: "cho bộ lọc vừa lưu. Nhờ" },
  { start: 1765, end: 1793, text: "vậy, cứ hễ đến mùa báo" },
  { start: 1793, end: 1826, text: "cáo tài chính, có doanh" },
  { start: 1826, end: 1852, text: "nghiệp nào ra số liệu đẹp" },
  { start: 1852, end: 1874, text: "đạt đủ bộ tiêu chí," },
  { start: 1887, end: 1909, text: "hệ thống sẽ lập tức gửi" },
  { start: 1909, end: 1926, text: "thông báo cho bạn." },

  // ─── BƯỚC 5 ───
  { start: 1954, end: 1975, text: "Song song với đó," },
  { start: 1990, end: 2016, text: "hãy bật cả cảnh báo tín", keywords: [{ word: "cảnh báo", color: "gold" as const }] },
  { start: 2016, end: 2054, text: "hiệu tiềm năng. Chức năng này" },
  { start: 2054, end: 2091, text: "cực kì hữu ích, nó sẽ" },
  { start: 2091, end: 2121, text: "báo ngay cho bạn khi một" },
  { start: 2121, end: 2148, text: "mã trong Watchlist xuất hiện điểm" },
  { start: 2148, end: 2178, text: "vào lệnh tiềm năng, mà bạn" },
  { start: 2178, end: 2207, text: "không cần phải lúc nào cũng" },
  { start: 2207, end: 2230, text: "dán mắt vào màn hình đồ" },
  { start: 2230, end: 2235, text: "thị." },

  // ─── CONCLUSION ───
  { start: 2263, end: 2289, text: "Với việc thiết lập quy trình" },
  { start: 2289, end: 2322, text: "năm bước tự động này, bạn", keywords: [{ word: "năm bước", color: "purple" as const }] },
  { start: 2322, end: 2347, text: "đã tối ưu được tới 80" },
  { start: 2347, end: 2386, text: "phần trăm thời gian và công sức", keywords: [{ word: "80 phần trăm", color: "purple" as const }] },
  { start: 2386, end: 2418, text: "để giành tâm trí hành động" },
  { start: 2418, end: 2446, text: "ở những mã thực sự có" },
  { start: 2446, end: 2456, text: "tiềm năng." },

  // ─── NAM CHÂM ───
  { start: 2482, end: 2520, text: "Sau tất cả, thay vì đuổi" },
  { start: 2520, end: 2558, text: "theo hơn 1600 mã trên", keywords: [{ word: "1600", color: "red" as const }] },
  { start: 2558, end: 2590, text: "thị trường, bạn hãy để bản" },
  { start: 2590, end: 2616, text: "thân như một thỏi nam châm,", keywords: [{ word: "nam châm", color: "green" as const }] },
  { start: 2623, end: 2647, text: "hút những cổ phiếu chất lượng" },
  { start: 2647, end: 2675, text: "với những tín hiệu chất lượng." },
  { start: 2686, end: 2718, text: "Việc của bạn chuyển từ sàng" },
  { start: 2718, end: 2722, text: "lọc," },

  // ─── CTA ───
  { start: 2939, end: 2966, text: "Bạn có thể nhấn vào link" },
  { start: 2966, end: 3003, text: "tải app KFSP ở phần Bio", keywords: [{ word: "KFSP", color: "purple" as const }] },
  { start: 3003, end: 3034, text: "kênh, để thiết lập ngay bộ" },
  { start: 3034, end: 3045, text: "lọc này." },
  { start: 3060, end: 3100, text: "Đặc biệt, KFSP hiện đang" },
  { start: 3100, end: 3127, text: "tặng bạn cơ hội trải nghiệm" },
  { start: 3127, end: 3157, text: "7 ngày miễn phí tất cả", keywords: [{ word: "7 ngày miễn phí", color: "gold" as const }] },
  { start: 3157, end: 3186, text: "các đặc quyền sàng lọc chuyên" },
  { start: 3187, end: 3196, text: "sâu." },
  { start: 3211, end: 3235, text: "Hãy tận dụng ngay để sẵn" },
  { start: 3235, end: 3261, text: "sàng cho nhịp sóng tới nhé!" },
];

// Voiceover ranges for BGM ducking
export const VOICEOVER_RANGES = [
  { start: 0, end: 427 },
  { start: 459, end: 1650 },
  { start: 1675, end: 2235 },
  { start: 2263, end: 2722 },
  { start: 2939, end: 3261 },
];
