import re

files_info = {
    'KFSP_Email_Free_Final_V5.html': {
        'card1_title': 'QUÉT TỰ ĐỘNG',
        'card1_text': 'Trong lúc bạn tự kẻ vẽ thủ công, bộ lọc Cơ Hội Tiềm Năng đã âm thầm quét qua toàn bộ thị trường và trả về những tín hiệu điểm nổ (breakout) chính xác.',
        'card2_title': 'TIẾT KIỆM THỜI GIAN',
        'card2_text': 'Tự bơi giữa biển tin tức nhiễu loạn làm mất đi nguồn lực thời gian quý giá. Các cơ hội lớn nhất luôn nằm ở nơi người dùng tay không không thể nhìn thấy.'
    },
    'KFSP_Email_Trial_Final_V5.html': {
        'card1_title': 'LỢI THẾ ĐỊNH LƯỢNG',
        'card1_text': 'Bạn đang đi đúng hướng. Các mốc tỷ lệ Rủi ro và Cơ hội đã được tính toán sẵn. Kịch bản mua bán đã được khoanh vùng. Bạn đang nắm trong tay lợi thế vượt trội.',
        'card2_title': 'NGUY CƠ GIÁN ĐOẠN',
        'card2_text': 'Quyền dùng thử rồi sẽ khép lại. Việc chần chừ có thể khiến hệ thống radar của bạn bị ngắt kết nối đúng vào khoảnh khắc thị trường bứt phá mạnh nhất.'
    },
    'KFSP_Email_Winback_Final_V5.html': {
        'card1_title': 'TÍN HIỆU NGẦM',
        'card1_text': 'Cơ hội không bao giờ báo trước bằng tiếng ồn. Hàng loạt mẫu hình Hai Đáy và Vai Đầu Vai Ngược đã được hệ thống bóc tách và đưa vào danh sách chờ sẵn.',
        'card2_title': 'BÃI CÂU CỦA BẠN',
        'card2_text': 'Trong khoảng thời gian bạn rời đi, thị trường đã có những nhịp đập âm thầm kiến tạo nền giá. Tại sao bạn lại rời bỏ bãi câu của mình đúng vào lúc dòng nước đang chuyển mình?'
    },
    'KFSP_Email_PaidExpiring_Final_V5.html': {
        'card1_title': 'SỰ XUYÊN SUỐT',
        'card1_text': 'Để chủ động đón đầu những cơ hội mới, một kịch bản giao dịch hoàn hảo không thể bị gián đoạn chỉ vì tài khoản của bạn bất ngờ hết hạn.',
        'card2_title': 'PHAO CỨU SINH',
        'card2_text': 'Giữa lúc thị trường đang có nhiều biến chuyển, việc duy trì hệ thống cảnh báo và tầm soát là chiếc phao cứu sinh bảo vệ thành quả của bạn.'
    }
}

for f, info in files_info.items():
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    replacement = f'''<!-- Alert Block - Option 2 (Tươi sáng & Tích cực) -->
                <tr>
                  <td align="center" valign="top" style="padding: 15px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                      style="background-color: #FFFFFF; border: 2px solid #FDE047; border-radius: 12px; text-align: center; box-shadow: 0 8px 20px rgba(253, 224, 71, 0.15); font-family: 'Open Sans', Arial, sans-serif;">
                      <tr>
                        <td style="padding: 25px 20px; font-family: 'Open Sans', Arial, sans-serif;">
                          <!-- Badge Quà Tặng -->
                          <div
                            style="display: inline-block; background-color: #FEF08A; color: #854D0E; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px; font-family: 'Open Sans', Arial, sans-serif;">
                            🎁 Quà sinh nhật vẫn đang chờ
                          </div>
                          <!-- Tiêu đề -->
                          <div
                            style="font-family: 'Open Sans', Arial, sans-serif; font-size: 16px; color: #111827; font-weight: 900; margin-bottom: 10px; text-transform: uppercase;">
                            NẮM BẮT THỜI CƠ, VỮNG VÀNG HÀNH ĐỘNG
                          </div>
                          <!-- Nội dung -->
                          <div
                            style="font-family: 'Open Sans', Arial, sans-serif; font-size: 13.5px; color: #4B5563; line-height: 1.6; max-width: 95%; margin: 0 auto;">
                            Những ngày ưu đãi cuối cùng của tháng sinh nhật là thời điểm tốt nhất để bạn củng cố lại hệ
                            thống giao dịch. Tận dụng ngay đặc quyền này để trang bị cho mình chiếc mỏ neo kỷ luật, giúp
                            bạn thảnh thơi nắm bắt cơ hội mới với tâm thế vững vàng nhất.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              <!-- 2 Content Cards (Restored & Lightened - Side by Side on Mobile) -->
          <tr>
            <td style="padding: 10px 0px 30px 0px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="48%" align="center" valign="top" style="font-weight: normal;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF"
                      style="border-radius: 12px; border: 1px solid #D8B4FE; padding: 15px 10px; height: 100%;">
                      <tr>
                        <td align="center" valign="top">
                          <h3
                            style="color: #7B3AEC; font-size: 14px; margin: 0 0 10px 0; font-weight: 800; text-transform: uppercase;">
                            {info['card1_title']}</h3>
                          <p style="color: #4B5563; font-size: 12px; line-height: 1.5; margin: 0;">
                            {info['card1_text']}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" align="center" valign="top" style="font-weight: normal;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF"
                      style="border-radius: 12px; border: 1px solid #D8B4FE; padding: 15px 10px; height: 100%;">
                      <tr>
                        <td align="center" valign="top">
                          <h3
                            style="color: #7B3AEC; font-size: 14px; margin: 0 0 10px 0; font-weight: 800; text-transform: uppercase;">
                            {info['card2_title']}</h3>
                          <p style="color: #4B5563; font-size: 12px; line-height: 1.5; margin: 0;">
                            {info['card2_text']}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>'''

    content = re.sub(r'<!-- Alert Block Compact.*?<!-- KHỐI 3 THẺ GIÁ XẾP DỌC', replacement + '\n\n              <!-- KHỐI 3 THẺ GIÁ XẾP DỌC', content, flags=re.DOTALL)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f + ' updated')
