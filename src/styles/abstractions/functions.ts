import { TSizeName, TUnit } from '@src/types'

// Fibonacci: 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181
const fibonacciMap = {
  '6xl': 1597,
  '5xl': 987,
  '4xl': 610,
  '3xl': 377,
  '2xl': 233,
  'xl': 144,
  'lg': 89,
  'md': 55,
  'sm': 34,
  'xs': 21,
  '2xs': 13,
  '3xs': 8,
  '4xs': 5,
  '5xs': 3,
  '6xs': 2,
} as const

export const fibo = (sizeName: TSizeName, unit?: TUnit): string => {
  const size = fibonacciMap[sizeName]

  switch (unit) {
    case 'px':
      return `${size}${unit}`
    case 'rem':
      return `${size / 10}${unit}`
    case 'alpha':
      return `${size / 100}`
    default:
      return `${size}`
  }
}
