import { fontSmoothing, linkColors, ellipsis, mqUp, articleSectionMark } from '@src/styles/abstractions/mixins'
import { css } from '@emotion/react'

const stripIndent = (str) => str.replace(/^ +/gm, '').replace(/\r?\n/g, '')

describe('fontSmoothing', () => {
    test(`should return same styles.`, () => {
        const r = fontSmoothing().styles
        const e = css`
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        `.styles
        expect(stripIndent(r)).toEqual(stripIndent(e))
    });

    test(`should return same styles.`, () => {
        const r = fontSmoothing(false).styles
        const e = css`
          -webkit-font-smoothing: subpixel-antialiased;
          -moz-osx-font-smoothing: auto;
        `.styles
        expect(stripIndent(r)).toEqual(stripIndent(e))
    });
})

describe('linkColors', () => {
    test(`should return same styles.`, () => {
        const r = linkColors().styles
        const e = css``.styles
        expect(stripIndent(r)).toEqual(stripIndent(e))
    });

    test(`should return same styles.`, () => {
        const r = linkColors('#336699').styles
        const e = css`color: #336699;`.styles
        expect(stripIndent(r)).toEqual(stripIndent(e))
    });

    test(`should return same styles.`, () => {
        const r = linkColors('#336699', 'black').styles
        const e = css`
          color: #336699;
          &:visited { color: black; }
        `.styles
        expect(stripIndent(r)).toEqual(stripIndent(e))
    });

    test(`should return same styles.`, () => {
        const r = linkColors('#336699', 'black', null, 'pink').styles
        const e = css`
          color: #336699;
          &:visited { color: black; }
          &:hover { color: pink; }
        `.styles
        expect(stripIndent(r)).toEqual(stripIndent(e))
    });

    test(`should return same styles.`, () => {
        const r = linkColors('#336699', 'black', 'green', 'pink', '#000').styles
        const e = css`
          color: #336699;
          &:visited { color: black; }
          &:focus { color: green; }
          &:hover { color: pink; }
          &:active { color: #000; }
        `.styles
        expect(stripIndent(r)).toEqual(stripIndent(e))
    });
})


describe('ellipsis', () => {
    test(`should return same styles.`, () => {
        const r = ellipsis(2).styles
        const e = css`
          @supports (-webkit-line-clamp: 2) {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          @supports not (-webkit-line-clamp: 2) {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        `.styles
        expect(stripIndent(r)).toEqual(stripIndent(e))
    });
})

describe('mqUp', () => {
    test(`should return same styles.`, () => {
        const styles = `
          color: red;
          margin-top: 20px;
          font-size: 13px;
        `
        const r = mqUp('md', styles).styles
        const e = css`
          @media (min-width: 768px) {
            color: red;
            margin-top: 20px;
            font-size: 13px;;
          }
        `.styles // TODO: `;;`
        expect(stripIndent(r)).toEqual(stripIndent(e))
    });
})

describe('articleSectionMark', () => {
    test(`should return same styles.`, () => {
        const styles = `
          color: red;
          margin-top: 20px;
          font-size: 13px;
        `
        const r = articleSectionMark('md', styles).styles
        const e = css`
          display: block;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          &::before,
          &::after {
            background-color: rgba(var(--b-rgb-base), 0.21);
            border-radius: 100%;
            content: '';
            display: block;
            height: 55px;
            left: 50%;
            margin: 0;
            padding: 0;
            position: absolute;
            top: 0;
            transform: translate(-50%, 0);
            transform-origin: center center;
            width: 55px;
          }
          &::before {
            margin-left: 18.333333333333332px;
          }
          &::after {
            margin-left: -18.333333333333332px;
          }
          color: red;
          margin-top: 20px;
          font-size: 13px;;
        `.styles // TODO: `;;`
        expect(stripIndent(r)).toEqual(stripIndent(e))
    });
})
