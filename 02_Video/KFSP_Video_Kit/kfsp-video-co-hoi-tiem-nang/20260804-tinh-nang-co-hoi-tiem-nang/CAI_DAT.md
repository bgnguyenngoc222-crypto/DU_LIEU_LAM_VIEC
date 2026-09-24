# HƯỚNG DẪN CÀI ĐẶT — dựng lại dự án y hệt máy gốc

> Gói này **không kèm thư viện** (`node_modules` nặng 637 MB). Chạy đúng các bước dưới là máy bạn có bản y hệt máy Thanh.
> Thời gian: khoảng 10 đến 15 phút, phần lớn là chờ tải thư viện.

---

## BƯỚC 0 — Kiểm máy có đủ đồ nghề chưa

Mở Terminal, dán từng dòng:

```bash
node -v
npm -v
ffmpeg -version | head -1
```

Kết quả cần đạt:

| Công cụ | Bản trên máy gốc | Tối thiểu |
|---|---|---|
| Node.js | v24.13.1 | **v18 trở lên** |
| npm | 11.8.0 | đi kèm Node |
| ffmpeg | 8.0.1 | bản nào cũng được |

**Nếu thiếu Node.js:** tải ở https://nodejs.org (chọn bản LTS).

**Nếu thiếu ffmpeg** (dùng để cắt clip và soi lỗi):
```bash
# macOS
brew install ffmpeg
# Windows
winget install ffmpeg
```

> ffmpeg **không bắt buộc** để render video. Nó chỉ cần khi bạn muốn cắt lại clip quay màn hình hoặc soi lỗi bằng cách trích hình. Nhưng nên có.

---

## BƯỚC 1 — Giải nén và vào thư mục

```bash
# giải nén vào chỗ bạn muốn, ví dụ Desktop
cd ~/Desktop
unzip kfsp-video-co-hoi-tiem-nang.zip

cd 20260804-tinh-nang-co-hoi-tiem-nang/remotion
```

> 🔴 **Lưu ý về đường dẫn:** trên máy gốc dự án nằm ở `~/Desktop/VIDEO KFSP/20260804-tinh-nang-co-hoi-tiem-nang/`. Bạn để ở đâu cũng được — mọi đường dẫn trong mã đều là đường dẫn tương đối. Nhưng **tránh để trong thư mục đồng bộ đám mây** (OneDrive, Google Drive, iCloud): thư viện có hàng chục nghìn tệp nhỏ, đồng bộ sẽ rất chậm và dễ hỏng.

---

## BƯỚC 2 — Cài thư viện

```bash
npm install
```

Tải khoảng **637 MB**, mất 3 đến 10 phút tuỳ mạng. Có cảnh báo `npm warn` là bình thường, cứ kệ.

Lệnh này đọc `package.json` và `package-lock.json` đã khoá sẵn phiên bản, nên bạn nhận **đúng** bộ thư viện như máy gốc:

```
remotion 4.0.448              lõi
@remotion/cli 4.0.448         dòng lệnh render
@remotion/three 4.0.448       cầu nối 3D
@remotion/media 4.0.448       dán video lên vật thể 3D
@react-three/fiber 8.17.10    ba chiều
@react-three/drei 9.114.0     tiện ích ba chiều
three 0.169.0                 thư viện 3D gốc
react 18.3.1 · react-dom 18.3.1
typescript 5.6.3
```

> ⚠️ **Đừng chạy `npm update` hay `npm audit fix --force`.** Nó sẽ nâng phiên bản và làm lệch khỏi máy gốc. Bản Remotion phải đúng 4.0.448 vì các gói `@remotion/*` bắt buộc cùng số hiệu.

---

## BƯỚC 3 — Kiểm tra cài đúng chưa

```bash
npx remotion versions
```

Phải hiện **"All packages have the correct version."** Dòng `Extra packages: zod` là bình thường.

Render thử một khung hình:

```bash
npx remotion still Doc /tmp/thu.png --frame=250
```

Mở `/tmp/thu.png` — phải thấy chiếc điện thoại hiện danh sách "Cơ hội tiềm năng" trên nền trắng, kèm một thẻ chữ mờ.

---

## BƯỚC 4 — Chạy bản xem trước

```bash
npm run studio
```

Trình duyệt mở ở `http://localhost:3804`. Bên trái có **bốn mục**:

| Mục | Là gì |
|---|---|
| `Doc` | 1080×1920 — TikTok, Reels, Shorts |
| `Vuong` | 1080×1350 — Fanpage Facebook |
| `Ngang` | 1920×1080 — YouTube, website |
| `Thu3D` | Bản thử khung điện thoại 3D, 5 giây |

Kéo thanh thời gian để xem. Sửa mã trong `src/` là bản xem trước tự cập nhật.

---

## BƯỚC 5 — Xuất video

```bash
npm run render:doc      # 1080×1920
npm run render:vuong    # 1080×1350
npm run render:ngang    # 1920×1080
```

Mỗi bản mất khoảng 2 đến 5 phút, ra ở thư mục `out/`.

Xuất bản thử 3D:
```bash
npx remotion render Thu3D out/thu-3d.mp4
```

---

## BƯỚC 6 (tuỳ chọn) — Cài bộ skill Remotion chính chủ

Nếu bạn dùng AI để sửa mã (Claude Code, Antigravity, Codex, Gemini CLI, Copilot), **nên cài**. Nó dạy AI viết mã Remotion đúng chuẩn, tránh cả loạt lỗi mà phiên trước đã mắc.

```bash
cd <thư mục cha chứa dự án>
npx skills add remotion-dev/skills
```

Cài ra `.agents/skills/remotion-*` — 11 bộ, dùng chung cho mọi trợ lý AI. Quan trọng nhất là `remotion-markup/`.

---

## Trục trặc hay gặp

| Hiện tượng | Nguyên nhân | Cách chữa |
|---|---|---|
| `Could not find a tsconfig.json` | Thiếu tệp cấu hình TypeScript | Đã có sẵn trong gói. Kiểm bạn đang đứng đúng thư mục `remotion/` |
| Render 3D báo lỗi, gợi ý *"set the OpenGL renderer to angle"* | Chưa bật trình dựng đồ hoạ | Đã có sẵn trong `remotion.config.ts`. Kiểm tệp đó còn dòng `Config.setChromiumOpenGlRenderer("angle")` không |
| Màn hình điện thoại đen thui trong cảnh 3D | Thiếu `@remotion/media` hoặc chưa chuẩn hoá toạ độ ảnh | Chạy lại `npm install`. Nếu vẫn đen thì xem `HANDOVER.md` phần 7.4 |
| Video render ra khung trống chỗ đáng lẽ có clip | Dùng `<Video>` thay vì `<OffthreadVideo>` | Trong `Main.tsx` phải là `OffthreadVideo`. `<Video>` chỉ chạy ở bản xem trước |
| `npm install` báo lỗi quyền | Đang cài trong thư mục hệ thống | Chuyển dự án ra Desktop rồi cài lại |
| Studio không mở được cổng 3804 | Cổng đang bận | Sửa số cổng trong `package.json`, mục `scripts.studio` |

---

## Việc đầu tiên nên làm sau khi cài xong

1. Đọc **`HANDOVER.md`** — toàn bộ tiến trình phiên trước, mười lỗi đã mắc, mười nguyên tắc. Đọc trước khi sửa bất cứ dòng mã nào.
2. Đọc **`STORYBOARD.md`** — bảng phân cảnh và toàn bộ chữ trong video.
3. Mở `src/timing.ts` — **mọi mốc giờ của video nằm ở đây**, sửa một chỗ là cả video đổi theo.

---

## Ba luật cứng khi sửa video này

1. **Không cắt nội dung màn hình quay được.** Muốn phóng to thì phóng cả khung điện thoại. Khi máy nằm ngang, chiều dài máy không được vượt bề ngang khung hình.
2. **Nội dung chữ:** không khoe phần trăm lợi nhuận, không gọi điểm thị trường, không phím hàng, không dùng dấu gạch ngang dài, không hạ thấp người xem. Đoạn đóng bắt buộc có câu *"Đưa chứng khoán về tầm tay bạn"*.
3. **Soi lỗi bằng video đã render, không bằng ảnh tĩnh:**
   ```bash
   npm run render:doc
   ffmpeg -i out/co-hoi-tiem-nang-doc.mp4 -vf "fps=4,scale=150:-1" /tmp/v_%03d.jpg
   cd /tmp && ffmpeg -pattern_type glob -i "v_0[0-3]*.jpg" -vf tile=13x3 -frames:v 1 q1.png
   ```
   Rồi mở `q1.png` xem một lượt. Chín trong mười lỗi của phiên trước chỉ lộ ra theo cách này.

---

## Giấy phép — đọc trước khi dùng cho việc thật

**Remotion không miễn phí với KFSP.** Bản miễn phí chỉ dành cho cá nhân, tổ chức phi lợi nhuận và doanh nghiệp **tối đa 3 người**. KFSP có 5 người nên đã mua giấy phép doanh nghiệp **1 chỗ ngồi** (Thanh, ngày 04/08/2026).

Nghĩa là: **bạn được dùng dự án này cho công việc KFSP**, làm video thương mại không giới hạn số lượng. Nhưng nếu có **thêm người trong đội trực tiếp dựng video bằng Remotion** thì phải mua thêm chỗ ngồi — báo Thanh trước.

Cấm: đem chính Remotion đi bán lại, cho thuê hay cấp phép lại. Không cấm dùng nó làm video bán hàng.

Chi tiết: `HANDOVER.md` phần 9.
