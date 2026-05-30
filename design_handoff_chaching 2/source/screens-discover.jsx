// Cha-Ching — Discover tab screens

// ────────────────────────────────────────────────
// 1. Discover feed — TikTok-style video
// ────────────────────────────────────────────────
function DiscoverFeed() {
  return (
    <Phone bg="#0E1410" style={{ color: '#fff' }}>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Creator footage (full-bleed) */}
        <img src="assets/creator-footage.png" alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}/>
        {/* Dark bottom gradient for legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.55) 78%, rgba(0,0,0,.75) 100%)',
        }}/>

        {/* Right action rail */}
        <div style={{
          position: 'absolute', right: 12, bottom: 110,
          display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center',
        }}>
          <RailAction icon="❤️" label="12K" />
          <RailAction icon="🔖" label="Save" highlight />
          <RailAction icon="📤" label="Share" />
          <RailAction icon="💬" label="84" />
        </div>

        {/* Bottom title + CTA */}
        <div style={{
          position: 'absolute', bottom: 80, left: 16, right: 70,
          color: '#fff',
        }}>
          <div style={{ fontSize: 12, opacity: .8, fontWeight: 600 }}>@longmoney · 🛡️ Protect</div>
          <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.25, marginTop: 4 }}>
            Got 200.000 ₫? Don't bet it — 5 smarter moves for your money
          </div>
          <div style={{
            marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(63,142,92,.85)',
            backdropFilter: 'blur(10px)',
            color: '#fff', fontSize: 12, fontWeight: 700,
            padding: '8px 12px', borderRadius: 999,
          }}>🌱 Save to grow your Garden</div>
        </div>

        {/* Progress dots side */}
        <div style={{ position: 'absolute', left: 6, top: '40%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              width: 3, height: i === 2 ? 22 : 8, borderRadius: 2,
              background: i === 2 ? '#fff' : 'rgba(255,255,255,.3)',
            }} />
          ))}
        </div>
      </div>

      <TabBar active="discover" />
    </Phone>
  );
}

function Chip({ children, active }) {
  return (
    <div style={{
      padding: '6px 12px', borderRadius: 999,
      background: active ? '#fff' : 'rgba(255,255,255,.14)',
      color: active ? CC.greenInk : '#fff',
      fontSize: 12, fontWeight: 700,
      backdropFilter: active ? 'none' : 'blur(20px)',
      whiteSpace: 'nowrap',
    }}>{children}</div>
  );
}

function RailAction({ icon, label, highlight }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 22,
        background: highlight ? CC.green : 'rgba(0,0,0,.35)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20,
        border: '1px solid rgba(255,255,255,.1)',
      }}>{icon}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{label}</div>
    </div>
  );
}

// ────────────────────────────────────────────────
// 2. Quiz pause (every 5 videos)
// ────────────────────────────────────────────────
function QuizPause() {
  return (
    <Phone bg="#0E1410" style={{ color: '#fff' }}>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 50% 30%, rgba(245,215,90,.25), transparent 55%), linear-gradient(180deg, #15302a, #0a1a17)`,
        }} />
        {/* Trophy */}
        <div style={{ position: 'absolute', top: 80, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 76, height: 76, borderRadius: 38, background: 'rgba(245,215,90,.18)',
            border: '1px solid rgba(245,215,90,.35)', fontSize: 36,
          }}>🪙</div>
          <div style={{ fontSize: 11, color: CC.yellow, fontWeight: 700, letterSpacing: 1, marginTop: 12 }}>
            QUICK QUIZ · WIN 1.000 ₫
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.25, padding: '6px 32px', marginTop: 6 }}>
            If you save 50.000 ₫ every week, how much do you have in 1 year?
          </div>
        </div>

        {/* Options */}
        <div style={{
          position: 'absolute', left: 20, right: 20, bottom: 140,
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <QuizOpt letter="A" text="500.000 ₫" />
          <QuizOpt letter="B" text="1.300.000 ₫" />
          <QuizOpt letter="C" text="2.600.000 ₫" correct />
          <QuizOpt letter="D" text="5.200.000 ₫" />
        </div>

        {/* Timer */}
        <div style={{
          position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center',
          fontSize: 12, color: 'rgba(255,255,255,.65)',
        }}>⏱ 22s left · skip ›</div>
      </div>
      <TabBar active="discover" />
    </Phone>
  );
}

function QuizOpt({ letter, text, correct }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 14px', borderRadius: 14,
      background: correct ? CC.green : 'rgba(255,255,255,.08)',
      border: `1px solid ${correct ? 'transparent' : 'rgba(255,255,255,.12)'}`,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 14,
        background: correct ? '#fff' : 'rgba(255,255,255,.15)',
        color: correct ? CC.green : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 800,
      }}>{letter}</div>
      <div style={{ flex: 1, fontSize: 15, fontWeight: 700 }}>{text}</div>
      {correct && <span style={{ fontSize: 16 }}>✓</span>}
    </div>
  );
}

// ────────────────────────────────────────────────
// 3. Daily cap end card
// ────────────────────────────────────────────────
function DailyCap() {
  return (
    <Phone bg={CC.mint}>
      <div style={{ flex: 1, padding: '40px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* Alex sleeping */}
        <div style={{
          width: 160, height: 160, borderRadius: 80,
          background: `radial-gradient(circle at 50% 40%, ${CC.mintDeep}, ${CC.mint})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: 12, position: 'relative',
        }}>
          <div style={{ fontSize: 86 }}>😴</div>
          <div style={{
            position: 'absolute', top: 4, right: 6,
            fontSize: 22, color: CC.greenInk, fontWeight: 700,
          }}>z<span style={{ fontSize: 16 }}>z</span><span style={{ fontSize: 11 }}>z</span></div>
        </div>

        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 22, color: CC.greenInk }}>
          That's enough for today!
        </div>
        <div style={{ fontSize: 14, color: CC.ink2, marginTop: 8, lineHeight: 1.5, maxWidth: 280 }}>
          You watched 25 minutes today. Your eyes need a break — and your Garden is waiting 🌱
        </div>

        {/* Today's stats */}
        <div style={{
          marginTop: 22, padding: '14px 18px', borderRadius: 18,
          background: '#fff', display: 'flex', gap: 16, alignItems: 'center',
        }}>
          <Stat label="Watched" value="11" sub="videos" />
          <div style={{ width: 1, height: 32, background: CC.line }} />
          <Stat label="Saved" value="3" sub="to Garden" />
          <div style={{ width: 1, height: 32, background: CC.line }} />
          <Stat label="Earned" value="3K" sub="₫ quiz" />
        </div>

        <div style={{ width: '100%', marginTop: 26 }}>
          <Btn kind="primary" size="lg" full>Go to Learn  →</Btn>
          <div style={{ height: 10 }} />
          <Btn kind="ghost" size="md" full>See what's growing 🌱</Btn>
        </div>
      </div>
      <TabBar active="discover" />
    </Phone>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 10, color: CC.ink3, fontWeight: 600 }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: CC.greenInk, marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: 10, color: CC.ink3 }}>{sub}</div>
    </div>
  );
}

Object.assign(window, { DiscoverFeed, QuizPause, DailyCap });
