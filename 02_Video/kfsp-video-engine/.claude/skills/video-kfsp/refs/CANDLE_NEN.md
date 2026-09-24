# REF chuyên đề — Video NẾN / mẫu hình nến / gộp nến

> Đọc file này (KHÔNG cần đọc cả SKILL.md) khi dựng video về: nến Nhật, mẫu hình nến đảo chiều, gộp nến, Búa/Sao băng/Doji, vai đầu vai... Đúc từ video "Nguyên lý nến gộp" (24/06/2026, qua 9 vòng sửa với Thanh).

---

## 1. 🔴 Quy tắc vẽ NẾN OHLC (chỗ sai nhiều nhất — Thanh soi rất kỹ)
- Mỗi nến = `{O, C, H, L}` trong thang giá (số lớn = giá cao). **KHÔNG vẽ tay từng cây** → dùng **1 component data-driven**: input O/C/H/L → tự suy màu + vẽ thân/bóng. Vẽ tay = sai lẻ (đã vấp ở v3: nến xanh đóng dưới).
- **Nến XANH** `C>O`: **đóng ở TRÊN thân, mở ở DƯỚI**. Màu `#34d399`.
- **Nến ĐỎ** `O>C`: **mở ở TRÊN thân, đóng ở DƯỚI**. Màu `#f87171`.
- **Doji** `O≈C`: thân rất mỏng.
- Bóng (wick): từ `H` → cạnh trên thân; từ cạnh dưới thân → `L`. Wick mảnh.

## 2. 🔴 Quy tắc GỘP NẾN
- `Gộp.O = nến ĐẦU.O` · `Gộp.C = nến CUỐI.C` · `Gộp.H = max(mọi H)` · `Gộp.L = min(mọi L)`.
- Màu nến gộp theo `Gộp.C` vs `Gộp.O`.
- **Quy luật hình:** mẫu đảo chiều **TĂNG** (nhấn chìm tăng, sao mai, harami tăng, xuyên thấu, 3 lính, ba trong/ngoài tăng...) gộp → **Búa** (thân nhỏ TRÊN, bóng DƯỚI dài) hoặc **nến tăng mạnh**. Mẫu **GIẢM** (nhấn chìm giảm, sao hôm, mây đen...) → **Sao băng** (thân nhỏ DƯỚI, bóng TRÊN dài) hoặc **nến giảm mạnh**. Tweezer → **Doji**.
- **Nét đứt nối** (cho thấy nến gộp lấy số từ đâu): mở (từ cạnh-mở cây đầu) · đóng (từ cạnh-đóng cây cuối — TRÊN nếu xanh / DƯỚI nếu đỏ) · đỉnh/đáy (từ cực trị cụm). Cách vẽ Thanh thích: **GIỮ nến gốc + vẽ THÊM nến gộp bên cạnh + nét đứt nối** (đừng morph nến gốc biến mất).

## 3. Dữ liệu OHLC 20 mẫu + nguồn Figma (CHUẨN CUỐI)
- **Spec 20 mẫu sẵn:** `02_Marketing/content-automation/kenh-kfsp/scripts/SPEC_OHLC_gop_nen_20_mau.md` (đã đối chiếu Figma; lưu ý #19 Ba trong giảm & #20 Ba ngoài giảm nến gộp = **ĐỎ**).
- **Figma "candlestick pattern"** key `iIfUyCbggCrMybowE6zSLV`:
  - `37:567` — 4 mẫu gộp lõi (2x2 thẻ vuông, nến to rõ + mũi tên GỘP) = style thẻ chuẩn.
  - `37:642` — cheat-sheet đầy đủ **20 mẫu** có gộp (nến đôi 10 + nến ba 10).
  - `53:5028` (sáng) / `53:5070`,`53:5115` (tối) — **BỐI CẢNH BỘ NẾN 3 panel** (đáy đáng-tin / giữa bỏ-qua / đỉnh cảnh-báo).
- **Cách xem Figma:** REST token hay hết hạn → dùng plugin `figma_capture_screenshot` (trước đó `figma_navigate` URL `…/candlestick%20pattern` để switch active file; kiểm `figma_list_open_files`). **Luôn đối chiếu từng mẫu với Figma — Figma thắng spec.**

## 4. Bài học NỘI DUNG (luận giải đúng cơ chế)
- **Bối cảnh quyết định nghĩa:** cùng cây Búa — **ở ĐÁY** (sau nhịp giảm) = phe mua phản công = đảo chiều tăng đáng tin; **ở GIỮA** = vô nghĩa; **ở ĐỈNH** (sau nhịp tăng) = **Người treo cổ (Hanging Man)** = phe bán đã ép giá trong phiên dù cuối phiên phe mua kéo lại = **cảnh báo, KHÔNG phải báo đáy**. (Đọc cái BÓNG = hành vi trong phiên, đừng đóng khung "đẹp/xấu".)
- Tuyến nến gộp = "nhiều mẫu, một hình" → khỏi học vẹt 40 tên. Nhưng HÌNH chưa đủ → phải xem BỐI CẢNH (nối sang video **"Cứ thấy nến búa là MÚC?"** — tên Thanh chốt cho video bối cảnh).
- **Nến Nhật = kể chuyện tâm lý bằng hình ảnh** (Homma, Sakata Ngũ pháp: Tam Sơn/Tam Xuyên/Tam Không/Tam Binh/Tam Pháp; **Tam Tôn 三尊 = vai đầu vai**, Nghịch Tam Tôn = vai đầu vai ngược ở đáy). Tên ẩn dụ (Búa, Người treo cổ, Sao Mai/Hôm, Mây đen...) dễ nhớ hơn thuật ngữ Tây.

## 5. Bố cục MÀN LIỆT KÊ (Thanh chốt qua nhiều vòng)
- **Màn RIÊNG từng nhóm** (đáy-only / đỉnh-only): **thẻ "hơi vuông" 2 cột**, nến TO rõ (mỗi thẻ: nguồn → GỘP → kết quả + tên + nhãn).
- **Màn TỔNG HỢP cả 20 mẫu** (summary + cheat-sheet để lưu): **lưới 4 cột × 5 hàng**, nến **thon ngang**, chữ nhỏ, **bỏ tiêu đề trên**.
- (Cả 2 kiểu layout này đều có sẵn trong code bản chốt `…-v9/remotion/src/Main.tsx` — clone từ đó.)
  - Màn summary giữa video: **bỏ nút CTA**. Màn **CUỐI** (cheat-sheet "lưu lại"): **GIỮ CTA** + spine.
- **Canh theo narration:** nhóm ĐÁY hiện nửa thời gian đầu của montage, nhóm ĐỈNH nửa sau (mỗi nhóm có thể chia 2 đợt 5 thẻ để nến luôn to).
- **Safe zone:** tiêu đề/header ≥ y190 (dưới logo top y78-150); minh hoạ/nút ≤ y1320 (trên sub y1380-1470). **Ngoại lệ:** màn liệt kê có thể ẨN SUB → grid dùng full height y190→~1855 (audio vẫn chạy). Bỏ nút to đè lưới.

## 6. Sản xuất (engine nến monolithic)
- Tái dùng engine **monolithic** (`Main.tsx` 1 file + `data.json` timing cumulative), KHÔNG per-sentence Sentence{ID}.tsx. Clone folder video nến gần nhất (giữ symlink `node_modules`, copy `design.ts`/scripts/SFX/logo). Port riêng mỗi video.
- **TTS:** Vbee Minh Quân `hn_male_minhquan_yt-stable` speed 1.0 → gen **per-sentence** (split-by-silence ngưỡng 0.9s **FAIL** với MQ vì pause ngắn ~0.8s; gen từng câu sạch hơn). `build_data.py` stitch voice_full + **map chữ DISPLAY vào timing WHISPER** (whisper VN méo chữ, chỉ tin timing).
- Trick phát âm: "KFSP"→"Ca Ép Ét Bê", "Follow"→"Phô Lâu", giữ "bốn chục" (không đọc 40).
- Bằng chứng sản phẩm: chèn **ảnh app thật** quét mẫu hình (vd Vai-đầu-vai VJC `app-vdv.png` + Hai-đáy VDS `app-2day.png` ở `20260622-cktt-cu-thay-bua-la-day/remotion/public/`), objectFit `contain` KHÔNG crop.

## 7. Lịch sử video nến (folder ~/Desktop/VIDEO KFSP/)
`20260607-cktt-3-cau-hoi-scp` · `20260613-...5-mau-nen-dao-chieu-day` · `20260615-...pho-xam-lan-nen-doi` · `20260622-...cu-thay-bua-la-day` (bối cảnh "Cứ thấy nến búa là MÚC?", 4 bản) · `20260624-...nguyen-ly-nen-gop-v9` (gộp nến — **bản chốt duy nhất**, các bản v1-v8 đã xoá: OHLC data-driven, 20 mẫu, màn riêng 2-cột + màn tổng hợp lưới 4-cột).
