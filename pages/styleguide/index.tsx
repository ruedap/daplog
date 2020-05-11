import Layout from '@src/components/templates/layout'
import Styleguide from '@src/components/organisms/styleguide'
import { generateMetaTags } from '@src/utils/string'

const StyleguidePage = () => {
  const metaTags = generateMetaTags()
  return (
    <Layout metaTags={metaTags}>
      <Styleguide />
    </Layout>
  )
}

export default StyleguidePage
