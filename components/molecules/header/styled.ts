import styled, { css } from 'styled-components'
import Styles from '@/styles'

export const Inner = styled.div`
  ${Styles.mixins.container}
  background-color: #fff;
`

export const Heading = styled.div`
  margin: 0;
  padding-bottom: 11.854%;
`

export const LogoLink = styled.a`
  display: block;
  position: relative;
  width: 100%;
`

export const LogoSpacer = styled.div`
  display: block;
  font-size: 0;
  margin-top: -50%;
  padding-bottom: 100%;
  position: relative;
  width: 100%;
`

export const LogoOuter = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.bg.body};
    background-image: radial-gradient(${theme.colors.bg.body}, ${theme.colors.key[3]});
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
  `}
`
