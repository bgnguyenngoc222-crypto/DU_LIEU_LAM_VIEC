---
name: kfsp-video
description: >
  Skill CONTENT duy nhất của KFSP — điều phối trọn quy trình biến 1 nguồn (story sách, quote nhân vật,
  tin tức, con số, khái niệm đầu tư, hoặc chủ đề TA/mẫu hình) thành content organic sẵn đăng, theo kỷ luật
  "fit trước, viết sau". Gộp 2 lớp cũ: idea-fit (phân tích ý chính + giá trị người đọc + liên kết tính năng KFSP)
  và style (vân tay giọng "bạn" education-first). Style KHÔNG nằm trong file này mà dẫn về reference phù hợp
  theo kênh để đọc thêm (hiện có: Fanpage Facebook). Framework công thức mượn từ skill cong-thuc-viet-content-by-noti.
  TRIGGERS: "viết content KFSP", "viết bài fanpage KFSP", "lên kịch bản video KFSP", "kịch bản short KFSP", "viết kịch bản video", "biến câu chuyện này thành content KFSP", "content fit KFSP không", "ý chính + người đọc nhận được + liên kết KFSP", "idea fit".
  Trigger khi user muốn TẠO content organic KFSP (Fanpage / Video Script / MXH) từ 1 nguồn hoặc 1 chủ đề.
  SKILL NÀY HOẠT ĐỘNG NHƯ MỘT "MASTER AGENT". Áp dụng triệt để chiến lược "Video First": Luôn ưu tiên tạo Kịch bản Video (Short) trước, sau đó tái chế thành bài chữ. KHÔNG trigger cho Ads Copy.
---

> **Nền bắt buộc:** trước khi sản xuất, đọc **file luật** (đã sinh lúc cài) và **journal của bạn** trong `JOURNAL/`.
> Bộ kit này KHÔNG kèm tài liệu dữ kiện sản phẩm. Dữ kiện nào chưa biết thì **hỏi**, tuyệt đối không suy đoán.
> Skill này cho **content organic** (fanpage/MXH KFSP, độ chặt 🟡). Ads/script video có rule chặt hơn → skill riêng.

# KFSP Content — Skill content duy nhất

Một cửa vào cho mọi content organic KFSP. Skill này **điều phối 3 lớp**, KHÔNG nhồi hết vào 1 chỗ:

| Lớp | Việc | Nằm ở |
|---|---|---|
| Ý TƯỞNG | Fit + phân tích ①②③ + Angles → lưu `idea-bank/` | `reference/idea-fit.md` |
| KHUNG | Chọn công thức viết (FAB/Hook-Value-CTA/PAS/Storytelling) | `reference/fanpage-frameworks.md` |
| GIỌNG | Vân tay giọng "bạn" + archetype + luật format theo KÊNH | `reference/style-<kênh>.md` (hiện có: `style-fanpage.md`) |
| TỰ CHẤM | Bảng tự đánh giá 4 mốc, chạy trước khi đăng | `reference/idea-fit.md` (cuối file) |
| PHẢN BIỆN | 7 câu phản biện chất lượng từ góc nhìn người đọc thật | `reference/review-phan-bien.md` |


---

## 🔴 Quy trình 6 bước tương tác (bám đúng thứ tự — đừng nhảy cóc)

### Bước 0 — Nguồn đã có idea-fit chưa?
Kiểm **hết** các file `idea-bank/INDEX*.md` (`INDEX.md` là 40 idea cũ, `INDEX_<tên>.md` là mục lục từng người — xem `IDEA_BANK_huong-dan.md`):
- **Đã có file IF** cho nguồn/chủ đề này (vd. mẫu hình đã nằm trong 1 tuyến umbrella) → **BỎ QUA Bước 1**, đọc file IF đó lấy ①②③, sang thẳng Bước 2. (Idea-fit làm MỘT LẦN cho mỗi nguồn, không chạy lại.)
- **Nguồn thô mới** chưa có IF → làm Bước 1.

### Bước 1 — Phân tích Idea-fit & Đề xuất Dàn ý (STOP POINT)
Đọc **`reference/idea-fit.md`** và chạy đủ: **khai Vai trò và Kỳ vọng (Bước 0a)** → Fit Score 4 tiêu chí → phân tích ① Ý chính / ② Người đọc nhận được (giải pháp gì cho vấn đề của họ) / ③ Liên kết KFSP → **Phép thử sợi chỉ (Bước 1.5)** → lưu file `idea-bank/IF-YYYY-<tên>-###-slug.md` + thêm dòng vào `idea-bank/INDEX_<tên>.md` + commit và push.
Sau khi phân tích, **AI phải đề xuất DÀN Ý BAN ĐẦU** (logic mạch văn, luận điểm).

> 🛑 **STOP POINT 1 (Duyệt Idea-Fit):** 
> Khi user đưa idea thô, AI **BẮT BUỘC** phải xuất ra 2 phần sau và DỪNG LẠI:
> 1. **Bản phân tích IF hoàn chỉnh (Bóc tách tư duy):** Viết chi tiết ý chính, nỗi đau, giải pháp, liên kết KFSP.
> 2. **Bản IF gửi sếp (Sơ đồ tư duy/Flowchart):** Ép mỡ ngôn từ, dùng dấu `->`, thay bằng "NĐT", "ko".
> Chờ user báo "Đã duyệt IF", AI mới được chuyển sang làm Dàn ý.
>
> **Checklist tự kiểm trước khi gửi STOP POINT 1** (thiếu 1 mục = chưa được gửi):
> - [ ] Bản phân tích IF đầy đủ: ①②③ + Phép thử sợi chỉ
> - [ ] Bản flowchart gửi sếp (④): dùng `->`, viết tắt NĐT/ko
> - [ ] Đã hỏi ngưỡng đo (Bước 0a) nếu user chưa khai

> 🛑 **STOP POINT 2 (Duyệt Dàn ý):**
> Sau khi IF được duyệt, AI xuất **2 bản dàn ý** và DỪNG LẠI:
> 1. **Dàn ý Flowchart tâm lý (Bước 1.8):** nối bằng `->`, đi từ hiện tượng đến KFSP.
> 2. **Dàn ý 4 Giai đoạn (Form chuẩn):** Tiêu đề Giai đoạn + Thông điệp + Ý 1/2/3.
> Chờ user báo "Đã duyệt Dàn ý", AI mới được viết Content hoàn chỉnh (Bước 2).
>
> **Checklist tự kiểm trước khi gửi STOP POINT 2** (thiếu 1 mục = chưa được gửi):
> - [ ] Bản Flowchart tâm lý (Bước 1.8)
> - [ ] Bản Dàn ý 4 Giai đoạn

### Bước 2 — Chọn Archetype
Đọc **`reference/style-fanpage.md`** (hoặc reference giọng của kênh tương ứng):
- **Archetype A** — dạy TA / how-to (reach + share cao): mẫu hình, chỉ báo, quy trình vào/ra lệnh.
- **Archetype B** — tư duy / triết lý (giọng brand chuẩn, conversion tốt): kể chuyện nhân vật → móc tính năng.

### Bước 3 — Chọn khung công thức
Đọc **`reference/fanpage-frameworks.md`** để lấy khung viết. Gợi ý: FAB / Hook-Value-CTA cho Archetype A; Storytelling / PAS cho Archetype B. Tự động kết hợp 1 trong 8 công thức giật tít Hook.

### Bước 4 — Sản xuất Kịch bản Video & Tái chế đa kênh (Video First)
Dựa trên dàn ý đã chốt, BẮT BUỘC ưu tiên sản xuất nội dung theo thứ tự:
1. **Lên Kịch bản Video (Ưu tiên 1):** Định dạng Short dọc (thời lượng linh hoạt, tối đa 3 phút). BẮT BUỘC áp dụng **Công thức Kép:** 
   - **Mở đầu:** Gieo kỳ vọng ngay lập tức (nói rõ xem đến cuối sẽ nhận được giải pháp/danh sách cơ hội gì) để giữ chân người xem.
   - **Kết thúc:** Gieo kỳ vọng lần 2 (tạo sự tò mò về tính năng/đặc quyền/giá trị của KFSP) để ép họ hành động (Inbox/Tải app).
   - **Cấu trúc xuất ra:** Gồm Phần Full Text Voice và Kịch bản Kỹ thuật. Kịch bản Kỹ thuật phải **đề xuất chi tiết Visual/Components cho Remotion** (định dạng dọc 9:16) để phục vụ cho việc lập trình sinh video. **ĐẶC BIỆT LƯU Ý VỀ LỜI THOẠI (VO):** 100% **VĂN NÓI (Spoken language)**. KHÔNG dùng ngoặc kép ("") trong kịch bản thoại để tránh làm gián đoạn/gây lỗi cho tool AI Text-to-Speech. BẮT BUỘC phải có câu chốt slogan KFSP - Đưa chứng khoán về tầm tay bạn ở đoạn cuối video.
2. **Tái chế thành bài Text (Áp giọng):** Sau khi chốt kịch bản video, chuyển thể Voice thành bài Fanpage bám sát **`reference/style-fanpage.md`** (Tít CAPS 2 vế · đánh số · xưng "bạn" · CTA phễu hối lộ · brand spine).
3. **Kênh khác →** xem `reference/style-<kênh>.md`.

### Bước 5 — Tự đánh giá + Phản biện
**Tầng 1 — Tuân thủ:** Chạy **Bảng tự đánh giá 4 mốc** (cuối `reference/idea-fit.md`) + checklist self-check (rule cứng: xưng "bạn", không %lợi nhuận/phím hàng, không em-dash `—`, không icon, không cụm sáo AI, nhịp câu tự nhiên không chặt vụn, móc ≥1 tính năng KFSP, brand spine "Đưa chứng khoán về tầm tay bạn"). Rớt mốc chặn thì không đăng.
**Tầng 2 — Phản biện chất lượng:** Chạy đủ 7 câu phản biện trong **`reference/review-phan-bien.md`**. Đậu cả 2 tầng → xuất content draft.

### Bước 6 — Đề xuất Banner minh hoạ
Sau khi nội dung được duyệt hoàn chỉnh, AI phải đề xuất concept **Banner**:
- Tiêu đề (Headline) trên ảnh.
- Mô tả Visual minh họa cho tiêu đề đó, đảm bảo 100% đúng style Dark Purple Fintech Glassmorphism của KFSP và không lệch brand guideline.

---

## Nguyên tắc chống chồng chéo
- **Idea-fit làm 1 lần/nguồn.** Có file IF rồi thì đọc lại, không phân tích lại từ đầu.
- **Giọng không hardcode trong SKILL.md** — luôn dẫn về `reference/style-<kênh>.md` phù hợp để đọc thêm. Thêm kênh = thêm 1 file reference, không sửa orchestrator.
- **Khung công thức = reference cục bộ** (`reference/fanpage-frameworks.md`), không phụ thuộc vào skill ngoài.
- **Content thành phẩm** (bài đăng) lưu theo campaign (`campaigns/`), KHÔNG lưu trong `idea-bank/` (idea-bank chỉ giữ gốc phân tích + link).

## Tư duy Lõi & Kỷ luật Viết Kịch bản (BẮT BUỘC TUÂN THỦ)
- **Không tự huyễn/Lùa gà (Compliance):** Tuyệt đối KHÔNG dùng các từ cam kết chắc nịch như "không bao giờ", "chắc chắn 100%", "cứu tài khoản ngày mai". Phải hạ tông giọng xuống mức thực tế, khiêm tốn: "chủ động phòng tránh", "hạn chế sai lầm". KFSP là công cụ giáo dục, không phải thuốc tiên.
- **Đồng cảm trước, Giải pháp sau:** KHÔNG nhảy cóc vào giải pháp ngay lập tức. Phải vẽ ra bức tranh thực trạng (hiện tượng) và gọi tên đúng nỗi đau, cảm giác hiện tại của người xem (vd: xót ruột, tê liệt, không biết bán hay giữ) để họ thấy mình trong đó, rồi mới được đưa thuốc.
- **Giải phẫu triệt để gốc rễ:** Không hô hào sáo rỗng (vd: chỉ hô "Tỉa cỏ trồng hoa" mà không giải thích). Phải giải thích được bản chất logic (Cỏ là gì? Là khi cổ phiếu gãy khỏi vùng kỳ vọng). Người xem cần "How" chứ không chỉ "What".
- **Tuyệt đối không Phím hàng:** Cấm dùng lời lẽ hô hào kiểu "dồn hết tiền vào đánh mã này". Phải lùi KFSP về vị thế một công cụ quét dữ liệu khách quan ("bằng dữ liệu, không cảm tính").
- **Treo đầu dê, Bán thịt dê (Logic Phễu):** Nỗi đau ở đầu video phải khớp 100% với CTA "hối lộ" ở cuối. Nếu đầu video hứa giải quyết việc mua nhầm, thì cuối video phải chốt Inbox để tặng Checklist/Cảnh báo chống mua nhầm. KHÔNG gieo kỳ vọng một đằng, chốt sale một nẻo.
- **Thời lượng là phụ, Trọn vẹn ý là chính:** Không cần cố bóp nghẹt kịch bản cho ngắn nếu điều đó làm gãy logic. Ưu tiên truyền tải ĐỦ và ĐÚNG tư duy sâu sắc đến người xem (Tối đa 3 phút).
- **Video First & Tái chế:** Ưu tiên Kịch bản Video trước. 1 Video gốc = Bài Fanpage (bóc voice) + Infographic (trích frame).
- **Phễu Nurturing & CTA "Hối lộ":** Đưa lead vào phễu trung gian bằng mồi nhử cụ thể (Inbox nhận checklist + 5 ngày VIP).
- **Tối ưu Thuật toán (CTA Kép):** Bắt buộc kết hợp "Bình luận [Từ khóa]" để hack tương tác, rồi mới dẫn vào "Inbox/Nhắn tin". Tuyệt chiêu này giúp video cắn đề xuất trên các nền tảng Short/Reel.
- **Tiết chế ngôn ngữ PR (Less is More):** KHÔNG tự nhận mình "khách quan", không nhồi nhét từ ngữ sáo rỗng. Hãy nói đúng tính năng và lợi ích, người xem sẽ tự hiểu. Đừng làm loãng luồng giáo dục bằng văn phong quảng cáo lố bịch.


## Registry reference
| File | Lớp | Đọc khi |
|---|---|---|
| [`reference/idea-fit.md`](reference/idea-fit.md) | Ý tưởng | Bước 1 — nguồn thô mới |
| [`reference/style-fanpage.md`](reference/style-fanpage.md) | Giọng | Bước 2/4/5 — viết cho Fanpage FB |
| [`reference/style-zalo-oa.md`](reference/style-zalo-oa.md) | Giọng | Bước 2/4/5 — viết bài/tin broadcast Zalo OA |
| [`reference/style-email.md`](reference/style-email.md) | Giọng | Bước 2/4/5 — viết email truyền thông KFSP |
| [`reference/style-app-noti.md`](reference/style-app-noti.md) | Giọng | Bước 2/4/5 — viết thông báo Push trên App KFSP |
| [`reference/mau-hinh-template.md`](reference/mau-hinh-template.md) | Template | Khi viết content 1 mẫu hình giá (2 bài: giới thiệu + giao dịch) |
| [`reference/mau-hinh-figma-chart.md`](reference/mau-hinh-figma-chart.md) | Hình ảnh | Khi DỰNG HÌNH Figma cho 1 mẫu hình (bộ 4 hình + chuẩn Hình 3 + thuật ngữ LOCKED + palette + kỹ thuật) |
| [`reference/review-phan-bien.md`](reference/review-phan-bien.md) | Phản biện | Bước 5 Tầng 2 — phản biện chất lượng draft (7 câu) |
| [`reference/fanpage-frameworks.md`](reference/fanpage-frameworks.md) | Khung | Bước 3 — chọn công thức và giật tít |

## Changelog
- 2026-09-24: Bổ sung mục "Chiến lược Sản xuất & Phân phối" (Video First, Tái chế nội dung, Bắc cầu trend, Phễu Nurturing, 4 nỗi đau) vào orchestrator để định hướng tư duy làm nội dung bám sát chiến lược chuyển đổi thực tế. Rút từ cuộc họp quản lý (24/09).
- 2026-09-17: bổ sung 2 luật format vào `style-fanpage.md` (chống dấu hiệu AI): (1) Cấm viết văn chắp vá máy móc theo các gạch đầu dòng dàn ý, bắt buộc dùng kỹ thuật dệt màng nhện (Hook & Pull) để đoạn văn tự móc xích tạo luồng logic nhân quả mềm mại; (2) Cấm dùng từ ngữ phím hàng, xúi giục giao dịch vi phạm pháp lý (VD: "tự tin giải ngân", "lạnh lùng bỏ qua"), phải định vị chính xác KFSP là "công cụ trợ lực", "nguồn tham khảo dữ liệu khách quan". Rút từ lỗi nghiêm trọng vi phạm ranh giới pháp lý ở bài viết Angle 3 Người phán xử (IF-036) phiên 17/09/2026.
- 2026-09-16: bổ sung checklist tự kiểm vào STOP POINT 1 và STOP POINT 2 — AI phải tự chạy checklist trước khi gửi, không chờ user nhắc. STOP POINT 1: đủ 3 mục (phân tích IF + flowchart gửi sếp + hỏi ngưỡng đo). STOP POINT 2: đủ 2 bản dàn ý (flowchart tâm lý + 4 giai đoạn). Rút từ lỗi lặp lại trong phiên 16/09/2026: bỏ sót bản flowchart và bản dàn ý 4 giai đoạn phải bị nhắc mới bổ sung.
- 2026-09-14: cập nhật reference `style-fanpage.md` — bổ sung 4 Anti-pattern chống việc dịch dàn ý một cách máy móc: (1) Cấm bê nguyên xi cấu trúc "Giai đoạn 1/2" của dàn ý vào bài, phải viết liền mạch storytelling; (2) Tôn trọng 100% wording CTA của bản IF đã chốt; (3) Cấm vứt Brand Spine xuống cuối các link app, phải đặt ngay trên dòng "THỰC CHIẾN TRÊN KFSP NGAY:"; (4) Cấm bịa tín hiệu tính năng, phải bám sát HDSD/Journal (AI Mua Bán là mốc tham khảo, không báo cắt lỗ). Khởi nguồn từ bài viết "Angle 1: Gồng lỗ đến mức tê liệt" (14/09).
- 2026-08-21: bổ sung reference `review-phan-bien.md` — đóng gói quy trình phản biện 7 câu (Audience Fit, Mobile Readability, Promise-Delivery Match, Metaphor Continuity, Absolute Claims, Hard Rules Sweep, Phép thử người lạ) vào Bước 5 Tầng 2. Bảng tự đánh giá 4 mốc bắt lỗi tuân thủ, lớp này bắt lỗi chất lượng từ góc nhìn người đọc thật. Rút từ quy trình phản biện thực tế trên 5 bài test Gem Content KFSP (21/08/2026).
- 2026-08-12: cập nhật reference `style-email.md` — chuẩn hóa cơ chế Webhook Tracking `email-click`: bắt buộc dùng tham số `&r=` để vừa log lượt click vào Google Sheet `log_sent` vừa tự động 302 redirect chính xác sang bài viết Facebook / Web đích, loại bỏ lỗi dùng nhầm tham số `dest=` gây mất link điều hướng.
- 2026-08-05: bổ sung reference `style-app-noti.md` — chuẩn hóa quy định kỹ thuật Push Notification (Title ≤ 50 ký tự, Body ≤ 120 ký tự, Deep Link) và giọng "bạn" KFSP (0 icon, 0 em-dash, thúc đẩy 1 hành vi chạm) cho kênh Thông báo App.
- 2026-08-05: bổ sung reference `style-email.md` — chuẩn hóa quy định kỹ thuật (Subject ≤ 60 ký tự, Preheader ≤ 100 ký tự, Banner 16:9, Primary CTA) và giọng "bạn" KFSP (0 icon, 0 em-dash, brand spine) cho kênh Email Marketing.
- 2026-08-05: bổ sung reference `style-zalo-oa.md` — chuẩn hóa quy định kỹ thuật (Title ≤ 150 ký tự, Sapo ≤ 300 ký tự, Cover 16:9, Mobile-first 400–700 từ) và vân tay giọng "bạn" KFSP (0 icon, 0 em-dash, móc tính năng app + brand spine) cho kênh Zalo Official Account.
- 2026-07-28: **v1.1 (bản dành cho chuyên viên content)** — bỏ mọi bước trình duyệt, người viết tự chịu trách nhiệm chấm bài mình. Bước 1 thêm khai Vai trò và Kỳ vọng, Bước 5 đổi thành Tự đánh giá và trỏ về Bảng tự đánh giá 4 mốc trong `reference/idea-fit.md`.
- 2026-07-02: thêm reference `mau-hinh-figma-chart.md` — chuẩn VẼ HÌNH mẫu hình trên Figma (bộ 4 hình/mẫu, chuẩn Hình 3 line chart 2 kịch bản + h/½h + retest + volume + vùng tô, thuật ngữ LOCKED "đường viền cổ / đáy mẫu hình / cắt lỗ dứt khoát / chốt lời dần / kiểm tra lại lực cầu / dời điểm dừng", palette, bài học kỹ thuật Figma). Chuẩn vàng: bộ Hình Bài 2 Hai đáy (Hình 3 dựng tay). Các mẫu sau (Cốc tay cầm/Vai đầu vai/Tam giác) làm chuẩn chỉnh theo.
- 2026-07-01: v1 — gộp `kfsp-content-idea-fit` + `style-fanpage-kfsp` thành 1 skill content duy nhất `kfsp-content` . Idea-fit + style thành reference trong `reference/`; style dẫn theo kênh để đọc thêm (fanpage trước, kênh khác thêm dần). `cong-thuc-viet-content-by-noti` giữ nguyên làm thư viện khung chung, chỉ link. Lý do: 2 skill cũ hay bị gọi chồng chéo/lặp bước; hợp nhất luồng end-to-end 5 bước, chống nhảy cóc + chạy lại idea-fit thừa.
