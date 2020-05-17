import { css, FlattenSimpleInterpolation } from 'styled-components'
import { TSizeName } from '@/types/styled'
import { fibo } from '@/styles/abstractions/funcs'

export const container = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: var(--b-maxWidth-container);
`

export const fontSmoothing = (enable: boolean = true) => {
  if (enable) {
    return css`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`
  } else {
    return css`
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
`
  }
}

export const dapicons = css`
  ${fontSmoothing(false)}
  font-family: "dapicons";
  font-feature-settings: "liga", "dlig";
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  line-height: 1;
  speak: none;
  text-rendering: optimizeLegibility;
  text-transform: none;
`

export const linkColors = (
  link?: string,
  visited?: string,
  focus?: string,
  hover?: string,
  active?: string,
) => {
  let result = ''
  if (link)    { result += `color: ${link};` }
  if (visited) { result += `&:visited { color: ${visited}; }` }
  if (focus)   { result += `&:focus { color: ${focus}; }` }
  if (hover)   { result += `&:hover { color: ${hover}; }` }
  if (active)  { result += `&:active { color: ${active}; }` }
  return css`${result}`
}

export const ellipsis = (lines: number) => css`
  @supports (-webkit-line-clamp: ${lines}) {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: ${lines};
    -webkit-box-orient: vertical;
  }
  @supports not (-webkit-line-clamp: ${lines}) {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

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

const up: TBreakpointObject = Object.keys(breakpoints).reduce((acc, cur) => {
  acc[cur] = (cssprop: FlattenSimpleInterpolation) => css`
  @media (min-width: ${breakpoints[cur]}px) {
    ${cssprop}
  }
`
  return acc
}, <any>{})

export const mq = {
  up
} as const

export const articleSectionMark = (
  sizeName: TSizeName,
  cssprop?: FlattenSimpleInterpolation
) => {
  const marginLeft = `${Number(fibo(sizeName)) / 3}px`;
  return css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  &::before,
  &::after {
    background-color: rgba(var(--b-rgb-base), ${fibo('xs', 'alpha')});
    border-radius: 100%;
    content: '';
    display: block;
    height: ${fibo(sizeName, 'px')};
    left: 50%;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    transform: translate(-50%, 0);
    transform-origin: center center;
    width: ${fibo(sizeName, 'px')};
  }
  &::before {
    margin-left: ${marginLeft};
  }
  &::after {
    margin-left: -${marginLeft};
  }
  ${cssprop}
`
}
