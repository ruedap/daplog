
const pxToRem = (baseFontSize: number = 16) =>
  (pxSize: number) => `${pxSize / baseFontSize}rem`

export interface TUnits {
  (): number
  px: () => string
  rem: () => string
}

const units = (value: number): TUnits => {
  const result = () => value
  result.px = () => `${value}px`
  result.rem = () => pxToRem()(value)
  return result
}

export const utils = {
  units,
  pxToRem: pxToRem()
} as const
