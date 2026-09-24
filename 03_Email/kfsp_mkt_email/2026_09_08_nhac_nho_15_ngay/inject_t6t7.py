# -*- coding: utf-8 -*-
# Part 2: Append T6 + T7 content to existing html in rebuild_paid.py and rebuild file

tang6_tang7 = """
                <!-- [T\u1ea7ng 6] 3 GI\u00c1 TR\u1eca -->
                <tr>
                  <td style="padding: 0 0 8px 0;">
                    <p style="margin: 0 0 14px 0; font-size: 13px; font-weight: 800; color: #7B3AEC; letter-spacing: 1px; text-transform: uppercase;">C\u01a0 H\u1ed8I TI\u1ec0M N\u0102NG L\u00c0M \u0110\u01af\u1ee2C G\u00cc CHO B\u1ea0N?</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="border-radius: 12px; border: 1px solid #D8B4FE; margin-bottom: 10px;">
                      <tr><td style="padding: 16px 18px;">
                        <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 800; color: #7B3AEC;">S\u1eb4N S\u00c0NG V\u1eca TH\u1ebe</p>
                        <p style="margin: 0; font-size: 13px; color: #4B5563; line-height: 1.6;">M\u1ed7i m\u00e3 trong danh s\u00e1ch \u0111\u01b0\u1ee3c c\u1eadp nh\u1eadt tr\u1ea1ng th\u00e1i li\u00ean t\u1ee5c m\u1ed7i ng\u00e0y: Ch\u1edd x\u00e1c nh\u1eadn, Th\u00e0nh c\u00f4ng, ho\u1eb7c Nguy c\u01a1 hu\u1ef7. B\u1ea1n s\u1ebd duy tr\u00ec g\u00f3c nh\u00ecn li\u1ec1n m\u1ea1ch, lu\u00f4n n\u1eafm r\u00f5 c\u1ed5 phi\u1ebfu \u0111ang ti\u1ebfn g\u1ea7n hay l\u00f9i xa kh\u1ecfi \u0111i\u1ec3m b\u1ee9t ph\u00e1.</p>
                      </td></tr>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="border-radius: 12px; border: 1px solid #D8B4FE; margin-bottom: 10px;">
                      <tr><td style="padding: 16px 18px;">
                        <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 800; color: #7B3AEC;">S\u1eb4N S\u00c0NG \u0110\u00d3N \u0110\u1ea6U</p>
                        <p style="margin: 0; font-size: 13px; color: #4B5563; line-height: 1.6;">Ch\u1ee7 \u0111\u1ed9ng \u0111\u1eb7t c\u1ea3nh b\u00e1o ngay t\u1ea1i v\u00f9ng gi\u00e1 quan tr\u1ecdng do h\u1ec7 th\u1ed1ng t\u00ednh to\u00e1n s\u1eb5n. Khi gi\u00e1 ch\u1ea1m ng\u01b0\u1ee1ng h\u00e0nh \u0111\u1ed9ng, b\u1ea1n \u0111\u00e3 s\u1eb5n s\u00e0ng l\u1ec7nh mua v\u00e0 kh\u00f4ng lo tr\u1ec5 nh\u1ecbp s\u00f3ng.</p>
                      </td></tr>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="border-radius: 12px; border: 1px solid #D8B4FE; margin-bottom: 20px;">
                      <tr><td style="padding: 16px 18px;">
                        <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 800; color: #7B3AEC;">S\u1eb4N S\u00c0NG H\u00c0NH \u0110\u1ed8NG</p>
                        <p style="margin: 0; font-size: 13px; color: #4B5563; line-height: 1.6;">V\u00f9ng Break, V\u00f9ng H\u1ee7y, M\u1ee5c ti\u00eau ch\u1ed1t l\u1eddi v\u00e0 Bi\u00ean l\u1ee3i nhu\u1eadn c\u00f2n l\u1ea1i. C\u00f3 s\u1eb5n 4 th\u00f4ng s\u1ed1 \u0111o l\u01b0\u1eddng n\u00e0y, b\u1ea1n b\u01b0\u1edbc v\u00e0o l\u1ec7nh v\u1edbi k\u1ebf ho\u1ea1ch r\u00f5 r\u00e0ng, t\u1ef1 tin ra quy\u1ebft \u0111\u1ecbnh d\u1ee9t kho\u00e1t m\u00e0 kh\u00f4ng c\u1ea7n nghe ng\u00f3ng th\u00f4ng tin nhi\u1ec5u lo\u1ea1n b\u00ean ngo\u00e0i.</p>
                      </td></tr>
                    </table>
                    <p style="margin: 0 0 24px 0; font-size: 13px; color: #6B7280; line-height: 1.6; font-style: italic;">&ldquo;Ng\u01b0\u1eddi gi\u1ecfi nh\u1ea5t kh\u00f4ng h\u00e0nh \u0111\u1ed9ng nhi\u1ec1u nh\u1ea5t. H\u1ecd quan s\u00e1t li\u00ean t\u1ee5c v\u00e0 h\u00e0nh \u0111\u1ed9ng \u0111\u00fang l\u00fac nh\u1ea5t.&rdquo;</p>
                  </td>
                </tr>

                <!-- KH\u1ed0I 3 TH\u1eba GI\u00c1 X\u1ebcP D\u1ecdC (CENTERED) -->
                <div style="width: 100%; max-width: 480px; margin: 0 auto; position: relative; z-index: 1; font-family: 'Open Sans', Arial, sans-serif;">

                  <!-- BANNER \u01af\u01a0 \u0110\u00c3I SINH NH\u1eacT -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="background-color: #FFFFFF; border: 2px solid #FDE047; border-radius: 16px; text-align: center; margin-bottom: 28px; font-family: 'Open Sans', Arial, sans-serif; box-shadow: 0 8px 24px rgba(250,204,21,0.15);">
                    <tr><td style="padding: 22px 20px; font-family: 'Open Sans', Arial, sans-serif;">
                      <div style="display: inline-block; background-color: #FEF08A; color: #854D0E; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px; font-family: 'Open Sans', Arial, sans-serif;">
                        Qu\u00e0 sinh nh\u1eadt v\u1eabn \u0111ang ch\u1edd
                      </div>
                      <div style="font-family: 'Open Sans', Arial, sans-serif; font-size: 15px; font-weight: 900; color: #1E1B4B; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                        \u01afu \u0111\u00e3i \u0111\u1eb7c bi\u1ec7t: T\u1eb7ng th\u00eam th\u1eddi gian d\u00f9ng
                      </div>
                      <div style="font-family: 'Open Sans', Arial, sans-serif; font-size: 13px; color: #92400E; line-height: 1.6; margin-bottom: 12px;">
                        Gia h\u1ea1n trong th\u00e1ng sinh nh\u1eadt, b\u1ea1n \u0111\u01b0\u1ee3c <strong>t\u1eb7ng th\u00eam th\u1eddi gian s\u1eed d\u1ee5ng</strong> m\u00e0 chi ph\u00ed ho\u00e0n to\u00e0n kh\u00f4ng \u0111\u1ed5i.
                      </div>
                      <div style="font-family: 'Open Sans', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #B45309; background-color: #FEF3C7; display: inline-block; padding: 4px 10px; border-radius: 8px;">
                        \u01afu \u0111\u00e3i k\u1ebft th\u00fac khi th\u00e1ng sinh nh\u1eadt kh\u00e9p l\u1ea1i
                      </div>
                    </td></tr>
                  </table>

                  <!-- CARD 1: 2 N\u0102M (YELLOW THEME) -->
                  <div style="background-color: #FFFBEB; border-radius: 20px; padding: 12px 10px; margin-bottom: 10px; text-align: center; border: 1px solid #FEF08A; box-shadow: 0 10px 25px rgba(217,119,6,0.1); font-family: 'Open Sans', Arial, sans-serif;">
                    <div style="display: inline-block; background-color: #FACC15; color: #854D0E; font-size: 10px; font-weight: 900; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; font-family: 'Open Sans', Arial, sans-serif; letter-spacing: 0.5px;">TI\u1ebcT KI\u1ec6M T\u1ed0I \u0110A</div>
                    <h3 style="font-size: 16px; font-weight: 900; color: #1E1B4B; margin: 0 0 15px 0; font-family: 'Open Sans', Arial, sans-serif;">V\u00c0NG 2 N\u0102M</h3>
                    <div style="font-size: 15px; font-weight: 800; color: #D97706; margin-bottom: 20px; font-family: 'Open Sans', Arial, sans-serif;">S\u1eed d\u1ee5ng 24 th\u00e1ng + T\u1eb7ng 4 th\u00e1ng</div>
                    <div style="font-size: 15px; font-weight: 700; color: #94A3B8; text-decoration: line-through; margin-bottom: 5px; font-family: 'Open Sans', Arial, sans-serif;">11.880.000 \u0111</div>
                    <div style="font-size: 18px; font-weight: 900; color: #D97706; margin-bottom: 20px; letter-spacing: -1px; font-family: 'Open Sans', Arial, sans-serif;">\u2248 14.000 \u0111/ng\u00e0y</div>
                    <div style="height: 1px; background-color: #FDE047; width: 60%; margin: 0 auto 12px auto;"></div>
                    <div style="font-size: 14px; line-height: 24px; color: #334155; margin-bottom: 30px; font-family: 'Open Sans', Arial, sans-serif;">\u0110\u1ee7 d\u00e0i \u0111\u1ec3 \u00f4m tr\u1ecdn v\u1eb9n m\u1ed9t si\u00eau chu k\u1ef3 Uptrend.</div>
                    <a href="https://link.kfsp.vn/webhook/email-register?plan=gold_2y&amp;email={{ $json.email }}&amp;u={{ $json.user_id }}&amp;source=email_10_ngay_sau_sinh_nhat_paid_expiring&amp;c=10_ngay_sau_sinh_nhat&amp;content=cta_gold_2y" target="_blank"
                      style="display: inline-block; background-color: #EAB308; color: #1A1A1A; font-size: 15px; font-weight: 900; padding: 16px 36px; border-radius: 12px; text-decoration: none; text-transform: uppercase; box-shadow: 0 4px 10px rgba(217,119,6,0.2); font-family: 'Open Sans', Arial, sans-serif;">
                      GIA H\u1ea0N G\u00d3I 2 N\u0102M &rarr;
                    </a>
                  </div>

                  <!-- CARD 2: 1 N\u0102M (PURPLE THEME) -->
                  <div style="background-color: #F5F3FF; border-radius: 20px; padding: 12px 10px; margin-bottom: 10px; text-align: center; border: 1px solid #E9D5FF; box-shadow: 0 10px 25px rgba(126,34,206,0.1); font-family: 'Open Sans', Arial, sans-serif;">
                    <div style="display: inline-block; background-color: #C084FC; color: #FFFFFF; font-size: 10px; font-weight: 900; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; font-family: 'Open Sans', Arial, sans-serif; letter-spacing: 0.5px;">C\u00c2N B\u1eb0NG NH\u1ea4T</div>
                    <h3 style="font-size: 16px; font-weight: 900; color: #1E1B4B; margin: 0 0 15px 0; font-family: 'Open Sans', Arial, sans-serif;">V\u00c0NG 1 N\u0102M</h3>
                    <div style="font-size: 15px; font-weight: 800; color: #7E22CE; margin-bottom: 20px; font-family: 'Open Sans', Arial, sans-serif;">S\u1eed d\u1ee5ng 12 th\u00e1ng + T\u1eb7ng 2 th\u00e1ng</div>
                    <div style="font-size: 15px; font-weight: 700; color: #94A3B8; text-decoration: line-through; margin-bottom: 5px; font-family: 'Open Sans', Arial, sans-serif;">7.680.000 \u0111</div>
                    <div style="font-size: 18px; font-weight: 900; color: #7E22CE; margin-bottom: 20px; letter-spacing: -1px; font-family: 'Open Sans', Arial, sans-serif;">\u2248 18.000 \u0111/ng\u00e0y</div>
                    <div style="height: 1px; background-color: #D8B4FE; width: 60%; margin: 0 auto 12px auto;"></div>
                    <div style="font-size: 14px; line-height: 24px; color: #334155; margin-bottom: 30px; font-family: 'Open Sans', Arial, sans-serif;">\u0110i qua \u0111\u1ee7 4 m\u00f9a b\u00e1o c\u00e1o t\u00e0i ch\u00ednh, m\u1ed9t chu k\u1ef3 kinh doanh tr\u1ecdn v\u1eb9n.</div>
                    <a href="https://link.kfsp.vn/webhook/email-register?plan=gold_1y&amp;email={{ $json.email }}&amp;u={{ $json.user_id }}&amp;source=email_10_ngay_sau_sinh_nhat_paid_expiring&amp;c=10_ngay_sau_sinh_nhat&amp;content=cta_gold_1y" target="_blank"
                      style="display: inline-block; background-color: #A855F7; color: #FFFFFF; font-size: 15px; font-weight: 900; padding: 16px 36px; border-radius: 12px; text-decoration: none; text-transform: uppercase; box-shadow: 0 4px 10px rgba(126,34,206,0.2); font-family: 'Open Sans', Arial, sans-serif;">
                      GIA H\u1ea0N G\u00d3I 1 N\u0102M &rarr;
                    </a>
                  </div>

                  <!-- CARD 3: 3 TH\u00c1NG (GREEN THEME) -->
                  <div style="background-color: #F0FDF4; border-radius: 20px; padding: 12px 10px; margin-bottom: 10px; text-align: center; border: 1px solid #D1FAE5; box-shadow: 0 10px 25px rgba(5,150,105,0.05); font-family: 'Open Sans', Arial, sans-serif;">
                    <div style="display: inline-block; background-color: #10B981; color: #FFFFFF; font-size: 10px; font-weight: 900; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; font-family: 'Open Sans', Arial, sans-serif; letter-spacing: 0.5px;">LINH HO\u1ea0T NH\u1ea4T</div>
                    <h3 style="font-size: 16px; font-weight: 900; color: #1E1B4B; margin: 0 0 15px 0; font-family: 'Open Sans', Arial, sans-serif;">B\u1ea0C 3 TH\u00c1NG</h3>
                    <div style="font-size: 15px; font-weight: 800; color: #059669; margin-bottom: 20px; font-family: 'Open Sans', Arial, sans-serif;">S\u1eed d\u1ee5ng 3 th\u00e1ng + T\u1eb7ng 2 tu\u1ea7n</div>
                    <div style="font-size: 15px; font-weight: 700; color: #94A3B8; text-decoration: line-through; margin-bottom: 5px; font-family: 'Open Sans', Arial, sans-serif;">2.168.000 \u0111</div>
                    <div style="font-size: 18px; font-weight: 900; color: #059669; margin-bottom: 20px; letter-spacing: -1px; font-family: 'Open Sans', Arial, sans-serif;">\u2248 21.000 \u0111/ng\u00e0y</div>
                    <div style="height: 1px; background-color: #A7F3D0; width: 60%; margin: 0 auto 12px auto;"></div>
                    <div style="font-size: 14px; line-height: 24px; color: #334155; margin-bottom: 30px; font-family: 'Open Sans', Arial, sans-serif;">V\u1eeba \u0111\u1ee7 \u0111\u1ec3 tr\u1ea3i nghi\u1ec7m s\u1ee9c m\u1ea1nh h\u1ec7 th\u1ed1ng trong 1 nh\u1ecbp s\u00f3ng ng\u1eafn.</div>
                    <a href="https://link.kfsp.vn/webhook/email-register?plan=silver_3m&amp;email={{ $json.email }}&amp;u={{ $json.user_id }}&amp;source=email_10_ngay_sau_sinh_nhat_paid_expiring&amp;c=10_ngay_sau_sinh_nhat&amp;content=cta_silver_3m" target="_blank"
                      style="display: inline-block; background-color: #10B981; color: #FFFFFF; font-size: 15px; font-weight: 900; padding: 16px 36px; border-radius: 12px; text-decoration: none; text-transform: uppercase; box-shadow: 0 4px 10px rgba(5,150,105,0.2); font-family: 'Open Sans', Arial, sans-serif;">
                      GIA H\u1ea0N G\u00d3I 3 TH\u00c1NG &rarr;
                    </a>
                  </div>

                </div>
            </td>
          </tr>

          <!-- CTA/Action Section -->
          <tr>
            <td style="padding: 10px 40px 40px 40px; text-align: center;">
              <p style="margin: 0 0 25px 0; font-size: 15px; color: #111827; font-weight: 500;">
                B\u1ea1n c\u1ea7n t\u01b0 v\u1ea5n th\u00eam c\u00e1c g\u00f3i kh\u00e1c? Li\u00ean h\u1ec7 ngay v\u1edbi KFSP \u0111\u1ec3 \u0111\u01b0\u1ee3c h\u1ed7 tr\u1ee3:
              </p>
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 30px;">
                <tr><td align="center">
                  <a href="https://link.kfsp.vn/webhook/email-click?u={{ $json.user_id }}&amp;e={{ $json.email }}&amp;c=10_ngay_sau_sinh_nhat&amp;src=email_10_ngay_sau_sinh_nhat_paid_expiring_lien_he_fanpage&amp;r=https%3A%2F%2Fwww.facebook.com%2Fkfsp.official%2F"
                    style="display: inline-block; padding: 14px 40px; background-color: #0084FF; color: #FFFFFF; font-size: 16px; font-weight: 900; text-decoration: none; border-radius: 12px; box-shadow: 0 6px 15px rgba(0,132,255,0.25); text-transform: uppercase; font-family: 'Open Sans', Arial, sans-serif;">KFSP H\u1ed4 TR\u1ee2 T\u01af V\u1ea4N &rarr;</a>
                </td></tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 30px 20px; background-color: #F8FAFC; font-family: 'Open Sans', Arial, sans-serif;">
              <p style="margin: 0 0 15px 0; font-size: 13px; line-height: 22px; color: #64748B; font-style: italic; font-family: 'Open Sans', Arial, sans-serif;">
                Ch\u1ee7 \u0111\u1ed9ng trong h\u00e0nh vi.<br>
                V\u1eefng v\u00e0ng trong t\u00e2m tr\u00ed.<br>
                B\u1ec1n b\u1ec9 trong \u00fd ch\u00ed.
              </p>
              <p style="margin: 0; font-size: 14px; font-weight: 800; color: #7B3AEC; text-transform: uppercase; font-family: 'Open Sans', Arial, sans-serif;">
                \u0110\u01b0a ch\u1ee9ng kho\u00e1n v\u1ec1 t\u1ea7m tay b\u1ea1n.
              </p>
              <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 25px auto 20px auto; width: 100%;">
              <p style="margin: 0 0 15px 0; font-size: 10px; line-height: 18px; color: #94A3B8; text-align: left; font-style: italic; font-family: 'Open Sans', Arial, sans-serif;">
                C\u1ea3nh b\u00e1o r\u1ee7i ro: M\u1ecdi d\u1eef li\u1ec7u ph\u00e2n t\u00edch ch\u1ec9 mang t\u00ednh ch\u1ea5t kh\u00e1ch quan, \u0111\u1ed9c l\u1eadp, kh\u00f4ng ph\u1ea3i khuy\u1ebfn ngh\u1ecb mua b\u00e1n hay ph\u00edm h\u00e0ng. Giao d\u1ecbch ch\u1ee9ng kho\u00e1n lu\u00f4n ti\u1ec1m \u1ea9n r\u1ee7i ro m\u1ea5t v\u1ed1n.
              </p>
              <div style="font-family: 'Open Sans', Arial, sans-serif; font-size: 11.5px; line-height: 20px; color: #64748B; text-align: left;">
                <p style="margin: 0 0 8px 0;"><strong style="color: #4C1D95; font-weight: 800;">KFSP &bull; Kungfu Stock Pro</strong> &middot; \u1ee8ng d\u1ee5ng h\u1ed7 tr\u1ee3 ph\u00e2n t\u00edch ch\u1ee9ng kho\u00e1n Vi\u1ec7t Nam</p>
                <p style="margin: 0 0 12px 0;">Email g\u1eedi t\u1edbi v\u00ec b\u1ea1n \u0111ang d\u00f9ng t\u00e0i kho\u1ea3n KFSP.</p>
                <p style="margin: 0;">
                  <a href="https://link.kfsp.vn/webhook/email-unsubscribe?u={{ $json.user_id }}&amp;e={{ $json.email }}&amp;c=10_ngay_sau_sinh_nhat" style="color: #64748B; text-decoration: underline;">Hu\u1ef7 \u0111\u0103ng k\u00fd</a>
                  &nbsp;&middot;&nbsp;
                  <a href="https://kfsp.vn/chinh-sach-bao-mat/" style="color: #64748B; text-decoration: underline;">Ch\u00ednh s\u00e1ch b\u1ea3o m\u1eadt</a>
                  &nbsp;&middot;&nbsp;
                  <a href="https://kfsp.vn/lien-he/" style="color: #64748B; text-decoration: underline;">Li\u00ean h\u1ec7 CGS</a>
                </p>
              </div>
            </td>
          </tr>

        </table>
        <img src="https://link.kfsp.vn/webhook/email-open?u={{ $json.user_id }}&amp;e={{ $json.email }}&amp;c=10_ngay_sau_sinh_nhat"
          width="1" height="1" border="0" style="display:none;" />
</body>
</html>"""

# Read the incomplete file, find the closing tag, insert T6+T7 before it
current = open('KFSP_Email_PaidExpiring_Final_V5.html', encoding='utf-8').read()

# The file ends incorrectly - find a good insertion point
# Look for the end of T5 section (after the caption p tag)
marker = '<p style="font-size: 12px; color: #6B7280; text-align: center; font-style: italic; margin-top: 8px; margin-bottom: 0;">'
idx = current.find(marker)
if idx > 0:
    # Find end of this element
    close = current.find('</p>', idx) + 4
    # Insert T6+T7 after the paragraph closing td/tr tags
    close2 = current.find('</td>', close) + 5
    close3 = current.find('</tr>', close2) + 5
    close4 = current.find('</table>', close3) + 8
    close5 = current.find('</td>', close4) + 5
    close6 = current.find('</tr>', close5) + 5

    # Find the "Cong cu nay dang trong tay ban" or footer - we insert before </table></td></tr>
    # Let's find the end of the content table
    end_marker = '</table>\n        <img'
    end_idx = current.find(end_marker)
    if end_idx < 0:
        end_marker = '</table>\r\n        <img'
        end_idx = current.find(end_marker)

    # Insert T6 before the closing of main table
    anchor = '<!-- CTA/Action Section'
    anchor_idx = current.find(anchor)
    if anchor_idx > 0:
        new_content = current[:anchor_idx] + tang6_tang7
        print('Inserted T6+T7 before CTA section')
    else:
        # fallback - insert before end
        new_content = current[:end_idx] + tang6_tang7 + '\n        '
        print('Inserted T6+T7 before end')

    open('KFSP_Email_PaidExpiring_Final_V5.html', 'w', encoding='utf-8').write(new_content)
    print('File written, length:', len(new_content))
else:
    print('Marker not found')
    print('Current end:', current[-200:])
