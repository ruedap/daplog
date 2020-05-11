import { keyframes, css } from '@emotion/react'
import { Keyframes } from '@emotion/serialize/types'
import styled from '@emotion/styled'

const cssBase = css`
  background-color: white;
  color: cornflowerblue;
  border: 1px solid lightgreen;
  border-right: none;
  border-bottom: none;
  box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
  transition: all 0.1s linear;
  margin: 0 3rem 3rem;
  padding: 1rem 0.5rem;
`

const cssHover = css`
  &:hover {
    color: white;
    background-color: lightgray;
    border-color: aqua;
    box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
  }
`

export const cssBounce = keyframes`
  from { transform: scale(1.01); }
  to { transform: scale(0.99); }
`

export const cssShake = keyframes`
  10%, 90% { transform: translateY(-1px); }
  20%, 80% { transform: translateY(2px); }
  30%, 50%, 70% { transform: translateY(-4px); }
  40%, 60% { transform: translateY(4px); }
`

const Tag1 = styled.div`
  ${cssBase};
`

const Tag2 = styled.div`
  ${cssBase};
  ${cssHover};
  & code {
    background-color: linen;
  }
`

const Tag3 = styled.div`
  ${cssBase};
  ${cssHover};
  & code {
    background-color: linen;
  }
  animation: ${(props : { animation: Keyframes }) => props.animation} 0.2s infinite ease-in-out alternate;
`

const Styled = {
  Tag1,
  Tag2,
  Tag3,
} as const

export default Styled
