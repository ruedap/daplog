import Head from 'next/head'
import styles from './layout.module.scss'

const Layout = ({ children, home }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div className={styles.container}>{children}</div>
    </>
  )
}

export default Layout
