import { AppProps } from 'next/app'
import '@src/styles/normalize.scss'
import '@src/styles/custom_properties.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
