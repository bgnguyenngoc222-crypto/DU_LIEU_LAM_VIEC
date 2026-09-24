---
name: tvc-pitch
description: >-
  Pipeline kiểu agency để xây 1 TVC/video quảng cáo KFSP từ brief tới pitch package
  hoàn chỉnh, qua 4 vai nối tiếp: ① Insight & Market (research thị trường + đối thủ +
  insight) → ② Creative Concept (3 Big Idea + tagline + lập luận) → ③ Scriptwriter
  (kịch bản đọc + bảng phân cảnh 3 cột, đúng ngân sách chữ) → ④ Visualizer (moodboard
  + storyboard). Nhúng rule cứng KFSP (brand spine, cấm %/làm giàu, education-first,
  giọng ngang hàng) + 2 bản nobrand/brand + nối xuống khâu sản xuất (video-kfsp /
  kfsp-ai-video-clips). TRIGGERS — "pitch TVC", "ý tưởng quảng cáo", "lên concept video",
  "kịch bản TVC", "agency pitch", "research cho quảng cáo", "thuyết phục ý tưởng video",
  "moodboard storyboard cho quảng cáo", "Big Idea cho video". Trigger khi cần BIẾN 1 brief
  thành ý tưởng + kịch bản + storyboard có lập luận để Thanh duyệt. KHÁC video-kfsp (dựng
  Remotion+TTS) và kfsp-ai-video-clips (gen clip AI) — skill này lo phần TRƯỚC sản xuất:
  chiến lược → ý tưởng → kịch bản → storyboard.
---

# tvc-pitch — Agency pipeline dựng TVC/video quảng cáo KFSP

> Biến brief → **pitch package** (insight → big idea → kịch bản → storyboard) đủ sức thuyết phục Thanh duyệt, rồi bàn giao xuống sản xuất.
> Gốc: 4 agent profile Thanh research (`~/Downloads/ai_agency_pitching_agents_md/`) **+ lớp KFSP** + craft kịch bản đọc.
> Đi kèm: playbook chữ [`02_Marketing/content-automation/kenh-kfsp/scripts/_TVC_PLAYBOOK_kich-ban-doc.md`].

## 0. 🔴 Nguyên tắc trước khi chạy
- **Thuyết phục = LẬP LUẬN, không trao tay.** Không bao giờ đưa Thanh 1 VO trần. Luôn dẫn: insight → vì sao idea này → vì sao kịch bản này. Thanh "ưng" khi thấy LOGIC.
- **Rule cứng KFSP (bất biến mọi stage):** brand spine "đưa chứng khoán về tầm tay bạn / chứng khoán trong tầm tay" · **CẤM** lợi nhuận/%/"x lần"/làm giàu/đổi đời (nền tảng reject — KFSP từng dính) · education-first · giọng **ngang hàng "tôi/bạn", không guru** · USP "**làm chủ quyết định, không phím hàng**".
- **2 bản:** nobrand (kênh "Chứng khoán trong tầm tay") + brand (KFSP). Chỉ khác cụm CTA/logo cuối.
- **Hỏi trước khi đoán** (scope/giọng/độ dài). Hỏi giọng+engine+speed TRƯỚC khi gen TTS.

---

## 1. PIPELINE 4 VAI (+ bàn giao sản xuất)

### ① INSIGHT & MARKET — tìm cơ hội thương hiệu
**Việc:** bóc tách brief (mục tiêu/KPI/đối tượng/key message) · soi nội dung+quảng cáo đối thủ (FB Ad Library, content app đối thủ) · đào tâm lý F0 · chốt **1 INSIGHT** dạng *tension statement* ("F0 tin X, nhưng sự thật là Y").
**KFSP context có sẵn:** đối thủ Fireant/Finpath/Simplize + Context Pack (`02_Marketing/KFSP_MARKETING_CONTEXT.md`). Persona F0 sợ ngợp, FOMO, phím hàng.
**Cách chạy:** spawn 1 subagent web-research (mẫu prompt ở §4). Yêu cầu: insight + 3-4 bằng chứng + **competitor matrix → khoảng trống KFSP own** + recommend hướng tiếp cận (universal metaphor vs lived-truth vs hybrid).
**Deliverable:** Context · Competitor Matrix · **Brand Opportunity (white space)**.

### ② CREATIVE CONCEPT — Big Idea
**Việc:** từ insight → **3 concept khác territory** (không 3 biến thể 1 ý) · mỗi concept: tên + tagline + insight nó kịch-hoá + **trái tim cảm xúc (cú vấp/cái giá có thật, gut-level)** + 5-7 beat × giây + cách tính năng land như RESOLUTION + 1 câu "vì sao F0 rung".
**Quy tắc vàng:** ẩn dụ phải **đồng chiều với tính năng**, không cãi nó. (Bài học: "đọc sách từng trang" cãi tính năng *đổi mã NHANH* → hỏng.)
**Deliverable:** Slide "The Big Idea" + 3 concept + **recommendation 1 hero + lý do**.

### ③ SCRIPTWRITER — kịch bản đọc + phân cảnh
**Việc:** concept hero → **VO theo ngân sách chữ** + **bảng phân cảnh 3 cột**.
**Ngân sách chữ (luật cứng):** giọng ấm ≈ 2,3–2,5 chữ/giây → **30s = ~60–70 âm tiết** (viết tới ~27s, chừa nhịp nghỉ + 2s cuối logo). Câu 8–10 chữ.
**Craft bắt buộc (từ playbook):** pivot word đánh dấu cú nhận ra ("Nhưng…/Rồi tôi nhận ra…") · lặp-biến-tấu · cú nhận ra = **1 khung tĩnh không lời** · brand land 3–5s cuối **dán vào đỉnh cảm xúc**, logo mờ hiện *dưới* lời "Tôi chọn KFSP" · sign-off hoàn tất câu nói nhân vật · earn bằng 1 cú vấp thật · chuyển ngôi sang "TÔI".
**Bảng 3 cột:** `# Cảnh + Hình (Visual)` · `Lời đọc (VO) + Sub` · `Âm thanh/nhạc (SFX + mood)`.
**Deliverable:** Master Script 3 cột + VO bản nobrand & brand.

### ④ VISUALIZER — moodboard + storyboard
**Việc:** dịch phân cảnh → prompt ảnh (Gemini/Midjourney) · **style lock** (màu/ánh sáng/grain/nhân vật) · moodboard + bảng màu (tím KFSP #7B3AEC + brand frame) · storyboard khung 9:16 ghép theo timeline.
**Cách nhanh:** HTML storyboard tự mở (khung 9:16 + sketch + timecode + VO + máy) — mẫu: `kenh-kfsp/storyboards/2026-06-26-tvc-*.html`. Hoặc skill `kfsp-image-brief` cho prompt hình.
**Deliverable:** Moodboard + bảng màu + storyboard khung-by-khung.

### ⑤ → BÀN GIAO SẢN XUẤT (ngoài skill này)
- Có voiceover + subtitle chữ trên màn kiểu TikTok → **`video-kfsp`** (Remotion + TTS Vbee).
- Clip AI cinematic không chữ ghép lại → **`kfsp-ai-video-clips`** (Veo/Kling/Seedance).
- Lưu nguồn: script ở `kenh-kfsp/scripts/`, engine ở `~/Desktop/VIDEO KFSP/`.

---

## 2. 📐 OUTPUT — cấu trúc PITCH PACKAGE (thứ tự trình Thanh)
1. **The Brief** (1 dòng: ta đang giải gì).
2. **Chẩn đoán** (nếu sửa bản cũ: vì sao bản trước chưa thuyết phục — earn trust bằng thành thật).
3. **The Insight** (tension statement + bằng chứng).
4. **Brand Opportunity** (competitor matrix → white space KFSP own).
5. **Chiến lược** (universal / lived / hybrid + lý do).
6. **3 Concept** + **recommendation hero**.
7. **Hero Script** (VO + bảng 3 cột, đúng ngân sách chữ).
8. **Moodboard + Storyboard**.
9. **Sản xuất + 2 bản + đo lường** (đường dựng, kênh, KPI).

> Trình theo thứ tự này, Thanh thấy kịch bản là **hệ quả** của insight → dễ "ưng". Đừng nhảy thẳng vào VO.

## 3. ✅ Self-check trước khi trình
- [ ] Idea giải đúng INSIGHT (không phải ý tưởng đẹp rời rạc)?
- [ ] Ẩn dụ **đồng chiều** tính năng (không cãi)?
- [ ] VO ≤ ~70 âm tiết/30s, câu ≤ 20 chữ, đọc thử bấm giờ?
- [ ] Có cú vấp thật + cú nhận ra (1 khung tĩnh) + brand earned ở đỉnh?
- [ ] KHÔNG %/làm giàu, có brand spine, giọng ngang hàng?
- [ ] 2 bản nobrand/brand rõ?

## 4. 🤖 Mẫu prompt spawn subagent
- **Agent ①:** "You are the INSIGHT & MARKET agent… [brief] … return: tension-statement insight + 3-4 bằng chứng + competitor matrix + white space + recommend universal/lived/hybrid. Cite sources. <800 words."
- **Agent ②:** "You are the CREATIVE DIRECTOR agent… [insight] … critique bản VO cũ (nếu có) + 3 Big Idea khác territory, mỗi cái: tên/tagline/insight/trái tim cảm xúc gut-level/beat×giây/feature-as-resolution/vì-sao-F0-rung + recommend hero. <900 words."
- Chạy ① ② song song (1 message, 2 Agent). ③ ④ làm tay theo playbook.

## 5. 📚 Case study tham chiếu
- **"Từng bước một / Every single step" — giới thiệu đổi mã nhanh** (06/2026): pitch doc `kenh-kfsp/PITCH_doi-ma-nhanh.md`; storyboard `storyboards/2026-06-26-tvc-tung-buoc-mot-30s.html`; playbook chữ `scripts/_TVC_PLAYBOOK_kich-ban-doc.md`.
- Bài học khắc cốt: ẩn dụ "đọc sách từng trang" CÃI tính năng đổi-mã-NHANH → research chỉ ra phải đổi sang ẩn dụ **speed-có-sẵn nhưng không bỏ bước** (vd "đoàn tàu FOMO" / "lướt watchlist nhìn tận mắt từng mã").

---

## Changelog
- **2026-06-27 (v1):** Tạo skill từ 4 agent profile Thanh research (`ai_agency_pitching_agents_md`) + nhúng lớp KFSP + craft playbook kịch bản đọc + nối xuống `video-kfsp`/`kfsp-ai-video-clips`. Case test: pitch "đổi mã nhanh". Bài học gốc: ẩn dụ phải đồng chiều tính năng; pitch bằng lập luận, không trao tay VO.
