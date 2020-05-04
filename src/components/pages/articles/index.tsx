import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from 'components/molecules/header'
import Footer from 'components/molecules/footer'
import { ArticlesRepository } from 'repositories'

const Articles = () => {
  useEffect(() => {
    ArticlesRepository.list().then((data) => console.log(data))
  }, [])

  return (
    <>
      <Header />
      <Link to="/2020/04/16/chaplin">articles</Link>
      <Footer />
    </>
  )
};

export default Articles;
