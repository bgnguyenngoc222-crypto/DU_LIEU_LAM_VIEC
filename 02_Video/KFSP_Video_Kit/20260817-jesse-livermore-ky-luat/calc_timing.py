import os

FPS = 30
TOTAL_AUDIO_SEC = 130.87

sentences = [
    'Tại sao bạn liên tục kiếm được tiền, rồi lại phải trả lại toàn bộ cho thị trường?',
    'Đừng vội tự trách mình, vì đến cả một huyền thoại vĩ đại nhất lịch sử Phố Wall cũng từng mắc phải sai lầm y hệt.',
    'Năm 1929, giữa lúc cả nước Mỹ khóc than vì chứng khoán sụp đổ, Jesse Livermore bỏ túi 100 triệu USD nhờ một cú bán khống lịch sử.',
    'Nhưng chưa đầy một thập kỷ sau, Con gấu lớn phố Wall hoàn toàn trắng tay, phá sản và tự kết liễu đời mình trong túng quẫn.',
    'Bi kịch của ông bắt nguồn từ một ranh giới rất mỏng manh: Sự vô kỷ luật.',
    'Khi ở đỉnh cao, Livermore đã tự tay xé bỏ bộ nguyên tắc giao dịch do chính mình đúc kết. Ông giao dịch quá tay, lạm dụng đòn bẩy, và quyết định đánh cược theo những lời phím hàng vô căn cứ.',
    'Khi quy tắc bị vứt bỏ, thị trường đã tàn nhẫn lấy lại của ông không sót một đồng.',
    'Kiếm tiền đã khó, giữ tiền còn khó hơn gấp vạn lần. Bạn có thể đúng chín lần, nhưng chỉ cần một lần đánh mất quản trị rủi ro, thành quả của cả thập kỷ sẽ lập tức tan thành mây khói.',
    'Hầu hết chúng ta cũng thường lặp lại vòng lặp chết người ấy: Thắng lớn trong Uptrend, rồi lại trả lại tất cả khi Downtrend ập đến chỉ vì gồng lỗ, nhồi lệnh, hoặc nghe ngóng tin đồn.',
    'Để giữ được cái đầu lạnh, những lời tự hứa là không đủ. Bạn cần một mỏ neo kỷ luật. Và đó là lúc bạn cần đến KFSP.',
    'Thứ nhất, tính năng Nhịp đập thị trường IBD. Giống như một chiếc đèn giao thông, hệ thống sẽ báo hiệu trạng thái thị trường, buộc bạn phải dừng lại khi rủi ro tăng cao, ngăn chặn việc lạm dụng đòn bẩy sai thời điểm.',
    'Thứ hai, Bộ lọc cổ phiếu Canslim và 4M. Thay vì mua theo tin đồn vô căn cứ, bộ lọc sẽ giúp bạn theo dõi sức khỏe thực tế của doanh nghiệp. Triệt tiêu hoàn toàn thói quen đánh cược theo phím hàng - sai lầm chí mạng đã đánh gục Livermore.',
    'Thứ ba, công cụ Quản lý giao dịch. Mọi lệnh mua bán và điểm cắt lỗ đều được ghi nhận trực quan. Bạn phải nhìn vào sức khỏe tài khoản, và tuyệt đối không được bỏ quên những khoản lỗ đang lớn dần.',
    'Kỷ luật là yếu tố sống còn để tồn tại dài hạn. Thay vì chiến đấu bằng bản năng để rồi trắng tay như Livermore, hãy để KFSP trở thành mỏ neo của bạn. Tải app KFSP trên App Store hoặc Google Play ngay hôm nay để bắt đầu hành trình đầu tư kỷ luật.'
]

total_chars = sum(len(s) for s in sentences)
timing_file = os.path.join('remotion', 'src', 'timing.ts')

content = 'export const FPS = 30;\n\nexport const SCENES = {\n'
current_frame = 0

for i, s in enumerate(sentences):
    # Calculate duration based on char ratio
    ratio = len(s) / total_chars
    dur_frames = int(ratio * TOTAL_AUDIO_SEC * FPS)
    s_id = f's{i+1:02d}'
    
    # Handle last frame to ensure exact total frames match
    if i == len(sentences) - 1:
        dur_frames = int(TOTAL_AUDIO_SEC * FPS) - current_frame
        
    escaped_text = s.replace('\'', '')
    content += f'  {s_id}: {{ from: {current_frame}, dur: {dur_frames}, text: "{escaped_text}" }},\n'
    
    current_frame += dur_frames

content += '};\n\n'
content += f'export const TOTAL_FRAMES = {int(TOTAL_AUDIO_SEC * FPS)};\n'

with open(timing_file, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Done! Total frames: {int(TOTAL_AUDIO_SEC * FPS)}')
