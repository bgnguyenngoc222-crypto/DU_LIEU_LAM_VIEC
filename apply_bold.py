# -*- coding: utf-8 -*-
import os

def bold_text(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
        else:
            print(f"Warning: Text not found in {filepath} -> '{old}'")
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

base_path = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'

# 1. FREE
free_repl = [
    ("một nhà đầu tư có hệ thống có thể quét toàn bộ 1.700 mã đó", 
     "một nhà đầu tư có hệ thống có thể <strong>quét toàn bộ 1.700 mã đó</strong>"),
    ("lọc ra danh sách ngắn những mã đáng chú ý nhất", 
     "<strong>lọc ra danh sách ngắn những mã đáng chú ý nhất</strong>"),
    ("trả tiền cho khi bạn tìm đúng mã vào đúng thời điểm.", 
     "trả tiền cho khi bạn <strong>tìm đúng mã vào đúng thời điểm</strong>.")
]
bold_text(os.path.join(base_path, 'KFSP_Email_Free_Final_V5.html'), free_repl)

# 2. TRIAL
trial_repl = [
    ("thiếu kiên nhẫn ở giai đoạn tích lũy", 
     "<strong>thiếu kiên nhẫn ở giai đoạn tích lũy</strong>"),
    ("quyết định toàn bộ lợi nhuận phía sau", 
     "<strong>quyết định toàn bộ lợi nhuận phía sau</strong>"),
    ("chuẩn bị sẵn vị thế quan sát cho một chân sóng lớn", 
     "<strong>chuẩn bị sẵn vị thế quan sát cho một chân sóng lớn</strong>")
]
bold_text(os.path.join(base_path, 'KFSP_Email_Trial_Final_V5.html'), trial_repl)

# 3. WINBACK
winback_repl = [
    ("thị trường không ngừng vận hành, dòng tiền cũng không đợi ai", 
     "<strong>thị trường không ngừng vận hành, dòng tiền cũng không đợi ai</strong>"),
    ("lặng lẽ hình thành đáy và vượt vùng break", 
     "<strong>lặng lẽ hình thành đáy và vượt vùng break</strong>")
]
bold_text(os.path.join(base_path, 'KFSP_Email_Winback_Final_V5.html'), winback_repl)

# 4. PAID
paid_repl = [
    ("kỷ luận", "kỷ luật"), # Fix typo first
    ("nuôi dưỡng một quán tính quan sát có kỷ luật", 
     "<strong>nuôi dưỡng một quán tính quan sát có kỷ luật</strong>"),
    ("sự đứt quãng theo dõi chính là rủi ro lớn nhất", 
     "<strong>sự đứt quãng theo dõi chính là rủi ro lớn nhất</strong>"),
    ("mất toàn bộ ngữ cảnh, lỡ mất tín hiệu cảnh báo tại điểm bứt phá", 
     "<strong>mất toàn bộ ngữ cảnh, lỡ mất tín hiệu cảnh báo tại điểm bứt phá</strong>")
]
bold_text(os.path.join(base_path, 'KFSP_Email_PaidExpiring_Final_V5.html'), paid_repl)

print("Updates applied.")