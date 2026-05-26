# Handoff: Cha-Ching — Vietnamese Teen Wallet (MVP v1.0)

> **A financial-literacy super-app for Vietnamese teens (ages 12–18) that turns every money decision into a learning moment without ever interrupting the act of using money.**

---

## About the Design Files

The files in this bundle are **design references created in HTML/React (with inline JSX styles via Babel)**. They are **prototypes**, not production code to copy directly. The task is to **recreate these designs in your target codebase's environment** — most likely **React Native (Expo)** for a mobile-first Vietnamese teen audience, but Flutter or native iOS/Android work fine too.

The JSX components in this bundle use plain React + inline-style objects. They port cleanly to:
- **React Native** — replace `<div>` → `<View>`, `<span>` → `<Text>`, move inline style objects to `StyleSheet.create`
- **Web React** (Next.js / Vite) — works as-is; recommend extracting tokens to Tailwind config or CSS variables
- **Flutter / SwiftUI** — use the design tokens (§ Design Tokens) and screen specs (§ Screens) as the source of truth

If no target framework exists yet, pick **Expo + React Native** (best fit for the audience and the existing JSX). The PRD (in `/reference/ChaChing-PRD.md`) goes deep on tech stack — back-end is Supabase + NestJS + VPBank Bank-as-a-Service.

---

## Fidelity

**High-fidelity (hifi).** All 22 screens are pixel-specified with final colors, typography, radii, spacing, and interactive behavior. Exact hex values, font sizes, and component dimensions are given below. Recreate pixel-perfectly using your codebase's idioms.

---

## Core Principle (Read This First)

> **Two Clean Worlds, One App.**
>
> The **Wallet** world is fast, clean, adult, transactional. The **Learn** world is playful, gamified, narrative.
>
> They **never bleed into each other.** Only two sanctioned bridges exist:
> 1. A "Tip of the Day" row on Wallet Home → one Learn video.
> 2. An "Apply Now" CTA on every completed lesson → one Wallet action (e.g. "Create savings goal").

If you find yourself adding chat/Alex/gamification anywhere in Wallet, or anywhere transactions appear inside Learn — stop. That's the failure mode the PRD explicitly guards against.

---

## Design Tokens

### Colors (exact hex)

```js
// Primary brand
green:      '#3F8E5C'   // CTAs, brand, success
greenDeep:  '#2F6E47'   // pressed states, gradient ends
greenInk:   '#1F4A2E'   // dark headlines, dark surfaces

// Tints (mint family — primary background)
mint:       '#E8F4EA'   // app background
mintDeep:   '#C7E5C9'   // dividers, soft fills
mintEdge:   '#A8D4AC'   // borders on mint cards

// Accents
yellow:     '#F5D75A'   // rewards, XP, lì xì moments
yellowDeep: '#E5B924'   // pressed yellow / coins
coral:      '#E76F62'   // RESERVED — top-spend category band ONLY
orange:     '#F0A04B'   // 2nd-highest category band

// Neutrals
paper:      '#FBFAF6'   // alt light background
ink:        '#1B2218'   // primary text
ink2:       '#4A5A4D'   // secondary text
ink3:       '#7E8E84'   // tertiary text / icons
line:       'rgba(27,34,24,0.08)'  // hairline dividers
lineHard:   'rgba(27,34,24,0.14)'  // sheet grabbers
white:      '#FFFFFF'

// Spending-category color bands (RELATIVE, not threshold)
// 🔴 = highest spend this period — copy stays neutral, never reads as "bad"
band.red:    '#E76F62'
band.orange: '#F0A04B'
band.yellow: '#F5D75A'
band.green:  '#7BBE82'
band.gray:   '#C6CCC8'
```

### Typography

- **Family**: `Be Vietnam Pro` (Google Fonts) — full Vietnamese diacritic support
- **Display family**: `Caveat` (Google Fonts) — used ONLY for the wordmark "Cha-Ching" and occasional hand-lettered titles
- **Weights used**: 400, 500, 600, 700, 800

| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero balance | 32px | 800 | letter-spacing -0.5px |
| H1 (screen title) | 22–24px | 800 | letter-spacing -0.3px |
| H2 (section) | 17px | 800 | |
| Body | 14px | 400–600 | line-height 1.45 |
| Card title | 13–14px | 700–800 | |
| Label / caption | 11–12px | 600 | color `ink3` |
| Eyebrow | 10–11px | 700 | letter-spacing 1–2px, uppercase |
| Tab bar label | 11px | 500–700 | |
| Wordmark | 38–60px | 800 | family Caveat |

### Spacing scale (px)
`4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 26 · 28 · 32`

### Radii (px)
- Buttons: **12**
- Small cards / list rows: **14**
- Cards: **18–20**
- Hero cards / sheets: **22–24**
- Bottom sheets: **24** (top corners only)
- Pills / chips: **999**
- Avatars: 50% (circular)

### Shadows
```css
/* Card */
box-shadow: 0 1px 0 rgba(27,34,24,.04), 0 6px 20px rgba(27,34,24,.05);

/* Floating CTA */
box-shadow: 0 4px 14px rgba(63,142,92,.3);

/* Hero balance card (green) */
box-shadow: 0 8px 24px rgba(63,142,92,.25);

/* Bottom sheet */
box-shadow: 0 -10px 40px rgba(0,0,0,.25);
```

### Iconography
- Soft-fill emoji (no flat geometric icons). This is a deliberate brand choice — the "garden" metaphor reads warm and hand-made.
- Brand pillars use specific emoji as visual anchors:
  - 🛠️ Earn · 🐷 Save · 🛒 Spend · 🌳 Invest · 🌸 Give · 🛡️ Protect

### Currency formatting
- Vietnamese dong: `1.570.000 ₫` (period as thousands separator, ₫ symbol after with a space)
- Compact: `320K`, `1,2M` (comma for decimal, K/M after)
- Use `Intl.NumberFormat('vi-VN')`

---

## Brand Mark

Custom SVG in `screens-other.jsx` → `<CCMark>`: a yellow coin with the Vietnamese ₫ symbol and a green leaf sprouting from the top. This is "money + garden" in one glyph — never replace with a generic piggy.

---

## Screens

There are **22 screens** across 6 sections. Each iPhone artboard is **402 × 874 px** (iPhone 16 frame; content body is 402 × 786 after status bar / home indicator).

### 01 · Onboarding (4 screens)

| Screen | File | Purpose |
|---|---|---|
| Splash / Welcome | `OnbSplash` | First impression. Brand mark, wordmark in Caveat, garden preview, "Get Started" CTA in `yellow`, "Sign in" link |
| Pick handle + avatar | `OnbHandle` | Username (8 avatars, 1 selected with `green` border + glow). Progress bar `step=2/5` |
| Set PIN | `OnbPIN` | 6 dots, custom keypad, Face ID toggle. Progress `step=4/5` |
| Garden intro | `OnbGarden` | Reveal the Cha-Ching Garden metaphor with 3 feature rows |

**Hard PRD rules:** Block under-12 and over-18 with friendly screens. Route Tier A (under-15) vs Tier B (15-18) by birth date — different KYC requirements.

### 02 · Wallet (8 screens) — the most important world

| Screen | File | Notes |
|---|---|---|
| **Home** | `WalletHome` | Hero balance card on green gradient · 3 buckets (Spend / Save / Give) · 4 quick actions (Send / Request / **Scan QR** (primary) / Top-up) · Savings goals ring chart · This-week spending bar chart · Tip of the Day row (the bridge to Learn) |
| Scan QR | `ScanQR` | Dark camera view with QR frame · yellow corner guides · Scan / My QR / Photo dock |
| Confirm payment | `PayConfirm` | Bottom sheet over dimmed camera · merchant name · large amount in mint card · source selector · **`<SlideToPay>` swipe-to-confirm component** (real drag, snap at 88%, auto-reset) |
| **Categorize** | `Categorize` | **Most important moment in the app.** Success burst · 8 category tiles in 2-col grid · emotion row (😞 😐 😊). **AI does NOT pre-suggest.** One tap, no commentary. |
| Spending summary | `SpendingSummary` | Week/Month/Year segmented control · stacked horizontal bar · category list with relative color bands (🔴 = highest, never reads "bad") |
| Category detail | `CategoryDetail` | Drill-down: dark green hero · daily sparkline · scrollable transaction list with emotion indicators |
| Savings goals | `SavingsGoals` | Hard cap **3 active goals**. Primary goal as green hero card with progress, 2 secondary cards, "3 goals at once" hint |
| Top-up | `TopUp` | Virtual VPBank account number to share with parents · QR · "Share on Zalo" CTA · Tết lì xì hint |

**Wallet visual rules:**
- Background always `mint` (#E8F4EA)
- Cards on white with soft shadow
- One green hero per screen, max
- Coral used ONLY for the top-spend band — never as a primary action

### 03 · Discover (3 screens)

| Screen | File | Notes |
|---|---|---|
| **Video feed** | `DiscoverFeed` | TikTok-style. Full-bleed creator footage (`assets/creator-footage.png` is the demo image). Right-side action rail (❤️ 🔖 📤 💬). Bottom-left: creator handle, title, "Save to grow your Garden 🌱" pill |
| Quiz pause | `QuizPause` | Triggers every 5 videos. 4 options A/B/C/D. Correct answer → 1.000 ₫ to Save bucket. Cap 10.000 ₫/day |
| Daily cap end card | `DailyCap` | Hard 25-minute daily cap. Sleepy 😴 face, today's stats (watched / saved / earned), CTAs to Learn or Garden |

### 04 · Learn (5 screens)

| Screen | File | Notes |
|---|---|---|
| **Garden + pillars** | `LearnHome` | The Cha-Ching Garden (`<GardenScene>`, custom SVG) — single scene with 6 pillar zones (workshop, piggy fountain, market stall, fruit tree, flower patch, fence). Streak badge top-right. 6 pillar cards in 2-col grid |
| Pillar detail · Save | `PillarDetail` | Dark green hero · 10-lesson list with done/current/locked states · "BOSS" quest at lesson 10 |
| Lesson complete · Apply Now | `LessonApply` | Confetti · +10 XP gold card · Garden snippet · **Apply Now CTA** (the Learn → Wallet bridge) |
| Alex chat | `AlexChat` | Bottom sheet with `<AlexAvatar>` (custom SVG character) · 2 message bubbles · 3 choice buttons. **Hard rules: only on Learn tab, NEVER references Wallet data, never lectures** |
| Mini-game · Need vs Want | `NeedVsWant` | Dark green background · top HUD with streak/score/timer · card to sort (rotated -2deg) · two big sort buttons (Want = coral, Need = green) |

### 05 · Profile (2 screens)

| Screen | File | Notes |
|---|---|---|
| Profile home | `ProfileHome` | Green hero with avatar (Kyle Nguyen, @kyle.long, 14, Hà Nội), level badge, 3 quick stats · certificates strip · settings list |
| Certificates wall | `CertificatesWall` | Foundation certificate hero (co-signed with VinUniversity) · Earned (2) · In progress (4) sections |

**MVP scope rule:** No parent dashboard. Parents fund + approve, not daily users.

---

## Shared Components

Defined in `theme.jsx`:

| Component | Purpose | Props |
|---|---|---|
| `<Phone>` | Inner content wrapper for IOSDevice frame — handles status bar / home indicator padding, sets default fontFamily | `bg`, `style` |
| `<CCHeader>` | Top app bar with avatar, greeting, notification + settings buttons | `name`, `ink` |
| `<TabBar>` | Bottom 4-tab navigation (Wallet / Discover / Learn / Profile) | `active` |
| `<Card>` | Standard card with shadow | `padding`, `radius`, `style` |
| `<Btn>` | Pill button | `kind` (`primary`/`yellow`/`ghost`/`light`/`dark`), `size` (`sm`/`md`/`lg`), `full` |
| `<CircleBtn>` | Round icon button | `bg`, `size` |
| `<Placeholder>` | Striped placeholder for imagery | `label`, `height`, `dark` |

Defined in `screens-wallet.jsx`:
- `<SlideToPay>` — fully interactive swipe-to-confirm with drag, snap-back, and complete state. **Port this carefully** — it's a key brand interaction.

Defined in `screens-learn.jsx`:
- `<GardenScene>` — the hand-drawn SVG Garden. All 6 pillar zones are individually grouped `<g>` elements; designed to grow/change as the user progresses (currently static, but structure is ready for animation).
- `<AlexAvatar>` — custom SVG character. Currently only the "greeting" pose; 7 more poses to design (curious, thinking, celebrating, etc.).

Defined in `screens-other.jsx`:
- `<CCMark>` — brand mark (coin + leaf + ₫).

---

## Interactions & Behavior

### Slide to Pay
- Pointer/touch drag the white knob right
- Progress trail fills green as you drag
- Idle state: subtle shimmer hint
- Release threshold: 88% of track width → snap to end + flip to "✓ Payment confirmed"
- Auto-reset after 1.8s (prototype convenience — in production, navigate to success screen)

### Tab navigation
- 4 tabs, persistent across all main screens
- Active tab: mint pill behind icon, green color, bolder label
- Inactive: gray icon + label

### Bottom sheets
- 24px top radii, white background, grab handle (36×4px, lineHard color)
- Dimmed scrim (`rgba(14,20,16,.55)`) over content beneath
- Slide up animation, ~300ms ease

### Categorize sheet
- Triggers immediately after every successful payment
- 8 categories in 2-col grid; selected = green fill + shadow
- Emotion row: 3 emojis, only 1 selected at a time, others desaturated
- No "skip" — but tapping anywhere outside dismisses
- **No AI pre-suggestion** — this is a deliberate UX choice per PRD

### Color bands (spending)
- Bands are **relative within the period**, not absolute thresholds
- Top-spending category = 🔴 coral. Reranks each week/month.
- Copy stays neutral. Never "warning" or "alert".

### Discover feed
- Vertical swipe between videos
- Daily cap: hard 25 min total watch time
- Quiz every 5 videos → 1.000 ₫ reward to Save bucket (cap 10K/day)
- Save button (bookmark) is what makes the Garden grow

### Alex (AI chatbot)
- Lives ONLY in Learn tab
- Triggers at 7 specific moments (see PRD §6.4)
- Hard rule: can't see Wallet data, can't see balances, can't reference spending
- Tone: peer-to-peer Vietnamese teen, never lecturing

---

## State Management

Top-level state needed:

```ts
// User
profile: { name, handle, avatar, age, city, level, xp, streak }

// Wallet
balance: number
buckets: { spend: number, save: number, give: number }
transactions: Transaction[]
goals: Goal[] // max 3 active

// Learn
pillars: { earn, save, spend, invest, give, protect } // each { current, total, badge?, lessons[] }
gardenState: { plants, flowers, seedlings } // computed from progress

// Discover
watchedToday: number // minutes
quizzesPlayedToday: number
earnedToday: number // capped at 10,000 ₫

// Settings
pin: hashed
biometric: boolean
dailyCapMin: 25 // configurable per PRD §8
alexEnabled: boolean
language: 'vi' | 'en'
```

State transitions worth calling out:
- **Successful payment** → push transaction → open Categorize sheet → user taps category → close sheet → trigger possible Garden growth (if saved instead of spent)
- **Quiz correct** → +1.000 ₫ to Save bucket → toast + Garden tiny bloom animation
- **Lesson complete** → +XP → check pillar completion → maybe award badge → show Apply Now sheet
- **Discover daily cap hit** → swap feed for `DailyCap` screen → block further video loads until next day

---

## Assets

- `assets/creator-footage.png` — sample full-bleed image for the Discover feed (Minecraft-themed video about earning money). Replace with real creator content in production.
- All other "images" in mockups are styled `<div>` placeholders, SVG illustrations, or emoji — no external image dependencies.
- Custom SVGs: `<CCMark>`, `<GardenScene>`, `<AlexAvatar>` — all inline, no external files.

---

## Files in This Handoff

```
design_handoff_chaching/
├── README.md                          ← you are here
├── reference/
│   └── ChaChing-PRD.md                ← the full Product Requirements Document
├── source/
│   ├── Cha-Ching Figma Design.html    ← top-level canvas (entry point)
│   ├── theme.jsx                      ← design tokens + primitives
│   ├── screens-wallet.jsx             ← Wallet tab (8 screens) + <SlideToPay>
│   ├── screens-discover.jsx           ← Discover tab (3 screens)
│   ├── screens-learn.jsx              ← Learn tab (5 screens) + <GardenScene> + <AlexAvatar>
│   ├── screens-other.jsx              ← Profile (2) + Onboarding (4) + <CCMark>
│   ├── ios-frame.jsx                  ← iPhone device frame (use only for previews)
│   └── design-canvas.jsx              ← the Figma-like canvas wrapper (drop in real impl)
└── assets/
    └── creator-footage.png            ← Discover feed sample image
```

### How to view the prototype
Open `source/Cha-Ching Figma Design.html` in a browser. It will render all 22 screens on a pan/zoom canvas. Click any artboard label to enter fullscreen focus mode (←/→ arrows to flip, Esc to exit).

---

## Recommended Implementation Order

1. **Set up tokens** — port the design-tokens block to your theme / Tailwind config / CSS variables.
2. **Build shared primitives** — `<Btn>`, `<Card>`, `<TabBar>`, `<CCHeader>`, `<Phone>` equivalent in your stack.
3. **Wallet Home** first — establishes the brand voice and pattern library.
4. **Categorize sheet** — the most important interaction. Get this right before anything else.
5. **Discover feed + Quiz** — needs video player; consider `react-native-video` or `expo-av`.
6. **Garden** — the SVG is a single scene now, but plan for it to grow incrementally as the user progresses. Each pillar zone is an isolated `<g>` you can swap in/out.
7. **Alex chat** — start with the rule-based 7-trigger version per PRD; AI integration can come later.
8. **Onboarding + Profile** last — less risky, more conventional.

---

## Open Questions for the Dev Team

These are unresolved in the design and the PRD — flag them with product/design before shipping:

1. **Send / Request flows** — referenced in PRD §6.1 but not yet drawn. Are these in-app peer-to-peer (requires a network effect), or VietQR-based to anyone's bank?
2. **Lesson video player** — between `PillarDetail` and `LessonApply`. Spec missing.
3. **Transaction detail / re-categorize** — what does a user see when tapping a row in `CategoryDetail`?
4. **Alex's 7 other poses** — only "greeting" pose is drawn.
5. **Parent flow** — confirmed out of MVP scope but you'll need at least an SMS receipt when a top-up lands.
6. **Onboarding 1/5 and 3/5** — the progress bar shows 5 steps but only 4 are designed (splash, handle, PIN, garden intro). Birthday + KYC routing screen is the missing one.

---

*Generated from the Cha-Ching design canvas. Last updated: 2026-05-26.*
