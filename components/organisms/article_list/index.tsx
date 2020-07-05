import React from 'react'
import Link from 'next/link'
import { TArticleItem } from '@/types'
import { id2Url, suitNames } from '@/utils/string'
import { format, parseISO } from 'date-fns'
import styled, { css } from 'styled-components'
import Styles from '@/styles'
import clsx from 'clsx'

const Time = ({ dateString, className }: { dateString: string, className?: string }) => {
  const d = parseISO(dateString)
  const year = format(d, 'yyyy')
  const month = format(d, 'MM')
  const date = format(d, 'dd')
  const { element } = suitNames(String(className))
  return (
    <time dateTime={ d.toISOString() } className={ className }>
      <span className={ element('year') }>{ year }</span>
      <span className={ element('dot') }>.</span>
      <span className={ clsx(element('month'), 'sc-ArticleList-month') }>
        { month }
      </span>
      <span className={ element('dot') }>.</span>
      <span className={ clsx(element('date'), 'sc-ArticleList-date') }>
        { date }
      </span>
    </time>
  )
}

/* month, date, title */
const _ItemLineStyled = css`
  ${({ theme }) => css`
    height: ${Styles.funcs.fibo('sm', 'px')};

    ${theme.mq.up.md} {
      height: ${Styles.funcs.fibo('md', 'px')};
    }
  `}
`

/* month, date */
const _ItemMonthAndDateStyled = css`
  ${_ItemLineStyled}
  ${({ theme }) => css`
    display: none;
    font-family: var(--b-fontFamily-fjalla);
    letter-spacing: 0.1em;
    width: ${Styles.funcs.fibo('md', 'px')};
    text-align: center;

    ${theme.mq.up.md} {
      display: inline-block;
    }
  `}
`

const TimeStyled = styled(Time)`
  background-color: #fff;
  display: block;
  float: left;
  
  &-year {
    display: none;
  }
  
  &-dot {
    display: none;
  }
  
  &-month {
    ${_ItemMonthAndDateStyled}
    background-color: ${({ theme }) => theme.ArticleList.month.colors.bg};
  }
  
  &-date {
    ${_ItemMonthAndDateStyled}
    background-color: ${({ theme }) => theme.ArticleList.date.colors.bg};
  }
`

const Component = ({
  articleList,
  className
}: {
  articleList: TArticleItem[]
  className?: string
}) => {
  let beforeYear = 3000
  const isNewYear = (year: number) => {
    const r = beforeYear > year
    beforeYear = year
    return r
  }
  const { element } = suitNames(String(className))

  return (
    <ul className={ className }>
      { articleList.map(({ id, date, title }) => {
        const url = id2Url(id)
        const year = parseISO(date).getFullYear()
        return (
          <React.Fragment key={ id }>
            { isNewYear(year) && (
              // TODO: modifier
              <li className={ clsx(element('item'), element('yearHeading')) }>{ year }</li>
            ) }
            <li className={ element('item') }>
              <Link href="[year]/[month]/[date]/[title]" passHref as={ url }>
                <a className={ element('itemLink') }>
                  <TimeStyled dateString={ date } />
                  <div className={ clsx(element('title'), 'sc-ArticleList-title') }>{ title }</div>
                </a>
              </Link>
            </li>
          </React.Fragment>
        )
      }) }
    </ul>
  )
}

const StyledComponent = styled(Component)`
  ${({ theme }) => css`
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    color: #fff;
  
    &-item {
      ${Styles.mixins.fontSmoothing()}
      font-size: ${theme.utils.pxToRem(14)};
      line-height: ${Styles.funcs.fibo('sm', 'px')};
      margin-bottom: 1px;

      ${theme.mq.up.md} {
        font-size: ${theme.utils.pxToRem(18)};
        line-height: ${Styles.funcs.fibo('md', 'px')};
      }
    }
    
    &-yearHeading {
      background-color: ${theme.colors.key[3]};
      color: ${theme.colors.key[5]};
      font-family: var(--b-fontFamily-fjalla);
      height: ${Styles.funcs.fibo('sm', 'px')};
      letter-spacing: 0.1em;
      text-align: center;

      ${theme.mq.up.md} {
        height: ${Styles.funcs.fibo('md', 'px')};
      }
    }
    
    &-itemLink {
      ${Styles.mixins.linkColors(
        '#fff',
        theme.colors.key[3],
        theme.colors.key[4],
        theme.colors.key[4],
        theme.colors.key[5]
      )}

      background-color: #fff;
      display: block;
      font-family: var(--b-fontFamily-lucida);
      text-decoration: none;
      width: 100%;

      &:hover {
        .sc-ArticleList-month {
          background-color: ${theme.ArticleList.month.colors.hover.bg};
        }

        .sc-ArticleList-date {
          background-color: ${theme.ArticleList.date.colors.hover.bg};
        }

        .sc-ArticleList-title {
          background-color: ${theme.ArticleList.title.colors.hover.bg};
        }
      }
    }
    
    &-title {
      ${_ItemLineStyled}
      ${Styles.mixins.ellipsis(1)}
      background-color: ${theme.ArticleList.title.colors.bg};
      display: block;
      padding: 0 21px;

      ${theme.mq.up.md} {
        margin-left: calc(${Styles.funcs.fibo('md', 'px')} * 2);
      }
    }
  `}
`

export const ArticleList = StyledComponent
