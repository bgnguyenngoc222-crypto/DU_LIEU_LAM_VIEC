import os
import re

base_path = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'
files = {
    'KFSP_Email_Free_Final_V5.html': {
        'img': 'https://cdn.jsdelivr.net/gh/kfspteam/email-assets@main/2026_09_08_nhac_nho_10_ngay/mau_hinh_hai_day.jpg',
        'alt': 'Mẫu hình hai đáy',
        'width': '480px'
    },
    'KFSP_Email_Trial_Final_V5.html': {
        'img': 'https://cdn.jsdelivr.net/gh/kfspteam/email-assets@main/2026_09_08_nhac_nho_10_ngay/app_list_ai.jpg',
        'alt': 'Màn hình theo dõi cơ hội tiềm năng',
        'width': '260px'
    },
    'KFSP_Email_Winback_Final_V5.html': {
        'img': 'https://cdn.jsdelivr.net/gh/kfspteam/email-assets@main/2026_09_08_nhac_nho_10_ngay/app_thong_bao.png',
        'alt': 'Màn hình thông báo các cơ hội mua bán',
        'width': '480px'
    },
    'KFSP_Email_PaidExpiring_Final_V5.html': {
        'img': 'https://cdn.jsdelivr.net/gh/kfspteam/email-assets@main/2026_09_08_nhac_nho_10_ngay/app_list_ai_muaban.jpg',
        'alt': 'Danh sách các mã đang theo dõi và trạng thái lãi lỗ',
        'width': '260px'
    }
}

for filename, data in files.items():
    filepath = os.path.join(base_path, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Step 1: Remove the logo that was incorrectly added to the callout div
    # The logo was inserted right before </div> of the callout
    # We find the callout div content and clean it up
    callout_pattern = re.compile(r'(<div[^>]*border-radius:\s*20px[^>]*>\s*<p[^>]*>.*?</p>\s*)(?:<img[^>]*>\s*)?(</div>)', re.DOTALL)
    
    match = callout_pattern.search(html)
    if not match:
        print(f"Callout div not found in {filename}")
        continue

    # Step 2: Build the correct image tag
    new_img_tag = f'<img src="{data["img"]}" style="display: block; width: 100%; max-width: {data["width"]}; height: auto; border-radius: 8px; margin: 20px auto 0 auto;" alt="{data["alt"]}" />'

    # Step 3: Replace the callout div with the corrected one
    html = html[:match.start()] + match.group(1) + new_img_tag + "\n                          " + match.group(2) + html[match.end():]
    
    # Step 4: Just in case the old Tầng 5 image table is still there, make sure it's removed.
    # It was already removed by the previous script, but we can verify.

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print(f"Successfully fixed and merged screenshot in {filename}")
