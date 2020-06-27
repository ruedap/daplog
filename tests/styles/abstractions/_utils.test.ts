import { units } from '@/styles/abstracts/_utils'

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
})
