import { createGlobalStyle, css } from 'styled-components'
import { linkColors } from '../abstracts/mixins'

export default createGlobalStyle`
  ${({ theme }) => css`
    html {
      box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    body {
      background-color: ${theme.colors.bg.body};
      color: ${theme.colors.text.body};
      font-family: var(--b-fontFamily-helvetica);
    }

    a {
      ${linkColors(
        theme.colors.link.normal,
        theme.colors.link.visited,
        theme.colors.link.focus,
        theme.colors.link.hover,
        theme.colors.link.active
      )}
    }
  `}
`
