import Layout from '@/components/templates/layout'
import { generateMetaTags } from '@/utils/string'

const StyleguidePage = () => {
  const metaTags = generateMetaTags()
  return (
    <Layout metaTags={metaTags}>
      <div>yay</div>
    </Layout>
  )
}

export default StyleguidePage
