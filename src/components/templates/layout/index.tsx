import Head from '@src/components/atoms/head'
import Header from '@src/components/molecules/header'
import Footer from '@src/components/molecules/footer'
import { TMetaTags } from '@src/types'
import styles from './styles.module.scss'

const Layout = ({
  metaTags,
  children,
}: {
  metaTags: TMetaTags
  children: React.ReactNode
}) => {
  return (
    <>
      <Head metaTags={metaTags} />

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
