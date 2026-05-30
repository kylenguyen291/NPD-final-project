# Cha-Ching Functionality v2.0

**Version:** 2.0
**Last updated:** 2026-05-30
**Status:** Behavioral specification for v2.0 features
**Owner:** ChaChing product team

---

## 0. Purpose and relationship to other documents

This document describes the **user-facing flows and operational logic** for the features introduced in `redesign.md`. It is the companion to:

- `ChaChing-PRD.md` — the product foundation (what the app is and why)
- `redesign.md` — the v2.0 design changes (what's new and changed)
- `functionality.md` (this document) — how the new features behave when used

If `redesign.md` says *"there is a streak"*, this document explains *"when does the streak increment, when does it reset, what does the kid see, what edge cases break it."*

---

## 1. A day in the life — typical flow with the new features

Imagine Liam, 14, a typical Tier A user on a normal Tuesday afternoon.

**4:00 PM** — Liam opens Cha-Ching. The app lands on the Wallet tab. He sees his balance, his streak chip (🔥12) next to his avatar, and a "Discover something today" row at the bottom showing: *"Highland Coffee raises prices — read article."*

**4:01 PM** — Curious, he taps the row. App switches to Discover tab, scrolls to the news card at the top, opens the full article. ~200 words about inflation in Vietnamese coffee chains. Bottom of article: green button "Let Alex explain."

**4:02 PM** — Liam taps it. (First use of his free daily explainer.) App deep-links to Learn tab. Alex's chat overlay opens with a "Thinking..." indicator. ~1.5 seconds later, 3 bubbles unfold:
- *"Hey! So this article is about **inflation** — prices going up over time."*
- *"When Highland raises prices, it usually means their costs (rent, beans, salaries) went up first. They pass that to you."*
- *"For your wallet: this means 50,000 VND today doesn't buy what 50,000 VND bought last year. That's why saving and investing matters."*

Three CTAs appear. Liam taps **"Save to Garden"**. A small seedling animation plants in the Save zone. Mèo (his cat) does a happy spin. +10 XP.

**4:03 PM** — Liam swipes back to the Discover feed. Scrolls through 3 more cards: a video, a poll ("What's your top spending category this week?"), and a tip card. He votes in the poll and saves the video.

**4:05 PM** — He goes to the Learn tab. Sees Mèo walking the Save pillar path. His "Compound Growth" module is at 2/3 lessons complete. He taps the next lesson node.

**4:08 PM** — 90-second video plays, then a swipe-scenario activity. He passes. +15 XP. Mèo celebrates. "Apply Now" button: "Set a new savings goal" → he taps, app jumps to Wallet to set a goal.

**4:10 PM** — Wallet flow: new goal *"Buy a new game"*, 500,000 VND, manual save rule. Created. Returns to home.

**4:11 PM** — Daily Quest progress chip at bottom shows: "2/3 today — one more!" The remaining task is "tag any transaction with emotion." He skips for now.

**5:30 PM** — Buys bubble tea via QR. Tags 🍔 Food & Drink, taps 😊 emotion. Daily Quest complete. A subtle full-screen Mèo celebration plays for 1.5s. Push: *"Streak now 🔥13. Mèo is glowing today 🌟"*. +1,000 VND added to Save bucket as today's reward.

**Next morning** — If Liam forgets to use the app all of Wednesday, the app waits. If he forgets Thursday too, his umbrella auto-deploys silently. Friday morning notification: *"Your umbrella saved your streak last night ☂️. Streak: 🔥14."*

That is the daily core loop in one frame. The remaining sections specify each flow in detail.

---

## 2. Pet + Streak — detailed flows

### 2.1 Pet adoption flow (during onboarding)

Inserted as a new step in PRD §8.1, between Garden Intro and Top-up Prompt.

1. **Adopt Mèo screen** appears. 4 cat illustrations side by side: orange, black-white, grey tabby, calico. Headline: *"Choose your Mèo!"*
2. Kid taps a cat → it bounces in response.
3. **Name your Mèo** modal appears. Text input, default "Mèo Vàng", max 16 characters.
4. Kid taps "Adopt" → 2-second adoption animation plays: Mèo walks into the Garden, looks at the camera, blinks.
5. App continues to the Top-up Prompt.

Edge cases:
- Kid skips the name input → default "Mèo Vàng" is assigned. Renameable in Profile any time.
- Kid wants to change color later → allowed once in first 30 days free. Thereafter cosmetic IAP (5,000 VND).

### 2.2 Daily Quest completion flow

1. Kid opens the app at any time during the day.
2. **Wallet header shows** a Daily Quest chip: "0/3", "1/3", "2/3", or "3/3 ✓".
3. Each completed task increments the chip in real time.
4. **3/3 completed** triggers:
   - Full-screen Mèo celebration (1.5 seconds)
   - +50 XP
   - +1,000 VND to Save bucket (subject to 10k/day cap across all reward sources)
   - Streak chip updates next time it's checked
5. **Streak number** increments at **midnight local time** (server-enforced), not at quest completion. This prevents users from gaming midnight rollovers.

**The 3 tasks:**

| Task | How to complete |
|---|---|
| Watch 1 video lesson OR complete 1 Module Checkpoint | Triggered by reaching the end of a lesson video or passing a checkpoint |
| Answer today's quiz | Offered after any video lesson, or from the home screen's quiz card |
| Tag any wallet transaction with an emotion (😊/😐/😞) | Triggered by tapping any emotion on a transaction (new or historical) |

**Edge cases:**
- Kid has no transactions today → emotion-tag task auto-completes at 8 PM local.
- Kid is in a learn-heavy mode → emotion-tag can also be fulfilled by tagging an emotion on any untagged transaction from the past 7 days.
- Quest is partially complete at midnight → does not roll over. Streak does not increment. Resets at midnight.

### 2.3 Streak loss and umbrella deployment

**Scenario A: 1 missed day, has 1+ umbrella.**
1. Midnight rollover detects no Daily Quest done today.
2. System silently auto-deploys 1 umbrella.
3. Streak preserved at previous value.
4. Umbrella count decremented in Profile inventory.
5. **Next morning** (first app open of the day): friendly notification appears: *"Your umbrella saved your streak ☂️. Streak: 🔥{N}."*
6. Mèo is in Happy state on first sight.

**Scenario B: 1 missed day, 0 umbrellas.**
1. Midnight rollover detects no Daily Quest done today.
2. Streak resets to 0.
3. **No notification fires.** No guilt copy.
4. Next time the kid opens the app: Mèo is in Curious state, looking toward the door.
5. Header shows 🔥0 (or hides the flame entirely if streak = 0).

**Scenario C: 2+ missed days.**
- After 2 days: Mèo moves to Sleepy state on next open.
- After 5 days: Mèo moves to Lonely state. **Exactly one** push notification fires: *"Mèo misses you 🥺"*. No further re-engagement pushes until kid returns.
- Recovery: any Daily Quest completion in a new day instantly restores Mèo to Happy. No penalty, no make-up work.

### 2.4 Evolution ceremony

Triggered when XP crosses an evolution threshold (500, 2,000, 8,000 XP).

1. Mèo freezes mid-animation; sparkles surround.
2. 5-second cinematic: Mèo grows into the next form (Baby → Junior → Adult → Master).
3. End screen: *"Mèo evolved to Junior!"* + new XP range shown + VND bonus to Save bucket.
4. Permanent profile badge unlocked.
5. Confetti.

**Edge case:** if a kid crosses two thresholds in a single session (unlikely but possible at low levels), the second evolution is deferred to the next session so flow is not interrupted.

### 2.5 Umbrella earning and purchasing

**Earning (free and Plus):**
- Trigger: completion of 5 consecutive Daily Quests.
- Award: +1 umbrella.
- Max inventory: 2.
- If inventory is already full, the 5-day reward becomes +500 VND to Save instead.

**Plus tier perk:**
- On Plus activation: 3 starter umbrellas granted (one-time).
- These count toward the max-2 cap → effectively 3 available for next 3 misses, then capped at 2 thereafter.

**Purchasing (Plus only):**
- Price: 5,000 VND per umbrella.
- Max 1 purchase per week.
- Requires parent approval (implicit via top-up flow — purchase comes from kid's Spend bucket, which is parent-funded).

**Free tier:** cannot purchase. Must earn organically.

---

## 3. News + Ask Alex — detailed flows

### 3.1 Daily news drop

- **6:00 AM local time** daily: editorial team's curated article is published.
- App pulls the new article on next open.
- Article appears at the top of Discover feed for 24 hours AND as the rotating "Discover something today" line on Wallet home.
- After 24 hours, the article moves down into the regular feed mix (still accessible, no longer pinned).

### 3.2 Reading an article

1. Kid taps a news card from Discover or the Wallet bottom row.
2. Article view opens full-screen.
3. Components, top to bottom:
   - Hero image (responsive)
   - Headline (large, ≤8 words)
   - Body (3 short paragraphs with subheads, 150–300 words)
   - Sticky bottom action row: ☂️ **"Let Alex explain"** (primary green) · 🔖 Save · 📤 Share · 💬 Comment (read-only)
4. Kid scrolls naturally. The bottom CTA stays sticky.

### 3.3 Ask Alex flow — free tier (1 per day)

1. Kid taps "Let Alex explain".
2. System check: has kid used today's free explainer?
   - **No:** proceed.
   - **Yes:** paywall card slides up (see §3.5).
3. Decrement free counter for the day.
4. App deep-links to Learn tab.
5. Alex's chat overlay opens with a "Thinking..." indicator (target: 1.5s to first bubble).
6. RAG runs server-side:
   - Retrieve top-3 concepts from vector store relevant to article.
   - Construct prompt: persona + curriculum chunks + article context + safety rules.
   - Generate 3–5 bubbles.
7. Bubbles unfold one at a time, 400ms delay between each.
8. End of explanation: 3 CTAs:
   - **"Save to Garden"** → +10 XP, plant in matching pillar zone, Mèo animation.
   - **"Ask one more question"** → opens text input. Free tier: 1 follow-up allowed in this session.
   - **"Got it, thanks"** → closes overlay, returns kid to article or previous tab.

### 3.4 Ask Alex flow — Plus tier (unlimited)

Same as free flow, with these differences:
- No daily cap.
- Unlimited follow-up questions per article.
- "Save to Garden" earns 1.5× XP (15 instead of 10).
- Alex's tone can include slightly longer / more detailed bubbles.

### 3.5 Free-tier paywall behavior

When a free-tier kid taps "Let Alex explain" after using their daily 1:

1. A bottom sheet slides up (does not navigate away from the article).
2. Headline: *"You've used today's free explainer."*
3. Body: *"Unlock unlimited Alex explanations with Plus."*
4. Two CTAs:
   - **"Upgrade to Plus"** → opens subscription flow.
   - **"Maybe tomorrow"** → dismisses, kid returns to article.
5. Free counter resets at 6:00 AM next day.

**No** guilt copy, **no** countdown timers, **no** urgency framing.

### 3.6 Edge cases for Ask Alex

- **RAG retrieves no relevant concepts** (article is off-topic for finance): Alex declines politely. *"This one's outside what I can explain well — try another article!"* Free explainer count is NOT consumed.
- **Follow-up question breaks Alex's hard rules** (e.g., "Should I buy VinFast stock?"): Alex redirects to a related general concept. *"I can't tell you which stock to buy, but here's how to think about evaluating a stock you're interested in..."*
- **Kid spam-clicks "Save to Garden"** on the same article: cap at +10 XP per article (no stacking).
- **Article is older than 7 days** and the kid asks for an explanation: still works. No time gate on Ask Alex beyond the daily free cap.

---

## 4. Learn module pathway — detailed flows

### 4.1 Entering a pillar

1. Kid taps a pillar card from Learn tab home (e.g., "Save").
2. The Module Pathway view opens:
   - Pillar header: name + total progress chip (e.g., *"Save — 5/10 lessons · 1/3 modules"*)
   - Vertical winding path with nodes
   - Mèo animated walking along the path at the kid's current position
3. Kid sees:
   - **Completed** lesson nodes: green-filled with checkmark
   - **Current** lesson node: pulsing green ring, scaled slightly bigger
   - **Locked** lesson nodes: grey with small lock icon (only locked if part of a module gated by an earlier module)
   - **Module Checkpoint** nodes: octagonal, gold accent
4. Tapping the current node starts the lesson (see PRD §8.4 for lesson video flow).

### 4.2 Module Checkpoint flow

1. After completing the last lesson in a module, the next node on the path is the Checkpoint.
2. Tapping it shows a 3-second intro: *"Module 1 Checkpoint: Why Save? — 5 questions, 4 to pass."*
3. Quiz begins:
   - 5 questions
   - Mixed format (multiple choice, swipe scenario, fill-in-blank)
   - No time pressure
4. End screen:
   - **Pass (4/5 or 5/5):**
     - Confetti animation
     - Module Badge ceremony
     - +200 XP
     - Mèo dance
     - Garden zone for this pillar visibly blooms (new flower, taller tree, etc.)
     - Next module unlocks with a soft glow on the path
   - **Fail (<4/5):**
     - "Almost there!" screen
     - Shows which 2 lessons to review (based on which questions were missed)
     - Immediate first retry available
     - Subsequent retries gated 1 hour (prevents brute-forcing)

### 4.3 Pillar completion ceremony

Triggered when all 3 modules of a pillar are complete (or 2 modules in the case of the Give pillar):

1. 5-second cinematic: pillar's Garden zone fully blooms; Mèo runs around the zone celebrating.
2. Foundation-tier pillar certificate awarded (visible in Profile).
3. Permanent profile badge.
4. +1,000 XP bonus to total.
5. Alex appears with a 2-option branching choice: *"Which pillar next?"* Options rotate based on remaining pillars + kid's recent behavior.

### 4.4 Unlocking logic summary

| Rule | Behavior |
|---|---|
| Module 2 unlock | Requires Module 1 checkpoint passed |
| Module 3 unlock | Requires Module 2 checkpoint passed |
| Pillar gating | None. Any pillar startable in any order. |
| Lesson order within a module | Not strictly enforced. Kid can do them in any order within their unlocked module. |
| Pillar completion certificate | Requires all modules in the pillar complete |

### 4.5 Empty and error states

- **Pillar with 0 progress:** path is fully visible. All nodes grey except the first (which pulses). Mèo stands at the entrance. Intro card: *"Ready to start [Pillar]?"*
- **Pillar fully complete:** path is all green checkmarks. Garden zone fully bloomed. Mèo wears the pillar's themed accessory.
- **Lesson cannot load (network drop mid-video):** standard offline screen. Lesson resumes at last 5-second checkpoint on retry.

---

## 5. Discover mixed-format feed — detailed flows

### 5.1 Feed entry

1. Kid taps Discover tab.
2. Feed loads with the **daily news card pinned at top** (always, until 6 AM next day).
3. Below: For You algorithmic feed.
4. Vertical swipe = next card.

### 5.2 Card-by-card interactions

**Video Card:**
- Autoplays on entry.
- Right-rail actions: ❤️ Like · 🔖 Save (plants Garden seedling, +5 XP) · 📤 Share · 💬 Comment (read-only).
- Tap = pause/play.

**News Card:**
- Distinct soft-pastel background.
- Does NOT autoplay anything.
- Tap "Read article" → opens full article view (see §3.2).
- Save = plants Garden seedling, +5 XP.

**Poll Card:**
- Question + 2–4 options + "Vote" button.
- After vote: live anonymous results shown (e.g., *"38% picked Food & Drink as their top category this month"*).
- No save action (polls don't enter the Garden).
- Voting awards +5 XP (encourages participation).

**Tip Card:**
- Single illustration + 1-sentence tip + Save button.
- No CTA beyond Save.
- Save = plants Garden seedling, +5 XP.

**Mini-Game Card:**
- Tile with game name and a "Play (60s)" button.
- Tap launches the mini-game full-screen.
- On completion, returns to feed at next card.
- Score adds to internal leaderboard (no UI in MVP).

**Streak / Achievement Card:**
- Appears max once per day.
- Shows current streak + Mèo pose.
- Tap → opens Profile to view full badge wall.
- Auto-dismisses if scrolled past.

### 5.3 Every-5 quiz pause

- Every 5 consecutive cards consumed (any type), feed pauses on a single quiz question.
- Question is themed to one of the recently viewed cards.
- 30-second timer to answer.
- **Correct:** +1,000 VND to Save bucket (subject to 10k/day total cap).
- **Incorrect:** no penalty, brief explanation shown, then continue.
- Quiz pause counts as one Daily Quest progress (if "Answer today's quiz" is still pending).

### 5.4 Daily cap behavior

- **Tier A (12–14):** 25 min / day.
- **Tier B (15–18):** 40 min / day.
- Cap reached → feed transitions to a full-screen end card with Mèo in sleepy pose: *"That's enough for today! Try a lesson, or check what's growing in your Garden 🌱"*
- Two CTAs: **"Go to Learn"** (primary) · **"Close"** (secondary).
- Returning to Discover same day → end card again, no scrolling.

### 5.5 Edge cases

- **Poll has 0 votes yet** from anonymous cohort: results screen shows *"Be the first to vote!"* until 10+ votes accumulate.
- **Mini-game card tapped on low battery:** game launches at reduced animation quality, still playable.
- **80% of cap reached:** small chip at top of feed: *"5 min left today."*

---

## 6. Micro-stock unlock at 18 — forward-look flow (Phase 04)

For design forward-compatibility. **Not built in MVP.**

1. Kid's 18th birthday occurs.
2. System detects birthday on next app open AND checks Launcher-tier Invest pillar completion status.
3. **Path A — Pillar is complete:**
   - Unlock animation plays automatically.
   - A new 4th bucket "Invest" slides into the Wallet header.
   - Onboarding card: *"Welcome to Micro-stock — your first 10,000 VND trade is on us."*
   - KYC verification flow (mandatory for VN brokerage compliance).
   - First-trade tutorial.
4. **Path B — Pillar is incomplete:**
   - Unlock is deferred.
   - Card shown in Wallet: *"You're 18 — Micro-stock is almost ready. Finish the Invest pillar to unlock."*
   - Progress shown.
   - Deep-link CTA to Learn tab.
5. **Once unlocked**, Invest bucket behaves like the others (money in, money out) plus an additional "Trade" action that opens the integrated brokerage (SSI / VNDirect).

---

## 7. Integration points (how features interact)

| Feature A | Feature B | Connection |
|---|---|---|
| Daily Quest completion | Pet streak | 1 quest = 1 streak day. Direct dependency. |
| Module Checkpoint pass | Pet evolution | +200 XP from checkpoint can trigger evolution thresholds. |
| News article saved | Garden growth | Saved article plants a seedling in matching pillar zone (same as saved video). |
| "Let Alex explain" daily cap | Plus subscription | The free-tier paywall card is the primary conversion trigger for Plus. |
| Wallet emotion tag | Daily Quest | Any emotion tag fulfills the 3rd quest task. |
| Pet "Lonely" state | Push notification | The only trigger for the "Mèo misses you" push, fired exactly once at 5+ missed days. |
| Pillar completion | Mèo evolution | +1,000 XP bonus often crosses an evolution threshold, especially in earlier stages. |
| Discover quiz pause | Daily Quest | A correct quiz pause counts toward the "Answer today's quiz" task. |
| Discover daily cap end card | Learn tab | The end card's primary CTA deep-links to Learn. |

---

## 8. Edge cases across features

### 8.1 Time and clock handling

- **Server clock is canonical** for streak rollovers and daily cap resets. Device clock is shown to user but never used for streak math.
- **Streak rollover time:** midnight local time in the kid's registered time zone (set at onboarding via phone country code).
- **Daily cap reset:** 6:00 AM local time.
- **News refresh:** 6:00 AM local time.
- **Time zone change** (kid travels): the kid's registered time zone does NOT auto-update from device. Manual change available in Profile → Settings.

### 8.2 Offline and degraded network

- **Offline app open:** Mèo cached in last state. Streak counter cached. Cached lessons playable. Daily Quest progress queued; syncs on reconnect.
- **Sync conflict** (kid completed quest offline while system marked them as missed): kid's offline completion wins, streak preserved on sync.
- **Long offline period** (kid offline for 7+ days): mood states progress as if device were online. Returning kid sees Lonely Mèo; first action restores Happy.

### 8.3 Multi-device

- One account per kid. No multi-device live sync in MVP.
- Login on a new device requires PIN + OTP re-verification.
- All progress is server-stored, so a new device pulls full state on login.

### 8.4 Reward stacking and abuse protection

- All VND rewards (Daily Quest, quiz pause, streak milestones) are subject to a **10,000 VND/day total cap** across all sources.
- The 10k cap resets at 6:00 AM local.
- Streak milestone bonuses (week, month, 100-day, year) are exempt from the daily cap because they fire only once.
- Module Checkpoint XP awards are not subject to the cap (XP is unlimited; only VND is capped).

### 8.5 Safety and content moderation

- All Ask Alex outputs filtered server-side before display.
- News articles reviewed by editorial team before publish — no automated publishing.
- Comments are read-only in MVP (no posting); UGC scope is deferred to Phase 02+.
- Pet customizations and names filtered against a profanity/PII blocklist.

### 8.6 Subscription state transitions

- **Free → Plus upgrade:** Plus benefits available immediately. Starter pack of 3 umbrellas granted on activation. Save bucket starts earning 1.5× XP on saved content.
- **Plus → Free downgrade:** at end of current billing cycle, kid retains Mèo, all XP, all progress, all certificates. Loses unlimited Ask Alex (back to 1/day), loses 1.5× XP multiplier, loses ability to purchase umbrellas (but keeps any in inventory).
- **Lapsed Plus** (payment failure): 7-day grace period at Plus features, then auto-downgrade to Free with the standard downgrade rules.

---

*End of Cha-Ching Functionality v2.0.*
