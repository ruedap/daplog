import { AppProps } from 'next/app'
import '@src/styles/normalize.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
