const pxToRem = (pxSize: number) => (baseFontSize: number = 16) => {
  return `${pxSize / baseFontSize}rem`
}

interface TUnits {
  (): number
  px: () => string
  rem: () => string
}

export const units = (value: number): TUnits => {
  const result = () => value
  result.px = () => `${value}px`
  result.rem = () => pxToRem(value)()
  return result
}
