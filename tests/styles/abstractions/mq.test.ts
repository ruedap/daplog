import * as mq from '@/styles/abstracts/mq'
import { css } from 'styled-components'

describe('mq.up', () => {
  test('should return same styles.', () => {
    const styles = css`color: blue;`
    const actual = mq.up.md(css`
      color: red;
      margin-top: 20px;
      font-size: 13px;
      ${styles}
`).join('')
    const expected = css`
    @media (min-width: 768px) {
      
      color: red;
      margin-top: 20px;
      font-size: 13px;
      color: blue;

    }
  `.join('')
    expect(actual).toEqual(expected)
  })
})
