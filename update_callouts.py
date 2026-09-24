# -*- coding: utf-8 -*-
import re, os

def update_callout_style(filepath, target_text, border_color, bg_color, shadow):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to match the whole table that contains the target_text
    # Since there might be newlines, we'll use a broad search inside the table
    
    pattern = r'\s*'.join(re.escape(word) for word in target_text.split())
    
    # Match the injected table: <table ...> ... <strong>...target_text...</strong> ... </table>
    # We will just replace it with the new card style.
    table_regex = re.compile(r'<table[^>]*margin:\s*0\s*0\s*16px\s*0;[^>]*>.*?<strong>\s*' + pattern + r'\s*</strong>.*?</table>', re.DOTALL)
    
    def repl(match):
        return f'''<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 16px 0;">
                      <tr>
                        <td align="center">
                          <div style="background-color: {bg_color}; border-radius: 20px; padding: 24px 20px; border: 1px solid {border_color}; box-shadow: {shadow}; font-family: 'Open Sans', Arial, sans-serif;">
                            <p style="margin: 0; font-size: 15px; color: #111827; line-height: 1.6; text-align: center;">
                              {target_text}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>'''
    
    new_content = table_regex.sub(repl, content)
    
    if new_content == content:
        print(f"Failed to replace in {filepath}")
    else:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Replaced in {filepath}")

base_path = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'

# Free: Xanh lá
update_callout_style(os.path.join(base_path, 'KFSP_Email_Free_Final_V5.html'), 
    "Thứ bạn thực sự cần là đặt nỗ lực của mình vào đúng nơi: Tập trung ra quyết định dựa trên một danh sách đã được tinh lọc.", 
    "#D1FAE5", "#F0FDF4", "0 10px 25px rgba(5,150,105,0.05)")

# Trial: Xanh biển nhạt
update_callout_style(os.path.join(base_path, 'KFSP_Email_Trial_Final_V5.html'), 
    "Đừng để hành trình theo dõi bị ngắt quãng chỉ vì thời gian dùng thử kết thúc, ngay đúng thời điểm những mẫu hình bạn theo dõi bấy lâu chuẩn bị phát tín hiệu kích hoạt.", 
    "#DBEAFE", "#EFF6FF", "0 10px 25px rgba(59,130,246,0.05)")

# Winback: Cam nhạt
update_callout_style(os.path.join(base_path, 'KFSP_Email_Winback_Final_V5.html'), 
    "Thị trường không thiếu cơ hội, và điều bạn cần làm chính là quay trở lại cùng với một công cụ dò tìm tiên tiến hơn, đừng để dòng tiền của thị trường đi ngang và vụt mất những cơ hội đã bày sẵn trước mắt. Đã đến lúc bạn cần quay trở lại.", 
    "#FEF08A", "#FEFCE8", "0 10px 25px rgba(234,179,8,0.05)")

# Paid: Hồng tím
update_callout_style(os.path.join(base_path, 'KFSP_Email_PaidExpiring_Final_V5.html'), 
    "Bạn đã gieo hạt và chăm chút cái cây của mình qua giai đoạn tích lũy. Đừng nhổ nó lên ngay trước khi tán lá đủ rộng để che bóng mát, hãy để nó lớn lên và kết trái ngọt cho bạn qua từng mùa sóng của thị trường.", 
    "#FBCFE8", "#FDF2F8", "0 10px 25px rgba(219,39,119,0.05)")