import React, { createContext, useContext, useReducer, useCallback } from 'react'

// ─── Initial state ──────────────────────────────────────────────
const initial = {
  // Navigation
  stack: ['OnbSplash'],
  params: {},

  // User
  user: { name: 'Kyle', handle: 'kyle.long', avatar: '🧑‍🎓', age: 14, xp: 1240, streak: 12 },

  // Wallet
  wallet: {
    spend: 320000, save: 1200000, give: 50000,
    transactions: [
      { id:1, date:'May 25', merchant:'Highland Coffee Hai Bà Trưng', amount:65000, cat:'🍔', catName:'Food & Drink', emotion:'😊' },
      { id:2, date:'May 24', merchant:'Mixue Cầu Giấy',               amount:38000, cat:'🍔', catName:'Food & Drink', emotion:null  },
      { id:3, date:'May 22', merchant:'Bún Chả Hương Liên',           amount:55000, cat:'🍔', catName:'Food & Drink', emotion:'😊' },
      { id:4, date:'May 21', merchant:'Grab Food · KFC',              amount:85000, cat:'🍔', catName:'Food & Drink', emotion:'😐' },
      { id:5, date:'May 20', merchant:'Phúc Long Times City',         amount:72000, cat:'🍔', catName:'Food & Drink', emotion:null  },
      { id:6, date:'May 19', merchant:'Bánh Mì 25',                   amount:25000, cat:'🍔', catName:'Food & Drink', emotion:'😊' },
      { id:7, date:'May 23', merchant:'Shopee order #1829',           amount:180000,cat:'🛍️', catName:'Shopping',     emotion:'😊' },
      { id:8, date:'May 18', merchant:'Grab – Cầu Giấy',             amount:45000, cat:'🚗', catName:'Transport',    emotion:null  },
      { id:9, date:'May 17', merchant:'Book · Atomic Habits',        amount:80000, cat:'📚', catName:'Education',    emotion:'😊' },
    ],
    goals: [
      { id:1, name:'Bicycle 🚲',   target:2000000, current:1280000, date:'Jul 2026', rule:'Manual' },
      { id:2, name:'AirPods 🎧',   target:2500000, current:700000,  date:null,       rule:'Auto 20% of top-ups' },
      { id:3, name:'Camera 📷',    target:5000000, current:600000,  date:null,       rule:'Manual' },
    ],
  },

  // Learn
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

  // Discover
  discover: { watchedToday: 11, earnedToday: 3000 },

  // Pending payment (set by PayConfirm → Categorize)
  pendingPayment: null,

  // Active pillar (for PillarDetail)
  activePillar: 'save',
}

// ─── Reducer ────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE': {
      const stack = [...state.stack, action.screen]
      return { ...state, stack, params: { ...state.params, [action.screen]: action.params || {} } }
    }
    case 'NAVIGATE_TAB': {
      // Tab nav resets to the tab root
      return { ...state, stack: [action.screen], params: { [action.screen]: action.params || {} } }
    }
    case 'GO_BACK': {
      const stack = state.stack.length > 1 ? state.stack.slice(0, -1) : state.stack
      return { ...state, stack }
    }
    case 'REPLACE': {
      const stack = [...state.stack.slice(0, -1), action.screen]
      return { ...state, stack }
    }
    case 'SET_PARAM': {
      return { ...state, params: { ...state.params, [action.screen]: { ...(state.params[action.screen] || {}), ...action.params } } }
    }
    case 'COMPLETE_PAYMENT': {
      const { amount } = action
      return { ...state,
        wallet: { ...state.wallet, spend: Math.max(0, state.wallet.spend - amount) },
        pendingPayment: { amount, merchant: action.merchant, time: new Date().toLocaleTimeString('vi-VN', {hour:'2-digit',minute:'2-digit'}) }
      }
    }
    case 'CATEGORIZE_PAYMENT': {
      if (!state.pendingPayment) return state
      const txn = {
        id: Date.now(), date: 'May 26',
        merchant: state.pendingPayment.merchant,
        amount: state.pendingPayment.amount,
        cat: action.icon, catName: action.name, emotion: null
      }
      return { ...state, pendingPayment: null,
        wallet: { ...state.wallet, transactions: [txn, ...state.wallet.transactions] }
      }
    }
    case 'SET_ACTIVE_PILLAR':
      return { ...state, activePillar: action.pillar }
    default:
      return state
  }
}

// ─── Context ────────────────────────────────────────────────────
const AppCtx = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial)

  const navigate = useCallback((screen, params) => dispatch({ type:'NAVIGATE', screen, params }), [])
  const navigateTab = useCallback((screen, params) => dispatch({ type:'NAVIGATE_TAB', screen, params }), [])
  const goBack = useCallback(() => dispatch({ type:'GO_BACK' }), [])
  const replace = useCallback((screen) => dispatch({ type:'REPLACE', screen }), [])

  const currentScreen = state.stack[state.stack.length - 1]
  const currentParams = state.params[currentScreen] || {}

  return (
    <AppCtx.Provider value={{ state, dispatch, navigate, navigateTab, goBack, replace, currentScreen, currentParams }}>
      {children}
    </AppCtx.Provider>
  )
}

export function useApp() {
  return useContext(AppCtx)
}
