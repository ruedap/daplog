import { css } from 'styled-components'
import { rgba } from 'polished'
import Styles from '@/styles'

const fontSize_md = '1.7rem'
const fontSize_sm = '1.5rem'
const fontSize_xs = '1.2rem'

export const base = css`
  ${Styles.mixins.fontSmoothing()}
  font-family: var(--b-fontFamily-lucida);
  font-size: ${fontSize_md};
  line-height: 1.8;

  ${Styles.mq.up.md(css`
    line-height: 2;
  `)}
`

export const heading = css`
  > h2,
  > h3 {
    color: rgba(var(--b-rgb-base), ${Styles.funcs.fibo('lg', 'alpha')});
    font-weight: normal;
    line-height: var(--b-ratio-golden);
    text-align: center;
  }

  > h2 {
    font-size: 2.3rem;
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
    font-size: 2rem;
    margin-bottom: ${Styles.funcs.fibo('xs', 'px')};
    margin-top: ${Styles.funcs.fibo('md', 'px')};
  }
`

export const p = css`
  > p {
    margin-bottom: 1em;
    margin-top: 1em;

    > a {
      word-wrap: break-word;
    }
  }
`

export const img = css`
  > p {
    > img,
    > a > img {
      display: block;
      margin: ${Styles.funcs.fibo('sm', 'px')} auto;
      max-width: 100%;
    }
  }
`

export const strong = css`
  strong,
  em {
    background-image: linear-gradient(
      transparent 0,
      transparent 60%,
      rgba(var(--b-rgb-base), ${Styles.funcs.fibo('xs2', 'alpha')}) 60%,
      rgba(var(--b-rgb-base), ${Styles.funcs.fibo('xs2', 'alpha')}) 100%
    );
    font-style: normal;
    font-weight: normal;
    padding: 0.1em;
  }
`

export const list = css`
  > ul,
  > ol {
    font-size: ${fontSize_sm};
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
`

export const hr = (() => {
  const height = Styles.funcs.fibo('md', 'px')
  return css`
    > hr {
      border: 0;
      display: block;
      height: ${height};
      position: relative;
      width: 100%;

      ${Styles.mixins.articleSectionMark('xs2', css`
        &::before,
        &::after {
          top: calc((${height} / 2) - (${Styles.funcs.fibo('xs2', 'px')} / 2));
        }
      `)}
    }
`
})()

export const figure = css`
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
      font-size: ${fontSize_xs};
      margin: 0.5em 0;
    }
  }
`

const citeIcon = css`
  &::before {
    ${Styles.mixins.dapicons}
    color: rgba(var(--b-rgb-base), ${Styles.funcs.fibo('md', 'alpha')});
    content: "cite";
    font-size: 89%;
    margin-right: 0.6em;
  }
`

export const cite = css`
  > p > cite {
    ${citeIcon}
    display: block;
    font-size: ${fontSize_sm};
    font-style: normal;
    font-weight: normal;
    margin-left: 1em;
    text-align: left; /* overwrite justify */
  }
`

export const blockquote = css`
  blockquote {
    border-left: 6px solid rgba(var(--b-rgb-base), ${Styles.funcs.fibo('xs', 'alpha')});
    color: rgba(var(--b-rgb-base), ${Styles.funcs.fibo('lg', 'alpha')});
    font-size: ${fontSize_sm};
    margin: 2em 0;
    padding: 0 1.5em;

    cite {
      ${citeIcon}
      display: block;
      font-size: 1.3rem;
      font-style: normal;
      text-align: right;
    }
  }
`

export const small = css`
  > p > small,
  > p > ins {
    color: rgba(var(--b-rgb-base), ${Styles.funcs.fibo('lg', 'alpha')});
    display: inline-block;
    font-size: ${fontSize_sm};
    line-height: var(--b-ratio-golden);
    text-align: left; /* overwrite justify */
    text-decoration: none;

    &::before {
      content: "※";
      margin-right: 0.3em;
    }
  }

  > p > small {
    color: rgba(var(--b-color-body), ${Styles.funcs.fibo('md', 'alpha')});
  }
`

export const footnotes = css`
  > .footnotes {
    color: #777;
    font-size: ${fontSize_xs};
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
`

export const highlight = css`
  > pre {
    ${Styles.mixins.fontSmoothing(false)}
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
      font-size: 1.3rem;
      font-style: normal;
      font-weight: normal;
      line-height: var(--b-ratio-golden);
      overflow-x: auto;
    }
  }
`

export const code = css`
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
`

export const table = (() => {
  const borderColor = `rgba(var(--b-rgb-base), ${Styles.funcs.fibo('xs2', 'alpha')})`
  return css`
    table {
      background-color: #fff;
      border: 1px solid ${borderColor};
      border-collapse: separate;
      border-left: 0;
      border-spacing: 0;
      margin: ${Styles.funcs.fibo('sm', 'px')} auto;
      width: 100%;

      th,
      td {
        border-left: 1px solid ${borderColor};
        border-top: 1px solid ${borderColor};
        font-size: 1.3rem;
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

        background-color: ${borderColor};
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
`
})()

export const bookCover = css`
  .e-bookCover {
    display: block;
    float: right;
    padding: 0.5em 0 0.5em 1.5em;
    text-align: right;

    > img {
      margin: 0 !important;
      width: 90px;

      ${Styles.mq.up.md(css`
        width: 150px;
      `)}
    }
  }
`

export const embed = css`
  .e-embed-instagram {
    display: flex;
    height: 354px;
    margin: 0 auto 2em;
  }

  twitter-widget.twitter-tweet {
    margin: 1.4em auto !important;
  }
`

export const dapicons = css`
  .e-dapicons {
    ${Styles.mixins.dapicons}
  }
`
