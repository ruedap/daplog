
const pxToRem = (baseFontSize: number = 16) =>
  (pxSize: number) => `${pxSize / baseFontSize}rem`

export interface TUnitize {
  (): number
  px: () => string
  rem: () => string
}

const unitize = (value: number): TUnitize => {
  const result = () => value
  result.px = () => `${value}px`
  result.rem = () => pxToRem()(value)
  return result
}

export const utils = {
  unitize,
  pxToRem: pxToRem()
} as const
