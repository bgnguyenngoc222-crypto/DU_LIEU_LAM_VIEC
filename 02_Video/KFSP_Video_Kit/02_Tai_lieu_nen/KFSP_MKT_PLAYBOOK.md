# KFSP Marketing Playbook — Chạy chiến dịch end-to-end bằng bộ skill v1

> Bản đồ: dùng skill nào, khi nào, theo tầng phễu. Mọi skill đọc `KFSP_MARKETING_CONTEXT.md` trước.
> v1 — 2026-06-04.

## Bộ skill theo tầng phễu
| Tầng | Mục tiêu | Skill dùng | Output |
|---|---|---|---|
| **0. Nền** | Hiểu KH + thị trường + chỉ tiêu | `mkt-customer-insight` · `mkt-competitor-research` · `mkt-kpi-calculator` | Persona, bản đồ đối thủ, KPI ngược từ doanh thu |
| **1. Lập kế hoạch** | Khung chiến dịch | `mkt-campaign-brief` · `mkt-content-calendar` · `mkt-channel-setup` | Brief campaign, lịch content, setup kênh |
| **2. TOFU — Nhận biết** | Kéo NĐT mới biết KFSP | `mkt-content-script` (TikTok/Reels) · `giat-tit-content` · `cong-thuc` (organic FB) | Video script, tít, post giáo dục |
| **3. MOFU — Cân nhắc** | Xây niềm tin, dạy phương pháp | `cong-thuc` · `mkt-ugc-brief` · `email-mkt` | Bài chuyên đề, UGC, email nuôi |
| **4. BOFU — Chuyển đổi** | Đăng ký / nâng cấp Pro | `mkt-ads-copy` 🔴 · `mkt-landing-page-brief` | Ads (có disclaimer), landing |
| **5. Đo lường** | Học & tối ưu | `mkt-marketing-report` · `mkt-performance-audit` | Report tuần/tháng, audit campaign |

## Quy trình chạy 1 chiến dịch (8 bước)
1. **Insight** — `mkt-customer-insight` đọc CS Logs + Chatbot → chốt persona + nỗi đau cho campaign.
2. **Đối thủ** — `mkt-competitor-research` (nếu campaign cạnh tranh trực diện).
3. **KPI** — `mkt-kpi-calculator` tính ngược: doanh thu mục tiêu → số đăng ký → reach cần.
4. **Brief** — `mkt-campaign-brief` chốt big idea + thông điệp + kênh + timeline.
5. **Lịch** — `mkt-content-calendar` rải content theo tầng phễu × kênh.
6. **Sản xuất** — script/tít/copy/email/UGC theo từng kênh (skill TOFU→BOFU). 🔴 Mọi content tài chính qua self-check rule Module 4.
7. **Tracking** — gắn UTM (`UTM_Tracking_Registry.md`) mọi link ra ngoài.
8. **Đo** — `mkt-marketing-report` + `mkt-performance-audit` → bài học → vòng sau.

## Spine kể chuyện KFSP (gắn vào mọi content)
Mỗi content nên neo vào **1 trong 8 bước hành trình giao dịch** hoặc **1 nỗi đau persona F0**:
- Bước 1 Tìm cổ phiếu → content về **Bộ lọc** ("hết phím hàng, tự lọc cơ hội").
- Bước 2 Xác định → **RRG / Định giá 4M** ("biết cổ phiếu đắt hay rẻ").
- Bước 5 Watchlist & tín hiệu → **Cảnh báo** ("không phải canh bảng cả ngày").
- Bước 7 Bán → **kỷ luật cắt lỗ** ("thoát đúng lúc, giữ vốn").
- Bước 8 Nhật ký → **Nhật ký giao dịch** ("học từ chính giao dịch của mình").

## Idea-fit & kho ý tưởng (trước bước 6 Sản xuất, khi content từ 1 nguồn thô)
1. `/kfsp-content` → phân tích fit (① ý chính ② người đọc nhận được ③ liên kết KFSP) + **Angles**.
2. Lưu vào kho **`content-automation/idea-bank/`** (1 idea = 1 file MD + INDEX) + push Google Sheet qua webhook (`POST n8n.kfsp.vn/webhook/idea-bank`, FULL payload — không cần MCP).
3. **Angles** = nhiều cách triển khai kết nối cho cùng 1 core idea (quote nhân vật / trích sách / câu chuyện). Khi dựng **content hero** → liệt kê nhiều angle, chọn 1 angle chính (hoặc A/B), ghi angle đã dùng. 1 core idea + N angle = nguyên liệu cho cả chuỗi content, đẻ ra cả Persona 1 (fanpage) + Persona 2 (video Chứng khoán trong tầm tay).
> Chi tiết + payload: `content-automation/idea-bank/README.md`.

## 🔴 Checklist trước khi xuất content tài chính (rule Module 4)
- [ ] Không khoe %/tiền/làm giàu nhanh
- [ ] Không hứa mua-bán mã chắc thắng ("phím hàng")
- [ ] Có disclaimer rủi ro
- [ ] Framing giáo dục (dạy trước, mời dùng app sau)
- [ ] Đúng version theo kênh (TikTok chặt nhất — self-check 10/10)
- [ ] CTA có UTM

## Campaign mẫu khuyến nghị chạy đầu (Land test v1)
**"Onboarding 7 ngày"** — drive NĐT mới tải app + đi hết lộ trình 7 ngày → activation. Lý do: khớp Initiative Free-Trial đang chạy, dễ đo, content có sẵn spine (7 ngày × 8 bước).

## Changelog
- 2026-06-04: v1 — bản đồ funnel 15 skill + quy trình 8 bước + spine + checklist.
