import re

files = [
    r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_Trial_Final_V5.html',
    r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_PaidExpiring_Final_V5.html'
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    idx = html.find('padding: 24px 20px')
    if idx != -1:
        end_p = html.find('</p>', idx)
        text_block = html[idx:end_p+4]
        m = re.search(r'<p[^>]*>(.*?)</p>', text_block, re.DOTALL)
        if m:
            print(f"--- {filepath.split('\\')[-1]} ---")
            print(m.group(1).strip().encode('cp1252', errors='replace').decode('cp1252'))