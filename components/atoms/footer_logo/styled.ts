import styled from 'styled-components'
import Styles from '@/styles'

export const Img = styled.img`
  opacity: ${Styles.funcs.fibo('md', 'alpha')};
  transition: opacity 0.3s;
  &:hover {
    opacity: ${Styles.funcs.fibo('lg', 'alpha')};
  }
`
