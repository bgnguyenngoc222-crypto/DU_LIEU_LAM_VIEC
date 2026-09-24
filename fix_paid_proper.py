import sys
import re
sys.stdout.reconfigure(encoding='utf-8')
filepath = r'c:\NGUYEN NGOC MKT\ANTI GRAVITY\03_Email\kfsp_mkt_email\2026_09_08_nhac_nho_10_ngay\KFSP_Email_PaidExpiring_Final_V5.html'
with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# Apply user bold edits
html = html.replace('nuôi dưỡng một quán tính quan sát có kỷ luật', '<strong>nuôi dưỡng một quán tính quan sát có kỷ luật</strong>')
html = html.replace('nuôi dưỡng một quán tính quan sát có kỷ luận', '<strong>nuôi dưỡng một quán tính quan sát có kỷ luật</strong>')
html = html.replace('sự đứt quãng theo dõi chính là rủi ro lớn nhất', '<strong>sự đứt quãng theo dõi chính là rủi ro lớn nhất</strong>')
html = html.replace('mất toàn bộ ngữ cảnh, lỡ mất tín hiệu cảnh báo tại điểm bứt phá', '<strong>mất toàn bộ ngữ cảnh, lỡ mất tín hiệu cảnh báo tại điểm bứt phá</strong>')

# Merge image into the CTA? NO!
# Wait, for PaidExpiring, the Callout text the user wanted was:
# "Bạn đã gieo hạt và chăm chút cái cây của mình qua giai đoạn tích lũy. Đừng nhổ nó lên ngay..."
# Wait, no! That text belongs to Trial!
# The text for PaidExpiring was:
# "Những mã đang tích lũy và chuẩn bị bứt phá không tự báo hiệu. Chúng cần được theo dõi liên tục từ giai đoạn tích lũy cho tới khi xác nhận. Bạn đã dần quen với hệ thống, đừng để sự quen thuộc đó bị mất đi."

# I need to create a Callout box containing THIS text AND the image, and replace the old image table.

old_img_table_regex = re.compile(r'<!-- \[Tầng 5\] BRIDGE \+ ẢNH THỰC TẾ -->.*?<img\s+src="([^"]+)".*?alt="([^"]+)".*?</td>\s*</tr>\s*</table>\s*</td>\s*</tr>', re.DOTALL)
match = old_img_table_regex.search(html)
if match:
    img_src = match.group(1)
    img_alt = match.group(2)
    
    # We will build a new Callout table (Tầng 4 style)
    new_callout = f'''
                <!-- [Tầng 4] CALLOUT -->
                <tr>
                  <td align="center" valign="top" style="padding-bottom: 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 0 0;">
                      <tr>
                        <td align="center">
                          <div style="background-color: #FDF2F8; border-radius: 20px; padding: 24px 20px; border: 1px solid #FBCFE8; box-shadow: 0 10px 25px rgba(219,39,119,0.05); font-family: 'Open Sans', Arial, sans-serif;">
                            <p style="margin: 0 0 20px 0; font-size: 13px; color: #111827; line-height: 1.6; text-align: center;">
                              Những mã đang tích lũy và chuẩn bị bứt phá không tự báo hiệu. Chúng cần được theo dõi liên tục từ giai đoạn tích lũy cho tới khi xác nhận. Bạn đã dần quen với hệ thống, đừng để sự quen thuộc đó bị mất đi.
                            </p>
                            <img src="{img_src}" style="display: block; width: 100%; max-width: 260px; height: auto; border-radius: 8px; margin: 0 auto; border: 1px solid #FBCFE8;" alt="{img_alt}" />
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
'''
    html = html[:match.start()] + new_callout + html[match.end():]

# Clean up any leftover texts
html = re.sub(r'<p style="margin: 0; font-size: 13px; color: #111827; line-height: 1.7; text-align: center;">Giai đoạn thị.*?cho tới khi xác nhận\.</p>', '', html, flags=re.DOTALL)
html = re.sub(r'<p style="margin: 0; font-size: 13px; color: #111827; line-height: 1.7; text-align: center;">Đây là\s*giai đoạn bạn đã đầu.*?đó bị mất đi\.</p>', '', html, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(html)
print("PaidExpiring fixed and correctly merged.")