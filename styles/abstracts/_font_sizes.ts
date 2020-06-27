import { units, TUnits } from './_utils'
import Styles from '@/styles'

type TFontSizes = Readonly<{
  xs: TUnits
  sm: TUnits
  md: TUnits
  lg: TUnits
  xl: TUnits
}>

export const fontSizes: TFontSizes = {
  xs: units(parseInt(Styles.funcs.fibo('xs'))),
  sm: units(parseInt(Styles.funcs.fibo('sm'))),
  md: units(parseInt(Styles.funcs.fibo('md'))),
  lg: units(parseInt(Styles.funcs.fibo('lg'))),
  xl: units(parseInt(Styles.funcs.fibo('xl')))
} as const
