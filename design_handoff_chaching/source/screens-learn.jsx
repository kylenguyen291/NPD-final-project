// Cha-Ching — Learn tab screens

// ────────────────────────────────────────────────
// Cha-Ching Garden — a single SVG scene with 6 pillar zones
// ────────────────────────────────────────────────
function GardenScene({ height = 200 }) {
  return (
    <svg viewBox="0 0 360 200" width="100%" height={height} preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block' }}>
      {/* Sky gradient */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8F4EA"/>
          <stop offset="1" stopColor="#C7E5C9"/>
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A8D4AC"/>
          <stop offset="1" stopColor="#7BBE82"/>
        </linearGradient>
        <linearGradient id="trunk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6B4525"/>
          <stop offset="1" stopColor="#4a2f18"/>
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="360" height="200" fill="url(#sky)"/>

      {/* Soft hills */}
      <ellipse cx="80" cy="170" rx="140" ry="38" fill="#9ACDA0" opacity=".55"/>
      <ellipse cx="290" cy="178" rx="120" ry="32" fill="#9ACDA0" opacity=".55"/>

      {/* Ground */}
      <rect x="0" y="148" width="360" height="52" fill="url(#ground)"/>

      {/* Protect fence (around) */}
      <g stroke="#5a4a2a" strokeWidth="1.5" fill="#E5B924">
        <rect x="10" y="142" width="6" height="14"/>
        <rect x="30" y="140" width="6" height="16"/>
        <rect x="50" y="142" width="6" height="14"/>
        <rect x="304" y="142" width="6" height="14"/>
        <rect x="324" y="140" width="6" height="16"/>
        <rect x="344" y="142" width="6" height="14"/>
      </g>

      {/* 🛠️ Workshop (Earn) */}
      <g transform="translate(28, 100)">
        <rect x="0" y="20" width="42" height="32" fill="#D9A86C" stroke="#6B4525" strokeWidth="1.5"/>
        <polygon points="-4,20 21,2 46,20" fill="#C2452F" stroke="#6B4525" strokeWidth="1.5"/>
        <rect x="14" y="34" width="12" height="18" fill="#6B4525"/>
        <circle cx="35" cy="32" r="3" fill="#3F8E5C"/>
      </g>

      {/* 🐷 Piggy bank fountain (Save) */}
      <g transform="translate(88, 110)">
        <ellipse cx="20" cy="42" rx="22" ry="4" fill="#000" opacity=".1"/>
        <ellipse cx="20" cy="28" rx="20" ry="14" fill="#F5A1B9"/>
        <circle cx="32" cy="24" r="6" fill="#F5A1B9"/>
        <circle cx="34" cy="24" r="1.5" fill="#1B2218"/>
        <circle cx="36" cy="24" r="1.5" fill="#1B2218"/>
        <circle cx="14" cy="24" r="1.2" fill="#1B2218"/>
        <rect x="16" y="14" width="10" height="2" fill="#1B2218" opacity=".5"/>
        <rect x="8" y="36" width="3" height="6" fill="#F5A1B9"/>
        <rect x="29" y="36" width="3" height="6" fill="#F5A1B9"/>
        {/* Coins above */}
        <circle cx="22" cy="6" r="3.5" fill="#F5D75A" stroke="#E5B924" strokeWidth="1"/>
        <text x="22" y="9" textAnchor="middle" fontSize="5" fontWeight="800" fill="#6B4525">₫</text>
      </g>

      {/* 🛒 Market stall (Spend) */}
      <g transform="translate(146, 102)">
        <rect x="2" y="20" width="44" height="30" fill="#fff" stroke="#1B2218" strokeWidth="1.2"/>
        <polygon points="0,20 24,8 48,20" fill="#3F8E5C" stroke="#1B2218" strokeWidth="1.2"/>
        <rect x="0" y="18" width="48" height="4" fill="#E5B924"/>
        <rect x="0" y="22" width="48" height="4" fill="#fff"/>
        <rect x="0" y="26" width="48" height="4" fill="#E76F62"/>
        <circle cx="12" cy="40" r="3" fill="#E76F62"/>
        <circle cx="22" cy="40" r="3" fill="#F0A04B"/>
        <circle cx="32" cy="40" r="3" fill="#F5D75A"/>
      </g>

      {/* 🌳 Invest fruit tree */}
      <g transform="translate(210, 70)">
        <rect x="18" y="48" width="8" height="32" fill="url(#trunk)"/>
        <circle cx="22" cy="36" r="24" fill="#3F8E5C"/>
        <circle cx="10" cy="32" r="14" fill="#5BAA72"/>
        <circle cx="34" cy="30" r="16" fill="#5BAA72"/>
        <circle cx="22" cy="22" r="14" fill="#7BBE82"/>
        {/* Fruits */}
        <circle cx="12" cy="38" r="3" fill="#E76F62"/>
        <circle cx="30" cy="40" r="3" fill="#E76F62"/>
        <circle cx="22" cy="32" r="3" fill="#F5D75A"/>
      </g>

      {/* 🌸 Flower patch (Give) */}
      <g transform="translate(272, 130)">
        <Flower x={6}  y={18} c="#E76F62"/>
        <Flower x={18} y={22} c="#F5D75A"/>
        <Flower x={32} y={16} c="#9B7AC4"/>
        <Flower x={44} y={20} c="#F0A04B"/>
        <Flower x={56} y={24} c="#E76F62"/>
        <Flower x={12} y={6} c="#F5D75A"/>
        <Flower x={40} y={4} c="#9B7AC4"/>
      </g>

      {/* Sun / cloud chrome */}
      <circle cx="320" cy="28" r="14" fill="#F5D75A"/>
      <g fill="#fff" opacity=".7">
        <circle cx="60" cy="34" r="8"/>
        <circle cx="72" cy="32" r="11"/>
        <circle cx="86" cy="36" r="8"/>
      </g>

      {/* Seedling pop near workshop (recent Save) */}
      <g transform="translate(82, 142)">
        <path d="M0 6 Q-3 0 -1 -3 M0 6 Q3 0 1 -3" stroke="#3F8E5C" strokeWidth="1.5" fill="none"/>
        <circle cx="-2" cy="-2" r="1.8" fill="#7BBE82"/>
        <circle cx="2" cy="-2" r="1.8" fill="#7BBE82"/>
      </g>
    </svg>
  );
}

function Flower({ x, y, c }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1="0" y1="0" x2="0" y2="8" stroke="#3F8E5C" strokeWidth="1.2"/>
      <circle cx="-2" cy="-1.5" r="2" fill={c}/>
      <circle cx="2"  cy="-1.5" r="2" fill={c}/>
      <circle cx="0"  cy="-3"   r="2" fill={c}/>
      <circle cx="0"  cy="1"    r="2" fill={c}/>
      <circle cx="0"  cy="-1"   r="1.2" fill="#F5D75A"/>
    </g>
  );
}

// ────────────────────────────────────────────────
// 1. Learn tab — Garden + pillars list
// ────────────────────────────────────────────────
function LearnHome() {
  const pillars = [
    { i: '🛠️', name: 'Earn',    cur: 3,  tot: 10, tone: CC.orange },
    { i: '🐷', name: 'Save',    cur: 7,  tot: 10, tone: CC.green },
    { i: '🛒', name: 'Spend',   cur: 5,  tot: 10, tone: CC.coral },
    { i: '🌳', name: 'Invest',  cur: 0,  tot: 8,  tone: CC.greenDeep },
    { i: '🌸', name: 'Give',    cur: 2,  tot: 6,  tone: '#9B7AC4' },
    { i: '🛡️', name: 'Protect', cur: 4,  tot: 16, tone: CC.yellowDeep },
  ];
  return (
    <Phone bg={CC.mint}>
      {/* Header */}
      <div style={{ padding: '12px 16px 6px', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: CC.ink3, fontWeight: 600, letterSpacing: .4 }}>YOUR GARDEN</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: CC.greenInk, letterSpacing: -.3 }}>Cha-Ching Garden</div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#fff', padding: '6px 12px', borderRadius: 999,
          border: `1px solid ${CC.line}`,
        }}>
          <span style={{ fontSize: 14 }}>🔥</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: CC.ink }}>12</span>
          <span style={{ fontSize: 11, color: CC.ink3 }}>·</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: CC.greenInk }}>1.240 XP</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '0 16px' }}>
        {/* Garden scene */}
        <div style={{
          borderRadius: 22, overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(63,142,92,.12)',
          border: `1px solid ${CC.line}`,
        }}>
          <GardenScene />
        </div>

        {/* Mini stats */}
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <MiniStat icon="🌱" v="14" l="seeds" />
          <MiniStat icon="🌸" v="7"  l="flowers" />
          <MiniStat icon="🏆" v="2"  l="badges" />
        </div>

        {/* Section: pillars */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 4px 8px' }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>6 Pillars · Foundation</div>
          <div style={{ fontSize: 12, color: CC.green, fontWeight: 700 }}>Games 🎮</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {pillars.map(p => <PillarCard key={p.name} {...p} />)}
        </div>
      </div>

      <TabBar active="learn" />
    </Phone>
  );
}

function MiniStat({ icon, v, l }) {
  return (
    <div style={{
      flex: 1, padding: '8px 10px', borderRadius: 14, background: '#fff',
      display: 'flex', alignItems: 'center', gap: 8,
      border: `1px solid ${CC.line}`,
    }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1 }}>{v}</div>
        <div style={{ fontSize: 10, color: CC.ink3 }}>{l}</div>
      </div>
    </div>
  );
}

function PillarCard({ i, name, cur, tot, tone }) {
  const pct = (cur / tot) * 100;
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: 12,
      border: `1px solid ${CC.line}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10, background: CC.mint,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
        }}>{i}</div>
        <div style={{ fontSize: 14, fontWeight: 800, flex: 1 }}>{name}</div>
      </div>
      <div style={{ height: 5, background: CC.mintDeep, borderRadius: 3, overflow: 'hidden', marginTop: 10 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: tone }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <div style={{ fontSize: 11, color: CC.ink3 }}>{cur} of {tot}</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: cur ? tone : CC.ink3 }}>
          {cur === 0 ? 'Start →' : cur === tot ? '✓ Done' : 'Continue →'}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// 2. Pillar detail — Save lesson list
// ────────────────────────────────────────────────
function PillarDetail() {
  const lessons = [
    { n: 1, t: 'What is saving, really?',           m: '1:12', s: 'done' },
    { n: 2, t: 'The 50/30/20 rule for teens',      m: '1:45', s: 'done' },
    { n: 3, t: 'Compound interest — magic of time', m: '2:08', s: 'done' },
    { n: 4, t: 'Set smart goals (Bicycle case)',   m: '1:30', s: 'done' },
    { n: 5, t: 'Saving from lì xì 🧧',               m: '1:55', s: 'done' },
    { n: 6, t: 'Round-up: the painless save',      m: '1:24', s: 'done' },
    { n: 7, t: 'Where to keep your money',         m: '2:30', s: 'current' },
    { n: 8, t: 'Save vs. invest (Level 1)',        m: '1:48', s: 'locked' },
    { n: 9, t: 'Talk to a parent about money',     m: '2:15', s: 'locked' },
    { n: 10,t: 'Pillar quest · Save',              m: '4:00', s: 'locked', quest: true },
  ];
  return (
    <Phone bg={CC.mint}>
      {/* Hero */}
      <div style={{ background: CC.greenInk, color: '#fff', padding: '14px 18px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CircleBtn bg="rgba(255,255,255,.15)"><span style={{ color: '#fff' }}>‹</span></CircleBtn>
          <div style={{ flex: 1, fontSize: 11, opacity: .7, fontWeight: 700, letterSpacing: 1 }}>FOUNDATION ▸ PILLAR 02</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18, background: CC.green,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
          }}>🐷</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 800 }}>Save</div>
            <div style={{ fontSize: 12, opacity: .8 }}>7 of 10 lessons · 50 XP earned</div>
          </div>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,.15)', borderRadius: 3, overflow: 'hidden', marginTop: 14 }}>
          <div style={{ width: '70%', height: '100%', background: CC.yellow }} />
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '12px 16px', marginTop: -16 }}>
        <div style={{
          background: '#fff', borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 6px 20px rgba(27,34,24,.06)',
        }}>
          {lessons.map((l, i) => (
            <LessonRow key={i} {...l} last={i === lessons.length - 1} />
          ))}
        </div>
      </div>

      <TabBar active="learn" />
    </Phone>
  );
}

function LessonRow({ n, t, m, s, quest, last }) {
  const done = s === 'done', cur = s === 'current';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '12px 14px', gap: 12,
      borderBottom: last ? 'none' : `1px solid ${CC.line}`,
      background: cur ? CC.mint : 'transparent',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 18,
        background: done ? CC.green : cur ? '#fff' : CC.mintDeep,
        color: done ? '#fff' : cur ? CC.green : CC.ink3,
        border: cur ? `2px solid ${CC.green}` : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 800,
      }}>
        {done ? '✓' : quest ? '★' : n}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: cur ? CC.greenInk : (s === 'locked' ? CC.ink3 : CC.ink) }}>
          {t}
        </div>
        <div style={{ fontSize: 11, color: CC.ink3, marginTop: 2, display: 'flex', gap: 8 }}>
          <span>▶ {m}</span>
          {quest && <span style={{ color: CC.yellowDeep, fontWeight: 700 }}>BOSS · 30 XP</span>}
        </div>
      </div>
      {s === 'locked' && <span style={{ color: CC.ink3, fontSize: 14 }}>🔒</span>}
      {cur && <Btn kind="primary" size="sm">Continue</Btn>}
    </div>
  );
}

// ────────────────────────────────────────────────
// 3. Lesson activity — Apply Now screen
// ────────────────────────────────────────────────
function LessonApply() {
  return (
    <Phone bg={CC.mint}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CircleBtn>✕</CircleBtn>
        <div style={{ flex: 1, height: 6, background: '#fff', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: CC.green }} />
        </div>
        <span style={{ fontSize: 11, color: CC.ink3, fontWeight: 700 }}>3/3</span>
      </div>

      <div style={{ flex: 1, padding: '6px 20px 0', overflow: 'hidden' }}>
        {/* Confetti row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 6, fontSize: 16 }}>
          <span style={{ transform: 'rotate(-12deg)' }}>🎉</span>
          <span style={{ transform: 'rotate(8deg)' }}>✨</span>
          <span style={{ transform: 'rotate(-4deg)' }}>🎊</span>
        </div>
        <div style={{ textAlign: 'center', fontSize: 11, color: CC.green, fontWeight: 700, letterSpacing: 1, marginTop: 8 }}>
          LESSON COMPLETE
        </div>
        <div style={{
          textAlign: 'center', fontSize: 24, fontWeight: 800, color: CC.greenInk,
          letterSpacing: -.3, marginTop: 4, padding: '0 12px',
        }}>
          Set Smart Goals
        </div>

        {/* XP gain */}
        <div style={{
          marginTop: 14, padding: '12px 16px', borderRadius: 18,
          background: 'linear-gradient(135deg, #F5D75A, #E5B924)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ fontSize: 28 }}>🪙</div>
          <div style={{ flex: 1, fontWeight: 700, fontSize: 14, color: CC.greenInk }}>
            +10 XP earned · Garden bloomed!
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: CC.greenInk }}>1.250</div>
        </div>

        {/* Garden snippet */}
        <div style={{
          marginTop: 12, borderRadius: 18, overflow: 'hidden',
          border: `1px solid ${CC.line}`, background: '#fff',
        }}>
          <GardenScene height={130} />
        </div>

        {/* Apply now CTA */}
        <div style={{
          marginTop: 14, padding: '14px 14px', borderRadius: 18,
          background: '#fff', border: `1px solid ${CC.line}`,
        }}>
          <div style={{ fontSize: 11, color: CC.ink3, fontWeight: 700, letterSpacing: 1 }}>APPLY NOW</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4, lineHeight: 1.4 }}>
            Want to make this real? Set a new savings goal right now.
          </div>
          <div style={{ marginTop: 12 }}>
            <Btn kind="primary" size="md" full>＋ Create a savings goal  →</Btn>
          </div>
          <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: CC.ink3, fontWeight: 600 }}>
            Maybe later
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ────────────────────────────────────────────────
// 4. Alex chat overlay
// ────────────────────────────────────────────────
function AlexChat() {
  return (
    <Phone bg={CC.mint}>
      {/* Faint Learn tab underneath */}
      <div style={{ padding: '12px 16px 0', opacity: .35, pointerEvents: 'none' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: CC.greenInk }}>Cha-Ching Garden</div>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,20,16,.35)' }}/>

        {/* Bottom sheet with Alex */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: '#fff', borderRadius: '24px 24px 0 0',
          padding: '12px 18px 22px', boxShadow: '0 -10px 40px rgba(0,0,0,.2)',
        }}>
          <div style={{ width: 36, height: 4, background: CC.lineHard, borderRadius: 2, margin: '0 auto 12px' }}/>

          {/* Alex header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <AlexAvatar pose="greeting" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Alex</div>
              <div style={{ fontSize: 11, color: CC.green, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: CC.green, display: 'inline-block' }}/> Online
              </div>
            </div>
            <div style={{ fontSize: 11, color: CC.ink3 }}>Learn only</div>
          </div>

          {/* Messages */}
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Bubble>
              Heyy! You just finished <b>Set Smart Goals</b> 🎯 Nice one.
            </Bubble>
            <Bubble>
              Want to keep going with the next one, or jump to <b>Protect</b> for some scam-spotting?
            </Bubble>
          </div>

          {/* Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
            <ChoiceBtn>Next Save lesson  →</ChoiceBtn>
            <ChoiceBtn>Try a Protect lesson</ChoiceBtn>
            <ChoiceBtn ghost>Later</ChoiceBtn>
          </div>
        </div>
      </div>
    </Phone>
  );
}

function AlexAvatar({ pose = 'greeting' }) {
  // Simple cartoon: green hoodie, dark hair, expressive eyes
  return (
    <svg width="48" height="48" viewBox="0 0 48 48">
      {/* Hoodie */}
      <path d="M6 44 C6 32, 16 26, 24 26 C32 26, 42 32, 42 44 L42 48 L6 48 Z" fill="#3F8E5C"/>
      <path d="M14 30 Q24 24 34 30 L34 36 Q24 32 14 36 Z" fill="#2F6E47"/>
      {/* Face */}
      <ellipse cx="24" cy="22" rx="11" ry="12" fill="#F4C9A4"/>
      {/* Hair */}
      <path d="M13 18 Q14 8 24 7 Q34 8 35 18 L34 14 Q30 11 24 10 Q18 11 14 14 Z" fill="#1B2218"/>
      <path d="M13 18 Q12 22 14 24" stroke="#1B2218" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Eyes */}
      <circle cx="20" cy="22" r="1.5" fill="#1B2218"/>
      <circle cx="28" cy="22" r="1.5" fill="#1B2218"/>
      <circle cx="20.5" cy="21.5" r=".5" fill="#fff"/>
      <circle cx="28.5" cy="21.5" r=".5" fill="#fff"/>
      {/* Smile */}
      <path d="M21 27 Q24 29 27 27" stroke="#1B2218" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Notebook with $ */}
      <rect x="34" y="38" width="9" height="11" rx="1" fill="#E5B924" stroke="#1B2218" strokeWidth="1"/>
      <text x="38.5" y="46" textAnchor="middle" fontSize="6" fontWeight="800" fill="#1B2218">$</text>
    </svg>
  );
}

function Bubble({ children }) {
  return (
    <div style={{
      background: CC.mint,
      borderRadius: '16px 16px 16px 4px',
      padding: '10px 14px',
      fontSize: 14, lineHeight: 1.45, color: CC.ink,
      maxWidth: '88%',
    }}>{children}</div>
  );
}

function ChoiceBtn({ children, ghost }) {
  return (
    <div style={{
      padding: '12px 14px', borderRadius: 12,
      background: ghost ? 'transparent' : '#fff',
      color: ghost ? CC.ink3 : CC.greenInk,
      border: ghost ? 'none' : `1.5px solid ${CC.mintEdge}`,
      fontSize: 14, fontWeight: 700,
      textAlign: 'center',
    }}>{children}</div>
  );
}

// ────────────────────────────────────────────────
// 5. Mini-game — Need vs Want sorter
// ────────────────────────────────────────────────
function NeedVsWant() {
  return (
    <Phone bg={CC.greenInk} style={{ color: '#fff' }}>
      {/* Top HUD */}
      <div style={{ padding: '14px 18px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CircleBtn bg="rgba(255,255,255,.15)"><span style={{ color: '#fff' }}>‹</span></CircleBtn>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>Need vs. Want</div>
          <div style={{ fontSize: 11, opacity: .7 }}>60 second sorter</div>
        </div>
        <div style={{
          background: CC.yellow, color: CC.greenInk, fontSize: 13, fontWeight: 800,
          padding: '6px 12px', borderRadius: 999,
        }}>⏱ 0:38</div>
      </div>

      {/* Score */}
      <div style={{ padding: '0 18px' }}>
        <div style={{
          background: 'rgba(255,255,255,.08)', padding: '8px 14px', borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, opacity: .7, fontWeight: 600 }}>STREAK</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>🔥 7</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, opacity: .7, fontWeight: 600 }}>SCORE</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>1.240</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, opacity: .7, fontWeight: 600 }}>LEFT</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>8</div>
          </div>
        </div>
      </div>

      {/* Card to sort */}
      <div style={{ flex: 1, position: 'relative', padding: '20px 18px 12px' }}>
        <div style={{
          background: '#fff', color: CC.ink, borderRadius: 22, padding: 18,
          textAlign: 'center', boxShadow: '0 16px 40px rgba(0,0,0,.25)',
          transform: 'rotate(-2deg)',
        }}>
          <Placeholder label="MILK TEA · 30,000 ₫" height={120} />
          <div style={{ fontSize: 16, fontWeight: 800, marginTop: 12 }}>Milk tea after school</div>
          <div style={{ fontSize: 12, color: CC.ink3, marginTop: 2 }}>30.000 ₫ · Your friends are going</div>
          <div style={{ fontSize: 11, color: CC.ink3, marginTop: 14, fontWeight: 700, letterSpacing: 1 }}>
            ← SWIPE TO SORT →
          </div>
        </div>

        {/* Behind cards */}
        <div style={{
          position: 'absolute', left: 28, right: 28, top: 30, bottom: 24,
          background: 'rgba(255,255,255,.15)', borderRadius: 22, zIndex: -1,
          transform: 'rotate(2deg) translateY(8px)',
        }} />
      </div>

      {/* Sort buttons */}
      <div style={{ display: 'flex', gap: 12, padding: '0 18px 18px' }}>
        <div style={{
          flex: 1, padding: '14px 0', borderRadius: 16,
          background: CC.coral, fontSize: 16, fontWeight: 800, textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>← Want</div>
        <div style={{
          flex: 1, padding: '14px 0', borderRadius: 16,
          background: CC.green, fontSize: 16, fontWeight: 800, textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>Need →</div>
      </div>
    </Phone>
  );
}

Object.assign(window, { GardenScene, LearnHome, PillarDetail, LessonApply, AlexChat, AlexAvatar, NeedVsWant });
