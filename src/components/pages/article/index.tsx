import React from 'react'
import { useParams } from 'react-router-dom'
import Header from 'components/molecules/header'
import Footer from 'components/molecules/footer'

const Article = () => {
  const { year, month, day, title } = useParams();

  return (
  <>
    <Header />
    <div>year: {year}</div>
    <div>month: {month}</div>
    <div>day: {day}</div>
    <div>title: {title}</div>
    <Footer />
  </>
  )
}
;

export default Article;
