# Prompt mở phiên mới — hoàn thiện video "Cơ hội tiềm năng"

> Dán nguyên khối dưới đây vào phiên Claude Code mới, mở tại thư mục `~/Desktop/VIDEO KFSP/`.

---

Tiếp tục video giới thiệu tính năng "Cơ hội tiềm năng" của KFSP. Phiên trước đã dựng xong bản chạy được, giờ hoàn thiện.

**Đọc trước khi làm bất cứ việc gì, theo đúng thứ tự:**

1. `~/Desktop/VIDEO KFSP/20260804-tinh-nang-co-hoi-tiem-nang/HANDOVER.md` — toàn bộ tiến trình phiên trước: phân tích video mẫu, các ngã rẽ sai, mười lỗi đã mắc và cách chữa, cấu trúc dự án, bản đồ tệp mã, mười nguyên tắc kế thừa. **Đây là tệp quan trọng nhất.**
2. `.../STORYBOARD.md` — bảng phân cảnh, toàn bộ chữ trong video, đối chiếu luật cứng.
3. `~/Library/CloudStorage/OneDrive-Personal/Work/KFSP/.claude/skills/video-kfsp/SKILL.md` — riêng bài học **L22 và L27 đến L33** là của video này.
4. `.../skills/video-kfsp/refs/MOCKUP_3D.md` — cách dựng khung máy 3D và bốn thứ bắt buộc làm đúng.
5. `~/Desktop/VIDEO KFSP/.agents/skills/remotion-markup/` — luật viết mã Remotion chính chủ.

**Bối cảnh dự án:**
- Thư mục làm việc: `~/Desktop/VIDEO KFSP/20260804-tinh-nang-co-hoi-tiem-nang/remotion/`
- Dự án đã **độc lập**: `node_modules` riêng, khoá Remotion 4.0.448, cài sẵn `@remotion/three` · `three` · `@react-three/fiber` · `@react-three/drei` · `@remotion/media`
- Bốn composition: `Doc` 1080×1920 · `Vuong` 1080×1350 · `Ngang` 1920×1080 · `Thu3D` (bản thử khung máy 3D)
- Video chính dài 26,0 giây, 30 hình/giây, đã render xong ba khổ ở `out/`
- KFSP **đã mua giấy phép Remotion 1 chỗ ngồi**

**Ba luật cứng của Thanh, không được vi phạm:**
1. **Không cắt nội dung màn hình quay được.** Muốn phóng to thì phóng cả khung điện thoại. Khi máy nằm ngang, chiều dài máy không được vượt bề ngang khung hình.
2. **Nội dung chữ:** không khoe phần trăm lợi nhuận, không gọi điểm thị trường ("đây là đáy", "thời điểm giải ngân"), không phím hàng, không dùng dấu gạch ngang dài, không hạ thấp người xem. Đoạn đóng bắt buộc có câu "Đưa chứng khoán về tầm tay bạn".
3. **QA bằng video đã render, không bằng ảnh tĩnh.** Cách làm: render → `ffmpeg -i out/x.mp4 -vf "fps=4,scale=150:-1" v_%03d.jpg` → ghép lưới `tile=13x3` → soi một lượt → chỗ nghi ngờ thì render still full rồi cắt cận.

**Việc cần làm, theo thứ tự ưu tiên:**

**A. Hỏi Thanh ba điều còn treo trước khi động vào mã:**
- Nhạc nền: Thanh gửi tệp hay để tôi đề xuất nguồn có giấy phép thương mại?
- Mã cổ phiếu và phần trăm lãi lộ trong clip quay: giữ nguyên và chỉ đăng tự nhiên kèm dòng miễn trừ trách nhiệm, hay làm mờ để dùng được cả cho quảng cáo trả tiền?
- Có chuyển sang khung máy 3D không, hay giữ khung ảnh phẳng?

**B. Nếu Thanh chọn khung máy 3D:**
- Thêm cụm camera và logo KFSP lên **mặt sau** máy (hiện đang trơn)
- Che thanh trạng thái iOS trên màn như bản phẳng đang làm (dải nền app cao 5,2% ở đỉnh màn)
- Ghép khung 3D vào video chính thay cho `PhoneMock.tsx`, giữ nguyên mạch kể và toàn bộ lớp chữ
- Ba kiểu chuyển động đáng thêm khi đã có 3D: **lùi ra hé lộ** · **lia dọc thân máy khoe bề dày và cạnh viền** · **thẻ chú giải bám máy trong không gian 3D** thay vì dán phẳng lên khung hình

**C. Nếu Thanh giữ khung ảnh phẳng:** ghép nhạc nền, xuất bản cuối ba khổ, viết phần mô tả và dòng miễn trừ trách nhiệm cho từng kênh đăng.

**Cách làm việc Thanh mong đợi:**
- Tiếng Việt, đi thẳng trọng tâm, dùng bảng thay vì đoạn văn dài
- Hỏi rõ khi yêu cầu có nhiều cách hiểu, đừng tự suy diễn
- Không tự đăng hay chia sẻ ra ngoài khi chưa được duyệt
- Mỗi lần phát hiện lỗi hay mẹo mới thì ghi ngay vào changelog của skill `video-kfsp`, đánh số tiếp từ **L34**
