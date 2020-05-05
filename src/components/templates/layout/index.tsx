import Head from 'next/head'
import Header from '@src/components/molecules/header'
import Footer from '@src/components/molecules/footer'
import styles from './styles.module.scss'

const Layout = ({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  )
}

export default Layout
