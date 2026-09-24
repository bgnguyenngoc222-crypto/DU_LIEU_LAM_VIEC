# KFSP Design System — Điểm tin thị trường (TikTok/Shorts)

Brand: **KFSP — Kungfu Stocks Pro**. App phân tích chứng khoán VN cho nhà đầu tư mới.
Tông: tài chính, nghiêm túc nhưng dễ gần, education-first. KHÔNG khoe % lợi nhuận.

## Canvas
- 1080 × 1920 portrait (9:16), 30fps
- TikTok safe zone: nội dung trong `top: 180px`, `bottom: 1500px`, ngang `x: 60–1020`
- Logo top y≈170, vùng caption/CTA cuối y≈1340–1470

## Colors
| Token | Hex | Dùng cho |
|---|---|---|
| bgPrimary | `#0a1628` | nền chính (dark navy) |
| bgGradient | `#12233f` | tâm radial vignette |
| panel | `rgba(255,255,255,0.04)` | glass card nền |
| border | `rgba(255,255,255,0.10)` | viền card |
| textPrimary | `#f2f6ff` | chữ chính |
| textMuted | `#8aa0c2` | chữ phụ / nhãn |
| green | `#34d399` | tăng / dương / dòng tiền vào |
| red | `#f87171` | giảm / âm / bán ròng |
| gold | `#f5c542` | nhấn mạnh, con số chủ đạo |
| purple | `#a78bfa` | brand accent (KFSP) |

Background CSS: `radial-gradient(circle at 50% 38%, #12233f 0%, #0a1628 70%)`.

## Glass card
`background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.10); border-radius: 28px; backdrop-filter: blur(10px);`

## Typography
- Font stack: `"Be Vietnam Pro", "Inter", -apple-system, "Segoe UI", sans-serif` (hỗ trợ dấu tiếng Việt)
- Tiêu đề lớn: 92–120px, weight 800
- Con số chủ đạo: 130–160px, weight 800, màu gold/green/red theo chiều
- Nhãn: 38–46px, weight 600, màu textMuted, letter-spacing 2px, uppercase

## Motion
- CẤM `linear` easing — chỉ `power2.out` / `power3.out` / `back.out` / spring-feel
- Số đếm (count-up) cho con số chủ đạo
- Element pop dứt khoát, không drift dài

## Quy tắc nội dung Điểm tin
- Số liệu phải có nhãn rõ + đơn vị
- Chiều tăng = xanh + mũi tên ▲, giảm = đỏ + ▼
- Không lời khuyên mua/bán; chỉ tường thuật số liệu thị trường
