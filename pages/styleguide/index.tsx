import Layout from '@/components/templates/layout'
import { generateMetaTags } from '@/utils/string'
import Styleguide from '@/components/templates/styleguide'

const StyleguidePage = () => {
  const metaTags = generateMetaTags()
  return (
    <Layout metaTags={ metaTags }>
      <Styleguide />
    </Layout>
  )
}

export default StyleguidePage
