# -*- coding: utf-8 -*-
import os, sys

sys.stdout.reconfigure(encoding='utf-8')
filepath = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_PaidExpiring_Final_V5.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("kỷ luận", "kỷ luật")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed typo.")