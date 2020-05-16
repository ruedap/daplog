import Layout from '@/components/templates/layout'
import { generateMetaTags } from '@/utils/string'
import styled from 'styled-components'

const StyleguidePage = () => {
  const metaTags = generateMetaTags()
  return (
    <Layout metaTags={metaTags}>
      <Title>Styleguide</Title>
    </Layout>
  )
}

export default StyleguidePage

const Title = styled.h1`
  font-size: 4rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary}
`
