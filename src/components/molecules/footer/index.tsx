import FooterLogo from '@src/components/atoms/footer_logo'
import Styled from './styled'
import { PORTFOLIO_SITE_NAME } from '@src/utils/constants'

const Footer = () => {
  return (
    <Styled.Root>
      <Styled.Container>
        <Styled.Heading>
          <Styled.LogoSpacer>{PORTFOLIO_SITE_NAME}</Styled.LogoSpacer>
          <Styled.LogoLink href="https://ruedap.com" target="_blank">
            <FooterLogo />
          </Styled.LogoLink>
        </Styled.Heading>
      </Styled.Container>
    </Styled.Root>
  )
}

export default Footer
