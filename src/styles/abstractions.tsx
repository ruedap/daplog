import { css } from 'styled-components'

const MAX_WIDTH_CONTAINER = 987

export const ContainerMixin = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: ${MAX_WIDTH_CONTAINER}px;
`

export const FontSmoothingMixin = css`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
`

export const DapiconsMixin = css`
  ${FontSmoothingMixin}
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
