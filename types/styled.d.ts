import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
    }
  }
}

export type TSizeName = 'xl6'|'xl5'|'xl4'|'xl3'|'xl2'|'xl'|'lg'|'md'|'sm'|'xs'|'xs2'|'xs3'|'xs4'|'xs5'|'xs6'
export type TUnit = 'px'|'rem'|'alpha'
