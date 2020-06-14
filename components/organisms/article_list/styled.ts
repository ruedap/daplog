import styled, { css } from 'styled-components'
import Styles from '@/styles'

export const Root = styled.ul`
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  color: #fff;
`

export const Item = styled.li`
  ${Styles.mixins.fontSmoothing()}
  font-size: 1.4rem;
  line-height: ${Styles.funcs.fibo('sm', 'px')};
  margin-bottom: 1px;

  ${Styles.mq.up.md(css`
    font-size: 1.8rem;
    line-height: ${Styles.funcs.fibo('md', 'px')};
  `)}
`

export const YearHeading = styled(Item)`
  ${({ theme }) => css`
    background-color: ${theme.colors.key[3]};
    color: ${theme.colors.key[5]};
    font-family: var(--b-fontFamily-fjalla);
    height: ${Styles.funcs.fibo('sm', 'px')};
    letter-spacing: 0.1em;
    text-align: center;

    ${Styles.mq.up.md(css`
      height: ${Styles.funcs.fibo('md', 'px')};
    `)}
  `}
`

export const Year = styled.span`
  display: none;
`
export const Dot = Year
