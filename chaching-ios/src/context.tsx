import React, { createContext, useContext, useReducer, useCallback } from 'react';

export interface Transaction {
  id: number; date: string; merchant: string;
  amount: number; cat: string; catName: string; emotion: string | null;
}
export interface Goal {
  id: number; name: string; target: number; current: number;
  date: string | null; rule: string;
}
export interface PillarState { cur: number; tot: number; tone: string; }

export interface AppState {
  user: { name: string; handle: string; avatar: string; age: number; xp: number; streak: number };
  wallet: { spend: number; save: number; give: number; transactions: Transaction[]; goals: Goal[] };
  learn: { pillars: { earn: PillarState; save: PillarState; spend: PillarState; invest: PillarState; give: PillarState; protect: PillarState } };
  discover: { watchedToday: number; earnedToday: number };
  pendingPayment: { amount: number; merchant: string } | null;
}

const initial: AppState = {
  user: { name: 'Kyle', handle: 'kyle.long', avatar: '🧑‍🎓', age: 14, xp: 1240, streak: 12 },
  wallet: {
    spend: 320000, save: 1200000, give: 50000,
    transactions: [
      { id:1, date:'25/5', merchant:'Highland Coffee Hai Bà Trưng', amount:65000, cat:'🍔', catName:'Food & Drink', emotion:'😊' },
      { id:2, date:'24/5', merchant:'Mixue Cầu Giấy',              amount:38000, cat:'🍔', catName:'Food & Drink', emotion:null },
      { id:3, date:'23/5', merchant:'Shopee order #1829',           amount:180000, cat:'🛍️', catName:'Shopping',   emotion:'😊' },
      { id:4, date:'22/5', merchant:'Bún Chả Hương Liên',          amount:55000, cat:'🍔', catName:'Food & Drink', emotion:'😊' },
      { id:5, date:'21/5', merchant:'Grab Food · KFC',             amount:85000, cat:'🍔', catName:'Food & Drink', emotion:'😐' },
      { id:6, date:'20/5', merchant:'Phúc Long Times City',        amount:72000, cat:'🍔', catName:'Food & Drink', emotion:null },
      { id:7, date:'18/5', merchant:'Grab – Cầu Giấy',            amount:45000, cat:'🚗', catName:'Transport',    emotion:null },
      { id:8, date:'17/5', merchant:'Book · Atomic Habits',       amount:80000, cat:'📚', catName:'Education',   emotion:'😊' },
    ],
    goals: [
      { id:1, name:'Bicycle 🚲',  target:2000000, current:1280000, date:'Jul 2026', rule:'Manual' },
      { id:2, name:'AirPods 🎧',  target:2500000, current:700000,  date:null,       rule:'Auto 20% of top-ups' },
      { id:3, name:'Camera 📷',   target:5000000, current:600000,  date:null,       rule:'Manual' },
    ],
  },
  learn: {
    pillars: {
      earn:    { cur:3,  tot:10, tone:'#F0A04B' },
      save:    { cur:7,  tot:10, tone:'#3F8E5C' },
      spend:   { cur:5,  tot:10, tone:'#E76F62' },
      invest:  { cur:0,  tot:8,  tone:'#2F6E47' },
      give:    { cur:2,  tot:6,  tone:'#9B7AC4' },
      protect: { cur:4,  tot:16, tone:'#E5B924' },
    },
  },
  discover: { watchedToday: 11, earnedToday: 3000 },
  pendingPayment: null,
};

type Action =
  | { type: 'COMPLETE_PAYMENT'; amount: number; merchant: string }
  | { type: 'CATEGORIZE_PAYMENT'; icon: string; name: string }
  | { type: 'ADD_XP'; amount: number };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'COMPLETE_PAYMENT':
      return {
        ...state,
        wallet: { ...state.wallet, spend: Math.max(0, state.wallet.spend - action.amount) },
        pendingPayment: { amount: action.amount, merchant: action.merchant },
      };
    case 'CATEGORIZE_PAYMENT': {
      if (!state.pendingPayment) return state;
      const txn: Transaction = {
        id: Date.now(), date: '26/5',
        merchant: state.pendingPayment.merchant,
        amount: state.pendingPayment.amount,
        cat: action.icon, catName: action.name, emotion: null,
      };
      return { ...state, pendingPayment: null, wallet: { ...state.wallet, transactions: [txn, ...state.wallet.transactions] } };
    }
    case 'ADD_XP':
      return { ...state, user: { ...state.user, xp: state.user.xp + action.amount } };
    default:
      return state;
  }
}

interface AppCtxType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppCtx = createContext<AppCtxType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  return <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
