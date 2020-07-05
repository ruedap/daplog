import { Head } from '@/components/atoms/head'
import { Header } from '@/components/molecules/header'
import { Footer } from '@/components/molecules/footer'
import { TMetaTags } from '@/types'
import styled, { css } from 'styled-components'
import Styles from '@/styles'
import { suitNames } from '@/utils/string'

const Component = ({
  metaTags,
  children,
  className
}: {
  metaTags: TMetaTags
  children: React.ReactNode
  className?: string
}) => {
  const { element } = suitNames(String(className))

  return (
    <>
      <Head metaTags={ metaTags } />

      <Header />

      <main className={ className }>
        <div className={ element('container') }>
          { children }
        </div>
      </main>

      <Footer />
    </>
  )
}

const StyledComponent = styled(Component)`
  ${({ theme }) => css`
  
    &-container {
      ${Styles.mixins.container}
      background-color: ${theme.colors.bg.content};
    }
  `}
`

export const Layout = StyledComponent
