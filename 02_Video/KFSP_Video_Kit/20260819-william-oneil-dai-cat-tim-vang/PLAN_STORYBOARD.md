# PLAN STORYBOARD — 20260819-william-oneil-dai-cat-tim-vang

- Framework: PAS (Problem - Agitate - Solution - Action) · 9:16 (1080×1920) · ~48s
- Kênh: Fanpage KFSP / TikTok / Reels · **brand_status: BRAND (có logo KFSP)**
- Giọng: Voice mới - 48s
- Style: Dark Navy/Purple (#0f172a, #7b3aec). Glassmorphism UI. Xanh lá nhấn mạnh điểm nổ (Breakout). Subtitle karaoke 5-6 từ ở y≈1400 (safe zone TikTok).
- Asset: Kết hợp **Hình thật** (ảnh biểu đồ CEO gửi) + **Code** (lồng ghép thẻ Glassmorphism, overlay nét đứt, pulse xanh lá, zoom Ken Burns). Asset Manifest: Đã có sẵn ảnh biểu đồ và video quay màn hình app trong folder `public`.

## Sentence Storyboard

| id | phase | main_idea | visual_anchor (đúng main_idea) | asset | animation | beat (frame@30fps) | sfx |
|---|---|---|---|---|---|---|---|
| s01 | PROBLEM | tiếc nuối cổ phiếu trần | Một cổ phiếu tăng trần (nến xanh dài) bay vút lên | code | nến xanh phi thẳng đứng mạnh mẽ, rung màn hình nhẹ | nến phóng@f30 | whoosh + impact |
| s02 | PROBLEM | siêu cổ phiếu có dấu vết | Dòng chữ "KHÔNG NGẪU NHIÊN" đập mạnh giữa màn | code | text snap, màu đỏ cảnh báo | text đập@f180 | impact |
| s03 | SOLUTION | William O'Neil & Mẫu hình | Chân dung O'Neil (Glassmorphism) xuất hiện uy quyền → Hai thẻ biểu đồ thật (Hai đáy, Vai đầu vai ngược) popup | ảnh thật + code | thẻ popup mượt, viền glow tím. Ken burns zoom từ từ vào ảnh | chân dung@f280; biểu đồ 1@f350; biểu đồ 2@f420 | pop + whoosh |
| s04 | AGITATE | Lò xo nén chặt chờ bật tung | Hình đồ thị thật (Hai đáy 2). Zoom cận vào điểm Breakout. Overlay vòng tròn nét đứt đếm ngược/nhấp nháy | ảnh thật + code | Ken Burns zoom mạnh. Vòng tròn pulse xanh lá nhấp nháy xoay tròn | zoom in@f510; pulse đập@f580 | heart_beat / rise |
| s05 | AGITATE | Không thể soi bằng mắt | Cơn mưa hàng ngàn ticker xanh đỏ rơi loạn xạ + con dấu "RẤT KHÓ" đóng sập xuống | code | mưa rơi nhanh, con dấu đóng sập rung màn | "RẤT KHÓ"@f780 | stamp impact |
| s07 | SOLUTION | Tính năng Cơ hội tiềm năng | Giao diện 3D Phone hiện lên rực rỡ với dòng chữ "Cơ Hội Tiềm Năng" | video app + code | 3D Phone xoay góc mượt, viền sáng | điện thoại@f850 | magic_reveal |
| s08 | SOLUTION | AI tầm soát mẫu hình | Video quay màn hình lướt danh sách cổ phiếu + quét vòng sáng Highlight vùng tín hiệu | video app + code | màn hình lướt tốc độ cao, vòng highlight bám theo toạ độ | lướt@f940; highlight@f1000 | whoosh liên tục |
| s09 | SOLUTION | Tính sẵn điểm giải ngân | Chuyển sang màn hình Chi tiết/Biểu đồ trong app. Highlight dòng dữ liệu kịch bản giải ngân | video app + code | zoom nhẹ vào vùng kịch bản giải ngân | zoom@f1150 | pop |
| s10 | ACTION | Bỏ cảm xúc | Khung cảnh tối lại, focus vào thông điệp cảnh báo "Đừng để cảm xúc chi phối" | code | text nổi bật trên nền tối, glow nhẹ | text@f1270 | soft |
| s11 | ACTION | Tải app & Brand | Nút Tải App Store/Google Play nảy lên + Logo KFSP + "Đưa chứng khoán về tầm tay bạn" | code | các icon pop lần lượt, logo to rõ | icon@f1400 | pop x3 |

## Asset Manifest (hình cần CEO cung cấp)
- `Hai day 1.jpg`, `vdvn 1.jpg`, `hai day 2.jpg`: **ĐÃ CÓ** (Dùng làm lõi trong thẻ Glassmorphism s03, s04).
- `rec_cohoitiemnang.mp4`: **ĐÃ CÓ** (Dùng làm màn hình trong S07-S09).
- `voice_full.mp3`: **ĐÃ CÓ** (Bản mới 48s).
- Ảnh chân dung O'Neil: **ĐÃ CÓ**.

## QA Audit (sentence-driven)
- Sentence atomicity: mỗi câu khớp tuyệt đối với `timing.ts` từ file json Whisper.
- Main idea match: s03 phải dùng đúng hình HAI ĐÁY và VDVN thật của CEO. s04 phải tạo được cảm giác NÉN của lò xo bằng Code (vòng tròn pulse).
- Enum/number beat: Các hiệu ứng Pop/Snap đều giật đúng vào các chữ khóa (vd: "không ngẫu nhiên", "Hai đáy", "bật tung").
- Visual Quality: Đảm bảo hình thật không bị trần trụi. Toàn bộ hình thật phải được bọc trong Glassmorphism Card (border sáng, box-shadow, backdrop-filter) + Ken Burns Zoom.
