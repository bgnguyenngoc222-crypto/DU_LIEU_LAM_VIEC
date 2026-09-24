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

---

# ✅ ĐÃ CÓ KHUÔN DÙNG LẠI — ĐỪNG DỰNG LẠI TỪ ĐẦU

🔴 **Chiếc máy đã dựng xong và đóng gói thành khuôn:**

```
~/Desktop/VIDEO KFSP/_shared/remotion/iphone17pro/
├── README.md      ← 🔴 ĐỌC TRƯỚC. Bảng số đo + sáu cái bẫy + cách gắn vào dự án
├── Phone3D.tsx    ← sân khấu, thân máy, mặt sau, mặt màn ghép canvas
├── cam3d.ts       ← quy đổi cỡ máy và phép chiếu điểm neo
└── ref/           ← ảnh gốc Apple + ảnh lưới đã đo
```

Gắn vào dự án mới:

```bash
cp _shared/remotion/iphone17pro/{Phone3D.tsx,cam3d.ts} <dự-án>/remotion/src/
```

**Đừng dựng lại chiếc máy.** Bốn vòng sửa ngày 04/08 đều là hệ quả của việc dựng theo trí nhớ; mọi con số trong khuôn đã đo trên ảnh chụp thẳng chính hãng.

---

## 🔴 Luật gốc: vật thể có thật thì đi lấy ảnh gốc TRƯỚC khi viết mã

Bản đầu dựng theo trí nhớ, Thanh trả về bốn lần: *"nhìn như Android, mặt sau đen xì xì"* → *"chưa làm giống iPhone thật"* → *"bo 4 góc không giống, dynamic island không giống, camera không giống"*.

Sai lệch khi đo lại trên ảnh chính hãng:

| Chi tiết | Dựng theo trí nhớ | Đo trên ảnh | Lệch |
|---|---|---|---|
| Bo góc thân máy | 0,104 bề rộng | **0,175** | thiếu 40% |
| Chiều cao bệ camera | 0,42 | **0,572** | thiếu 27% |
| Bán kính ống kính | 0,108 | **0,133** | thiếu 19% |
| Chiều cao Dynamic Island | 44 điểm ảnh | **78** | thiếu 44% |
| Vị trí ống kính thứ ba | góc dưới phải | **giữa bệ** | sai chỗ hẳn |
| Sắc Deep Blue | xanh dương vừa | **xanh than gần đen** | sai chất |

**Quy trình đúng, mất 10 phút, tiết kiệm bốn vòng sửa:**

1. Tải ảnh **chụp thẳng** độ phân giải cao của sản phẩm.
2. Phủ **lưới chia theo bề rộng vật thể** lên ảnh (cả hai trục cùng chia theo bề rộng).
3. Đọc từng chi tiết ra **bội của bề rộng** → đổi cỡ vẫn đúng tỷ lệ.
4. Lấy màu bằng cách **đọc pixel**, không bằng mắt.
5. Mới viết mã.

Kho ảnh Apple lấy được không cần đăng nhập:

```bash
curl -sL -A "Mozilla/5.0" -o flat.png \
 "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-3inch-deepblue?wid=4000&hei=4000&fmt=png-alpha"
```

Ảnh chụp nghiêng thấy bề dày: dùng WebFetch trang `apple.com/iphone-17-pro/` để lấy danh sách đường dẫn ảnh (chúng đổi theo đợt).

---

## Bốn thứ hạ tầng bắt buộc, thiếu là hỏng

| Việc | Chi tiết | Triệu chứng nếu thiếu |
|---|---|---|
| Bật trình dựng "angle" | `remotion.config.ts` → `Config.setChromiumOpenGlRenderer("angle")` | Render báo lỗi |
| `tsconfig.json` có `lib` đủ | `"es2021", "dom", "dom.iterable"` | Mọi hàm vẽ canvas báo lỗi kiểu |
| Trừ độ vát khỏi bề dày | `depth = THICK − 2 × bevelThickness` | Mặt trước thân máy che kín mặt màn, màn đen thui |
| Chuẩn hoá toạ độ ảnh | `texture.repeat = 1/bềRộngHình`, `offset = 0.5` | `shapeGeometry` lấy toạ độ hình làm toạ độ ảnh → ảnh phóng to và lệch hẳn |

---

## Sáu cái bẫy khi sửa chiếc máy

Bảng đầy đủ nằm ở [`README.md` mục 5](../../../../../Desktop/VIDEO%20KFSP/_shared/remotion/iphone17pro/README.md) của khuôn. Tóm tắt để tra nhanh:

| Triệu chứng | Nguyên nhân | Chữa |
|---|---|---|
| Mặt màn đen thui | độ vát cộng ra ngoài bề dày | trừ trước. Chẩn: thay ảnh bằng màu đỏ chói |
| **Sửa mã mà ảnh không đổi một pixel** | canvas chạy **vẽ theo yêu cầu** | `isRendering ? advance() : invalidate()` |
| Mặt máy phẳng lì như nhựa | mặt phẳng chỉ hắt lại một mảng đồng màu | **nướng dải sáng vào ảnh vật liệu**, ảnh môi trường vô ích |
| Vạch thẳng cắt ngang lưng máy | vòng xuyến bị xoay 90° | three mặc định đã hướng ra trước, đừng xoay |
| Vệt hình sao trong lòng ống kính | các mặt đồng tâm đặt sát nhau | giãn ≥ 0,003 mỗi lớp theo trục sâu |
| Mất sạch lớp phủ trên màn | ở 3D màn là mặt trong không gian | chuyển hết vào ảnh nền màn, ghép ở **cả hai** nhịp |

---

## 🔴 ĐỔ BÓNG CHO CHIẾC MÁY — bóng luôn hở góc là sai CÁCH LÀM, không sai con số

Triệu chứng Thanh mô tả: *"phần shadow không bám vào điện thoại, luôn có một khoảng hở ra, nhìn rất thiếu chuyên nghiệp."*

### Vì sao `boxShadow` không bao giờ khớp

`boxShadow` vẽ theo **hình chữ nhật bo góc của THẺ `div`**. Thân máy lại là **hình nằm bên trong ảnh `phone.png`**, có nền trong suốt bao quanh. Hai hình đó khác nhau về cả bán kính lẫn lề, nên:

- khớp bán kính cho cạnh → hở ở bốn góc
- khớp cho góc → hở dọc bốn cạnh

Ở dự án "Cơ hội tiềm năng" đã chỉnh bán kính từ `w * 0.152` lên `w * 0.175` (đúng bằng bo góc thật của thân máy = bo góc màn 0,143 + bề dày viền 0,032) mà **vẫn hở**. Đó là lúc phải dừng chỉnh số.

> 🔴 **Luật rút ra, dùng được cho mọi thứ chứ không riêng cái máy: chỉnh mãi một con số mà không hết thì đổi cách làm, đừng chỉnh tiếp.**

### Cách đúng: vẽ bóng bằng CHÍNH ẢNH CHIẾC MÁY

Đặt một bản sao ảnh máy xuống lớp dưới cùng, tô đặc một màu rồi làm nhoè. Bóng khi ấy **là** hình máy nên không thể lệch.

```tsx
{noShadow ? null : (
  <>
    {/* quầng loang */}
    <Img src={staticFile("phone.png")} style={{
      position: "absolute", inset: 0, width: w, height: h,
      filter: `brightness(0) invert(1) blur(${h * 0.05}px)`,
      scale: 0.97, opacity: 0.95,
    }} />
    {/* lõi bóng */}
    <Img src={staticFile("phone.png")} style={{
      position: "absolute", inset: 0, width: w, height: h,
      filter: `brightness(0) invert(1) blur(${h * 0.014}px)`,
      scale: 0.97, opacity: 0.9,
    }} />
  </>
)}
```

| Chi tiết | Vì sao |
|---|---|
| `brightness(0) invert(1)` | hạ mọi điểm ảnh về đen rồi đảo thành trắng. Phần trong suốt của PNG **vẫn trong suốt**, nên đường viền giữ nguyên. Đổi `invert(1)` thành không có gì thì ra bóng đen |
| **Hai lớp** | một nhoè ít cho bóng có lõi, một nhoè nhiều cho quầng loang. Một lớp thì hoặc cứng đơ hoặc tan hết |
| `scale: 0.97` | thà bóng **nhỏ hơn** máy chứ đừng để hở ra ngoài. Thanh chốt 05/08/2026 |
| Đặt **trước** `children` trong DOM | để bóng nằm dưới cả nội dung màn lẫn ảnh máy |

### Vì sao KHÔNG dùng `filter: drop-shadow` trên chính ảnh máy

`drop-shadow` bám theo kênh alpha nên đúng hình — nhưng ảnh mockup có **lỗ màn trong suốt**, nên nó vẽ bóng cả trong lỗ, đè lên nội dung màn đang chạy. Ra một viền bẩn quanh mép màn.

### Màu bóng chọn theo nền

| Nền | Màu bóng |
|---|---|
| Nền sáng (vân lụa, cover fanpage) | **TRẮNG**. Bóng đen trên nền sáng không đọc thành bóng mà thành quầng bẩn quanh máy, lại đúng cái vệt viền của L56 |
| Nền tối | đen, như thường |

### Máy nền thì TẮT BÓNG

Nhiều máy phụ chạy ngang làm chất liệu nền: mỗi cái có bóng là hàng nền hoá thành mười vật thể tranh nhau thay vì một tấm chất liệu (L56). Tách vật chính khỏi nền bằng **một quầng sáng rộng gấp ~3 lần bề ngang máy**, không bằng bóng của từng cái.

### Cách bắt lỗi này

🔴 **Phóng góc máy lên 2,5 lần rồi soi.** Nhìn toàn khung không bao giờ thấy — đây là lý do nó sống sót qua mấy vòng duyệt.

```bash
python3 -c "
from PIL import Image
im = Image.open('khung.png')
im.crop((660,10,860,210)).resize((500,500), Image.NEAREST).save('goc.png')"
```

### Nếu máy dựng bằng khối 3D thì khỏi cần bóng

Khối 3D có cạnh thật nên tự tách khỏi nền bằng chính mặt bên. Thêm bóng giả vào là thừa. Xem mục **Mức 3** ở trên.

---

## Ba kiểu chuyển động đã áp

Số 2, 5, 7 trong bảng 14 kiểu ở trên: **lia dọc thân máy** khoe bề dày ở đoạn chuyển sang nằm ngang · **lùi ra hé lộ** ở đoạn kết · **thẻ chú giải bám máy** trong không gian 3D. Cộng thêm một cú **xoay ra mặt sau khoe logo KFSP** trước khung đóng.

🔴 **Ràng buộc luật cứng khi lia máy:**

```
nửa chiều cao máy + biên độ trượt  ≤  nửa chiều cao khung
cỡ máy × chiều cao khung           ≤  bề ngang khung      (khi máy nằm ngang)
```

Trần cỡ máy lúc nằm ngang: khổ dọc **0,562** · vuông 0,80 · ngang 1,77. Muốn trượt xa thì **hạ cỡ máy trước**.

---

## Còn nợ — mặt sau (04/08/2026)

Thanh đã duyệt **mặt trước và bo góc**. Mặt sau chưa đạt:

| Chỗ | Hiện tại | Máy thật |
|---|---|---|
| Mép bệ camera nối vào thân | mép gãy | đường lượn mềm — cần đùn hai lớp hoặc thêm vành chuyển tiếp |
| Bề mặt nhôm | mịn phẳng | vân nhám mịn bắt sáng lấm tấm |
| Ô kính sạc từ | còn lộ thành mảng | chỉ lộ bằng đường viền bo góc |
