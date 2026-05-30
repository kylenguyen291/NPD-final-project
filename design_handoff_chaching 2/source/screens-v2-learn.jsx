// Cha-Ching Redesign v2.0 — Learn-side screens
// GardenStage (Garden + Mèo), LearnHomeV2, PillarPath (Duolingo path),
// ModuleCheckpoint, CheckpointPass, OnbAdoptMeo

// ────────────────────────────────────────────────
// GardenStage — GardenScene + Mèo walking on the ground
// ────────────────────────────────────────────────
function GardenStage({ height = 200, coat = 'orange', stage = 'adult', mood = 'happy', walk = true, meoSize, left = '50%' }) {
  const size = meoSize || Math.round(height * 0.52);
  return (
    <div style={{ position: 'relative', lineHeight: 0 }}>
      <GardenScene height={height} />
      <div style={{
        position: 'absolute', bottom: height * 0.03, left,
        transform: 'translateX(-50%)',
        animation: walk ? 'meo-walk 6s ease-in-out infinite' : 'none',
      }}>
        <div style={{ animation: walk ? 'meo-bob 1.4s ease-in-out infinite' : 'none' }}>
          <Meo coat={coat} stage={stage} mood={mood} size={size} />
        </div>
      </div>
      <style>{`
        @keyframes meo-walk { 0%,100%{ margin-left:-46px } 50%{ margin-left:46px } }
        @keyframes meo-bob  { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-3px) } }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────────────
// LearnHome v2 — big streak, Mèo in garden, Daily Quest, pillars w/ modules
// ────────────────────────────────────────────────
function LearnHomeV2() {
  const pillars = [
    { i: '🛠️', name: 'Earn',    mod: 1, tot: 3, tone: CC.orange },
    { i: '🐷', name: 'Save',    mod: 2, tot: 3, tone: CC.green },
    { i: '🛒', name: 'Spend',   mod: 2, tot: 3, tone: CC.coral },
    { i: '🌳', name: 'Invest',  mod: 0, tot: 3, tone: CC.greenDeep },
    { i: '🌸', name: 'Give',    mod: 1, tot: 2, tone: '#9B7AC4' },
    { i: '🛡️', name: 'Protect', mod: 1, tot: 3, tone: CC.yellowDeep },
  ];
  return (
    <Phone bg={CC.mint}>
      {/* Header — big streak + Mèo stage */}
      <div style={{ padding: '12px 16px 4px', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: CC.ink3, fontWeight: 600, letterSpacing: .4 }}>YOUR GARDEN</div>
          <div style={{ fontSize: 21, fontWeight: 800, color: CC.greenInk, letterSpacing: -.3 }}>Mèo Vàng's Garden</div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'linear-gradient(135deg,#F5D75A,#E5B924)',
          padding: '8px 14px', borderRadius: 999,
          boxShadow: '0 4px 12px rgba(229,185,36,.3)',
        }}>
          <span style={{ fontSize: 20 }}>🔥</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: CC.greenInk, lineHeight: 1 }}>12</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '0 16px' }}>
        {/* Garden + Mèo */}
        <div style={{
          borderRadius: 22, overflow: 'hidden', position: 'relative',
          boxShadow: '0 4px 16px rgba(63,142,92,.12)', border: `1px solid ${CC.line}`,
        }}>
          <GardenStage height={190} coat="orange" stage="adult" mood="happy" />
          {/* Mèo status chip */}
          <div style={{
            position: 'absolute', top: 10, left: 10,
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,.92)', padding: '4px 10px 4px 4px', borderRadius: 999,
            boxShadow: '0 2px 6px rgba(27,34,24,.08)',
          }}>
            <MeoChip coat="orange" size={24} />
            <span style={{ fontSize: 12, fontWeight: 800, color: CC.ink }}>Mèo Vàng</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: CC.green, background: CC.mint, padding: '2px 6px', borderRadius: 6 }}>Adult</span>
          </div>
          {/* XP bar to next stage */}
          <div style={{ position: 'absolute', bottom: 8, right: 10, left: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,.5)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: '42%', height: '100%', background: CC.yellowDeep }} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: CC.greenInk, background: 'rgba(255,255,255,.85)', padding: '2px 6px', borderRadius: 6 }}>3.350 / 8k XP → Master</span>
          </div>
        </div>

        {/* Daily Quest */}
        <div style={{
          marginTop: 12, padding: 14, borderRadius: 18,
          background: CC.greenInk, color: '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>🎯</span>
            <div style={{ fontSize: 14, fontWeight: 800, flex: 1 }}>Daily Quest · feed Mèo</div>
            <span style={{ fontSize: 11, fontWeight: 700, color: CC.yellow }}>2/3</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <QuestTask icon="🎬" label="Watch a lesson" done />
            <QuestTask icon="❓" label="Today's quiz" done />
            <QuestTask icon="😊" label="Tag a feeling" />
          </div>
          <div style={{ fontSize: 11, opacity: .75, marginTop: 10 }}>Finish all 3 → +50 XP · +1.000 ₫ to Save · streak +1</div>
        </div>

        {/* Pillars w/ module progress */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 4px 8px' }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>6 Pillars · 18 modules</div>
          <div style={{ fontSize: 12, color: CC.green, fontWeight: 700 }}>Games 🎮</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {pillars.map(p => <PillarModCard key={p.name} {...p} />)}
        </div>
      </div>

      <TabBar active="learn" />
    </Phone>
  );
}

function QuestTask({ icon, label, done }) {
  return (
    <div style={{
      flex: 1, padding: '10px 6px', borderRadius: 12, textAlign: 'center',
      background: done ? CC.green : 'rgba(255,255,255,.1)',
      border: done ? 'none' : '1px dashed rgba(255,255,255,.25)',
    }}>
      <div style={{ fontSize: 18 }}>{done ? '✓' : icon}</div>
      <div style={{ fontSize: 10, fontWeight: 600, marginTop: 4, opacity: done ? 1 : .8 }}>{label}</div>
    </div>
  );
}

function PillarModCard({ i, name, mod, tot, tone }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 12, border: `1px solid ${CC.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10, background: CC.mint,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
        }}>{i}</div>
        <div style={{ fontSize: 14, fontWeight: 800, flex: 1 }}>{name}</div>
      </div>
      {/* Module pips */}
      <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
        {Array.from({ length: tot }).map((_, k) => (
          <div key={k} style={{
            flex: 1, height: 6, borderRadius: 3,
            background: k < mod ? tone : CC.mintDeep,
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <div style={{ fontSize: 11, color: CC.ink3 }}>Module {Math.min(mod + 1, tot)}/{tot}</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: mod ? tone : CC.ink3 }}>
          {mod === 0 ? 'Start →' : mod === tot ? '✓ Done' : 'Continue →'}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// PillarPath — Duolingo-style winding path (Save pillar)
// ────────────────────────────────────────────────
function PillarPath() {
  // node: state = done | current | locked ; type = lesson | checkpoint
  const nodes = [
    { type: 'lesson', state: 'done', x: 50 },
    { type: 'lesson', state: 'done', x: 28 },
    { type: 'lesson', state: 'done', x: 30 },
    { type: 'checkpoint', state: 'done', x: 52, label: 'Module 1 ✓' },
    { type: 'lesson', state: 'done', x: 70 },
    { type: 'lesson', state: 'current', x: 68 },
    { type: 'lesson', state: 'locked', x: 46 },
    { type: 'lesson', state: 'locked', x: 30 },
    { type: 'checkpoint', state: 'locked', x: 50, label: 'Module 2' },
  ];
  const GAP = 92, TOP = 30;
  const cy = (i) => TOP + i * GAP;

  return (
    <Phone bg={CC.mint}>
      {/* Hero */}
      <div style={{ background: CC.greenInk, color: '#fff', padding: '12px 18px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CircleBtn bg="rgba(255,255,255,.15)"><span style={{ color: '#fff' }}>‹</span></CircleBtn>
          <div style={{ flex: 1, fontSize: 11, opacity: .7, fontWeight: 700, letterSpacing: 1 }}>FOUNDATION ▸ PILLAR 02</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,.12)', padding: '4px 10px', borderRadius: 999 }}>
            <span style={{ fontSize: 13 }}>🔥</span><span style={{ fontSize: 13, fontWeight: 800 }}>12</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, background: CC.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🐷</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>Save</div>
            <div style={{ fontSize: 12, opacity: .8 }}>Module 2 of 3 · Save Smart</div>
          </div>
        </div>
      </div>

      {/* The winding path */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <svg width="100%" height="100%" viewBox={`0 0 360 ${cy(nodes.length) + 20}`} preserveAspectRatio="xMidYMin meet" style={{ position: 'absolute', top: 0, left: 0 }}>
            {/* Dotted connectors */}
            {nodes.slice(0, -1).map((n, i) => {
              const x1 = n.x / 100 * 360, y1 = cy(i);
              const x2 = nodes[i + 1].x / 100 * 360, y2 = cy(i + 1);
              const done = n.state === 'done' && nodes[i + 1].state !== 'locked';
              return <path key={i} d={`M${x1} ${y1} C ${x1} ${y1 + 46}, ${x2} ${y2 - 46}, ${x2} ${y2}`}
                stroke={done ? CC.green : CC.mintEdge} strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" fill="none"/>;
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((n, i) => (
            <PathNode key={i} {...n} top={cy(i)} idx={i} />
          ))}

          {/* Mèo at current node */}
          <div style={{
            position: 'absolute',
            top: cy(5) - 78, left: `${nodes[5].x}%`, transform: 'translateX(-50%)',
          }}>
            <Meo coat="orange" stage="adult" mood="happy" size={56} />
          </div>
        </div>
      </div>

      <TabBar active="learn" />
    </Phone>
  );
}

function PathNode({ type, state, x, label, top, idx }) {
  const done = state === 'done', cur = state === 'current', locked = state === 'locked';
  const isCp = type === 'checkpoint';
  const sz = isCp ? 64 : 56;
  const bg = done ? CC.green : cur ? '#fff' : '#D8E5DA';
  const fg = done ? '#fff' : cur ? CC.green : CC.ink3;

  return (
    <div style={{ position: 'absolute', top, left: `${x}%`, transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
      <div style={{
        width: sz, height: sz,
        borderRadius: isCp ? 14 : sz / 2,
        clipPath: isCp ? 'polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%)' : 'none',
        background: isCp ? (done ? 'linear-gradient(135deg,#F5D75A,#E5B924)' : '#D8E5DA') : bg,
        color: isCp ? CC.greenInk : fg,
        border: cur ? `3px solid ${CC.green}` : isCp && !done ? `2px dashed ${CC.mintEdge}` : 'none',
        boxShadow: cur ? `0 0 0 6px rgba(63,142,92,.18)` : done ? '0 4px 10px rgba(63,142,92,.25)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: isCp ? 24 : 20, fontWeight: 800,
        margin: '0 auto',
        animation: cur ? 'node-pulse 1.6s ease-in-out infinite' : 'none',
      }}>
        {isCp ? (done ? '🏅' : '🔒') : done ? '✓' : cur ? '▶' : locked ? '🔒' : idx + 1}
      </div>
      {(isCp || cur) && (
        <div style={{
          marginTop: 6, fontSize: 11, fontWeight: 800,
          color: cur ? CC.greenInk : locked ? CC.ink3 : CC.ink,
        }}>{isCp ? label : 'Where to keep money'}</div>
      )}
      <style>{`@keyframes node-pulse{0%,100%{box-shadow:0 0 0 6px rgba(63,142,92,.18)}50%{box-shadow:0 0 0 11px rgba(63,142,92,.06)}}`}</style>
    </div>
  );
}

// ────────────────────────────────────────────────
// Module Checkpoint — 5-question quiz
// ────────────────────────────────────────────────
function ModuleCheckpoint() {
  return (
    <Phone bg={CC.greenInk} style={{ color: '#fff' }}>
      {/* Top */}
      <div style={{ padding: '14px 18px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CircleBtn bg="rgba(255,255,255,.15)"><span style={{ color: '#fff' }}>✕</span></CircleBtn>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {[1,1,1,0,0].map((f, i) => (
            <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: f ? CC.yellow : 'rgba(255,255,255,.18)' }} />
          ))}
        </div>
        <span style={{ fontSize: 12, fontWeight: 800 }}>3/5</span>
      </div>

      <div style={{ flex: 1, padding: '8px 20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(245,215,90,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: 'polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%)' }}>🏅</div>
          <div style={{ fontSize: 11, opacity: .75, fontWeight: 700, letterSpacing: 1 }}>MODULE CHECKPOINT · SAVE SMART</div>
        </div>

        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.3, marginTop: 16 }}>
          Bạn để dành 50.000 ₫ mỗi tuần. Sau 6 tháng bạn có khoảng bao nhiêu?
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
          <CpOpt letter="A" text="300.000 ₫" />
          <CpOpt letter="B" text="650.000 ₫" />
          <CpOpt letter="C" text="1.300.000 ₫" selected />
          <CpOpt letter="D" text="2.600.000 ₫" />
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 14 }}>
          <Btn kind="yellow" size="lg" full>Check answer</Btn>
          <div style={{ textAlign: 'center', fontSize: 11, opacity: .7, marginTop: 10 }}>Pass with 4 / 5 · +200 XP & a Module Badge</div>
        </div>
      </div>
    </Phone>
  );
}

function CpOpt({ letter, text, selected }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '14px',
      borderRadius: 14,
      background: selected ? '#fff' : 'rgba(255,255,255,.08)',
      color: selected ? CC.greenInk : '#fff',
      border: `2px solid ${selected ? CC.yellow : 'rgba(255,255,255,.12)'}`,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 14,
        background: selected ? CC.yellow : 'rgba(255,255,255,.15)',
        color: selected ? CC.greenInk : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800,
      }}>{letter}</div>
      <div style={{ flex: 1, fontSize: 15, fontWeight: 700 }}>{text}</div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Checkpoint pass — celebration
// ────────────────────────────────────────────────
function CheckpointPass() {
  return (
    <Phone bg={CC.mint}>
      <div style={{ flex: 1, padding: '24px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: 8, fontSize: 22 }}>
          <span style={{ transform: 'rotate(-12deg)' }}>🎉</span>
          <span style={{ transform: 'rotate(8deg)' }}>🏅</span>
          <span style={{ transform: 'rotate(-4deg)' }}>🎊</span>
        </div>

        {/* Mèo celebrating */}
        <div style={{ marginTop: 10 }}>
          <Meo coat="orange" stage="adult" mood="happy" size={150} />
        </div>

        <div style={{ fontSize: 12, color: CC.green, fontWeight: 800, letterSpacing: 1.5, marginTop: 4 }}>MODULE CLEARED · 5/5</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: CC.greenInk, marginTop: 4 }}>Save Smart ✓</div>
        <div style={{ fontSize: 14, color: CC.ink2, marginTop: 8, maxWidth: 290, lineHeight: 1.5 }}>
          Mèo did a little dance. The piggy fountain in your Garden just bloomed 🌸
        </div>

        {/* Rewards */}
        <div style={{ display: 'flex', gap: 10, marginTop: 22, width: '100%' }}>
          <RewardPill icon="⭐" v="+200" l="XP" />
          <RewardPill icon="🏅" v="Badge" l="Save Smart" />
          <RewardPill icon="🔓" v="Module 3" l="unlocked" />
        </div>

        <div style={{ width: '100%', marginTop: 'auto', paddingBottom: 20, paddingTop: 22 }}>
          <Btn kind="primary" size="lg" full>Continue to Module 3 →</Btn>
          <div style={{ height: 10 }} />
          <Btn kind="ghost" size="md" full>Back to Garden 🌱</Btn>
        </div>
      </div>
    </Phone>
  );
}

function RewardPill({ icon, v, l }) {
  return (
    <div style={{ flex: 1, background: '#fff', borderRadius: 16, padding: '12px 8px', border: `1px solid ${CC.line}` }}>
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: CC.greenInk, marginTop: 4 }}>{v}</div>
      <div style={{ fontSize: 10, color: CC.ink3 }}>{l}</div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Onboarding — Adopt your Mèo
// ────────────────────────────────────────────────
function OnbAdoptMeo() {
  const coats = [
    { id: 'orange', label: 'Cam' },
    { id: 'tuxedo', label: 'Mun' },
    { id: 'grey',   label: 'Xám' },
    { id: 'calico', label: 'Tam thể' },
  ];
  const sel = 'orange';
  return (
    <Phone bg={CC.paper}>
      <ProgressBar step={6} total={7} />

      <div style={{ flex: 1, padding: '12px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -.3 }}>Adopt your Mèo</div>
        <div style={{ fontSize: 14, color: CC.ink2, marginTop: 4 }}>Your cat lives in the Garden and grows as you learn. Pick a look.</div>

        {/* Big preview */}
        <div style={{
          marginTop: 14, borderRadius: 22, overflow: 'hidden', position: 'relative',
          border: `1px solid ${CC.line}`,
        }}>
          <GardenStage height={170} coat={sel} stage="baby" mood="happy" walk={false} />
        </div>

        {/* Coat picker */}
        <div style={{ fontSize: 13, fontWeight: 700, color: CC.ink2, marginTop: 16 }}>Coat colour</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 8 }}>
          {coats.map(c => (
            <div key={c.id} style={{
              borderRadius: 16, padding: '8px 4px', textAlign: 'center',
              background: c.id === sel ? CC.mint : '#fff',
              border: c.id === sel ? `2.5px solid ${CC.green}` : `1px solid ${CC.line}`,
            }}>
              <MeoChip coat={c.id} size={40} />
              <div style={{ fontSize: 10, fontWeight: 700, marginTop: 2, color: CC.ink2 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Name input */}
        <div style={{ fontSize: 13, fontWeight: 700, color: CC.ink2, marginTop: 16 }}>Name your Mèo</div>
        <div style={{
          marginTop: 8, background: '#fff', borderRadius: 16, padding: '0 16px',
          display: 'flex', alignItems: 'center', gap: 8,
          border: `2px solid ${CC.green}`, boxShadow: '0 0 0 4px rgba(63,142,92,.12)',
        }}>
          <div style={{ flex: 1, fontSize: 18, fontWeight: 700, padding: '14px 0' }}>Mèo Vàng</div>
          <span style={{ fontSize: 11, color: CC.ink3 }}>8/16</span>
        </div>
      </div>

      <div style={{ padding: '0 24px 18px' }}>
        <Btn kind="primary" size="lg" full>Adopt Mèo Vàng  🐾</Btn>
      </div>
    </Phone>
  );
}

Object.assign(window, {
  GardenStage, LearnHomeV2, PillarPath, PathNode, ModuleCheckpoint, CheckpointPass, OnbAdoptMeo,
});
