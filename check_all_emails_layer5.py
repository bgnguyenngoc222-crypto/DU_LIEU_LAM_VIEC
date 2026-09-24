import glob
import sys

files = glob.glob(r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    print(f"\n--- {filepath.split('\\')[-1]} ---")
    idx = html.find('<!-- [Tầng 5]')
    if idx != -1:
        end_idx = html.find('<!-- [Tầng 6]', idx)
        if end_idx == -1: end_idx = idx + 800
        print(html[idx:end_idx].strip())