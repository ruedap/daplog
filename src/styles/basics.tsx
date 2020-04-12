import { createGlobalStyle } from 'styled-components'
import * as a from './abstractions'

const GlobalStyle = createGlobalStyle`
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
    background-color: ${a.bgColors.body};
    color: ${a.colors.body};
    font-family: ${a.fonts.family.helvetica};
    /* TODO */
    /* Fix Chrome bug https://code.google.com/p/chromium/issues/detail?id=319623 */
    /* font-size: strip-units($font-size-medium) * 1em; */
    font-size: 1.4rem;
  }

  a {
    /* TODO */
    /* @include link-colors($color-link, $color-link-hover, $color-link-active, $color-link-visited, $color-link-focus); */
  }
`

export default GlobalStyle
