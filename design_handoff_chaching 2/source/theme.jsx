// Cha-Ching shared theme + small UI primitives
// Brand palette per PRD §4.3
const CC = {
  // Primary
  green: '#3F8E5C',
  greenDeep: '#2F6E47',
  greenInk: '#1F4A2E',
  mint: '#E8F4EA',
  mintDeep: '#C7E5C9',
  mintEdge: '#A8D4AC',
  // Accents
  yellow: '#F5D75A',
  yellowDeep: '#E5B924',
  coral: '#E76F62',
  orange: '#F0A04B',
  // Neutrals
  paper: '#FBFAF6',
  ink: '#1B2218',
  ink2: '#4A5A4D',
  ink3: '#7E8E84',
  line: 'rgba(27,34,24,0.08)',
  lineHard: 'rgba(27,34,24,0.14)',
  white: '#FFFFFF',
  // Color band semantics
  band: {
    red: '#E76F62',   // 🔴 highest
    orange: '#F0A04B', // 🟠
    yellow: '#F5D75A', // 🟡
    green: '#7BBE82',  // 🟢
    gray: '#C6CCC8',   // ⚪
  },
};

const CCFont = `"Be Vietnam Pro", "Nunito", -apple-system, system-ui, sans-serif`;

// Inject Google Font once
if (typeof document !== 'undefined' && !document.getElementById('cc-fonts')) {
  const l = document.createElement('link');
  l.id = 'cc-fonts';
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&family=Caveat:wght@500;600&display=swap';
  document.head.appendChild(l);
}

// ────────────────────────────────────────────────
// VND formatter
// ────────────────────────────────────────────────
const vnd = (n) => new Intl.NumberFormat('vi-VN').format(n);

// ────────────────────────────────────────────────
// Phone — body wrapper for content INSIDE an IOSDevice
// (subtracts status bar / home indicator paddings).
// Children get a 402×(874-54-34) box.
// ────────────────────────────────────────────────
function Phone({ children, bg = CC.mint, style = {} }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      paddingTop: 54, paddingBottom: 34,
      fontFamily: CCFont, color: CC.ink, fontSize: 14,
      WebkitFontSmoothing: 'antialiased',
      boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      ...style,
    }}>{children}</div>
  );
}

// ────────────────────────────────────────────────
// ChaChing top header bar — "Hi, Liam 👋" + actions
// ────────────────────────────────────────────────
function CCHeader({ name = 'Kyle', dark = false, ink = CC.ink, streak = 12 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px 10px' }}>
      <div style={{
        width: 38, height: 38, borderRadius: 19,
        background: 'linear-gradient(135deg,#F5D75A,#E5B924)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, marginRight: 10,
        boxShadow: '0 1px 0 rgba(0,0,0,.04)',
      }}>🧑‍🎓</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: CC.ink3, letterSpacing: .2 }}>Xin chào</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: ink, lineHeight: 1.1 }}>{name} 👋</div>
      </div>
      {streak != null && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: '#fff', padding: '6px 11px', borderRadius: 999,
          border: `1px solid ${CC.line}`, marginRight: 8,
          boxShadow: '0 1px 2px rgba(27,34,24,.06)',
        }}>
          <span style={{ fontSize: 14 }}>🔥</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: CC.ink }}>{streak}</span>
        </div>
      )}
      <CircleBtn>🔔</CircleBtn>
      <div style={{ width: 8 }} />
      <CircleBtn>⚙️</CircleBtn>
    </div>
  );
}

function CircleBtn({ children, bg = '#fff', size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 16, boxShadow: '0 1px 2px rgba(27,34,24,.06)',
      border: `1px solid ${CC.line}`,
    }}>{children}</div>
  );
}

// ────────────────────────────────────────────────
// Bottom tab bar
// ────────────────────────────────────────────────
function TabBar({ active = 'wallet' }) {
  const tabs = [
    { id: 'wallet',   label: 'Wallet',   icon: '💳' },
    { id: 'discover', label: 'Discover', icon: '📺' },
    { id: 'learn',    label: 'Learn',    icon: '🎓' },
    { id: 'profile',  label: 'Profile',  icon: '👤' },
  ];
  return (
    <div style={{
      display: 'flex',
      background: '#fff',
      borderTop: `1px solid ${CC.line}`,
      padding: '8px 8px 6px',
      gap: 4,
    }}>
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <div key={t.id} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 2, padding: '4px 0',
            color: on ? CC.green : CC.ink3,
            position: 'relative',
          }}>
            <div style={{
              width: 44, height: 28, borderRadius: 14,
              background: on ? CC.mint : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>{t.icon}</div>
            <div style={{ fontSize: 11, fontWeight: on ? 700 : 500 }}>{t.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────
// Generic small card
// ────────────────────────────────────────────────
function Card({ children, style = {}, padding = 16, radius = 20 }) {
  return (
    <div style={{
      background: '#fff', borderRadius: radius, padding,
      boxShadow: '0 1px 0 rgba(27,34,24,.04), 0 6px 20px rgba(27,34,24,.05)',
      ...style,
    }}>{children}</div>
  );
}

// ────────────────────────────────────────────────
// Pill button (rounded rect)
// ────────────────────────────────────────────────
function Btn({ children, kind = 'primary', size = 'md', style = {}, full = false }) {
  const sizes = {
    sm: { h: 32, fs: 13, px: 14 },
    md: { h: 44, fs: 15, px: 18 },
    lg: { h: 52, fs: 16, px: 22 },
  }[size];
  const styles = {
    primary: { bg: CC.green, color: '#fff' },
    yellow:  { bg: CC.yellow, color: CC.greenInk },
    ghost:   { bg: 'transparent', color: CC.green, border: `1.5px solid ${CC.green}` },
    light:   { bg: CC.mint, color: CC.greenInk },
    dark:    { bg: CC.greenInk, color: '#fff' },
  }[kind];
  return (
    <div style={{
      height: sizes.h,
      padding: `0 ${sizes.px}px`,
      borderRadius: 12,
      background: styles.bg,
      color: styles.color,
      fontSize: sizes.fs,
      fontWeight: 700,
      display: full ? 'flex' : 'inline-flex',
      width: full ? '100%' : undefined,
      alignItems: 'center', justifyContent: 'center', gap: 8,
      border: styles.border || 'none',
      boxSizing: 'border-box',
      ...style,
    }}>{children}</div>
  );
}

// ────────────────────────────────────────────────
// Striped placeholder (for imagery) — monospace label
// ────────────────────────────────────────────────
function Placeholder({ label, height = 120, dark = false }) {
  const stripe = dark ? 'rgba(255,255,255,.06)' : 'rgba(63,142,92,.07)';
  const base   = dark ? 'rgba(255,255,255,.04)' : 'rgba(63,142,92,.04)';
  return (
    <div style={{
      height, borderRadius: 16, overflow: 'hidden',
      background: `repeating-linear-gradient(135deg, ${base} 0 12px, ${stripe} 12px 24px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: dark ? 'rgba(255,255,255,.7)' : CC.ink3,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 11, letterSpacing: 1,
      border: `1px dashed ${dark ? 'rgba(255,255,255,.18)' : 'rgba(63,142,92,.2)'}`,
    }}>{label}</div>
  );
}

// Tiny status bar overlay (when we don't use IOSDevice's built-in)
function MiniStatus({ dark = false }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{ position: 'absolute', top: 18, left: 0, right: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', color: c, fontWeight: 600, fontSize: 14, zIndex: 5,
      pointerEvents: 'none',
    }}>
      <span style={{ fontFamily: '-apple-system, sans-serif' }}>9:41</span>
      <span style={{ fontSize: 11, opacity: .85 }}>● ● ● ● ▮</span>
    </div>
  );
}

Object.assign(window, {
  CC, CCFont, vnd, Phone, CCHeader, CircleBtn, TabBar, Card, Btn, Placeholder, MiniStatus,
});
