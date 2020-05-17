import { createGlobalStyle } from 'styled-components'
import { linkColors } from '../abstractions/mixins'

export default createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    background-color: var(--b-bgColor-body);
    color:  var(--b-color-body);
    font-family: var(--b-fontFamily-helvetica);
    font-size: 1.4rem;
  }

  a {
    ${linkColors(
      'var(--b-color-link)',
      'var(--b-color-link-visited)',
      'var(--b-color-link-focus)',
      'var(--b-color-link-hover)',
      'var(--b-color-link-active)',
    )}
  }
`
