import { utils, TUnitize } from './_utils'
import Styles from '@/styles'

export type TSpace = Readonly<{
  xs: TUnitize
  sm: TUnitize
  md: TUnitize
  lg: TUnitize
  xl: TUnitize
}>

export const space: TSpace = {
  xs: utils.unitize(parseInt(Styles.funcs.fibo('xs'))),
  sm: utils.unitize(parseInt(Styles.funcs.fibo('sm'))),
  md: utils.unitize(parseInt(Styles.funcs.fibo('md'))),
  lg: utils.unitize(parseInt(Styles.funcs.fibo('lg'))),
  xl: utils.unitize(parseInt(Styles.funcs.fibo('xl')))
}
