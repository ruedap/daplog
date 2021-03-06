import { id2Prams, generateMetaTags, suitNames, getStyledComponentsClassName } from '@/utils/string'
import { TArticlePath, TMetaTags } from '@/types'
import { BLOG_NAME } from '@/utils/constants'
import renderer from 'react-test-renderer'
import styled from 'styled-components'

describe('id2Prams', () => {
  const id = '2000-01-01-aaa-bbb-ccc'
  const expected: TArticlePath = { year: '2000', month: '01', date: '01', title: 'aaa-bbb-ccc' }

  test('should return TArticlePath object.', () => {
    const r: TArticlePath = id2Prams(id)
    expect(r).toEqual(expected)
  })
})

describe('generateMetaTags', () => {
  const expected: TMetaTags = {
    title: BLOG_NAME,
    description: 'Commit Every Day, Blog Every Week',
    keywords: [],
    image: 'https://blog.ruedap.com/images/ogp.png',
    url: 'https://blog.ruedap.com'
  }

  test('should return default meta tags.', () => {
    const r: TMetaTags = generateMetaTags()
    expect(r).toEqual(expected)
  })

  test('should return meta tags based on the full args.', () => {
    const args: TMetaTags = {
      title: '記事のタイトル',
      description: '記事の本文',
      keywords: ['keword1', 'keword2'],
      image: 'https://blog.ruedap.com/images/2011/08/11/uhloop-01.png',
      url: 'https://blog.ruedap.com/2011/08/11/uhloop'
    }
    const e = Object.assign({}, args, {
      title: `記事のタイトル - ${BLOG_NAME}`
    })
    const r: TMetaTags = generateMetaTags(args)
    expect(r).toEqual(e)
  })

  test('should return meta tags based on the partial args.', () => {
    const args = {
      title: '記事のタイトル2'
    }
    const e = Object.assign({}, expected, {
      title: `記事のタイトル2 - ${BLOG_NAME}`
    })
    const r: TMetaTags = generateMetaTags(args)
    expect(r).toEqual(e)
  })
})

describe('utils.suitNames', () => {
  describe('block()', () => {
    it('should returns converted string', () => {
      const className = 'BlockName'
      const { block } = suitNames(className)
      expect(block()).toEqual('BlockName')
    })
  })

  describe('blockModifier()', () => {
    it('should returns converted string', () => {
      const className = 'BlockName'
      const { blockModifier } = suitNames(className)
      expect(blockModifier('modifierName')).toEqual('BlockName BlockName--modifierName')
    })
  })

  describe('element()', () => {
    it('should returns converted string', () => {
      const className = 'BlockName'
      const { element } = suitNames(className)
      expect(element('elementName')).toEqual('BlockName-elementName')
    })
  })

  describe('elementModifier()', () => {
    it('should returns converted string', () => {
      const className = 'BlockName'
      const { elementModifier } = suitNames(className)
      expect(elementModifier('elementName', 'modifierName'))
        .toEqual('BlockName-elementName BlockName-elementName--modifierName')
    })
  })
})

describe('getStyledComponentsClassName', () => {
  test('should return styled-components\' class name', () => {
    expect(getStyledComponentsClassName('')).toEqual('')
    expect(getStyledComponentsClassName('foo')).toEqual('foo')
    expect(getStyledComponentsClassName('foo bar')).toEqual('bar')
    expect(getStyledComponentsClassName('foo bar baz')).toEqual('bar')
  })

  test('should be match snapshot', () => {
    const Component = ({ className }: { className?: string}) => {
      const scClassName = getStyledComponentsClassName(String(className))
      return (
        <div className={ scClassName }>foo</div>
      )
    }

    const StyledComponent = styled(Component)`
      color: red;
    `
    const actual = renderer.create(<StyledComponent className="foo bar" />)
    expect(actual).toMatchSnapshot()
  })
})
