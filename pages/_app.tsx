import { AppProps } from 'next/app'
import Router from 'next/router'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import * as gtag from '@/utils/gtag'
import Styles from '@/styles'
import '@/styles/normalize.scss'
import '@/styles/highlightjs.scss'
import '@/styles/fonts.scss'
import '@/styles/extras.scss'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const theme: DefaultTheme = {
  colors: {
    primary: 'skyblue',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Styles.CustomProperties />
      <Styles.Elements />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
