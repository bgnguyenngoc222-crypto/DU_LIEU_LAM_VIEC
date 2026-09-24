# -*- coding: utf-8 -*-
import os, sys, re

sys.stdout.reconfigure(encoding='utf-8')

def bold_text(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        # Construct a regex that allows any whitespace between words
        escaped_old = re.escape(old)
        pattern = escaped_old.replace(r'\ ', r'\s+')
        
        # New text needs to wrap the matched text in <strong> tags
        def repl(m):
            return f'<strong>{m.group(0)}</strong>'
            
        content, count = re.subn(pattern, repl, content)
        if count == 0:
            print(f"Warning: Text not found in {filepath} -> '{old}'")
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

base_path = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'

# 1. FREE
free_repl = [
    ("quét toàn bộ 1.700 mã đó", ""),
    ("lọc ra danh sách ngắn những mã đáng chú ý nhất", ""),
    ("tìm đúng mã vào đúng thời điểm", "")
]
bold_text(os.path.join(base_path, 'KFSP_Email_Free_Final_V5.html'), free_repl)

# 2. TRIAL
trial_repl = [
    ("thiếu kiên nhẫn ở giai đoạn tích lũy", ""),
    ("quyết định toàn bộ lợi nhuận phía sau", ""),
    ("chuẩn bị sẵn vị thế quan sát cho một chân sóng lớn", "")
]
bold_text(os.path.join(base_path, 'KFSP_Email_Trial_Final_V5.html'), trial_repl)

# 3. WINBACK
winback_repl = [
    ("thị trường không ngừng vận hành, dòng tiền cũng không đợi ai", ""),
    ("lặng lẽ hình thành đáy và vượt vùng break", "")
]
bold_text(os.path.join(base_path, 'KFSP_Email_Winback_Final_V5.html'), winback_repl)

# 4. PAID
paid_repl = [
    ("nuôi dưỡng một quán tính quan sát có kỷ luận", ""),
    ("sự đứt quãng theo dõi chính là rủi ro lớn nhất", ""),
    ("mất toàn bộ ngữ cảnh, lỡ mất tín hiệu cảnh báo tại điểm bứt phá", "")
]
bold_text(os.path.join(base_path, 'KFSP_Email_PaidExpiring_Final_V5.html'), paid_repl)

print("Updates applied.")