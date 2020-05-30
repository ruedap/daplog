import FooterLogo from '@/components/atoms/footer_logo'
import { PORTFOLIO_SITE_NAME } from '@/utils/constants'
import * as Styled from './styled'

const Footer = () => {
  return (
    <Styled.Root>
      <Styled.Container>
        <Styled.Heading>
          <Styled.LogoSpacer>{ PORTFOLIO_SITE_NAME }</Styled.LogoSpacer>
          <Styled.LogoLink href="https://ruedap.com">
            <FooterLogo />
          </Styled.LogoLink>
        </Styled.Heading>
      </Styled.Container>
    </Styled.Root>
  )
}

export default Footer
