import React from 'react'
import { CC } from '../theme.js'
import { useApp } from '../context.jsx'
import { Phone, TabBar, Card, CircleBtn } from '../components/index.jsx'

// ─── 1. Profile Home ─────────────────────────────────────────────
export function ProfileHome() {
  const { navigate, state } = useApp()
  const { user } = state

  return (
    <Phone bg={CC.mint}>
      {/* Hero */}
      <div style={{ background:`linear-gradient(160deg,${CC.green},${CC.greenDeep})`, color:'#fff', padding:'14px 18px 26px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', right:-10, top:-8, fontSize:70, opacity:.12 }}>🌿</div>
        <div style={{ position:'absolute', right:80, bottom:-14, fontSize:50, opacity:.12 }}>🌱</div>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:64, height:64, borderRadius:32, background:'linear-gradient(135deg,#F5D75A,#E5B924)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:34, border:'3px solid #fff' }}>🧑‍🎓</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:18, fontWeight:800 }}>{user.name}</div>
            <div style={{ fontSize:12, opacity:.85 }}>@{user.handle} · {user.age} · Hà Nội</div>
            <div style={{ marginTop:6, display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,.18)', padding:'4px 10px', borderRadius:999, fontSize:11, fontWeight:700 }}>🪴 LEVEL 6 · GARDENER</div>
          </div>
        </div>
        {/* Quick stats */}
        <div style={{ display:'flex', gap:8, marginTop:14 }}>
          {[[user.xp.toLocaleString(),'XP earned'],[`🔥 ${user.streak}`,'day streak'],['2/6','pillars']].map(([v,l]) => (
            <div key={l} style={{ flex:1, background:'rgba(255,255,255,.16)', padding:'8px 12px', borderRadius:14, backdropFilter:'blur(6px)' }}>
              <div style={{ fontSize:16, fontWeight:800 }}>{v}</div>
              <div style={{ fontSize:10, opacity:.8 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflow:'auto', padding:'4px 16px', marginTop:-10 }}>
        {/* Certificates */}
        <Card padding={14} radius={20}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
            <div style={{ fontSize:13, fontWeight:800 }}>Certificates & badges</div>
            <div style={{ fontSize:11, color:CC.green, fontWeight:700, cursor:'pointer' }} onClick={() => navigate('CertificatesWall')}>View all</div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            {[{icon:'🐷',name:'Save',earned:true},{icon:'🛡️',name:'Protect',earned:true},{icon:'🛒',name:'Spend',earned:false},{icon:'🛠️',name:'Earn',earned:false},{icon:'🌳',name:'Invest',earned:false}].map(b => (
              <div key={b.name} style={{ flex:1, minWidth:60, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{ width:56, height:56, borderRadius:16, background: b.earned ? `linear-gradient(135deg,${CC.yellow},${CC.yellowDeep})` : CC.mintDeep, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, filter: b.earned ? 'none' : 'grayscale(1) opacity(.55)', border: b.earned ? '2px solid #fff' : 'none', boxShadow: b.earned ? '0 4px 10px rgba(229,185,36,.35)' : 'none' }}>{b.earned ? b.icon : '🔒'}</div>
                <div style={{ fontSize:10, fontWeight:700, color: b.earned ? CC.ink : CC.ink3 }}>{b.name}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Settings list */}
        <div style={{ marginTop:12, background:'#fff', borderRadius:20, overflow:'hidden' }}>
          {[
            { icon:'🔔', label:'Notifications',        detail:'3 active'     },
            { icon:'📺', label:'Discover daily cap',   detail:'25 min'       },
            { icon:'🔒', label:'PIN & biometric',      detail:'Face ID on'   },
            { icon:'🤖', label:'What Alex can see',    detail:'Learning only' },
            { icon:'🌐', label:'Language',             detail:'Tiếng Việt'  },
            { icon:'❓', label:'Help & support',       detail:null           },
          ].map((s,i,arr) => (
            <div key={s.label} style={{ display:'flex', alignItems:'center', padding:'12px 14px', gap:12, borderBottom: i===arr.length-1 ? 'none' : `1px solid ${CC.line}`, cursor:'pointer' }}>
              <div style={{ fontSize:18 }}>{s.icon}</div>
              <div style={{ flex:1, fontSize:14, fontWeight:600 }}>{s.label}</div>
              <div style={{ fontSize:12, color:CC.ink3 }}>{s.detail}</div>
              <span style={{ color:CC.ink3, fontSize:14 }}>›</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop:12, padding:14, textAlign:'center', fontSize:12, color:CC.ink3, marginBottom:16 }}>
          Cha-Ching v1.0 · MVP · Made in 🇻🇳
        </div>
      </div>
      <TabBar active="profile"/>
    </Phone>
  )
}

// ─── 2. Certificates Wall ─────────────────────────────────────────
export function CertificatesWall() {
  const { goBack } = useApp()
  return (
    <Phone bg={CC.mint}>
      <div style={{ padding:'12px 16px 6px', display:'flex', alignItems:'center', gap:10 }}>
        <CircleBtn onClick={goBack}>‹</CircleBtn>
        <div style={{ flex:1, fontSize:17, fontWeight:800 }}>Achievements</div>
      </div>
      <div style={{ flex:1, overflow:'auto', padding:'4px 16px' }}>
        {/* Foundation cert */}
        <Card padding={16} radius={22} style={{ background:`linear-gradient(135deg,${CC.greenInk},${CC.green})`, color:'#fff', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', right:-6, top:-10, fontSize:90, opacity:.15 }}>🏆</div>
          <div style={{ fontSize:10, opacity:.7, fontWeight:700, letterSpacing:2 }}>FOUNDATION TIER</div>
          <div style={{ fontSize:17, fontWeight:800, marginTop:4 }}>Cha-Ching Certificate</div>
          <div style={{ fontSize:12, opacity:.85, marginTop:4 }}>2 of 6 pillars complete · keep going</div>
          <div style={{ height:6, background:'rgba(255,255,255,.18)', borderRadius:3, marginTop:10, overflow:'hidden' }}>
            <div style={{ width:'33%', height:'100%', background:CC.yellow }}/>
          </div>
          <div style={{ fontSize:11, opacity:.75, marginTop:6 }}>Co-signed with VinUniversity Entrepreneurship Lab</div>
        </Card>

        {/* Earned */}
        <div style={{ marginTop:14, fontSize:12, color:CC.ink3, fontWeight:700, letterSpacing:1 }}>EARNED · 2</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:6 }}>
          {[{icon:'🐷',name:'Save Foundation',    date:'May 14, 2026', tone:CC.green     },
            {icon:'🛡️',name:'Protect Foundation', date:'May 22, 2026', tone:CC.yellowDeep}].map(c => (
            <div key={c.name} style={{ background:'#fff', borderRadius:16, padding:12, border:`1px solid ${CC.line}` }}>
              <div style={{ width:44, height:44, borderRadius:14, background:`linear-gradient(135deg,${c.tone},${CC.greenInk})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{c.icon}</div>
              <div style={{ fontSize:13, fontWeight:800, marginTop:8 }}>{c.name}</div>
              <div style={{ fontSize:11, color:CC.ink3, marginTop:2 }}>{c.date}</div>
            </div>
          ))}
        </div>

        {/* In progress */}
        <div style={{ marginTop:14, fontSize:12, color:CC.ink3, fontWeight:700, letterSpacing:1 }}>IN PROGRESS · 4</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:6, marginBottom:16 }}>
          {[{icon:'🛠️',name:'Earn',  date:'3 of 10'},{icon:'🛒',name:'Spend',date:'5 of 10'},{icon:'🌳',name:'Invest',date:'0 of 8'},{icon:'🌸',name:'Give', date:'2 of 6'}].map(c => (
            <div key={c.name} style={{ background:'#fff', borderRadius:16, padding:12, border:`1px solid ${CC.line}`, opacity:.85 }}>
              <div style={{ width:44, height:44, borderRadius:14, background:CC.mintDeep, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, filter:'grayscale(1)' }}>{c.icon}</div>
              <div style={{ fontSize:13, fontWeight:800, marginTop:8 }}>{c.name}</div>
              <div style={{ fontSize:11, color:CC.ink3, marginTop:2 }}>{c.date}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="profile"/>
    </Phone>
  )
}
