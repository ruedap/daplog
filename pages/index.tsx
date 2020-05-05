import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getSortedArticlesData } from '@src/utils/articles'
import Layout from '@src/components/templates/layout'

export default function Home({
  allArticlesData
}: {
  allArticlesData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <>
      <Head>
        <title>アインシュタインの電話番号</title>
      </Head>

      <Layout>
        <ul className="">
          {allArticlesData.map(({ id, date, title }) => (
            <li className="" key={id}>
              <Link href="[id]" as={`${id}`}>
                <a>{date} {title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allArticlesData = getSortedArticlesData()
  return {
    props: {
      allArticlesData
    }
  }
}
