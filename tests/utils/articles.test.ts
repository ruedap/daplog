import { getAllArticlePathParams, convertUTF8 } from '@/utils/articles'
import { TArticlePath } from '@/types'

describe('getAllArticlePathParams', () => {
    const fileNames = [
      '2000-01-01-a-b-c.md',
      '2010-10-10-ddddd.md',
      '2020-12-31-e.md',
    ]
    
    const expectedPathParams = [
      { params: { year: '2000', month: '01', date: '01', title: 'a-b-c' }},
      { params: { year: '2010', month: '10', date: '10', title: 'ddddd' }},
      { params: { year: '2020', month: '12', date: '31', title: 'e' }},
    ]

    test('should return params array.', () => {
        const r: { params: TArticlePath }[] = getAllArticlePathParams(fileNames)
        expect(r).toEqual(expectedPathParams)
    });
})

describe('convertUTF8', () => {
    test('should return utf8 string.', () => {
        const actual = convertUTF8('あいうえお')
        const expected = 'あいうえお'
        expect(actual).toEqual(expected)
    });
})
