import styled, { css } from 'styled-components'
import Styles from '@/styles'

const mq = Styles.mq

export const Root = styled.footer`
  display: block;
  position: relative;
`

export const Container = styled.div`
  ${Styles.mixins.container};
  background-image: linear-gradient(var(--b-color-key3) 0, var(--b-color-key4) 100%);
  ${
    mq.up.lg(css`
      &::before {
        ${Styles.mixins.dapicons};
        color: var(--b-color-key2);
        content: "ruedap";
        font-size: 5.5rem;
        left: 50%;
        position: absolute;
        top: 377px;
        transform: translate(-50%, -100%);
      }
    `)
  }
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