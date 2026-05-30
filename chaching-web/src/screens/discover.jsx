import React, { useState } from 'react'
import { CC } from '../theme.js'
import { useApp } from '../context.jsx'
import { Phone, TabBar, Btn, CircleBtn, Placeholder, Meo, AlexAvatar } from '../components/index.jsx'

// ─── 1. Discover Feed ─────────────────────────────────────────────
export function DiscoverFeed() {
  const { navigate } = useApp()
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [videoIdx, setVideoIdx] = useState(0)

  const videos = [
    { creator:'@longmoney', pillar:'🛡️ Protect', title:"Got 200.000 ₫? Don't bet it — 5 smarter moves for your money", likes:'12K', comments:'84' },
    { creator:'@alex.finance', pillar:'🐷 Save', title:'Why saving 50K/week for a year beats saving 1M once', likes:'8.2K', comments:'132' },
    { creator:'@teen.invest', pillar:'🌳 Invest', title:'What Warren Buffett would tell a 15-year-old with 500K', likes:'22K', comments:'341' },
  ]
  const v = videos[videoIdx % videos.length]

  const nextVideo = () => {
    const next = videoIdx + 1
    setVideoIdx(next)
    if ((next+1) % 5 === 0) setTimeout(() => navigate('QuizPause'), 300)
    setSaved(false); setLiked(false)
  }

  return (
    <Phone bg="#0E1410" style={{ color:'#fff' }}>
      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
        {/* Creator footage */}
        <img src="/creator-footage.png" alt=""
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}
          onError={e => { e.target.style.display='none' }}
        />
        {/* Gradient overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(0,0,0,.55) 78%,rgba(0,0,0,.75) 100%)' }}/>

{/* Right action rail */}
        <div style={{ position:'absolute', right:12, bottom:110, display:'flex', flexDirection:'column', gap:16, alignItems:'center' }}>
          {[
            { icon: liked ? '❤️' : '🤍', label:'12K', action:() => setLiked(l=>!l) },
            { icon:'🔖', label:'Save', action:() => setSaved(s=>!s), highlight:saved },
            { icon:'📤', label:'Share', action:()=>{} },
            { icon:'💬', label:'84', action:()=>{} },
          ].map(({ icon, label, action, highlight }) => (
            <div key={label} onClick={action} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, cursor:'pointer' }}>
              <div style={{ width:44, height:44, borderRadius:22, background: highlight ? CC.green : 'rgba(0,0,0,.35)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, border:'1px solid rgba(255,255,255,.1)' }}>{icon}</div>
              <div style={{ fontSize:11, fontWeight:700, color:'#fff' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Bottom info */}
        <div style={{ position:'absolute', bottom:80, left:16, right:70, color:'#fff' }}>
          <div style={{ fontSize:12, opacity:.8, fontWeight:600 }}>{v.creator} · {v.pillar}</div>
          <div style={{ fontSize:17, fontWeight:800, lineHeight:1.25, marginTop:4 }}>{v.title}</div>
          <div style={{ marginTop:10, display:'inline-flex', alignItems:'center', gap:6, background:'rgba(63,142,92,.85)', backdropFilter:'blur(10px)', color:'#fff', fontSize:12, fontWeight:700, padding:'8px 12px', borderRadius:999 }}>🌱 Save to grow your Garden</div>
        </div>

        {/* Progress dots */}
        <div style={{ position:'absolute', left:6, top:'40%', display:'flex', flexDirection:'column', gap:4 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ width:3, height: i===2 ? 22 : 8, borderRadius:2, background: i===2 ? '#fff' : 'rgba(255,255,255,.3)' }}/>
          ))}
        </div>

        {/* Tap to next */}
        <div onClick={nextVideo} style={{ position:'absolute', top:'25%', left:0, right:0, bottom:'25%', cursor:'pointer' }} title="Tap or scroll for next video"/>
      </div>
      <TabBar active="discover"/>
    </Phone>
  )
}

// ─── 2. Quiz Pause ────────────────────────────────────────────────
export function QuizPause() {
  const { navigate, goBack } = useApp()
  const [selected, setSelected] = useState(null)
  const opts = [
    { letter:'A', text:'500.000 ₫',     correct:false },
    { letter:'B', text:'1.300.000 ₫',   correct:false },
    { letter:'C', text:'2.600.000 ₫',   correct:true  },
    { letter:'D', text:'5.200.000 ₫',   correct:false },
  ]

  const choose = (opt) => {
    setSelected(opt.letter)
    setTimeout(() => navigate('DiscoverFeed'), 1600)
  }

  return (
    <Phone bg="#0E1410" style={{ color:'#fff' }}>
      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 30%,rgba(245,215,90,.25),transparent 55%),linear-gradient(180deg,#15302a,#0a1a17)` }}/>
        {/* Trophy */}
        <div style={{ position:'absolute', top:80, left:0, right:0, textAlign:'center' }}>
          <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:76, height:76, borderRadius:38, background:'rgba(245,215,90,.18)', border:'1px solid rgba(245,215,90,.35)', fontSize:36 }}>🪙</div>
          <div style={{ fontSize:11, color:CC.yellow, fontWeight:700, letterSpacing:1, marginTop:12 }}>QUICK QUIZ · WIN 1.000 ₫</div>
          <div style={{ fontSize:22, fontWeight:800, lineHeight:1.25, padding:'6px 32px', marginTop:6 }}>
            If you save 50.000 ₫ every week, how much do you have in 1 year?
          </div>
        </div>
        {/* Options */}
        <div style={{ position:'absolute', left:20, right:20, bottom:130, display:'flex', flexDirection:'column', gap:10 }}>
          {opts.map(opt => {
            const isSelected = selected === opt.letter
            const showResult = selected !== null
            const correct = showResult && opt.correct
            const wrong   = showResult && isSelected && !opt.correct
            return (
              <div key={opt.letter} onClick={() => !selected && choose(opt)} style={{
                display:'flex', alignItems:'center', gap:12, padding:'14px 14px', borderRadius:14,
                background: correct ? CC.green : wrong ? CC.coral : isSelected ? 'rgba(255,255,255,.15)' : 'rgba(255,255,255,.08)',
                border:`1px solid ${correct ? 'transparent' : 'rgba(255,255,255,.12)'}`,
                cursor: selected ? 'default' : 'pointer', transition:'all .2s',
              }}>
                <div style={{ width:28, height:28, borderRadius:14, background: correct ? '#fff' : 'rgba(255,255,255,.15)', color: correct ? CC.green : '#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800 }}>{opt.letter}</div>
                <div style={{ flex:1, fontSize:15, fontWeight:700 }}>{opt.text}</div>
                {correct && <span style={{ fontSize:16 }}>✓</span>}
                {wrong   && <span style={{ fontSize:16 }}>✗</span>}
              </div>
            )
          })}
        </div>
        {selected && (
          <div style={{ position:'absolute', bottom:85, left:0, right:0, textAlign:'center', fontSize:13, fontWeight:700 }}>
            {opts.find(o=>o.correct)?.letter === selected ? <span style={{ color:CC.yellow }}>🎉 +1.000 ₫ added to your Save bucket!</span> : <span style={{ color:'rgba(255,255,255,.7)' }}>Not quite — the answer is C: 2.600.000 ₫</span>}
          </div>
        )}
        <div style={{ position:'absolute', bottom:88, left:0, right:0, textAlign:'center', fontSize:12, color:'rgba(255,255,255,.65)' }}>⏱ 22s left · <span style={{ cursor:'pointer', textDecoration:'underline' }} onClick={() => navigate('DiscoverFeed')}>skip ›</span></div>
      </div>
      <TabBar active="discover"/>
    </Phone>
  )
}

// ─── 3a. News Feed Card ───────────────────────────────────────────
export function NewsFeedCard() {
  const { navigate } = useApp()
  return (
    <Phone bg="#F3EEDF">
      <div style={{ flex:1, position:'relative', overflow:'hidden', padding:'8px 16px 0' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 2px 12px' }}>
          <span style={{ fontSize:16 }}>📰</span>
          <span style={{ fontSize:13, fontWeight:800, color:CC.greenInk }}>Today's news</span>
          <span style={{ marginLeft:'auto', fontSize:11, color:CC.ink3, fontWeight:600 }}>6:00 AM · 45s read</span>
        </div>
        <div style={{ background:'#fff', borderRadius:24, overflow:'hidden', boxShadow:'0 10px 30px rgba(120,100,40,.12)', border:'1px solid rgba(120,100,40,.1)' }}>
          <Placeholder label="VNINDEX · MARKET PHOTO" height={170} />
          <div style={{ padding:'16px 18px 18px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:CC.greenDeep, background:CC.mint, padding:'4px 10px', borderRadius:999 }}>📈 Markets · Vietstock</div>
            <div style={{ fontSize:22, fontWeight:800, lineHeight:1.25, marginTop:12, color:CC.ink, letterSpacing:-.3 }}>
              Why did gold prices surge this week?
            </div>
            <div style={{ fontSize:14, color:CC.ink2, marginTop:8, lineHeight:1.5 }}>
              Gold crossed 92 million VND per lượng — here's what young people should understand about "safe havens".
            </div>
            <div style={{ marginTop:16 }}>
              <Btn kind="primary" size="md" full onClick={() => navigate('NewsArticle')}>Read article · 45s →</Btn>
            </div>
          </div>
        </div>
        <div style={{ textAlign:'center', marginTop:18, fontSize:12, color:CC.ink3, fontWeight:600 }}>↑ Swipe up · 3 videos &amp; a poll next</div>
      </div>
      <TabBar active="discover" />
    </Phone>
  )
}

// ─── 3b. Poll Card ────────────────────────────────────────────────
export function PollCard() {
  const [voted, setVoted] = useState(null)
  const opts = [
    { label:'🍔 Food & Drink',    pct:38, lead:true  },
    { label:'🛍️ Shopping',        pct:27, lead:false },
    { label:'🎮 Games & apps',    pct:21, lead:false },
    { label:'🚗 Getting around',  pct:14, lead:false },
  ]
  return (
    <Phone bg="#16302A" style={{ color:'#fff' }}>
      <div style={{ flex:1, position:'relative', overflow:'hidden', padding:'20px 20px 0' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 24%, rgba(123,190,130,.28), transparent 55%)' }}/>
        <div style={{ position:'relative' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:700, background:'rgba(255,255,255,.12)', padding:'5px 12px', borderRadius:999 }}>📊 Community poll</div>
          <div style={{ fontSize:24, fontWeight:800, lineHeight:1.3, marginTop:16 }}>
            Where does most of YOUR money go each month?
          </div>
          <div style={{ fontSize:12, opacity:.7, marginTop:6 }}>{voted ? 'You voted · ' : ''}4.182 teens answered</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:22 }}>
            {opts.map((o, i) => (
              <div key={i} onClick={() => !voted && setVoted(i)} style={{
                position:'relative', borderRadius:14, overflow:'hidden',
                background:'rgba(255,255,255,.1)',
                border: o.lead ? `2px solid ${CC.yellow}` : '2px solid transparent',
                cursor: voted ? 'default' : 'pointer',
              }}>
                {voted && <div style={{ position:'absolute', inset:0, width:`${o.pct}%`, background: o.lead ? 'rgba(245,215,90,.35)' : 'rgba(123,190,130,.3)' }}/>}
                <div style={{ position:'relative', display:'flex', alignItems:'center', padding:'13px 14px' }}>
                  <div style={{ flex:1, fontSize:15, fontWeight:700 }}>{o.label}</div>
                  {voted && <div style={{ fontSize:15, fontWeight:800 }}>{o.pct}%</div>}
                  {voted && o.lead && <span style={{ marginLeft:8 }}>✓</span>}
                </div>
              </div>
            ))}
          </div>
          {!voted && <div style={{ textAlign:'center', marginTop:18, fontSize:12, opacity:.7 }}>Tap to vote · +5 XP</div>}
          {voted  && <div style={{ textAlign:'center', marginTop:18, fontSize:12, opacity:.7 }}>Save this to grow your Garden 🌱 · or swipe on</div>}
        </div>
      </div>
      <TabBar active="discover" />
    </Phone>
  )
}

// ─── 3c. Tip Card ─────────────────────────────────────────────────
export function TipCard() {
  const [saved, setSaved] = useState(false)
  return (
    <Phone bg={CC.green} style={{ color:'#fff' }}>
      <div style={{ flex:1, position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 30px' }}>
        <div style={{ position:'absolute', top:50, right:36, fontSize:30, opacity:.25, transform:'rotate(12deg)' }}>💡</div>
        <div style={{ position:'absolute', bottom:150, left:30, fontSize:24, opacity:.2 }}>✨</div>
        <div style={{ fontSize:12, fontWeight:800, letterSpacing:2, opacity:.8 }}>TIP OF THE DAY</div>
        <div style={{ fontSize:30, fontWeight:800, lineHeight:1.25, marginTop:14, letterSpacing:-.5 }}>
          Pay yourself first. Move money to Save the <span style={{ color:CC.yellow }}>day</span> you get it — not what's left over.
        </div>
        <div style={{ fontSize:14, opacity:.85, marginTop:16, lineHeight:1.5 }}>
          Future-you keeps 100% of the money present-you never sees.
        </div>
        <div style={{ display:'flex', gap:10, marginTop:28 }}>
          <Btn kind="yellow" size="md" style={{ flex:1 }} onClick={() => setSaved(true)}>
            {saved ? '✓ Saved to Garden' : '🔖 Save to Garden'}
          </Btn>
          <Btn kind="dark" size="md" style={{ flex:1, background:'rgba(255,255,255,.16)' }}>📤 Share</Btn>
        </div>
      </div>
      <TabBar active="discover" />
    </Phone>
  )
}

// ─── 3d. News Article — full screen ───────────────────────────────
export function NewsArticle() {
  const { navigate, goBack } = useApp()
  return (
    <Phone bg="#fff">
      <div style={{ flex:1, overflow:'auto', position:'relative' }}>
        {/* Hero */}
        <div style={{ position:'relative' }}>
          <Placeholder label="GOLD BARS · HERO IMAGE" height={210} />
          <div onClick={goBack} style={{ position:'absolute', top:12, left:12, width:36, height:36, borderRadius:18, background:'rgba(255,255,255,.9)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, cursor:'pointer' }}>‹</div>
        </div>
        {/* Body */}
        <div style={{ padding:'16px 20px 100px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:CC.greenDeep, background:CC.mint, padding:'4px 10px', borderRadius:999 }}>📈 Markets · Vietstock</div>
          <div style={{ fontSize:23, fontWeight:800, lineHeight:1.25, marginTop:12, letterSpacing:-.3 }}>
            Why did gold prices surge this week?
          </div>
          <div style={{ fontSize:12, color:CC.ink3, marginTop:6 }}>Edited by Cha-Ching team · 30 May 2026</div>
          <p style={{ fontSize:15, lineHeight:1.6, color:CC.ink, marginTop:14 }}>
            This week, domestic gold prices crossed the 92 million VND per lượng mark for the first time. When global markets get volatile, many people turn to gold as a "safe haven."
          </p>
          <div style={{ fontSize:13, fontWeight:800, color:CC.greenInk, marginTop:12 }}>What does gold mean for young people?</div>
          <p style={{ fontSize:15, lineHeight:1.6, color:CC.ink, marginTop:6 }}>
            Gold doesn't generate interest like savings accounts, but it tends to hold its value when currency depreciates. That's why adults often buy gold to "store wealth."
          </p>
          <div style={{ fontSize:13, fontWeight:800, color:CC.greenInk, marginTop:12 }}>The key takeaway</div>
          <p style={{ fontSize:15, lineHeight:1.6, color:CC.ink, marginTop:6 }}>
            50,000 VND today doesn't buy what it did last year. Understanding inflation — and how assets like gold respond to it — is exactly why the Save and Invest pillars matter.
          </p>
        </div>
      </div>
      {/* Sticky action row */}
      <div style={{ borderTop:`1px solid ${CC.line}`, background:'#fff', padding:'10px 16px 14px', display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
        <div onClick={() => navigate('AskAlex')} style={{
          flex:1, height:48, borderRadius:14, background:CC.green, color:'#fff',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontWeight:800, fontSize:15, cursor:'pointer',
        }}>☂️ Let Alex explain</div>
        <CircleBtn size={48} bg={CC.mint}>🔖</CircleBtn>
        <CircleBtn size={48} bg={CC.mint}>📤</CircleBtn>
      </div>
    </Phone>
  )
}

// ─── 3e. Ask Alex — RAG explainer overlay ────────────────────────
export function AskAlex() {
  const { goBack, navigateTab } = useApp()
  const [saved, setSaved] = useState(false)

  return (
    <Phone bg={CC.mint}>
      {/* Faint learn tab underneath */}
      <div style={{ padding:'12px 16px 0', opacity:.3, pointerEvents:'none' }}>
        <div style={{ fontSize:21, fontWeight:800, color:CC.greenInk }}>Mèo Vàng's Garden</div>
      </div>
      <div style={{ flex:1, position:'relative' }}>
        <div style={{ position:'absolute', inset:0, background:'rgba(14,20,16,.4)' }}/>
        <div style={{
          position:'absolute', bottom:0, left:0, right:0,
          background:'#fff', borderRadius:'24px 24px 0 0',
          padding:'12px 18px 20px', boxShadow:'0 -10px 40px rgba(0,0,0,.2)',
          maxHeight:'88%', display:'flex', flexDirection:'column',
        }}>
          <div style={{ width:36, height:4, background:CC.lineHard, borderRadius:2, margin:'0 auto 12px' }}/>
          {/* Alex header */}
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <AlexAvatar size={44} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontWeight:800 }}>Alex explains</div>
              <div style={{ fontSize:11, color:CC.ink3 }}>📰 "Why did gold prices surge?"</div>
            </div>
            <div style={{ fontSize:10, fontWeight:700, color:CC.coral, background:'#FBE7E4', padding:'4px 8px', borderRadius:8 }}>1/1 free today</div>
          </div>
          {/* Grounded concept chips */}
          <div style={{ display:'flex', gap:6, marginTop:12, flexWrap:'wrap' }}>
            {['🐷 Saving vs. storing','🛡️ Inflation','🌳 Safe havens'].map(t => (
              <div key={t} style={{ fontSize:11, fontWeight:700, color:CC.greenDeep, background:CC.mint, padding:'5px 10px', borderRadius:999, border:`1px solid ${CC.mintDeep}` }}>{t}</div>
            ))}
          </div>
          {/* Bubbles */}
          <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:8 }}>
            {[
              <>Gold rising means people want their money <b>safer</b> 🪙</>,
              <>Remember the <b>Save</b> pillar? Gold is like a "vault" — it holds value, but <b>doesn't grow</b> like savings.</>,
              <>I'm <b>not</b> saying to buy or sell gold — just explaining how it works 😺</>,
            ].map((msg, i) => (
              <div key={i} style={{ background:CC.mint, borderRadius:'16px 16px 16px 4px', padding:'10px 14px', fontSize:14, lineHeight:1.45, color:CC.ink, maxWidth:'92%' }}>{msg}</div>
            ))}
          </div>
          {/* CTAs */}
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:14 }}>
            <div onClick={() => setSaved(true)} style={{
              padding:'13px', borderRadius:12, background: saved ? CC.green : CC.mint,
              border:`1.5px solid ${saved ? CC.green : CC.mintEdge}`,
              textAlign:'center', fontSize:14, fontWeight:700, color: saved ? '#fff' : CC.greenInk, cursor:'pointer',
            }}>
              {saved ? '✓ Saved to Garden (+10 XP)' : '🌱 Save to Garden (+10 XP)'}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <div onClick={goBack} style={{ flex:1, padding:'12px', borderRadius:12, background:'#fff', border:`1.5px solid ${CC.mintEdge}`, textAlign:'center', fontSize:13, fontWeight:700, color:CC.greenInk, cursor:'pointer' }}>Got it, thanks</div>
              <div style={{ flex:1, padding:'12px', borderRadius:12, background:CC.mint, border:`1.5px solid ${CC.mintEdge}`, textAlign:'center', fontSize:13, fontWeight:700, color:CC.ink3 }}>🔒 Ask more · Plus</div>
            </div>
          </div>
        </div>
      </div>
    </Phone>
  )
}

// ─── 3f. Plus Paywall ─────────────────────────────────────────────
export function PlusPaywall() {
  const { goBack } = useApp()
  return (
    <Phone bg={CC.greenInk} style={{ color:'#fff' }}>
      <div style={{ flex:1, position:'relative', overflow:'hidden', padding:'16px 22px 0' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 18%, rgba(245,215,90,.22), transparent 55%)' }}/>
        <div style={{ position:'relative', display:'flex', flexDirection:'column', height:'100%' }}>
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <CircleBtn bg="rgba(255,255,255,.15)" onClick={goBack}><span style={{ color:'#fff' }}>✕</span></CircleBtn>
          </div>
          {/* Master Mèo to sell aspiration */}
          <div style={{ textAlign:'center', marginTop:4 }}>
            <div style={{ display:'inline-block' }}>
              <Meo coat="orange" stage="master" mood="happy" size={120} />
            </div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:4, background:'linear-gradient(135deg,#F5D75A,#E5B924)', color:CC.greenInk, padding:'6px 16px', borderRadius:999, fontSize:15, fontWeight:800 }}>✨ Cha-Ching Plus</div>
            <div style={{ fontSize:22, fontWeight:800, marginTop:14, lineHeight:1.3, padding:'0 10px' }}>
              You've used today's free Alex explainer
            </div>
            <div style={{ fontSize:13, opacity:.8, marginTop:6 }}>Go Plus for unlimited questions — and more.</div>
          </div>
          {/* Perks */}
          <div style={{ marginTop:18, display:'flex', flexDirection:'column', gap:8 }}>
            {[
              { icon:'☂️', t:'Unlimited Ask Alex',        d:'Every article, every follow-up question' },
              { icon:'⭐', t:'1.5× XP on Save to Garden', d:'Mèo grows faster'                       },
              { icon:'🛡️', t:'3 starter umbrellas',       d:'Protect your streak'                    },
            ].map(({ icon, t, d }) => (
              <div key={t} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:14, background:'rgba(255,255,255,.08)' }}>
                <div style={{ width:38, height:38, borderRadius:12, background:'rgba(245,215,90,.18)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:800 }}>{t}</div>
                  <div style={{ fontSize:11, opacity:.75, marginTop:1 }}>{d}</div>
                </div>
                <span style={{ color:CC.yellow, fontSize:16 }}>✓</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:'auto', paddingBottom:18, paddingTop:16 }}>
            <Btn kind="yellow" size="lg" full>Start Plus · 39.000 ₫/mo</Btn>
            <div style={{ textAlign:'center', fontSize:12, opacity:.7, marginTop:10, cursor:'pointer' }} onClick={goBack}>
              Family plan 79.000 ₫/mo · up to 4 kids · Maybe later
            </div>
          </div>
        </div>
      </div>
    </Phone>
  )
}

// ─── 3. Daily Cap ─────────────────────────────────────────────────
export function DailyCap() {
  const { navigateTab } = useApp()
  return (
    <Phone bg={CC.mint}>
      <div style={{ flex:1, padding:'40px 24px 0', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
        <div style={{ width:160, height:160, borderRadius:80, background:`radial-gradient(circle at 50% 40%,${CC.mintDeep},${CC.mint})`, display:'flex', alignItems:'center', justifyContent:'center', marginTop:12, position:'relative' }}>
          <div style={{ fontSize:86 }}>😴</div>
          <div style={{ position:'absolute', top:4, right:6, fontSize:22, color:CC.greenInk, fontWeight:700 }}>z<span style={{ fontSize:16 }}>z</span><span style={{ fontSize:11 }}>z</span></div>
        </div>
        <div style={{ fontSize:22, fontWeight:800, marginTop:22, color:CC.greenInk }}>That's enough for today!</div>
        <div style={{ fontSize:14, color:CC.ink2, marginTop:8, lineHeight:1.5, maxWidth:280 }}>You watched 25 minutes today. Your eyes need a break — and your Garden is waiting 🌱</div>
        {/* Stats */}
        <div style={{ marginTop:22, padding:'14px 18px', borderRadius:18, background:'#fff', display:'flex', gap:16, alignItems:'center' }}>
          {[['Watched','11','videos'],['Saved','3','to Garden'],['Earned','3K','₫ quiz']].map(([label,value,sub],i) => (
            <React.Fragment key={label}>
              {i>0 && <div style={{ width:1, height:32, background:CC.line }}/>}
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:10, color:CC.ink3, fontWeight:600 }}>{label.toUpperCase()}</div>
                <div style={{ fontSize:20, fontWeight:800, color:CC.greenInk, marginTop:2 }}>{value}</div>
                <div style={{ fontSize:10, color:CC.ink3 }}>{sub}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{ width:'100%', marginTop:26 }}>
          <Btn kind="primary" size="lg" full onClick={() => navigateTab('LearnHome')}>Go to Learn  →</Btn>
          <div style={{ height:10 }}/>
          <Btn kind="ghost" size="md" full onClick={() => navigateTab('LearnHome')}>See what's growing 🌱</Btn>
        </div>
      </div>
      <TabBar active="discover"/>
    </Phone>
  )
}
