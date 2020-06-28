import { PORTFOLIO_SITE_NAME } from '@/utils/constants'
import styled from 'styled-components'
import Styles from '@/styles'

// TODO: inline svg
const Component = ({ className }: { className?: string}) =>
  <img src="/images/common/footer-logo.svg" alt={ PORTFOLIO_SITE_NAME } className={ className } />

export const StyledComponent = styled(Component)`
  opacity: ${Styles.funcs.fibo('md', 'alpha')};
  transition: opacity 0.3s;
  &:hover {
    opacity: ${Styles.funcs.fibo('lg', 'alpha')};
  }
`

export const FooterLogo = StyledComponent
