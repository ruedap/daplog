import styled, { css } from 'styled-components'
import { StyledTag4 } from './_styled_tag4'

const fooBar = css`
  font-size: 200%;
`

export const FooBar = () => (
  <StyledFooBar css={ fooBar }>This is FooBar</StyledFooBar>
)

export const FooBarTag4 = () => (
  <StyledFooBarTag4>This is FooBarTag4</StyledFooBarTag4>
)

const StyledFooBar = styled.div`
  color: red;
`

const StyledFooBarTag4 = styled(StyledTag4)`
  font-weight: bold;
`
