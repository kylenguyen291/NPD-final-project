// Cha-Ching — Mèo, the cat companion (redesign v2.0)
// Flexible SVG cat: 4 coats × 4 stages × 4 moods.
//
//   <Meo coat="orange" stage="adult" mood="happy" size={120} />
//
// coat:  orange | tuxedo | grey | calico
// stage: baby | junior | adult | master   (master = crown + aura)
// mood:  happy | curious | sleepy | lonely

const MEO_COATS = {
  orange: { base: '#F0A04B', dark: '#E5862A', belly: '#FBD9A8', stripe: '#D9751F' },
  tuxedo: { base: '#2B2F2C', dark: '#15191600', belly: '#FFFFFF', stripe: '#1B201D' },
  grey:   { base: '#9AA6A0', dark: '#7C8881', belly: '#E4EAE6', stripe: '#76837C' },
  calico: { base: '#F2EAD8', dark: '#E7843B', belly: '#FFFFFF', stripe: '#3A332E' },
};

function Meo({ coat = 'orange', stage = 'baby', mood = 'happy', size = 120, style = {} }) {
  const c = MEO_COATS[coat] || MEO_COATS.orange;
  // Stage scaling — baby is rounder/smaller body, master tallest
  const stageCfg = {
    baby:   { bodyScale: 0.86, headR: 30, ear: 1.15, posture: 0 },
    junior: { bodyScale: 0.93, headR: 28, ear: 1.0,  posture: 0 },
    adult:  { bodyScale: 1.0,  headR: 26, ear: 0.95, posture: 0 },
    master: { bodyScale: 1.04, headR: 26, ear: 0.95, posture: 0 },
  }[stage] || {};
  const isMaster = stage === 'master';
  const isCalico = coat === 'calico';
  const isTuxedo = coat === 'tuxedo';

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: 'block', overflow: 'visible', ...style }}>
      <defs>
        <radialGradient id={`aura-${coat}`} cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor="#F5D75A" stopOpacity="0.55"/>
          <stop offset="60%" stopColor="#F5D75A" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#F5D75A" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Master aura */}
      {isMaster && <circle cx="60" cy="62" r="56" fill={`url(#aura-${coat})`}>
        <animate attributeName="r" values="52;58;52" dur="3s" repeatCount="indefinite"/>
      </circle>}

      {/* Shadow */}
      <ellipse cx="60" cy="108" rx={26 * stageCfg.bodyScale} ry="5" fill="#1B2218" opacity="0.12"/>

      <g transform={`translate(60 ${mood === 'sleepy' ? 70 : 66}) scale(${stageCfg.bodyScale})`}>
        {/* Tail */}
        <path d={mood === 'lonely'
          ? "M22 18 q22 6 20 -14 q-2 -12 -10 -12"
          : "M22 14 q26 2 26 -18 q0 -10 -8 -12"}
          fill="none" stroke={c.base} strokeWidth="9" strokeLinecap="round"/>
        {coat === 'orange' && <path d="M40 -12 q6 2 8 8" stroke={c.stripe} strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6"/>}
        {/* Gold master tail tip */}
        {isMaster && <circle cx="40" cy="-26" r="6" fill="#F5D75A" stroke="#E5B924" strokeWidth="1.5"/>}

        {/* Body */}
        <path d="M-30 24 Q-34 -10 0 -10 Q34 -10 30 24 Q30 34 0 34 Q-30 34 -30 24 Z" fill={c.base}/>
        {/* Belly */}
        <ellipse cx="0" cy="20" rx="18" ry="14" fill={c.belly}/>
        {/* Tuxedo chest */}
        {isTuxedo && <path d="M-8 -2 Q0 30 8 -2 Q0 6 -8 -2Z" fill="#fff"/>}
        {/* Calico patch on body */}
        {isCalico && <path d="M-28 8 Q-30 -8 -12 -8 Q-18 8 -28 22 Z" fill={c.dark} opacity=".9"/>}
        {/* Front paws */}
        <ellipse cx="-12" cy="33" rx="7" ry="5" fill={c.belly}/>
        <ellipse cx="12" cy="33" rx="7" ry="5" fill={c.belly}/>

        {/* Head group */}
        <g transform={`translate(0 ${-22}) ${mood === 'curious' ? 'rotate(-8)' : ''}`}>
          {/* Ears */}
          <path d={`M${-20*stageCfg.ear} -14 L${-26*stageCfg.ear} -34 L${-6*stageCfg.ear} -22 Z`} fill={c.base}/>
          <path d={`M${20*stageCfg.ear} -14 L${26*stageCfg.ear} -34 L${6*stageCfg.ear} -22 Z`} fill={isCalico ? c.dark : c.base}/>
          <path d={`M${-18*stageCfg.ear} -16 L${-21*stageCfg.ear} -28 L${-9*stageCfg.ear} -20 Z`} fill="#F5A1B9"/>
          <path d={`M${18*stageCfg.ear} -16 L${21*stageCfg.ear} -28 L${9*stageCfg.ear} -20 Z`} fill="#F5A1B9"/>

          {/* Head */}
          <circle cx="0" cy="0" r={stageCfg.headR} fill={c.base}/>
          {/* Calico head patch */}
          {isCalico && <path d={`M0 -${stageCfg.headR} A${stageCfg.headR} ${stageCfg.headR} 0 0 1 ${stageCfg.headR} 0 L0 0 Z`} fill={c.dark} opacity=".85"/>}
          {/* Orange stripes */}
          {coat === 'orange' && <g stroke={c.stripe} strokeWidth="2.5" strokeLinecap="round" opacity=".55">
            <line x1="0" y1={-stageCfg.headR} x2="0" y2={-stageCfg.headR+8}/>
            <line x1="-9" y1={-stageCfg.headR+2} x2="-8" y2={-stageCfg.headR+9}/>
            <line x1="9" y1={-stageCfg.headR+2} x2="8" y2={-stageCfg.headR+9}/>
          </g>}
          {coat === 'grey' && <g stroke={c.stripe} strokeWidth="2.5" strokeLinecap="round" opacity=".5">
            <line x1="0" y1={-stageCfg.headR} x2="0" y2={-stageCfg.headR+7}/>
            <line x1="-9" y1={-stageCfg.headR+2} x2="-8" y2={-stageCfg.headR+8}/>
            <line x1="9" y1={-stageCfg.headR+2} x2="8" y2={-stageCfg.headR+8}/>
          </g>}

          {/* Cheeks (muzzle) */}
          <ellipse cx="0" cy="8" rx="15" ry="11" fill={isTuxedo || isCalico ? '#fff' : c.belly} opacity={isTuxedo||isCalico?1:.5}/>

          {/* Eyes by mood */}
          {mood === 'sleepy' ? (
            <g stroke="#1B2218" strokeWidth="2.2" strokeLinecap="round" fill="none">
              <path d="M-13 2 q5 4 10 0"/>
              <path d="M3 2 q5 4 10 0"/>
            </g>
          ) : mood === 'lonely' ? (
            <g>
              <ellipse cx="-8" cy="2" rx="4.5" ry="5" fill="#1B2218"/>
              <ellipse cx="8" cy="2" rx="4.5" ry="5" fill="#1B2218"/>
              <circle cx="-6.5" cy="0.5" r="1.4" fill="#fff"/>
              <circle cx="9.5" cy="0.5" r="1.4" fill="#fff"/>
              {/* teary glints */}
              <circle cx="-10" cy="7" r="1.6" fill="#9CD6F5"/>
              <circle cx="10" cy="7" r="1.6" fill="#9CD6F5"/>
            </g>
          ) : (
            <g>
              <ellipse cx="-8" cy="1" rx="5" ry={mood === 'curious' ? 6 : 5.5} fill="#1B2218"/>
              <ellipse cx="8" cy="1" rx="5" ry={mood === 'curious' ? 6 : 5.5} fill="#1B2218"/>
              <circle cx="-6" cy="-1" r="1.7" fill="#fff"/>
              <circle cx="10" cy="-1" r="1.7" fill="#fff"/>
              {mood === 'happy' && <g>
                <circle cx="-15" cy="9" r="3.5" fill="#F5A1B9" opacity=".6"/>
                <circle cx="15" cy="9" r="3.5" fill="#F5A1B9" opacity=".6"/>
              </g>}
            </g>
          )}

          {/* Nose + mouth */}
          <path d="M-2.5 8 L2.5 8 L0 11 Z" fill="#E76F62"/>
          {mood === 'happy' ? (
            <path d="M0 11 Q-4 16 -8 13 M0 11 Q4 16 8 13" stroke="#1B2218" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
          ) : mood === 'lonely' ? (
            <path d="M-5 16 Q0 13 5 16" stroke="#1B2218" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
          ) : (
            <path d="M0 11 Q-3 15 -6 13 M0 11 Q3 15 6 13" stroke="#1B2218" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          )}

          {/* Whiskers (junior+) */}
          {stage !== 'baby' && <g stroke={isTuxedo ? '#bbb' : '#1B2218'} strokeWidth="1" opacity=".5" strokeLinecap="round">
            <line x1="-14" y1="8" x2="-30" y2="5"/>
            <line x1="-14" y1="11" x2="-30" y2="12"/>
            <line x1="14" y1="8" x2="30" y2="5"/>
            <line x1="14" y1="11" x2="30" y2="12"/>
          </g>}

          {/* Master crown */}
          {isMaster && <g transform="translate(0 -32)">
            <path d="M-11 4 L-11 -4 L-5 1 L0 -7 L5 1 L11 -4 L11 4 Z" fill="#F5D75A" stroke="#E5B924" strokeWidth="1.2"/>
            <circle cx="0" cy="-7" r="1.6" fill="#E76F62"/>
            <circle cx="-11" cy="-4" r="1.4" fill="#E76F62"/>
            <circle cx="11" cy="-4" r="1.4" fill="#E76F62"/>
          </g>}
        </g>
      </g>

      {/* Mood emote bubble */}
      {mood === 'curious' && <text x="92" y="36" fontSize="18">❓</text>}
      {mood === 'sleepy' && <text x="86" y="34" fontSize="16" fill="#7E8E84" fontWeight="700">z</text>}
      {mood === 'lonely' && <text x="90" y="40" fontSize="16">🥺</text>}
      {mood === 'happy' && stage !== 'baby' && <text x="90" y="34" fontSize="13">✨</text>}
    </svg>
  );
}

// Small chip-sized Mèo head only (for headers / list rows)
function MeoChip({ coat = 'orange', size = 28 }) {
  const c = MEO_COATS[coat] || MEO_COATS.orange;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: 'block' }}>
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
  );
}

Object.assign(window, { Meo, MeoChip, MEO_COATS });
