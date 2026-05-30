import React, { useState, useRef, useEffect } from 'react'
import { CC, CCFont, vnd } from '../theme.js'
import { useApp } from '../context.jsx'
import { Phone, Btn, CircleBtn, Card } from '../components/index.jsx'
import { PILLAR_QUIZZES, NVW_CARDS, BUDGET_SCENARIO, SCAM_CARDS } from '../data/quiz.js'

// ─────────────────────────────────────────────────────────────────
// 1. QUIZ SCREEN — multiple choice per pillar
// ─────────────────────────────────────────────────────────────────
export function QuizScreen() {
  const { currentParams, navigate, goBack, dispatch } = useApp()
  const pillarKey = currentParams?.pillar || 'save'
  const data = PILLAR_QUIZZES[pillarKey]
  const questions = data?.questions || []

  const [qIdx, setQIdx]       = useState(0)
  const [selected, setSelected] = useState(null)   // index of chosen option
  const [score, setScore]     = useState(0)
  const [done, setDone]       = useState(false)

  const q = questions[qIdx]
  const progress = ((qIdx) / questions.length) * 100

  const handleSelect = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === q.correct) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (qIdx + 1 >= questions.length) {
      const xpEarned = score * 10 + (selected === q.correct ? 10 : 0)
      dispatch({ type: 'ADD_XP', amount: xpEarned })
      navigate('QuizResult', {
        pillar: pillarKey,
        score: score + (selected === q.correct ? 1 : 0),
        total: questions.length,
        xp: xpEarned,
      })
    } else {
      setQIdx(i => i + 1)
      setSelected(null)
    }
  }

  if (!data) return null

  return (
    <Phone bg={CC.paper}>
      {/* Header */}
      <div style={{ padding: '14px 16px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CircleBtn onClick={goBack}>✕</CircleBtn>
        <div style={{ flex: 1, height: 6, background: CC.mintDeep, borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: data.color, transition: 'width .3s' }} />
        </div>
        <span style={{ fontSize: 12, color: CC.ink3, fontWeight: 700 }}>{qIdx + 1}/{questions.length}</span>
      </div>

      <div style={{ flex: 1, padding: '18px 18px 0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Pillar badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: data.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{data.icon}</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: data.color }}>{data.pillar} · Question {qIdx + 1}</span>
        </div>

        {/* Question */}
        <div style={{ fontSize: 18, fontWeight: 800, color: CC.ink, lineHeight: 1.4, marginBottom: 22 }}>{q.q}</div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.opts.map((opt, i) => {
            const isSelected = selected === i
            const isCorrect  = i === q.correct
            let bg = '#fff', border = CC.line, color = CC.ink, iconEl = null

            if (selected !== null) {
              if (isCorrect)        { bg = '#E8F4EA'; border = CC.green;  color = CC.greenInk; iconEl = '✓' }
              else if (isSelected)  { bg = '#FEE8E6'; border = CC.coral;  color = CC.coral;    iconEl = '✗' }
            } else if (isSelected) { bg = CC.mint; border = CC.green }

            return (
              <div key={i} onClick={() => handleSelect(i)} style={{
                padding: '13px 14px', borderRadius: 14, cursor: selected ? 'default' : 'pointer',
                background: bg, border: `1.5px solid ${border}`, color,
                display: 'flex', alignItems: 'center', gap: 12,
                transition: 'all .15s',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 14, flexShrink: 0,
                  background: selected !== null ? (isCorrect ? CC.green : isSelected ? CC.coral : CC.mintDeep) : CC.mintDeep,
                  color: selected !== null && (isCorrect || isSelected) ? '#fff' : CC.ink3,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800,
                }}>
                  {selected !== null && (isCorrect || isSelected) ? iconEl : String.fromCharCode(65 + i)}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>{opt}</span>
              </div>
            )
          })}
        </div>

        {/* Explanation */}
        {selected !== null && (
          <div style={{
            marginTop: 14, padding: '12px 14px', borderRadius: 14,
            background: selected === q.correct ? '#E8F4EA' : '#FEF3E2',
            borderLeft: `4px solid ${selected === q.correct ? CC.green : CC.orange}`,
            animation: 'fadeIn .25s ease',
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: selected === q.correct ? CC.green : CC.orange, marginBottom: 4 }}>
              {selected === q.correct ? '🎯 Correct!' : '💡 Not quite —'}
            </div>
            <div style={{ fontSize: 13, color: CC.ink, lineHeight: 1.5 }}>{q.explain}</div>
          </div>
        )}
      </div>

      {/* Next button */}
      {selected !== null && (
        <div style={{ padding: '14px 18px 20px', animation: 'slideUp .2s ease' }}>
          <Btn kind="primary" size="lg" full onClick={handleNext}>
            {qIdx + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
          </Btn>
        </div>
      )}
    </Phone>
  )
}

// ─────────────────────────────────────────────────────────────────
// 2. QUIZ RESULT
// ─────────────────────────────────────────────────────────────────
export function QuizResult() {
  const { currentParams, navigate, goBack } = useApp()
  const { pillar = 'save', score = 0, total = 6, xp = 0 } = currentParams || {}
  const data = PILLAR_QUIZZES[pillar]
  const pct  = Math.round((score / total) * 100)
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1
  const message = pct === 100 ? 'Perfect score! You\'re a financial genius 🌟' :
                  pct >= 80  ? 'Great work! Almost perfect.' :
                  pct >= 60  ? 'Good effort! Review the explanations and try again.' :
                               'Keep learning — every expert started here. 💪'

  return (
    <Phone bg={CC.mint}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px 24px', gap: 0 }}>
        {/* Stars */}
        <div style={{ fontSize: 48, letterSpacing: 4, marginBottom: 8 }}>
          {[1,2,3].map(i => <span key={i} style={{ opacity: i <= stars ? 1 : .2 }}>⭐</span>)}
        </div>

        {/* Score ring */}
        <div style={{
          width: 120, height: 120, borderRadius: 60,
          background: `conic-gradient(${data?.color || CC.green} ${pct * 3.6}deg, ${CC.mintDeep} 0deg)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 24px ${data?.color || CC.green}44`,
        }}>
          <div style={{ width: 90, height: 90, borderRadius: 45, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: data?.color || CC.green }}>{score}/{total}</span>
            <span style={{ fontSize: 11, color: CC.ink3 }}>{pct}%</span>
          </div>
        </div>

        <div style={{ fontSize: 20, fontWeight: 800, color: CC.greenInk, marginTop: 18, textAlign: 'center' }}>
          {data?.icon} {data?.pillar} Quiz Complete
        </div>
        <div style={{ fontSize: 14, color: CC.ink2, textAlign: 'center', marginTop: 6, lineHeight: 1.5 }}>{message}</div>

        {/* XP reward */}
        <div style={{
          marginTop: 18, padding: '12px 20px', borderRadius: 16,
          background: 'linear-gradient(135deg, #F5D75A, #E5B924)',
          display: 'flex', alignItems: 'center', gap: 12, alignSelf: 'stretch',
        }}>
          <span style={{ fontSize: 24 }}>🪙</span>
          <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: CC.greenInk }}>+{xp} XP earned</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: CC.greenInk }}>{xp} XP</div>
        </div>

        {/* Breakdown */}
        <div style={{ marginTop: 16, width: '100%', background: '#fff', borderRadius: 16, overflow: 'hidden' }}>
          {PILLAR_QUIZZES[pillar]?.questions.map((q, i) => (
            <div key={i} style={{
              padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: i < (total - 1) ? `1px solid ${CC.line}` : 'none',
            }}>
              <span style={{ fontSize: 16 }}>{i < score ? '✅' : '❌'}</span>
              <span style={{ fontSize: 12, color: CC.ink, flex: 1, lineHeight: 1.3 }}>{q.q.slice(0, 55)}…</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 18px 20px', display: 'flex', gap: 10 }}>
        <Btn kind="light" size="md" full onClick={() => navigate('QuizScreen', { pillar })}>Try again</Btn>
        <Btn kind="primary" size="md" full onClick={() => navigate('PillarDetail', { pillar })}>Back to pillar →</Btn>
      </div>
    </Phone>
  )
}

// ─────────────────────────────────────────────────────────────────
// 3. BUDGET BUILDER GAME
// ─────────────────────────────────────────────────────────────────
const STEP = 50000

export function BudgetBuilder() {
  const { goBack } = useApp()
  const s = BUDGET_SCENARIO
  const [alloc, setAlloc] = useState(() =>
    Object.fromEntries(s.categories.map(c => [c.id, c.suggested]))
  )
  const [submitted, setSubmitted] = useState(false)

  const total     = Object.values(alloc).reduce((a, b) => a + b, 0)
  const remaining = s.income - total
  const needs  = s.categories.filter(c => c.type === 'need').reduce((a, c) => a + alloc[c.id], 0)
  const wants  = s.categories.filter(c => c.type === 'want').reduce((a, c) => a + alloc[c.id], 0)
  const save   = s.categories.filter(c => c.type === 'save').reduce((a, c) => a + alloc[c.id], 0)
  const give   = s.categories.filter(c => c.type === 'give').reduce((a, c) => a + alloc[c.id], 0)

  const needPct  = Math.round((needs / s.income) * 100)
  const wantPct  = Math.round((wants / s.income) * 100)
  const savePct  = Math.round((save  / s.income) * 100)

  const adjust = (id, delta) => {
    setAlloc(prev => {
      const next = Math.max(0, Math.min(
        s.categories.find(c => c.id === id).max,
        prev[id] + delta
      ))
      return { ...prev, [id]: next }
    })
  }

  const getFeedback = () => {
    if (savePct >= 18 && needPct <= 55 && wantPct <= 35) return { tone: CC.green, msg: s.tips.perfect }
    if (savePct >= 30) return { tone: CC.green, msg: s.tips.oversave }
    if (wantPct >= 40) return { tone: CC.coral, msg: s.tips.overspend }
    return { tone: CC.orange, msg: s.tips.unbalanced }
  }

  const typeColor = { need: CC.greenDeep, want: CC.orange, save: CC.green, give: '#9B7AC4' }
  const typeLabel = { need: 'NEED', want: 'WANT', save: 'SAVE', give: 'GIVE' }

  return (
    <Phone bg={CC.paper}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${CC.greenInk}, ${CC.green})`, padding: '14px 18px 18px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <CircleBtn dark onClick={goBack}>‹</CircleBtn>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800 }}>Budget Builder 💰</div>
            <div style={{ fontSize: 11, opacity: .8 }}>{s.description.slice(0, 60)}…</div>
          </div>
        </div>
        {/* Remaining */}
        <div style={{ background: 'rgba(255,255,255,.15)', borderRadius: 12, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, opacity: .7, fontWeight: 700 }}>MONTHLY INCOME</div>
            <div style={{ fontSize: 20, fontWeight: 900 }}>{vnd(s.income)} ₫</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, opacity: .7, fontWeight: 700 }}>UNALLOCATED</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: remaining < 0 ? '#ff8080' : CC.yellow }}>
              {remaining < 0 ? '-' : ''}{vnd(Math.abs(remaining))} ₫
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px' }}>
        {/* 50/30/20 visual */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {[
            { label: 'Needs', pct: needPct, target: 50, color: CC.greenDeep },
            { label: 'Wants', pct: wantPct, target: 30, color: CC.orange },
            { label: 'Save',  pct: savePct, target: 20, color: CC.green },
          ].map(b => (
            <div key={b.label} style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 10, textAlign: 'center', border: `1.5px solid ${Math.abs(b.pct - b.target) <= 8 ? b.color : CC.line}` }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: b.color }}>{b.pct}%</div>
              <div style={{ fontSize: 10, color: CC.ink3 }}>{b.label}</div>
              <div style={{ fontSize: 9, color: CC.ink3 }}>target {b.target}%</div>
            </div>
          ))}
        </div>

        {/* Category sliders */}
        {s.categories.map(cat => (
          <div key={cat.id} style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{cat.icon}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: CC.ink }}>{cat.label}</span>
              <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 999, background: typeColor[cat.type] + '22', color: typeColor[cat.type] }}>
                {typeLabel[cat.type]}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => adjust(cat.id, -STEP)} style={{ width: 28, height: 28, borderRadius: 14, border: `1px solid ${CC.line}`, background: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <div style={{ flex: 1, height: 6, background: CC.mintDeep, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${(alloc[cat.id] / cat.max) * 100}%`, height: '100%', background: typeColor[cat.type], transition: 'width .15s' }} />
              </div>
              <button onClick={() => adjust(cat.id, +STEP)} style={{ width: 28, height: 28, borderRadius: 14, border: `1px solid ${CC.line}`, background: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              <span style={{ fontSize: 13, fontWeight: 800, color: CC.ink, minWidth: 80, textAlign: 'right' }}>{vnd(alloc[cat.id])} ₫</span>
            </div>
          </div>
        ))}

        {/* Feedback */}
        {submitted && (() => {
          const fb = getFeedback()
          return (
            <div style={{ marginTop: 4, padding: '14px', borderRadius: 14, background: fb.tone + '18', borderLeft: `4px solid ${fb.tone}`, animation: 'fadeIn .3s ease' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: fb.tone, marginBottom: 4 }}>Budget Analysis</div>
              <div style={{ fontSize: 13, color: CC.ink, lineHeight: 1.5 }}>{fb.msg}</div>
              <div style={{ marginTop: 10, fontSize: 12, color: CC.ink2 }}>
                Needs {needPct}% · Wants {wantPct}% · Save {savePct}% · Give {Math.round((give/s.income)*100)}%
              </div>
            </div>
          )
        })()}
        <div style={{ height: 16 }} />
      </div>

      <div style={{ padding: '0 16px 20px' }}>
        <Btn kind="primary" size="lg" full onClick={() => setSubmitted(true)}>
          {submitted ? '✓ Budget Analysed — Adjust & resubmit' : 'Analyse my budget →'}
        </Btn>
      </div>
    </Phone>
  )
}

// ─────────────────────────────────────────────────────────────────
// 4. SCAM SPOTTER GAME
// ─────────────────────────────────────────────────────────────────
const typeIcon = { zalo: '💬', email: '📧', sms: '📱', app: '📲' }

export function ScamSpotter() {
  const { goBack } = useApp()
  const [idx, setIdx]       = useState(0)
  const [answered, setAnswered] = useState(null)  // 'scam' | 'real'
  const [score, setScore]   = useState(0)
  const [streak, setStreak] = useState(0)
  const [done, setDone]     = useState(false)
  const [slideDir, setSlideDir] = useState(1)

  const card = SCAM_CARDS[idx]

  const handleAnswer = (guess) => {
    if (answered) return
    setAnswered(guess)
    const correct = (guess === 'scam') === card.isScam
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1) }
    else setStreak(0)
  }

  const handleNext = () => {
    if (idx + 1 >= SCAM_CARDS.length) { setDone(true); return }
    setSlideDir(1)
    setIdx(i => i + 1)
    setAnswered(null)
  }

  if (done) {
    const pct = Math.round((score / SCAM_CARDS.length) * 100)
    return (
      <Phone bg={CC.greenInk} style={{ color: '#fff' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', gap: 16 }}>
          <div style={{ fontSize: 64 }}>{pct >= 80 ? '🛡️' : pct >= 60 ? '🔐' : '😅'}</div>
          <div style={{ fontSize: 24, fontWeight: 900, textAlign: 'center' }}>
            {pct === 100 ? 'Scam-proof!' : pct >= 80 ? 'Sharp eye!' : pct >= 60 ? 'Getting there!' : 'Stay sharp!'}
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: CC.yellow }}>{score}/{SCAM_CARDS.length}</div>
          <div style={{ fontSize: 14, opacity: .8, textAlign: 'center', lineHeight: 1.5 }}>
            {pct >= 80 ? 'You\'re hard to fool. Keep this skill — online scams are getting smarter every year.' : 'Review the explanations and play again. Spotting scams is a skill that protects your money.'}
          </div>
          <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 8 }}>
            <Btn kind="light" size="md" full onClick={() => { setIdx(0); setScore(0); setStreak(0); setAnswered(null); setDone(false) }}>Play again</Btn>
            <Btn kind="yellow" size="md" full onClick={goBack}>Back</Btn>
          </div>
        </div>
      </Phone>
    )
  }

  const correct = answered !== null && ((answered === 'scam') === card.isScam)

  return (
    <Phone bg={CC.greenInk} style={{ color: '#fff' }}>
      {/* HUD */}
      <div style={{ padding: '14px 18px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CircleBtn dark onClick={goBack}>‹</CircleBtn>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800 }}>Scam Spotter 🛡️</div>
          <div style={{ fontSize: 11, opacity: .7 }}>Can you tell real from fake?</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 10, padding: '5px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: CC.yellow }}>🔥{streak}</div>
            <div style={{ fontSize: 9, opacity: .7 }}>streak</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 10, padding: '5px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 800 }}>{score}/{idx}</div>
            <div style={{ fontSize: 9, opacity: .7 }}>score</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginHorizontal: 18, height: 3, background: 'rgba(255,255,255,.15)', borderRadius: 2, overflow: 'hidden', margin: '0 18px 14px' }}>
        <div style={{ width: `${(idx / SCAM_CARDS.length) * 100}%`, height: '100%', background: CC.yellow, transition: 'width .3s' }} />
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 16px' }}>
        {/* Message card */}
        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', marginBottom: 14 }}>
          {/* App bar */}
          <div style={{ background: CC.ink, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>{typeIcon[card.type]}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', flex: 1 }}>{card.from}</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.4)' }}>{card.type.toUpperCase()}</span>
          </div>
          {/* Message body */}
          <div style={{ padding: '16px 14px', fontSize: 14, color: CC.ink, lineHeight: 1.6 }}>
            {card.message}
          </div>
        </div>

        {/* Explanation */}
        {answered !== null && (
          <div style={{
            padding: '14px', borderRadius: 14, marginBottom: 14,
            background: correct ? '#E8F4EA' : '#FEE8E6',
            borderLeft: `4px solid ${correct ? CC.green : CC.coral}`,
            animation: 'fadeIn .25s ease',
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: correct ? CC.greenInk : CC.coral, marginBottom: 4 }}>
              {correct ? '🎯 Correct!' : `❌ That was a ${card.isScam ? 'SCAM' : 'REAL'} message`}
            </div>
            <div style={{ fontSize: 13, color: CC.ink, lineHeight: 1.5 }}>{card.explain}</div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ padding: '0 16px 20px' }}>
        {answered === null ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => handleAnswer('real')} style={{
              flex: 1, padding: '14px 0', borderRadius: 16, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,.12)', color: '#fff', fontSize: 16, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>✅ REAL</button>
            <button onClick={() => handleAnswer('scam')} style={{
              flex: 1, padding: '14px 0', borderRadius: 16, border: 'none', cursor: 'pointer',
              background: CC.coral, color: '#fff', fontSize: 16, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>⚠️ SCAM</button>
          </div>
        ) : (
          <Btn kind="yellow" size="lg" full onClick={handleNext}>
            {idx + 1 >= SCAM_CARDS.length ? 'See final score →' : 'Next message →'}
          </Btn>
        )}
      </div>
    </Phone>
  )
}

// ─────────────────────────────────────────────────────────────────
// 5. ENHANCED NEED VS WANT
// ─────────────────────────────────────────────────────────────────
export function NeedVsWant() {
  const { goBack, dispatch } = useApp()
  const [idx, setIdx]         = useState(0)
  const [answered, setAnswered] = useState(null)
  const [score, setScore]     = useState(0)
  const [streak, setStreak]   = useState(0)
  const [done, setDone]       = useState(false)
  const [dragX, setDragX]     = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)

  const cards = NVW_CARDS
  const card  = cards[idx]

  const handleAnswer = (guess) => {
    if (answered) return
    setAnswered(guess)
    const correct = guess === card.answer
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1) }
    else setStreak(0)
  }

  const handleNext = () => {
    if (idx + 1 >= cards.length) {
      dispatch({ type: 'ADD_XP', amount: score * 5 })
      setDone(true)
    } else {
      setIdx(i => i + 1)
      setAnswered(null)
      setDragX(0)
    }
  }

  // Mouse drag
  const onMouseDown = (e) => { isDragging.current = true; startX.current = e.clientX }
  const onMouseMove = (e) => { if (isDragging.current) setDragX(e.clientX - startX.current) }
  const onMouseUp   = () => {
    isDragging.current = false
    if (dragX >  80) handleAnswer('need')
    else if (dragX < -80) handleAnswer('want')
    else setDragX(0)
  }

  if (done) {
    const pct = Math.round((score / cards.length) * 100)
    return (
      <Phone bg={CC.greenInk} style={{ color: '#fff' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', gap: 14 }}>
          <div style={{ fontSize: 56 }}>🛒</div>
          <div style={{ fontSize: 22, fontWeight: 900 }}>{pct >= 80 ? 'Smart spender!' : pct >= 60 ? 'Getting there!' : 'Keep practising!'}</div>
          <div style={{ fontSize: 44, fontWeight: 900, color: CC.yellow }}>{score}/{cards.length}</div>
          <div style={{ fontSize: 13, opacity: .8, textAlign: 'center', lineHeight: 1.5 }}>
            Knowing your needs from wants is the foundation of every budget. +{score * 5} XP earned!
          </div>
          <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 8 }}>
            <Btn kind="light" size="md" full onClick={() => { setIdx(0); setScore(0); setStreak(0); setAnswered(null); setDone(false) }}>Play again</Btn>
            <Btn kind="yellow" size="md" full onClick={goBack}>Back</Btn>
          </div>
        </div>
      </Phone>
    )
  }

  const tintLeft  = dragX < -30 ? `rgba(231,111,98,${Math.min(Math.abs(dragX)/150, .4)})` : 'transparent'
  const tintRight = dragX >  30 ? `rgba(63,142,92,${Math.min(dragX/150, .4)})` : 'transparent'

  return (
    <Phone bg={CC.greenInk} style={{ color: '#fff' }}>
      {/* HUD */}
      <div style={{ padding: '14px 18px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CircleBtn dark onClick={goBack}>‹</CircleBtn>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800 }}>Need vs. Want</div>
          <div style={{ fontSize: 11, opacity: .7 }}>Swipe or tap to sort</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 10, padding: '5px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: CC.yellow }}>🔥{streak}</div>
            <div style={{ fontSize: 9, opacity: .7 }}>streak</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 10, padding: '5px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 800 }}>{idx + 1}/{cards.length}</div>
            <div style={{ fontSize: 9, opacity: .7 }}>cards</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ height: 3, background: 'rgba(255,255,255,.15)', borderRadius: 2, overflow: 'hidden', margin: '0 18px 14px' }}>
        <div style={{ width: `${(idx / cards.length) * 100}%`, height: '100%', background: CC.yellow, transition: 'width .3s' }} />
      </div>

      {/* Drag tint overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 5,
        background: tintLeft !== 'transparent' ? tintLeft : tintRight }} />

      {/* Direction labels */}
      <div style={{ padding: '0 18px', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: CC.coral, opacity: dragX < -20 ? 1 : .35 }}>← WANT</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: CC.green, opacity: dragX > 20 ? 1 : .35 }}>NEED →</span>
      </div>

      {/* Card stack */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 18px', position: 'relative' }}>
        {/* Back card peek */}
        {idx + 1 < cards.length && (
          <div style={{ position: 'absolute', width: '85%', padding: 18, background: 'rgba(255,255,255,.12)', borderRadius: 22, transform: 'rotate(2deg) translateY(12px)', zIndex: 0 }}>
            <div style={{ fontSize: 32, textAlign: 'center' }}>{cards[idx + 1]?.emoji}</div>
          </div>
        )}

        {/* Front card */}
        <div
          onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
          style={{
            width: '100%', background: '#fff', borderRadius: 22, padding: 20,
            textAlign: 'center', cursor: answered ? 'default' : 'grab',
            transform: `rotate(${dragX * 0.04}deg) translateX(${dragX}px)`,
            transition: isDragging.current ? 'none' : 'transform .3s',
            boxShadow: '0 16px 40px rgba(0,0,0,.3)', zIndex: 2,
            userSelect: 'none',
            border: answered ? `3px solid ${card.answer === 'need' ? CC.green : CC.coral}` : '3px solid transparent',
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 10 }}>{card.emoji}</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: CC.ink }}>{card.item}</div>
          <div style={{ fontSize: 13, color: CC.ink3, marginTop: 4 }}>{card.price}</div>
          <div style={{ fontSize: 12, color: CC.ink3, marginTop: 2, fontStyle: 'italic' }}>{card.sub}</div>
          {answered && (
            <div style={{ marginTop: 12, padding: '8px 14px', borderRadius: 10, background: card.answer === 'need' ? '#E8F4EA' : '#FEE8E6', animation: 'fadeIn .2s ease' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: card.answer === 'need' ? CC.green : CC.coral }}>
                {answered === card.answer ? '✓ Correct! ' : '✗ '} This is a <b>{card.answer.toUpperCase()}</b>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ padding: '12px 18px 20px' }}>
        {answered === null ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => handleAnswer('want')} style={{ flex: 1, padding: '14px 0', borderRadius: 16, border: 'none', cursor: 'pointer', background: CC.coral, color: '#fff', fontSize: 16, fontWeight: 800 }}>← Want</button>
            <button onClick={() => handleAnswer('need')} style={{ flex: 1, padding: '14px 0', borderRadius: 16, border: 'none', cursor: 'pointer', background: CC.green, color: '#fff', fontSize: 16, fontWeight: 800 }}>Need →</button>
          </div>
        ) : (
          <Btn kind="yellow" size="lg" full onClick={handleNext}>
            {idx + 1 >= cards.length ? 'Finish →' : 'Next card →'}
          </Btn>
        )}
      </div>
    </Phone>
  )
}
