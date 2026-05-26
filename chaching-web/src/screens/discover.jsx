import React, { useState } from 'react'
import { CC } from '../theme.js'
import { useApp } from '../context.jsx'
import { Phone, TabBar, Btn } from '../components/index.jsx'

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
