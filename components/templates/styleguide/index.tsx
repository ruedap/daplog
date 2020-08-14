import styled, { css } from 'styled-components'

type Props = Readonly<{
  $foo: boolean
}>

export const StyledComponent = styled.div<Props>`
  ${({ theme }) => css`
    background: plum;

    color: ${theme.colors.bg.body};
  `}
`
