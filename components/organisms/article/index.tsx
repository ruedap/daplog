import Link from 'next/link'
import { TArticleData } from '@/types'
import { Time } from '@/components/atoms/time'
import { TimeSvg } from '@/components/atoms/time_svg'
import styled, { css } from 'styled-components'
import Styles from '@/styles'
import { suitNames, getStyledComponentsClassName } from '@/utils/string'
import { Markdown } from '@/components/atoms/markdown'

const githubLink = (id: string) => {
  const baseUrl = 'https://github.com/ruedap/daplog/blob/master/src/articles/'
  return `${baseUrl}${id}.md`
}

const Component = ({ articleData, className }: { articleData: TArticleData, className?: string }) => {
  const scClassName = getStyledComponentsClassName(String(className))
  const { element } = suitNames(scClassName)
  return (
    <article className={ className }>
      <div className={ element('timeContainer') }>
        <div className={ element('timeSpacer') }>
          <Time date={ articleData.date } />
        </div>
        <TimeSvg date={ articleData.date } />
      </div>
      <div className={ element('title') } dangerouslySetInnerHTML={ { __html: articleData.title } } />
      <a className={ element('gitHubLink') } href={ githubLink(articleData.id) } target="_blank" rel="noopener noreferrer" />
      <Markdown className={ element('body') } body={ articleData.body } />
      <nav className={ element('nav') }>
        <Link href="/" passHref>
          <a className={ element('navLink') }>home</a>
        </Link>
      </nav>
    </article>
  )
}

export const StyledComponent = styled(Component)`
  ${({ theme }) => css`
  
    &-timeContainer {
      display: block;
      left: 0;
      margin: auto;
      max-width: var(--b-maxWidth-container);
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
    }
  
    &-timeSpacer {
      display: block;
      font-size: 0;
      padding-bottom: 61.8%;
      position: relative;
      width: 100%;
    }
    
    &-title {
      ${Styles.mixins.fontSmoothing()}
      font-family: var(--b-fontFamily-crimson);
      font-size: ${theme.fontSizes.xs.rem};
      font-weight: normal;
      line-height: 1.618;
      margin-top: 0;
      margin-bottom: ${Styles.funcs.fibo('sm', 'px')};
      margin-left: auto;
      margin-right: auto;
      max-width: 877px;
      text-align: center;
      width: 90%;

      ${theme.mq.up.md} {
        font-size: ${theme.fontSizes.sm.rem};
        margin-bottom: ${Styles.funcs.fibo('md', 'px')};

        span::after {
          content: "\\000a";
          white-space: pre-line;
        }
      }
    }
    
    &-gitHubLink {
      ${Styles.mixins.articleSectionMark('xs')}
      height: ${Styles.funcs.fibo('xs', 'px')};
      margin-bottom: calc(${Styles.funcs.fibo('sm', 'px')} + 10px);
      width: calc(${Styles.funcs.fibo('xs', 'px')} * 2);

      ${theme.mq.up.md} {
        ${Styles.mixins.articleSectionMark('sm')}
        height: ${Styles.funcs.fibo('sm', 'px')};
        margin-bottom: calc(${Styles.funcs.fibo('md', 'px')} + 10px);
        width: calc(${Styles.funcs.fibo('sm', 'px')} * 2);
      }
    }
    
    &-body {
      margin: 0 auto;
      max-width: 699px;
      width: 90%;
    }
    
    &-nav {
      margin-top: ${Styles.funcs.fibo('xl', 'px')};
      padding-bottom: ${Styles.funcs.fibo('xl', 'px')};

      ${theme.mq.up.md} {
        margin-top: ${Styles.funcs.fibo('xl2', 'px')};
        padding-bottom: ${Styles.funcs.fibo('xl2', 'px')};
      }
    }

    &-navLink {
      ${Styles.mixins.linkColors('#fff', '#fff', theme.colors.key[4], theme.colors.key[4], theme.colors.key[5])}
      ${Styles.mixins.fontSmoothing()}
      ${Styles.mixins.dapicons}
      background-color: ${theme.colors.key[2]};
      border-radius: 100%;
      display: block;
      font-size: ${theme.utils.pxToRem(26)};
      width: ${Styles.funcs.fibo('md', 'px')};
      height: ${Styles.funcs.fibo('md', 'px')};
      line-height: ${Styles.funcs.fibo('md', 'px')};
      margin: auto;
      text-align: center;
      text-decoration: none;
    }
  `}
`

export const Article = StyledComponent
