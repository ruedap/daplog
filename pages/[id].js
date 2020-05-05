import Layout from '@components/templates/layout'
import { getAllArticleIds, getArticleData } from '@lib/articles'

export async function getStaticPaths() {
  const paths = getAllArticleIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const articleData = getArticleData(params.id)
  return {
    props: {
      articleData
    }
  }
}

export default function Article({ articleData }) {
  return (
    <Layout>
      {articleData.title}
      <br />
      {articleData.id}
      <br />
      {articleData.date}
      <br />

    </Layout>
  )
}
