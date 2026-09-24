import glob
import sys
import re

files = glob.glob(r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # search for padding: 24px 20px
    idx = html.find('padding: 24px 20px')
    if idx != -1:
        end_p = html.find('</p>', idx)
        text_block = html[idx:end_p+4]
        # extract the text inside <p>
        m = re.search(r'<p[^>]*>(.*?)</p>', text_block, re.DOTALL)
        if m:
            print(f"--- {filepath.split('\\')[-1]} ---")
            print(m.group(1).strip())
            print()