export type TArticleItem = Readonly<{
  id: string
  date: string
  title: string
}>

export type TArticlePath = Readonly<{
  year: string
  month: string
  date: string
  title: string
}>

export type TArticleData = TArticleItem & Readonly<{
  body: string
}>

export type TMetaTags = Readonly<{
  title: string
  description: string
  keywords: string[]
  image: string
  url: string
}>


// Styles

export type TSizeName = '6xl'|'5xl'|'4xl'|'3xl'|'2xl'|'xl'|'lg'|'md'|'sm'|'xs'|'2xs'|'3xs'|'4xs'|'5xs'|'6xs'
export type TUnit = 'px'|'rem'|'alpha'
