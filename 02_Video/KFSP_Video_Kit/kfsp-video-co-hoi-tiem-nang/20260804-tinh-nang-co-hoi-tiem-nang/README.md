# Video giới thiệu tính năng "Cơ hội tiềm năng" — KFSP

Dự án dựng video bằng **Remotion** (viết mã ra video). Ba khổ: dọc cho TikTok, vuông cho Fanpage, ngang cho YouTube.

---

## Bắt đầu từ đâu

| Bạn là | Đọc theo thứ tự |
|---|---|
| **Người mới nhận dự án** | `CAI_DAT.md` → `HANDOVER.md` → `STORYBOARD.md` |
| **Chỉ cần chạy cho ra video** | `CAI_DAT.md` bước 0 đến 5 là đủ |
| **AI được giao tiếp tục việc** | `PROMPT_PHIEN_MOI.md` — dán nguyên khối vào phiên mới |

---

## Các tệp trong gói

| Tệp | Nội dung |
|---|---|
| **`CAI_DAT.md`** | Cài đặt từ máy trắng: kiểm đồ nghề, cài thư viện, chạy thử, xuất video, bảng trục trặc hay gặp |
| **`HANDOVER.md`** 🔴 | **Tệp quan trọng nhất.** Toàn bộ tiến trình phiên dựng đầu tiên: phân tích video mẫu, các ngã rẽ sai và cách phát hiện, mười lỗi đã mắc, cấu trúc dự án, bản đồ tệp mã, mười nguyên tắc kế thừa, toàn bộ đường dẫn nguồn đã dùng |
| **`STORYBOARD.md`** | Bảng phân cảnh chi tiết, toàn bộ chữ xuất hiện trong video, đối chiếu luật cứng KFSP |
| `KICH_BAN_PHAN_CANH.md` | Bản phác ban đầu, giữ để đối chiếu ý đồ |
| **`PROMPT_PHIEN_MOI.md`** | Prompt mở phiên AI mới để hoàn thiện video |
| `tai-lieu-tham-khao/` | Bản sao các tài liệu tra cứu (xem dưới) |
| `screen-rec/` | Ba clip quay màn hình gốc |
| `remotion/` | Mã nguồn và tài nguyên |

### Trong `tai-lieu-tham-khao/`

| Tệp | Nội dung |
|---|---|
| `BAI_HOC_DA_DUC.md` | 8 bài học riêng cho loại video giới thiệu tính năng |
| `REMOTION_RESOURCES.md` | Nguồn Remotion chính chủ, so sánh hai đường dựng: quay màn hình thật hay dựng lại giao diện bằng mã |
| `MOCKUP_3D.md` | Ba mức khung điện thoại, 14 kiểu chuyển động mockup, thư viện mẫu video tham khảo, ghi chép dựng 3D |
| `GIAY_PHEP.md` | Giấy phép Remotion, Rotato, Arcade, model 3D, ảnh mockup |

---

## Ba việc hay làm nhất

```bash
cd remotion
npm install             # lần đầu, tải khoảng 637 MB
npm run studio          # xem trước và tua tay
npm run render:doc      # xuất bản dọc cho TikTok
```

Mọi mốc giờ của video nằm ở `remotion/src/timing.ts`.

---

## Ba luật cứng khi sửa

1. **Không cắt nội dung màn hình quay được.** Muốn phóng to thì phóng cả khung điện thoại.
2. **Chữ:** không khoe phần trăm lợi nhuận, không gọi điểm thị trường, không phím hàng. Đoạn đóng bắt buộc có câu *"Đưa chứng khoán về tầm tay bạn"*.
3. **Soi lỗi bằng video đã render, không bằng ảnh tĩnh.** Cách làm ở `CAI_DAT.md` cuối trang.

---

## Hai điều cần biết trước khi dùng

**Giấy phép Remotion.** KFSP đã mua **1 chỗ ngồi**. Bạn được dùng cho công việc KFSP, làm video thương mại không giới hạn. Nhưng nếu **thêm người trực tiếp dựng video bằng Remotion** thì phải mua thêm chỗ — báo Thanh trước.

**Nội dung nhạy cảm trong clip.** Ba clip quay màn hình chứa **mã cổ phiếu và phần trăm lãi thật**. Video làm ra chỉ nên đăng tự nhiên kèm dòng miễn trừ trách nhiệm; **đem chạy quảng cáo trả tiền trên Meta hay TikTok thì rủi ro bị từ chối cao**. Muốn dùng cho quảng cáo thì phải làm mờ mã và phần trăm trước.

---

## Trạng thái

Ba khổ đã render xong và sạch lỗi. **Còn thiếu nhạc nền.** Bản thử khung điện thoại 3D đã chạy được nhưng chưa ghép vào video chính — chi tiết ở `HANDOVER.md` phần 12.
