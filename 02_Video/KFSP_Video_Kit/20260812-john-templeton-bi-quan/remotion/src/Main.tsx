import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Bg } from './Bg';
import { BrandFrame } from './BrandFrame';
import { Subtitle } from './Subtitle';
import { SceneBefore } from './SceneBefore';
import { SceneTempleton } from './SceneTempleton';
import { SceneTroughOpportunity } from './SceneTroughOpportunity';
import { SceneCatchOpportunity } from './SceneCatchOpportunity';
import { Scene3Truths } from './Scene3Truths';
import { SceneBridgeApp } from './SceneBridgeApp';
import { SceneActionCTA } from './SceneActionCTA';
import { SCENES } from './timing';
import { FONTS } from './theme';

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  // Find active sentence for Subtitle
  let currentId = '';
  let currentText = '';
  let currentDur = 30;
  let currentRelFrame = 0;

  for (const key of Object.keys(SCENES) as (keyof typeof SCENES)[]) {
    const sc = SCENES[key];
    if (frame >= sc.from && frame < sc.from + sc.dur) {
      currentId = key;
      currentText = sc.text;
      currentDur = sc.dur;
      currentRelFrame = frame - sc.from;
      break;
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1628', fontFamily: FONTS.main }}>
      {/* Full 95.5s Audio Voiceover (Vbee) */}
      <Audio src={staticFile('voice_full.mp3')} />

      {/* Dynamic Background Grid & Atmosphere */}
      <Bg />

      {/* VISUAL CONTENT SCENES (Full 2865 Frames / 95.5s) */}

      {/* 1. BEFORE (00:00 -> 00:13.0 | Frames 0 -> 390)
          - 0s - 4s: Stylized characters bowing & tapping glowing phones in front of Red Board
          - 4s - 6s: Characters throw phones back & dissolve away
          - 7s - 13s: Apple-Style 3D rise cards with negative quotes
      */}
      <Sequence from={0} durationInFrames={390}>
        <SceneBefore />
      </Sequence>

      {/* 2. SIR JOHN TEMPLETON (00:13.0 -> 00:23.83 / 00:13:00 -> 00:23:25 | Frames 390 -> 715)
          - Portrait cropped clean face + gold aura
          - Typewriter quote animation + 4 cycle stages
      */}
      <Sequence from={390} durationInFrames={325}>
        <SceneTempleton />
      </Sequence>

      {/* 3. TROUGH BOTTOM ACCUMULATION (00:23.83 -> 00:28.83 / 00:23:25 -> 00:28:25 | Frames 715 -> 865)
          - Dramatic bottoming chart + radar beacon "VÙNG CƠ HỘI LỚN NHẤT TẠO ĐÁY"
      */}
      <Sequence from={715} durationInFrames={150}>
        <SceneTroughOpportunity />
      </Sequence>

      {/* 4. CATCH OPPORTUNITY & ❌ CẢM TÍNH (00:28.83 -> 00:34.67 / 00:28:25 -> 00:34:20 | Frames 865 -> 1040)
          - 3D Fintech HUD scanner & Opportunity Gem
          - Neon red impact slam ❌ CẢM TÍNH vs 💎 BẢN LĨNH
      */}
      <Sequence from={865} durationInFrames={175}>
        <SceneCatchOpportunity />
      </Sequence>

      {/* 5. 3 TRUTHS MINDSET (00:34.67 -> 01:02.17 | Frames 1040 -> 1865)
          - Title 'Có 3 sự thật quan trọng thay đổi góc nhìn'
          - TRUTH 1: Phân hóa thị trường & tích lũy ngầm
          - TRUTH 2: Cổ phiếu khỏe giữ nền hỗ trợ & mẫu hình kiến tạo
          - TRUTH 3: Cơ hội khi còn hoài nghi
      */}
      <Sequence from={1040} durationInFrames={840}>
        <Scene3Truths />
      </Sequence>

      {/* 6. BRIDGE KFSP APP FEATURE (01:02.17 -> 01:23.5 | Frames 1865 -> 2505)
          - Tính năng Cơ Hội Tiềm Năng: Quét toàn thị trường, Hai đáy, Vai đầu vai ngược, nút Biểu đồ
      */}
      <Sequence from={1865} durationInFrames={640}>
        <SceneBridgeApp />
      </Sequence>

      {/* 7. ACTION & CTA (01:23.5 -> 01:35.5 | Frames 2505 -> 2865)
          - Kỷ luật quản trị rủi ro + Mở app KFSP + "Đưa chứng khoán về tầm tay bạn"
      */}
      <Sequence from={2505} durationInFrames={360}>
        <SceneActionCTA />
      </Sequence>

      {/* Persistent Brand Overlays */}
      <BrandFrame />

      {/* Subtitle removed per user request */}
    </AbsoluteFill>
  );
};
