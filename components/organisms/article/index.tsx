import Link from 'next/link'
import { TArticleData } from '@/types'
import Time from '@/components/atoms/time'
import { TimeSvg } from '@/components/atoms/time_svg'
import * as Styled from './styled'

const githubLink = (id: string) => {
  const baseUrl = 'https://github.com/ruedap/daplog/blob/master/src/articles/'
  return `${baseUrl}${id}.md`
}

const Article = ({ articleData }: { articleData: TArticleData }) => {
  return (
    <article>
      <Styled.TimeContainer>
        <Styled.TimeSpacer>
          <Time date={ articleData.date } />
        </Styled.TimeSpacer>
        <TimeSvg date={ articleData.date } />
      </Styled.TimeContainer>
      <Styled.Title dangerouslySetInnerHTML={ { __html: articleData.title } } />
      <Styled.GitHubLink href={ githubLink(articleData.id) } target="_blank" rel="noopener noreferrer" />
      <Styled.Body className="e-articleBody" dangerouslySetInnerHTML={ { __html: articleData.body } } />
      <Styled.Nav>
        <Link href="/" passHref>
          <Styled.NavLink>home</Styled.NavLink>
        </Link>
      </Styled.Nav>
    </article>
  )
}

export default Article
