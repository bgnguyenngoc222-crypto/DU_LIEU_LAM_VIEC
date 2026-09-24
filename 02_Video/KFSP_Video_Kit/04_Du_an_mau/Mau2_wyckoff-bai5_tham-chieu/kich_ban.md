# KỊCH BẢN — Wyckoff · BÀI 5 (Điểm vào theo Wyckoff · KHÉP SERIES) · voice-first

> 🔴 **TÁCH 2 VIDEO (đề xuất, chờ CEO chốt):** bản gộp ~1650 chữ (~4:40) quá dài, cùng lý do Bài 4. Chia theo lằn ranh tự nhiên **mua / tránh-thoát**:
> - **Phần 1 — "Đứng vào đâu sau khi đọc được cái hộp"** (~980 chữ, ~2:35): hook + bắc cầu khép series + nguyên tắc chọn điểm + Điểm mua 1 (sau cú giũ có xác nhận) + Điểm mua 2 (mép suối) + **teaser app giữa** + Mục tiêu Nhân-Quả + cầu sang phần 2 + CTA. Hình: hook + `233:5640` · `233:5899` · `233:6166` · `233:6435`. TTS: `script_tts_web_p1.txt`.
> - **Phần 2 — "Tránh, thoát, và bốn giới hạn"** (~670 chữ, ~1:45): recap 2 câu + lật gương (đừng mua đuổi cú đẩy vượt) + thoát ở nhịp hồi yếu + **teaser app** + 4 giới hạn (card chữ) + khép series + **CTA 2 hình store**. Hình: `233:6974` · `233:6701` + card + CTA `224:1322`.
> - 🔴 **Mỗi phần tự đủ hook · teaser · CTA · brand spine** (skill L23). Teaser 2 phần dùng **lời khác nhau**, người xem cả hai không nghe lặp.
>
> Kênh brand KFSP (mạch "Chứng khoán trong tầm tay"). 1080×1920, 30fps. 🔴 **Chỉ xuất bản BRAND** (CLAUDE.md rev28 — kênh nobrand đã dừng).
> Giọng: **CHỜ CEO CHỐT** (mặc định series = Vbee Minh Quân `hn_male_minhquan_yt-stable` speed 1.0). Bản giao cuối = nén khoảng lặng + speed theo mục tiêu + SFX.
>
> 🔴 **VỊ TRÍ TRONG MẠCH:** Bài 4 Phần 2 đóng bằng lời hứa: *"Bài sau là bài khép series. Ta sẽ gom tất cả lại thành một cách vào lệnh theo Wyckoff. Mua ở đâu sau một cú giũ, tránh và thoát ở đâu tại một cú đẩy vượt, và quan trọng nhất là giữ kỷ luật khi mắt vẫn còn đang luyện."* → Bài 5 MỞ đúng bằng lời hứa đó.
> 🔴 **Nguồn chữ:** fanpage Bài 5 đã đăng 19/07 (`idea-bank/drafts/2026-07-18-fanpage-wyckoff-bai5-diem-vao.md`) + umbrella [[IF-2026-033]] + research note mục 5 (cách vào lệnh) · mục 2 (Nhân-Quả) · mục 6 (hiểu lầm/giới hạn).
> 🔴 **App chỉ xuất hiện Ở TEASER GIỮA BÀI (CEO chốt 30/07).** Khối "Thực chiến trên KFSP" ba công cụ (Bộ lọc · Watchlist · Cảnh báo) của bài fanpage **KHÔNG đưa vào video**, cũng không gói vào CTA. CTA hai phần để gọn: theo dõi kênh + một câu mời tải app + brand spine, KHÔNG kể tên tính năng.
> 🔴 **Khuôn = tiếp Bài 4:** mỗi điểm hành động nói NHANH rồi chốt bằng 1 câu **"Điều cần thấy"** (chip nền tím nhạt, giữ lâu). Through-line duy nhất: *"Đứng ở chỗ mà bạn biết mình sai ở đâu."* Bài khép → **NHẤN kỷ luật + giới hạn phương pháp, TUYỆT ĐỐI không hứa thắng.**
> 🔴 **Thuật ngữ LOCKED:** "Cấu trúc Wyckoff" (KHÔNG "sơ đồ"). Nhãn viết tắt hiện TRÊN MÀN (Spring · SOS · LPS · UTAD · LPSY · Phase A-E); **lời đọc nói TÊN TIẾNG VIỆT** ("cú giũ", "dấu hiệu sức mạnh", "điểm hỗ trợ cuối", "cú đẩy vượt", "điểm cung cuối"). KHÔNG đọc chữ "Phase" thành tiếng, thay bằng "chặng cuối của cái hộp".
> 🔴 **Đọc tên riêng (chỉ trong file TTS, KHÔNG lên màn — skill L25):** Wyckoff → **"Quai-cốp"**. Spring → "sờ-pring". UTAD/Upthrust → "áp-t-rớt". KFSP → "Ca Ép Ét Bê".
> 🔴 **Căn mốc:** audio 1 file → nén khoảng lặng TRƯỚC (silenceremove stop_duration=0.45 −32dB) → re-run whisper → **dump segments đọc trước khi viết anchor** (số đếm whisper ghi thành chữ số — skill L24) → silencedetect −32dB:d=0.35, scene start = onset − 0.15s. Script align in MISS ra cuối, còn MISS thì KHÔNG render.
>
> Xưng **"bạn"**. Education-first. KHÔNG em-dash, không %/phím hàng/"chắc thắng", **không gọi điểm thị trường**. Kết: **"KFSP, đưa chứng khoán về tầm tay bạn."** + disclaimer.

---

## A1. LỜI ĐỌC — PHẦN 1 "Đứng vào đâu sau khi đọc được cái hộp"

> 🟡 **rev1 (30/07) — bản đầu, CHỜ CEO DUYỆT LỜI.** Duyệt lời rồi mới HỎI giọng → gen TTS → storyboard SPEC → dựng.

```
[HOOK — cái sting: phân tích đúng mà vào sai chỗ]
Bạn đọc đúng cái đáy tích luỹ. Bạn nhận ra cả cú giũ. Bạn vẽ được từng vùng cung với cầu.
Rồi tới lúc vào lệnh, bạn bấm mua ở giữa hộp, nơi chưa bên nào thắng bên nào.
Toàn bộ công sức phân tích vừa rồi, bạn tự hất bỏ trong đúng một cái bấm.
Phần khó của phương pháp Quai-cốp chưa bao giờ là đọc cái hộp. Phần khó là đợi đúng nhịp để đứng vào.
Xem hết video này, bạn sẽ có hai vị trí mua rủi ro thấp nhất trên một cấu trúc tích luỹ, một cách đặt mục tiêu, và quan trọng nhất là một chỗ để đặt điểm dừng lỗ mà bạn biết rõ vì sao nó nằm ở đó.

[BẮC CẦU — khép series]
Bốn bài trước đã đưa bạn đi trọn một vòng. Bài một cho bạn cái khung, ai đang gom ai đang xả. Bài hai và bài ba cho hai câu chuyện đầy đủ, một cái đáy tích luỹ và một cái đỉnh phân phối. Bài bốn cho bạn cái ống kính đọc lực thật với lực giả trên từng cây nến.
Đây là bài khép, và nó không thêm khái niệm mới nào nữa. Nó chỉ trả lời đúng câu hỏi thực chiến nhất. Đọc được cái hộp rồi thì đứng vào đâu.
Nói trước cho thẳng thắn một điều. Quai-cốp không đưa cho bạn một nút bấm mua bán. Nó đưa cho bạn một bản đồ hành vi, và trên bản đồ đó chỉ có vài vị trí mà bằng chứng rõ nhất còn rủi ro nhỏ nhất.

[NGUYÊN TẮC CHỌN ĐIỂM]
Nguyên tắc chọn điểm giản dị đến mức dễ bị bỏ qua.
Bạn không mua ở giữa hộp. Ở đó cung với cầu còn đang giằng co, chưa ai thắng, và bạn cũng không có mốc nào để biết mình đã đọc sai.
Bạn cũng không đoán đáy khi nhịp giảm còn đang rơi. Chưa thành cái hộp thì chưa có gì để đọc.
Vùng đáng hành động nằm ở chặng cuối của cái hộp, khi bằng chứng đã cho thấy cầu thắng cung và cấu trúc gần như hoàn tất. Cả hai điểm mua ta sắp nói đều nằm trong khúc đó.

[ĐIỂM MUA 1 — sau cú giũ, khi đã có xác nhận]
Điểm thứ nhất nằm ngay sau cú giũ.
Ở bài hai và bài bốn bạn đã gặp nó. Giá thủng xuống dưới biên dưới của hộp trên khối lượng cạn khô, rồi bật ngược trở lại vào trong.
Nhưng bản thân cú giũ chưa phải là lệnh mua. Rất nhiều người vào ngay lúc giá vừa bật, rồi mắc kẹt vì cú giũ đó thất bại.
Thứ bạn chờ là một xác nhận ngay sau đó. Một nhịp tăng thân nến dài đi kèm khối lượng lớn, đúng cái cặp đồng thuận bài bốn đã dạy. Quai-cốp gọi nhịp này là Dấu hiệu sức mạnh. Tới lúc đó cầu mới thật sự thắng cung.
Điểm mua nằm ở nhịp bật lên sau cú giũ, khi đã có dấu hiệu sức mạnh đi kèm. Còn điểm dừng lỗ đặt ngay dưới đáy của cú giũ.
Vì sao lại đúng chỗ đó. Vì nếu giá quay lại thủng đáy cú giũ một lần nữa, nghĩa là cú giũ đã thất bại và câu chuyện tích luỹ bạn đọc có thể sai. Rời đi lúc đó là đúng, không phải là thua.
👉 Điều cần thấy: cú giũ chỉ mở cửa, dấu hiệu sức mạnh mới là lời mời vào. Điểm dừng lỗ nằm dưới đáy cú giũ.

[ĐIỂM MUA 2 — quay lại mép suối]
Không phải lúc nào bạn cũng bắt kịp nhịp đó. May là cấu trúc thường cho một cơ hội thứ hai.
Sau khi giá vượt lên qua biên trên của hộp, cái biên kháng cự cũ đó thường được test lại một lần. Quai-cốp mượn hình ảnh con suối cho dễ nhớ. Giá đã nhảy qua con suối kháng cự, giờ nó quay lại mép suối để xem lớp nền cũ có đỡ được không.
Nhịp quay lại này gọi là Điểm hỗ trợ cuối.
Nhìn cụm nến được làm nổi. Giá chỉnh về vùng biên cũ, thân nến co lại, khối lượng cạn dần. Không còn lực bán đáng kể nữa. Kháng cự cũ đã trở thành hỗ trợ mới.
Điểm này dễ canh hơn điểm thứ nhất, vì bạn có ngay một mốc rõ ràng để đặt điểm dừng lỗ, ngay dưới cái điểm hỗ trợ cuối đó. Nếu giá đánh thủng luôn cả vùng này thì cấu trúc coi như hỏng, và bạn rời đi gọn gàng.
👉 Điều cần thấy: giá quay lại mép biên cũ trên khối lượng cạn là cơ hội thứ hai. Điểm dừng lỗ nằm dưới điểm hỗ trợ cuối.

[TEASER APP — VỊ TRÍ GIỮA (giữ pattern Bài 4: ngắt nhịp trước khối cuối).
🔴 HÌNH: clip app thật app_cohoi_tiemnang.mov + overlay disclaimer nhỏ. Organic-only.]
Tạm dừng một nhịp trước khi nói tới mục tiêu. Cập nhật nhanh cho bạn là áp KFSP sắp ra mắt tính năng Cơ hội tiềm năng. Chỉ với vài thao tác đơn giản, AI sẽ lọc sẵn những cổ phiếu đang vào mẫu hình đáng chú ý, kèm các mức giá quan trọng cần để mắt, đúng kiểu mốc mà cả video này đang nói tới. Bạn cũng có thể tham khảo ý tưởng các vị thế mua và AI thực hiện, để có thêm thông tin trước khi tự mình quyết định.
Giờ quay lại với câu hỏi giá đi tới đâu.

[MỤC TIÊU — quy luật Nhân và Quả]
Vào được rồi thì kỳ vọng giá đi tới đâu. Quai-cốp trả lời bằng quy luật thứ hai, quy luật Nhân và Quả.
Ý tưởng thế này. Cái hộp đi ngang càng rộng, càng kéo dài, thì tiền lớn càng gom được nhiều hàng. Cái nhân tích luỹ càng lớn. Nhân lớn thì quả cũng có xu hướng lớn, nghĩa là con sóng tăng sau đó đi được xa hơn.
Nên bề ngang của vùng tích luỹ cho bạn một ước lượng thô về bề cao của con sóng đi lên. Đo bề ngang cái hộp, rồi chiếu lên phía trên tính từ điểm giá vượt biên.
Xin nhấn mạnh hai chữ ước lượng. Đây là một mốc để bạn có kỳ vọng hợp lý và biết trước mình sẽ chốt ở đâu, không phải một lời hứa giá sẽ chạm đúng mức đó. Công dụng thật của nó là giữ bạn không bán quá sớm vì sợ, cũng không ôm quá lâu vì tham.
👉 Điều cần thấy: bề ngang cái hộp ước lượng bề cao con sóng. Là mốc tham khảo, không phải lời hứa.

[CẦU SANG PHẦN 2]
Đó là nửa phần mua. Còn một nửa nữa quan trọng không kém mà phần lớn người mới bỏ qua. Khi cái hộp đó là một cái đỉnh chứ không phải một cái đáy, thì bạn tránh ở đâu và thoát ở đâu. Phần hai sẽ lật ngược tấm gương, rồi khép series bằng bốn điều thành thật về giới hạn của phương pháp này.

[CTA — gọn, không kể tính năng (đã nói ở teaser giữa bài)]
Theo dõi kênh để đón phần hai. Và nếu bạn muốn tự đọc từng phiên bằng giá kèm khối lượng trên biểu đồ của mình, hãy tải áp Ca Ép Ét Bê để trải nghiệm.
KFSP, đưa chứng khoán về tầm tay bạn.
```

---

## A2. LỜI ĐỌC — PHẦN 2 "Tránh, thoát, và bốn giới hạn"

```
[RECAP + LẬT GƯƠNG]
Phần trước bạn đã có hai điểm mua trên một cái đáy tích luỹ, và một cách đo mục tiêu. Giờ lật ngược tấm gương.
Cùng một cái hộp đi ngang, nhưng đặt sau một nhịp tăng dài thì câu chuyện đổi hẳn. Đây là cấu trúc phân phối bạn đã gặp ở bài ba. Và ở đây, việc quan trọng nhất không phải là mua. Là không mua nhầm, và biết đường ra.

[TRÁNH — đừng mua đuổi cú đẩy vượt]
Nhìn chặng giữa của cấu trúc. Giá đột ngột vượt lên trên biên trên của hộp. Trông y như một cú phá đỉnh thật, và rất nhiều người lao vào mua đuổi vì sợ lỡ.
Nhưng nhìn xuống thanh khối lượng, nó không theo. Rồi giá tụt ngược trở lại vào trong hộp, gài lại tất cả những người vừa mua ở trên đó. Đây là Cú đẩy vượt sau phân phối, tấm gương lật ngược của cú giũ mà bạn đã học.
Bài học ở đây là một bài học phòng thủ, và nó đáng giá hơn bất kỳ điểm mua nào. Một cú phá đỉnh mà khối lượng rỗng thì đừng lao vào. Không vào lệnh cũng là một quyết định.
👉 Điều cần thấy: phá đỉnh mà khối lượng rỗng là bẫy. Chỗ tốt nhất để đứng là đứng ngoài.

[THOÁT — ở nhịp hồi yếu]
Sau đó tới chặng cuối. Giá tụt về biên dưới của hộp, rồi có những nhịp hồi lên nhưng yếu ớt, thân nến hẹp và khối lượng thấp. Quai-cốp gọi mỗi nhịp hồi yếu như vậy là Điểm cung cuối.
Với người đang cầm hàng, đây chính là những cánh cửa để đi ra, trước khi giá rơi sâu. Cầu đã kiệt, nên mỗi nhịp hồi chỉ là một cơ hội cho người muốn thoát, không phải một cơ hội cho người muốn vào.
Ai còn cố giữ ở chặng này là đang đi ngược lại toàn bộ cấu trúc mà chính mình vừa đọc ra.
👉 Điều cần thấy: nhịp hồi yếu trên khối lượng thấp là cửa ra, không phải cửa vào.

[TEASER APP — lời KHÁC phần 1 (skill L23).
🔴 HÌNH: clip app thật, đoạn ngắn hơn phần 1.]
Tạm dừng một nhịp trước khi khép series. Nói nhanh cho bạn biết là áp KFSP sắp có tính năng Cơ hội tiềm năng, nơi AI lọc sẵn những cổ phiếu đang vào mẫu hình đáng chú ý kèm các mức giá cần để mắt, để bạn khỏi phải lật từng mã bằng tay. Thông tin để bạn tham khảo, còn quyết định vẫn là của bạn.
Giờ tới phần thành thật nhất của cả series.

[BỐN GIỚI HẠN — card chữ, nhịp chậm lại]
Đi hết một vòng rồi, xin khép lại bằng bốn điều thành thật. Vì đọc đúng tinh thần của phương pháp quan trọng hơn thuộc lòng thuật ngữ.
Một. Không phải vùng đi ngang nào cũng là tích luỹ hay phân phối. Rất nhiều vùng chỉ là nhiễu, không có bàn tay tổ chức nào bên trong. Phải có bằng chứng của các sự kiện và tương quan khối lượng, chứ không phải chỉ vì thấy giá đi ngang.
Hai. Bối cảnh xu hướng trước đó là bắt buộc. Cùng một cái hộp, nằm sau một nhịp giảm thì đọc là tích luỹ, nằm sau một nhịp tăng thì đọc là phân phối. Đặt sai bối cảnh là đọc ngược hoàn toàn.
Ba. Cú giũ và cú đẩy vượt không bắt buộc phải xuất hiện. Nhiều cấu trúc đi thẳng mà chẳng có cú giũ nào. Đừng ngồi chờ nó rồi bỏ lỡ, cũng đừng mua bừa vì tưởng đã thấy.
Bốn. Luôn có điểm dừng lỗ. Đây là khung đọc hành vi cần luyện mắt, hai người có thể vẽ cái hộp hơi khác nhau. Bạn đọc đúng phần lớn thời gian đã là tốt, và chính điểm dừng lỗ là thứ giữ bạn sống sót qua những lần đọc sai.

[KHÉP SERIES]
Cả năm bài này không nhằm biến bạn thành người đọc đúng mọi cái hộp. Không ai làm được điều đó.
Nó nhằm cho bạn một cách nhìn có cơ sở để thay cho việc đoán mò, và một thói quen luôn hỏi ai đang gom ai đang xả trước khi bấm lệnh.
Mắt cần thời gian để luyện, và điểm dừng lỗ là người bạn đồng hành trong lúc luyện. Cứ đi chậm mà chắc.
Cảm ơn bạn đã đi hết năm bài. Giờ khi gặp một cổ phiếu đi ngang, bạn đã có cách hỏi và cách nhìn của riêng mình.

[CTA — 2 hình store + brand spine. Gọn, không kể tính năng (đã nói ở teaser giữa bài)]
Nếu series này giúp được bạn, hãy theo dõi kênh để đón loạt bài tiếp theo. Và nếu muốn tự nhìn giá kèm khối lượng trên biểu đồ của mình, hãy tải áp Ca Ép Ét Bê.
KFSP, đưa chứng khoán về tầm tay bạn.
```

---

## B. STORYBOARD (khung — SPEC chi tiết điền sau khi CEO duyệt lời + có mốc silencedetect)

> Nguyên tắc (Bài 1-4): đoạn KỂ → ảnh concept full-frame + Ken Burns; đoạn DẠY từng điểm → ảnh Figma riêng + SPOTLIGHT + chip "Điều cần thấy".
>
> 🔴 **Lợi thế Bài 5:** bộ 6 hình Figma carousel đã dựng sẵn 18/07 (nến dày v2, 56 nến) khớp **1-1** với các khối lời. Không phải vẽ mới.

### Phần 1
| Khối | Nguồn hình | Ghi chú |
|---|---|---|
| HOOK | Ảnh concept "vào lệnh sai chỗ / tự hất bỏ nỗ lực" — **CHỜ CEO chọn**: tái dùng `wyckoff-composite-man.png` hay gen mới | KenHero + Ken Burns |
| Bắc cầu khép series | Ảnh Figma `233:5640` (toàn bản đồ, không spotlight) | Zoom out nhẹ cho thấy trọn cấu trúc |
| Nguyên tắc chọn điểm | `233:5640` | Spotlight **phản-ví-dụ**: làm tối giữa hộp + nhịp giảm, sáng dần khúc cuối |
| Điểm mua 1 | Ảnh Figma `233:5899` | Spotlight cụm cú giũ → dấu hiệu sức mạnh · vòng cam điểm mua · vạch đỏ đứt "stop" dưới đáy cú giũ |
| Điểm mua 2 | Ảnh Figma `233:6166` | Spotlight cụm điểm hỗ trợ cuối · vòng cam · vạch stop dưới |
| TEASER APP | Clip `app_cohoi_tiemnang.mov` (tái dùng) | OffthreadVideo + `<Sequence from>` t=0 + `contain` + ẩn ProgressBar/overlay bottom + disclaimer dòng riêng (L22) |
| Mục tiêu Nhân-Quả | Ảnh Figma `233:6435` | Mũi tên 2 đầu đo bề ngang → chiếu lên. Chip nhấn chữ "ước lượng" |
| Cầu P2 + CTA | Chip "Phần 2 · Tránh và thoát" + `cta-cover` + logo | Mirror series |

### Phần 2
| Khối | Nguồn hình | Ghi chú |
|---|---|---|
| Recap + lật gương | Ảnh Figma `233:6974` (cấu trúc **phân phối**) | Chuyển cảnh lật gương: flip nhẹ / crossfade từ tích luỹ sang phân phối |
| Tránh cú đẩy vượt | `233:6974` | Spotlight cú vượt biên vol không theo · vòng **đỏ** + nhãn "ĐỪNG MUA ĐUỔI" |
| Thoát ở nhịp hồi yếu | `233:6974` | Spotlight cụm điểm cung cuối · mũi tên tím "THOÁT" |
| TEASER APP | Clip app, đoạn ngắn hơn P1 | Cùng kỹ thuật L22 |
| 4 giới hạn | Ảnh Figma `233:6701` + **card chữ** | 4 dòng hiện dần theo lời (reveal-per-beat). Nhịp chậm lại, nền tối hơn |
| Khép series | **Card chữ thuần** (L26): "Đọc đúng phần lớn thời gian đã là tốt" | Không pan lại chart |
| CTA | `cta-cover` + `store-ios.jpg` + `store-android.jpg` + logo | Như Bài 3/4 |

---

## C. ASSET

**♻️ Tái dùng:** engine Remotion từ `20260724-cktt-wyckoff-bai4/` (Scene.tsx + timing.ts + Main.tsx + `sfx/mix_sfx.py` + `scripts/align_p2.py` làm mẫu align), `cta-cover.png`, `logo-kfsp.png`, `app_cohoi_tiemnang.mov`, `store-ios.jpg`, `store-android.jpg`.
**🖼️ Figma (file `candlestick pattern`, key `iIfUyCbggCrMybowE6zSLV`), page `🎨 Hình content (nháp)`, hàng Bài 5 y=11800** — export qua plugin `localhost:8777` (KHÔNG REST, xem `refs/FIGMA_EXPORT.md`): `233:5640` · `233:5899` · `233:6166` · `233:6435` · `233:6974` · `233:6701` (+ CTA `224:1322`). Crop dải logo `ffmpeg crop=iw:ih-300:0:300`.
**🎨 Ảnh concept HOOK:** chờ CEO chọn tái dùng hay gen mới.
**⚠️ Marker có sẵn trong hình Bài 5** (lần đầu dùng ở bài này): vòng cam = điểm mua · vạch đỏ đứt = stop · mũi tên 2 đầu = đo Nhân-Quả · vòng đỏ "ĐỪNG MUA ĐUỔI" · mũi tên tím "THOÁT". Không cần vẽ lại bằng code, chỉ spotlight.

---

## D. PIPELINE (6 bước, gate từng bước)
1. **CEO duyệt SCRIPT / lời đọc + chốt tách 2 phần (đang ở bước này).**
2. HỎI giọng → gen `voiceover_p1_full.mp3` + `voiceover_p2_full.mp3` từ `script_tts_web_p1.txt` / `_p2.txt` (phiên âm: Wyckoff → "Quai-cốp", KFSP → "Ca Ép Ét Bê").
3. Nén khoảng lặng (silenceremove d=0.45 −32dB) → whisper medium `--word_timestamps` → **dump segments, đọc cách phiên âm số đếm TRƯỚC khi viết anchor** (L24) → align → verify không còn MISS.
4. Export 6 ảnh Figma + copy engine Bài 4 → SPEC từng beat → QA still onset từng câu (L19/L23).
5. Studio cho CEO xem TRƯỚC render.
6. Render ĐỒNG BỘ → speed theo mục tiêu → SFX phủ đủ mọi màn (L8) → brand → `DESCRIPTION_YOUTUBE.md` theo khuôn Bài 4 (2 khối P1/P2).

---

## E. CHỜ CEO CHỐT (30/07)
1. **Tách 2 phần?** 🟡 Em đề xuất CÓ (bản gộp ~4:40). Lằn ranh mua / tránh-thoát rất sạch, mỗi phần tự đủ.
2. **Duyệt lời** 🟡 rev1 ở A1 + A2.
3. **Giọng?** 🟡 mặc định Vbee Minh Quân 1.0 như Bài 1-4.
4. **Ảnh HOOK** 🟡 tái dùng `wyckoff-composite-man.png` hay gen mới ảnh mood "bấm lệnh sai chỗ"?
5. **Teaser app giữ ở CẢ 2 phần?** 🟡 Em đề xuất có, lời khác nhau (L23). Nếu anh thấy dày quá thì bỏ ở P2.
6. **CTA 2 hình store** 🟡 đề xuất chỉ ở P2 (bài khép), P1 dùng CTA gọn.

**✅ Đã chốt:** khối "Thực chiến trên KFSP" (Bộ lọc · Watchlist · Cảnh báo) **KHÔNG vào video** — app chỉ xuất hiện ở teaser giữa bài; CTA hai phần đã cắt hết phần kể tính năng (30/07).
