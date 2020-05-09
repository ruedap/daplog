import { TArticleData } from '@src/types'
import Time from '@src/components/atoms/time'

const Article = ({ articleData }: { articleData: TArticleData }) => {
  return (
    <>
      <h1 dangerouslySetInnerHTML={{ __html: articleData.title }} />
      <Time date={articleData.date} />
      <div dangerouslySetInnerHTML={{ __html: articleData.body }} />
    </>
  )
}

export default Article
