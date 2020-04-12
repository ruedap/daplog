import React from 'react'
import styled from 'styled-components'
import HeaderLogo from 'components/atoms/header_logo'
import { mixins } from 'styles/abstractions'

const Inner = styled.div`
  ${mixins.container}
  background-color: #fff;
`

const Heading = styled.h1`
  margin: 0;
  padding-bottom: 11.854%;
`

const LogoLink = styled.a.attrs({href: '/'})`
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
  /* TODO: variable */
  background-color: rgba(24,63,83,0.13);
  background-image: radial-gradient(rgba(24,63,83,0.13), rgba(24,63,83,0.34));
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

const Header = () => (
  <header>
    <Inner>
      <Heading>
        <LogoLink>
          <LogoSpacer />
          <LogoOuter>
            <HeaderLogo />
          </LogoOuter>
        </LogoLink>
      </Heading>
    </Inner>
  </header>
)

export default Header
