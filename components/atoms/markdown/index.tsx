import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import Styles from '@/styles'

const Component = ({ body, className }: { body: string, className?: string}) =>
  <div className={ className } dangerouslySetInnerHTML={ { __html: body } } />

const fontSizeMd = css`${({ theme }) => theme.utils.pxToRem(17)}`
const fontSizeSm = css`${({ theme }) => theme.utils.pxToRem(15)}`
const fontSizeXs = css`${({ theme }) => theme.utils.pxToRem(12)}`
const hrHeight = Styles.funcs.fibo('md', 'px')
const tableBorderColor = css`${({ theme }) => theme.colors.key[1]}`
const citeIcon = css`
  &::before {
    ${Styles.mixins.dapicons}
    color: ${({ theme }) => theme.colors.key[4]};
    content: "cite";
    font-size: 89%;
    margin-right: 0.6em;
  }
`

const StyledComponent = styled(Component)`
  ${({ theme }) => css`
    ${Styles.mixins.fontSmoothing()}
    font-family: var(--b-fontFamily-lucida);
    font-size: ${fontSizeMd};
    line-height: 1.8;

    ${theme.mq.up.md} {
      line-height: 2;
    }
    
    /* heading */
    > h2,
    > h3 {
      color: ${({ theme }) => theme.colors.key[5]};
      font-weight: normal;
      line-height: var(--b-ratio-golden);
      text-align: center;
    }

    > h2 {
      font-size: ${theme.utils.pxToRem(23)};
      margin-bottom: ${Styles.funcs.fibo('sm', 'px')};
      margin-top: ${Styles.funcs.fibo('xl', 'px')};

      ${Styles.mixins.articleSectionMark('xs', css`
        &::before,
        &::after {
          top: calc((${Styles.funcs.fibo('xl', 'px')} / 2) * -1);
        }
      `)}
    }

    > h3 {
      ${({ theme }) => css`
        font-size: ${theme.utils.pxToRem(20)};
        margin-bottom: ${Styles.funcs.fibo('xs', 'px')};
        margin-top: ${Styles.funcs.fibo('md', 'px')};
      `}
    }

    /* p */
    > p {
      margin-bottom: 1em;
      margin-top: 1em;

      > a {
        word-wrap: break-word;
      }
    }


    /* img */
    > p {
      > img,
      > a > img {
        display: block;
        margin: ${Styles.funcs.fibo('sm', 'px')} auto;
        max-width: 100%;
      }
    }
    
    /* strong, em */
    strong,
    em {
      background-image: linear-gradient(
        transparent 0,
        transparent 60%,
        ${theme.colors.key[1]} 60%,
        ${theme.colors.key[2]} 100%
      );
      font-style: normal;
      font-weight: normal;
      padding: 0.1em;
    }
    
    /* ul, ol */
    > ul,
    > ol {
      font-size: ${fontSizeSm};
      margin-bottom: 1em;
      margin-top: 1em;
      text-align: left; /* overwrite justify */
    }

    ul {
      list-style-type: disc;
      padding-left: 2.5em;
    }

    ol {
      list-style-type: decimal;
      padding-left: 2.5em;
    }
    
    /* hr */
    > hr {
      border: 0;
      display: block;
      height: ${hrHeight};
      position: relative;
      width: 100%;

      ${Styles.mixins.articleSectionMark('xs2', css`
        &::before,
        &::after {
          top: calc((${hrHeight} / 2) - (${Styles.funcs.fibo('xs2', 'px')} / 2));
        }
      `)}
    }

    /* figure */
    figure {
      display: block;
      margin: 1.5em auto;
      padding: 0;
      text-align: center;

      img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
      }

      figcaption {
        font-size: ${fontSizeXs};
        margin: 0.5em 0;
      }
    }

    /* cite */
    > p > cite {
      ${citeIcon}
      display: block;
      font-size: ${fontSizeSm};
      font-style: normal;
      font-weight: normal;
      margin-left: 1em;
      text-align: left; /* overwrite justify */
    }

    /* blockquote */
    /* TODO: redundant css */
    blockquote {
      border-left: 6px solid ${theme.colors.key[2]};
      color: ${theme.colors.key[5]};
      font-size: ${fontSizeSm};
      margin: 2em 0;
      padding: 0 1.5em;

      cite {
        ${citeIcon}
        display: block;
        font-size: ${theme.utils.pxToRem(13)};
        font-style: normal;
        text-align: right;
      }
    }

    /* small, ins */
    /* TODO: redundant css */
    > p > small,
    > p > ins {
      color: ${theme.colors.key[5]};
      display: inline-block;
      font-size: ${fontSizeSm};
      line-height: var(--b-ratio-golden);
      text-align: left; /* overwrite justify */
      text-decoration: none;

      &::before {
        content: "※";
        margin-right: 0.3em;
      }
    }

    > p > small {
      color: rgba(${theme.colors.text.body}, ${Styles.funcs.fibo('md', 'alpha')});
    }

    /* .footnotes */
    > .footnotes {
      color: #777;
      font-size: ${fontSizeXs};
      line-height: var(--b-ratio-golden);
      margin-top: ${Styles.funcs.fibo('md', 'px')};

      > hr {
        display: none;
      }

      > ol > li {
        margin: 0.5em 0;
      }
      
      .footnote-backref {
        margin-left: 0.3em;
      }
    }

    /* highlight */
    > pre { ${Styles.mixins.fontSmoothing(false)}
      background-color: #f8f8f8;
      border: 3px solid #eee;
      box-shadow: inset 0 0 0 1px #ccc;
      padding: 1px;
      display: block;
      margin-bottom: 1em;
      margin-top: 1em;
      /* overflow: auto;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 13px;
      white-space: pre;
      word-wrap: normal; */

      > code {
        display: block;
        padding: 0.7em 1.4em 0.9em;
        font-family: var(--b-fontFamily-mono);
        font-size: ${theme.utils.pxToRem(13)};
        font-style: normal;
        font-weight: normal;
        line-height: var(--b-ratio-golden);
        overflow-x: auto;
      }
    }

    /* code */
    *:not(pre) code,
    kbd {
      ${Styles.mixins.fontSmoothing(false)}
      background-color: #f2f2f2;
      border: 1px solid ${rgba('#808080', 0.4)};
      border-radius: 2px;
      font-family: var(--b-fontFamily-mono);
      font-size: 79%;
      margin: 0 0.2em;
      padding: 0 0.4em;
      vertical-align: 0.1em;
      white-space: pre;
      word-wrap: break-word;
    }
    
    /* table */
    table {
      background-color: #fff;
      border: 1px solid ${tableBorderColor};
      border-collapse: separate;
      border-left: 0;
      border-spacing: 0;
      margin: ${Styles.funcs.fibo('sm', 'px')} auto;
      width: 100%;

      th,
      td {
        border-left: 1px solid ${tableBorderColor};
        border-top: 1px solid ${tableBorderColor};
        font-size: ${theme.utils.pxToRem(13)};
        padding: 0.5em 1em;
        text-align: left;
        vertical-align: top;
      }

      th {
        /* TODO: hide header */
        &:empty {
          height: 4px;
          padding: 0;
        }

        background-color: ${tableBorderColor};
        font-weight: normal;
      }

      caption + thead tr:first-child th,
      caption + tbody tr:first-child th,
      caption + tbody tr:first-child td,
      colgroup + thead tr:first-child th,
      colgroup + tbody tr:first-child th,
      colgroup + tbody tr:first-child td,
      thead:first-child tr:first-child th,
      tbody:first-child tr:first-child th,
      tbody:first-child tr:first-child td {
        border-top: 0;
      }
    }
    
    /* bookcover */
    .e-bookCover {
      display: block;
      float: right;
      padding: 0.5em 0 0.5em 1.5em;
      text-align: right;

      > img {
        margin: 0 !important;
        width: 90px;

        ${({ theme }) => theme.mq.up.md} {
          width: 150px;
        }
      }
    }

    /* embed */
    .e-embed-instagram {
      display: flex;
      height: 354px;
      margin: 0 auto 2em;
    }

    twitter-widget.twitter-tweet {
      margin: 1.4em auto !important;
    }
    
    /* dapicons */
    .e-dapicons {
      ${Styles.mixins.dapicons}
    }

  `}
`

export const Markdown = StyledComponent
