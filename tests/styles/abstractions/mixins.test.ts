import {
  fontSmoothing,
  linkColors,
  ellipsis,
  articleSectionMark,
} from '@/styles/abstractions/mixins'
import { fibo } from '@/styles/abstractions/funcs'
import { css } from 'styled-components'

// const stripIndent = (str) => str.replace(/^ +/gm, '').replace(/\r?\n/g, '')

describe('fontSmoothing', () => {
    test(`should return same styles.`, () => {
        const actual = fontSmoothing().join('')
        const expected = css`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`.join('')
        expect(actual).toEqual(expected)
    });

    test(`should return same styles.`, () => {
        const actual = fontSmoothing(false).join('')
        const expected = css`
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
`.join('')
        expect(actual).toEqual(expected)
    });
})

describe('linkColors', () => {
    test(`should return same styles.`, () => {
        const actual = linkColors().join('')
        const expected = css``.join('')
        expect(actual).toEqual(expected)
    });

    test(`should return same styles.`, () => {
        const actual = linkColors('#336699').join('')
        const expected = css`color: #336699;`.join('')
        expect(actual).toEqual(expected)
    });

    test(`should return same styles.`, () => {
        const actual = linkColors('#336699', 'black').join('')
        const expected = css`color: #336699;&:visited { color: black; }`.join('')
        expect(actual).toEqual(expected)
    });

    test(`should return same styles.`, () => {
        const actual = linkColors('#336699', 'black', null, 'pink').join('')
        const expected = css`color: #336699;&:visited { color: black; }&:hover { color: pink; }`.join('')
        expect(actual).toEqual(expected)
    });

    test(`should return same styles.`, () => {
        const color = `rgba(var(--b-rgb-base), ${fibo('sm', 'alpha')})`
        const actual = linkColors('#336699', 'black', color, 'pink', '#000').join('')
        const expected = css`color: #336699;&:visited { color: black; }&:focus { color: rgba(var(--b-rgb-base), 0.34); }&:hover { color: pink; }&:active { color: #000; }`.join('')
        expect(actual).toEqual(expected)
    });
})

describe('ellipsis', () => {
    test(`should return same styles.`, () => {
        const actual = ellipsis(2).join('')
        const arg = 2
        const expected = css`
  @supports (-webkit-line-clamp: ${arg}) {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: ${arg};
    -webkit-box-orient: vertical;
  }
  @supports not (-webkit-line-clamp: ${arg}) {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`.join('')
        expect(actual).toEqual(expected)
    });
})

describe('articleSectionMark', () => {
    test(`should return same styles.`, () => {
        const actual = articleSectionMark('sm').join('')
        const expected = css`
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
    height: 34px;
    left: 50%;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    transform: translate(-50%, 0);
    transform-origin: center center;
    width: 34px;
  }
  &::before {
    margin-left: 11.333333333333334px;
  }
  &::after {
    margin-left: -11.333333333333334px;
  }
  
`.join('')
        expect(actual).toEqual(expected)
    });

    test(`should return same styles.`, () => {
        const styles = css`
  color: red;
  margin-top: 20px;
  font-size: 13px;
`
        const actual = articleSectionMark('md', styles).join('')
        const expected = css`
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
  font-size: 13px;

`.join('')
        expect(actual).toEqual(expected)
    });
})
