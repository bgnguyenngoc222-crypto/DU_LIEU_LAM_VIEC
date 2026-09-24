# -*- coding: utf-8 -*-
import re, os

def update_headline(filepath, new_top, new_bottom):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to replace everything between > and <br> inside the h1
    # and everything between <span ...> and </span>
    
    # The structure is:
    # <h1 style="...">
    #   OLD_TOP<br>
    #   <span style="color: #FDE68A;">OLD_BOTTOM</span>
    # </h1>
    
    # Regex to match the headline structure
    pattern = re.compile(r'(<h1[^>]*>)\s*([^<]*?)<br>\s*<span([^>]*)>([^<]*?)</span>\s*</h1>', re.DOTALL)
    
    def repl(match):
        h1_tag = match.group(1)
        span_tag = match.group(3)
        return f'{h1_tag}\n                            {new_top}<br>\n                            <span{span_tag}>{new_bottom}</span>\n                          </h1>'
    
    new_content = pattern.sub(repl, content)
    
    if new_content == content:
        print(f"Failed to replace in {filepath}")
    else:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Replaced in {filepath}")

base_path = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'

# Free
update_headline(os.path.join(base_path, 'KFSP_Email_Free_Final_V5.html'), 
    "ĐÃ QUAN SÁT ĐỦ", "NẮM BẮT CƠ HỘI")

# Trial
update_headline(os.path.join(base_path, 'KFSP_Email_Trial_Final_V5.html'), 
    "ĐỪNG VỘI BỎ LỠ", "NẮM GIỮ ĐẶC QUYỀN")

# Winback
update_headline(os.path.join(base_path, 'KFSP_Email_Winback_Final_V5.html'), 
    "TRỞ LẠI ĐƯỜNG ĐUA", "LẤY LẠI PHONG ĐỘ")

# Paid
update_headline(os.path.join(base_path, 'KFSP_Email_PaidExpiring_Final_V5.html'), 
    "GIỮ VỮNG ĐỒNG HÀNH", "SẴN SÀNG NHỊP TĂNG TRƯỞNG")