import re

files = [
    'KFSP_Email_Free_Final_V5.html',
    'KFSP_Email_Trial_Final_V5.html',
    'KFSP_Email_Winback_Final_V5.html',
    'KFSP_Email_PaidExpiring_Final_V5.html'
]

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Regex to match the banner table
    pattern = r'(<!-- BANNER ƯU ĐÃI SINH NHẬT -->\s*<table[^>]*?style=\"[^\"]*?background-color:\s*)#FFFBEB([^>]*?border:\s*2px solid #FDE047;)'
    content = re.sub(pattern, r'\g<1>#FFFFFF\g<2>', content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f + ' updated')
