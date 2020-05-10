import { AppProps } from 'next/app'
import Router from 'next/router'
import * as gtag from '@src/utils/gtag'
import '@src/styles/normalize.scss'
import '@src/styles/highlightjs.scss'
import '@src/styles/custom_properties.scss'
import '@src/styles/fonts.scss'
import '@src/styles/basics.scss'
import '@src/styles/extras.scss'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
