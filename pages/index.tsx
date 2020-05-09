import { GetStaticProps } from 'next'
import { getSortedArticleList } from '@src/utils/articles'
import Layout from '@src/components/templates/layout'
import ArticleList from '@src/components/organisms/article_list'
import { TArticleItem } from '@src/types'

export const getStaticProps: GetStaticProps = async () => {
  const articleList = getSortedArticleList()
  return {
    props: {
      articleList
    }
  }
}

const HomePage = ({ articleList }: { articleList: TArticleItem[] }) => {
  return (
    <Layout>
      <div className="Container">
        <ArticleList articleList={articleList} />
      </div>
    </Layout>
  )
}

export default HomePage
