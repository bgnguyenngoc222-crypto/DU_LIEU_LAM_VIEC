import re, os
def fix_bug(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # fix missing r=
    content = re.sub(r'(&amp;|&)https%3A', r'\1r=https%3A', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

base_path = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'
fix_bug(os.path.join(base_path, 'KFSP_Email_Free_Final_V5.html'))
fix_bug(os.path.join(base_path, 'KFSP_Email_Trial_Final_V5.html'))
fix_bug(os.path.join(base_path, 'KFSP_Email_Winback_Final_V5.html'))
fix_bug(os.path.join(base_path, 'KFSP_Email_PaidExpiring_Final_V5.html'))
print('Fixed missing r=')
