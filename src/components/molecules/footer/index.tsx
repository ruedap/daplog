import React from 'react'
import styled from 'styled-components'
import { mixins } from 'styles/abstractions'

const Root = styled.footer`
  display: block;
  position: relative;
`

const Container = styled.div`
  ${mixins.container}
  background-image: linear-gradient(rgba(24,63,83,0.34) 0, rgba(24,63,83,0.55) 100%);

  &::before {
    ${mixins.dapicons}
    color: rgba(24,63,83,0.21);
    content: "ruedap";
    font-size: 5.5rem;
    left: 50%;
    position: absolute;
    top: 377px;
  }
`

const Heading = styled.h2`
  margin: 0;
  position: relative;
`

const LogoSpacer = styled.div`
  display: block;
  font-size: 0;
  /* 1129 / 987 = 1.143870314 */
  padding-bottom: 114.387%;
  position: relative;
  width: 100%;
`

const Logo = styled.div`
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

const Footer = () => (
  <Root>
    <Container>
      <Heading>
        <LogoSpacer>ルエダップコム</LogoSpacer>
        <Logo />
      </Heading>
    </Container>
  </Root>
)

export default Footer
