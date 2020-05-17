import { PORTFOLIO_SITE_NAME } from '@/utils/constants'

// TODO: inline svg
const FooterLogo = () => <Img src="/images/common/footer-logo.svg" alt={PORTFOLIO_SITE_NAME} />

export default FooterLogo

import styled from 'styled-components'
import Styles from '@/styles'

const Img = styled.img`
  opacity: ${Styles.funcs.fibo('md', 'alpha')};
  transition: opacity 0.3s;
  &:hover {
    opacity: ${Styles.funcs.fibo('lg', 'alpha')};
  }
`
