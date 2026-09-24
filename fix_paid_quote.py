import sys
sys.stdout.reconfigure(encoding='utf-8')
filepath = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_PaidExpiring_Final_V5.html'
with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

old_quote_block = '''<div
                      style="font-weight: bold; font-size: 12px; color: #7B3AEC; margin-bottom: 10px; letter-spacing: 2px;">
                      BẢO VỆ THÀNH QUẢ</div>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F5F3FF"
                      style="border-radius: 10px; border-left: 4px solid #7B3AEC; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 14px 16px;">
                          <p
                            style="margin: 0 0 6px 0; font-size: 14px; color: #111827; line-height: 1.6; font-style: italic;">
                            &ldquo;Someone is sitting in the shade today because someone planted a tree a long time
                            ago.&rdquo;</p>
                          <p style="margin: 0; font-size: 12px; color: #7B3AEC; font-weight: 700;">&mdash; WARREN
                            BUFFETT &nbsp;|&nbsp; Hôm nay có người đang ngồi trong bóng mát, vì từ lâu trước đó đã có
                            người trồng cây.</p>
                        </td>
                      </tr>
                    </table>'''

new_quote_block = '''<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F5F3FF"
                      style="border-radius: 10px; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 14px 16px;">
                          <p
                            style="margin: 0 0 8px 0; font-size: 16px; color: #111827; line-height: 1.6; font-style: italic; font-weight: 700; text-align: center;">
                            &ldquo;Someone is sitting in the shade today because someone planted a tree a long time
                            ago.&rdquo;</p>
                          <p
                            style="margin: 0 0 10px 0; font-size: 13px; color: #6B7280; line-height: 1.5; text-align: center;">
                            Hôm nay có người đang ngồi trong bóng mát, vì từ lâu trước đó đã có người trồng cây.</p>
                          <p
                            style="margin: 0; font-size: 12px; color: #7B3AEC; font-weight: 700; font-style: italic; text-align: center;">
                            &mdash; WARREN BUFFETT</p>
                        </td>
                      </tr>
                    </table>'''

# Make sure white spaces do not affect the replace
import re
def normalize(s):
    return re.sub(r'\s+', ' ', s).strip()

norm_html = normalize(html)
norm_old = normalize(old_quote_block)

if norm_old in norm_html:
    # Do a regex replace that ignores whitespace
    # Escape the old block for regex, but replace spaces with \s+
    pattern = re.sub(r'\s+', r'\\s+', re.escape(old_quote_block))
    # the escape will escape spaces too, we replace them with \s+
    pattern = pattern.replace(r'\ ', r'\s+')
    
    html = re.sub(pattern, new_quote_block, html)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully replaced quote block.")
else:
    print("Could not find the exact quote block to replace.")