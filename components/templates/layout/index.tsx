import Head from '@/components/atoms/head'
import Header from '@/components/molecules/header'
import Footer from '@/components/molecules/footer'
import { TMetaTags } from '@/types'

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
        <Container>
          {children}
        </Container>
      </main>

      <Footer />
    </>
  )
}

export default Layout

import styled from 'styled-components'
import Styles from '@/styles'

const Container = styled.div`
  ${Styles.mixins.container}
  background-color: var(--b-bgColor-content);
`
