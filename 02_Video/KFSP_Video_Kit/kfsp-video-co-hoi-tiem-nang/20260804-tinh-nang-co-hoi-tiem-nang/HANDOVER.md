# BÀN GIAO — Video giới thiệu tính năng "Cơ hội tiềm năng"

> Ghi lại **toàn bộ** phiên làm việc ngày 04/08/2026: từ một video mẫu do AI sinh ra, đi qua những gì, tìm ở đâu, cài gì, sai chỗ nào, sửa thế nào, để ra được bản hiện tại.
> Viết cho **người tiếp nhận và cho AI đọc lại** — mục tiêu là người sau không phải mò lại từ đầu.
> Người làm: Claude (Opus 5) trong Claude Code · Người yêu cầu và duyệt: Thanh.

---

## PHẦN 0 — Đọc gì trước

| Nếu bạn định | Đọc mục |
|---|---|
| Chạy lại dự án ngay | Phần 8 (cấu trúc thư mục và lệnh) |
| Hiểu vì sao video dựng như hiện tại | Phần 2 và 3 (phân tích video mẫu + ngã rẽ sai đầu tiên) |
| Sửa nội dung, đổi chữ, đổi mốc giờ | Phần 8.3 (bản đồ tệp mã) |
| Tránh lặp lại lỗi | Phần 6 (mười lỗi đã mắc) |
| Làm khung máy 3D | Phần 7 |
| Biết được phép dùng gì | Phần 9 (giấy phép) |

---

## PHẦN 1 — Yêu cầu ban đầu và cách tôi hiểu nó

**Thanh nói:** *"tôi có 1 video mẫu do AI gen dùng để lấy idea làm video giới thiệu tính năng mới Cơ hội tiềm năng, phân tích video và làm video tương tự dựa trên hình ảnh thật cho tôi"*

Câu này có ba phần việc, và tôi tách ra ngay:
1. **Phân tích** video mẫu — nó làm gì, bằng thủ pháp nào.
2. **Rút ra công thức** dùng lại được.
3. **Dựng lại bằng hình ảnh thật** của app KFSP.

Điểm mấu chốt ở chữ **"hình ảnh thật"**: video mẫu do AI sinh ra nên mọi chữ trên màn hình đều là chữ bịa. Nghĩa là thứ cần giữ là **ngôn ngữ hình**, không phải nội dung.

### 1.1 Tìm video mẫu

Thanh không đưa đường dẫn. Tôi không hỏi ngay mà liệt kê tệp mới nhất ở hai chỗ hay để tệp tải về:

```bash
ls -lt ~/Downloads | head -30
ls -lt ~/Desktop | head -20
```

Ra `gen_minh_hoa_video.mp4` lưu lúc 15:39 cùng ngày — khớp thời điểm Thanh nhắn. Tôi xác nhận trong câu trả lời rồi làm tiếp, không dừng lại hỏi. **Nguyên tắc:** việc gì suy ra được từ ngữ cảnh thì tự suy, chỉ hỏi khi đoán sai sẽ tốn công undo.

---

## PHẦN 2 — Phân tích video mẫu

### 2.1 Lấy thông số kỹ thuật

```bash
ffprobe -v error -show_format -show_streams gen_minh_hoa_video.mp4
```

→ 10 giây · 1280×720 (ngang 16:9) · 24 hình/giây · có tiếng.

### 2.2 Xem nội dung — trích hình

**Không xem được video trực tiếp**, nên phải trích thành ảnh rồi đọc từng ảnh:

```bash
ffmpeg -i gen_minh_hoa_video.mp4 -vf fps=2,scale=640:-1 f_%03d.jpg
```

2 hình/giây × 10 giây = 20 ảnh. Đọc lần lượt các ảnh 1, 5, 8, 10, 12, 14, 16, 18, 20.

> 🔴 **Bài học lớn nhất của cả phiên nằm ở đây, nhưng lúc đó tôi chưa nhận ra:** 2 hình/giây **quá thưa** để thấy được thủ pháp thật. Nó chỉ cho thấy "có những màn hình nào", không cho thấy "máy quay di chuyển ra sao". Sau này phải làm lại ở 12 hình/giây mới lòi ra sự thật. Xem phần 3.

### 2.3 Kiểm tiếng

```bash
ffmpeg -i video.mp4 -vn -ar 16000 -ac 1 a.wav
ffmpeg -i a.wav -af volumedetect -f null -     # → mean -21.6 dB, có tiếng thật
~/tts-env/bin/python -m whisper a.wav --model base --language vi
```

Whisper chỉ ra một từ "Vào!" trong 27 giây → **không có lời đọc**, chỉ tiếng nền. Đây là dữ kiện quan trọng: video mẫu kể chuyện hoàn toàn bằng hình.

### 2.4 Kết luận vòng một (sau này hoá ra chưa đủ sâu)

Sáu "cảnh": App Store → xoay → danh sách cơ hội → chart sáng → chart tối → trang chủ. Thẻ phần trăm bay ra ngoài viền máy. Nền trắng đổi sang nền tối.

### 2.5 Hai thứ phải bỏ

| Thứ | Vì sao |
|---|---|
| Toàn bộ chữ trong giao diện | Chữ AI bịa: "Vất tiết bản", "Chấy AI Assistant", "Xế kọi trouBần", giá "Điện 2002". Đăng lên là mất uy tín |
| Nhãn "+20,5%", "AI Mua/Bán đang lãi +23,2%", "Thành công" | Chạm **luật cứng KFSP**: cấm khoe phần trăm lợi nhuận, cấm gọi điểm thị trường |

---

## PHẦN 3 — Ngã rẽ sai thứ nhất, và cách phát hiện ra

### 3.1 Ba câu hỏi chốt hướng

Trước khi dựng, tôi hỏi Thanh ba việc mà đoán sai sẽ phải làm lại toàn bộ: **cách dựng** (quay màn hình rồi ghép Remotion / quay thật bằng máy ảnh / lai), **kênh đăng** (quyết tỉ lệ khung), **tiếng và chữ**.

Thanh chọn: Remotion · cả ba khổ 9:16 + 4:5 + 16:9 · chỉ tiếng nền không chữ.

### 3.2 Bản dựng đầu tiên — và nó sai ở đâu

Tôi dựng **6 cảnh cắt rời**, mỗi cảnh một màn hình app, máy đứng yên, chuyển cảnh bằng chồng mờ. Render ra, soi bằng **ảnh tĩnh**, thấy "ổn", giao Thanh.

**Thanh bác thẳng:** *"không đạt, làm chi tiết như clip gốc đi, bạn không hề QA lại, frame điện thoại cũng tệ, bạn có tham khảo các nguồn tôi gửi chưa?"*

Ba lời chê, cả ba đều đúng, và mỗi cái là một lỗi phương pháp khác nhau:

| Lời chê | Lỗi phương pháp thật sự |
|---|---|
| "không hề QA lại" | Tôi render **ảnh tĩnh** rồi kết luận. Ảnh tĩnh không cho thấy chuyển động, nhịp, hay chỗ chớp sáng giữa hai cảnh |
| "frame điện thoại tệ" | Tôi **tự vẽ khung máy bằng CSS** trong khi trong `_shared/` đã có sẵn ảnh mockup iPhone 17 thật. Tôi không đi tìm tài nguyên có sẵn trước khi tự chế |
| "có tham khảo nguồn tôi gửi chưa" | Tôi mới **đọc lướt tóm tắt** trang web Thanh gửi, không lấy kỹ thuật cụ thể từ đó |

### 3.3 Soi lại video mẫu ở 12 hình/giây — sự thật lộ ra

```bash
ffmpeg -i gen_minh_hoa_video.mp4 -vf fps=12,scale=200:-1 s_%03d.jpg   # 120 ảnh
ffmpeg -pattern_type glob -i "s_0[0-5]*.jpg" -vf tile=10x6 a.png       # ghép lưới để xem một lượt
```

Nhìn 120 ảnh xếp lưới thì thấy ngay điều mà 20 ảnh không cho thấy:

> 🔴 **Video mẫu KHÔNG HỀ CẮT CẢNH.**
> Nó là **một cú phóng máy quay liên tục** từ chiếc máy nhỏ giữa nền trắng cho tới khi tràn khung — kéo dài 5 giây liền. Trong lúc phóng, **nội dung màn hình tự đổi ngay trên màn**. Đoạn sau máy nằm ngang trong tay, **xoay phối cảnh 3D chậm liên tục**.

Bản của tôi cắt 6 cảnh rời, máy đứng yên, không có chiều sâu. **Sai từ cấu trúc gốc**, không phải sai chi tiết.

### 3.4 Nguyên tắc rút ra

> **Muốn học thủ pháp chuyển động thì phải trích hình đủ dày.** 2 hình/giây chỉ cho biết "có gì trên màn". Từ 12 hình/giây trở lên mới thấy "máy quay làm gì". Ghép thành lưới rồi xem một lượt, đừng xem lẻ từng ảnh.

---

## PHẦN 4 — Đi tìm nguồn: từ 4 đường dẫn Thanh gửi tới bộ skill chính chủ

### 4.1 Thanh gửi bốn đường dẫn

```
https://www.remotion.dev/docs/resources
https://www.remotion.dev/prompts/product-demo-for-presscut
https://www.remotion.dev/prompts
https://www.remotion.dev/showcase
```

Kèm yêu cầu: *"lưu link lại trong skill video để tham khảo"*.

Tôi đọc từng trang, rút ra:

| Trang | Lấy được gì |
|---|---|
| `/docs/resources` | Danh mục **toàn bộ** tài nguyên: mẫu dự án, thư viện hiệu ứng (nhoè chuyển động, nhiễu, animation theo đường, biến hình chữ), bộ thành phần dựng sẵn (Remocn, RemotionUI, Onda), cầu nối Figma và After Effects |
| `/prompts/product-demo-for-presscut` | Công thức video giới thiệu sản phẩm: *"dựng lại giao diện app bằng React component, bám sát bản thật hết mức"* + **hỏi rõ trước khi dựng** |
| `/prompts` | 12 công thức mẫu. Đáng chú ý: Product Demo, Launch Video, Cinematic Tech Intro, Transparent CTA overlay |
| `/prompts/launch-video-on-x` (tôi tự tìm thêm) | **Mỏ vàng kỹ thuật**: vào cảnh bằng phối cảnh 3D `rotateX`, hiện so le bằng spring, chữ hiện theo từng từ, khung thiết bị bọc mọi cảnh, hạt sáng, bảng màu, nhạc nền mờ dần |

Lưu thành `refs/REMOTION_RESOURCES.md` trong skill `video-kfsp`, trỏ từ `SKILL.md`.

### 4.2 Thanh hỏi một câu làm đổi cả cách làm

**Thanh:** *"project hiện tại có skill này chưa https://www.remotion.dev/docs/ai/skills"*

Chưa. Và đây là thứ quan trọng nhất tìm được cả phiên.

```bash
cd ~/Desktop/"VIDEO KFSP" && npx -y skills add remotion-dev/skills
```

Cài ra **11 skill chính chủ** vào `.agents/skills/` (dùng được cho cả Claude Code lẫn Antigravity, Codex, Gemini CLI, Copilot):

```
remotion-best-practices   (bộ định tuyến, đọc trước)
remotion-markup           (cách viết mã hoạt hình — quan trọng nhất)
remotion-create           remotion-render      remotion-captions
remotion-multimedia       remotion-maps        remotion-interactivity
remotion-saas             remotion-docs        remotion-upgrade
```

Đọc `remotion-markup/SKILL.md` và các tệp con, rút ra **luật viết mã** mà trước đó tôi làm sai:

| Luật | Lý do |
|---|---|
| Lái hoạt hình bằng `useCurrentFrame()` + `interpolate()` | `transition` và `animation` của CSS **không render đúng**, phải viết lại |
| Để `interpolate()` **nội tuyến trong `style`** | Để sửa được trực tiếp trong Remotion Studio |
| Dùng thuộc tính riêng lẻ `scale` / `rotate` / `translate` | Thay vì nhét chuỗi vào `transform`; chỉ dùng chuỗi khi cần `skew`, `perspective`, hoặc chuỗi nhiều phép có thứ tự |
| `Easing.bezier()` và `Easing.spring()` | Thay vì easing tuyến tính |
| Video dùng `<OffthreadVideo>` khi render | `<Video>` cũ chạy được ở bản xem trước nhưng **ra khung trống lúc render** |
| Trong `<ThreeCanvas>` **cấm** `useFrame()` | Gây giật hình lúc render |

> 🔴 **Nguyên tắc rút ra:** trước khi tự mò cách dùng một thư viện, **kiểm xem nó có bộ skill chính chủ không**. Lệnh `npx skills add <org>/<repo>` là chuẩn chung, không riêng Remotion.

---

## PHẦN 5 — Khung điện thoại: từ tự vẽ CSS đến ảnh mockup thật

### 5.1 Tìm tài nguyên có sẵn trước

```bash
ls ~/Desktop/"VIDEO KFSP"/_shared/
# → có thư mục "📱 iPhone 17 Mockups (Community)"
```

Ba ảnh PNG 879×1832, phần màn hình **trong suốt**, viền máy vẽ sẵn có ánh kim. Tôi đã bỏ qua nó ở vòng đầu — đó là lỗi "không khảo sát tài nguyên trước khi tự chế".

### 5.2 Đo hố màn — vì sao phải flood fill

Muốn đặt clip vào đúng chỗ thì phải biết toạ độ hố màn. Cách ngây thơ là quét theo hàng giữa tìm vùng trong suốt. **Cách đó sai**, vì vùng ngoài máy cũng trong suốt.

Cách đúng: **loang từ biên ảnh vào** để đánh dấu "vùng trong suốt bên ngoài", phần trong suốt còn lại chính là hố màn.

```python
from PIL import Image
from collections import deque
im = Image.open('iPhone 17 Pro Deep Blue.png').convert('RGBA')
# đẩy mọi điểm trong suốt nằm trên biên ảnh vào hàng đợi, loang 4 hướng
# phần trong suốt KHÔNG bị loang tới = hố màn
```

Kết quả: **x 38..841 (rộng 804) · y 42..1789 (cao 1748) · tỉ lệ 0,4600**

Clip quay màn hình iPhone: 828×1792 = **0,4621**. Lệch 0,4% — coi như khít. Nghĩa là đặt `objectFit: contain` là vừa trọn, **không mất một pixel nội dung nào**.

Quy đổi sang phần trăm để dùng trong mã:
```
left 4,3231%  ·  top 2,2926%  ·  width 91,4676%  ·  height 95,4148%
```

### 5.3 Luật Thanh đặt giữa chừng

**Thanh:** *"tất cả hình quay màn hình đều không được bị cắt, muốn zoom thì phải zoom cả frame điện thoại"*

Luật này gạt bỏ mọi thủ thuật `objectFit: cover` và mọi cách phóng nội dung bên trong màn. Hệ quả trực tiếp: đoạn biểu đồ nằm ngang ở khổ dọc **buộc phải nhỏ**, vì chiều dài máy không được vượt bề ngang khung hình — vượt là màn bị cắt.

---

## PHẦN 6 — Mười lỗi đã mắc và cách phát hiện

Phần này là giá trị lớn nhất để kế thừa. **Chín trong mười lỗi chỉ lộ ra khi soi video đã render, không phải khi soi ảnh tĩnh.**

### Cách QA đúng

```bash
# 1. Render đủ ba khổ
npx remotion render Doc out/doc.mp4

# 2. Trích DÀY từ chính video đã render (không phải render still)
ffmpeg -i out/doc.mp4 -vf "fps=4,scale=150:-1" v_%03d.jpg

# 3. Ghép lưới rồi xem một lượt
ffmpeg -pattern_type glob -i "v_0[0-3]*.jpg" -vf tile=13x3 -frames:v 1 q1.png

# 4. Chỗ nào nghi ngờ thì render still full và cắt cận
npx remotion still Doc /tmp/x.png --frame=605
ffmpeg -i /tmp/x.png -vf "crop=1080:520:0:1400,scale=760:-1" /tmp/xc.png
```

### Bảng lỗi

| # | Lỗi | Vì sao xảy ra | Cách chữa |
|---|---|---|---|
| 1 | Cắt 6 cảnh rời, video rời rạc | Coi mỗi màn app là một "cảnh" | **Một khung máy duy nhất suốt video**, máy quay không dừng, nội dung màn chồng mờ ngay trên màn |
| 2 | Khung máy CSS trông rẻ tiền | Tự chế thay vì dùng tài nguyên có sẵn | Dùng ảnh mockup thật trong `_shared/` |
| 3 | **Chớp trắng giữa hai cảnh** | Cảnh trước mờ ra **cùng lúc** cảnh sau mờ vào → lộ nền ở giữa | Cảnh sau **đè lên** cảnh trước: kéo dài đuôi cảnh trước, cảnh sau chỉ mờ vào, không mờ ra |
| 4 | **Bốn góc màn lòi ra ngoài viền máy** | Hố mockup bo góc, khối nội dung vuông | `borderRadius = 0,115 × bề rộng màn` |
| 5 | **Viên đỏ "đang ghi màn hình" của iOS lọt vào khung** | Clip quay màn hình nào cũng có | Phủ dải màu nền app cao 5,2% ở đỉnh màn. Đây không phải cắt nội dung — thanh trạng thái hệ điều hành không phải nội dung app |
| 6 | **Vòng sáng chỉ dẫn khoanh trúng ngay cụm phần trăm lãi** | Đặt toạ độ theo phần trăm **khung hình**, máy phóng to là lệch | Đặt vòng sáng **bên trong khung màn hình**, toạ độ theo phần trăm **của màn** → tự bám khi máy phóng và xoay |
| 7 | **Chữ trong app không đọc được ở khổ dọc** | Để máy nhỏ để chừa chỗ cho thẻ chú giải | Máy chiếm 0,88 chiều cao khung; thẻ đè lên vùng ít thông tin (đỉnh, đáy) |
| 8 | **Thẻ chữ trắng trên nền app trắng** | Chọn tông thẻ theo **nền video** (đang tối) | Tông thẻ theo **cái nằm ngay sau thẻ**. Thẻ đè lên màn app thì luôn dùng tông sáng, dù nền video đang tối |
| 9 | **Khổ 16:9 chữ vỡ 5-6 dòng** | Hệ số cỡ chữ `k = width / 1080` — khổ ngang bề rộng lớn nên chữ phóng to theo | `k = Math.min(width, height) / 1080` → cả ba khổ cùng `k = 1` |
| 10 | **Mảng tối hình chữ nhật quanh khung máy** | Dùng `box-shadow` trên một khối **hình chữ nhật** bọc quanh máy để tạo quầng sáng → quầng vẽ theo hình chữ nhật, trên nền tối đọc thành vùng tối có viền | Bóng đổ phải **bám hình thân máy**: `borderRadius = 0,152 × bề rộng máy`. **Bỏ hẳn quầng màu** — viền kim loại mockup đã đủ tương phản |

### Ba lỗi phụ về chữ tiếng Việt

- Từ ghép bị tách đôi khi xuống dòng ("rõ / ràng") → nối bằng khoảng trắng không ngắt ` `
- Câu dài tự ngắt xấu ("Không phím hàng. Bạn / tự quyết.") → ép xuống dòng chủ ý bằng hai khối chữ riêng
- Chữ hiện theo từng từ quá chậm làm thẻ trông rỗng → giảm khoảng cách giữa các từ từ 2 hình xuống 1 hình

---

## PHẦN 7 — Khung máy 3D

### 7.1 Yêu cầu Thanh nêu

*"search thêm các mockup iphone khác, trông có bề dày, quay quay mặt sau, ngửa lên úp xuống các kiểu"*

### 7.2 Ba mức tôi tìm được

| Mức | Được gì | Không được gì |
|---|---|---|
| 1. Ảnh PNG phẳng (đang dùng) | Nhẹ, nét, nhanh | Một góc duy nhất, không bề dày, không bao giờ thấy mặt sau |
| 2. Bộ ảnh nhiều góc — [Angle](https://mockuuups.studio/mockup-generator/angle-mockups/), [Shots.so](https://shots.so/), [Previewed](https://previewed.app/), [Device Frames](https://deviceframes.com/) | Có bề dày, bóng thật | Ảnh rời, đổi góc phải cắt cảnh |
| 3. **3D thật trong Remotion** | Xoay 360°, thấy mặt sau, ánh sáng thật, chuyển động liên tục | Nặng hơn, cần cài thêm thư viện |

### 7.3 Điều bất ngờ: không cần tải model 3D

Tôi clone hai kho chính chủ để đọc mã:

```bash
git clone --depth 1 https://github.com/remotion-dev/remotion-three-gltf-example.git
git clone --depth 1 https://github.com/remotion-dev/template-three.git
```

Kho thứ nhất hoá ra đang hiển thị mẫu thử (đầu khỉ Blender), **phần điện thoại nằm ở `template-three`**. Đọc `src/Phone.tsx` và `src/helpers/layout.ts` thì thấy:

> Điện thoại được dựng **bằng hình học**, không phải model tải về: một hình chữ nhật bo góc **đùn ra thành khối** (`extrudeGeometry`) làm thân máy có bề dày, cộng một mặt phẳng bo góc (`shapeGeometry`) làm màn hình. Màu, bề dày, độ bo góc đều là biến.

Nhẹ hơn model tải về, kiểm soát tốt hơn, và **không dính nghĩa vụ ghi nguồn** của giấy phép Creative Commons trên Sketchfab.

### 7.4 Bốn thứ phải làm đúng, thiếu là hỏng

| Việc | Chi tiết | Triệu chứng nếu thiếu |
|---|---|---|
| Bật trình dựng "angle" | `remotion.config.ts` → `Config.setChromiumOpenGlRenderer("angle")` | Render báo lỗi, gợi ý đúng dòng này |
| Phải có `tsconfig.json` | Copy từ template chính chủ | Remotion từ chối chạy |
| **Chuẩn hoá toạ độ ảnh trên màn** | `texture.repeat.x = 1 / bềRộngMàn`, `repeat.y = 1 / chiềuCaoMàn` | `shapeGeometry` lấy toạ độ hình làm toạ độ ảnh → ảnh phóng to và lệch hẳn |
| Cách dán video lên màn | `<Video>` của `@remotion/media` chế độ `headless` + `onVideoFrame` vẽ vào `OffscreenCanvas` → `CanvasTexture`. Render thì gọi `advance()`, xem trước thì `invalidate()`, phân biệt bằng `useRemotionEnvironment().isRendering` | Màn hình đen |

### 7.5 Kết quả

`src/Phone3D.tsx` + composition `Thu3D`, xuất `out/thu-3d.mp4` (5 giây): mở bằng **mặt sau**, xoay qua cạnh thấy rõ **bề dày**, về mặt trước, màn hình chiếu đúng nội dung app, cạnh máy có phản chiếu kim loại.

**Còn bỏ ngỏ:** mặt sau đang trơn (chưa có cụm camera, chưa có logo KFSP) · thanh trạng thái iOS chưa che như bản phẳng · chưa gắn vào video chính.

---

## PHẦN 8 — Dự án: cấu trúc, lệnh, bản đồ mã

### 8.1 Tách thành dự án độc lập

Ban đầu `node_modules` là **liên kết mềm** trỏ sang dự án `20260723-cktt-wyckoff-bai3` (mượn tạm cho nhanh). Cài thêm gói sẽ đụng vào dự án kia. Thanh chốt tách hẳn:

```bash
rm node_modules            # gỡ liên kết mềm
# viết package.json khoá phiên bản
npm install                # 226 MB, riêng của dự án này
npm install @remotion/media@4.0.448 @react-three/drei@9.114.0
```

### 8.2 Cấu trúc thư mục

```
~/Desktop/VIDEO KFSP/20260804-tinh-nang-co-hoi-tiem-nang/
├── HANDOVER.md              ← tệp này
├── STORYBOARD.md            ← bảng phân cảnh chi tiết, toàn bộ chữ, đối chiếu luật cứng
├── KICH_BAN_PHAN_CANH.md    ← bản phác ban đầu (giữ để đối chiếu ý đồ)
├── screen-rec/              ← ba clip quay màn hình gốc Thanh gửi
│   ├── rec1.mp4  13,4 giây  trang chủ → khối Cơ hội tiềm năng → chạm mở chart
│   ├── rec2.mp4  17,4 giây  chart ABB, xoay ngang
│   └── rec3.mp4  34,0 giây  danh sách đầy đủ → mở chi tiết → chart HHP có "Hai đỉnh"
└── remotion/
    ├── package.json         khoá phiên bản 4.0.448
    ├── remotion.config.ts   bật trình dựng "angle" cho 3D
    ├── tsconfig.json
    ├── node_modules/        226 MB, độc lập
    ├── public/              tài nguyên video và ảnh
    │   ├── v_home.mp4  v_list.mp4  v_chart.mp4  v_hhp.mp4   ← bốn đoạn đã cắt
    │   ├── phone.png        khung mockup iPhone 17 Pro
    │   ├── store-ios.jpg  store-android.jpg  logo-kfsp.png
    │   └── whoosh.mp3  pop.mp3
    ├── src/
    │   ├── Root.tsx         khai báo 4 composition: Doc · Vuong · Ngang · Thu3D
    │   ├── Main.tsx         video chính — máy quay, nội dung màn, chữ, thẻ
    │   ├── PhoneMock.tsx    khung máy ảnh phẳng + vòng sáng bám màn
    │   ├── Phone3D.tsx      khung máy 3D (bản thử)
    │   ├── Layers.tsx       kính mờ, chữ hiện theo từ, thẻ chú giải, đường nối
    │   ├── Bg.tsx           nền sáng ↔ tối ↔ tím, đốm nhoè, vệt sáng quét
    │   ├── theme.ts         màu thương hiệu, toạ độ hố màn
    │   └── timing.ts        🔴 MỌI MỐC GIỜ Ở ĐÂY
    ├── qa/                  ảnh soi lỗi
    └── out/                 video thành phẩm
```

### 8.3 Bản đồ tệp mã — muốn sửa gì thì vào đâu

| Muốn đổi | Tệp | Chỗ cụ thể |
|---|---|---|
| Độ dài từng đoạn, thời điểm chữ hiện | `timing.ts` | `SCREEN` (nội dung màn) và `LAYER` (chữ, thẻ) |
| Nội dung chữ | `Main.tsx` | Tìm `text=` và `WordReveal` |
| Vị trí thẻ chú giải | `Main.tsx` | Các khối `<Callout x= y= toX= toY=>`, toạ độ 0..1 theo khung hình |
| Cỡ máy từng lúc | `Main.tsx` | Mảng `H_NARROW` (khổ dọc và vuông) và `H_WIDE` (khổ ngang) |
| Chuyển động máy quay | `Main.tsx` | `rotY` · `rotX` · `rotZ` — các mảng mốc hình |
| Vòng sáng khoanh trên màn | `Main.tsx` | `<ScreenRing x y w h>` — toạ độ theo phần trăm **của màn** |
| Kiểu kính mờ | `Layers.tsx` | Thành phần `Glass` |
| Màu nền, đốm nhoè | `Bg.tsx` | |
| Khung máy, che thanh trạng thái | `PhoneMock.tsx` | |

### 8.4 Lệnh

```bash
cd ~/Desktop/"VIDEO KFSP"/20260804-tinh-nang-co-hoi-tiem-nang/remotion

npm run studio          # mở bản xem trước, tua tay được, cổng 3804
npm run render:doc      # 1080×1920 cho TikTok, Reels, Shorts
npm run render:vuong    # 1080×1350 cho Fanpage
npm run render:ngang    # 1920×1080 cho YouTube, website
npx remotion render Thu3D out/thu-3d.mp4    # bản thử 3D

# render một khung để soi
npx remotion still Doc qa/x.png --frame=605
```

### 8.5 Cách bốn đoạn clip được cắt ra

```bash
cd screen-rec
ffmpeg -ss 2.5  -t 4.2 -i rec1.mp4 -an -r 30 ../remotion/public/v_home.mp4
ffmpeg -ss 1.0  -t 8.2 -i rec3.mp4 -an -r 30 ../remotion/public/v_list.mp4
ffmpeg -ss 4.8  -t 5.6 -i rec2.mp4 -an -r 30 ../remotion/public/v_chart.mp4
ffmpeg -ss 11.8 -t 6.2 -i rec3.mp4 -an -r 30 ../remotion/public/v_hhp.mp4
```

> **Vì sao `v_chart.mp4` KHÔNG xoay bằng ffmpeg:** iOS quay ngang vẫn cho ra khung dọc 828×1792 với nội dung xoay 90°. Nếu xoay bằng `transpose` rồi đặt vào khung máy dọc thì phải xử lý ngược. Cách đúng và tự nhiên hơn: **giữ nguyên clip gốc, để khung máy xoay −90°** — giống hệt việc xoay chiếc điện thoại thật trong tay.

---

## PHẦN 9 — Giấy phép

| Công cụ | Trạng thái | Ghi chú |
|---|---|---|
| **Remotion** | ✅ **KFSP đã mua 1 chỗ ngồi** (04/08/2026) | Bản miễn phí chỉ cho doanh nghiệp **tối đa 3 người**; KFSP 5 người nên phải mua. Được làm video thương mại **không giới hạn**. Cấm đem chính Remotion đi bán lại. Thêm người dựng video thì mua thêm chỗ |
| **Rotato** | Không mua | Không có bản miễn phí. Là công cụ bấm chuột, ngược hướng tự động hoá. Trang giá **không ghi rõ điều khoản thương mại** |
| **Arcade** | Chưa cần | Làm **demo tương tác nhúng web**, không xuất video — khác thể loại. Bản miễn phí dính dấu chìm |
| Model 3D Sketchfab | Nếu dùng | Giấy phép Creative Commons — **bắt buộc ghi tên tác giả**. Hiện **không cần** vì dựng bằng hình học |
| Ảnh mockup trong `_shared/` | ⚠️ Chưa rõ nguồn | Bộ cộng đồng. Nên xác minh trước khi dùng cho quảng cáo trả tiền |
| Nhạc nền | ❌ Chưa có | Phải chọn nguồn có giấy phép thương mại rõ |

Chi tiết: `refs/GIAY_PHEP.md` trong skill `video-kfsp`.

---

## PHẦN 10 — Toàn bộ đường dẫn đã dùng

### Tài liệu Remotion
- Bộ skill AI chính chủ — https://www.remotion.dev/docs/ai/skills · cài bằng `npx skills add remotion-dev/skills`
- Danh mục tài nguyên — https://www.remotion.dev/docs/resources
- 12 công thức prompt — https://www.remotion.dev/prompts
- Công thức video demo sản phẩm — https://www.remotion.dev/prompts/product-demo-for-presscut
- Công thức video ra mắt (nhiều kỹ thuật) — https://www.remotion.dev/prompts/launch-video-on-x
- Bộ sưu tập video — https://www.remotion.dev/showcase
- Dùng video làm texture 3D — https://www.remotion.dev/docs/videos/as-threejs-texture
- `@remotion/three` — https://www.remotion.dev/docs/three
- Giấy phép — https://github.com/remotion-dev/remotion/blob/main/LICENSE.md · https://www.remotion.pro/license

### Kho mã mẫu
- https://github.com/remotion-dev/template-three ← **điện thoại 3D, đọc `src/Phone.tsx` và `src/helpers/layout.ts`**
- https://github.com/remotion-dev/remotion-three-gltf-example
- https://github.com/remotion-dev/glb-example

### Mockup và model
- https://mockuuups.studio/mockup-generator/angle-mockups/ · https://shots.so/ · https://previewed.app/ · https://deviceframes.com/
- https://sketchfab.com/tags/iphone · https://free3d.com/3d-models/iphone

### Tham khảo sáng tạo
- 14 kiểu chuyển động mockup — https://rotato.app/blog/mockup-video-examples
- https://www.arcade.software/post/feature-announcement-examples
- https://www.superside.com/blog/saas-video-examples
- https://vidico.com/news/top-12-outstanding-saas-product-demo-videos/
- https://vidico.com/news/top-10-outstanding-mobile-app-promo-video-examples/

### Tài liệu nội bộ KFSP
- Cổng niềm tin của tính năng — `01_Product/Why/WHY_co-hoi-tiem-nang.md`
- Skill dựng video — `.claude/skills/video-kfsp/SKILL.md` (bài học L1 đến L33)
- `refs/REMOTION_RESOURCES.md` · `refs/MOCKUP_3D.md` · `refs/GIAY_PHEP.md` · `refs/FIGMA_EXPORT.md` · `refs/CANDLE_NEN.md`

### Thư viện đã cài
```
remotion 4.0.448 · @remotion/cli · @remotion/three · @remotion/media
@react-three/fiber 8.17.10 · @react-three/drei 9.114.0 · three 0.169.0
react 18.3.1 · react-dom 18.3.1 · typescript 5.6.3
```

---

## PHẦN 11 — Mười nguyên tắc để kế thừa

1. **Trích hình đủ dày mới thấy thủ pháp.** 2 hình/giây chỉ cho biết có gì trên màn; từ 12 hình/giây mới thấy máy quay làm gì. Ghép lưới xem một lượt.
2. **QA bằng video đã render, không bằng ảnh tĩnh.** Chín trong mười lỗi phiên này chỉ lộ khi soi video chạy.
3. **Khảo sát tài nguyên có sẵn trước khi tự chế.** Khung máy mockup đã nằm sẵn trong `_shared/` mà vòng đầu tôi tự vẽ bằng CSS.
4. **Thư viện nào cũng kiểm xem có bộ skill chính chủ không** trước khi tự mò.
5. **Video giới thiệu sản phẩm không cắt cảnh.** Một khung máy duy nhất, máy quay liên tục, nội dung màn đổi ngay trên màn.
6. **Chuyển cảnh bằng chính vật thể**, không bằng cú cắt hay mờ đen.
7. **Mọi thứ chỉ vào giao diện app phải nằm trong khung màn hình**, toạ độ theo phần trăm của màn — để tự bám khi máy phóng và xoay.
8. **Tông của lớp phủ theo cái nằm ngay sau nó**, không theo nền video.
9. **Hệ số cỡ chữ tính theo cạnh ngắn** để ba khổ ra cùng cỡ.
10. **Bóng đổ và quầng sáng phải bám hình vật thể**, không bám hình chữ nhật bao quanh.

---

## PHẦN 12 — Trạng thái hiện tại và việc còn lại

### Đã xong
- Ba khổ video 26,0 giây: `out/co-hoi-tiem-nang-{doc,vuong,ngang}.mp4`
- Bảy dòng chữ, đã đối chiếu đủ luật cứng KFSP (không phần trăm lợi nhuận, không gọi điểm thị trường, không phím hàng, có câu thương hiệu ở cuối)
- Bản thử khung máy 3D: `out/thu-3d.mp4`
- Dự án độc lập, khoá phiên bản, cài sẵn 3D
- 33 bài học ghi vào skill `video-kfsp`, ba tệp tham khảo mới

### Chờ Thanh quyết
| Việc | Lựa chọn |
|---|---|
| **Nhạc nền** | Chưa có. Không tự lấy vì bản quyền |
| **Mã cổ phiếu và phần trăm lãi lộ trong clip** | (a) giữ nguyên, đăng tự nhiên kèm dòng miễn trừ trách nhiệm — **không** đem chạy quảng cáo trả tiền · (b) làm mờ để dùng được cả cho quảng cáo |
| **Có chuyển sang khung máy 3D không** | Nếu có: cần thêm cụm camera và logo lên mặt sau, che thanh trạng thái iOS, rồi ghép vào video chính |

### Nợ kỹ thuật đã biết
- Mặt sau máy 3D còn trơn
- Bản 3D chưa che thanh trạng thái iOS
- Nguồn gốc ảnh mockup trong `_shared/` chưa xác minh
- Ở khổ dọc, đoạn biểu đồ nằm ngang buộc phải nhỏ do luật không cắt màn hình — chưa có cách nào tốt hơn ngoài việc rút ngắn đoạn đó
