import { AppProps } from 'next/app'
import Router from 'next/router'
import * as gtag from '@/utils/gtag'
import Styles from '@/styles'
import { AppStateProvider } from '@/contexts/app_state'
import { useAppState } from '@/hooks/app_state'
import '@/styles/normalize.scss'
import '@/styles/highlightjs.scss'
import '@/styles/fonts.scss'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export default function App ({ Component, pageProps }: AppProps) {
  const appState = useAppState()

  return (
    <AppStateProvider initialAppState={ appState }>
      <Styles.CustomProperties />
      <Styles.Elements />
      <Component { ...pageProps } />
    </AppStateProvider>
  )
}
