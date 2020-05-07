import { AppProps } from 'next/app'
import '@src/styles/normalize.scss'
import '@src/styles/custom_properties.scss'
import '@src/styles/fonts.scss'
import '@src/styles/basics.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
