# Nguồn tham khảo Remotion (chính chủ)

> Thanh gửi 04/08/2026. Đọc khi cần **kỹ thuật mới** (mẫu dự án, hiệu ứng, cách viết prompt dựng video), đặc biệt loại video **giới thiệu tính năng sản phẩm** — khác hẳn loại video dạy mẫu hình mà skill này vốn tối ưu.

| Liên kết | Có gì đáng lấy |
|---|---|
| https://www.remotion.dev/docs/resources | Trang gốc gom **mọi** tài nguyên: mẫu dự án (Hello World, Blank, React Three Fiber, Audiogram, Music Visualization, Skia, Video Editor & Timeline, Monorepo, Docker/Railway), thư viện hiệu ứng (**motion blur, noise, animation theo đường path, glitch, biến hình chữ**), bộ thành phần dựng sẵn (**Remocn**, **RemotionUI**, **Onda** — 70 thành phần + 18 kiểu chuyển cảnh), cầu nối công cụ thiết kế (**Figma**, After Effects, Lottie, Rive), tiện ích VS Code |
| https://www.remotion.dev/prompts | 12 công thức prompt mẫu kèm video kết quả. Đáng chú ý cho KFSP: **Product Demo**, **Launch Video on X**, **Cinematic Tech Intro**, **Transparent Call-To-Action overlay**, **Bar + Line Chart (combined)**, **News article headline highlight** |
| https://www.remotion.dev/prompts/product-demo-for-presscut | Công thức video **giới thiệu sản phẩm**. Điểm mấu chốt: *"dựng lại giao diện app bằng React component, bám sát bản thật hết mức"* + lấy trang chủ marketing làm căn cứ chọn tính năng khoe + **hỏi rõ trước khi dựng** video phải ra vẻ gì. Làm bằng Claude Code |
| https://www.remotion.dev/showcase | Video thật do cộng đồng và công ty dựng bằng Remotion — xem để lấy nhịp cắt và ngôn ngữ hình |

## Hai đường dựng video giới thiệu tính năng — chọn đúng

| | **Quay màn hình thật** rồi ghép vào khung máy | **Dựng lại giao diện bằng React** (cách Presscut) |
|---|---|---|
| Chữ tiếng Việt | Chuẩn tuyệt đối (là app thật) | Chuẩn (mình gõ) nhưng phải tự dựng lại từng thành phần |
| Công sức | Thấp — chỉ cần Thanh quay màn hình | Cao — dựng lại màn hình bằng mã |
| Sửa nội dung | Phải quay lại | Sửa biến số là xong |
| Hiệu ứng phóng to, làm nổi từng dòng | Hạn chế (chỉ phóng ảnh) | Tuỳ ý — từng dòng là một thành phần riêng |
| Rủi ro | Lộ mã cổ phiếu và phần trăm lời lãi thật → xem **L22** phần tuân thủ | Số liệu tự đặt, tránh được rủi ro tuân thủ |

**Nếp KFSP:** mặc định **quay màn hình thật** (nhanh, đúng sản phẩm), chỉ dựng lại bằng React khi cần **phóng to làm nổi từng dòng** hoặc cần **thay số cho khỏi lộ danh mục thật**. Có thể trộn: nền là clip quay thật, các nhãn số bay ra ngoài viền máy dựng bằng mã.

## Bẫy đã biết khi nhét clip quay màn hình

Xem **L22** trong `SKILL.md` — 4 bẫy liên hoàn (clip đứng hình vì map theo mốc thời gian tổng · `<Video>` không ra hình lúc render, phải dùng `<OffthreadVideo>` · `objectFit: cover` cắt méo · thanh tiến trình và lớp phủ đè lên clip).
