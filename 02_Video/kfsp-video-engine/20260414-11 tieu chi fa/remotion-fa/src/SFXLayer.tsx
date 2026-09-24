import React from "react";
import { SFX } from "./components/audio/SFX";

// ═══════════════════════════════════════════
// SFX cues — canh CHÍNH XÁC theo Whisper word timestamps (voiceover.json)
// Mỗi cue gắn vào 1 TỪ cụ thể trong voiceover hoặc 1 EVENT visual
// Volume: 0.12-0.30 (dưới voice)
//
// 3 SILENCE moments:
//   f180-f300 (Hook freeze trước choáng)
//   f1336-f1365 (Agitate sau silhouette ngã, trước cánh cửa hi vọng)
//   f2614-f2625 (CTA STILL = tự tin tuyệt đối)
// ═══════════════════════════════════════════

export const SFXLayer: React.FC = () => {
  return (
    <>
      {/* ════ HOOK (f0-f486) — 10 cues ════ */}
      {/* 6 jargon terms — sync với word entry trong Whisper seg 1 */}
      <SFX src="sfx/notification.mp3" triggerFrame={0}   volume={0.16} /> {/* "P" @ 0.00s */}
      <SFX src="sfx/notification.mp3" triggerFrame={12}  volume={0.16} /> {/* "E" @ 0.40s (P/E xong) */}
      <SFX src="sfx/notification.mp3" triggerFrame={37}  volume={0.16} /> {/* "OE" (ROE) @ 1.24s */}
      <SFX src="sfx/notification.mp3" triggerFrame={59}  volume={0.16} /> {/* "EBITDA" @ 1.96s */}
      <SFX src="sfx/notification.mp3" triggerFrame={87}  volume={0.16} /> {/* "OCX" (OCF) @ 2.90s */}
      <SFX src="sfx/notification.mp3" triggerFrame={145} volume={0.16} /> {/* "RIO" (TTM) @ 4.84s */}
      {/* SILENCE f180-f250 (terms freeze, tension build) */}
      <SFX src="sfx/pop.mp3"          triggerFrame={250} volume={0.28} /> {/* "tròng" (choáng) @ 8.34s — PEAK overload */}
      {/* SILENCE f250-f300 */}
      <SFX src="sfx/whoosh.mp3"       triggerFrame={304} volume={0.30} /> {/* "Nếu" @ 10.12s — bot reveal whoosh */}
      <SFX src="sfx/chime.mp3"        triggerFrame={402} volume={0.25} /> {/* "giúp bạn" @ 13.40s — promise chime */}
      <SFX src="sfx/chime.mp3"        triggerFrame={463} volume={0.22} /> {/* "phân tích FA" @ 15.42s — soft close */}

      {/* ════ PROBLEM (f499-f1114) — 9 cues ════ */}
      <SFX src="sfx/whoosh.mp3"       triggerFrame={519} volume={0.28} /> {/* "mở áp đọc tin" @ 17.30s — phone slide */}
      <SFX src="sfx/click.mp3"        triggerFrame={559} volume={0.22} /> {/* "P" (P/E rẻ) @ 18.62s — marker 1 */}
      <SFX src="sfx/click.mp3"        triggerFrame={611} volume={0.22} /> {/* "OE" (ROE cao) @ 20.38s — marker 2 */}
      <SFX src="sfx/click.mp3"        triggerFrame={655} volume={0.22} /> {/* "biên" (biên LN) @ 21.82s — marker 3 */}
      <SFX src="sfx/swoosh.mp3"       triggerFrame={810} volume={0.26} /> {/* PHASE_BCTC=310 (27s) — R1→R3 transition */}
      <SFX src="sfx/pop.mp3"          triggerFrame={881} volume={0.28} /> {/* "200" @ 29.36s — counter pop */}
      <SFX src="sfx/pop.mp3"          triggerFrame={916} volume={0.28} /> {/* "50" @ 30.52s — counter pop */}
      <SFX src="sfx/click.mp3"        triggerFrame={991} volume={0.20} /> {/* "không" @ 33.02s — ? 1 */}
      <SFX src="sfx/click.mp3"        triggerFrame={1011} volume={0.20} /> {/* "bắt đầu" @ 33.70s — ? 2 + 3 (overlap) */}

      {/* ════ AGITATE (f1134-f1801) — 13 cues ════ */}
      <SFX src="sfx/pop.mp3"          triggerFrame={1134} volume={0.14} /> {/* "Ai mới vô" @ 37.80s — wall start */}
      <SFX src="sfx/pop.mp3"          triggerFrame={1175} volume={0.14} /> {/* "trường cũng vậy" @ 39.04s */}
      <SFX src="sfx/notification.mp3" triggerFrame={1244} volume={0.24} /> {/* "vài năm" @ 41.46s — "5 NĂM" badge */}
      <SFX src="sfx/swoosh.mp3"       triggerFrame={1308} volume={0.18} /> {/* "đã số" @ 43.62s — silhouette fall 1 */}
      <SFX src="sfx/swoosh.mp3"       triggerFrame={1315} volume={0.18} /> {/* "người mới" @ 43.84s — fall 2 */}
      <SFX src="sfx/swoosh.mp3"       triggerFrame={1325} volume={0.18} /> {/* "bỏ cuộc" @ 44.16s — fall 3 */}
      <SFX src="sfx/swoosh.mp3"       triggerFrame={1336} volume={0.18} /> {/* "khúc này" @ 44.52s — final fall */}
      {/* SILENCE f1336-f1380 — drop tension trước cánh cửa */}
      <SFX src="sfx/chime.mp3"        triggerFrame={1380} volume={0.28} /> {/* DOOR_APPEAR scene-rel 330 = f1380 (46s) */}
      <SFX src="sfx/whoosh.mp3"       triggerFrame={1470} volume={0.30} /> {/* DOOR_OPEN f1470 (49s) — "Nhưng" voice */}
      <SFX src="sfx/chime.mp3"        triggerFrame={1485} volume={0.30} /> {/* "bạn chỉ cần một bộ" @ 49.50s — số "11" peak */}
      <SFX src="sfx/whoosh.mp3"       triggerFrame={1530} volume={0.24} /> {/* RADAR_REVEAL f1530 — "11" fade → radar */}
      <SFX src="sfx/click.mp3"        triggerFrame={1620} volume={0.18} /> {/* TAM_SUAT scene-rel 540 = f1590, "Dống hồi cao" @53.02s = f1591 — chalk start */}
      <SFX src="sfx/click.mp3"        triggerFrame={1660} volume={0.18} /> {/* "tâm xuất" @ 54.40s — chalk symbol */}
      <SFX src="sfx/chime.mp3"        triggerFrame={1738} volume={0.26} /> {/* "hiểu gốc công thức sâu" @ 57.66s — "x = 9" answer */}

      {/* ════ SOLVE (f1819-f2275) — 11 cues ════ */}
      <SFX src="sfx/whoosh.mp3"       triggerFrame={1819} volume={0.30} /> {/* "Mời một chỉ số" @ 60.62s — radar slide */}
      <SFX src="sfx/swoosh.mp3"       triggerFrame={1840} volume={0.20} /> {/* "phân tích cơ bản" @ 61.32s — sweep start */}
      {/* 11 sweep ticks → distribute 1 cue per ~5f over 60f (lighter, không cluster) */}
      <SFX src="sfx/pop.mp3"          triggerFrame={1850} volume={0.10} />
      <SFX src="sfx/pop.mp3"          triggerFrame={1862} volume={0.10} />
      <SFX src="sfx/pop.mp3"          triggerFrame={1874} volume={0.10} />
      <SFX src="sfx/chime.mp3"        triggerFrame={1889} volume={0.28} /> {/* "vẽ thành" @ 62.98s — "11 CHỈ SỐ" badge snap */}
      <SFX src="sfx/whoosh.mp3"       triggerFrame={1907} volume={0.26} /> {/* "gia đa kiểu" @ 63.56s — analogy cut */}
      <SFX src="sfx/pop.mp3"          triggerFrame={1930} volume={0.22} /> {/* "gia đa cầu thủ" @ 64.34s — football */}
      <SFX src="sfx/pop.mp3"          triggerFrame={1951} volume={0.22} /> {/* "bóng đại" @ 65.04s — KFSP radar */}
      <SFX src="sfx/chime.mp3"        triggerFrame={1988} volume={0.26} /> {/* "mạnh" @ 66.26s — "CÙNG 1 CÁCH ĐỌC" */}
      <SFX src="sfx/click.mp3"        triggerFrame={2052} volume={0.26} /> {/* "Bấm thẳng vào" @ 68.40s — tap */}
      <SFX src="sfx/swoosh.mp3"       triggerFrame={2080} volume={0.28} /> {/* "tình điểm" @ 69.32s — drill zoom */}
      <SFX src="sfx/notification.mp3" triggerFrame={2117} volume={0.20} /> {/* "áp hiện luôn điểm" @ 70.58s — red pill */}
      <SFX src="sfx/chime.mp3"        triggerFrame={2170} volume={0.28} /> {/* "Bạn vẫn đang phân tích" @ 72.34s — line đắt */}
      <SFX src="sfx/chime.mp3"        triggerFrame={2234} volume={0.30} /> {/* "có lối vào" @ 74.46s — line đắt 2 gold */}

      {/* ════ ACTION (f2293-f2614) — 9 cues ════ */}
      <SFX src="sfx/whoosh.mp3"       triggerFrame={2293} volume={0.28} /> {/* "Mở áp" @ 76.44s — phone slide */}
      <SFX src="sfx/swoosh.mp3"       triggerFrame={2340} volume={0.20} /> {/* "trọn báo quan tâm" @ 78.00s — swipe */}
      <SFX src="sfx/swoosh.mp3"       triggerFrame={2372} volume={0.20} /> {/* "nhìn gia đa" @ 79.08s — back to radar */}
      <SFX src="sfx/pop.mp3"          triggerFrame={2385} volume={0.26} /> {/* "nằm dây" (ngay đây) @ 79.50s — "5 GIÂY" badge */}
      {/* 5 ticks for "5 GIÂY" counter — synced với từ "nằm dây" (ngay đây) */}
      <SFX src="sfx/click.mp3"        triggerFrame={2398} volume={0.16} />
      <SFX src="sfx/click.mp3"        triggerFrame={2416} volume={0.16} />
      <SFX src="sfx/click.mp3"        triggerFrame={2434} volume={0.16} />
      <SFX src="sfx/click.mp3"        triggerFrame={2452} volume={0.16} />
      <SFX src="sfx/click.mp3"        triggerFrame={2470} volume={0.20} />
      <SFX src="sfx/swoosh.mp3"       triggerFrame={2462} volume={0.26} /> {/* "để xem điểm số" @ 82.06s — drill zoom */}
      <SFX src="sfx/chime.mp3"        triggerFrame={2514} volume={0.28} /> {/* "Cái cửa vào FA" @ 83.80s — door appear */}
      <SFX src="sfx/success.mp3"      triggerFrame={2582} volume={0.22} /> {/* "linh tải" @ 86.08s — CTA outro */}
      {/* SILENCE f2614-f2625 — STILL = tự tin tuyệt đối */}
    </>
  );
};
