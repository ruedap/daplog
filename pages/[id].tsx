import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { getAllArticleIds, getArticleData } from '@src/utils/articles'
import Layout from '@src/components/templates/layout'
import Time from '@src/components/atoms/time'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllArticleIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleData = await getArticleData(params.id as string)
  return {
    props: {
      articleData
    }
  }
}

export default function Article({
  articleData
}: {
  articleData: {
    id: string
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <>
      <Head>
        <title>{articleData.title}</title>
      </Head>
      <Layout>
        {articleData.title}
        <br />
        {articleData.id}
        <br />
        {articleData.date}
        <br />
        <Time dateString={articleData.date} />
        <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
      </Layout>
    </>
  )
}
