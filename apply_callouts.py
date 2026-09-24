# -*- coding: utf-8 -*-
import re, os

def replace_with_callout(filepath, target_text, border_color, bg_color):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create regex to match the target text even with newlines and spaces
    pattern = r'\s*'.join(re.escape(word) for word in target_text.split())
    
    # We want to find the <p> tag that contains this text
    # It looks like: <p style="...">...target_text...</p>
    p_pattern = re.compile(r'<p\s+[^>]*>([^<]*?)(' + pattern + r')([^<]*?)</p>', re.DOTALL)
    
    def repl(match):
        prefix_text = match.group(1).strip()
        matched_text = match.group(2)
        suffix_text = match.group(3).strip()
        
        replacement = ""
        # If there is prefix text, we need to keep it as a paragraph before the box
        if prefix_text:
            replacement += f'<p style="margin: 0 0 16px 0; font-size: 14px; color: #111827; line-height: 1.7;">{prefix_text}</p>\n                    '
            
        replacement += f'''<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 16px 0;">
                      <tr>
                        <td style="border-left: 3px solid {border_color}; background-color: {bg_color}; padding: 14px 16px; border-radius: 0 8px 8px 0;">
                          <p style="margin: 0; font-size: 14px; color: #111827; line-height: 1.7;">
                            <strong>{target_text}</strong>
                          </p>
                        </td>
                      </tr>
                    </table>'''
                    
        if suffix_text:
            replacement += f'\n                    <p style="margin: 0 0 16px 0; font-size: 14px; color: #111827; line-height: 1.7;">{suffix_text}</p>'
            
        return replacement
    
    new_content = p_pattern.sub(repl, content)
    
    if new_content == content:
        print(f"Failed to replace in {filepath}")
    else:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Replaced in {filepath}")

base_path = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'

# Free: Xanh lá
replace_with_callout(os.path.join(base_path, 'KFSP_Email_Free_Final_V5.html'), 
    "Thứ bạn thực sự cần là đặt nỗ lực của mình vào đúng nơi: Tập trung ra quyết định dựa trên một danh sách đã được tinh lọc.", 
    "#10B981", "#ECFDF5")

# Trial: Xanh biển nhạt
replace_with_callout(os.path.join(base_path, 'KFSP_Email_Trial_Final_V5.html'), 
    "Đừng để hành trình theo dõi bị ngắt quãng chỉ vì thời gian dùng thử kết thúc, ngay đúng thời điểm những mẫu hình bạn theo dõi bấy lâu chuẩn bị phát tín hiệu kích hoạt.", 
    "#3B82F6", "#EFF6FF")

# Winback: Cam nhạt
replace_with_callout(os.path.join(base_path, 'KFSP_Email_Winback_Final_V5.html'), 
    "Thị trường không thiếu cơ hội, và điều bạn cần làm chính là quay trở lại cùng với một công cụ dò tìm tiên tiến hơn, đừng để dòng tiền của thị trường đi ngang và vụt mất những cơ hội đã bày sẵn trước mắt. Đã đến lúc bạn cần quay trở lại.", 
    "#F59E0B", "#FFFBEB")

# Paid: Hồng tím
replace_with_callout(os.path.join(base_path, 'KFSP_Email_PaidExpiring_Final_V5.html'), 
    "Bạn đã gieo hạt và chăm chút cái cây của mình qua giai đoạn tích lũy. Đừng nhổ nó lên ngay trước khi tán lá đủ rộng để che bóng mát, hãy để nó lớn lên và kết trái ngọt cho bạn qua từng mùa sóng của thị trường.", 
    "#D946EF", "#FDF4FF")