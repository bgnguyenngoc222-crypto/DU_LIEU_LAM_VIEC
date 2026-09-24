import re, urllib.parse, os
def fix_tracking(filepath, email_type):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix src=..._paid_expiring_bai... to src=..._{email_type}_bai...
    if email_type != 'paid_expiring':
        content = re.sub(r'src=email_10_ngay_sau_sinh_nhat_paid_expiring_bai(\d+)',
                         rf'src=email_10_ngay_sau_sinh_nhat_{email_type}_bai\1',
                         content)
                     
    # URL encode the r=... parameter
    def encode_r(match):
        prefix = match.group(1)
        url = match.group(2)
        suffix = match.group(3)
        if '://' in url or '/' in url:
            encoded = urllib.parse.quote(url, safe='')
            return f'{prefix}{encoded}{suffix}'
        return match.group(0)
    
    content = re.sub(r'(&amp;|&)r=(https?://[^\"\'\s]+)(\"|\'|\s|\&)', encode_r, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

base_path = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'
fix_tracking(os.path.join(base_path, 'KFSP_Email_Free_Final_V5.html'), 'free')
fix_tracking(os.path.join(base_path, 'KFSP_Email_Trial_Final_V5.html'), 'trial')
fix_tracking(os.path.join(base_path, 'KFSP_Email_Winback_Final_V5.html'), 'winback')
fix_tracking(os.path.join(base_path, 'KFSP_Email_PaidExpiring_Final_V5.html'), 'paid_expiring')
print('Fixed tracking links!')
