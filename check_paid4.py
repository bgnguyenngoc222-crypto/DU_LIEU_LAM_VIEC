import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_PaidExpiring_Final_V5.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
callout_pattern = re.compile(r'(<div[^>]*border-radius:\s*20px[^>]*>\s*<p[^>]*>.*?</p>\s*)(?:<img[^>]*>\s*)?(</div>)', re.DOTALL)
match = callout_pattern.search(html)
if match:
    with open('test_match_output.txt', 'w', encoding='utf-8') as out:
        out.write(match.group(0))
    print("Saved to test_match_output.txt")