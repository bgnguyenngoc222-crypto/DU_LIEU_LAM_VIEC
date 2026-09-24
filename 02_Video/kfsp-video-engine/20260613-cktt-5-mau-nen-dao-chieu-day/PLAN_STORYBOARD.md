# PLAN STORYBOARD — 20260613-cktt-5-mau-nen-dao-chieu-day

- Framework: 3Qs (mở bằng ca dao) · 15 câu · 9:16 (1080×1920) · ~102s
- Kênh: Chứng khoán trong tầm tay · **brand_status: NOBRAND** (overlay tím giữ, KHÔNG logo KFSP)
- Giọng: Minh Quân speed 1.0
- **Arc tông màu:** s01–s03 tông QUÊ ẤM (trời chiều, vàng đất, nâu) → s04 MORPH sang chart → s04–s15 dark navy #0a1628 (xanh tăng #34d399, đỏ giảm #f87171, vàng nhấn #f5c542).
- Subtitle karaoke 5–6 từ, y≈1400 (safe zone). Vòng motif chuồn chuồn: s01 → callback s10 → chốt s13.

## Sentence Storyboard

| id | phase | main_idea | visual_anchor (đúng main_idea) | asset | animation | beat (frame@30fps) | sfx |
|---|---|---|---|---|---|---|---|
| s01 | HOOK | chuồn chuồn báo mưa | Cảnh quê: chuồn chuồn bay là đà sát mặt ruộng, mây xám kéo tới, tông hoài niệm ấm | **bg:chuon-chuon.png** | pan nhẹ trái→phải, chuồn chuồn bay, mây trôi vào, tối dần cuối câu | "chuồn chuồn"@~f70, "sắp mưa" cuối | gió nhẹ + côn trùng |
| s02 | HOOK | ráng mỡ gà báo bão | Trời chiều ráng vàng óng chân trời, mái nhà nhỏ silhouette, gió bắt đầu mạnh | **bg:rang-mo-ga.png** | ráng vàng glow, lá bay ngang, gió mạnh dần | "ráng mỡ gà"@~f30 | gió mạnh |
| s03 | BRIDGE | đọc điềm không đoán mò | 2 biểu tượng nhỏ (giọt mưa / cơn bão) hiện cạnh nhau trên nền quê mờ | code (+bg mờ s01) | 2 icon fade-in, nhịp chậm lại, ease-in-out | icon mưa@~f60, icon bão@~f120 | soft |
| s04 | BRIDGE | thị trường cũng có điềm | MORPH: bầu trời quê chuyển mượt thành nền chart navy, vài cây nến hiện | code (transition) | cross-dissolve trời→navy, nến fade lên | morph bắt đầu f0, nến@~f70 | whoosh morph |
| s05 | BRIDGE | điềm hai chiều giảm và đáy | Chia đôi: trái cụm nến đỏ đi xuống (mờ), phải cụm nến đáy sáng lên | code | trái mờ dần, phải sáng dần (ánh sáng nở) | "sắp giảm"@~f30, "đáy"@~f110 | 2 tông trầm/sáng |
| s06 | BRIDGE | năm mẫu nến đáy | 5 ô khung nến trống xếp hàng sáng dần (placeholder 5 mẫu) | code | "năm mẫu nến" snap, 5 ô pop lần lượt | "năm"@~f55, 5 ô pop sau đó | pop x5 |
| s07 | HOW | nến búa, lực cầu phản công | Chart: chuỗi nến ĐỎ giảm sâu → 1 nến BÚA (bóng dưới dài) → nến xanh bật lên. Highlight bóng dưới | code | badge "1"; nến đỏ rơi; búa dìm sâu rồi kéo lên; bóng dưới glow | "1"@f0; "bóng dưới dài"@~f200; bật@cuối | click→ting |
| s08 | HOW | nhấn chìm tăng nuốt cây đỏ | Chart: nến xanh lớn NUỐT TRỌN cây đỏ liền trước, rồi xanh đi lên | code | badge "2"; cây xanh trồi phủ cây đỏ (scale overshoot) | "2"@f0; "nuốt trọn"@~f130 | whoosh |
| s09 | HOW | sao mai cân bằng chặn đà | Chart: 3 cây — đỏ giảm, cây thân ngắn tách biệt ở đáy, xanh bật. Khoanh cây thân ngắn | code | badge "3"; nến đỏ; cây thân ngắn pop tách; xanh tăng | "3"@f0; "thân ngắn"@~f180 | pop |
| s10 | HOW | doji chuồn chuồn callback | Chart: doji thân mỏng bóng dưới dài + CALLBACK chuồn chuồn mờ thoáng phía sau | code (+bg:chuon-chuon.png mờ) | badge "4"; doji vẽ; chuồn chuồn mờ hiện 0.6s khi nói "chuồn chuồn báo mưa"; "bất phân thắng bại" rung nhẹ | "4"@f0; chuồn chuồn@~f90; "bất phân"@~f230 | click + gió thoáng |
| s11 | HOW | xuyên thấu phản công | Chart: nến đỏ dài, nến xanh đâm xuyên >nửa thân đỏ, mũi tên phản công đi lên | code | badge "5"; nến xanh đâm xuyên (motion lên); mũi tên bật | "5"@f0; "đấm xuyên"@~f140; mũi tên@cuối | click mạnh |
| s12 | WHY | nến đẹp chưa phải mua | 1 nến "đẹp" + dấu chấm hỏi / chữ "CHƯA PHẢI LỆNH MUA" gạch nhấn | code | pause nhẹ; chữ "CHƯA PHẢI LỆNH MUA" snap, tông cảnh báo | chữ@~f40 | impact nhẹ |
| s13 | WHY | chờ cây xác nhận | Chuồn chuồn mờ (chưa thành mưa) + chart: cây nến xác nhận thứ 2 pop sau mẫu hình | code (+bg:chuon-chuon.png mờ) | chuồn chuồn mờ@"con chuồn chuồn"; nhịp chậm an tâm, cây xác nhận sáng | "con chuồn chuồn"@~f20; "chờ thêm một cây"@~f200 | soft |
| s14 | CTA | mở biểu đồ tự soi | Mockup app: biểu đồ 1 mã, con trỏ chỉ cây nến gần nhất, khung soi | code | zoom-to-tap mở biểu đồ; con trỏ di tới cây nến; khung pulse | "biểu đồ"@~f30; con trỏ@~f120 | tap + ting |
| s15 | CTA | follow xem tiếp | Thẻ CTA: nút "Follow" nảy + dòng "đọc điềm của thị trường". KHÔNG logo | code | nút Follow nảy overshoot; chữ fade | "Follow"@f0 | pop dứt khoát |

## Asset Manifest (hình cần CEO cung cấp)

| Tên file | Scene dùng | Mô tả ảnh cần (gen Gemini, flat-vector ấm, không chữ) |
|---|---|---|
| `chuon-chuon.png` | s01 (bg) + callback s10, s13 (mờ) | Cảnh đồng quê Việt Nam chiều tà, vài con chuồn chuồn bay là đà sát mặt ruộng lúa, mây xám kéo tới báo mưa. Flat-vector, tông ấm hoài niệm, chừa khoảng trống trên cho tít. KHÔNG chữ. |
| `rang-mo-ga.png` | s02 (bg) | Trời chiều ráng mây vàng óng (mỡ gà) phía chân trời, một mái nhà tranh silhouette nhỏ, gió thổi. Flat-vector, tông vàng cam ấm. KHÔNG chữ. |

> 2 ảnh này là phần cảm xúc của hook (ca dao) — vẽ code khó đẹp. Còn lại 13 cảnh (chart/nến/CTA/morph) = **code** hoàn toàn.

## QA Audit (sentence-driven)
- **Sentence atomicity:** mỗi câu 1 clip `clips/sXX.mp4`, không transition đè ranh giới câu.
- **Main idea match:** visual đúng main_idea từng câu (s07=búa, s08=nhấn chìm, s09=sao mai, s10=doji, s11=xuyên thấu — KHÔNG lẫn).
- **Vẽ nến đầy đủ:** mọi mẫu vẽ bằng nến thật (đỏ giảm dẫn vào + xanh phục hồi), KHÔNG line (đồng bộ rule hình KFSP).
- **Number beat:** badge 1–5 pop tại f0 mỗi câu s07–s11.
- **Vòng motif chuồn chuồn:** s01 (full) → s10 (callback mờ) → s13 (chốt mờ) phải nhận ra cùng hình ảnh.
- **Morph s04:** cross-dissolve trời→navy liền mạch, không cắt cứng.
- **Stitch:** ghép sát (pause đã baked-in từ audio gốc 1 khối), không cộng thêm silence.
- **Safe zone:** subtitle + badge y<1500, không đè chi tiết chart.
- **Nobrand:** KHÔNG logo KFSP frame nào; overlay tím brand giữ.
- **Compliance:** KHÔNG % lợi nhuận, KHÔNG mã cổ phiếu cụ thể.
