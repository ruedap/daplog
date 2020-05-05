import { GetStaticProps, GetStaticPaths } from 'next'
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
  const articleData = getArticleData(params.id as string)
  return {
    props: {
      articleData
    }
  }
}

const Article = ({
  articleData
}: {
  articleData: {
    id: string
    title: string
    date: string
    body: string
  }
}) => {
  return (
    <Layout title={articleData.title}>
      <h1 dangerouslySetInnerHTML={{ __html: articleData.title }} />
      <Time date={articleData.date} />
      <div dangerouslySetInnerHTML={{ __html: articleData.body }} />
    </Layout>
  )
}

export default Article
