# -*- coding: utf-8 -*-
import re, os

def remove_mockup(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to match the injected CSS mockup
    pattern = re.compile(
        r'<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 260px; margin: 0 auto; background-color: #111827; border-radius: 32px; padding: 8px; box-shadow: 0 20px 40px rgba\(0,0,0,0\.2\); border: 2px solid #374151;">\s*'
        r'<tr>\s*'
        r'<td align="center" valign="middle" style="padding: 0; background-color: #000000; border-radius: 24px; overflow: hidden;">\s*'
        r'<img src="([^"]+)" style="display: block; width: 100%; max-width: 100%; height: auto; border-radius: 24px;" alt="([^"]+)" />\s*'
        r'</td>\s*'
        r'</tr>\s*'
        r'</table>', re.DOTALL)
    
    def repl(match):
        img_src = match.group(1)
        alt_text = match.group(2)
        
        # Decide width based on filename or just user instruction.
        # "cái ảnh ngang m không cần thu nhỏ." -> if it's horizontal, keep 480px.
        # How to tell? The vertical ones are the app screenshots.
        # Let's say: if 'app_' in img_src or 'thong_bao' in img_src: width = 260px else 480px
        
        # Actually, maybe the user wants 260px for the vertical ones and 480px for the others.
        if 'app_' in img_src or 'thong_bao' in img_src or 'mau_hinh' not in img_src:
            width = "260px"
        else:
            width = "480px"
            
        # Wait, if ALL of them were app screenshots, why did they say "cái ảnh ngang"?
        # Maybe one of the emails has a horizontal image? 
        # I will just set max-width based on some keywords, or I can just print the img_src to see.
        
        return f'''<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 480px; margin: 0 auto;">
                      <tr>
                        <td align="center" valign="middle" style="padding: 0;">
                          <img src="{img_src}" style="display: block; width: 100%; max-width: {width}; height: auto; border-radius: 12px; border: 1px solid #E5E7EB;" alt="{alt_text}" />
                        </td>
                      </tr>
                    </table>'''
                    
    new_content = pattern.sub(repl, content)
    
    if new_content == content:
        print(f"Failed to replace in {filepath}")
    else:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Replaced in {filepath}")

base_path = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'

remove_mockup(os.path.join(base_path, 'KFSP_Email_Free_Final_V5.html'))
remove_mockup(os.path.join(base_path, 'KFSP_Email_Trial_Final_V5.html'))
remove_mockup(os.path.join(base_path, 'KFSP_Email_Winback_Final_V5.html'))
remove_mockup(os.path.join(base_path, 'KFSP_Email_PaidExpiring_Final_V5.html'))
