import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllArticlePathParams, getArticleData } from '@src/utils/articles'
import { stripHtmlTags } from '@src/utils/string'
import { TArticleData } from '@src/types'
import Layout from '@src/components/templates/layout'
import Article from '@src/components/organisms/article'

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

const ArticlePage = ({ articleData }: { articleData: TArticleData }) => {
  return (
    <Layout title={ stripHtmlTags(articleData.title) }>
      <Article articleData={articleData} />
    </Layout>
  )
}

export default ArticlePage
