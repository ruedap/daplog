import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllArticlePathParams, getArticleData } from '@/utils/articles'
import { stripHtmlTags, generateMetaTags, id2Url } from '@/utils/string'
import { TArticleData } from '@/types'
import Layout from '@/components/templates/layout'
import Article from '@/components/organisms/article'
import { ParsedUrlQuery } from 'querystring'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllArticlePathParams()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const p = params as ParsedUrlQuery
  const id = `${p.year}-${p.month}-${p.date}-${p.title}`
  const articleData = getArticleData(id)
  return {
    props: {
      articleData
    }
  }
}

const ArticlePage = ({ articleData }: { articleData: TArticleData }) => {
  const title = stripHtmlTags(articleData.title)
  const description = stripHtmlTags(articleData.body).replace(/\r?\n/g, '').slice(0, 500)
  const url = `https://blog.ruedap.com/${id2Url(articleData.id)}`
  const metaTags = generateMetaTags({ title, description, url })

  return (
    <Layout metaTags={ metaTags }>
      <Article articleData={ articleData } />
    </Layout>
  )
}

export default ArticlePage
