import React, { useState } from 'react'
import { CC, CCFont } from '../theme.js'
import { useApp } from '../context.jsx'
import { Phone, Btn, CircleBtn, ProgressBar, GardenScene, CCMark } from '../components/index.jsx'

// ─── 1. Splash / Welcome ─────────────────────────────────────────
export function OnbSplash() {
  const { navigate } = useApp()
  return (
    <Phone bg={CC.green} style={{ color:'#fff', position:'relative' }}>
      <div style={{ flex:1, padding:'12px 24px 0', position:'relative', overflow:'hidden' }}>
        {/* Floating coins */}
        <div style={{ position:'absolute', top:30, right:40, fontSize:28, transform:'rotate(-10deg)', opacity:.8 }}>🪙</div>
        <div style={{ position:'absolute', top:80, left:30, fontSize:22, transform:'rotate(15deg)', opacity:.7 }}>🪙</div>
        <div style={{ position:'absolute', top:50, left:'50%', fontSize:18, opacity:.6 }}>✨</div>

        {/* Logo */}
        <div style={{ textAlign:'center', marginTop:80 }}>
          <div style={{
            width:96, height:96, borderRadius:28, background:'#fff',
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 12px 30px rgba(0,0,0,.18)',
          }}><CCMark size={62} /></div>
          <div style={{
            fontSize:42, fontWeight:800, marginTop:18, letterSpacing:-.5,
            fontFamily:'"Caveat",cursive', color:'#fff',
          }}>Cha-Ching</div>
          <div style={{ fontSize:14, opacity:.85, marginTop:4 }}>The teen wallet that grows with you</div>
        </div>

        {/* Mini garden */}
        <div style={{ marginTop:28, padding:4, borderRadius:20, background:'rgba(255,255,255,.12)' }}>
          <div style={{ borderRadius:18, overflow:'hidden' }}>
            <GardenScene height={140} />
          </div>
        </div>

        {/* CTA */}
        <div style={{ position:'absolute', bottom:36, left:24, right:24 }}>
          <Btn kind="yellow" size="lg" full onClick={() => navigate('OnbHandle')}>Get Started  →</Btn>
          <div style={{ textAlign:'center', marginTop:12, fontSize:12, opacity:.85 }}>
            Have an account? <b style={{ cursor:'pointer' }} onClick={() => navigate('WalletHome')}>Sign in</b>
          </div>
        </div>
      </div>
    </Phone>
  )
}

// ─── 2. Pick handle + avatar ─────────────────────────────────────
export function OnbHandle() {
  const { navigate } = useApp()
  const [handle, setHandle] = useState('kyle.long')
  const [selectedAvatar, setSelectedAvatar] = useState(0)
  const avatars = ['🧑‍🎓','👨🏻‍🎤','👩🏻','🧑🏻‍💻','👦🏻','👧🏻','🧑🏻‍🎨','🧑🏻']
  return (
    <Phone bg={CC.paper}>
      <ProgressBar step={2} total={5} />
      <div style={{ flex:1, padding:'16px 24px', overflow:'auto' }}>
        <div style={{ fontSize:24, fontWeight:800, letterSpacing:-.3 }}>Pick a handle</div>
        <div style={{ fontSize:14, color:CC.ink2, marginTop:4 }}>This is how friends will see you.</div>
        <div style={{
          marginTop:22, background:'#fff', borderRadius:16, padding:'4px 14px',
          display:'flex', alignItems:'center', gap:8,
          border:`2px solid ${CC.green}`, boxShadow:`0 0 0 4px rgba(63,142,92,.12)`,
        }}>
          <span style={{ fontSize:18, color:CC.ink3 }}>@</span>
          <input
            value={handle} onChange={e => setHandle(e.target.value)}
            style={{ flex:1, fontSize:18, fontWeight:700, padding:'14px 0', border:'none', outline:'none', background:'transparent', fontFamily:CCFont, color:CC.ink }}
          />
          <span style={{ color:CC.green, fontSize:16 }}>✓</span>
        </div>
        <div style={{ fontSize:12, color:CC.green, fontWeight:600, marginTop:6, paddingLeft:4 }}>
          ✓ Available · {handle.length}/15 characters
        </div>
        <div style={{ fontSize:13, fontWeight:700, color:CC.ink2, marginTop:24 }}>Pick an avatar</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginTop:10 }}>
          {avatars.map((a,i) => (
            <div key={i} onClick={() => setSelectedAvatar(i)} style={{
              aspectRatio:'1/1', borderRadius:18,
              background: i===selectedAvatar ? 'linear-gradient(135deg,#F5D75A,#E5B924)' : '#fff',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:28,
              border: i===selectedAvatar ? `3px solid ${CC.green}` : `1px solid ${CC.line}`,
              boxShadow: i===selectedAvatar ? '0 4px 12px rgba(63,142,92,.2)' : 'none',
              cursor:'pointer',
            }}>{a}</div>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 24px 18px' }}>
        <Btn kind="primary" size="lg" full onClick={() => navigate('OnbPIN')}>Continue  →</Btn>
      </div>
    </Phone>
  )
}

// ─── 3. Set PIN ───────────────────────────────────────────────────
export function OnbPIN() {
  const { navigate } = useApp()
  const [pin, setPin] = useState([])
  const append = (d) => { if (pin.length < 6) setPin(p => [...p, d]) }
  const del = () => setPin(p => p.slice(0,-1))
  const filled = pin.length

  React.useEffect(() => {
    if (pin.length === 6) setTimeout(() => navigate('OnbGarden'), 400)
  }, [pin])

  return (
    <Phone bg={CC.paper}>
      <ProgressBar step={4} total={5} />
      <div style={{ flex:1, padding:'16px 24px', display:'flex', flexDirection:'column' }}>
        <div style={{ fontSize:24, fontWeight:800 }}>Create a PIN</div>
        <div style={{ fontSize:14, color:CC.ink2, marginTop:4 }}>You'll use this every time you pay. Keep it secret.</div>
        {/* Dots */}
        <div style={{ display:'flex', justifyContent:'center', gap:14, marginTop:36 }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{
              width:16, height:16, borderRadius:8,
              background: i<filled ? CC.green : '#fff',
              border:`2px solid ${i<filled ? CC.green : CC.mintEdge}`,
              transition:'background .15s',
            }}/>
          ))}
        </div>
        {/* Keypad */}
        <div style={{ marginTop:'auto', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <div key={n} onClick={() => append(n)} style={{
              height:56, borderRadius:14, background:'#fff',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:24, fontWeight:600, color:CC.ink,
              border:`1px solid ${CC.line}`, cursor:'pointer',
            }}>{n}</div>
          ))}
          <div/>
          <div onClick={() => append(0)} style={{ height:56, borderRadius:14, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, fontWeight:600, color:CC.ink, border:`1px solid ${CC.line}`, cursor:'pointer' }}>0</div>
          <div onClick={del} style={{ height:56, borderRadius:14, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, fontWeight:600, color:CC.ink, border:`1px solid ${CC.line}`, cursor:'pointer' }}>⌫</div>
        </div>
        {/* Face ID toggle */}
        <div style={{
          display:'flex', alignItems:'center', gap:8, padding:'10px 14px',
          background:'#fff', borderRadius:12, marginTop:14, fontSize:12, color:CC.ink2,
          border:`1px solid ${CC.line}`,
        }}>
          <span style={{ fontSize:18 }}>👤</span>
          <span style={{ flex:1 }}>Also use Face ID to unlock?</span>
          <div style={{ width:36, height:22, borderRadius:11, background:CC.green, position:'relative' }}>
            <div style={{ width:18, height:18, borderRadius:9, background:'#fff', position:'absolute', top:2, right:2 }}/>
          </div>
        </div>
      </div>
    </Phone>
  )
}

// ─── 4. Garden intro ─────────────────────────────────────────────
export function OnbGarden() {
  const { navigate } = useApp()
  return (
    <Phone bg={CC.mint}>
      <ProgressBar step={5} total={5} />
      <div style={{ flex:1, padding:'8px 18px 0', display:'flex', flexDirection:'column', overflow:'auto' }}>
        <div style={{ borderRadius:22, overflow:'hidden', marginTop:12 }}>
          <GardenScene height={170} />
        </div>
        <div style={{ fontSize:24, fontWeight:800, letterSpacing:-.3, marginTop:22, padding:'0 6px' }}>
          Welcome to your Garden 🌱
        </div>
        <div style={{ fontSize:14, color:CC.ink2, marginTop:8, lineHeight:1.5, padding:'0 6px' }}>
          Every smart money move grows something here. Save more, plants bloom. Learn a pillar, a new zone appears. The Garden is just <b>you</b>.
        </div>
        <div style={{ marginTop:18, display:'flex', flexDirection:'column', gap:10 }}>
          {[
            { icon:'🐷', t:'Save',    d:'A piggy fountain that fills as you save' },
            { icon:'🌳', t:'Invest',  d:'A fruit tree that grows over years' },
            { icon:'🛡️', t:'Protect', d:'A fence that guards your money smarts' },
          ].map(({icon,t,d}) => (
            <div key={t} style={{
              display:'flex', alignItems:'center', gap:12, padding:'10px 14px',
              background:'#fff', borderRadius:14, border:`1px solid ${CC.line}`,
            }}>
              <div style={{ width:36,height:36,borderRadius:12,background:CC.mint, display:'flex',alignItems:'center',justifyContent:'center',fontSize:20 }}>{icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:800 }}>{t}</div>
                <div style={{ fontSize:11, color:CC.ink3, marginTop:1 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:'auto', paddingBottom:14, paddingTop:14 }}>
          <Btn kind="primary" size="lg" full onClick={() => navigate('WalletHome')}>Explore my Garden  →</Btn>
        </div>
      </div>
    </Phone>
  )
}
