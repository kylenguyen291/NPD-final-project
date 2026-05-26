import { StyleSheet } from 'react-native';

export const CC = {
  green:      '#3F8E5C',
  greenDeep:  '#2F6E47',
  greenInk:   '#1F4A2E',
  mint:       '#E8F4EA',
  mintDeep:   '#C7E5C9',
  mintEdge:   '#A8D4AC',
  yellow:     '#F5D75A',
  yellowDeep: '#E5B924',
  coral:      '#E76F62',
  orange:     '#F0A04B',
  paper:      '#FBFAF6',
  ink:        '#1B2218',
  ink2:       '#4A5A4D',
  ink3:       '#7E8E84',
  line:       'rgba(27,34,24,0.08)',
  lineHard:   'rgba(27,34,24,0.14)',
  white:      '#FFFFFF',
  band: {
    red:    '#E76F62',
    orange: '#F0A04B',
    yellow: '#F5D75A',
    green:  '#7BBE82',
    gray:   '#C6CCC8',
  },
} as const;

export const spacing = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24,
} as const;

export const radius = {
  sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, pill: 999,
} as const;

export const shadow = {
  card: {
    shadowColor: '#1B2218',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  hero: {
    shadowColor: '#3F8E5C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  sheet: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 20,
  },
} as const;

// VND formatter
export const vnd = (n: number) => new Intl.NumberFormat('vi-VN').format(n);
export const vndK = (n: number) =>
  n >= 1_000_000
    ? (n / 1_000_000).toFixed(1).replace('.0', '') + 'M'
    : Math.round(n / 1_000) + 'K';
