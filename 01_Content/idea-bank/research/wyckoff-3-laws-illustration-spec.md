# Spec minh hoạ 3 quy luật Wyckoff cho F0 (chuẩn dựng hình)

> Spec dựng HÌNH cho series Wyckoff [[IF-2026-033]], Bài 1. Research 12/07 (StockCharts ChartSchool, Wyckoff Analytics, VSA - Tom Williams/Anna Coulling). Mỗi quy luật = 1 hình riêng, dark-brand KFSP.
> Lý do có spec này: bản minh hoạ đầu (gộp 3 thẻ icon nhỏ) bị CEO đánh giá "sơ sài, khó hiểu". Spec này chuẩn hoá cách vẽ dễ hiểu cho F0.

## 🔴 Nguyên tắc chung cho cả 3 hình (giữ nhất quán)
1. **Bố cục 2 tầng dùng chung trục thời gian dọc:** tầng trên = GIÁ (nến), tầng dưới = KHỐI LƯỢNG (cột volume), nến và cột **thẳng cột với nhau**. Đây là cách chuẩn mọi giáo trình Wyckoff/VSA.
2. Nến tăng = xanh, nến giảm = đỏ. Cột volume tô cùng màu nến của nó.
3. **1 ý chính / 1 hình.** Không nhồi. Nhãn ngắn tiếng Việt đời thường, mũi tên chỉ đúng chỗ.
4. Biên nến (spread) và chiều cao cột volume là 2 biến kể chuyện → **vẽ chênh lệch RÕ, phóng đại** cho dễ thấy.
5. Vẽ trong **bối cảnh** (chuỗi nến), không vẽ hình rời trừu tượng.

## Hình 1 — CUNG / CẦU (id Figma 194:1159)
**Ý:** biên nến + khối lượng cho biết bên nào thắng.
- Khung chia đôi trái/phải bằng divider dọc.
- **Nửa trái "Cầu thắng → giá lên":** 3 nến nhỏ đi ngang → 1 **nến xanh lớn** (biên rộng ~3.5× nến nền, **đóng cửa sát ĐỈNH** nến, vạch mức đóng cửa amber) + **cột volume xanh cao vọt** (~3×) thẳng dưới. Mũi tên xanh lên. Nhãn "Cầu > Cung".
- **Nửa phải "Cung thắng → giá xuống":** đối xứng gương, **nến đỏ lớn đóng sát ĐÁY** + cột volume đỏ cao vọt. Mũi tên đỏ xuống.
- **Chi tiết đắt giá nhất:** vạch **mức đóng cửa** trong thân nến (sát đỉnh/đáy) — đừng bỏ. Cột volume nến quyết định phải cao vọt hẳn.
- Câu chốt: "Biên nến cho biết mức quyết liệt, khối lượng cho biết số người tham gia. Nhìn cả hai để biết ai thắng."
- **Tránh:** volume 2 nửa bằng nhau · quên vạch đóng cửa · quá nhiều nến nền (3 là đủ) · để chữ Anh Supply/Demand.

## Hình 2 — NHÂN / QUẢ (id Figma 194:1286)
**Ý:** nền đi ngang càng rộng → cú bung càng xa (nhân lớn → quả lớn).
- **KHÔNG dùng Point-and-Figure thuần cho F0** (ký hiệu X/O là rào cản). Dùng biểu đồ giá thường + phép **"đoạn ngang gập thành đoạn dọc"**.
- Vẽ **hộp tích luỹ nằm ngang** (NHÂN) có kháng cự trên + hỗ trợ dưới, nến đi ngang bên trong. Mũi tên ngang 2 đầu đo **bề rộng hộp** → nhãn "Nhân = bề rộng nền".
- Từ mép phải hộp giá **bung lên**; vẽ **mũi tên dọc 2 đầu dài ĐÚNG BẰNG bề rộng hộp** (cùng số đo, xoay 90°) tới **đường nét đứt = Mục tiêu**. Nhãn "Quả = bằng bề rộng nền".
- Có thể thêm cặp so sánh nhỏ **nền hẹp→bung ngắn / nền rộng→bung xa** (linh hồn quy luật).
- (Tuỳ chọn) hình phụ nhỏ P&F X/O + đường đếm + công thức số để "cho biết cách Wyckoff gốc đo", nhưng KHÔNG làm hình chính.
- Câu chốt: "Giá đi ngang càng lâu và rộng, lực nén càng lớn, bung ra càng xa. Đo bề ngang nền để ước lượng đích."
- **Tránh:** bắt F0 học X/O trước · mũi tên dọc dài tuỳ hứng không bằng bề rộng nền · để công thức lấn át · trộn cả chiều lên/xuống trong 1 khung.

## Hình 3 — NỖ LỰC / KẾT QUẢ (id Figma 194:1385) — TRỌNG TÂM (nền tảng VSA)
**Ý:** khối lượng lớn mà giá không đi tiếp = tay to đang làm ngược đám đông → sắp đảo chiều.
- **Nỗ lực = KHỐI LƯỢNG · Kết quả = BIÊN ĐỘ GIÁ (spread) + VỊ TRÍ ĐÓNG CỬA.**
- Vẽ **trong bối cảnh** ca kinh điển **Cao trào bán (Selling Climax)**:
  1. **4-5 nến đỏ giảm dần** (dốc xuống, đang hoảng loạn bán).
  2. **Nến cao trào:** biên RẤT RỘNG, **râu dưới DÀI (~60-70% cây nến)**, thân nhỏ nằm nửa trên, **đóng cửa kéo ngược lên gần đỉnh** (~75-80% chiều cao tính từ đáy) → vạch mức đóng cửa rõ.
  3. **1-2 nến xanh nhỏ hồi lên** xác nhận.
- Tầng volume: **cột dưới nến cao trào CỰC LỚN** (gấp 2-3× mọi cột trước), màu nổi bật.
- Nhãn: mũi tên vào cột volume "NỖ LỰC cực lớn"; mũi tên vào râu dưới+đóng cửa "KẾT QUẢ ngược: thủng sâu nhưng đóng cửa bật lên"; nhãn đáy "Cao trào bán — tay to gom hàng, khả năng đảo chiều".
- Diễn giải: "Bao nhiêu người bán tháo mà giá vẫn không xuống thêm, còn đóng cửa bật lên → có người mua rất mạnh đỡ hết. Bên bán đã kiệt."
- (Tuỳ chọn) 2 mini-panel phụ: "Phá vỡ mà khối lượng thấp = không có nỗ lực, đừng vội tin" · "Khối lượng lớn nhưng giá đứng = có người âm thầm xả".
- **Tránh:** vẽ 2 nến trơ trọi không bối cảnh · quên râu dưới dài + đóng cửa cao · volume mọi cột cao bằng nhau · trộn nhiều ca 1 khung · dùng chữ Anh trần (Selling Climax → "Cao trào bán").

## Bảng tóm (thành phần đắt giá nhất mỗi hình)
| Hình | Thông điệp 1 câu | Phải vẽ đúng |
|---|---|---|
| 1 Cung-Cầu | Biên nến + khối lượng cho biết bên nào thắng | Vạch đóng cửa sát đỉnh/đáy + cột volume vọt |
| 2 Nhân-Quả | Nền càng rộng → bung càng xa | Mũi tên dọc (Quả) DÀI ĐÚNG BẰNG bề rộng nền (Nhân) |
| 3 Nỗ lực-Kết quả | Volume lớn mà giá không đi tiếp = tay to đảo chiều | Nến cao trào râu dưới dài + đóng cửa cao + volume khổng lồ, có bối cảnh |

## Nguồn
StockCharts ChartSchool (Wyckoff tutorial · The Laws of Wyckoff · The Illustrated Wyckoff · P&F construction) · Wyckoff Analytics (P&F Part I-II · Wyckoff Method) · tradingwyckoff.com (Cause & Effect) · EarnForex VSA Guide · Anna Coulling (Volume Price Analysis) · ATAS · BrightFunded (Wyckoff VSA).
</content>
