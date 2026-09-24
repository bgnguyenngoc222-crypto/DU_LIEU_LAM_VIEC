# Chọn góc máy cho video giới thiệu tính năng

> Đúc từ phiên "Cơ hội tiềm năng" 05/08/2026. Thanh gạt bản dựng với đúng một câu:
> *"các góc máy quay điện thoại không đẹp"*. Đoán tiếp là mất thêm một vòng nữa.

---

## 1. Luật gốc: "góc máy" KHÔNG phải một trục

Đây là chỗ sai đầu tiên và tốn nhất. Lần đầu tôi đưa Thanh 8 lựa chọn, tất cả đều là **xoay nghiêng thân máy**, rồi hỏi "chọn góc nào". Thanh trả lời *"còn thiếu nhiều lắm"* hai lần liên tiếp, vì thứ Thanh gọi là góc máy gồm cả cách cắt khung và cách xếp máy.

**Năm trục độc lập. Mỗi trục chọn một giá trị, ghép lại mới thành một góc.**

| Trục | Hỏi gì | Khoảng thường dùng |
|---|---|---|
| **A. Xoay quanh trục dọc** (`rotY`) | Thấy mặt trước, thấy cạnh, hay thấy lưng | 0° tới 180° |
| **B. Ngả trước sau** (`rotX`) | Nhìn từ dưới lên, ngang tầm mắt, hay từ trên xuống | −25° tới +68° |
| **C. Nghiêng người** (`rotZ`) | Máy quay có lệch không, và chiều nằm ngang | −90° tới +90° |
| **D. Cắt khung và cỡ máy** (`frac`, `posY`) | Thấy trọn máy, cắt cụt, hay phóng sát màn | 0,6 tới 2,9 |
| **E. Vị trí và số lượng** (`posX`, `posY`, số máy) | Máy đặt đâu trong khung, và mấy chiếc | 1 tới 4 máy |

Hỏi Thanh phải hỏi theo trục, và để Thanh trả lời bằng số, ví dụ `A2 · B13 · C22 · D27 · E36`.

---

## 2. Cách làm: dựng BẢNG GÓC bằng chính chiếc máy và clip thật

🔴 **Không đưa Thanh ảnh mockup của người khác trên mạng để chọn.** Ảnh người khác dùng máy khác, app khác, tỷ lệ khác — chọn xong áp vào không ra như thế. Liên kết ngoài chỉ để **đối chiếu và lấy tên gọi**, không để chọn.

Bộ dựng sẵn: `20260804-tinh-nang-co-hoi-tiem-nang/remotion/src/GocMay.tsx`. Chép sang dự án mới là chạy được ngay.

**Cách hoạt động:** một mảng `GOCS`, **mỗi khung là một góc, đứng yên**. Dựng ảnh tĩnh ở khung `0..N` là ra cả bảng.

```
for i in $(seq 0 45); do
  npx remotion still GocMay out/g_$(printf %02d $i).png --frame=$i --log=error
done
```

Mỗi mục khai như sau, `may` là mảng nên khai được nhiều máy trong cùng một khung:

```ts
{ nhom: "A. Xoay quanh trục dọc",
  ten: "Xoay 22 độ",
  ta: "Góc phối cảnh hay gặp nhất.",
  may: [{ rotY: -22, frac: 0.9 }] }
```

**Nhãn ghi ngay trên ảnh** (nhóm · số thứ tự · tên · mô tả · số đo đầy đủ) để Thanh nhìn một ảnh là đủ, không phải tra ngược.

---

## 3. Hai lỗi dựng bảng đã vấp

| Lỗi | Vì sao | Cách đúng |
|---|---|---|
| **Máy phía sau bạc màu hẳn đi** khi khung có nhiều máy | Xếp chồng nhiều `Phone3DStage`, mỗi cái là một lớp vẽ riêng; lớp trên phủ một lớp sáng mỏng lên lớp dưới | Nhiều máy phải nằm **chung một lớp vẽ**. `Phone3DStage` nay có tham số `stack` cho máy phụ, máy chính vẫn truyền qua `cam` và vẽ trên cùng |
| **Chiếc máy trông như lỗi dựng** | Tấm nhãn nền mờ đặt giữa khung, đè lên thân máy | Nhãn đặt ở **dải dưới cùng, nền đục hẳn**. Nhãn không bao giờ được chồng lên vật đang cần soi |

---

## 4. Quy đổi cần nhớ

- Chiều cao nhìn thấy `= 2 × CAM_D × tan(CAM_FOV/2)` `= 3,057` đơn vị.
- Bề ngang nhìn thấy `= 3,057 × tỷ lệ khung`. Khổ ngang 16:9 ra **5,435**.
- Muốn tâm máy nằm ở `t` phần bề ngang: `posX = (t − 0,5) × bề ngang nhìn thấy`.
- 🔴 **Khi máy nằm ngang** (`rotZ = ±90`), chiều dài máy trải theo bề ngang khung, nên `frac × chiều cao khung ≤ bề ngang khung`:

| Khổ | `frac` tối đa lúc nằm ngang |
|---|---|
| 1080×1920 | 0,562 |
| 1080×1350 | 0,80 |
| 1920×1080 | 1,77 |

---

## 5. Kết luận nghiệp vụ, cho video GIỚI THIỆU TÍNH NĂNG

Video kể một tính năng thì thứ người xem cần đọc là **nội dung trên màn**, không phải chiếc máy. Mọi góc nghiêng đều lấy đi độ đọc mà không trả lại gì cho câu chuyện.

| Việc | Góc nên dùng |
|---|---|
| Thân bài | chính diện hoặc ngả sau ≤ 4° · ngang tầm mắt · cắt cụt chân máy hoặc chạm sát mép |
| Đoạn nằm ngang xem biểu đồ | `rotZ = +90`, giữ chính diện. 🔴 **+90 chứ không phải −90**: clip quay lúc chuyển sang biểu đồ ngang đã tự xoay sẵn một chiều |
| Nhịp mở, đúng một hai nhịp | cận góc trên, cắt cụt bốn phía |
| Nhịp nói về hai nguồn dữ liệu | hai máy so đôi, cả hai chính diện |
| Không dùng cho loại video này | cạnh mỏng 90° · mặt lưng 180° · đẳng cự · nhìn từ đỉnh xuống · nghiêng người quá 10° |

Nguồn ngoài xác nhận cùng hướng: khung phẳng chính diện là kiểu phổ biến nhất và cho tỷ lệ chuyển đổi tốt nhất, vì khung máy sạch, không cướp chú ý khỏi giao diện; góc nghiêng hợp trang giới thiệu và quảng cáo mạng xã hội hơn. Xem [appscreenmagic](https://appscreenmagic.com/guides/iphone-mockup-generator) và [ScreenshotWhale](https://screenshotwhale.com/blog/app-store-app-preview).

---

## 6. Trục thứ sáu, chưa bàn

Cách xếp CHỮ quanh chiếc máy là một trục riêng, độc lập với năm trục trên: nền đặc, nền mờ, chuỗi nối tiếp, kiểu hướng dẫn. Phân loại có sẵn ở [App Store Screenshot Guidelines](https://theapplaunchpad.com/blog/app-store-screenshot-guidelines/). Chỉ bàn sau khi đã chốt góc, đừng trộn vào cùng một lần hỏi.
