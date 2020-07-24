import { space } from './_space'

describe('space', () => {
  describe('lg', () => {
    it('should returns converted each value', () => {
      const actual = space.lg
      expect(actual()).toEqual(89)
      expect(actual.px()).toEqual('89px')
      expect(actual.rem()).toEqual('5.5625rem')
    })
  })
})
