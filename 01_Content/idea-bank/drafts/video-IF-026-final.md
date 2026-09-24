---
type: video_script
campaign: IF-026
status: technical_draft
source: IF-026-text-user-provided
---

# Kịch bản Dựng Video 2D "Cắt lỗ & Cơ hội mới" (IF-026)

**Định dạng:** Video Short dọc (9:16)
**Thời lượng:** ~60 giây
**Style:** 2D Vector Silhouette (Bóng đen), Dark Mode (Nền đen/Tím đậm `#050505`), Highlight màu Đỏ (Lỗ/Sai lầm) và Xanh Neon/Tím (AI/Cơ hội).
**Engine:** Remotion + CSS Animations

---

## 1. FULL TEXT ĐỌC VOICE (Giữ nguyên để thu âm Vbee)

Gồng lỗ không phải là kiên nhẫn, bạn chỉ đang tàn nhẫn bỏ qua vô số cơ hội khác. Cầm một mã âm nặng, mỗi ngày bạn mở app chỉ để vớt vát chút hy vọng về bờ, trong khi tiền của bạn bị nhốt chặt trong một vị thế không có tương lai. Hãy nhớ, người thắng lớn trên thị trường không phải là người không bao giờ sai, mà là người biết thoát ra nhanh nhất. Cắt lỗ, đơn giản là giải phóng vốn để chiến đấu ở nơi có xác suất thắng cao hơn. Nhưng cắt xong rồi, làm gì tiếp theo để không rơi vào bẫy mua đuổi gỡ gạc? Bạn cần một radar dẫn đường. Tính năng Cơ Hội Tiềm Năng của KFSP sẽ tự động quét toàn bộ thị trường, tìm ra các mẫu hình kinh điển đang âm thầm tích lũy, và cung cấp điểm neo tham khảo từ AI để bạn loại bỏ hoàn toàn cảm tính. Chi phí cho một công cụ đúng đắn luôn rẻ hơn rất nhiều so với những khoản lỗ mù quáng. Tải app KFSP và trải nghiệm ngay hôm nay. KFSP - Đưa chứng khoán về tầm tay bạn.

---

## 2. KỊCH BẢN KỸ THUẬT DỰNG HÌNH (REMOTION COMPONENT SPEC)

### 🎬 CẢNH 1: Gánh Nặng Gồng Lỗ (0s - 13s)
**Thoại:** "Gồng lỗ không phải là kiên nhẫn, bạn chỉ đang tàn nhẫn bỏ qua vô số cơ hội khác. Cầm một mã âm nặng, mỗi ngày bạn mở app chỉ để vớt vát chút hy vọng về bờ, trong khi tiền của bạn bị nhốt chặt trong một vị thế không có tương lai."
* **Âm thanh (SFX):** Tiếng nước sủi bọt ngột ngạt (`underwater-muffled.mp3`), âm thanh kim loại nặng chìm xuống nước (`heavy-drop.mp3`). Tiếng nhịp tim đập chậm.
* **Text trên màn hình (Chữ to, Kinetic Typography):** 
  - (0s) "GỒNG LỖ..." (Đỏ thẫm, rung nhẹ)
  - (2s) "...Không phải KIÊN NHẪN" (Trắng, vụn vỡ)
* **Thành phần Animation (Remotion Components):**
  - **`Background`**: Chuyển gradient từ trên xuống dưới (Mặt nước tĩnh lặng màu xanh xám -> Đáy biển sâu thẳm màu `#0B001A`).
  - **`SilhouettePerson`**: Nằm ở 1/3 nửa dưới màn hình, bóng đen co cụm, hai tay ôm chặt.
  - **`GiantAnchor`**: Một mỏ neo khổng lồ màu đỏ phát sáng rực rỡ (`drop-shadow(0 0 20px red)`), gắn với nhân vật bằng một sợi xích đen, liên tục trĩu xuống theo trục Y (dùng `spring` animation để tạo độ trì nặng).
  - **`BoatSilhouettes`**: Ở mép trên cùng khung hình, 3-4 hình bóng chiếc thuyền nhỏ (tượng trưng cho cơ hội) lướt qua nhanh theo trục X từ trái sang phải, làm mờ (`opacity: 0.3`).

### 🎬 CẢNH 2: Cắt Lỗ Là Giải Phóng Vốn (13s - 23s)
**Thoại:** "Hãy nhớ, người thắng lớn trên thị trường không phải là người không bao giờ sai, mà là người biết thoát ra nhanh nhất. Cắt lỗ, đơn giản là giải phóng vốn để chiến đấu ở nơi có xác suất thắng cao hơn."
* **Âm thanh (SFX):** Tiếng kiếm chém đứt kim loại dứt khoát (`sword-slash.mp3`), tiếng kính vỡ (`glass-shatter.mp3`), tiếp theo là âm thanh ma thuật lấp lánh (`magic-chime.mp3`).
* **Text trên màn hình:**
  - (17s) "CẮT LỖ = GIẢI PHÓNG VỐN" (Zoom in mạnh, màu Trắng + viền Tím)
* **Thành phần Animation (Remotion Components):**
  - **`ChainCut`**: Sợi xích ở cảnh 1 đột ngột đứt làm đôi, tỏa ra tia lửa điện (Sử dụng SVG Particle animation).
  - **`FreeCapital`**: Ngay khi xích đứt, tảng đá mỏ neo rơi tuột khỏi màn hình (Y-axis translation xuống dưới cùng). Từ chỗ nhân vật, một chùm các hạt ánh sáng (hoặc đồng xu màu vàng/tím) phun trào lên trên như pháo hoa (`explode` animation với `interpolate` opacity và scale).
  - Nhân vật từ tư thế co cụm vươn thẳng người lên (Swap SVG state).

### 🎬 CẢNH 3: Chới Với Mua Đuổi (23s - 31s)
**Thoại:** "Nhưng cắt xong rồi, làm gì tiếp theo để không rơi vào bẫy mua đuổi gỡ gạc? Bạn cần một radar dẫn đường."
* **Âm thanh (SFX):** Tiếng gió sa mạc (`desert-wind.mp3`), tiếng ảo ảnh xèo xèo (`fire-sizzle.mp3`).
* **Text trên màn hình:**
  - (23s) "Cắt xong... làm gì tiếp?" (Text trôi lơ lửng, chớp tắt)
  - (27s) "BẪY MUA ĐUỔI" (Màu đỏ, rực lửa)
* **Thành phần Animation (Remotion Components):**
  - **`MirageCoin`**: Một đồng tiền xu 3D hoặc biểu đồ xanh lá bốc cháy rực lửa đỏ, liên tục giật (jitter) và lùi xa dần khi nhân vật cố đưa tay chạm vào (Phóng to `scale` nền để tạo cảm giác chạy theo).
  - **`LighthouseBeam`**: Cuối cảnh, background tối đen lại, một tia sáng radar màu xanh tím (`#7B3AEC`) chớp nhoáng quét từ góc phải màn hình sang, xé toạc lớp sương mù.

### 🎬 CẢNH 4: Radar Cơ Hội Tiềm Năng (31s - 45s)
**Thoại:** "Tính năng Cơ Hội Tiềm Năng của KFSP sẽ tự động quét toàn bộ thị trường, tìm ra các mẫu hình kinh điển đang âm thầm tích lũy, và cung cấp điểm neo tham khảo từ AI để bạn loại bỏ hoàn toàn cảm tính."
* **Âm thanh (SFX):** Tiếng radar dò tìm nhịp nhàng (`radar-ping.mp3` x3 lần), tiếng máy tính xử lý data (`cyber-tech-processing.mp3`).
* **Text trên màn hình:**
  - (31s) "CƠ HỘI TIỀM NĂNG" (Font dày, Neon Xanh lá, hiện từ từ theo hiệu ứng gõ phím).
  - (38s) "Loại Bỏ Cảm Tính" (Badge text, đập nhịp tim).
* **Thành phần Animation (Remotion Components):**
  - **`RadarScanner`**: Một cung tròn radar khổng lồ màu `#00FF00` quay tròn quanh tâm màn hình (`rotate` từ `0` đến `360deg` liên tục).
  - **`PatternReveal`**: Mỗi khi radar quét qua, mặt nền đen bóng hiện lên các vạch nến Nhật (Candlesticks) xếp thành hình "Hai Đáy" (W) đang phát sáng. Chỗ nào radar chưa quét tới thì vẫn đen thui (Sử dụng `clip-path` mask đồng bộ với góc quay radar).
  - **`AIPoint`**: Các điểm ngắm mục tiêu (Target crosshair) tự động lock vào các đáy của chữ W kèm các con số chạy random rồi dừng lại ở "ĐIỂM MUA TỐI ƯU".

### 🎬 CẢNH 5: Call to Action (45s - 60s)
**Thoại:** "Chi phí cho một công cụ đúng đắn luôn rẻ hơn rất nhiều so với những khoản lỗ mù quáng. Tải app KFSP và trải nghiệm ngay hôm nay. KFSP - Đưa chứng khoán về tầm tay bạn."
* **Âm thanh (SFX):** Nhạc nền chuyển sang dồn dập, tích cực. Tiếng cash register ting (`cha-ching.mp3`) ở đoạn "rẻ hơn".
* **Text trên màn hình:**
  - (49s) "TẢI APP KFSP NGAY" (Nhấp nháy Nút bấm).
* **Thành phần Animation (Remotion Components):**
  - **`PhoneMockup`**: Một chiếc điện thoại từ dưới trượt lên (Translate Y). Màn hình điện thoại hiển thị màu xanh lá nguyên khối (`#00FF00`) để Editor dễ dàng key nền ghép video thao tác app vào sau.
  - **`GlowingLogo`**: Logo KFSP màu tím neon lơ lửng phía trên điện thoại, tỏa hào quang `box-shadow`.
  - **`TextClosing`**: "KFSP - Đưa chứng khoán về tầm tay bạn" chạy chữ ở góc dưới màn hình.

---

## 3. PROMPT TẠO ẢNH ASSET (Cho Midjourney/Stable Diffusion nếu cần)
*(Dùng để tạo file PNG tách nền ghép vào Remotion)*
1. `Anchor silhouette`: `2D vector flat art dark silhouette of a heavy naval anchor, minimalist, isolated on white background --no 3d, realistic`
2. `Trader reaching out`: `2D vector flat art dark silhouette of a trader reaching hand out desperately, side view, minimalist, isolated on white background --no 3d, realistic`
3. `Radar and Candlesticks`: `2D vector flat art glowing green radar screen displaying candlestick chart patterns forming a W shape, dark background, cyberpunk minimalist --no 3d, realistic, messy`
