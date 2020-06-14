import styled, { css } from 'styled-components'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import {
  fontSmoothing,
  linkColors,
  ellipsis,
  articleSectionMark
} from '@/styles/abstracts/mixins'
import { lightTheme } from '@/styles/theme'
import { renderWithTheme } from '@/tests/helpers'

// const stripIndent = (str) => str.replace(/^ +/gm, '').replace(/\r?\n/g, '')

describe('fontSmoothing', () => {
  test('should return same styles.', () => {
    const actual = fontSmoothing().join('')
    const expected = css`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`.join('')
    expect(actual).toEqual(expected)
  })

  test('should return same styles.', () => {
    const actual = fontSmoothing(false).join('')
    const expected = css`
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
`.join('')
    expect(actual).toEqual(expected)
  })
})

describe('linkColors', () => {
  test('should return same styles.', () => {
    const actual = linkColors().join('')
    const expected = css``.join('')
    expect(actual).toEqual(expected)
  })

  test('should return same styles.', () => {
    const Styled = styled.div`${linkColors('#336699')}`
    const tree = renderer.create(<Styled />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should return same styles.', () => {
    const Styled = styled.div`${linkColors('#336699', 'black')}`
    const tree = renderer.create(<Styled />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should return same styles.', () => {
    const Styled = styled.div`${linkColors('#336699', 'black', undefined, 'pink')}`
    const tree = renderer.create(<Styled />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should return same styles.', () => {
    const color = lightTheme.colors.key[3]
    const Styled = styled.div`${linkColors(
      '#336699', 'black', color, 'pink', '#000'
    )}`
    const tree = renderer.create(<Styled />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('ellipsis', () => {
  test('should return same styles.', () => {
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
  })
})

describe('articleSectionMark', () => {
  test('should return same styles.', () => {
    const Styled = styled.div`${articleSectionMark('sm')}`
    const tree = renderWithTheme(<Styled />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should return same styles.', () => {
    const styles = css`
      color: ${({ theme }) => theme.colors.text.body};
      margin-top: 20px;
      font-size: 13px;
    `
    const Styled = styled.div`${articleSectionMark('md', styles)}`
    const tree = renderWithTheme(<Styled />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
