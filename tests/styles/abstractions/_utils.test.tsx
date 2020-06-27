import { units } from '@/styles/abstracts/_utils'
import styled from 'styled-components'
import { renderWithTheme } from '@/tests/helpers'

describe('units', () => {
  it('should returns converted each value', () => {
    const actual = units(16)
    expect(actual()).toEqual(16)
    expect(actual.px()).toEqual('16px')
    expect(actual.rem()).toEqual('1rem')
  })

  it('should returns converted each value', () => {
    const actual = units(-100)
    expect(actual()).toEqual(-100)
    expect(actual.px()).toEqual('-100px')
    expect(actual.rem()).toEqual('-6.25rem')
  })

  it('should be match snapshot', () => {
    const u = units(10)
    const Styled = styled.div`
      line-height: ${u};
      font-size: ${u.px};
      width: ${u.rem};
    `
    const actual = renderWithTheme(<Styled />).toJSON()
    expect(actual).toMatchSnapshot()
  })
})
