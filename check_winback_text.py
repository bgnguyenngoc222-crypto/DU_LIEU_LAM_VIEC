import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_Winback_Final_V5.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('Thị trường không thiếu cơ hội')
if idx != -1:
    print(html[idx-300:idx+300])