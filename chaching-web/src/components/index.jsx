import React, { useRef, useState, useEffect } from 'react'
import { CC, CCFont } from '../theme.js'
import { useApp } from '../context.jsx'

// ─── Phone wrapper ───────────────────────────────────────────────
export function Phone({ children, bg = CC.mint, style = {} }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      paddingTop: 54, paddingBottom: 0,
      fontFamily: CCFont, color: CC.ink, fontSize: 14,
      WebkitFontSmoothing: 'antialiased',
      boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative',
      ...style,
    }}>{children}</div>
  )
}

// ─── Header bar ─────────────────────────────────────────────────
export function CCHeader({ name = 'Kyle', dark = false }) {
  const { navigate } = useApp()
  const ink = dark ? '#fff' : CC.ink
  return (
    <div style={{ display:'flex', alignItems:'center', padding:'14px 20px 10px' }}>
      <div style={{
        width:38, height:38, borderRadius:19,
        background:'linear-gradient(135deg,#F5D75A,#E5B924)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:20, marginRight:10, cursor:'pointer',
      }} onClick={() => navigate('ProfileHome')}>🧑‍🎓</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:12, color:dark?'rgba(255,255,255,.7)':CC.ink3, letterSpacing:.2 }}>Xin chào</div>
        <div style={{ fontSize:17, fontWeight:700, color:ink, lineHeight:1.1 }}>{name} 👋</div>
      </div>
      <CircleBtn dark={dark}>🔔</CircleBtn>
      <div style={{ width:8 }} />
      <CircleBtn dark={dark} onClick={() => navigate('ProfileHome')}>⚙️</CircleBtn>
    </div>
  )
}

// ─── Circle button ───────────────────────────────────────────────
export function CircleBtn({ children, bg, size = 36, dark = false, onClick, style = {} }) {
  const bgColor = bg || (dark ? 'rgba(255,255,255,.15)' : '#fff')
  return (
    <div onClick={onClick} style={{
      width:size, height:size, borderRadius:size/2, background:bgColor,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:16, boxShadow:'0 1px 2px rgba(27,34,24,.06)',
      border: dark ? 'none' : `1px solid ${CC.line}`,
      cursor: onClick ? 'pointer' : 'default',
      flexShrink:0,
      ...style,
    }}>{children}</div>
  )
}

// ─── Tab bar ────────────────────────────────────────────────────
export function TabBar({ active = 'wallet' }) {
  const { navigateTab } = useApp()
  const tabs = [
    { id:'WalletHome',   label:'Wallet',   icon:'💳' },
    { id:'DiscoverFeed', label:'Discover', icon:'📺' },
    { id:'LearnHome',    label:'Learn',    icon:'🎓' },
    { id:'ProfileHome',  label:'Profile',  icon:'👤' },
  ]
  const activeMap = { wallet:'WalletHome', discover:'DiscoverFeed', learn:'LearnHome', profile:'ProfileHome' }
  const currentId = activeMap[active] || active
  return (
    <div style={{
      display:'flex', background:'#fff', borderTop:`1px solid ${CC.line}`,
      padding:'8px 8px 18px', gap:4, flexShrink:0,
    }}>
      {tabs.map(t => {
        const on = t.id === currentId || (active === t.id)
        return (
          <div key={t.id} onClick={() => navigateTab(t.id)} style={{
            flex:1, display:'flex', flexDirection:'column',
            alignItems:'center', gap:2, padding:'4px 0',
            color: on ? CC.green : CC.ink3, cursor:'pointer',
          }}>
            <div style={{
              width:44, height:28, borderRadius:14,
              background: on ? CC.mint : 'transparent',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:18,
            }}>{t.icon}</div>
            <div style={{ fontSize:11, fontWeight: on ? 700 : 500 }}>{t.label}</div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Generic card ────────────────────────────────────────────────
export function Card({ children, style = {}, padding = 16, radius = 20, onClick }) {
  return (
    <div onClick={onClick} style={{
      background:'#fff', borderRadius:radius, padding,
      boxShadow:'0 1px 0 rgba(27,34,24,.04), 0 6px 20px rgba(27,34,24,.05)',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  )
}

// ─── Pill button ─────────────────────────────────────────────────
export function Btn({ children, kind='primary', size='md', style={}, full=false, onClick }) {
  const sizes = { sm:{h:32,fs:13,px:14}, md:{h:44,fs:15,px:18}, lg:{h:52,fs:16,px:22} }[size]
  const styles = {
    primary: { bg:CC.green,    color:'#fff' },
    yellow:  { bg:CC.yellow,   color:CC.greenInk },
    ghost:   { bg:'transparent', color:CC.green, border:`1.5px solid ${CC.green}` },
    light:   { bg:CC.mint,     color:CC.greenInk },
    dark:    { bg:CC.greenInk, color:'#fff' },
  }[kind]
  return (
    <div onClick={onClick} style={{
      height:sizes.h, padding:`0 ${sizes.px}px`, borderRadius:12,
      background:styles.bg, color:styles.color, fontSize:sizes.fs, fontWeight:700,
      display: full ? 'flex' : 'inline-flex',
      width: full ? '100%' : undefined,
      alignItems:'center', justifyContent:'center', gap:8,
      border: styles.border || 'none', boxSizing:'border-box', cursor:'pointer',
      userSelect:'none',
      ...style,
    }}>{children}</div>
  )
}

// ─── Placeholder ─────────────────────────────────────────────────
export function Placeholder({ label, height=120, dark=false }) {
  const stripe = dark ? 'rgba(255,255,255,.06)' : 'rgba(63,142,92,.07)'
  const base   = dark ? 'rgba(255,255,255,.04)' : 'rgba(63,142,92,.04)'
  return (
    <div style={{
      height, borderRadius:16, overflow:'hidden',
      background:`repeating-linear-gradient(135deg,${base} 0 12px,${stripe} 12px 24px)`,
      display:'flex', alignItems:'center', justifyContent:'center',
      color: dark ? 'rgba(255,255,255,.7)' : CC.ink3,
      fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', fontSize:11, letterSpacing:1,
      border:`1px dashed ${dark?'rgba(255,255,255,.18)':'rgba(63,142,92,.2)'}`,
    }}>{label}</div>
  )
}

// ─── Progress bar (onboarding) ───────────────────────────────────
export function ProgressBar({ step, total }) {
  const { goBack } = useApp()
  return (
    <div style={{ padding:'14px 24px 0', display:'flex', alignItems:'center', gap:10 }}>
      <CircleBtn onClick={goBack}>‹</CircleBtn>
      <div style={{ flex:1, height:6, background:CC.mintDeep, borderRadius:3, overflow:'hidden' }}>
        <div style={{ width:`${(step/total)*100}%`, height:'100%', background:CC.green }}/>
      </div>
      <div style={{ fontSize:12, color:CC.ink3, fontWeight:600 }}>{step}/{total}</div>
    </div>
  )
}

// ─── Slide-to-Pay ────────────────────────────────────────────────
export function SlideToPay({ onComplete }) {
  const trackRef = useRef(null)
  const [x, setX] = useState(0)
  const [maxX, setMaxX] = useState(0)
  const [done, setDone] = useState(false)
  const dragging = useRef(false)
  const startX  = useRef(0)
  const startVal = useRef(0)
  const KNOB = 48, HEIGHT = 56

  useEffect(() => {
    if (!trackRef.current) return
    const measure = () => setMaxX(Math.max(0, trackRef.current.offsetWidth - KNOB - 8))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  const onDown = (e) => {
    if (done) return
    e.preventDefault()
    dragging.current = true
    startX.current   = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    startVal.current = x
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }
  const onMove = (e) => {
    if (!dragging.current) return
    const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    setX(Math.max(0, Math.min(maxX, startVal.current + cx - startX.current)))
  }
  const onUp = () => {
    dragging.current = false
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
    if (x >= maxX * 0.88) {
      setX(maxX); setDone(true)
      setTimeout(() => { setDone(false); setX(0); if (onComplete) onComplete() }, 1200)
    } else { setX(0) }
  }

  const pct = maxX ? x/maxX : 0
  const labelOpacity = Math.max(0, 1 - pct * 1.6)

  return (
    <div ref={trackRef} style={{
      position:'relative', height:HEIGHT, borderRadius:HEIGHT/2,
      background: done ? CC.greenDeep : CC.greenInk,
      overflow:'hidden', userSelect:'none',
      transition:'background .25s',
    }}>
      <div style={{
        position:'absolute', left:0, top:0, bottom:0,
        width: x + KNOB/2,
        background:`linear-gradient(90deg,${CC.green},${CC.green})`,
        transition: dragging.current ? 'none' : 'width .35s cubic-bezier(.2,.7,.3,1)',
      }}/>
      {!done && x === 0 && (
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,.18) 50%,transparent 100%)',
          backgroundSize:'60% 100%', backgroundRepeat:'no-repeat',
          animation:'sp-shimmer 1.8s infinite',
        }}/>
      )}
      <div style={{
        position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
        color:'#fff', fontSize:15, fontWeight:700, letterSpacing:.3,
        opacity: done ? 0 : labelOpacity,
        transition: dragging.current ? 'none' : 'opacity .2s', paddingLeft:KNOB,
      }}>Slide to pay  →</div>
      {done && (
        <div style={{
          position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', fontSize:15, fontWeight:800,
        }}>✓ Payment confirmed</div>
      )}
      <div onPointerDown={onDown} style={{
        position:'absolute', top:4, left:4, width:KNOB, height:KNOB, borderRadius:KNOB/2,
        background:'#fff', transform:`translateX(${x}px)`,
        transition: dragging.current ? 'none' : 'transform .35s cubic-bezier(.2,.7,.3,1)',
        display:'flex', alignItems:'center', justifyContent:'center',
        color:CC.green, fontSize:22, fontWeight:800,
        boxShadow:'0 2px 8px rgba(0,0,0,.18)', touchAction:'none', cursor:'grab',
      }}>{done ? '✓' : '→'}</div>
    </div>
  )
}

// ─── Brand Mark SVG ──────────────────────────────────────────────
export function CCMark({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <path d="M32 20 Q22 14 18 4 Q28 6 34 16 Z" fill="#3F8E5C"/>
      <path d="M32 20 Q22 14 18 4" stroke="#2F6E47" strokeWidth="1.2" fill="none"/>
      <path d="M32 20 Q40 14 46 6 Q42 18 34 22 Z" fill="#5BAA72"/>
      <circle cx="32" cy="40" r="20" fill="#F5D75A"/>
      <circle cx="32" cy="40" r="20" fill="none" stroke="#E5B924" strokeWidth="2"/>
      <circle cx="32" cy="40" r="15" fill="none" stroke="#E5B924" strokeWidth="1.2" strokeDasharray="2 2" opacity=".55"/>
      <text x="32" y="48" textAnchor="middle" fontSize="22" fontWeight="800" fill="#1F4A2E"
        fontFamily='"Be Vietnam Pro",system-ui'>₫</text>
      <path d="M32 20 L32 24" stroke="#2F6E47" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

// ─── Garden Scene SVG ────────────────────────────────────────────
export function GardenScene({ height = 200 }) {
  return (
    <svg viewBox="0 0 360 200" width="100%" height={height} preserveAspectRatio="xMidYMid meet"
      style={{ display:'block' }}>
      <defs>
        <linearGradient id="sky"    x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E8F4EA"/><stop offset="1" stopColor="#C7E5C9"/></linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A8D4AC"/><stop offset="1" stopColor="#7BBE82"/></linearGradient>
        <linearGradient id="trunk"  x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6B4525"/><stop offset="1" stopColor="#4a2f18"/></linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="200" fill="url(#sky)"/>
      <ellipse cx="80"  cy="170" rx="140" ry="38" fill="#9ACDA0" opacity=".55"/>
      <ellipse cx="290" cy="178" rx="120" ry="32" fill="#9ACDA0" opacity=".55"/>
      <rect x="0" y="148" width="360" height="52" fill="url(#ground)"/>
      {/* Fence – Protect */}
      <g stroke="#5a4a2a" strokeWidth="1.5" fill="#E5B924">
        <rect x="10" y="142" width="6" height="14"/><rect x="30" y="140" width="6" height="16"/>
        <rect x="50" y="142" width="6" height="14"/><rect x="304" y="142" width="6" height="14"/>
        <rect x="324" y="140" width="6" height="16"/><rect x="344" y="142" width="6" height="14"/>
      </g>
      {/* Workshop – Earn */}
      <g transform="translate(28,100)">
        <rect x="0" y="20" width="42" height="32" fill="#D9A86C" stroke="#6B4525" strokeWidth="1.5"/>
        <polygon points="-4,20 21,2 46,20" fill="#C2452F" stroke="#6B4525" strokeWidth="1.5"/>
        <rect x="14" y="34" width="12" height="18" fill="#6B4525"/>
        <circle cx="35" cy="32" r="3" fill="#3F8E5C"/>
      </g>
      {/* Piggy – Save */}
      <g transform="translate(88,110)">
        <ellipse cx="20" cy="42" rx="22" ry="4" fill="#000" opacity=".1"/>
        <ellipse cx="20" cy="28" rx="20" ry="14" fill="#F5A1B9"/>
        <circle cx="32" cy="24" r="6" fill="#F5A1B9"/>
        <circle cx="34" cy="24" r="1.5" fill="#1B2218"/>
        <circle cx="14" cy="24" r="1.2" fill="#1B2218"/>
        <rect x="16" y="14" width="10" height="2" fill="#1B2218" opacity=".5"/>
        <rect x="8" y="36" width="3" height="6" fill="#F5A1B9"/>
        <rect x="29" y="36" width="3" height="6" fill="#F5A1B9"/>
        <circle cx="22" cy="6" r="3.5" fill="#F5D75A" stroke="#E5B924" strokeWidth="1"/>
        <text x="22" y="9" textAnchor="middle" fontSize="5" fontWeight="800" fill="#6B4525">₫</text>
      </g>
      {/* Market – Spend */}
      <g transform="translate(146,102)">
        <rect x="2" y="20" width="44" height="30" fill="#fff" stroke="#1B2218" strokeWidth="1.2"/>
        <polygon points="0,20 24,8 48,20" fill="#3F8E5C" stroke="#1B2218" strokeWidth="1.2"/>
        <rect x="0" y="18" width="48" height="4" fill="#E5B924"/>
        <rect x="0" y="22" width="48" height="4" fill="#fff"/>
        <rect x="0" y="26" width="48" height="4" fill="#E76F62"/>
        <circle cx="12" cy="40" r="3" fill="#E76F62"/>
        <circle cx="22" cy="40" r="3" fill="#F0A04B"/>
        <circle cx="32" cy="40" r="3" fill="#F5D75A"/>
      </g>
      {/* Invest tree */}
      <g transform="translate(210,70)">
        <rect x="18" y="48" width="8" height="32" fill="url(#trunk)"/>
        <circle cx="22" cy="36" r="24" fill="#3F8E5C"/>
        <circle cx="10" cy="32" r="14" fill="#5BAA72"/>
        <circle cx="34" cy="30" r="16" fill="#5BAA72"/>
        <circle cx="22" cy="22" r="14" fill="#7BBE82"/>
        <circle cx="12" cy="38" r="3" fill="#E76F62"/>
        <circle cx="30" cy="40" r="3" fill="#E76F62"/>
        <circle cx="22" cy="32" r="3" fill="#F5D75A"/>
      </g>
      {/* Flower patch – Give */}
      <g transform="translate(272,130)">
        {[{x:6,y:18,c:'#E76F62'},{x:18,y:22,c:'#F5D75A'},{x:32,y:16,c:'#9B7AC4'},{x:44,y:20,c:'#F0A04B'},{x:56,y:24,c:'#E76F62'},{x:12,y:6,c:'#F5D75A'},{x:40,y:4,c:'#9B7AC4'}].map(({x,y,c},i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <line x1="0" y1="0" x2="0" y2="8" stroke="#3F8E5C" strokeWidth="1.2"/>
            <circle cx="-2" cy="-1.5" r="2" fill={c}/>
            <circle cx="2"  cy="-1.5" r="2" fill={c}/>
            <circle cx="0"  cy="-3"   r="2" fill={c}/>
            <circle cx="0"  cy="1"    r="2" fill={c}/>
            <circle cx="0"  cy="-1"   r="1.2" fill="#F5D75A"/>
          </g>
        ))}
      </g>
      {/* Sun + cloud */}
      <circle cx="320" cy="28" r="14" fill="#F5D75A"/>
      <g fill="#fff" opacity=".7">
        <circle cx="60" cy="34" r="8"/><circle cx="72" cy="32" r="11"/><circle cx="86" cy="36" r="8"/>
      </g>
      {/* Seedling */}
      <g transform="translate(82,142)">
        <path d="M0 6 Q-3 0 -1 -3 M0 6 Q3 0 1 -3" stroke="#3F8E5C" strokeWidth="1.5" fill="none"/>
        <circle cx="-2" cy="-2" r="1.8" fill="#7BBE82"/>
        <circle cx="2"  cy="-2" r="1.8" fill="#7BBE82"/>
      </g>
    </svg>
  )
}

// ─── Alex Avatar SVG ─────────────────────────────────────────────
export function AlexAvatar({ size = 48 }) {
  const s = size / 48
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path d="M6 44 C6 32,16 26,24 26 C32 26,42 32,42 44 L42 48 L6 48 Z" fill="#3F8E5C"/>
      <path d="M14 30 Q24 24 34 30 L34 36 Q24 32 14 36 Z" fill="#2F6E47"/>
      <ellipse cx="24" cy="22" rx="11" ry="12" fill="#F4C9A4"/>
      <path d="M13 18 Q14 8 24 7 Q34 8 35 18 L34 14 Q30 11 24 10 Q18 11 14 14 Z" fill="#1B2218"/>
      <path d="M13 18 Q12 22 14 24" stroke="#1B2218" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="20" cy="22" r="1.5" fill="#1B2218"/>
      <circle cx="28" cy="22" r="1.5" fill="#1B2218"/>
      <circle cx="20.5" cy="21.5" r=".5" fill="#fff"/>
      <circle cx="28.5" cy="21.5" r=".5" fill="#fff"/>
      <path d="M21 27 Q24 29 27 27" stroke="#1B2218" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <rect x="34" y="38" width="9" height="11" rx="1" fill="#E5B924" stroke="#1B2218" strokeWidth="1"/>
      <text x="38.5" y="46" textAnchor="middle" fontSize="6" fontWeight="800" fill="#1B2218">$</text>
    </svg>
  )
}
