import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { TArticleItem } from '@/types'
import styles from './styles.module.scss'
import { id2Url } from '@/utils/string'

import { format, parseISO } from 'date-fns'

const Time = ({ dateString }: { dateString: string }) => {
  const d = parseISO(dateString)
  const year = format(d, 'yyyy')
  const month = format(d, 'MM')
  const date = format(d, 'dd')
  return (
    <time dateTime={d.toISOString()} className={styles.time}>
      <span className={styles.year}>{year}</span>
      <span className={styles.dot}>.</span>
      <span className={styles.month}>{month}</span>
      <span className={styles.dot}>.</span>
      <span className={styles.date}>{date}</span>
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
              <li className={cn(styles.item, styles.yearHeading)}>{year}</li>
            )}
            <li className={styles.item}>
              <Link href="[year]/[month]/[date]/[title]" as={url}>
                <a className={styles.itemLink}>
                  <Time dateString={date} />
                  <span className={styles.title}>{title}</span>
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
