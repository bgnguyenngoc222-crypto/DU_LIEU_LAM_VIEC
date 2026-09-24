# -*- coding: utf-8 -*-
import re, os

base_path = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'
files = {
    'KFSP_Email_Free_Final_V5.html': {
        'bg': '#F0FDF4', 'border': '#D1FAE5', 'shadow': 'rgba(16,185,129,0.05)'
    },
    'KFSP_Email_Trial_Final_V5.html': {
        'bg': '#EFF6FF', 'border': '#DBEAFE', 'shadow': 'rgba(59,130,246,0.05)'
    },
    'KFSP_Email_Winback_Final_V5.html': {
        'bg': '#FEFCE8', 'border': '#FEF08A', 'shadow': 'rgba(234,179,8,0.05)'
    },
    'KFSP_Email_PaidExpiring_Final_V5.html': {
        'bg': '#FDF2F8', 'border': '#FBCFE8', 'shadow': 'rgba(219,39,119,0.05)'
    }
}

for filename, colors in files.items():
    filepath = os.path.join(base_path, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update image wrapper
    # The current wrapper is:
    # <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: (260px|480px); margin: 0 auto;">
    #   <tr>
    #     <td align="center" valign="middle" style="padding: 0;">
    #       <img src="..." style="display: block; width: 100%; max-width: (260px|480px); height: auto; border-radius: 12px; border: 1px solid #E5E7EB;" ... />
    
    # We want to replace the td style and the img border.
    def repl_img(m):
        table_width = m.group(1)
        img_src = m.group(2)
        img_width = m.group(3)
        alt_text = m.group(4)
        
        return f'''<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: {table_width}; margin: 0 auto;">
                      <tr>
                        <td align="center" valign="middle" style="padding: 16px; background-color: {colors['bg']}; border-radius: 20px; border: 1px solid {colors['border']}; box-shadow: 0 10px 25px {colors['shadow']};">
                          <img src="{img_src}" style="display: block; width: 100%; max-width: 100%; height: auto; border-radius: 8px; border: 1px solid {colors['border']};" alt="{alt_text}" />
                        </td>
                      </tr>
                    </table>'''

    content = re.sub(
        r'<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: (260px|480px); margin: 0 auto;">\s*'
        r'<tr>\s*'
        r'<td align="center" valign="middle" style="padding: 0;">\s*'
        r'<img src="([^"]+)" style="display: block; width: 100%; max-width: (260px|480px); height: auto; border-radius: 12px; border: 1px solid #E5E7EB;" alt="([^"]+)" />\s*'
        r'</td>\s*'
        r'</tr>\s*'
        r'</table>',
        repl_img,
        content
    )

    # 2. Center the text after quote
    # The text after quote is in <p> tags that don't have text-align: center
    # "các text ở sau phần trích dẫn m căn giữa luôn đi" -> probably all paragraphs in the body before the image.
    # Let's just add text-align: center to <p> tags that are currently left-aligned.
    # I'll replace <p style="margin: 0 0 14px 0; font-size: 14px; color: #111827; line-height: 1.7;">
    # and <p style="margin: 0; font-size: 14px; color: #111827; line-height: 1.7;">
    # with adding text-align: center;
    
    content = content.replace(
        'style="margin: 0 0 14px 0; font-size: 14px; color: #111827; line-height: 1.7;"',
        'style="margin: 0 0 14px 0; font-size: 14px; color: #111827; line-height: 1.7; text-align: center;"'
    )
    content = content.replace(
        'style="margin: 0; font-size: 14px; color: #111827; line-height: 1.7;"',
        'style="margin: 0; font-size: 14px; color: #111827; line-height: 1.7; text-align: center;"'
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updates applied.")