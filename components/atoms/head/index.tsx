import NextHead from 'next/head'
import { TMetaTags } from '@/types'

const Head = ({ metaTags }: { metaTags: TMetaTags }) => {
  return (
    <NextHead>
      <meta charSet="utf-8" />
      <title>{metaTags.title}</title>
      <meta property="og:title" content={metaTags.title} />
      <meta property="og:description" content={metaTags.description} />
      <meta name="keywords" content={metaTags.keywords.join(',')} />
      <meta property="og:site_name" content={metaTags.title} />
      <meta property="og:type" content="blog" />
      <meta property="og:image" content={metaTags.image} />
      <meta property="og:url" content={metaTags.url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@ruedap" />
      <meta name="twitter:title" content={metaTags.title} />
      <meta name="twitter:description" content={metaTags.description} />
      <meta name="twitter:image" content={metaTags.image} />
      <meta name="twitter:url" content={metaTags.url} />
      <link rel="canonical" href={metaTags.url} />
      <link rel="icon" href="/images/favicon.ico" />
    </NextHead>
  )
}

export default Head
