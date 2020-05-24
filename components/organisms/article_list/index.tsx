import React from 'react'
import Link from 'next/link'
import { TArticleItem } from '@/types'
import { id2Url } from '@/utils/string'
import { format, parseISO } from 'date-fns'
import * as Styled from './styled'

const Time = ({ dateString, className }: { dateString: string, className?: string }) => {
  const d = parseISO(dateString)
  const year = format(d, 'yyyy')
  const month = format(d, 'MM')
  const date = format(d, 'dd')
  return (
    <time dateTime={d.toISOString()} className={className}>
      <Styled.Year>{year}</Styled.Year>
      <Styled.Dot>.</Styled.Dot>
      <Styled.Month>{month}</Styled.Month>
      <Styled.Dot>.</Styled.Dot>
      <Styled.Date>{date}</Styled.Date>
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
  
  const StyledTime = Styled.Time(Time)
  const StyledItemLink = Styled.ItemLink(Styled.Month, Styled.Date, Styled.Title)

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
                  <Styled.Title>{title}</Styled.Title>
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
