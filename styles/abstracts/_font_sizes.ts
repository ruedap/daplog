import { utils, TUnits } from './_utils'
import Styles from '@/styles'

type TFontSizes = Readonly<{
  xs: TUnits
  sm: TUnits
  md: TUnits
  lg: TUnits
  xl: TUnits
}>

export const fontSizes: TFontSizes = {
  xs: utils.units(parseInt(Styles.funcs.fibo('xs'))),
  sm: utils.units(parseInt(Styles.funcs.fibo('sm'))),
  md: utils.units(parseInt(Styles.funcs.fibo('md'))),
  lg: utils.units(parseInt(Styles.funcs.fibo('lg'))),
  xl: utils.units(parseInt(Styles.funcs.fibo('xl')))
} as const
