// AUTO-CĂN từ whisper medium (30/07, bản đọc rev2 14:10) · voiceover_p1_full.mp3 = 239.26s nén @30fps.
// Wyckoff BÀI 5 (Điểm vào theo Wyckoff · khép series) — VIDEO 1: nửa "MUA".
// Nội dung: hook + bắc cầu + nguyên tắc chọn điểm + Điểm mua 1 (sau cú giũ có xác nhận)
//           + Điểm mua 2 (mép suối / LPS) + teaser app + Mục tiêu Nhân-Quả + cầu sang video sau + CTA.
// Audio nén khoảng lặng 0.45s −32dB: raw 285.38s → nén 239.26s. Scene start = onset − 0.15s.
// whisper: last_word_end=238.82 ≈ duration 239.26 (đạt cổng L6).
// 🔴 Bản giao cuối = speed 1.38x (CEO chốt 30/07) → 239.26 / 1.38 ≈ 173s = 2:53.
// 🔴 s08/s09 BỎ HẲN: đoạn "Nói ngay để bạn khỏi chờ... Wyckoff không có nút bấm mua bán..." bị Vbee
//    nuốt mất trong bản đọc rev2. CEO chốt 30/07 cắt luôn, không gen lại → chart bắt đầu từ s10.
// 🔴 s10b + s12b LÀ BEAT MỚI của rev2 ("sai lầm phổ biến" · "thứ làm nên khác biệt"), chưa có hình
//    riêng → dùng chung bản đồ H1, phân biệt bằng dấu nhấn ✕ / vòng xanh.
// 🔴 Anchor căn theo ĐÚNG chuỗi whisper ghi, không theo kịch bản (skill L24): "cú giũ"→"cú rũ",
//    "Quai-cốp"→"quay cốp", "cấu trúc"→"cầu chúc", "điểm dừng lỗ"→"điểm rừng lỗ", "mép"→"mắp",
//    "chặng"→"trận", "bàn ba"→"bán 3", "cặp"→"cập", "bốn"→"4".
export const FPS = 30;
export const TOTAL_F = 7195;

export const B: Record<string, { on: number }> = {
  // ---------- HOOK: phân tích đúng mà bấm sai chỗ ----------
  s01:  { on:    0 }, //   0.00  Bạn ngồi cả buổi đọc cái đáy tích luỹ đó. Vẽ biên trên biên dưới, thấy cả cú giũ ở cuối chặng.
  s02:  { on:  160 }, //   5.48  Rồi tới lúc bấm lệnh, bạn mua ngay giữa hộp, lúc giá còn dập dềnh chưa ngã về bên nào.
  s03:  { on:  306 }, //  10.35  Đọc đúng xong rồi mà vào sai chỗ, thì công sức trước đó coi như đổ sông đổ bể.
  s04:  { on:  454 }, //  15.28  Với Wyckoff, đọc ra được cái hộp mới là phần dễ. Phần khó hơn là ngồi đợi đúng nhịp để vào.
  s05:  { on:  590 }, //  19.82  Video này chỉ bàn ba việc: vào ở hai chỗ nào, đặt mục tiêu ra sao, đặt điểm dừng lỗ ở đâu.
  // ---------- BẮC CẦU: khép series ----------
  s06:  { on:  789 }, //  26.45  Bốn bài trước ta đã đi qua cái khung ai gom ai xả, hai câu chuyện đáy và đỉnh, cách đọc lực thật giả.
  s07:  { on: 1024 }, //  34.29  Bài này khép lại loạt bài, không thêm khái niệm nào nữa. Đọc được cấu trúc rồi thì giao dịch ở đâu.
  // ---------- NGUYÊN TẮC CHỌN ĐIỂM (phản-ví-dụ trước) ----------
  s10:  { on: 1243 }, //  41.58  Trước hết ta cần biết sai lầm phổ biến: mua khi mọi thứ còn đang lưng chừng.
  s10b: { on: 1454 }, //  48.62  Với cấu trúc tích luỹ, đừng mua ở giữa hộp. Ở đó cung với cầu còn giằng co.
  s11:  { on: 1616 }, //  54.02  Cũng đừng đoán đáy khi nhịp giảm còn đang rơi, vì chưa thành hộp thì chưa có gì để đọc.
  s12:  { on: 1761 }, //  58.85  Chỗ đáng vào nằm ở chặng cuối của cái hộp, khi đã thấy cầu thắng cung.
  s12b: { on: 1954 }, //  65.28  Và thứ làm nên khác biệt là ta có dấu hiệu để biết đã đến lúc, thay vì vào theo cảm giác.
  // ---------- ĐIỂM MUA 1: sau cú giũ, khi đã có xác nhận (H2) ----------
  s13:  { on: 2098 }, //  70.09  Điểm thứ nhất nằm ngay sau cú giũ, cái cú bạn đã gặp ở bài hai và bốn.
  s14:  { on: 2203 }, //  73.59  Giá thủng xuống dưới biên dưới của hộp trên khối lượng cạn khô, rồi bật ngược vào trong.
  s15:  { on: 2335 }, //  77.98  Nhưng riêng cú giũ thì chưa phải lệnh mua. Nhiều người vào ngay lúc bật, rồi mắc kẹt.
  s16:  { on: 2528 }, //  84.42  Cái cần chờ là một dấu hiệu xác nhận: thân nến dài kèm khối lượng lớn.
  s17:  { on: 2668 }, //  89.10  Đúng cặp đồng thuận ở bài bốn. Wyckoff gọi nhịp này là Dấu hiệu sức mạnh.
  s18:  { on: 2844 }, //  94.95  Vậy điểm mua nằm ở nhịp bật lên sau cú giũ, khi đã có dấu hiệu sức mạnh đi kèm.
  s19:  { on: 2976 }, //  99.35  Còn điểm dừng lỗ đặt ngay dưới đáy của cú giũ.
  s20:  { on: 3057 }, // 102.05  Vì nếu giá thủng đáy đó lần nữa, nghĩa là cú giũ đã không thành. Rời đi lúc đó là đúng.
  s21:  { on: 3301 }, // 110.19  CHIP: cú giũ chỉ mở cửa, dấu hiệu sức mạnh mới là lời mời vào. Stop dưới đáy cú giũ.
  // ---------- ĐIỂM MUA 2: quay lại mép suối / LPS (H3) ----------
  s22:  { on: 3490 }, // 116.49  Không phải lúc nào cũng bắt kịp nhịp đó. Cấu trúc thường cho thêm cơ hội nữa.
  s23:  { on: 3607 }, // 120.39  Sau khi giá vượt lên qua biên trên, cái biên kháng cự cũ thường được test lại một lần.
  s24:  { on: 3777 }, // 126.06  Wyckoff mượn hình ảnh con suối: giá đã nhảy qua con suối kháng cự.
  s25:  { on: 3889 }, // 129.79  Giờ nó quay lại mép suối để xem lớp nền cũ có đỡ được không.
  s26:  { on: 3987 }, // 133.05  Nhịp quay lại này gọi là Điểm hỗ trợ cuối.
  s27:  { on: 4107 }, // 137.05  Thân nến co lại, khối lượng cạn dần. Kháng cự cũ đã thành hỗ trợ mới.
  s28:  { on: 4351 }, // 145.19  Điểm dừng lỗ đặt ngay dưới cái điểm hỗ trợ cuối đó.
  s29:  { on: 4443 }, // 148.25  Nếu giá thủng luôn cả vùng này thì cấu trúc coi như hỏng, và bạn rời đi gọn gàng.
  s30:  { on: 4602 }, // 153.55  CHIP: quay lại mép biên cũ trên khối lượng cạn là cơ hội thứ hai. Stop dưới LPS.
  // ---------- TEASER APP "Cơ hội tiềm năng" (giữa bài) ----------
  tz1:  { on: 4778 }, // 159.42  Tạm dừng một nhịp trước khi nói tới mục tiêu.
  tz2:  { on: 4846 }, // 161.69  Cập nhật nhanh cho bạn là app KFSP sắp ra mắt tính năng Cơ hội tiềm năng.
  tz3:  { on: 4968 }, // 165.75  Chỉ với vài thao tác đơn giản, AI lọc sẵn cổ phiếu vào mẫu hình, kèm mức giá cần để mắt.
  tz4:  { on: 5154 }, // 171.95  Bạn cũng có thể tham khảo ý tưởng các vị thế mua và AI thực hiện trước khi quyết định.
  // ---------- MỤC TIÊU: quy luật Nhân và Quả (H4) ----------
  s31:  { on: 5279 }, // 176.12  Giờ quay lại câu hỏi vào rồi thì kỳ vọng giá đi tới đâu.
  s32:  { on: 5424 }, // 180.95  Wyckoff trả lời bằng quy luật thứ hai, quy luật Nhân và Quả.
  s33:  { on: 5465 }, // 182.32  Cái hộp đi ngang càng rộng, càng kéo dài, thì nhân tích luỹ càng lớn.
  s34:  { on: 5645 }, // 188.32  Nhân lớn thì quả cũng có xu hướng lớn: con sóng tăng sau đó đi được xa hơn.
  s35:  { on: 5766 }, // 192.35  Nên bề ngang vùng tích luỹ cho bạn ước lượng thô về bề cao con sóng.
  s36:  { on: 5878 }, // 196.09  Đo bề ngang cái hộp, rồi chiếu lên phía trên tính từ điểm giá vượt biên.
  s37:  { on: 5997 }, // 200.06  Nhớ kỹ hai chữ ước lượng.
  s38:  { on: 6039 }, // 201.45  Là mốc để biết trước sẽ chốt ở đâu, không bán quá sớm cũng không ôm quá lâu.
  s39:  { on: 6330 }, // 211.15  CHIP: bề ngang cái hộp ước lượng bề cao con sóng. Mốc tham khảo, không phải lời hứa.
  // ---------- CẦU SANG VIDEO SAU ----------
  s40:  { on: 6468 }, // 215.76  Đó là nửa phần mua. Còn nửa nữa quan trọng không kém.
  s41:  { on: 6570 }, // 219.15  Khi cái hộp đó là một cái đỉnh chứ không phải một cái đáy, bạn tránh ở đâu và thoát ở đâu.
  s42:  { on: 6706 }, // 223.68  Phần hai sẽ lật ngược tấm gương, rồi khép series bằng bốn điều thành thật về giới hạn.
  // ---------- CTA ----------
  s43:  { on: 6863 }, // 228.92  Theo dõi kênh để đón phần hai.
  s44:  { on: 7036 }, // 234.69  Và nếu muốn tự đọc từng phiên bằng giá kèm khối lượng, hãy tải app KFSP để trải nghiệm.
  s45:  { on: 7115 }, // 237.32  KFSP, đưa chứng khoán về tầm tay bạn. (brand spine)
};
