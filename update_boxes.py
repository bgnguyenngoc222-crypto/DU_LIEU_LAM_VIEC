import re

files_info = {
    r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_Winback_Final_V5.html': {
        'search': r'Thị trường không thiếu cơ hội.*?quay trở lại\.',
        'replace': 'Thị trường không thiếu cơ hội, và điều bạn cần làm chính là <strong style="color: #7B3AEC; font-weight: 800;">quay trở lại cùng với một công cụ dò tìm tiên tiến hơn</strong>, đừng để dòng tiền của thị trường đi ngang và <strong style="color: #7B3AEC; font-weight: 800;">vụt mất những cơ hội đã bày sẵn trước mắt</strong>. Đã đến lúc bạn cần quay trở lại.'
    },
    r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_Free_Final_V5.html': {
        'search': r'Thứ bạn thực sự cần là.*?được tinh lọc\.',
        'replace': 'Thứ bạn thực sự cần là đặt nỗ lực của mình vào đúng nơi: <strong style="color: #7B3AEC; font-weight: 800;">Tập trung ra quyết định dựa trên một danh sách đã được tinh lọc</strong>.'
    },
    r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_Trial_Final_V5.html': {
        'search': r'Đừng để hành trình theo dõi ngắt quãng.*?phát tín hiệu kích hoạt\.',
        'replace': '<strong style="color: #7B3AEC; font-weight: 800;">Đừng để hành trình theo dõi ngắt quãng</strong> chỉ vì thời gian dùng thử kết thúc, ngay đúng thời điểm những mẫu hình bạn theo dõi bấy lâu <strong style="color: #7B3AEC; font-weight: 800;">chuẩn bị phát tín hiệu kích hoạt</strong>.'
    },
    r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_PaidExpiring_Final_V5.html': {
        'search': r'Những mã đang tích lũy.*?bị mất đi\.',
        'replace': 'Những mã đang tích lũy và chuẩn bị bứt phá không tự báo hiệu. Chúng cần được <strong style="color: #7B3AEC; font-weight: 800;">theo dõi liên tục từ giai đoạn tích lũy cho tới khi xác nhận</strong>. Bạn đã dần quen với hệ thống, <strong style="color: #7B3AEC; font-weight: 800;">đừng để sự quen thuộc đó bị mất đi</strong>.'
    }
}

for filepath, info in files_info.items():
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Locate the block with padding: 24px 20px
    idx = html.find('padding: 24px 20px')
    if idx != -1:
        start_p = html.find('<p', idx)
        end_p = html.find('</p>', start_p)
        
        if start_p != -1 and end_p != -1:
            old_p_tag = html[start_p:end_p+4]
            # Replace font-size 13px -> 15px
            new_p_tag = re.sub(r'font-size:\s*13px', 'font-size: 15px', old_p_tag)
            # Find inner text
            inner_text_match = re.search(r'(<p[^>]*>)(.*?)(</p>)', new_p_tag, re.DOTALL)
            if inner_text_match:
                prefix = inner_text_match.group(1)
                inner = inner_text_match.group(2)
                suffix = inner_text_match.group(3)
                
                # We know the text, just replace the inner completely using the predefined 'replace'
                # but to be safe, we just use the predefined 'replace' directly
                final_p_tag = prefix + '\n                              ' + info['replace'] + '\n                            ' + suffix
                
                html = html[:start_p] + final_p_tag + html[end_p+4:]
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(html)
                print(f"Updated {filepath.split('\\')[-1]}")