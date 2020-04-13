import { css } from 'styled-components'

export const colors: any = {}
colors.brand = 'rgb(24, 63, 83)'
colors.body = '#21272d'

export const bgColors: any = {}
bgColors.body = 'rgba(24,63,83,0.13)'
bgColors.content = '#fff'

export const sizes: any = {}
sizes.maxWidth = {}
sizes.maxWidth.container = 987

export const fonts: any = {}
fonts.family = {}
fonts.family.gothic = '"Hiragino Kaku Gothic ProN", Meiryo, sans-serif'
fonts.family.helvetica = `"Helvetica Neue", Helvetica, Arial, ${fonts.family.gothic}`
fonts.family.lucida = `"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", ${fonts.helvetica}`
fonts.family.avenir = `"Avenir Next", "Avenir", ${fonts.family.helvetica}`
fonts.family.fjalla = '"Fjalla One", "Helvetica Neue", Helvetica, Arial, sans-serif'

export const mixins: any = {}
mixins.container = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: ${sizes.maxWidth.container}px;
`

mixins.fontSmoothing = css`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
`

mixins.dapicons = css`
  ${mixins.fontSmoothing}
  font-family: "dapicons";
  font-feature-settings: "liga", "dlig";
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  line-height: 1;
  speak: none;
  text-rendering: optimizeLegibility;
  text-transform: none;
`
