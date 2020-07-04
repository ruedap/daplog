import { Head } from '@/components/atoms/head'
import { Header } from '@/components/molecules/header'
import { Footer } from '@/components/molecules/footer'
import { TMetaTags } from '@/types'
import * as Styled from './styled'

const Layout = ({
  metaTags,
  children
}: {
  metaTags: TMetaTags
  children: React.ReactNode
}) => {
  return (
    <>
      <Head metaTags={ metaTags } />

      <Header />

      <main>
        <Styled.Container>
          { children }
        </Styled.Container>
      </main>

      <Footer />
    </>
  )
}

export default Layout
