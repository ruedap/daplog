import styled, { css, AnyStyledComponent } from 'styled-components'
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
  background-color: rgba(var(--b-rgb-base), ${Styles.funcs.fibo('sm', 'alpha')});
  color: rgba(var(--b-rgb-base), ${Styles.funcs.fibo('lg', 'alpha')});
  font-family: var(--b-fontFamily-fjalla);
  height: ${Styles.funcs.fibo('sm', 'px')};
  letter-spacing: 0.1em;
  text-align: center;

  ${Styles.mq.up.md(css`
    height: ${Styles.funcs.fibo('md', 'px')};
  `)}
`

export const Year = styled.span`
  display: none;
`
export const Dot = Year

// FIXME: `Warning: Prop `className` did not match. Server: "styled__Time-sc-5t8qkb-4 ennoTY" Client: "styled-sc-5t8qkb-4 gbbMlh"`
type TTime = ({ dateString, className }: { dateString: string; className?: string | undefined; }) => JSX.Element
export const Time = (Time: TTime) => styled(Time)`
  background-color: #fff;
  display: block;
  float: left;
`

/* month, date, title */
const _ItemLineBase = styled.span`
  height: ${Styles.funcs.fibo('sm', 'px')};

  ${Styles.mq.up.md(css`
    height: ${Styles.funcs.fibo('md', 'px')};
  `)}
`

export const Title = styled(_ItemLineBase)`
  ${Styles.mixins.ellipsis(1)}
  background-color: rgba(var(--b-rgb-base), 0.42);
  display: block;
  padding: 0 21px;

  ${Styles.mq.up.md(css`
    margin-left: calc(${Styles.funcs.fibo('md', 'px')} * 2);
  `)}
`

/* month, date */
const _ItemLineMonthAndDate = styled(_ItemLineBase)`
  display: none;
  font-family: var(--b-fontFamily-fjalla);
  letter-spacing: 0.1em;
  width: ${Styles.funcs.fibo('md', 'px')};
  text-align: center;

  ${Styles.mq.up.md(css`
    display: inline-block;
  `)}
`

export const Month = styled(_ItemLineMonthAndDate)`
  background-color: rgba(var(--b-rgb-base), 0.34);
`

export const Date = styled(_ItemLineMonthAndDate)`
  background-color: rgba(var(--b-rgb-base), 0.38);
`

export const ItemLink = (Month: AnyStyledComponent, Date: AnyStyledComponent, Title: AnyStyledComponent) => styled.a`
  ${Styles.mixins.linkColors(
    '#fff',
    `rgba(var(--b-rgb-base), ${Styles.funcs.fibo('sm', 'alpha')})`,
    `rgba(var(--b-rgb-base), ${Styles.funcs.fibo('md', 'alpha')})`,
    `rgba(var(--b-rgb-base), ${Styles.funcs.fibo('md', 'alpha')})`,
    `rgba(var(--b-rgb-base), ${Styles.funcs.fibo('lg', 'alpha')})`,
  )}
  background-color: #fff;
  display: block;
  font-family: var(--b-fontFamily-lucida);
  text-decoration: none;
  width: 100%;

  &:hover {
    ${Month} {
      background-color: rgba(var(--b-rgb-base), 0.26);
    }

    ${Date} {
      background-color: rgba(var(--b-rgb-base), 0.3);
    }

    ${Title} {
      background-color: rgba(var(--b-rgb-base), 0.34);
    }
  }
`
