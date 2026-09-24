# -*- coding: utf-8 -*-
import re, os

def mockup_phone(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to find the table that wraps the img (the vertical app screenshots)
    # The image src contains 'email-assets@main/2026_09_08_nhac_nho_10_ngay/'
    
    pattern = re.compile(
        r'<table width="100%" cellpadding="0" cellspacing="0" border="0"\s*style="max-width: 480px; margin: 0 auto;">\s*'
        r'<tr>\s*'
        r'<td align="center" valign="middle" style="padding: 0;">\s*'
        r'<img\s*'
        r'src="([^"]+)"\s*'
        r'style="display: block; width: 100%; max-width: 100%; height: auto; border-radius: 12px; border: 1px solid #E5E7EB;"\s*'
        r'alt="([^"]+)" />\s*'
        r'</td>\s*'
        r'</tr>\s*'
        r'</table>', re.DOTALL)
    
    def repl(match):
        img_src = match.group(1)
        alt_text = match.group(2)
        
        # New CSS Phone Mockup Wrapper
        # max-width: 280px to reduce size
        return f'''<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 260px; margin: 0 auto; background-color: #111827; border-radius: 32px; padding: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); border: 2px solid #374151;">
                      <tr>
                        <td align="center" valign="middle" style="padding: 0; background-color: #000000; border-radius: 24px; overflow: hidden;">
                          <img src="{img_src}" style="display: block; width: 100%; max-width: 100%; height: auto; border-radius: 24px;" alt="{alt_text}" />
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

mockup_phone(os.path.join(base_path, 'KFSP_Email_Free_Final_V5.html'))
mockup_phone(os.path.join(base_path, 'KFSP_Email_Trial_Final_V5.html'))
mockup_phone(os.path.join(base_path, 'KFSP_Email_Winback_Final_V5.html'))
mockup_phone(os.path.join(base_path, 'KFSP_Email_PaidExpiring_Final_V5.html'))
