import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArticlesRepository } from 'repositories'
import { TArticle } from 'types'
import Header from 'components/molecules/header'
import Footer from 'components/molecules/footer'
import { stripHtmlTags } from 'utils/text'

const Articles = () => {
  const [articles, setArticles] = useState<TArticle[]>([])

  useEffect(() => {
    ArticlesRepository.list().then(
      (data) => setArticles(Object.values(data.fileMap).reverse())
    )
  }, [])

  return (
    <>
      <Header />
      {
        articles.map((article, i) =>
          <Link key={i} to="/2020/04/16/chaplin">{stripHtmlTags(article.title)}</Link>
        )
      }
      <Footer />
    </>
  )
};

export default Articles;
