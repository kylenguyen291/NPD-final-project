import React, { useState } from 'react'
import { CC } from '../theme.js'
import { useApp } from '../context.jsx'
import { Phone, TabBar, Btn, CircleBtn, GardenScene, GardenStage, Meo, MeoChip, AlexAvatar } from '../components/index.jsx'
import { PILLAR_QUIZZES } from '../data/quiz.js'

// ─── 1. Learn Home v2 — Garden + Mèo + Daily Quest + Pillars ─────
export function LearnHome() {
  const { navigate, state } = useApp()
  const { pillars } = state.learn
  const { meo, dailyQuest, user } = state

  const pillarList = [
    { key:'earn',    i:'🛠️', name:'Earn',    mod:1, tot:3, tone:CC.orange   },
    { key:'save',    i:'🐷', name:'Save',    mod:2, tot:3, tone:CC.green    },
    { key:'spend',   i:'🛒', name:'Spend',   mod:2, tot:3, tone:CC.coral    },
    { key:'invest',  i:'🌳', name:'Invest',  mod:0, tot:3, tone:CC.greenDeep},
    { key:'give',    i:'🌸', name:'Give',    mod:1, tot:2, tone:'#9B7AC4'   },
    { key:'protect', i:'🛡️', name:'Protect', mod:1, tot:3, tone:CC.yellowDeep},
  ]

  const questDone = Object.values(dailyQuest).filter(Boolean).length
  const questTasks = [
    { key:'watchedLesson', icon:'🎬', label:'Watch a lesson', done: dailyQuest.watchedLesson },
    { key:'answeredQuiz',  icon:'❓', label:"Today's quiz",   done: dailyQuest.answeredQuiz  },
    { key:'taggedEmotion', icon:'😊', label:'Tag a feeling',  done: dailyQuest.taggedEmotion },
  ]

  return (
    <Phone bg={CC.mint}>
      {/* Header */}
      <div style={{ padding:'12px 16px 4px', display:'flex', alignItems:'center' }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:CC.ink3, fontWeight:600, letterSpacing:.4 }}>YOUR GARDEN</div>
          <div style={{ fontSize:21, fontWeight:800, color:CC.greenInk, letterSpacing:-.3 }}>{meo.name}'s Garden</div>
        </div>
        <div style={{
          display:'flex', alignItems:'center', gap:6,
          background:'linear-gradient(135deg,#F5D75A,#E5B924)',
          padding:'8px 14px', borderRadius:999,
          boxShadow:'0 4px 12px rgba(229,185,36,.3)',
        }}>
          <span style={{ fontSize:20 }}>🔥</span>
          <span style={{ fontSize:22, fontWeight:800, color:CC.greenInk, lineHeight:1 }}>{user.streak}</span>
        </div>
      </div>

      <div style={{ flex:1, overflow:'auto', padding:'0 16px' }}>
        {/* Garden + Mèo */}
        <div style={{
          borderRadius:22, overflow:'hidden', position:'relative',
          boxShadow:'0 4px 16px rgba(63,142,92,.12)', border:`1px solid ${CC.line}`,
        }}>
          <GardenStage height={190} coat={meo.coat} stage={meo.stage} mood={meo.mood} />
          {/* Mèo status chip */}
          <div style={{
            position:'absolute', top:10, left:10,
            display:'flex', alignItems:'center', gap:6,
            background:'rgba(255,255,255,.92)', padding:'4px 10px 4px 4px', borderRadius:999,
            boxShadow:'0 2px 6px rgba(27,34,24,.08)',
          }}>
            <MeoChip coat={meo.coat} size={24} />
            <span style={{ fontSize:12, fontWeight:800, color:CC.ink }}>{meo.name}</span>
            <span style={{ fontSize:10, fontWeight:700, color:CC.green, background:CC.mint, padding:'2px 6px', borderRadius:6 }}>
              {meo.stage.charAt(0).toUpperCase() + meo.stage.slice(1)}
            </span>
          </div>
          {/* XP bar to next stage */}
          <div style={{ position:'absolute', bottom:8, right:10, left:10, display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ flex:1, height:6, background:'rgba(255,255,255,.5)', borderRadius:3, overflow:'hidden' }}>
              <div style={{ width:`${((user.xp - 2000) / (8000 - 2000)) * 100}%`, height:'100%', background:CC.yellowDeep }} />
            </div>
            <span style={{ fontSize:10, fontWeight:700, color:CC.greenInk, background:'rgba(255,255,255,.85)', padding:'2px 6px', borderRadius:6 }}>
              {user.xp.toLocaleString()} / 8k XP → Master
            </span>
          </div>
        </div>

        {/* Daily Quest */}
        <div style={{
          marginTop:12, padding:14, borderRadius:18,
          background:CC.greenInk, color:'#fff',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:16 }}>🎯</span>
            <div style={{ fontSize:14, fontWeight:800, flex:1 }}>Daily Quest · feed {meo.name}</div>
            <span style={{ fontSize:11, fontWeight:700, color:CC.yellow }}>{questDone}/3</span>
          </div>
          <div style={{ display:'flex', gap:8, marginTop:12 }}>
            {questTasks.map(t => (
              <div key={t.key} style={{
                flex:1, padding:'10px 6px', borderRadius:12, textAlign:'center',
                background: t.done ? CC.green : 'rgba(255,255,255,.1)',
                border: t.done ? 'none' : '1px dashed rgba(255,255,255,.25)',
              }}>
                <div style={{ fontSize:18 }}>{t.done ? '✓' : t.icon}</div>
                <div style={{ fontSize:10, fontWeight:600, marginTop:4, opacity: t.done ? 1 : .8 }}>{t.label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize:11, opacity:.75, marginTop:10 }}>
            Finish all 3 → +50 XP · +1.000 ₫ to Save · streak +1
          </div>
        </div>

        {/* Pillars header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', padding:'14px 4px 8px' }}>
          <div style={{ fontSize:14, fontWeight:800 }}>6 Pillars · 18 modules</div>
          <div onClick={() => navigate('QuizScreen', { pillar:'save' })} style={{ fontSize:12, color:CC.green, fontWeight:700, cursor:'pointer' }}>Games 🎮</div>
        </div>

        {/* Pillar module cards */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {pillarList.map(p => (
            <div key={p.key} onClick={() => navigate('PillarPath', { pillar: p.key })}
              style={{ background:'#fff', borderRadius:16, padding:12, border:`1px solid ${CC.line}`, cursor:'pointer' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:32, height:32, borderRadius:10, background:CC.mint, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17 }}>{p.i}</div>
                <div style={{ fontSize:14, fontWeight:800, flex:1 }}>{p.name}</div>
              </div>
              <div style={{ display:'flex', gap:4, marginTop:10 }}>
                {Array.from({ length: p.tot }).map((_, k) => (
                  <div key={k} style={{ flex:1, height:6, borderRadius:3, background: k < p.mod ? p.tone : CC.mintDeep }} />
                ))}
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
                <div style={{ fontSize:11, color:CC.ink3 }}>Module {Math.min(p.mod+1, p.tot)}/{p.tot}</div>
                <div style={{ fontSize:11, fontWeight:700, color: p.mod ? p.tone : CC.ink3 }}>
                  {p.mod === 0 ? 'Start →' : p.mod === p.tot ? '✓ Done' : 'Continue →'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Games section */}
        <div style={{ fontSize:14, fontWeight:800, padding:'16px 4px 8px' }}>🎮 Games & Challenges</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, paddingBottom:16 }}>
          {[
            { id:'QuizScreen',    icon:'🧠', label:'Pillar Quiz',    sub:'Test your knowledge',   color:CC.green,     defaultPillar:'save' },
            { id:'NeedVsWant',    icon:'🛒', label:'Need vs Want',   sub:'Sort 15 scenarios',     color:CC.orange     },
            { id:'BudgetBuilder', icon:'💰', label:'Budget Builder', sub:'Master 50/30/20',        color:CC.greenDeep  },
            { id:'ScamSpotter',   icon:'🛡️', label:'Scam Spotter',  sub:'Real or fake? Decide!', color:CC.coral      },
          ].map(g => (
            <div key={g.id} onClick={() => navigate(g.id, g.defaultPillar ? { pillar:g.defaultPillar } : {})}
              style={{ background:'#fff', borderRadius:16, padding:'12px 12px 14px', border:`1px solid ${CC.line}`, cursor:'pointer', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-8, right:-8, fontSize:52, opacity:.07 }}>{g.icon}</div>
              <div style={{ width:36, height:36, borderRadius:12, background:g.color+'22', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginBottom:8 }}>{g.icon}</div>
              <div style={{ fontSize:13, fontWeight:800, color:CC.ink }}>{g.label}</div>
              <div style={{ fontSize:11, color:CC.ink3, marginTop:2 }}>{g.sub}</div>
              <div style={{ fontSize:11, fontWeight:700, color:g.color, marginTop:6 }}>Play →</div>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="learn" />
    </Phone>
  )
}

// ─── 2. Pillar Path — Duolingo winding path ───────────────────────
const PILLAR_META = {
  earn:    { i:'🛠️', name:'Earn',    tone:CC.orange,    num:'01' },
  save:    { i:'🐷', name:'Save',    tone:CC.green,     num:'02' },
  spend:   { i:'🛒', name:'Spend',   tone:CC.coral,     num:'03' },
  invest:  { i:'🌳', name:'Invest',  tone:CC.greenDeep, num:'04' },
  give:    { i:'🌸', name:'Give',    tone:'#9B7AC4',    num:'05' },
  protect: { i:'🛡️', name:'Protect', tone:CC.yellowDeep,num:'06' },
}

const PILLAR_NODES = {
  earn: [
    { type:'lesson', state:'done',    label:'What is income?',        x:50 },
    { type:'lesson', state:'done',    label:'Active vs passive',       x:28 },
    { type:'lesson', state:'done',    label:'Your hourly rate',        x:32 },
    { type:'checkpoint', state:'done', label:'Module 1 ✓',             x:52 },
    { type:'lesson', state:'current', label:'Side hustles in Vietnam', x:70 },
    { type:'lesson', state:'locked',  label:'Opportunity cost',        x:68 },
    { type:'checkpoint', state:'locked', label:'Module 2',             x:48 },
  ],
  save: [
    { type:'lesson', state:'done',    label:'What is saving?',        x:50 },
    { type:'lesson', state:'done',    label:'50/30/20 rule',          x:28 },
    { type:'lesson', state:'done',    label:'Compound interest',      x:30 },
    { type:'checkpoint', state:'done', label:'Module 1 ✓',            x:52 },
    { type:'lesson', state:'done',    label:'Smart goals',            x:70 },
    { type:'lesson', state:'current', label:'Where to keep money',    x:68 },
    { type:'lesson', state:'locked',  label:'Save vs invest',         x:46 },
    { type:'lesson', state:'locked',  label:'Talk to a parent',       x:30 },
    { type:'checkpoint', state:'locked', label:'Module 2',            x:50 },
  ],
  spend: [
    { type:'lesson', state:'done',    label:'Needs vs Wants',         x:50 },
    { type:'lesson', state:'done',    label:'Impulse buying',         x:72 },
    { type:'lesson', state:'done',    label:'The 24-hour rule',       x:68 },
    { type:'checkpoint', state:'done', label:'Module 1 ✓',            x:48 },
    { type:'lesson', state:'current', label:'Comparing unit prices',  x:30 },
    { type:'lesson', state:'locked',  label:'Spending plan',          x:28 },
    { type:'checkpoint', state:'locked', label:'Module 2',            x:52 },
  ],
  invest: [
    { type:'lesson', state:'current', label:'What is investing?',     x:50 },
    { type:'lesson', state:'locked',  label:'Savings vs stocks',      x:28 },
    { type:'lesson', state:'locked',  label:'Compound over 40 yrs',   x:32 },
    { type:'checkpoint', state:'locked', label:'Module 1',            x:52 },
  ],
  give: [
    { type:'lesson', state:'done',    label:'Why giving matters',     x:50 },
    { type:'lesson', state:'done',    label:'Forms of giving',        x:28 },
    { type:'lesson', state:'current', label:'Setting a give budget',  x:32 },
    { type:'lesson', state:'locked',  label:'Causes you care about',  x:52 },
    { type:'checkpoint', state:'locked', label:'Module 1',            x:70 },
  ],
  protect: [
    { type:'lesson', state:'done',    label:'Zalo & SMS scams',       x:50 },
    { type:'lesson', state:'done',    label:'Passwords & 2FA',        x:28 },
    { type:'lesson', state:'done',    label:'What is insurance?',     x:32 },
    { type:'checkpoint', state:'done', label:'Module 1 ✓',            x:52 },
    { type:'lesson', state:'current', label:'What is phishing?',      x:70 },
    { type:'lesson', state:'locked',  label:'Protect bank details',   x:68 },
    { type:'checkpoint', state:'locked', label:'Module 2',            x:46 },
  ],
}

function PathNode({ type, state: nodeState, x, label, top }) {
  const done = nodeState === 'done', cur = nodeState === 'current', locked = nodeState === 'locked'
  const isCp = type === 'checkpoint'
  const sz = isCp ? 60 : 54
  const bg = done ? CC.green : cur ? '#fff' : '#D8E5DA'
  const fg = done ? '#fff' : cur ? CC.green : CC.ink3

  return (
    <div style={{ position:'absolute', top, left:`${x}%`, transform:'translate(-50%,-50%)', textAlign:'center' }}>
      <div style={{
        width:sz, height:sz,
        borderRadius: isCp ? 14 : sz/2,
        clipPath: isCp ? 'polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%)' : 'none',
        background: isCp ? (done ? 'linear-gradient(135deg,#F5D75A,#E5B924)' : '#D8E5DA') : bg,
        color: isCp ? CC.greenInk : fg,
        border: cur ? `3px solid ${CC.green}` : isCp && !done ? `2px dashed ${CC.mintEdge}` : 'none',
        boxShadow: cur ? `0 0 0 6px rgba(63,142,92,.18)` : done ? '0 4px 10px rgba(63,142,92,.25)' : 'none',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize: isCp ? 22 : 18, fontWeight:800,
        margin:'0 auto',
        animation: cur ? 'node-pulse 1.6s ease-in-out infinite' : 'none',
        transition:'all .2s',
      }}>
        {isCp ? (done ? '🏅' : '🔒') : done ? '✓' : cur ? '▶' : locked ? '🔒' : '○'}
      </div>
      {(isCp || cur) && (
        <div style={{ marginTop:6, fontSize:10, fontWeight:800, color: cur ? CC.greenInk : CC.ink3, maxWidth:80, lineHeight:1.2 }}>
          {label}
        </div>
      )}
      <style>{`@keyframes node-pulse{0%,100%{box-shadow:0 0 0 6px rgba(63,142,92,.18)}50%{box-shadow:0 0 0 11px rgba(63,142,92,.06)}}`}</style>
    </div>
  )
}

export function PillarPath() {
  const { navigate, goBack, currentParams, state } = useApp()
  const pillarKey = currentParams?.pillar || 'save'
  const meta = PILLAR_META[pillarKey]
  const nodes = PILLAR_NODES[pillarKey] || PILLAR_NODES.save
  const qData = PILLAR_QUIZZES[pillarKey]
  const { meo } = state

  const GAP = 100, TOP = 54
  const cy = (i) => TOP + i * GAP
  const totalH = cy(nodes.length) + 20
  const currentIdx = nodes.findIndex(n => n.state === 'current')

  return (
    <Phone bg={CC.mint}>
      {/* Hero */}
      <div style={{ background:CC.greenInk, color:'#fff', padding:'12px 18px 16px', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <CircleBtn bg="rgba(255,255,255,.15)" onClick={goBack}><span style={{ color:'#fff' }}>‹</span></CircleBtn>
          <div style={{ flex:1, fontSize:11, opacity:.7, fontWeight:700, letterSpacing:1 }}>FOUNDATION ▸ PILLAR {meta.num}</div>
          <div style={{ display:'flex', alignItems:'center', gap:4, background:'rgba(255,255,255,.12)', padding:'4px 10px', borderRadius:999 }}>
            <span style={{ fontSize:13 }}>🔥</span>
            <span style={{ fontSize:13, fontWeight:800 }}>{state.user.streak}</span>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:8 }}>
          <div style={{ width:48, height:48, borderRadius:16, background:meta.tone, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>{meta.i}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:20, fontWeight:800 }}>{meta.name}</div>
            <div style={{ fontSize:12, opacity:.8 }}>
              {nodes.filter(n=>n.state==='done').length} lessons done · {nodes.filter(n=>n.type==='checkpoint'&&n.state==='done').length} modules complete
            </div>
          </div>
        </div>
        {/* Quiz CTA */}
        {qData && (
          <div onClick={() => navigate('QuizScreen', { pillar: pillarKey })} style={{
            marginTop:10, display:'flex', alignItems:'center', gap:10,
            background:'rgba(255,255,255,.12)', borderRadius:14, padding:'10px 12px', cursor:'pointer',
          }}>
            <span style={{ fontSize:20 }}>🧠</span>
            <div style={{ flex:1, fontSize:13, fontWeight:700 }}>{meta.name} Quiz · {qData.questions.length} questions</div>
            <span style={{ fontSize:12, fontWeight:800, color:CC.yellow }}>Take quiz →</span>
          </div>
        )}
      </div>

      {/* Winding path */}
      <div style={{ flex:1, overflow:'auto', position:'relative' }}>
        <div style={{ position:'relative', height: Math.max(totalH, 600), width:'100%' }}>
          {/* SVG connectors */}
          <svg width="100%" height={totalH} viewBox={`0 0 360 ${totalH}`}
            preserveAspectRatio="xMidYMin meet"
            style={{ position:'absolute', top:0, left:0, pointerEvents:'none' }}>
            {nodes.slice(0,-1).map((n, i) => {
              const x1 = n.x/100*360, y1 = cy(i)
              const x2 = nodes[i+1].x/100*360, y2 = cy(i+1)
              const isDone = n.state === 'done'
              return (
                <path key={i}
                  d={`M${x1} ${y1} C ${x1} ${y1+50}, ${x2} ${y2-50}, ${x2} ${y2}`}
                  stroke={isDone ? CC.green : CC.mintEdge}
                  strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" fill="none"
                />
              )
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((n, i) => (
            <PathNode key={i} {...n} top={cy(i)} idx={i}
              onClick={n.state==='current' ? () => navigate('ModuleCheckpoint', { pillar:pillarKey }) : undefined}
            />
          ))}

          {/* Mèo at current node */}
          {currentIdx >= 0 && (
            <div style={{
              position:'absolute',
              top: cy(currentIdx) - 72,
              left:`${nodes[currentIdx].x}%`,
              transform:'translateX(-50%)',
            }}>
              <Meo coat={meo.coat} stage={meo.stage} mood="happy" size={52} />
            </div>
          )}
        </div>
      </div>

      <TabBar active="learn" />
    </Phone>
  )
}

// ─── 3. Module Checkpoint — 5-question quiz ───────────────────────
export function ModuleCheckpoint() {
  const { navigate, goBack, currentParams } = useApp()
  const pillarKey = currentParams?.pillar || 'save'
  const meta = PILLAR_META[pillarKey]
  const qData = PILLAR_QUIZZES[pillarKey]
  const questions = qData?.questions?.slice(0, 5) || []

  const [qIdx, setQIdx]         = useState(0)
  const [selected, setSelected] = useState(null)

  const q = questions[qIdx]
  const progress = qIdx + 1
  const total = questions.length

  const handleSelect = (i) => {
    if (selected !== null) return
    setSelected(i)
  }

  const handleNext = () => {
    if (qIdx + 1 >= total) {
      navigate('CheckpointPass', { pillar: pillarKey, score: 5 })
    } else {
      setQIdx(q => q + 1)
      setSelected(null)
    }
  }

  if (!q) return null

  return (
    <Phone bg={CC.greenInk} style={{ color:'#fff' }}>
      {/* Top bar */}
      <div style={{ padding:'14px 18px 10px', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
        <CircleBtn bg="rgba(255,255,255,.15)" onClick={goBack}><span style={{ color:'#fff' }}>✕</span></CircleBtn>
        <div style={{ flex:1, display:'flex', gap:4 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{ flex:1, height:6, borderRadius:3, background: i < progress ? CC.yellow : 'rgba(255,255,255,.18)' }} />
          ))}
        </div>
        <span style={{ fontSize:12, fontWeight:800 }}>{progress}/{total}</span>
      </div>

      <div style={{ flex:1, padding:'8px 20px', display:'flex', flexDirection:'column', overflow:'auto' }}>
        {/* Module label */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:4 }}>
          <div style={{
            width:38, height:38, borderRadius:12,
            background:'rgba(245,215,90,.18)',
            clipPath:'polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>🏅</div>
          <div style={{ fontSize:11, opacity:.75, fontWeight:700, letterSpacing:1 }}>MODULE CHECKPOINT · {meta.name.toUpperCase()}</div>
        </div>

        <div style={{ fontSize:20, fontWeight:800, lineHeight:1.3, marginTop:16 }}>{q.q}</div>

        <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:20 }}>
          {q.opts.map((opt, i) => {
            const letter = 'ABCD'[i]
            const isSelected = selected === i
            const isCorrect  = selected !== null && i === q.correct
            const isWrong    = selected === i && i !== q.correct
            return (
              <div key={i} onClick={() => handleSelect(i)} style={{
                display:'flex', alignItems:'center', gap:12, padding:'14px',
                borderRadius:14, cursor:'pointer',
                background: isCorrect ? CC.green : isWrong ? '#E76F6222' : isSelected ? '#fff' : 'rgba(255,255,255,.08)',
                color: isCorrect ? '#fff' : isSelected ? CC.greenInk : '#fff',
                border: `2px solid ${isCorrect ? CC.green : isWrong ? CC.coral : isSelected ? CC.yellow : 'rgba(255,255,255,.12)'}`,
                transition:'all .15s',
              }}>
                <div style={{
                  width:28, height:28, borderRadius:14,
                  background: isCorrect ? 'rgba(255,255,255,.3)' : isSelected ? CC.yellow : 'rgba(255,255,255,.15)',
                  color: isSelected && !isCorrect ? CC.greenInk : '#fff',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, flexShrink:0,
                }}>{letter}</div>
                <div style={{ flex:1, fontSize:15, fontWeight:700 }}>{opt}</div>
                {isCorrect && <span>✓</span>}
                {isWrong   && <span>✗</span>}
              </div>
            )
          })}
        </div>

        {selected !== null && (
          <div style={{ marginTop:14, padding:'12px 14px', borderRadius:14, background:'rgba(255,255,255,.08)', fontSize:13, lineHeight:1.5 }}>
            {q.explain}
          </div>
        )}

        <div style={{ marginTop:'auto', paddingBottom:14, paddingTop:16 }}>
          {selected !== null
            ? <Btn kind="yellow" size="lg" full onClick={handleNext}>
                {qIdx + 1 >= total ? 'See results 🎉' : 'Next question →'}
              </Btn>
            : <div style={{ textAlign:'center', fontSize:12, opacity:.6 }}>Pick an answer above</div>
          }
          <div style={{ textAlign:'center', fontSize:11, opacity:.65, marginTop:10 }}>
            Pass with 4/5 · +200 XP &amp; a Module Badge
          </div>
        </div>
      </div>
    </Phone>
  )
}

// ─── 4. Checkpoint Pass — celebration ────────────────────────────
export function CheckpointPass() {
  const { navigate, navigateTab, currentParams, state } = useApp()
  const pillarKey = currentParams?.pillar || 'save'
  const meta = PILLAR_META[pillarKey]
  const { meo } = state

  return (
    <Phone bg={CC.mint}>
      <div style={{ flex:1, padding:'24px 24px 0', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
        <div style={{ display:'flex', gap:8, fontSize:22 }}>
          <span style={{ transform:'rotate(-12deg)' }}>🎉</span>
          <span style={{ transform:'rotate(8deg)' }}>🏅</span>
          <span style={{ transform:'rotate(-4deg)' }}>🎊</span>
        </div>

        {/* Mèo celebrating */}
        <div style={{ marginTop:10 }}>
          <Meo coat={meo.coat} stage={meo.stage} mood="happy" size={150} />
        </div>

        <div style={{ fontSize:12, color:CC.green, fontWeight:800, letterSpacing:1.5, marginTop:4 }}>MODULE CLEARED · 5/5</div>
        <div style={{ fontSize:26, fontWeight:800, color:CC.greenInk, marginTop:4 }}>{meta.name} Smart ✓</div>
        <div style={{ fontSize:14, color:CC.ink2, marginTop:8, maxWidth:290, lineHeight:1.5 }}>
          {meo.name} did a little dance. The {meta.i} zone in your Garden just bloomed 🌸
        </div>

        {/* Rewards */}
        <div style={{ display:'flex', gap:10, marginTop:22, width:'100%' }}>
          {[['⭐','+200','XP'],['🏅','Badge',meta.name],['🔓','Module 3','unlocked']].map(([icon,v,l]) => (
            <div key={l} style={{ flex:1, background:'#fff', borderRadius:16, padding:'12px 8px', border:`1px solid ${CC.line}` }}>
              <div style={{ fontSize:22 }}>{icon}</div>
              <div style={{ fontSize:15, fontWeight:800, color:CC.greenInk, marginTop:4 }}>{v}</div>
              <div style={{ fontSize:10, color:CC.ink3 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ width:'100%', marginTop:'auto', paddingBottom:20, paddingTop:22 }}>
          <Btn kind="primary" size="lg" full onClick={() => navigate('PillarPath', { pillar:pillarKey })}>
            Continue →
          </Btn>
          <div style={{ height:10 }} />
          <Btn kind="ghost" size="md" full onClick={() => navigateTab('LearnHome')}>
            Back to Garden 🌱
          </Btn>
        </div>
      </div>
    </Phone>
  )
}

// ─── 5. Lesson Complete + Apply Now ──────────────────────────────
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
        <div style={{ display:'flex', justifyContent:'center', gap:6, marginTop:6, fontSize:16 }}>
          <span style={{ transform:'rotate(-12deg)' }}>🎉</span>
          <span style={{ transform:'rotate(8deg)' }}>✨</span>
          <span style={{ transform:'rotate(-4deg)' }}>🎊</span>
        </div>
        <div style={{ textAlign:'center', fontSize:11, color:CC.green, fontWeight:700, letterSpacing:1, marginTop:8 }}>LESSON COMPLETE</div>
        <div style={{ textAlign:'center', fontSize:24, fontWeight:800, color:CC.greenInk, letterSpacing:-.3, marginTop:4 }}>Set Smart Goals</div>
        <div style={{ marginTop:14, padding:'12px 16px', borderRadius:18, background:'linear-gradient(135deg,#F5D75A,#E5B924)', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ fontSize:28 }}>🪙</div>
          <div style={{ flex:1, fontWeight:700, fontSize:14, color:CC.greenInk }}>+10 XP earned · Garden bloomed!</div>
        </div>
        <div style={{ marginTop:12, borderRadius:18, overflow:'hidden', border:`1px solid ${CC.line}` }}>
          <GardenScene height={130} />
        </div>
        <div style={{ marginTop:14, padding:'14px', borderRadius:18, background:'#fff', border:`1px solid ${CC.line}`, marginBottom:16 }}>
          <div style={{ fontSize:11, color:CC.ink3, fontWeight:700, letterSpacing:1 }}>APPLY NOW</div>
          <div style={{ fontSize:15, fontWeight:700, marginTop:4, lineHeight:1.4 }}>
            Want to make this real? Set a new savings goal right now.
          </div>
          <div style={{ marginTop:12 }}>
            <Btn kind="primary" size="md" full onClick={() => navigateTab('SavingsGoals')}>＋ Create a savings goal →</Btn>
          </div>
          <div style={{ textAlign:'center', marginTop:8, fontSize:12, color:CC.ink3, cursor:'pointer' }} onClick={() => navigateTab('LearnHome')}>Maybe later</div>
        </div>
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

// ─── 6. Alex Chat ─────────────────────────────────────────────────
export function AlexChat() {
  const { navigate, goBack } = useApp()
  const [choice, setChoice] = useState(null)

  const handleChoice = (c) => {
    setChoice(c)
    setTimeout(() => navigate('PillarPath', { pillar: 'protect' }), 800)
  }

  return (
    <Phone bg={CC.mint}>
      <div style={{ padding:'12px 16px 0', opacity:.35, pointerEvents:'none' }}>
        <div style={{ fontSize:22, fontWeight:800, color:CC.greenInk }}>Cha-Ching Garden</div>
      </div>
      <div style={{ flex:1, position:'relative' }}>
        <div style={{ position:'absolute', inset:0, background:'rgba(14,20,16,.35)' }}/>
        <div style={{
          position:'absolute', bottom:0, left:0, right:0,
          background:'#fff', borderRadius:'24px 24px 0 0',
          padding:'12px 18px 22px', boxShadow:'0 -10px 40px rgba(0,0,0,.2)',
          animation:'slideUp .3s ease',
        }}>
          <div style={{ width:36, height:4, background:CC.lineHard, borderRadius:2, margin:'0 auto 12px' }}/>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <AlexAvatar size={48} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontWeight:800 }}>Alex</div>
              <div style={{ fontSize:11, color:CC.green, fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ width:6, height:6, borderRadius:3, background:CC.green, display:'inline-block' }}/> Online · Learn only
              </div>
            </div>
          </div>
          <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:8 }}>
            {[
              <span>Heyy! You just finished <b>Set Smart Goals</b> 🎯 Nice one.</span>,
              <span>Want to keep going, or jump to <b>Protect</b> for some scam-spotting?</span>,
            ].map((msg, i) => (
              <div key={i} style={{ background:CC.mint, borderRadius:'16px 16px 16px 4px', padding:'10px 14px', fontSize:14, lineHeight:1.45, color:CC.ink, maxWidth:'88%' }}>{msg}</div>
            ))}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:14 }}>
            {[
              { label:'Next Save lesson →', ghost:false },
              { label:'Try Scam Spotter 🛡️', ghost:false },
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
