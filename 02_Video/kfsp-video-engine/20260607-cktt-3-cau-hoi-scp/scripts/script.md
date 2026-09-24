# Script — "3 câu hỏi nhận diện một siêu cổ phiếu"

> Kênh **Chứng khoán trong tầm tay** (faceless, nobrand) · nguồn idea-fit **IF-2026-001** (O'Neil) · framework **PASA** · giọng **Minh Quân** 1.0 · giai đoạn **nuôi kênh → CTA soft**.
> 1 kịch bản → **2 bản**: BRAND (kênh 1 KFSP, có logo) + NOBRAND (kênh 2, không logo). s01–s11 chung audio; đoạn kết tách (xem dưới).

## Spec
Dọc 1080×1920, 30fps · BrandFrame overlay tím `#7B3AEC` (nobrand=true cho kênh 2) · phụ đề karaoke y 1380–1470 · safe zone y 150–1500 · BGM trầm 0.08, SFX 0.15–0.3 · faceless (app/đồ hoạ + giọng, không lộ mặt).

---

## Kịch bản

**[HOOK]**
Bạn có hay nhìn một cổ phiếu rồi tự hỏi, liệu nó có thành siêu cổ phiếu không? `[nến mọc dần, zoom 1 cây nến]`
Thú thật, chuyện nó tăng tới đâu thì nằm ngoài tầm tay mình. `[chữ "ngoài tầm tay" xám, trôi ra rìa]`

**[Alternative]**
Nhưng có một việc nằm gọn trong tầm tay: soi nó qua ba câu hỏi. `[khung sáng tím gom lại, 3 chấm pop]`
Nghe thì to tát, thực ra chỉ là ba câu ai cũng tự hỏi được. `[nhịp chậm, sáng nhẹ]`

**[Steps — 3 câu hỏi]**
Câu một: doanh nghiệp này có đang khoẻ thật không? `[badge 1 + nhịp tim]`
Tức là lợi nhuận quý gần nhất đang tăng tốc, nhiều năm liền tăng đều, và có gì đó mới mẻ tạo đà. `[pop 3 chip + cột lợi nhuận mọc]`
Câu hai: có dòng tiền lớn đứng sau lưng nó không? `[badge 2 + cột volume]`
Nhìn vào khối lượng, những phiên tăng vọt là dấu chân của tổ chức, và nó thường là mã dẫn đầu ngành. `[volume bật sáng, mũi tên vượt nhóm]`
Câu ba: con sóng chung có đang thuận không? `[badge 3 + đường index nền sau]`
Một cổ phiếu khoẻ tới mấy mà thị trường chung đang xuống thì vẫn đuối, nên mình chờ lúc sóng thuận. `[thuyền nhỏ xuôi sóng, trái→phải]`

**[Chốt]**
Ba câu hỏi này không đoán tương lai, nó chỉ giúp mình nhìn cho tỉnh trước khi xuống tiền. `[3 badge gom thành khung checklist, nhịp chậm]`

**[Kết — TÁCH 2 BẢN]**

BRAND (kênh 1):
Và phần khoẻ nhất là mấy thứ này, một cái bộ lọc làm thay bạn trong vài giây, như cánh tay nối dài vậy. `[ẢNH APP Bộ lọc (A1), zoom list kết quả, SFX whoosh]`
Theo dõi mình để mỗi ngày, chứng khoán gọn lại trong tầm tay bạn thêm một chút nha. `[chữ "trong tầm tay" sáng tím + logo; không pause cuối]`

NOBRAND (kênh 2):
Theo dõi mình để mỗi ngày thêm một mẹo hay trong giao dịch, đưa chứng khoán về gần tầm tay bạn hơn nha. `[chữ "trong tầm tay" sáng tím, không logo; không pause cuối]`

---

## Sentence Map

| id | Bản | Phase | Câu (display) | Main idea | pause_after_ms | Enum |
|---|---|---|---|---|---|---|
| s01 | chung | HOOK | Bạn có hay nhìn một cổ phiếu rồi tự hỏi, liệu nó có thành siêu cổ phiếu không? | tự hỏi siêu cổ phiếu | 300 | — |
| s02 | chung | HOOK | Thú thật, chuyện nó tăng tới đâu thì nằm ngoài tầm tay mình. | ngoài tầm tay | 600 | — |
| s03 | chung | ALT | Nhưng có một việc nằm gọn trong tầm tay: soi nó qua ba câu hỏi. | trong tầm tay, 3 câu hỏi | 250 | — |
| s04 | chung | ALT | Nghe thì to tát, thực ra chỉ là ba câu ai cũng tự hỏi được. | nghe to tát, thực ra dễ | 500 | — |
| s05 | chung | STEP | Câu một: doanh nghiệp này có đang khoẻ thật không? | câu 1: khoẻ thật | 200 | — |
| s06 | chung | STEP | Tức là lợi nhuận quý gần nhất đang tăng tốc, nhiều năm liền tăng đều, và có gì đó mới mẻ tạo đà. | dấu hiệu khoẻ thật | 350 | [tăng tốc, nhiều năm tăng đều, có gì mới] |
| s07 | chung | STEP | Câu hai: có dòng tiền lớn đứng sau lưng nó không? | câu 2: dòng tiền lớn | 200 | — |
| s08 | chung | STEP | Nhìn vào khối lượng, những phiên tăng vọt là dấu chân của tổ chức, và nó thường là mã dẫn đầu ngành. | khối lượng + dẫn đầu | 350 | [khối lượng tăng vọt, dấu chân tổ chức, dẫn đầu ngành] |
| s09 | chung | STEP | Câu ba: con sóng chung có đang thuận không? | câu 3: sóng chung thuận | 200 | — |
| s10 | chung | STEP | Một cổ phiếu khoẻ tới mấy mà thị trường chung đang xuống thì vẫn đuối, nên mình chờ lúc sóng thuận. | chờ sóng thuận | 500 | — |
| s11 | chung | CHỐT | Ba câu hỏi này không đoán tương lai, nó chỉ giúp mình nhìn cho tỉnh trước khi xuống tiền. | nhìn tỉnh trước khi mua | 400 | — |
| s12 | BRAND | ACTION | Và phần khoẻ nhất là mấy thứ này, một cái bộ lọc làm thay bạn trong vài giây, như cánh tay nối dài vậy. | bộ lọc, cánh tay nối dài | 300 | — |
| s13b | BRAND | CTA | Theo dõi mình để mỗi ngày, chứng khoán gọn lại trong tầm tay bạn thêm một chút nha. | theo dõi, trong tầm tay | 0 | — |
| s13n | NOBRAND | CTA | Theo dõi mình để mỗi ngày thêm một mẹo hay trong giao dịch, đưa chứng khoán về gần tầm tay bạn hơn nha. | theo dõi, mẹo, tầm tay | 0 | — |

> BRAND build = s01–s11 + s12 + s13b. NOBRAND build = s01–s11 + s13n.

## Storyboard asset

| id | Asset | Ghi chú |
|---|---|---|
| s01–s11, s13b, s13n | `code` | nến/badge/volume/sóng/checklist + chữ, vẽ Remotion |
| **s12 (BRAND)** | `photo: A1` | **Ảnh màn hình Bộ lọc app** — CEO gửi |

## 🎒 Asset Manifest
| # | Cần | Cho bản | Trạng thái |
|---|---|---|---|
| A1 | Ảnh chụp màn hình Bộ lọc app (zoom list kết quả) | BRAND | ⏳ CEO sẽ gửi |

→ **NOBRAND render được ngay** (toàn code). **BRAND** chờ ảnh A1.

## Tiêu chí Audit Video
- Faceless + nobrand (bản kênh 2): không mặt, không logo, không đọc tên app/gói.
- Neo "tầm tay": s02 "ngoài tầm tay" (xám, trôi ra) tương phản s03/s13 "trong tầm tay" (sáng tím, gom vào).
- Enum beat sync: s06 + s08 pop 3 cụm đúng word timestamp (≤2 frames lệch).
- Tông trấn an: s04, s11 nhịp chậm, sáng nhẹ; không cắt giật, không hối thúc.
- Compliance: không %, không "mã sẽ tăng", không tên mã — mọi minh hoạ là tiêu chí chung.
- CTA soft: s13 "theo dõi mình", không ép cài app, pause cuối = 0.
- Sentence atomicity / Main idea match / Enum beat / Stitch gap: theo chuẩn sentence-driven.

---
*Tạo 2026-06-07. Nguồn: IF-2026-001. Engine render: `~/Desktop/VIDEO KFSP/`.*
