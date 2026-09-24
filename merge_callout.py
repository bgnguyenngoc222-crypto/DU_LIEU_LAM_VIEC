import os
import re

base_path = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay'
files = [
    'KFSP_Email_Free_Final_V5.html', 
    'KFSP_Email_Trial_Final_V5.html', 
    'KFSP_Email_Winback_Final_V5.html', 
    'KFSP_Email_PaidExpiring_Final_V5.html'
]

for filename in files:
    filepath = os.path.join(base_path, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Extract the <img> tag
    img_match = re.search(r'(<img\s+[^>]*src="[^"]+"[^>]*>)', html)
    if not img_match:
        print(f"Image not found in {filename}")
        continue
    img_tag = img_match.group(1)

    # Find the max-width of the image wrapper table
    # We search backwards from the image to find the nearest table with max-width
    pre_img = html[:img_match.start()]
    table_matches = list(re.finditer(r'<table[^>]+max-width:\s*(\d+px)', pre_img))
    max_width = '100%'
    if table_matches:
        max_width = table_matches[-1].group(1)

    # Re-style the img tag so it centers in the div
    def fix_img_style(m):
        style = m.group(1)
        # Clean up existing conflicting styles
        style = re.sub(r'display:\s*block;?', '', style)
        style = re.sub(r'max-width:\s*[^;]+;?', '', style)
        style = re.sub(r'margin:\s*[^;]+;?', '', style)
        # Add the styles we need
        return f'style="display: block; margin: 20px auto 0 auto; max-width: {max_width}; {style.strip()}"'
    
    new_img_tag = re.sub(r'style="([^"]*)"', fix_img_style, img_tag)

    # 2. Insert the <img> tag right before the closing </div> of the callout
    # The callout is a div with background-color and border-radius: 20px
    # We find this div, and its inner <p>
    callout_pattern = re.compile(r'(<div[^>]*border-radius:\s*20px[^>]*>\s*<p[^>]*>.*?</p>\s*)(</div>)', re.DOTALL)
    
    match = callout_pattern.search(html)
    if not match:
        print(f"Callout div not found in {filename}")
        continue
    
    # We only want to match the first such div (the callout, not the image wrapper which we will delete)
    # Wait, the image wrapper is ALSO a div or table cell with border-radius: 20px!
    # Let's be specific: the callout div contains a <p>
    
    html = html[:match.start()] + match.group(1) + new_img_tag + "\n                          " + match.group(2) + html[match.end():]

    # 3. Remove the Tầng 5 Bridge text and Image Table
    # The bridge text is usually after the callout table
    # We need to remove from <!-- [Tầng 5] BRIDGE + ẢNH THỰC TẾ --> up to the end of the image table
    # The image table ends with </table>\s*</td>\s*</tr>
    
    remove_pattern = re.compile(r'<!-- \[Tầng 5\] BRIDGE \+ ẢNH THỰC TẾ -->.*?<img[^>]*>.*?</td>\s*</tr>\s*</table>\s*</td>\s*</tr>', re.DOTALL)
    
    html = remove_pattern.sub('<!-- [Tầng 5] Removed Image Table (Merged into Tầng 4) -->', html)
    
    # Also remove any leftover empty Bridge text row if the user edited it manually and it's outside the above block
    # Actually, the block above covers the entire Tầng 5 including the image table.
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print(f"Successfully merged callout and image in {filename}")
