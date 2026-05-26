import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, FlatList, Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CC, spacing, radius, shadow, vnd } from '@/theme';
import { CCMark, GardenScene, Btn, OnbProgressBar } from '@/components';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// ─── SPLASH ─────────────────────────────────────────────────────────────────
export function OnbSplashScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[CC.green, CC.greenDeep]}
      style={[s.flex, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
    >
      {/* Floating coins */}
      <Text style={[s.floatCoin, { top: 60, right: 50 }]}>🪙</Text>
      <Text style={[s.floatCoin, { top: 110, left: 40, fontSize: 22 }]}>🪙</Text>
      <Text style={[s.floatCoin, { top: 80, left: '48%', fontSize: 16 }]}>✨</Text>

      <View style={s.splashCenter}>
        {/* Logo */}
        <View style={s.logoWrap}>
          <CCMark size={62} />
        </View>
        <Text style={s.wordmark}>Cha-Ching</Text>
        <Text style={s.tagline}>The teen wallet that grows with you</Text>

        {/* Garden preview */}
        <View style={s.gardenWrap}>
          <GardenScene height={150} />
        </View>
      </View>

      {/* CTA */}
      <View style={[s.splashBottom, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <Btn
          kind="yellow"
          size="lg"
          full
          label="Get Started  →"
          onPress={() => navigation.navigate('OnbHandle')}
        />
        <Text style={s.signinHint}>
          Have an account?{'  '}<Text style={{ fontWeight: '800' }}>Sign in</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

// ─── HANDLE ──────────────────────────────────────────────────────────────────
const AVATARS = ['🧑‍🎓','👨🏻‍🎤','👩🏻','🧑🏻‍💻','👦🏻','👧🏻','🧑🏻‍🎨','🧑🏻'];

export function OnbHandleScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [handle, setHandle] = useState('kyle.long');
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  return (
    <View style={[s.flex, { backgroundColor: CC.paper, paddingTop: insets.top }]}>
      <OnbProgressBar step={2} total={5} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={s.handleContent} keyboardShouldPersistTaps="handled">
        <Text style={s.h1}>Pick a handle</Text>
        <Text style={s.sub}>This is how friends will see you. You can change it later.</Text>

        {/* Input */}
        <View style={s.handleInput}>
          <Text style={s.atSign}>@</Text>
          <TextInput
            value={handle}
            onChangeText={setHandle}
            style={s.handleField}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={{ color: CC.green, fontSize: 16 }}>✓</Text>
        </View>
        <Text style={s.handleHint}>✓ Available · {handle.length}/15 characters</Text>

        {/* Avatars */}
        <Text style={s.sectionLabel}>Pick an avatar</Text>
        <View style={s.avatarGrid}>
          {AVATARS.map((a, i) => (
            <TouchableOpacity
              key={i}
              style={[s.avatarCell, i === selectedAvatar && s.avatarCellActive]}
              onPress={() => setSelectedAvatar(i)}
              activeOpacity={0.75}
            >
              <Text style={{ fontSize: 28 }}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={[s.bottomPad, { paddingBottom: Math.max(insets.bottom, 18) }]}>
        <Btn kind="primary" size="lg" full label="Continue  →" onPress={() => navigation.navigate('OnbPIN')} />
      </View>
    </View>
  );
}

// ─── PIN ─────────────────────────────────────────────────────────────────────
const NUM_PAD = [
  ['1','2','3'],
  ['4','5','6'],
  ['7','8','9'],
  ['','0','⌫'],
];

export function OnbPINScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [pin, setPin] = useState<string[]>([]);

  const handleKey = (key: string) => {
    if (key === '⌫') {
      setPin(p => p.slice(0, -1));
    } else if (key !== '' && pin.length < 6) {
      const next = [...pin, key];
      setPin(next);
      if (next.length === 6) {
        setTimeout(() => navigation.navigate('OnbGarden'), 300);
      }
    }
  };

  return (
    <View style={[s.flex, { backgroundColor: CC.paper, paddingTop: insets.top }]}>
      <OnbProgressBar step={4} total={5} onBack={() => navigation.goBack()} />

      <View style={s.pinContent}>
        <Text style={s.h1}>Create a PIN</Text>
        <Text style={s.sub}>You'll use this every time you pay. Keep it secret.</Text>

        {/* Dots */}
        <View style={s.pinDots}>
          {[0,1,2,3,4,5].map(i => (
            <View
              key={i}
              style={[
                s.dot,
                i < pin.length ? s.dotFilled : i === pin.length ? s.dotActive : null,
              ]}
            />
          ))}
        </View>
        <Text style={s.pinHint}>{pin.length === 0 ? 'Enter a 6-digit PIN' : `${pin.length} of 6 entered`}</Text>

        {/* Numpad */}
        <View style={s.numpad}>
          {NUM_PAD.map((row, ri) => (
            <View key={ri} style={s.numRow}>
              {row.map((key, ki) => (
                <TouchableOpacity
                  key={ki}
                  style={[s.numKey, key === '' && { opacity: 0 }]}
                  onPress={() => handleKey(key)}
                  activeOpacity={0.65}
                >
                  <Text style={s.numKeyText}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// ─── GARDEN INTRO ─────────────────────────────────────────────────────────────
export function OnbGardenScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.flex, { backgroundColor: CC.mint, paddingTop: insets.top }]}>
      <OnbProgressBar step={5} total={5} onBack={() => navigation.goBack()} />

      <View style={s.gardenIntroContent}>
        <Text style={s.gardenIntroLabel}>YOUR GARDEN</Text>
        <Text style={s.gardenIntroTitle}>Your Cha-Ching Garden{'\n'}starts here 🌱</Text>
        <Text style={[s.sub, { textAlign: 'center', marginHorizontal: spacing.xl }]}>
          Every time you learn, save, and make smart choices — your garden grows.
        </Text>

        {/* Garden preview */}
        <View style={s.gardenIntroWrap}>
          <GardenScene height={200} />
        </View>

        {/* Pillars preview */}
        <View style={s.pillarPreviewRow}>
          {[
            { i: '🛠️', n: 'Earn' },
            { i: '🐷', n: 'Save' },
            { i: '🛒', n: 'Spend' },
            { i: '🌳', n: 'Invest' },
            { i: '🌸', n: 'Give' },
            { i: '🛡️', n: 'Protect' },
          ].map(p => (
            <View key={p.n} style={s.pillarChip}>
              <Text style={{ fontSize: 18 }}>{p.i}</Text>
              <Text style={s.pillarChipLabel}>{p.n}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[s.bottomPad, { paddingBottom: Math.max(insets.bottom, 18) }]}>
        <Btn
          kind="primary"
          size="lg"
          full
          label="Let's grow  🌱"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })}
        />
      </View>
    </View>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  flex: { flex: 1 },

  // splash
  floatCoin: { position: 'absolute', fontSize: 28 },
  splashCenter: { flex: 1, alignItems: 'center', paddingTop: 80, paddingHorizontal: 24 },
  logoWrap: {
    width: 96, height: 96, borderRadius: 28,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    ...shadow.hero,
  },
  wordmark: {
    fontSize: 38, fontWeight: '800', color: '#fff',
    marginTop: 18, letterSpacing: -0.5,
    fontFamily: 'Caveat_700Bold',
  },
  tagline: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  gardenWrap: {
    marginTop: 30, width: '100%', borderRadius: 20,
    overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.12)',
  },
  splashBottom: { paddingHorizontal: 24, gap: 12 },
  signinHint: { textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.85)' },

  // handle
  handleContent: { padding: spacing.xl, gap: 0 },
  h1: { fontSize: 24, fontWeight: '800', color: CC.ink, letterSpacing: -0.3, marginTop: 18 },
  sub: { fontSize: 14, color: CC.ink2, marginTop: 4 },
  handleInput: {
    marginTop: 22, backgroundColor: '#fff', borderRadius: 16,
    paddingHorizontal: 14, paddingVertical: 4,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 2, borderColor: CC.green,
  },
  atSign: { fontSize: 18, color: CC.ink3 },
  handleField: { flex: 1, fontSize: 18, fontWeight: '700', paddingVertical: 14, color: CC.ink },
  handleHint: { fontSize: 12, color: CC.green, fontWeight: '600', marginTop: 6, paddingLeft: 4 },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: CC.ink2, marginTop: 24 },
  avatarGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10,
  },
  avatarCell: {
    width: '22%', aspectRatio: 1, borderRadius: 18,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: CC.line,
  },
  avatarCellActive: {
    backgroundColor: CC.yellow,
    borderWidth: 3, borderColor: CC.green,
  },
  bottomPad: { paddingHorizontal: 24 },

  // PIN
  pinContent: { flex: 1, paddingHorizontal: 24, alignItems: 'center', paddingTop: 18 },
  pinDots: { flexDirection: 'row', gap: 14, marginTop: 36 },
  dot: {
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: CC.mintDeep,
    borderWidth: 0,
  },
  dotFilled: { backgroundColor: CC.green },
  dotActive: {
    backgroundColor: '#fff', borderWidth: 2, borderColor: CC.green,
  },
  pinHint: { fontSize: 12, color: CC.ink3, marginTop: 10 },
  numpad: { marginTop: 32, width: '100%', gap: 12 },
  numRow: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  numKey: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    ...shadow.card,
  },
  numKeyText: { fontSize: 24, fontWeight: '600', color: CC.ink },

  // Garden intro
  gardenIntroContent: { flex: 1, alignItems: 'center', paddingTop: 24 },
  gardenIntroLabel: {
    fontSize: 11, fontWeight: '700', color: CC.ink3,
    letterSpacing: 1.5, marginBottom: 8,
  },
  gardenIntroTitle: {
    fontSize: 26, fontWeight: '800', color: CC.greenInk,
    textAlign: 'center', lineHeight: 32, marginBottom: 10,
  },
  gardenIntroWrap: {
    width: '88%', borderRadius: 22,
    overflow: 'hidden', marginTop: 20,
    borderWidth: 1, borderColor: CC.line,
  },
  pillarPreviewRow: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8,
    paddingHorizontal: 24, marginTop: 18, justifyContent: 'center',
  },
  pillarChip: {
    paddingHorizontal: 12, paddingVertical: 8,
    backgroundColor: '#fff', borderRadius: 999,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: CC.line,
  },
  pillarChipLabel: { fontSize: 12, fontWeight: '700', color: CC.ink },
});
