import Head from 'next/head'
import Header from '@src/components/molecules/header'
import Footer from '@src/components/molecules/footer'
import styles from './styles.module.scss'
import { BLOG_NAME } from '@src/utils/constants'

const Layout = ({
  children,
  title
}: {
  children: React.ReactNode
  title?: string
}) => {
  return (
    <>
      <Head>
        { title ? (
          <title>{`${title} - ${BLOG_NAME}`}</title>
        ) : (
          <title>{BLOG_NAME}</title>
        )}
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <Header />

      <main>
        <div className={styles.container}>
          {children}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Layout
