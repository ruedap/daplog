import { createGlobalStyle, css } from 'styled-components'

const prefix = 'u'

export const StyledBasicUtils = createGlobalStyle`
  ${({ theme }) => css`
    ${
      Object.entries({ margin: 'm', padding: 'p' }).map(([prop, abbr]) => {
        return Object.entries(theme.space).map(([size, unitize]) => {
          return `
            .${prefix}-${abbr}-${size} { ${prop}: ${unitize.px()} !important; }
            .${prefix}-${abbr}t-${size},
            .${prefix}-${abbr}y-${size} {
              ${prop}-top: ${unitize.px()} !important;
            }
            .${prefix}-${abbr}r-${size},
            .${prefix}-${abbr}x-${size} {
              ${prop}-right: ${unitize.px()} !important;
            }
            .${prefix}-${abbr}b-${size},
            .${prefix}-${abbr}y-${size} {
              ${prop}-bottom: ${unitize.px()} !important;
            }
            .${prefix}-${abbr}l-${size},
            .${prefix}-${abbr}x-${size} {
              ${prop}-left: ${unitize.px()} !important;
            }
          `
        })
      })
    }
  `}
`
