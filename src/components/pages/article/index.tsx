import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArticleRepository } from 'repositories'
import { TArticleJson, TArticleParams } from 'types'
import Header from 'components/molecules/header'
import Footer from 'components/molecules/footer'

const Article = () => {
  const articleParams: TArticleParams = useParams();
  const initialState: TArticleJson = { title: '', dir: '', base: '', ext: '', sourceBase: '', sourceExt: '', bodyContent: '', bodyHtml: ''}
  const [article, setArticle] = useState<TArticleJson>(initialState)

  useEffect(() => {
    ArticleRepository.get(articleParams).then(data => setArticle(data))
  }, [articleParams])

  return (
  <>
    <Header />
    <div>{article.title}</div>
    <div dangerouslySetInnerHTML={{__html: article.bodyHtml}} />
    <Footer />
  </>
  )
}
;

export default Article;
