import { fibo } from './funcs'
import merge from 'lodash/merge'

const baseAlphas = {
  xs2: fibo('xs2', 'alpha'),
  xs: fibo('xs', 'alpha'),
  sm: fibo('sm', 'alpha'),
  md: fibo('md', 'alpha'),
  lg: fibo('lg', 'alpha')
}

const rgba = (rgb: string, alpha: string) => `rgba(${rgb}, ${alpha})`

const keyRGB = '24, 63, 83'
const baseColors = {
  key: {
    1: rgba(keyRGB, baseAlphas.xs2),
    2: rgba(keyRGB, baseAlphas.xs),
    3: rgba(keyRGB, baseAlphas.sm),
    4: rgba(keyRGB, baseAlphas.md),
    5: rgba(keyRGB, baseAlphas.lg)
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

export interface Colors {
  text: {
    body: string
  }
  bg: {
    body: string
    content: string
  }
  link: {
    normal: string
    visited: string
    focus: string
    hover: string
    active: string
  }
  state: {
    primary: string
    secondary: string
    success: string
    info: string
    warning: string
    danger: string
  }
}

export const colors: Colors = {
  text: {
    body: '#21272d'
  },
  bg: {
    body: baseColors.key[1],
    content: baseColors.white
  },
  link: {
    normal: baseColors.key[4],
    visited: baseColors.key[5],
    focus: baseColors.key[3],
    hover: baseColors.key[3],
    active: baseColors.key[2]
  },
  state: {
    primary: baseColors.blue,
    secondary: baseColors.gray[600],
    success: baseColors.green,
    info: baseColors.cyan,
    warning: baseColors.orange,
    danger: baseColors.red
  }
} as const

export const colorsDark: Colors = {
  ...merge<any, Colors, any>({}, colors, {
    text: {
      body: baseColors.white
    },
    bg: {
      body: baseColors.key[1],
      content: baseColors.black
    }
  } as const)
} as const
