# Khung điện thoại cho video giới thiệu tính năng — ba mức, chọn theo nhu cầu

> Tra ngày 04/08/2026 theo yêu cầu Thanh: *"mockup có bề dày, quay được mặt sau, ngửa lên úp xuống các kiểu"*.

## Mức 1 — Ảnh PNG phẳng (đang dùng)

`_shared/📱 iPhone 17 Mockups (Community)/iPhone 17 Pro *.png` (879×1832, hố màn trong suốt).

Được: nhẹ, nét, dựng nhanh. **Không được:** chỉ có một góc chính diện. Nghiêng bằng `rotateY` thì viền máy bị bóp méo phẳng, không có bề dày, không bao giờ thấy mặt sau.

## Mức 2 — Bộ ảnh dựng sẵn nhiều góc

| Nguồn | Có gì | Giá |
|---|---|---|
| [Angle (Mockuuups)](https://mockuuups.studio/mockup-generator/angle-mockups/) | Hàng trăm góc tĩnh, nhiều thiết bị | 79 đô một lần |
| [Shots.so](https://shots.so/) | Mockup động, phóng mượt, có sẵn khuôn | Có bản miễn phí |
| [Previewed](https://previewed.app/) | Cảnh thiết bị 3D dựng sẵn, xuất video quảng cáo app | Có bản miễn phí |
| [Device Frames](https://deviceframes.com/) | Gắn khung hình, dựng cảnh thiết bị chuyển động | Trả phí |

Được: có bề dày và đổ bóng thật. **Không được:** vẫn là ảnh rời, chuyển góc phải cắt cảnh, không xoay liên tục được như clip mẫu.

## Mức 3 — Model 3D thật trong Remotion (khuyên dùng)

Xoay 360°, thấy mặt sau, ngửa úp tuỳ ý, ánh sáng và phản chiếu tính thật, chuyển động liên tục không cắt.

**Remotion có sẵn hai mẫu chính chủ:**

| Kho | Nội dung |
|---|---|
| [remotion-dev/remotion-three-gltf-example](https://github.com/remotion-dev/remotion-three-gltf-example) | **Điện thoại 3D có màn hình gắn video** — đổi được video trên màn, màu máy, tỉ lệ, độ bo góc. Đúng thứ cần |
| [remotion-dev/glb-example](https://github.com/remotion-dev/glb-example) | Cách nạp file `.glb` vào Remotion |
| [remotion-dev/template-three](https://github.com/remotion-dev/template-three) | Khung dự án trống có sẵn React Three Fiber + `@remotion/three` |

**Model iPhone tải được (giấy phép Creative Commons, ghi nguồn):**

| Model | Link |
|---|---|
| iPhone 17 Pro | https://sketchfab.com/3d-models/iphone-17-pro-4541aa8a28324b33a2baaf81d263aaec |
| iPhone Air | https://sketchfab.com/3d-models/iphone-air-055022b853aa4c6cb25cc6979178e719 |
| iPhone 12 Pro | https://sketchfab.com/3d-models/iphone-12-pro-05dfc991665e45c68c8b7062136c0c6e |
| Kho tổng | https://sketchfab.com/tags/iphone · https://free3d.com/3d-models/iphone |

**Luật Remotion khi dùng 3D** (từ skill chính chủ `.agents/skills/remotion-markup/3d.md`):
- Bọc trong `<ThreeCanvas width height>`, phải có đèn (`ambientLight` + `directionalLight`)
- **Cấm** `useFrame()` của react-three-fiber — mọi chuyển động phải lái bằng `useCurrentFrame()`, không thì render ra bị giật hình
- `<Sequence>` bên trong `<ThreeCanvas>` phải đặt `layout="none"`

**Cần cài:** `npx remotion add @remotion/three`. ⚠️ Dự án `20260804-tinh-nang-co-hoi-tiem-nang` đang **dùng chung `node_modules` bằng liên kết mềm** với `20260723-cktt-wyckoff-bai3` — cài thêm gói sẽ đụng vào dự án kia. Phải tách `node_modules` riêng trước.

---

# 14 kiểu chuyển động cho video mockup

Nguồn: [Rotato — 14 video mockup ideas](https://rotato.app/blog/mockup-video-examples)

| # | Kiểu | Mô tả |
|---|---|---|
| 1 | Mở bài và kết bài | Hoạt hình nhanh, gọn để mở hoặc đóng |
| 2 | **Lùi ra hé lộ** | Phóng ra dần để lộ chiếc máy và bối cảnh |
| 3 | Tách lớp giao diện | Bung các lớp thiết kế ra thành nhiều tầng |
| 4 | Mockup cho web | Xuất thành thành phần web điều khiển được |
| 5 | **Khoe phần cứng** | Lia máy quay dọc thân máy, qua nút bấm, cạnh viền |
| 6 | Góc nhìn người cầm | Kiểu quay từ mắt người đang cầm máy |
| 7 | **Thẻ chú giải 3D** | Nhãn bám theo máy, luôn xoay mặt về phía máy quay |
| 8 | **Chú giải không lời** | Đưa máy quay lại gần để dẫn mắt, không cần chữ |
| 9 | Ghép nhiều cú | Dựng nhiều đoạn đã render lại với nhau |
| 10 | Máy trung tính | Dùng khuôn máy chung chung, không nhấn thương hiệu phần cứng |
| 11 | Chỉnh màu hậu kỳ | Thêm tương phản, HDR, độ bão hoà cho ra chất điện ảnh |
| 12 | Trộn nhiều kiểu | Đổi nền, đổi nhịp chuyển động trong cùng một video |
| 13 | **Chơi với phản chiếu** | Khớp chuyển động với vệt phản chiếu trên mặt kính |
| 14 | Nền trong suốt | Xuất HEVC có kênh alpha hoặc dãy PNG để ghép nền sau |

**Ba kiểu đáng đưa vào video KFSP nhất:** số 2 (lùi ra hé lộ), số 5 (lia dọc thân máy khoe bề dày — chỉ làm được ở mức 3), số 7 (thẻ chú giải bám máy trong không gian 3D thay vì dán phẳng lên khung hình).

---

# Thư viện mẫu video giới thiệu tính năng để xem tham khảo

| Nguồn | Có gì |
|---|---|
| [Arcade — 14 mẫu công bố tính năng 2026](https://www.arcade.software/post/feature-announcement-examples) | Mẫu công bố tính năng mới, kèm phân tích cấu trúc |
| [Superside — 16 video B2B](https://www.superside.com/blog/saas-video-examples) | Nhiều thể loại, chất lượng cao |
| [Vidico — 12 video demo sản phẩm](https://vidico.com/news/top-12-outstanding-saas-product-demo-videos/) | Bóc tách vì sao hiệu quả |
| [Vidico — video quảng bá app di động](https://vidico.com/news/top-10-outstanding-mobile-app-promo-video-examples/) | Đúng thể loại app di động |
| [Remotion Showcase](https://www.remotion.dev/showcase) | Video dựng bằng chính công cụ đang dùng |

**Hai điều đúc từ các bộ sưu tập trên:** độ dài tốt nhất cho video demo là 1 đến 2 phút (bản KFSP hiện 26 giây, thuộc loại giới thiệu ngắn cho mạng xã hội, khác loại demo dài đặt trên trang chủ); và video ăn tiền không phải video liệt kê tính năng mà là video **đặt lại vấn đề của người xem** — đúng hướng bản hiện tại đang đi (mở bằng câu hỏi "không biết nhìn mã nào", đóng bằng "không phím hàng, bạn tự quyết").


---

# Ghi chép dựng 3D thật (làm ngày 04/08/2026)

Đã dựng chạy được tại `20260804-tinh-nang-co-hoi-tiem-nang/remotion/src/Phone3D.tsx`, bản thử xuất ở `out/thu-3d.mp4` (5 giây: mở bằng mặt sau, xoay qua cạnh thấy bề dày, về mặt trước).

**Không cần tải model 3D bên ngoài.** Mẫu chính chủ `template-three` dựng điện thoại bằng **hình học**: một hình chữ nhật bo góc đùn ra thành khối (`extrudeGeometry`) làm thân máy có bề dày, cộng một mặt phẳng bo góc (`shapeGeometry`) làm màn hình. Đổi màu, bề dày, độ bo góc bằng biến. Nhẹ hơn và kiểm soát tốt hơn model tải về.

**Bốn thứ phải làm đúng, thiếu là hỏng:**

| Việc | Chi tiết |
|---|---|
| **Bật trình dựng "angle"** | Tạo `remotion.config.ts` với `Config.setChromiumOpenGlRenderer("angle")`. Thiếu thì render báo lỗi và không ra hình |
| **Phải có `tsconfig.json`** | Remotion từ chối chạy nếu không có, dù mã vẫn đúng |
| **Chuẩn hoá toạ độ ảnh trên màn** | `shapeGeometry` lấy toạ độ hình làm toạ độ ảnh, nên phải đặt `texture.repeat.x = 1 / bềRộngMàn` và `repeat.y = 1 / chiềuCaoMàn`. Thiếu thì ảnh phóng to và lệch hẳn |
| **Dán video lên màn** | Dùng `<Video>` của `@remotion/media` ở chế độ `headless` + `onVideoFrame` vẽ vào `OffscreenCanvas` rồi gán làm `CanvasTexture`. Lúc render gọi `advance()`, lúc xem trước gọi `invalidate()` — phân biệt bằng `useRemotionEnvironment().isRendering` |

**Gói cần cài:** `@remotion/three` · `@react-three/fiber` · `three` · `@remotion/media` · `@react-three/drei`.

**Việc còn bỏ ngỏ nếu chuyển hẳn sang 3D:** mặt sau hiện trơn, cần thêm cụm camera và logo KFSP; và thanh trạng thái iOS (viên đỏ ghi màn hình) chưa che như bản ảnh phẳng đang làm.
