import Head from 'next/head'
import { getAllArticleIds, getArticleData } from '@utils/articles'
import Layout from '@components/templates/layout'
import Time from '@components/atoms/time'

export async function getStaticPaths() {
  const paths = getAllArticleIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const articleData = await getArticleData(params.id)
  return {
    props: {
      articleData
    }
  }
}

export default function Article({ articleData }) {
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
