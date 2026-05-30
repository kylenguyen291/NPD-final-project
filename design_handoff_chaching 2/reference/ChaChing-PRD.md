# Cha-Ching — Product Requirements Document (PRD)

**Version:** 1.0 (MVP)
**Last updated:** 2026-05-26
**Status:** Draft for prototype generation
**Owner:** ChaChing product team

---

## 0. How to use this document

This PRD is written to be handed directly to a design/development agent to build an interactive prototype. It is intentionally specific about screens, components, copy, and interactions, while leaving aesthetic micro-decisions open to designers.

Reading order for a builder:
1. Sections 1–3 set the context (what, why, who).
2. Section 4 defines the design philosophy and information architecture.
3. Sections 5–8 are the buildable specifications (screens, components, AI, flows).
4. Sections 9–10 set the acceptance criteria and out-of-scope boundary.

A note on language: the PRD is written in English as a working document. The shipping app will be localized in Vietnamese (primary launch market). UI copy shown in this document is in English; designers and content writers will produce Vietnamese equivalents at build time.

---

## 1. Product overview

### 1.1 One-line positioning

**Cha-Ching is a digital wallet for Vietnamese kids aged 12–18 that quietly turns every money decision into a financial-literacy lesson — without ever interrupting the act of using money.**

### 1.2 What the app is

Cha-Ching is a mobile app (iOS and Android) that gives Vietnamese teens a safe, controlled way to receive, save, spend, and learn about money. It combines two complementary worlds in one app:

- A **clean digital wallet** with categorized spending, QR payments, savings goals, and transaction history that is honest, fast, and free of patronizing alerts.
- A **structured financial-literacy curriculum** delivered through short videos, mini-games, gamified progress, and a cartoon companion named Alex — kept in its own dedicated space so it never clutters the wallet.

The two worlds share one underlying data model (so behavior in the wallet can be referenced by the learning system if the user opts in) but they are visually and architecturally separate.

### 1.3 What the app is not

- It is **not** a parental-surveillance tool. The MVP intentionally ships without a parent dashboard (deferred to a later phase, via a separate product approach).
- It is **not** an emotional life-coach. The AI does not lecture, judge, or tell the user how to feel about their spending. It shows numbers and organizes data; the kid draws their own conclusions.
- It is **not** a bank. Cha-Ching operates as a software layer that connects to partner banks for the underlying account; full banking license is out of scope.

---

## 2. The problem

### 2.1 Vietnamese teen financial reality

- **61%** of Vietnamese kids aged 12–18 own a mobile phone.
- The average monthly allowance for this segment is **~1,315,000 VND**, spent mostly on food and transportation.
- **93%** of Vietnamese teens self-report limited financial knowledge and experience.
- **72%** of teens report frustration in managing their money effectively.
- **87%** lack a safe and convenient platform to send and receive money digitally.

### 2.2 Pain points (the jobs to be done)

For a Vietnamese teen, the daily money experience today looks like this:

- They receive cash (allowance or lì xì Tết money) or sporadic e-wallet transfers from a parent — there's no consistent system.
- They spend mostly via QR scan at small merchants, with **no memory of where their money went** by the end of the week.
- Adults around them assume they will pick up financial literacy "naturally" — they don't.
- The financial-education content available to them online is either dry textbook material in school, or English-language YouTube that doesn't match Vietnamese realities (lì xì, private tutoring income, school fees, the local coffee economy).
- Existing tools (BIDV Smart Kids, Techcombank Family Banking) treat them like "kids with controls" — boring, surveillance-flavored, no autonomy.

The core unmet job: **"Help me see what I'm doing with my money clearly, and let me grow up financially competent without being lectured."**

### 2.3 Market gaps Cha-Ching attacks

- No Vietnamese kids' wallet has a **teen-native voice** (existing ones are dry, bank-flavored).
- No Vietnamese kids' wallet **separates the act of spending from the act of learning** cleanly. Most either bolt education awkwardly onto a wallet, or build a learning app with no real money behind it.
- No Vietnamese kids' wallet treats the teen as the **primary user** — they all design parent-first.
- No Vietnamese kids' wallet offers a **structured, age-tiered curriculum** that grows with the user from 12 to 18.

---

## 3. Target customer

### 3.1 Primary user — the teen

The kid is the primary user. The app is downloaded by the kid, opened by the kid, and used daily by the kid. Parents fund and approve but are not the daily user.

**Tier A — Foundation (ages 12–14, middle school)**
- Just got their first smartphone; loves TikTok, gaming, group chats.
- Receives ~500,000–1,000,000 VND/month allowance, mostly in cash and ad-hoc parent transfers.
- Money goes to: snacks, milk tea, small online purchases, sometimes school supplies.
- Financial literacy: essentially zero. Doesn't know what "interest" means in practice.
- Wants: feel grown-up, have their own money, not be embarrassed in front of friends.

**Tier B — Builder/Launcher (ages 15–18, high school)**
- Smartphone-native, on TikTok/Reels/Zalo daily, may have part-time tutoring income or side hustles.
- Receives ~1,000,000–2,500,000 VND/month allowance, may also earn 200,000–1,000,000 VND/month from tutoring, online selling, or content creation.
- Money goes to: food, dates, hobbies, books, possibly investing curiosity.
- Financial literacy: knows some terms but no practical experience.
- Wants: autonomy, real adult financial tools, signal of competence, beginning of independence.

### 3.2 Secondary user — the parent

Parents are the **funder and approver**, not the daily user. They are typically:
- Urban (Hanoi, Ho Chi Minh City)
- Upper-middle to upper income (AB+ in market segmentation)
- 35–50 years old
- Already users of digital banking and at least one e-wallet (MoMo, ZaloPay, ViettelPay)
- Concerned primarily with **safety**, secondarily with **education**

In the MVP, the parent's interaction with Cha-Ching happens entirely through normal banking channels (they top up the kid's wallet via standard bank transfer to a virtual account number) and through conversations with their child. There is no dedicated parent app or dashboard in v1.

### 3.3 Geographic focus

MVP launch focuses on **Hanoi and Ho Chi Minh City**. The 35% market share goal applies to urban, AB+ households in these two cities.

---

## 4. Product approach & design philosophy

### 4.1 The core principle: Two Clean Worlds, One App

Most "wallet + education" apps fail because they blur the two jobs together — quizzes pop up mid-payment, lesson cards clutter the home screen, the wallet feels like school and the school feels like a transaction. Cha-Ching's foundational design rule is the opposite:

> **The Wallet world and the Learn world are visually and architecturally separate. They never bleed into each other.**

- The **Wallet world** (the Wallet tab) is fast, clean, transactional, trustworthy — it feels like an adult financial tool.
- The **Learn world** (the Learn tab and the Discover feed) is playful, gamified, narrative-driven — it feels like a game with stakes.

The only sanctioned bridges between worlds:
- A single thin "Tip of the Day" row at the bottom of the Wallet home screen → opens a single short video in Discover.
- An "Apply Now" button at the end of every Learn lesson → one-tap deep-link into the matching Wallet action (e.g., "Set a savings goal").

That is the entire bridge. No mid-transaction quizzes. No lesson banners on the home screen. No surveillance alerts during payments.

### 4.2 Design tone — kid-friendly, positive vibes, growth mindset

Cha-Ching is **warm without being childish, professional without being cold**. The design draws confidence from these emotional anchors:

- **Growth, not punishment.** The metaphor underlying the app is a *garden* that the kid grows. Saving makes the garden bloom. Learning unlocks new plants. There is never a "you failed" screen — only "let's try again" framing.
- **Honest, not preachy.** Data is shown clearly with color coding, but the app never adds an opinion ("you spent too much on snacks"). The kid is trusted to read their own numbers.
- **Encouraging, never sarcastic.** Copy never punches down. Mistakes are met with curiosity ("Take another look"), not disappointment.
- **Modern teen voice.** Conversational, slightly informal, friendly but not condescending. The shipping Vietnamese copy will use *em / mình* pronouns and avoid overly formal adult vocabulary.

### 4.3 Visual direction (for designers)

- **Color palette.** Anchored to the ChaChing brand green (≈ #3F8E5C primary, with lighter mints #C7E5C9 / #E8F4EA for backgrounds). Accent yellow (#F5D75A) for celebrations and rewards. Coral red (#E76F62) reserved exclusively for the "top spending" color band — never for errors or warnings, so the kid never reads red as bad.
- **Shapes.** Generous rounded corners (16–24 px radius on cards, 12 px on buttons). No sharp edges. Bottom sheets and modals use the same rounded language.
- **Typography.** A friendly geometric sans-serif as primary (e.g., Be Vietnam Pro, Nunito, or similar with full Vietnamese diacritic support). Large display sizes on key numbers (balance, savings goal). Body text sits at 16 px minimum for accessibility.
- **Iconography.** Soft-filled icons with rounded strokes. Avoid hard-line corporate iconography. Categories use simple emoji-adjacent symbols (🍔 🛍️ 🎮 🚗 📚 💊 ❤️) consistently across the app.
- **Illustrations.** Hand-drawn, warm, slightly imperfect. Plants, coins growing on trees, a piggy bank with personality. The garden metaphor is omnipresent in the Learn tab.
- **Animations.** Used sparingly but with intent. Saving a video makes a tiny seedling pop in the Cha-Ching Garden. Completing a lesson triggers a 1-second confetti burst. Empty states animate gently.
- **Accessibility.** Minimum tap target 44×44 pt. WCAG AA contrast on all text. Supports system text-scaling. Critical actions (Send, Save, Spend) are reachable with one thumb.

### 4.4 Alex — the cartoon companion

Alex is a **cartoon character** who lives exclusively on the Learn tab. He is the human-feeling presence in an otherwise quiet app.

- **Persona:** ~18-year-old Vietnamese teen, cool-older-brother energy. Not a teacher. Not a peer. A guide.
- **Visual:** casual streetwear (green hoodie matching brand), dark hair, expressive eyes. He has a signature small notebook with a "$" doodle on the cover.
- **Reusable pose library** (designers must produce all 8): default greeting, thinking (hand on chin), celebrating (arms up), curious (tilted head), encouraging (thumbs up), oh-no (small frown, surprised), hyping up (pointing forward), sleeping/away (used for empty states).
- **Voice:** speaks teen-friendly language, casual and warm. Never lectures. Never references the kid's wallet data.
- **Where he appears:** only at 7 specific moments on the Learn tab (see §6.3.5). Never on the Wallet tab, Discover tab, or Profile tab.

---

## 5. Scope

### 5.1 MVP (Phase 01) — what ships in v1

- **Wallet tab:**
  - Balance with three buckets: *Spend* / *Save* / *Give*
  - Send / Request / QR scan / Top-up flows
  - Categorize-at-payment modal (one tap)
  - Spending Summary with relative color coding and ↑↓ comparison deltas
  - Transaction history (by category, by date)
  - Savings goals (up to 3 active)
  - Single "Tip of the Day" row at the bottom

- **Discover (Feed) tab:**
  - Vertical full-screen video feed (~50 starter videos in launch library)
  - 6 pillar filter chips
  - Like / Save / Share / Comment actions (save feeds the garden)
  - Daily soft cap (25 min Tier A / 40 min Tier B)
  - Every-5-videos quiz pause

- **Learn tab:**
  - Cha-Ching Garden (gamification): a single growing garden scene at the top
  - 6 Pillar curriculum paths × Foundation tier (~60 lessons total)
  - Lesson structure: 60–120s video → 1 interactive activity → "Apply Now" button
  - Alex appearances at 7 trigger moments
  - 2 mini-games at launch (Need vs. Want Sorter, Compound Interest Race)
  - Certificate for each completed pillar at the Foundation tier

- **Profile tab:**
  - Avatar + handle
  - Achievements & certificates
  - Settings (notifications, time limits on Discover, privacy basics)

- **AI:**
  - Invisible Wallet AI (silent transaction categorization storage, color band rendering, comparison math) — *no commentary*
  - Alex as conversational lesson recommender (text only in MVP, voice deferred)

### 5.2 Explicitly out of scope for MVP

- Dedicated parent app or parent dashboard (deferred to Phase 02 with a different approach)
- Tết / lì xì allocator and other seasonal feature moments
- Receipt OCR / computer vision categorization
- AI pre-suggestion of category at payment time
- Money Mirror narrative summaries, Goal Alignment Score, Money Personality profile, Future You simulator
- Side Hustle Tracker, Founders Track, Cha-Ching Fund
- Peer Skill Marketplace, peer-to-peer payments between teens
- Real investing (sandbox or live)
- Graduation pathway to adult bank account
- Voice mode for Alex

See §10 for the full deferred-features roadmap.

---

## 6. Feature specifications

### 6.1 Information architecture

Four bottom-nav tabs, in this order, left to right:

```
[ 💳 Wallet ]    [ 📺 Discover ]    [ 🎓 Learn ]    [ 👤 Profile ]
```

### 6.2 Wallet tab

#### 6.2.1 Home screen

Vertical scroll, top to bottom:

1. **Header bar** — "Hi, Liam 👋" + avatar (left), notification bell + settings gear (right).
2. **Balance hero card** — large total balance number, with three sub-bucket pills underneath:
   - 💸 Spend: 320,000 VND
   - 🐷 Save: 1,200,000 VND
   - ❤️ Give: 50,000 VND
   Tapping any bucket drills into that bucket's detail screen.
3. **Quick action row** — four big circular buttons in one row: *Send* · *Request* · *Scan QR* · *Top-up*.
4. **Savings Goals card** — horizontal scroll of up to 3 active goals, each showing a circular progress ring + goal name + amount-remaining. Empty state: a single "Set your first goal" CTA.
5. **This Week's Spending** — small horizontal bar chart by category, one-tap to open the full Spending Summary screen.
6. **Tip of the Day** — thin single row at bottom: *"💡 60 seconds: What is compound interest?"* → tap deep-links to that one video in Discover.

Background is the brand mint #E8F4EA; cards are white #FFFFFF with soft shadow.

#### 6.2.2 Payment flow (the core daily action)

This is the most important flow in the app. Every transaction goes through it.

**Step 1 — Initiate.** Kid taps *Scan QR* from home → camera opens with QR overlay.

**Step 2 — Confirm.** QR detected → screen shows merchant/recipient name, kid enters amount, taps *Continue*. Confirmation sheet appears: amount + recipient + source bucket (defaults to Spend) → kid taps *Pay*.

**Step 3 — Success.** Animation: a brief checkmark + the amount visibly leaves the Spend bucket. The transaction is now committed.

**Step 4 — Categorize (the critical moment).** Immediately after success, a bottom sheet slides up: *"What was this payment for?"*. Eight category tiles in a 2×4 grid:

```
🍔 Food & Drink     🛍️ Shopping
🎮 Entertainment    🚗 Transport
📚 Education        💊 Health
❤️ Giving           ➕ Other
```

Kid taps exactly one category. Bottom sheet dismisses. Transaction is now tagged.

**Step 5 — (Optional) Emotion tag.** A subtle row appears for 3 seconds with three emoji buttons: 😊 / 😐 / 😞. If kid taps, it's recorded; if not, the row dismisses silently. Never blocks anything.

The AI does **not** pre-suggest a category. The AI does **not** comment. The AI does silently store the tagged transaction and update the bucket balance.

**Edge cases:**
- Kid taps "Other" → a free-text input for a custom tag (capped 20 chars). After 3 custom tags reused, the app suggests promoting them to first-class categories (admin-only).
- Kid dismisses the categorize sheet → transaction defaults to "Other" and surfaces in a "Needs categorizing" section at the top of the next Wallet home visit, max 1 prompt.
- Payment fails → standard error sheet, no categorize step, no money moved.
- Insufficient balance → blocked at Step 2 with clear copy: *"You don't have enough in Spend. Move money from Save?"* with an explicit confirm.

#### 6.2.3 Spending Summary screen

Reached from the home "This Week's Spending" card, or from the Profile tab.

Top: a **Week / Month / Year** segmented toggle.

Below toggle: **Total spent** + **transaction count**.

Then a **category list**, sorted by amount descending. Each row:

```
[ICON]  Category name         [BAR]   Amount VND   (%)    [COLOR DOT]
                                      ↑ delta vs. previous period
```

Visual example for May 2026:

```
🍔 Food & Drink     ████████████  480,000 VND  (38%)  🔴   ↑ 120,000 VND
🛍️ Shopping         ███████       280,000 VND  (23%)  🟠   ↓  40,000 VND
🎮 Entertainment    █████         200,000 VND  (16%)  🟡   ↑   8,000 VND
🚗 Transport        ███           120,000 VND  (10%)  🟢   →
📚 Education        ██             80,000 VND   (6%)  🟢   ↑  30,000 VND
💊 Health           █              50,000 VND   (4%)  🟢   →
➕ Other            █              30,000 VND   (2%)  ⚪   ↓  10,000 VND
```

**Color band logic (relative, not threshold):**
- 🔴 = the single highest-spending category this period (always exactly one)
- 🟠 = second highest
- 🟡 = third highest
- 🟢 = lower
- ⚪ = "Other" or minimal

The colors describe magnitude only. There is no implication that red is bad — and the app copy never says so.

**Tap any category row** → drill into the transaction list for that category in this period, sorted by date descending:

```
🍔 FOOD & DRINK — This Month (May 2026)

May 25  Highland Coffee Hai Bà Trưng              65,000 VND
May 24  Mixue Cầu Giấy                            38,000 VND
May 22  Bún Chả Hương Liên                        55,000 VND
May 21  Grab Food – KFC                           85,000 VND
May 20  Phúc Long Times City                      72,000 VND
...
                                       Total:   480,000 VND
```

Each transaction shows date, merchant/note, amount. Tap a transaction → full detail (merchant, exact time, source bucket, optional emotion tag, optional note). Allows "Change category" in case the kid mis-tagged it at payment time.

#### 6.2.4 Savings goals

- Up to 3 active goals at any time.
- Each goal has: name, target amount, target date (optional), current progress, source rule (manual / auto-percent from incoming top-ups / round-up).
- Creating a goal is a 3-step bottom sheet: name → target amount → save rule (default "manual").
- Progress is shown as a circular ring on the Wallet home and as a detailed timeline in the goal detail screen.
- Completing a goal triggers a celebration screen with a planted-flower animation in the Cha-Ching Garden (cross-references the Learn tab visually without bleeding text).

#### 6.2.5 Send / Request / Top-up

- **Send** to other Cha-Ching users by username or phone (peer-to-peer between teens is **out of scope for MVP**; in v1 Send is restricted to sending to a verified guardian or a saved merchant).
- **Request** generates a shareable link or QR that can be sent via Zalo/Messenger to a parent. The parent fulfills by sending money to the kid's virtual account number via their normal bank app.
- **Top-up** displays the kid's virtual account number with copy-to-clipboard and QR. Parent transfers from any Vietnamese bank → arrives in the kid's Spend bucket within minutes.

### 6.3 Learn tab

The Learn tab is the home of structured learning + gamification.

#### 6.3.1 Tab header

Top of the tab: **"Cha-Ching Garden"** as the title, with the kid's current XP and streak chip on the right.

#### 6.3.2 Cha-Ching Garden — the garden scene

The top third of the Learn tab is a continuous, illustrated **garden scene** that visually represents the kid's progress across 6 pillars. The garden is *one unified scene*, not 6 separate worlds — but each pillar is represented as a distinct visual zone within the garden:

- 🛠️ **Earn** — a small workshop in the corner
- 🐷 **Save** — a piggy-bank fountain
- 🛒 **Spend** — a market stall
- 🌳 **Invest** — a growing fruit tree
- 🌸 **Give** — a flower patch
- 🛡️ **Protect** — a small shielded fence around the garden

As the kid progresses in each pillar, the corresponding zone visually grows: the tree gets bigger, the flower patch blooms, the workshop adds tools. Saving a video in Discover causes a tiny seedling to pop up in the matching zone. This is the only "gamification chrome" on the Learn tab.

#### 6.3.3 The curriculum — 6 Pillars × Foundation tier (MVP)

Below the garden scene, the curriculum lists 6 pillar cards. Each card shows:
- Pillar icon + name
- Progress bar (X of N lessons completed)
- "Continue" or "Start" CTA

Tapping a pillar opens its lesson list — vertical scroll of all Foundation-tier lessons for that pillar (8–12 lessons each).

**Lesson structure (every lesson follows the same 3-part shape):**

1. **Video** — 60–120 seconds, vertical, full-screen on tap (same player as Discover feed).
2. **Interactive** — one of: 3-question quiz, swipe scenario, drag-and-drop sorter, fill-in-the-blank.
3. **Apply Now** — a single button at the end. Tapping it deep-links into the relevant Wallet action.
   - Saving lesson → opens "Create a new savings goal" sheet in Wallet.
   - Spending lesson → opens "Spending Summary" in Wallet.
   - Earning lesson → opens a placeholder explainer (Side Hustle Tracker is post-MVP).
   - Investing lesson → in MVP, links to a "Coming soon" sandbox screen.

Completing a lesson awards 5–10 XP and triggers a small garden-growth animation.

**Foundation-tier curriculum map (60 lessons total):**

| Pillar | Lessons | Sample lesson titles |
|---|---|---|
| Earn | 10 | "Where Does Money Come From?", "Allowance and Lì Xì", "Tutoring: Your First Real Job" |
| Save | 10 | "What Is Saving?", "Compound Interest — The Magic of Time", "Set Smart Goals" |
| Spend | 10 | "Need vs. Want", "Opportunity Cost", "Shop Smart Online" |
| Invest | 8 | "What Is Investing? (Level 1)", "Risk and Return", "Time Is Your Biggest Asset" |
| Give | 6 | "Why We Give", "Trustworthy Charities", "Giving Isn't Only About Money" |
| Protect | 16 | "Spotting Zalo Scams", "Strong Passwords", "When to Say NO", "Protecting Your Personal Info"... |

The Protect pillar gets disproportionately more lessons in MVP because Vietnamese teens are heavily targeted by scams and this is the area parents care most about.

#### 6.3.4 Mini-games (2 at MVP launch)

Accessed from a "Games" button on the Learn tab.

1. **Need vs. Want Sorter** — 60 seconds, drag-and-drop. Kid sorts product cards (milk tea, school books, iPhone, bus ticket, hoodie...) into "Need" or "Want" buckets. Score + leaderboard among Cha-Ching users.
2. **Compound Interest Race** — 90 seconds, two virtual savers race for 5 simulated years. Kid picks save % and starting age; visualization shows growth divergence. Drives home the power of time.

#### 6.3.5 Alex — the cartoon companion

Alex is the single conversational AI feature in the MVP. He lives **only on the Learn tab**.

He appears as a chat-style overlay/bottom-sheet, never as a floating button on other tabs. He appears at exactly 7 trigger moments:

1. **First open of the day on Learn tab** — greeting + one lesson suggestion.
2. **Immediately after completing a lesson** — congratulations + next-chapter prompt.
3. **At streak milestones** (3, 7, 14, 30 days) — celebration + branching choice to next pillar.
4. **After a failed/low-scored quiz** — encouragement + suggested review.
5. **On day 3 of inactivity** — re-engagement: *"You've been gone — the next chapter is waiting to unlock 👀"*.
6. **When starting a brand-new pillar** — 30-second intro monologue framing the pillar's story.
7. **Spaced-repetition check-ins** (2–4 weeks post-lesson) — 1-question retention quiz.

Each Alex interaction is short (≤3 exchanges) and ends with a clear action: "Start", "Later", or a 2-choice branch.

**Alex's hard rules:**
- Never references Wallet spending data.
- Never appears outside the Learn tab.
- Never lectures or moralizes.
- Never gives investment advice or recommends specific products.
- All responses moderated server-side; refuses harmful, off-topic, or inappropriate prompts.

#### 6.3.6 Certificates

Completing all lessons in a single pillar at Foundation tier awards a digital certificate (visible in Profile tab). Completing all 6 pillars unlocks the **"Cha-Ching Foundation Certificate"** — a printable PDF co-branded with the VinUniversity Entrepreneurship Lab.

### 6.4 Discover (Feed) tab

#### 6.4.1 Feed UX

- Vertical, full-screen, autoplay video feed. Indistinguishable from TikTok/Reels UX.
- Top: six pillar filter chips + "For You" default.
- Right-side action rail per video: ❤️ Like · 🔖 Save · 📤 Share · 💬 Comment (read-only in MVP, no posting).
- Bottom of each video: title + creator handle + a soft CTA ("Save to grow your Garden").

#### 6.4.2 Save = Grow

Saving a video is the primary engagement action. Each save plants a seedling in the matching pillar's zone in the Cha-Ching Garden (Learn tab), giving the kid a low-effort way to fill their garden without yet committing to a full structured lesson.

#### 6.4.3 Quiz pause

After every 5 consecutive videos watched in a session, the feed pauses on a single 30-second quiz question themed to the most recently watched video. Correct answer = 1,000 VND added to the kid's Save bucket (funded by Cha-Ching as a learning incentive, capped at 10,000 VND/day).

#### 6.4.4 Soft daily cap

- Tier A (12–14): 25 minutes/day on Discover.
- Tier B (15–18): 40 minutes/day.

When the cap is reached, the feed transitions to an end-screen: *"That's enough for today! Try a lesson, or check what's growing in your Garden 🌱"* with a CTA to the Learn tab. Cap can be adjusted in Profile → Settings, but not removed entirely.

#### 6.4.5 Content sourcing (MVP)

- ~50 videos at launch, sourced 60% in-house production / 30% partnered Vietnamese finance KOLs / 10% animated explainer content narrated in Alex's voice.
- Vietnamese-language only at launch.
- All content reviewed for age-appropriateness and Vietnamese cultural fit before publishing.

### 6.5 Profile tab

- **Avatar + handle + level** — kid's chosen username and current XP level.
- **Certificates & badges wall** — gallery of all earned achievements.
- **Streak indicator** — current daily streak.
- **Settings:**
  - Notifications (per-trigger toggles for Alex moments)
  - Discover daily cap (default by age, adjustable up only within parent-set ceiling — for MVP this ceiling is hard-coded to 60 min)
  - Privacy: which data Alex can reference (currently scoped to learning only)
  - Security: PIN/biometric lock, change PIN, sign out
  - About / Terms / Privacy policy / Support

---

## 7. AI specifications

### 7.1 Wallet AI — silent and invisible

The Wallet AI does **only these things**, all without ever speaking:

1. Stores the category the kid manually picked at payment time.
2. Aggregates transactions into the Spending Summary by category and time period.
3. Computes the relative color band (🔴 highest spend → ⚪ minimal) per period.
4. Computes the ↑↓ delta vs. previous period and renders it.
5. Allows re-categorization edits and updates aggregates accordingly.

It does **not**:
- Pre-suggest a category at payment time.
- Generate written summaries, "weekly stories," or judgmental copy.
- Send push notifications.
- Cross-reference Wallet data into the Learn tab in any user-facing way in MVP.

### 7.2 Alex — conversational lesson recommender

Alex is an LLM-backed chat companion (text only in MVP). Implementation:

- **Model:** any frontier-class LLM with strong Vietnamese fluency (e.g., GPT-4o class, Claude Sonnet class, Gemini Pro class — final choice is a build-time decision).
- **System prompt:** loads Alex's persona, his hard rules, the Foundation-tier curriculum graph, the kid's lesson completion state, and the current trigger context.
- **Memory:** stateless per conversation in MVP. Kid's progress is loaded fresh from the user record each time.
- **Latency target:** first token in under 1.5 seconds; full response in under 6 seconds.
- **Safety:** all outputs filtered server-side for inappropriate content. Refuses off-topic, harmful, or financial-advice-bordering queries with a polite redirect to learning content.

### 7.3 What the AI never does in MVP

- Never sees or references the kid's transaction data when generating Alex responses.
- Never gives specific investment advice or recommends specific financial products.
- Never operates outside the Learn tab.
- Never sends unsolicited notifications.

---

## 8. User flows

### 8.1 First-time onboarding (kid)

**Goal:** kid downloads, gets to a usable Wallet + funded balance, in under 5 minutes.

1. **Splash + Welcome screen** — brand animation + "Get Started" CTA.
2. **Pick your handle** — username (auto-validates uniqueness) + avatar selector (8 preset avatars).
3. **Age confirmation** — kid enters birth date; this routes them to Tier A (12–14) or Tier B (15–18) curriculum and applies the right daily cap.
4. **Phone OTP verification** — Vietnamese phone number, OTP sent.
5. **Set PIN** — 6-digit PIN + optional biometric.
6. **Garden intro** — short illustrated screen introducing the Cha-Ching Garden metaphor. CTA "Explore your Garden".
7. **Top-up prompt** — explainer: "To get started, you need a top-up. Here's your account number — share with your parent to get funded." Copy-to-clipboard + Zalo/Messenger share buttons.
8. **Land in Wallet tab** — empty state shows: "Balance: 0 VND. Funds will appear here." With a single "Preview the Learn tab" secondary CTA.

**Edge cases:**
- Kid under 12 → blocked at age screen with friendly message and a "Come back when you turn 12" screen.
- Kid over 18 → blocked at age screen with a "Cha-Ching is for ages 12–18" screen + suggestion to refer a younger sibling.
- OTP fails 3x → fallback to email verification.

### 8.2 First payment (the most-repeated flow)

**Goal:** kid pays a merchant via QR and tags the transaction in under 30 seconds total.

Happy path:
1. Wallet home → tap *Scan QR* → camera + QR overlay opens.
2. QR detected (e.g., Highland Coffee VietQR) → enter amount 65,000 VND.
3. Tap *Continue* → confirmation sheet → tap *Pay*.
4. Payment success animation (~1s).
5. Categorize sheet slides up → kid taps 🍔 Food & Drink → sheet dismisses.
6. (Optional) emotion row appears 3s → kid taps 😊 or ignores.
7. Returns to Wallet home; balance updated; transaction visible in history.

**Edge cases:**
- Insufficient balance → "You don't have enough in Spend. Move 25,000 VND from Save?" with Yes / Cancel.
- QR invalid or unsupported → "This QR isn't supported. Try again." with retry.
- Network failure during payment → transaction held in "Processing" state with a clear timeout (≤30s) and refund-if-failed guarantee.
- Kid skips categorization → transaction tagged "Other" + appears at top of next home visit with "Needs categorizing" prompt.
- Kid mis-tags → re-categorize via transaction detail screen anytime.

### 8.3 Setting and completing a savings goal

1. Wallet home → "Savings Goals" card → "+ New Goal".
2. Bottom sheet, 3 steps: name ("Buy a bicycle") → target (2,000,000 VND) → save rule (manual / auto 20% of every top-up / round-up).
3. Goal appears as a new progress ring on the home screen.
4. As the kid moves money from Spend to Save (or top-ups arrive matching the rule), the ring fills.
5. Reaching 100% → celebration screen with confetti + a planted flower in the Save zone of the Cha-Ching Garden.
6. Goal moves to "Completed" archive in Profile.

**Edge cases:**
- Trying to add a 4th active goal → bottom sheet: "You can only have 3 goals at a time. Complete or delete an existing one first."
- Withdrawing from a goal mid-way → confirmation prompt: "Withdrawing slows your progress. Continue?"

### 8.4 Completing a lesson

1. Learn tab → pick a pillar → pick a lesson.
2. Video plays (60–120s) — kid can pause, scrub, skip is disabled in MVP.
3. Video ends → auto-transition to interactive activity.
4. Kid completes activity → score shown.
5. Pass screen: confetti + XP gained + Garden growth animation + "Apply Now" CTA.
6. Tap "Apply Now" → deep-link to relevant Wallet action.
7. After 5 seconds on pass screen, Alex appears with the next-chapter prompt.

**Edge cases:**
- Quiz failed (score below threshold) → no XP penalty. Screen: "Take another look at the video." with one retry. After 2nd attempt regardless of score, lesson is marked done with low XP; Alex offers a spaced-repetition revisit in 2 weeks.
- Lesson is incomplete (kid backgrounds the app mid-video) → resumes at the last 5-second checkpoint on next open.
- Network drops mid-video → cached video continues if downloaded; otherwise error screen with "Try again" + offline indicator.

### 8.5 First Alex interaction

The first time the kid opens the Learn tab, Alex appears with a structured welcome:

```
[Alex pose: greeting]

"Hey! I'm Alex. I'm here to help you learn about
money — not too fast, not too hard, just interesting
enough.

Where do you want to start?"

[ Start with Save ]   [ Start with Protect ]   [ Let me choose ]
```

The kid picks → Alex routes them to the first lesson of that pillar. From then on, Alex's appearances follow the 7 trigger rules in §6.3.5.

### 8.6 Daily cap reached on Discover

1. Kid hits the configured daily cap.
2. The current video plays to its end, then the feed transitions to a full-screen end card with Alex (in his "sleeping/away" pose) and copy: *"That's enough for today! Try a lesson, or check what's growing in your Garden 🌱"*.
3. Two CTAs: "Go to Learn" (primary) / "Close" (secondary).
4. Returning to Discover the same day → end card again, no scrolling.

### 8.7 What happens when the kid runs out of balance

The Wallet does not generate any warning, alert, or judgment. The Spend bucket simply shows 0 VND. The next payment attempt blocks at the confirmation step with the "Not enough balance" message and the "Move from Save" offer. The kid can also tap "Request" to ask for a top-up from a parent via Zalo/Messenger share.

---

## 9. MVP acceptance criteria

The MVP is "done" when a user can do the following end-to-end:

1. Download the app, complete onboarding, and reach a funded balance in under 5 minutes.
2. Make a QR payment and categorize it in under 30 seconds.
3. View the Spending Summary for week/month/year and see correctly color-banded categories and accurate comparison deltas.
4. Create, contribute to, and complete one savings goal.
5. Complete at least one lesson in each of the 6 pillars (Foundation tier).
6. Play each of the 2 mini-games to completion.
7. Watch at least 5 Discover videos, hit the every-5-quiz pause, and answer the quiz correctly.
8. Encounter Alex at all 7 trigger moments at least once.
9. Earn at least one pillar-completion badge.
10. Successfully re-categorize a previously tagged transaction.

Performance & reliability:
- Cold start to Wallet home: under 3 seconds on mid-tier Android.
- QR scan to payment success: under 4 seconds on a normal mobile network.
- Alex first-token latency: under 1.5 seconds median.
- Crash-free sessions: >99.5% in beta cohort.

Accessibility:
- All text passes WCAG AA contrast.
- Supports system font scaling up to 130%.
- All flows usable one-handed.
- Vietnamese diacritics render correctly across all components.

---

## 10. Out of scope (deferred roadmap)

These features are intentionally cut from MVP and planned for later phases:

**Phase 02 (Beta):**
- Parent companion experience (delivered via a non-dashboard mechanism TBD)
- Builder tier (15–17) curriculum
- Side Hustle Tracker
- Family Quest marketplace
- Voice mode for Alex
- AI-pre-suggested categorization (with kid override)

**Phase 03 (Beta launch):**
- Launcher tier (17–18) curriculum
- Tết / lì xì allocator and other seasonal feature moments
- Money Personality profile
- Future You simulator
- Receipt OCR (computer vision categorization)
- Peer-to-peer payments between teens

**Phase 04 (App launch):**
- Founders Track + Cha-Ching Fund
- Investing sandbox + real micro-investing partnership
- Graduation pathway to adult bank account at 18
- Skill Currency (lessons → real money)
- Peer Skill Marketplace
- Expanded Cha-Ching Garden with seasonal events

---

## 11. Glossary (for builders)

- **Wallet** — tab name for the transactional side of the app.
- **Discover** — tab name for the TikTok-style video feed.
- **Learn** — tab name for the structured curriculum + gamification side.
- **Profile** — tab name for user settings and achievements.
- **Cha-Ching Garden** — the gamification scene at the top of the Learn tab.
- **Spend / Save / Give** — the three buckets that make up the kid's balance.
- **Alex** — the cartoon companion on the Learn tab.
- **Foundation / Builder / Launcher** — the three curriculum tiers, aligned to ages 12–14 / 15–16 / 17–18.
- **Pillar** — one of the 6 curriculum domains: Earn, Save, Spend, Invest, Give, Protect.
- **Color band** — the relative-magnitude color label (🔴 / 🟠 / 🟡 / 🟢 / ⚪) shown next to each category in the Spending Summary.
- **Lì xì** — traditional Vietnamese red-envelope money given during Tết (Lunar New Year); referenced in curriculum content.

---

*End of PRD v1.0 — ready for prototype generation.*
