import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CC, spacing, radius, shadow, vnd, vndK } from '@/theme';
import { Btn } from '@/components';

const { width: SW, height: SH } = Dimensions.get('window');

// ─── DISCOVER FEED ───────────────────────────────────────────────────────────
export function DiscoverFeedScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <View style={[s.flex, { backgroundColor: '#0E1410' }]}>
      {/* Full-bleed "video" */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={require('../../assets/creator-footage.png')}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
        {/* Bottom gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.55)', 'rgba(0,0,0,0.75)']}
          locations={[0.3, 0.78, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Right action rail */}
      <View style={[s.rail, { bottom: 120 + insets.bottom }]}>
        <RailAction icon="❤️" label={liked ? '12.1K' : '12K'} onPress={() => setLiked(l => !l)} active={liked} />
        <RailAction icon="🔖" label="Save" highlight={saved} onPress={() => setSaved(v => !v)} />
        <RailAction icon="📤" label="Share" onPress={() => {}} />
        <RailAction icon="💬" label="84" onPress={() => {}} />
      </View>

      {/* Progress bar */}
      <View style={[s.progressBar, { top: SH * 0.38 }]}>
        {[0,1,2,3,4].map(i => (
          <View key={i} style={[
            s.progressDot,
            { height: i === 2 ? 22 : 8, opacity: i === 2 ? 1 : 0.35 },
          ]} />
        ))}
      </View>

      {/* Bottom copy */}
      <View style={[s.bottomCopy, { bottom: 70 + insets.bottom }]}>
        <Text style={s.creatorLine}>@longmoney · 🛡️ Protect</Text>
        <Text style={s.videoTitle}>
          Got 200.000 ₫? Don't bet it — 5 smarter moves for your money
        </Text>
        <TouchableOpacity style={s.saveCta} activeOpacity={0.8}>
          <Text style={s.saveCtaText}>🌱 Save to grow your Garden</Text>
        </TouchableOpacity>
      </View>

      {/* Tab bar spacer handled by navigator */}
    </View>
  );
}

function RailAction({ icon, label, highlight, active, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.75} style={s.railItem}>
      <View style={[s.railBtn, highlight && s.railBtnHighlight, active && s.railBtnActive]}>
        <Text style={{ fontSize: 20 }}>{icon}</Text>
      </View>
      <Text style={s.railLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── QUIZ PAUSE ──────────────────────────────────────────────────────────────
export function QuizPauseScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string | null>(null);

  const opts = [
    { letter: 'A', text: '500.000 ₫', correct: false },
    { letter: 'B', text: '1.300.000 ₫', correct: false },
    { letter: 'C', text: '2.600.000 ₫', correct: true },
    { letter: 'D', text: '5.200.000 ₫', correct: false },
  ];

  return (
    <View style={[s.flex, { backgroundColor: '#0E1410', paddingTop: insets.top }]}>
      {/* Radial glow bg */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['rgba(245,215,90,0.18)', '#15302a', '#0a1a17']}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Trophy + question */}
      <View style={s.quizHeader}>
        <View style={s.trophyCircle}>
          <Text style={{ fontSize: 36 }}>🪙</Text>
        </View>
        <Text style={s.quizBadge}>QUICK QUIZ · WIN 1.000 ₫</Text>
        <Text style={s.quizQuestion}>
          If you save 50.000 ₫ every week, how much do you have in 1 year?
        </Text>
      </View>

      {/* Options */}
      <View style={s.quizOpts}>
        {opts.map(o => (
          <QuizOpt
            key={o.letter}
            {...o}
            selected={selected === o.letter}
            onPress={() => !selected && setSelected(o.letter)}
          />
        ))}
      </View>

      {/* Timer */}
      <Text style={s.quizTimer}>⏱ 22s left · skip ›</Text>
    </View>
  );
}

function QuizOpt({ letter, text, correct, selected, onPress }: any) {
  const showResult = selected !== null;
  const isCorrect = correct;
  const bg = showResult
    ? (isCorrect ? CC.green : (selected ? 'rgba(231,111,98,0.35)' : 'rgba(255,255,255,0.08)'))
    : 'rgba(255,255,255,0.08)';
  return (
    <TouchableOpacity
      style={[s.quizOpt, { backgroundColor: bg }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[s.quizLetter, showResult && isCorrect && s.quizLetterCorrect]}>
        <Text style={[s.quizLetterText, showResult && isCorrect && { color: CC.green }]}>{letter}</Text>
      </View>
      <Text style={s.quizOptText}>{text}</Text>
      {showResult && isCorrect && <Text style={{ fontSize: 16, color: '#fff' }}>✓</Text>}
    </TouchableOpacity>
  );
}

// ─── DAILY CAP ───────────────────────────────────────────────────────────────
export function DailyCapScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.flex, { backgroundColor: CC.mint }]}>
      <View style={[s.capContent, { paddingTop: 40 + insets.top }]}>
        {/* Sleeping face */}
        <View style={s.sleepCircle}>
          <Text style={{ fontSize: 86 }}>😴</Text>
          <Text style={s.zzz}>z<Text style={{ fontSize: 16 }}>z</Text><Text style={{ fontSize: 11 }}>z</Text></Text>
        </View>

        <Text style={s.capTitle}>That's enough for today!</Text>
        <Text style={s.capSub}>
          You watched 25 minutes today. Your eyes need a break — and your Garden is waiting 🌱
        </Text>

        {/* Stats strip */}
        <View style={s.statsStrip}>
          <CapStat label="Watched" value="11" sub="videos" />
          <View style={s.statDiv} />
          <CapStat label="Saved" value="3" sub="to Garden" />
          <View style={s.statDiv} />
          <CapStat label="Earned" value="3K" sub="₫ quiz" />
        </View>

        <View style={{ width: '100%', marginTop: 26, gap: 10 }}>
          <Btn
            kind="primary" size="lg" full label="Go to Learn  →"
            onPress={() => navigation.navigate('Learn')}
          />
          <Btn
            kind="ghost" size="md" full label="See what's growing 🌱"
            onPress={() => navigation.navigate('Learn')}
          />
        </View>
      </View>
    </View>
  );
}

function CapStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={s.capStatLabel}>{label.toUpperCase()}</Text>
      <Text style={s.capStatValue}>{value}</Text>
      <Text style={s.capStatSub}>{sub}</Text>
    </View>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  flex: { flex: 1 },

  // feed
  rail: {
    position: 'absolute', right: 12,
    flexDirection: 'column', gap: 16, alignItems: 'center',
  },
  railItem: { alignItems: 'center', gap: 4 },
  railBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  railBtnHighlight: { backgroundColor: CC.green },
  railBtnActive: { backgroundColor: 'rgba(231,111,98,0.65)' },
  railLabel: { fontSize: 11, fontWeight: '700', color: '#fff' },
  progressBar: {
    position: 'absolute', left: 6,
    flexDirection: 'column', gap: 4, alignItems: 'center',
  },
  progressDot: { width: 3, borderRadius: 2, backgroundColor: '#fff' },
  bottomCopy: { position: 'absolute', left: 16, right: 80 },
  creatorLine: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
  videoTitle: { fontSize: 17, fontWeight: '800', color: '#fff', lineHeight: 22, marginTop: 4 },
  saveCta: {
    marginTop: 10, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999,
    backgroundColor: 'rgba(63,142,92,0.85)', alignSelf: 'flex-start',
  },
  saveCtaText: { fontSize: 12, fontWeight: '700', color: '#fff' },

  // quiz
  quizHeader: { alignItems: 'center', marginTop: 80, paddingHorizontal: 32 },
  trophyCircle: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: 'rgba(245,215,90,0.18)',
    borderWidth: 1, borderColor: 'rgba(245,215,90,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
  quizBadge: {
    fontSize: 11, color: CC.yellow, fontWeight: '700', letterSpacing: 1, marginTop: 12,
  },
  quizQuestion: {
    fontSize: 22, fontWeight: '800', color: '#fff', lineHeight: 28,
    textAlign: 'center', marginTop: 6,
  },
  quizOpts: {
    position: 'absolute', left: 20, right: 20, bottom: 140,
    gap: 10,
  },
  quizOpt: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  quizLetter: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  quizLetterCorrect: { backgroundColor: '#fff' },
  quizLetterText: { fontSize: 13, fontWeight: '800', color: '#fff' },
  quizOptText: { flex: 1, fontSize: 15, fontWeight: '700', color: '#fff' },
  quizTimer: {
    position: 'absolute', bottom: 90, left: 0, right: 0,
    textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.65)',
  },

  // daily cap
  capContent: {
    flex: 1, alignItems: 'center', paddingHorizontal: 24,
  },
  sleepCircle: {
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: CC.mintDeep,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  zzz: {
    position: 'absolute', top: 4, right: 6,
    fontSize: 22, color: CC.greenInk, fontWeight: '700',
  },
  capTitle: {
    fontSize: 22, fontWeight: '800', color: CC.greenInk, marginTop: 22,
  },
  capSub: {
    fontSize: 14, color: CC.ink2, marginTop: 8,
    textAlign: 'center', lineHeight: 21,
  },
  statsStrip: {
    marginTop: 22, paddingHorizontal: 18, paddingVertical: 14,
    borderRadius: 18, backgroundColor: '#fff',
    flexDirection: 'row', alignItems: 'center', gap: 16,
    ...shadow.card,
  },
  statDiv: { width: 1, height: 32, backgroundColor: CC.line },
  capStatLabel: { fontSize: 10, color: CC.ink3, fontWeight: '600' },
  capStatValue: { fontSize: 20, fontWeight: '800', color: CC.greenInk, marginTop: 2 },
  capStatSub: { fontSize: 10, color: CC.ink3 },
});
