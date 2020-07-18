import { merge } from '@/libs'
import { colors_light, colors_dark } from './abstracts/_colors'
import { space } from './abstracts/_space'
import { fontSizes } from './abstracts/_font_sizes'
import { breakpoints, mq } from './abstracts/_breakpoints'
import { ArticleList_light } from './abstracts/components/_article_list'
import { utils } from './abstracts/_utils'

export const lightTheme = {
  colors: colors_light,
  space,
  fontSizes,
  sizes: {
    maxWidth: {
      Container: 1000
    }
  },
  breakpoints,
  mq,
  ArticleList: ArticleList_light,
  utils
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
