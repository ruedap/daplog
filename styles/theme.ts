import { merge } from '@/libs'
import { colors_light, colors_dark } from './abstracts/_colors'
import { ArticleList_light } from './abstracts/components/_article_list'

export const lightTheme = {
  colors: colors_light,
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
  },
  ArticleList: ArticleList_light
} as const

export type TTheme = typeof lightTheme

export const darkTheme: TTheme = {
  ...merge<any, TTheme, any>({}, lightTheme, {
    colors: colors_dark
  } as const)
} as const

declare module 'styled-components' {
  interface DefaultTheme extends TTheme {}
}
