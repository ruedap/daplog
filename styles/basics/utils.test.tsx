import { StyledBasicUtils } from './utils'
import 'jest-styled-components'
import renderer from 'react-test-renderer'
import { renderWithTheme } from '@/tests/helpers'

describe('StyledBasicUtils', () => {
  it('should be matched snapshot', () => {
    const actual = renderWithTheme(<StyledBasicUtils />).toJSON()
    expect(actual).toMatchSnapshot()
  })
})
