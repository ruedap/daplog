import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllArticlePathParams, getArticleData } from '@src/utils/articles'
import { stripHtmlTags } from '@src/utils/string'
import Layout from '@src/components/templates/layout'
import Time from '@src/components/atoms/time'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllArticlePathParams()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = `${params.year}-${params.month}-${params.date}-${params.title}`
  const articleData = getArticleData(id)
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
    <Layout title={ stripHtmlTags(articleData.title) }>
      <h1 dangerouslySetInnerHTML={{ __html: articleData.title }} />
      <Time date={articleData.date} />
      <div dangerouslySetInnerHTML={{ __html: articleData.body }} />
    </Layout>
  )
}

export default Article
