import re
with open(r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_PaidExpiring_Final_V5.html', 'r', encoding='utf-8') as f:
    html = f.read()

callout_pattern = re.compile(r'(<div[^>]*border-radius:\s*20px[^>]*>\s*<p[^>]*>.*?</p>\s*)(?:<img[^>]*>\s*)?(</div>)', re.DOTALL)
match = callout_pattern.search(html)
if match:
    print("Found match starts at:", match.start())
    print("Matched text length:", len(match.group(0)))
    print("Snippet:")
    print(match.group(0)[:200] + ' ... ' + match.group(0)[-200:])
else:
    print("No match")