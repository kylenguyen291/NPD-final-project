import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CC, spacing, radius, shadow } from '@/theme';
import { CCMark } from '@/components';
import { useApp } from '@/context';

// ─── PROFILE HOME ─────────────────────────────────────────────────────────────
export function ProfileHomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { state } = useApp();
  const { name, handle, avatar, age, xp, streak } = state.user;

  return (
    <View style={[s.flex, { backgroundColor: CC.mint }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient
          colors={[CC.green, CC.greenDeep]}
          style={[s.hero, { paddingTop: insets.top + 14 }]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          {/* Decorative leaves */}
          <Text style={[s.leaf, { right: -10, top: -8, fontSize: 70 }]}>🌿</Text>
          <Text style={[s.leaf, { right: 80, bottom: -14, fontSize: 50 }]}>🌱</Text>

          {/* Avatar + info */}
          <View style={s.heroRow}>
            <View style={s.avatarCircle}>
              <Text style={{ fontSize: 34 }}>{avatar}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.heroName}>{name}</Text>
              <Text style={s.heroHandle}>@{handle} · {age} · Hà Nội</Text>
              <View style={s.levelChip}>
                <Text style={s.levelChipText}>🪴 LEVEL 6 · GARDENER</Text>
              </View>
            </View>
          </View>

          {/* Quick stats */}
          <View style={s.quickStats}>
            <PStat v={(xp / 1000).toFixed(3)} l="XP earned" />
            <PStat v={`🔥 ${streak}`} l="day streak" />
            <PStat v="2/6" l="pillars" />
          </View>
        </LinearGradient>

        <View style={s.mainContent}>
          {/* Certificates */}
          <View style={s.card}>
            <View style={s.certHeader}>
              <Text style={s.sectionTitle}>Certificates & badges</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Certificates')}>
                <Text style={s.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>
            <View style={s.badgeRow}>
              <Badge icon="🐷" name="Save" earned />
              <Badge icon="🛡️" name="Protect" earned />
              <Badge icon="🛒" name="Spend" locked />
              <Badge icon="🛠️" name="Earn" locked />
              <Badge icon="🌳" name="Invest" locked />
            </View>
          </View>

          {/* Settings list */}
          <View style={s.settingsList}>
            <SettingRow icon="🔔" label="Notifications" detail="3 active" onPress={() => {}} />
            <SettingRow icon="📺" label="Discover daily cap" detail="25 min" onPress={() => {}} />
            <SettingRow icon="🔒" label="PIN & biometric" detail="Face ID on" onPress={() => {}} />
            <SettingRow icon="🤖" label="What Alex can see" detail="Learning only" onPress={() => {}} />
            <SettingRow icon="🌐" label="Language" detail="Tiếng Việt" onPress={() => {}} />
            <SettingRow icon="❓" label="Help & support" detail="" last onPress={() => {}} />
          </View>

          <Text style={s.versionText}>Cha-Ching v1.0 · MVP · Made in 🇻🇳</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function PStat({ v, l }: { v: string; l: string }) {
  return (
    <View style={s.pStat}>
      <Text style={s.pStatV}>{v}</Text>
      <Text style={s.pStatL}>{l}</Text>
    </View>
  );
}

function Badge({ icon, name, earned, locked }: { icon: string; name: string; earned?: boolean; locked?: boolean }) {
  return (
    <View style={s.badge}>
      <View style={[
        s.badgeIcon,
        earned && s.badgeIconEarned,
        locked && { opacity: 0.55 },
      ]}>
        <Text style={{ fontSize: 24 }}>{locked ? '🔒' : icon}</Text>
      </View>
      <Text style={[s.badgeName, locked && { color: CC.ink3 }]}>{name}</Text>
    </View>
  );
}

function SettingRow({ icon, label, detail, last, onPress }: any) {
  return (
    <TouchableOpacity
      style={[s.settingRow, !last && s.settingRowBorder]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={{ fontSize: 18 }}>{icon}</Text>
      <Text style={s.settingLabel}>{label}</Text>
      {detail ? <Text style={s.settingDetail}>{detail}</Text> : null}
      <Text style={s.chevron}>›</Text>
    </TouchableOpacity>
  );
}

// ─── CERTIFICATES WALL ────────────────────────────────────────────────────────
export function CertificatesScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.flex, { backgroundColor: CC.mint }]}>
      {/* Navbar */}
      <View style={[s.navBar, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.navBackBtn}>
          <Text style={{ color: CC.ink, fontSize: 20 }}>‹</Text>
        </TouchableOpacity>
        <Text style={s.navTitle}>Achievements</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
        {/* Foundation certificate */}
        <LinearGradient
          colors={[CC.greenInk, CC.green]}
          style={s.foundationCert}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          <Text style={s.foundationTrophy}>🏆</Text>
          <Text style={s.foundationTier}>FOUNDATION TIER</Text>
          <Text style={s.foundationTitle}>Cha-Ching Certificate</Text>
          <Text style={s.foundationMeta}>2 of 6 pillars complete · keep going</Text>
          <View style={s.foundationTrack}>
            <View style={[s.foundationFill, { width: '33%' }]} />
          </View>
          <Text style={s.foundationCosign}>
            Co-signed with VinUniversity Entrepreneurship Lab
          </Text>
        </LinearGradient>

        {/* Earned */}
        <Text style={s.certSectionLabel}>EARNED · 2</Text>
        <View style={s.certGrid}>
          <CertCard icon="🐷" name="Save Foundation" date="May 14, 2026" tone={CC.green} />
          <CertCard icon="🛡️" name="Protect Foundation" date="May 22, 2026" tone={CC.yellowDeep} />
        </View>

        {/* In Progress */}
        <Text style={s.certSectionLabel}>IN PROGRESS · 4</Text>
        <View style={s.certGrid}>
          <CertCard icon="🛠️" name="Earn"   date="3 of 10" locked />
          <CertCard icon="🛒" name="Spend"  date="5 of 10" locked />
          <CertCard icon="🌳" name="Invest" date="0 of 8"  locked />
          <CertCard icon="🌸" name="Give"   date="2 of 6"  locked />
        </View>
      </ScrollView>
    </View>
  );
}

function CertCard({ icon, name, date, tone, locked }: any) {
  return (
    <View style={[s.certCard, locked && { opacity: 0.85 }]}>
      <View style={[
        s.certIcon,
        locked ? { backgroundColor: CC.mintDeep } : { backgroundColor: tone ?? CC.green },
      ]}>
        <Text style={{ fontSize: 22, filter: locked ? 'grayscale(1)' : undefined } as any}>{icon}</Text>
      </View>
      <Text style={s.certName}>{name}</Text>
      <Text style={s.certDate}>{date}</Text>
    </View>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  flex: { flex: 1 },

  // hero
  hero: { paddingHorizontal: 18, paddingBottom: 26, overflow: 'hidden' },
  leaf: { position: 'absolute', opacity: 0.12 },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: CC.yellow,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: '#fff',
  },
  heroName: { fontSize: 18, fontWeight: '800', color: '#fff' },
  heroHandle: { fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  levelChip: {
    marginTop: 6, paddingHorizontal: 10, paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 999, alignSelf: 'flex-start',
  },
  levelChipText: { fontSize: 11, fontWeight: '700', color: '#fff' },
  quickStats: { flexDirection: 'row', gap: 8, marginTop: 14 },
  pStat: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.16)',
    padding: 8, paddingHorizontal: 12, borderRadius: 14,
  },
  pStatV: { fontSize: 16, fontWeight: '800', color: '#fff' },
  pStatL: { fontSize: 10, color: 'rgba(255,255,255,0.8)' },

  // main content
  mainContent: { padding: 16, gap: 12, marginTop: -10 },
  card: {
    backgroundColor: '#fff', borderRadius: 20,
    padding: 14, ...shadow.card,
  },
  certHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: CC.ink },
  viewAll: { fontSize: 11, color: CC.green, fontWeight: '700' },
  badgeRow: { flexDirection: 'row', gap: 8 },
  badge: {
    flex: 1, minWidth: 60, alignItems: 'center', gap: 4,
  },
  badgeIcon: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: CC.mintDeep,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeIconEarned: {
    backgroundColor: CC.yellow,
    borderWidth: 2, borderColor: '#fff',
  },
  badgeName: { fontSize: 10, fontWeight: '700', color: CC.ink },

  settingsList: {
    backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', ...shadow.card,
  },
  settingRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 12, gap: 12,
  },
  settingRowBorder: { borderBottomWidth: 1, borderBottomColor: CC.line },
  settingLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: CC.ink },
  settingDetail: { fontSize: 12, color: CC.ink3 },
  chevron: { fontSize: 14, color: CC.ink3 },
  versionText: { textAlign: 'center', fontSize: 12, color: CC.ink3, marginTop: 4 },

  // certs screen
  navBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingBottom: 6, gap: 10,
  },
  navBackBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    ...shadow.card,
  },
  navTitle: { flex: 1, fontSize: 17, fontWeight: '800', color: CC.ink },
  foundationCert: {
    borderRadius: 22, padding: 16, marginBottom: 14,
    overflow: 'hidden', position: 'relative',
  },
  foundationTrophy: {
    position: 'absolute', right: -6, top: -10, fontSize: 90, opacity: 0.15,
  },
  foundationTier: {
    fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: '700', letterSpacing: 2,
  },
  foundationTitle: { fontSize: 17, fontWeight: '800', color: '#fff', marginTop: 4 },
  foundationMeta: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  foundationTrack: {
    height: 6, backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 3, overflow: 'hidden', marginTop: 10,
  },
  foundationFill: { height: '100%', backgroundColor: CC.yellow },
  foundationCosign: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 6 },

  certSectionLabel: {
    fontSize: 12, color: CC.ink3, fontWeight: '700',
    letterSpacing: 1, marginBottom: 6, marginTop: 14,
  },
  certGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  certCard: {
    width: '47%', backgroundColor: '#fff', borderRadius: 16,
    padding: 12, borderWidth: 1, borderColor: CC.line,
  },
  certIcon: {
    width: 44, height: 44, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  certName: { fontSize: 13, fontWeight: '800', marginTop: 8, color: CC.ink },
  certDate: { fontSize: 11, color: CC.ink3, marginTop: 2 },
});
