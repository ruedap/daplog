import styled from '@emotion/styled'
import { container, mqUp, dapicons } from '@src/styles/abstractions/mixins'


const Styled = {
  Root: styled.footer`
    display: block;
    position: relative;
  `,
  Container: styled.div`
    ${container};
    background-image: linear-gradient(var(--b-color-key3) 0, var(--b-color-key4) 100%);
    ${
      mqUp('lg', `
        &::before {
          ${dapicons};
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
  `,
  Heading: styled.div`
    margin: 0;
    position: relative;
  `,
  LogoSpacer: styled.div`
    display: block;
    font-size: 0;
    /* 1129 / 987 = 1.143870314 */
    padding-bottom: 114.387%;
    position: relative;
    width: 100%;
  `,
  LogoLink: styled.a`
    bottom: 0;
    display: block;
    height: auto;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
  `,
} as const

export default Styled
