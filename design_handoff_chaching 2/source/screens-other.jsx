// Cha-Ching — Profile + Onboarding screens

// ────────────────────────────────────────────────
// Brand mark — coin with ₫ and a sprouting leaf
// (money + garden, no pig)
// ────────────────────────────────────────────────
function CCMark({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {/* Sprout leaf, behind */}
      <path d="M32 20 Q22 14 18 4 Q28 6 34 16 Z" fill="#3F8E5C"/>
      <path d="M32 20 Q22 14 18 4" stroke="#2F6E47" strokeWidth="1.2" fill="none"/>
      <path d="M32 20 Q40 14 46 6 Q42 18 34 22 Z" fill="#5BAA72"/>
      {/* Coin */}
      <circle cx="32" cy="40" r="20" fill="#F5D75A"/>
      <circle cx="32" cy="40" r="20" fill="none" stroke="#E5B924" strokeWidth="2"/>
      <circle cx="32" cy="40" r="15" fill="none" stroke="#E5B924" strokeWidth="1.2" strokeDasharray="2 2" opacity=".55"/>
      {/* ₫ symbol */}
      <text x="32" y="48" textAnchor="middle"
        fontSize="22" fontWeight="800" fill="#1F4A2E"
        fontFamily='"Be Vietnam Pro", system-ui'>₫</text>
      {/* Stem */}
      <path d="M32 20 L32 24" stroke="#2F6E47" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

// ────────────────────────────────────────────────
// 1. Profile main
// ────────────────────────────────────────────────
function ProfileHome() {
  return (
    <Phone bg={CC.mint}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(160deg, ${CC.green}, ${CC.greenDeep})`,
        color: '#fff', padding: '14px 18px 26px', position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative leaves */}
        <div style={{ position: 'absolute', right: -10, top: -8, fontSize: 70, opacity: .12 }}>🌿</div>
        <div style={{ position: 'absolute', right: 80, bottom: -14, fontSize: 50, opacity: .12 }}>🌱</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 32,
            background: 'linear-gradient(135deg,#F5D75A,#E5B924)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 34, border: '3px solid #fff',
          }}>🧑‍🎓</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800 }}>Kyle Nguyen</div>
            <div style={{ fontSize: 12, opacity: .85 }}>@kyle.long · 14 · Hà Nội</div>
            <div style={{
              marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,.18)', padding: '4px 10px', borderRadius: 999,
              fontSize: 11, fontWeight: 700,
            }}>🪴 LEVEL 6 · GARDENER</div>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <PStat v="1.240" l="XP earned"/>
          <PStat v="🔥 12" l="day streak"/>
          <PStat v="2/6" l="pillars"/>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '4px 16px', marginTop: -10 }}>
        {/* Certificates */}
        <Card padding={14} radius={20}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800 }}>Certificates & badges</div>
            <div style={{ fontSize: 11, color: CC.green, fontWeight: 700 }}>View all</div>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'hidden' }}>
            <Badge icon="🐷" name="Save" earned />
            <Badge icon="🛡️" name="Protect" earned />
            <Badge icon="🛒" name="Spend" locked />
            <Badge icon="🛠️" name="Earn" locked />
            <Badge icon="🌳" name="Invest" locked />
          </div>
        </Card>

        {/* Settings list */}
        <div style={{ marginTop: 12, background: '#fff', borderRadius: 20, overflow: 'hidden' }}>
          <SettingRow icon="🔔" label="Notifications" detail="3 active" />
          <SettingRow icon="📺" label="Discover daily cap" detail="25 min" />
          <SettingRow icon="🔒" label="PIN & biometric" detail="Face ID on" />
          <SettingRow icon="🤖" label="What Alex can see" detail="Learning only" />
          <SettingRow icon="🌐" label="Language" detail="Tiếng Việt" />
          <SettingRow icon="❓" label="Help & support" last />
        </div>

        <div style={{ marginTop: 12, padding: '14px', textAlign: 'center', fontSize: 12, color: CC.ink3 }}>
          Cha-Ching v1.0 · MVP · Made in 🇻🇳
        </div>
      </div>

      <TabBar active="profile" />
    </Phone>
  );
}

function PStat({ v, l }) {
  return (
    <div style={{
      flex: 1, background: 'rgba(255,255,255,.16)', padding: '8px 12px', borderRadius: 14,
      backdropFilter: 'blur(6px)',
    }}>
      <div style={{ fontSize: 16, fontWeight: 800 }}>{v}</div>
      <div style={{ fontSize: 10, opacity: .8 }}>{l}</div>
    </div>
  );
}

function Badge({ icon, name, earned, locked }) {
  return (
    <div style={{
      flex: 1, minWidth: 60,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: earned ? `linear-gradient(135deg, ${CC.yellow}, ${CC.yellowDeep})` : CC.mintDeep,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24,
        filter: locked ? 'grayscale(1) opacity(.55)' : 'none',
        border: earned ? '2px solid #fff' : 'none',
        boxShadow: earned ? '0 4px 10px rgba(229,185,36,.35)' : 'none',
      }}>{locked ? '🔒' : icon}</div>
      <div style={{ fontSize: 10, fontWeight: 700, color: locked ? CC.ink3 : CC.ink }}>{name}</div>
    </div>
  );
}

function SettingRow({ icon, label, detail, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '12px 14px', gap: 12,
      borderBottom: last ? 'none' : `1px solid ${CC.line}`,
    }}>
      <div style={{ fontSize: 18 }}>{icon}</div>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 12, color: CC.ink3 }}>{detail}</div>
      <span style={{ color: CC.ink3, fontSize: 14 }}>›</span>
    </div>
  );
}

// ────────────────────────────────────────────────
// 2. Certificates wall
// ────────────────────────────────────────────────
function CertificatesWall() {
  return (
    <Phone bg={CC.mint}>
      <div style={{ padding: '12px 16px 6px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CircleBtn>‹</CircleBtn>
        <div style={{ flex: 1, fontSize: 17, fontWeight: 800 }}>Achievements</div>
      </div>

      <div style={{ flex: 1, padding: '4px 16px', overflow: 'hidden' }}>
        {/* Foundation cert */}
        <Card padding={16} radius={22} style={{
          background: `linear-gradient(135deg, ${CC.greenInk}, ${CC.green})`,
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -6, top: -10, fontSize: 90, opacity: .15 }}>🏆</div>
          <div style={{ fontSize: 10, opacity: .7, fontWeight: 700, letterSpacing: 2 }}>FOUNDATION TIER</div>
          <div style={{ fontSize: 17, fontWeight: 800, marginTop: 4 }}>Cha-Ching Certificate</div>
          <div style={{ fontSize: 12, opacity: .85, marginTop: 4 }}>2 of 6 pillars complete · keep going</div>
          <div style={{ height: 6, background: 'rgba(255,255,255,.18)', borderRadius: 3, marginTop: 10, overflow: 'hidden' }}>
            <div style={{ width: '33%', height: '100%', background: CC.yellow }}/>
          </div>
          <div style={{ fontSize: 11, opacity: .75, marginTop: 6 }}>Co-signed with VinUniversity Entrepreneurship Lab</div>
        </Card>

        {/* Earned section */}
        <div style={{ marginTop: 14, fontSize: 12, color: CC.ink3, fontWeight: 700, letterSpacing: 1 }}>EARNED · 2</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 6 }}>
          <CertCard icon="🐷" name="Save Foundation" date="May 14, 2026" tone={CC.green}/>
          <CertCard icon="🛡️" name="Protect Foundation" date="May 22, 2026" tone={CC.yellowDeep}/>
        </div>

        <div style={{ marginTop: 14, fontSize: 12, color: CC.ink3, fontWeight: 700, letterSpacing: 1 }}>IN PROGRESS · 4</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 6 }}>
          <CertCard icon="🛠️" name="Earn"  date="3 of 10" locked/>
          <CertCard icon="🛒" name="Spend" date="5 of 10" locked/>
          <CertCard icon="🌳" name="Invest" date="0 of 8" locked/>
          <CertCard icon="🌸" name="Give"   date="2 of 6" locked/>
        </div>
      </div>

      <TabBar active="profile" />
    </Phone>
  );
}

function CertCard({ icon, name, date, tone, locked }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: 12,
      border: `1px solid ${CC.line}`,
      opacity: locked ? .85 : 1,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14,
        background: locked ? CC.mintDeep : `linear-gradient(135deg, ${tone}, ${CC.greenInk})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22,
        filter: locked ? 'grayscale(1)' : 'none',
      }}>{icon}</div>
      <div style={{ fontSize: 13, fontWeight: 800, marginTop: 8 }}>{name}</div>
      <div style={{ fontSize: 11, color: CC.ink3, marginTop: 2 }}>{date}</div>
    </div>
  );
}

// ────────────────────────────────────────────────
// 3. Onboarding — Splash / Welcome
// ────────────────────────────────────────────────
function OnbSplash() {
  return (
    <Phone bg={CC.green} style={{ color: '#fff', position: 'relative' }}>
      <div style={{ flex: 1, padding: '12px 24px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Coins */}
        <div style={{ position: 'absolute', top: 30, right: 40, fontSize: 28, transform: 'rotate(-10deg)' }}>🪙</div>
        <div style={{ position: 'absolute', top: 80, left: 30, fontSize: 22, transform: 'rotate(15deg)' }}>🪙</div>
        <div style={{ position: 'absolute', top: 50, left: '50%', fontSize: 18 }}>✨</div>

        {/* Logo — coin sprouting a leaf */}
        <div style={{ textAlign: 'center', marginTop: 80 }}>
          <div style={{
            width: 96, height: 96, borderRadius: 28,
            background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 12px 30px rgba(0,0,0,.18)',
          }}>
            <CCMark size={62} />
          </div>
          <div style={{
            fontSize: 38, fontWeight: 800, marginTop: 18, letterSpacing: -.5,
            fontFamily: '"Caveat", cursive', color: '#fff',
          }}>Cha-Ching</div>
          <div style={{ fontSize: 14, opacity: .85, marginTop: 4 }}>The teen wallet that grows with you</div>
        </div>

        {/* Mini garden preview */}
        <div style={{
          marginTop: 30, padding: 4, borderRadius: 20, background: 'rgba(255,255,255,.12)',
        }}>
          <div style={{ borderRadius: 18, overflow: 'hidden' }}>
            <GardenScene height={150} />
          </div>
        </div>

        {/* Bottom */}
        <div style={{ position: 'absolute', bottom: 30, left: 24, right: 24 }}>
          <Btn kind="yellow" size="lg" full>Get Started  →</Btn>
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, opacity: .85 }}>
            Have an account? <b>Sign in</b>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ────────────────────────────────────────────────
// 4. Onboarding — Pick handle + avatar
// ────────────────────────────────────────────────
function OnbHandle() {
  const avatars = ['🧑‍🎓','👨🏻‍🎤','👩🏻','🧑🏻‍💻','👦🏻','👧🏻','🧑🏻‍🎨','🧑🏻'];
  return (
    <Phone bg={CC.paper}>
      <ProgressBar step={3} total={7} />

      <div style={{ flex: 1, padding: '16px 24px' }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -.3 }}>Pick a handle</div>
        <div style={{ fontSize: 14, color: CC.ink2, marginTop: 4 }}>This is how friends will see you. You can change it later.</div>

        {/* Input */}
        <div style={{
          marginTop: 22, background: '#fff', borderRadius: 16, padding: '4px 14px',
          display: 'flex', alignItems: 'center', gap: 8,
          border: `2px solid ${CC.green}`,
          boxShadow: '0 0 0 4px rgba(63,142,92,.12)',
        }}>
          <span style={{ fontSize: 18, color: CC.ink3 }}>@</span>
          <div style={{ flex: 1, fontSize: 18, fontWeight: 700, padding: '14px 0' }}>kyle.long</div>
          <span style={{ color: CC.green, fontSize: 16 }}>✓</span>
        </div>
        <div style={{ fontSize: 12, color: CC.green, fontWeight: 600, marginTop: 6, paddingLeft: 4 }}>
          ✓ Available · 9/15 characters
        </div>

        {/* Avatars */}
        <div style={{ fontSize: 13, fontWeight: 700, color: CC.ink2, marginTop: 24 }}>Pick an avatar</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 10 }}>
          {avatars.map((a, i) => (
            <div key={i} style={{
              aspectRatio: '1/1', borderRadius: 18,
              background: i === 0 ? 'linear-gradient(135deg,#F5D75A,#E5B924)' : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28,
              border: i === 0 ? `3px solid ${CC.green}` : `1px solid ${CC.line}`,
              boxShadow: i === 0 ? '0 4px 12px rgba(63,142,92,.2)' : 'none',
            }}>{a}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 24px 18px' }}>
        <Btn kind="primary" size="lg" full>Continue  →</Btn>
      </div>
    </Phone>
  );
}

function ProgressBar({ step, total }) {
  return (
    <div style={{ padding: '14px 24px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
      <CircleBtn>‹</CircleBtn>
      <div style={{ flex: 1, height: 6, background: CC.mintDeep, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${(step / total) * 100}%`, height: '100%', background: CC.green }}/>
      </div>
      <div style={{ fontSize: 12, color: CC.ink3, fontWeight: 600 }}>{step}/{total}</div>
    </div>
  );
}

// ────────────────────────────────────────────────
// 5. Onboarding — Set PIN
// ────────────────────────────────────────────────
function OnbPIN() {
  const filled = 4;
  return (
    <Phone bg={CC.paper}>
      <ProgressBar step={4} total={7} />

      <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 24, fontWeight: 800 }}>Create a PIN</div>
        <div style={{ fontSize: 14, color: CC.ink2, marginTop: 4 }}>You'll use this every time you pay. Keep it secret.</div>

        {/* PIN dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 36 }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{
              width: 16, height: 16, borderRadius: 8,
              background: i < filled ? CC.green : '#fff',
              border: `2px solid ${i < filled ? CC.green : CC.mintEdge}`,
            }} />
          ))}
        </div>

        {/* Keypad */}
        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <KeyBtn key={n}>{n}</KeyBtn>
          ))}
          <div />
          <KeyBtn>0</KeyBtn>
          <KeyBtn>⌫</KeyBtn>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
          background: '#fff', borderRadius: 12, marginTop: 14, fontSize: 12, color: CC.ink2,
          border: `1px solid ${CC.line}`,
        }}>
          <span style={{ fontSize: 18 }}>👤</span>
          <span style={{ flex: 1 }}>Also use Face ID to unlock?</span>
          <div style={{
            width: 36, height: 22, borderRadius: 11, background: CC.green, position: 'relative',
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: 9, background: '#fff',
              position: 'absolute', top: 2, right: 2,
            }}/>
          </div>
        </div>
      </div>
    </Phone>
  );
}

function KeyBtn({ children }) {
  return (
    <div style={{
      height: 56, borderRadius: 14, background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 24, fontWeight: 600, color: CC.ink,
      border: `1px solid ${CC.line}`,
    }}>{children}</div>
  );
}

// ────────────────────────────────────────────────
// 6. Onboarding — Garden intro
// ────────────────────────────────────────────────
function OnbGarden() {
  return (
    <Phone bg={CC.mint}>
      <ProgressBar step={5} total={7} />

      <div style={{ flex: 1, padding: '8px 18px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ borderRadius: 22, overflow: 'hidden', marginTop: 12 }}>
          <GardenScene height={180} />
        </div>

        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -.3, marginTop: 22, padding: '0 6px' }}>
          Welcome to your Garden 🌱
        </div>
        <div style={{ fontSize: 14, color: CC.ink2, marginTop: 8, lineHeight: 1.5, padding: '0 6px' }}>
          Every smart money move grows something here. Save more, plants bloom. Learn a pillar, a new zone appears. The Garden is just <b>you</b>.
        </div>

        {/* Features */}
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FeatureRow icon="🐷" t="Save" d="A piggy fountain that fills as you save"/>
          <FeatureRow icon="🌳" t="Invest" d="A fruit tree that grows over years"/>
          <FeatureRow icon="🛡️" t="Protect" d="A fence that guards your money smarts"/>
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 14, paddingTop: 14 }}>
          <Btn kind="primary" size="lg" full>Explore my Garden  →</Btn>
        </div>
      </div>
    </Phone>
  );
}

function FeatureRow({ icon, t, d }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
      background: '#fff', borderRadius: 14, border: `1px solid ${CC.line}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 12, background: CC.mint,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 800 }}>{t}</div>
        <div style={{ fontSize: 11, color: CC.ink3, marginTop: 1 }}>{d}</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ProfileHome, CertificatesWall,
  OnbSplash, OnbHandle, OnbPIN, OnbGarden,
});
