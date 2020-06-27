import styled, { css } from 'styled-components'
import Styles from '@/styles'

export const Root = styled.footer`
  display: block;
  position: relative;
`

export const Container = styled.div`
  ${({ theme }) => css`
    ${Styles.mixins.container};
    background-image: linear-gradient(
      ${theme.colors.key[3]} 0,
      ${theme.colors.key[4]} 100%
    );

    ${theme.mq.up.lg} {
      &::before {
        ${Styles.mixins.dapicons};
        color: ${theme.colors.key[2]};
        content: "ruedap";
        font-size: ${theme.fontSizes.md.rem};
        left: 50%;
        position: absolute;
        top: 377px;
        transform: translate(-50%, -100%);
      }
    }
  `}
`

export const Heading = styled.div`
  margin: 0;
  position: relative;
`

export const LogoSpacer = styled.div`
  display: block;
  font-size: 0;
  /* 1129 / 987 = 1.143870314 */
  padding-bottom: 114.387%;
  position: relative;
  width: 100%;
`

export const LogoLink = styled.a`
  bottom: 0;
  display: block;
  height: auto;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
`
