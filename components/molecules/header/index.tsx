import Link from 'next/link'
import HeaderLogo from '@/components/atoms/header_logo'

const Header = () => {
  return (
    <header>
      <Inner>
        <Heading>
          <Link href="/">
            <LogoLink>
              <LogoSpacer />
              <LogoOuter>
                <HeaderLogo />
              </LogoOuter>
            </LogoLink>
          </Link>
        </Heading>
      </Inner>
    </header>
  )
}

export default Header

import styled from 'styled-components'
import Styles from '@/styles'

const Inner = styled.div`
  ${Styles.mixins.container}
  background-color: #fff;
`

const Heading = styled.div`
  margin: 0;
  padding-bottom: 11.854%;
`

const LogoLink = styled.a`
  display: block;
  position: relative;
  width: 100%;
`

const LogoSpacer = styled.div`
  display: block;
  font-size: 0;
  margin-top: -50%;
  padding-bottom: 100%;
  position: relative;
  width: 100%;
`

const LogoOuter = styled.div`
  background-color: var(--b-bgColor-body);
  background-image: radial-gradient(var(--b-bgColor-body), var(--b-color-key3));
  border-radius: 100%;
  bottom: 0;
  display: block;
  height: auto;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`
