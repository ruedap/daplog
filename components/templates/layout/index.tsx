import Head from '@/components/atoms/head'
import Header from '@/components/molecules/header'
import Footer from '@/components/molecules/footer'
import { TMetaTags } from '@/types'
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
