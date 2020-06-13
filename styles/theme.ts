import { colors, Colors } from './abstracts/colors'

export interface Theme {
  colors: Colors
  sizes: {
    font: {
      XS: number
      SM: number
      MD: number
      LG: number
      XL: number
    }
    width: {
      CONTENT: number
    }
  }
}

export const lightTheme: Theme = {
  colors: colors,
  sizes: {
    font: {
      XS: 12,
      SM: 14,
      MD: 16,
      LG: 18,
      XL: 20
    },
    width: {
      CONTENT: 1000
    }
  }
} as const

export const darkTheme: Theme = {
  ...lightTheme
} as const

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
