import styled from '@emotion/styled'
import { fibo } from '@src/styles/abstractions/functions'
import { fontSmoothing } from '@src/styles/abstractions/mixins'

const Svg = styled.svg`
  display: block;
  left: 0;
  position: absolute;
  top: 0;
`

const Circle = styled.circle`
  fill: rgba(var(--b-rgb-base), ${fibo('sm', 'alpha')});
`

const Text = styled.text`
  ${fontSmoothing()};
  fill: #fff;
  font-family: var(--b-fontFamily-fjalla);
  font-size: ${fibo('xs', 'rem')};
  letter-spacing: 0.1em;
`

const Styled = {
  Svg,
  Circle,
  Text,
} as const

export default Styled
