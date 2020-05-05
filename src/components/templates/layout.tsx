import Head from 'next/head'
import Header from '@src/components/molecules/header'
import styles from './layout.module.scss'

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
    </>
  )
}

export default Layout
