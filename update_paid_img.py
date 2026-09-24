import sys
import re
sys.stdout.reconfigure(encoding='utf-8')
filepath = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_PaidExpiring_Final_V5.html'
with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the CH_09 image with the new CDN one
html = html.replace('https://link.kfsp.vn/email-assets/mockup/co_hoi_tiem_nang/CH_09_Tab_TichLuy.jpg', 'https://cdn.jsdelivr.net/gh/kfspteam/email-assets@main/2026_09_08_nhac_nho_10_ngay/app_list_ai_muaban.jpg')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(html)
print("PaidExpiring image updated.")