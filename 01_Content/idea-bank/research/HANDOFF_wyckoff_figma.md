# HANDOFF — Dựng lại KỸ LƯỠNG bộ hình Figma series Wyckoff

> Prompt chuyển phiên (CEO yêu cầu 12/07). Lý do: các hình Figma hiện tại (đặc biệt 3 hình quy luật) **vẫn thô/khó hiểu dù đã có spec** — cần một phiên tập trung dựng lại tỉ mỉ, đạt chuẩn infographic thật. Đọc trọn file này trước khi bắt tay.

## 0. Mục tiêu phiên sau
Dựng lại bộ hình Wyckoff Bài 1 (và rà Bài 2) đạt **chất lượng infographic chuyên nghiệp**, không phải "diagram phác thảo". Chuẩn so sánh: bộ hình "Hai đáy" gold do CEO tự dựng tay (frame trong cùng file) + chart AAPL StockCharts (nét, cân đối, dễ đọc). Hiện tại chưa tới.

## 1. Bối cảnh series (đọc để hiểu nội dung)
- Umbrella: `02_Marketing/content-automation/idea-bank/IF-2026-033-wyckoff-doc-trong-hop.md` (mini-series 5 bài, thuật ngữ LOCKED **"Cấu trúc Wyckoff"** không dùng "sơ đồ").
- Ghi chú nền kiến thức: `research/wyckoff-research-note.md`.
- 🔴 **Spec dựng hình (bắt buộc theo):** `research/wyckoff-3-laws-illustration-spec.md` — nguyên tắc 2 tầng nến/volume thẳng cột, mỗi hình 1 ý, nến thật trong bối cảnh, nhãn đời thường, + "phải vẽ đúng" từng hình + cạm bẫy tránh.
- Draft Bài 1 (chữ đã chốt: tít "CÁCH RICHARD WYCKOFF DẠY BẠN ĐỌC Ý ĐỒ TIỀN LỚN CHỈ BẰNG GIÁ VÀ KHỐI LƯỢNG" + đã cài "Cấu trúc Wyckoff"): `drafts/2026-07-12-fanpage-wyckoff-bai1-tong-quan.md`.

## 2. Hiện trạng Figma (file `candlestick pattern`, page `🎨 Hình content (nháp)`, fileKey iIfUyCbggCrMybowE6zSLV)
NodeId là **session-specific** — phải `figma_get_status` + list frame lại đầu phiên, KHÔNG tin id cũ.

Hàng Wyckoff hiện ở **y=8200** (tách khỏi hàng Darvas y=6849):
| Frame (tên hiện tại) | x | Vai | Trạng thái |
|---|---|---|---|
| `Wyckoff · Bai 1 · Tich luy DON GIAN · DARK` | 0 | Bài 1 hình cấu trúc đơn giản | tạm được, rà lại |
| `Wyckoff · Bai 1 · QL1 Cung Cau · DARK` | 1300 | Bài 1 QL1 Cung-Cầu | 🔴 dựng lại kỹ |
| `Wyckoff · Bai 1 · QL2 Nhan Qua · DARK` | 2600 | Bài 1 QL2 Nhân-Quả | 🔴 dựng lại kỹ |
| `Wyckoff · Bai 1 · QL3 No luc Ket qua · DARK` | 3900 | Bài 1 QL3 Nỗ lực-Kết quả (VSA) | 🔴 dựng lại kỹ (trọng tâm) |
| `Wyckoff · Bai 2 · Cau truc TICH LUY · DARK` | 5200 | Bài 2 chart tích luỹ đầy đủ (line + PS/SC/AR/ST/Spring/SOS/LPS + pha A-E) | ổn hơn, rà polish |
| `SPEC · Minh hoa 3 quy luat Wyckoff` | (0, 9420) | Khung ghi chú spec trên canvas | giữ |

**Skeleton để clone** (nền gradient ảnh + logo Container + tiêu đề + slogan): frame Darvas `Hop chu nhat · Bai 1 · DARK` (tên cũ id 163:2756 — verify lại). Clone xong strip giữ 3 tên `Gradient Background - source 3` / `Container` / `Slogan` + node tiêu đề, rồi sửa tiêu đề.

## 3. 🔴 Vì sao "rất tệ" — chẩn đoán + yêu cầu chất lượng
Vấn đề bản hiện tại (tự đánh giá):
- Nến vẽ bằng rect thô, tỉ lệ thân/râu chưa đẹp, bề rộng không đồng nhất, trông "vẽ tay code" chứ không như chart thật.
- Bố cục lỏng, nhiều khoảng trống chết; nhãn đặt thủ công dễ đè/lệch, phân cấp thị giác yếu.
- Volume bars canh cột với nến chưa chuẩn khít.
- Chưa có lưới/khung tham chiếu, trục, để mắt bám.

**Chuẩn phải đạt phiên sau:**
1. **Nến chuẩn:** bề rộng thân đồng nhất, râu mảnh căn giữa thân, tỉ lệ thân/râu hợp lý, khoảng cách nến đều. Cân nhắc viết 1 hàm `candle()` chuẩn dùng lại + hằng số (bodyW, wickW, gap) thống nhất mọi hình.
2. **Canh cột volume khít** ngay dưới đúng cây nến (cùng cx), cùng bề rộng thân.
3. **Bố cục có khung:** thêm trục/đường lưới mờ, vùng biểu đồ gọn, chừa lề đều; nhãn có thứ bậc (tiêu đề > nhãn chính > phụ đề). Không để label đè — tính toạ độ cẩn thận, screenshot kiểm tra.
4. **Lặp 3-5 vòng/hình:** vẽ → `figma_capture_screenshot` → soi lệch/đè/tỉ lệ → sửa → lặp. ĐỪNG giao khi mới vòng 1.
5. **Đối chiếu reference thật:** mở + xem bộ "Hai đáy" gold (CEO dựng tay) và bộ Cốc tay cầm/Hộp Darvas đã polish trong cùng page để bắt chước độ chỉn chu (khoảng cách, cỡ chữ, màu, cách đặt pill/nhãn). Palette + kỹ thuật: `.claude/skills/kfsp-content/reference/mau-hinh-figma-chart.md`.
6. Cân nhắc: với hình khái niệm (QL2 Nhân-Quả), nếu Figma khó đẹp thì bàn với CEO có nên chuyển 1-2 hình sang Gemini (skill `kfsp-image-brief`) — nhưng mặc định CEO muốn Figma, làm cho tới.

## 4. Nội dung từng hình (bám spec `wyckoff-3-laws-illustration-spec.md`)
- **QL1 Cung-Cầu:** chia đôi. 3 nến nhỏ đi ngang → 1 nến quyết định biên rộng, **vạch mức đóng cửa** sát đỉnh (cầu) / sát đáy (cung) + cột volume cao vọt. Mũi tên + "Cầu > Cung / Cung > Cầu".
- **QL2 Nhân-Quả:** hộp nền (Nhân) đo bề rộng → **mũi tên dọc (Quả) dài ĐÚNG BẰNG bề rộng nền** → mục tiêu nét đứt. So sánh nền hẹp (quả ngắn) vs nền rộng (quả xa). KHÔNG Point-and-Figure cho F0.
- **QL3 Nỗ lực-Kết quả (VSA, trọng tâm):** **Cao trào bán TRONG BỐI CẢNH**: 4-5 nến đỏ giảm dần → nến râu dưới DÀI (~60-70% cây), đóng cửa kéo lên gần đỉnh (vạch đóng cửa) → 1-2 nến xanh hồi; cột volume dưới nến cao trào KHỔNG LỒ (2-3×). Mũi tên: "NỖ LỰC cực lớn" (→volume) + "KẾT QUẢ ngược: thủng sâu nhưng đóng cửa bật lên" (→nến). Nhãn "Cao trào bán — tay to gom hàng".

## 5. Hạ tầng Figma (tránh mất thời gian)
- MCP `figma-console`. Plugin **Desktop Bridge hay rớt**. Fix: `pkill -f "figma-console-mcp/dist/local.js"` → server tự respawn chiếm 9223 → CEO mở lại plugin (Plugins → Development → Figma Desktop Bridge).
- Chụp ảnh: dùng **`figma_capture_screenshot`** (bridge, runtime) — KHÔNG dùng `figma_take_screenshot` (REST token hết hạn 403).
- Vẽ: `figma_execute` JS. `await figma.getNodeByIdAsync(id)`. Load font trước khi set text (`Inter` Regular/Semi Bold/Bold). Vector path: dùng toạ độ không âm rồi set node.x/y. Fills: mỗi paint đủ `color:{r,g,b}` + `opacity` riêng.
- Đặt tên node khi tạo để dễ clear chọn lọc (`n`/`lbl`/`ln`/`ring`). Clear content giữ skeleton: xoá theo tên, giữ bg/logo/slogan/title.

## 6. Còn treo cả series (ngoài 3 hình quy luật)
- **Bài 1:** chữ + hình cấu trúc đơn giản OK; 3 hình quy luật dựng lại (phiên sау). Rồi CEO duyệt đăng.
- **Bài 2 (Tích luỹ):** hình chart chi tiết đã có (rà polish); **CHỮ chưa viết**.
- **Bài 3 (Phân phối):** chưa làm — chart đối xứng CẤU TRÚC PHÂN PHỐI (PSY/BC/AR/ST/**UT-UTAD**/SOW/LPSY, "lớp băng") + chữ.
- **Bài 4 (Nỗ lực-Kết quả) + Bài 5 (Điểm vào):** chưa.
- **Bản SÁNG** cả series Darvas + Wyckoff: chưa dựng.
- **Treo cũ Darvas:** hình Figma Bài 4 (frame `Hop chu nhat · Bai 4 · Dao chieu`, chart chưa vẽ) + polish nhãn Bài 3.
- **Mirror umbrella IF-2026-033 lên Google Sheet idea-bank** (webhook `POST https://n8n.kfsp.vn/webhook/idea-bank`, FULL payload) — chưa làm, làm sau khi CEO duyệt.

## 7. Luật cứng (mọi content/hình)
Xưng "bạn" · KHÔNG %lợi nhuận/phím hàng/get-rich · KHÔNG gạch ngang dài "—" · KHÔNG icon trong bài chữ · brand spine "Đưa chứng khoán về tầm tay bạn" ở đóng · disclaimer tham khảo · thuật ngữ **"Cấu trúc Wyckoff"** (không "sơ đồ") · giữ viết tắt Wyckoff gốc (PS/SC/AR/ST/Spring/SOS/LPS · UT/UTAD/SOW/LPSY) kèm chú thích tiếng Việt · **show CEO duyệt trước khi đăng/gửi ra ngoài**.
</content>
