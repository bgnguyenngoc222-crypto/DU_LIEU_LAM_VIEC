# Video hướng dẫn thao tác trên app — quy trình chạy một bài

> Chốt 05/08/2026. Áp cho video chỉ người dùng **bấm ở đâu, làm thế nào** trên app hoặc web KFSP.
> Tệp này lo **quy trình**. Phần mã và tham số nằm ở [`~/Desktop/VIDEO KFSP/_shared/remotion/tutorial/README.md`](../../../../../../Desktop/VIDEO%20KFSP/_shared/remotion/tutorial/README.md) — đừng chép lại sang đây.

---

## 1. Loại này khác video dạy mẫu hình ở đâu

| | Video dạy mẫu hình (nến, Wyckoff…) | **Video hướng dẫn thao tác** |
|---|---|---|
| Hình từ đâu | Dựng bằng mã, từng cảnh vẽ mới | **Quay màn hình thật**, mã chỉ phủ lên trên |
| Việc nặng nhất | Viết kịch bản và dựng cảnh | **Quay được một bản sạch** |
| Nhịp | Cảnh đi theo câu nói | Nhịp đi theo **thao tác trong bản quay**, lời phải bám theo tay |
| Sai thì hỏng ở đâu | Người xem không hiểu ý | Người xem **làm theo không được** — nặng hơn |

🔴 **Hệ quả:** loại này **không bắt đầu bằng kịch bản**. Bắt đầu bằng bản quay. Viết lời trước rồi ép bản quay khớp theo là làm ngược, và luôn phải quay lại.

---

## 2. Kiểu hình đã chốt — "kiểu 1"

Quay màn hình thật, lồng khung điện thoại, thêm dấu ngón tay, tự phóng vào vùng đang bấm.
Thanh chốt 05/08/2026 sau khi so ba kiểu; kiểu dựng lại giao diện bằng đồ hoạ đẹp hơn nhưng chậm, để dành cho video giới thiệu tính năng.

Bốn thành phần, thiếu một là hỏng:

1. **Khung máy** quanh bản quay — cho mắt biết đang xem điện thoại, che mép bản quay.
2. **Dấu ngón tay** — bản quay không ghi lại ngón tay. Thiếu nó người xem thấy màn hình tự đổi mà không biết vừa bấm đâu.
3. **Tự phóng vào vùng đang bấm** — chữ trên app nhỏ, không phóng thì xem trên điện thoại không đọc nổi.
4. **Chú thích ngắn** bám theo tay, dưới 6 chữ.

🔴 **Nền, bóng và logo — chốt 06/08/2026, lấy chung với video giới thiệu tính năng:**

| Thứ | Luật |
|---|---|
| **Nền thân bài** | Tấm vân lụa `bg-cover.png`, **đúng tấm đó**. Đừng lấy `bg-newfeature-light.png`: hai tấm đều là vân lụa nhưng lệch độ sáng hơn mười đơn vị, mà mở bài và kết bài đã dùng tấm cover — lệch tấm là mỗi lần chuyển khối nền lại tối xuống một nấc. Nền tím đậm cũ chỉ còn dùng khi có lý do riêng |
| **Bóng đổ máy** | Vẽ bằng **chính ảnh máy**, không dùng `boxShadow` — chi tiết ở README bộ dựng. Nền sáng thì bóng tô trắng (`shadow="light"`) |
| **Logo góc** | Logo tím màu gốc, sát mép trên căn giữa, vào sau khi mở bài tan và ra trước khi kết bài phủ. **Bọc quầng trắng nhiều lớp**: lúc máy phóng thì mép thân máy màu đen tràn qua đúng chỗ đó, logo tím chìm hẳn |

🔴 **Hai luật về chú thích, Thanh chốt 05/08/2026:**

| Luật | Nội dung |
|---|---|
| Dùng chữ **"Bấm"**, không dùng "Chạm" | Áp cho cả chú thích trên video lẫn trang HDSD. Chỉ giữ "chạm" khi nói về **giá chạm một mức**, hoặc khi gọi tên **dấu chạm** của bộ dựng |
| **Phóng to TRƯỚC cú bấm, không phải bấm xong mới phóng** | Người xem cần thấy rõ cái nút trước lúc ngón tay hạ xuống, mới biết mình phải bấm vào đâu. Phóng sau thì cú bấm quan trọng nhất lại diễn ra lúc chữ còn nhỏ |
| **Chấm tím đẩy ra CẠNH nút, không đè lên nút** | Chấm đặc che mất chữ trên nút. Dùng `tap.nudge` để đẩy riêng chấm đặc ra chỗ trống bên cạnh; vòng sóng lan vẫn ở đúng chỗ bấm nên người xem không mất mốc. **Đẩy vào KHE giữa hai nút thôi**: đẩy quá sang thân nút kế thì người xem tưởng đang bấm nút đó |
| 🔴 **Sóng lan là CHỮ NHẬT BO GÓC, toàn bài, không riêng cảnh mở bài** | Thanh chốt 05/08/2026, mở rộng luật trước đó. Trong bài **không còn hình tròn nào trừ chính chấm đầu ngón tay**. Mọi thứ bấm được trong app KFSP đều là chữ nhật bo góc; vòng tròn lan quanh nút chữ nhật thì hai hình không ăn nhau, nút dài thì vòng tròn hoặc trùm quá hoặc hụt hai đầu. Cỡ khung khai bằng `tap.box` = cỡ thật của nút |
| **Chú thích nằm dưới đáy khung, nền một DẢI kính mờ kéo hết bề ngang** | Viên thuốc bo tròn ôm sát chữ thì nền phía sau vẫn lộ ra ngay cạnh chữ, chữ không nổi lên được. Dải kéo hết ngang cắt đôi khung hình dứt khoát. Chữ tím thương hiệu |
| 🔴 **Cú bấm ĐỔI HẲN MÀN thì dấu bấm phải tắt trước lúc màn đổi** | Thanh bắt được 06/08/2026. Dấu bấm để mặc định 1,05 giây thì nó còn nằm lại khi màn đã sang trang mới, khoanh vào một chỗ không còn nút nào. Khai `tap.life` bằng đúng khoảng từ lúc bấm tới lúc màn **bắt đầu** đổi, đo trên chính bản quay. Luật 0,5 tới 1 giây ở trên chỉ áp cho cú bấm không đổi màn |
| 🔴 **Từ lúc vừa qua màn mới tới lúc có viền tím: ĐÚNG 1 GIÂY** | Thanh chốt 06/08/2026, áp cho mọi chương. Quãng ở giữa chỉ là thao tác kéo và phóng của người quay, người xem không cần xem chậm — họ cần thấy màn mới rồi thấy ngay chỗ được chỉ. Nén thẳng trong bản quay bằng `setpts`, hệ số tính từ độ dài thật của quãng đó. Ở bài "Cơ hội tiềm năng" ba quãng dài 1,31 · 8,50 · 7,70 giây, cùng nén về 1 giây |
| 🔴 **Dấu bấm phải ở lại 0,5 tới 1 giây** | Thanh chốt 05/08/2026. Vòng đời cũ 0,62 giây đã gồm cả nhịp hiện lên lẫn nhịp tan, nên chỗ đứng rõ chỉ còn khoảng ba phần mười giây; người xem chưa kịp hình dung nút nằm đâu thì dấu đã mất. Nay tổng 1,05 giây, đứng rõ khoảng 0,65 giây. Khung viền cũng **đứng lại ôm nút** chứ không lan ra rồi tắt |
| 🔴 **Một chương một mạch chữ, đừng đổi chữ mỗi khi máy phóng** | Thanh chốt 06/08/2026. Dòng đầu của chương giữ nguyên qua cả lúc phóng vào thẻ; chỉ đổi chữ khi người xem sang một việc khác hẳn (bấm mở biểu đồ, khoanh viền trên biểu đồ). Bài "Cơ hội tiềm năng" từ 12 dòng xuống 9: chương 1 và 2 mỗi chương ba dòng, **chương 3 chỉ MỘT dòng** đứng suốt 9,2 giây, vì hai chương trên đã dạy đủ cách xem |
| 🔴 **Giống nhau về NHỊP quan trọng hơn đúng về hình học** | Ba màn biểu đồ ban đầu mỗi chương một tâm phóng riêng lấy theo giữa khung viền chương đó — đúng hình học, nhưng người xem đọc thành ba cảnh rời chứ không thành một cách xem lặp lại ba lần. Việc lặp lại thì **dùng chung một bộ số**, rồi kiểm xem khung viền có lọt không, chứ đừng tối ưu từng chương |
| **Chú thích phải nói thêm điều mắt chưa tự thấy** | ❌ "Bấm Cấu tạo" · ❌ "Hình này có năm điểm" → ✅ "Cấu tạo: hình gồm những điểm nào" · ✅ "Mỗi điểm là một ngày, một mức giá". Hệ quả: **bớt dòng để mỗi dòng sống lâu hơn**, 1,4 đến 2,4 giây thay vì 1,1 giây |

> Ba đối thủ trong nước (FireAnt, Simplize, iStock VNDIRECT) đăng thẳng bản quay thô, không có bốn thứ này. Đây là chỗ KFSP hơn được mà không tốn thêm gì mấy.

---

## 3. Sáu bước — dừng chờ Thanh duyệt ở mỗi cổng

### Bước 1 — Chốt phạm vi bài
Hỏi Thanh: **tính năng nào · người xem xong làm được gì · dài bao nhiêu.**
Một bài = **một việc làm được**. "Hướng dẫn dùng Bộ lọc" là ba bài, không phải một.

**Cổng:** Thanh chốt một câu "xem xong thì người dùng tự làm được X".

### Bước 2 — Xin bản quay
Gửi Thanh yêu cầu quay, kèm đúng các điểm sau:

- Quay dọc, máy thật, **tắt kiểu hiện chấm chạm của hệ điều hành** (bộ dựng tự vẽ, để cả hai thành hai chấm).
- **Thao tác chậm hơn bình thường**, mỗi bước dừng khoảng một giây. Quay nhanh thì không chèn được chú thích.
- Tránh viên đỏ "đang ghi màn hình" nếu được. Không tránh được thì bật `hideStatusBar`.
- Dữ liệu trên màn phải **xem được**: đừng quay lúc danh mục trống hoặc lỗi mạng.
- Một mạch từ đầu tới cuối, sai thì quay lại từ đầu — **đừng cắt ghép nhiều lần quay**, khung máy sẽ giật.

**Cổng:** xem bản quay trước khi làm gì tiếp. Bản quay xấu thì mọi bước sau đều phí.

### Bước 2.bis — Kiểm tư liệu trước khi tin

🔴 **Tư liệu chụp hai ngày khác nhau thì không dựng chung một video, dù chỉ một đoạn.**
Kiểm hai thứ trên chính khung hình trước khi tiếc công một bản quay cũ:

| Kiểm | Vì sao |
|---|---|
| **Số lượng phần tử giao diện** (số tab, số nút mỗi dòng) | App đổi bản là thanh tab mọc thêm mục. Ghép vào thì giữa video giao diện tự đổi |
| **Một con số bất kỳ hiện trên màn** | Cùng một mã, hai ngày là hai con số. Người xem thấy số nhảy giữa bài |

Lệch một trong hai thì **bỏ bản quay đó**, không có cách dựng nào cứu được.

🔴 **Bản quay không có chỗ dừng thì CHÈN THÊM CHỖ DỪNG, đừng ép chú thích vào chỗ chật.**

Thanh chốt 05/08/2026: sang một màn mới, nhất là màn biểu đồ, phải **đợi hình
được kéo hoặc phóng xong** rồi mới hiện viền tím và chữ, và bản quay phải
**dừng lại 1 tới 2 giây** cho người xem kịp nhìn trong đó có gì. Viền đặt lúc
hình còn đang dịch thì nó trôi lệch khỏi đúng cái nó ôm.

🔴 **ĐIỂM DỪNG PHẢI RƠI VÀO QUÃNG HÌNH CÒN TĨNH, KHÔNG PHẢI GIỮA MỘT CHUYỂN
ĐỘNG ĐANG DỞ.** Vấp 06/08/2026: chèn 1,3 giây đứng yên để dấu bấm ở lại đủ lâu,
đặt ở giây 3,95 mà từ 3,70 app đã bắt đầu chạy hiệu ứng chuyển màn. Thanh xem
và nói ngay "giây thứ 13 bị khựng, nhìn rất tệ". **Đóng băng giữa một chuyển
động đang dở thì mắt đọc thành GIẬT, không đọc thành "dừng lại cho xem".**
Chương duy nhất không chèn dừng lại là chương duy nhất mượt — đó là dấu hiệu
lỗi nằm ở chỗ ĐẶT điểm dừng chứ không ở việc dừng. Quét chênh lệch khung tìm
quãng tĩnh (đoạn mã bên dưới) rồi đặt điểm dừng **bên trong** quãng đó.

🔴 **Đứng yên KHÔNG có nghĩa là đúng trạng thái.** Vấp 06/08/2026: đo trên đoạn
bản quay đang dùng, thấy biểu đồ đứng yên sẵn hơn 3 giây nên kết luận không cần
chèn gì. Sai, vì lúc đó hình giá còn nằm sát mép phải và bị thẻ trạng thái đè
lên; trạng thái đúng nằm trong phần bản quay **đã bị cắt bỏ từ trước**. Đo trên
tư liệu đã cắt thì chỉ trả lời được câu hỏi về phần còn lại. **Mở bản quay GỐC
ra xem hết trước khi kết luận là thiếu gì**, nhất là phần cuối: người quay hay
kéo và chỉnh khung hình ở những giây cuối, mà đó lại chính là trạng thái đẹp
nhất để khoanh viền.

Tìm quãng đứng yên bằng máy, đừng tua bằng mắt: so chênh lệch từng cặp khung
liên tiếp, quãng nào gần bằng 0 là hình đang đứng.

```python
from PIL import Image, ImageChops
import os
d='/tmp/dy'; fs=sorted(os.listdir(d))          # trich truoc: fps=10, cat vung chart
for i in range(len(fs)-1):
    a=Image.open(f'{d}/{fs[i]}').convert('L'); b=Image.open(f'{d}/{fs[i+1]}').convert('L')
    h=ImageChops.difference(a,b).histogram()
    v=sum(j*n for j,n in enumerate(h))/(a.size[0]*a.size[1])
    print(f'{i/10:5.1f}s {v:6.2f}', 'DUNG YEN' if v<0.6 else 'dang keo')
```

Không có quãng nào đủ dài thì nhân bản một khung ra thành mấy giây, nối vào
đúng chỗ, rồi **cộng dồn toàn bộ mốc phía sau** theo đúng số giây đã chèn:

```bash
ffmpeg -y -ss 12.85 -i rec.mp4 -frames:v 1 -update 1 /tmp/fr.png
ffmpeg -y -i rec.mp4 -t 12.85 -c:v libx264 -crf 16 -r 60 -pix_fmt yuv420p -an /tmp/pA.mp4
ffmpeg -y -loop 1 -i /tmp/fr.png -t 1.8 -r 60 -vf "scale=828:1792,format=yuv420p" \
  -c:v libx264 -crf 16 -an /tmp/pB.mp4
ffmpeg -y -ss 12.85 -i rec.mp4 -c:v libx264 -crf 16 -r 60 -pix_fmt yuv420p -an /tmp/pC.mp4
printf "file '/tmp/pA.mp4'\nfile '/tmp/pB.mp4'\nfile '/tmp/pC.mp4'\n" > /tmp/ds.txt
ffmpeg -y -f concat -safe 0 -i /tmp/ds.txt -c copy rec.mp4
```

Dời mốc thì quét **một lượt** bằng biểu thức, đừng thay từng chuỗi nối tiếp:
mốc vừa dời xong sẽ trùng với một mốc cũ chưa dời và bị đổi lần hai. Dời xong
kiểm ba thứ: số mốc không đổi, dãy `at` vẫn tăng dần, hai `note` vẫn cách nhau
ít nhất 0,75 giây.

🔴 **Thiếu một đoạn thì lấy ẢNH TĨNH, đừng vội quay bù.** Bộ dựng không phân biệt ảnh
với bản quay: ghép ảnh thành một đoạn video giữ vài giây rồi phủ dấu ngón tay, cú phóng,
viền tím lên trên y hệt. Ảnh chụp **cùng buổi** với bản quay thì số liệu khớp tuyệt đối,
còn quay bù hôm khác thì lại đúng vào cái bẫy ở trên.

```bash
ffmpeg -loop 1 -i anh.PNG -t 5.0 -r 60 -vf "scale=828:1792,format=yuv420p" \
  -c:v libx264 -crf 18 -g 15 -keyint_min 15 doan_anh.mp4
```

### Bước 3 — Lập bảng mốc thao tác
Xem bản quay bằng máy, không đoán:

```bash
ffmpeg -i rec.mp4 -vf "fps=1,scale=300:-1,tile=7x2" -frames:v 1 /tmp/grid.jpg   # xem toàn bài
ffmpeg -ss 6.4 -i rec.mp4 -frames:v 1 -vf scale=414:-1 /tmp/x.jpg               # lấy một khung
# toạ độ: x = ngang / 414, y = dọc / 896
```

Ra bảng: giây thứ mấy · thao tác gì · toạ độ · chú thích.

🔴 **Toạ độ của KHUNG KHOANH thì phủ lưới là chưa đủ, phải dò điểm ảnh.**

Phủ lưới toạ độ lên khung hình rồi đọc bằng mắt chỉ đủ để biết vật nằm **quãng nào**.
Số đưa vào mã phải dò bằng máy, vì lệch vài điểm ảnh nhìn ảnh trần không thấy nhưng
đặt một cái khung bao quanh là lộ ra ngay — lúc đó mắt có hai cạnh để đối chiếu.
Vấp 05/08/2026: đọc bằng mắt ra tâm 0,132, dò máy ra tâm thật 0,1495, Thanh nhìn một
ảnh chụp bé bằng con tem và bắt được ngay.

```python
from PIL import Image
im = Image.open('/tmp/x.jpg').convert('RGB'); W,H = im.size; px = im.load()
ink = lambda p: not (p[0]>238 and p[1]>238 and p[2]>238)      # khác nền trắng = có mực
X0,X1,Y0,Y1 = int(.00*W), int(.24*W), int(.11*H), int(.20*H)  # khoanh thô quanh vật
cols = [x for x in range(X0,X1) if any(ink(px[x,y]) for y in range(Y0,Y1))]
rows = [y for y in range(Y0,Y1) if any(ink(px[x,y]) for x in range(X0,X1))]
print(f"x {cols[0]/W:.3f}–{cols[-1]/W:.3f}   y {rows[0]/H:.3f}–{rows[-1]/H:.3f}")
```

Quét thêm **ô hàng xóm** ở bốn phía để biết khung được phép nở tới đâu.
Nền tối thì đảo phép thử `ink` lại.

**Cổng:** trình bảng cho Thanh duyệt **trước khi viết lời**. Đây là xương của bài.

### Bước 4 — Viết lời theo bảng mốc
Lời bám theo tay, không ngược lại. Câu nào cũng phải ứng với một việc đang xảy ra trên màn.
Giọng và phiên âm theo luật chung ở `SKILL.md`. **Luôn hỏi Thanh giọng nào trước khi gen.**

### Bước 5 — Dựng
Chép dự án gần nhất, thay `public/rec.mp4`, viết `src/steps.ts`. Không đụng vào mã bộ dựng.
Chi tiết tham số và các lỗi đã vấp: README của bộ dựng.

### Bước 6 — Soi trước khi trình
Xuất ra rồi **rút vài khung ra xem**, đừng tin là đúng:

```bash
for t in 2.5 6.5 9.5; do ffmpeg -ss $t -i out/final.mp4 -frames:v 1 /tmp/k_$t.jpg; done
```

---

## 4. Bảng soi trước khi trình Thanh

- [ ] Mỗi cú bấm trong bản quay đều **có dấu ngón tay**. Sót một cú là người xem mất mạch.
- [ ] Dấu chạm **nhìn thấy được trên nền đang có**. Nền app KFSP trắng — chấm trắng biến mất.
- [ ] Chỗ nào có chữ nhỏ đều **đã phóng to**.
- [ ] Chú thích **không che đúng chỗ đang chỉ**, không chồng nhau, không tràn khỏi viền máy.
- [ ] Chữ chú thích **khớp hướng ngón tay** (ngón đi lên thì trang chạy xuống — ghi theo hướng ngón).
- [ ] Có **câu thương hiệu** ở đoạn đóng: "Đưa chứng khoán về tầm tay bạn".
- [ ] Không có viên đỏ ghi màn hình, không lộ dữ liệu cá nhân hay số dư thật.
- [ ] **Mỗi dòng chú thích đã soi TRÊN ĐÚNG KHUNG HÌNH nó hiện ra**, không soi trên bảng mốc. Một câu đúng cú pháp nhưng đặt sai màn thì thành dạy sai (vd. "đọc từ trái sang phải" đặt lúc đang mở ô liệt kê, mà ô đó xếp từ mới tới cũ).
- [ ] **Viền tím ôm đúng ô card.** Dò biên theo màu thì phải hỏi "còn thứ nào khác cùng màu không" — nút bấm trong app hay có nền xám cùng tông với ô chi tiết, dò cả vùng là ăn nhầm. Dò theo **một cột dọc** rồi đọc các đoạn đứt quãng.
- [ ] **Đúng với bản app đang phát hành.** Giao diện đã đổi mà video còn cũ thì tự tạo ra câu hỏi cho bên chăm sóc khách.

---

## 4.bis Hai bẫy kỹ thuật đã vấp

| Bẫy | Cách tránh |
|---|---|
| **Khung khoanh lệch so với vật nó ôm** | Đọc toạ độ bằng mắt trên lưới. Lệch 0,018 là mắt bắt được, vì cái khung cho hai cạnh để đối chiếu. **Dò điểm ảnh**, xem đoạn mã ở bước 3 |
| **Khung khoanh trông dẹt dù chừa hở "đều"** | Toạ độ là phần 0…1 của màn 414×896, không vuông. Hở 0,015 bốn phía ra hở ngang 6 điểm ảnh, hở dọc 13. **Quy về điểm ảnh rồi chia ngược lại**: hở đều 10 điểm ảnh nghĩa là ghi 0,024 ngang và 0,011 dọc |
| **Khung khoanh cắt xuyên qua con số** | Đo tới mép khối nhìn thấy chứ không tới ký tự cuối. Cột phải các dòng dữ liệu hay chạy sát mép màn hơn ta tưởng. **Đo tới ký tự cuối cùng bên phải** |
| **Phóng sâu làm khung khoanh mất một cạnh** | 🔴 Đọc kỹ trần này là trần của cái gì: nó là trần để **KHUNG MÁY** không tràn khỏi khung hình, KHÔNG phải trần để vùng **MÀN HÌNH** còn nhìn thấy. Màn rộng 724 điểm ảnh trong khung 1080 nên phóng tới 1,55 vẫn thấy 96% bề ngang màn — vấp 06/08/2026: hạ một cú phóng từ 1,55 xuống 1,22 vì tưởng khung viền sẽ bị cắt, hoá ra lo hão và làm hỏng nhịp chung của ba chương. Trần phóng = **bề ngang khung hình chia bề ngang khung máy** (1080 / 792 = 1,36). Quá đó là mép máy ra ngoài, mà vùng cần chỉ lại hay nằm sát hai đầu. Bỏ viền máy thì trần nới lên 1,49. Tính trần TRƯỚC khi dựng, rồi trình Thanh cái phải đánh đổi |
| **Chữ đặt `fontWeight: 900` mà không đậm thêm** | `@font-face` khai `font-weight:400 700` — đó là dải trình duyệt được phép lấy, không phải dải tệp phông có. Mọi giá trị trên 700 bị kéo về 700, **không báo gì**. Khai `100 900` |
| **Dùng dấu chạm cho đoạn chỉ đường** | Dấu chạm dạy người xem **bấm**; chấm đặc lại che mất nút. Đoạn chỉ ra "chỗ này dẫn tới đâu" thì dùng **khung chữ nhật bo góc**. Hỏi: người xem cần *làm* hay cần *thấy* |
| **Bản ngang tưởng có mà không dùng được** | Bố cục khổ dọc không tự chạy sang khổ ngang: máy cụt đầu cụt chân khi phóng, dải chú thích đáy cắt ngang thân máy, hai bên rỗng. **Khổ nào chưa rút khung ra nhìn thì coi như chưa tồn tại** |
| **Kính mờ không nhoè, chỉ ra một mảng trắng đục** | `opacity` nhỏ hơn 1 ở BẤT KỲ khối cha nào tạo ra một "gốc nền" mới, từ đó trở xuống `backdrop-filter` không còn thấy gì phía sau. Mờ dần bằng cách đổi **độ trong của từng màu** và cho chính độ nhoè chạy từ 0 lên, đừng đụng `opacity`. Cùng họ: `filter`, `mask` ở khối cha |
| **Khung hình ĐẦU TIÊN lộ khung điện thoại** | Nền đoạn mở bài cũng nằm trong nhịp mờ dần từ 0 lên, nên khung 0 trong suốt. Nền phải **đục ngay từ khung 0**, chỉ mờ ở đuôi. Ảnh thu nhỏ của video lấy đúng khung này nên lỗi ra thẳng mặt tiền bài đăng |
| **Lệnh sửa hàng loạt nhân đôi danh sách mốc** | Sau mọi lệnh sửa hàng loạt vào tệp mã, **đếm số phần tử trước và sau** (`grep -c`), đừng chỉ nhìn tệp có mở được không |

## 5. Còn thiếu

- Chưa có đoạn mở đầu và đoạn kết dựng sẵn cho loại này (đang dùng chung `BrandFrame` + `CtaFinal`).
- Chưa có cách tua nhanh quãng chờ tải trong bản quay.
- 🔴 **Bản ngang chưa có bố cục riêng, và bố cục dọc KHÔNG dùng lại được.** Rút khung ra soi
  05/08/2026 thì hỏng ba chỗ: máy cụt đầu cụt chân khi phóng, dải chú thích đáy cắt ngang thân
  máy, hai bên nền rỗng quá nửa bề ngang. Mở bài và kết bài thì chạy tốt cả hai khổ.
  Muốn có bản ngang thật thì phải dựng riêng ở bộ dựng chung: **máy dạt hẳn sang trái, chú
  thích thành CỘT CHỮ bên phải, bỏ dải đáy** — rồi trình duyệt bố cục trước khi dựng bài.
- Chưa dùng cho **web**. Cùng cách làm, nhưng phải thay khung máy điện thoại bằng khung trình duyệt và đổi dấu chạm thành con trỏ chuột.
