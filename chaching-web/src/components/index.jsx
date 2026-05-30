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

// ─── Mèo — cat companion SVG ─────────────────────────────────────
const MEO_COATS = {
  orange: { base:'#F0A04B', dark:'#E5862A', belly:'#FBD9A8', stripe:'#D9751F' },
  tuxedo: { base:'#2B2F2C', dark:'#151916', belly:'#FFFFFF', stripe:'#1B201D' },
  grey:   { base:'#9AA6A0', dark:'#7C8881', belly:'#E4EAE6', stripe:'#76837C' },
  calico: { base:'#F2EAD8', dark:'#E7843B', belly:'#FFFFFF', stripe:'#3A332E' },
}

export function Meo({ coat='orange', stage='baby', mood='happy', size=120, style={} }) {
  const c = MEO_COATS[coat] || MEO_COATS.orange
  const stageCfg = { baby:{bodyScale:.86,headR:30,ear:1.15}, junior:{bodyScale:.93,headR:28,ear:1.0}, adult:{bodyScale:1.0,headR:26,ear:.95}, master:{bodyScale:1.04,headR:26,ear:.95} }[stage] || {bodyScale:1,headR:26,ear:1}
  const isMaster = stage === 'master', isCalico = coat === 'calico', isTuxedo = coat === 'tuxedo'
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display:'block', overflow:'visible', ...style }}>
      <defs>
        <radialGradient id={`aura-${coat}`} cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor="#F5D75A" stopOpacity=".55"/>
          <stop offset="60%" stopColor="#F5D75A" stopOpacity=".18"/>
          <stop offset="100%" stopColor="#F5D75A" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {isMaster && <circle cx="60" cy="62" r="56" fill={`url(#aura-${coat})`}><animate attributeName="r" values="52;58;52" dur="3s" repeatCount="indefinite"/></circle>}
      <ellipse cx="60" cy="108" rx={26*stageCfg.bodyScale} ry="5" fill="#1B2218" opacity=".12"/>
      <g transform={`translate(60 ${mood==='sleepy'?70:66}) scale(${stageCfg.bodyScale})`}>
        <path d={mood==='lonely'?"M22 18 q22 6 20 -14 q-2 -12 -10 -12":"M22 14 q26 2 26 -18 q0 -10 -8 -12"} fill="none" stroke={c.base} strokeWidth="9" strokeLinecap="round"/>
        {coat==='orange'&&<path d="M40 -12 q6 2 8 8" stroke={c.stripe} strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6"/>}
        {isMaster&&<circle cx="40" cy="-26" r="6" fill="#F5D75A" stroke="#E5B924" strokeWidth="1.5"/>}
        <path d="M-30 24 Q-34 -10 0 -10 Q34 -10 30 24 Q30 34 0 34 Q-30 34 -30 24 Z" fill={c.base}/>
        <ellipse cx="0" cy="20" rx="18" ry="14" fill={c.belly}/>
        {isTuxedo&&<path d="M-8 -2 Q0 30 8 -2 Q0 6 -8 -2Z" fill="#fff"/>}
        {isCalico&&<path d="M-28 8 Q-30 -8 -12 -8 Q-18 8 -28 22 Z" fill={c.dark} opacity=".9"/>}
        <ellipse cx="-12" cy="33" rx="7" ry="5" fill={c.belly}/>
        <ellipse cx="12" cy="33" rx="7" ry="5" fill={c.belly}/>
        <g transform={`translate(0 -22) ${mood==='curious'?'rotate(-8)':''}`}>
          <path d={`M${-20*stageCfg.ear} -14 L${-26*stageCfg.ear} -34 L${-6*stageCfg.ear} -22 Z`} fill={c.base}/>
          <path d={`M${20*stageCfg.ear} -14 L${26*stageCfg.ear} -34 L${6*stageCfg.ear} -22 Z`} fill={isCalico?c.dark:c.base}/>
          <path d={`M${-18*stageCfg.ear} -16 L${-21*stageCfg.ear} -28 L${-9*stageCfg.ear} -20 Z`} fill="#F5A1B9"/>
          <path d={`M${18*stageCfg.ear} -16 L${21*stageCfg.ear} -28 L${9*stageCfg.ear} -20 Z`} fill="#F5A1B9"/>
          <circle cx="0" cy="0" r={stageCfg.headR} fill={c.base}/>
          {isCalico&&<path d={`M0 -${stageCfg.headR} A${stageCfg.headR} ${stageCfg.headR} 0 0 1 ${stageCfg.headR} 0 L0 0 Z`} fill={c.dark} opacity=".85"/>}
          {coat==='orange'&&<g stroke={c.stripe} strokeWidth="2.5" strokeLinecap="round" opacity=".55"><line x1="0" y1={-stageCfg.headR} x2="0" y2={-stageCfg.headR+8}/><line x1="-9" y1={-stageCfg.headR+2} x2="-8" y2={-stageCfg.headR+9}/><line x1="9" y1={-stageCfg.headR+2} x2="8" y2={-stageCfg.headR+9}/></g>}
          {coat==='grey'&&<g stroke={c.stripe} strokeWidth="2.5" strokeLinecap="round" opacity=".5"><line x1="0" y1={-stageCfg.headR} x2="0" y2={-stageCfg.headR+7}/><line x1="-9" y1={-stageCfg.headR+2} x2="-8" y2={-stageCfg.headR+8}/><line x1="9" y1={-stageCfg.headR+2} x2="8" y2={-stageCfg.headR+8}/></g>}
          <ellipse cx="0" cy="8" rx="15" ry="11" fill={isTuxedo||isCalico?'#fff':c.belly} opacity={isTuxedo||isCalico?1:.5}/>
          {mood==='sleepy'?<g stroke="#1B2218" strokeWidth="2.2" strokeLinecap="round" fill="none"><path d="M-13 2 q5 4 10 0"/><path d="M3 2 q5 4 10 0"/></g>:mood==='lonely'?<g><ellipse cx="-8" cy="2" rx="4.5" ry="5" fill="#1B2218"/><ellipse cx="8" cy="2" rx="4.5" ry="5" fill="#1B2218"/><circle cx="-6.5" cy=".5" r="1.4" fill="#fff"/><circle cx="9.5" cy=".5" r="1.4" fill="#fff"/><circle cx="-10" cy="7" r="1.6" fill="#9CD6F5"/><circle cx="10" cy="7" r="1.6" fill="#9CD6F5"/></g>:<g><ellipse cx="-8" cy="1" rx="5" ry={mood==='curious'?6:5.5} fill="#1B2218"/><ellipse cx="8" cy="1" rx="5" ry={mood==='curious'?6:5.5} fill="#1B2218"/><circle cx="-6" cy="-1" r="1.7" fill="#fff"/><circle cx="10" cy="-1" r="1.7" fill="#fff"/>{mood==='happy'&&<g><circle cx="-15" cy="9" r="3.5" fill="#F5A1B9" opacity=".6"/><circle cx="15" cy="9" r="3.5" fill="#F5A1B9" opacity=".6"/></g>}</g>}
          <path d="M-2.5 8 L2.5 8 L0 11 Z" fill="#E76F62"/>
          {mood==='happy'?<path d="M0 11 Q-4 16 -8 13 M0 11 Q4 16 8 13" stroke="#1B2218" strokeWidth="1.6" fill="none" strokeLinecap="round"/>:mood==='lonely'?<path d="M-5 16 Q0 13 5 16" stroke="#1B2218" strokeWidth="1.6" fill="none" strokeLinecap="round"/>:<path d="M0 11 Q-3 15 -6 13 M0 11 Q3 15 6 13" stroke="#1B2218" strokeWidth="1.5" fill="none" strokeLinecap="round"/>}
          {stage!=='baby'&&<g stroke={isTuxedo?'#bbb':'#1B2218'} strokeWidth="1" opacity=".5" strokeLinecap="round"><line x1="-14" y1="8" x2="-30" y2="5"/><line x1="-14" y1="11" x2="-30" y2="12"/><line x1="14" y1="8" x2="30" y2="5"/><line x1="14" y1="11" x2="30" y2="12"/></g>}
          {isMaster&&<g transform="translate(0 -32)"><path d="M-11 4 L-11 -4 L-5 1 L0 -7 L5 1 L11 -4 L11 4 Z" fill="#F5D75A" stroke="#E5B924" strokeWidth="1.2"/><circle cx="0" cy="-7" r="1.6" fill="#E76F62"/><circle cx="-11" cy="-4" r="1.4" fill="#E76F62"/><circle cx="11" cy="-4" r="1.4" fill="#E76F62"/></g>}
        </g>
      </g>
      {mood==='curious'&&<text x="92" y="36" fontSize="18">❓</text>}
      {mood==='sleepy'&&<text x="86" y="34" fontSize="16" fill="#7E8E84" fontWeight="700">z</text>}
      {mood==='lonely'&&<text x="90" y="40" fontSize="16">🥺</text>}
      {mood==='happy'&&stage!=='baby'&&<text x="90" y="34" fontSize="13">✨</text>}
    </svg>
  )
}

export function MeoChip({ coat='orange', size=28 }) {
  const c = MEO_COATS[coat] || MEO_COATS.orange
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ display:'block' }}>
      <path d="M6 12 L3 0 L17 9 Z" fill={c.base}/>
      <path d="M34 12 L37 0 L23 9 Z" fill={c.base}/>
      <circle cx="20" cy="22" r="15" fill={c.base}/>
      <ellipse cx="20" cy="27" rx="9" ry="6" fill={c.belly} opacity=".6"/>
      <circle cx="14" cy="21" r="2.6" fill="#1B2218"/>
      <circle cx="26" cy="21" r="2.6" fill="#1B2218"/>
      <circle cx="14.8" cy="20" r=".8" fill="#fff"/>
      <circle cx="26.8" cy="20" r=".8" fill="#fff"/>
      <path d="M18.5 26 L21.5 26 L20 28.5 Z" fill="#E76F62"/>
      <path d="M20 28.5 Q17 31 15 29 M20 28.5 Q23 31 25 29" stroke="#1B2218" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

// ─── GardenStage — GardenScene + walking Mèo ─────────────────────
export function GardenStage({ height=200, coat='orange', stage='adult', mood='happy', walk=true, meoSize, left='50%' }) {
  const sz = meoSize || Math.round(height * 0.52)
  return (
    <div style={{ position:'relative', lineHeight:0 }}>
      <GardenScene height={height} />
      <div style={{
        position:'absolute', bottom: height * 0.03, left,
        transform:'translateX(-50%)',
        animation: walk ? 'meo-walk 6s ease-in-out infinite' : 'none',
      }}>
        <div style={{ animation: walk ? 'meo-bob 1.4s ease-in-out infinite' : 'none' }}>
          <Meo coat={coat} stage={stage} mood={mood} size={sz} />
        </div>
      </div>
      <style>{`
        @keyframes meo-walk { 0%,100%{ margin-left:-46px } 50%{ margin-left:46px } }
        @keyframes meo-bob  { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-3px) } }
      `}</style>
    </div>
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
