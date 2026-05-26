import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Animated, PanResponder, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CC, spacing, radius, shadow, vnd } from '@/theme';
import { GardenScene, AlexAvatar, Btn, Card } from '@/components';
import { useApp } from '@/context';

const { width: SW } = Dimensions.get('window');

// ─── LEARN HOME ───────────────────────────────────────────────────────────────
const PILLARS = [
  { i: '🛠️', name: 'Earn',    cur: 3,  tot: 10, tone: CC.orange },
  { i: '🐷', name: 'Save',    cur: 7,  tot: 10, tone: CC.green },
  { i: '🛒', name: 'Spend',   cur: 5,  tot: 10, tone: CC.coral },
  { i: '🌳', name: 'Invest',  cur: 0,  tot: 8,  tone: CC.greenDeep },
  { i: '🌸', name: 'Give',    cur: 2,  tot: 6,  tone: '#9B7AC4' },
  { i: '🛡️', name: 'Protect', cur: 4,  tot: 16, tone: CC.yellowDeep },
];

export function LearnHomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { state } = useApp();
  const { xp, streak } = state.user;

  return (
    <View style={[s.flex, { backgroundColor: CC.mint }]}>
      {/* Header */}
      <View style={[s.learnHeader, { paddingTop: insets.top + 6 }]}>
        <View style={{ flex: 1 }}>
          <Text style={s.gardenLabel}>YOUR GARDEN</Text>
          <Text style={s.gardenTitle}>Cha-Ching Garden</Text>
        </View>
        <View style={s.statsChip}>
          <Text style={{ fontSize: 14 }}>🔥</Text>
          <Text style={s.statsChipText}>{streak}</Text>
          <Text style={s.statsChipDot}>·</Text>
          <Text style={[s.statsChipText, { color: CC.greenInk }]}>{(xp / 1000).toFixed(3).replace('.', '.')} XP</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.learnScroll} showsVerticalScrollIndicator={false}>
        {/* Garden scene */}
        <View style={s.gardenCard}>
          <GardenScene height={200} />
        </View>

        {/* Mini stats */}
        <View style={s.miniStats}>
          <MiniStat icon="🌱" v="14" l="seeds" />
          <MiniStat icon="🌸" v="7"  l="flowers" />
          <MiniStat icon="🏆" v="2"  l="badges" />
        </View>

        {/* Pillars header */}
        <View style={s.pillarsHeader}>
          <Text style={s.pillarsTitle}>6 Pillars · Foundation</Text>
          <TouchableOpacity>
            <Text style={s.pillarsGames}>Games 🎮</Text>
          </TouchableOpacity>
        </View>

        {/* Pillar grid */}
        <View style={s.pillarGrid}>
          {PILLARS.map(p => (
            <TouchableOpacity
              key={p.name}
              style={s.pillarCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('PillarDetail', { pillar: p })}
            >
              <View style={s.pillarCardRow}>
                <View style={s.pillarIcon}>
                  <Text style={{ fontSize: 17 }}>{p.i}</Text>
                </View>
                <Text style={s.pillarName}>{p.name}</Text>
              </View>
              <View style={s.pillarTrack}>
                <View style={[s.pillarFill, { width: `${(p.cur / p.tot) * 100}%` as any, backgroundColor: p.tone }]} />
              </View>
              <View style={s.pillarMeta}>
                <Text style={s.pillarMetaLeft}>{p.cur} of {p.tot}</Text>
                <Text style={[s.pillarMetaRight, { color: p.cur ? p.tone : CC.ink3 }]}>
                  {p.cur === 0 ? 'Start →' : p.cur === p.tot ? '✓ Done' : 'Continue →'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

function MiniStat({ icon, v, l }: { icon: string; v: string; l: string }) {
  return (
    <View style={s.miniStat}>
      <Text style={{ fontSize: 18 }}>{icon}</Text>
      <View>
        <Text style={s.miniStatV}>{v}</Text>
        <Text style={s.miniStatL}>{l}</Text>
      </View>
    </View>
  );
}

// ─── PILLAR DETAIL ────────────────────────────────────────────────────────────
const LESSONS = [
  { n: 1,  t: 'What is saving, really?',            m: '1:12', s: 'done' },
  { n: 2,  t: 'The 50/30/20 rule for teens',        m: '1:45', s: 'done' },
  { n: 3,  t: 'Compound interest — magic of time',  m: '2:08', s: 'done' },
  { n: 4,  t: 'Set smart goals (Bicycle case)',     m: '1:30', s: 'done' },
  { n: 5,  t: 'Saving from lì xì 🧧',               m: '1:55', s: 'done' },
  { n: 6,  t: 'Round-up: the painless save',        m: '1:24', s: 'done' },
  { n: 7,  t: 'Where to keep your money',           m: '2:30', s: 'current' },
  { n: 8,  t: 'Save vs. invest (Level 1)',          m: '1:48', s: 'locked' },
  { n: 9,  t: 'Talk to a parent about money',       m: '2:15', s: 'locked' },
  { n: 10, t: 'Pillar quest · Save',                m: '4:00', s: 'locked', quest: true },
];

export function PillarDetailScreen({ navigation, route }: any) {
  const insets = useSafeAreaInsets();
  const pillar = route?.params?.pillar ?? PILLARS[1];

  return (
    <View style={[s.flex, { backgroundColor: CC.mint }]}>
      {/* Hero */}
      <LinearGradient
        colors={[CC.greenInk, CC.green]}
        style={[s.pillarHero, { paddingTop: insets.top + 6 }]}
      >
        <View style={s.pillarHeroRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Text style={{ color: '#fff', fontSize: 22 }}>‹</Text>
          </TouchableOpacity>
          <Text style={s.pillarBreadcrumb}>FOUNDATION ▸ PILLAR 02</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 10 }}>
          <View style={s.pillarHeroIcon}>
            <Text style={{ fontSize: 28 }}>{pillar.i}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.pillarHeroName}>{pillar.name}</Text>
            <Text style={s.pillarHeroMeta}>{pillar.cur} of {pillar.tot} lessons · 50 XP earned</Text>
          </View>
        </View>
        <View style={s.pillarProgressBg}>
          <View style={[s.pillarProgressFill, { width: `${(pillar.cur / pillar.tot) * 100}%` as any }]} />
        </View>
      </LinearGradient>

      {/* Lesson list */}
      <ScrollView
        contentContainerStyle={s.lessonList}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: -16 }}
      >
        <View style={s.lessonListCard}>
          {LESSONS.map((lesson, i) => (
            <LessonRow
              key={lesson.n}
              {...lesson}
              last={i === LESSONS.length - 1}
              onPress={() => lesson.s !== 'locked' && navigation.navigate('LessonApply')}
            />
          ))}
        </View>
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

function LessonRow({ n, t, m, s: state, quest, last, onPress }: any) {
  const done = state === 'done';
  const cur = state === 'current';
  const locked = state === 'locked';

  return (
    <TouchableOpacity
      style={[
        s.lessonRow,
        !last && s.lessonRowBorder,
        cur && { backgroundColor: CC.mint },
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[
        s.lessonNum,
        done && { backgroundColor: CC.green },
        cur && { backgroundColor: '#fff', borderWidth: 2, borderColor: CC.green },
        locked && { backgroundColor: CC.mintDeep },
      ]}>
        <Text style={[
          s.lessonNumText,
          done && { color: '#fff' },
          cur && { color: CC.green },
          locked && { color: CC.ink3 },
        ]}>
          {done ? '✓' : quest ? '★' : String(n)}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[
          s.lessonTitle,
          cur && { color: CC.greenInk, fontWeight: '700' },
          locked && { color: CC.ink3 },
        ]}>{t}</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 2 }}>
          <Text style={s.lessonMeta}>▶ {m}</Text>
          {quest && <Text style={s.lessonQuest}>BOSS · 30 XP</Text>}
        </View>
      </View>
      {locked && <Text style={{ fontSize: 14, color: CC.ink3 }}>🔒</Text>}
      {cur && <Btn kind="primary" size="sm" label="Continue" onPress={onPress} />}
    </TouchableOpacity>
  );
}

// ─── LESSON APPLY ─────────────────────────────────────────────────────────────
export function LessonApplyScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { dispatch } = useApp();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, []);

  const handleApply = () => {
    dispatch({ type: 'ADD_XP', amount: 10 });
    navigation.navigate('SavingsGoals');
  };

  return (
    <Animated.View style={[s.flex, { backgroundColor: CC.mint, opacity: fadeAnim }]}>
      {/* Progress bar */}
      <View style={[s.applyProgress, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Text style={{ fontSize: 16 }}>✕</Text>
        </TouchableOpacity>
        <View style={s.applyTrack}>
          <View style={[s.applyFill, { width: '100%' }]} />
        </View>
        <Text style={s.applyCounter}>3/3</Text>
      </View>

      <ScrollView contentContainerStyle={s.applyContent} showsVerticalScrollIndicator={false}>
        {/* Confetti */}
        <View style={s.confettiRow}>
          <Text style={[s.confetti, { transform: [{ rotate: '-12deg' }] }]}>🎉</Text>
          <Text style={[s.confetti, { transform: [{ rotate: '8deg' }] }]}>✨</Text>
          <Text style={[s.confetti, { transform: [{ rotate: '-4deg' }] }]}>🎊</Text>
        </View>

        <Text style={s.lessonCompleteLabel}>LESSON COMPLETE</Text>
        <Text style={s.lessonCompleteTitle}>Set Smart Goals</Text>

        {/* XP gain */}
        <LinearGradient
          colors={[CC.yellow, CC.yellowDeep]}
          style={s.xpGain}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        >
          <Text style={{ fontSize: 28 }}>🪙</Text>
          <Text style={s.xpGainText}>+10 XP earned · Garden bloomed!</Text>
          <Text style={s.xpGainValue}>1.250</Text>
        </LinearGradient>

        {/* Garden snippet */}
        <View style={s.gardenSnippet}>
          <GardenScene height={130} />
        </View>

        {/* Apply CTA */}
        <View style={s.applyCTA}>
          <Text style={s.applyCtaLabel}>APPLY NOW</Text>
          <Text style={s.applyCtaText}>
            Want to make this real? Set a new savings goal right now.
          </Text>
          <Btn
            kind="primary" size="md" full
            label="＋ Create a savings goal  →"
            onPress={handleApply}
            style={{ marginTop: 12 }}
          />
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>
            <Text style={s.maybeLater}>Maybe later</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </Animated.View>
  );
}

// ─── ALEX CHAT ────────────────────────────────────────────────────────────────
export function AlexChatScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0, tension: 65, friction: 11, useNativeDriver: true,
    }).start();
  }, []);

  const dismiss = () => {
    Animated.timing(slideAnim, { toValue: 400, duration: 220, useNativeDriver: true }).start(
      () => navigation.goBack()
    );
  };

  return (
    <View style={s.flex}>
      {/* Dim overlay */}
      <TouchableOpacity style={s.alexOverlay} onPress={dismiss} activeOpacity={1} />

      {/* Bottom sheet */}
      <Animated.View
        style={[
          s.alexSheet,
          { paddingBottom: Math.max(insets.bottom, 22) },
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Drag handle */}
        <View style={s.dragHandle} />

        {/* Alex header */}
        <View style={s.alexHeader}>
          <AlexAvatar />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={s.alexName}>Alex</Text>
            <View style={s.alexOnline}>
              <View style={s.onlineDot} />
              <Text style={s.onlineText}>Online</Text>
            </View>
          </View>
          <Text style={s.learnOnlyTag}>Learn only</Text>
        </View>

        {/* Bubbles */}
        <View style={s.bubbles}>
          <AlexBubble>
            Heyy! You just finished <Text style={{ fontWeight: '800' }}>Set Smart Goals</Text> 🎯 Nice one.
          </AlexBubble>
          <AlexBubble>
            Want to keep going with the next one, or jump to <Text style={{ fontWeight: '800' }}>Protect</Text> for some scam-spotting?
          </AlexBubble>
        </View>

        {/* Choices */}
        <View style={s.choices}>
          <ChoiceBtn label="Next Save lesson  →" onPress={dismiss} />
          <ChoiceBtn label="Try a Protect lesson" onPress={dismiss} />
          <ChoiceBtn label="Later" ghost onPress={dismiss} />
        </View>
      </Animated.View>
    </View>
  );
}

function AlexBubble({ children }: { children: React.ReactNode }) {
  return (
    <View style={s.alexBubble}>
      <Text style={s.alexBubbleText}>{children}</Text>
    </View>
  );
}

function ChoiceBtn({ label, ghost, onPress }: any) {
  return (
    <TouchableOpacity
      style={[s.choiceBtn, ghost && s.choiceBtnGhost]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[s.choiceBtnText, ghost && s.choiceBtnTextGhost]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── NEED VS WANT ─────────────────────────────────────────────────────────────
const SORT_CARDS = [
  { item: 'Milk tea after school', price: '30.000 ₫', sub: 'Your friends are going', emoji: '🧋' },
  { item: 'Toothbrush replacement', price: '45.000 ₫', sub: 'Old one is worn out', emoji: '🪥' },
  { item: 'New game skin', price: '120.000 ₫', sub: 'Limited edition', emoji: '🎮' },
  { item: 'School notebook', price: '25.000 ₫', sub: 'For tomorrow\'s class', emoji: '📓' },
  { item: 'Bubble tea (again)', price: '40.000 ₫', sub: '3rd time this week', emoji: '🫧' },
];

export function NeedVsWantScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [cardIdx, setCardIdx] = useState(0);
  const [score, setScore] = useState(1240);
  const [streak, setStreak] = useState(7);
  const [time, setTime] = useState(38);
  const panX = useRef(new Animated.Value(0)).current;
  const rotate = panX.interpolate({ inputRange: [-150, 0, 150], outputRange: ['-12deg', '-2deg', '8deg'] });
  const opacity = panX.interpolate({ inputRange: [-150, 0, 150], outputRange: [0.6, 1, 0.6] });

  useEffect(() => {
    const t = setInterval(() => setTime(v => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: panX }], { useNativeDriver: false }),
    onPanResponderRelease: (_, { dx }) => {
      if (Math.abs(dx) > 80) {
        const isNeed = dx > 0;
        Animated.timing(panX, { toValue: dx > 0 ? 400 : -400, duration: 250, useNativeDriver: false }).start(() => {
          setScore(s => s + (streak >= 3 ? 20 : 10));
          setStreak(s => s + 1);
          setCardIdx(i => (i + 1) % SORT_CARDS.length);
          panX.setValue(0);
        });
      } else {
        Animated.spring(panX, { toValue: 0, useNativeDriver: false }).start();
      }
    },
  });

  const card = SORT_CARDS[cardIdx];
  const nextCard = SORT_CARDS[(cardIdx + 1) % SORT_CARDS.length];
  const left = SORT_CARDS.length - cardIdx;

  return (
    <View style={[s.flex, { backgroundColor: CC.greenInk }]}>
      {/* HUD */}
      <View style={[s.nvwHud, { paddingTop: insets.top + 6 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.nvwBack}>
          <Text style={{ color: '#fff', fontSize: 22 }}>‹</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={s.nvwTitle}>Need vs. Want</Text>
          <Text style={s.nvwSub}>60 second sorter</Text>
        </View>
        <View style={s.timerChip}>
          <Text style={s.timerText}>⏱ 0:{String(time).padStart(2,'0')}</Text>
        </View>
      </View>

      {/* Score board */}
      <View style={s.scoreboard}>
        <ScoreCol label="STREAK" value={`🔥 ${streak}`} />
        <ScoreCol label="SCORE" value={String(score)} />
        <ScoreCol label="LEFT" value={String(left)} />
      </View>

      {/* Cards */}
      <View style={s.cardArea}>
        {/* Back card (peeking) */}
        <View style={s.cardBehind}>
          <Text style={s.cardItemText}>{nextCard.item}</Text>
        </View>

        {/* Front card */}
        <Animated.View
          style={[
            s.sortCard,
            { transform: [{ translateX: panX }, { rotate }], opacity },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={s.cardImagePlaceholder}>
            <Text style={{ fontSize: 64 }}>{card.emoji}</Text>
          </View>
          <Text style={s.cardItemText}>{card.item}</Text>
          <Text style={s.cardPriceSub}>{card.price} · {card.sub}</Text>
          <Text style={s.swipeHint}>← SWIPE TO SORT →</Text>
        </Animated.View>
      </View>

      {/* Sort buttons */}
      <View style={[s.sortBtns, { paddingBottom: Math.max(insets.bottom, 18) }]}>
        <TouchableOpacity
          style={[s.sortBtn, { backgroundColor: CC.coral }]}
          onPress={() => {
            Animated.timing(panX, { toValue: -400, duration: 250, useNativeDriver: false }).start(() => {
              setScore(s => s + 10);
              setCardIdx(i => (i + 1) % SORT_CARDS.length);
              panX.setValue(0);
            });
          }}
        >
          <Text style={s.sortBtnText}>← Want</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.sortBtn, { backgroundColor: CC.green }]}
          onPress={() => {
            Animated.timing(panX, { toValue: 400, duration: 250, useNativeDriver: false }).start(() => {
              setScore(s => s + 10);
              setStreak(s => s + 1);
              setCardIdx(i => (i + 1) % SORT_CARDS.length);
              panX.setValue(0);
            });
          }}
        >
          <Text style={s.sortBtnText}>Need →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ScoreCol({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={s.scoreLabel}>{label}</Text>
      <Text style={s.scoreValue}>{value}</Text>
    </View>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  flex: { flex: 1 },

  // learn home
  learnHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingBottom: 6,
  },
  gardenLabel: { fontSize: 11, color: CC.ink3, fontWeight: '600', letterSpacing: 0.4 },
  gardenTitle: { fontSize: 22, fontWeight: '800', color: CC.greenInk, letterSpacing: -0.3 },
  statsChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 999, borderWidth: 1, borderColor: CC.line,
  },
  statsChipText: { fontSize: 13, fontWeight: '800', color: CC.ink },
  statsChipDot: { fontSize: 11, color: CC.ink3 },
  learnScroll: { paddingHorizontal: 16, gap: 0 },
  gardenCard: {
    borderRadius: 22, overflow: 'hidden',
    borderWidth: 1, borderColor: CC.line,
    ...shadow.card,
  },
  miniStats: { flexDirection: 'row', gap: 8, marginTop: 10 },
  miniStat: {
    flex: 1, paddingHorizontal: 10, paddingVertical: 8,
    backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: CC.line,
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  miniStatV: { fontSize: 15, fontWeight: '800', lineHeight: 18 },
  miniStatL: { fontSize: 10, color: CC.ink3 },
  pillarsHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline',
    paddingVertical: 14, paddingHorizontal: 4,
  },
  pillarsTitle: { fontSize: 14, fontWeight: '800', color: CC.ink },
  pillarsGames: { fontSize: 12, color: CC.green, fontWeight: '700' },
  pillarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pillarCard: {
    width: '48%', backgroundColor: '#fff', borderRadius: 16,
    padding: 12, borderWidth: 1, borderColor: CC.line,
  },
  pillarCardRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pillarIcon: {
    width: 32, height: 32, borderRadius: 10, backgroundColor: CC.mint,
    alignItems: 'center', justifyContent: 'center',
  },
  pillarName: { fontSize: 14, fontWeight: '800', flex: 1, color: CC.ink },
  pillarTrack: {
    height: 5, backgroundColor: CC.mintDeep, borderRadius: 3, overflow: 'hidden', marginTop: 10,
  },
  pillarFill: { height: '100%', borderRadius: 3 },
  pillarMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  pillarMetaLeft: { fontSize: 11, color: CC.ink3 },
  pillarMetaRight: { fontSize: 11, fontWeight: '700' },

  // pillar detail
  pillarHero: { paddingHorizontal: 18, paddingBottom: 22 },
  pillarHeroRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  pillarBreadcrumb: { flex: 1, fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: '700', letterSpacing: 1 },
  pillarHeroIcon: {
    width: 56, height: 56, borderRadius: 18,
    backgroundColor: CC.green,
    alignItems: 'center', justifyContent: 'center',
  },
  pillarHeroName: { fontSize: 22, fontWeight: '800', color: '#fff' },
  pillarHeroMeta: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  pillarProgressBg: {
    height: 6, backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3, overflow: 'hidden', marginTop: 14,
  },
  pillarProgressFill: { height: '100%', backgroundColor: CC.yellow },
  lessonList: { paddingHorizontal: 16, paddingTop: 16 },
  lessonListCard: {
    backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden',
    ...shadow.card,
  },
  lessonRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 12, gap: 12,
  },
  lessonRowBorder: { borderBottomWidth: 1, borderBottomColor: CC.line },
  lessonNum: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: CC.mintDeep,
    alignItems: 'center', justifyContent: 'center',
  },
  lessonNumText: { fontSize: 14, fontWeight: '800', color: CC.ink3 },
  lessonTitle: { fontSize: 14, fontWeight: '600', color: CC.ink },
  lessonMeta: { fontSize: 11, color: CC.ink3 },
  lessonQuest: { fontSize: 11, color: CC.yellowDeep, fontWeight: '700' },

  // lesson apply
  applyProgress: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, gap: 10, marginBottom: 6,
  },
  applyTrack: {
    flex: 1, height: 6, backgroundColor: '#fff', borderRadius: 3, overflow: 'hidden',
  },
  applyFill: { height: '100%', backgroundColor: CC.green },
  applyCounter: { fontSize: 11, color: CC.ink3, fontWeight: '700' },
  applyContent: { paddingHorizontal: 20, gap: 0 },
  confettiRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 6 },
  confetti: { fontSize: 16 },
  lessonCompleteLabel: {
    textAlign: 'center', fontSize: 11, color: CC.green,
    fontWeight: '700', letterSpacing: 1, marginTop: 8,
  },
  lessonCompleteTitle: {
    textAlign: 'center', fontSize: 24, fontWeight: '800',
    color: CC.greenInk, letterSpacing: -0.3, marginTop: 4,
  },
  xpGain: {
    marginTop: 14, padding: 12, borderRadius: 18,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  xpGainText: { flex: 1, fontWeight: '700', fontSize: 14, color: CC.greenInk },
  xpGainValue: { fontSize: 18, fontWeight: '800', color: CC.greenInk },
  gardenSnippet: {
    marginTop: 12, borderRadius: 18, overflow: 'hidden',
    borderWidth: 1, borderColor: CC.line,
  },
  applyCTA: {
    marginTop: 14, padding: 14, borderRadius: 18,
    backgroundColor: '#fff', borderWidth: 1, borderColor: CC.line,
  },
  applyCtaLabel: {
    fontSize: 11, color: CC.ink3, fontWeight: '700', letterSpacing: 1,
  },
  applyCtaText: { fontSize: 15, fontWeight: '700', marginTop: 4, lineHeight: 21, color: CC.ink },
  maybeLater: { textAlign: 'center', fontSize: 12, color: CC.ink3, fontWeight: '600' },

  // Alex chat
  alexOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14,20,16,0.35)',
  },
  alexSheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', borderRadius: 24,
    padding: 18,
    ...shadow.sheet,
  },
  dragHandle: {
    width: 36, height: 4, backgroundColor: CC.lineHard,
    borderRadius: 2, alignSelf: 'center', marginBottom: 12,
  },
  alexHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  alexName: { fontSize: 16, fontWeight: '800', color: CC.ink },
  alexOnline: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: CC.green },
  onlineText: { fontSize: 11, color: CC.green, fontWeight: '600' },
  learnOnlyTag: { fontSize: 11, color: CC.ink3 },
  bubbles: { marginTop: 14, gap: 8 },
  alexBubble: {
    backgroundColor: CC.mint, borderRadius: 16,
    borderBottomLeftRadius: 4, padding: 10, maxWidth: '88%',
  },
  alexBubbleText: { fontSize: 14, lineHeight: 20, color: CC.ink },
  choices: { gap: 8, marginTop: 14 },
  choiceBtn: {
    padding: 12, borderRadius: 12,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: CC.mintEdge,
    alignItems: 'center',
  },
  choiceBtnGhost: { backgroundColor: 'transparent', borderWidth: 0 },
  choiceBtnText: { fontSize: 14, fontWeight: '700', color: CC.greenInk },
  choiceBtnTextGhost: { color: CC.ink3 },

  // Need vs Want
  nvwHud: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 18, paddingBottom: 8,
  },
  nvwBack: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  nvwTitle: { fontSize: 18, fontWeight: '800', color: '#fff' },
  nvwSub: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  timerChip: {
    backgroundColor: CC.yellow, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
  },
  timerText: { fontSize: 13, fontWeight: '800', color: CC.greenInk },
  scoreboard: {
    marginHorizontal: 18, padding: 8, paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  scoreLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: '600' },
  scoreValue: { fontSize: 20, fontWeight: '800', color: '#fff' },
  cardArea: { flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative', paddingHorizontal: 18 },
  cardBehind: {
    position: 'absolute',
    left: 28, right: 28, top: 30, bottom: 24,
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 22,
    transform: [{ rotate: '2deg' }],
    alignItems: 'center', justifyContent: 'center',
  },
  sortCard: {
    backgroundColor: '#fff', borderRadius: 22, padding: 18,
    alignItems: 'center', width: SW - 36,
    ...shadow.hero,
  },
  cardImagePlaceholder: {
    width: '100%', height: 120, backgroundColor: CC.mint,
    borderRadius: 14, alignItems: 'center', justifyContent: 'center',
  },
  cardItemText: { fontSize: 16, fontWeight: '800', marginTop: 12, color: CC.ink },
  cardPriceSub: { fontSize: 12, color: CC.ink3, marginTop: 2 },
  swipeHint: {
    fontSize: 11, color: CC.ink3, fontWeight: '700', letterSpacing: 1, marginTop: 14,
  },
  sortBtns: {
    flexDirection: 'row', gap: 12, paddingHorizontal: 18, paddingTop: 0,
  },
  sortBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  sortBtnText: { fontSize: 16, fontWeight: '800', color: '#fff' },
});
