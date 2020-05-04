import Link from 'next/link'
import Head from 'next/head'
import Layout from '@components/templates/layout'

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <Layout>
        <h1>First Post</h1>
        <h2>
          <Link href="/">
            <a>back to home</a>
          </Link>
        </h2>
      </Layout>
    </>
  )
}
