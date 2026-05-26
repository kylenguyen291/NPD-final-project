export const CC = {
  green:     '#3F8E5C',
  greenDeep: '#2F6E47',
  greenInk:  '#1F4A2E',
  mint:      '#E8F4EA',
  mintDeep:  '#C7E5C9',
  mintEdge:  '#A8D4AC',
  yellow:    '#F5D75A',
  yellowDeep:'#E5B924',
  coral:     '#E76F62',
  orange:    '#F0A04B',
  paper:     '#FBFAF6',
  ink:       '#1B2218',
  ink2:      '#4A5A4D',
  ink3:      '#7E8E84',
  line:      'rgba(27,34,24,0.08)',
  lineHard:  'rgba(27,34,24,0.14)',
  white:     '#FFFFFF',
  band: {
    red:    '#E76F62',
    orange: '#F0A04B',
    yellow: '#F5D75A',
    green:  '#7BBE82',
    gray:   '#C6CCC8',
  },
}

export const CCFont = `-apple-system, "SF Pro Display", "Helvetica Neue", system-ui, sans-serif`

export const vnd  = (n) => new Intl.NumberFormat('vi-VN').format(n)
export const vndK = (n) => n >= 1_000_000
  ? (n / 1_000_000).toFixed(1).replace('.0','') + 'M'
  : Math.round(n / 1_000) + 'K'
