# -*- coding: utf-8 -*-
import re, os

def fix_image_width(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to change max-width: 260px to max-width: 480px for specific images
    
    # Match the img tag for app_chart_cho_xac_nhan.jpg
    content = re.sub(
        r'<img src="(https://cdn.jsdelivr.net/gh/kfspteam/email-assets@main/2026_09_08_nhac_nho_10_ngay/app_chart_cho_xac_nhan.jpg)" style="display: block; width: 100%; max-width: 260px;',
        r'<img src="\1" style="display: block; width: 100%; max-width: 480px;',
        content
    )
    
    # Match the img tag for app_thong_bao.png
    content = re.sub(
        r'<img src="(https://cdn.jsdelivr.net/gh/kfspteam/email-assets@main/2026_09_08_nhac_nho_10_ngay/app_thong_bao.png)" style="display: block; width: 100%; max-width: 260px;',
        r'<img src="\1" style="display: block; width: 100%; max-width: 480px;',
        content
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

base_path = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'

fix_image_width(os.path.join(base_path, 'KFSP_Email_Free_Final_V5.html'))
fix_image_width(os.path.join(base_path, 'KFSP_Email_Winback_Final_V5.html'))

print("Done")