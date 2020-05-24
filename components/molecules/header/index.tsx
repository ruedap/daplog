import Link from 'next/link'
import HeaderLogo from '@/components/atoms/header_logo'
import * as Styled from './styled'

const Header = () => {
  return (
    <header>
      <Styled.Inner>
        <Styled.Heading>
          <Link href="/" passHref>
            <Styled.LogoLink>
              <Styled.LogoSpacer />
              <Styled.LogoOuter>
                <HeaderLogo />
              </Styled.LogoOuter>
            </Styled.LogoLink>
          </Link>
        </Styled.Heading>
      </Styled.Inner>
    </header>
  )
}

export default Header
