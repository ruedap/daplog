import { TFiboSizeName, TFiboUnit } from '@/types/styled'

// Fibonacci: 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181
const fiboMap = {
  xl6: 1597,
  xl5: 987,
  xl4: 610,
  xl3: 377,
  xl2: 233,
  xl: 144,
  lg: 89,
  md: 55,
  sm: 34,
  xs: 21,
  xs2: 13,
  xs3: 8,
  xs4: 5,
  xs5: 3,
  xs6: 2
} as const

export const fibo = (sizeName: TFiboSizeName, unit?: TFiboUnit): string => {
  const size = fiboMap[sizeName]

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
