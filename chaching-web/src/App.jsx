import React, { useState, useEffect } from 'react'
import { AppProvider, useApp } from './context.jsx'
import { CC } from './theme.js'

// ─── Scale phone to always fit viewport ──────────────────────────
function usePhoneScale() {
  const PHONE_W = 402, PHONE_H = 874, PAD = 32
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => {
      const sh = (window.innerHeight - PAD) / PHONE_H
      const sw = (window.innerWidth  - PAD) / PHONE_W
      setScale(Math.min(sh, sw, 1))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return scale
}

// ─── Direct imports (no lazy loading) ────────────────────────────
import { OnbSplash, OnbHandle, OnbPIN, OnbGarden, OnbAdoptMeo } from './screens/onboarding.jsx'
import { WalletHome, ScanQR, PayConfirm, Categorize, SpendingSummary, CategoryDetail, SavingsGoals, TopUp } from './screens/wallet.jsx'
import { DiscoverFeed, QuizPause, DailyCap, NewsFeedCard, PollCard, TipCard, NewsArticle, AskAlex, PlusPaywall } from './screens/discover.jsx'
import { LearnHome, PillarPath, LessonApply, AlexChat, ModuleCheckpoint, CheckpointPass } from './screens/learn.jsx'
import { QuizScreen, QuizResult, BudgetBuilder, ScamSpotter, NeedVsWant } from './screens/games.jsx'
import { ProfileHome, MeoStatus, CertificatesWall } from './screens/profile.jsx'

const SCREENS = {
  OnbSplash, OnbHandle, OnbPIN, OnbGarden, OnbAdoptMeo,
  WalletHome, ScanQR, PayConfirm, Categorize,
  SpendingSummary, CategoryDetail, SavingsGoals, TopUp,
  DiscoverFeed, QuizPause, DailyCap,
  NewsFeedCard, PollCard, TipCard, NewsArticle, AskAlex, PlusPaywall,
  LearnHome, PillarPath, LessonApply, AlexChat, ModuleCheckpoint, CheckpointPass,
  QuizScreen, QuizResult, BudgetBuilder, ScamSpotter, NeedVsWant,
  ProfileHome, MeoStatus, CertificatesWall,
}

// ─── iPhone frame ─────────────────────────────────────────────────
function PhoneFrame({ children }) {
  return (
    <div style={{
      width: 402, height: 874, borderRadius: 48, overflow: 'hidden',
      position: 'relative', flexShrink: 0,
      boxShadow: '0 60px 120px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.08)',
    }}>
      {/* Dynamic Island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 100,
        pointerEvents: 'none',
      }}/>
      {/* Status bar time */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 54,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        padding: '0 30px 10px', zIndex: 50, pointerEvents: 'none',
      }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: 'rgba(0,0,0,.7)' }}>9:41</span>
        <span style={{ fontSize: 11, color: 'rgba(0,0,0,.6)', display: 'flex', gap: 4 }}>
          <span>●●●●</span><span>▮</span>
        </span>
      </div>
      {/* Home indicator */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 139, height: 5, borderRadius: 100, background: 'rgba(0,0,0,.2)',
        zIndex: 100, pointerEvents: 'none',
      }}/>
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
    </div>
  )
}

// ─── Desktop blobs ────────────────────────────────────────────────
function DesktopBg() {
  return (
    <>
      <div style={{ position:'fixed', top:-100, left:-100, width:400, height:400, borderRadius:'50%', background:'rgba(63,142,92,.15)', filter:'blur(80px)', pointerEvents:'none' }}/>
      <div style={{ position:'fixed', bottom:-50, right:-50, width:350, height:350, borderRadius:'50%', background:'rgba(245,215,90,.08)', filter:'blur(60px)', pointerEvents:'none' }}/>
    </>
  )
}

// ─── Side panel ───────────────────────────────────────────────────
function SidePanel() {
  const { currentScreen, navigateTab } = useApp()
  const groups = [
    { label: 'ONBOARDING', screens: [['OnbSplash','Splash'],['OnbHandle','Handle'],['OnbPIN','PIN'],['OnbGarden','Garden Intro'],['OnbAdoptMeo','Adopt Mèo 🐱']] },
    { label: 'WALLET',     screens: [['WalletHome','Home'],['ScanQR','Scan QR'],['PayConfirm','Pay Confirm'],['Categorize','Categorize'],['SpendingSummary','Spending'],['CategoryDetail','Category'],['SavingsGoals','Goals'],['TopUp','Top-up']] },
    { label: 'DISCOVER',   screens: [['DiscoverFeed','Video Feed'],['NewsFeedCard','News Card 📰'],['PollCard','Poll 📊'],['TipCard','Tip 💡'],['NewsArticle','Article'],['AskAlex','Ask Alex ☂️'],['PlusPaywall','Plus Paywall'],['QuizPause','Quiz Pause'],['DailyCap','Daily Cap']] },
    { label: 'LEARN',      screens: [['LearnHome','Garden + Daily Quest'],['PillarPath','Pillar Path 🗺️'],['LessonApply','Lesson Apply'],['AlexChat','Alex Chat'],['ModuleCheckpoint','Checkpoint 🏅'],['CheckpointPass','Checkpoint Pass 🎉']] },
    { label: 'GAMES',      screens: [['QuizScreen','Quiz 🧠'],['QuizResult','Quiz Result'],['BudgetBuilder','Budget Builder 💰'],['ScamSpotter','Scam Spotter 🛡️'],['NeedVsWant','Need vs Want 🎮']] },
    { label: 'PROFILE',    screens: [['ProfileHome','Profile'],['MeoStatus','Mèo Status 🐱'],['CertificatesWall','Certificates']] },
  ]
  return (
    <div style={{ width: 220, color: 'rgba(255,255,255,.85)', fontSize: 12, display: 'flex', flexDirection: 'column', overflowY: 'auto', paddingRight: 8 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: -.5 }}>Cha-Ching</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>Design prototype · v1.0</div>
      </div>
      {groups.map(g => (
        <div key={g.label} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'rgba(255,255,255,.35)', marginBottom: 6 }}>{g.label}</div>
          {g.screens.map(([id, label]) => (
            <div key={id} onClick={() => navigateTab(id)} style={{
              padding: '6px 10px', borderRadius: 8, cursor: 'pointer', marginBottom: 2,
              background: currentScreen === id ? 'rgba(63,142,92,.35)' : 'transparent',
              color: currentScreen === id ? '#fff' : 'rgba(255,255,255,.6)',
              fontWeight: currentScreen === id ? 700 : 400,
              borderLeft: currentScreen === id ? `2px solid ${CC.green}` : '2px solid transparent',
            }}>{label}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Router ───────────────────────────────────────────────────────
function Router() {
  const { currentScreen } = useApp()
  const Screen = SCREENS[currentScreen]
  if (!Screen) return <div style={{ color: '#fff', padding: 20, background: CC.green, height: '100%' }}>Screen not found: {currentScreen}</div>
  return <Screen />
}

// ─── App shell ────────────────────────────────────────────────────
function AppShell() {
  const scale = usePhoneScale()
  return (
    <div style={{
      width: '100%', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <DesktopBg />
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        <PhoneFrame>
          <Router />
        </PhoneFrame>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
