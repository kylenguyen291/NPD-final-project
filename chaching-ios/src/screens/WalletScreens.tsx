import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CC, shadow, vnd, vndK } from '../theme';
import { useApp } from '../context';
import { Card, Btn, CircleBtn, CCHeader, SlideToPay, GoalRing } from '../components';

const W = Dimensions.get('window').width;

// ─── Wallet Home ─────────────────────────────────────────────────
export function WalletHomeScreen({ navigation }: any) {
  const { state } = useApp();
  const insets = useSafeAreaInsets();
  const { spend, save, give } = state.wallet;
  const total = spend + save + give;

  return (
    <View style={{ flex: 1, backgroundColor: CC.mint }}>
      <View style={{ paddingTop: insets.top }}>
        <CCHeader name={state.user.name} onProfile={() => navigation.navigate('ProfileTab')} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Balance Hero */}
        <LinearGradient colors={[CC.green, CC.greenDeep]} start={{ x: 0, y: 0 }} end={{ x: 0.3, y: 1 }}
          style={{ borderRadius: 24, padding: 18, ...shadow.hero }}>
          <Text style={s.balanceLabel}>Tổng số dư · Total balance</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 2 }}>
            <Text style={s.balanceAmount}>{vnd(total)}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginLeft: 4, fontWeight: '600' }}>₫</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 6, marginTop: 14 }}>
            {[['💸','Spend',spend],['🐷','Save',save],['❤️','Give',give]].map(([icon,label,amt]) => (
              <View key={label as string} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.18)', padding: 10, borderRadius: 12 }}>
                <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>{icon} {label}</Text>
                <Text style={{ fontSize: 15, fontWeight: '800', color: '#fff', marginTop: 2 }}>{vndK(amt as number)}<Text style={{ fontSize: 10, opacity: 0.7 }}> ₫</Text></Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Quick actions */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
          {[
            { icon: '↗', label: 'Send',    screen: 'TopUp', accent: false },
            { icon: '↙', label: 'Request', screen: 'TopUp', accent: false },
            { icon: '⬡', label: 'Scan QR', screen: 'ScanQR', accent: true  },
            { icon: '＋', label: 'Top-up', screen: 'TopUp', accent: false },
          ].map(({ icon, label, screen, accent }) => (
            <TouchableOpacity key={label} onPress={() => navigation.navigate(screen)} style={{ alignItems: 'center', gap: 6 }}>
              <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: accent ? CC.green : '#fff', alignItems: 'center', justifyContent: 'center', ...(accent ? shadow.hero : shadow.card) }}>
                <Text style={{ fontSize: 20, color: accent ? '#fff' : CC.green }}>{icon}</Text>
              </View>
              <Text style={{ fontSize: 11, fontWeight: '600', color: CC.ink2 }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Savings Goals */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: CC.ink }}>Savings goals</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SavingsGoals')}>
            <Text style={{ fontSize: 12, color: CC.green, fontWeight: '600' }}>See all →</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
          {[
            { name: 'Bicycle 🚲', pct: 64, left: '720K', tone: CC.green },
            { name: 'AirPods 🎧', pct: 28, left: '1,8M', tone: CC.yellowDeep },
          ].map(g => (
            <TouchableOpacity key={g.name} onPress={() => navigation.navigate('SavingsGoals')} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, ...shadow.card }}>
              <GoalRing pct={g.pct} tone={g.tone} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '700' }}>{g.name}</Text>
                <Text style={{ fontSize: 11, color: CC.ink3, marginTop: 2 }}>{g.left} ₫ left</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* This Week */}
        <TouchableOpacity onPress={() => navigation.navigate('SpendingSummary')}>
          <Card padding={14} borderRadius={20}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontSize: 14, fontWeight: '700' }}>This week's spending</Text>
              <Text style={{ fontSize: 11, color: CC.ink3 }}>Mon–Sun</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 5, height: 52 }}>
              {[24,38,22,60,14,50,30].map((h, i) => (
                <View key={i} style={{ flex: 1, height: `${h}%` as any, backgroundColor: i === 3 ? CC.coral : CC.mintDeep, borderRadius: 3 }} />
              ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
              {['M','T','W','T','F','S','S'].map((d,i) => <Text key={i} style={{ fontSize: 10, color: CC.ink3 }}>{d}</Text>)}
            </View>
          </Card>
        </TouchableOpacity>

        {/* Tip of the Day */}
        <TouchableOpacity onPress={() => navigation.navigate('DiscoverTab')} style={{ marginTop: 14, padding: 12, borderRadius: 14, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: CC.mintEdge }}>
          <Text style={{ fontSize: 18 }}>💡</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: CC.ink3, fontWeight: '600', letterSpacing: 0.3 }}>TIP OF THE DAY · 60s</Text>
            <Text style={{ fontSize: 13, fontWeight: '600', marginTop: 1 }}>What is compound interest?</Text>
          </View>
          <Text style={{ color: CC.green, fontSize: 18 }}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ─── Scan QR ──────────────────────────────────────────────────────
export function ScanQRScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: '#0E1410' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* QR frame */}
        <View style={{ width: 240, height: 240, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 190, height: 190, backgroundColor: '#fff', borderRadius: 8, opacity: 0.9 }}>
            {/* QR grid placeholder */}
            <View style={{ flex: 1, backgroundColor: '#fff', margin: 8, borderRadius: 4 }} />
          </View>
          {/* Corner guides */}
          {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h]) => (
            <View key={v+h} style={{ position:'absolute', [v]:-2, [h]:-2, width:28, height:28,
              borderTopWidth: v==='top' ? 3 : 0, borderBottomWidth: v==='bottom' ? 3 : 0,
              borderLeftWidth: h==='left' ? 3 : 0, borderRightWidth: h==='right' ? 3 : 0,
              borderColor: CC.yellow, borderRadius: 4 }} />
          ))}
        </View>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 20 }}>Point camera at a VietQR code</Text>

        {/* Mock detected banner */}
        <TouchableOpacity onPress={() => navigation.navigate('PayConfirm')} style={{ marginTop: 24, backgroundColor: 'rgba(63,142,92,0.9)', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: 20, color: '#fff' }}>✓</Text>
          <View>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#fff' }}>Highland Coffee detected</Text>
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Tap to continue →</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Bottom dock */}
      <View style={{ margin: 16, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 18, padding: 6, flexDirection: 'row', gap: 6 }}>
        {['Scan','My QR','Photo'].map((t, i) => (
          <View key={t} style={{ flex: 1, height: 36, borderRadius: 12, backgroundColor: i === 0 ? '#fff' : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: i === 0 ? CC.greenInk : 'rgba(255,255,255,0.7)' }}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Pay Confirm ──────────────────────────────────────────────────
export function PayConfirmScreen({ navigation }: any) {
  const { dispatch } = useApp();
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(14,20,16,0.9)' }}>
      <View style={{ flex: 1 }} />
      <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40, ...shadow.sheet }}>
        <View style={{ width: 36, height: 4, backgroundColor: CC.lineHard, borderRadius: 2, alignSelf: 'center', marginBottom: 14 }} />
        <Text style={{ fontSize: 12, color: CC.ink3, fontWeight: '600', textAlign: 'center' }}>PAYING TO</Text>
        <Text style={{ fontSize: 17, fontWeight: '700', textAlign: 'center', marginTop: 2 }}>Highland Coffee · Hai Bà Trưng</Text>
        <View style={{ backgroundColor: CC.mint, borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 6, marginTop: 12 }}>
          <Text style={{ fontSize: 38, fontWeight: '800', color: CC.greenInk }}>65.000</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: CC.green }}>₫</Text>
        </View>
        <View style={{ marginTop: 12, padding: 12, borderRadius: 14, borderWidth: 1, borderColor: CC.line, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: CC.mint, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16 }}>💸</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: CC.ink3 }}>Source</Text>
            <Text style={{ fontSize: 13, fontWeight: '700' }}>Spend bucket · 320.000 ₫</Text>
          </View>
          <Text style={{ color: CC.ink3 }}>⇅</Text>
        </View>
        <View style={{ marginTop: 14 }}>
          <SlideToPay onComplete={() => {
            dispatch({ type: 'COMPLETE_PAYMENT', amount: 65000, merchant: 'Highland Coffee Hai Bà Trưng' });
            navigation.navigate('Categorize');
          }} />
        </View>
        <Text style={{ textAlign: 'center', fontSize: 11, color: CC.ink3, marginTop: 10 }}>🔒 Secured with PIN · No fees</Text>
      </View>
    </View>
  );
}

// ─── Categorize ───────────────────────────────────────────────────
export function CategorizeScreen({ navigation }: any) {
  const { dispatch } = useApp();
  const [selected, setSelected] = useState<string | null>(null);
  const cats = [
    { icon: '🍔', name: 'Food & Drink' }, { icon: '🛍️', name: 'Shopping' },
    { icon: '🎮', name: 'Entertainment' }, { icon: '🚗', name: 'Transport' },
    { icon: '📚', name: 'Education' }, { icon: '💊', name: 'Health' },
    { icon: '❤️', name: 'Giving' }, { icon: '➕', name: 'Other' },
  ];

  const handleSelect = (cat: { icon: string; name: string }) => {
    setSelected(cat.icon);
    setTimeout(() => {
      dispatch({ type: 'CATEGORIZE_PAYMENT', icon: cat.icon, name: cat.name });
      navigation.navigate('WalletHome');
    }, 500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(14,20,16,0.9)' }}>
      {/* Success overlay */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', ...shadow.hero }}>
          <Text style={{ fontSize: 28, color: CC.green }}>✓</Text>
        </View>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 16 }}>−65.000 ₫</Text>
        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 }}>Paid Highland Coffee · 14:32</Text>
      </View>
      {/* Sheet */}
      <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 18, paddingBottom: 40 }}>
        <View style={{ width: 36, height: 4, backgroundColor: CC.lineHard, borderRadius: 2, alignSelf: 'center', marginBottom: 12 }} />
        <Text style={{ fontSize: 18, fontWeight: '800', textAlign: 'center' }}>What was this for?</Text>
        <Text style={{ fontSize: 12, color: CC.ink3, textAlign: 'center', marginTop: 2 }}>One tap. We won't comment.</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {cats.map(cat => (
            <TouchableOpacity key={cat.icon} onPress={() => handleSelect(cat)} style={{ width: (W - 36 - 8) / 2, padding: 12, borderRadius: 14, backgroundColor: selected === cat.icon ? CC.green : CC.mint, flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: selected === cat.icon ? 0 : 1, borderColor: CC.line }}>
              <Text style={{ fontSize: 20 }}>{cat.icon}</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: selected === cat.icon ? '#fff' : CC.ink }}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ marginTop: 14, padding: 10, borderRadius: 14, backgroundColor: CC.mint, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={{ fontSize: 11, color: CC.ink3, fontWeight: '600' }}>FEEL?</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginLeft: 'auto' }}>
            {['😞','😐','😊'].map(e => <Text key={e} style={{ fontSize: 22 }}>{e}</Text>)}
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Spending Summary ─────────────────────────────────────────────
export function SpendingSummaryScreen({ navigation }: any) {
  const [period, setPeriod] = useState('Month');
  const rows = [
    { i:'🍔', name:'Food & Drink',  amt:480, pct:38, band:CC.band.red,    delta:'↑ 120K' },
    { i:'🛍️', name:'Shopping',      amt:280, pct:23, band:CC.band.orange, delta:'↓ 40K'  },
    { i:'🎮', name:'Entertainment', amt:200, pct:16, band:CC.band.yellow, delta:'↑ 8K'   },
    { i:'🚗', name:'Transport',     amt:120, pct:10, band:CC.band.green,  delta:'→'       },
    { i:'📚', name:'Education',     amt:80,  pct:6,  band:CC.band.green,  delta:'↑ 30K'  },
    { i:'💊', name:'Health',        amt:50,  pct:4,  band:CC.band.green,  delta:'→'       },
    { i:'➕', name:'Other',         amt:30,  pct:2,  band:CC.band.gray,   delta:'↓ 10K'  },
  ];
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: CC.mint }}>
      <View style={{ paddingTop: insets.top, flexDirection: 'row', alignItems: 'center', padding: 16, gap: 10 }}>
        <CircleBtn onPress={() => navigation.goBack()}>‹</CircleBtn>
        <Text style={{ flex: 1, fontSize: 17, fontWeight: '800' }}>Spending</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}>
        {/* Segmented */}
        <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 3, borderWidth: 1, borderColor: CC.line }}>
          {['Week','Month','Year'].map(t => (
            <TouchableOpacity key={t} onPress={() => setPeriod(t)} style={{ flex: 1, padding: 8, borderRadius: 10, backgroundColor: t === period ? CC.greenInk : 'transparent', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: t === period ? '#fff' : CC.ink2 }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Total card */}
        <Card padding={16} borderRadius={20} style={{ marginTop: 12 }}>
          <Text style={{ fontSize: 11, color: CC.ink3, fontWeight: '600' }}>TOTAL · MAY 2026</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
            <Text style={{ fontSize: 28, fontWeight: '800' }}>1.240.000</Text>
            <Text style={{ fontSize: 14, fontWeight: '700', color: CC.green }}>₫</Text>
            <Text style={{ marginLeft: 'auto', fontSize: 12, color: CC.coral, fontWeight: '600' }}>↑ 8% vs April</Text>
          </View>
          <Text style={{ fontSize: 12, color: CC.ink3, marginTop: 2 }}>43 transactions</Text>
          <View style={{ flexDirection: 'row', height: 10, borderRadius: 5, overflow: 'hidden', marginTop: 10 }}>
            {rows.map((r, i) => <View key={i} style={{ width: `${r.pct}%` as any, backgroundColor: r.band }} />)}
          </View>
        </Card>
        {/* Category rows */}
        <View style={{ marginTop: 10, backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden' }}>
          {rows.map((r, i) => (
            <TouchableOpacity key={i} onPress={() => navigation.navigate('CategoryDetail')} style={{ flexDirection: 'row', alignItems: 'center', padding: 10, paddingHorizontal: 14, borderBottomWidth: i === rows.length - 1 ? 0 : 1, borderBottomColor: CC.line }}>
              <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: CC.mint, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16 }}>{r.i}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: '700' }}>{r.name}</Text>
                <View style={{ height: 4, backgroundColor: CC.mintDeep, borderRadius: 2, overflow: 'hidden', marginTop: 4 }}>
                  <View style={{ width: `${r.pct * 2.4}%` as any, height: '100%', backgroundColor: r.band }} />
                </View>
              </View>
              <View style={{ alignItems: 'flex-end', marginLeft: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: '700' }}>{r.amt}K</Text>
                <Text style={{ fontSize: 10, fontWeight: '600', marginTop: 2, color: CC.ink3 }}>{r.delta}</Text>
              </View>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: r.band, marginLeft: 10 }} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Category Detail ──────────────────────────────────────────────
export function CategoryDetailScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const txns = [
    { d:'May 25', m:'Highland Coffee Hai Bà Trưng', a:'65.000', e:'😊' },
    { d:'May 24', m:'Mixue Cầu Giấy',               a:'38.000', e:null },
    { d:'May 22', m:'Bún Chả Hương Liên',           a:'55.000', e:'😊' },
    { d:'May 21', m:'Grab Food · KFC',              a:'85.000', e:'😐' },
    { d:'May 20', m:'Phúc Long Times City',         a:'72.000', e:null },
    { d:'May 19', m:'Bánh Mì 25',                   a:'25.000', e:'😊' },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: CC.mint }}>
      <View style={{ paddingTop: insets.top, flexDirection: 'row', alignItems: 'center', padding: 16, gap: 10 }}>
        <CircleBtn onPress={() => navigation.goBack()}>‹</CircleBtn>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 11, color: CC.ink3, fontWeight: '600' }}>SPENDING ▸ MAY 2026</Text>
          <Text style={{ fontSize: 17, fontWeight: '800' }}>🍔 Food & Drink</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}>
        <Card padding={14} borderRadius={18} style={{ backgroundColor: CC.greenInk }}>
          <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>TOTAL THIS MONTH</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
            <Text style={{ fontSize: 26, fontWeight: '800', color: '#fff' }}>480.000</Text>
            <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>₫ · 18 txns</Text>
            <Text style={{ marginLeft: 'auto', fontSize: 12, color: CC.yellow, fontWeight: '600' }}>↑ 120K vs Apr</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-end', height: 30, marginTop: 10 }}>
            {[20,36,12,24,48,60,28,18,32,70,22,14,26].map((h,i) => (
              <View key={i} style={{ flex: 1, height: `${h}%` as any, backgroundColor: 'rgba(245,215,90,0.7)', borderRadius: 1 }} />
            ))}
          </View>
        </Card>
        <View style={{ marginTop: 12, backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden' }}>
          {txns.map((t, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', padding: 12, paddingHorizontal: 14, borderBottomWidth: i === txns.length - 1 ? 0 : 1, borderBottomColor: CC.line }}>
              <Text style={{ width: 44, fontSize: 11, color: CC.ink3, fontWeight: '600' }}>{t.d}</Text>
              <View style={{ flex: 1, marginLeft: 4 }}>
                <Text style={{ fontSize: 13, fontWeight: '600' }} numberOfLines={1}>{t.m}</Text>
                {t.e && <Text style={{ fontSize: 14, marginTop: 2 }}>{t.e}</Text>}
              </View>
              <Text style={{ fontSize: 13, fontWeight: '800' }}>−{t.a}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Savings Goals ────────────────────────────────────────────────
export function SavingsGoalsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: CC.mint }}>
      <View style={{ paddingTop: insets.top, flexDirection: 'row', alignItems: 'center', padding: 16, gap: 10 }}>
        <CircleBtn onPress={() => navigation.goBack()}>‹</CircleBtn>
        <Text style={{ flex: 1, fontSize: 17, fontWeight: '800' }}>Savings goals</Text>
        <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: CC.green, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 18 }}>＋</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}>
        {/* Primary goal */}
        <LinearGradient colors={[CC.green, CC.greenDeep]} style={{ borderRadius: 22, padding: 16, marginBottom: 10, ...shadow.hero }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ fontSize: 28 }}>🚲</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '800', color: '#fff' }}>Bicycle</Text>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Target · Jul 2026</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#fff' }}>64%</Text>
          </View>
          <View style={{ height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden', marginTop: 12 }}>
            <View style={{ width: '64%', height: '100%', backgroundColor: CC.yellow }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>1.280.000 / 2.000.000 ₫</Text>
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#fff' }}>720K left</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
            <Btn kind="yellow" size="sm" style={{ flex: 1 }}>+ Add money</Btn>
            <Btn kind="dark" size="sm" style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)' }}>Details</Btn>
          </View>
        </LinearGradient>
        {/* Secondary goals */}
        {[
          { icon:'🎧', name:'AirPods Gen 4', pct:28, cur:'700.000', tgt:'2.500.000', tone:CC.yellowDeep, rule:'Auto 20% of top-ups' },
          { icon:'📷', name:'Camera (used)', pct:12, cur:'600.000', tgt:'5.000.000', tone:CC.orange,    rule:'Manual' },
        ].map(g => (
          <Card key={g.name} padding={14} borderRadius={18} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: CC.mint, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>{g.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '700' }}>{g.name}</Text>
                <Text style={{ fontSize: 11, color: CC.ink3 }}>{g.rule}</Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: '800' }}>{g.pct}%</Text>
            </View>
            <View style={{ height: 6, backgroundColor: CC.mintDeep, borderRadius: 3, overflow: 'hidden', marginTop: 10 }}>
              <View style={{ width: `${g.pct}%` as any, height: '100%', backgroundColor: g.tone }} />
            </View>
            <Text style={{ fontSize: 11, color: CC.ink3, marginTop: 6 }}>{g.cur} / {g.tgt} ₫</Text>
          </Card>
        ))}
        <View style={{ padding: 18, borderRadius: 18, borderWidth: 1.5, borderStyle: 'dashed', borderColor: CC.mintEdge, alignItems: 'center' }}>
          <Text style={{ fontSize: 13, color: CC.ink3 }}>You can have <Text style={{ fontWeight: '700', color: CC.ink }}>3 active goals</Text> at once</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Top-up ───────────────────────────────────────────────────────
export function TopUpScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: CC.mint }}>
      <View style={{ paddingTop: insets.top, flexDirection: 'row', alignItems: 'center', padding: 16, gap: 10 }}>
        <CircleBtn onPress={() => navigation.goBack()}>‹</CircleBtn>
        <Text style={{ flex: 1, fontSize: 17, fontWeight: '800' }}>Top up</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}>
        <Text style={{ fontSize: 13, color: CC.ink2, lineHeight: 20 }}>Send this account number to a parent or guardian. Funds land in your <Text style={{ fontWeight: '700' }}>Spend</Text> bucket in a few minutes.</Text>
        <Card padding={20} borderRadius={24} style={{ marginTop: 14, alignItems: 'center' }}>
          <Text style={{ fontSize: 11, color: CC.ink3, fontWeight: '700', letterSpacing: 1 }}>YOUR ACCOUNT</Text>
          <Text style={{ fontSize: 13, color: CC.ink2, marginTop: 4 }}>VPBank · Cha-Ching Virtual</Text>
          <Text style={{ fontSize: 26, fontWeight: '800', letterSpacing: 2, color: CC.greenInk, marginTop: 10 }}>0801 2294 6651</Text>
          <Text style={{ fontSize: 12, color: CC.ink3, marginTop: 4 }}>KYLE NGUYEN · CHACHING</Text>
          {/* QR placeholder */}
          <View style={{ width: 140, height: 140, margin: 16, borderRadius: 14, borderWidth: 1, borderColor: CC.line, backgroundColor: '#f8f8f8', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 40 }}>▦</Text>
            <Text style={{ fontSize: 10, color: CC.ink3, marginTop: 4 }}>QR Code</Text>
          </View>
          <Text style={{ fontSize: 11, color: CC.ink3 }}>Scan with any Vietnamese bank app</Text>
        </Card>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
          <Btn kind="primary" size="md" style={{ flex: 1 }}>📋 Copy number</Btn>
          <Btn kind="light" size="md" style={{ flex: 1 }}>↗ Share on Zalo</Btn>
        </View>
        <View style={{ marginTop: 18, padding: 14, borderRadius: 14, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: 20 }}>💡</Text>
          <Text style={{ fontSize: 12, color: CC.ink2, lineHeight: 18, flex: 1 }}>Tết lì xì season? Ask parents to top up here — never share your PIN.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  balanceLabel: { fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: '500' },
  balanceAmount: { fontSize: 32, fontWeight: '800', color: '#fff', letterSpacing: -0.5, lineHeight: 38 },
});
