import { css, FlattenSimpleInterpolation } from 'styled-components'

type TBreakpoints = Readonly<{
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
}>

const breakpoints: TBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const

type TBreakpointObject = Readonly<Record<
  keyof TBreakpoints,
  (cssprop: FlattenSimpleInterpolation) => FlattenSimpleInterpolation
>>

export const up: TBreakpointObject = Object.keys(breakpoints).reduce(
  (acc, cur) => {
    acc[cur] = (cssprop: FlattenSimpleInterpolation) => css`
    @media (min-width: ${breakpoints[cur]}px) {
      ${cssprop}
    }
  `
    return acc
  }, <any>{}
)
