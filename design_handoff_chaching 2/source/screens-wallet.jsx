// Cha-Ching — Wallet tab screens
// Uses theme.jsx primitives and IOSDevice frame.

// ────────────────────────────────────────────────
// 1. Wallet Home (the most important screen)
// ────────────────────────────────────────────────
function WalletHome() {
  return (
    <Phone bg={CC.mint}>
      <CCHeader />

      <div style={{ flex: 1, overflow: 'hidden', padding: '6px 16px 0' }}>
        {/* Balance hero */}
        <Card padding={18} radius={24} style={{
          background: `linear-gradient(160deg, ${CC.green} 0%, ${CC.greenDeep} 100%)`,
          color: '#fff',
          boxShadow: '0 8px 24px rgba(63,142,92,.25)',
        }}>
          <div style={{ fontSize: 12, opacity: .85, fontWeight: 500 }}>Tổng số dư · Total balance</div>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -.5, lineHeight: 1.1, marginTop: 2 }}>
            1.570.000 <span style={{ fontSize: 16, opacity: .8, fontWeight: 600 }}>₫</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
            <BucketPill icon="💸" label="Spend" amount="320K" tone="rgba(255,255,255,.18)"/>
            <BucketPill icon="🐷" label="Save"  amount="1,2M" tone="rgba(255,255,255,.18)"/>
            <BucketPill icon="❤️" label="Give"  amount="50K"  tone="rgba(255,255,255,.18)"/>
          </div>
        </Card>

        {/* Quick actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 6px 4px' }}>
          <QuickAction icon="↗" label="Send" />
          <QuickAction icon="↙" label="Request" />
          <QuickAction icon="❒" label="Scan QR" accent />
          <QuickAction icon="＋" label="Top-up" />
        </div>

        {/* Savings goals */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '14px 4px 8px' }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Savings goals</div>
          <div style={{ fontSize: 12, color: CC.green, fontWeight: 600 }}>See all →</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <GoalRing name="Bicycle 🚲" pct={64} left="720K" tone={CC.green} />
          <GoalRing name="AirPods 🎧" pct={28} left="1,8M" tone={CC.yellowDeep} />
        </div>

        {/* This week */}
        <div style={{ marginTop: 16 }}>
          <Card padding={14} radius={20}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>This week's spending</div>
              <div style={{ fontSize: 11, color: CC.ink3 }}>Mon–Sun</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 56 }}>
              {[24, 38, 22, 60, 14, 50, 30].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 3 ? CC.coral : CC.mintDeep, borderRadius: 4 }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: CC.ink3 }}>
              {['M','T','W','T','F','S','S'].map((d, i) => <span key={i}>{d}</span>)}
            </div>
          </Card>
        </div>

        {/* Tip of the day */}
        <div style={{
          marginTop: 14, padding: '12px 14px', borderRadius: 14,
          background: '#fff', display: 'flex', alignItems: 'center', gap: 10,
          border: `1px dashed ${CC.mintEdge}`,
        }}>
          <span style={{ fontSize: 18 }}>💡</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: CC.ink3, fontWeight: 600, letterSpacing: .3 }}>TIP OF THE DAY · 60s</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 1 }}>What is compound interest?</div>
          </div>
          <span style={{ color: CC.green, fontSize: 18 }}>›</span>
        </div>
      </div>

      <TabBar active="wallet" />
    </Phone>
  );
}

function BucketPill({ icon, label, amount, tone }) {
  return (
    <div style={{
      flex: 1, background: tone, padding: '8px 10px', borderRadius: 12,
      display: 'flex', flexDirection: 'column', gap: 1,
    }}>
      <div style={{ fontSize: 11, opacity: .85, display: 'flex', alignItems: 'center', gap: 4 }}>
        <span>{icon}</span><span>{label}</span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: -.2 }}>{amount}<span style={{ fontSize: 10, opacity: .7, marginLeft: 2 }}>₫</span></div>
    </div>
  );
}

function QuickAction({ icon, label, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        width: 52, height: 52, borderRadius: 26,
        background: accent ? CC.green : '#fff',
        color: accent ? '#fff' : CC.green,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, fontWeight: 600,
        boxShadow: accent ? '0 4px 14px rgba(63,142,92,.3)' : '0 1px 0 rgba(0,0,0,.04), 0 4px 12px rgba(27,34,24,.05)',
      }}>{icon}</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: CC.ink2 }}>{label}</div>
    </div>
  );
}

function GoalRing({ name, pct, left, tone }) {
  const r = 28, c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  return (
    <Card padding={12} radius={16} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} stroke={CC.mintDeep} strokeWidth="6" fill="none"/>
        <circle cx="32" cy="32" r={r} stroke={tone} strokeWidth="6" fill="none"
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round" transform="rotate(-90 32 32)"/>
        <text x="32" y="36" textAnchor="middle" fontSize="13" fontWeight="700" fill={CC.ink}>{pct}%</text>
      </svg>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ fontSize: 11, color: CC.ink3, marginTop: 2 }}>{left} ₫ left</div>
      </div>
    </Card>
  );
}

// ────────────────────────────────────────────────
// 2. Scan QR (camera view)
// ────────────────────────────────────────────────
function ScanQR() {
  return (
    <Phone bg="#0E1410" style={{ color: '#fff' }}>
      {/* Camera viewport */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Faux camera preview */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 45%, #2a3528 0%, #0E1410 70%), #0E1410',
        }} />
        {/* Storefront silhouette */}
        <div style={{
          position: 'absolute', bottom: '32%', left: '20%', right: '20%',
          height: 80, borderRadius: 4,
          background: 'rgba(255,255,255,.04)',
          border: '1px solid rgba(255,255,255,.05)',
        }} />
        <div style={{
          position: 'absolute', bottom: '46%', left: '32%', right: '32%',
          height: 14, background: 'rgba(255,255,255,.05)',
        }} />

        {/* QR frame */}
        <div style={{
          position: 'absolute', top: '34%', left: '50%', transform: 'translateX(-50%)',
          width: 220, height: 220, borderRadius: 16,
          background: 'rgba(0,0,0,.35)',
        }}>
          {/* Faux QR */}
          <div style={{
            position: 'absolute', inset: 24, borderRadius: 8,
            background: '#fff', padding: 8,
          }}>
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: `
                linear-gradient(#000 0 0), linear-gradient(#000 0 0), linear-gradient(#000 0 0),
                radial-gradient(circle at 20% 20%, #000 0 8%, transparent 8%),
                radial-gradient(circle at 80% 20%, #000 0 8%, transparent 8%),
                radial-gradient(circle at 20% 80%, #000 0 8%, transparent 8%)
              `,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#fff',
              maskImage: `repeating-conic-gradient(#000 0 25%, transparent 0 50%)`,
              maskSize: '14px 14px',
            }} />
          </div>
          {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h]) => (
            <div key={v+h} style={{
              position: 'absolute', [v]: -2, [h]: -2,
              width: 28, height: 28,
              borderTop: v === 'top' ? `3px solid ${CC.yellow}` : 'none',
              borderBottom: v === 'bottom' ? `3px solid ${CC.yellow}` : 'none',
              borderLeft: h === 'left' ? `3px solid ${CC.yellow}` : 'none',
              borderRight: h === 'right' ? `3px solid ${CC.yellow}` : 'none',
              borderRadius: 6,
            }} />
          ))}
        </div>

        {/* Top close */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          width: 36, height: 36, borderRadius: 18,
          background: 'rgba(0,0,0,.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: '#fff',
        }}>✕</div>

        {/* Title */}
        <div style={{
          position: 'absolute', top: 18, left: 0, right: 0,
          textAlign: 'center', fontSize: 16, fontWeight: 700, color: '#fff',
        }}>Scan to pay</div>

        {/* Bottom hint */}
        <div style={{
          position: 'absolute', bottom: 100, left: 24, right: 24,
          textAlign: 'center', color: 'rgba(255,255,255,.7)', fontSize: 13,
        }}>
          Point camera at a VietQR code
        </div>

        {/* Bottom dock */}
        <div style={{
          position: 'absolute', bottom: 18, left: 18, right: 18,
          background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(20px)',
          borderRadius: 18, padding: 6, display: 'flex', gap: 6,
        }}>
          <DockTab label="Scan" active />
          <DockTab label="My QR" />
          <DockTab label="Photo" />
        </div>
      </div>
    </Phone>
  );
}

function DockTab({ label, active }) {
  return (
    <div style={{
      flex: 1, height: 36, borderRadius: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 600,
      background: active ? '#fff' : 'transparent',
      color: active ? CC.greenInk : 'rgba(255,255,255,.7)',
    }}>{label}</div>
  );
}

// ────────────────────────────────────────────────
// Slide-to-pay swipe button — real drag, snap-back, complete state
// ────────────────────────────────────────────────
function SlideToPay() {
  const trackRef = React.useRef(null);
  const [x, setX] = React.useState(0);
  const [maxX, setMaxX] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const dragging = React.useRef(false);
  const startX = React.useRef(0);
  const startVal = React.useRef(0);

  const KNOB = 48;
  const HEIGHT = 56;

  // Measure track width
  React.useEffect(() => {
    if (!trackRef.current) return;
    const measure = () => {
      const w = trackRef.current.offsetWidth;
      setMaxX(Math.max(0, w - KNOB - 4));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  const onDown = (e) => {
    if (done) return;
    e.preventDefault();
    dragging.current = true;
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    startVal.current = x;
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const dx = cx - startX.current;
    setX(Math.max(0, Math.min(maxX, startVal.current + dx)));
  };
  const onUp = () => {
    dragging.current = false;
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    if (x >= maxX * 0.88) {
      setX(maxX);
      setDone(true);
      // Auto-reset for prototype feel
      setTimeout(() => { setDone(false); setX(0); }, 1800);
    } else {
      setX(0);
    }
  };

  const pct = maxX ? x / maxX : 0;
  const labelOpacity = Math.max(0, 1 - pct * 1.6);

  return (
    <div
      ref={trackRef}
      style={{
        position: 'relative', height: HEIGHT, borderRadius: HEIGHT / 2,
        background: done ? CC.greenDeep : CC.greenInk,
        overflow: 'hidden', userSelect: 'none', cursor: dragging.current ? 'grabbing' : 'pointer',
        transition: 'background .25s',
      }}
    >
      {/* Filled progress trail */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: x + KNOB / 2,
        background: `linear-gradient(90deg, ${CC.green} 0%, ${CC.green} 100%)`,
        transition: dragging.current ? 'none' : 'width .35s cubic-bezier(.2,.7,.3,1)',
      }}/>

      {/* Shimmer hint when idle */}
      {!done && x === 0 && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.18) 50%, transparent 100%)',
          backgroundSize: '60% 100%',
          backgroundRepeat: 'no-repeat',
          animation: 'sp-shimmer 1.8s infinite',
        }}/>
      )}

      {/* Label */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 15, fontWeight: 700, letterSpacing: .3,
        opacity: done ? 0 : labelOpacity,
        transition: dragging.current ? 'none' : 'opacity .2s',
        paddingLeft: KNOB,
      }}>
        Slide to pay  →
      </div>

      {/* Done label */}
      {done && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 15, fontWeight: 800,
        }}>
          ✓ Payment confirmed
        </div>
      )}

      {/* Knob */}
      <div
        onPointerDown={onDown}
        style={{
          position: 'absolute', top: 4, left: 4,
          width: KNOB, height: KNOB, borderRadius: KNOB / 2,
          background: '#fff',
          transform: `translateX(${x}px)`,
          transition: dragging.current ? 'none' : 'transform .35s cubic-bezier(.2,.7,.3,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: CC.green, fontSize: 22, fontWeight: 800,
          boxShadow: '0 2px 8px rgba(0,0,0,.18)',
          touchAction: 'none',
        }}
      >
        {done ? '✓' : '→'}
      </div>

      <style>{`@keyframes sp-shimmer { 0%{background-position:-60% 0} 100%{background-position:160% 0} }`}</style>
    </div>
  );
}

// ────────────────────────────────────────────────
// 3. Payment confirmation sheet
// ────────────────────────────────────────────────
function PayConfirm() {
  return (
    <Phone bg="rgba(14,20,16,.55)">
      <div style={{ flex: 1, position: 'relative' }}>
        {/* Faux camera behind */}
        <div style={{ position: 'absolute', inset: 0, background: '#1d2620', opacity: .9 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.45)' }} />

        {/* Sheet */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          background: '#fff', borderRadius: '24px 24px 0 0',
          padding: '14px 20px 28px',
          boxShadow: '0 -10px 40px rgba(0,0,0,.25)',
        }}>
          <div style={{ width: 36, height: 4, background: CC.lineHard, borderRadius: 2, margin: '0 auto 14px' }}/>

          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: CC.ink3, fontWeight: 600 }}>PAYING TO</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>Highland Coffee · Hai Bà Trưng</div>
          </div>

          {/* Amount entry */}
          <div style={{
            background: CC.mint, borderRadius: 18, padding: '18px 16px',
            display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6,
          }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: CC.greenInk, letterSpacing: -1 }}>65.000</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: CC.green }}>₫</div>
          </div>

          {/* Source */}
          <div style={{
            marginTop: 12, padding: '12px 14px', borderRadius: 14,
            border: `1px solid ${CC.line}`,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: CC.mint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>💸</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: CC.ink3 }}>Source</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Spend bucket · 320.000 ₫</div>
            </div>
            <span style={{ color: CC.ink3, fontSize: 14 }}>⇅</span>
          </div>

          {/* Pay button */}
          <div style={{ marginTop: 14 }}>
            <SlideToPay />
          </div>
          <div style={{ textAlign: 'center', fontSize: 11, color: CC.ink3, marginTop: 10 }}>
            🔒 Secured with PIN · No fees
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ────────────────────────────────────────────────
// 4. Categorize sheet — the critical post-payment moment
// ────────────────────────────────────────────────
function Categorize() {
  return (
    <Phone bg="rgba(14,20,16,.55)">
      <div style={{ flex: 1, position: 'relative' }}>
        {/* Success burst behind */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 50% 28%, rgba(123,190,130,.5) 0%, transparent 45%), #1d2620`,
        }} />
        {/* Check mark */}
        <div style={{
          position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)',
          width: 64, height: 64, borderRadius: 32, background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, color: CC.green, boxShadow: '0 8px 24px rgba(0,0,0,.2)',
        }}>✓</div>
        <div style={{
          position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', color: '#fff',
        }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>−65.000 ₫</div>
          <div style={{ fontSize: 12, opacity: .85, marginTop: 2 }}>Paid Highland Coffee · 14:32</div>
        </div>

        {/* Sheet */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          background: '#fff', borderRadius: '24px 24px 0 0',
          padding: '14px 18px 26px',
        }}>
          <div style={{ width: 36, height: 4, background: CC.lineHard, borderRadius: 2, margin: '0 auto 12px' }}/>
          <div style={{ fontSize: 18, fontWeight: 800, textAlign: 'center' }}>What was this for?</div>
          <div style={{ fontSize: 12, color: CC.ink3, textAlign: 'center', marginTop: 2 }}>One tap. We won't comment.</div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
            marginTop: 14,
          }}>
            <CatTile icon="🍔" label="Food & Drink" selected />
            <CatTile icon="🛍️" label="Shopping" />
            <CatTile icon="🎮" label="Entertainment" />
            <CatTile icon="🚗" label="Transport" />
            <CatTile icon="📚" label="Education" />
            <CatTile icon="💊" label="Health" />
            <CatTile icon="❤️" label="Giving" />
            <CatTile icon="➕" label="Other" />
          </div>

          {/* Emotion row */}
          <div style={{
            marginTop: 14, padding: '10px 14px', borderRadius: 14, background: CC.mint,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ fontSize: 11, color: CC.ink3, fontWeight: 600 }}>FEEL?</div>
            <div style={{ display: 'flex', gap: 10, marginLeft: 'auto', fontSize: 22 }}>
              <span style={{ filter: 'grayscale(1)', opacity: .55 }}>😞</span>
              <span style={{ filter: 'grayscale(1)', opacity: .55 }}>😐</span>
              <span>😊</span>
            </div>
          </div>
        </div>
      </div>
    </Phone>
  );
}

function CatTile({ icon, label, selected }) {
  return (
    <div style={{
      padding: '12px 10px', borderRadius: 14,
      background: selected ? CC.green : CC.mint,
      color: selected ? '#fff' : CC.ink,
      display: 'flex', alignItems: 'center', gap: 8,
      border: selected ? 'none' : `1px solid ${CC.line}`,
      boxShadow: selected ? '0 4px 12px rgba(63,142,92,.25)' : 'none',
    }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 700 }}>{label}</span>
    </div>
  );
}

// ────────────────────────────────────────────────
// 5. Spending Summary
// ────────────────────────────────────────────────
function SpendingSummary() {
  const rows = [
    { i: '🍔', name: 'Food & Drink',  amt: 480, pct: 38, band: CC.band.red,    delta: '↑ 120K', d: 'up' },
    { i: '🛍️', name: 'Shopping',      amt: 280, pct: 23, band: CC.band.orange, delta: '↓ 40K',  d: 'down' },
    { i: '🎮', name: 'Entertainment', amt: 200, pct: 16, band: CC.band.yellow, delta: '↑ 8K',   d: 'up' },
    { i: '🚗', name: 'Transport',     amt: 120, pct: 10, band: CC.band.green,  delta: '→',      d: 'flat' },
    { i: '📚', name: 'Education',     amt: 80,  pct: 6,  band: CC.band.green,  delta: '↑ 30K',  d: 'up' },
    { i: '💊', name: 'Health',        amt: 50,  pct: 4,  band: CC.band.green,  delta: '→',      d: 'flat' },
    { i: '➕', name: 'Other',         amt: 30,  pct: 2,  band: CC.band.gray,   delta: '↓ 10K',  d: 'down' },
  ];
  return (
    <Phone bg={CC.mint}>
      {/* Header */}
      <div style={{ padding: '12px 16px 6px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CircleBtn>‹</CircleBtn>
        <div style={{ flex: 1, fontSize: 17, fontWeight: 800 }}>Spending</div>
        <CircleBtn>📊</CircleBtn>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '0 16px' }}>
        {/* Segmented */}
        <div style={{
          display: 'flex', background: '#fff', borderRadius: 12, padding: 3,
          border: `1px solid ${CC.line}`,
        }}>
          {['Week','Month','Year'].map(t => (
            <div key={t} style={{
              flex: 1, padding: '8px 0', textAlign: 'center', fontSize: 13, fontWeight: 700,
              borderRadius: 10,
              background: t === 'Month' ? CC.greenInk : 'transparent',
              color: t === 'Month' ? '#fff' : CC.ink2,
            }}>{t}</div>
          ))}
        </div>

        {/* Totals card */}
        <Card padding={16} radius={20} style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, color: CC.ink3, fontWeight: 600 }}>TOTAL · MAY 2026</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -.5 }}>1.240.000</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: CC.green }}>₫</div>
            <div style={{ marginLeft: 'auto', fontSize: 12, color: CC.coral, fontWeight: 600 }}>↑ 8% vs April</div>
          </div>
          <div style={{ fontSize: 12, color: CC.ink3, marginTop: 2 }}>43 transactions</div>

          {/* Stacked horizontal bar */}
          <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', marginTop: 10 }}>
            {rows.map((r, i) => (
              <div key={i} style={{ width: `${r.pct}%`, background: r.band }} />
            ))}
          </div>
        </Card>

        {/* Category list */}
        <div style={{ marginTop: 10, background: '#fff', borderRadius: 18, padding: '4px 0', overflow: 'hidden' }}>
          {rows.map((r, i) => (
            <CatRow key={i} {...r} last={i === rows.length - 1} />
          ))}
        </div>
      </div>

      <TabBar active="wallet" />
    </Phone>
  );
}

function CatRow({ i, name, amt, pct, band, delta, d, last }) {
  const dcolor = d === 'up' ? CC.coral : d === 'down' ? CC.green : CC.ink3;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '10px 14px',
      borderBottom: last ? 'none' : `1px solid ${CC.line}`,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10, background: CC.mint,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
      }}>{i}</div>
      <div style={{ flex: 1, marginLeft: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <div style={{
            flex: 1, height: 4, background: CC.mintDeep, borderRadius: 2, overflow: 'hidden',
          }}>
            <div style={{ width: `${pct * 2.4}%`, height: '100%', background: band }} />
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'right', marginLeft: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: CC.ink, fontVariantNumeric: 'tabular-nums' }}>
          {amt}K <span style={{ color: CC.ink3, fontWeight: 500, fontSize: 11 }}>{pct}%</span>
        </div>
        <div style={{ fontSize: 10, color: dcolor, fontWeight: 600, marginTop: 2 }}>{delta}</div>
      </div>
      <div style={{ width: 8, height: 8, borderRadius: 4, background: band, marginLeft: 10 }}/>
    </div>
  );
}

// ────────────────────────────────────────────────
// 6. Category drill-down: Food & Drink transactions
// ────────────────────────────────────────────────
function CategoryDetail() {
  const txns = [
    { d: 'May 25', m: 'Highland Coffee Hai Bà Trưng', a: '65.000', e: '😊' },
    { d: 'May 24', m: 'Mixue Cầu Giấy',               a: '38.000', e: null },
    { d: 'May 22', m: 'Bún Chả Hương Liên',           a: '55.000', e: '😊' },
    { d: 'May 21', m: 'Grab Food · KFC',              a: '85.000', e: '😐' },
    { d: 'May 20', m: 'Phúc Long Times City',         a: '72.000', e: null },
    { d: 'May 19', m: 'Bánh Mì 25',                   a: '25.000', e: '😊' },
    { d: 'May 18', m: 'Highlands Royal City',         a: '68.000', e: null },
    { d: 'May 16', m: 'The Coffee House',             a: '72.000', e: '😊' },
  ];
  return (
    <Phone bg={CC.mint}>
      <div style={{ padding: '12px 16px 6px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CircleBtn>‹</CircleBtn>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: CC.ink3, fontWeight: 600 }}>SPENDING ▸ MAY 2026</div>
          <div style={{ fontSize: 17, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>🍔</span> Food & Drink
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '0 16px' }}>
        <Card padding={14} radius={18} style={{ background: CC.greenInk, color: '#fff' }}>
          <div style={{ fontSize: 11, opacity: .7, fontWeight: 600 }}>TOTAL THIS MONTH</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
            <div style={{ fontSize: 28, fontWeight: 800 }}>480.000</div>
            <div style={{ fontSize: 13, opacity: .8 }}>₫ · 18 txns</div>
            <div style={{ marginLeft: 'auto', fontSize: 12, color: CC.yellow, fontWeight: 600 }}>↑ 120K vs Apr</div>
          </div>
          {/* Daily sparkline */}
          <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 32, marginTop: 12 }}>
            {[20, 36, 12, 24, 48, 60, 28, 18, 32, 70, 22, 14, 26, 38, 16].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: 'rgba(245,215,90,.7)', borderRadius: 1 }} />
            ))}
          </div>
        </Card>

        <div style={{ marginTop: 12, background: '#fff', borderRadius: 18, overflow: 'hidden' }}>
          {txns.map((t, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', padding: '12px 14px',
              borderBottom: i === txns.length - 1 ? 'none' : `1px solid ${CC.line}`,
            }}>
              <div style={{ width: 44, fontSize: 11, color: CC.ink3, fontWeight: 600 }}>{t.d}</div>
              <div style={{ flex: 1, marginLeft: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.m}</div>
                {t.e && <div style={{ fontSize: 14, marginTop: 2 }}>{t.e}</div>}
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>−{t.a}</div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

// ────────────────────────────────────────────────
// 7. Savings Goals — list + create new
// ────────────────────────────────────────────────
function SavingsGoals() {
  return (
    <Phone bg={CC.mint}>
      <div style={{ padding: '12px 16px 6px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CircleBtn>‹</CircleBtn>
        <div style={{ flex: 1, fontSize: 17, fontWeight: 800 }}>Savings goals</div>
        <CircleBtn bg={CC.green}><span style={{ color: '#fff' }}>＋</span></CircleBtn>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '4px 16px' }}>
        {/* Bicycle — primary */}
        <Card padding={16} radius={22} style={{
          background: `linear-gradient(135deg, ${CC.green} 0%, ${CC.greenDeep} 100%)`,
          color: '#fff',
          marginBottom: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 28 }}>🚲</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800 }}>Bicycle</div>
              <div style={{ fontSize: 11, opacity: .8 }}>Target · Jul 2026</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>64%</div>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,.2)', borderRadius: 4, overflow: 'hidden', marginTop: 12 }}>
            <div style={{ width: '64%', height: '100%', background: CC.yellow }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12 }}>
            <span style={{ opacity: .8 }}>1.280.000 / 2.000.000 ₫</span>
            <span style={{ fontWeight: 700 }}>720K left</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Btn kind="yellow" size="sm" style={{ flex: 1 }}>+ Add money</Btn>
            <Btn kind="dark" size="sm" style={{ flex: 1, background: 'rgba(255,255,255,.15)' }}>Details</Btn>
          </div>
        </Card>

        <GoalCard icon="🎧" name="AirPods Gen 4" pct={28} cur="700.000" tgt="2.500.000" tone={CC.yellowDeep} rule="Auto 20% of top-ups" />
        <GoalCard icon="📷" name="Camera (used)" pct={12} cur="600.000" tgt="5.000.000" tone={CC.orange} rule="Manual" />

        {/* Empty 4th slot */}
        <div style={{
          marginTop: 10, padding: '18px 16px', borderRadius: 18,
          border: `1.5px dashed ${CC.mintEdge}`, textAlign: 'center',
          fontSize: 13, color: CC.ink3,
        }}>
          You can have <b style={{ color: CC.ink }}>3 active goals</b> at once · ✓ ✓ ✓
        </div>
      </div>

      <TabBar active="wallet" />
    </Phone>
  );
}

function GoalCard({ icon, name, pct, cur, tgt, tone, rule }) {
  return (
    <Card padding={14} radius={18} style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12, background: CC.mint,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
        }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{name}</div>
          <div style={{ fontSize: 11, color: CC.ink3 }}>{rule}</div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 800 }}>{pct}%</div>
      </div>
      <div style={{ height: 6, background: CC.mintDeep, borderRadius: 3, overflow: 'hidden', marginTop: 10 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: tone }} />
      </div>
      <div style={{ fontSize: 11, color: CC.ink3, marginTop: 6 }}>{cur} / {tgt} ₫</div>
    </Card>
  );
}

// ────────────────────────────────────────────────
// 8. Top-up screen (virtual account number)
// ────────────────────────────────────────────────
function TopUp() {
  return (
    <Phone bg={CC.mint}>
      <div style={{ padding: '12px 16px 6px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CircleBtn>‹</CircleBtn>
        <div style={{ flex: 1, fontSize: 17, fontWeight: 800 }}>Top up</div>
      </div>

      <div style={{ flex: 1, padding: '6px 16px' }}>
        <div style={{ fontSize: 13, color: CC.ink2, lineHeight: 1.45 }}>
          Send this account number to a parent or guardian. Funds land in your <b>Spend</b> bucket in a few minutes.
        </div>

        <Card padding={20} radius={24} style={{ marginTop: 14, textAlign: 'center' }}>
          {/* Logo */}
          <div style={{ fontSize: 11, color: CC.ink3, fontWeight: 700, letterSpacing: 1 }}>YOUR ACCOUNT</div>
          <div style={{ fontSize: 13, color: CC.ink2, marginTop: 4 }}>VPBank · Cha-Ching Virtual</div>
          <div style={{
            marginTop: 10, fontSize: 26, fontWeight: 800,
            letterSpacing: 2, color: CC.greenInk, fontVariantNumeric: 'tabular-nums',
          }}>0801 2294 6651</div>
          <div style={{ fontSize: 12, color: CC.ink3, marginTop: 4 }}>KYLE NGUYEN · CHACHING</div>

          {/* QR */}
          <div style={{
            width: 140, height: 140, margin: '16px auto 8px',
            background: '#fff', border: `1px solid ${CC.line}`,
            borderRadius: 14, padding: 8,
          }}>
            <div style={{
              width: '100%', height: '100%',
              background: '#000',
              maskImage: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)',
              WebkitMaskImage: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)',
              maskSize: '10px 10px',
              WebkitMaskSize: '10px 10px',
            }} />
          </div>
          <div style={{ fontSize: 11, color: CC.ink3 }}>Scan with any Vietnamese bank app</div>
        </Card>

        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <Btn kind="primary" size="md" style={{ flex: 1 }}>📋 Copy number</Btn>
          <Btn kind="light" size="md" style={{ flex: 1 }}>↗ Share on Zalo</Btn>
        </div>

        <div style={{
          marginTop: 18, padding: 14, borderRadius: 14, background: '#fff',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 20 }}>💡</span>
          <div style={{ fontSize: 12, color: CC.ink2, lineHeight: 1.4, flex: 1 }}>
            Tết lì xì season? Ask parents to top up here — never share your PIN.
          </div>
        </div>
      </div>

      <TabBar active="wallet" />
    </Phone>
  );
}

Object.assign(window, { WalletHome, ScanQR, PayConfirm, Categorize, SpendingSummary, CategoryDetail, SavingsGoals, TopUp });
