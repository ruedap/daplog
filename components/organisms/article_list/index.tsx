import React from 'react'
import Link from 'next/link'
import { TArticleItem } from '@/types'
import { id2Url } from '@/utils/string'

import { format, parseISO } from 'date-fns'

const Time = ({ dateString, className }: { dateString: string, className?: string }) => {
  const d = parseISO(dateString)
  const year = format(d, 'yyyy')
  const month = format(d, 'MM')
  const date = format(d, 'dd')
  return (
    <time dateTime={d.toISOString()} className={className}>
      <Year>{year}</Year>
      <Dot>.</Dot>
      <Month>{month}</Month>
      <Dot>.</Dot>
      <Date>{date}</Date>
    </time>
  )
}

const ArticleList = ({
  articleList
}: {
  articleList: TArticleItem[]
}) => {
  let beforeYear = 3000
  const isNewYear = (year: number) => {
    const r = beforeYear > year
    beforeYear = year
    return r
  }

  return (
    <Root>
      {articleList.map(({ id, date, title }) => {
        const url = id2Url(id)
        const year = parseISO(date).getFullYear()
        return (
          <React.Fragment key={id}>
            { isNewYear(year) && (
              <YearHeading>{year}</YearHeading>
            )}
            <Item>
              <Link href="[year]/[month]/[date]/[title]" passHref as={url}>
                <ItemLink>
                  <StyledTime dateString={date} />
                  <Title>{title}</Title>
                </ItemLink>
              </Link>
            </Item>
          </React.Fragment>
        )
      })}
    </Root>
  )
}

export default ArticleList

import styled, { css } from 'styled-components'
import Styles from '@/styles'

const Root = styled.ul`
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  color: #fff;
`

const Item = styled.li`
  ${Styles.mixins.fontSmoothing()}
  font-size: 1.4rem;
  line-height: ${Styles.funcs.fibo('sm', 'px')};
  margin-bottom: 1px;

  ${Styles.mixins.mq.up.md(css`
    font-size: 1.8rem;
    line-height: ${Styles.funcs.fibo('md', 'px')};
  `)}
`

const YearHeading = styled(Item)`
  background-color: rgba(var(--b-rgb-base), ${Styles.funcs.fibo('sm', 'alpha')});
  color: rgba(var(--b-rgb-base), ${Styles.funcs.fibo('lg', 'alpha')});
  font-family: var(--b-fontFamily-fjalla);
  height: ${Styles.funcs.fibo('sm', 'px')};
  letter-spacing: 0.1em;
  text-align: center;

  ${Styles.mixins.mq.up.md(css`
    height: ${Styles.funcs.fibo('md', 'px')};
  `)}
`

const StyledTime = styled(Time)`
  background-color: #fff;
  display: block;
  float: left;
`

const Year = styled.span`
  display: none;
`
const Dot = Year

/* month, date, title */
const _ItemLineBase = styled.span`
  height: ${Styles.funcs.fibo('sm', 'px')};

  ${Styles.mixins.mq.up.md(css`
    height: ${Styles.funcs.fibo('md', 'px')};
  `)}
`

const Title = styled(_ItemLineBase)`
  ${Styles.mixins.ellipsis(1)}
  background-color: rgba(var(--b-rgb-base), 0.42);
  display: block;
  padding: 0 21px;

  ${Styles.mixins.mq.up.md(css`
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

  ${Styles.mixins.mq.up.md(css`
    display: inline-block;
  `)}
`

const Month = styled(_ItemLineMonthAndDate)`
  background-color: rgba(var(--b-rgb-base), 0.34);
`

const Date = styled(_ItemLineMonthAndDate)`
  background-color: rgba(var(--b-rgb-base), 0.38);
`

const ItemLink = styled.a`
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
