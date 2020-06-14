import styled from 'styled-components'
import Styles from '@/styles'

export const Svg = styled.svg`
  display: block;
  left: 0;
  position: absolute;
  top: 0;
`

export const Circle = styled.circle`
  fill: ${({ theme }) => theme.colors.key[3]};
`

export const Text = styled.text`
  ${Styles.mixins.fontSmoothing()};
  fill: #fff;
  font-family: var(--b-fontFamily-fjalla);
  font-size: ${Styles.funcs.fibo('xs', 'rem')};
  letter-spacing: 0.1em;
`
