import React from 'react'
import { Link } from 'react-router-dom'
import Header from 'components/molecules/header'
import Footer from 'components/molecules/footer'

const Articles = () => (
  <>
    <Header />
    <Link to="/2020/04/16/chaplin">articles</Link>
    <Footer />
  </>
);

export default Articles;
