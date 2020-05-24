import styled, { css } from 'styled-components'
import * as Styled from './_styled_tag4'

export const FooBar = styled.div`
  color: red;
`

export const FooBarTag4 = styled(Styled.Tag4)`
  font-weight: bold;
`

export const fooBar = css`
  font-size: 200%;
`
