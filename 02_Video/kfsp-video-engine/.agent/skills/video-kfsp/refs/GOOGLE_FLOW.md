# Google Flow và Storyboard Studio — thử ý tưởng video TRƯỚC khi dựng

> Tài liệu tham chiếu của skill `video-kfsp`. Đọc khi cần **thử nhanh một ý đồ hình** trước khi bỏ công dựng Remotion.
> Lập 05/08/2026 từ phiên video "Cơ hội tiềm năng".

---

## 1. Dùng Flow vào việc gì, và KHÔNG dùng vào việc gì

| Dùng | Không dùng |
|---|---|
| Thử **nhịp và chất ánh sáng** của một ý đồ trước khi dựng | Sinh **nội dung màn hình app**. Nó sẽ bịa giao diện, mã cổ phiếu, con số |
| Thử **cú máy** khó hình dung trên giấy (xoay, lia, lùi ra) | Sinh **chữ tiếng Việt**. Dấu gần như luôn sai |
| Dựng cảnh **không có app**: bối cảnh, ẩn dụ, mở bài | Xuất bản thẳng. Bản Flow chỉ để xem, không phải thành phẩm |
| Cho Thanh xem "ý này trông sẽ như thế nào" trong 10 phút | Thay storyboard. Storyboard vẫn phải viết tay, Flow chỉ minh hoạ nó |

🔴 **Luật KFSP:** mọi khung có giao diện app phải đến từ **clip quay màn hình thật**, ghép bằng Remotion. Không có ngoại lệ. Giao diện do máy sinh ra là bịa, và với sản phẩm tài chính thì bịa giao diện là chuyện không được phép.

---

## 2. Storyboard Studio — đường đi từng bước

| # | Thao tác | Ghi chú |
|---|---|---|
| 1 | Mở Flow, bảng bên trái chọn **Tools** | Storyboard Studio nằm trong kho công cụ |
| 2 | Chọn **Storyboard Studio**, bấm **Get Started** | |
| 3 | Chọn **kiểu hình** | Khoá tông cho **mọi** khung sinh ra sau. Chọn sai là làm lại từ đầu |
| 4 | Dán **truyện** vào ô soạn thảo | Viết tay hoặc để máy tự viết rồi sửa |
| 5 | Máy tự tách cảnh, tự nhận **nhân vật · bối cảnh · đạo cụ** | Có nút **Autofill Details** viết mô tả cho từng thứ |
| 6 | Sửa từng khung: **đổi góc máy**, **đổi số khung trong một cảnh** | Đây là chỗ đáng bỏ thời gian nhất |
| 7 | Lưu bằng menu **ba chấm** → tệp JSON | Giữ cả truyện, tài sản, cảnh, góc máy. Mở lại được |

## 3. Cách khai cho đúng khi làm video giới thiệu tính năng

Storyboard Studio sinh ra để dựng **phim có nhân vật**. Video sản phẩm không có nhân vật, nên phải khai lại cho khớp bộ máy của nó:

| Ô của Flow | Khai gì cho video KFSP |
|---|---|
| **Nhân vật** | **Chiếc iPhone 17 Pro màu xanh than.** Mô tả kỹ: viền nhôm nhám mịn, mặt kính, cụm ba ống kính ở lưng |
| **Bối cảnh** | **Phòng chụp nền sáng**, trắng chuyển xám mềm, có vệt sáng quét chậm phía sau |
| **Đạo cụ** | Để trống |
| **Truyện** | KHÔNG viết truyện. Viết **danh sách cảnh**, mỗi cảnh một câu về góc máy và chuyển động |
| **Kiểu hình** | Kiểu ảnh thật, không chọn kiểu hoạt hình |

**Ba câu phải có trong mọi mô tả cảnh:** *không chữ* · *không logo* · *không bàn tay, không người*. Thiếu ba câu này là máy tự thêm vào, và thêm sai.

## 4. Khuôn mô tả cảnh — chép rồi sửa

```
A deep-blue iPhone 17 Pro floating in a bright white studio void, tilted twenty
degrees. <MÀN HÌNH ĐANG HIỆN GÌ>. <MÁY QUAY LÀM GÌ>. Soft studio lighting,
believable metal and glass, calm unhurried motion, no jitter, no lens flares.
No text, no logo, no hands, no people.
```

Bốn cú máy hay dùng, viết bằng tiếng Anh cho máy hiểu đúng:

| Cú máy | Viết là |
|---|---|
| Phóng vào chậm | `continuous slow camera push-in` |
| Xoay máy sang nằm ngang | `the phone rotates ninety degrees into landscape in mid-air, smooth and weighted` |
| Lùi ra kết bài | `the phone recedes into depth, becoming smaller in frame` |
| Hé lưng | `briefly revealing its matte aluminium back with a triple camera module` |

## 5. Hai chỗ Flow hay làm hỏng — soi trước khi kết luận

| Lỗi | Dấu hiệu | Cách đọc kết quả |
|---|---|---|
| **Xoay cả khung hình thay vì xoay chiếc máy** | Nền cũng nghiêng theo | Không phải lỗi ý đồ. Gen lại, tách câu tả nền ra khỏi câu tả chuyển động |
| **Bịa giao diện** | Màn hiện app lạ, chữ loằng ngoằng | Bỏ qua phần màn hình. Chỉ chấm nhịp và ánh sáng |

## 6. Nếp làm việc: Flow đứng ở đâu trong pipeline

```
Kịch bản + storyboard viết tay
        │
        ▼
  Flow — thử ý đồ hình, 10 phút          ← chỉ để XEM, Thanh gật hay lắc
        │
        ▼
Cắt clip quay màn hình thật + dựng Remotion
        │
        ▼
  Studio cho Thanh tua → render
```

Flow **không thay** bước nào, nó chỉ chen vào giữa để rẻ hơn: gạt một ý đồ sai ở Flow tốn 10 phút, gạt nó sau khi đã dựng Remotion tốn nửa ngày.

---

## Changelog

- 2026-08-05: Lập tài liệu. Đúc từ phiên "Cơ hội tiềm năng" — Thanh muốn thử ý đồ trên Flow trước khi chốt kịch bản. Ghi rõ ranh giới: Flow lo phần điện ảnh, giao diện app luôn phải là clip quay thật.
