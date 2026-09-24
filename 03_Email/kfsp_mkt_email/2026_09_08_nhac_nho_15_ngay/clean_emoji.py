import os, codecs

folder = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'
files = [f for f in os.listdir(folder) if f.endswith('.html')]

for f in files:
    try:
        path = os.path.join(folder, f)
        content = codecs.open(path, 'r', 'utf-8').read()
        if '\ud83c\udf81' in content or '🎁' in content:
            print(f'{f}: EMOJI FOUND')
            content = content.replace('\ud83c\udf81', '').replace('🎁', '')
            codecs.open(path, 'w', 'utf-8').write(content)
            print(f'{f}: EMOJI REMOVED')
        else:
            print(f'{f}: CLEAN')
    except Exception as e:
        print(f'{f}: {e}')
