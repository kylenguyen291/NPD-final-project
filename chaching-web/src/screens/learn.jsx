import React, { useState } from 'react'
import { CC } from '../theme.js'
import { useApp } from '../context.jsx'
import { Phone, TabBar, Card, Btn, CircleBtn, GardenScene, AlexAvatar, Placeholder } from '../components/index.jsx'

// ─── 1. Learn Home – Garden + Pillars ────────────────────────────
export function LearnHome() {
  const { navigate, state } = useApp()
  const { pillars } = state.learn
  const pillarList = [
    { key:'earn',    i:'🛠️', name:'Earn',    ...pillars.earn    },
    { key:'save',    i:'🐷', name:'Save',    ...pillars.save    },
    { key:'spend',   i:'🛒', name:'Spend',   ...pillars.spend   },
    { key:'invest',  i:'🌳', name:'Invest',  ...pillars.invest  },
    { key:'give',    i:'🌸', name:'Give',    ...pillars.give    },
    { key:'protect', i:'🛡️', name:'Protect', ...pillars.protect },
  ]

  return (
    <Phone bg={CC.mint}>
      {/* Header */}
      <div style={{ padding:'12px 16px 6px', display:'flex', alignItems:'center' }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:CC.ink3, fontWeight:600, letterSpacing:.4 }}>YOUR GARDEN</div>
          <div style={{ fontSize:22, fontWeight:800, color:CC.greenInk, letterSpacing:-.3 }}>Cha-Ching Garden</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, background:'#fff', padding:'6px 12px', borderRadius:999, border:`1px solid ${CC.line}` }}>
          <span style={{ fontSize:14 }}>🔥</span>
          <span style={{ fontSize:13, fontWeight:800, color:CC.ink }}>{state.user.streak}</span>
          <span style={{ fontSize:11, color:CC.ink3 }}>·</span>
          <span style={{ fontSize:13, fontWeight:800, color:CC.greenInk }}>{state.user.xp.toLocaleString()} XP</span>
        </div>
      </div>

      <div style={{ flex:1, overflow:'auto', padding:'0 16px' }}>
        {/* Garden scene */}
        <div style={{ borderRadius:22, overflow:'hidden', boxShadow:'0 4px 16px rgba(63,142,92,.12)', border:`1px solid ${CC.line}` }}>
          <GardenScene />
        </div>

        {/* Mini stats */}
        <div style={{ display:'flex', gap:8, marginTop:10 }}>
          {[['🌱','14','seeds'],['🌸','7','flowers'],['🏆','2','badges']].map(([icon,v,l]) => (
            <div key={l} style={{ flex:1, padding:'8px 10px', borderRadius:14, background:'#fff', display:'flex', alignItems:'center', gap:8, border:`1px solid ${CC.line}` }}>
              <span style={{ fontSize:18 }}>{icon}</span>
              <div>
                <div style={{ fontSize:15, fontWeight:800, lineHeight:1 }}>{v}</div>
                <div style={{ fontSize:10, color:CC.ink3 }}>{l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', padding:'14px 4px 8px' }}>
          <div style={{ fontSize:14, fontWeight:800 }}>6 Pillars · Foundation</div>
          <div style={{ fontSize:12, color:CC.green, fontWeight:700, cursor:'pointer' }} onClick={() => navigate('NeedVsWant')}>Games 🎮</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, paddingBottom:16 }}>
          {pillarList.map(p => {
            const pct = (p.cur/p.tot)*100
            return (
              <div key={p.key} onClick={() => { navigate('PillarDetail') }} style={{ background:'#fff', borderRadius:16, padding:12, border:`1px solid ${CC.line}`, cursor:'pointer' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:32, height:32, borderRadius:10, background:CC.mint, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17 }}>{p.i}</div>
                  <div style={{ fontSize:14, fontWeight:800, flex:1 }}>{p.name}</div>
                </div>
                <div style={{ height:5, background:CC.mintDeep, borderRadius:3, overflow:'hidden', marginTop:10 }}>
                  <div style={{ width:`${pct}%`, height:'100%', background:p.tone }}/>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
                  <div style={{ fontSize:11, color:CC.ink3 }}>{p.cur} of {p.tot}</div>
                  <div style={{ fontSize:11, fontWeight:700, color: p.cur ? p.tone : CC.ink3 }}>
                    {p.cur===0 ? 'Start →' : p.cur===p.tot ? '✓ Done' : 'Continue →'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <TabBar active="learn"/>
    </Phone>
  )
}

// ─── 2. Pillar Detail – Save ──────────────────────────────────────
export function PillarDetail() {
  const { navigate, goBack } = useApp()
  const lessons = [
    { n:1,  t:'What is saving, really?',           m:'1:12', s:'done'    },
    { n:2,  t:'The 50/30/20 rule for teens',        m:'1:45', s:'done'    },
    { n:3,  t:'Compound interest — magic of time',  m:'2:08', s:'done'    },
    { n:4,  t:'Set smart goals (Bicycle case)',      m:'1:30', s:'done'    },
    { n:5,  t:'Saving from lì xì 🧧',               m:'1:55', s:'done'    },
    { n:6,  t:'Round-up: the painless save',        m:'1:24', s:'done'    },
    { n:7,  t:'Where to keep your money',           m:'2:30', s:'current' },
    { n:8,  t:'Save vs. invest (Level 1)',           m:'1:48', s:'locked'  },
    { n:9,  t:'Talk to a parent about money',       m:'2:15', s:'locked'  },
    { n:10, t:'Pillar quest · Save',                m:'4:00', s:'locked', quest:true },
  ]
  return (
    <Phone bg={CC.mint}>
      {/* Hero */}
      <div style={{ background:CC.greenInk, color:'#fff', padding:'14px 18px 22px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <CircleBtn bg="rgba(255,255,255,.15)" onClick={goBack}><span style={{ color:'#fff' }}>‹</span></CircleBtn>
          <div style={{ flex:1, fontSize:11, opacity:.7, fontWeight:700, letterSpacing:1 }}>FOUNDATION ▸ PILLAR 02</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:10 }}>
          <div style={{ width:56, height:56, borderRadius:18, background:CC.green, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>🐷</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:22, fontWeight:800 }}>Save</div>
            <div style={{ fontSize:12, opacity:.8 }}>7 of 10 lessons · 50 XP earned</div>
          </div>
        </div>
        <div style={{ height:6, background:'rgba(255,255,255,.15)', borderRadius:3, overflow:'hidden', marginTop:14 }}>
          <div style={{ width:'70%', height:'100%', background:CC.yellow }}/>
        </div>
      </div>

      <div style={{ flex:1, overflow:'auto', padding:'12px 16px', marginTop:-16 }}>
        <div style={{ background:'#fff', borderRadius:20, overflow:'hidden', boxShadow:'0 6px 20px rgba(27,34,24,.06)' }}>
          {lessons.map((l,i) => {
            const done=l.s==='done', cur=l.s==='current'
            return (
              <div key={i} onClick={() => cur && navigate('LessonApply')} style={{ display:'flex', alignItems:'center', padding:'12px 14px', gap:12, borderBottom: i===lessons.length-1 ? 'none' : `1px solid ${CC.line}`, background: cur ? CC.mint : 'transparent', cursor: cur ? 'pointer' : 'default' }}>
                <div style={{ width:36, height:36, borderRadius:18, background: done ? CC.green : cur ? '#fff' : CC.mintDeep, color: done ? '#fff' : cur ? CC.green : CC.ink3, border: cur ? `2px solid ${CC.green}` : 'none', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800, flexShrink:0 }}>
                  {done ? '✓' : l.quest ? '★' : l.n}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700, color: cur ? CC.greenInk : l.s==='locked' ? CC.ink3 : CC.ink }}>{l.t}</div>
                  <div style={{ fontSize:11, color:CC.ink3, marginTop:2, display:'flex', gap:8 }}>
                    <span>▶ {l.m}</span>
                    {l.quest && <span style={{ color:CC.yellowDeep, fontWeight:700 }}>BOSS · 30 XP</span>}
                  </div>
                </div>
                {l.s==='locked' && <span style={{ color:CC.ink3, fontSize:14 }}>🔒</span>}
                {cur && <Btn kind="primary" size="sm" onClick={() => navigate('LessonApply')}>Continue</Btn>}
              </div>
            )
          })}
        </div>
      </div>
      <TabBar active="learn"/>
    </Phone>
  )
}

// ─── 3. Lesson Complete + Apply Now ──────────────────────────────
export function LessonApply() {
  const { navigate, navigateTab } = useApp()
  const [showing, setShowing] = useState(false)

  React.useEffect(() => {
    const t = setTimeout(() => setShowing(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <Phone bg={CC.mint}>
      <div style={{ padding:'12px 16px', display:'flex', alignItems:'center', gap:10 }}>
        <CircleBtn onClick={() => navigateTab('LearnHome')}>✕</CircleBtn>
        <div style={{ flex:1, height:6, background:'#fff', borderRadius:3, overflow:'hidden' }}>
          <div style={{ width:'100%', height:'100%', background:CC.green }}/>
        </div>
        <span style={{ fontSize:11, color:CC.ink3, fontWeight:700 }}>3/3</span>
      </div>
      <div style={{ flex:1, padding:'6px 20px 0', overflow:'auto' }}>
        {/* Confetti */}
        <div style={{ display:'flex', justifyContent:'center', gap:6, marginTop:6, fontSize:16 }}>
          <span style={{ transform:'rotate(-12deg)' }}>🎉</span>
          <span style={{ transform:'rotate(8deg)' }}>✨</span>
          <span style={{ transform:'rotate(-4deg)' }}>🎊</span>
        </div>
        <div style={{ textAlign:'center', fontSize:11, color:CC.green, fontWeight:700, letterSpacing:1, marginTop:8 }}>LESSON COMPLETE</div>
        <div style={{ textAlign:'center', fontSize:24, fontWeight:800, color:CC.greenInk, letterSpacing:-.3, marginTop:4, padding:'0 12px' }}>Set Smart Goals</div>

        {/* XP gain */}
        <div style={{ marginTop:14, padding:'12px 16px', borderRadius:18, background:'linear-gradient(135deg,#F5D75A,#E5B924)', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ fontSize:28 }}>🪙</div>
          <div style={{ flex:1, fontWeight:700, fontSize:14, color:CC.greenInk }}>+10 XP earned · Garden bloomed!</div>
          <div style={{ fontSize:18, fontWeight:800, color:CC.greenInk }}>1.250</div>
        </div>

        {/* Garden snippet */}
        <div style={{ marginTop:12, borderRadius:18, overflow:'hidden', border:`1px solid ${CC.line}`, background:'#fff' }}>
          <GardenScene height={130} />
        </div>

        {/* Apply Now */}
        <div style={{ marginTop:14, padding:'14px 14px', borderRadius:18, background:'#fff', border:`1px solid ${CC.line}`, marginBottom:16 }}>
          <div style={{ fontSize:11, color:CC.ink3, fontWeight:700, letterSpacing:1 }}>APPLY NOW</div>
          <div style={{ fontSize:15, fontWeight:700, marginTop:4, lineHeight:1.4 }}>Want to make this real? Set a new savings goal right now.</div>
          <div style={{ marginTop:12 }}>
            <Btn kind="primary" size="md" full onClick={() => navigateTab('SavingsGoals')}>＋ Create a savings goal  →</Btn>
          </div>
          <div style={{ textAlign:'center', marginTop:8, fontSize:12, color:CC.ink3, fontWeight:600, cursor:'pointer' }} onClick={() => navigateTab('LearnHome')}>Maybe later</div>
        </div>

        {/* Alex follow-up */}
        {showing && (
          <div style={{ marginBottom:16, animation:'fadeIn .4s ease' }}>
            <div onClick={() => navigate('AlexChat')} style={{ padding:'12px 14px', borderRadius:18, background:'#fff', border:`1px solid ${CC.line}`, display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
              <AlexAvatar size={40} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700 }}>Alex has a suggestion →</div>
                <div style={{ fontSize:11, color:CC.ink3, marginTop:2 }}>What's next on your learning path?</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Phone>
  )
}

// ─── 4. Alex Chat ─────────────────────────────────────────────────
export function AlexChat() {
  const { navigate, goBack } = useApp()
  const [choice, setChoice] = useState(null)

  const handleChoice = (c) => {
    setChoice(c)
    setTimeout(() => navigate('PillarDetail'), 800)
  }

  return (
    <Phone bg={CC.mint}>
      <div style={{ padding:'12px 16px 0', opacity:.35, pointerEvents:'none' }}>
        <div style={{ fontSize:22, fontWeight:800, color:CC.greenInk }}>Cha-Ching Garden</div>
      </div>
      <div style={{ flex:1, position:'relative' }}>
        <div style={{ position:'absolute', inset:0, background:'rgba(14,20,16,.35)' }}/>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'#fff', borderRadius:'24px 24px 0 0', padding:'12px 18px 22px', boxShadow:'0 -10px 40px rgba(0,0,0,.2)', animation:'slideUp .3s ease' }}>
          <div style={{ width:36, height:4, background:CC.lineHard, borderRadius:2, margin:'0 auto 12px' }}/>
          {/* Alex header */}
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <AlexAvatar size={48} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontWeight:800 }}>Alex</div>
              <div style={{ fontSize:11, color:CC.green, fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ width:6, height:6, borderRadius:3, background:CC.green, display:'inline-block' }}/> Online
              </div>
            </div>
            <div style={{ fontSize:11, color:CC.ink3 }}>Learn only</div>
          </div>
          {/* Bubbles */}
          <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:8 }}>
            {[
              <span>Heyy! You just finished <b>Set Smart Goals</b> 🎯 Nice one.</span>,
              <span>Want to keep going with the next one, or jump to <b>Protect</b> for some scam-spotting?</span>,
            ].map((msg, i) => (
              <div key={i} style={{ background:CC.mint, borderRadius:'16px 16px 16px 4px', padding:'10px 14px', fontSize:14, lineHeight:1.45, color:CC.ink, maxWidth:'88%' }}>{msg}</div>
            ))}
          </div>
          {/* Choices */}
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:14 }}>
            {[
              { label:'Next Save lesson  →', ghost:false },
              { label:'Try a Protect lesson', ghost:false },
              { label:'Later', ghost:true },
            ].map(({ label, ghost }) => (
              <div key={label} onClick={() => ghost ? goBack() : handleChoice(label)} style={{
                padding:'12px 14px', borderRadius:12,
                background: choice===label ? CC.green : ghost ? 'transparent' : '#fff',
                color: choice===label ? '#fff' : ghost ? CC.ink3 : CC.greenInk,
                border: ghost ? 'none' : `1.5px solid ${choice===label ? CC.green : CC.mintEdge}`,
                fontSize:14, fontWeight:700, textAlign:'center', cursor:'pointer', transition:'all .15s',
              }}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    </Phone>
  )
}

// ─── 5. Mini-game: Need vs. Want ─────────────────────────────────
export function NeedVsWant() {
  const { navigate, goBack } = useApp()
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [cardIdx, setCardIdx] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [timeLeft, setTimeLeft] = useState(38)

  const cards = [
    { label:'Milk tea after school', price:'30.000 ₫', isNeed:false },
    { label:'School textbooks',      price:'85.000 ₫', isNeed:true  },
    { label:'iPhone 16',             price:'24M ₫',    isNeed:false },
    { label:'Bus ticket home',       price:'7.000 ₫',  isNeed:true  },
    { label:'New hoodie',            price:'350.000 ₫', isNeed:false },
    { label:'Breakfast bún bò',      price:'35.000 ₫', isNeed:true  },
  ]
  const card = cards[cardIdx % cards.length]

  React.useEffect(() => {
    if (timeLeft <= 0) return
    const t = setTimeout(() => setTimeLeft(s => s-1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft])

  const answer = (isWant) => {
    const correct = isWant !== card.isNeed
    setFeedback(correct ? '✓' : '✗')
    if (correct) { setScore(s=>s+100); setStreak(s=>s+1) } else setStreak(0)
    setTimeout(() => { setFeedback(null); setCardIdx(i=>i+1) }, 600)
  }

  return (
    <Phone bg={CC.greenInk} style={{ color:'#fff' }}>
      {/* HUD */}
      <div style={{ padding:'14px 18px 8px', display:'flex', alignItems:'center', gap:10 }}>
        <CircleBtn bg="rgba(255,255,255,.15)" onClick={goBack}><span style={{ color:'#fff' }}>‹</span></CircleBtn>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:18, fontWeight:800 }}>Need vs. Want</div>
          <div style={{ fontSize:11, opacity:.7 }}>60 second sorter</div>
        </div>
        <div style={{ background:CC.yellow, color:CC.greenInk, fontSize:13, fontWeight:800, padding:'6px 12px', borderRadius:999 }}>⏱ 0:{String(timeLeft).padStart(2,'0')}</div>
      </div>
      {/* Score */}
      <div style={{ padding:'0 18px' }}>
        <div style={{ background:'rgba(255,255,255,.08)', padding:'8px 14px', borderRadius:12, display:'flex', alignItems:'center', gap:12 }}>
          {[['🔥 '+streak,'STREAK'],[(score).toString(),'SCORE'],[(cards.length - cardIdx % cards.length).toString(),'LEFT']].map(([v,l]) => (
            <div key={l} style={{ flex:1 }}>
              <div style={{ fontSize:10, opacity:.7, fontWeight:600 }}>{l}</div>
              <div style={{ fontSize:20, fontWeight:800 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Card */}
      <div style={{ flex:1, position:'relative', padding:'20px 18px 12px' }}>
        <div style={{ background:'#fff', color:CC.ink, borderRadius:22, padding:18, textAlign:'center', boxShadow:'0 16px 40px rgba(0,0,0,.25)', transform:'rotate(-2deg)', position:'relative' }}>
          {feedback && (
            <div style={{ position:'absolute', inset:0, borderRadius:22, background: feedback==='✓' ? 'rgba(63,142,92,.15)' : 'rgba(231,111,98,.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:60, zIndex:10 }}>{feedback}</div>
          )}
          <Placeholder label={card.label.toUpperCase()} height={120} />
          <div style={{ fontSize:16, fontWeight:800, marginTop:12 }}>{card.label}</div>
          <div style={{ fontSize:12, color:CC.ink3, marginTop:2 }}>{card.price}</div>
          <div style={{ fontSize:11, color:CC.ink3, marginTop:14, fontWeight:700, letterSpacing:1 }}>← SWIPE TO SORT →</div>
        </div>
        {/* Back card shadow */}
        <div style={{ position:'absolute', left:28, right:28, top:30, bottom:24, background:'rgba(255,255,255,.15)', borderRadius:22, zIndex:-1, transform:'rotate(2deg) translateY(8px)' }}/>
      </div>
      {/* Sort buttons */}
      <div style={{ display:'flex', gap:12, padding:'0 18px 18px' }}>
        <div onClick={() => answer(true)} style={{ flex:1, padding:'14px 0', borderRadius:16, background:CC.coral, fontSize:16, fontWeight:800, textAlign:'center', cursor:'pointer', userSelect:'none' }}>← Want</div>
        <div onClick={() => answer(false)} style={{ flex:1, padding:'14px 0', borderRadius:16, background:CC.green, fontSize:16, fontWeight:800, textAlign:'center', cursor:'pointer', userSelect:'none' }}>Need →</div>
      </div>
    </Phone>
  )
}
