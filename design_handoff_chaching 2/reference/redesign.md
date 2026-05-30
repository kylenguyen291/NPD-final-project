# Cha-Ching Redesign v2.0

**Version:** 2.0
**Last updated:** 2026-05-30
**Status:** Approved design changes — supersedes specified sections of ChaChing-PRD.md v1.0
**Owner:** ChaChing product team

---

## 0. Purpose and how to read this document

This document captures the v2.0 redesign of Cha-Ching. It builds on `ChaChing-PRD.md` (v1.0) and should be read alongside it.

- Where this document defines a feature, it **supersedes** the equivalent section of the PRD.
- Where this document is silent, the PRD remains authoritative.
- The companion document `functionality.md` describes the user-facing flows and operational logic for everything specified here.

---

## 1. Decisions log

Seven design decisions were locked during the v2.0 review:

1. **Pet species** — Cat (Mèo). Chosen for universal appeal, expressive face, and design flexibility across moods.
2. **Pet name** — Kid-named during onboarding, with a fun default of "Mèo Vàng" (Golden Cat).
3. **Streak harshness** — Strict (one missed day = streak drops to 0) with 2 streak-protection umbrellas as the buffer.
4. **"Let Alex explain" paywall** — 1 free explainer per day; unlimited under Plus subscription.
5. **News article format** — Text + image for MVP. Audio narration deferred to Phase 02.
6. **Module structure** — 3 modules per pillar, 3–4 lessons per module (18 modules total at Foundation tier).
7. **Wallet "Tip of the Day" row** — Merged with news into a single "Discover something today" row that rotates daily.

---

## 2. New feature — Pet + Streak system

### 2.1 Mèo, the pet

Each kid adopts a single Cat (Mèo) during onboarding. The pet lives **inside the Cha-Ching Garden** as its central animated character, walking between pillar zones, reacting to lessons, and visually carrying the kid's streak state. Alex still lives only on the Learn tab; the pet is the emotional engine of the Garden itself.

**Adoption (onboarding):**
- A new "Adopt your Mèo" step is inserted between the Garden Intro and the Top-up Prompt (see PRD §8.1).
- Kid chooses 1 of 4 starter coat colors: orange, black-white, grey tabby, calico.
- Kid types a name (default "Mèo Vàng", max 16 characters).
- A 2-second adoption animation plays: Mèo walks into the Garden, looks at the camera, blinks.

**Evolution stages (XP-gated):**

| Stage | XP threshold | Visual | Bonus on evolution |
|---|---|---|---|
| Baby Mèo | 0–500 XP | Small, round, big eyes | starting form |
| Junior Mèo | 500–2,000 XP | Slightly bigger, expressive whiskers | +5,000 VND to Save |
| Adult Mèo | 2,000–8,000 XP | Full-grown, confident posture | +25,000 VND to Save |
| Master Mèo | 8,000+ XP | Permanent glowing aura + small crown | +100,000 VND to Save |

Each evolution triggers a ~5-second ceremony animation and a permanent profile badge.

**Mood states (engagement-driven):**

| State | Trigger | Visual | Notification |
|---|---|---|---|
| Happy | last activity within 24 hours | default pose | none |
| Curious | 24–48 hours since last visit | looks toward door | none |
| Sleepy | 2 consecutive missed days | drooping pose | none |
| Lonely | 5+ missed days | sits at garden gate | one push: "Mèo misses you 🥺" |

Hard rules: pet **never** appears angry, **never** shows lecturing copy, **never** blames the kid. Always recoverable in one return visit.

### 2.2 Streak mechanic

**Daily activity = Daily Quest completion** (see §2.3). One Daily Quest done = one streak day.

**Streak milestones (bonuses to Save bucket):**

| Milestone | Reward |
|---|---|
| 🔥 7 days | 1,000 VND + "Week Warrior" badge |
| 🔥 30 days | 5,000 VND + Mèo gets sparkle effect |
| 🔥 100 days | 20,000 VND + Mèo gets a permanent gold tail accessory |
| 🔥 365 days | 100,000 VND + "Garden Sage" permanent title |

**Missing a day:**
- If umbrella inventory ≥ 1: auto-deploy, streak preserved (see §2.4).
- If umbrella inventory = 0: streak drops to 0. No shaming notification. Mèo enters Curious → Sleepy → Lonely as described above.

**Daily reward cap:** all VND rewards (Daily Quest completion, quiz pause, streak bonus) are capped at **10,000 VND/day total** to prevent gaming.

### 2.3 The Daily Quest

A 3-task daily routine that defines "feeding" Mèo:

1. **Watch 1 video lesson OR complete 1 Module Checkpoint**
2. **Answer today's quiz** (offered after any video lesson, or from the home screen)
3. **Tag any wallet transaction with an emotion** (😊 / 😐 / 😞)

Completing all 3 = +50 XP, +1,000 VND to Save bucket (subject to daily cap), Mèo celebration animation, streak increments at midnight local time.

If the kid has no transactions today, the emotion-tag task auto-completes at 8 PM, or can be fulfilled by tagging an emotion on any untagged transaction from the past 7 days.

### 2.4 Umbrella system (forgiveness layer)

- **Earning:** 1 umbrella per 5 consecutive Daily Quest completions. Max inventory: 2.
- **Auto-deploy:** missed day + umbrella in inventory = silent auto-deploy. Friendly notification next morning: "Your umbrella saved your streak ☂️."
- **Plus tier perk:** 3 starter umbrellas granted on Plus activation.
- **Buyable (Plus tier only):** 5,000 VND per umbrella. Parent approval required (implicit via top-up). Max 1 purchase per week.
- **Free tier** cannot purchase umbrellas — only earn them.

### 2.5 Visibility

- **Learn tab:** Mèo is the central animated character in the Garden. Streak number (🔥12) appears large in the tab header.
- **Wallet tab:** the streak chip (🔥12) appears in the Wallet header next to the avatar. This is the **only** sanctioned visual bleed between worlds, justified because streaks are identity.
- **Profile tab:** Mèo's current stage, total umbrellas held, all milestone badges, evolution history.

---

## 3. New feature — News Engine + Ask Alex

### 3.1 The News Engine

A daily editorial pipeline that drops 1 curated Vietnamese financial-news article into the app.

**Editorial process:**
- Sources: VnExpress Kinh Doanh, CafeF, Vietstock, partner bank press releases.
- A small content team (1–2 editors) rewrites each article daily into ~150–300 words at teen-readable level.
- Publishes at 6:00 AM local time.

**Where it appears:**
- Top of the Discover feed for 24 hours, then folds into the regular feed mix.
- The Wallet's "Discover something today" row rotates between the article headline and curated lesson tips.

**Card format in Discover:**
- Distinct soft-pastel background (visually different from videos).
- Small image, headline (≤8 words), 1-line teaser.
- "Read article (45s)" CTA.

**Article view:**
- Full-screen.
- Hero image at top.
- Body: 3 short paragraphs with subheads.
- Bottom sticky action row: ☂️ **"Let Alex explain"** (primary green) · 🔖 Save · 📤 Share · 💬 Comment (read-only).

### 3.2 Ask Alex (RAG-grounded explainer)

When a kid taps "Let Alex explain", the app deep-links to the Learn tab and Alex opens with a chat overlay that explains the article in kid-friendly Vietnamese, grounded in curriculum concepts via RAG retrieval.

**Free tier:** 1 "Let Alex explain" call per day, across all articles. Resets at 6 AM next day.

**Plus tier:** unlimited calls, unlimited follow-up questions per article, 1.5× XP on "Save to Garden".

**RAG architecture:**
- Vector store: ~200 vetted Vietnamese financial concepts + all 60 Foundation lesson chunks.
- Retrieval: top-3 concepts per article via cosine similarity over multilingual embeddings.
- Generation: LLM grounded on retrieved chunks. Refuses any specific buy/sell or investment advice, redirects to general principles.
- Server-side safety filter before display.
- Latency target: first bubble < 1.5s, full explanation < 6s.
- Cost target: < $0.03 per call.

**Output format:**
- 3–5 chat bubbles unfolded with 400ms delay between each.
- Bottom CTAs: "Save to Garden" / "Ask one more question" / "Got it, thanks".

**Hard rules added to Alex's existing constraints:**
- News explanations always cite curriculum concepts. Never recommends specific assets.
- If the article is off-topic for finance, Alex politely declines and suggests another article.

### 3.3 Content engine philosophy

- News articles are **always** human-curated. AI is used to rewrite for readability and to explain via RAG — never to fabricate headlines.
- The team commits to **365 articles/year** as a content KPI.
- The AI Engine internally drives unlimited *practice content* generation (quiz questions, scenario variants, drill prompts) — this powers Module Checkpoint freshness and is documented in §7 of the PRD, but it is not directly user-facing in MVP.

---

## 4. Redesign — Learn tab module pathway

This **replaces** PRD §6.3.3 (flat lesson list).

### 4.1 Module structure (Foundation tier)

Each pillar is broken into **3 modules** of 3–4 lessons each, with a checkpoint quiz at the end of each module.

| Pillar | Lessons | Module 1 | Module 2 | Module 3 |
|---|---|---|---|---|
| Earn | 10 | Money Basics (3) | Earning Routes (4) | Smart About Income (3) |
| Save | 10 | Why Save? (3) | Save Smart (4) | Compound Growth (3) |
| Spend | 10 | Need vs. Want (3) | Smart Spending (4) | Spending Wisdom (3) |
| Invest | 8 | What Is Investing? (3) | Risk Basics (3) | Time Is Power (2) |
| Give | 6 | Why Give? (3) | How to Give (3) | — |
| Protect | 16 | Online Safety (5) | Spotting Scams (6) | Privacy & Boundaries (5) |

Pillars with only 2 modules (Give) collapse the 3rd slot gracefully.

### 4.2 Visual path design

- Each pillar opens to a **vertical winding path** (Duolingo-style, lighter visual weight).
- Lessons appear as **circular nodes** connected by curved dotted lines.
- Node states:
  - **Completed:** green-filled with checkmark.
  - **Current:** pulsing green ring, scaled slightly bigger.
  - **Locked:** grey, optional small lock icon (only locked if part of a module gated by an earlier module).
- **Module Checkpoint** nodes are octagonal with gold accent.
- Mèo is animated walking along the path at the kid's current position.

### 4.3 Module Checkpoints

- 5-question quiz drawn from the module's lesson content.
- Pass threshold: 4/5 correct.
- Pass: confetti + Module Badge + +200 XP + Mèo celebration + Garden zone visibly blooms + next module unlocks.
- Fail: "Almost there!" screen showing which 2 lessons to review. Immediate first retry allowed; subsequent retries gated 1 hour.

### 4.4 Unlocking rules

- **Within a pillar:** Module 2 requires Module 1 complete; Module 3 requires Module 2 complete.
- **Across pillars:** no gating. Kid can start any of the 6 pillars in any order.
- **Within a module:** lessons not strictly ordered — kid can do them in any order within their unlocked module.

### 4.5 Pillar completion ceremony

When all 3 modules of a pillar are done:
- 5-second cinematic: pillar's Garden zone fully blooms, Mèo runs around celebrating.
- Foundation-tier pillar certificate awarded.
- Profile badge.
- +1,000 XP bonus.
- Alex appears with a 2-option branching choice: "Which pillar next?"

---

## 5. Redesign — Discover tab mixed-format feed

This **replaces** PRD §6.4 (video-only feed).

### 5.1 Card types

The feed now mixes 6 card types:

1. **Video Card** — existing format. 60–90s vertical video. Save / Like / Share / Comment.
2. **News Card** — see §3. Soft-pastel background. CTA: "Read article".
3. **Poll Card** — single question with 2–4 options. Tap to vote. Live anonymous results after voting (e.g., "38% picked Food & Drink").
4. **Tip Card** — single-screen quote-style tip on a bright illustration. One sentence, one illustration, one Save button.
5. **Mini-Game Card** — tile launching one of the 2 launch mini-games (Need-vs-Want Sorter or Compound Interest Race) in 60 seconds, then returns to feed.
6. **Streak / Achievement Card** — once-per-day card celebrating active streak or recent milestone. Quiet retention nudge in-feed.

### 5.2 Feed mix algorithm

For You algorithm targets (default):

| Card type | Default share |
|---|---|
| Video | 50% |
| News | 20% |
| Poll | 10% |
| Tip | 10% |
| Mini-Game | 5% |
| Streak/Achievement | 5% |

Personalization: each share is tunable per user up to ±10% based on engagement.

### 5.3 Behavior carried over from v1.0

- **Every-5-cards quiz pause** (was every-5-videos in v1.0; now any 5 consecutive cards). Correct = 1,000 VND to Save bucket (subject to daily 10k cap).
- **Daily soft cap:** 25 min (Tier A 12–14) / 40 min (Tier B 15–18).
- **Save = grow your Garden** applies to videos, news, and tips. Not to polls, mini-games, or achievement cards.

---

## 6. Alex's expanded capabilities

This **adds to** PRD §7.2.

**Existing capability (unchanged):** Conversational lesson recommender at 7 trigger moments on Learn tab.

**New capability:** **Ask Alex** — RAG-grounded news explainer.

**Added hard rule:** When explaining news, always grounds the explanation in curriculum concepts via RAG retrieval. Never makes specific buy/sell or investment recommendations on assets mentioned in the news. Redirects to general principles only.

**Unchanged hard rules from PRD §6.3.5:**
- Never references Wallet spending data.
- Never appears outside the Learn tab. (The article→Alex deep-link is a navigation, not an appearance on another tab.)
- Never lectures or moralizes.
- All responses moderated server-side.

---

## 7. Phase 04 — Micro-stock at 18 (reframed)

This **reframes** the PRD §10 entry "Investing sandbox + real micro-investing partnership".

### 7.1 Positioning

The Micro-stock unlock is Cha-Ching's **graduation moment** — the point where the app transitions from a kid product to an adult fintech onramp. Not in MVP; documented here for design forward-compatibility.

### 7.2 Specification (Phase 04)

- A 4th balance bucket called **Invest** appears in the Wallet header alongside Spend / Save / Give.
- **Auto-unlocks on the kid's 18th birthday**, conditional on:
  - Completion of the Launcher-tier Invest pillar (real learning gate, not marketing).
  - Identity verification (KYC) compliant with VN brokerage regulations.
- Underlying brokerage: SSI or VNDirect partnership (TBD).
- Minimum trade size: 10,000 VND. Fractional shares supported.
- Universe: VN-Index top 30 + curated "starter ETF" set.
- First trade incentive: Cha-Ching covers the first 10,000 VND deposit.

### 7.3 Educational gating logic

- If the kid turns 18 but has NOT completed the Launcher Invest pillar: unlock is deferred. A card appears in the Wallet: "You're 18 — Micro-stock is almost ready. Finish the Invest pillar to unlock." Progress shown.
- If the kid turns 18 AND has completed the Launcher Invest pillar: unlock animation plays automatically on next app open.

---

## 8. Updated MVP scope (supersedes PRD §5.1)

### 8.1 NEW in MVP

- **Pet + Streak system** (Mèo, mood states, evolution stages, daily streak, umbrella forgiveness layer)
- **Daily Quest** (formalized — 3-task daily routine)
- **News Engine** (1 daily curated article)
- **"Let Alex explain"** with free-tier daily cap and Plus-tier unlimited
- **Discover mixed-format feed** (6 card types)
- **Learn module pathway** (replaces flat lesson list — 18 modules)
- **Module Checkpoint quizzes** (5 questions, 4/5 to pass)
- **Streak chip on Wallet header** (the sanctioned cross-world visual)
- **Plus subscription mechanic** (39,000 VND/mo — paywall trigger via Ask Alex daily cap)

### 8.2 Carried over from PRD v1.0 (unchanged)

- Wallet tab core flows (balance, 3 buckets, send/request/QR scan, categorize-at-payment, Spending Summary, savings goals)
- Wallet AI silent role (no commentary, only categorization storage and color band rendering)
- 60 Foundation lessons across 6 pillars (now reorganized into 18 modules)
- 2 launch mini-games (Need vs. Want Sorter, Compound Interest Race)
- Alex's 7 existing conversational trigger moments
- Pillar certificates
- Discover daily soft cap
- Profile tab (with additions for pet status & umbrella inventory)

### 8.3 Explicitly out of scope for MVP

- Dedicated parent app or parent dashboard → Phase 02 (different approach)
- Tết / lì xì allocator → Phase 03
- Receipt OCR → Phase 03
- AI pre-suggestion of category at payment → Phase 02
- Money Personality, Future You Simulator → Phase 03
- Side Hustle Tracker, Founders Track, Cha-Ching Fund → Phase 04
- Peer-to-peer payments → Phase 03
- **Micro-stock Invest bucket → Phase 04 (age-18 unlock)**
- Voice mode for Alex → Phase 02
- Audio narration of news articles → Phase 02
- Friends, leagues, social features → Phase 02–03
- Graduation pathway to external bank → Phase 04 (Micro-stock is the alternative)

---

## 9. Glossary additions

To be merged with PRD §11:

- **Mèo** — the kid's cat companion in the Cha-Ching Garden. Default name "Mèo Vàng" (Golden Cat), customizable. Visually carries the streak.
- **Module** — sub-unit of a pillar curriculum. 3 modules per pillar at Foundation tier; 3–4 lessons each.
- **Module Checkpoint** — the 5-question quiz at the end of each module. Pass threshold 4/5.
- **Daily Quest** — the 3-task daily routine (lesson + quiz + emotion tag) that feeds Mèo and increments streak.
- **Umbrella** — streak-protection consumable. Earned 1 per 5 consecutive days. Max 2 in inventory.
- **News Engine** — the daily editorial pipeline that drops 1 Vietnamese financial-news article into Discover and the Wallet "Discover something today" row.
- **Ask Alex** — the RAG-grounded news explainer. 1/day free; unlimited under Plus.
- **Plus** — the 39,000 VND/month subscription tier.
- **Family** — the 79,000 VND/month subscription tier (up to 4 kids).
- **Micro-stock** — Phase 04 feature. A 4th Wallet bucket for micro-investing, auto-unlocked on the kid's 18th birthday upon completion of the Launcher Invest pillar.

---

*End of Cha-Ching Redesign v2.0.*
