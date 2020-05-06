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

const Date = ({ date }: { date: string }) => {
  const d = parseISO(date)
  const year = format(d, 'yyyy')
  const month = format(d, 'MM')
  const day = format(d, 'dd')
  return (
    <>
      <span>{year}</span>
      <span>{month}</span>
      <span>{day}</span>
    </>
  )
}

const Home = ({ articleList }: { articleList: TArticleItem[] }) => {
  return (
    <Layout>
      <ul className="">
        {articleList.map(({ id, date, title }) => {
          const url = id2Url(id)
          return (
            <li className="" key={id}>
              <Link href="[year]/[month]/[date]/[title]" as={url}>
                <a>
                  <Date date={date} />
                  <span>{title}</span>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Home
