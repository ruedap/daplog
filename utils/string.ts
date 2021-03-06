import { TArticlePath, TMetaTags } from '@/types'
import { BLOG_NAME } from '@/utils/constants'

export const stripHtmlTags = (htmlStr: string): string => {
  return htmlStr.replace(/(<([^>]+)>)/ig, '')
}

export const id2Url = (id: string): string => {
  return id.replace(/(\d{4})-(\d{2})-(\d{2})-(.*)/, '$1/$2/$3/$4')
}

export const fileName2Id = (fileName: string): string => {
  return fileName.replace(/\.md$/, '')
}

export const id2Prams = (id: string): TArticlePath => {
  const a = id2Url(id).split('/')
  return { year: a[0], month: a[1], date: a[2], title: a[3] }
}

export const id2DateString = (id: string): string => {
  return id.slice(0, 10)
}

export const generateMetaTags = (metaTags?: Partial<TMetaTags>): TMetaTags => {
  return {
    title: metaTags?.title ? `${stripHtmlTags(metaTags.title)} - ${BLOG_NAME}` : BLOG_NAME,
    description: metaTags?.description ?? 'Commit Every Day, Blog Every Week',
    keywords: metaTags?.keywords ?? [],
    image: metaTags?.image ?? 'https://blog.ruedap.com/images/ogp.png',
    url: metaTags?.url ?? 'https://blog.ruedap.com'
  }
}

const suitBlockName = (blockName: string) => () => {
  return blockName
}

const suitBlockModifierName = (blockName: string) => {
  return (modifierName: string) => {
    return `${blockName} ${blockName}--${modifierName}`
  }
}

const suitElementName = (blockName: string) => (elementName: string) => {
  return `${blockName}-${elementName}`
}

const suitElementModifierName = (blockName: string) => {
  return (elementName: string, modifierName: string) => {
    return `${blockName}-${elementName} ${blockName}-${elementName}--${modifierName}`
  }
}

export const suitNames = (blockName: string) => {
  return {
    block: suitBlockName(blockName),
    blockModifier: suitBlockModifierName(blockName),
    element: suitElementName(blockName),
    elementModifier: suitElementModifierName(blockName)
  } as const
}

export const getStyledComponentsClassName = (className: string) => {
  const array = className.split(' ')
  return array.length > 1 ? array[1] : array[0]
}
