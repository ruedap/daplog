import React from 'react'
import Link from 'next/link'
import { TArticleItem } from '@/types'
import { id2Url } from '@/utils/string'
import { format, parseISO } from 'date-fns'
import * as Styled from './styled'
import styled, { css } from 'styled-components'
import Styles from '@/styles'

const Time = ({ dateString, className }: { dateString: string, className?: string }) => {
  const d = parseISO(dateString)
  const year = format(d, 'yyyy')
  const month = format(d, 'MM')
  const date = format(d, 'dd')
  return (
    <time dateTime={d.toISOString()} className={className}>
      <Styled.Year>{year}</Styled.Year>
      <Styled.Dot>.</Styled.Dot>
      <StyledMonth>{month}</StyledMonth>
      <Styled.Dot>.</Styled.Dot>
      <StyledDate>{date}</StyledDate>
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
    <Styled.Root>
      {articleList.map(({ id, date, title }) => {
        const url = id2Url(id)
        const year = parseISO(date).getFullYear()
        return (
          <React.Fragment key={id}>
            { isNewYear(year) && (
              <Styled.YearHeading>{year}</Styled.YearHeading>
            )}
            <Styled.Item>
              <Link href="[year]/[month]/[date]/[title]" passHref as={url}>
                <StyledItemLink>
                  <StyledTime dateString={date} />
                  <StyledTitle>{title}</StyledTitle>
                </StyledItemLink>
              </Link>
            </Styled.Item>
          </React.Fragment>
        )
      })}
    </Styled.Root>
  )
}

export default ArticleList

const StyledTime = styled(Time)`
  background-color: #fff;
  display: block;
  float: left;
`

/* month, date, title */
const _StyledItemLineBase = styled.span`
  height: ${Styles.funcs.fibo('sm', 'px')};

  ${Styles.mq.up.md(css`
    height: ${Styles.funcs.fibo('md', 'px')};
  `)}
`

const StyledTitle = styled(_StyledItemLineBase)`
  ${Styles.mixins.ellipsis(1)}
  background-color: rgba(var(--b-rgb-base), 0.42);
  display: block;
  padding: 0 21px;

  ${Styles.mq.up.md(css`
    margin-left: calc(${Styles.funcs.fibo('md', 'px')} * 2);
  `)}
`

/* month, date */
const _StyledItemLineMonthAndDate = styled(_StyledItemLineBase)`
  display: none;
  font-family: var(--b-fontFamily-fjalla);
  letter-spacing: 0.1em;
  width: ${Styles.funcs.fibo('md', 'px')};
  text-align: center;

  ${Styles.mq.up.md(css`
    display: inline-block;
  `)}
`

const StyledMonth = styled(_StyledItemLineMonthAndDate)`
  background-color: rgba(var(--b-rgb-base), 0.34);
`

const StyledDate = styled(_StyledItemLineMonthAndDate)`
  background-color: rgba(var(--b-rgb-base), 0.38);
`

const StyledItemLink = styled.a`
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
    ${StyledMonth} {
      background-color: rgba(var(--b-rgb-base), 0.26);
    }

    ${StyledDate} {
      background-color: rgba(var(--b-rgb-base), 0.3);
    }

    ${StyledTitle} {
      background-color: rgba(var(--b-rgb-base), 0.34);
    }
  }
`
