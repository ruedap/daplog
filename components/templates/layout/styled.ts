import styled from 'styled-components'
import Styles from '@/styles'

export const Container = styled.div`
  ${Styles.mixins.container}
  background-color: ${({ theme }) => theme.colors.bg.content};
`
