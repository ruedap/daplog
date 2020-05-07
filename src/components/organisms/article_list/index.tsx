import React from 'react'
import Link from 'next/link'
import { TArticleItem } from '@src/types'
import styles from './styles.module.scss'
import { id2Url } from '@src/utils/string'

import { format, parseISO } from 'date-fns'

const Time = ({ dateString }: { dateString: string }) => {
  const d = parseISO(dateString)
  const year = format(d, 'yyyy')
  const month = format(d, 'MM')
  const day = format(d, 'dd')
  return (
    <time dateTime={d.toISOString()}>
      <span>{year}</span>
      <span>.</span>
      <span>{month}</span>
      <span>.</span>
      <span>{day}</span>
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
    <ul className={styles.Root}>
      {articleList.map(({ id, date, title }) => {
        const url = id2Url(id)
        const year = parseISO(date).getFullYear()
        return (
          <React.Fragment key={id}>
            { isNewYear(year) && (
              <li>{year}</li>
            )}
            <li className="">
              <Link href="[year]/[month]/[date]/[title]" as={url}>
                <a>
                  <Time dateString={date} />
                  <span>{title}</span>
                </a>
              </Link>
            </li>
          </React.Fragment>
        )
      })}
    </ul>
  )
}

export default ArticleList
