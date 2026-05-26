import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  PanResponder, Animated, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, {
  Circle, Rect, Ellipse, Path, Polygon, G, Line,
  Text as SvgText, Defs, LinearGradient as SvgGradient, Stop,
} from 'react-native-svg';
import { CC, shadow, radius } from '../theme';

const W = Dimensions.get('window').width;

// ─── Card ────────────────────────────────────────────────────────
export function Card({ children, style, padding = 16, borderRadius = 20 }: any) {
  return (
    <View style={[styles.card, { padding, borderRadius }, style]}>
      {children}
    </View>
  );
}

// ─── Btn ─────────────────────────────────────────────────────────
export function Btn({ children, label, kind = 'primary', size = 'md', style, onPress, full }: any) {
  const h = size === 'lg' ? 52 : size === 'sm' ? 32 : 44;
  const fs = size === 'lg' ? 16 : size === 'sm' ? 13 : 15;
  const bg = kind === 'primary' ? CC.green : kind === 'yellow' ? CC.yellow : kind === 'light' ? CC.mint : kind === 'dark' ? CC.greenInk : 'transparent';
  const color = kind === 'yellow' ? CC.greenInk : kind === 'ghost' ? CC.green : '#fff';
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}
      style={[{ height: h, borderRadius: 12, backgroundColor: bg, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, borderWidth: kind === 'ghost' ? 1.5 : 0, borderColor: CC.green }, full && { alignSelf: 'stretch' }, style]}>
      <Text style={{ fontSize: fs, fontWeight: '700', color, fontFamily: 'BeVietnamPro_700Bold' }}>
        {label ?? children}
      </Text>
    </TouchableOpacity>
  );
}

// ─── CircleBtn ───────────────────────────────────────────────────
export function CircleBtn({ children, bg, size = 36, dark = false, onPress }: any) {
  const bgColor = bg || (dark ? 'rgba(255,255,255,0.15)' : '#fff');
  return (
    <TouchableOpacity onPress={onPress} style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor, alignItems: 'center', justifyContent: 'center', borderWidth: dark ? 0 : 1, borderColor: CC.line }}>
      <Text style={{ fontSize: 16, color: dark ? '#fff' : CC.ink }}>{children}</Text>
    </TouchableOpacity>
  );
}

// ─── CCHeader ────────────────────────────────────────────────────
export function CCHeader({ name = 'Kyle', onProfile, onSettings }: { name?: string; onProfile?: () => void; onSettings?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 14, paddingBottom: 10 }}>
      <TouchableOpacity onPress={onProfile} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: CC.yellow, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
        <Text style={{ fontSize: 20 }}>🧑‍🎓</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, color: CC.ink3, letterSpacing: 0.2, fontFamily: 'BeVietnamPro_400Regular' }}>Xin chào</Text>
        <Text style={{ fontSize: 17, fontWeight: '700', color: CC.ink, fontFamily: 'BeVietnamPro_700Bold' }}>{name} 👋</Text>
      </View>
      <CircleBtn onPress={() => {}}>🔔</CircleBtn>
      <View style={{ width: 8 }} />
      <CircleBtn onPress={onSettings}>⚙️</CircleBtn>
    </View>
  );
}

// ─── ProgressBar (onboarding) ────────────────────────────────────
export function OnbProgressBar({ step, total, onBack }: { step: number; total: number; onBack: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 14, gap: 10 }}>
      <CircleBtn onPress={onBack}>‹</CircleBtn>
      <View style={{ flex: 1, height: 6, backgroundColor: CC.mintDeep, borderRadius: 3, overflow: 'hidden' }}>
        <View style={{ width: `${(step / total) * 100}%`, height: '100%', backgroundColor: CC.green }} />
      </View>
      <Text style={{ fontSize: 12, color: CC.ink3, fontWeight: '600' }}>{step}/{total}</Text>
    </View>
  );
}

// ─── Slide to Pay ────────────────────────────────────────────────
export function SlideToPay({ onComplete }: { onComplete?: () => void }) {
  const [done, setDone] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;
  const trackWidth = useRef(W - 80);
  const KNOB = 48;
  const maxX = trackWidth.current - KNOB - 8;

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gs) => {
      const val = Math.max(0, Math.min(maxX, gs.dx));
      pan.setValue(val);
    },
    onPanResponderRelease: (_, gs) => {
      if (gs.dx >= maxX * 0.88) {
        Animated.timing(pan, { toValue: maxX, duration: 120, useNativeDriver: true }).start(() => {
          setDone(true);
          setTimeout(() => { setDone(false); pan.setValue(0); onComplete?.(); }, 1200);
        });
      } else {
        Animated.spring(pan, { toValue: 0, useNativeDriver: true }).start();
      }
    },
  })).current;

  return (
    <View style={{ height: 56, borderRadius: 28, backgroundColor: done ? CC.greenDeep : CC.greenInk, overflow: 'hidden', justifyContent: 'center' }}>
      {/* Trail fill */}
      <Animated.View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: pan.interpolate({ inputRange: [0, maxX], outputRange: [KNOB / 2, maxX + KNOB / 2] }), backgroundColor: CC.green }} />
      {/* Label */}
      {!done && (
        <Text style={{ position: 'absolute', alignSelf: 'center', color: '#fff', fontSize: 15, fontWeight: '700', paddingLeft: KNOB }}>Slide to pay  →</Text>
      )}
      {done && (
        <Text style={{ position: 'absolute', alignSelf: 'center', color: '#fff', fontSize: 15, fontWeight: '800' }}>✓ Payment confirmed</Text>
      )}
      {/* Knob */}
      <Animated.View {...panResponder.panHandlers}
        style={{ position: 'absolute', left: 4, top: 4, width: KNOB, height: KNOB, borderRadius: KNOB / 2, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', transform: [{ translateX: pan }], shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 4, elevation: 4 }}>
        <Text style={{ fontSize: 22, color: CC.green }}>{done ? '✓' : '→'}</Text>
      </Animated.View>
    </View>
  );
}

// ─── Brand Mark SVG ──────────────────────────────────────────────
export function CCMark({ size = 64 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Path d="M32 20 Q22 14 18 4 Q28 6 34 16 Z" fill="#3F8E5C" />
      <Path d="M32 20 Q40 14 46 6 Q42 18 34 22 Z" fill="#5BAA72" />
      <Circle cx="32" cy="40" r="20" fill="#F5D75A" />
      <Circle cx="32" cy="40" r="20" fill="none" stroke="#E5B924" strokeWidth="2" />
      <SvgText x="32" y="48" textAnchor="middle" fontSize="22" fontWeight="800" fill="#1F4A2E">₫</SvgText>
      <Path d="M32 20 L32 24" stroke="#2F6E47" strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  );
}

// ─── Alex Avatar SVG ─────────────────────────────────────────────
export function AlexAvatar({ size = 48 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path d="M6 44 C6 32,16 26,24 26 C32 26,42 32,42 44 L42 48 L6 48 Z" fill="#3F8E5C" />
      <Path d="M14 30 Q24 24 34 30 L34 36 Q24 32 14 36 Z" fill="#2F6E47" />
      <Ellipse cx="24" cy="22" rx="11" ry="12" fill="#F4C9A4" />
      <Path d="M13 18 Q14 8 24 7 Q34 8 35 18 L34 14 Q30 11 24 10 Q18 11 14 14 Z" fill="#1B2218" />
      <Circle cx="20" cy="22" r="1.5" fill="#1B2218" />
      <Circle cx="28" cy="22" r="1.5" fill="#1B2218" />
      <Circle cx="20.5" cy="21.5" r="0.5" fill="#fff" />
      <Circle cx="28.5" cy="21.5" r="0.5" fill="#fff" />
      <Path d="M21 27 Q24 29 27 27" stroke="#1B2218" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Rect x="34" y="38" width="9" height="11" rx="1" fill="#E5B924" stroke="#1B2218" strokeWidth="1" />
      <SvgText x="38.5" y="46" textAnchor="middle" fontSize="6" fontWeight="800" fill="#1B2218">$</SvgText>
    </Svg>
  );
}

// ─── Garden Scene SVG ────────────────────────────────────────────
export function GardenScene({ height = 200 }: { height?: number }) {
  const w = W - 32;
  const scaleX = w / 360;
  const h = height;

  const flowers = [
    { x: 6, y: 18, c: '#E76F62' }, { x: 18, y: 22, c: '#F5D75A' },
    { x: 32, y: 16, c: '#9B7AC4' }, { x: 44, y: 20, c: '#F0A04B' },
    { x: 56, y: 24, c: '#E76F62' }, { x: 12, y: 6, c: '#F5D75A' },
    { x: 40, y: 4, c: '#9B7AC4' },
  ];

  return (
    <Svg width="100%" height={h} viewBox={`0 0 360 200`} preserveAspectRatio="xMidYMid meet">
      <Defs>
        <SvgGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#E8F4EA" /><Stop offset="1" stopColor="#C7E5C9" />
        </SvgGradient>
        <SvgGradient id="gnd2" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A8D4AC" /><Stop offset="1" stopColor="#7BBE82" />
        </SvgGradient>
        <SvgGradient id="trk2" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#6B4525" /><Stop offset="1" stopColor="#4a2f18" />
        </SvgGradient>
      </Defs>
      <Rect x="0" y="0" width="360" height="200" fill="url(#sky2)" />
      <Ellipse cx="80" cy="170" rx="140" ry="38" fill="#9ACDA0" opacity="0.55" />
      <Ellipse cx="290" cy="178" rx="120" ry="32" fill="#9ACDA0" opacity="0.55" />
      <Rect x="0" y="148" width="360" height="52" fill="url(#gnd2)" />
      {/* Fence */}
      <G stroke="#5a4a2a" strokeWidth="1.5" fill="#E5B924">
        <Rect x="10" y="142" width="6" height="14" /><Rect x="30" y="140" width="6" height="16" />
        <Rect x="50" y="142" width="6" height="14" /><Rect x="304" y="142" width="6" height="14" />
        <Rect x="324" y="140" width="6" height="16" /><Rect x="344" y="142" width="6" height="14" />
      </G>
      {/* Workshop */}
      <G transform="translate(28,100)">
        <Rect x="0" y="20" width="42" height="32" fill="#D9A86C" stroke="#6B4525" strokeWidth="1.5" />
        <Polygon points="-4,20 21,2 46,20" fill="#C2452F" stroke="#6B4525" strokeWidth="1.5" />
        <Rect x="14" y="34" width="12" height="18" fill="#6B4525" />
        <Circle cx="35" cy="32" r="3" fill="#3F8E5C" />
      </G>
      {/* Piggy */}
      <G transform="translate(88,110)">
        <Ellipse cx="20" cy="28" rx="20" ry="14" fill="#F5A1B9" />
        <Circle cx="32" cy="24" r="6" fill="#F5A1B9" />
        <Circle cx="34" cy="24" r="1.5" fill="#1B2218" />
        <Circle cx="14" cy="24" r="1.2" fill="#1B2218" />
        <Rect x="8" y="36" width="3" height="6" fill="#F5A1B9" />
        <Rect x="29" y="36" width="3" height="6" fill="#F5A1B9" />
        <Circle cx="22" cy="6" r="3.5" fill="#F5D75A" stroke="#E5B924" strokeWidth="1" />
        <SvgText x="22" y="9" textAnchor="middle" fontSize="5" fontWeight="800" fill="#6B4525">₫</SvgText>
      </G>
      {/* Market stall */}
      <G transform="translate(146,102)">
        <Rect x="2" y="20" width="44" height="30" fill="#fff" stroke="#1B2218" strokeWidth="1.2" />
        <Polygon points="0,20 24,8 48,20" fill="#3F8E5C" stroke="#1B2218" strokeWidth="1.2" />
        <Rect x="0" y="18" width="48" height="4" fill="#E5B924" />
        <Rect x="0" y="26" width="48" height="4" fill="#E76F62" />
        <Circle cx="12" cy="40" r="3" fill="#E76F62" />
        <Circle cx="22" cy="40" r="3" fill="#F0A04B" />
        <Circle cx="32" cy="40" r="3" fill="#F5D75A" />
      </G>
      {/* Tree */}
      <G transform="translate(210,70)">
        <Rect x="18" y="48" width="8" height="32" fill="url(#trk2)" />
        <Circle cx="22" cy="36" r="24" fill="#3F8E5C" />
        <Circle cx="10" cy="32" r="14" fill="#5BAA72" />
        <Circle cx="34" cy="30" r="16" fill="#5BAA72" />
        <Circle cx="22" cy="22" r="14" fill="#7BBE82" />
        <Circle cx="12" cy="38" r="3" fill="#E76F62" />
        <Circle cx="30" cy="40" r="3" fill="#E76F62" />
        <Circle cx="22" cy="32" r="3" fill="#F5D75A" />
      </G>
      {/* Flowers */}
      <G transform="translate(272,130)">
        {flowers.map(({ x, y, c }, i) => (
          <G key={i} transform={`translate(${x},${y})`}>
            <Line x1="0" y1="0" x2="0" y2="8" stroke="#3F8E5C" strokeWidth="1.2" />
            <Circle cx="-2" cy="-1.5" r="2" fill={c} />
            <Circle cx="2" cy="-1.5" r="2" fill={c} />
            <Circle cx="0" cy="-3" r="2" fill={c} />
            <Circle cx="0" cy="1" r="2" fill={c} />
            <Circle cx="0" cy="-1" r="1.2" fill="#F5D75A" />
          </G>
        ))}
      </G>
      {/* Sun + Cloud */}
      <Circle cx="320" cy="28" r="14" fill="#F5D75A" />
      <G fill="#fff" opacity="0.7">
        <Circle cx="60" cy="34" r="8" /><Circle cx="72" cy="32" r="11" /><Circle cx="86" cy="36" r="8" />
      </G>
    </Svg>
  );
}

// ─── Goal Ring ───────────────────────────────────────────────────
export function GoalRing({ pct, tone, size = 64 }: { pct: number; tone: string; size?: number }) {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={size/2} cy={size/2} r={r} stroke={CC.mintDeep} strokeWidth="6" fill="none" />
      <Circle cx={size/2} cy={size/2} r={r} stroke={tone} strokeWidth="6" fill="none"
        strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} />
      <SvgText x={size/2} y={size/2 + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={CC.ink}>{pct}%</SvgText>
    </Svg>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    ...shadow.card,
  },
});
