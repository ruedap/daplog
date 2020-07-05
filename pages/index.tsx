import { GetStaticProps } from 'next'
import { getSortedArticleList } from '@/utils/articles'
import { Layout } from '@/components/templates/layout'
import { ArticleList } from '@/components/organisms/article_list'
import { TArticleItem } from '@/types'
import { generateMetaTags } from '@/utils/string'

export const getStaticProps: GetStaticProps = async () => {
  const articleList = getSortedArticleList()
  return {
    props: {
      articleList
    }
  }
}

const HomePage = ({ articleList }: { articleList: TArticleItem[] }) => {
  const metaTags = generateMetaTags()
  return (
    <Layout metaTags={ metaTags }>
      <ArticleList articleList={ articleList } />
    </Layout>
  )
}

export default HomePage
