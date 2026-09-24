# PLAN STORYBOARD — 20260605-4-diem-vao-lenh

- Framework: PASA · 13 câu · 9:16 (1080×1920) · ~52.3s
- Kênh: Một tay đầu tư · **brand_status: NOBRAND (không logo KFSP)**
- Giọng: Minh Quân speed 1.0
- Style: MAU 1 dark navy (#0a1628). Xanh tăng #34d399, đỏ giảm #f87171, vàng nhấn #f5c542. Subtitle karaoke 5-6 từ, y≈1400 (safe zone TikTok).
- Asset: **TẤT CẢ = code** (vẽ chart/SVG/CSS). Asset Manifest rỗng → không cần ảnh CEO gửi.

## Sentence Storyboard

| id | phase | main_idea | visual_anchor (đúng main_idea) | asset | animation | beat (frame@30fps) | sfx |
|---|---|---|---|---|---|---|---|
| s01 | HOOK | mua bán toàn ngược | 1 chart nến: mũi tên MUA (đỏ) → giá rớt; rồi BÁN (xanh) → giá bật. 2 mũi tên ngược chiều | code | nhịp nhanh, rung nhẹ chart, mũi tên snap | mũi tên "mua"@f8, "bán"@f56 | whoosh x2 |
| s02 | HOOK | sai thời điểm vào | chart mờ + chữ to "SAI THỜI ĐIỂM" + 1 dấu X đỏ tại điểm vào sai | code | "SAI THỜI ĐIỂM" zoom-in ease-out snap | chữ snap@f30 | impact |
| s03 | ALTERNATIVE | chờ 4 mẫu hình | 4 ô vuông mờ xuất hiện chờ (placeholder 4 setup) | code | 4 ô fade-in lần lượt, sáng nhẹ | 4 ô pop @"bốn" f72 | pop x4 |
| s04 | STEPS | phá vỡ vùng cản | chart: nén đi ngang dưới đường kháng cự đỏ → nến xanh phá lên | code | badge "1" gold pop; đường cản vẽ ngang; nến phá bật lên | "1"@f0; "vùng cản" highlight@f81 | pop + whoosh |
| s05 | STEPS | chờ test lại | cùng chart s04: giá quay lại test đường + hộp xanh "VÀO LỆNH" | code | vòng tròn test pulse; hộp "VÀO LỆNH" slide-in | hộp@f40 | ting |
| s06 | STEPS | thuận xu hướng tăng | chart xu hướng tăng + mô hình cờ nhỏ giữa nhịp | code | badge "2" pop; đường MA xanh dốc lên; cờ nhấp nháy | "2"@f0 | pop |
| s07 | STEPS | chọn cổ phiếu khoẻ | nhãn "CỔ PHIẾU KHOẺ" + icon cơ bắp/▲ trên chart xanh | code | nhãn scale nhẹ overshoot | nhãn@f10 | pop nhẹ |
| s08 | STEPS | đảo chiều hai đỉnh | chart HAI ĐỈNH gãy xuống đường viền cổ | code | badge "3" pop; nhịp chậm cảnh báo; 2 đỉnh đánh dấu | "3"@f0; "hai đỉnh"@f60; "hai đáy"@f76 | pop + 2 ping |
| s09 | STEPS | chờ xác nhận | cùng chart s08: đường viền cổ nét đứt + chữ "Chờ xác nhận" | code | đường đứt vẽ; chữ fade, tông trầm | chữ@f30 | soft |
| s10 | STEPS | vùng dòng tiền lớn | chart: vùng giá tô đậm (zone) → giá quay về + bật lên | code | badge "4" pop; zone tô mờ; giá chạm zone bật | "4"@f0; zone@f55; "bật"@f142 | pop + ting |
| s11 | STEPS | chờ phản ứng | chữ "CHỜ PHẢN ỨNG" + "đừng mua giữa đường" trên chart mờ | code | chữ snap; nhịp lắng | chữ@f20 | impact nhẹ |
| s12 | ACTION | chờ đúng điểm vào | 4 ô (s03) giờ sáng đều + check; zoom-out toàn cảnh | code | 4 ô sáng lần lượt, zoom-out, sáng dần | 4 check@đều | rise |
| s13 | ACTION | follow + app | thẻ CTA: nút "Follow" + 3 bước nhỏ (Bộ lọc / Watchlist / Cảnh báo). KHÔNG logo | code | nút Follow nảy; 3 bước pop lần lượt | "Follow"@f0; 3 bước@f80,f95,f112 | pop dứt khoát |

## Asset Manifest (hình cần CEO cung cấp)
**RỖNG** — toàn bộ scene vẽ bằng code. Không cần ảnh thật.

## QA Audit (sentence-driven)
- Sentence atomicity: mỗi câu 1 clip `clips/sXX.mp4`, không transition đè ranh giới câu.
- Main idea match: visual mỗi câu đúng main_idea (vd s08 = hai đỉnh, không phải breakout).
- Enum/number beat: số 1/2/3/4 pop tại f0 mỗi câu setup; s08 "hai đỉnh"@f60 + "hai đáy"@f76 (±2f); s03 4 ô @"bốn" f72.
- Stitch gap: silence padding khớp pause_after_ms (s02=700, s11=600...).
- Safe zone: subtitle + badge nằm y<1500, không đè chi tiết chart.
- Nobrand: KHÔNG logo KFSP ở bất kỳ frame nào (kênh Một tay đầu tư).
- Số liệu: KHÔNG % lợi nhuận, KHÔNG mã cổ phiếu cụ thể.
