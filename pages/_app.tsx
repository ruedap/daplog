import { AppProps } from 'next/app'
import Router from 'next/router'
import * as gtag from '@/utils/gtag'
import '@/styles/normalize.scss'
import '@/styles/highlightjs.scss'
import '@/styles/custom_properties.scss'
import '@/styles/fonts.scss'
import '@/styles/basics.scss'
import '@/styles/extras.scss'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
