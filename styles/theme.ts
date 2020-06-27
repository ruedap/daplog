import { merge } from '@/libs'
import { colors_light, colors_dark } from './abstracts/_colors'
import { fontSizes } from './abstracts/_font_sizes'
import { mq } from './abstracts/_breakpoints'
import { ArticleList_light } from './abstracts/components/_article_list'

export const lightTheme = {
  colors: colors_light,
  fontSizes,
  sizes: {
    maxWidth: {
      Container: 1000
    }
  },
  mq,
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
