# PLAN STORYBOARD — 4 dấu hiệu cổ phiếu tạo đáy (rev2 — có ảnh tham chiếu)
videoId: 20260608-4-dau-hieu-tao-day · framework 3Qs · voice Minh Quân 1.0 · channel **nobrand-cktt** (logo ẩn, overlay tím giữ) · tổng 66.1s · 30fps

## Style
- Nền navy `#0a1628` radial gradient. Nến xanh `#34d399` / đỏ `#f87171`, nhấn vàng `#f5c542`, badge số + đường trụ tím `#7B3AEC`.
- **bg ảnh tham chiếu**: blur 18px + overlay navy `rgba(10,22,40,0.82)` để code chart trên là hero, ảnh chỉ tạo chiều sâu + đồng bộ brand.
- **code chart vẽ LẠI sắc nét** đúng nội dung ảnh (không để ảnh gốc làm hero — ảnh chỉ là bg + nguồn thiết kế).
- BrandFrame: overlay tím trên+dưới, **NOBRAND=true**. Subtitle 1 dòng karaoke y≈1400.

## Sentence Storyboard

| id | phase | dur | main_idea | asset | visual_anchor (code vẽ lại) | animation | enum_beats | sfx |
|---|---|---|---|---|---|---|---|---|
| s01 | HOOK | 2.04 | đừng đoán đáy | bg:cover_4dauhieu | Chữ to "ĐỪNG ĐOÁN ĐÁY" giữa + 1 nến đỏ rơi | text snap-in ease-out, nến rơi | — | whoosh |
| s02 | HOOK | 3.19 | đáy xác nhận khi đã qua | bg:cover_4dauhieu | Đường giá tạo đáy, marker "ĐÁY" chỉ hiện SAU khi giá đã đi lên | marker fade trễ, mũi tên chỉ ngược về đáy | — | tick |
| s03 | HOOK | 2.21 | bắt dao rơi | bg:cover_4dauhieu | Con dao (SVG) rơi theo loạt nến đỏ, bàn tay chụp hụt | dao rơi nhanh, tay giật, nhịp dồn | — | swish+miss |
| s04 | HOOK | 4.37 | có 4 dấu hiệu | bg:cover_4dauhieu | 4 thẻ số 1-2-3-4 (tím) hiện lần lượt, nhãn ngắn 4 dấu hiệu | 4 badge pop nối tiếp | — | pop ×4 |
| s05 | WHY | 3.84 | ngộp vì quá nhiều mã | code (navy) | Bảng giá dày hàng trăm ô mã trôi nhanh, tối dần | scroll nhanh, mờ, rung nhẹ | — | ù trầm |
| s06 | WHY | 4.37 | quan sát tập trung | code (navy) | Bảng mờ hẳn, 1 biểu đồ sáng lên giữa | dim bg, zoom-in chậm 1 chart, sáng dần | — | shimmer |
| s07 | HOW | 3.02 | dấu hiệu 1 thanh khoản cạn | bg:sig1_thanhkhoan + code | Badge "1" THANH KHOẢN CẠN. Nến downtrend đỏ + panel volume cột đỏ thấp dần | badge1 pop, volume co lại trái→phải | — | pop |
| s08 | HOW | 5.35 | phiên đảo chiều volume lớn | bg:sig1_thanhkhoan + code | Nến rút chân dài bật xanh (đảo chiều) + 1 cột volume xanh vọt cao. Nhãn "PHIÊN ĐẢO CHIỀU" + "Khối lượng đột biến" | nến vẽ ra, cột xanh overshoot, callout snap | — | pop+ting |
| s09 | HOW | 1.73 | dấu hiệu 2 phân kỳ dương | bg:sig2_phanky + code | Badge "2" + chữ "PHÂN KỲ DƯƠNG" | badge2 pop, chữ slide | — | pop |
| s10 | HOW | 4.46 | giá xuống chỉ báo lên | bg:sig2_phanky + code | Trên: nến + đường nối 2 đáy giá đi XUỐNG (đỏ) "Giá tạo đáy thấp hơn". Dưới: subpanel RSI/MACD đường nối 2 đáy đi LÊN (xanh) "Chỉ báo tạo đáy cao hơn". Badge xanh "PHÂN KỲ DƯƠNG" giữa | đường giá vẽ xuống @f17, đường chỉ báo vẽ lên @f100, 2 mũi tên ngược | "giá đáy thấp hơn"@f17, "chỉ báo đáy cao hơn"@f100 | pop ×2 |
| s11 | HOW | 1.51 | đà giảm yếu | bg:sig2_phanky + code | Highlight khoảng cách 2 đường phân kỳ nở rộng, mũi tên giảm nhạt dần | gap glow, arrow fade | — | nhẹ |
| s12 | HOW | 1.54 | dấu hiệu 3 hai đáy W | bg:sig3_haiday + code | Badge "3" + bắt đầu vẽ nét chữ W | badge3 pop, W draw-in | — | pop |
| s13 | HOW | 4.94 | test đáy không phá xác nhận | bg:sig3_haiday + code | Chữ W hoàn chỉnh: "Đáy 1" → "Test đáy" giữ trên đường hỗ trợ xanh đứt "Không phá đáy cũ" → breakout qua neckline xám, vòng tròn + callout "ĐIỂM XÁC NHẬN" | W draw, support giữ, breakout bật, circle+callout snap | — | ting xác nhận |
| s14 | HOW | 2.74 | dấu hiệu 4 trụ ngừng rơi | bg:sig4_tru + code | Badge "4" + đường tím đậm "Cổ phiếu đầu ngành" | badge4 pop, đường trụ nổi bật | — | pop |
| s15 | HOW | 2.16 | trụ tạo nền cho nhóm | bg:sig4_tru + code | Đường trụ tím chững đáy rồi đi lên, callout xanh "TRỤ TẠO ĐÁY TRƯỚC" + mũi tên; vài đường xám mờ "Nhóm theo sau"; "Market-index line" dưới đáy | trụ flatten→up, callout snap, nhóm mờ theo sau chậm | — | bay lên |
| s16 | BRIDGE | 6.24 | Watchlist + Cảnh báo | bg:app_tamsoat + code | 2 mockup phone KFSP (Bộ lọc "Hai đáy" + Điểm KFSP) mờ phía sau; icon ngôi sao "Watchlist" pop + chuông "Cảnh báo" rung phía trước | star pop @f82, bell rung @f108, sáng dịu | "Watchlist"@f82, "Cảnh báo"@f108 | pop+ting chuông |
| s17 | BRIDGE | 3.72 | quan sát đúng chỗ | code (navy) | Câu chốt "Đáy thưởng cho người quan sát đúng chỗ" giữa màn | text fade-in, zoom-out nhẹ | — | — |
| s18 | CTA | 2.64 | follow xem tiếp | code (navy) | Nút "Follow" nảy giữa (nobrand) | button bounce overshoot | — | pop dứt |

## Asset Manifest — ĐÃ CÓ (Thanh cung cấp, đã copy vào screen-shot/)
| file | scene dùng | vai trò |
|---|---|---|
| cover_4dauhieu.png | s01–s04 | bg mờ HOOK + nguồn thiết kế 4 thẻ |
| sig1_thanhkhoan.png | s07–s08 | bg mờ + mẫu nến/volume vẽ lại |
| sig2_phanky.png | s09–s11 | bg mờ + mẫu phân kỳ vẽ lại |
| sig3_haiday.png | s12–s13 | bg mờ + mẫu W vẽ lại |
| sig4_tru.png | s14–s15 | bg mờ + mẫu đường trụ vẽ lại |
| app_tamsoat.png | s16 | bg mờ 2 phone KFSP |
→ **Đủ asset, KHÔNG cần Thanh gửi thêm. Bỏ qua Bước 3.**

## QA Audit (sentence-driven + chính)
- Sentence atomicity: 18 clip riêng, không transition đè ranh giới câu.
- Main idea match: visual câu X đúng main_idea (s10=phân kỳ, s13=W, s15=trụ — không lẫn).
- Enum beat sync: s10 @f17/@f100; s16 @f82/@f108 (±2 frame).
- Stitch gap: silence = pause_after_ms; nghỉ 600ms cuối phase (s04,s06,s15), CTA s18=0.
- **bg ảnh**: blur+overlay navy 0.82, KHÔNG để chữ ảnh gốc đọc được cạnh tranh subtitle; code chart là hero sắc nét.
- Subtitle: display chuẩn (RSI/MACD/Watchlist/Follow hiện đúng dù voice phiên âm).
- Safe zone y<1500; badge số + tiêu đề thẳng hàng căn trái.
- Animation psychology: HOOK nhanh dồn → WHY tối/ngộp→sáng → HOW từng dấu hiệu rõ → BRIDGE dịu → CTA dứt.
- Brand: overlay tím cả video; NOBRAND=true.
