// Cha-Ching Redesign v2.0 — Discover + News + Ask Alex + Plus

// ────────────────────────────────────────────────
// News card in the Discover feed (soft-pastel, distinct from video)
// ────────────────────────────────────────────────
function NewsFeedCard() {
  return (
    <Phone bg="#F3EEDF">
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: '8px 16px 0' }}>
        {/* Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 2px 12px' }}>
          <span style={{ fontSize: 16 }}>📰</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: CC.greenInk }}>Today's news</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: CC.ink3, fontWeight: 600 }}>6:00 AM · 45s read</span>
        </div>

        {/* Card */}
        <div style={{
          background: '#fff', borderRadius: 24, overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(120,100,40,.12)', border: '1px solid rgba(120,100,40,.1)',
        }}>
          <Placeholder label="VNINDEX · MARKET PHOTO" height={170} />
          <div style={{ padding: '16px 18px 18px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700,
              color: CC.greenDeep, background: CC.mint, padding: '4px 10px', borderRadius: 999,
            }}>📈 Markets · Vietstock</div>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.25, marginTop: 12, color: CC.ink, letterSpacing: -.3 }}>
              Vì sao giá vàng tuần này tăng mạnh?
            </div>
            <div style={{ fontSize: 14, color: CC.ink2, marginTop: 8, lineHeight: 1.5 }}>
              Giá vàng trong nước vượt 92 triệu đồng/lượng — đây là điều người trẻ nên hiểu về "nơi trú ẩn an toàn".
            </div>
            <div style={{ marginTop: 16 }}>
              <Btn kind="primary" size="md" full>Read article · 45s  →</Btn>
            </div>
          </div>
        </div>

        {/* Up next hint */}
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12, color: CC.ink3, fontWeight: 600 }}>
          ↑ Swipe up · 3 videos &amp; a poll next
        </div>
      </div>
      <TabBar active="discover" />
    </Phone>
  );
}

// ────────────────────────────────────────────────
// Poll card
// ────────────────────────────────────────────────
function PollCard() {
  const opts = [
    { label: '🍔 Food & Drink', pct: 38, lead: true },
    { label: '🛍️ Shopping', pct: 27 },
    { label: '🎮 Games & apps', pct: 21 },
    { label: '🚗 Getting around', pct: 14 },
  ];
  return (
    <Phone bg="#16302A" style={{ color: '#fff' }}>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: '20px 20px 0' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 24%, rgba(123,190,130,.28), transparent 55%)',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, background: 'rgba(255,255,255,.12)', padding: '5px 12px', borderRadius: 999 }}>
            📊 Community poll
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.3, marginTop: 16 }}>
            Where does most of YOUR money go each month?
          </div>
          <div style={{ fontSize: 12, opacity: .7, marginTop: 6 }}>You voted · 4.182 teens answered</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
            {opts.map((o, i) => (
              <div key={i} style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', background: 'rgba(255,255,255,.1)', border: o.lead ? `2px solid ${CC.yellow}` : '2px solid transparent' }}>
                <div style={{ position: 'absolute', inset: 0, width: `${o.pct}%`, background: o.lead ? 'rgba(245,215,90,.35)' : 'rgba(123,190,130,.3)' }} />
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '13px 14px' }}>
                  <div style={{ flex: 1, fontSize: 15, fontWeight: 700 }}>{o.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>{o.pct}%</div>
                  {o.lead && <span style={{ marginLeft: 8 }}>✓</span>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12, opacity: .7 }}>Save this to grow your Garden 🌱 · or swipe on</div>
        </div>
      </div>
      <TabBar active="discover" />
    </Phone>
  );
}

// ────────────────────────────────────────────────
// Tip card
// ────────────────────────────────────────────────
function TipCard() {
  return (
    <Phone bg={CC.green} style={{ color: '#fff' }}>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 30px' }}>
        {/* deco */}
        <div style={{ position: 'absolute', top: 50, right: 36, fontSize: 30, opacity: .25, transform: 'rotate(12deg)' }}>💡</div>
        <div style={{ position: 'absolute', bottom: 150, left: 30, fontSize: 24, opacity: .2 }}>✨</div>

        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, opacity: .8 }}>TIP OF THE DAY</div>
        <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.25, marginTop: 14, letterSpacing: -.5 }}>
          Pay yourself first. Move money to Save the <span style={{ color: CC.yellow }}>day</span> you get it — not what's left over.
        </div>
        <div style={{ fontSize: 14, opacity: .85, marginTop: 16, lineHeight: 1.5 }}>
          Future-you keeps 100% of the money present-you never sees.
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
          <Btn kind="yellow" size="md" style={{ flex: 1 }}>🔖 Save to Garden</Btn>
          <Btn kind="dark" size="md" style={{ flex: 1, background: 'rgba(255,255,255,.16)' }}>📤 Share</Btn>
        </div>
      </div>
      <TabBar active="discover" />
    </Phone>
  );
}

// ────────────────────────────────────────────────
// News article — full screen
// ────────────────────────────────────────────────
function NewsArticle() {
  return (
    <Phone bg="#fff">
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Hero */}
        <div style={{ position: 'relative' }}>
          <Placeholder label="GOLD BARS · HERO IMAGE" height={210} />
          <div style={{ position: 'absolute', top: 12, left: 12, width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>‹</div>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: CC.greenDeep, background: CC.mint, padding: '4px 10px', borderRadius: 999 }}>📈 Markets · Vietstock</div>
          <div style={{ fontSize: 23, fontWeight: 800, lineHeight: 1.25, marginTop: 12, letterSpacing: -.3 }}>
            Vì sao giá vàng tuần này tăng mạnh?
          </div>
          <div style={{ fontSize: 12, color: CC.ink3, marginTop: 6 }}>Biên tập bởi đội ngũ Cha-Ching · 30 May 2026</div>

          <p style={{ fontSize: 15, lineHeight: 1.6, color: CC.ink, marginTop: 14 }}>
            Tuần này, giá vàng trong nước lần đầu vượt mốc 92 triệu đồng mỗi lượng. Khi thị trường thế giới biến động, nhiều người tìm đến vàng như một "nơi trú ẩn an toàn".
          </p>
          <div style={{ fontSize: 13, fontWeight: 800, color: CC.greenInk, marginTop: 12 }}>Vàng là gì với người trẻ?</div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: CC.ink, marginTop: 6 }}>
            Vàng không tạo ra lãi như tiết kiệm, nhưng thường giữ giá khi đồng tiền mất giá. Đó là lý do người lớn hay mua vàng để "giữ của".
          </p>
        </div>
      </div>

      {/* Sticky action row */}
      <div style={{
        borderTop: `1px solid ${CC.line}`, background: '#fff', padding: '10px 16px 14px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          flex: 1, height: 48, borderRadius: 14, background: CC.green, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 800, fontSize: 15,
        }}>☂️ Let Alex explain</div>
        <CircleBtn size={48} bg={CC.mint}>🔖</CircleBtn>
        <CircleBtn size={48} bg={CC.mint}>📤</CircleBtn>
      </div>
    </Phone>
  );
}

// ────────────────────────────────────────────────
// Ask Alex — RAG explainer overlay (on Learn tab)
// ────────────────────────────────────────────────
function AskAlex() {
  return (
    <Phone bg={CC.mint}>
      {/* faint learn underneath */}
      <div style={{ padding: '12px 16px 0', opacity: .3, pointerEvents: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 800, color: CC.greenInk }}>Mèo Vàng's Garden</div>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,20,16,.4)' }} />

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: '#fff', borderRadius: '24px 24px 0 0',
          padding: '12px 18px 20px', boxShadow: '0 -10px 40px rgba(0,0,0,.2)',
          maxHeight: '88%', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ width: 36, height: 4, background: CC.lineHard, borderRadius: 2, margin: '0 auto 12px' }}/>

          {/* Alex header + context */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <AlexAvatar pose="greeting" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Alex explains</div>
              <div style={{ fontSize: 11, color: CC.ink3 }}>📰 "Vì sao giá vàng tăng?"</div>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: CC.coral, background: '#FBE7E4', padding: '4px 8px', borderRadius: 8 }}>1/1 free today</div>
          </div>

          {/* Grounded chips */}
          <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
            <GroundChip>🐷 Saving vs. storing</GroundChip>
            <GroundChip>🛡️ Inflation</GroundChip>
            <GroundChip>🌳 Safe havens</GroundChip>
          </div>

          {/* Bubbles */}
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
            <Bubble>Oki! Vàng tăng giá nghĩa là mọi người đang muốn giữ tiền an toàn hơn 🪙</Bubble>
            <Bubble>Nhớ bài <b>Tiết kiệm</b> chứ? Vàng giống "két sắt" — giữ giá trị, nhưng <b>không sinh lãi</b> như khi bạn để dành.</Bubble>
            <Bubble>Mình <b>không</b> khuyên mua hay bán vàng nha — chỉ là cách nó hoạt động thôi 😺</Bubble>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
            <ChoiceBtn>🌱 Save to Garden (+10 XP)</ChoiceBtn>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, padding: '12px', borderRadius: 12, background: '#fff', border: `1.5px solid ${CC.mintEdge}`, textAlign: 'center', fontSize: 13, fontWeight: 700, color: CC.greenInk }}>Got it, thanks</div>
              <div style={{ flex: 1, padding: '12px', borderRadius: 12, background: CC.mint, border: `1.5px solid ${CC.mintEdge}`, textAlign: 'center', fontSize: 13, fontWeight: 700, color: CC.ink3 }}>🔒 Ask more · Plus</div>
            </div>
          </div>
        </div>
      </div>
    </Phone>
  );
}

function GroundChip({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: CC.greenDeep, background: CC.mint, padding: '5px 10px', borderRadius: 999, border: `1px solid ${CC.mintDeep}` }}>{children}</div>
  );
}

// ────────────────────────────────────────────────
// Plus paywall
// ────────────────────────────────────────────────
function PlusPaywall() {
  return (
    <Phone bg={CC.greenInk} style={{ color: '#fff' }}>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: '16px 22px 0' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 18%, rgba(245,215,90,.22), transparent 55%)' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CircleBtn bg="rgba(255,255,255,.15)"><span style={{ color: '#fff' }}>✕</span></CircleBtn>
          </div>

          {/* Mèo with crown to sell aspiration */}
          <div style={{ textAlign: 'center', marginTop: 4 }}>
            <div style={{ display: 'inline-block' }}><Meo coat="orange" stage="master" mood="happy" size={120} /></div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4,
              background: 'linear-gradient(135deg,#F5D75A,#E5B924)', color: CC.greenInk,
              padding: '6px 16px', borderRadius: 999, fontSize: 15, fontWeight: 800,
            }}>✨ Cha-Ching Plus</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 14, lineHeight: 1.3, padding: '0 10px' }}>
              You've used today's free Alex explainer
            </div>
            <div style={{ fontSize: 13, opacity: .8, marginTop: 6 }}>Go Plus for unlimited questions — and more.</div>
          </div>

          {/* Perks */}
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <PerkRow icon="☂️" t="Unlimited Ask Alex" d="Every article, every follow-up question" />
            <PerkRow icon="⭐" t="1.5× XP on Save to Garden" d="Mèo grows faster" />
            <PerkRow icon="🛡️" t="3 starter umbrellas" d="Protect your streak" />
          </div>

          <div style={{ marginTop: 'auto', paddingBottom: 18, paddingTop: 16 }}>
            <Btn kind="yellow" size="lg" full>Start Plus · 39.000 ₫/mo</Btn>
            <div style={{ textAlign: 'center', fontSize: 12, opacity: .7, marginTop: 10 }}>Family plan 79.000 ₫/mo · up to 4 kids · Maybe later</div>
          </div>
        </div>
      </div>
    </Phone>
  );
}

function PerkRow({ icon, t, d }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,.08)' }}>
      <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(245,215,90,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 800 }}>{t}</div>
        <div style={{ fontSize: 11, opacity: .75, marginTop: 1 }}>{d}</div>
      </div>
      <span style={{ color: CC.yellow, fontSize: 16 }}>✓</span>
    </div>
  );
}

// ────────────────────────────────────────────────
// Mèo status (Profile) — stage, umbrellas, milestones
// ────────────────────────────────────────────────
function MeoStatus() {
  const stages = [
    { name: 'Baby', xp: '0', done: true },
    { name: 'Junior', xp: '500', done: true },
    { name: 'Adult', xp: '2k', done: true, current: true },
    { name: 'Master', xp: '8k', done: false },
  ];
  const milestones = [
    { d: '🔥 7', l: 'Week Warrior', got: true },
    { d: '🔥 30', l: 'Sparkle Mèo', got: false },
    { d: '🔥 100', l: 'Gold tail', got: false },
    { d: '🔥 365', l: 'Garden Sage', got: false },
  ];
  return (
    <Phone bg={CC.mint}>
      <div style={{ padding: '12px 16px 6px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CircleBtn>‹</CircleBtn>
        <div style={{ flex: 1, fontSize: 17, fontWeight: 800 }}>Mèo Vàng</div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '0 16px' }}>
        {/* Hero */}
        <Card padding={0} radius={22} style={{ overflow: 'hidden' }}>
          <div style={{ position: 'relative' }}>
            <GardenStage height={170} coat="orange" stage="adult" mood="happy" />
            <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', alignItems: 'center', gap: 6, background: '#fff', padding: '6px 10px', borderRadius: 999, boxShadow: '0 2px 6px rgba(27,34,24,.1)' }}>
              <span style={{ fontSize: 14 }}>🔥</span><span style={{ fontSize: 14, fontWeight: 800 }}>12</span>
            </div>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Adult Mèo</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: CC.green, background: CC.mint, padding: '3px 8px', borderRadius: 8 }}>3.350 XP</div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: CC.ink2 }}>☂️ ☂️ <span style={{ color: CC.ink3, fontWeight: 600 }}>2 umbrellas</span></div>
            </div>
            <div style={{ height: 6, background: CC.mintDeep, borderRadius: 3, marginTop: 10, overflow: 'hidden' }}>
              <div style={{ width: '42%', height: '100%', background: CC.green }} />
            </div>
            <div style={{ fontSize: 11, color: CC.ink3, marginTop: 5 }}>4.650 XP to Master Mèo 👑</div>
          </div>
        </Card>

        {/* Evolution */}
        <div style={{ fontSize: 12, fontWeight: 700, color: CC.ink3, letterSpacing: 1, marginTop: 14 }}>EVOLUTION</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {stages.map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: '10px 4px', borderRadius: 14, textAlign: 'center',
              background: s.current ? CC.green : '#fff', color: s.current ? '#fff' : CC.ink,
              border: `1px solid ${s.current ? 'transparent' : CC.line}`,
              opacity: s.done || s.current ? 1 : .55,
            }}>
              <div style={{ fontSize: 20 }}>{s.done && !s.current ? '✓' : s.name === 'Master' ? '👑' : '🐱'}</div>
              <div style={{ fontSize: 11, fontWeight: 800, marginTop: 2 }}>{s.name}</div>
              <div style={{ fontSize: 9, opacity: .7 }}>{s.xp} XP</div>
            </div>
          ))}
        </div>

        {/* Milestones */}
        <div style={{ fontSize: 12, fontWeight: 700, color: CC.ink3, letterSpacing: 1, marginTop: 14 }}>STREAK MILESTONES</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          {milestones.map((m, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 14,
              background: '#fff', border: `1px solid ${CC.line}`, opacity: m.got ? 1 : .6,
            }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: m.got ? CC.coral : CC.ink3 }}>{m.d}</div>
              <div style={{ flex: 1, fontSize: 12, fontWeight: 700 }}>{m.l}</div>
              <span style={{ fontSize: 13 }}>{m.got ? '🏅' : '🔒'}</span>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="profile" />
    </Phone>
  );
}

Object.assign(window, {
  NewsFeedCard, PollCard, TipCard, NewsArticle, AskAlex, PlusPaywall, MeoStatus,
});
