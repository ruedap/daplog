export interface AppTheme {
  colors: {
    primary: string
  }
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

export const lightTheme: AppTheme = {
  colors: {
    primary: 'skyblue'
  },
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

export const darkTheme: AppTheme = {
  ...lightTheme,
  colors: {
    primary: 'pink'
  }
} as const

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
