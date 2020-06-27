import { utils, TUnitize } from './_utils'
import Styles from '@/styles'

type TFontSizes = Readonly<{
  xs: TUnitize
  sm: TUnitize
  md: TUnitize
  lg: TUnitize
  xl: TUnitize
}>

export const fontSizes: TFontSizes = {
  xs: utils.unitize(parseInt(Styles.funcs.fibo('xs'))),
  sm: utils.unitize(parseInt(Styles.funcs.fibo('sm'))),
  md: utils.unitize(parseInt(Styles.funcs.fibo('md'))),
  lg: utils.unitize(parseInt(Styles.funcs.fibo('lg'))),
  xl: utils.unitize(parseInt(Styles.funcs.fibo('xl')))
} as const
