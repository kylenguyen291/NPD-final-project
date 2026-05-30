# Handoff: Cha-Ching — Vietnamese Teen Wallet (Redesign v2.0)

> **A financial-literacy super-app for Vietnamese teens (ages 12–18) that turns every money decision into a learning moment without ever interrupting the act of using money.**

> ⚠️ **This package reflects Redesign v2.0** (see `/reference/redesign.md`), which supersedes parts of the v1.0 PRD. v2.0 adds **Mèo** the cat companion, daily streaks, a Daily Quest, the News Engine + Ask Alex, an 18-module learning pathway, a mixed-format Discover feed, and the Plus subscription. Where the two documents conflict, **redesign.md wins**; where it's silent, the PRD (`/reference/ChaChing-PRD.md`) remains authoritative.

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

> **Two Clean Worlds, One Cat.**
>
> The **Wallet** world is fast, clean, adult, transactional. The **Learn** world is playful, gamified, narrative.
>
> They **never bleed into each other** — with exactly three sanctioned crossings:
> 1. A merged "Discover something today" row on Wallet Home → one Learn video or news article.
> 2. An "Apply Now" CTA on every completed lesson → one Wallet action (e.g. "Create savings goal").
> 3. **NEW in v2.0:** the **🔥 streak chip** in the Wallet header — justified because streaks are identity, not finance data.

If you find yourself adding chat/Alex/gamification anywhere in Wallet, or anywhere transactions appear inside Learn — stop. That's the failure mode the PRD explicitly guards against.

---

## v2.0 Redesign — New Systems

These features are NEW and central. Full spec in `/reference/redesign.md`.

### Mèo — the cat companion (`source/meo.jsx`)

The emotional engine of the Garden. A single SVG component, `<Meo coat stage mood size>`, plus a head-only `<MeoChip coat size>` for headers/list rows.

- **Coats (4):** `orange` · `tuxedo` (black-white) · `grey` (tabby) · `calico`. Chosen during onboarding (`OnbAdoptMeo`).
- **Name:** kid-typed, max 16 chars, default **"Mèo Vàng"** (Golden Cat).
- **Evolution stages (XP-gated):** `baby` (0–500) → `junior` (500–2k) → `adult` (2k–8k) → `master` (8k+, gets a crown + glowing aura). Each evolution = ~5s ceremony + permanent profile badge + a VND bonus to Save (5k / 25k / 100k).
- **Mood states (engagement-driven):** `happy` (active <24h) · `curious` (24–48h) · `sleepy` (2 missed days) · `lonely` (5+ missed days, fires one gentle push: "Mèo misses you 🥺").
- **Hard rules:** Mèo NEVER appears angry, NEVER lectures, NEVER blames. Always recoverable in one return visit. Mèo is the Garden's character; **Alex is separate** and still lives only on the Learn tab.

Mèo walks in the Garden (`GardenStage` in `screens-v2-learn.jsx` composes `GardenScene` + an animated `Meo`), sits at the kid's current node on the learning path, and celebrates on checkpoint clears.

### Streak + Daily Quest

- **Daily Quest** = a 3-task daily routine that "feeds" Mèo: (1) watch a lesson / clear a checkpoint, (2) answer today's quiz, (3) tag a transaction emotion. All 3 → +50 XP, +1.000 ₫ to Save, streak +1 at midnight.
- **Streak:** strict — one missed day resets to 0, UNLESS an **umbrella** auto-deploys (earn 1 per 5 consecutive days, max 2; Plus grants 3 starters & can buy at 5k). No shaming, ever.
- **Milestones:** 🔥7 / 🔥30 / 🔥100 / 🔥365 → VND + Mèo cosmetic upgrades + titles.
- **Daily VND reward cap: 10.000 ₫/day total** across all sources (quest, quiz, streak bonus).
- **Streak chip (🔥N):** appears in the Learn header (large) AND the Wallet header (the one sanctioned cross-world visual) AND Profile.

### News Engine + Ask Alex

- **News Engine:** 1 human-curated Vietnamese financial-news article/day, rewritten to ~150–300 words at teen level, published 6:00 AM. Sits at the top of Discover for 24h, then folds into the mix. Also rotates through the Wallet "Discover something today" row.
- **News card:** distinct soft-pastel background (NOT video-like), small image, ≤8-word headline, 1-line teaser, "Read article (45s)" CTA.
- **Article view:** full-screen, hero image, 3 short paragraphs w/ subheads, sticky bottom action row: ☂️ **"Let Alex explain"** (primary) · 🔖 Save · 📤 Share · 💬 Comment (read-only).
- **Ask Alex (RAG explainer):** tapping "Let Alex explain" deep-links to the Learn tab; Alex opens a chat overlay explaining the article in kid-friendly Vietnamese, grounded in curriculum concepts via RAG. 3–5 bubbles unfold with 400ms delay. CTAs: "Save to Garden" / "Ask one more" / "Got it".
  - **Free tier: 1 call/day** (resets 6 AM). **Plus: unlimited + 1.5× Save XP.**
  - **Added hard rules:** always cites curriculum concepts; NEVER recommends specific assets / buy-sell; server-side safety filter; first bubble <1.5s, full <6s, <$0.03/call.

### Learn module pathway (replaces flat lesson list)

- Each pillar = **3 modules** of 3–4 lessons (Give = 2 modules). 18 modules total at Foundation tier.
- Pillar opens to a **vertical winding path** (Duolingo-style): circular lesson nodes joined by curved dotted lines. Node states: completed (green + check), current (pulsing green ring, scaled up), locked (grey).
- **Module Checkpoint** nodes are **octagonal with gold accent**. Mèo animates along the path at the kid's position.
- **Checkpoint** = 5-question quiz, pass 4/5 → confetti + Module Badge + +200 XP + Mèo celebration + Garden zone blooms + next module unlocks. Fail → "Almost there!" with the 2 lessons to review; immediate retry, then 1h gated.
- **Unlock rules:** within a pillar, modules are sequential; across pillars, no gating; within a module, lessons in any order. Completing all 3 modules → 5s pillar ceremony + certificate + badge + 1.000 XP + Alex "which pillar next?".

### Discover mixed-format feed (replaces video-only)

6 card types with default For-You mix (tunable ±10%):

| Card | Share | Notes |
|---|---|---|
| Video | 50% | existing format |
| News | 20% | see above |
| Poll | 10% | 2–4 options, live anon results after voting |
| Tip | 10% | single quote-style tip on bright bg, one Save button |
| Mini-Game | 5% | launches a 60s game, returns to feed |
| Streak/Achievement | 5% | once/day retention nudge |

- **Quiz pause every 5 cards** (was every 5 videos). Correct = 1.000 ₫ to Save (within daily cap).
- **Daily soft cap:** 25 min (Tier A 12–14) / 40 min (Tier B 15–18).
- **Save = grow your Garden** applies to videos, news, tips — NOT polls, mini-games, achievement cards.

### Plus subscription

- **39.000 ₫/mo** (Family **79.000 ₫/mo**, up to 4 kids).
- Primary paywall trigger: hitting the free Ask Alex daily cap → `PlusPaywall` screen.
- Perks: unlimited Ask Alex · 1.5× Save XP · 3 starter umbrellas.

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

There are **34 screens** across 6 sections. Each iPhone artboard is **402 × 874 px** (iPhone 16 frame; content body is 402 × 786 after status bar / home indicator). Screens marked **🆕** are new in v2.0.

> Implementation note: the v2.0 screens live in `source/screens-v2-learn.jsx` and `source/screens-v2-discover.jsx`; Mèo lives in `source/meo.jsx`. Where a v2 screen replaces a v1 one (e.g. `LearnHomeV2` replaces `LearnHome`, `PillarPath` replaces `PillarDetail`), **build the v2 version** — the v1 component is kept in the source only for reference.

### 01 · Onboarding (5 screens)

| Screen | File | Purpose |
|---|---|---|
| Splash / Welcome | `OnbSplash` | First impression. Brand mark, wordmark in Caveat, garden preview, "Get Started" CTA in `yellow`, "Sign in" link |
| Pick handle + avatar | `OnbHandle` | Username (8 avatars, 1 selected with `green` border + glow). Progress bar `step=2/5` |
| Set PIN | `OnbPIN` | 6 dots, custom keypad, Face ID toggle. Progress `step=4/5` |
| Garden intro | `OnbGarden` | Reveal the Cha-Ching Garden metaphor with 3 feature rows. Progress `step=5/7` |
| **Adopt your Mèo** 🆕 | `OnbAdoptMeo` | Pick 1 of 4 coats, name the cat (default "Mèo Vàng", 16 char max). Live `GardenStage` preview with a baby Mèo. Progress `step=6/7`. Inserted between Garden intro and the top-up prompt. |

**Hard PRD rules:** Block under-12 and over-18 with friendly screens. Route Tier A (under-15) vs Tier B (15-18) by birth date — different KYC requirements.

### 02 · Wallet (8 screens) — the most important world

| Screen | File | Notes |
|---|---|---|
| **Home** | `WalletHome` | Hero balance card on green gradient · 3 buckets (Spend / Save / Give) · 4 quick actions (Send / Request / **Scan QR** (primary) / Top-up) · Savings goals ring chart · This-week spending bar chart · "Discover something today" row (the bridge to Learn). **v2.0: `<CCHeader>` now shows the 🔥 streak chip** — the sanctioned cross-world visual. |
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

### 03 · Discover (9 screens) — mixed-format feed

| Screen | File | Notes |
|---|---|---|
| **Video card** | `DiscoverFeed` | TikTok-style. Full-bleed creator footage (`assets/creator-footage.png` is the demo image). Right-side action rail (❤️ 🔖 📤 💬). Bottom-left: creator handle, title, "Save to grow your Garden 🌱" pill |
| **News card** 🆕 | `NewsFeedCard` | Soft-pastel bg (distinct from video). Small image, ≤8-word VN headline, 1-line teaser, "Read article · 45s" CTA |
| **Poll card** 🆕 | `PollCard` | Dark-green bg. 2–4 options, live anonymous % results after voting, leading option highlighted in yellow |
| **Tip card** 🆕 | `TipCard` | Bright green single-screen quote tip. One sentence, Save + Share buttons |
| **News article** 🆕 | `NewsArticle` | Full-screen. Hero image, 3 short VN paragraphs w/ subheads, sticky bottom row: ☂️ "Let Alex explain" (primary) · 🔖 Save · 📤 Share |
| **Ask Alex explainer** 🆕 | `AskAlex` | RAG overlay (deep-linked to Learn). Grounded-concept chips, 3 VN bubbles, "1/1 free today" badge, CTAs incl. locked "Ask more · Plus". **Never gives buy/sell advice** |
| **Plus paywall** 🆕 | `PlusPaywall` | Triggered by hitting free Ask-Alex cap. Master Mèo w/ crown, 3 perks, 39.000 ₫/mo (Family 79k) |
| Quiz pause | `QuizPause` | Triggers every **5 cards** (was 5 videos). 4 options A/B/C/D. Correct → 1.000 ₫ to Save. Cap 10.000 ₫/day |
| Daily cap end card | `DailyCap` | Soft cap 25 min (Tier A) / 40 min (Tier B). Sleepy 😴 face, today's stats, CTAs to Learn or Garden |

### 04 · Learn (7 screens)

| Screen | File | Notes |
|---|---|---|
| **Garden + Daily Quest** 🆕 | `LearnHomeV2` | *(replaces `LearnHome`)* Big streak chip + Mèo's name in header · `GardenStage` with Mèo walking + status chip + XP-to-next-stage bar · **Daily Quest** card (3 tasks) · 6 pillar cards showing **module pips** (not lesson counts) |
| **Module pathway** 🆕 | `PillarPath` | *(replaces `PillarDetail`)* Duolingo-style vertical winding path. Circular lesson nodes + dotted connectors, pulsing current node, **octagonal gold checkpoint** nodes, Mèo animated at current position |
| **Module Checkpoint** 🆕 | `ModuleCheckpoint` | Dark-green 5-question quiz. Segmented progress (3/5), VN question, A–D options, "Pass with 4/5" footnote |
| **Checkpoint cleared** 🆕 | `CheckpointPass` | Celebrating Mèo, "Module cleared 5/5", 3 reward pills (+200 XP / Badge / next module unlocked) |
| Lesson complete · Apply Now | `LessonApply` | Confetti · +10 XP gold card · Garden snippet · **Apply Now CTA** (the Learn → Wallet bridge) |
| Alex chat | `AlexChat` | Bottom sheet with `<AlexAvatar>` (custom SVG character) · 2 message bubbles · 3 choice buttons. **Hard rules: only on Learn tab, NEVER references Wallet data, never lectures** |
| Mini-game · Need vs Want | `NeedVsWant` | Dark green background · top HUD with streak/score/timer · card to sort (rotated -2deg) · two big sort buttons (Want = coral, Need = green) |

### 05 · Profile (3 screens)

| Screen | File | Notes |
|---|---|---|
| Profile home | `ProfileHome` | Green hero with avatar (Kyle Nguyen, @kyle.long, 14, Hà Nội), level badge, 3 quick stats · certificates strip · settings list |
| **Mèo status** 🆕 | `MeoStatus` | `GardenStage` hero · current stage + XP + umbrella inventory (☂️×2) · 4-stage **evolution** strip · **streak-milestone** badge grid (🔥7/30/100/365) |
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

Defined in `meo.jsx` (v2.0):
- `<Meo coat stage mood size>` — the cat companion. 4 coats × 4 stages × 4 moods, all parametric SVG. Master stage adds an animated aura + crown. **The emotional centerpiece — port faithfully** and plan for stage-up and mood-transition animations.
- `<MeoChip coat size>` — head-only mini Mèo for headers and list rows.

Defined in `screens-v2-learn.jsx` (v2.0):
- `<GardenStage>` — composes `<GardenScene>` + an animated walking `<Meo>` (CSS keyframes `meo-walk` / `meo-bob`). Use this anywhere the Garden should show the cat.
- `<PillarPath>` / `<PathNode>` — the Duolingo-style winding path and its node renderer (circular lessons, octagonal gold checkpoints, pulsing current node).

Defined in `theme.jsx` (updated v2.0):
- `<CCHeader streak={N}>` — now renders the 🔥 streak chip. Pass `streak={null}` to hide it.

---

## Interactions & Behavior

### Slide to Pay
- Pointer/touch drag the white knob right
- Progress trail fills green as you drag
- Idle state: subtle shimmer hint
- Release threshold: 88% of track width → snap to end + flip to "✓ Payment confirmed"
- Auto-reset after 1.8s (prototype convenience — in production, navigate to success screen)

### Mèo (v2.0)
- `GardenStage` walks Mèo side-to-side via the `meo-walk` keyframe + a gentle `meo-bob`. On the learning path she's pinned to the current node instead.
- Stage-up ceremony (~5s) and mood transitions are NOT yet animated — the component renders the correct static pose for each `stage`/`mood`; wire the transitions in your animation layer.
- Mood is derived from time-since-last-activity (see redesign §2.1), not set manually in production.

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
│   ├── ChaChing-PRD.md                ← the full v1.0 Product Requirements Document
│   └── redesign.md                    ← v2.0 redesign spec (supersedes parts of the PRD)
├── source/
│   ├── Cha-Ching Figma Design.html    ← top-level canvas (entry point)
│   ├── theme.jsx                      ← design tokens + primitives (+ <CCHeader> streak chip)
│   ├── meo.jsx                        ← 🆕 <Meo> + <MeoChip> cat companion
│   ├── screens-wallet.jsx             ← Wallet tab (8 screens) + <SlideToPay>
│   ├── screens-discover.jsx           ← Discover v1 (video feed, quiz, daily cap)
│   ├── screens-learn.jsx              ← Learn v1 + <GardenScene> + <AlexAvatar>
│   ├── screens-other.jsx              ← Profile + Onboarding + <CCMark>
│   ├── screens-v2-learn.jsx           ← 🆕 GardenStage, LearnHomeV2, PillarPath, ModuleCheckpoint, CheckpointPass, OnbAdoptMeo
│   ├── screens-v2-discover.jsx        ← 🆕 NewsFeedCard, PollCard, TipCard, NewsArticle, AskAlex, PlusPaywall, MeoStatus
│   ├── ios-frame.jsx                  ← iPhone device frame (use only for previews)
│   └── design-canvas.jsx              ← the Figma-like canvas wrapper (drop in real impl)
└── assets/
    └── creator-footage.png            ← Discover feed sample image
```

### How to view the prototype
Open `source/Cha-Ching Figma Design.html` in a browser. It will render all 34 screens on a pan/zoom canvas. Click any artboard label to enter fullscreen focus mode (←/→ arrows to flip, Esc to exit).

---

## Recommended Implementation Order

1. **Set up tokens** — port the design-tokens block to your theme / Tailwind config / CSS variables.
2. **Build shared primitives** — `<Btn>`, `<Card>`, `<TabBar>`, `<CCHeader>`, `<Phone>` equivalent in your stack.
3. **Wallet Home** first — establishes the brand voice and pattern library.
4. **Categorize sheet** — the most important interaction. Get this right before anything else.
5. **Discover feed + Quiz** — needs video player; consider `react-native-video` or `expo-av`.
6. **Garden + Mèo** — `GardenScene` is one SVG scene; `<Meo>` is parametric. Plan for the Garden to grow incrementally and for Mèo's stage-up/mood transitions to animate (the spec wants a ~5s evolution ceremony).
7. **Module pathway + Checkpoints** — `PillarPath` is the new Learn backbone; build it before the flat-list memory creeps back in.
8. **News Engine + Ask Alex** — needs the editorial CMS + RAG service; the screens (`NewsArticle`, `AskAlex`, `PlusPaywall`) can be built against stubbed content first.
9. **Alex chat** — start with the rule-based 7-trigger version; layer the RAG explainer on top.
10. **Onboarding (incl. Adopt Mèo) + Profile** last — less risky, more conventional.

---

## Open Questions for the Dev Team

These are unresolved in the design and specs — flag them with product/design before shipping:

1. **Send / Request flows** — referenced in PRD §6.1 but not yet drawn (also note P2P is pushed to Phase 03 in redesign §8.3). Are these VietQR-based to anyone's bank for MVP?
2. **Lesson video player** — between `PillarPath` and `LessonApply`. Spec missing.
3. **Transaction detail / re-categorize** — what does a user see when tapping a row in `CategoryDetail`?
4. **Alex's 7 other poses** — only "greeting" pose is drawn (used in both `AlexChat` and `AskAlex`).
5. **Parent flow** — out of MVP scope, but you'll need at least an SMS receipt when a top-up lands.
6. **Onboarding birthday + KYC step** — flow is now 7 steps (splash, birthday/KYC, handle, PIN, garden intro, adopt Mèo, top-up prompt) but the birthday/KYC-routing screen and the top-up prompt screen are not yet designed.

### v2.0 items drawn as single states — need full coverage
7. **Mèo card types in Discover** — `NewsFeedCard`, `PollCard`, `TipCard` are drawn; the **Mini-Game card** and **Streak/Achievement card** (the other 2 of 6 feed types) are not.
8. **Umbrella moments** — the "your umbrella saved your streak ☂️" morning notification and the umbrella-purchase flow (Plus only) aren't drawn.
9. **Mèo lifecycle screens** — the Curious / Sleepy / **Lonely** Garden states and the ~5s **evolution ceremony** are specced in `meo.jsx` poses but have no dedicated screens yet.
10. **Checkpoint fail** — the "Almost there!" review screen (which 2 lessons to revisit, retry gating) is described in redesign §4.3 but not drawn.
11. **Plus / Family management** — only the paywall is drawn; subscription management, Family (4-kid) setup, and umbrella-buying UI are open.

---

*Generated from the Cha-Ching design canvas. Reflects Redesign v2.0 · last updated 2026-05-30.*
