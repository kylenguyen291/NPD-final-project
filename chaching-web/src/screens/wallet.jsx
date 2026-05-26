import React, { useState } from 'react'
import { CC } from '../theme.js'
import { useApp } from '../context.jsx'
import { Phone, CCHeader, TabBar, Card, Btn, CircleBtn, Placeholder, SlideToPay, GardenScene } from '../components/index.jsx'

// ─── Shared sub-components ───────────────────────────────────────
function BucketPill({ icon, label, amount }) {
  return (
    <div style={{ flex:1, background:'rgba(255,255,255,.18)', padding:'8px 10px', borderRadius:12, display:'flex', flexDirection:'column', gap:1 }}>
      <div style={{ fontSize:11, opacity:.85, display:'flex', alignItems:'center', gap:4 }}>
        <span>{icon}</span><span>{label}</span>
      </div>
      <div style={{ fontSize:15, fontWeight:800, letterSpacing:-.2 }}>{amount}<span style={{ fontSize:10, opacity:.7, marginLeft:2 }}>₫</span></div>
    </div>
  )
}

function QuickAction({ icon, label, accent, onClick }) {
  return (
    <div onClick={onClick} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, cursor:'pointer' }}>
      <div style={{
        width:52, height:52, borderRadius:26,
        background: accent ? CC.green : '#fff', color: accent ? '#fff' : CC.green,
        display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:600,
        boxShadow: accent ? '0 4px 14px rgba(63,142,92,.3)' : '0 1px 0 rgba(0,0,0,.04),0 4px 12px rgba(27,34,24,.05)',
      }}>{icon}</div>
      <div style={{ fontSize:11, fontWeight:600, color:CC.ink2 }}>{label}</div>
    </div>
  )
}

function GoalRing({ name, pct, left, tone, onClick }) {
  const r = 28, c = 2 * Math.PI * r
  const dash = (pct/100) * c
  return (
    <Card padding={12} radius={16} style={{ flex:1, display:'flex', alignItems:'center', gap:10, cursor:'pointer' }} onClick={onClick}>
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} stroke={CC.mintDeep} strokeWidth="6" fill="none"/>
        <circle cx="32" cy="32" r={r} stroke={tone} strokeWidth="6" fill="none"
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round" transform="rotate(-90 32 32)"/>
        <text x="32" y="36" textAnchor="middle" fontSize="13" fontWeight="700" fill={CC.ink}>{pct}%</text>
      </svg>
      <div style={{ minWidth:0 }}>
        <div style={{ fontSize:12, fontWeight:700, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{name}</div>
        <div style={{ fontSize:11, color:CC.ink3, marginTop:2 }}>{left} ₫ left</div>
      </div>
    </Card>
  )
}

// ─── 1. Wallet Home ───────────────────────────────────────────────
export function WalletHome() {
  const { navigate, state } = useApp()
  const { spend, save, give } = state.wallet
  const total = spend + save + give
  const fmtK = n => n >= 1000000 ? (n/1000000).toFixed(1).replace('.0','') + 'M' : Math.round(n/1000) + 'K'

  return (
    <Phone bg={CC.mint}>
      <CCHeader name={state.user.name} />
      <div style={{ flex:1, overflow:'auto', padding:'6px 16px 0' }}>
        {/* Balance hero */}
        <Card padding={18} radius={24} style={{ background:`linear-gradient(160deg,${CC.green} 0%,${CC.greenDeep} 100%)`, color:'#fff', boxShadow:'0 8px 24px rgba(63,142,92,.25)' }}>
          <div style={{ fontSize:12, opacity:.85, fontWeight:500 }}>Tổng số dư · Total balance</div>
          <div style={{ fontSize:32, fontWeight:800, letterSpacing:-.5, lineHeight:1.1, marginTop:2 }}>
            {new Intl.NumberFormat('vi-VN').format(total)} <span style={{ fontSize:16, opacity:.8, fontWeight:600 }}>₫</span>
          </div>
          <div style={{ display:'flex', gap:6, marginTop:14 }}>
            <BucketPill icon="💸" label="Spend" amount={fmtK(spend)}/>
            <BucketPill icon="🐷" label="Save"  amount={fmtK(save)}/>
            <BucketPill icon="❤️" label="Give"  amount={fmtK(give)}/>
          </div>
        </Card>

        {/* Quick actions */}
        <div style={{ display:'flex', justifyContent:'space-between', padding:'18px 6px 4px' }}>
          <QuickAction icon="↗" label="Send"    onClick={() => navigate('TopUp')} />
          <QuickAction icon="↙" label="Request" onClick={() => navigate('TopUp')} />
          <QuickAction icon="⬡" label="Scan QR" accent onClick={() => navigate('ScanQR')} />
          <QuickAction icon="＋" label="Top-up" onClick={() => navigate('TopUp')} />
        </div>

        {/* Savings goals */}
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'14px 4px 8px' }}>
          <div style={{ fontSize:15, fontWeight:700 }}>Savings goals</div>
          <div style={{ fontSize:12, color:CC.green, fontWeight:600, cursor:'pointer' }} onClick={() => navigate('SavingsGoals')}>See all →</div>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <GoalRing name="Bicycle 🚲" pct={64} left="720K"  tone={CC.green}     onClick={() => navigate('SavingsGoals')} />
          <GoalRing name="AirPods 🎧" pct={28} left="1,8M"  tone={CC.yellowDeep} onClick={() => navigate('SavingsGoals')} />
        </div>

        {/* This week */}
        <div style={{ marginTop:16 }}>
          <Card padding={14} radius={20} onClick={() => navigate('SpendingSummary')} style={{ cursor:'pointer' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10 }}>
              <div style={{ fontSize:14, fontWeight:700 }}>This week's spending</div>
              <div style={{ fontSize:11, color:CC.ink3 }}>Mon–Sun</div>
            </div>
            <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:56 }}>
              {[24,38,22,60,14,50,30].map((h,i) => (
                <div key={i} style={{ flex:1, height:`${h}%`, background: i===3 ? CC.coral : CC.mintDeep, borderRadius:4 }}/>
              ))}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontSize:10, color:CC.ink3 }}>
              {['M','T','W','T','F','S','S'].map((d,i) => <span key={i}>{d}</span>)}
            </div>
          </Card>
        </div>

        {/* Tip of the day */}
        <div onClick={() => navigate('DiscoverFeed')} style={{
          marginTop:14, marginBottom:16, padding:'12px 14px', borderRadius:14,
          background:'#fff', display:'flex', alignItems:'center', gap:10,
          border:`1px dashed ${CC.mintEdge}`, cursor:'pointer',
        }}>
          <span style={{ fontSize:18 }}>💡</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, color:CC.ink3, fontWeight:600, letterSpacing:.3 }}>TIP OF THE DAY · 60s</div>
            <div style={{ fontSize:13, fontWeight:600, marginTop:1 }}>What is compound interest?</div>
          </div>
          <span style={{ color:CC.green, fontSize:18 }}>›</span>
        </div>
      </div>
      <TabBar active="wallet"/>
    </Phone>
  )
}

// ─── 2. Scan QR ───────────────────────────────────────────────────
export function ScanQR() {
  const { navigate, goBack } = useApp()
  const [tab, setTab] = useState('Scan')
  return (
    <Phone bg="#0E1410" style={{ color:'#fff' }}>
      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 45%,#2a3528 0%,#0E1410 70%)' }}/>
        <div style={{ position:'absolute', bottom:'32%', left:'20%', right:'20%', height:80, borderRadius:4, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.05)' }}/>
        <div style={{ position:'absolute', bottom:'46%', left:'32%', right:'32%', height:14, background:'rgba(255,255,255,.05)' }}/>

        {/* QR frame */}
        <div style={{ position:'absolute', top:'28%', left:'50%', transform:'translateX(-50%)', width:220, height:220, borderRadius:16, background:'rgba(0,0,0,.35)' }}>
          <div style={{ position:'absolute', inset:24, borderRadius:8, background:'#fff', padding:8 }}>
            <div style={{ width:'100%', height:'100%', backgroundColor:'#fff', backgroundImage:'radial-gradient(circle at 20% 20%,#000 0 8%,transparent 8%),radial-gradient(circle at 80% 20%,#000 0 8%,transparent 8%),radial-gradient(circle at 20% 80%,#000 0 8%,transparent 8%)', maskImage:'repeating-conic-gradient(#000 0 25%,transparent 0 50%)', maskSize:'14px 14px', WebkitMaskImage:'repeating-conic-gradient(#000 0 25%,transparent 0 50%)', WebkitMaskSize:'14px 14px' }}/>
          </div>
          {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h]) => (
            <div key={v+h} style={{ position:'absolute', [v]:-2, [h]:-2, width:28, height:28,
              borderTop: v==='top'?`3px solid ${CC.yellow}`:'none', borderBottom: v==='bottom'?`3px solid ${CC.yellow}`:'none',
              borderLeft: h==='left'?`3px solid ${CC.yellow}`:'none', borderRight: h==='right'?`3px solid ${CC.yellow}`:'none', borderRadius:6 }}/>
          ))}
        </div>

        <div onClick={goBack} style={{ position:'absolute', top:16, left:16, width:36, height:36, borderRadius:18, background:'rgba(0,0,0,.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, color:'#fff', cursor:'pointer' }}>✕</div>
        <div style={{ position:'absolute', top:18, left:0, right:0, textAlign:'center', fontSize:16, fontWeight:700, color:'#fff' }}>Scan to pay</div>
        <div style={{ position:'absolute', bottom:100, left:24, right:24, textAlign:'center', color:'rgba(255,255,255,.7)', fontSize:13 }}>Point camera at a VietQR code</div>

        {/* Detected mock - tap to go to confirm */}
        <div onClick={() => navigate('PayConfirm')} style={{ position:'absolute', bottom:170, left:24, right:24, background:'rgba(63,142,92,.9)', borderRadius:14, padding:'12px 16px', display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
          <span style={{ fontSize:20 }}>✓</span>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>Highland Coffee detected</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,.8)' }}>Tap to continue →</div>
          </div>
        </div>

        {/* Dock */}
        <div style={{ position:'absolute', bottom:18, left:18, right:18, background:'rgba(255,255,255,.08)', backdropFilter:'blur(20px)', borderRadius:18, padding:6, display:'flex', gap:6 }}>
          {['Scan','My QR','Photo'].map(t => (
            <div key={t} onClick={() => setTab(t)} style={{ flex:1, height:36, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:600, background: t===tab ? '#fff' : 'transparent', color: t===tab ? CC.greenInk : 'rgba(255,255,255,.7)', cursor:'pointer' }}>{t}</div>
          ))}
        </div>
      </div>
    </Phone>
  )
}

// ─── 3. Pay Confirm ───────────────────────────────────────────────
export function PayConfirm() {
  const { navigate, goBack, dispatch } = useApp()
  const handleComplete = () => {
    dispatch({ type:'COMPLETE_PAYMENT', amount:65000, merchant:'Highland Coffee Hai Bà Trưng' })
    navigate('Categorize')
  }
  return (
    <Phone bg="rgba(14,20,16,.55)">
      <div style={{ flex:1, position:'relative' }}>
        <div style={{ position:'absolute', inset:0, background:'#1d2620', opacity:.9 }}/>
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.45)' }}/>
        <div style={{
          position:'absolute', left:0, right:0, bottom:0,
          background:'#fff', borderRadius:'24px 24px 0 0',
          padding:'14px 20px 28px', boxShadow:'0 -10px 40px rgba(0,0,0,.25)',
        }}>
          <div style={{ width:36, height:4, background:CC.lineHard, borderRadius:2, margin:'0 auto 14px' }}/>
          <div style={{ textAlign:'center', marginBottom:12 }}>
            <div style={{ fontSize:12, color:CC.ink3, fontWeight:600 }}>PAYING TO</div>
            <div style={{ fontSize:17, fontWeight:700, marginTop:2 }}>Highland Coffee · Hai Bà Trưng</div>
          </div>
          <div style={{ background:CC.mint, borderRadius:18, padding:'18px 16px', display:'flex', alignItems:'baseline', justifyContent:'center', gap:6 }}>
            <div style={{ fontSize:40, fontWeight:800, color:CC.greenInk, letterSpacing:-1 }}>65.000</div>
            <div style={{ fontSize:16, fontWeight:700, color:CC.green }}>₫</div>
          </div>
          <div style={{ marginTop:12, padding:'12px 14px', borderRadius:14, border:`1px solid ${CC.line}`, display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:CC.mint, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>💸</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:CC.ink3 }}>Source</div>
              <div style={{ fontSize:13, fontWeight:700 }}>Spend bucket · 320.000 ₫</div>
            </div>
            <span style={{ color:CC.ink3, fontSize:14 }}>⇅</span>
          </div>
          <div style={{ marginTop:14 }}>
            <SlideToPay onComplete={handleComplete}/>
          </div>
          <div style={{ textAlign:'center', fontSize:11, color:CC.ink3, marginTop:10 }}>🔒 Secured with PIN · No fees</div>
        </div>
      </div>
    </Phone>
  )
}

// ─── 4. Categorize ────────────────────────────────────────────────
export function Categorize() {
  const { navigate, replace, dispatch, state } = useApp()
  const [selected, setSelected] = useState(null)
  const [emotion, setEmotion] = useState(null)
  const cats = [
    { icon:'🍔', name:'Food & Drink' }, { icon:'🛍️', name:'Shopping' },
    { icon:'🎮', name:'Entertainment' }, { icon:'🚗', name:'Transport' },
    { icon:'📚', name:'Education' }, { icon:'💊', name:'Health' },
    { icon:'❤️', name:'Giving' }, { icon:'➕', name:'Other' },
  ]
  const amt = state.pendingPayment?.amount || 65000
  const merchant = state.pendingPayment?.merchant || 'Highland Coffee'

  const handleSelect = (cat) => {
    setSelected(cat.icon)
    setTimeout(() => {
      dispatch({ type:'CATEGORIZE_PAYMENT', icon:cat.icon, name:cat.name })
      replace('WalletHome')
    }, 600)
  }

  return (
    <Phone bg="rgba(14,20,16,.55)">
      <div style={{ flex:1, position:'relative' }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 28%,rgba(123,190,130,.5) 0%,transparent 45%),#1d2620` }}/>
        {/* Success checkmark */}
        <div style={{ position:'absolute', top:80, left:'50%', transform:'translateX(-50%)', width:64, height:64, borderRadius:32, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, color:CC.green, boxShadow:'0 8px 24px rgba(0,0,0,.2)' }}>✓</div>
        <div style={{ position:'absolute', top:152, left:0, right:0, textAlign:'center', color:'#fff' }}>
          <div style={{ fontSize:22, fontWeight:800 }}>−{new Intl.NumberFormat('vi-VN').format(amt)} ₫</div>
          <div style={{ fontSize:12, opacity:.85, marginTop:2 }}>Paid {merchant}</div>
        </div>
        {/* Sheet */}
        <div style={{ position:'absolute', left:0, right:0, bottom:0, background:'#fff', borderRadius:'24px 24px 0 0', padding:'14px 18px 26px', animation:'slideUp .3s ease' }}>
          <div style={{ width:36, height:4, background:CC.lineHard, borderRadius:2, margin:'0 auto 12px' }}/>
          <div style={{ fontSize:18, fontWeight:800, textAlign:'center' }}>What was this for?</div>
          <div style={{ fontSize:12, color:CC.ink3, textAlign:'center', marginTop:2 }}>One tap. We won't comment.</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:14 }}>
            {cats.map(cat => (
              <div key={cat.icon} onClick={() => handleSelect(cat)} style={{
                padding:'12px 10px', borderRadius:14,
                background: selected===cat.icon ? CC.green : CC.mint,
                color: selected===cat.icon ? '#fff' : CC.ink,
                display:'flex', alignItems:'center', gap:8, cursor:'pointer',
                border: selected===cat.icon ? 'none' : `1px solid ${CC.line}`,
                boxShadow: selected===cat.icon ? '0 4px 12px rgba(63,142,92,.25)' : 'none',
                transition:'all .15s',
              }}>
                <span style={{ fontSize:20 }}>{cat.icon}</span>
                <span style={{ fontSize:13, fontWeight:700 }}>{cat.name}</span>
              </div>
            ))}
          </div>
          {/* Emotion row */}
          <div style={{ marginTop:14, padding:'10px 14px', borderRadius:14, background:CC.mint, display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ fontSize:11, color:CC.ink3, fontWeight:600 }}>FEEL?</div>
            <div style={{ display:'flex', gap:10, marginLeft:'auto', fontSize:22 }}>
              {['😞','😐','😊'].map(e => (
                <span key={e} onClick={() => setEmotion(e)} style={{ cursor:'pointer', filter: emotion && emotion!==e ? 'grayscale(1)' : 'none', opacity: emotion && emotion!==e ? .4 : 1, transition:'all .15s' }}>{e}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Phone>
  )
}

// ─── 5. Spending Summary ──────────────────────────────────────────
export function SpendingSummary() {
  const { navigate, goBack } = useApp()
  const [period, setPeriod] = useState('Month')
  const rows = [
    { i:'🍔', name:'Food & Drink',  amt:480, pct:38, band:CC.band.red,    delta:'↑ 120K', d:'up'   },
    { i:'🛍️', name:'Shopping',      amt:280, pct:23, band:CC.band.orange, delta:'↓ 40K',  d:'down' },
    { i:'🎮', name:'Entertainment', amt:200, pct:16, band:CC.band.yellow, delta:'↑ 8K',   d:'up'   },
    { i:'🚗', name:'Transport',     amt:120, pct:10, band:CC.band.green,  delta:'→',       d:'flat' },
    { i:'📚', name:'Education',     amt:80,  pct:6,  band:CC.band.green,  delta:'↑ 30K',  d:'up'   },
    { i:'💊', name:'Health',        amt:50,  pct:4,  band:CC.band.green,  delta:'→',       d:'flat' },
    { i:'➕', name:'Other',         amt:30,  pct:2,  band:CC.band.gray,   delta:'↓ 10K',  d:'down' },
  ]
  return (
    <Phone bg={CC.mint}>
      <div style={{ padding:'12px 16px 6px', display:'flex', alignItems:'center', gap:10 }}>
        <CircleBtn onClick={goBack}>‹</CircleBtn>
        <div style={{ flex:1, fontSize:17, fontWeight:800 }}>Spending</div>
        <CircleBtn>📊</CircleBtn>
      </div>
      <div style={{ flex:1, overflow:'auto', padding:'0 16px' }}>
        {/* Segmented */}
        <div style={{ display:'flex', background:'#fff', borderRadius:12, padding:3, border:`1px solid ${CC.line}` }}>
          {['Week','Month','Year'].map(t => (
            <div key={t} onClick={() => setPeriod(t)} style={{ flex:1, padding:'8px 0', textAlign:'center', fontSize:13, fontWeight:700, borderRadius:10, background: t===period ? CC.greenInk : 'transparent', color: t===period ? '#fff' : CC.ink2, cursor:'pointer', transition:'all .2s' }}>{t}</div>
          ))}
        </div>
        {/* Total */}
        <Card padding={16} radius={20} style={{ marginTop:12 }}>
          <div style={{ fontSize:11, color:CC.ink3, fontWeight:600 }}>TOTAL · MAY 2026</div>
          <div style={{ display:'flex', alignItems:'baseline', gap:6, marginTop:2 }}>
            <div style={{ fontSize:30, fontWeight:800, letterSpacing:-.5 }}>1.240.000</div>
            <div style={{ fontSize:14, fontWeight:700, color:CC.green }}>₫</div>
            <div style={{ marginLeft:'auto', fontSize:12, color:CC.coral, fontWeight:600 }}>↑ 8% vs April</div>
          </div>
          <div style={{ fontSize:12, color:CC.ink3, marginTop:2 }}>43 transactions</div>
          <div style={{ display:'flex', height:10, borderRadius:5, overflow:'hidden', marginTop:10 }}>
            {rows.map((r,i) => <div key={i} style={{ width:`${r.pct}%`, background:r.band }}/>)}
          </div>
        </Card>
        {/* Category list */}
        <div style={{ marginTop:10, background:'#fff', borderRadius:18, padding:'4px 0', overflow:'hidden' }}>
          {rows.map((r,i) => {
            const dcolor = r.d==='up' ? CC.coral : r.d==='down' ? CC.green : CC.ink3
            return (
              <div key={i} onClick={() => navigate('CategoryDetail')} style={{ display:'flex', alignItems:'center', padding:'10px 14px', borderBottom: i===rows.length-1 ? 'none' : `1px solid ${CC.line}`, cursor:'pointer' }}>
                <div style={{ width:32, height:32, borderRadius:10, background:CC.mint, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{r.i}</div>
                <div style={{ flex:1, marginLeft:10 }}>
                  <div style={{ fontSize:13, fontWeight:700 }}>{r.name}</div>
                  <div style={{ height:4, background:CC.mintDeep, borderRadius:2, overflow:'hidden', marginTop:4 }}>
                    <div style={{ width:`${r.pct*2.4}%`, height:'100%', background:r.band }}/>
                  </div>
                </div>
                <div style={{ textAlign:'right', marginLeft:10 }}>
                  <div style={{ fontSize:13, fontWeight:700 }}>{r.amt}K <span style={{ color:CC.ink3, fontWeight:500, fontSize:11 }}>{r.pct}%</span></div>
                  <div style={{ fontSize:10, color:dcolor, fontWeight:600, marginTop:2 }}>{r.delta}</div>
                </div>
                <div style={{ width:8, height:8, borderRadius:4, background:r.band, marginLeft:10 }}/>
              </div>
            )
          })}
        </div>
      </div>
      <TabBar active="wallet"/>
    </Phone>
  )
}

// ─── 6. Category Detail ───────────────────────────────────────────
export function CategoryDetail() {
  const { navigate, goBack } = useApp()
  const txns = [
    { d:'May 25', m:'Highland Coffee Hai Bà Trưng', a:'65.000', e:'😊' },
    { d:'May 24', m:'Mixue Cầu Giấy',               a:'38.000', e:null },
    { d:'May 22', m:'Bún Chả Hương Liên',           a:'55.000', e:'😊' },
    { d:'May 21', m:'Grab Food · KFC',              a:'85.000', e:'😐' },
    { d:'May 20', m:'Phúc Long Times City',         a:'72.000', e:null },
    { d:'May 19', m:'Bánh Mì 25',                   a:'25.000', e:'😊' },
    { d:'May 18', m:'Highlands Royal City',         a:'68.000', e:null },
    { d:'May 16', m:'The Coffee House',             a:'72.000', e:'😊' },
  ]
  return (
    <Phone bg={CC.mint}>
      <div style={{ padding:'12px 16px 6px', display:'flex', alignItems:'center', gap:10 }}>
        <CircleBtn onClick={goBack}>‹</CircleBtn>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:CC.ink3, fontWeight:600 }}>SPENDING ▸ MAY 2026</div>
          <div style={{ fontSize:17, fontWeight:800, display:'flex', alignItems:'center', gap:6 }}>🍔 Food & Drink</div>
        </div>
      </div>
      <div style={{ flex:1, overflow:'auto', padding:'0 16px' }}>
        <Card padding={14} radius={18} style={{ background:CC.greenInk, color:'#fff' }}>
          <div style={{ fontSize:11, opacity:.7, fontWeight:600 }}>TOTAL THIS MONTH</div>
          <div style={{ display:'flex', alignItems:'baseline', gap:6, marginTop:2 }}>
            <div style={{ fontSize:28, fontWeight:800 }}>480.000</div>
            <div style={{ fontSize:13, opacity:.8 }}>₫ · 18 txns</div>
            <div style={{ marginLeft:'auto', fontSize:12, color:CC.yellow, fontWeight:600 }}>↑ 120K vs Apr</div>
          </div>
          <div style={{ display:'flex', gap:3, alignItems:'flex-end', height:32, marginTop:12 }}>
            {[20,36,12,24,48,60,28,18,32,70,22,14,26,38,16].map((h,i) => (
              <div key={i} style={{ flex:1, height:`${h}%`, background:'rgba(245,215,90,.7)', borderRadius:1 }}/>
            ))}
          </div>
        </Card>
        <div style={{ marginTop:12, background:'#fff', borderRadius:18, overflow:'hidden' }}>
          {txns.map((t,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', padding:'12px 14px', borderBottom: i===txns.length-1 ? 'none' : `1px solid ${CC.line}` }}>
              <div style={{ width:44, fontSize:11, color:CC.ink3, fontWeight:600 }}>{t.d}</div>
              <div style={{ flex:1, marginLeft:4 }}>
                <div style={{ fontSize:13, fontWeight:600 }}>{t.m}</div>
                {t.e && <div style={{ fontSize:14, marginTop:2 }}>{t.e}</div>}
              </div>
              <div style={{ fontSize:13, fontWeight:800 }}>−{t.a}</div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  )
}

// ─── 7. Savings Goals ─────────────────────────────────────────────
export function SavingsGoals() {
  const { navigate, goBack, state } = useApp()
  const goals = state.wallet.goals
  return (
    <Phone bg={CC.mint}>
      <div style={{ padding:'12px 16px 6px', display:'flex', alignItems:'center', gap:10 }}>
        <CircleBtn onClick={goBack}>‹</CircleBtn>
        <div style={{ flex:1, fontSize:17, fontWeight:800 }}>Savings goals</div>
        <CircleBtn bg={CC.green} style={{ color:'#fff' }}>＋</CircleBtn>
      </div>
      <div style={{ flex:1, overflow:'auto', padding:'4px 16px' }}>
        {/* Primary goal */}
        <Card padding={16} radius={22} style={{ background:`linear-gradient(135deg,${CC.green},${CC.greenDeep})`, color:'#fff', marginBottom:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ fontSize:28 }}>🚲</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:800 }}>Bicycle</div>
              <div style={{ fontSize:11, opacity:.8 }}>Target · Jul 2026</div>
            </div>
            <div style={{ fontSize:20, fontWeight:800 }}>64%</div>
          </div>
          <div style={{ height:8, background:'rgba(255,255,255,.2)', borderRadius:4, overflow:'hidden', marginTop:12 }}>
            <div style={{ width:'64%', height:'100%', background:CC.yellow }}/>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, fontSize:12 }}>
            <span style={{ opacity:.8 }}>1.280.000 / 2.000.000 ₫</span>
            <span style={{ fontWeight:700 }}>720K left</span>
          </div>
          <div style={{ display:'flex', gap:8, marginTop:12 }}>
            <Btn kind="yellow" size="sm" style={{ flex:1 }}>+ Add money</Btn>
            <Btn kind="dark" size="sm" style={{ flex:1, background:'rgba(255,255,255,.15)' }}>Details</Btn>
          </div>
        </Card>
        {/* Other goals */}
        {[{ icon:'🎧', name:'AirPods Gen 4', pct:28, cur:'700.000', tgt:'2.500.000', tone:CC.yellowDeep, rule:'Auto 20%' },
          { icon:'📷', name:'Camera (used)',  pct:12, cur:'600.000', tgt:'5.000.000', tone:CC.orange,    rule:'Manual' }
        ].map(g => (
          <Card key={g.name} padding={14} radius={18} style={{ marginBottom:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:38, height:38, borderRadius:12, background:CC.mint, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{g.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700 }}>{g.name}</div>
                <div style={{ fontSize:11, color:CC.ink3 }}>{g.rule}</div>
              </div>
              <div style={{ fontSize:16, fontWeight:800 }}>{g.pct}%</div>
            </div>
            <div style={{ height:6, background:CC.mintDeep, borderRadius:3, overflow:'hidden', marginTop:10 }}>
              <div style={{ width:`${g.pct}%`, height:'100%', background:g.tone }}/>
            </div>
            <div style={{ fontSize:11, color:CC.ink3, marginTop:6 }}>{g.cur} / {g.tgt} ₫</div>
          </Card>
        ))}
        {/* 3-goal cap hint */}
        <div style={{ marginTop:4, padding:'18px 16px', borderRadius:18, border:`1.5px dashed ${CC.mintEdge}`, textAlign:'center', fontSize:13, color:CC.ink3, marginBottom:16 }}>
          You can have <b style={{ color:CC.ink }}>3 active goals</b> at once · ✓ ✓ ✓
        </div>
      </div>
      <TabBar active="wallet"/>
    </Phone>
  )
}

// ─── 8. Top-up ────────────────────────────────────────────────────
export function TopUp() {
  const { goBack } = useApp()
  return (
    <Phone bg={CC.mint}>
      <div style={{ padding:'12px 16px 6px', display:'flex', alignItems:'center', gap:10 }}>
        <CircleBtn onClick={goBack}>‹</CircleBtn>
        <div style={{ flex:1, fontSize:17, fontWeight:800 }}>Top up</div>
      </div>
      <div style={{ flex:1, overflow:'auto', padding:'6px 16px' }}>
        <div style={{ fontSize:13, color:CC.ink2, lineHeight:1.45 }}>
          Send this account number to a parent or guardian. Funds land in your <b>Spend</b> bucket in a few minutes.
        </div>
        <Card padding={20} radius={24} style={{ marginTop:14, textAlign:'center' }}>
          <div style={{ fontSize:11, color:CC.ink3, fontWeight:700, letterSpacing:1 }}>YOUR ACCOUNT</div>
          <div style={{ fontSize:13, color:CC.ink2, marginTop:4 }}>VPBank · Cha-Ching Virtual</div>
          <div style={{ marginTop:10, fontSize:26, fontWeight:800, letterSpacing:2, color:CC.greenInk }}>0801 2294 6651</div>
          <div style={{ fontSize:12, color:CC.ink3, marginTop:4 }}>KYLE NGUYEN · CHACHING</div>
          {/* QR mockup */}
          <div style={{ width:140, height:140, margin:'16px auto 8px', background:'#fff', border:`1px solid ${CC.line}`, borderRadius:14, padding:8 }}>
            <div style={{ width:'100%', height:'100%', background:'#000', maskImage:'repeating-conic-gradient(#000 0% 25%,transparent 0% 50%)', WebkitMaskImage:'repeating-conic-gradient(#000 0% 25%,transparent 0% 50%)', maskSize:'10px 10px', WebkitMaskSize:'10px 10px' }}/>
          </div>
          <div style={{ fontSize:11, color:CC.ink3 }}>Scan with any Vietnamese bank app</div>
        </Card>
        <div style={{ display:'flex', gap:10, marginTop:14 }}>
          <Btn kind="primary" size="md" style={{ flex:1 }}>📋 Copy number</Btn>
          <Btn kind="light" size="md" style={{ flex:1 }}>↗ Share on Zalo</Btn>
        </div>
        <div style={{ marginTop:18, padding:14, borderRadius:14, background:'#fff', display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
          <span style={{ fontSize:20 }}>💡</span>
          <div style={{ fontSize:12, color:CC.ink2, lineHeight:1.4, flex:1 }}>Tết lì xì season? Ask parents to top up here — never share your PIN.</div>
        </div>
      </div>
      <TabBar active="wallet"/>
    </Phone>
  )
}
