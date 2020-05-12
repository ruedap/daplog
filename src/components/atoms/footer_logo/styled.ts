import styled from '@emotion/styled'
import { fibo } from '@src/styles/abstractions/functions'

const Img = styled.img`
  opacity: ${fibo('md', 'alpha')};
  transition: opacity 0.3s;

  &:hover {
    opacity: ${fibo('lg', 'alpha')};
  }
`

const Styled = {
  Img
} as const

export default Styled
