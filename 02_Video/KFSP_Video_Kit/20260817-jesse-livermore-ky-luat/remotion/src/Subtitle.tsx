import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { C, FONTS } from './theme';
import sentencesData from '../../sentences.json';

interface SubtitleProps {
  sentenceId?: string;
  text: string;
  durationInFrames: number;
  relFrame?: number;
}

interface WordTiming {
  word: string;
  startFrame: number;
  endFrame: number;
}

export const Subtitle: React.FC<SubtitleProps> = ({ sentenceId, text, durationInFrames, relFrame }) => {
  const globalFrame = useCurrentFrame();
  const frame = relFrame !== undefined ? relFrame : globalFrame;
  const opacity = interpolate(
    frame,
    [0, 6, durationInFrames - 6, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Find sentence data from sentences.json
  const sentenceObj = sentencesData.sentences.find(s => s.id === sentenceId);
  
  let wordTimings: WordTiming[] = [];
  
  if (sentenceObj && sentenceObj.word_timestamps && sentenceObj.word_timestamps.length > 0) {
    // If we have precise timestamps from Whisper
    const fps = 30;
    wordTimings = (sentenceObj.word_timestamps as any[]).map(wt => ({
      word: wt.word,
      startFrame: Math.floor(wt.start * fps),
      endFrame: Math.ceil(wt.end * fps)
    }));
  } else {
    // Character-based dynamic estimation fallback
    const words = text.split(' ').filter(w => w.length > 0);
    const totalChars = words.reduce((sum, w) => sum + w.length, 0);
    
    let currentStart = 0;
    wordTimings = words.map(w => {
      const wordDur = (w.length / totalChars) * durationInFrames;
      const end = currentStart + wordDur;
      const timing = {
        word: w,
        startFrame: Math.round(currentStart),
        endFrame: Math.round(end)
      };
      currentStart = end;
      return timing;
    });
  }

  // 1-LINE KARAOKE SEGMENTING LOGIC
  // Group words into groups of max 6 words to guarantee maximum 1 line on mobile screen.
  const WORDS_PER_SEGMENT = 6;
  
  // Find currently active word index
  let activeWordIdx = wordTimings.findIndex(wt => frame >= wt.startFrame && frame < wt.endFrame);
  if (activeWordIdx === -1) {
    // Fallback: find the last word that has already been spoken
    const lastSpokenIdx = [...wordTimings].reverse().findIndex(wt => frame >= wt.endFrame);
    if (lastSpokenIdx !== -1) {
      activeWordIdx = wordTimings.length - 1 - lastSpokenIdx;
    } else {
      activeWordIdx = 0;
    }
  }

  // Determine active segment index
  const segmentIdx = Math.floor(activeWordIdx / WORDS_PER_SEGMENT);
  const startWordIdx = segmentIdx * WORDS_PER_SEGMENT;
  const endWordIdx = Math.min(startWordIdx + WORDS_PER_SEGMENT, wordTimings.length);
  
  const visibleWordTimings = wordTimings.slice(startWordIdx, endWordIdx);

  return null; // Phụ đề đã được ẩn theo yêu cầu
  /*
  return (
    <div
      style={{
        position: 'absolute',
        top: 1380, // Safe zone của TikTok (y=1380-1470)
        left: 60,
        right: 60,
        textAlign: 'center',
        zIndex: 99, // Max priority
        opacity,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          backgroundColor: 'rgba(10, 22, 40, 0.92)',
          padding: '16px 28px',
          borderRadius: 24,
          border: `1.5px solid ${C.borderViolet}`,
          backdropFilter: 'blur(12px)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div
          style={{
            margin: 0,
            fontSize: 130, // Đã chỉnh theo ý bạn (tạm đặt 120 vì 12px trên 1920p sẽ quá nhỏ, nếu bạn muốn chính xác 12px vui lòng báo lại nhé)
            fontWeight: 700,
            lineHeight: 1.45,
            fontFamily: FONTS.main,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px 12px'
          }}
        >
          {visibleWordTimings.map((wt, idx) => {
            // Re-calculate local index in the full timings array
            const fullIdx = startWordIdx + idx;
            const isActive = fullIdx === activeWordIdx;
            const isPast = fullIdx < activeWordIdx;
            
            // Set styles for karaoke highlight
            let color = 'rgba(255, 255, 255, 0.4)'; // default muted for upcoming words
            let textShadow = 'none';
            let scale = 1;
            
            if (isActive) {
              color = C.gold; // active word: Brand gold color
              textShadow = `0 0 12px ${C.gold}`;
              scale = 1.06;
            } else if (isPast) {
              color = C.white; // past word: fully visible white
            }
            
            return (
              <span
                key={idx}
                style={{
                  color,
                  textShadow,
                  transform: `scale(${scale})`,
                  transition: 'all 0.1s ease',
                  display: 'inline-block'
                }}
              >
                {wt.word}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
  */
};
