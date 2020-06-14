import styled, { css } from 'styled-components'
import { renderWithTheme } from '@/tests/helpers'

describe('mq.up', () => {
  test('should be match snapshot', () => {
    const Styled = styled.div`
      ${({ theme }) => css`
        content: 'before';
        ${theme.mq.up.sm} { content: 'sm'; }
        ${theme.mq.up.md} { content: 'md'; }
        ${theme.mq.up.lg} { content: 'lg'; }
        ${theme.mq.up.xl} { content: 'xl'; }
        content: 'after';
      `}
    `
    const actual = renderWithTheme(<Styled />).toJSON()
    expect(actual).toMatchSnapshot()
  })
})
