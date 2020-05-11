import { AppProps } from 'next/app'
import Router from 'next/router'
import * as gtag from '@src/utils/gtag'
import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import { global } from '@src/styles/basics/global'
import '@src/styles/normalize.scss'
import '@src/styles/highlightjs.scss'
import '@src/styles/custom_properties.scss'
import '@src/styles/fonts.scss'
import '@src/styles/extras.scss'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      {global}
      <Component {...pageProps} />
    </CacheProvider>
  )
}
