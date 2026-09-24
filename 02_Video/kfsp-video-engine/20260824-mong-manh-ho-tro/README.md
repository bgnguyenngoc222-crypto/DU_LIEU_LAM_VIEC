# Hướng dẫn nạp tài nguyên (Asset) cho Video: Sự mỏng manh của các ngưỡng hỗ trợ

## 1. Nạp file Voiceover (Âm thanh)
Vì bạn sẽ tự tạo file voice, vui lòng làm theo các bước sau:
1. Xuất file âm thanh có định dạng `.mp3` hoặc `.wav`.
2. Lưu file vào thư mục: `c:\NGUYEN NGOC MKT\ANTI GRAVITY\02_Video\kfsp-video-engine\20260824-mong-manh-ho-tro\audio\`
3. Đặt tên file là `voice.mp3` (hoặc `voice.wav`).

*Lưu ý: Nếu bạn có nhiều file audio ghép lại, hãy nối chúng thành một file duy nhất để dễ dàng đồng bộ với video.*

## 2. Nạp Video màn hình (Screen Recording)
Video này giới thiệu tính năng Chấm điểm 4M và CANSLIM trên app KFSP. Bạn hãy chuẩn bị video quay màn hình thao tác tính năng này.
1. Xuất file video định dạng `.mp4` (tỷ lệ dọc 9:16, độ phân giải khuyến nghị 1080x1920).
2. Lưu file vào thư mục: `c:\NGUYEN NGOC MKT\ANTI GRAVITY\02_Video\kfsp-video-engine\20260824-mong-manh-ho-tro\brand\`
3. Đặt tên file là `app_recording.mp4`.

## 3. Cập nhật thời lượng (Timing)
File `sentences.json` hiện đang sử dụng thời lượng giả định (`duration_s`). Sau khi có file `voice.mp3` chính thức, chúng ta sẽ cần đo lại thời lượng thực tế của từng câu (bằng công cụ hoặc nghe thủ công) để điền lại con số chính xác vào `sentences.json`. Điều này giúp phụ đề và hiệu ứng chuyển cảnh khớp hoàn toàn với giọng đọc.

## 4. Hình ảnh minh họa (2D Vector Style)
Đối với các phân cảnh HOOK ban đầu (nói về ngưỡng hỗ trợ yếu ớt, tảng đá lăn), tôi sẽ sử dụng prompt để gen hình ảnh minh họa theo chuẩn 2D Vector. Những hình ảnh này sẽ được lưu vào thư mục `nobrand\`.

Sau khi bạn đã nạp đủ Voice và Screen Recording, hãy báo cho tôi biết để tôi tiến hành nối ráp (Composition) trong Remotion nhé!
