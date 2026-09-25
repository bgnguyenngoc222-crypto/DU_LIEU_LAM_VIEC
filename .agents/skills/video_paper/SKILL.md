---
name: video_paper
description: Dựng hoặc chỉnh video Remotion dọc theo phong cách giấy ghi chú trắng có caro của KFSP. Dùng skill này mỗi khi người dùng nói “video paper”, “nền giấy caro”, cần thêm logo/thương hiệu KFSP xuyên suốt, lồng quay màn hình thật vào mockup điện thoại, hoặc muốn sửa motion/visual trong video Remotion KFSP theo phong cách này. Áp dụng cả khi người dùng chỉ gửi ảnh chụp Studio và yêu cầu sửa bố cục, title, mockup hay outro.
---

# Video Paper KFSP

## Mục tiêu hình ảnh

Tạo video dọc 1080 × 1920 mang cảm giác ghi chép đầu tư: nền trắng có caro nhẹ, typography rõ, màu tím KFSP làm điểm nhấn, motion có lý do và không bị chất “slide thuyết trình”. Giữ không gian trống để mỗi ý được đọc nhanh trên điện thoại.

## Trước khi sửa

1. Đọc `PROJECT_NOTES.md` nếu dự án có file này. Nó là các quyết định đã được người dùng chốt.
2. Xem scene đang bị góp ý và timeline/voiceover liên quan trước khi đổi visual. Không suy đoán câu thoại từ ảnh Studio.
3. Kiểm tra asset thật trong `public/` trước. Khi người dùng đã cung cấp logo, mockup hay video quay màn hình, dùng chính asset đó.
4. Nếu yêu cầu nằm ở Remotion, đọc skill `remotion-markup`; khi lồng video đọc thêm `remotion-multimedia`; chỉ đọc `remotion-render` khi người dùng đã cho phép render.

## Hệ nhận diện đã chốt

- Tên thương hiệu là **KFSP**, không viết KFSB.
- Nền xuyên suốt là giấy trắng có caro. Đừng đổi outro sang nền đen chỉ vì logo trắng tồn tại.
- Dùng logo tím trên nền sáng và logo trắng trên nền tối.
- Lấy logo từ file gốc. Không vẽ lại logo bằng AI và không kéo giãn: đặt `width`, để `height: auto`.
- Logo tím có thể là lớp overlay toàn cục ở giữa phía trên. Chừa vùng an toàn bên dưới logo cho mọi title; với comp 1080 × 1920, title đầu trang nên bắt đầu từ khoảng `top: 230` trở xuống.
- Nếu outro đã có logo lockup riêng, fade/hide logo overlay trước outro để tránh logo kép.
- Dữ kiện đã được người dùng xác minh: gói hội viên có **5 ngày dùng thử miễn phí**. Không tự thêm giá hay tính năng chưa xác minh.

## Bố cục và typography

- Dùng tím KFSP làm accent, đen/xám đậm làm nội dung hỗ trợ; đỏ chỉ cho rủi ro/cảnh báo, xanh cho kỳ vọng/tín hiệu tích cực.
- Ưu tiên title thoáng: một dòng dẫn nhỏ, một dòng khóa lớn, một underline/marker mảnh nếu cần. Không lạm dụng pill, box bo tròn hoặc drop shadow, vì dễ biến câu nói thành nút CTA.
- Chỉ dùng khối nền khi nó mô tả một đối tượng UI thực, dữ liệu hoặc sự tương phản có chủ ý.
- Rà toàn video khi thêm logo toàn cục. Đừng chỉ sửa title của một scene đang mở.

## Minh họa hành động, không minh họa trang trí

Biến động từ trong câu thoại thành một chuỗi nguyên nhân-kết quả. Ví dụ đã chốt cho câu “mỗi cổ phiếu bạn mua ban đầu đều là một hạt mầm”:

1. Con trỏ chạm nút **MUA**.
2. Đồng xu bị hút vào tâm nút.
3. Nút co lại và biến thành hạt mầm ở đúng vị trí đó.
4. Đường kỳ vọng bắt đầu từ hạt mầm.

Không thay nội dung bằng biểu tượng chung chung. Ví dụ “tỉa cỏ, trồng hoa” cần luống danh mục/cây cỏ, không dùng cán cân. Kiểm tra z-index và khoảng trống để visual không che text.

## Mockup điện thoại và quay màn hình

- Người dùng phải cung cấp video quay màn hình thật nếu họ muốn trình diễn tính năng thật. Không tự code bảng giả thay cho tính năng.
- Lớp video nằm dưới frame điện thoại; frame nằm trên cùng; title đứng ở layer riêng, không bị mockup che.
- Kiểm tra frame có alpha thật. Nếu frame có nền caro bị bake vào ảnh, chỉ tạo/crop asset trong suốt theo cách cơ học; không dùng ảnh AI để tái tạo logo/frame.
- Đặt video rộng hơn vùng lõi khi cần để nó bleed dưới viền đen, tránh khe trắng/hở viền. Kiểm tra cả bốn cạnh, không chỉ cạnh dưới.
- Entrance điện thoại nên có chiều sâu: vào từ góc nghiêng, `rotateY` + `rotateZ`, scale và settle nhẹ; sau đó floating/tilt rất nhỏ. Không chỉ pop scale 2D.
- Khi video bắt đầu trễ, bọc bằng `Sequence` để reset clock đúng frame bắt đầu.
- So sánh thời lượng clip nguồn với thời lượng cảnh. Nếu clip dài hơn cảnh, không bật `loop`. Nếu render báo “No frame found”, kiểm tra thời lượng/frame rate trước rồi sửa timing hoặc loop, không render lặp lại y nguyên.

## Workflow chỉnh sửa

1. Báo ngắn gọn visual sẽ đổi thành gì.
2. Chỉnh scene bằng `useCurrentFrame()`, `interpolate()` và `spring()`; tránh CSS transition/animation vì không ổn định khi render.
3. Với asset `public/`, gọi `staticFile()`.
4. Chạy lint cho các file vừa chạm. Tách lỗi cũ, không liên quan để không nhận nhầm là lỗi của bản sửa.
5. Mở/giữ link Studio mạng LAN cho người dùng xem. Không render khi chưa được phép rõ ràng.
6. Khi người dùng nói render, xuất H.264 bằng:

```powershell
npx remotion render MyComp out\<ten-video>-final.mp4 --codec=h264
```

7. Chờ đến khi encoding hoàn thành, sau đó báo dung lượng và gửi link tuyệt đối tới MP4.

## Bàn giao

Nói rõ đã sửa gì, có render hay chưa, và link Studio hoặc link MP4. Không nói đã xem hoặc đã kiểm tra hình nếu chưa thực sự làm việc đó.
