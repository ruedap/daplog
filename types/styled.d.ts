import 'styled-components'
import { fiboMap } from '@/styles/abstractions/funcs'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
    }
  }
}

export type TFiboSizeName = 'xl6'|'xl5'|'xl4'|'xl3'|'xl2'|'xl'|'lg'|'md'|'sm'|'xs'|'xs2'|'xs3'|'xs4'|'xs5'|'xs6'
export type TFiboUnit = 'px'|'rem'|'alpha'
