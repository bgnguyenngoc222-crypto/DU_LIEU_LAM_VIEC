import re

files = ['KFSP_Email_PaidExpiring_Final_V5.html', 'KFSP_Email_Free_Final_V5.html', 'KFSP_Email_Trial_Final_V5.html', 'KFSP_Email_Winback_Final_V5.html']

new_purple_block = '''                <!-- Alert Block Compact (Pastel Purple) -->
                <tr>
                  <td align="center" valign="top" style="padding: 15px 0 25px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                      style="background-color: #F5F3FF; border: 1px solid #E9D5FF; border-radius: 12px; text-align: center; font-family: 'Open Sans', Arial, sans-serif;">
                      <tr>
                        <td style="padding: 20px 15px;">
                          <div style="font-size: 15px; color: #111827; font-weight: 800; margin-bottom: 8px; text-transform: uppercase;">
                            🎁 Ưu đãi sinh nhật vẫn đang chờ
                          </div>
                          <div style="font-size: 13.5px; color: #4B5563; line-height: 1.6; max-width: 95%; margin: 0 auto;">
                            Tận dụng đặc quyền để trang bị chiếc phao cứu sinh, bảo vệ thành quả và không để kịch bản giao dịch của bạn bị gián đoạn.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>'''

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = re.sub(r'</table>\s*</td>\s*</tr>\s*(<!-- CTA/Action Section)', r'\1', content, flags=re.DOTALL)
    
    content = re.sub(r'(<!-- Footer)', r'                </table>\n              </td>\n            </tr>\n\n      \1', content)
    
    content = re.sub(r'<!-- Alert Block.*?<!-- KHỐI 3 THẺ GIÁ XẾP DỌC', new_purple_block + '\n\n              <!-- KHỐI 3 THẺ GIÁ XẾP DỌC', content, flags=re.DOTALL)
    
    content = content.replace('padding: 20px 15px;', 'padding: 12px 10px;')
    content = content.replace('margin-bottom: 15px; text-align: center;', 'margin-bottom: 10px; text-align: center;')
    content = content.replace('font-size: 20px;', 'font-size: 16px;')
    content = content.replace('font-size: 24px;', 'font-size: 18px;')
    content = content.replace('padding: 6px 16px;', 'padding: 4px 10px;')
    content = content.replace('font-size: 11px;', 'font-size: 10px;')
    content = content.replace('margin: 0 auto 20px auto;', 'margin: 0 auto 12px auto;')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f + ' updated successfully')
