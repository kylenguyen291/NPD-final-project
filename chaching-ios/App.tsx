import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
  BeVietnamPro_800ExtraBold,
} from '@expo-google-fonts/be-vietnam-pro';
import * as SplashScreen from 'expo-splash-screen';

import { AppProvider } from '@/context';
import { CC } from '@/theme';

// ─── Onboarding screens ──────────────────────────────────────────────────────
import {
  OnbSplashScreen,
  OnbHandleScreen,
  OnbPINScreen,
  OnbGardenScreen,
} from '@/screens/OnboardingScreens';

// ─── Wallet screens ──────────────────────────────────────────────────────────
import {
  WalletHomeScreen,
  ScanQRScreen,
  PayConfirmScreen,
  CategorizeScreen,
  SpendingSummaryScreen,
  CategoryDetailScreen,
  SavingsGoalsScreen,
  TopUpScreen,
} from '@/screens/WalletScreens';

// ─── Discover screens ────────────────────────────────────────────────────────
import {
  DiscoverFeedScreen,
  QuizPauseScreen,
  DailyCapScreen,
} from '@/screens/DiscoverScreens';

// ─── Learn screens ───────────────────────────────────────────────────────────
import {
  LearnHomeScreen,
  PillarDetailScreen,
  LessonApplyScreen,
  AlexChatScreen,
  NeedVsWantScreen,
} from '@/screens/LearnScreens';

// ─── Profile screens ─────────────────────────────────────────────────────────
import {
  ProfileHomeScreen,
  CertificatesScreen,
} from '@/screens/ProfileScreens';

SplashScreen.preventAutoHideAsync();

// ─── Stack navigators ────────────────────────────────────────────────────────
const OnbStack = createNativeStackNavigator();
function OnboardingNavigator() {
  return (
    <OnbStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <OnbStack.Screen name="OnbSplash"  component={OnbSplashScreen} />
      <OnbStack.Screen name="OnbHandle"  component={OnbHandleScreen} />
      <OnbStack.Screen name="OnbPIN"     component={OnbPINScreen} />
      <OnbStack.Screen name="OnbGarden"  component={OnbGardenScreen} />
    </OnbStack.Navigator>
  );
}

const WalletStack = createNativeStackNavigator();
function WalletNavigator() {
  return (
    <WalletStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <WalletStack.Screen name="WalletHome"        component={WalletHomeScreen} />
      <WalletStack.Screen name="ScanQR"            component={ScanQRScreen} />
      <WalletStack.Screen name="PayConfirm"        component={PayConfirmScreen} />
      <WalletStack.Screen name="Categorize"        component={CategorizeScreen} />
      <WalletStack.Screen name="SpendingSummary"   component={SpendingSummaryScreen} />
      <WalletStack.Screen name="CategoryDetail"    component={CategoryDetailScreen} />
      <WalletStack.Screen name="SavingsGoals"      component={SavingsGoalsScreen} />
      <WalletStack.Screen name="TopUp"             component={TopUpScreen} />
    </WalletStack.Navigator>
  );
}

const DiscoverStack = createNativeStackNavigator();
function DiscoverNavigator() {
  return (
    <DiscoverStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <DiscoverStack.Screen name="DiscoverFeed" component={DiscoverFeedScreen} />
      <DiscoverStack.Screen name="QuizPause"    component={QuizPauseScreen} />
      <DiscoverStack.Screen name="DailyCap"     component={DailyCapScreen} />
    </DiscoverStack.Navigator>
  );
}

const LearnStack = createNativeStackNavigator();
function LearnNavigator() {
  return (
    <LearnStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <LearnStack.Screen name="LearnHome"    component={LearnHomeScreen} />
      <LearnStack.Screen name="PillarDetail" component={PillarDetailScreen} />
      <LearnStack.Screen name="LessonApply"  component={LessonApplyScreen} />
      <LearnStack.Screen
        name="AlexChat"
        component={AlexChatScreen}
        options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }}
      />
      <LearnStack.Screen name="NeedVsWant"   component={NeedVsWantScreen} />
    </LearnStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <ProfileStack.Screen name="ProfileHome"   component={ProfileHomeScreen} />
      <ProfileStack.Screen name="Certificates"  component={CertificatesScreen} />
    </ProfileStack.Navigator>
  );
}

// ─── Bottom Tab Navigator ────────────────────────────────────────────────────
const Tab = createBottomTabNavigator();

function TabIcon({ label, icon, focused }: { label: string; icon: string; focused: boolean }) {
  return (
    <View style={tabStyles.icon}>
      <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{icon}</Text>
      <Text style={[tabStyles.label, { color: focused ? CC.green : CC.ink3 }]}>
        {label}
      </Text>
    </View>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabStyles.bar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Wallet"
        component={WalletNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Wallet" icon="👛" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Discover" icon="📺" focused={focused} />,
          tabBarStyle: { display: 'none' }, // hide tab bar on discover (fullscreen)
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Learn" icon="🌱" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Profile" icon="🧑‍🎓" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

// ─── Root Navigator ───────────────────────────────────────────────────────────
const RootStack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_700Bold,
    BeVietnamPro_800ExtraBold,
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <AppProvider>
          <StatusBar barStyle="dark-content" />
          <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
              {/* Onboarding flow — shown once, then jumps to Main */}
              <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
              {/* Main app with bottom tabs */}
              <RootStack.Screen name="Main" component={MainTabNavigator} />
            </RootStack.Navigator>
          </NavigationContainer>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const tabStyles = StyleSheet.create({
  bar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(27,34,24,0.08)',
    height: 82,
    paddingBottom: 4,
    paddingTop: 8,
  },
  icon: { alignItems: 'center', gap: 3 },
  label: { fontSize: 10, fontWeight: '600' },
});
