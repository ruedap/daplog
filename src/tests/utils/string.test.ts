import { id2Prams, generateMetaTags } from '@src/utils/string'
import { TArticlePath, TMetaTags } from '@src/types'

describe('id2Prams', () => {
    const id = '2000-01-01-aaa-bbb-ccc'
    const expected: TArticlePath = { year: '2000', month: '01', date: '01', title: 'aaa-bbb-ccc' }

    test('should return TArticlePath object.', () => {
        const r: TArticlePath = id2Prams(id)
        expect(r).toEqual(expected)
    });
})

describe('generateMetaTags', () => {
    const expected: TMetaTags = {
        title: 'アインシュタインの電話番号',
        description: 'Commit Every Day, Blog Every Week',
        keywords: [],
        image: 'https://blog.ruedap.com/images/ogp.png',
        url: 'https://blog.ruedap.com'
    }

    test('should return default meta tags.', () => {
        const r: TMetaTags = generateMetaTags()
        expect(r).toEqual(expected)
    });

    test('should return meta tags based on the full args.', () => {
        const args = {
            title: '記事のタイトル',
            description: '記事の本文',
            keywords: ['keword1', 'keword2'],
            image: 'https://blog.ruedap.com/images/2011/08/11/uhloop-01.png',
            url: 'https://blog.ruedap.com/2011/08/11/uhloop'
        } as TMetaTags
        const e = Object.assign({}, args, {
            title: `記事のタイトル - アインシュタインの電話番号`
        })
        const r: TMetaTags = generateMetaTags(args)
        expect(r).toEqual(e)
    });

    test('should return meta tags based on the partial args.', () => {
        const args = {
            title: '記事のタイトル2',
        }
        const e = Object.assign({}, expected, {
            title: `記事のタイトル2 - アインシュタインの電話番号`
        })
        const r: TMetaTags = generateMetaTags(args)
        expect(r).toEqual(e)
    });
})
