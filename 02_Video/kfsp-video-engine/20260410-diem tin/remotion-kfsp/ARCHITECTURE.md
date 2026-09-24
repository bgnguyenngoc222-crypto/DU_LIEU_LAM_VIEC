# Remotion KFSP — Kiến trúc Video Điểm Tin

## Tổng quan

Video 9:16 (1080x1920), 30fps, ~60-90 giây.
Input: JSON data + screenshots + audio voiceover.
Output: MP4 video hoàn chỉnh với subtitle, nhạc nền, SFX.

## Scene Map (theo video mẫu)

```
Timeline (giây):
0───5───10───15───20───25───30───35───40───45───50───55───60───65───70───75───80
│ S1 │   S2   │  S3  │   S4   │   S5   │  S6  │   S7   │  S8  │  S9 │S10│
│Open│ Index  │Bread │Sector  │Heatmap │Detail│ Stock  │RS/RRG│ CTA │End│
```

### Scene 1: Opening (0-5s)
- Logo KFSP fly-in animation
- Ngày tháng fade-in
- Headline: "CẬP NHẬT THỊ TRƯỜNG dd/mm"
- SFX: swoosh + news jingle
- Transition OUT: zoom-blur

### Scene 2: Market Index (5-15s)  
- 3 IndexCard animate in: VNI, HNX, VN30
- Số liệu count-up animation
- % thay đổi flash (xanh/đỏ)
- Screenshot app KFSP phía sau (blur + scale)
- SFX: tick-tick count, pop khi số xuất hiện

### Scene 3: Market Breadth (15-20s)
- Animated stacked bar: Tăng/Đứng/Giảm
- Số mã counter animation
- Screenshot chart "Số lượng mã tăng giảm theo thời gian"
- SFX: chart whoosh

### Scene 4: Sector Performance (20-30s)
- Horizontal bar chart animate từ trái → phải
- Highlight ngành nổi bật (viền đỏ pulse)
- Screenshot "Nỗ lực kết quả" từ app
- SFX: bar grow sound, highlight ding

### Scene 5: Heatmap (30-38s)
- Treemap blocks zoom-in lần lượt
- Color: xanh (tăng) / đỏ (giảm)
- Screenshot treemap từ app
- SFX: block pop sounds

### Scene 6: Sector Detail (38-45s)
- Zoom vào ngành cụ thể (BĐS, Dầu khí...)
- Data cards animate in
- Screenshot zoom section
- SFX: zoom swoosh

### Scene 7: Stock Highlight (45-55s)
- Mã cổ phiếu nổi bật (ticker + %)
- Mini chart animation
- Screenshot detail từ app
- SFX: highlight chime

### Scene 8: RS/RRG Analysis (55-65s)
- RS line chart animate draw
- Multi-line với legend
- Screenshot "Toàn cảnh thị trường"
- SFX: line draw sound

### Scene 9: CTA (65-75s)
- App features showcase
- "Tải KFSP ngay" với QR/link
- Screenshot app tools
- SFX: notification bell

### Scene 10: Closing (75-82s)
- Logo KFSP scale up
- Social links
- Fade to black
- SFX: outro jingle

## Layout (9:16)

```
┌──────────────────────┐
│   Status bar gap 60px │
│                       │
│  ┌─────────────────┐  │
│  │                 │  │
│  │   SCREENSHOT    │  │  ← Screenshot/Infographic zone
│  │   or            │  │     (padding: 40px sides)
│  │   INFOGRAPHIC   │  │     (y: 200-1200)
│  │                 │  │
│  └─────────────────┘  │
│                       │
│  ┌─────────────────┐  │
│  │   SUBTITLE      │  │  ← Subtitle zone (y: 1350-1600)
│  │   TEXT BOLD     │  │     Semi-transparent bg
│  └─────────────────┘  │
│                       │
│      ◉ KFSP           │  ← Watermark (y: 1700)
│                       │
└──────────────────────┘

Background: Blurred screenshot (opacity 0.3)
```

## Component Tree

```
<DiemTinVideo>
  ├── <BackgroundBlur />           ← Ảnh nền blur toàn frame
  ├── <Series>                     ← Remotion Series (sequential scenes)
  │   ├── <SceneOpening />
  │   ├── <TransitionWrapper>
  │   │   └── <SceneMarketIndex />
  │   ├── <TransitionWrapper>
  │   │   └── <SceneMarketBreadth />
  │   ├── <TransitionWrapper>
  │   │   └── <SceneSectorPerf />
  │   ├── <TransitionWrapper>
  │   │   └── <SceneHeatmap />
  │   ├── <TransitionWrapper>
  │   │   └── <SceneSectorDetail />
  │   ├── <TransitionWrapper>
  │   │   └── <SceneStockHighlight />
  │   ├── <TransitionWrapper>
  │   │   └── <SceneRSRRG />
  │   ├── <TransitionWrapper>
  │   │   └── <SceneCTA />
  │   └── <SceneClosing />
  ├── <SubtitleTrack />            ← Subtitle overlay (synced với audio)
  ├── <AudioVoiceover />           ← Voice TTS/audio file
  ├── <AudioBGM />                 ← Background music (loop, -15dB)
  └── <Watermark />                ← Logo KFSP bottom
```

## Shared Components

### Infographic Components
- `<IndexCard />` — Card VNI/HNX/VN30 với count-up
- `<BarChartH />` — Horizontal bar chart (ngành)
- `<StackedBar />` — Stacked bar (tăng/giảm/đứng)
- `<Treemap />` — Heatmap treemap blocks
- `<LineChart />` — RS/RRG multi-line
- `<DataCard />` — Card thông tin (ticker, %, giá)
- `<NumberCounter />` — Animated number count-up

### UI Components
- `<SubtitleBar />` — Text bold + keyword highlight + semi-bg
- `<Watermark />` — Logo KFSP
- `<ScreenshotFrame />` — Screenshot với rounded corners + shadow
- `<HighlightBox />` — Viền đỏ pulse cho highlight

### Animation Components
- `<FadeIn />` — Fade in wrapper
- `<SlideIn />` — Slide from direction
- `<ScaleIn />` — Scale from 0 → 1
- `<CountUp />` — Number counter
- `<TypeWriter />` — Text typing effect
- `<DrawLine />` — SVG line draw

### Transition Components
- `<TransitionWrapper />` — Wrapper cho scene transitions
  - slide-left, slide-right, slide-up
  - fade, zoom-blur, wipe
  - dissolve

### Audio Components
- `<SFX />` — Sound effect trigger at specific frame
  - swoosh, pop, ding, tick, whoosh, chime, jingle
- `<AudioBGM />` — Background music (loop, volume control)

## Data Input Schema

```typescript
interface DiemTinData {
  meta: {
    date: string;          // "2026-04-10"
    title: string;         // "CẬP NHẬT THỊ TRƯỜNG"
  };
  voiceover: string;       // path to audio file
  bgm: string;             // path to background music
  
  indices: {
    vni: { value: number; change: number; pct: number };
    hnx: { value: number; change: number; pct: number };
    vn30: { value: number; change: number; pct: number };
  };
  
  breadth: {
    advance: number;       // số mã tăng
    decline: number;       // số mã giảm
    unchanged: number;     // đứng giá
  };
  
  sectors: Array<{
    name: string;
    change_pct: number;
    highlight: boolean;
  }>;
  
  heatmap: Array<{
    sector: string;
    stocks: Array<{
      ticker: string;
      change_pct: number;
      weight: number;      // for treemap sizing
    }>;
  }>;
  
  highlights: Array<{
    ticker: string;
    change_pct: number;
    note: string;
  }>;
  
  rs_data: Array<{
    sector: string;
    values: number[];      // RS values over time
  }>;
  
  screenshots: {
    market_overview: string;   // path
    breadth_chart: string;
    sector_chart: string;
    heatmap: string;
    rs_chart: string;
    app_tools: string;
  };
  
  subtitles: Array<{
    start: number;         // frame
    end: number;
    text: string;
    keywords: Array<{
      word: string;
      color: "green" | "red" | "yellow" | "white";
    }>;
  }>;
}
```

## Sound Effects Library

```
sfx/
├── transitions/
│   ├── swoosh.mp3         ← Scene transitions
│   ├── whoosh-soft.mp3    ← Subtle transitions
│   └── zoom-blur.mp3      ← Zoom transitions
├── ui/
│   ├── pop.mp3            ← Element appear
│   ├── tick.mp3           ← Counter tick
│   ├── ding.mp3           ← Highlight
│   ├── chime.mp3          ← Stock highlight
│   └── notification.mp3   ← CTA bell
├── charts/
│   ├── bar-grow.mp3       ← Bar extending
│   ├── line-draw.mp3      ← Line drawing
│   └── block-pop.mp3      ← Treemap block
└── music/
    ├── news-loop-01.mp3   ← BGM option 1 (corporate, neutral)
    ├── news-loop-02.mp3   ← BGM option 2
    └── outro.mp3          ← Closing jingle
```

## Tech Stack

- **Remotion 4.x** — React video framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling (via @remotion/tailwind)
- **@remotion/transitions** — Scene transitions
- **Spring animations** — Remotion spring() for smooth motion
- **SVG** — Charts & infographics
- **ffmpeg** — Final encoding

## Render Commands

```bash
# Preview
npx remotion studio

# Render single video
npx remotion render DiemTin --props=./data/2026-04-10.json --output=output/2026-04-10.mp4

# Render with custom codec
npx remotion render DiemTin --codec=h264 --crf=18 --output=output/final.mp4
```
