import styled, { css } from 'styled-components'
import Styles from '@/styles'
import * as StyledMarkdown from './_styled_markdown'

export const TimeContainer = styled.div`
  display: block;
  left: 0;
  margin: auto;
  max-width: var(--b-maxWidth-container);
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`

export const TimeSpacer = styled.div`
  display: block;
  font-size: 0;
  padding-bottom: 61.8%;
  position: relative;
  width: 100%;
`

export const Title = styled.h1`
  ${Styles.mixins.fontSmoothing()}
  font-family: var(--b-fontFamily-crimson);
  font-size: ${Styles.funcs.fibo('xs', 'rem')};
  font-weight: normal;
  line-height: 1.618;
  margin-top: 0;
  margin-bottom: ${Styles.funcs.fibo('sm', 'px')};
  margin-left: auto;
  margin-right: auto;
  max-width: 877px;
  text-align: center;
  width: 90%;

  ${Styles.mq.up.md(css`
    font-size: ${Styles.funcs.fibo('sm', 'rem')};
    margin-bottom: ${Styles.funcs.fibo('md', 'px')};

    span::after {
      content: "\\000a";
      white-space: pre-line;
    }
  `)}
`

export const GitHubLink = styled.a`
  ${Styles.mixins.articleSectionMark('xs')}
  height: ${Styles.funcs.fibo('xs', 'px')};
  margin-bottom: calc(${Styles.funcs.fibo('sm', 'px')} + 10px);
  width: calc(${Styles.funcs.fibo('xs', 'px')} * 2);

  ${Styles.mq.up.md(css`
    ${Styles.mixins.articleSectionMark('sm')}
    height: ${Styles.funcs.fibo('sm', 'px')};
    margin-bottom: calc(${Styles.funcs.fibo('md', 'px')} + 10px);
    width: calc(${Styles.funcs.fibo('sm', 'px')} * 2);
  `)}
`

export const Body = styled.section`
  margin: 0 auto;
  max-width: 699px;
  width: 90%;
  ${StyledMarkdown.base}
  ${StyledMarkdown.heading}
  ${StyledMarkdown.p}
  ${StyledMarkdown.img}
  ${StyledMarkdown.strong}
  ${StyledMarkdown.list}
  ${StyledMarkdown.hr}
  ${StyledMarkdown.figure}
  ${StyledMarkdown.cite}
  ${StyledMarkdown.blockquote}
  ${StyledMarkdown.small}
  ${StyledMarkdown.footnotes}
  ${StyledMarkdown.highlight}
  ${StyledMarkdown.code}
  ${StyledMarkdown.table}
  /* extra styles */
  ${StyledMarkdown.bookCover}
  ${StyledMarkdown.embed}
  ${StyledMarkdown.dapicons}
`

export const Nav = styled.nav`
  margin-top: ${Styles.funcs.fibo('xl', 'px')};
  padding-bottom: ${Styles.funcs.fibo('xl', 'px')};

  ${Styles.mq.up.md(css`
    margin-top: ${Styles.funcs.fibo('xl2', 'px')};
    padding-bottom: ${Styles.funcs.fibo('xl2', 'px')};
  `)}
`

export const NavLink = (() => {
  const _hover = `rgba(var(--b-rgb-base), ${Styles.funcs.fibo('md', 'alpha')})`
  const _active = `rgba(var(--b-rgb-base), ${Styles.funcs.fibo('lg', 'alpha')})`

  return styled.a`
    ${Styles.mixins.linkColors('#fff', '#fff', _hover, _hover, _active)}
    ${Styles.mixins.fontSmoothing()}
    ${Styles.mixins.dapicons}
    background-color: rgba(var(--b-rgb-base), ${Styles.funcs.fibo('xs', 'alpha')});
    border-radius: 100%;
    display: block;
    font-size: 2.6rem;
    width: ${Styles.funcs.fibo('md', 'px')};
    height: ${Styles.funcs.fibo('md', 'px')};
    line-height: ${Styles.funcs.fibo('md', 'px')};
    margin: auto;
    text-align: center;
    text-decoration: none;
  `
})()
