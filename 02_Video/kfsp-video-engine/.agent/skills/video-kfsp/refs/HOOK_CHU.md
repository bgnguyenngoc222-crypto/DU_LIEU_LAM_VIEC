# Hook bằng chữ — kiểu chữ động cho ba giây đầu

> Mở tệp này khi: đoạn mở video **chỉ có chữ**, không có hình minh hoạ nào gánh đỡ.
> Đúc 06/08/2026 từ bốn nguồn ngoài (liệt kê cuối tệp) cộng bản dựng thật
> `20260804-tinh-nang-co-hoi-tiem-nang`.
>
> Tệp này KHÔNG nói về chữ phụ đề chạy theo lời đọc — cái đó ở `SKILL.md` mục
> phụ đề. Đây là chữ làm **nhân vật chính** của khung hình.

---

## 1. Bốn con số phải nhớ

| Số | Nội dung | Hệ quả khi dựng |
|---|---|---|
| **1 – 2 giây** | Hook phải ăn tiền trong quãng này | Chữ dòng đầu **đã đậm sẵn ở khung 0**, không được ramp từ 0. Khung 0 còn là ảnh đại diện trên YouTube và TikTok |
| **85%** | Tỷ lệ người xem tắt tiếng | Chữ phải **tự đứng được**. Đừng để lời đọc mang nghĩa mà chữ không mang |
| **1080×1350** | Vùng an toàn giữa khung 1080×1920 | Chữ hook đặt trong vùng này, tránh nút của nền tảng |
| **1 chỗ động / đoạn** | Trần chuyển động | Cho mọi chữ cùng động thì người xem đọc CHẬM đi. Một khối đang động thì các khối khác phải đứng |

🔴 **Vùng an toàn theo chiều NGANG chưa có trong tài liệu ngoài, phải tự đo.**
Cột nút của TikTok (tim, bình luận, chia sẻ) chiếm khoảng **18% bề ngang bên
phải**, ở tầm cao 45–85% chiều cao khung. Chữ hook nằm giữa khung theo chiều
dọc nên rơi đúng vào tầm đó. Đo trên bản thật: để chữ rộng 94% bề ngang thì hai
ba chữ cuối mỗi dòng bị nút che; **thu về 84% là hết chồng**, đổi lại cỡ chữ
nhỏ đi khoảng 11%.

---

## 2. Bảy kiểu chữ động có tên gọi

Đây là bảng để **gọi đúng tên thứ mình đang làm**, và để đưa Thanh chọn trên
từng trục thay vì hỏi "anh thấy đẹp không".

| Kiểu | Làm gì | Hợp chỗ nào | Cái giá |
|---|---|---|---|
| **Sequential Reveal** | dựng từng phần một, như đang được viết ra | lời hứa, dẫn chứng, câu dài | chậm; câu ngắn thì thành lề mề |
| **Enter & Exit** | chữ vào rồi ra theo thứ tự có trật tự | liệt kê, so sánh, nhiều vế | mỗi lúc chỉ đọc được một vế |
| **Create & Destroy** | chữ sinh ra rồi phá đi, dứt khoát, không chuyển mượt | câu nhấn, hé lộ, tên sản phẩm | dùng quá một lần thành giật cục |
| **Morphing** | chữ này biến hình thành chữ kia | nối vấn đề sang tên sản phẩm | khó dựng; hai chuỗi chữ phải gần nhau về hình |
| **Textures & Gradients** | dải chuyển sắc chạy trong lòng chữ | tiêu đề, tên tính năng | không tự nó tạo nhịp, phải đi kèm kiểu khác |
| **Flickering** | chớp tắt nhanh | câu kêu gọi | 🔴 sản phẩm tài chính thì người xem đọc thành **app bị lỗi**. Xem luật ở mục 4 |
| **Hypnotizing** | chuyển động miên man không dứt | chỉ hợp phần trang trí, màn chờ | không mang nghĩa; đừng đặt lên câu cần đọc |

---

## 3. Ba luật riêng của KFSP, đúc từ bản dựng thật

### 3.1 Cỡ chữ phải ĐO, không được ước bằng công thức trung bình

Công thức "bề ngang trung bình một ký tự = 0,52 em" dùng khắp dự án là **chỉ
đúng cho câu dài**, nơi nét rộng và nét hẹp bù nhau. Câu ngắn thì không có gì
bù: `"chứng khoán"` 11 ký tự ước ra cỡ 177 điểm ảnh, nhưng ứ-ơ-o-á-n đều nét
rộng nên bề ngang thật gấp rưỡi — chữ **tràn hẳn ra ngoài hai mép khung**.

🔴 Cách đúng: đo thật bằng `fitText` của `@remotion/layout-utils`.

```tsx
import { fitText } from "@remotion/layout-utils";

const fs = Math.min(
  fitText({ text: dong, withinWidth: avail, fontFamily: T.font, fontWeight: 900 }).fontSize,
  capH // trần theo chiều cao, để nhiều dòng không đội quá khung
);
```

Gói này KHÔNG có sẵn trong dự án Remotion mặc định, phải
`npm i @remotion/layout-utils@<đúng phiên bản remotion>`.

### 3.2 Chữ tràn mép: mỗi dòng một cỡ, mép hai bên thẳng hàng

Kiểu "chữ khổng lồ tràn mép" **không phải là chữ to**, mà là chữ **chạm mép**.
Cách dựng: cỡ chữ của từng dòng suy ngược từ chính số ký tự của dòng đó, nên ba
dòng ra ba cỡ khác nhau và mép trái mép phải của cả ba thẳng hàng.

Được ba cái một lúc:
- không phải đụng tới chữ Thanh đã chốt (luật CLAUDE.md mục 8 điểm 5.ter);
- không phải bẻ cụm từ xuống hai dòng ở chỗ đọc lên thấy gượng;
- dòng NGẮN NHẤT tự động TO NHẤT — nếu xếp chữ khéo thì chỗ nhấn rơi đúng chỗ
  cần nhấn mà không phải làm gì thêm.

### 3.3 Hai khối chữ khổng lồ KHÔNG được chồng mờ vào nhau

Chồng mờ 0,4 giây là luật chung của dự án, nhưng nó chỉ đúng khi hai lớp **khác
nhau về loại**. Hai khối chữ cùng cỡ cùng nằm giữa khung mà chỉ khác độ mờ thì
mắt đọc ra **chữ chồng chữ**, không đọc ra một cú chuyển. Đây đúng lớp lỗi L100
trong `LOI_RENDER.md`.

Cách chữa đã dùng được: cho khối đi **CO NHỎ LẠI** (1 → 0,72) trong lúc mờ đi,
còn khối đến thì **ẬP VÀO** (1,22 → 1). Một cái lùi ra, một cái tiến vào, hai
lớp tách nhau về chiều sâu nên không đọc thành chồng.

🔴 Máy quét khung KHÔNG bắt được lỗi này (độ lệch điểm ảnh vẫn cao). **Phải
render ảnh tĩnh đúng khung giao nhau** — L89.

---

### 3.4 Kiểu Morphing — ba số đo được (KFSP đã chốt dùng kiểu này)

Thanh chốt 06/08 sau khi so ba kiểu trên cùng một bản dựng. Morphing thắng vì
nó nối vế cuối của câu hook sang tên tính năng thành **một động tác liền**.

🔴 Morph là **ngoại lệ của luật 3.3**: hai khối chữ ở đây BẮT BUỘC chồng nhau.
Không chồng thì giữa cú biến hình có quãng chỉ còn một mảng nhoè, nặng hơn cả
chồng chữ — vì cái nhoè xoá luôn dấu vết của cả hai khối.

| Số | Giá trị dùng được | Sai thì ra gì |
|---|---|---|
| Giữ khối trước thêm | **4 khung** rồi mới tắt | tắt đúng lịch → 8 khung mảng nhoè trắng, độ lệch điểm ảnh tụt còn 3,1 |
| Đỉnh nhoè | **10 – 13** điểm ảnh | 22 thì chữ tan thành sương, mất hẳn khối chữ |
| Cỡ trong lúc morph | **nở tối đa 6%** | nở 1,34 rồi khối sau vào ở 0,74 → chữ phình ra ngoài hai mép, mất mấy chữ đầu và cuối, đọc thành lỗi tràn chứ không thành biến hình |

Lý do cỡ gần như không đổi: hai chuỗi chữ **đều đang căng hết bề ngang khung**
nên chúng vốn CÙNG CỠ. Biến hình giữa hai vật cùng cỡ thì không được phóng.

### 3.5 Chữ hook không nhất thiết trùng lời đọc

Bản `20260804` giữ nguyên lời đọc đủ câu, còn chữ trên hình chắt lại còn ba
nhịp. Thanh chốt: *"giọng đọc vẫn đủ"*. Đây là chủ ý — chữ gánh phần nhìn, lời
gánh phần nghe, hai bên không phải chép lại nhau.

Khi chữ chắt như vậy thì **cách viết hoa chính là thứ tự nhấn**, phải giữ đúng
từng chữ Thanh viết:

```
"Xây dựng"   thường  → dẫn nhập, cỡ vừa, màu mực
"LỢI THẾ"    HOA     → chỗ nhấn, tràn mép, màu thương hiệu
"với"        thường  → bản lề, cỡ nhỏ, màu xám lùi lại
"CƠ HỘI TIỀM NĂNG"  HOA → vế kết, tràn mép, chuyển sắc
```

🔴 Vì thế **không được cho mọi dòng cùng tràn mép**. Phải khai riêng cho từng
dòng phần bề ngang mà nó căng ra (`fill`); cho `"với"` ba ký tự căng hết khung
thì một chữ đệm bị hét lên to bằng cả câu.

🔴 Và khi ba dòng là **một câu liền mạch** thì chúng phải **lên rồi Ở LẠI**,
không đẩy nhau đi — cuối nhịp người xem phải đọc được trọn câu. Kiểu "mỗi lúc
một dòng" chỉ đúng khi ba dòng là ba vế rời.

---

## 4. Ba cái bẫy của sản phẩm tài chính

1. **Flickering và nhiễu số**: hình giật nhiễu trên sản phẩm chứng khoán thì
   người xem đọc thành *app bị lỗi*, không đọc thành hiệu ứng. Dùng **đúng một
   lần** trong cả video thì là nhấn nhá; dùng ba lần là lỗi.
2. **Chữ nhấn chôn ở dòng cuối**: tài liệu ngoài nói chữ nhấn phải ở dòng ĐẦU.
   Nhưng chữ là của Thanh và thứ tự câu là của Thanh — **không được tự đảo**.
   Việc đúng là **báo cái giá** rồi để Thanh quyết.
3. **Nền động dưới chữ lớn**: chữ càng to càng cần nền trơn. Bản
   `20260804` ban đầu cho hai dải điện thoại chạy ngay dưới chữ hook; chữ nhỏ
   thì chịu được, chữ to gấp đôi thì dòng nhấn đọc không ra. Thanh chốt
   06/08: **"đoạn đầu khoan hãy đưa 2 dải điện thoại vào, tập trung typography
   trước"** — dời hẳn nền động ra sau khi khối chữ đã làm xong việc của nó.

---

## 5. Bảng chọn nhanh khi Thanh chê hook "chưa ấn tượng"

"Ấn tượng" là tính từ. Tách thành **bốn trục đo được** rồi đưa Thanh chọn trên
từng trục, đừng đoán:

| Trục | Hai đầu | Đang ở đâu thì đo thế nào |
|---|---|---|
| **Cỡ chữ** | vừa đọc ↔ tràn mép | cỡ chữ chia bề ngang khung |
| **Cách vào** | trôi mượt ↔ ập dứt khoát | số khung của dốc vào (12 khung là mượt, 6 là ập) |
| **Số dòng cùng hiện** | một dòng ↔ cả câu | đếm dòng có độ mờ > 0,5 |
| **Nền dưới chữ** | trơn ↔ có hình chạy | có bao nhiêu phần trăm khung là nền động |

---

## Nguồn

- [Kinetic Typography in 2026: Examples, Patterns & UX Risk — Digital Silk](https://www.digitalsilk.com/digital-trends/kinetic-typography/) — bảy kiểu có tên gọi ở mục 2, và các cảnh báo về lạm dụng
- [Trending Hook Formats 2026 — TrueFan AI](https://www.truefan.ai/blogs/trending-hook-formats-2026) — mốc 1–2 giây, tỷ lệ 85% tắt tiếng, vùng an toàn 1080×1350
- [Kinetic Typography Tips for Short Video Engagement — Influencers Time](https://www.influencers-time.com/boost-short-video-engagement-with-kinetic-typography-tips/) — luật "một thông điệp mỗi cảnh"
- [Kinetic Typography: The Complete Guide — IK Agency](https://www.ikagency.com/graphic-design-typography/kinetic-typography/)

> ⚠️ Bốn nguồn trên đều là bài viết của công ty dịch vụ, **không phải nghiên cứu
> có số liệu công bố**. Các con số ở mục 1 dùng được như mốc tham chiếu, nhưng
> mục 3 mới là thứ đo được trên chính bản dựng của mình. Chỗ nào hai bên lệch
> nhau thì tin số đo tại chỗ.
