import React from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { getSortedArticleList } from '@src/utils/articles'
import Layout from '@src/components/templates/layout'
import { TArticleItem } from '@src/types'
import { id2Url } from '@src/utils/string'

export const getStaticProps: GetStaticProps = async () => {
  const articleList = getSortedArticleList()
  return {
    props: {
      articleList
    }
  }
}

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

const Home = ({ articleList }: { articleList: TArticleItem[] }) => {
  let beforeYear = 3000
  const isNewYear = (year: number) => {
    const r = beforeYear > year
    beforeYear = year
    return r
  }

  return (
    <Layout>
      <div className="Container">
        <ul className="ArticleList">
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
      </div>
    </Layout>
  )
}

export default Home
