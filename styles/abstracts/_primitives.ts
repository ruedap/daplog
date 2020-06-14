import { fibo } from './funcs'

const alphas = {
  xs2: fibo('xs2', 'alpha'),
  xs: fibo('xs', 'alpha'),
  sm: fibo('sm', 'alpha'),
  md: fibo('md', 'alpha'),
  lg: fibo('lg', 'alpha')
} as const

const rgba = (rgb: string, alpha: string) => `rgba(${rgb}, ${alpha})`

const baseRGB = '24, 63, 83'
const colors = {
  key: {
    1: rgba(baseRGB, alphas.xs2),
    2: rgba(baseRGB, alphas.xs),
    3: rgba(baseRGB, alphas.sm),
    4: rgba(baseRGB, alphas.md),
    5: rgba(baseRGB, alphas.lg)
  },
  white: '#fff',
  gray: {
    100: '#f8f9fa',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#868e96',
    700: '#495057',
    800: '#343a40',
    900: '#212529'
  },
  black: '#000',
  blue: '#007bff',
  indigo: '#6610f2',
  purple: '#6f42c1',
  pink: '#e83e8c',
  red: '#dc3545',
  orange: '#fd7e14', // TODO: darken
  yellow: '#ffc107',
  green: '#28a745',
  teal: '#20c997',
  cyan: '#17a2b8'
} as const

export const primitives = {
  alphas,
  baseRGB,
  colors
} as const
